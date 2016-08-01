/*
	Sketch Elements: Chemistry molecular diagram drawing tool.
	
	(c) 2005-2013 Dr. Alex M. Clark, all rights reserved
	
	Released as GNUware, under the Gnu Public License (GPL)
	
	See www.gnu.org for details.
*/

package org.sketchel;

import java.awt.Graphics;
import java.awt.Graphics2D;
import java.awt.RenderingHints;
import java.awt.event.ActionEvent;
import java.awt.event.ActionListener;
import java.awt.event.ComponentEvent;
import java.awt.event.ComponentListener;
import java.awt.event.FocusEvent;
import java.awt.event.FocusListener;
import java.awt.event.KeyEvent;
import java.awt.event.KeyListener;
import java.awt.event.MouseEvent;
import java.awt.event.MouseListener;
import java.awt.event.MouseMotionListener;
import java.awt.event.MouseWheelEvent;
import java.awt.event.MouseWheelListener;
import java.util.Arrays;

import javax.swing.JComponent;

/*
	Base widget for representing a molecule in its component. Has a variety of support features for display and interaction,
	and translation of input events (mouse, etc.) to higher level sketch-related precepts.
*/

public class CanvasMolecule extends JComponent implements 
	MouseListener, MouseMotionListener, FocusListener, KeyListener, MouseWheelListener, 
	ComponentListener, ActionListener
{
	public static final double IDEALBOND=1.5; // stylised bond distance (Angstroms)
	
	// ------------------------------------------- data and initialisation -------------------------------------------
	
	protected Molecule mol;
	protected RenderPolicy policy=null;
	
	protected int offsetX=0,offsetY=0; // in pixels
	protected double scale=DrawMolecule.DEFSCALE; // pixels per Angstrom
	// note: pixelX=offsetX+atomX*scale;  pixelY=offsetY-atomY*scale
	//		 atomX=(pixelX-offsetX)/scale; atomY=(offsetY-pixelY)/scale
	protected double[] px=null,py=null,rw=null,rh=null;
	
	protected boolean[] selected=null;
		
	protected static final int UNDO_LEVELS=10;
	protected class EditState
	{
		Molecule mol;
		boolean[] selected;
	}
	protected EditState[] undo=null,redo=null;
		
	private int trackX=-1,trackY=-1,dragX=-1,dragY=-1,trackAB=0;
	private boolean trackDragging=false;
	
	// construction
		
	protected CanvasMolecule()
	{
		setLayout(null);
		mol=new Molecule();
	
		addMouseListener(this);
		addMouseMotionListener(this);
		addMouseWheelListener(this);
		addComponentListener(this);
		addKeyListener(this);
	}
	
	// ------------------------------------------- access to data -------------------------------------------
	
	public boolean isEmpty() {return mol.numAtoms()==0;}
	
	// obtain underlying molecule: shallow copy and deep copy versions
	public Molecule molData() {return mol;}
	public Molecule getMolecule() {return mol.clone();}
	
	// unit operation equivalent to deleting all atoms
	public void clear()
	{
		cacheUndo();
		
		mol=new Molecule();
		clearTemporary();
		repaint();
		
		checkDirtiness();
	}

	// override the underlying molecule; note that the 'replace' function takes ownership of the molecule
	public void replace(Molecule newmol) {replace(newmol,false,true);}
	public void replace(Molecule newmol,boolean clearSelection) {replace(newmol,clearSelection,true);}
	public void replace(Molecule newmol,boolean clearSelection,boolean doRepaint) 
	{
		if (mol.numAtoms()!=newmol.numAtoms()) clearSelection=true;
		mol=newmol;
		clearTemporary(clearSelection);
		if (doRepaint) repaint();
	}
	
	// a more externally-friendly way to modify data, which caches an undo level, and makes a deep copy
	public void setMolecule(Molecule newmol) 
	{
		cacheUndo();
		replace(newmol.clone(),false,true);
		checkDirtiness();
	}
	
	public int countSelected() 
	{
		int num=0;
		if (selected!=null) for (int n=0;n<selected.length;n++) if (selected[n]) num++;
		return num;
	}
	public int[] selectedIndices() 
	{
		int[] selidx=new int[countSelected()];
		if (selected!=null) for (int n=0,p=0;n<selected.length;n++) if (selected[n]) selidx[p++]=n+1;
		return selidx;
	}
	public boolean[] selectedMask() 
	{
		boolean[] selmask=new boolean[mol.numAtoms()];
		Arrays.fill(selmask,false);
		if (selected!=null) for (int n=0;n<selected.length;n++) selmask[n]=selected[n];
		return selmask;
	}
	public void clearSelection()
	{
		if (countSelected()==0) return;
		selected=null;
		repaint();
	}
	public void selectAll() 
	{
		selected=new boolean[mol.numAtoms()];
		Arrays.fill(selected,true);
		repaint();
	}
	public boolean isAtomSelected(int N) {return selected==null || N>selected.length ? false : selected[N-1];}
	public void setAtomSelected(int N,boolean sel)
	{
		if (selected==null || selected.length!=mol.numAtoms()) {selected=new boolean[mol.numAtoms()]; Arrays.fill(selected,false);}
		selected[N-1]=sel;
		repaint();
	}
	public void setAtomSelectedMask(boolean[] mask)
	{
		selected=new boolean[mol.numAtoms()];
		for (int n=0;n<selected.length;n++) selected[n]=mask[n];
		repaint();
	}
	public void setBondSelected(int N,boolean sel)
	{
		setAtomSelected(mol.bondFrom(N),sel);
		setAtomSelected(mol.bondTo(N),sel);
	}
	
	// should be called before any unit operation is conducted; the current molecule state is stored in the undo buffer
	public void cacheUndo()
	{
		if ((undo==null || undo[0]==null) && mol.numAtoms()==0) return; // when fresh, do not add a blank state
		if (undo!=null && undo[0]!=null && undo[0].mol.compareTo(mol)==0) return; // identical to previous, so do not cache
	
		if (undo==null) undo=new EditState[UNDO_LEVELS];
		redo=null;
		for (int n=UNDO_LEVELS-1;n>0;n--) undo[n]=undo[n-1];
		undo[0]=new EditState();
		undo[0].mol=mol==null ? null : mol.clone();
		undo[0].selected=selected==null ? null : selected.clone();
	}
	
	// empty out the undo/redo buffers
	public void purgeUndo()
	{
		for (int n=0;n<UNDO_LEVELS;n++) 
		{
			if (undo!=null) undo[n]=null; 
			if (redo!=null) redo[n]=null;
		}
	}
	
	// whether or not there is anything in the undo/redo stacks
	public boolean canUndo() {return undo!=null && undo[0]!=null;}
	public boolean canRedo() {return redo!=null && redo[0]!=null;}
	
	// cause the actual undo/redo to happen
	public void undo()
	{
		if (!canUndo()) return;
		
		if (redo==null) redo=new EditState[UNDO_LEVELS];
		for (int n=UNDO_LEVELS-1;n>0;n--) redo[n]=redo[n-1];
		redo[0]=new EditState();
		redo[0].mol=mol;
		redo[0].selected=selected;
		
		mol=undo[0].mol;
		selected=undo[0].selected;
		for (int n=0;n<UNDO_LEVELS-1;n++) undo[n]=undo[n+1];
		clearTemporary(false);
		repaint();
		
		checkDirtiness();
	}
	public void redo()
	{
		if (!canRedo()) return;
		
		if (undo==null) undo=new EditState[UNDO_LEVELS];
		for (int n=UNDO_LEVELS-1;n>0;n--) undo[n]=undo[n-1];
		undo[0]=new EditState();
		undo[0].mol=mol;
		undo[0].selected=selected;
		
		mol=redo[0].mol;
		selected=redo[0].selected;
		for (int n=0;n<UNDO_LEVELS-1;n++) redo[n]=redo[n+1];
		
		clearTemporary(false);
		repaint();
		
		checkDirtiness();
	}

	// call this method when the molecule has been changed
	protected void postUpdate() {postUpdate(true);}
	protected void postUpdate(boolean zapSelection)
	{
		clearTemporary(zapSelection);
		repaint();
		checkDirtiness();
	}

//	// call this function to cause the editor to become a receptacle for dragged molecules
//	public void enableDnD() 
//	{
//		// requires features from Java 1.6 to work
//		if (Util.javaVersion()>=6)
//		{
//			setTransferHandler(new TransferMolecule());
//		}
//	}
	
	// ------------------------------------------- access to appearance -------------------------------------------

	// change the magnification, and adjust scrollbars etc accordingly
	public void zoomFull() 
	{
		scaleToFit();
		repaint();
	}
	public void zoom(double mag,int cx,int cy)
	{
		int w=getWidth(),h=getHeight(); //,mw=w/2,mh=h/2;
		double scaleLimit=Math.min(Math.min(w/(highX()-lowX()),h/(highY()-lowY())),DrawMolecule.DEFSCALE);
		scaleLimit*=1.0/1.5; // we can go a bit further...
		
		double ax=xToAng(cx),ay=yToAng(cy);
		scale=Math.max(scaleLimit,scale*mag);
		offsetX=(int)(cx-ax*scale);
		offsetY=(int)(cy+ay*scale);
		
		repaint();
	}
	public void zoom(double mag) {zoom(mag,getWidth()/2,getHeight()/2);}
	public void zoomIn(double mag) {zoom(mag);}
	public void zoomOut(double mag) {zoom(1/mag);}
	
	// fits the molecule on the screen and centres everything; very pleasant thing to have at certain junctures, but not too often
	public void scaleToFit() {scaleToFit(DrawMolecule.DEFSCALE);}
	public void scaleToFit(double MaxScale)
	{
		clearTemporary(false);

		double x1=lowX(),y1=lowY(),x2=highX(),y2=highY();

		int w=getWidth(),h=getHeight();
		double sw=w/(x2-x1),sh=h/(y2-y1);
		scale=Math.min(Math.min(sw,sh),MaxScale);
		offsetX=(int)(0.5*w-scale*0.5*(x1+x2));
		offsetY=(int)(0.5*h+scale*0.5*(y1+y2));
	}
	

	// ------------------------------------------- rendering -------------------------------------------

	// painting: subclasses should not implement this method; instead they should implement renderMolecule(..) to make sure the
	// drawing options are setup, and precedePaint(..) & finishPaint(..) to decorate with any other wotnots
	protected void paintComponent(Graphics gr) 
	{
		int width=getWidth(),height=getHeight();
		
		gr.setColor(getBackground());
		gr.fillRect(0,0,width,height);

		Graphics2D g=(Graphics2D)gr;
		precedePaint(g);
		
		// (!! ??) Graphics2D g=(Graphics2D)gr.create(0,0,width,height);
		g.setRenderingHint(RenderingHints.KEY_ANTIALIASING,RenderingHints.VALUE_ANTIALIAS_ON);
    	g.setRenderingHint(RenderingHints.KEY_STROKE_CONTROL,RenderingHints.VALUE_STROKE_PURE);
		DrawMolecule draw=new DrawMolecule(mol,g,scale);
		
		draw.setBackground(getBackground());
		draw.setOffset(offsetX,offsetY);
		
		renderMolecule(draw);
		
		draw.draw();

		// fetch some of the calculated properties, which are used for the editing progress
		ArrangeMolecule arrmol=draw.arrangement();
		px=new double[mol.numAtoms()];
		py=new double[mol.numAtoms()];
		rw=new double[mol.numAtoms()];
		rh=new double[mol.numAtoms()];
		for (int n=0;n<mol.numAtoms();n++)
		{
			px[n]=arrmol.pointCX(n);
			py[n]=arrmol.pointCY(n);
			rw[n]=Math.max(arrmol.pointRW(n),5);
			rh[n]=Math.max(arrmol.pointRH(n),5);
		}
	
		finishPaint(g);
	}

	// these are adjuncts to the paintComponent(..) method, and do nothing by default; subclasses should almost definitely override
	// renderMolecule(..) for finer configuration; finishPaint(..) is used to add anything which isn't done by the DrawMolecule
	// class, and precedePaint(..) is for drawing any kind of background underlay prior to molecule rendering
	protected void renderMolecule(DrawMolecule draw) {}
	protected void precedePaint(Graphics2D g) {}
	protected void finishPaint(Graphics2D g) {}

	// ------------------------------------------- events -------------------------------------------

	// NOTE: subclasses should not add themselves as listeners; rather they should override these events as necessary, and be
	// sure to call the superclass method

	public void mouseClicked(MouseEvent e) 
	{
	}
	
	public void mouseEntered(MouseEvent e) 
	{
	}
	
	public void mouseExited(MouseEvent e) 
	{
	}
	
	public void mousePressed(MouseEvent e)
	{
		trackX=dragX=e.getX();
		trackY=dragY=e.getY();
	}
	
	public void mouseReleased(MouseEvent e)
	{
		if (trackDragging)
		{
			dragComplete(e,dragX,dragY);
			trackDragging=false;
		}
	}
	
	public void mouseMoved(MouseEvent e)
	{
		int newAB=0;
		if (trackX<0 || trackY<0) {trackX=e.getX(); trackY=e.getY();}
		else 
		{
			newAB=pickAtom(e.getX(),e.getY()); 
			if (newAB==0) newAB=-pickBond(e.getX(),e.getY());
		}
		int dx=e.getX()-trackX,dy=e.getY()-trackY;
		if (dx!=0 || dy!=0) trackMotion(e,dx,dy,trackAB,newAB);
		
		trackAB=newAB;
		trackX=e.getX();
		trackY=e.getY();
	}
	
	public void mouseDragged(MouseEvent e)
	{
		int dx=e.getX()-trackX,dy=e.getY()-trackY;
		if (dx!=0 || dy!=0) dragMotion(e,e.getX()-trackX,e.getY()-trackY,dragX,dragY);
		
		trackDragging=true;
		trackX=e.getX();
		trackY=e.getY();
	}
	
	public void mouseWheelMoved(MouseWheelEvent e)
	{
	}
	
	public void focusGained(FocusEvent e) {}
	public void focusLost(FocusEvent e)
	{
	}
	public void keyPressed(KeyEvent e) {}
	public void keyReleased(KeyEvent e) {}
	public void keyTyped(KeyEvent e) 
	{
	}

	public void componentHidden(ComponentEvent e) {}
	public void componentMoved(ComponentEvent e) {}
	public void componentResized(ComponentEvent e) {}
	public void componentShown(ComponentEvent e) {}
	
	public void actionPerformed(ActionEvent e)
	{
	}

	// convenient overridables: these versions provide added value over the normal listener event methods

	// derivative of mouse motion: (dx,dy) is relative to the last motion event; oldAB & newAB refer to the atom or bond under
	// the mouse pointer (+ve for atoms, -ve is for bonds, 0 for nothing)
	protected void trackMotion(MouseEvent e,int dx,int dy,int oldAB,int newAB)
	{
	}

	// derivative of dragging motion: supplies the initial position where the mouse was clicked, and the distance moved since the
	// last such event
	protected void dragMotion(MouseEvent e,int dx,int dy,int ix,int iy)
	{
	}
	
	// derivative of mouse button release function, except only called at the completion of a drag event; helpfully supplies the
	// position where the dragging began
	protected void dragComplete(MouseEvent e,int ix,int iy)
	{
	}

	// ------------------------------------------- general usefulness -------------------------------------------

	// translation of screen & molecule coordinates    
	public double pixPerAng() {return scale;}
	public double angToX(double AX) {return offsetX+AX*scale;}
	public double angToY(double AY) {return offsetY-AY*scale;}
	public double xToAng(double PX) {return (PX-offsetX)/scale;}
	public double yToAng(double PY) {return (offsetY-PY)/scale;}
	
	// returns suitable boundaries for the molecule, in Angstroms; this determines how the molecule fits on the screen, when
	// scaled to the maximum extent; subclass to add space along any edge
	protected double lowX() {return mol.minX()-1;}
	protected double highX() {return mol.maxX()+1;}
	protected double lowY() {return mol.minY()-1;}
	protected double highY() {return mol.maxY()+1;}
	
	// checks to see whether the current molecule is the same as the last saved state, and react accordingly
	// NOTE: subclasses provide any relevant functionality
	protected void checkDirtiness()
	{
	}
	
	// return the atom underneath the given position, in screen coordinates; assumes that the appropriate arrays of size and position
	// have been filled out
	public int pickAtom(int X,int Y)
	{
		if (px==null || py==null) return 0; //DefinePositions()...?;
		
		for (int n=1;n<=mol.numAtoms();n++) 
		{
			double dx=X-px[n-1],dy=Y-py[n-1];
			if (Math.abs(dx)<=rw[n-1] && Math.abs(dy)<=rh[n-1])
				if (dx*dx/(rw[n-1]*rw[n-1])+dy*dy/(rh[n-1]*rh[n-1])<=1) {return n;}
		}
		return 0;
	}
	
	// returns the bond underneath the screen position
	public int pickBond(int X,int Y)
	{
		if (px==null || py==null) return 0;
	
		for (int n=1;n<=mol.numBonds();n++)
		{
			double x1=px[mol.bondFrom(n)-1],y1=py[mol.bondFrom(n)-1],x2=px[mol.bondTo(n)-1],y2=py[mol.bondTo(n)-1];

			double nx1=x1,ny1=y1,nx2=x2,ny2=y2;
			int delta=Math.max(2,(int)(scale/20));
			if (nx1>nx2) {nx1=x2; nx2=x1;}
			if (ny1>ny2) {ny1=y2; ny2=y1;}
			if (X<nx1-2*delta || X>nx2+2*delta || Y<ny1-2*delta || Y>ny2+2*delta) continue;

			double dx=x2-x1,dy=y2-y1,d;
			if (Math.abs(dx)>Math.abs(dy)) d=Y-y1-(X-x1)*dy/dx; else d=X-x1-(Y-y1)*dx/dy;
			if (Math.abs(d)>(2+mol.bondOrder(n))*delta) continue;
			return n;
		}
		return 0;
	}
	
	// ------------------------------------------- private methods -------------------------------------------
		
	// erases some of the datastructures used for caching the drawing elements
	protected void clearTemporary() {clearTemporary(true);}
	protected void clearTemporary(boolean andSelected)
	{
		px=py=rw=rh=null;
		if (andSelected) selected=null; 
		else if (selected!=null && selected.length!=mol.numAtoms())
		{
			boolean newSelected[]=new boolean[mol.numAtoms()];
			for (int n=0;n<selected.length;n++) newSelected[n]=selected[n];
			selected=newSelected;
		}
		trackAB=0;
	}
}
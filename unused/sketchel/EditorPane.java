/*
	Sketch Elements: Chemistry molecular diagram drawing tool.
	
	(c) 2005-2013 Dr. Alex M. Clark, all rights reserved
	
	Released as GNUware, under the Gnu Public License (GPL)
	
	See www.gnu.org for details.
*/

package org.sketchel;

import java.awt.Color;
import java.awt.Cursor;
import java.awt.Dimension;
import java.awt.Graphics2D;
import java.awt.Rectangle;
import java.awt.event.ComponentEvent;
import java.awt.event.FocusEvent;
import java.awt.event.KeyEvent;
import java.awt.event.MouseEvent;
import java.awt.event.MouseWheelEvent;
import java.util.ArrayList;

import javax.swing.JTextField;
import javax.swing.event.CaretEvent;
import javax.swing.event.CaretListener;

/*
	Custom widget for editing a molecular structure, with implementation of the tools used by SketchEl.
*/

public class EditorPane extends CanvasMolecule implements CaretListener
{
	private boolean editable=true,hasBorder=false,autoScale=false,firstScale=false;

	private static final int TOOL_CURSOR=1;
	private static final int TOOL_PAN=2;
	private static final int TOOL_ROTATOR=3;
	private static final int TOOL_ERASOR=4;
	private static final int TOOL_ATOM=5;
	private static final int TOOL_BOND=6;
	private static final int TOOL_CHARGE=7;
	private static final int TOOL_TEMPLATE=8;
	
	private static final int DRAG_SELECT=1;
	private static final int DRAG_MOVE=2;
	private static final int DRAG_COPY=3;
	private static final int DRAG_SCALE=4;
	private static final int DRAG_ROTATE=5;
	private static final int DRAG_PAN=6;
	
	private boolean[] dragged=null;
	private int highlightAtom=0,highlightBond=0;
	
	private int showMode=ArrangeMolecule.SHOW_ELEMENTS;
	private boolean showHydr=true,showSter=false,showExtra=false;
	
	private int trackX=-1,trackY=-1; // last seen position of mouse
	
	private boolean isSelectionPane=false; // false=is for editing; true=is for viewing and selecting only
	
	private MolSelectListener selectListen=null;
		
	private int tool=0;
	private int toolDragReason=0;
	private double toolDragX1,toolDragY1,toolDragX2,toolDragY2;
	private String toolAtomType=null;
	private boolean toolAtomDrag,toolAtomSnap;
	private int toolAtomEditSel=0,toolAtomEditX,toolAtomEditY;
	private JTextField toolAtomEditBox=null;

	private int toolBondOrder=0,toolBondType=0,toolBondFrom=0,toolBondHit=0;
	private double toolBondFromX=0,toolBondFromY=0,toolBondToX=0,toolBondToY=0;
	private boolean toolSnap,toolBondDrag=false;
	
	private int toolCharge=0;
	
	private Molecule template=null,templDraw=null;
	private int templateIdx=0;
	
	private Molecule lastCleanMol=null;
	private boolean lastDirty=false;
	
	// ------------------ public methods --------------------

	// Constructor for fully-fledged interactive editing panes.
	public EditorPane() 
	{
		super();
		
		setPreferredSize(new Dimension(500,500));
	}

	// Constructor for "selection only" editor panes.
	public EditorPane(int width,int height) 
	{
		super();
		
		isSelectionPane=true; 
		setPreferredSize(new Dimension(width,height));
		setSize(new Dimension(width,height));
	}
	
	// override: an opportunity to inform the parent that something has changed
	public void replace(Molecule Mol,boolean ClearSelection,boolean Repaint) 
	{
		super.replace(Mol,ClearSelection,Repaint);
		if (selectListen!=null) selectListen.reviewMenuState();
	}
	
	// set which object, if any, gets a response when an atom is "selected" with a mouse click
	public void setMolSelectListener(MolSelectListener listen) {selectListen=listen;}
	
	// by default the editor pane captures lots of events and allows much editor; this function can be used to turn it off
	public void setEditable(boolean Editable) {editable=Editable;}
	
	// if true, will draw a border around the edge
	public void setBorder(boolean HasBorder) {hasBorder=HasBorder;}

	// if true, every time the size changes, the molecule will scale-to-fit    
	public void setAutoScale(boolean AutoScale) {autoScale=AutoScale;}

	// gets or sets the rendering policy to be used for drawing the molecules
	public RenderPolicy renderPolicy() {return policy;}
	public void setRenderPolicy(RenderPolicy policy)
	{
		this.policy=policy;
		repaint();
	}

	// informs the editor that the current state has been synchronised with what is in a disk file, or something equivalent
	public void notifySaved()
	{
		lastCleanMol=mol.clone();
		lastDirty=false;
		if (selectListen!=null) selectListen.dirtyChanged(false);
	}
	
	// dirty==true when there have been some changes since the last modification
	public boolean isDirty() {return lastDirty;}
	
	// checks to see whether the current molecule is the same as the last saved state; notifies if different; note that this is done by
	// an actual molecule comparison, which makes tracking changes a lot simpler, and also a {do something/restore it somehow} sequence
	// is functionally equivalent to undo, which is nice
	protected void checkDirtiness()
	{
		super.checkDirtiness();
	
		boolean nowDirty=mol.compareTo(lastCleanMol)!=0;
		
		if (nowDirty!=lastDirty)
		{
			if (selectListen!=null) selectListen.dirtyChanged(nowDirty);
			lastDirty=nowDirty;
		}
		
		if (selectListen!=null) selectListen.reviewMenuState();
	}
		
	// affect the way the molecule is rendered
	public int getShowMode() {return showMode;}
	public void setShowMode(int ShowMode)
	{
		if (showMode==ShowMode) return;
		showMode=ShowMode;
		repaint();
	}
	
	public boolean getShowHydrogens() {return showHydr;}
	public void setShowHydrogens(boolean ShowHydr)
	{
		if (showHydr==ShowHydr) return;
		showHydr=ShowHydr;
		repaint();
	}
	
	public boolean getShowStereoLabels() {return showSter;}
	public void setShowStereoLabels(boolean ShowSter)
	{
		if (showSter==ShowSter) return;
		showSter=ShowSter;
		repaint();
	}
	
	public boolean getShowExtra() {return showExtra;}
	public void setShowExtra(boolean ShowExtra)
	{
		if (showExtra==ShowExtra) return;
		showExtra=ShowExtra;
		repaint();
	}
	
	// notify selection of various tools
	public void setToolCursor() 
	{
		tool=TOOL_CURSOR;
		completeAtomEdit();
		setCursor(regularToolCursor());
		repaint();
	}
	public void setToolPan()
	{
		tool=TOOL_PAN;
		completeAtomEdit();
		setCursor(regularToolCursor());
		repaint();
	}
	public void setToolRotator()
	{
		tool=TOOL_ROTATOR;
		completeAtomEdit();
		setCursor(regularToolCursor());
		repaint();
	}
	public void setToolErasor() 
	{
		tool=TOOL_ERASOR;
		completeAtomEdit();
		setCursor(regularToolCursor());
		repaint();
	}
	public void setToolAtom(String Atom) 
	{
		tool=TOOL_ATOM;
		toolAtomType=Atom;
		toolAtomDrag=false;
		toolAtomSnap=false;
		toolBondFrom=0;
		toolBondToX=0;
		toolBondToY=0;
		completeAtomEdit();
		setCursor(regularToolCursor());
		repaint();
	}
	public void setToolBond(int Order,int Type)
	{
		tool=TOOL_BOND;
		toolBondFrom=0;
		toolBondOrder=Order;
		toolBondType=Type;
		completeAtomEdit();
		setCursor(regularToolCursor());
		repaint();
	}
	public void setToolCharge(int DChg)
	{
		tool=TOOL_CHARGE;
		toolCharge=DChg;
		completeAtomEdit();
		setCursor(regularToolCursor());
	}
	public void setToolTemplate(Molecule Templ,int Idx)
	{
		tool=TOOL_TEMPLATE;
		template=Templ;
		templateIdx=Idx;
		completeAtomEdit();
		setCursor(regularToolCursor());
		repaint();
	}
		
	// shift the visible offset in the indicated direction
	public void panDisplay(int dx,int dy)
	{
		if (dx==0 && dy==0) return;
		offsetX+=dx;
		offsetY+=dy;
		
		completeAtomEdit();
		postUpdate(false);
	}
	
	// select just one atom
	public void selectAtom(int N)
	{
		selected=new boolean[mol.numAtoms()];
		for (int n=0;n<mol.numAtoms();n++) selected[n]=(n+1)==N;
		repaint();
	}
	
	// select just the connected component which contains the indicated atom
	public void selectGroup(int N)
	{
		selected=new boolean[mol.numAtoms()];
		for (int n=1;n<=mol.numAtoms();n++) selected[n-1]=mol.atomConnComp(n)==mol.atomConnComp(N);
		repaint();
	}
	
	// returns array of atoms which are presently selected, OR everything if none
	public ArrayList<Integer> selectedListSet()
	{
		ArrayList<Integer> selidx=new ArrayList<Integer>();
		if (selected!=null) for (int n=0;n<mol.numAtoms();n++) if (selected[n]) selidx.add(n+1);
		if (selidx.size()==0) for (int n=1;n<=mol.numAtoms();n++) selidx.add(n);
		return selidx;
	}
	
	// returns an array which is similar to the 'selected' member, except that if null or all unselected, returns an array
	// of all true
	public boolean[] selectedMaskSet()
	{
		boolean[] ret=selected==null ? new boolean[mol.numAtoms()] : (boolean[])selected.clone();
		int numSel=0;
		if (selected!=null) for (int n=0;n<mol.numAtoms();n++) if (selected[n]) numSel++;
		if (numSel==0) for (int n=0;n<mol.numAtoms();n++) ret[n]=true;
		return ret;
	}
	
	// returns a subgraph of the molecule corresponding to selected atoms - or if none, the whole thing
	public Molecule selectedSubgraph()
	{
		if (selected==null) return mol.clone();
		int sum=0;
		for (int n=0;n<mol.numAtoms();n++) if (selected[n]) sum++;
		if (sum==0) return mol.clone();

		return mol.subgraph(selected);
	}
	
	// deletes specific entities
	public void deleteAtom(int N)
	{
		cacheUndo();
		mol.deleteAtomAndBonds(N);
		postUpdate();
	}
	public void deleteBond(int N)
	{
		cacheUndo();
		mol.deleteBond(N);
		postUpdate();
	}
	
	// deletes selected atoms, or all atoms if none selected
	public void deleteSelected()
	{
		cacheUndo();

		boolean anySelected=false;
		if (selected!=null) for (int n=0;n<mol.numAtoms();n++) if (selected[n]) {anySelected=true; break;}
		if (!anySelected) return;

		for (int n=mol.numAtoms()-1;n>=0;n--) if (selected[n]) mol.deleteAtomAndBonds(n+1);

		postUpdate();
	}
	
	// switch between explicit/implicit modes; going to explicit marks current calculated value as absolute;
	// if the idx parameter is non-0, then this is the atom index to process; otherwise, the selected atoms, or all, are applied
	public void hydrogenSetExplicit(boolean isExpl,int idx) {hydrogenSetExplicit(isExpl,idx,Molecule.HEXPLICIT_UNKNOWN);}
	public void hydrogenSetExplicit(boolean isExpl,int idx,int numExpl)
	{
		cacheUndo();

		ArrayList<Integer> sel=idx==0 ? selectedListSet() : new ArrayList<Integer>();
		if (idx!=0) sel.add(idx);
		
		for (int n=0;n<sel.size();n++) 
		{
			int i=sel.get(n).intValue();
			if (isExpl) mol.setAtomHExplicit(i,mol.atomHydrogens(i)); else mol.setAtomHExplicit(i,numExpl);
		}
		repaint();

		checkDirtiness();
	}
	
	// any hydrogens which are implicit or explicit are actually created as nodes in the molecular graph; the explicit value of each
	// parent is set to unknown; the idx parameter should be 0 to use the selected/all indices, or nonzero for a specific atom
	public void hydrogenCreateActual(int idx)
	{
		cacheUndo();

		ArrayList<Integer> sel=idx==0 ? selectedListSet() : new ArrayList<Integer>();
		if (idx!=0) sel.add(idx);
		
		ToolChest.hydrogenCreateActual(mol,sel);
		
		postUpdate();
	}
	
	// of all the selected atoms and their neighbours, removes any which are element H;  the idx parameter should be 0 to use the 
	// selected/all indices, or nonzero for a specific atom
	public void hydrogenDeleteActual(int idx)
	{
		cacheUndo();
	
		ArrayList<Integer> sel=idx==0 ? selectedListSet() : new ArrayList<Integer>();
		if (idx!=0) sel.add(idx);
		
		ToolChest.hydrogenDeleteActual(mol,sel);
		
	
		postUpdate();
	}
	
	// scale bond lengths to reasonable values (note: affects all atoms, selected or not)
	public void normaliseBondLengths()
	{
		if (mol.numBonds()==0) return;
	
		cacheUndo();
		ToolChest.normaliseBondLengths(mol);
	
		postUpdate();
	}
	
	// select next/prev atoms or connected components
	public void cycleSelection(boolean Forward,boolean Group)
	{
		if (mol.numAtoms()<=1) return;
		
		int high=0;
		if (selected!=null) for (int n=1;n<=mol.numAtoms();n++) if (selected[n-1])
		{
			if (Group) {if (mol.atomConnComp(n)>high) high=mol.atomConnComp(n);}
			else {high=n;}
		}
		int max=Group ? 0 : mol.numAtoms();
		if (Group) for (int n=1;n<=mol.numAtoms();n++) if (mol.atomConnComp(n)>max) max=mol.atomConnComp(n);
		
		int pos=Forward ? high+1 : high-1;
		if (pos<1) pos=max;
		if (pos>max) pos=1;
		
		selected=new boolean[mol.numAtoms()];
		for (int n=1;n<=mol.numAtoms();n++)
		{
			if (Group) {selected[n-1]=mol.atomConnComp(n)==pos;}
			else {selected[n-1]=n==pos;}
		}
		
		postUpdate(false);
	}
	
	// move selected atoms by a small translation
	public void nudgeSelectedAtoms(double DX,double DY)
	{
		if (selected==null) return;
		cacheUndo();	
		for (int n=1;n<=mol.numAtoms();n++) if (selected[n-1]) mol.setAtomPos(n,mol.atomX(n)+DX,mol.atomY(n)+DY);

		postUpdate(false);
	}
	
	// selected atoms are inverted about a mirror plane coincident with their centre of gravity
	public void flipSelectedAtoms(boolean isVertical)
	{
		ArrayList<Integer> selidx=selectedListSet();
		if (selidx.size()==0) return;
		
		cacheUndo();
		
		double cx=0,cy=0;
		for (int n=0;n<selidx.size();n++) {cx+=mol.atomX(selidx.get(n)); cy+=mol.atomY(selidx.get(n));}
		cx/=selidx.size(); 
		cy/=selidx.size();

		for (int n=0;n<selidx.size();n++) 
		{
			int p=selidx.get(n);
			if (isVertical) mol.setAtomPos(p,mol.atomX(p),2*cy-mol.atomY(p));
			else mol.setAtomPos(p,2*cx-mol.atomX(p),mol.atomY(p));
		}
		
		postUpdate();
	}
	
	// selected atoms are rotated about their centre of gravity
	public void rotateSelectedAtoms(double degrees)
	{
		ArrayList<Integer> selidx=selectedListSet();
		if (selidx.size()==0) return;
		
		cacheUndo();	

		double cx=0,cy=0;
		for (int n=0;n<selidx.size();n++) {cx+=mol.atomX(selidx.get(n)); cy+=mol.atomY(selidx.get(n));}
		cx/=selidx.size(); 
		cy/=selidx.size();
		
		double radians=degrees*Math.PI/180;
		for (int n=0;n<selidx.size();n++) 
		{
			int p=selidx.get(n);
			double dx=mol.atomX(p)-cx,dy=mol.atomY(p)-cy;
			double dist=Math.sqrt(dx*dx+dy*dy),theta=Math.atan2(dy,dx);
			mol.setAtomPos(p,cx+dist*Math.cos(theta+radians),cy+dist*Math.sin(theta+radians));
		}

		postUpdate();
	}
	
	// for a point defined by the given atom, flips all of the other atoms in that group along the indicated axis
	public void flipGroupAboutAtom(boolean isVertical,int atomIdx)
	{
		cacheUndo();
		ToolChest.flipGroupAboutAtom(mol,isVertical,atomIdx);
		postUpdate(false);
	}
	
	// for a given bond, flips it so that substituents on either side are inverted, for the group belonging to that bond
	public void flipGroupAboutBond(int bondIdx)
	{
		cacheUndo();
		ToolChest.flipGroupAboutBond(mol,bondIdx);
		postUpdate(false);
	}
	
	// given a central point (idx>0 for atom, idx<0 for bond), rotates the rest of the group by the given angle
	public void rotateGroupAboutCentre(int degrees,int idx)
	{
		cacheUndo();
		ToolChest.rotateGroupAboutCentre(mol,degrees,idx);
		postUpdate(false);
	}
	
	// changes stereochemistry; STEREO_UNKNOWN=invert, POS/NEG=set to this; idx==0 for selected/all atoms, >0 for specific atom,
	// <0 for specific bond
	public void setStereo(int operation,int idx)
	{
		ArrayList<Integer> sel=idx==0 ? selectedListSet() : new ArrayList<Integer>();
		if (idx>0) sel.add(idx);
		else if (idx<0)
		{
			sel.add(mol.bondFrom(-idx));
			sel.add(mol.bondTo(-idx));
		}

		cacheUndo();
		ToolChest.setStereo(mol,operation,sel);
		postUpdate(false);
	}
	
	// selected chiral centres lose their wedge bonds; idx==0 for selected/all, >0 for specific atom
	public void removeChiralWedges(int idx)
	{
		cacheUndo();
	
		ArrayList<Integer> sel=idx==0 ? selectedListSet() : new ArrayList<Integer>();
		if (idx!=0) sel.add(idx);
		
		ToolChest.removeChiralWedges(mol,sel);
		postUpdate(false);
	}

	// for any chiral centres, pick the next set of valid wedge bonds; idx==0 for selected/all, >0 for specific atom
	public void cycleChiralWedges(int idx)
	{
		cacheUndo();
	
		ArrayList<Integer> sel=idx==0 ? selectedListSet() : new ArrayList<Integer>();
		if (idx!=0) sel.add(idx);
		
		ToolChest.cycleChiralWedges(mol,sel);
		postUpdate(false);
	}
	
	// ------------------ private methods --------------------

	protected void clearTemporary(boolean andSelected)
	{
		super.clearTemporary(andSelected);
		highlightAtom=highlightBond=0;
	}
	
	private void resetSelected(boolean Clear)
	{
		if (selected==null) selected=new boolean[mol.numAtoms()];
		if (Clear) for (int n=0;n<mol.numAtoms();n++) selected[n]=false;
	}
		
	// snaps the draw-to-position to multiples of 30 degrees
	private void snapToolBond()
	{
		double cx=toolBondFrom>0 ? mol.atomX(toolBondFrom) : toolBondFromX;
		double cy=toolBondFrom>0 ? mol.atomY(toolBondFrom) : toolBondFromY;
		double dx=toolBondToX-cx,dy=toolBondToY-cy;
		double th=Math.atan2(dy,dx)*180/Math.PI,ext=Math.sqrt(dx*dx+dy*dy);
		th=(Math.round(th/30)*30)*Math.PI/180;
		ext=Math.round(ext/IDEALBOND)*IDEALBOND;
		toolBondToX=cx+ext*Math.cos(th);
		toolBondToY=cy+ext*Math.sin(th);
	}
		
	// called when the element editing widget has ended its lifecycle, and the change is to be applied
	private void completeAtomEdit()
	{
		if (toolAtomEditBox==null) return;
		String el=toolAtomEditBox.getText();
		if (el.length()>0)
		{
			cacheUndo();

			if (el.charAt(0)>='a' && el.charAt(0)<='z' && el.length()<=2)
			{
				for (int n=1;n<Molecule.ELEMENTS.length;n++) if (Molecule.ELEMENTS[n].equalsIgnoreCase(el))
				{
					el=Molecule.ELEMENTS[n];
					break;
				}
			}

			if (toolAtomEditSel==0)
			{
				mol.addAtom(el,xToAng(toolAtomEditX),yToAng(toolAtomEditY));
				clearTemporary();
			}
			else mol.setAtomElement(toolAtomEditSel,el);
		}
		
		toolAtomEditBox.setVisible(false);
		remove(toolAtomEditBox);
		toolAtomEditBox=null;
		
		grabFocus();
		repaint();
		checkDirtiness();
	}
	
	// returns true if there are any selected atoms
	private boolean anySelected()
	{
		if (selected==null) return false;
		for (int n=0;n<mol.numAtoms();n++) if (selected[n]) return true;
		return false;
	}

	private double dragExtendBy(double px,double py)
	{
		double diff=0.2*Math.sqrt(px*px+py*py)/scale;
		if (px<0 && py<0) diff=-diff;
		
		if (diff>=0) return 1+diff;
		else return Math.exp(diff);
	}
	
	// returns the mouse cursor which is appropriate for the current tool, in its resting state
	private Cursor regularToolCursor()
	{
		try
		{
    		Cursor cursor=ToolCursors.get(ToolCursors.CURSOR_POINTER);
    		if (tool==TOOL_PAN) cursor=ToolCursors.get(ToolCursors.CURSOR_PAN);
    		else if (tool==TOOL_ERASOR) cursor=ToolCursors.get(ToolCursors.CURSOR_DELETE);
    		else if (tool==TOOL_ATOM) cursor=ToolCursors.get(ToolCursors.CURSOR_SMALLBOX,toolAtomType,10,10);
    		else if (tool==TOOL_BOND)
    		{
    			if (toolBondType==Molecule.BONDTYPE_INCLINED) cursor=ToolCursors.get(ToolCursors.CURSOR_BONDINCLINED);
    			else if (toolBondType==Molecule.BONDTYPE_DECLINED) cursor=ToolCursors.get(ToolCursors.CURSOR_BONDDECLINED);
    			else if (toolBondType==Molecule.BONDTYPE_UNKNOWN) cursor=ToolCursors.get(ToolCursors.CURSOR_BONDUNKNOWN);
    			else if (toolBondOrder==0) cursor=ToolCursors.get(ToolCursors.CURSOR_BONDZERO);
    			else if (toolBondOrder==1) cursor=ToolCursors.get(ToolCursors.CURSOR_BONDSINGLE);
    			else if (toolBondOrder==2) cursor=ToolCursors.get(ToolCursors.CURSOR_BONDDOUBLE);
    			else if (toolBondOrder==3) cursor=ToolCursors.get(ToolCursors.CURSOR_BONDTRIPLE);
    		}
    		else if (tool==TOOL_CHARGE) cursor=ToolCursors.get(ToolCursors.CURSOR_PLUSMINUS);
    		else if (tool==TOOL_TEMPLATE) cursor=ToolCursors.get(ToolCursors.CURSOR_SMALLCIRCLE);
    		return cursor;
		}
		catch (Exception ex) {ex.printStackTrace(); return null;}
	}
		
	// rotate the current "thing" by the indicated degree, about the given centre (in pixels)
	public void commitRotation(double th,double cx,double cy)
	{
		cacheUndo();
		
		boolean[] mask=selectedMaskSet(); // none --> all
		
		double ax=xToAng(cx),ay=yToAng(cy);
		for (int n=1;n<=mol.numAtoms();n++) if (mask[n-1])
		{
			double rx=mol.atomX(n)-ax,ry=mol.atomY(n)-ay;
			double rth=Math.atan2(ry,rx),ext=Math.sqrt(rx*rx+ry*ry);
			mol.setAtomPos(n,ax+ext*Math.cos(rth+th),ay+ext*Math.sin(rth+th));
		}
		
		postUpdate(false);
	}
	
	// finds a nice place to put the new fragment which does not overlap existing content, then appends the atoms & bonds
	public void addArbitraryFragment(Molecule frag)
	{
		if (frag.numAtoms()==0) return;
	
		cacheUndo();
		
		if (mol.numAtoms()==0) mol=frag.clone();
		else
		{
			int base=mol.numAtoms();
			ToolChest.addArbitraryFragment(mol,frag);
			selected=new boolean[mol.numAtoms()];
			for (int n=0;n<mol.numAtoms();n++) selected[n]=n>=base;
		}
		
		scaleToFit();
		postUpdate(false);
	}
	
	// sticks in a new fragment with the centre of gravity at the indicated position
	public void addFragmentPosition(Molecule frag,int X,int Y)
	{
		if (frag.numAtoms()==0) return;
		
		cacheUndo();
		
		int base=mol.numAtoms();
		ToolChest.addFragmentPosition(mol,frag,xToAng(X),yToAng(Y));
		
		scaleToFit();
		
		selected=new boolean[mol.numAtoms()];
		for (int n=0;n<mol.numAtoms();n++) selected[n]=n>=base;
		
		postUpdate(false);
	}
	

	// ------------------ event methods --------------------
	
	// provide a miscellany of editing data to the drawing class, so that it can represent everything that is going on
	protected void renderMolecule(DrawMolecule draw) 
	{
		super.renderMolecule(draw);
	
		if (policy!=null) draw.setRenderPolicy(policy);
		
		RenderEffects effects=draw.getRenderEffects();
		
		effects.showElements=showMode;
		effects.showHydrogens=showHydr && (showMode==ArrangeMolecule.SHOW_ELEMENTS || showMode==ArrangeMolecule.SHOW_ALL_ELEMENTS);
		effects.showStereo=showSter;
		effects.showExtra=showExtra;
		effects.highlightAtom=highlightAtom;
		effects.highlightBond=highlightBond;
		
		resetSelected(false);
		effects.selected=selected;
		effects.dragged=dragged;

		if ((tool==TOOL_ATOM && toolAtomDrag) || (tool==TOOL_BOND && toolBondFrom>0))
			effects.bondInProgress(toolBondFrom,toolBondToX,toolBondToY,toolBondOrder,toolBondType);
		if (tool==TOOL_ATOM && toolAtomDrag && toolAtomType!=null && toolAtomType.compareTo("C")!=0) 
			effects.atomInProgress(toolAtomType,toolBondToX,toolBondToY);
		if (tool==TOOL_BOND && toolBondFrom==0 && toolBondDrag)
		{
			int i=pickAtom((int)angToX(toolBondToX),(int)angToY(toolBondToY));
			if (i==0 && toolSnap) snapToolBond();
			double x1=toolBondFromX,y1=toolBondFromY,x2=toolBondToX,y2=toolBondToY;
			if (i>0) {x2=mol.atomX(i); y2=mol.atomY(i);} 
			effects.newBondLine(x1,y1,x2,y2);
		}
		if (toolDragReason==DRAG_SELECT)
		{
			effects.dragSelect((int)toolDragX1,(int)toolDragY1,(int)toolDragX2,(int)toolDragY2);
		}
		if ((toolDragReason==DRAG_MOVE || toolDragReason==DRAG_COPY || toolDragReason==DRAG_SCALE) 
			&& (toolDragX1!=toolDragX2 || toolDragY1!=toolDragY2))
		{
			if (toolDragReason==DRAG_SCALE)
			{
				double extmul=dragExtendBy(toolDragX2-toolDragX1,toolDragY2-toolDragY1),cx=0,cy=0;
				int count=0;
				for (int n=1;n<=mol.numAtoms();n++) if (selected[n-1]) {cx+=mol.atomX(n); cy+=mol.atomY(n); count++;}
				cx/=count; cy/=count;
				effects.dragScale(cx,cy,extmul);
			}
			else
			{
				int dx=(int)(toolDragX2-toolDragX1),dy=(int)(toolDragY2-toolDragY1);
				effects.dragMove(dx,dy,toolDragReason==DRAG_COPY);
			}
		}
		if (toolDragReason==DRAG_ROTATE && (Math.abs(toolDragX2-toolDragX1)>5 || Math.abs(toolDragY2-toolDragY1)>5))
		{
			double dx=toolDragX2-toolDragX1,dy=toolDragY2-toolDragY1;
			double th=-Math.atan2(dy,dx)*180/Math.PI;
			if (toolSnap) th=Math.round(th/15)*15;
			
			effects.dragRotate(th,(int)toolDragX1,(int)toolDragY1);
		}
		
		draw.setRenderEffects(effects);
	}
	
	protected void finishPaint(Graphics2D g) 
	{
		if (hasBorder)
		{
			g.setColor(Color.BLACK);
			g.drawRect(0,0,getWidth()-1,getHeight()-1);
		}
		
		if ((tool==TOOL_TEMPLATE && trackX>=0 && trackY>=0))
		{
			if (highlightAtom!=0 && templateIdx>0) 
				templDraw=ToolChest.adjustTemplateByAtom(mol,highlightAtom,template,templateIdx);
			else if (highlightBond!=0 && templateIdx<0) 
				templDraw=ToolChest.adjustTemplateByBond(mol,highlightBond,template,-templateIdx,null);
			else 
				templDraw=ToolChest.adjustTemplateByCoord(template,templateIdx,xToAng(trackX),yToAng(trackY));

			RenderPolicy tpol=policy==null ? new RenderPolicy() : policy.clone();
			tpol.foreground=new Color(64,128,192);
			for (int n=0;n<tpol.atomCols.length;n++) tpol.atomCols[n]=tpol.foreground;
			
			DrawMolecule tdraw=new DrawMolecule(templDraw,g,scale);
			tdraw.setOffset(offsetX,offsetY);
			tdraw.setRenderPolicy(tpol);
			tdraw.draw();
		}
	}
	
	// Mouse events: the callbacks for Clicked, Pressed, Released, Dragged and Moved form a slightly complicated interplay of the
	// various tool events. The 'tool' variable, and its various permitted values, should make most of the behaviour reasonably 
	// self-explanatory; note that many of the tools have multiple functions which may be sprinkled around the various event
	// callbacks.
	
	public void mouseClicked(MouseEvent e)
	{
		super.mouseClicked(e);
	
		if (e.getSource()!=this) return;
		
		if (tool==TOOL_CURSOR && selectListen!=null)
		{
			int i=pickAtom(e.getX(),e.getY());
			if ((e.getModifiers()&MouseEvent.CTRL_MASK)>0 && i>0 && editable) // select connected component
			{
				if ((e.getModifiers()&MouseEvent.SHIFT_MASK)==0 && selected!=null) for (int n=0;n<mol.numAtoms();n++) selected[n]=false;
				if (selected==null) selected=new boolean[mol.numAtoms()];
				int cc=mol.atomConnComp(i);
				for (int n=1;n<=mol.numAtoms();n++) if (mol.atomConnComp(n)==cc) selected[n-1]=true;
				repaint();
			}
			else if (i>0) selectListen.molSelected(this,i,e.getClickCount()>1); // notify of atom selection
			else // notify of bond (or nothing) selection
			{
				i=pickBond(e.getX(),e.getY());
				/*if (i>0)*/ selectListen.molSelected(this,-i,e.getClickCount()>1); 
				// (0==clicked in general area)
			}
		}
		else if (tool==TOOL_ROTATOR) // deselect
		{
			selected=null;
			postUpdate();
		}
		else if (tool==TOOL_ERASOR) // delete something, be it atom or bond
		{
			int i=pickAtom(e.getX(),e.getY());
			if (i>0) 
			{
				cacheUndo();
				mol.deleteAtomAndBonds(i);
			}
			else
			{
				cacheUndo();
				i=pickBond(e.getX(),e.getY());
				if (i>0) mol.deleteBond(i);
			}
			if (i>0)
			{
				postUpdate();
			}
		}
		else if (tool==TOOL_ATOM && e.getButton()==MouseEvent.BUTTON1 && !toolAtomDrag)
		{
			if (toolAtomEditBox!=null) 
			{
				completeAtomEdit();
				return;
			}
		
			if (toolAtomType!=null)  // add new atom, or change element label
			{
				int i=pickAtom(e.getX(),e.getY());
				cacheUndo();
				if (i==0) 
				{
					mol.addAtom(toolAtomType,xToAng(e.getX()),yToAng(e.getY()));
				}
				else mol.setAtomElement(i,toolAtomType);
				postUpdate();
			} 
			else // setup new editing box for element
			{
				toolAtomEditX=e.getX(); toolAtomEditY=e.getY();
				toolAtomEditSel=pickAtom(toolAtomEditX,toolAtomEditY);
				if (toolAtomEditSel==0 && pickBond(e.getX(),e.getY())>0) return;
				
				toolAtomEditBox=new JTextField("XX");
				Dimension sz=toolAtomEditBox.getPreferredSize();
				toolAtomEditBox.setText(toolAtomEditSel>0 ? mol.atomElement(toolAtomEditSel) : "");
				add(toolAtomEditBox);
				toolAtomEditBox.addFocusListener(this);
				toolAtomEditBox.addKeyListener(this);
				toolAtomEditBox.addCaretListener(this);
				toolAtomEditBox.setLocation(toolAtomEditX-sz.width/2,toolAtomEditY-sz.height/2);
				toolAtomEditBox.setSize(sz);
				toolAtomEditBox.setVisible(true);
				toolAtomEditBox.setSelectionStart(0);
				toolAtomEditBox.setSelectionEnd(toolAtomEditBox.getText().length());
				toolAtomEditBox.grabFocus();
			}
		}
		else if (tool==TOOL_TEMPLATE && e.getButton()==MouseEvent.BUTTON2) // flip the template, horizontal or vertical
		{
			boolean vertical=e.isShiftDown();
			for (int n=1;n<=template.numAtoms();n++) 
				template.setAtomPos(n,template.atomX(n)*(vertical?1:-1),template.atomY(n)*(vertical?-1:1));
			templDraw=template.clone();
			repaint();
		}		

		checkDirtiness();
	}
	
	public void mouseEntered(MouseEvent e) 
	{
		super.mouseEntered(e);
		
		// entering the scrollbar region is the same as exiting the main region
		if (e.getSource()!=this) 
		{
			if (highlightAtom!=0 || highlightBond!=0)
			{
				highlightAtom=0;
				highlightBond=0;
				repaint();
			}
			return;
		}
	
		boolean redraw=false;
		if (tool==TOOL_TEMPLATE && (trackX!=e.getX() || trackY!=e.getY())) redraw=true;
		trackX=e.getX(); trackY=e.getY();
		if (redraw) repaint();
		
		setCursor(regularToolCursor());
	}
	
	public void mouseExited(MouseEvent e) 
	{
		super.mouseExited(e);
		
		if (e.getSource()!=this) return;

		boolean redraw=false;
		if (tool==TOOL_TEMPLATE && (trackX!=e.getX() || trackY!=e.getY())) redraw=true;
		trackX=-1; trackY=-1;
		if (redraw) repaint();

		setCursor(ToolCursors.get(ToolCursors.CURSOR_POINTER));
	}

	public void mousePressed(MouseEvent e)
	{
		super.mousePressed(e);

		if (e.getSource()!=this) return;

		grabFocus();

		Cursor cursor=regularToolCursor();

		if ((tool==TOOL_CURSOR || (tool==TOOL_ROTATOR && !anySelected())) && e.getButton()==MouseEvent.BUTTON1 && editable)
		{ // consider initiating a drag of the select, or translate position variety
			highlightAtom=highlightBond=0;
			boolean shift=(e.getModifiers()&MouseEvent.SHIFT_MASK)>0;
			boolean ctrl=(e.getModifiers()&MouseEvent.CTRL_MASK)>0;
			boolean alt=(e.getModifiers()&MouseEvent.ALT_MASK)>0;
			boolean anySelected=countSelected()>0;
			if (tool==TOOL_ROTATOR) {shift=false; ctrl=false; alt=false;} // can only select with rotator
			if (!ctrl && !alt)
			{
				resetSelected(!shift);
				int atom=pickAtom(e.getX(),e.getY());
				if (atom>0) selected[atom-1]=!selected[atom-1];
				else toolDragReason=DRAG_SELECT;
			}
			else if (!shift && ctrl && !alt && anySelected) toolDragReason=DRAG_COPY;
			else if (!shift && !ctrl && alt && anySelected) toolDragReason=DRAG_MOVE;
			else if (shift && !ctrl && alt && anySelected) toolDragReason=DRAG_SCALE;

			toolDragX1=toolDragX2=e.getX();
			toolDragY1=toolDragY2=e.getY();
			repaint();
		}
		else if (tool==TOOL_ERASOR && e.getButton()==MouseEvent.BUTTON1) // initiate a drag-rect-delete sequence
		{
			highlightAtom=highlightBond=0;
			resetSelected(true);
			toolDragReason=DRAG_SELECT;
			toolDragX1=toolDragX2=e.getX();
			toolDragY1=toolDragY2=e.getY();
			repaint();
		}
		else if (tool==TOOL_PAN || (editable && e.getButton()==MouseEvent.BUTTON2))
		{
			toolDragReason=DRAG_PAN;
			toolDragX1=e.getX();
			toolDragY1=e.getY();
			cursor=ToolCursors.get(ToolCursors.CURSOR_PAN);
		}
		else if (tool==TOOL_ATOM) // note drag or change atom
		{
			toolBondFrom=pickAtom(e.getX(),e.getY());			// in case it gets...
			toolAtomSnap=e.getButton()==MouseEvent.BUTTON1;		// ... dragged later
		}
		else if (tool==TOOL_BOND && (e.getButton()==MouseEvent.BUTTON1 || e.getButton()==MouseEvent.BUTTON3)) // initiate bond drag
		{
			highlightAtom=highlightBond=0;
			toolBondDrag=false;
			toolBondFrom=pickAtom(e.getX(),e.getY());
			toolSnap=e.getButton()==MouseEvent.BUTTON1;
			if (toolBondFrom>0)
			{
				toolBondToX=mol.atomX(toolBondFrom);
				toolBondToY=mol.atomY(toolBondFrom);
				repaint();
			}
			toolBondFromX=xToAng(e.getX());
			toolBondFromY=yToAng(e.getY());
			toolBondHit=pickBond(e.getX(),e.getY());
			cursor=ToolCursors.get(ToolCursors.CURSOR_SMALLCIRCLE);
		}
		else if (tool==TOOL_TEMPLATE && e.getButton()==MouseEvent.BUTTON1) // slap a template right down
		{
			boolean[] swap=new boolean[1];
			if (highlightAtom!=0 && templateIdx>0)
				templDraw=ToolChest.adjustTemplateByAtom(mol,highlightAtom,template,templateIdx);
			else if (highlightBond!=0 && templateIdx<0)
				templDraw=ToolChest.adjustTemplateByBond(mol,highlightBond,template,-templateIdx,swap);
			else
				templDraw=ToolChest.adjustTemplateByCoord(template,templateIdx,xToAng(trackX),yToAng(trackY));

			cacheUndo();

			if (templateIdx>0 && highlightAtom>0)
				ToolChest.templateSetByAtom(mol,highlightAtom,templDraw,templateIdx);
			else if (templateIdx<0 && highlightBond>0)
				ToolChest.templateSetByBond(mol,highlightBond,templDraw,-templateIdx,swap[0]);
			else
				mol.append(templDraw);

			postUpdate();
		}
		else if (tool==TOOL_ROTATOR && (e.getButton()==MouseEvent.BUTTON1 || e.getButton()==MouseEvent.BUTTON3) && anySelected())
		{ // initiate a rotation-drag
			toolDragReason=DRAG_ROTATE;
			toolSnap=e.getButton()==MouseEvent.BUTTON1;
			if (highlightAtom>0) {toolDragX1=angToX(mol.atomX(highlightAtom)); toolDragY1=angToY(mol.atomY(highlightAtom));}
			else if (highlightBond>0)
			{
				toolDragX1=angToX(0.5*(mol.atomX(mol.bondFrom(highlightBond))+mol.atomX(mol.bondTo(highlightBond))));
				toolDragY1=angToY(0.5*(mol.atomY(mol.bondFrom(highlightBond))+mol.atomY(mol.bondTo(highlightBond))));
			}
			else {toolDragX1=e.getX(); toolDragY1=e.getY();}
			highlightAtom=highlightBond=0;

			toolDragX2=toolDragX1;
			toolDragY2=toolDragY1;
			repaint();
		}
		else if (tool==TOOL_CHARGE && highlightAtom>0) // offset charge
		{
			int chg=mol.atomCharge(highlightAtom);
			if (e.getButton()==MouseEvent.BUTTON1) chg+=toolCharge;
			else if (e.getButton()==MouseEvent.BUTTON3) chg-=toolCharge;
			else chg=0;
			cacheUndo();
			mol.setAtomCharge(highlightAtom,chg);
			repaint();
		}
		else if (e.getButton()==MouseEvent.BUTTON3)
		{
			if (selectListen!=null)
			{
				int atom=pickAtom(e.getX(),e.getY());
				int bond=atom==0 ? bond=pickBond(e.getX(),e.getY()) : 0;
				selectListen.rightMouseButton(this,e.getX(),e.getY(),atom>0 ? atom : bond<0 ? -bond : 0);
			}
		}

		setCursor(cursor);
		checkDirtiness();
	}

	public void mouseReleased(MouseEvent e)
	{
		super.mouseReleased(e);
		
		if (e.getSource()!=this) return;
		
		if (toolDragReason!=0)
		{
			toolDragReason=0;
			repaint();
		}
		if (tool==TOOL_BOND) // bond addition, possibly by adding new atoms, too
		{
			toolBondToX=xToAng(e.getX());
			toolBondToY=yToAng(e.getY());

			int joinTo=pickAtom(e.getX(),e.getY());
			if (toolBondFrom>0 && joinTo==0 && toolSnap)
			{
				snapToolBond();
				joinTo=pickAtom((int)angToX(toolBondToX),(int)angToY(toolBondToY));
			}
			
			if (e.getButton()==MouseEvent.BUTTON1 && toolBondFrom==0 && toolBondHit>0) // change hit bond order
			{
				int i=pickBond(e.getX(),e.getY());
				if (i==toolBondHit)
				{
					cacheUndo();
					if (toolBondOrder==mol.bondOrder(i) && toolBondType==mol.bondType(i)) 
						mol.setBondFromTo(i,mol.bondTo(i),mol.bondFrom(i));
					mol.setBondOrder(i,toolBondOrder); 
					mol.setBondType(i,toolBondType);
					postUpdate();
				}
			}
			else if (toolBondFrom==0) // create a new bond from/in the middle of nowhere, possibly connected to something
			{
				int a1=0,a2=0;
				double x1=0,x2=0,y1=0,y2=0;
				if (toolBondDrag)
				{
					if (toolSnap) snapToolBond();
					x1=toolBondFromX;
					y1=toolBondFromY;
					a2=pickAtom(e.getX(),e.getY());
					if (a2>0) {x2=mol.atomX(a2); y2=mol.atomY(a2);} else {x2=toolBondToX; y2=toolBondToY;}
				}
				else
				{
					x1=x2=xToAng(e.getX()); if ((e.getModifiers()&MouseEvent.SHIFT_MASK)>0) {x1-=0.5*IDEALBOND; x2+=0.5*IDEALBOND;}
					y1=y2=yToAng(e.getY()); if ((e.getModifiers()&MouseEvent.SHIFT_MASK)==0) {y1-=0.5*IDEALBOND; y2+=0.5*IDEALBOND;}
				}
				double dx=x2-x1,dy=y2-y1;
				if (dx*dx+dy*dy>0.5*0.5)
				{
					cacheUndo();
					a1=mol.addAtom("C",x1,y1,0,0);
					if (a2==0) a2=mol.addAtom("C",x2,y2,0,0);
					mol.addBond(a1,a2,toolBondOrder);
					postUpdate();
				}
				repaint();
			}
			else if (joinTo>0 && joinTo!=toolBondFrom) // link two atoms together
			{
				cacheUndo();
				mol.addBond(toolBondFrom,joinTo,toolBondOrder);
				mol.setBondType(mol.numBonds(),toolBondType);
				clearTemporary();
			}
			else if (toolBondFrom>0) // draw a new bond out to some place not specified by the user, i.e. a healthy guess
			{
				double dx=toolBondToX-mol.atomX(toolBondFrom),dy=toolBondToY-mol.atomY(toolBondFrom);
				if (toolBondFrom==joinTo) 
				{
					int adj[]=mol.atomAdjList(toolBondFrom);
					ArrayList<Double> poss=new ArrayList<Double>();
					double ax=mol.atomX(toolBondFrom),ay=mol.atomY(toolBondFrom);
					if (adj.length==0) poss.add(0.0);
					else if (adj.length==1)
					{
						double ang=Math.atan2(mol.atomY(adj[0])-ay,mol.atomX(adj[0])-ax)*180/Math.PI;
						if (toolBondOrder!=3)
						{
							poss.add(ang+120);
							poss.add(ang-120);
						}
						else poss.add(ang+180);
					}
					else if (adj.length==2)
					{
						double ang1=Math.atan2(mol.atomY(adj[0])-ay,mol.atomX(adj[0])-ax)*180/Math.PI;
						double ang2=Math.atan2(mol.atomY(adj[1])-ay,mol.atomX(adj[1])-ax)*180/Math.PI;
						if (ang2<ang1) ang2+=360;
						if (ang2-ang1<180) poss.add(0.5*(ang1+ang2)+180); else poss.add(0.5*(ang1+ang2));
					}
					else for (int n=0;n<adj.length;n++)
					{
						double ang=Math.atan2(mol.atomY(adj[n])-ay,mol.atomX(adj[n])-ax)*180/Math.PI;
						poss.add(ang+180);
					}
					double ang=poss.get(0);
					if (poss.size()>1)
					{
						int best=-1;
						double bestScore=0;
						for (int n=0;n<poss.size();n++)
						{
							double nx=ax+IDEALBOND*Math.cos(poss.get(n)*Math.PI/180);
							double ny=ay+IDEALBOND*Math.sin(poss.get(n)*Math.PI/180);
							double score=0;
							for (int i=1;i<=mol.numAtoms();i++)
							{
								dx=mol.atomX(i)-nx;
								dy=mol.atomY(i)-ny;
								score+=1/Math.min(1000,dx*dx+dy*dy);
							}
							if (best<0 || score<bestScore) {best=n; bestScore=score;}
						}
						ang=poss.get(best);
					}
					
					dx=IDEALBOND*Math.cos(ang*Math.PI/180);
					dy=IDEALBOND*Math.sin(ang*Math.PI/180);
					toolBondToX=ax+dx;
					toolBondToY=ay+dy;
				}
				if (dx*dx+dy*dy>0.5)
				{
					cacheUndo();
					mol.addAtom("C",toolBondToX,toolBondToY);
					mol.addBond(toolBondFrom,mol.numAtoms(),toolBondOrder);
					mol.setBondType(mol.numBonds(),toolBondType);
					postUpdate();
				}
			}

			toolBondDrag=false;
			toolBondFrom=0;
			toolBondHit=0;
			highlightAtom=highlightBond=0;
			repaint();
		}		
		
		if (e.getButton()==MouseEvent.BUTTON3 && selectListen!=null) selectListen.rightMouseButton(null,0,0,0);
		
		toolDragReason=0;
	}
	
	protected void trackMotion(MouseEvent e,int dx,int dy,int oldAB,int newAB)
	{
		super.trackMotion(e,dx,dy,oldAB,newAB);
	
		boolean redraw=false;
		Cursor cursor=regularToolCursor();
		
		if (dx!=0 || dy!=0)
		{
			if (tool==TOOL_TEMPLATE) redraw=true;
		}
		
		trackX=e.getX();
		trackY=e.getY();

		if (e.getButton()==0)
		{
			if (newAB!=oldAB) redraw=true;
		
			if (tool==TOOL_TEMPLATE && templateIdx>0 && newAB<0) newAB=0;
			if (tool==TOOL_TEMPLATE && templateIdx<0 && newAB>0) newAB=0;
			
			if (redraw)
			{
				highlightAtom=newAB>0 ? newAB : 0;
				highlightBond=newAB<0 ? -newAB : 0;
				redraw=true;
			}
		}
		
		setCursor(cursor);
		if (redraw) repaint();
	}
	
	public void mouseDragged(MouseEvent e)
	{
		super.mouseDragged(e);
	}
	
	public void mouseWheelMoved(MouseWheelEvent e)
	{
		super.mouseWheelMoved(e);
		
		if (tool==TOOL_ROTATOR)
		{
			double accel=e.isShiftDown() ? 3 : 1;
			commitRotation(-5*accel*Math.PI/180*e.getWheelRotation(),e.getX(),e.getY());
			repaint();
		}
		else if (tool==TOOL_TEMPLATE)
		{
			double cx=0,cy=0;
			for (int n=1;n<=template.numAtoms();n++) {cx+=template.atomX(n); cy+=template.atomY(n);}
			cx/=template.numAtoms();
			cy/=template.numAtoms();
		
			double accel=e.isShiftDown() ? 3 : 1;
		
			if (e.isControlDown()) // scale
			{
				double factor=1-0.1*accel*e.getWheelRotation();
				for (int n=1;n<=template.numAtoms();n++) 
					template.setAtomPos(n,cx+(template.atomX(n)-cx)*factor,cy+(template.atomY(n)-cy)*factor);
			}
			else // rotate
			{
				double radians=5*accel*Math.PI/180*e.getWheelRotation();
				for (int n=1;n<=template.numAtoms();n++) 
				{
					double dx=template.atomX(n)-cx,dy=template.atomY(n)-cy;
					double dist=Math.sqrt(dx*dx+dy*dy),theta=Math.atan2(dy,dx);
					template.setAtomPos(n,cx+dist*Math.cos(theta+radians),cy+dist*Math.sin(theta+radians));
				}
			}
			templDraw=template.clone();
			repaint();
		}
		else if (editable)
		{
			zoom(Math.pow(1.5,-e.getWheelRotation()),e.getX(),e.getY());
		}
	}
	
	protected void dragMotion(MouseEvent e,int dx,int dy,int ix,int iy)
	{
		super.dragMotion(e,dx,dy,ix,iy);
	
		boolean redraw=false;
		Cursor cursor=regularToolCursor();
		
		if (tool==TOOL_TEMPLATE && (dx!=0 || dy!=0)) redraw=true;
		
		trackX=e.getX(); trackY=e.getY();
		toolDragX1=ix;
		toolDragY1=iy;
		toolDragX2=e.getX();
		toolDragY2=e.getY();
	
		if (toolDragReason==DRAG_PAN)
		{
			cursor=ToolCursors.get(ToolCursors.CURSOR_PAN);
			panDisplay(dx,dy);
		}
		else if ((tool==TOOL_CURSOR && toolDragReason!=0) || (tool==TOOL_ERASOR && toolDragReason!=0) ||
			(tool==TOOL_ROTATOR && toolDragReason==DRAG_SELECT))
		{
			if (toolDragReason==DRAG_SELECT)
			{
				int x=ix,y=iy,w=e.getX()-x,h=e.getY()-y;
				if (w<0) {w=-w; x-=w;}
				if (h<0) {h=-h; y-=h;}
				dragged=new boolean[mol.numAtoms()];
				for (int n=0;n<mol.numAtoms();n++) dragged[n]=px[n]>=x && px[n]<=x+w && py[n]>=y && py[n]<=y+h;
			}
			redraw=true;
		}
		else if (tool==TOOL_ROTATOR && toolDragReason==DRAG_ROTATE)
		{
			redraw=true;
		}
		else if (tool==TOOL_ATOM && toolBondFrom!=0)
		{
			if (!toolAtomDrag)
			{
				double ox=xToAng(e.getX())-mol.atomX(toolBondFrom),oy=yToAng(e.getY())-mol.atomY(toolBondFrom);
				if (ox*ox+oy*oy>0.8*0.8) 
				{
					toolAtomDrag=true;
					toolBondOrder=1;
					toolBondType=Molecule.BONDTYPE_NORMAL;
				}
			}
			if (toolAtomDrag)
			{
				toolBondToX=xToAng(e.getX());
				toolBondToY=yToAng(e.getY());
				if (toolAtomSnap) snapToolBond();
				redraw=true;
			}
		}
		else if (tool==TOOL_BOND /*&& toolBondFrom!=0*/)
		{
			toolBondToX=xToAng(e.getX());
			toolBondToY=yToAng(e.getY());
			int joinTo=pickAtom(e.getX(),e.getY());
			if (!toolBondDrag)
				if (Math.abs(toolBondToX-toolBondFromX)>2/scale || Math.abs(toolBondToY-toolBondFromY)>2/scale) toolBondDrag=true;
			if (joinTo>0) {toolBondToX=mol.atomX(joinTo); toolBondToY=mol.atomY(joinTo);}
			else if (toolSnap) snapToolBond();
			redraw=true;
			cursor=ToolCursors.get(ToolCursors.CURSOR_SMALLCIRCLE);
		}

		setCursor(cursor);
		if (redraw) repaint();
		checkDirtiness();
	}
	
	protected void dragComplete(MouseEvent e,int ix,int iy)
	{
		super.dragComplete(e,ix,iy);
		
		setCursor(regularToolCursor());
		
		if ((tool==TOOL_CURSOR && toolDragReason!=0) || (tool==TOOL_ROTATOR && toolDragReason==DRAG_SELECT) && editable)
		{ // solidify a translate or select
			double mx=e.getX()-ix,my=e.getY()-iy;
			
			if (toolDragReason==DRAG_SELECT && dragged!=null)
			{
				for (int n=0;n<mol.numAtoms();n++) selected[n]=selected[n] || dragged[n];
			}
			if (toolDragReason==DRAG_MOVE && selected!=null && mx*mx+my*my>5*5)
			{
				double dx=mx/scale,dy=-my/scale;
				cacheUndo();
				for (int n=1;n<=mol.numAtoms();n++) if (selected[n-1]) 
				{
					mol.setAtomPos(n,mol.atomX(n)+dx,mol.atomY(n)+dy);
				}
				clearTemporary(false);
			}
			if (toolDragReason==DRAG_COPY && selected!=null && mx*mx+my*my>5*5)
			{
				double dx=mx/scale,dy=-my/scale;
				int oldnumAtoms=mol.numAtoms(),oldnumBonds=mol.numBonds();
				int[] newPos=new int[mol.numAtoms()];
				cacheUndo();
				for (int n=1;n<=oldnumAtoms;n++) if (selected[n-1])
				{
					newPos[n-1]=mol.addAtom(mol.atomElement(n),mol.atomX(n)+dx,mol.atomY(n)+dy,mol.atomCharge(n),mol.atomUnpaired(n));
				}
				for (int n=1;n<=oldnumBonds;n++) if (selected[mol.bondFrom(n)-1] && selected[mol.bondTo(n)-1])
				{
					mol.addBond(newPos[mol.bondFrom(n)-1],newPos[mol.bondTo(n)-1],mol.bondOrder(n),mol.bondType(n));
				}

				clearTemporary();
				selected=new boolean[mol.numAtoms()];
				for (int n=1;n<=mol.numAtoms();n++) selected[n-1]=n>oldnumAtoms;
			}
			if (toolDragReason==DRAG_SCALE && selected!=null && mx*mx+my*my>5*5)
			{
				double extmul=dragExtendBy(mx,my);
				double cx=0,cy=0;
				int count=0;
				for (int n=1;n<=mol.numAtoms();n++) if (selected[n-1]) {cx+=mol.atomX(n); cy+=mol.atomY(n); count++;}
				cx/=count; cy/=count;
				cacheUndo();
				for (int n=1;n<=mol.numAtoms();n++) if (selected[n-1]) 
				{
					mol.setAtomPos(n,(mol.atomX(n)-cx)*extmul+cx,(mol.atomY(n)-cy)*extmul+cy);
				}
				
				clearTemporary(false);
			}

			toolDragReason=0;
			dragged=null;
			repaint();
		}
		
		if (tool==TOOL_ERASOR && toolDragReason!=0) // erase selection
		{
			if (toolDragReason==DRAG_SELECT && dragged!=null)
			{
				for (int n=0;n<mol.numAtoms();n++) selected[n]=selected[n] || dragged[n];
				deleteSelected();
				clearTemporary();
			}
			toolDragReason=0;
			dragged=null;
			repaint();
		}
		else if (tool==TOOL_ROTATOR && toolDragReason==DRAG_ROTATE) // solidify a rotation
		{
			double th=-Math.atan2(e.getY()-iy,e.getX()-ix)*180/Math.PI;
			if (toolSnap) th=Math.round(th/15)*15;
			if (Math.abs(th)>1) commitRotation(th*Math.PI/180,ix,iy);
			
			toolDragReason=0;
			dragged=null;
			repaint();
		}
		else if (tool==TOOL_ATOM && toolAtomDrag && toolBondFrom>0) // place a new atom-from
		{
			cacheUndo();
			mol.addAtom(toolAtomType,toolBondToX,toolBondToY);
			mol.addBond(toolBondFrom,mol.numAtoms(),1);
			clearTemporary();
			toolAtomDrag=false;
			toolBondFrom=0;
			repaint();
		}
		else if (toolDragReason==DRAG_PAN)
		{
			toolDragReason=0;
			// !! (already done this) panDisplay((int)(e.getX()-ix),(int)(e.getY()-iy));
		}

		checkDirtiness();
	}
	
	// Other callbacks...
	
	public void focusLost(FocusEvent e)
	{
		super.focusLost(e);
		if (e.getSource()==toolAtomEditBox) completeAtomEdit();
	}
	public void keyTyped(KeyEvent e) 
	{
		super.keyTyped(e);
		if (e.getSource()==toolAtomEditBox) 
		{
			if (e.getKeyChar()=='\n') completeAtomEdit();
		}
	}

	public void caretUpdate(CaretEvent e)
	{
		if (e.getSource()==toolAtomEditBox) 
		{
			int prefw=toolAtomEditBox.getPreferredSize().width,curw=toolAtomEditBox.getSize().width;
			prefw=Math.min(100,prefw);
			if (prefw>curw)
			{
				Rectangle r=toolAtomEditBox.getBounds();
				r.x=r.x+(r.width-prefw)/2;
				r.width=prefw;
				toolAtomEditBox.setBounds(r);
			}
		}
	}
	
	public void componentResized(ComponentEvent e)
	{
		super.componentResized(e);
		if (autoScale || !firstScale) 
		{
			scaleToFit(); 
			repaint();
			firstScale=false;
		} 
	}
	public void componentShown(ComponentEvent e) 
	{
		super.componentShown(e);
		if (autoScale || !firstScale) 
		{
			scaleToFit(); 
			repaint();
			firstScale=false;
		} 
	}
}




/*
	Sketch Elements: Chemistry molecular diagram drawing tool.
	
	(c) 2005-2013 Dr. Alex M. Clark, all rights reserved
	
	Released as GNUware, under the Gnu Public License (GPL)
	
	See www.gnu.org for details.
*/

package org.sketchel;

import java.lang.*;
import java.text.*;
import java.util.*;
import java.awt.geom.*;

/*
	Given an input molecule, and pseudo-pixel resolution, and a way to measure text, this class provides the necessary
	arrangements which precede the actual drawing of the molecule. 
*/

public class ArrangeMolecule
{
	private Molecule mol;
	private double scale; // pixels-per-Angstrom, or similar
	private ArrangeMeasurement measure;

	public static final int SHOW_ELEMENTS=0;
	public static final int SHOW_ALL_ELEMENTS=1;
	public static final int SHOW_INDEXES=2;
	public static final int SHOW_RINGID=3;
	public static final int SHOW_PRIORITY=4;
	public static final int SHOW_MAPNUM=5;
	
	private int elementMode; // one of SHOW_* above
	private boolean showHydrogens; // if false, H's will never be shown
	private double fontSize; // font size for main features, e.g. elements; in device units
	private double lineSize; // width of most lines, such as bonds
	private double bondSep; // size of bond separation between non-single bonds
	private boolean devRounding; // if true, sometimes rounds to "pixel" boundaries to improve rendering
	private String[] annotAtoms=null,annotBonds=null; // specific annotations
	private boolean annotRS=false,annotEZ=false,annotExtra=false; // optional extra annotations
	private int foreground; // colour for bonds and decorations
	private int[] atomCols=null; // corresponds to atom indices
	
	class APoint
	{
		int anum; // corresponds to molecule atom index
		String text; // the primary label, or null if invisible
		float fsz; // font size for label
		boolean bold;
		int col;
		float cx,cy,rw,rh; // centre and ovaloid radius for label shape; rw,rh==0 if no label
	}
	
	public static final int BLINE_NORMAL=1; // a line segment; may be single bond, part of a multiple bond, or dissected bond
	public static final int BLINE_INCLINED=2; // an up-wedge bond
	public static final int BLINE_DECLINED=3; // a down-wedge bond
	public static final int BLINE_UNKNOWN=4; // a squiggly bond
	public static final int BLINE_DOTTED=5; // dotted line
	public static final int BLINE_DOTDIR=6; // dotted line, with inclined destination
	public static final int BLINE_INCDOUBLE=7; // inclined destination, order=2
	public static final int BLINE_INCTRIPLE=8; // inclined destination, order=3
	
	class BLine
	{
		int bnum; // corresponds to molecule bond index
		int type; // one of BLINE_*
		float x1,y1,x2,y2;
		float size; 
		int col;
		
		BLine() {}
		BLine(int bnum,int type,double x1,double y1,double x2,double y2,double size,int col)
		{
			this.bnum=bnum;
			this.type=type;
			this.x1=(float)x1;
			this.y1=(float)y1;
			this.x2=(float)x2;
			this.y2=(float)y2;
			this.size=(float)size;
			this.col=col;
		}
	}
	
	private ArrayList<APoint> points=new ArrayList<APoint>();
	private ArrayList<BLine> lines=new ArrayList<BLine>();
	
	// constructor: parameters are options which have no reasonable defaults
	
	public ArrangeMolecule(Molecule mol,ArrangeMeasurement measure)
	{
		this.mol=mol;
		this.measure=measure;
		
		scale=measure.scale();
		if (Double.isNaN(scale)) throw new IndexOutOfBoundsException("Scale is NaN");
		elementMode=SHOW_ELEMENTS;
		showHydrogens=true;
		fontSize=0.6*scale;
		lineSize=0.075*scale;
		bondSep=0.20*scale;
		devRounding=true;
		foreground=0x000000;
	}
	
	public Molecule getMolecule() {return mol;}
	public void setMolecule(Molecule mol) {this.mol=mol;}
	
	// methods for using non-default display settings

	public void setShowHydrogens(boolean v) {showHydrogens=v;}
	public void setElementMode(int v) {elementMode=v;}
	public void setFontSizeAng(double v) {fontSize=v*scale;} 
	public void setFontSizeDev(double v) {fontSize=v;}
	public void setLineSizeAng(double v) {lineSize=v*scale;}
	public void setBondSepAng(double v) {bondSep=v*scale;}
	public void setDevRounding(boolean v) {devRounding=v;}
	public void setAnnotAtoms(String[] labels) {annotAtoms=labels;}
	public void setAnnotBonds(String[] labels) {annotBonds=labels;}
	public void setAnnotRS(boolean v) {annotRS=v;}
	public void setAnnotEZ(boolean v) {annotEZ=v;}
	public void setAnnotExtra(boolean v) {annotExtra=v;}
	public void setForeground(int v) {foreground=v;}
	public void setAtomCols(int[] v) {atomCols=v;}
	
	public boolean getShowHydrogens() {return showHydrogens;}
	public int getElementMode() {return elementMode;}
	public double getFontSizeDev() {return fontSize;}
	public double getLineSizeDev() {return lineSize;}
	public boolean getDevRounding() {return devRounding;}
	public String[] getAnnotAtoms() {return annotAtoms;}
	public String[] getAnnotBonds() {return annotBonds;}
	public boolean getAnnotRS() {return annotRS;}
	public boolean getAnnotEZ() {return annotEZ;}
	public int getForeground() {return foreground;}

	// the action method: call this before accessing any of the resultant data
	public void arrange()
	{
		// fill in each of the atom centres
		for (int n=1;n<=mol.numAtoms();n++)
		{
			// atom symbols which are more than 2 characters long are labels rather than elements, and get different treatment;
			// note we put in a null placeholder here, so that the points will be kept in their original atom order
			if (mol.atomElement(n).length()>2 && mol.atomHydrogens(n)==0 && 
				(elementMode==SHOW_ELEMENTS || elementMode==SHOW_ALL_ELEMENTS))
			{
				points.add(null);
				continue;
			}
		
			// proceed with a regular atom symbol
			APoint a=new APoint();
			a.anum=n;
			a.fsz=(float)fontSize;
			a.bold=mol.atomMapNum(n)>0;
			a.col=atomCols==null ? 0x000000 : atomCols[n-1];
			a.cx=(float)measure.angToX(mol.atomX(n));
			a.cy=(float)measure.angToY(mol.atomY(n));
			a.rw=a.rh=0;

			if (devRounding)
			{
				a.cx=Math.round(a.cx);
				a.cy=Math.round(a.cy);
			}

			// decide whether this atom is to have a label
			if (elementMode==SHOW_ELEMENTS) a.text=mol.atomExplicit(n) || atomIsLinear(n) ? mol.atomElement(n) : null;
			else if (elementMode==SHOW_ALL_ELEMENTS) a.text=mol.atomElement(n);
			else if (elementMode==SHOW_INDEXES) a.text=String.valueOf(n);
			else if (elementMode==SHOW_RINGID) a.text=String.valueOf(mol.atomRingBlock(n));
			else if (elementMode==SHOW_PRIORITY) a.text=String.valueOf(mol.atomPriority(n));
			else if (elementMode==SHOW_MAPNUM) a.text=mol.atomMapNum(n)>0 ? String.valueOf(mol.atomMapNum(n)) : null;
			else a.text="?";

			// if it has a label, then how big
			if (a.text!=null)
			{
				double[] wad=measure.measureText(a.text,a.fsz);
				final float PADDING=1.1f; // want a bit more room
				a.rw=(float)(0.5*wad[0]*PADDING);
				a.rh=(float)(0.5*wad[1]*PADDING);
			}

			points.add(a);
		}

		// pick up the label-style elements, and deal with them
		for (int n=1;n<=mol.numAtoms();n++) if (points.get(n-1)==null) processLabel(n);

		// resolve the bonds which can be analyzed immediately
		boolean[] bdbl=new boolean[mol.numBonds()]; // set to true if bond is awaiting a double bond assignment
		for (int n=1;n<=mol.numBonds();n++)
		{
			int bt=mol.bondType(n),bo=mol.bondOrder(n);
			bdbl[n-1]=bo==2 && bt==Molecule.BONDTYPE_NORMAL;

			double x1=pointCX(mol.bondFrom(n)-1),y1=pointCY(mol.bondFrom(n)-1);
			double x2=pointCX(mol.bondTo(n)-1),y2=pointCY(mol.bondTo(n)-1);
			
			// for non-double bonds, can add the constituents right away
			if (!bdbl[n-1])
			{
				double[] xy1=backOffAtom(mol.bondFrom(n)-1,x1,y1,x2,y2);
				double[] xy2=backOffAtom(mol.bondTo(n)-1,x2,y2,x1,y1);
				double sz=lineSize;
				if (mol.atomMapNum(mol.bondFrom(n))>0 && mol.atomMapNum(mol.bondTo(n))>0) sz*=5.0/3;

				int ltype=BLINE_NORMAL;
				if (bo==1 && bt==Molecule.BONDTYPE_INCLINED) ltype=BLINE_INCLINED;
				else if (bo==1 && bt==Molecule.BONDTYPE_DECLINED) ltype=BLINE_DECLINED;
				else if (bt==Molecule.BONDTYPE_UNKNOWN) ltype=BLINE_UNKNOWN;
				else if (bo==0)
				{
					if (bt==Molecule.BONDTYPE_INCLINED || bt==Molecule.BONDTYPE_DECLINED) ltype=BLINE_DOTDIR;
					else ltype=BLINE_DOTTED;
				}
				else if ((bo==2 || bo==3) && (bt==Molecule.BONDTYPE_INCLINED || bt==Molecule.BONDTYPE_DECLINED))
				{
					ltype=bo==2 ? BLINE_INCDOUBLE : BLINE_INCTRIPLE;
				}

				// for dotted lines, back off intersections if non-terminal
				if (bo==0 && (xy1[0]!=xy2[0] || xy1[1]!=xy2[1]))
				{
					double dx=xy2[0]-xy1[0],dy=xy2[1]-xy1[1],d=Math.sqrt(dx*dx+dy*dy);
					double ox=0.5*dx/d*bondSep,oy=0.5*dy/d*bondSep;
					if (mol.atomAdjCount(mol.bondFrom(n))>1) {xy1[0]+=ox; xy1[1]+=oy;}
					if (mol.atomAdjCount(mol.bondTo(n))>1) {xy2[0]-=ox; xy2[1]-=oy;}
				}

				// for dotted inclined/declined, swap the sides
				if (bo!=1 && bt==Molecule.BONDTYPE_DECLINED) {double[] tmp=xy1; xy1=xy2; xy2=tmp;}
				
				// for flat multi-order bonds, add multiple lines
				if (bo>1 && bt==Molecule.BONDTYPE_NORMAL)
				{
					double[] oxy=orthogonalDelta(xy1[0],xy1[1],xy2[0],xy2[1],bondSep);
					if (devRounding) {oxy[0]=Math.round(oxy[0]); oxy[1]=Math.round(oxy[1]);}
					double v=-0.5*(bo-1);
					for (int i=0;i<bo;i++,v++)
					{
						double lx1=xy1[0]+v*oxy[0],ly1=xy1[1]+v*oxy[1],lx2=xy2[0]+v*oxy[0],ly2=xy2[1]+v*oxy[1];
						lines.add(new BLine(n,BLINE_NORMAL,lx1,ly1,lx2,ly2,sz,foreground));
					}
				}
				else
				{
					// just one line
					lines.add(new BLine(n,ltype,xy1[0],xy1[1],xy2[0],xy2[1],sz,foreground));
				}
			}
		}

		// process double bonds in rings
		int[][] rings=orderedRingList();
		for (int i=0;i<rings.length;i++)
		{
			for (int j=0;j<rings[i].length;j++)
			{
				int k=mol.findBond(rings[i][j],rings[i][j<rings[i].length-1 ? j+1 : 0]);
				if (bdbl[k-1])
				{
					processDoubleBond(k,rings[i]);
					bdbl[k-1]=false;
				}
			}
		}

		// process all remaining double bonds
		for (int i=1;i<=mol.numBonds();i++) if (bdbl[i-1]) processDoubleBond(i,priorityDoubleSubstit(i));

		// place hydrogen labels as explicit "atom centres"
		int[] hcount=new int[mol.numAtoms()];
		for (int n=1;n<=mol.numAtoms();n++) hcount[n-1]=pointText(n-1)==null || !showHydrogens ? 0 : mol.atomHydrogens(n);
		for (int n=0;n<mol.numAtoms();n++) if (hcount[n]>0)
		{
			if (quadrantOpen(n,1,0) && placeHydrogen(n,hcount[n],1,0)) {hcount[n]=0; continue;}
			if (quadrantOpen(n,-1,0) && placeHydrogen(n,hcount[n],-1,0)) {hcount[n]=0; continue;}
			if (quadrantOpen(n,0,1) && placeHydrogen(n,hcount[n],0,1)) {hcount[n]=0; continue;}
			if (quadrantOpen(n,0,-1) && placeHydrogen(n,hcount[n],0,-1)) {hcount[n]=0; continue;}
		}
		for (int n=0;n<mol.numAtoms();n++) if (hcount[n]>0 && placeHydrogen(n,hcount[n],1,0)) hcount[n]=0;
		for (int n=0;n<mol.numAtoms();n++) if (hcount[n]>0 && placeHydrogen(n,hcount[n],-1,0)) hcount[n]=0;
		for (int n=0;n<mol.numAtoms();n++) if (hcount[n]>0 && placeHydrogen(n,hcount[n],0,1)) hcount[n]=0;
		for (int n=0;n<mol.numAtoms();n++) if (hcount[n]>0 && placeHydrogen(n,hcount[n],0,-1)) hcount[n]=0;
		for (int n=0;n<mol.numAtoms();n++) if (hcount[n]>0) placeHydrogen(n,hcount[n],0,0);

		// look for atoms with isotope labels, and place them
		for (int n=1;n<=mol.numAtoms();n++) if (mol.atomIsotope(n)!=Molecule.ISOTOPE_NATURAL)
		{
			String isostr=String.valueOf(mol.atomIsotope(n));
			annotateAtom(n,isostr,fontSize*0.75,foreground,-1,measure.yIsUp() ? 1 : -1,true);
		}

		// do atomic charges/radical notation
		for (int n=1;n<=mol.numAtoms();n++)
		{
			String str="";
			int chg=mol.atomCharge(n);
			if (chg==-1) str="-";
			else if (chg==1) str="+";
			else if (chg<-1) str=String.valueOf(chg);
			else if (chg>1) str="+"+String.valueOf(chg);
			for (int i=mol.atomUnpaired(n);i>0;i--) str+=".";
			if (str.length()==0) continue;
			annotateAtom(n,str,str.length()==1 ? fontSize : 0.75*fontSize,foreground,1,measure.yIsUp() ? 1 : -1,false);
		}
		
		// add atom/bond annotations
		if (annotAtoms!=null) for (int n=0;n<annotAtoms.length;n++) if (annotAtoms[n]!=null && annotAtoms[n].length()>0)
			annotateAtom(n+1,annotAtoms[n],fontSize*0.75,0x408000);
		if (annotBonds!=null) for (int n=0;n<annotBonds.length;n++) if (annotBonds[n]!=null && annotBonds[n].length()>0)
			annotateBond(n+1,annotBonds[n],fontSize*0.75,0x408000);

		// add stereo annotations, if requested
		if (annotRS) for (int n=1,chi;n<=mol.numAtoms();n++)
			if ((chi=mol.atomChirality(n))!=Molecule.STEREO_NONE)
		{
			String label=chi==Molecule.STEREO_POS ? "R" : chi==Molecule.STEREO_NEG ? "S" : "R/S";
			annotateAtom(n,label,0,0x0000FF);
		}
		if (annotEZ) for (int n=1,chi;n<=mol.numBonds();n++)
			if ((chi=mol.bondStereo(n))!=Molecule.STEREO_NONE)
		{
			String label=chi==Molecule.STEREO_POS ? "Z" : chi==Molecule.STEREO_NEG ? "E" : "E/Z";
			annotateBond(n,label,0,0x0000FF);
		}
		if (annotExtra)
		{
			for (int n=1;n<=mol.numAtoms();n++)
			{
				String[] extra=mol.atomExtra(n);
				if (extra!=null && extra.length>0) annotateExtra(n,0,extra);
			}
			for (int n=1;n<=mol.numBonds();n++)
			{
				String[] extra=mol.bondExtra(n);
				if (extra!=null && extra.length>0) annotateExtra(mol.bondFrom(n),mol.bondTo(n),extra);
			}
		}
	}

	// adds a label to the given atom index, which is drawn near to, but not on top of, the atom itself; font defaults to atom size;
	// if a vector (vx,vy) is given, the placement is favoured in that direction... if narrowVec is true, then the direction
	// becomes more of a constraint
	public void annotateAtom(int anum,String label,double fsz,int col) {annotateAtom(anum,label,fsz,col,0,0,false);}
	public void annotateAtom(int anum,String label,double fsz,int col,double vx,double vy,boolean narrowVec)
	{
		if (fsz==0) fsz=fontSize;
		double[] wad=measure.measureText(label,fsz);
		double rw=0.5*wad[0],rh=0.5*wad[1];
		double[] pxy=null;
		if (vx==0 && vy==0)
			pxy=anchorAnnotation(pointCX(anum-1),pointCY(anum-1),rw,rh);
		else
			pxy=anchorAnnotation(pointCX(anum-1),pointCY(anum-1),rw,rh,Math.atan2(vy,vx),narrowVec);

		APoint a=new APoint();
		a.anum=0;
		a.text=label;
		a.fsz=(float)fsz;
		a.bold=false;
		a.col=col;
		a.cx=(float)pxy[0];
		a.cy=(float)pxy[1];
		a.rw=(float)rw;
		a.rh=(float)rh;
		points.add(a);
	}
	
	// render the "extra" fields for an atom or bond
	private void annotateExtra(int atom1,int atom2,String[] labels)
	{
		String label=labels[0];
		for (int n=1;n<labels.length;n++) label+=","+labels[n];

		float x=pointCX(atom1-1),y=pointCY(atom1-1);
		if (atom2>0) {x=0.5f*(x+pointCX(atom2-1)); y=0.5f*(y+pointCY(atom2-1));}
		else x+=pointRW(atom1-1)+0.1f*scale;
		
		float fsz=0.75f*(float)fontSize;
		
		double[] wad=measure.measureText(label,fsz);
		APoint a=new APoint();
		a.anum=0;
		a.text=label;
		a.fsz=fsz;
		a.bold=false;
		a.col=0xFF0080;
		a.cx=x+0.5f*(float)wad[0];
		a.cy=y;
		a.rw=0.5f*(float)wad[0];
		a.rh=0.5f*(float)wad[1];
		points.add(a);
	}
	
	// deals with an atom symbol which is a label rather than an element/short token
	private void processLabel(int anum)
	{
		double ax=mol.atomX(anum),ay=mol.atomY(anum);
	
		// decide whether the label goes on the left, or the right, or is centred
		int left=0,right=0;
		int[] adj=mol.atomAdjList(anum);
		for (int n=0;n<adj.length;n++)
		{
			double theta=Math.atan2(mol.atomY(adj[n])-ay,mol.atomX(adj[n])-ax)*Util.RADDEG;
			if (theta>=-15 && theta<=15) right+=3;
			if (theta>=-85 && theta<=85) right++;
			else if (theta>85 && theta<95) {} // orthogonal
			else if (theta<-85 && theta>-95) {} // orthogonal
			else if (theta>165 || theta<-165) left+=3;
			else left++;
		}
		
		String label=mol.atomElement(anum);
		int ibar=label.indexOf('|'),ibrace=label.indexOf('{');
		
		int side=0;
		if (left==0 && right==0 && ibar<0 && ibrace<0) {} // say in middle
		else if (left<right) side=-1;
		else if (right<left) side=1;
		else
		{
			// pick based on congestion; notice the bias toward placing on the right
			if (spatialCongestion((float)(ax-1),(float)ay)<0.5*spatialCongestion((float)(ax+1),(float)ay)) side=-1; else side=1;
		}
		
		// break up the label, if special characters are being used, and measure each
		String[] chunks=null;
		boolean[] subscript=null;
		int refchunk=0;
		
		if (ibar<0 && ibrace<0) // one piece: it's simple
		{
			if (side==0) chunks=new String[]{label};
			else if (side<0) 
			{
				chunks=new String[]{label.substring(0,label.length()-1),label.substring(label.length()-1)};
				refchunk=1;
			}
			else /* side>0 */ chunks=new String[]{label.substring(0,1),label.substring(1)};
		}
		else // multiple pieces: split it up
		{
			ArrayList<String> bits=new ArrayList<String>();
			ArrayList<Boolean> bsub=new ArrayList<Boolean>();
			
			String[] blocks=label.split("\\|");
			if (side<0)
			{
				String[] oldblk=blocks;
				blocks=new String[oldblk.length];
				for (int i=0,j=oldblk.length-1;i<oldblk.length;i++,j--) blocks[i]=oldblk[j];
			}
			StringBuffer buff=new StringBuffer();
			for (int i=0;i<blocks.length;i++)
			{
				if (side<0 && refchunk==0 && i==blocks.length-1) refchunk=bits.size();
				boolean ss=false;
				buff.delete(0,buff.length());
				for (int j=0;j<blocks[i].length();j++)
				{
					char ch=blocks[i].charAt(j);
					if (ch=='{' || ch=='}')
					{
						if (buff.length()>0) {bits.add(buff.toString()); bsub.add(ss);}
						buff.delete(0,buff.length());
						ss=ch=='{';
					}
					else buff.append(ch);
				}
				if (buff.length()>0) {bits.add(buff.toString()); bsub.add(ss);}
			}
			
			chunks=bits.toArray(new String[bits.size()]);
			subscript=new boolean[bsub.size()];
			for (int n=0;n<bsub.size();n++) subscript[n]=bsub.get(n);
		}
		
		final float PADDING=1.1f;
		final float SSFRACT=0.6f;
		
		double[] chunkw=new double[chunks.length];
		double tw=0;
		for (int n=0;n<chunks.length;n++)
		{
			chunkw[n]=measure.measureText(chunks[n],fontSize)[0];
			if (subscript!=null && subscript[n]) chunkw[n]*=SSFRACT;
			tw+=chunkw[n];
		}
		
		double x=measure.angToX(ax),y=measure.angToY(ay);
		if (side==0) x+=0.5*(chunkw[0]-tw);
		else if (side<0)
		{
			for (int n=0;n<refchunk;n++) x-=chunkw[n];
			x-=0.5*chunkw[refchunk];
		}
		else //if (side>0)
		{
			x-=0.5*chunkw[0];
		}
		
		for (int n=0;n<chunks.length;n++)
		{
			APoint a=new APoint();
			a.anum=n==refchunk ? anum : 0;
			a.text=chunks[n];
			a.fsz=(float)fontSize; // !!
			a.bold=false;
			a.col=atomCols==null ? 0x000000 : atomCols[anum-1];
			a.cx=(float)(x+0.5*chunkw[n]);
			a.cy=(float)y;
			a.rw=(float)(0.5*chunkw[n]*PADDING);
			a.rh=(float)(0.5*fontSize*PADDING);
			if (devRounding) {a.cx=Math.round(a.cx); a.cy=Math.round(a.cy);}
			if (subscript!=null && subscript[n])
			{
				a.fsz*=SSFRACT;
				a.cy+=a.fsz*0.7*(measure.yIsUp()?-1:1);
			}
			if (n==refchunk) points.set(anum-1,a); else points.add(a);
			
			x+=chunkw[n];
		}
	}
	
	// adds a label close to the centre of a bond
	public void annotateBond(int bnum,String label,double fsz,int col)
	{
		if (fsz==0) fsz=fontSize;
		double[] wad=measure.measureText(label,fsz);
		double rw=0.5*wad[0],rh=0.5*wad[1];
		int bfr=mol.bondFrom(bnum),bto=mol.bondTo(bnum);
		double[] pxy=anchorAnnotation(0.5*(pointCX(bfr-1)+pointCX(bto-1)),0.5*(pointCY(bfr-1)+pointCY(bto-1)),rw,rh);

		APoint a=new APoint();
		a.anum=0;
		a.text=label;
		a.fsz=(float)fsz;
		a.bold=false;
		a.col=col;
		a.cx=(float)pxy[0];
		a.cy=(float)pxy[1];
		a.rw=(float)rw;
		a.rh=(float)rh;
		points.add(a);
	}
	
	// access to atom information; it is valid to assume that {atomcentre}[N-1] matches {moleculeatom}[N], if N<=mol.numAtoms()
	public int numPoints() {return points.size();}
	public int pointANum(int N) {return points.get(N).anum;}
	public String pointText(int N) {return points.get(N).text;}
	public float pointFontSize(int N) {return points.get(N).fsz;}
	public boolean pointBold(int N) {return points.get(N).bold;}
	public int pointCol(int N) {return points.get(N).col;}
	public float pointCX(int N) {return points.get(N).cx;}
	public float pointCY(int N) {return points.get(N).cy;}
	public float pointRW(int N) {return points.get(N).rw;}
	public float pointRH(int N) {return points.get(N).rh;}
	
	// access to bond information; it is _NOT_ valid to read anything into the indices; they do not correlate with bond numbers
	public int numLines() {return lines.size();}
	public int lineBNum(int N) {return lines.get(N).bnum;}
	public int lineType(int N) {return lines.get(N).type;}
	public float lineX1(int N) {return lines.get(N).x1;}
	public float lineY1(int N) {return lines.get(N).y1;}
	public float lineX2(int N) {return lines.get(N).x2;}
	public float lineY2(int N) {return lines.get(N).y2;}
	public float lineSize(int N) {return lines.get(N).size;}
	public int lineCol(int N) {return lines.get(N).col;}
	
	// private methods
	
	// returns true if the atom has two neighbours at almost 180 degree separation
	private boolean atomIsLinear(int N)
	{
		int[] adj=mol.atomAdjList(N);
		if (adj.length!=2) return false;
		double th1=Math.atan2(mol.atomY(adj[0])-mol.atomY(N),mol.atomX(adj[0])-mol.atomX(N));
		double th2=Math.atan2(mol.atomY(adj[1])-mol.atomY(N),mol.atomX(adj[1])-mol.atomX(N));
		return Math.abs(Util.angleDiff(th1,th2))>=175*Util.DEGRAD;
	}
	
	// given that the position (X,Y) connects with atom N, and is part of a bond that connects at the other end
	// with (FX,FY), considers the possibility that a new (X,Y) may need to be calculated by backing up along the line
	private double[] backOffAtom(int N,double X,double Y,double FX,double FY)
	{
		if (X==FX && Y==FY) return new double[]{X,Y};
	
		final double EXT_RAD=1.4;
		double cx=pointCX(N),cy=pointCY(N),rw=pointRW(N)*EXT_RAD,rh=pointRH(N)*EXT_RAD;
		if (pointText(N)==null || rw<=0 || rh<=0) return new double[]{X,Y};
		
		double dx=X-cx,dy=Y-cy;
		double sqX=Util.sqr(dx)/Util.sqr(rw),sqY=Util.sqr(dy)/Util.sqr(rh);
		if (sqX+sqY>=1) return new double[]{X,Y}; // does not intrude on the ellipse
		
		// NOTE: this is slightly wrong because it assumes that lines point toward the centre, which is almost true...
		
		dx=FX-cx; dy=FY-cy;
		sqX=Util.sqr(dx)/Util.sqr(rw); sqY=Util.sqr(dy)/Util.sqr(rh);
		double d=Math.sqrt(1/(sqX+sqY));
		return new double[]{X+d*(FX-X),Y+d*(FY-Y)};
	}

	// produces a list of small rings, ordered in a terminal-first manner, which is to be used as the sequence for assigning sides
	// of bond orders
	private int[][] orderedRingList()
	{
		ArrayList<int[]> rings=new ArrayList<int[]>();
		final int[] SIZE_ORDER={6,5,7,4,3};
		for (int i=0;i<SIZE_ORDER.length;i++)
		{
			int[][] nring=mol.findRingSize(SIZE_ORDER[i]);
			for (int j=0;j<nring.length;j++) rings.add(nring[j]);
		}
		
		// keep adding terminal rings to the result set - or, the first ring if none
		ArrayList<int[]> result=new ArrayList<int[]>();
		while (rings.size()>0)
		{
			int which=0; // (default to first)

			for (int i=0;i<rings.size();i++)
			{
				int ncon=0;
				for (int j=0;j<rings.size();j++) if (i!=j)
				{
					boolean shared=false;
					int[] r1=rings.get(i),r2=rings.get(j);
					for (int k1=0;k1<r1.length && !shared;k1++) for (int k2=0;k2<r2.length;k2++) 
						if (r1[k1]==r2[k2]) {shared=true; break;}
					if (shared) ncon++;
				}
				
				if (ncon<=1) {which=i; break;}
			}
			
			result.add(rings.get(which));
			rings.remove(which);
		}
		
		// count the number of double bonds in each ring, and use this to override the primary sort order (most=first)
		int resbcount[]=new int[result.size()],maxbcount=0;
		for (int n=0;n<result.size();n++)
		{
			resbcount[n]=0;
			int[] r=result.get(n);
			for (int i=0;i<r.length;i++)
			{
				int j=mol.findBond(r[i],r[i+1<r.length ? i+1 : 0]);
				if (mol.bondOrder(j)==2) resbcount[n]++;
			}
			maxbcount=Math.max(maxbcount,resbcount[n]);
		}
		
		int pos=0,ret[][]=new int[result.size()][];
		for (int sz=maxbcount;sz>=0;sz--)
		{
			for (int n=0;n<result.size();n++) if (resbcount[n]==sz) ret[pos++]=result.get(n);
		}
		return ret;
	}

	// convenience function which returns {ox,oy} which is orthogonal to the direction of the input vector, of magnitude D; the 
	// direction of {ox,oy} is to the "left" of the input vector
	private double[] orthogonalDelta(double X1,double Y1,double X2,double Y2,double D)
	{
		double ox=Y1-Y2,oy=X2-X1;
		double dsq=ox*ox+oy*oy;
		double sc=dsq>0 ? D/Math.sqrt(dsq) : 1;
		return new double[]{ox*sc,oy*sc};
	}

	// given the guideline index of a double bond, and some information about the atoms which are on the "important side", creates 
	// the appropriate line segments
	private void processDoubleBond(int N,int[] Priority)
	{
		int bf=mol.bondFrom(N),bt=mol.bondTo(N);
		int[] nf=mol.atomAdjList(bf),nt=mol.atomAdjList(bt);

		double x1=pointCX(bf-1),y1=pointCY(bf-1),x2=pointCX(bt-1),y2=pointCY(bt-1);
		double dx=x2-x1,dy=y2-y1,btheta=Math.atan2(dy,dx);
		
		// count number of priority atoms on either side of the bond vector
		int countFLeft=0,countFRight=0,countTLeft=0,countTRight=0;
		int idxFLeft=0,idxFRight=0,idxTLeft=0,idxTRight=0;
		boolean noshift=false; // true if definitely not alkene-ish
		for (int n=0;n<nf.length;n++) if (nf[n]!=bt)
		{
			if (mol.bondOrder(mol.findBond(bf,nf[n]))>1) {noshift=true; break;}
			boolean ispri=false;
			for (int i=0;i<(Priority==null ? 0 : Priority.length);i++) if (Priority[i]==nf[n]) ispri=true;
			double theta=Util.angleDiff(Math.atan2(pointCY(nf[n]-1)-y1,pointCX(nf[n]-1)-x1),btheta);
			if (Math.abs(theta)*Util.RADDEG>175) {noshift=true; break;} // linear
			else if (theta>0) {if (ispri) countFLeft++; idxFLeft=nf[n];} 
			else /* theta<0 */ {if (ispri) countFRight++; idxFRight=nf[n];}
		}
		for (int n=0;n<nt.length;n++) if (nt[n]!=bf)
		{
			if (mol.bondOrder(mol.findBond(bt,nt[n]))>1) {noshift=true; break;}
			boolean ispri=false;
			for (int i=0;i<(Priority==null ? 0 : Priority.length);i++) if (Priority[i]==nt[n]) ispri=true;
			double theta=Util.angleDiff(Math.atan2(pointCY(nt[n]-1)-y2,pointCX(nt[n]-1)-x2),btheta);
			if (Math.abs(theta)*Util.RADDEG>175) {noshift=true; break;} // linear
			else if (theta>0) {if (ispri) countTLeft++; idxTLeft=nt[n];} 
			else /* theta<0 */ {if (ispri) countTRight++; idxTRight=nt[n];}
		}
		
		// decide which side the bond should be shifted to, if either
		int side=0;
		if (noshift || countFLeft>1 || countFRight>1 || countTLeft>1 || countTRight>1) {} // inappropriate
		else if (countFLeft>0 && countFRight>0) {} // ambiguous
		else if (countTLeft>0 && countTRight>0) {} // ambiguous
		else if (countFLeft>0 || countTLeft>0) side=1; // left
		else if (countFRight>0 || countTRight>0) side=-1; // right

		// create the bond lines

		double sz=lineSize;
		if (mol.atomMapNum(bf)>0 && mol.atomMapNum(bt)>0) sz*=5.0/3;
		double[] oxy=orthogonalDelta(x1,y1,x2,y2,bondSep);
		

		double ax1=x1,ay1=y1,ax2=x2,ay2=y2;
		double bx1=0,by1=0,bx2=0,by2=0;

		if (side==0)
		{
			ax1=x1+0.5*oxy[0]; ay1=y1+0.5*oxy[1]; ax2=x2+0.5*oxy[0]; ay2=y2+0.5*oxy[1];
			bx1=x1-0.5*oxy[0]; by1=y1-0.5*oxy[1]; bx2=x2-0.5*oxy[0]; by2=y2-0.5*oxy[1];
		}
		else if (side>0)
		{
			bx1=x1+oxy[0]; by1=y1+oxy[1]; bx2=x2+oxy[0]; by2=y2+oxy[1];
			if (nf.length>1 && pointText(bf-1)==null) {bx1+=oxy[1]; by1-=oxy[0];}
			if (nt.length>1 && pointText(bt-1)==null) {bx2-=oxy[1]; by2+=oxy[0];}
		}
		else if (side<0)
		{
			bx1=x1-oxy[0]; by1=y1-oxy[1]; bx2=x2-oxy[0]; by2=y2-oxy[1];
			if (nf.length>1 && pointText(bf-1)==null) {bx1+=oxy[1]; by1-=oxy[0];}
			if (nt.length>1 && pointText(bt-1)==null) {bx2-=oxy[1]; by2+=oxy[0];}
		}
		
		double[] xy1=backOffAtom(bf-1,ax1,ay1,ax2,ay2);
		double[] xy2=backOffAtom(bt-1,ax2,ay2,ax1,ay1);
		ax1=xy1[0]; ay1=xy1[1]; ax2=xy2[0]; ay2=xy2[1];

		xy1=backOffAtom(bf-1,bx1,by1,bx2,by2);
		xy2=backOffAtom(bt-1,bx2,by2,bx1,by1);
		bx1=xy1[0]; by1=xy1[1]; bx2=xy2[0]; by2=xy2[1];

		if (devRounding)
		{
			// round the positions, then look for pixel-sized adjustments to B to find the best offset (if any) which honours the two lines
			// being parallel with distance of 'bondSep'
			
			ax1=Math.round(ax1); ay1=Math.round(ay1); ax2=Math.round(ax2); ay2=Math.round(ay2);
			bx1=Math.round(bx1); by1=Math.round(by1); bx2=Math.round(bx2); by2=Math.round(by2);
			
			int dx1=0,dy1=0,dx2=0,dy2=0;
			double best=1E10,bondSepSq=Util.sqr(bondSep);
			final int[] RDX1={0,-1,1,0,0,0,0,0,0},RDY1={0,0,0,-1,1,0,0,0,0},RDX2={0,0,0,0,0,-1,1,0,0},RDY2={0,0,0,0,0,0,0,-1,1};
			boolean orthog=(Util.dblEqual(ax1,ax2) && Util.dblEqual(bx1,bx2)) ||
						   (Util.dblEqual(ay1,ay2) && Util.dblEqual(by1,by2));
			if (!orthog) for (int n=0;n<9;n++)
			{
				double ux1=bx1+RDX1[n],uy1=by1+RDY1[n],ux2=bx2+RDX2[n],uy2=by2+RDY2[n];
				double ox=uy1-uy2,oy=ux2-ux1;
				double[] ixy1=lineIntersection(ux1,uy1,ux1+ox,uy1+oy,ax1,ay1,ax2,ay2);
				double[] ixy2=lineIntersection(ux2,uy2,ux2+ox,uy2+oy,ax1,ay1,ax2,ay2);
				double dsq1=Util.sqr(ixy1[0]-ux1)+Util.sqr(ixy1[1]-uy1);
				double dsq2=Util.sqr(ixy2[0]-ux2)+Util.sqr(ixy2[1]-uy2);
				double score=Math.abs(dsq1-bondSepSq)+Math.abs(dsq2-bondSepSq);
				if (score<best) 
				{
					best=score;
					dx1=RDX1[n];
					dy1=RDY1[n];
					dx2=RDX2[n];
					dy2=RDY2[n];
				}
			}
			bx1+=dx1;
			by1+=dy1;
			bx2+=dx2;
			by2+=dy2;
		}

		lines.add(new BLine(N,BLINE_NORMAL,ax1,ay1,ax2,ay2,sz,foreground));
		lines.add(new BLine(N,BLINE_NORMAL,bx1,by1,bx2,by2,sz,foreground));

		if (side==0 && !noshift && mol.atomRingBlock(bf)==0 && mol.atomRingBlock(bt)==0)
		{
			if (pointText(bf-1)==null)
			{
				adjustBondPosition(idxFLeft,bf,ax1,ay1);
				adjustBondPosition(idxFRight,bf,bx1,by1);
			}
			if (pointText(bt-1)==null)
			{
				adjustBondPosition(idxTLeft,bt,ax2,ay2);
				adjustBondPosition(idxTRight,bt,bx2,by2);
			}
		}
	}
	
	// returns true if, for an atom, all of its neighbours are not oriented in the given direction (180deg)
	private boolean quadrantOpen(int N,int DX,int DY)
	{
		int[] nbr=mol.atomAdjList(N+1);
		for (int n=0;n<nbr.length;n++)
		{
			double ox=pointCX(nbr[n]-1)-pointCX(N),oy=pointCY(nbr[n]-1)-pointCY(N);
			if (DX==1 && DY==0 && ox>0) return false;
			if (DX==-1 && DY==0 && ox<0) return false;
			if (DX==0 && DY==1 && oy>0) return false;
			if (DX==0 && DY==-1 && oy<0) return false;
		}
		return true;
	}

	// for an atom centre, with a non-zero number of hydrogen labels required, in the direction indicated by (DX,DY), see if there 
	// is room to fit the label, and if there is, stick it there and return true; special case: if (DX,DY) are both zero, then 
	// search around the central position looking for the least bad position, and place it there; returns true if the label was 
	// placed
	private boolean placeHydrogen(int N,int HCount,int DX,int DY)
	{
		final double KERN_CONST=1.1;

		APoint a=points.get(N);

		double[] wad=measure.measureText("H",a.fsz);

		double cx=a.cx+DX*(a.rw+0.5*wad[0])*KERN_CONST;
		double cy=a.cy+DY*(a.rh+0.5*(wad[1]+wad[2]))*KERN_CONST;
		double rw=0.5*wad[0],rh=0.5*wad[1];

		String nstr=HCount>1 ? String.valueOf(HCount) : null;
		double nsz=0.5*a.fsz;
		double[] nwad=nstr==null ? null : measure.measureText(nstr,nsz);
		double nx=0,ny=0,nw=0,nh=0;
		if (nstr!=null)
		{
			nw=0.5*nwad[0];
			nh=0.5*nwad[1];
		}

		// if this isn't fallback mode, stop if the position isn't free
		if (DX!=0 || DY!=0)
		{
			if (boxOverlaps((float)(cx-rw),(float)(cy-rh),(float)(2*rw),(float)(2*rh))) return false;
			if (nstr!=null && DX==-1 && DY==0) cx-=nwad[0]*KERN_CONST;
		}
		else
		{
			double bestX=0,bestY=0,bestScore=0;
			for (double th=0;th<2*Math.PI;th+=Math.PI/36) // 5 degree increments
			{
				double tx=a.cx+a.rw*Math.cos(th),ty=a.cy+a.rh*Math.sin(th);
				if (tx>a.cx && tx-rw<a.cx+a.rw) tx=a.cx+a.rw+rw;
				if (tx<a.cx && tx+rw+nw*3>a.cx-a.rw) tx=a.cx-a.rw-rw-nw*2*KERN_CONST;
				if (ty>a.cy && ty-rh<a.cy+a.rh) ty=a.cy+a.rw+rw;
				if (ty<a.cy && ty+rh>a.cy-a.rh) ty=a.cy-a.rh-rh;
				double score=spatialCongestion((float)tx,(float)ty)+
							 (boxOverlaps((float)(tx-rw),(float)(ty-rh),(float)(2*rw),(float)(2*rh)) ? 1000 : 0);
				if (th==0 || score<bestScore) {bestScore=score; bestX=tx; bestY=ty;}
			}
			cx=bestX;
			cy=bestY;
		}

		if (nstr!=null)
		{
			nx=cx+rw+0.75*nwad[0];
			ny=cy+0.75*rh;
		}

		APoint ah=new APoint();
		ah.anum=0;
		ah.text="H";
		ah.fsz=a.fsz;
		ah.bold=a.bold;
		ah.col=a.col;
		ah.cx=(float)cx;
		ah.cy=(float)cy;
		ah.rw=(float)rw;
		ah.rh=(float)rh;
		points.add(ah);

		if (nstr!=null)
		{
			APoint an=new APoint();
			an.anum=0;
			an.text=nstr;
			an.fsz=(float)(0.5*a.fsz);
			an.bold=a.bold;
			an.col=a.col;
			an.cx=(float)nx;
			an.cy=(float)ny;
			an.rw=(float)nw;
			an.rh=(float)nh;
			points.add(an);
		}

		return true;
	}

	// considering a single-bond line from (bf,bt), make sure the endpoint (indicated by 'bt') is moved to the position (x,y)
	private void adjustBondPosition(int bf,int bt,double x,double y)
	{
		for (int n=0;n<numLines();n++)
		{
			BLine b=lines.get(n);
			if (mol.bondOrder(b.bnum)!=1 && mol.bondType(b.bnum)!=Molecule.BONDTYPE_NORMAL) continue;

			if (mol.bondFrom(b.bnum)==bf && mol.bondTo(b.bnum)==bt) {b.x2=(float)x; b.y2=(float)y;}
			if (mol.bondFrom(b.bnum)==bt && mol.bondTo(b.bnum)==bf) {b.x1=(float)x; b.y1=(float)y;}
		}
	}

	// for the guideline index of a double bond, determines which side has weighting priority for the drawing of the bond; assumes a chain-
	// like bond (though it could still be in a large ring); a null/empty/ambiguous set implies that there is no priority, and that the bond
	// should not be drawn in a side-shifted manner...
	private int[] priorityDoubleSubstit(int N)
	{
		int bf=mol.bondFrom(N),bt=mol.bondTo(N);
		int[] nf=mol.atomAdjList(bf),nt=mol.atomAdjList(bt);
		double x1=pointCX(bf-1),y1=pointCY(bf-1),x2=pointCX(bt-1),y2=pointCY(bt-1);
		double dx=x2-x1,dy=y2-y1,btheta=Math.atan2(dy,dx);

		int idxFLeft=0,idxFRight=0,idxTLeft=0,idxTRight=0;

		for (int n=0;n<nf.length;n++) if (nf[n]!=bt)
		{
			double theta=Util.angleDiff(Math.atan2(pointCY(nf[n]-1)-y1,pointCX(nf[n]-1)-x1),btheta);
			if (theta>0) {if (idxFLeft!=0) return null; idxFLeft=nf[n];}
			else {if (idxFRight!=0) return null; idxFRight=nf[n];}
		}
		for (int n=0;n<nt.length;n++) if (nt[n]!=bf)
		{
			double theta=Util.angleDiff(Math.atan2(pointCY(nt[n]-1)-y2,pointCX(nt[n]-1)-x2),btheta);
			if (theta>0) {if (idxTLeft!=0) return null; idxTLeft=nt[n];}
			else {if (idxTRight!=0) return null; idxTRight=nt[n];}
		}
		
		int sumFrom=(idxFLeft>0 ? 1 : 0)+(idxFRight>0 ? 1 : 0),sumTo=(idxTLeft>0 ? 1 : 0)+(idxTRight>0 ? 1 : 0);
		
		if (sumFrom==1 && sumTo==0) return new int[]{idxFLeft>0 ? idxFLeft : idxFRight};
		if (sumFrom==0 && sumTo==1) return new int[]{idxTLeft>0 ? idxTLeft : idxTRight};
		if (sumFrom==1 && sumTo==1)
		{
			// cis? if so, then side is obvious
			if (idxFLeft>0 && idxTLeft>0) return new int[]{idxFLeft,idxTLeft};
			if (idxFRight>0 && idxTRight>0) return new int[]{idxFRight,idxTRight};
			
			// trans? either is fine, so go with congestion
			double[] oxy=orthogonalDelta(x1,y1,x2,y2,bondSep);
			double congestLeft=spatialCongestion((float)(0.5*(x1+x2)+oxy[0]),(float)(0.5*(y1+y2)+oxy[1]));
			double congestRight=spatialCongestion((float)(0.5*(x1+x2)-oxy[0]),(float)(0.5*(y1+y2)-oxy[1]));
			if (congestLeft<congestRight) return new int[]{idxFLeft>0 ? idxFLeft : idxTLeft};
			else return new int[]{idxFRight>0 ? idxFRight : idxTRight};
		}
		if (sumFrom==2 && sumTo==1)
		{
			// side with the majority
			if (idxTLeft==0) return new int[]{idxFRight,idxTRight};
			else return new int[]{idxFLeft,idxTLeft};
		}
		if (sumFrom==1 && sumTo==2)
		{
			// side with the majority
			if (idxFLeft==0) return new int[]{idxFRight,idxTRight};
			else return new int[]{idxFLeft,idxTLeft};
		}

		return null;
	}
	
	// for the lines L1-->L2 and L3-->L4, calculate and return the intersection; (note lines, not line segments)
	private double[] lineIntersection(double x1,double y1,double x2,double y2,double x3,double y3,double x4,double y4)
	{
		double u=((x4-x3)*(y1-y3) - (y4-y3)*(x1-x3))
				/((y4-y3)*(x2-x1) - (x4-x3)*(y2-y1));
		return new double[]{x1+u*(x2-x1),y1+u*(y2-y1)};
	}
	
	// for a specific location, returns a measure of how "congested" it is; lower values mean that the point is generally far away
	// from things
	private float spatialCongestion(float x,float y)
	{
		float congest=0;
		for (int n=0;n<numPoints();n++) 
		{
			APoint a=points.get(n);
			if (a==null) continue;
			float dx=a.cx-x,dy=a.cy-y;
			congest+=1/(dx*dx+dy*dy+0.001f);
		}
		return congest;
	}

	// returns true if the indicated box intersects with any of the currently defined atom centres or bond lines; can optionally
	// pass masks for the points & lines which we could possibly care about
	private boolean boxOverlaps(float x,float y,float w,float h) {return boxOverlaps(x,y,w,h,null,null);}
	private boolean boxOverlaps(float x,float y,float w,float h,boolean[] pointmask,boolean[] linemask)
	{
		float vx1=x,vy1=y,vx2=x+w,vy2=y+h;
		
		for (int n=0;n<numPoints();n++)
		{
			if (pointmask!=null && !pointmask[n]) continue;
		
			APoint a=points.get(n);
			float wx1=a.cx-a.rw,wy1=a.cy-a.rh,wx2=a.cx+a.rw,wy2=a.cy+a.rh;
			
			// test for any intersection of rectangles
			if (vx2<wx1 || vx1>wx2 || vy2<wy1 || vy1>wy2) continue; // no intersection of rectangles
			
			return true;
		}
		
		for (int n=0;n<numLines();n++)
		{
			if (linemask!=null && !linemask[n]) continue;
		
			BLine b=lines.get(n);
			
			float wx1=b.x1,wy1=b.y1,wx2=b.x2,wy2=b.y2;
			
			// test for any intersection with line's rectangle
			if (vx2<Math.min(wx1,wx2) || vx1>Math.max(wx1,wx2) || 
				vy2<Math.min(wy1,wy2) || vy1>Math.max(wy1,wy2)) continue; // no intersection of rectangles
			
			// if either point is completely in the box, then fast-out
			if (wx1>=vx1 && wx1<=vx2 && wy1>=vy1 && wy1<=vy2) return true;
			if (wx2>=vx1 && wx2<=vx2 && wy2>=vy1 && wy2<=vy2) return true;
			
			if (Line2D.linesIntersect(wx1,wy1,wx2,wy2, vx1,vy1,vx2,vy1)) return true;
			if (Line2D.linesIntersect(wx1,wy1,wx2,wy2, vx1,vy2,vx2,vy2)) return true;
			if (Line2D.linesIntersect(wx1,wy1,wx2,wy2, vx1,vy1,vx1,vy2)) return true;
			if (Line2D.linesIntersect(wx1,wy1,wx2,wy2, vx2,vy1,vx2,vy2)) return true;
		}
		
		return false;
		
/* !! alternative to Line2D.linesIntersect... in progress...
			// now we know both points are outside the box, so look for intersection with the edges
			float dx=wx2-wx1,dy=wy2-wy1;
			if (Math.abs(dx)>0.001f)
			{
				float invDX=1f/dx;
				float iy=(vx1-wx1)*invDX*dy+wy1;
				if (iy>=wy1 && iy<=wy2) return true;
				iy=(vx2-wx1)*invDX*dy+wy1;
				if (iy>=wy1 && iy<=wy2) return true;
			}
			if (Math.abs(dy)>0.001f)
			{
				float invDY=1f/dy;
				float ix=(vy1-wy1)*invDY*dx+wx1;
				if (ix>=wx1 && ix<=wx2) return true;
				ix=(vy2-wy1)*invDY*dx+wx1;
				if (ix>=wx1 && ix<=wx2) return true;
			}*/
	}
	
	// for a given piece of text, tries to find a position close to that which is given, which does not overlap with anything;
	// the (rw,rh) positions are the ideal placement distances from the centre; thdir is the direction which it should ideally
	// be oriented in (or NaN if no preference); if narrowVec is true, then thdir is more of a constraint than a preference
	private double[] anchorAnnotation(double px,double py,double rw,double rh)
		{return anchorAnnotation(px,py,rw,rh,Double.NaN,false);}
	private double[] anchorAnnotation(double px,double py,double rw,double rh,double thdir,boolean narrowVec)
		{return anchorAnnotation((float)px,(float)py,(float)rw,(float)rh,(float)thdir,narrowVec);}
	
	private double[] anchorAnnotation(float px,float py,float rw,float rh,float thdir,boolean narrowVec)
	{
		if (!boxOverlaps(px,py,rw,rh)) return new double[]{px,py}; // just in case it's blank...

		// construct prescreening filters for just the local region
		boolean[] pointmask=new boolean[numPoints()],linemask=new boolean[numLines()];
		float maxext=(float)Math.max(rw+rh,3*scale),maxR=Math.max(rw,rh);
		for (int n=0;n<numPoints();n++)
		{
			APoint a=points.get(n);
			float dx=a.cx-px,dy=a.cy-py;
			float delta=maxext+maxR;
			pointmask[n]=dx*dx+dy*dy < delta*delta;
		}
		float px1=px-maxext,py1=py-maxext,px2=px+maxext,py2=py+maxext;
		for (int n=0;n<numLines();n++)
		{
			BLine b=lines.get(n);
			linemask[n]=!(px2<Math.min(b.x1,b.x2) || px1>Math.max(b.x1,b.x2) || 
						  py2<Math.min(b.y1,b.y2) || py1>Math.max(b.y1,b.y2));
		}
		
		// do radial sweeps: take the best angle at the current extension, or if none, loop around with a bigger sweep
		float stepext=(float)(0.25*scale),ext=stepext;
		boolean lastChance=false;
		while (true)
		{
			double bestX=0,bestY=0,bestScore=-1;
			float th1=0,th2=(float)(2*Math.PI);
			if (!Double.isNaN(thdir) && narrowVec) {th1=thdir-(float)Math.PI/4; th2=thdir+(float)Math.PI/4;}
			for (double th=th1;th<th2;th+=Math.PI/36) // 5 degree increments
			{
				float tx=px+ext*(float)Math.cos(th),ty=py+ext*(float)Math.sin(th);
				if (!lastChance) if (boxOverlaps(tx-rw,ty-rh,2*rw,2*rh,pointmask,linemask)) continue;
				double score=spatialCongestion(tx,ty);
				if (!Float.isNaN(thdir) && !narrowVec) score=score*(1.1-Math.cos(Util.angleDiff(th,thdir)));
				
				if (bestScore<0 || score<bestScore) {bestScore=score; bestX=tx; bestY=ty;}
			}
			if (bestScore>=0) 
			{
				return new double[]{bestX,bestY};
			}

			// nothing flies, so increase the extent; if gone too far, wind it back in, and pick the best of the bad
			ext+=stepext;
			if (ext>3*scale) {ext=rw+rh; lastChance=true; narrowVec=false;}
		}
	}
}


/*
	Sketch Elements: Chemistry molecular diagram drawing tool.
	
	(c) 2005-2013 Dr. Alex M. Clark, all rights reserved
	
	Released as GNUware, under the Gnu Public License (GPL)
	
	See www.gnu.org for details.
*/

package org.sketchel;

import java.util.*;
import java.io.*;

/*
	Internal molecule datastructure, which captures the basic information about a molecule as envisaged by the traditional diagram
	notation. The core data is stored as a list of labelled nodes (atoms) and labelled edges (bonds). Besides very basic editing and
	convenient object manipulation, a few computed properties are available, some of which are cached.
*/

public class Molecule
{
	class Atom
	{
		String Element;
		double X,Y;
		int Charge;
		int Unpaired;
		int Isotope;
		int HExplicit;
		int MapNum;
		String[] Extra;
		String[] Transient;
	}
	class Bond
	{
		int From,To;
		int Order,Type;
		String[] Extra;
		String[] Transient;
	}

	public static final int HEXPLICIT_UNKNOWN=-1;
	
	public static final int ISOTOPE_NATURAL=0;

	public static final int BONDTYPE_NORMAL=0;
	public static final int BONDTYPE_INCLINED=1;
	public static final int BONDTYPE_DECLINED=2;
	public static final int BONDTYPE_UNKNOWN=3;

	public static final String[] ELEMENTS=
		{null,"H","He","Li","Be","B","C","N","O","F","Ne","Na","Mg","Al","Si","P","S","Cl","Ar","K","Ca","Sc","Ti","V","Cr","Mn","Fe","Co",
		"Ni","Cu","Zn","Ga","Ge","As","Se","Br","Kr","Rb","Sr","Y","Zr","Nb","Mo","Tc","Ru","Rh","Pd","Ag","Cd","In","Sn","Sb","Te","I",
		"Xe","Cs","Ba","La","Ce","Pr","Nd","Pm","Sm","Eu","Gd","Tb","Dy","Ho","Er","Tm","Yb","Lu","Hf","Ta","W","Re","Os","Ir","Pt","Au",
		"Hg","Tl","Pb","Bi","Po","At","Rn","Fr","Ra","Ac","Th","Pa","U","Np","Pu","Am","Cm","Bk","Cf","Es","Fm","Md","No","Lr"};

	private boolean invalMinMax=false;
	private double minX=0,minY=0,maxX=0,maxY=0;
	private ArrayList<Atom> atoms=new ArrayList<Atom>();
	private ArrayList<Bond> bonds=new ArrayList<Bond>();
	
	// computed graph topology properties
	private int[][] graph=null; // graph{A} is a list of A's neighbours; array indices, and array values, are 0-based
	private int[][] graphBond=null; // the corresponding bond positions for neighbours above; the bond number values are 1-based
	private int[] ringID=null,compID=null,priority=null;
	private ArrayList<int[]> ring3=null,ring4=null,ring5=null,ring6=null,ring7=null; // common ring sizes
	
	// computed stereochemistry properties
	public static final int STEREO_NONE=0; // topology does not allow any stereoisomers
	public static final int STEREO_POS=1; // R or Z, depending on type
	public static final int STEREO_NEG=2; // S or E, depending on type
	public static final int STEREO_UNKNOWN=3; // topology allows stereoisomers, but wedges/geometry do not resolve which
	private int[] chiral=null; // (per atom)
	private int[] cistrans=null; // (per bond)

	// data for calculation of implicit hydrogens
	public static final String[] HYVALENCE_EL={"C","N","O","S","P"};
	public static final int[]	HYVALENCE_VAL={ 4,	3,	2,	2,	3 };

	// switch this off temporarily when inserting transient data, to stop it being trashed automatically
	private boolean keepTransient=false;

	// efficiency: avoids unnecessary looping when data changes
	private boolean hasTransient=false;

	// ------------------ public functions --------------------

	public Molecule()
	{
	}

	// returns an equivalent replica of the molecule
	public Molecule clone()
	{
		Molecule mol=new Molecule();
		mol.setKeepTransient(true);

		// copy over the public access properties
		for (int n=1;n<=numAtoms();n++)
		{
			Atom a=atoms.get(n-1);
			int num=mol.addAtom(a.Element,a.X,a.Y,a.Charge,a.Unpaired);
			mol.setAtomIsotope(num,a.Isotope);
			mol.setAtomHExplicit(num,a.HExplicit);
			mol.setAtomMapNum(num,a.MapNum);
			mol.setAtomExtra(num,a.Extra);
			mol.setAtomTransient(num,a.Transient);
		}
		for (int n=1;n<=numBonds();n++)
		{
			Bond b=bonds.get(n-1);
			int num=mol.addBond(b.From,b.To,b.Order,b.Type);
			mol.setBondExtra(num,b.Extra);
			mol.setBondTransient(num,b.Transient);
		}

		// copy over privately computed properties, to avoid forcing recalculation
		if (graph!=null)
		{
			mol.graph=new int[graph.length][];
			mol.graphBond=new int[graph.length][];
			for (int n=0;n<graph.length;n++)
			{
				mol.graph[n]=(int[])graph[n].clone();
				mol.graphBond[n]=(int[])graphBond[n].clone();
			}
		}
		if (ringID!=null) mol.ringID=(int[])ringID.clone();
		if (compID!=null) mol.compID=(int[])compID.clone();
		if (priority!=null) mol.priority=(int[])priority.clone();
		// note: individual ring arrays are added as shallow copies, since they are always replaced rather than modified
		if (ring3!=null) {mol.ring3=new ArrayList<int[]>(); for (int n=0;n<ring3.size();n++) mol.ring3.add(ring3.get(n));}
		if (ring4!=null) {mol.ring4=new ArrayList<int[]>(); for (int n=0;n<ring4.size();n++) mol.ring4.add(ring4.get(n));}
		if (ring5!=null) {mol.ring5=new ArrayList<int[]>(); for (int n=0;n<ring5.size();n++) mol.ring5.add(ring5.get(n));}
		if (ring6!=null) {mol.ring6=new ArrayList<int[]>(); for (int n=0;n<ring6.size();n++) mol.ring6.add(ring6.get(n));}
		if (ring7!=null) {mol.ring7=new ArrayList<int[]>(); for (int n=0;n<ring7.size();n++) mol.ring7.add(ring7.get(n));}
		if (chiral!=null) mol.chiral=(int[])chiral.clone();
		if (cistrans!=null) mol.cistrans=(int[])cistrans.clone();
		
		mol.setKeepTransient(false);
		return mol;
	}
	
	// ----- fetching information directly from the datastructures ----
		
	public int numAtoms() {return atoms.size();}
	public int numBonds() {return bonds.size();}
	
	public String atomElement(int N) {return atoms.get(N-1).Element;}
	public double atomX(int N) {return atoms.get(N-1).X;}
	public double atomY(int N) {return atoms.get(N-1).Y;}
	public int atomCharge(int N) {return atoms.get(N-1).Charge;}
	public int atomUnpaired(int N) {return atoms.get(N-1).Unpaired;}
	public int atomIsotope(int N) {return atoms.get(N-1).Isotope;}
	public int atomHExplicit(int N) {return atoms.get(N-1).HExplicit;}
	public int atomMapNum(int N) {return atoms.get(N-1).MapNum;}
	public String[] atomExtra(int N) {String[] ret=atoms.get(N-1).Extra; return ret==null ? null : (String[])ret.clone();}
	public String[] atomTransient(int N) {String[] ret=atoms.get(N-1).Transient; return ret==null ? null : (String[])ret.clone();}

	public int bondFrom(int N) {return bonds.get(N-1).From;}
	public int bondTo(int N) {return bonds.get(N-1).To;}
	public int bondOrder(int N) {return bonds.get(N-1).Order;}
	public int bondType(int N) {return bonds.get(N-1).Type;}
	public String[] bondExtra(int N) {String[] ret=bonds.get(N-1).Extra; return ret==null ? null : (String[])ret.clone();}
	public String[] bondTransient(int N) {String[] ret=bonds.get(N-1).Transient; return ret==null ? null : (String[])ret.clone();}

	// ----- modifying information in the datastructures ----

	// adds an atom to the end of the molecule; it is fairly reasonable to assume that the new one will be at position==numAtoms(),
	// and that all other atoms will be in the same places, but the position is returned for convenience
	public int addAtom(String Element,double X,double Y) {return addAtom(Element,X,Y,0,0);}
	public int addAtom(String Element,double X,double Y,int Charge,int Unpaired)
	{
		if (X<minX || numAtoms()==0) minX=X;
		if (X>maxX || numAtoms()==0) maxX=X;
		if (Y<minY || numAtoms()==0) minY=Y;
		if (Y>maxY || numAtoms()==0) maxY=Y;

		Atom a=new Atom();
		a.Element=Element;
		a.X=X;
		a.Y=Y;
		a.Charge=Charge;
		a.Unpaired=Unpaired;
		a.HExplicit=HEXPLICIT_UNKNOWN;
		a.Extra=null;
		a.Transient=null;
		atoms.add(a);
		trashTransient();
		trashGraph();
		return atoms.size();
	}
	public void setAtomElement(int N,String Element) {atoms.get(N-1).Element=Element; trashTransient(); trashPriority();}
	public void setAtomPos(int N,double X,double Y) 
	{
		atoms.get(N-1).X=X; 
		atoms.get(N-1).Y=Y;
		invalMinMax=true;
		trashStereo();
	}
	public void setAtomCharge(int N,int Charge) {atoms.get(N-1).Charge=Charge; trashTransient(); trashPriority();}
	public void setAtomUnpaired(int N,int Unpaired) {atoms.get(N-1).Unpaired=Unpaired; trashTransient(); trashPriority();}
	public void setAtomIsotope(int N,int Isotope) {atoms.get(N-1).Isotope=Isotope;}
	public void setAtomHExplicit(int N,int HExplicit) {atoms.get(N-1).HExplicit=HExplicit; trashTransient(); trashPriority();}
	public void setAtomMapNum(int N,int MapNum) {atoms.get(N-1).MapNum=MapNum;}
	public void setAtomExtra(int N,String[] Extra) {atoms.get(N-1).Extra=Extra==null ? null : (String[])Extra.clone();}
	public void setAtomTransient(int N,String[] Transient)
	{
		atoms.get(N-1).Transient=Transient==null ? null : (String[])Transient.clone();
		hasTransient=hasTransient || Transient!=null;
	}

	// adds an atom the end of the molecule; the position of the new bond is returned for convenience
	public int addBond(int From,int To,int Order) {return addBond(From,To,Order,BONDTYPE_NORMAL);}
	public int addBond(int From,int To,int Order,int Type)
	{
		Bond b=new Bond();
		b.From=From;
		b.To=To;
		b.Order=Order;
		b.Type=Type;
		b.Extra=null;
		b.Transient=null;
		bonds.add(b);
		trashTransient();
		trashGraph();
		return bonds.size();
	}
	
	public void setBondFrom(int N,int From) {bonds.get(N-1).From=From; trashTransient(); trashGraph();}
	public void setBondTo(int N,int To) {bonds.get(N-1).To=To; trashTransient(); trashGraph();}
	public void setBondFromTo(int N,int From,int To) 
	{
		bonds.get(N-1).From=From; 
		bonds.get(N-1).To=To;
		trashTransient();
		trashGraph();
	}
	public void setBondOrder(int N,int Order) {bonds.get(N-1).Order=Order; trashTransient(); trashPriority();}
	public void setBondType(int N,int Type) {bonds.get(N-1).Type=Type; trashTransient(); trashStereo();}
	public void setBondExtra(int N,String[] Extra) {bonds.get(N-1).Extra=Extra==null ? null : (String[])Extra.clone();}
	public void setBondTransient(int N,String[] Transient)
	{
		bonds.get(N-1).Transient=Transient==null ? null : (String[])Transient.clone();
		hasTransient=hasTransient || Transient!=null;
	}
	
	// deletes the indicated atom, and also any bonds which were connected to it
	public void deleteAtomAndBonds(int N)
	{
		for (int n=0;n<numBonds();)
		{
			Bond b=bonds.get(n);
			if (b.From==N || b.To==N) bonds.remove(n);
			else
			{
				if (b.From>N) b.From--;
				if (b.To>N) b.To--;
				n++;
			}
		}
		atoms.remove(N-1);
		invalMinMax=true;
		trashTransient();
		trashGraph();
	}
	public void deleteBond(int N)
	{
		bonds.remove(N-1);
		trashTransient();
		trashGraph();
	}
	 
	// use this to temporarily disable automatic deletion of transient data
	public void setKeepTransient(boolean keep) {keepTransient=keep;}
	 
	// ----- fetching information which is computed from the underlying data, usually cached -----
	 
	public double minX() {if (invalMinMax) determineMinMax(); return minX;}
	public double maxX() {if (invalMinMax) determineMinMax(); return maxX;}
	public double minY() {if (invalMinMax) determineMinMax(); return minY;}
	public double maxY() {if (invalMinMax) determineMinMax(); return maxY;}
	public double rangeX() {return maxX-minX;}
	public double rangeY() {return maxY-minY;}
	
	// return the index of the bond, if any, which connects the two indicated atoms
	public int findBond(int A1,int A2)
	{
		if (graphBond==null) buildGraph();
		for (int n=0;n<graph[A1-1].length;n++) if (graph[A1-1][n]==A2-1) return graphBond[A1-1][n];
		return 0;
	}

	// for a bond, returns the end which is not==Ref; return value will be From,To or 0    
	public int bondOther(int N,int Ref)
	{
		if (bondFrom(N)==Ref) return bondTo(N);
		if (bondTo(N)==Ref) return bondFrom(N);
		return 0;
	}

	// returns whether an atom logically ought to be drawn "explicitly";if false, it is a carbon which should be just a dot
	public boolean atomExplicit(int N)
	{
		if (atoms.get(N-1).Isotope!=ISOTOPE_NATURAL) return true;
		if (atoms.get(N-1).Element.compareTo("C")!=0 || atoms.get(N-1).Charge!=0 || atoms.get(N-1).Unpaired!=0) return true;
		for (int n=0;n<bonds.size();n++) if (bonds.get(n).From==N || bonds.get(n).To==N) return false;
		return true;
	}
	
	// uses either explicit or computed number to determine how many hydrogens the atom has; the field for explicit hydrogens takes
	// absolute preference, if it has its default value of 'unknown', the number is computed by looking up the hydrogen capacity for
	// the element (most of which are zero), subtracting the total of bond orders, then returning the difference, or zero; the calculation
	// tends to err on the side of too few, since the concept is just an aid to drawing organic structures, not a cheminformatic attempt
	// to compensate for 2 1/2 decades of bad file formats
	// (note: returns "implicit"+"explicit", but does NOT count "actual" hydrogens, i.e. those which have their own atom nodes)
	public int atomHydrogens(int N) 
	{
		int hy=atomHExplicit(N);
		if (hy!=HEXPLICIT_UNKNOWN) return hy;
		
		for (int n=0;n<HYVALENCE_EL.length;n++) if (HYVALENCE_EL[n].compareTo(atomElement(N))==0) {hy=HYVALENCE_VAL[n]; break;}
		if (hy==HEXPLICIT_UNKNOWN) return 0;
		int ch=atomCharge(N);
		if (atomElement(N).compareTo("C")==0) ch=-Math.abs(ch);
		hy+=ch-atomUnpaired(N);
		for (int n=1;n<=numBonds();n++) if (bondFrom(n)==N || bondTo(n)==N) hy-=bondOrder(n);
		return hy<0 ? 0 : hy;
	}
	 
	// returns the numerical ID of the ring block in which the atom resides, or 0 if it is not in a ring   
	public int atomRingBlock(int N)
	{
		if (graph==null) buildGraph();
		if (ringID==null) buildRingID();
		return ringID[N-1];
	}
	// returns whether or not a bond resides in a ring (i.e. ring block of each end is the same and nonzero)
	public boolean bondInRing(int N)
	{
		int r1=atomRingBlock(bondFrom(N)),r2=atomRingBlock(bondTo(N));
		return r1>0 && r1==r2;
	}
	
	// returns the connected component ID of the atom, always 1 or more
	public int atomConnComp(int N)
	{
		if (graph==null) buildGraph();
		if (compID==null) buildConnComp();
		return compID[N-1];
	}
	
	// returns the number of neighbours of an atom
	public int atomAdjCount(int N)
	{
		if (graph==null) buildGraph();
		return graph[N-1].length;
	}
	
	// returns the actual adjacency list of an atom; unfortunately this has to make a clone of the array, since the numbers are converted
	// to 1-based indices, and we would not want callers modifying it anyway
	public int[] atomAdjList(int N)
	{
		if (graph==null) buildGraph();
		int[] adj=graph[N-1].clone();
		for (int n=0;n<adj.length;n++) adj[n]++;
		return adj;
	}
	
    // returns the bond indices of the adjacency list for the atom; the return value is a 1-based deep copy
    public int[] atomAdjBonds(int N)
    {
    	if (graphBond==null) buildGraph();
    	int[] adj=graphBond[N-1].clone();
    	return adj;
    }
	
	// returns atom-based priority according to the Cahn-Ingold-Prelog rules
	public int atomPriority(int N)
	{
		if (graph==null) buildGraph();
		if (compID==null) buildConnComp();
		if (priority==null) buildPriority();
		return priority[N-1];
	}
	
	// return the tetrahedral chirality of the given atom
	public int atomChirality(int N)
	{
		if (graph==null) buildGraph();
		if (compID==null) buildConnComp();
		if (priority==null) buildPriority();
		if (chiral==null) buildChirality();
		return chiral[N-1];
	}
	
	// return the cis/trans style stereochemistry of the given bond
	public int bondStereo(int N)
	{
		if (graph==null) buildGraph();
		if (compID==null) buildConnComp();
		if (priority==null) buildPriority();
		if (cistrans==null) buildCisTrans();
		return cistrans[N-1];
	}
	
	// returns _all_ rings of indicated size; each item in the array list is an array of int[Size], a consecutively ordered array of atom 
	// numbers; uses a recursive depth first search, which must be bounded above by Size being small in order to avoid exponential blowup
	public int[][] findRingSize(int Size) 
	{
		ArrayList<int[]> rings=null;
		if (Size==3 && ring3!=null) rings=ring3;
		if (Size==4 && ring4!=null) rings=ring4;
		if (Size==5 && ring5!=null) rings=ring5;
		if (Size==6 && ring6!=null) rings=ring6;
		if (Size==7 && ring7!=null) rings=ring7;
	
		if (rings==null)
		{
			if (graph==null) buildGraph();
			if (ringID==null) buildRingID();

			rings=new ArrayList<int[]>();
			for (int n=1;n<=numAtoms();n++) if (ringID[n-1]>0) 
			{
				int path[]=new int[Size];
				path[0]=n;
				recursiveRingFind(path,1,Size,ringID[n-1],rings);
			}

			if (Size==3) ring3=rings;
			if (Size==4) ring4=rings;
			if (Size==5) ring5=rings;
			if (Size==6) ring6=rings;
			if (Size==7) ring7=rings;
		}
		
		int ret[][]=new int[rings.size()][];
		for (int n=0;n<rings.size();n++) ret[n]=((int[])rings.get(n)).clone();
		return ret;
	}
	
	// compare to another molecule instance; null is equivalent to empty; return values:
	//	   -1 if Mol < Other
	//		0 if Mol == Other
	//		1 if Mol > Other 
	//	can be used to sort molecules, albeit crudely; does not do any kind of canonical preprocessing
	public int compareTo(Molecule Other)
	{
		if (Other==null) return numAtoms()==0 ? 0 : 1; // null is equivalent to empty
		if (numAtoms()<Other.numAtoms()) return -1;
		if (numAtoms()>Other.numAtoms()) return 1;
		if (numBonds()<Other.numBonds()) return -1;
		if (numBonds()>Other.numBonds()) return 1;
		
		for (int n=1;n<=numAtoms();n++)
		{
			int c=atomElement(n).compareTo(Other.atomElement(n));
			if (c!=0) return c;
			if (atomX(n)<Other.atomX(n)) return -1; if (atomX(n)>Other.atomX(n)) return 1;
			if (atomY(n)<Other.atomY(n)) return -1; if (atomY(n)>Other.atomY(n)) return 1;
			if (atomCharge(n)<Other.atomCharge(n)) return -1; if (atomCharge(n)>Other.atomCharge(n)) return 1;
			if (atomUnpaired(n)<Other.atomUnpaired(n)) return -1; if (atomUnpaired(n)>Other.atomUnpaired(n)) return 1;
			if (atomHExplicit(n)<Other.atomHExplicit(n)) return -1; if (atomHExplicit(n)>Other.atomHExplicit(n)) return 1;
			if (atomIsotope(n)<Other.atomIsotope(n)) return -1; if (atomIsotope(n)>Other.atomIsotope(n)) return 1;
			if (atomMapNum(n)<Other.atomMapNum(n)) return -1; if (atomMapNum(n)>Other.atomMapNum(n)) return 1;
			
			String[] tx1=atomExtra(n),tx2=Other.atomExtra(n);
			int sz1=tx1==null ? 0 : tx1.length,sz2=tx2==null ? 0 : tx2.length;
			if (sz1<sz2) return -1; if (sz1>sz2) return 1;
			for (int i=0;i<sz1;i++) {c=tx1[i].compareTo(tx2[i]); if (c!=0) return c;}
			
			tx1=atomTransient(n); tx2=Other.atomTransient(n);
			sz1=tx1==null ? 0 : tx1.length; sz2=tx2==null ? 0 : tx2.length;
			if (sz1<sz2) return -1; if (sz1>sz2) return 1;
			for (int i=0;i<sz1;i++) {c=tx1[i].compareTo(tx2[i]); if (c!=0) return c;}
		}
		for (int n=1;n<=numBonds();n++)
		{
			if (bondFrom(n)<Other.bondFrom(n)) return -1; if (bondFrom(n)>Other.bondFrom(n)) return 1;
			if (bondTo(n)<Other.bondTo(n)) return -1; if (bondTo(n)>Other.bondTo(n)) return 1;
			if (bondOrder(n)<Other.bondOrder(n)) return -1; if (bondOrder(n)>Other.bondOrder(n)) return 1;
			if (bondType(n)<Other.bondType(n)) return -1; if (bondType(n)>Other.bondType(n)) return 1;
		
			int c;
			String[] tx1=bondExtra(n),tx2=Other.bondExtra(n);
			int sz1=tx1==null ? 0 : tx1.length,sz2=tx2==null ? 0 : tx2.length;
			if (sz1<sz2) return -1; if (sz1>sz2) return 1;
			for (int i=0;i<sz1;i++) {c=tx1[i].compareTo(tx2[i]); if (c!=0) return c;}
			
			tx1=bondTransient(n); tx2=Other.bondTransient(n);
			sz1=tx1==null ? 0 : tx1.length; sz2=tx2==null ? 0 : tx2.length;
			if (sz1<sz2) return -1; if (sz1>sz2) return 1;
			for (int i=0;i<sz1;i++) {c=tx1[i].compareTo(tx2[i]); if (c!=0) return c;}
		}
		
		return 0;
	}
	
	// lookup the atomic number for the element, or return 0 if not in the periodic table
	public int atomicNumber(int N) {return atomicNumber(atomElement(N));}
	public static int atomicNumber(String El)
	{
		for (int n=1;n<ELEMENTS.length;n++) if (ELEMENTS[n].compareTo(El)==0) return n;
		return 0;
	}

	// takes the indicated molecular fragment and appends it to the end of the current molecule, with order preserved
	public void append(Molecule frag)
	{
		int base=numAtoms();
		for (int n=1;n<=frag.numAtoms();n++)
		{
			int num=addAtom(frag.atomElement(n),frag.atomX(n),frag.atomY(n),frag.atomCharge(n),frag.atomUnpaired(n));
			setAtomIsotope(num,frag.atomIsotope(n));
			setAtomHExplicit(num,frag.atomHExplicit(n));
			setAtomMapNum(num,frag.atomMapNum(n));
			setAtomExtra(num,frag.atomExtra(n));
		}
		for (int n=1;n<=frag.numBonds();n++)
		{
			int num=addBond(frag.bondFrom(n)+base,frag.bondTo(n)+base,frag.bondOrder(n),frag.bondType(n));
			setBondExtra(num,frag.bondExtra(n));
		}
	}

	// returns a molecule which is smaller than the current one, according to the mask (which must be of size #atoms); boundary cases
	// are a null molecule or cloned copy
	public Molecule subgraph(boolean[] mask)
	{
		int[] invidx=new int[numAtoms()];
		int sum=0;
		for (int n=0;n<numAtoms();n++) if (mask[n]) invidx[n]=++sum; else invidx[n]=0;
		if (sum==0) return new Molecule();
		if (sum==numAtoms()) return clone();
		
		Molecule frag=new Molecule();
		for (int n=1;n<=numAtoms();n++) if (mask[n-1])
		{
			int num=frag.addAtom(atomElement(n),atomX(n),atomY(n),atomCharge(n),atomUnpaired(n));
			frag.setAtomIsotope(num,atomIsotope(n));
			frag.setAtomHExplicit(num,atomHExplicit(n));
			frag.setAtomMapNum(num,atomMapNum(n));
			frag.setAtomExtra(num,atomExtra(n));
		}
		for (int n=1;n<=numBonds();n++) 
		{
			int from=invidx[bondFrom(n)-1],to=invidx[bondTo(n)-1];
			if (from>0 && to>0)
			{
				int num=frag.addBond(from,to,bondOrder(n),bondType(n));
				frag.setBondExtra(num,bondExtra(n));
			}
		}
		
		return frag;
	}
	
	// given a list of indices, constructs a new molecule which has the atoms in that order; the construction of idx[n] is such
	// that the new atom at position {n+1} will be the atom previously located at idx[n]; for example, a molecule containing the
	// atoms [C,O,N,H], reordered by indices of [3,2,4,1], will produce a new molecule with atoms [N,O,H,C]; the bonds will also
	// be correctly remapped; idx.length must be equal to or less than the number of atoms; each index must be unique and 
	// in the range {1..#atoms}, otherwise the result is undefined
	public Molecule subgraph(int[] idx) 
	{
		int[] invidx=new int[numAtoms()];
		for (int n=0;n<invidx.length;n++) invidx[n]=0;
		for (int n=0;n<idx.length;n++) invidx[idx[n]-1]=n+1;
		
		Molecule frag=new Molecule();
		for (int n=0;n<idx.length;n++)
		{
			int num=frag.addAtom(atomElement(idx[n]),atomX(idx[n]),atomY(idx[n]),atomCharge(idx[n]),atomUnpaired(idx[n]));
			frag.setAtomIsotope(num,atomIsotope(idx[n]));
			frag.setAtomHExplicit(num,atomHExplicit(idx[n]));
			frag.setAtomMapNum(num,atomMapNum(idx[n]));
			frag.setAtomExtra(num,atomExtra(idx[n]));
		}
		for (int n=1;n<=numBonds();n++)
		{
			int from=invidx[bondFrom(n)-1],to=invidx[bondTo(n)-1];
			if (from>0 && to>0) 
			{
				int num=frag.addBond(from,to,bondOrder(n),bondType(n));
				frag.setBondExtra(num,bondExtra(n));
			}
		}
		
		return frag;
	}
	
	// works similarly to reorderAtoms(..) above, except operates on the order of the bond list; the atoms are unaffected
	public Molecule reorderedBonds(int[] idx)
	{
		Molecule mol=new Molecule();
		for (int n=1;n<=numAtoms();n++)
		{
			int num=mol.addAtom(atomElement(n),atomX(n),atomY(n),atomCharge(n),atomUnpaired(n));
			mol.setAtomHExplicit(num,atomHExplicit(n));
			mol.setAtomMapNum(num,atomMapNum(n));
		}
		for (int n=0;n<idx.length;n++)
		{
			mol.addBond(bondFrom(idx[n]),bondTo(idx[n]),bondOrder(idx[n]),bondType(idx[n]));
		}
		
		return mol;
	}

	// convenient debugging mechanism
	public void dump()
	{
		Util.writeln(toString());
	}
	
	public String toString()
	{
		StringWriter sw=new StringWriter();
		try
		{
			MoleculeWriter.writeNative(new BufferedWriter(sw),this);
			return sw.toString();
		}
		catch (IOException ex) {return null;}
	}

	// ------------------ private functions --------------------
	
	// lose all "transient" data for atoms and bonds whenever the molecule is modified in any way
	private void trashTransient()
	{
		if (!hasTransient || keepTransient) return;
		for (int n=0;n<numAtoms();n++) atoms.get(n).Transient=null;
		for (int n=0;n<numBonds();n++) bonds.get(n).Transient=null;
		hasTransient=false;
	}
	
	// for when the connectivity changes somehow; abandon graph properties
	private void trashGraph()
	{
		graph=null;
		graphBond=null;
		ringID=null;
		ring3=null;
		ring4=null;
		ring5=null;
		ring6=null;
		ring7=null;
		compID=null;
		trashPriority();
	}
	private void trashPriority() 
	{
		priority=null;
		trashStereo();
	}
	private void trashStereo()
	{
		chiral=null;
		cistrans=null;
	}
	
	// update the cache of atom range
	private void determineMinMax()
	{
		invalMinMax=false;
		if (numAtoms()==0) 
		{
			minX=maxX=minY=maxY=0; 
			return;
		}
		minX=maxX=atomX(1);
		minY=maxY=atomY(1);
		for (int n=2;n<=numAtoms();n++)
		{
			double x=atomX(n),y=atomY(n);
			minX=Math.min(minX,x);
			maxX=Math.max(maxX,x);
			minY=Math.min(minY,y);
			maxY=Math.max(maxY,y);
		}
	}

	// update the cache of the molecular graph, in adjacency format, rather than the edge list format; the former is much better for
	// graph algorithms, the latter much more suited to capturing sketcher-ish information content; note that the graph indices are
	// zero-based
	private void buildGraph()
	{
		graph=new int[numAtoms()][];
		graphBond=new int[numAtoms()][];
		
		for (int n=1;n<=numBonds();n++)
		{
			int bf=bondFrom(n)-1,bt=bondTo(n)-1;
			if (bf==bt) continue; // ouch!
			
			int lf=graph[bf]==null ? 0 : graph[bf].length,lt=graph[bt]==null ? 0 : graph[bt].length;

			int[] bl=new int[lf+1],bn=new int[lf+1];
			for (int i=0;i<lf;i++) {bl[i]=graph[bf][i]; bn[i]=graphBond[bf][i];}
			bl[lf]=bt; graph[bf]=bl;
			bn[lf]=n; graphBond[bf]=bn;

			bl=new int[lt+1]; bn=new int[lt+1];
			for (int i=0;i<lt;i++) {bl[i]=graph[bt][i]; bn[i]=graphBond[bt][i];}
			bl[lt]=bf; graph[bt]=bl;
			bn[lt]=n; graphBond[bt]=bn;
		}
		for (int n=0;n<numAtoms();n++) if (graph[n]==null) {graph[n]=new int[0]; graphBond[n]=new int[0];}
	}
	
	// passes over the graph establishing which component each atom belongs to
	private void buildConnComp()
	{
		compID=new int[numAtoms()];
		for (int n=0;n<numAtoms();n++) compID[n]=0;
		int comp=1;
		compID[0]=comp;

		// (not very efficient, should use a stack-based depth first search)
		while (true)
		{
			boolean anything=false;
			for (int n=0;n<numAtoms();n++) if (compID[n]>0)
			{
				for (int i=0;i<graph[n].length;i++) if (compID[graph[n][i]]==0)
				{
					compID[graph[n][i]]=comp;
					anything=true;
				}
			}
			
			if (!anything)
			{
				for (int n=0;n<numAtoms();n++) if (compID[n]==0) {compID[n]=++comp; anything=true; break;}
				if (!anything) break;
			}
		}
	}

	// generates Cahn-Ingold-Prelog priority for each atom, where degeneracies are indicated by having the same number
	private void buildPriority()
	{
		// build a graph representation which has entries replicated according to bond order
		int cipgr[][]=new int[numAtoms()][];
		for (int n=0;n<numAtoms();n++) if (cipgr[n]==null) 
		{
			cipgr[n]=new int[atomHydrogens(n+1)];
			for (int i=0;i<cipgr[n].length;i++) cipgr[n][i]=-1;
		}
		for (int n=1;n<=numBonds();n++)
		{
			int bf=bondFrom(n)-1,bt=bondTo(n)-1,bo=bondOrder(n);
			if (bf==bt || bo==0) continue;
			int lf=cipgr[bf].length,lt=cipgr[bt].length;
			int bl[]=new int[lf+bo];
			for (int i=0;i<lf;i++) bl[i]=cipgr[bf][i];
			for (int i=0;i<bo;i++) bl[lf++]=bt;
			cipgr[bf]=bl;
			bl=new int[lt+bo];
			for (int i=0;i<lt;i++) bl[i]=cipgr[bt][i];
			for (int i=0;i<bo;i++) bl[lt++]=bf;
			cipgr[bt]=bl;
		}

		// seed the priorities with atomic number
		priority=new int[numAtoms()];
		boolean anyActualH=false;
		for (int n=0;n<numAtoms();n++) {priority[n]=atomicNumber(n+1); if (priority[n]==1) anyActualH=true;}
		
		// pass through and reassign priorities as many times as necessary, until no change
		int prigr[][]=new int[numAtoms()][];
		while (true)
		{
			// make an equivalent to cipgr which has priorities instead of indices
			for (int n=0;n<numAtoms();n++) 
			{
				prigr[n]=new int[cipgr[n].length];
				for (int i=0;i<prigr[n].length;i++) if (cipgr[n][i]<0) prigr[n][i]=1; else prigr[n][i]=priority[cipgr[n][i]];
				int p=0;
				while (p<prigr[n].length-1)
				{
					if (prigr[n][p]<prigr[n][p+1]) {
						int i=prigr[n][p]; prigr[n][p]=prigr[n][p+1]; prigr[n][p+1]=i;
						if (p>0) p--;
					} else p++;
				}
			}
			
			// divide each priority category into groups, then for each of these groups, split the contents out and reassign
			int groups[][]=sortAndGroup(priority);
			int nextpri=anyActualH ? 0 : 1;
			boolean repartitioned=false;
			
			for (int n=0;n<groups.length;n++)
			{
				// sort the groups according to their cipgr contents
				int p=0;
				while (p<(groups[n]==null ? 0 : groups[n].length)-1)
				{
					int i1=groups[n][p],i2=groups[n][p+1];
					int cmp=0,sz=Math.max(prigr[i1].length,prigr[i2].length);
					for (int i=0;i<sz;i++)
					{
						int v1=i<prigr[i1].length ? prigr[i1][i] : 0,v2=i<prigr[i2].length ? prigr[i2][i] : 0;
						if (v1<v2) {cmp=-1; break;}
						if (v1>v2) {cmp=1; break;}
					}
					if (cmp>0) {groups[n][p]=i2; groups[n][p+1]=i1; if (p>0) p--;}
					else p++;
				}
				
				for (int i=0;i<groups[n].length;i++) 
				{
					if (i==0) nextpri++;
					else if (prigr[groups[n][i]].length!=prigr[groups[n][i-1]].length) {nextpri++; repartitioned=true;}
					else
					{
						for (int j=0;j<prigr[groups[n][i]].length;j++) 
							if (prigr[groups[n][i]][j]!=prigr[groups[n][i-1]][j]) {nextpri++; repartitioned=true; break;}
					}
					
					priority[groups[n][i]]=nextpri;
				}
			}

			if (!repartitioned) break;
		}
	}

	// compute the chirality values for each atom centre
	private void buildChirality()
	{
		chiral=new int[numAtoms()];
		
		boolean haswedge[]=new boolean[numAtoms()];
		for (int n=0;n<numAtoms();n++) haswedge[n]=false;
		for (int n=1;n<=numBonds();n++) if (bondType(n)==BONDTYPE_INCLINED || bondType(n)==BONDTYPE_DECLINED) haswedge[bondFrom(n)-1]=true;
		
		int pri[]=new int[4];
		double x[]=new double[4],y[]=new double[4],z[]=new double[4];
		
		for (int n=0;n<numAtoms();n++)
		{
			chiral[n]=STEREO_NONE;
			if (!(graph[n].length==4 || (graph[n].length==3 && atomHydrogens(n+1)==1))) continue;

			for (int i=0;i<graph[n].length;i++)
			{
				pri[i]=priority[graph[n][i]];
				x[i]=atomX(graph[n][i]+1)-atomX(n+1);
				y[i]=atomY(graph[n][i]+1)-atomY(n+1);
				z[i]=0;
				if (haswedge[n]) 
					for (int j=1;j<=numBonds();j++) if (bondFrom(j)==n+1 && bondTo(j)==graph[n][i]+1)
				{
					if (bondType(j)==BONDTYPE_INCLINED) z[i]=1;
					if (bondType(j)==BONDTYPE_DECLINED) z[i]=-1;
					break;
				}
			}
			if (graph[n].length==3) {pri[3]=0; x[3]=0; y[3]=0; z[3]=0;}
			
			int p=0;
			while (p<3) 
			{
				if (pri[p]>pri[p+1])
				{
					int i; double d;
					i=pri[p]; pri[p]=pri[p+1]; pri[p+1]=i;
					d=x[p]; x[p]=x[p+1]; x[p+1]=d;
					d=y[p]; y[p]=y[p+1]; y[p+1]=d;
					d=z[p]; z[p]=z[p+1]; z[p+1]=d;
					if (p>0) p--;
				}
				else p++;
			}
			if ((pri[0]==0 && pri[1]==1) || pri[0]==pri[1] || pri[1]==pri[2] || pri[2]==pri[3]) continue; // no topological chirality
			
			chiral[n]=STEREO_UNKNOWN;
			if (z[0]==0 && z[1]==0 && z[2]==0 && z[3]==0) continue; // all atoms are in-plane
			
			boolean sane=true;
			for (int i=0;i<4;i++) if (pri[0]!=0)
			{
				double r=x[i]*x[i]+y[i]*y[i]+z[i]*z[i];
				if (r<0.01*0.01) {sane=false; break;}
				r=1/Math.sqrt(r);
				x[i]=x[i]*r; y[i]=y[i]*r; z[i]=z[i]*r;
			}
			if (!sane) continue;
			
			if (pri[0]==0) // build a position for the implicit H
			{
				x[0]=-(x[1]+x[2]+x[3]);
				y[0]=-(y[1]+y[2]+y[3]);
				z[0]=-(z[1]+z[2]+z[3]);
				double r=x[0]*x[0]+y[0]*y[0]+z[0]*z[0];
				if (r<0.01*0.01) {sane=false; break;}
				r=1/Math.sqrt(r);
				x[0]=x[0]*r; y[0]=y[0]*r; z[0]=z[0]*r;
			}
			if (!sane) continue;
			
			double R=0,S=0;
			for (int i=1;i<=6;i++)
			{
				int a=0,b=0;
				if		(i==1) {a=1; b=2;} else if (i==2) {a=2; b=3;} else if (i==3) {a=3; b=1;}
				else if (i==4) {a=2; b=1;} else if (i==5) {a=3; b=2;} else if (i==6) {a=1; b=3;}
				double xx=y[a]*z[b]-y[b]*z[a] - x[0];
				double yy=z[a]*x[b]-z[b]*x[a] - y[0];
				double zz=x[a]*y[b]-x[b]*y[a] - z[0];
				if (i<=3) R+=xx*xx+yy*yy+zz*zz; else S+=xx*xx+yy*yy+zz*zz;
			}
			chiral[n]=R>S ? STEREO_POS : STEREO_NEG;
		}
	}
	
	// computer the cis/trans stereochemistry for each bond
	private void buildCisTrans()
	{
		cistrans=new int[numBonds()];
		int sf[]=new int[2],st[]=new int[2];
		
		for (int n=0;n<numBonds();n++) 
		{
			cistrans[n]=STEREO_NONE;
			int bf=bondFrom(n+1)-1,bt=bondTo(n+1)-1;
			if (bondOrder(n+1)!=2 || graph[bf].length<=1 || graph[bt].length<= 1 || graph[bf].length>3 || graph[bt].length>3) continue;

			int nf=0,nt=0;
			for (int i=0;i<graph[bf].length;i++) if (graph[bf][i]!=bt) sf[nf++]=graph[bf][i];
			for (int i=0;i<graph[bt].length;i++) if (graph[bt][i]!=bf) st[nt++]=graph[bt][i];

			if (nf==1) {if (atomHydrogens(bf+1)!=1 || priority[sf[0]]==1) continue;}
			else 
			{
				if (priority[sf[0]]==priority[sf[1]]) continue;
				if (priority[sf[0]]<priority[sf[1]]) {int i=sf[0]; sf[0]=sf[1]; sf[1]=i;}
			}
			
			if (nt==1) {if (atomHydrogens(bt+1)!=1 || priority[st[0]]==1) continue;}
			else 
			{
				if (priority[st[0]]==priority[st[1]]) continue;
				if (priority[st[0]]<priority[st[1]]) {int i=st[0]; st[0]=st[1]; st[1]=i;}
			}
		
			cistrans[n]=STEREO_UNKNOWN;

			double xa=atomX(bf+1),ya=atomY(bf+1),xb=atomX(bt+1),yb=atomY(bt+1);
			double tha0=Math.atan2(yb-ya,xb-xa),thb0=Math.PI+tha0;
			double tha1=Math.atan2(atomY(sf[0]+1)-ya,atomX(sf[0]+1)-xa);
			double tha2=nf==2 ? Math.atan2(atomY(sf[1]+1)-ya,atomX(sf[1]+1)-xa) : thetaObtuse(tha0,tha1);
			double thb1=Math.atan2(atomY(st[0]+1)-yb,atomX(st[0]+1)-xb);
			double thb2=nt==2 ? Math.atan2(atomY(st[1]+1)-yb,atomX(st[1]+1)-xb) : thetaObtuse(thb0,thb1);
			tha1-=tha0; tha2-=tha0; thb1-=thb0; thb2-=thb0;
			tha1+=(tha1<-Math.PI ? 2*Math.PI : 0)+(tha1>Math.PI ? -2*Math.PI : 0);
			tha2+=(tha2<-Math.PI ? 2*Math.PI : 0)+(tha2>Math.PI ? -2*Math.PI : 0);
			thb1+=(thb1<-Math.PI ? 2*Math.PI : 0)+(thb1>Math.PI ? -2*Math.PI : 0);
			thb2+=(thb2<-Math.PI ? 2*Math.PI : 0)+(thb2>Math.PI ? -2*Math.PI : 0);

			final double SMALL=5*Math.PI/180; // basically colinear
			if (Math.abs(tha1)<SMALL || Math.abs(tha2)<SMALL || Math.abs(thb1)<SMALL || Math.abs(thb2)<SMALL) continue;
			if (Math.abs(tha1)>Math.PI-SMALL || Math.abs(tha2)>Math.PI-SMALL) continue;
			if (Math.abs(thb1)>Math.PI-SMALL || Math.abs(thb2)>Math.PI-SMALL) continue;
			tha1=Math.signum(tha1); tha2=Math.signum(tha2); thb1=Math.signum(thb1); thb2=Math.signum(thb2);
			if (tha1==tha2 || thb1==thb2) continue;
			if (tha1*thb1<0) cistrans[n]=STEREO_POS;
			if (tha1*thb1>0) cistrans[n]=STEREO_NEG;
		}
	}

	// generally useful function which takes a list of numbers and sorts them, then bins the unique values into sub-arrays
	// (note: inefficient implementation, but could be improved easily enough)
	public static int[][] sortAndGroup(int[] Val)
	{
		ArrayList<Integer> unique=new ArrayList<Integer>();
		for (int n=0;n<Val.length;n++) unique.add(Val[n]);
		Collections.sort(unique);
		int p=0;
		while (p<unique.size()-1)
		{
			if (unique.get(p)==unique.get(p+1)) unique.remove(p); else p++;
		}

		int ret[][]=new int[unique.size()][];
		
		for (int n=0;n<Val.length;n++)
		{
			int grp=unique.indexOf(Val[n]);
			int[] cnt=new int[ret[grp]==null ? 1 : ret[grp].length+1];
			for (int i=0;i<cnt.length-1;i++) cnt[i]=ret[grp][i];
			cnt[cnt.length-1]=n;
			ret[grp]=cnt;
		}
		
		return ret;
	}

	// update the ring-block-identifier for each atom
	private void buildRingID()
	{
		ringID=new int[numAtoms()];
		if (numAtoms()==0) return;
		boolean visited[]=new boolean[numAtoms()];
		for (int n=0;n<numAtoms();n++) 
		{
			ringID[n]=0;
			visited[n]=false;
		}

		int path[]=new int[numAtoms()+1],plen=0,numVisited=0;
		boolean rewound=false;
		while (true)
		{
			int last,current;

			if (plen==0) // find an element of a new component to visit
			{
				last=-1;
				for (current=0;visited[current];current++) {}
			}
			else
			{
				last=path[plen-1];
				current=-1;
				for (int n=0;n<graph[last].length;n++) if (!visited[graph[last][n]]) {current=graph[last][n]; break;}
			}
			
			/*System.out.print("numVisited="+numVisited+" last="+last+" current="+current+" path=");
			for (int n=0;n<plen;n++) System.out.print(path[n]+" ");
			System.out.println();*/
			
			if (current>=0 && plen>=2) // path is at least 2 items long, so look for any not-previous visited neighbours
			{
				int back=path[plen-1];
				//System.out.println(" back="+back);
				for (int n=0;n<graph[current].length;n++) 
				{
					int join=graph[current][n];
					//System.out.println(" join="+join+" visited[join]="+visited[join]);
					if (join!=back && visited[join])
					{
						//System.out.print(" path:");

						path[plen]=current;
						for (int i=plen;i==plen || path[i+1]!=join;i--)
						{
							//System.out.print(" "+path[i]);

							int id=ringID[path[i]];
							if (id==0) ringID[path[i]]=last;
							else if (id!=last)
							{
								for (int j=0;j<numAtoms();j++) if (ringID[j]==id) ringID[j]=last;
							}
						}
						//System.out.println();
					}
				}
			}
			if (current>=0)  // can mark the new one as visited
			{
				visited[current]=true;
				path[plen++]=current;
				numVisited++;
				rewound=false;
			}
			else // otherwise, found nothing and must rewind the path
			{
				plen--;
				rewound=true;
			}
			
			if (numVisited==numAtoms()) break;
		}
		
		// the ring ID's are not necessarily consecutive, so reassign them to 0=none, 1..NBlocks
		int nextID=0;
		for (int i=0;i<numAtoms();i++) if (ringID[i]>0)
		{
			nextID--;
			for (int j=numAtoms()-1;j>=i;j--) if (ringID[j]==ringID[i]) ringID[j]=nextID;
		}
		for (int i=0;i<numAtoms();i++) ringID[i]=-ringID[i];
	}
	
	// ring hunter: recursive step; finds, compares and collects
	private void recursiveRingFind(int[] Path,int PSize,int Capacity,int RBlk,ArrayList<int[]> Rings)
	{
		// not enough atoms yet, so look for new possibilities
		if (PSize<Capacity)
		{
			int last=Path[PSize-1];
			for (int n=0;n<graph[last-1].length;n++)
			{
				int adj=graph[last-1][n]+1;
				if (ringID[adj-1]!=RBlk) continue;
				boolean fnd=false;
				for (int i=0;i<PSize;i++) if (Path[i]==adj) {fnd=true; break;}
				if (!fnd)
				{
					int newPath[]=Path.clone();
					newPath[PSize]=adj;
					recursiveRingFind(newPath,PSize+1,Capacity,RBlk,Rings);
				}
			}
			return;
		}
		
		// path is full, so make sure it eats its tail
		int last=Path[PSize-1];
		boolean fnd=false;
		for (int n=0;n<graph[last-1].length;n++) if (graph[last-1][n]+1==Path[0]) {fnd=true; break;}
		if (!fnd) return;
		
		// make sure every element in the path has exactly 2 neighbours within the path; otherwise it is spanning a bridge, which
        // is an undesirable ring definition
        for (int n=0;n<Path.length;n++)
        {
			int count=0,p=Path[n]-1;
			for (int i=0;i<graph[p].length;i++)
				for (int j=0;j<Path.length;j++)
					if (Path[j]==graph[p][i]+1) {count++; break;}
			if (count!=2) return; // invalid
        }
		
		// reorder the array then look for duplicates
		int first=0;
		for (int n=1;n<PSize;n++) if (Path[n]<Path[first]) first=n;
		int fm=(first-1+PSize)%PSize,fp=(first+1)%PSize;
		boolean flip=Path[fm]<Path[fp];
		if (first!=0 || flip)
		{
			int newPath[]=new int[PSize];
			for (int n=0;n<PSize;n++) newPath[n]=Path[(first+(flip ? PSize-n : n))%PSize];
			Path=newPath;
		}
				
		for (int n=0;n<Rings.size();n++)
		{
			int[] look=(int[])Rings.get(n);
			boolean same=true;
			for (int i=0;i<PSize;i++) if (look[i]!=Path[i]) {same=false; break;}
			if (same) return;
		}
		
		Rings.add(Path);
	}
	
	// returns the angle maximally equidistant from Th1 and Th2
	private double thetaObtuse(double Th1,double Th2)
	{
		double dth=Th2-Th1;
		while (dth<-Math.PI) dth+=2*Math.PI;
		while (dth>Math.PI) dth-=2*Math.PI;
		return dth>0 ? Th1-0.5*(2*Math.PI-dth) : Th1+0.5*(2*Math.PI+dth);
	}
}

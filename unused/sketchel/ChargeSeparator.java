/*
	Sketch Elements: Chemistry molecular diagram drawing tool.
	
	(c) 2005-2013 Dr. Alex M. Clark, all rights reserved
	
	Released as GNUware, under the Gnu Public License (GPL)
	
	See www.gnu.org for details.
*/

package org.sketchel;

import java.util.*;
import java.util.regex.*;
import java.io.*;
import java.text.*;
import java.lang.*;

/*
	An algorithm for converting a molecule's zero-bonds into a charge separated representation that is more compatible with
	other cheminformatics algorithms/file formats, such as MDL MOL, which do not natively support zero-bonds. The algorithm
	provides fairly rigorous treatment of cases where there are multiple options, and is fairly scalable.
	
	See: "Accurate Specification of Molecular Structures: The Case for Zero-Order Bonds and Explicit Hydrogen Counting"
		  Alex M. Clark, Journal of Chemical Information and Modeling, vol. 51, pp. 3149-3157 (2011)
		  http://pubs.acs.org/doi/abs/10.1021/ci200488k

	A note about the algorithm (described in more detail in the above paper): purpose is to convert zero-order bonds into single
	bonds, and optionally tinker with the adjacent charges, because there are a number of cases when doing this achieves the
	right valence state. When writing out the post-processed molecule to a legacy format (e.g. MDL MOL), this has a higher chance
	of being able to be interpreted in a useful way by legacy software. This is a slight improvement over just converting all
	the zero-order bonds into single bonds, but be warned that it doesn't always help. Many inorganic compounds simply cannot be
	represented in *any* meaningful way using bonds orders 1 through 3, without hydrogen counts, and the best we can do for many
	cases is just to convert to single bonds, and walk away. Also note that while the algorithm could certainly be improved, the
	long term course of action is to move to formats that support a large domain of chemistry, e.g. the native SketchEl format,
	or the MDL MOL extensions used by the MoleculeReader/MoleculeWriter classes.

	Source: this file was originally created for the com.mmi software stack, which is the Java-based cheminformatics toolkit
	used by Molecular Materials Informatics (http://molmatinf.com). It has been made available for use in SketchEl, and this
	derived source file is available under the Gnu Public License. The algorithm used to separate zero-order bonds is not
	restricted in any way, and you are welcome to reimplement it for your own software.
*/

public class ChargeSeparator 
{
    // which block of the periodic table each element belongs to, where 1=s-block, 2=p-block, 3=d-block, 4=f-block
    public static final int[] ELEMENT_BLOCKS=
    {
    	0,
    	1,                                2,
    	1,1,                    2,2,2,2,2,2,
    	1,1,                    2,2,2,2,2,2,
    	1,1,3,3,3,3,3,3,3,3,3,3,2,2,2,2,2,2,
    	1,1,3,3,3,3,3,3,3,3,3,3,2,2,2,2,2,2,
    	1,1,
    				    4,4,4,4,4,4,4,4,4,4,4,4,4,4,
    	    3,3,3,3,3,3,3,3,3,3,2,2,2,2,2,2,
    	1,1,
    				    4,4,4,4,4,4,4,4,4,4,4,4,4,4,
    	    3,3,3,3,3,3,3,3,3,3
    };

	// the number of "valence" electrons possessed by an individual uncharged atom
    public static final int[] ELEMENT_VALENCE=
    {
    	0,
    	1,                                   2,
    	1,2,                       3,4,5,6,7,8,
    	1,2,                       3,4,5,6,7,8,
    	1,2,3,4,5,6,7,8,9,10,11,12,3,4,5,6,7,8,
    	1,2,3,4,5,6,7,8,9,10,11,12,3,4,5,6,7,8,
    	1,2,
    				    4,4,4,4,4,4,4,4,4,4,4,4,4,4,
    	    3,4,5,6,7,8,9,10,11,12,3,4,5,6,7,8,
    	1,1,
    				    4,4,4,4,4,4,4,4,4,4,4,4,4,4,
    	    3,4,5,6,7,8,9,10,11,12
    };

	// the total number of "valence" electrons required to make up a full "valence shell"
    public static final int[] ELEMENT_SHELL=
    {
    	0,
    	2,                                          2,
    	8,8,                              8,8,8,8,8,8,
    	8,8,                              8,8,8,8,8,8,
    	8,8,18,18,18,18,18,18,18,18,18,18,8,8,8,8,8,8,
    	8,8,18,18,18,18,18,18,18,18,18,18,8,8,8,8,8,8,
    	8,8,
    				    18,18,18,18,18,18,18,18,18,18,18,18,18,18,
    	    18,18,18,18,18,18,18,18,18,18,18,18,18,18,18,18,
    	8,8,
    				    18,18,18,18,18,18,18,18,18,18,18,18,18,18,
    	    18,18,18,18,18,18,18,18,18,18
    };

	private Molecule inmol,outmol;

	// ----------------- public methods -----------------

	// constructor: note that the mol parameter will not be modified
	public ChargeSeparator(Molecule mol)
	{
		this.inmol=mol;
		this.outmol=mol.clone();
	}
	
	// returns false if there aren't any zero bonds; should check this first, to skip the process entirely
	public static boolean anyZeroBonds(Molecule mol)
	{
		for (int n=1;n<=mol.numBonds();n++) if (mol.bondOrder(n)==0) return true;
		return false;
	}
	
	// carries out the calculation
	public void process()
	{
		int ncomp=0;
		for (int n=1;n<=inmol.numAtoms();n++) ncomp=Math.max(ncomp,inmol.atomConnComp(n));
		ArrayList<Integer> comp=new ArrayList<Integer>();
		for (int c=1;c<=ncomp;c++)
		{
			comp.clear();
			for (int n=1;n<=inmol.numAtoms();n++) if (inmol.atomConnComp(n)==c) comp.add(n);
			separateGroup(comp);
		}
	}
	
	// obtain the result; will be null if not processed yet
	public Molecule getResult() {return outmol;}

	// ----------------- private methods -----------------

// given a list of atom indices that define a subgroup of atoms connected by zero bonds, knock them out one at a time
	private void separateGroup(ArrayList<Integer> atoms)
	{
		ArrayList<Integer> bonds=new ArrayList<Integer>();
		for (int n=0;n<atoms.size();n++)
		{
			int[] adjb=outmol.atomAdjBonds(atoms.get(n));
			for (int i=0;i<adjb.length;i++) if (outmol.bondOrder(adjb[i])==0 && bonds.indexOf(adjb[i])<0) bonds.add(adjb[i]);
		}
		
		while (bonds.size()>0)
		{
			int bi=pickBondCandidate(bonds),b=bonds.get(bi);
			bonds.remove(bi);
			
			int bfr=outmol.bondFrom(b),bto=outmol.bondTo(b);
			
			int blk1=ELEMENT_BLOCKS[outmol.atomicNumber(bfr)];
			int blk2=ELEMENT_BLOCKS[outmol.atomicNumber(bto)];
			int[] lewisAB1=lewisAcidBase(bfr),lewisAB2=lewisAcidBase(bto);

			// scenarios:
			//     (1) both atoms are amphoteric, so turn it into a double bond
			//     (2) p-block lewis acid with d/f-block element: make into double bond
			//     (3) lewis acid/base goes one way only; charge separate it
			//     (4) no matching capacity; do not charge separate
			int mod=0,ord=1;
			if (lewisAB1[0]>0 && lewisAB1[1]>0 && lewisAB2[0]>0 && lewisAB2[1]>0) ord=2;
			else if (lewisAB1[0]>0 && blk1==2 && blk2>=3) ord=2;
			else if (lewisAB2[0]>0 && blk2==2 && blk1>=3) ord=2;
			else if (lewisAB1[0]>0 && lewisAB2[1]>0) mod=-1;
			else if (lewisAB1[1]>0 && lewisAB2[0]>0) mod=1;
			
			outmol.setAtomCharge(bfr,outmol.atomCharge(bfr)+mod);
			outmol.setAtomCharge(bto,outmol.atomCharge(bto)-mod);
			outmol.setBondOrder(b,ord);
		}
	}
	
	// determines the Lewis acid/base count for an atom, and returns an array of size 2: {acid,base}; the value counts whole
	// lone pairs: i.e. each point of acidity counts for 2 electrons shy of the octet valence, while each point of basicity counts
	// for 2 electrons not involved in bonding
	private int[] lewisAcidBase(int atom)
	{
		int N=outmol.atomicNumber(atom);
		if (N==0) return new int[]{0,0}; // non-elements do not get points
		
		// derivation is done using the following properties:
		//    S=number of electrons that make up a full valence shell (typically 2, 8 or 18)
		//    V=number of valence electrons in a free atom
		//    B=sum total of all bond orders
		//    C=charge on atom
		
		int S=ELEMENT_SHELL[N];
		int V=ELEMENT_VALENCE[N];
		int B=outmol.atomHydrogens(atom);
		int[] adjb=outmol.atomAdjBonds(atom);
		for (int n=0;n<adjb.length;n++) B+=outmol.bondOrder(adjb[n]);
		int C=outmol.atomCharge(atom);
		
		return new int[]
		{
			(S-V-B+C)  >>1,	// lewis acidity: number of electron pairs desired
			(V-B-C)    >>1	// lewis basicity: number of electron pairs available
		};
	}
	
	// given a list of zerobond indices, score them all in terms of which one would be the best to separate next,
	// and return its index within the array
	private int pickBondCandidate(ArrayList<Integer> bonds)
	{
		if (bonds.size()==1) return 0;
		
		int[] score=new int[bonds.size()]; // lower is better
		for (int n=0;n<bonds.size();n++)
		{
			int b=bonds.get(n);
			int bfr=outmol.bondFrom(b),bto=outmol.bondTo(b);

			score[n]+=outmol.atomicNumber(bfr)+outmol.atomicNumber(bto);
			score[n]+=Math.abs(outmol.atomCharge(bfr))+Math.abs(outmol.atomCharge(bto));

			int[] lewisAB1=lewisAcidBase(bfr),lewisAB2=lewisAcidBase(bto);
			if (lewisAB1[0]>0 && lewisAB1[1]>0 && lewisAB2[0]>0 && lewisAB2[1]>0) score[n]+=100; // bidirectional: not good
			else if ((lewisAB1[0]>0 && lewisAB2[1]>0) || (lewisAB1[1]>0 && lewisAB2[0]>0)) score[n]-=1000; // monodirectional: good
			
			if (outmol.atomAdjCount(bfr)==1 || outmol.atomAdjCount(bto)==1) score[n]-=10;
		}

		int idxmin=0;
		for (int n=1;n<score.length;n++) if (score[n]<score[idxmin]) idxmin=n;
		return idxmin;
	}
}

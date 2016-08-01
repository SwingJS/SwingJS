/*
	Sketch Elements: Chemistry molecular diagram drawing tool.
	
	(c) 2005-2013 Dr. Alex M. Clark, all rights reserved
	
	Released as GNUware, under the Gnu Public License (GPL)
	
	See www.gnu.org for details.
*/

package org.sketchel;

import java.io.*;
import java.util.*;

/*
	Molecule editing support functions, used mainly by the EditorPane class.
*/

public class ToolChest
{
	// finds a nice place to put the new fragment which does not overlap existing content, then appends the atoms & bonds to
	// the mol parameter
	public static void addArbitraryFragment(Molecule mol,Molecule frag)
	{
		if (frag.numAtoms()==0) return;
	
		final double dirX[]={1,0,-1,1,-1,1,0,-1},dirY[]={1,1,1,0,0,-1,-1,-1};
		double dx[]=new double[8],dy[]=new double[8],score[]=new double[8];
		
		for (int n=0;n<8;n++)
		{
			double vx=dirX[n],vy=dirY[n];

			if (n==0 || n==3 || n==5) {dx[n]=mol.minX()-frag.maxX();}
			else if (n==2 || n==4 || n==7) {dx[n]=mol.maxX()-frag.minX();}
			else dx[n]=0.5*(mol.minX()+mol.maxX()-frag.minX()-frag.maxX());
			
			if (n==5 || n==6 || n==7) {dy[n]=mol.minY()-frag.maxY();}
			else if (n==0 || n==1 || n==2) {dy[n]=mol.maxY()-frag.minY();}
			else dy[n]=0.5*(mol.minY()+mol.maxY()-frag.minY()-frag.maxY());
			
			dx[n]-=vx;
			dy[n]-=vy;
			score[n]=fragPosScore(mol,frag,dx[n],dy[n]);
			
			vx*=0.25;
			vy*=0.25;
			for (int iter=100;iter>0;iter--)
			{
				double iscore=fragPosScore(mol,frag,dx[n]+vx,dy[n]+vy);
				if (iscore<=score[n]) break;
				score[n]=iscore;
				dx[n]+=vx;
				dy[n]+=vy;
			}
			for (int iter=100;iter>0;iter--) for (int d=0;d<8;d++)
			{
				vx=dirX[d]*0.1;
				vy=dirY[d]*0.1;
				double iscore=fragPosScore(mol,frag,dx[n]+vx,dy[n]+vy);
				if (iscore<=score[n]) break;
				score[n]=iscore;
				dx[n]+=vx;
				dy[n]+=vy;
			}
		}
		
		int best=0;
		for (int n=1;n<8;n++) if (score[n]>score[best]) best=n;
		
		frag=frag.clone();
		for (int n=1;n<=frag.numAtoms();n++) frag.setAtomPos(n,frag.atomX(n)+dx[best],frag.atomY(n)+dy[best]);
		
		mol.append(frag);
	}

	// like above, except that the destination centre of gravity for positioning the new fragment is provided, in 
	// component coordinates
	public static void addFragmentPosition(Molecule mol,Molecule frag,double cx,double cy)
	{
		if (frag.numAtoms()==0) return;
		frag=frag.clone();
		
		double loX=frag.atomX(1),hiX=loX,loY=frag.atomY(1),hiY=loY;
		for (int n=2;n<=frag.numAtoms();n++)
		{
			loX=Math.min(loX,frag.atomX(n));
			hiX=Math.max(hiX,frag.atomX(n));
			loY=Math.min(loY,frag.atomY(n));
			hiY=Math.max(hiY,frag.atomY(n));
		}
		cx-=0.5*(loX+hiX);
		cy-=0.5*(loY+hiY);
		for (int n=1;n<=frag.numAtoms();n++) frag.setAtomPos(n,frag.atomX(n)+cx,frag.atomY(n)+cy);
		
		mol.append(frag);
	}
	
	// scoring function for above: more congested is better, but any two atoms < 1A = zero; post-biased to favour square 
	// aspect ratio
	private static double fragPosScore(Molecule mol,Molecule frag,double dx,double dy)
	{
		double score=0;
		for (int i=1;i<=mol.numAtoms();i++)
		for (int j=1;j<=frag.numAtoms();j++)
		{
			double ox=frag.atomX(j)+dx-mol.atomX(i),oy=frag.atomY(j)+dy-mol.atomY(i);
			double dist2=ox*ox+oy*oy;
			if (dist2<1) return 0;
			score+=1/dist2;
		}
		double minX=Math.min(frag.minX()+dx,mol.minX()),maxX=Math.max(frag.maxX()+dx,mol.maxX());
		double minY=Math.min(frag.minY()+dy,mol.minY()),maxY=Math.max(frag.maxY()+dy,mol.maxY());
		double rangeX=Math.max(1,maxX-minX),rangeY=Math.max(1,maxY-minY);
		double ratio=Math.max(rangeX/rangeY,rangeY/rangeX);
		return score/ratio;
	}
	
	// the currently active template is rotated according to a mapping between bonds
	public static Molecule adjustTemplateByAtom(Molecule mol,int matom,Molecule template,int tatom)
	{
		Molecule templDraw=template.clone();
		
		int[] bonded=mol.atomAdjList(matom);
		
		final int INCR=1;
		double[] rotScores=new double[360/INCR];
		for (int n=1;n<=templDraw.numAtoms();n++) if (n!=tatom)
		{
			double x=template.atomX(n)-template.atomX(tatom),y=template.atomY(n)-template.atomY(tatom);
			double th=Math.atan2(y,x),ext=Math.sqrt(x*x+y*y);
			for (int i=0;i<(360/INCR);i++)
			{
				double rx=mol.atomX(matom)+ext*Math.cos(th+i*INCR*Math.PI/180);
				double ry=mol.atomY(matom)+ext*Math.sin(th+i*INCR*Math.PI/180);
				for (int j=0;j<bonded.length;j++)
				{
					double dx=mol.atomX(bonded[j])-rx,dy=mol.atomY(bonded[j])-ry;
					double ext2=Util.norm2(dx,dy);
					if (ext2<0.01) ext2=0.01;
					rotScores[i]+=1/ext2;
				}
			}
		}
		
		int bestRot=0;
		for (int n=1;n<(360/INCR);n++) if (rotScores[n]<rotScores[bestRot]) bestRot=n;
		
		for (int n=1;n<=templDraw.numAtoms();n++)
		{
			double x=template.atomX(n)-template.atomX(tatom),y=template.atomY(n)-template.atomY(tatom);
			double th=Math.atan2(y,x),ext=Math.sqrt(x*x+y*y);
			templDraw.setAtomPos(n,mol.atomX(matom)+ext*Math.cos(th+bestRot*INCR*Math.PI/180),
								   mol.atomY(matom)+ext*Math.sin(th+bestRot*INCR*Math.PI/180));
		}
		
		return templDraw;
	}

	// the currently active template is rotated according to a mapping between bonds
	// note: the retSwap parameter is a pass-by-reference scalar
	public static Molecule adjustTemplateByBond(Molecule mol,int mbond,Molecule template,int tbond,boolean[] retSwap)
	{
		Molecule[] rotMol=new Molecule[2];
		double[] rotScores=new double[2];
		
		for (int r=0;r<2;r++)
		{
			rotMol[r]=template.clone();
			int imol1=r==0 ? mol.bondFrom(mbond) : mol.bondTo(mbond),imol2=r==0 ? mol.bondTo(mbond) : mol.bondFrom(mbond);
			int irot1=template.bondFrom(tbond),irot2=template.bondTo(tbond);
			double dtheta=Math.atan2(mol.atomY(imol2)-mol.atomY(imol1),mol.atomX(imol2)-mol.atomX(imol1))
						 -Math.atan2(template.atomY(irot2)-template.atomY(irot1),template.atomX(irot2)-template.atomX(irot1));
			
			for (int n=1;n<=template.numAtoms();n++)
			{
				double rx=template.atomX(n)-template.atomX(irot1),ry=template.atomY(n)-template.atomY(irot1);
				double th=Math.atan2(ry,rx),ext=Math.sqrt(rx*rx+ry*ry);
				rx=mol.atomX(imol1)+ext*Math.cos(th+dtheta);
				ry=mol.atomY(imol1)+ext*Math.sin(th+dtheta);
				rotMol[r].setAtomPos(n,rx,ry);
				
				for (int i=1;i<=mol.numAtoms();i++)
				{
					double dx=mol.atomX(i)-rx,dy=mol.atomY(i)-ry;
					double ext2=Util.norm2(dx,dy);
					if (ext2<0.01) ext2=0.01;
					rotScores[r]+=1/ext2;
				}
			}
		}
		
		boolean swap=rotScores[0]<rotScores[1];
		if (retSwap!=null) retSwap[0]=swap;
		return rotMol[swap ? 0 : 1];
	}
	
	// translate the given template so that the reference point (>0=atom, <0=bond) is under the indicated position
	public static Molecule adjustTemplateByCoord(Molecule template,int refAB,double x,double y)
	{
		Molecule templDraw=template.clone();

		double dx=0,dy=0;
		if (refAB>0) {dx=template.atomX(refAB); dy=template.atomY(refAB);}
		else if (refAB<0)
		{
			int from=template.bondFrom(-refAB),to=template.bondTo(-refAB);
			dx=0.5*(template.atomX(from)+template.atomX(to));
			dy=0.5*(template.atomY(from)+template.atomY(to));
		}
		for (int n=1;n<=template.numAtoms();n++) templDraw.setAtomPos(n,template.atomX(n)-dx+x,template.atomY(n)-dy+y);
		
		return templDraw;
	}
	
	
	// places a template, where atoms are mapped
	public static void templateSetByAtom(Molecule mol,int matom,Molecule template,int tatom)
	{
		int[] map=new int[template.numAtoms()];
		int oldNum=mol.numAtoms();
		for (int n=1;n<=template.numAtoms();n++) if (tatom==0 || n!=tatom)
		{
			mol.addAtom(template.atomElement(n),template.atomX(n),template.atomY(n),
						template.atomCharge(n),template.atomUnpaired(n));
		}
		for (int n=1;n<=template.numBonds();n++)
		{
			int from=template.bondFrom(n);
			int to=template.bondTo(n);
			/* !!if (tatom>0)
			{*/
				if (from==tatom) from=matom; 
				else 
				{
					if (from>tatom) from--;
					from+=oldNum;
				}
				if (to==tatom) to=matom; 
				else 
				{
					if (to>tatom) to--;
					to+=oldNum;
				}
			/*}
			else {from+=oldNum; to+=oldNum;}*/
			mol.addBond(from,to,template.bondOrder(n),template.bondType(n));
		}
		
		mergeNewAtoms(mol,oldNum);
	}
	
	// places a template, where bonds are mapped
	public static void templateSetByBond(Molecule mol,int mbond,Molecule template,int tbond,boolean swap)
	{
		int[] map=new int[template.numAtoms()];
		int oldNum=mol.numAtoms();
		int joinFrom=mbond>0 ? mol.bondFrom(mbond) : 0,joinTo=mbond>0 ? mol.bondTo(mbond) : 0;
		int newFrom=swap ? template.bondFrom(tbond) : template.bondTo(tbond);
		int newTo=swap ? template.bondTo(tbond) : template.bondFrom(tbond);		
		for (int n=1;n<=template.numAtoms();n++)
		{
			if (n==newFrom && mbond>0) map[n-1]=joinFrom;
			else if (n==newTo && mbond>0) map[n-1]=joinTo;
			else 
			{
				map[n-1]=mol.addAtom(template.atomElement(n),template.atomX(n),template.atomY(n),
									 template.atomCharge(n),template.atomUnpaired(n));
			}
		}
		for (int n=1;n<=template.numBonds();n++) if (n!=tbond || mbond==0)
		{
			mol.addBond(map[template.bondFrom(n)-1],map[template.bondTo(n)-1],template.bondOrder(n),template.bondType(n));
		}
		
		mergeNewAtoms(mol,oldNum);
	}
	
	// any atoms of index greater than the watermark are merged with previously defined atoms if they are close
	public static void mergeNewAtoms(Molecule mol,int watermark)
	{
		int pos=watermark+1;
		while (pos<=mol.numAtoms())
		{
			int close=0;
			for (int n=1;n<=watermark;n++) 
			{
				double dx=mol.atomX(n)-mol.atomX(pos),dy=mol.atomY(n)-mol.atomY(pos);
				if (Util.norm2(dx,dy)<0.2*0.2) {close=n; break;}
			}
			if (close>0)
			{
				int[] adj=mol.atomAdjList(pos);
				for (int i=0;i<adj.length;i++) if (mol.findBond(close,adj[i])==0)
				{
					int j=mol.findBond(pos,adj[i]);
					mol.addBond(close,adj[i],mol.bondOrder(j));
				}
				mol.deleteAtomAndBonds(pos);
			}
			else pos++;
		}
	}
	
	// calculate all the wedge bond formations for a given atom for a given chirality (+/-), ranked in order, null if none
	public static ArrayList<int[]> wedgeFormations(Molecule mol,int N,int Chi)
	{
		if (mol.atomAdjCount(N)!=3 && mol.atomAdjCount(N)!=4) return null;
		int[] adj=mol.atomAdjList(N);
		for (int i=0;i<adj.length-1;i++) for (int j=i+1;j<adj.length;j++) 
			if (mol.atomPriority(adj[i])==mol.atomPriority(adj[j])) return null;

		int[] badj=new int[adj.length];
		for (int n=0;n<adj.length;n++) badj[n]=mol.findBond(N,adj[n]);
		
		ArrayList<int[]> perm=new ArrayList<int[]>();

		// generate all possible sensible wedge combinations
		if (adj.length==3)
		{
			for (int i=0;i<3;i++) for (int iz=-1;iz<=1;iz+=2)
			{
				int[] wedges=new int[3];
				for (int n=0;n<3;n++) wedges[n]=0;
				wedges[i]=iz;
				perm.add(wedges);
			}
		}
		else
		{
			for (int i=0;i<4;i++) for (int iz=-1;iz<=1;iz+=2)
			{
				int[] wedges=new int[4];
				for (int n=0;n<4;n++) wedges[n]=0;
				wedges[i]=iz;
				perm.add(wedges);
				
				for (int j=i+1;j<4;j++) for (int jz=-1;jz<=1;jz+=2)
				{
					if (/*i==j || */jz==iz) continue;
					wedges=new int[4];
					for (int n=0;n<4;n++) wedges[n]=0;
					wedges[i]=iz;
					wedges[j]=jz;
					perm.add(wedges);
				}
			}
		}

		// keep only the ones which indicate the desired enantiomer
		int pos=0;
		while (pos<perm.size())
		{
			int[] wedges=perm.get(pos);
			Molecule mchi=mol.clone();
			for (int n=0;n<adj.length;n++) 
			{
				mchi.setBondType(badj[n],wedges[n]<0 ? Molecule.BONDTYPE_DECLINED 
									   : wedges[n]>0 ? Molecule.BONDTYPE_INCLINED : Molecule.BONDTYPE_NORMAL);
				if (mchi.bondFrom(badj[n])!=N) mol.setBondFromTo(badj[n],mol.bondTo(badj[n]),mol.bondFrom(badj[n]));

			}
			if (mchi.atomChirality(N)!=Chi) perm.remove(pos); else pos++;
		}
		
		// score each one based on crude aesthetic criteria
		double[] score=new double[perm.size()];
		for (int n=0;n<perm.size();n++)
		{
			score[n]=0;
			int[] wedges=perm.get(n);
			int wcount=0;
			for (int i=0;i<adj.length;i++) if (wedges[i]!=0)
			{
				wcount++;
				score[n]-=0.5*mol.atomPriority(adj[i])/mol.numAtoms();
				if (mol.atomAdjCount(adj[i])==1) score[n]++;
				if (mol.atomRingBlock(adj[i])>0) 
				{
					score[n]--;
					if (mol.atomRingBlock(N)==mol.atomRingBlock(adj[i])) score[n]--;
				}
			}
			if (adj.length==4 && wcount==2) score[n]++;
		}
		
		// sort best-first
		pos=0;
		while (pos<perm.size()-1)
		{
			if (score[pos]<score[pos+1])
			{
				int[] w1=perm.get(pos),w2=perm.get(pos+1);
				perm.set(pos+1,w1);
				perm.set(pos,w2);
				double s=score[pos]; score[pos]=score[pos+1]; score[pos+1]=s;
				if (pos>0) pos--;
			} else pos++;
		}

		return perm;
	}

	// for the indicated atoms, converts any non-actual hydrogens into actual atoms
	public static void hydrogenCreateActual(Molecule mol,ArrayList<Integer> sel)
	{
		int score[]=new int[360];
		for (int n=0;n<sel.size();n++)
		{
			int i=sel.get(n).intValue();
			int hy=mol.atomHydrogens(i);
			if (hy==0) continue;
			
			for (int j=0;j<360;j++) score[j]=0;
			int adj[]=mol.atomAdjList(i);
			for (int j=0;j<adj.length;j++) 
			{
				int iang=(int)(Math.atan2(mol.atomY(adj[j])-mol.atomY(i),mol.atomX(adj[j])-mol.atomX(i))*180/Math.PI);
				if (iang<0) iang+=360;
				score[iang]=-1; score[(iang+1)%360]=-1; score[(iang+359)%360]=-1;
				int i0=(iang+180)%360,i1=(iang+120)%360,i2=(iang+240)%360;
				if (score[i0]>=0) score[i0]+=2;
				if (score[i1]>=0) score[i1]+=4;
				if (score[i2]>=0) score[i2]+=4;
			}
			
			while (hy>0)
			{
				int iang=0;
				for (int j=1;j<360;j++) if (score[j]>score[iang]) iang=j;
				int num=mol.addAtom("H",mol.atomX(i)+Math.cos(iang*Math.PI/180.0),mol.atomY(i)+Math.sin(iang*Math.PI/180.0));
				mol.addBond(i,num,1);
				score[iang]=-1; score[(iang+1)%360]=-1; score[(iang+359)%360]=-1;
				int i0=(iang+180)%360,i1=(iang+120)%360,i2=(iang+240)%360;
				if (score[i0]>=0) score[i0]++;
				if (score[i1]>=0) score[i1]+=2;
				if (score[i2]>=0) score[i2]+=2;
				hy--;
			}
			
			mol.setAtomHExplicit(i,Molecule.HEXPLICIT_UNKNOWN);
		}
	}

	// removes actual hydrogen atoms
	public static void hydrogenDeleteActual(Molecule mol,ArrayList<Integer> sel)
	{
		ArrayList<Integer> chop=new ArrayList<Integer>();
		
		for (int n=0;n<sel.size();n++)
		{
			int i=sel.get(n).intValue();
			if (mol.atomElement(i).compareTo("H")==0) chop.add(new Integer(i));
			int adj[]=mol.atomAdjList(i);
			for (int j=0;j<adj.length;j++) if (mol.atomElement(adj[j]).compareTo("H")==0) chop.add(adj[j]);
		}
		
		if (chop.size()==0) return;
		Collections.sort(chop);
		
		for (int n=0;n<chop.size();n++)
		{
			int adj[]=mol.atomAdjList(chop.get(n).intValue());
			for (int i=0;i<adj.length;i++) mol.setAtomHExplicit(adj[i],Molecule.HEXPLICIT_UNKNOWN);
		}

		int decr=0,lastVal=-1;
		for (int n=0;n<chop.size();n++)
		{
			int i=chop.get(n).intValue();
			if (i==lastVal) continue;
			mol.deleteAtomAndBonds(i-decr);
			decr++;
			lastVal=i;
		}
	}

	// adjusts so that the average bond length is "normal"; if a range is given, then if the average bond length is within this
	// range, then the normalisation will be skipped
	public static void normaliseBondLengths(Molecule mol) {normaliseBondLengths(mol,0,0);}
	public static void normaliseBondLengths(Molecule mol,double rangeLow,double rangeHigh)
	{
		double numer=0,denom=0;
		for (int n=1;n<=mol.numBonds();n++)
		{
			double dx=mol.atomX(mol.bondFrom(n))-mol.atomX(mol.bondTo(n)),dy=mol.atomY(mol.bondFrom(n))-mol.atomY(mol.bondTo(n));
			double weight=mol.bondInRing(n) ? 1 : 2;
			numer+=Math.sqrt(dx*dx+dy*dy)*weight;
			denom+=weight;
		}
		if (denom==0) return;
		
		if (rangeLow!=rangeHigh)
		{
			double avg=numer/denom;
			if (avg>=rangeLow && avg<=rangeHigh) return; 
		}
		
		double stretch=CanvasMolecule.IDEALBOND*denom/numer;
		for (int n=1;n<=mol.numAtoms();n++)
		{
			mol.setAtomPos(n,mol.atomX(n)*stretch,mol.atomY(n)*stretch);
		}
	}

	// for a point defined by the given atom, flips all of the other atoms in that group along the indicated axis
	public static void flipGroupAboutAtom(Molecule mol,boolean isVertical,int atom)
	{
		double cx=mol.atomX(atom),cy=mol.atomY(atom);
		for (int n=1;n<=mol.numAtoms();n++) if (mol.atomConnComp(n)==mol.atomConnComp(atom))
		{
			if (isVertical) mol.setAtomPos(n,mol.atomX(n),2*cy-mol.atomY(n));
			else mol.setAtomPos(n,2*cx-mol.atomX(n),mol.atomY(n));
		}
	}
	
	// for a given bond, flips it so that substituents on either side are inverted, for the group belonging to that bond
	public static void flipGroupAboutBond(Molecule mol,int bond)
	{
		int a1=mol.bondFrom(bond),a2=mol.bondTo(bond),cc=mol.atomConnComp(a1);
		double rot=Math.atan2(mol.atomY(a2)-mol.atomY(a1),mol.atomX(a2)-mol.atomX(a1));
		double cx=0.5*(mol.atomX(a1)+mol.atomX(a2)),cy=0.5*(mol.atomY(a1)+mol.atomY(a2));
		
		for (int n=1;n<=mol.numAtoms();n++) if (mol.atomConnComp(n)==cc)
		{
			double x=mol.atomX(n)-cx,y=mol.atomY(n)-cy;
			double th=Math.atan2(y,x),r=Util.norm(x,y);
			x=r*Math.cos(th-rot); y=r*Math.sin(th-rot);
			th=Math.atan2(y,-x);
			x=r*Math.cos(th+rot); y=r*Math.sin(th+rot);
			mol.setAtomPos(n,cx+x,cy+y);
		}
	}
	
	// given a central point (refAB>0 for atom, refAB<0 for bond), rotates the rest of the group by the given angle
	public static void rotateGroupAboutCentre(Molecule mol,int degrees,int refAB)
	{
		double radians=degrees*Math.PI/180;
		
		int cc=0;
		double cx=0,cy=0;
		if (refAB>0)
		{
			cc=mol.atomConnComp(refAB);
			cx=mol.atomX(refAB);
			cy=mol.atomY(refAB);
		}
		else
		{
			int a1=mol.bondFrom(-refAB),a2=mol.bondTo(-refAB);
			cc=mol.atomConnComp(a1);
			cx=0.5*(mol.atomX(a1)+mol.atomX(a2));
			cy=0.5*(mol.atomY(a1)+mol.atomY(a2));
		}
		
		for (int n=1;n<=mol.numAtoms();n++) if (mol.atomConnComp(n)==cc)
		{
			double x=mol.atomX(n)-cx,y=mol.atomY(n)-cy;
			double th=Math.atan2(y,x),r=Util.norm(x,y);
			mol.setAtomPos(n,cx+r*Math.cos(th+radians),cy+r*Math.sin(th+radians));
		}
	}
		
	// changes stereochemistry; STEREO_UNKNOWN=invert, POS/NEG=set to this
	public static void setStereo(Molecule mol,int operation,ArrayList<Integer> sel)
	{
		int[][] graph=new int[mol.numAtoms()][];
		for (int n=0;n<mol.numAtoms();n++) graph[n]=mol.atomAdjList(n+1);

		// chiral centres
		for (int n=0;n<sel.size();n++) 
		{
			int a=sel.get(n);
			int ster=mol.atomChirality(a);
			if (operation==Molecule.STEREO_UNKNOWN)
				{if (ster!=Molecule.STEREO_POS && ster!=Molecule.STEREO_NEG) continue;}
			else 
				{if (ster==operation) continue;}

			// first the easy option: the atom already has chirality, can just flip all the wedges...
			if (ster==Molecule.STEREO_POS || ster==Molecule.STEREO_NEG)
			{
				for (int i=1;i<=mol.numBonds();i++) 
					if (mol.bondFrom(i)==a)
				{
					if (mol.bondType(i)==Molecule.BONDTYPE_INCLINED) mol.setBondType(i,Molecule.BONDTYPE_DECLINED);
					else if (mol.bondType(i)==Molecule.BONDTYPE_DECLINED) mol.setBondType(i,Molecule.BONDTYPE_INCLINED);
				}
				continue;
			}
			
			// not quite so easy: centre has no current chirality, and a specific enantiomer has been requested
			ArrayList<int[]> perm=ToolChest.wedgeFormations(mol,a,operation);
			if (perm!=null && perm.size()>0) // if anything available, use best...
			{
				int[] adj=mol.atomAdjList(a);
				for (int i=0;i<adj.length;i++)
				{
					int j=mol.findBond(a,adj[i]); if (j==0) continue;
					mol.setBondType(j,perm.get(0)[i]<0 ? Molecule.BONDTYPE_DECLINED 
									: perm.get(0)[i]>0 ? Molecule.BONDTYPE_INCLINED : Molecule.BONDTYPE_NORMAL);
					if (mol.bondFrom(j)!=a) mol.setBondFromTo(j,mol.bondTo(j),mol.bondFrom(j));
				}
			}
		}
				
		// cis/trans 
		for (int n=1;n<=mol.numBonds();n++) 
		{
			int bf=mol.bondFrom(n),bt=mol.bondTo(n);
			if (mol.bondOrder(n)==2 && sel.indexOf(bf)<0 && sel.indexOf(bt)<0) continue;
			int ster=mol.bondStereo(n);
			if ((ster!=Molecule.STEREO_POS && ster!=Molecule.STEREO_NEG) || ster==operation) continue;
			if (mol.atomRingBlock(bf)!=0 && mol.atomRingBlock(bf)!=mol.atomRingBlock(bt)) continue; // refuse to work with ring alkene
			
			// classify the sides of the X=Y bond by partitioning the component
			int sc1=1,sc2=1,side[]=new int[mol.numAtoms()];
			for (int i=0;i<mol.numAtoms();i++) side[i]=0;
			side[bf-1]=1; side[bt-1]=2;
			while (true)
			{
				boolean changed=false;
				for (int i=0;i<mol.numAtoms();i++) if (side[i]==0)
					for (int j=0;j<graph[i].length;j++) if (side[graph[i][j]-1]!=0) 
				{
					side[i]=side[graph[i][j]-1];
					if (side[i]==1) sc1++; else sc2++;
					changed=true;
				}
				if (!changed) break;
			}
			int which=sc1<=sc2 ? 1 : 2;
			double cx=mol.atomX(which==1 ? bf : bt),cy=mol.atomY(which==1 ? bf : bt);
			double axis=Math.atan2(cy-mol.atomY(which==1 ? bt : bf),cx-mol.atomX(which==1 ? bt : bf));
			for (int i=0;i<mol.numAtoms();i++) if (side[i]==which)
			{
				double dx=mol.atomX(i+1)-cx,dy=mol.atomY(i+1)-cy;
				double r=Math.sqrt(dx*dx+dy*dy),th=Math.atan2(dy,dx);
				th=2*axis-th;
				mol.setAtomPos(i+1,cx+r*Math.cos(th),cy+r*Math.sin(th));
			}
			for (int i=1;i<=mol.numBonds();i++) 
				if (mol.bondType(i)==Molecule.BONDTYPE_INCLINED || mol.bondType(i)==Molecule.BONDTYPE_DECLINED)
					if (side[mol.bondFrom(i)-1]==which && side[mol.bondTo(i)-1]==which)
						mol.setBondType(i,mol.bondType(i)==Molecule.BONDTYPE_INCLINED ? Molecule.BONDTYPE_DECLINED 
																					  : Molecule.BONDTYPE_INCLINED);
		}
	}
	
	// selected chiral centres lose their wedge bonds; idx==0 for selected/all, >0 for specific atom
	public static void removeChiralWedges(Molecule mol,ArrayList<Integer> sel)
	{
		for (int n=0;n<sel.size();n++) if (mol.atomChirality(sel.get(n))!=Molecule.STEREO_NONE)
		{
			for (int i=1;i<=mol.numBonds();i++) 
				if ((mol.bondFrom(i)==sel.get(n) || mol.bondTo(i)==sel.get(n)) && 
					(mol.bondType(i)==Molecule.BONDTYPE_INCLINED || mol.bondType(i)==Molecule.BONDTYPE_DECLINED))
				mol.setBondType(i,Molecule.BONDTYPE_NORMAL);
		}
	}
	
	// for any chiral centres, pick the next set of valid wedge bonds; idx==0 for selected/all, >0 for specific atom
	public static void cycleChiralWedges(Molecule mol,ArrayList<Integer> sel)
	{
		for (int n=0;n<sel.size();n++)
		{
			int a=sel.get(n),chi=mol.atomChirality(a);
			if (chi!=Molecule.STEREO_POS && chi!=Molecule.STEREO_NEG) continue;
			ArrayList<int[]> perm=ToolChest.wedgeFormations(mol,a,chi);
			if (perm.size()<=1) continue; // invalid or no point
			
			int[] adj=mol.atomAdjList(a),curperm=new int[adj.length];
			for (int i=0;i<adj.length;i++)
			{
				int j=mol.findBond(a,adj[i]);
				curperm[i]=mol.bondType(j)==Molecule.BONDTYPE_INCLINED ? 1 : mol.bondType(j)==Molecule.BONDTYPE_DECLINED ? -1 : 0;
			}
			int match=-1;
			for (int i=0;i<perm.size();i++)
			{
				int[] thisperm=perm.get(i);
				boolean same=true;
				for (int j=0;j<curperm.length;j++) if (thisperm[j]!=curperm[j]) {same=false; break;}
				if (same) {match=i; break;}
			}
			match=(match+1)%perm.size();
			curperm=perm.get(match);

			for (int i=0;i<adj.length;i++)
			{
				int j=mol.findBond(a,adj[i]);
				if (mol.bondFrom(j)!=a) mol.setBondFromTo(j,a,adj[i]);
				mol.setBondType(j,curperm[i]<0 ? Molecule.BONDTYPE_DECLINED 
								: curperm[i]>0 ? Molecule.BONDTYPE_INCLINED : Molecule.BONDTYPE_NORMAL);
			}
		}
	}

	// converts the atoms in a mask into an abbreviation; uses exceptions to convey friendly error messages
	public static Molecule subsumeAbbreviation(Molecule mol,boolean[] mask) throws MoleculeIOException
	{		
		int central=0,adj=0;
		
		for (int n=1;n<=mol.numBonds();n++)
		{
			int a1=mol.bondFrom(n),a2=mol.bondTo(n);
			if (mask[a1-1] && !mask[a2-1]) {if (central>0) {central=0; break;} central=a1; adj=a2;}
			else if (mask[a2-1] && !mask[a1-1]) {if (central>0) {central=0; break;} central=a2; adj=a1;}
		}
		
		if (central==0) throw new MoleculeIOException("Must select a terminal fragment.");
		
		int idx[]=new int[mol.numAtoms()],fsz=0;
		idx[fsz++]=adj;
		idx[fsz++]=central;
		for (int n=1;n<=mask.length;n++) if (n!=central && mask[n-1]) idx[fsz++]=n;
		idx=Arrays.copyOf(idx,fsz);
		Molecule frag=mol.subgraph(idx);
		
		Molecule ret=mol.clone();
		
		String[] extra=ret.atomExtra(central);
		extra=extra==null ? new String[1] : Arrays.copyOf(extra,extra.length+1);
		extra[extra.length-1]="a"+frag.toString();
		ret.setAtomExtra(central,extra);
		
		Molecule xfrag=frag.clone();
		xfrag.setAtomHExplicit(2,xfrag.atomHydrogens(2));
		xfrag.deleteAtomAndBonds(1);
		ret.setAtomElement(central,molecularFormula(xfrag,true));
		
		for (int n=ret.numAtoms();n>=1;n--) if (n!=central && mask[n-1]) ret.deleteAtomAndBonds(n);

		return ret;
	}

	// converts the atoms in a mask into an abbreviation; uses exceptions to convey friendly error messages
	public static Molecule subsumeSubFragment(Molecule mol,boolean[] mask,boolean not) throws MoleculeIOException
	{
		int central=0,adj=0;
		
		for (int n=1;n<=mol.numBonds();n++)
		{
			int a1=mol.bondFrom(n),a2=mol.bondTo(n);
			if (mask[a1-1] && !mask[a2-1]) {if (central>0) {central=0; break;} central=a1; adj=a2;}
			else if (mask[a2-1] && !mask[a1-1]) {if (central>0) {central=0; break;} central=a2; adj=a1;}
		}
		
		if (central==0) throw new MoleculeIOException("Must select a terminal fragment.");
		
		int idx[]=new int[mol.numAtoms()],fsz=0;
		idx[fsz++]=central;
		for (int n=1;n<=mask.length;n++) if (n!=central && mask[n-1]) idx[fsz++]=n;
		idx=Arrays.copyOf(idx,fsz);
		Molecule frag=mol.subgraph(idx);
		
		Molecule ret=mol.clone();
		
		String[] extra=ret.atomExtra(adj);
		extra=extra==null ? new String[1] : Arrays.copyOf(extra,extra.length+1);
		extra[extra.length-1]=(not ? "qX!" : "qX:")+frag.toString();
		ret.setAtomExtra(adj,extra);
		
		for (int n=ret.numAtoms();n>=1;n--) if (mask[n-1]) ret.deleteAtomAndBonds(n);

		return ret;
	}
	
	// compiles the molecular formula for a molecule, with the conventional ordering (i.e. C then H then the rest in alphabetical order)
	public static String molecularFormula(Molecule mol,boolean punctuation)
	{
		int countC=0,countH=0;
		String[] elements=new String[mol.numAtoms()];
		for (int n=1;n<=mol.numAtoms();n++)
		{
			countH+=mol.atomHydrogens(n);
			String el=mol.atomElement(n);
			
			elements[n-1]="";
			if (el.equals("C")) countC++;
			else if (el.equals("H")) countH++;
			else elements[n-1]=el;
		}

		Arrays.sort(elements);		
		
		StringBuffer formula=new StringBuffer();
		
		if (countC>0) formula.append("C");
		if (countC>1) 
		{
			if (punctuation) formula.append("{");
			formula.append(String.valueOf(countC));
			if (punctuation) formula.append("}");
		}
		if (countH>0) formula.append("H");
		if (countH>1)
		{
			if (punctuation) formula.append("{");
			formula.append(String.valueOf(countH));
			if (punctuation) formula.append("}");
		}
		for (int n=0;n<elements.length;n++) if (elements[n].length()>0)
		{
			int count=1;
			for(;n+1<elements.length && elements[n].equals(elements[n+1]);n++) {count++;}
			formula.append(elements[n]);
			if (count>1)
			{
				if (punctuation) formula.append("{");
				formula.append(String.valueOf(count));
				if (punctuation) formula.append("}");
			}
		}
		
		return formula.toString();
	}	
}
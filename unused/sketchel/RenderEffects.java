/*
	Sketch Elements: Chemistry molecular diagram drawing tool.
	
	(c) 2005-2013 Dr. Alex M. Clark, all rights reserved
	
	Released as GNUware, under the Gnu Public License (GPL)
	
	See www.gnu.org for details.
*/

package org.sketchel;

import java.lang.*;
import java.util.*;

/*
	Container class for the interactive "effects" which should be applied to the drawing of a molecule (e.g. highlights, 
	selection, etc.) These are the types of things which are drawn during the editing process, as a supplement to the basic
	diagram.
*/

public class RenderEffects
{
	// members: public access

	public int showElements=ArrangeMolecule.SHOW_ELEMENTS;
	public boolean showHydrogens=true,showStereo=false,showExtra=false;
	
	public String[] annotAtoms=null,annotBonds=null;
	
	public boolean[] selected=null,dragged=null,underlined=null;
	public int highlightAtom=0,highlightBond=0,currentAtom=0,currentBond=0;

	public boolean bondInProgress=false;
	public int bipFrom,bipOrder,bipType;
	public double bipToX,bipToY;
	
	public boolean atomInProgress=false;
	public String aipLabel;
	public double aipToX,aipToY;
	
	public boolean newBondLine=false;
	public double nblX1,nblY1,nblX2,nblY2;

	public boolean dragSelect=false;
	public int dslX1,dslY1,dslX2,dslY2;
	
	public boolean dragScale=false;
	public double dscCX,dscCY,dscExtMul;

	public boolean dragMove=false;
	public double dmvDX,dmvDY;
	public boolean dmvCopy;
	
	public boolean dragRotate=false;
	public double droTheta;
	public int droX,droY;
	
	public boolean outlineTemplate=false;
	public Molecule oltMol;

	public RenderEffects()
	{
	}
	
	public RenderEffects clone()
	{
		RenderEffects e=new RenderEffects();
		
		e.selected=selected; e.dragged=dragged; e.underlined=underlined;
		e.highlightAtom=highlightAtom; e.highlightBond=highlightBond;
		e.currentAtom=currentAtom; e.currentBond=currentBond;
	
		e.bondInProgress=bondInProgress;
		e.bipFrom=bipFrom; e.bipOrder=bipOrder; e.bipType=bipType; 
		e.bipToX=bipToX; e.bipToY=bipToY;
		
		e.atomInProgress=atomInProgress;
		e.aipLabel=aipLabel; e.aipToX=aipToX; e.aipToY=aipToY;
		
		e.newBondLine=newBondLine;
		e.nblX1=nblX1; e.nblY1=nblY1; e.nblX2=nblX2; e.nblY2=nblY2;
	
		e.dragSelect=dragSelect;
		e.dslX1=dslX1; e.dslY1=dslY1; e.dslX2=dslX2; e.dslY2=dslY2;
		
		e.dragScale=dragScale;
		e.dscCX=dscCX; e.dscCY=dscCY; e.dscExtMul=dscExtMul;
	
		e.dragMove=dragMove;
		e.dmvDX=dmvDX; e.dmvDY=dmvDY; e.dmvCopy=dmvCopy;
		
		e.dragRotate=dragRotate;
		e.droTheta=droTheta; e.droX=droX; e.droY=droY;
		e.outlineTemplate=outlineTemplate; e.oltMol=oltMol;
		
		return e;
	}
	

	public void bondInProgress(int from,double x,double y,int order,int type)
	{
		bondInProgress=true;
		bipFrom=from;
		bipToX=x;
		bipToY=y;
		bipOrder=order;
		bipType=type;
	}
	public void atomInProgress(String label,double x,double y)
	{
		atomInProgress=true;
		aipLabel=label;
		aipToX=x;
		aipToY=y;
	}
	public void newBondLine(double x1,double y1,double x2,double y2)
	{
		newBondLine=true;
		nblX1=x1;
		nblY1=y1;
		nblX2=x2;
		nblY2=y2;
	}
	public void dragSelect(int x1,int y1,int x2,int y2)
	{
		dragSelect=true;
		dslX1=x1;
		dslY1=y1;
		dslX2=x2;
		dslY2=y2;
	}
	public void dragScale(double cx,double cy,double extMul)
	{
		dragScale=true;
		dscCX=cx;
		dscCY=cy;
		dscExtMul=extMul;
	}
	public void dragMove(double dx,double dy,boolean copy)
	{
		dragMove=true;
		dmvDX=dx;
		dmvDY=dy;
		dmvCopy=copy;
	}
	public void dragRotate(double theta,int x,int y)
	{
		dragRotate=true;
		droTheta=theta;
		droX=x;
		droY=y;
	}
	public void outlineTemplate(Molecule templ)
	{
		outlineTemplate=true;
		oltMol=templ;
	}	 
}

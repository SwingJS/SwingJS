/*
	Sketch Elements: Chemistry molecular diagram drawing tool.
	
	(c) 2005-2013 Dr. Alex M. Clark, all rights reserved
	
	Released as GNUware, under the Gnu Public License (GPL)
	
	See www.gnu.org for details.
*/

package org.sketchel;

import java.util.*;
import java.text.*;
import java.lang.*;
import java.io.*;

/*
	Controlling class for drawing a molecule in a vector graphics format. This class performs a similar function to that of 
	DrawMolecule, but outputs to a VectorGfxBuilder containe
	
	Note that in this implementation of rendering, only the molecule is drawn, without interactive effects. The 
	constructor/draw/build sequence should be called only once during the lifetime of this object.
*/

public class VectorGfxMolecule implements ArrangeMeasurement
{
	private VectorGfxBuilder vg;
	private Molecule mol;
	
	private double scale=20;
	private boolean devRounding=false;
	private RenderPolicy policy=null;
	
	private ArrangeMolecule arrmol=null;
	
	public VectorGfxMolecule(Molecule mol,RenderPolicy policy,VectorGfxBuilder vg)
	{
		this.mol=mol;
		this.vg=vg;
		
		if (policy!=null) setRenderPolicy(policy);
	}
	
	// specifies how the molecule is rendered
	public void setRenderPolicy(RenderPolicy policy) 
	{
		this.policy=policy;
		this.scale=policy.pointScale;
	}
	
	public void draw()
	{
		// provide the metadata
		
		HashMap<String,String> meta=new HashMap<String,String>();
		
		try
		{
			StringWriter sw=new StringWriter();
			BufferedWriter bw=new BufferedWriter(sw);
			MoleculeWriter.writeNative(bw,mol);
			meta.put("molecule.el",sw.toString());
		}
		catch (IOException ex) {}
		
		try
		{
			StringWriter sw=new StringWriter();
			BufferedWriter bw=new BufferedWriter(sw);
			MoleculeWriter.writeMDLMOL(bw,mol);
			meta.put("molecule.mol",sw.toString());
		}
		catch (IOException ex) {}
		
		vg.specifyMetaData(meta);
		
		// draw the molecule
		
		arrmol=new ArrangeMolecule(mol,this);
		arrmol.setDevRounding(devRounding);
		
		if (policy!=null)
		{
			arrmol.setFontSizeAng(policy.fontSize);
			arrmol.setLineSizeAng(policy.lineSize);
			arrmol.setBondSepAng(policy.bondSep);
			int[] acol=new int[mol.numAtoms()];
			for (int n=1;n<=mol.numAtoms();n++)
			{
				int anum=mol.atomicNumber(n);
				acol[n-1]=anum>=0 && anum<policy.atomCols.length ? (policy.atomCols[anum].getRGB()&0xFFFFFF) : 0x000000;
			}
			arrmol.setAtomCols(acol);
			arrmol.setForeground(policy.foreground.getRGB()&0xFFFFFF);
		}
		
		arrmol.arrange();

		// emit the drawing elements as vector primitives
		
		for (int n=0;n<arrmol.numLines();n++)
		{
			int btype=arrmol.lineType(n);
			double x1=arrmol.lineX1(n),y1=arrmol.lineY1(n),x2=arrmol.lineX2(n),y2=arrmol.lineY2(n);
			double dx=x2-x1,dy=y2-y1;
			
			if (btype==ArrangeMolecule.BLINE_NORMAL)
			{
				vg.drawLine(x1,y1,x2,y2,arrmol.lineCol(n),arrmol.lineSize(n));
			}
			else if (btype==ArrangeMolecule.BLINE_INCLINED)
			{
				double norm=0.15*scale/Math.sqrt(dx*dx+dy*dy);
				double ox=norm*dy,oy=-norm*dx;
				vg.drawPoly(new double[]{x1,x2-ox,x2+ox},new double[]{y1,y2-oy,y2+oy},SVGBuilder.NOCOLOUR,0,arrmol.lineCol(n),true);
			}
			else if (btype==ArrangeMolecule.BLINE_DECLINED)
			{
				int nsteps=(int)Math.ceil(Math.sqrt(dx*dx+dy*dy)*0.15);
				double norm=0.15*scale/Math.sqrt(dx*dx+dy*dy);
				double ox=norm*dy,oy=-norm*dx;
				for (int i=0;i<=nsteps+1;i++)
				{
					double cx=x1+i*dx/(nsteps+1),cy=y1+i*dy/(nsteps+1);
					double ix=ox*i/(nsteps+1),iy=oy*i/(nsteps+1);
					vg.drawLine(cx-ix,cy-iy,cx+ix,cy+iy,arrmol.lineCol(n),arrmol.lineSize(n));
				}
			}
			else if (btype==ArrangeMolecule.BLINE_UNKNOWN)
			{
				int nsteps=(int)Math.ceil(Math.sqrt(dx*dx+dy*dy)*0.2);
				double norm=0.2*scale/Math.sqrt(dx*dx+dy*dy);
				double ox=norm*dy,oy=-norm*dx;
				int sz=1+3*(nsteps+1);
				double[] x=new double[sz],y=new double[sz];
				boolean[] ctrl=new boolean[sz];
				x[0]=x1; y[0]=y1; ctrl[0]=false;
				for (int i=0,j=1;i<=nsteps;i++,j+=3)
				{
					double ax=x1+i*dx/(nsteps+1),ay=y1+i*dy/(nsteps+1);
					double cx=x1+(i+1)*dx/(nsteps+1),cy=y1+(i+1)*dy/(nsteps+1);
					double bx=(ax+cx)/2,by=(ay+cy)/2;
					int sign=i%2==0 ? 1 : -1;
					
					x[j]=ax; x[j+1]=bx+sign*ox; x[j+2]=cx;
					y[j]=ay; y[j+1]=by+sign*oy; y[j+2]=cy;
					ctrl[j]=true; ctrl[j+1]=true; ctrl[j+2]=false;
				}
				vg.drawCurve(x,y,ctrl,arrmol.lineCol(n),arrmol.lineSize(n),SVGBuilder.NOCOLOUR,false);
			}
			else if (btype==ArrangeMolecule.BLINE_DOTTED || btype==ArrangeMolecule.BLINE_DOTDIR)
			{
				float radius=(float)arrmol.lineSize(n);
				int nsteps=(int)Math.ceil(0.2*Math.sqrt(dx*dx+dy*dy)/radius);
				for (int i=0;i<=nsteps+1;i++)
				{
					double r=radius;
					if (btype==ArrangeMolecule.BLINE_DOTDIR) r*=1+(i*(1.0/(nsteps+2))-0.5);
					double cx=x1+i*dx/(nsteps+1),cy=y1+i*dy/(nsteps+1);
					vg.drawOval(cx,cy,r,r,SVGBuilder.NOCOLOUR,0,arrmol.lineCol(n));
				}
			}
			else if (btype==ArrangeMolecule.BLINE_INCDOUBLE || btype==ArrangeMolecule.BLINE_INCTRIPLE)
			{
				double norm=(btype==ArrangeMolecule.BLINE_INCDOUBLE ? 0.20 : 0.25)*scale/Math.sqrt(dx*dx+dy*dy);
				double ox=norm*dy,oy=-norm*dx;
				vg.drawPoly(new double[]{x1,x2-ox,x2+ox},new double[]{y1,y2-oy,y2+oy},
							 arrmol.lineCol(n),scale*0.05,SVGBuilder.NOCOLOUR,true);
				if (btype==ArrangeMolecule.BLINE_INCDOUBLE) 
				{
					vg.drawLine(x1,y1,x2,y2,arrmol.lineCol(n),scale*0.03);
				}
				else
				{
					vg.drawLine(x1,y1,x2+0.33*ox,y2+0.33*oy,arrmol.lineCol(n),scale*0.03);
					vg.drawLine(x1,y1,x2-0.33*ox,y2-0.33*oy,arrmol.lineCol(n),scale*0.03);
				}
			}
		}
		for (int n=0;n<arrmol.numPoints();n++)
		{
			String txt=arrmol.pointText(n);
			if (txt==null) continue; // is a point, so do not draw anything
			
			if (txt.equals("."))
			{
				double r=scale*0.05;
				vg.drawOval(arrmol.pointCX(n)-r,arrmol.pointCY(n)-r,2*r,2*r,SVGBuilder.NOCOLOUR,0,arrmol.pointCol(n));
			}
			else if (txt.equals("+"))
			{
				double x=arrmol.pointCX(n),y=arrmol.pointCY(n),r=scale*0.15;
				vg.drawLine(x-r,y,x+r,y,arrmol.pointCol(n),0.07*scale);
				vg.drawLine(x,y-r,x,y+r,arrmol.pointCol(n),0.07*scale);
			}
			else if (txt.equals("-"))
			{
				double x=arrmol.pointCX(n),y=arrmol.pointCY(n),r=scale*0.15;
				vg.drawLine(x-r,y,x+r,y,arrmol.pointCol(n),0.07*scale);
			}
			else // ordinary text
			{
				int fstyle=arrmol.pointBold(n) ? SVGBuilder.TXTSTYLE_BOLD : SVGBuilder.TXTSTYLE_NORMAL;
				vg.drawText(arrmol.pointCX(n),arrmol.pointCY(n)+arrmol.pointRH(n),txt,arrmol.pointFontSize(n),
							arrmol.pointCol(n),fstyle,SVGBuilder.TXTALIGN_CENTRE);
			}
		}
	}
	
	// implementation of measurement metrics
	
	public double scale() {return scale;}
	public double angToX(double AX) {return AX*scale;}
	public double angToY(double AY) {return -AY*scale;}
	public double xToAng(double PX) {return PX*scale;}
	public double yToAng(double PY) {return -PY*scale;}
	public boolean yIsUp() {return false;}
	public double[] measureText(String str,double fontSize) {return vg.measureText(str,fontSize,SVGBuilder.TXTSTYLE_NORMAL);}
}

/*
	Sketch Elements: Chemistry molecular diagram drawing tool.
	
	(c) 2005-2013 Dr. Alex M. Clark, all rights reserved
	
	Released as GNUware, under the Gnu Public License (GPL)
	
	See www.gnu.org for details.
*/

package org.sketchel;

import java.util.*;
import java.text.*;
import java.awt.*;
import java.awt.geom.*;

/*
	Wrapper class for molecule drawing, which renders the molecule to a Java Graphics2D context, under the assumption
	that it is going to be displayed on the screen. This class also has options to draw lots of extra stuff on top of the
	basic molecule construction.
*/

public class DrawMolecule
{
	// public constants

	public static final double DEFSCALE=20; // default # Angstroms per pixel
	public static final double OVERLAP_THRESHOLD=0.2; // atoms closer than this are "overlapping" (i.e. this is bad)

	// internal data
	
	protected Molecule mol;
	protected Graphics2D g;
	protected ArrangeMolecule arrmol;
	protected ArrangeMeasurement measure;
	protected RenderPolicy policy=null;
	protected RenderEffects effects=null;

	protected final double ASCENT_FUDGE=0.8; // for some #@!& reason, the ascent reserves quite a lot of room at the top

	protected Color backgr=Color.WHITE;
	protected Color colHighlight=null,colSelected=null,colDragged=null,colCurrent=null;
	
	protected double offsetX=0,offsetY=0; // in pixel units
	protected double scale,invscale; // pixels per Angstrom

	// constructor to use when intending to actually draw the molecule
	public DrawMolecule(Molecule mol,Graphics2D gr,double angscale)
	{
		this.mol=mol;
		this.g=gr;
		this.scale=angscale;
		
		effects=new RenderEffects();

		invscale=1.0/scale;

		measure=new ArrangeMeasurement()
		{
			public double scale() {return scale;}
		
			public double angToX(double AX) {return offsetX+AX*scale;}
			public double angToY(double AY) {return offsetY-AY*scale;}
			public double xToAng(double PX) {return (PX-offsetX)*invscale;}
			public double yToAng(double PY) {return (offsetY-PY)*invscale;}
			public boolean yIsUp() {return false;}
		
			public double[] measureText(String str,double fontSize)
			{
				Font font=new Font("SansSerif",Font.PLAIN,(int)Math.round(fontSize));
				FontMetrics fm=g.getFontMetrics(font);
				return new double[]{fm.stringWidth(str),fm.getAscent()*ASCENT_FUDGE,fm.getDescent()};
			}
		};

		arrmol=new ArrangeMolecule(mol,measure);
		arrmol.setDevRounding(scale>3); // enable device pixel rounding, unless it's really teeny (i.e. 3 pixels/angstrom)
	}
	
	// constructor to use when just going to measure it
	public DrawMolecule(Molecule mol)
	{
		this.mol=mol;
		this.g=null;
		this.scale=100;
		this.effects=new RenderEffects();
		
		measure=new ArrangeMeasurement()
		{
			public double scale() {return 100;}
			public double angToX(double AX) {return AX*100;}
			public double angToY(double AY) {return AY*100;}
			public double xToAng(double PX) {return PX*0.01;}
			public double yToAng(double PY) {return PY*0.01;}
			public boolean yIsUp() {return false;}
			public double[] measureText(String str,double fontSize) 
			{
				// !! ick, seriously inadequate
				//return new double[]{fontSize*str.length(),fontSize,0.3*fontSize};
				
				// use the hardcoded SVGFont metrics when we're measuring; this requires no graphics context
				double FSCALE=1.0/SVGFont.ASCENT;
				
				int w=0;
				for (int n=0;n<str.length();n++)
				{
					int ch=str.charAt(n)-32;
					if (ch>=0 && ch<SVGFont.GLYPH_NAME.length) w+=SVGFont.HORIZ_ADV_X[ch]; else w+=SVGFont.MISSING_HORZ;
					if (n>=str.length()-1) continue;
					int chn=str.charAt(n)-32;
					if (chn<0 || chn>=SVGFont.GLYPH_NAME.length) continue;
					for (int i=0;i<SVGFont.KERN_K.length;i++)
					{
						if ((SVGFont.KERN_G1[i]==ch && SVGFont.KERN_G2[i]==chn) ||
							(SVGFont.KERN_G1[i]==chn && SVGFont.KERN_G2[i]==ch)) {w+=SVGFont.KERN_K[i]; break;}
					}
				}
				
				// return the estimate... making it a little on the generous side, since actual metrics may vary
				w+=SVGFont.ASCENT*0.3; 
				return new double[]{w*fontSize*FSCALE,fontSize,0.4*fontSize};
			}
		};
		
		arrmol=new ArrangeMolecule(mol,measure);
		arrmol.setDevRounding(false);
		
		invscale=1.0/scale;
	}
	
	public Molecule getMolecule() {return mol;}
	public void setMolecule(Molecule mol) {this.mol=mol; arrmol.setMolecule(mol);}
	public double getScale() {return scale;}
	public double getOffsetX() {return offsetX;}
	public double getOffsetY() {return offsetY;}
	public Color getBackground() {return backgr;}
	public RenderPolicy getRenderPolicy() {return policy;}
	public RenderEffects getRenderEffects() {return effects;}
	
	public void setScale(double scale) {this.scale=scale;}
	public void setOffset(double ox,double oy) {offsetX=ox; offsetY=oy;}
	public void setBackground(Color col) {backgr=col;}
	public void setRenderPolicy(RenderPolicy policy) {this.policy=policy!=null ? policy : new RenderPolicy();}
	public void setRenderEffects(RenderEffects effects) {this.effects=effects!=null ? effects : new RenderEffects();}
	
	// perform the actual drawing
	
	public void draw()
	{
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
			arrmol.setForeground(policy.foreground.getRGB()&0xFFFFFF);
			arrmol.setAtomCols(acol);
		}
		
		arrmol.setElementMode(effects.showElements);
		arrmol.setShowHydrogens(effects.showHydrogens);
		arrmol.setAnnotAtoms(effects.annotAtoms);
		arrmol.setAnnotBonds(effects.annotBonds);
		arrmol.setAnnotRS(effects.showStereo);
		arrmol.setAnnotEZ(effects.showStereo);
		arrmol.setAnnotExtra(effects.showExtra);
	
		arrmol.arrange();
		
		setupColours();
		drawBacklighting();
		drawBonds();
		drawAtoms();
		drawEffects();
		drawCorrections();
	}
	
	public ArrangeMolecule arrangement() {return arrmol;}

	// private implementations

	// decides on particular colors
	private void setupColours()
	{
		if (colHighlight==null) colHighlight=backgr.darker();
		if (colSelected==null) colSelected=new Color(colHighlight.getRed(),colHighlight.getGreen(),255);
		if (colDragged==null) colDragged=new Color(colHighlight.getRed(),192,255);
		if (colCurrent==null) colCurrent=new Color(0,128,64);
	}

	// draws various types of highlighting, if appropriate
	private void drawBacklighting()
	{
		for (int n=1;n<=mol.numAtoms();n++)
		{
			boolean drag=false;
			if (effects.dragged!=null) drag=effects.dragged[n-1];

			if ((effects.selected!=null && effects.selected[n-1]) || n==effects.highlightAtom || drag)
			{
				g.setColor(effects.selected!=null && effects.selected[n-1] ? colSelected : drag ? colDragged : colHighlight);
				double cx=arrmol.pointCX(n-1),cy=arrmol.pointCY(n-1),rw=arrmol.pointRW(n-1),rh=arrmol.pointRH(n-1);
				if (rw==0 || rh==0 || rw<rh*1.5)
				{
					double ext=rw==0 && rh==0 ? 0.25*scale : Math.max(rw*1.5,rh*1.5);
					g.fill(new Ellipse2D.Double(cx-ext,cy-ext,2*ext,2*ext));
				}
				else
				{
					float x1=(float)(cx-rw*1.1),x2=(float)(cx+rw*1.1),y1=(float)(cy-rh*1.5),y2=(float)(cy+rh*1.5);
					GeneralPath path=new GeneralPath();
					path.moveTo(x1,(float)cy);
					path.quadTo(x1,y1,(float)cx,y1);
					path.quadTo(x2,y1,x2,(float)cy);
					path.quadTo(x2,y2,(float)cx,y2);
					path.quadTo(x1,y2,x1,(float)cy);
					path.closePath();
					g.fill(path);
				}
			}
		}

		if (effects.highlightBond!=0) for (int n=0;n<arrmol.numLines();n++) if (arrmol.lineBNum(n)==effects.highlightBond)
		{
			double x1=arrmol.lineX1(n),y1=arrmol.lineY1(n),x2=arrmol.lineX2(n),y2=arrmol.lineY2(n);
			double sz=arrmol.lineSize(n)+0.10*scale;
			double dx=x2-x1,dy=y2-y1,norm=sz/Math.sqrt(dx*dx+dy*dy);
			double ox=norm*dy,oy=-norm*dx;
			Polygon pgn=new Polygon();
			pgn.addPoint(Util.iround(x1+oy*0.5),Util.iround(y1-ox*0.5));
			pgn.addPoint(Util.iround(x1-ox),Util.iround(y1-oy));
			pgn.addPoint(Util.iround(x2-ox),Util.iround(y2-oy));
			pgn.addPoint(Util.iround(x2-oy*0.5),Util.iround(y2+ox*0.5));
			pgn.addPoint(Util.iround(x2+ox),Util.iround(y2+oy));
			pgn.addPoint(Util.iround(x1+ox),Util.iround(y1+oy));
			g.setColor(colHighlight);
			g.fill(pgn);
		}
	}

	// draws all of the bonds
	private void drawBonds()
	{
		for (int n=0;n<arrmol.numLines();n++)
		{
			int btype=arrmol.lineType(n);
			double x1=arrmol.lineX1(n),y1=arrmol.lineY1(n),x2=arrmol.lineX2(n),y2=arrmol.lineY2(n);
			drawOneBond(btype,x1,y1,x2,y2,new Color(arrmol.lineCol(n)),arrmol.lineSize(n));
		}

		if (effects.bondInProgress)
		{
			double x1=arrmol.pointCX(effects.bipFrom-1),y1=arrmol.pointCY(effects.bipFrom-1);
			double x2=measure.angToX(effects.bipToX),y2=measure.angToY(effects.bipToY);
			double sz=0.1*scale;
			
			if (effects.bipType==Molecule.BONDTYPE_INCLINED) drawOneBond(ArrangeMolecule.BLINE_INCLINED,x1,y1,x2,y2,colHighlight,sz);
			else if (effects.bipType==Molecule.BONDTYPE_DECLINED) drawOneBond(ArrangeMolecule.BLINE_DECLINED,x1,y1,x2,y2,colHighlight,sz);
			else if (effects.bipType==Molecule.BONDTYPE_UNKNOWN) drawOneBond(ArrangeMolecule.BLINE_UNKNOWN,x1,y1,x2,y2,colHighlight,sz);
			else if (effects.bipOrder==0) drawOneBond(ArrangeMolecule.BLINE_DOTTED,x1,y1,x2,y2,colHighlight,sz);
			else
			{
				double v=-0.5*(effects.bipOrder-1);
				double dx=x2-x1,dy=y2-y1,norm=0.20*scale/Math.sqrt(dx*dx+dy*dy);
				double ox=norm*dy,oy=-norm*dx;
				g.setStroke(new BasicStroke((float)sz,BasicStroke.CAP_ROUND,BasicStroke.JOIN_ROUND));
				g.setColor(colHighlight);
				for (int i=0;i<effects.bipOrder;i++,v++) g.draw(new Line2D.Double(x1+ox*v,y1+oy*v,x2+ox*v,y2+oy*v));
			}
		}
	}

	// workhorse function for above
	private void drawOneBond(int btype,double x1,double y1,double x2,double y2,Color col,double sz)
	{
		double dx=x2-x1,dy=y2-y1;

		g.setColor(col);

		if (btype==ArrangeMolecule.BLINE_NORMAL)
		{
			g.setStroke(new BasicStroke((float)sz,BasicStroke.CAP_ROUND,BasicStroke.JOIN_ROUND));
			g.draw(new Line2D.Double(x1,y1,x2,y2));
		}
		else if (btype==ArrangeMolecule.BLINE_INCLINED)
		{
			double norm=0.15*scale/Math.sqrt(dx*dx+dy*dy);
			double ox=norm*dy,oy=-norm*dx;
			GeneralPath path=new GeneralPath();
			path.moveTo((float)x1,(float)y1);
			path.lineTo((float)(x2-ox),(float)(y2-oy));
			path.lineTo((float)(x2+ox),(float)(y2+oy));
			path.closePath();
			g.fill(path);
		}
		else if (btype==ArrangeMolecule.BLINE_DECLINED)
		{
			float lw=(float)(0.05*scale);
			int nsteps=(int)Math.ceil(Math.sqrt(dx*dx+dy*dy)/(6*lw));
			double norm=0.15*scale/Math.sqrt(dx*dx+dy*dy);
			double ox=norm*dy,oy=-norm*dx;
			for (int i=0;i<=nsteps+1;i++)
			{
				double cx=x1+i*dx/(nsteps+1),cy=y1+i*dy/(nsteps+1);
				double ix=ox*i/(nsteps+1),iy=oy*i/(nsteps+1);
				if (Util.norm2(2*ix,2*iy)<=1)
				{
					g.fill(new Ellipse2D.Double(cx-ix,cy-iy,2*ix,2*iy));
					continue;
				}

				g.setStroke(new BasicStroke(lw,BasicStroke.CAP_ROUND,BasicStroke.JOIN_ROUND));
				g.draw(new Line2D.Double(cx-ix,cy-iy,cx+ix,cy+iy));
				// !! NOTE: rounding to the nearest pixel make this look not so great
			}
		}
		else if (btype==ArrangeMolecule.BLINE_UNKNOWN)
		{
			double dist=Util.norm(dx,dy);
			int nsteps=(int)Math.ceil(0.2*dist/sz);
			double norm=0.2*scale/dist;
			double ox=norm*dy,oy=-norm*dx;
			for (int i=0;i<=nsteps;i++)
			{
				double ax=x1+i*dx/(nsteps+1),ay=y1+i*dy/(nsteps+1);
				double cx=x1+(i+1)*dx/(nsteps+1),cy=y1+(i+1)*dy/(nsteps+1);
				double bx=(ax+cx)/2,by=(ay+cy)/2;
				int sign=i%2==0 ? 1 : -1;
				g.setStroke(new BasicStroke((float)(0.05*scale)));
				g.draw(new QuadCurve2D.Double(ax,ay,bx+sign*ox,by+sign*oy,cx,cy));
			}
		}
		else if (btype==ArrangeMolecule.BLINE_DOTTED || btype==ArrangeMolecule.BLINE_DOTDIR)
		{
			double dist=Util.norm(dx,dy),radius=sz*0.8;
			int nsteps=(int)Math.ceil(0.2*dist/radius);
			for (int i=0;i<=nsteps+1;i++)
			{
				double r=radius;
				if (btype==ArrangeMolecule.BLINE_DOTDIR) r*=1+(i*(1.0/(nsteps+2))-0.5);
				double cx=x1+i*dx/(nsteps+1),cy=y1+i*dy/(nsteps+1);
				g.fill(new Ellipse2D.Double(cx-r,cy-r,2*r,2*r));
			}
		}
		else if (btype==ArrangeMolecule.BLINE_INCDOUBLE || btype==ArrangeMolecule.BLINE_INCTRIPLE)
		{
			double norm=(btype==ArrangeMolecule.BLINE_INCDOUBLE ? 0.20 : 0.25)*scale/Math.sqrt(dx*dx+dy*dy);
			double ox=norm*dy,oy=-norm*dx;
			GeneralPath path=new GeneralPath();
			path.moveTo((float)x1,(float)y1);
			path.lineTo((float)(x2-ox),(float)(y2-oy));
			path.lineTo((float)(x2+ox),(float)(y2+oy));
			path.closePath();
			g.setStroke(new BasicStroke((float)(0.05*scale),BasicStroke.CAP_SQUARE,BasicStroke.JOIN_BEVEL,0));
			g.draw(path);
			g.setStroke(new BasicStroke((float)(0.03*scale)));
			if (btype==ArrangeMolecule.BLINE_INCDOUBLE) g.draw(new Line2D.Double(x1,y1,x2,y2));
			else
			{
				g.draw(new Line2D.Double(x1,y1,x2+0.33*ox,y2+0.33*oy));
				g.draw(new Line2D.Double(x1,y1,x2-0.33*ox,y2-0.33*oy));
			}
		}
	}

	// draw the atoms proper, as well as standard annotations such as hydrogen atoms and charges
	private void drawAtoms()
	{
		for (int n=0;n<arrmol.numPoints();n++)
		{
			String txt=arrmol.pointText(n);
			if (txt==null) continue; // is a point, so do not draw anything
			
			g.setColor(new Color(arrmol.pointCol(n)));
			
			if (txt.equals("."))
			{
				double r=scale*0.1;
				g.fill(new Ellipse2D.Double(arrmol.pointCX(n)-r,arrmol.pointCY(n)-r,2*r,2*r));
			}
			else if (txt.equals("+"))
			{
				double x=arrmol.pointCX(n),y=arrmol.pointCY(n),r=scale*0.15;
				g.setStroke(new BasicStroke((float)(0.07*scale),BasicStroke.CAP_ROUND,BasicStroke.JOIN_ROUND));
				g.draw(new Line2D.Double(x-r,y,x+r,y));
				g.draw(new Line2D.Double(x,y-r,x,y+r));
			}
			else if (txt.equals("-"))
			{
				double x=arrmol.pointCX(n),y=arrmol.pointCY(n),r=scale*0.15;
				g.setStroke(new BasicStroke((float)(0.07*scale),BasicStroke.CAP_ROUND,BasicStroke.JOIN_ROUND));
				g.draw(new Line2D.Double(x-r,y,x+r,y));
			}
			else // ordinary text
			{
				int fsz=Util.iround(arrmol.pointFontSize(n));
				Font font=new Font(Font.SANS_SERIF,arrmol.pointBold(n) ? Font.BOLD : Font.PLAIN,fsz);
				g.setFont(font);
				FontMetrics fm=g.getFontMetrics();
				double ascent=ASCENT_FUDGE*fm.getAscent();
				int sw=fm.stringWidth(txt);
				float cx=(float)(arrmol.pointCX(n)-0.5*sw),cy=(float)(arrmol.pointCY(n)+0.5*ascent);
				g.drawString(txt,cx,cy);
				
				// screen-specific effect: atom text underlining
				int anum=arrmol.pointANum(n);
				if (anum!=0 && effects.underlined!=null && effects.underlined[anum-1])
				{
					g.setStroke(new BasicStroke(1f,BasicStroke.CAP_ROUND,BasicStroke.JOIN_ROUND,0,new float[]{1,3},0));
					g.draw(new Line2D.Float(cx,cy+2,cx+sw,cy+2));
				}
			}
		}
	}

	// draw the effects of various editing-in-progress actions
	private void drawEffects()
	{
		if (effects.currentAtom>0)
		{
			int a=effects.currentAtom-1;
			double r=Math.max(5,Math.max(0.4*scale,Math.max(arrmol.pointRW(a),arrmol.pointRH(a))))+0.1*scale;
			float circumf=(float)(r*2*Math.PI),dots[]=new float[]{circumf*0.02f,circumf*0.08f};
			g.setStroke(new BasicStroke((float)(r*0.2),BasicStroke.CAP_ROUND,BasicStroke.JOIN_ROUND,0,dots,0));
			g.setColor(colCurrent);
			g.draw(new Ellipse2D.Double(arrmol.pointCX(a)-r,arrmol.pointCY(a)-r,r*2,r*2));
		}
		
		
		if (effects.currentBond>0)
		{
			int nb=0;
			double x1=0,y1=0,x2=0,y2=0,sz=0;
			for (int n=0;n<arrmol.numLines();n++) if (arrmol.lineBNum(n)==effects.currentBond)
			{
				nb++;
				x1+=arrmol.lineX1(n); y1+=arrmol.lineY1(n);
				x2+=arrmol.lineX2(n); y2+=arrmol.lineY2(n);
				sz+=arrmol.lineSize(n)+0.10*scale;
			}
			if (nb>0)
			{
				x1/=nb; y1/=nb; x2/=nb; y2/=nb;;
				
				double dx=x2-x1,dy=y2-y1,inorm=sz*Util.divZ(Util.norm(dx,dy));
				dx*=inorm; dy*=inorm;
				double ox=-dy,oy=dx;
				
				/* (Java 1.6)
				Path2D.Double p=new Path2D.Double();
				p.moveTo(x1-ox,y1-oy);
				p.lineTo(x2-ox,y2-oy);
				p.quadTo(x2+(dx-ox),y2+(dy-oy),x2+dx,y2+dy);
				p.quadTo(x2+(dx+ox),y2+(dy+oy),x2+ox,y2+oy);
				p.lineTo(x1+ox,y1+oy);
				p.quadTo(x1+(-dx+ox),y1+(-dy+oy),x1-dx,y1-dy);
				p.quadTo(x1+(-dx-ox),y1+(-dy-oy),x1-ox,y1-oy);
				p.closePath();*/
				
				GeneralPath p=new GeneralPath();
				p.moveTo((float)(x1-ox),(float)(y1-oy));
				p.lineTo((float)(x2-ox),(float)(y2-oy));
				p.quadTo((float)(x2+(dx-ox)),(float)(y2+(dy-oy)),(float)(x2+dx),(float)(y2+dy));
				p.quadTo((float)(x2+(dx+ox)),(float)(y2+(dy+oy)),(float)(x2+ox),(float)(y2+oy));
				p.lineTo((float)(x1+ox),(float)(y1+oy));
				p.quadTo((float)(x1+(-dx+ox)),(float)(y1+(-dy+oy)),(float)(x1-dx),(float)(y1-dy));
				p.quadTo((float)(x1+(-dx-ox)),(float)(y1+(-dy-oy)),(float)(x1-ox),(float)(y1-oy));
				p.closePath();
								
				float dsz=(float)(scale*0.1);
				float dots[]=new float[]{dsz*0.7f,dsz*2.8f};
				g.setStroke(new BasicStroke(dsz,BasicStroke.CAP_ROUND,BasicStroke.JOIN_ROUND,0,dots,0));
				g.setColor(colCurrent);
				g.draw(p);
			}
		}
		
		if (effects.atomInProgress)
		{
			g.setColor(Color.BLUE);
			Font font=new Font("SansSerif",Font.PLAIN,Util.iround(arrmol.getFontSizeDev()));
			g.setFont(font);
			double tx=measure.angToX(effects.aipToX),ty=measure.angToY(effects.aipToY);
			double[] wad=measure.measureText(effects.aipLabel,arrmol.getFontSizeDev());
			g.drawString(effects.aipLabel,(float)(tx-0.5*wad[0]),(float)(ty+0.4*wad[1]));
		}

		if (effects.newBondLine)
		{
			g.setColor(colHighlight);
			g.setStroke(new BasicStroke(1.1F));
			g.draw(new Line2D.Double(measure.angToX(effects.nblX1),measure.angToY(effects.nblY1),
									 measure.angToX(effects.nblX2),measure.angToY(effects.nblY2)));
		}
		
		if (effects.dragSelect)
		{
			int x=effects.dslX1,y=effects.dslY1,w=effects.dslX2-effects.dslX1,h=effects.dslY2-effects.dslY1;
			if (w<0) {w=-w; x-=w;}
			if (h<0) {h=-h; y-=h;}
			g.setStroke(new BasicStroke(2F));
			g.setColor(Color.BLUE);
			g.drawRect(x,y,w,h);
		}
		
		if (effects.dragScale)
		{
			g.setColor(Color.BLACK);
			g.setStroke(new BasicStroke(1.1F));
			for (int n=1;n<=mol.numAtoms();n++) if (effects.selected[n-1])
			{
				double sx=measure.angToX((mol.atomX(n)-effects.dscCX)*effects.dscExtMul+effects.dscCX);
				double sy=measure.angToY((mol.atomY(n)-effects.dscCY)*effects.dscExtMul+effects.dscCY);
				g.draw(new Ellipse2D.Double(sx-scale*0.3,sy-scale*0.3,scale*0.6,scale*0.6));
			}
		}
		
		if (effects.dragMove)
		{
			g.setColor(Color.BLUE);
			g.setStroke(new BasicStroke(1.1F));
			double rad=scale*0.3;
			for (int n=1;n<=mol.numBonds();n++) if (effects.selected[mol.bondFrom(n)-1] && effects.selected[mol.bondTo(n)-1]) 
			{
				double x1=arrmol.pointCX(mol.bondFrom(n)-1)+effects.dmvDX,y1=arrmol.pointCY(mol.bondFrom(n)-1)+effects.dmvDY;
				double x2=arrmol.pointCX(mol.bondTo(n)-1)+effects.dmvDX,y2=arrmol.pointCY(mol.bondTo(n)-1)+effects.dmvDY;
				double dx=x2-x1,dy=y2-y1,dist=Util.norm(dx,dy),fr=dist>1 ? rad/dist : 0;
				g.draw(new Line2D.Double(x1+dx*fr,y1+dy*fr,x2-dx*fr,y2-dy*fr));
			}
			for (int n=1;n<=mol.numAtoms();n++) if (effects.selected[n-1])
			{
				double sx=arrmol.pointCX(n-1)+effects.dmvDX,sy=arrmol.pointCY(n-1)+effects.dmvDY;
				g.draw(new Ellipse2D.Double(sx-rad,sy-rad,2*rad,2*rad));
				if (effects.dmvCopy)
				{
					g.draw(new Line2D.Double(sx-scale*0.15,sy,sx+scale*0.15,sy));
					g.draw(new Line2D.Double(sx,sy-scale*0.15,sx,sy+scale*0.15));
				}
			}
		}
		
		if (effects.dragRotate)
		{
			double thrad=effects.droTheta*Math.PI/180;
			g.setColor(Color.RED);
			g.setStroke(new BasicStroke(0.5F,BasicStroke.CAP_ROUND,BasicStroke.JOIN_ROUND,1F,new float[]{2,2},0));
			g.draw(new Line2D.Double(effects.droX,effects.droY,effects.droX+50,effects.droY));
			g.setStroke(new BasicStroke(1F));
			g.draw(new Line2D.Double(effects.droX,effects.droY,effects.droX+50*Math.cos(-thrad),effects.droY+50*Math.sin(-thrad)));
			g.draw(new Arc2D.Double(effects.droX-20,effects.droY-20,40,40,0,effects.droTheta,Arc2D.OPEN));

			Font font=new Font("SansSerif",Font.PLAIN,12);
			g.setFont(font);

			int ty=(int)((effects.droTheta>25 || (effects.droTheta<0 && effects.droTheta>=-25)) ? 
											effects.droY-5 : effects.droY+5+ASCENT_FUDGE*font.getSize());
			DecimalFormat fmt=new DecimalFormat("0");
			g.drawString((effects.droTheta>0?"+":"")+fmt.format(Math.round(effects.droTheta))+"\u00B0",(int)(effects.droX+25),ty);
			
			double ax=measure.xToAng(effects.droX),ay=measure.yToAng(effects.droY);
			g.setStroke(new BasicStroke(1.1F));
			double rad=scale*0.3;
			double[] px=new double[mol.numAtoms()],py=new double[mol.numAtoms()];
			for (int n=1;n<=mol.numAtoms();n++) if (effects.selected[n-1])
			{
				double rx=mol.atomX(n)-ax,ry=mol.atomY(n)-ay;
				double rth=Math.atan2(ry,rx),ext=Util.norm(rx,ry);
				px[n-1]=measure.angToX(ax+ext*Math.cos(rth+thrad));
				py[n-1]=measure.angToY(ay+ext*Math.sin(rth+thrad));
				g.draw(new Ellipse2D.Double(px[n-1]-rad,py[n-1]-rad,2*rad,2*rad));
			}
			for (int n=1;n<=mol.numBonds();n++) if (effects.selected[mol.bondFrom(n)-1] && effects.selected[mol.bondTo(n)-1]) 
			{
				double x1=px[mol.bondFrom(n)-1],y1=py[mol.bondFrom(n)-1];
				double x2=px[mol.bondTo(n)-1],y2=py[mol.bondTo(n)-1];
				double dx=x2-x1,dy=y2-y1,dist=Util.norm(dx,dy),fr=dist>1 ? rad/dist : 0;
				g.draw(new Line2D.Double(x1+dx*fr,y1+dy*fr,x2-dx*fr,y2-dy*fr));
			}
		}
		
		if (effects.outlineTemplate)
		{
			g.setColor(new Color(128,128,128));
			g.setStroke(new BasicStroke(1));
			Molecule templ=effects.oltMol;
			for (int n=1;n<=templ.numBonds();n++)
			{
				int from=templ.bondFrom(n),to=templ.bondTo(n);
				g.draw(new Line2D.Double(measure.angToX(templ.atomX(from)),measure.angToY(templ.atomY(from)),
										 measure.angToX(templ.atomX(to)),measure.angToY(templ.atomY(to))));
			}
		}
	}
	
	// bring attention to structures which are malformed
	private void drawCorrections()
	{
		// see if any atoms severely overlap, and if so, draw a red circle around them
		for (int i=1;i<=mol.numAtoms()-1;i++)
		for (int j=i+1;j<=mol.numAtoms();j++)
		{
			double dx=mol.atomX(i)-mol.atomX(j),dy=mol.atomY(i)-mol.atomY(j);
			if (dx*dx+dy*dy<OVERLAP_THRESHOLD*OVERLAP_THRESHOLD)
			{
				g.setColor(Color.RED);
				g.setStroke(new BasicStroke(0.5F));
				g.draw(new Ellipse2D.Double(arrmol.pointCX(i-1)-scale*0.25,arrmol.pointCY(i-1)-scale*0.25,scale*0.5,scale*0.5));
			}
		}
	}

	// measures the boundaries of the molecule, with the optional rendering policy, in Angstrom space; does this by fudging some
	// of the transformations; the return value is box{x1,y1,x2,y2}; the caller should add slightly more margin, else
	// some of the drawing elements may intersect with the edge of the canvas
	public static double[] measureLimits(Molecule mol,RenderPolicy policy,RenderEffects effects)
	{
		DrawMolecule draw=new DrawMolecule(mol);
		draw.setRenderPolicy(policy);
		draw.setRenderEffects(effects);
		return draw.measureLimits();
	}
	public double[] measureLimits()
	{
		if (mol.numAtoms()==0) return new double[]{0,0,0,0};

		if (policy!=null)
		{
			arrmol.setFontSizeAng(policy.fontSize);
			arrmol.setLineSizeAng(policy.lineSize);
			arrmol.setBondSepAng(policy.bondSep);
		}
		arrmol.arrange();

		double[] box=new double[]{mol.minX()*scale,mol.minY()*scale,mol.maxX()*scale,mol.maxY()*scale};
		for (int n=0;n<arrmol.numPoints();n++)
		{
			minmax(box,arrmol.pointCX(n)-arrmol.pointRW(n),arrmol.pointCY(n)-arrmol.pointRH(n),
					   arrmol.pointCX(n)+arrmol.pointRW(n),arrmol.pointCY(n)+arrmol.pointRH(n));
		}
		for (int n=0;n<arrmol.numLines();n++)
		{
			double sz=arrmol.lineSize(n);
			minmax(box,arrmol.lineX1(n)-sz,arrmol.lineY1(n)-sz,arrmol.lineX2(n)+sz,arrmol.lineY2(n)+sz);
		}
		measureLimitsEffects(box);
		
		for (int n=0;n<4;n++) box[n]*=invscale;
		return box;
	}
	
	// avoids a lot of repetition
	private static void minmax(double[] box,double x1,double y1,double x2,double y2)
	{
		box[0]=Math.min(Math.min(box[0],x1),x2);
		box[1]=Math.min(Math.min(box[1],y1),y2);
		box[2]=Math.max(Math.max(box[2],x1),x2);
		box[3]=Math.max(Math.max(box[3],y1),y2);
	}
	
	// apply additional drawing effects effects to the boundary calculation; these must sync up with the metrics used during the
	// actual drawing...
	protected void measureLimitsEffects(double[] box)
	{
		for (int n=1;n<=mol.numAtoms();n++)
		{
			if ((effects.selected!=null && effects.selected[n-1]) ||
				(effects.dragged!=null && effects.dragged[n-1]) ||
				 n==effects.highlightAtom)
			{
				double cx=arrmol.pointCX(n-1),cy=arrmol.pointCY(n-1),rw=arrmol.pointRW(n-1),rh=arrmol.pointRH(n-1);
				if (rw==0 || rh==0 || rw<rh*1.5)
				{
					double ext=rw==0 && rh==0 ? 0.25*scale : Math.max(rw*1.5,rh*1.5);
					minmax(box,cx-ext,cy-ext,cx+ext,cy+ext);
				}
				else
				{
					double x1=cx-rw*1.1,x2=cx+rw*1.1,y1=cy-rh*1.5,y2=cy+rh*1.5;
					minmax(box,x1,y1,x2,y2);
				}
			}
		}
		
		if (effects.currentAtom>0)
		{
			int a=effects.currentAtom-1;
			double r=Math.max(5,Math.max(0.4*scale,Math.max(arrmol.pointRW(a),arrmol.pointRH(a))))+0.1*scale;
			minmax(box,arrmol.pointCX(a)-r,arrmol.pointCY(a)-r,arrmol.pointCX(a)+r,arrmol.pointCY(a)+r);
		}
		if (effects.currentBond>0) for (int n=0;n<arrmol.numLines();n++) if (arrmol.lineBNum(n)==effects.currentBond)
		{
			double sz=arrmol.lineSize(n)+0.10*scale;
			minmax(box,arrmol.lineX1(n)-sz,arrmol.lineY1(n)-sz,arrmol.lineX2(n)+sz,arrmol.lineY2(n)+sz);
		}

/*
		The following effects are not measured, because it currently doesn't matter:
		
		... atomInProgress
		... bondInProgress
		... newBondLine
		... dragSelect
		... dragScale
		... dragMove
		... dragRotate
		... outlineTemplate
		... overlap (red circle)
*/
	}
}

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
	An abstract drawing container which allows primitives to be composed. Handles all of the accumulation of drawing primitives;
	the subclass takes over the second part, which is the actual building of the vector graphic stream.
	
	The set of primitives which are made available is the minimum set required to draw molecules. It will be extended as
	necessary.
	
	In order to make the outgoing files less bloated, styles for drawing objects are grouped in a unique list and referred
	to later. Also, consecutive groups of same-type primitives may be grouped in order to reduce repetition.
	
	For the convenience of the caller, the boundaries of the drawing domain are tracked during the addition of primitives, and
	at drawing time, can be shifted over so that they fit in a box of shape (0,0,w,h). This saves doing a pre-rendering in order
	to figure out the size and scale before the actual drawing.
*/

public abstract class VectorGfxBuilder
{
	public final static int NOCOLOUR=-1;
	public final static int TXTSTYLE_NORMAL=0;
	public final static int TXTSTYLE_BOLD=0x01;
	public final static int TXTSTYLE_ITALIC=0x02;
	public final static int TXTALIGN_CENTRE=0;
	public final static int TXTALIGN_LEFT=1;
	public final static int TXTALIGN_RIGHT=2;

	protected final static int ATOM_LINE=1,ATOM_RECT=2,ATOM_OVAL=3,ATOM_PATH=4,ATOM_TEXT=5;
	protected abstract class Atom {int AtomClass,TypeRef;}

	protected class LineAtom extends Atom {double X1,Y1,X2,Y2;}
	protected class LineType {double Thickness; int Colour;}
	
	protected class RectAtom extends Atom {double X,Y,W,H;}
	protected class RectType {int EdgeCol,FillCol; double Thickness;}
	
	protected class OvalAtom extends Atom {double CX,CY,RW,RH;}
	protected class OvalType {int EdgeCol,FillCol; double Thickness;}
	
	protected class PathAtom extends Atom {int N; double[] X,Y; boolean[] Ctrl; boolean Closed;}
	protected class PathType {int EdgeCol,FillCol; double Thickness; boolean HardEdge;}

	protected class TextAtom extends Atom {double X,Y; String Txt;}
	protected class TextType {double Sz; int Colour,Style,Align;}
	
	protected ArrayList<Atom> atoms=new ArrayList<Atom>();
	protected ArrayList<LineType> lineTypes=new ArrayList<LineType>();
	protected ArrayList<RectType> rectTypes=new ArrayList<RectType>();
	protected ArrayList<OvalType> ovalTypes=new ArrayList<OvalType>();
	protected ArrayList<PathType> pathTypes=new ArrayList<PathType>();
	protected ArrayList<TextType> textTypes=new ArrayList<TextType>();

	protected Map<String,String> meta=null;
	
	protected boolean fresh=true;
	protected double lowX=0,lowY=0,highX=0,highY=0;
	protected boolean[] charMask=new boolean[96];
		
	public VectorGfxBuilder()
	{
		for (int n=0;n<96;n++) charMask[n]=false;
	}
	
	// ------------ abstract methods ------------
	
	public abstract double[] measureText(String Txt,double Sz,int Style);
	public abstract void build(OutputStream ostr,int W,int H,double OX,double OY,double SW,double SH) throws IOException;
	
	// ------------ public methods ------------
	
	// query the boundaries of the drawing, post factum
	public double lowX() {return lowX;}
	public double lowY() {return lowY;}
	public double highX() {return highX;}
	public double highY() {return highY;}
	
	// atomic drawing options
	public void drawLine(double X1,double Y1,double X2,double Y2,int Colour,double Thickness)
	{
		updateBounds(X1-Thickness,Y1-Thickness); updateBounds(X1+Thickness,Y1+Thickness);
		updateBounds(X2-Thickness,Y2-Thickness); updateBounds(X2+Thickness,Y2+Thickness);
		
		LineType type=new LineType();
		type.Thickness=Thickness;
		type.Colour=Colour;

		LineAtom atom=new LineAtom();
		atom.AtomClass=ATOM_LINE;
		atom.X1=X1; atom.Y1=Y1; atom.X2=X2; atom.Y2=Y2;
		atom.TypeRef=registerLineType(type);
		atoms.add(atom);
	}
	public void drawRect(double X,double Y,double W,double H,int EdgeCol,double Thickness,int FillCol)
	{
		updateBounds(X-Thickness,Y-Thickness); updateBounds(X+W+Thickness,Y+H+Thickness);
		
		RectType type=new RectType();
		type.EdgeCol=EdgeCol;
		type.Thickness=Thickness;
		type.FillCol=FillCol;
		
		RectAtom atom=new RectAtom();
		atom.AtomClass=ATOM_RECT;
		atom.X=X; atom.Y=Y; atom.W=W; atom.H=H;
		atom.TypeRef=registerRectType(type);
		atoms.add(atom);
	}
	public void drawOval(double CX,double CY,double RW,double RH,int EdgeCol,double Thickness,int FillCol)
	{
		updateBounds(CX-RW-Thickness,CY-RH-Thickness); updateBounds(CX+RW+Thickness,CY+RH+Thickness); 
		
		OvalType type=new OvalType();
		type.EdgeCol=EdgeCol;
		type.Thickness=Thickness;
		type.FillCol=FillCol;
		
		OvalAtom atom=new OvalAtom();
		atom.AtomClass=ATOM_OVAL;
		atom.CX=CX; atom.CY=CY; atom.RW=RW; atom.RH=RH;
		atom.TypeRef=registerOvalType(type);
		atoms.add(atom);
	}
	public void drawPoly(double[] X,double[] Y,int EdgeCol,double Thickness,int FillCol,boolean Closed)
	{
		PathType type=new PathType();
		type.EdgeCol=EdgeCol;
		type.FillCol=FillCol;
		type.Thickness=Thickness;
		type.HardEdge=true;
	
		PathAtom atom=new PathAtom();
		atom.AtomClass=ATOM_PATH;
		atom.N=X.length;
		atom.X=new double[atom.N];
		atom.Y=new double[atom.N];
		atom.Ctrl=new boolean[atom.N];
		atom.Closed=Closed;
		for (int n=0;n<atom.N;n++) 
		{
			updateBounds(X[n]-Thickness,Y[n]-Thickness); 
			updateBounds(X[n]+Thickness,Y[n]+Thickness); 
			atom.X[n]=X[n];
			atom.Y[n]=Y[n];
			atom.Ctrl[n]=false;
		}
		atom.TypeRef=registerPathType(type);
		atoms.add(atom);
	}
	public void drawCurve(double[] X,double[] Y,boolean[] Ctrl,int EdgeCol,double Thickness,int FillCol,boolean Closed)
	{
		PathType type=new PathType();
		type.EdgeCol=EdgeCol;
		type.FillCol=FillCol;
		type.Thickness=Thickness;
		type.HardEdge=false;
	
		PathAtom atom=new PathAtom();
		atom.AtomClass=ATOM_PATH;
		atom.N=X.length;
		atom.X=new double[atom.N];
		atom.Y=new double[atom.N];
		atom.Ctrl=new boolean[atom.N];
		atom.Closed=Closed;
		for (int n=0;n<atom.N;n++) 
		{
			// (NOTE: if this is a control point, the boundary could be extended too far, but whatever...)
			updateBounds(X[n]-Thickness,Y[n]-Thickness); 
			updateBounds(X[n]+Thickness,Y[n]+Thickness); 
			atom.X[n]=X[n];
			atom.Y[n]=Y[n];
			atom.Ctrl[n]=Ctrl[n];
		}
		atom.TypeRef=registerPathType(type);
		atoms.add(atom);
	}
	public void drawText(double X,double Y,String Txt,double Sz,int Colour,int Style,int Align)
	{
		for (int n=0;n<Txt.length();n++) {int i=Txt.charAt(n); if (i>=32 && i<=127) charMask[i-32]=true;}
	
		double[] metrics=measureText(Txt,Sz,Style);
		if (Align==TXTALIGN_CENTRE) {updateBounds(X-0.5*metrics[0],Y-metrics[1]); updateBounds(X+0.5*metrics[0],Y+metrics[2]);}
		else if (Align==TXTALIGN_LEFT) {updateBounds(X,Y-metrics[1]); updateBounds(X+metrics[0],Y+metrics[2]);}
		else if (Align==TXTALIGN_RIGHT) {updateBounds(X-metrics[0],Y-metrics[1]); updateBounds(X,Y+metrics[2]);}
		
		// assumes that HTML tags are not wanted
		Txt=Txt.replace("&","&amp;");
		Txt=Txt.replace("<","&lt;");
		Txt=Txt.replace(">","&gt;");

		TextType type=new TextType();
		type.Sz=Sz;
		type.Colour=Colour;
		type.Style=Style;
		type.Align=Align;
		
		TextAtom atom=new TextAtom();
		atom.AtomClass=ATOM_TEXT;
		atom.X=X; atom.Y=Y; atom.Txt=Txt;
		atom.TypeRef=registerTextType(type);
		atoms.add(atom);
	}
	
	// records meta-information which will be encoded in the XML header
	public void specifyMetaData(Map<String,String> meta) {this.meta=meta;}
	
	// a conveniently overloaded version which computes the size based on the properties of the drawing itself; the returned value 
	// provides the calculated width & height
	public int[] build(OutputStream ostr) throws IOException
	{
		int w=(int)Math.ceil(highX-lowX)+2,h=(int)Math.ceil(highY-lowY)+2;
		double ox=1-lowX,oy=1-lowY;
		build(ostr,w,h,ox,oy,1,1);
		return new int[]{w,h};
	}
	
	// transforms the sizes and positions of the primitives; note that this should only be called within the building stage,
	// just before everything is emitted to the output device
	protected void transformPrimitives(double OX,double OY,double SW,double SH)
	{
		for (int n=0;n<atoms.size();n++)
		{
			Atom a=atoms.get(n);
			if (a.AtomClass==ATOM_LINE)
			{
				LineAtom la=(LineAtom)a;
				la.X1=OX+((la.X1-lowX)*SW+lowX); la.Y1=OY+((la.Y1-lowY)*SH+lowY); 
				la.X2=OX+((la.X2-lowX)*SW+lowX); la.Y2=OY+((la.Y2-lowY)*SH+lowY);
			}
			else if (a.AtomClass==ATOM_RECT)
			{
				RectAtom ra=(RectAtom)a;
				ra.X=OX+((ra.X-lowX)*SW+lowX); ra.Y=OY+((ra.Y-lowY)*SH+lowY); 
				ra.W=ra.W*SW; ra.H=ra.H*SH;
			}
			else if (a.AtomClass==ATOM_OVAL)
			{
				OvalAtom oa=(OvalAtom)a;
				oa.CX=OX+((oa.CX-lowX)*SW+lowX); oa.CY=OY+((oa.CY-lowY)*SH+lowY); 
				oa.RW*=SW; oa.RH*=SH;
			}
			else if (a.AtomClass==ATOM_PATH)
			{
				PathAtom pa=(PathAtom)a;
				for (int i=0;i<pa.N;i++) {pa.X[i]=OX+((pa.X[i]-lowX)*SW+lowX); pa.Y[i]=OY+((pa.Y[i]-lowY)*SH+lowY);}
			}
			else if (a.AtomClass==ATOM_TEXT)
			{
				TextAtom ta=(TextAtom)a;
				ta.X=OX+((ta.X-lowX)*SW+lowX); ta.Y=OY+((ta.Y-lowY)*SH+lowY); 
			}
		}
		double swsh=0.5*(SW+SH);
		for (int n=0;n<lineTypes.size();n++) lineTypes.get(n).Thickness*=swsh;
		for (int n=0;n<rectTypes.size();n++) rectTypes.get(n).Thickness*=swsh;
		for (int n=0;n<ovalTypes.size();n++) ovalTypes.get(n).Thickness*=swsh;
		for (int n=0;n<pathTypes.size();n++) pathTypes.get(n).Thickness*=swsh;
		for (int n=0;n<textTypes.size();n++) textTypes.get(n).Sz*=swsh;
	}
	
	// ------------ protected methods ------------
	
	protected void updateBounds(double X,double Y)
	{
		if (fresh) {lowX=highX=X; lowY=highY=Y; fresh=false;}
		lowX=Math.min(lowX,X);
		lowY=Math.min(lowY,Y);
		highX=Math.max(highX,X);
		highY=Math.max(highY,Y);
	}
	
	protected int registerLineType(LineType T)
	{
		for (int n=0;n<lineTypes.size();n++)
		{
			LineType tx=lineTypes.get(n);
			if (Util.dblEqual(T.Thickness,tx.Thickness) && T.Colour==tx.Colour) return n;
		}
		lineTypes.add(T);
		return lineTypes.size()-1;
	}
	protected int registerRectType(RectType T)
	{
		for (int n=0;n<rectTypes.size();n++)
		{
			RectType tx=rectTypes.get(n);
			if (T.EdgeCol==tx.EdgeCol && Util.dblEqual(T.Thickness,tx.Thickness) && T.FillCol==tx.FillCol) return n;
		}
		rectTypes.add(T);
		return rectTypes.size()-1;
	}
	protected int registerOvalType(OvalType T)
	{
		for (int n=0;n<ovalTypes.size();n++)
		{
			OvalType tx=ovalTypes.get(n);
			if (T.EdgeCol==tx.EdgeCol && Util.dblEqual(T.Thickness,tx.Thickness) && T.FillCol==tx.FillCol) return n;
		}
		ovalTypes.add(T);
		return ovalTypes.size()-1;
	}
	protected int registerPathType(PathType T)
	{
		for (int n=0;n<pathTypes.size();n++)
		{
			PathType tx=pathTypes.get(n);
			if (T.EdgeCol==tx.EdgeCol && T.FillCol==tx.FillCol && 
				Util.dblEqual(T.Thickness,tx.Thickness) && T.HardEdge==tx.HardEdge) return n;
		}
		pathTypes.add(T);
		return pathTypes.size()-1;
	}
	protected int registerTextType(TextType T)
	{
		for (int n=0;n<textTypes.size();n++)
		{
			TextType tx=textTypes.get(n);
			if (Util.dblEqual(T.Sz,tx.Sz) && T.Colour==tx.Colour && T.Style==tx.Style && T.Align==tx.Align) return n;
		}
		textTypes.add(T);
		return textTypes.size()-1;
	}
	
}

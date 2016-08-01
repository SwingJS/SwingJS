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
	An implementation of VectorGfxBuilder which composes the final result as an SVG XML document.
	
	Fonts: the SVG specification has a very nice feature for allowing a subset of a geometric font to be embedded at the beginning
	of the file, along with kerning information, for only the characters it needs. This is great for molecule style output, because
	most of the time only a few characters are needed. Unfortunately, as of January 2009, the state of implementation for
	embedded fonts is depressing, and seems to be limited to Batik, Inkscape and Opera. Some otherwise great renderers are
	capable of rendering the same glyph paths in excellent quality (e.g. Firefox), so the algorithms are there, but the feature
	is not, for reasons hard to relate to. Conversion utilities mapping SVG to any other format are pretty much guaranteed to 
	produce rubbish where embedded fonts are concerned. For this reason, the class supports a non-embedded mode, where fonts are 
	expressed as paths instead of text glyphs. The code & output are very similar, albeit without any of the semantic content.
	Until the glorious day when embedded fonts are supported, embedded fonts should be disabled by default.
*/

public class SVGBuilder extends VectorGfxBuilder
{
	// !! TODO: round all the positions to ~3dp or so
	// !! TODO: text styles are not honoured

	protected final double ASCENT_FUDGE=0.8; // for some #@!& reason, the ascent reserves quite a lot of room at the top

	protected boolean embeddedFont=false; // true=use proper embedded font definition; false=embed chars as glyph references
	
	// ------------------------------------------------ public functions ------------------------------------------------

	public SVGBuilder()
	{
		super();
	}
	
	// embedded fonts: if true, the font definition will be included at the beginning of the file and referred to; unfortunately
	// this part of the SVG spec is spectacularly tardy when it comes to being implemented by major applications claiming SVG
	// compatibility, so turning this function off forces the inclusion of each character as an individual outline
	public void setEmbeddedFont(boolean embFont) {embeddedFont=embFont;}
	
	
	// measures a text string, at a given size; the return value has to be considered approximate;
	// the return array is of the form {width,ascent,descent}
	public double[] measureText(String Txt,double Sz,int Style)
	{
		int w=0;
		for (int n=0;n<Txt.length();n++)
		{
			int i=Txt.charAt(n)-32;
			if (i>=0 && i<96) w+=SVGFont.HORIZ_ADV_X[i]; else w+=SVGFont.MISSING_HORZ;
			
			if (n<Txt.length()-1)
			{
				int j=Txt.charAt(n+1)-32;
				for (int k=0;k<SVGFont.KERN_K.length;k++) 
					if ((SVGFont.KERN_G1[k]==i && SVGFont.KERN_G2[k]==j) || (SVGFont.KERN_G1[k]==j && SVGFont.KERN_G2[k]==i))
						{w+=SVGFont.KERN_K[k]; break;}
			}
		}
		double[] ret=new double[3];
		ret[0]=Sz*w/SVGFont.UNITS_PER_EM;
		ret[1]=Sz*SVGFont.ASCENT*ASCENT_FUDGE/SVGFont.UNITS_PER_EM;
		ret[2]=Sz*-SVGFont.DESCENT/SVGFont.UNITS_PER_EM;
		return ret;
	}
		
	// builds the SVG content proper; the output is expected to fit in a box of dimensions (0,0,W,H), which is specified in the parameters;
	// the transformations (OX,OY,SW,SH) exist to facilitate fitting the result into this box; OX and OY are in destination units and are
	// added after scaling, while SW and SH are fractional scaling factors, where 1==unchanged; anisotropic scaling is not recommended
	public void build(OutputStream ostr,int W,int H,double OX,double OY,double SW,double SH) throws IOException
	{
		transformPrimitives(OX,OY,SW,SH);

		PrintWriter out=new PrintWriter(ostr);
	
		out.println("<?xml version=\"1.0\" encoding=\"UTF-8\" standalone=\"no\"?>\n");
		out.println("<!DOCTYPE svg PUBLIC \"-//W3C//DTD SVG 20010904//EN\" \"http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd\">\n");
		out.println("<svg xmlns=\"http://www.w3.org/2000/svg\" xmlns:xlink=\"http://www.w3.org/1999/xlink\"");
		out.println("	  version=\"1.0\" x=\"0\" y=\"0\" width=\""+W+"\" height=\""+H+"\" viewBox=\"0 0 "+W+" "+H+"\">");
		out.println();
		
		out.println("<defs>");
		
		// now write out the font definition: if using embedded fonts, then do it properly
		if (embeddedFont) 
		{
			out.println("<font id=\""+SVGFont.FONT_FAMILY+"\" horiz-adv-x=\""+SVGFont.FONT_ADV+"\">");
			out.println("<font-face font-family=\""+SVGFont.FONT_FAMILY+"\" units-per-em=\""+SVGFont.UNITS_PER_EM+"\" "+
						" panose-1=\""+SVGFont.PANOSE_1+"\" ascent=\""+SVGFont.ASCENT+"\" descent=\""+SVGFont.DESCENT+"\" "+
						"alphabetic=\"0\"/>");
			out.println("<missing-glyph horiz-adv-x=\""+SVGFont.MISSING_HORZ+"\" d=\""+SVGFont.MISSING_DATA+"\"/>");
			for (int n=0;n<96;n++) if (charMask[n])
			{
				out.print("<glyph unicode=\""+SVGFont.UNICODE[n]+"\" glyph-name=\""+SVGFont.GLYPH_NAME[n]+"\""+
						" horiz-adv-x=\""+SVGFont.HORIZ_ADV_X[n]+"\"");
				
				if (SVGFont.GLYPH_DATA[n].length()>0) out.print(" d=\""+SVGFont.GLYPH_DATA[n]+"\"");
				out.println("/>");
			}
			for (int n=0;n<SVGFont.KERN_K.length;n++) if (charMask[SVGFont.KERN_G1[n]] && charMask[SVGFont.KERN_G2[n]])
			{
				out.println("<hkern g1=\""+SVGFont.KERN_G1[n]+"\" g2=\""+SVGFont.KERN_G2[n]+"\" k=\""+SVGFont.KERN_K[n]+"\"/>");
			}
	
			out.println("</font>");
			out.println();
		}
		else // ... otherwise, write out all the glyphs that are in use, as paths which will be referred to later
		{
			for (int n=0;n<96;n++) if (charMask[n])
			{
				out.println("<path id=\"char"+n+"\" d=\""+SVGFont.GLYPH_DATA[n]+"\" edge=\"none\"/>");
			}
		}
		
		out.println("</defs>");
		
		if (meta!=null)
		{
			out.println("<metadata xmlns:sketchel=\"http://sketchel.org\">");
			String[] keys=meta.keySet().toArray(new String[meta.size()]);
			for (int n=0;n<keys.length;n++)
			{
				out.print("<sketchel:"+keys[n]+"><![CDATA[");
				out.print(meta.get(keys[n]));
				out.print("]]></sketchel:"+keys[n]+">\n");
			}
			out.println("</metadata>");
		}
		
		// emit everything, in singlets or in groups
		int p=0;
		while (p<atoms.size())
		{
			Atom a=atoms.get(p);
			int sz=1;
			if (a.AtomClass!=ATOM_PATH) // (these are not rendered in groups)
				for (int n=p+1;n<atoms.size();n++,sz++)
			{
				Atom ax=atoms.get(n);
				if (a.TypeRef!=ax.TypeRef || a.AtomClass!=ax.AtomClass) break;
			}
			if (a.AtomClass==ATOM_LINE) {if (sz==1) outputLine1(out,(LineAtom)a); else outputLineN(out,(LineAtom)a,p,sz);}
			else if (a.AtomClass==ATOM_RECT) {if (sz==1) outputRect1(out,(RectAtom)a); else outputRectN(out,(RectAtom)a,p,sz);}
			else if (a.AtomClass==ATOM_OVAL) {if (sz==1) outputOval1(out,(OvalAtom)a); else outputOvalN(out,(OvalAtom)a,p,sz);}
			else if (a.AtomClass==ATOM_PATH) outputPath(out,(PathAtom)a);
			else if (a.AtomClass==ATOM_TEXT) {if (sz==1) outputText1(out,(TextAtom)a); else outputTextN(out,(TextAtom)a,p,sz);}
			
			p+=sz;
		}

		out.println("</svg>");
		out.flush();
	}
	
	
	// ------------------------------------------------ private functions ------------------------------------------------
	
	
	private void outputLine1(PrintWriter Out,LineAtom A)
	{
		LineType type=lineTypes.get(A.TypeRef);
		Out.println(
			"<line x1=\""+A.X1+"\" y1=\""+A.Y1+"\" x2=\""+A.X2+"\" y2=\""+A.Y2+"\""+
			" stroke=\""+Util.colourHTML(type.Colour)+"\" stroke-width=\""+type.Thickness+"\"  stroke-linecap=\"round\"/>");
	}
	private void outputLineN(PrintWriter Out,LineAtom A,int N,int Sz)
	{
		LineType type=lineTypes.get(A.TypeRef);
		Out.println("<g stroke=\""+Util.colourHTML(type.Colour)+"\" stroke-width=\""+type.Thickness+"\"  stroke-linecap=\"round\">");
		for (int n=0;n<Sz;n++)
		{
			LineAtom a=n==0 ? A : (LineAtom)atoms.get(N+n);
			Out.println("	 <line x1=\""+a.X1+"\" y1=\""+a.Y1+"\" x2=\""+a.X2+"\" y2=\""+a.Y2+"\"/>");
		}
		Out.println("</g>");
	}
	private void outputRect1(PrintWriter Out,RectAtom A)
	{
		RectType type=rectTypes.get(A.TypeRef);
		String edge=type.EdgeCol==NOCOLOUR ? "none" : Util.colourHTML(type.EdgeCol);
		String fill=type.FillCol==NOCOLOUR ? "none" : Util.colourHTML(type.FillCol);
	
		Out.println(
			"<rect x=\""+A.X+"\" y=\""+A.Y+"\" width=\""+A.W+"\" height=\""+A.H+"\""+
			" stroke=\""+edge+"\" stroke-width=\""+type.Thickness+"\"fill=\""+fill+"\"/>");
	}
	private void outputRectN(PrintWriter Out,RectAtom A,int N,int Sz)
	{
		RectType type=rectTypes.get(A.TypeRef);
		String edge=type.EdgeCol==NOCOLOUR ? "none" : Util.colourHTML(type.EdgeCol);
		String fill=type.FillCol==NOCOLOUR ? "none" : Util.colourHTML(type.FillCol);

		Out.println("<g stroke=\""+edge+"\" stroke-width=\""+type.Thickness+"\" fill=\""+fill+"\">");
		for (int n=0;n<Sz;n++)
		{
			RectAtom a=n==0 ? A : (RectAtom)atoms.get(N+n);
			Out.println("	 <rect x=\""+a.X+"\" y=\""+a.Y+"\" width=\""+a.W+"\" height=\""+a.H+"\"/>");
		}
		Out.println("</g>");
	}
	private void outputOval1(PrintWriter Out,OvalAtom A)
	{
		OvalType type=ovalTypes.get(A.TypeRef);
		String edge=type.EdgeCol==NOCOLOUR ? "none" : Util.colourHTML(type.EdgeCol);
		String fill=type.FillCol==NOCOLOUR ? "none" : Util.colourHTML(type.FillCol);
	
		Out.println(
			"<ellipse cx=\""+A.CX+"\" cy=\""+A.CY+"\" rx=\""+A.RW+"\" ry=\""+A.RH+"\""+
			" stroke=\""+edge+"\" stroke-width=\""+type.Thickness+"\" fill=\""+fill+"\"/>");
	}
	private void outputOvalN(PrintWriter Out,OvalAtom A,int N,int Sz)
	{
		OvalType type=ovalTypes.get(A.TypeRef);
		String edge=type.EdgeCol==NOCOLOUR ? "none" : Util.colourHTML(type.EdgeCol);
		String fill=type.FillCol==NOCOLOUR ? "none" : Util.colourHTML(type.FillCol);

		Out.println("<g stroke=\""+edge+"\" stroke-width=\""+type.Thickness+"\" fill=\""+fill+"\">");
		for (int n=0;n<Sz;n++)
		{
			OvalAtom a=n==0 ? A : (OvalAtom)atoms.get(N+n);
			Out.println("	 <ellipse cx=\""+a.CX+"\" cy=\""+a.CY+"\" rx=\""+a.RW+"\" ry=\""+a.RH+"\"/>");
		}
		Out.println("</g>");
	}
	private void outputPath(PrintWriter Out,PathAtom A)
	{
		PathType type=pathTypes.get(A.TypeRef);
		String edge=type.EdgeCol==NOCOLOUR ? "none" : Util.colourHTML(type.EdgeCol);
		String fill=type.FillCol==NOCOLOUR ? "none" : Util.colourHTML(type.FillCol);
		String join=type.HardEdge ? "miter" : "round",cap=type.HardEdge ? "square" : "round";
		String shape="M "+A.X[0]+" "+A.Y[0];
		int n=1;
		while (n<A.N)
		{
			if (!A.Ctrl[n]) {shape+=" L "+A.X[n]+" "+A.Y[n]; n++;}
			else if (A.Ctrl[n] && n<A.N-1 && !A.Ctrl[n+1])
			{
				shape+=" Q "+A.X[n]+" "+A.Y[n]+" "+A.X[n+1]+" "+A.Y[n+1];
				n+=2;
			}
			else if (A.Ctrl[n] && n<A.N-2 && A.Ctrl[n+1] && !A.Ctrl[n+2])
			{
				shape+=" C "+A.X[n]+" "+A.Y[n]+" "+A.X[n+1]+" "+A.Y[n+1]+" "+A.X[n+2]+" "+A.Y[n+2];
				n+=3;
			}
			else n++; // (dunno, so skip)
		}
		if (A.Closed) shape+=" Z";
		
		Out.println("<path d=\""+shape+"\" stroke=\""+edge+"\" fill=\""+fill+"\" stroke-width=\""+type.Thickness+"\""+
					" stroke-linejoin=\""+join+"\" stroke-linecap=\""+cap+"\"/>");
	}
	private void outputText1(PrintWriter Out,TextAtom A)
	{
		TextType type=textTypes.get(A.TypeRef);
		String anchor=type.Align==TXTALIGN_LEFT ? "start" : type.Align==TXTALIGN_RIGHT ? "end" : "middle";

		if (embeddedFont) 
		{
			Out.println(
				"<text x=\""+A.X+"\" y=\""+A.Y+"\" font-family=\"Verdana\" font-size=\""+type.Sz+"\""+
				" text-anchor=\""+anchor+"\" fill=\""+Util.colourHTML(type.Colour)+"\">"+A.Txt+"</text>");
		}
		else outputTextOutline(Out,A);
	}
	private void outputTextN(PrintWriter Out,TextAtom A,int N,int Sz)
	{
		TextType type=textTypes.get(A.TypeRef);
		String anchor=type.Align==TXTALIGN_LEFT ? "start" : type.Align==TXTALIGN_RIGHT ? "end" : "middle";

		if (embeddedFont)
		{
			Out.println(
				"<g font-family=\"Verdana\" font-size=\""+type.Sz+"\""+
				" text-anchor=\""+anchor+"\" fill=\""+Util.colourHTML(type.Colour)+"\">");
			for (int n=0;n<Sz;n++)
			{
				TextAtom a=n==0 ? A : (TextAtom)atoms.get(N+n);
				Out.println("	 <text x=\""+a.X+"\" y=\""+a.Y+"\">"+a.Txt+"</text>");
			}
			Out.println("</g>");
		}
		else
		{
			for (int n=0;n<Sz;n++) outputTextOutline(Out,n==0 ? A : (TextAtom)atoms.get(N+n));
		}
	}
	
	// an alternative form of emitting text, which draws the outline as a polygonal form
	private void outputTextOutline(PrintWriter Out,TextAtom A)
	{
		TextType type=textTypes.get(A.TypeRef);
		
		double x=A.X,y=A.Y;
		if (type.Align==TXTALIGN_CENTRE) x-=measureText(A.Txt,type.Sz,type.Style)[0]*0.5;
		else if (type.Align==TXTALIGN_RIGHT) x-=measureText(A.Txt,type.Sz,type.Style)[0];
		
		double scale=type.Sz/SVGFont.UNITS_PER_EM;
		Out.println("<g transform=\"translate("+x+","+y+")\"><g transform=\"scale("+scale+","+(-scale)+")\">");

		double dx=0;
		for (int n=0;n<A.Txt.length();n++)
		{
			int i=A.Txt.charAt(n)-32;
			if (i>=0 && i<96)
			{
				/*String offset="";
				if (dx>0) offset=" transform=\"translate("+dx+",0)\"";
				
				Out.println("<path d=\""+SVGFont.GLYPH_DATA[i]+"\" fill=\""+Util.colourHTML(type.Colour)+"\" "+
							" edge=\"none\""+offset+"/>");*/
				
				Out.println("<use xlink:href=\"#char"+i+"\" fill=\""+Util.colourHTML(type.Colour)+"\" x=\""+dx+"\"/>");
				  
				dx+=SVGFont.HORIZ_ADV_X[i];
			
				if (n<A.Txt.length()-1)
				{
					int j=A.Txt.charAt(n+1)-32;
					for (int k=0;k<SVGFont.KERN_K.length;k++) 
						if ((SVGFont.KERN_G1[k]==i && SVGFont.KERN_G2[k]==j) || (SVGFont.KERN_G1[k]==j && SVGFont.KERN_G2[k]==i))
							{dx+=SVGFont.KERN_K[k]; break;}
				}
			}
			else dx+=SVGFont.MISSING_HORZ;
		}
		
		Out.println("</g></g>");
	}
}

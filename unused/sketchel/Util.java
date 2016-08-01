/*
	Sketch Elements: Chemistry molecular diagram drawing tool.
	
	(c) 2005-2013 Dr. Alex M. Clark, all rights reserved
	
	Released as GNUware, under the Gnu Public License (GPL)
	
	See www.gnu.org for details.
*/

package org.sketchel;

import java.awt.Color;
import java.awt.event.ActionListener;
import java.nio.charset.Charset;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

import javax.swing.ButtonGroup;
import javax.swing.Icon;
import javax.swing.JButton;
import javax.swing.JCheckBoxMenuItem;
import javax.swing.JMenuItem;
import javax.swing.JOptionPane;
import javax.swing.JRadioButton;
import javax.swing.JRadioButtonMenuItem;
import javax.swing.KeyStroke;

/*
	A class containing miscellaneous static utility functions, which are painfully absent from the standard Java libraries.
*/

public class Util
{
	// pure convenience
	public static void write(String S) {System.out.print(S);}
	public static void writeln(String S) {System.out.println(S);}
	public static void writeln() {System.out.println();}

	public static void errmsg(String title,String text)
	{
		JOptionPane.showMessageDialog(null,text,title,JOptionPane.ERROR_MESSAGE);
	}
	
	public static void errmsg(String title,Exception ex)
	{
		ex.printStackTrace();
//		StringWriter sw=new StringWriter();
//		ex.printStackTrace(new PrintWriter(sw));
//		String[] lines=sw.toString().split("\n");
//		StringBuffer sb=new StringBuffer();
//		for (int n=0;n<20;n++) sb.append(lines[n]+"\n");
//		if (lines.length>20) sb.append("... etc ...\n");
//		errmsg(title,sb.toString());
	}
	
	public static String arrayStr(int[] A) {String str=""; for (int n=0;n<A.length;n++) str+=(n>0 ? "," : "")+A[n]; return str;}
	public static String arrayStr(float[] A) {String str=""; for (int n=0;n<A.length;n++) str+=(n>0 ? "," : "")+A[n]; return str;}
	public static String arrayStr(double[] A) {String str=""; for (int n=0;n<A.length;n++) str+=(n>0 ? "," : "")+A[n]; return str;}
	public static String arrayStr(String[] A) {String str=""; for (int n=0;n<A.length;n++) str+=(n>0 ? "," : "")+"\""+A[n]+"\""; return str;}
	public static String arrayStr(boolean[] A) {String str="{"; for (int n=0;n<A.length;n++) str+=(A[n]?"1":"0"); return str+"}";}
	
	public static String arrayStr(double[] A,double mul) 
		{String str=""; for (int n=0;n<A.length;n++) str+=(n>0 ? "," : "")+(A[n]*mul); return str;}
	
	// causes an undetectable exception, which is a crude yet remarkably effective way of returning through multiple stack layers
	public static void bugOut() {int i=-1; int[] j=new int[0]; i=j[i];}
	
	// parse number-from-string functions which return a default value if it's badly formatted, instead of throwing an exception
	public static int safeInt(String S,int Def) 
	{
		if (S==null) return Def;
		try {return new Integer(S).intValue();} 
		catch (NumberFormatException e) {return Def;}
	}
	public static int safeInt(String S) {return safeInt(S,0);}
	public static double safeDouble(String S,double Def) 
	{
		if (S==null) return Def;
		try {return new Double(S).doubleValue();} 
		catch (NumberFormatException e) {return Def;}
	}
	public static double safeDouble(String S) {return safeDouble(S,0);}
	public static String safeString(String S) {return S==null ? "" : S;}
	
	public static int iround(float V) {return (int)Math.round(V);}
	public static int iround(double V) {return (int)Math.round(V);}
	public static int ifloor(float V) {return (int)Math.floor(V);}
	public static int ifloor(double V) {return (int)Math.floor(V);}
	public static int iceil(float V) {return (int)Math.ceil(V);}
	public static int iceil(double V) {return (int)Math.ceil(V);}
	
	public static int sqr(int V) {return V*V;}
	public static float sqr(float V) {return V*V;}
	public static double sqr(double V) {return V*V;}
	public static int norm2(int x,int y) {return x*x+y*y;}
	public static double norm2(double x,double y) {return x*x+y*y;}
	public static double norm2(double x,double y,double z) {return x*x+y*y+z*z;}
	public static float norm2(float x,float y) {return x*x+y*y;}
	public static float norm2(float x,float y,float z) {return x*x+y*y+z*z;}
	public static double norm(double x,double y) {return Math.sqrt(x*x+y*y);}
	public static double norm(double x,double y,double z) {return Math.sqrt(x*x+y*y+z*z);}
	public static double divZ(double z) {return z==0 ? 1 : 1/z;}
	
	public final static double TWOPI=Math.PI*2;
	public final static double DEGRAD=Math.PI/180;
	public final static double RADDEG=180/Math.PI;
	
	// returns {theta1}-{theta2}, where both are in radians; the result is corrected to be between -PI and +PI
	public static double angleDiff(double th1,double th2)
	{
		double theta=angleNorm(th1)-angleNorm(th2);
		return theta-(theta>Math.PI ? TWOPI : 0)+(theta<-Math.PI ? TWOPI : 0);
	}
	
	// normalises an angle so that it is >-PI and <=PI; it may be any multiple of 2*PI outside of this range
	public static double angleNorm(double th)
	{
		if (th==-Math.PI) th=Math.PI;
		if (th<-Math.PI)
		{
			double mod=Math.ceil((-th-Math.PI)/TWOPI);
			th+=mod*TWOPI;
		}
		else if (th>Math.PI)
		{
			double mod=Math.ceil((th-Math.PI)/TWOPI);
			th-=mod*TWOPI;
		}
		return th;
	}
	
	/* !!
	// equality of real numbers, which are not significantly less than 1
	public static boolean dblEqual(double d1,double d2) {return Math.abs(d1-d2)<1E-10;}*/
	
	// literal comparison of floating point values, to machine precision
	public static boolean fltEqual(float v1,float v2) {return v1==v2 || Math.abs(v1-v2)<=1E-6*Math.max(v1,v2);}
	public static boolean dblEqual(double v1,double v2) {return v1==v2 || Math.abs(v1-v2)<=1E-14*Math.max(v1,v2);}

	// integer colour to HTML-style hex colour
	public static String colourHTML(int col)
	{
		String str=Integer.toHexString(col);
		return "#"+rep('0',6-str.length())+str;
	}
	
	// returns a new colour with the average RGB values of the incoming colours
	public static Color mergeCols(Color col1,Color col2)
	{
		int r=col1.getRed()+col2.getRed(),g=col1.getGreen()+col2.getGreen(),b=col1.getBlue()+col2.getBlue();
		return new Color(r/2,g/2,b/2);
	}
	
	// starts with a particular RGB suite, then "tints" it toward the parameter offsets; a positive value for R/G/B makes the
	// result "more-of" that colour, if necessary by backing off the other values
	public static Color tintCol(Color col,int dr,int dg,int db)
	{
		float r=col.getRed()+dr,g=col.getGreen()+dg,b=col.getBlue()+db;
		if (r<0) {g-=r; b-=r; r=0;}
		if (g<0) {r-=g; b-=g; g=0;}
		if (b<0) {r-=b; g-=b; b=0;}
		if (r>255) {float m=255f/r; r=255; g*=m; b*=m;}
		if (g>255) {float m=255f/g; g=255; r*=m; b*=m;}
		if (b>255) {float m=255f/b; b=255; r*=m; g*=m;}
		return new Color(iround(r),iround(g),iround(b));
	}
	
	// integer right-pad: adds characters to the right, if necessary
	public static String intrpad(int val,int len) {return intrpad(val,len,' ');}
	public static String intrpad(int val,int len,char ch)
	{
		String str=Integer.toString(val);
		str=rep(ch,len-str.length())+str;
		if (str.length()>len) str=str.substring(0,len);
		return str;
	}
	// compose a string from a repeated integer; note that a length of 0, or less than zero, is valid: blank result
	public static String rep(char ch,int len)
	{
		if (len<=0) return "";
		String str=String.valueOf(ch);
		while (str.length()<len) str=str+ch;
		return str;
	}
	public static String rep(String str,int len)
	{
		if (len==0) return "";
		if (len==1) return str;
		StringBuffer buff=new StringBuffer();
		for (int n=0;n<len;n++) buff.append(str);
		return buff.toString();
	}
	
	// convenience functions for creating menu items
	public static JMenuItem menuItem(ActionListener lstn,String txt,int key) {return menuItem(lstn,txt,key,null,null);}
	public static JMenuItem menuItem(ActionListener lstn,String txt,int key,Icon icon) {return menuItem(lstn,txt,key,icon,null);}
	public static JMenuItem menuItem(ActionListener lstn,String txt,int key,Icon icon,KeyStroke accel)
	{
		JMenuItem mi=new JMenuItem(txt,key);
		mi.addActionListener(lstn);
		if (icon!=null) mi.setIcon(icon);
		if (accel!=null) mi.setAccelerator(accel);
		return mi;
	}
	public static JRadioButtonMenuItem radioMenuItem(ActionListener lstn,String txt,int key,boolean sel,ButtonGroup bg)
	{
		JRadioButtonMenuItem mi=new JRadioButtonMenuItem(txt,sel);
		if (lstn!=null) mi.addActionListener(lstn);
		mi.setMnemonic(key);
		bg.add(mi);
		return mi;
	}
	public static JCheckBoxMenuItem checkboxMenuItem(ActionListener lstn,String txt,int key,boolean sel)
	{
		JCheckBoxMenuItem mi=new JCheckBoxMenuItem(txt,sel);
		if (lstn!=null) mi.addActionListener(lstn);
		mi.setMnemonic(key);
		return mi;
	}
	
	// convenience amalgamation of the tedious process of creating a pushbutton
	public static JButton makeButton(ActionListener lstn,String text) {return makeButton(lstn,text,0,null);}
	public static JButton makeButton(ActionListener lstn,String text,int key) {return makeButton(lstn,text,key,null);}
	public static JButton makeButton(ActionListener lstn,String text,int key,String toolTip)
	{
		JButton btn=new JButton(text);
		if (lstn!=null) btn.addActionListener(lstn);
		if (key!=0) btn.setMnemonic(key);
		if (toolTip!=null) btn.setToolTipText(toolTip);
		return btn;
	}
	
	// ditto, for a radiobutton
	public static JRadioButton makeRadio(ActionListener lstn,String text,ButtonGroup bg) {return makeRadio(lstn,text,bg,0,null);}
	public static JRadioButton makeRadio(ActionListener lstn,String text,ButtonGroup bg,int key) {return makeRadio(lstn,text,bg,key,null);}
	public static JRadioButton makeRadio(ActionListener lstn,String text,ButtonGroup bg,int key,String toolTip)
	{
		JRadioButton rad=new JRadioButton(text);
		if (bg!=null) bg.add(rad);
		if (key!=0) rad.setMnemonic(key);
		if (toolTip!=null) rad.setToolTipText(toolTip);
		if (lstn!=null) rad.addActionListener(lstn);
		return rad;
	}
	
//	// fetching the always-available character-sets, with exceptions trapped out
//	public static Charset charsetUTF8() {try {return Charset.forName("UTF-8");} catch (Exception ex) {return null;}}
//	public static Charset charsetLatin() {try {return Charset.forName("ISO-8859-1");} catch (Exception ex) {return null;}}
//	public static Charset charsetAscii() {try {return Charset.forName("US-ASCII");} catch (Exception ex) {return null;}}
	
	// if the filename begins with "~", swap in the user's home directory, Unix shell style
	public static String homeFile(String fn)
	{
		if (fn!=null && fn.startsWith("~")) fn=System.getProperty("user.home")+fn.substring(1);
		return fn;
	}
	
	// extracts the version of the current Java machine and returns the sub-version number, i.e. JRE1.5 is 5, JRE1.6 is 6, etc.;
	public static int version=0;
	public static int javaVersion()
	{
		if (version!=0) return version;
		
		String verstr=System.getProperty("java.version");
		Pattern p=Pattern.compile("^[0-9]+\\.([0-9]+)");
		Matcher m=p.matcher(verstr);
		if (!m.find()) throw new RuntimeException("Unable to parse Java version: '"+verstr+"'");
		version=safeInt(m.group(1));
		if (version==0) throw new RuntimeException("Unable to parse Java version: '"+verstr+"'");
		return version;
	}
}

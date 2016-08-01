/*
	Sketch Elements: Chemistry molecular diagram drawing tool.
	
	(c) 2005-2013 Dr. Alex M. Clark, all rights reserved
	
	Released as GNUware, under the Gnu Public License (GPL)
	
	See www.gnu.org for details.
*/

package org.sketchel;

import java.io.*;
import java.awt.*;
import java.util.*;
import java.awt.image.*;
import javax.swing.*;

/* 
	Custom cursors for sketch editing tools, among other things. Besides just loading up images to convert into cursors, also
	allows text annotations to be added to them, and has some caching ability.
*/

public class ToolCursors
{
	public final static int CURSOR_POINTER=0;
	public final static int CURSOR_DELETE=1;
	public final static int CURSOR_SMALLBOX=2;
	public final static int CURSOR_SMALLCIRCLE=3;
	public final static int CURSOR_BONDSINGLE=4;
	public final static int CURSOR_BONDDOUBLE=5;
	public final static int CURSOR_BONDTRIPLE=6;
	public final static int CURSOR_BONDZERO=7;
	public final static int CURSOR_BONDINCLINED=8;
	public final static int CURSOR_BONDDECLINED=9;
	public final static int CURSOR_BONDUNKNOWN=10;
	public final static int CURSOR_PLUSMINUS=11;
	public final static int CURSOR_PAN=12;
	private final static int NUM_CURSORS=13;
	
	private final static String[] refFile=new String[]
	{
		null,
		"CursorDelete.gif",
		"CursorSmallBox.gif",
		"CursorSmallCircle.gif",
		"CursorBondSingle.gif",
		"CursorBondDouble.gif",
		"CursorBondTriple.gif",
		"CursorBondZero.gif",
		"CursorBondInclined.gif",
		"CursorBondDeclined.gif",
		"CursorBondUnknown.gif",
		"CursorPlusMinus.gif",
		"CursorPan.gif"
	};
	private final static int[] refHotX=new int[]{0,4,4,4,4,4,4,4,4,4,4,16,9};
	private final static int[] refHotY=new int[]{0,4,4,4,4,4,4,4,4,4,4,8,9};

	private static Class<?> refClass=null;
	private static Cursor[] cursors=new Cursor[NUM_CURSORS];
	private static String[] annotations=new String[NUM_CURSORS];

	static 
	{
		for (int n=0;n<NUM_CURSORS;n++) cursors[n]=null;
	}
	
	// so the static functions can find their own .jar
	public static void setRefClass(Class<?> cls) {refClass=cls;}
	
	public static Cursor get(int idx)
	{
		if (cursors[idx]==null || annotations[idx]!=null) generateCursor(idx,null,0,0);
		return cursors[idx];
	}
	
	public static Cursor get(int idx,String annot,int ax,int ay)
	{
		if (cursors[idx]==null || (annotations[idx]==null || !annotations[idx].equals(annot))) generateCursor(idx,annot,ax,ay);
		return cursors[idx];
	}
	
	// produces a new custom cursor, if appropriate, and puts it into the cache; some cursor types just map onto defaults; 
	// non-default cursors support an optional annotation (if annot!=null), which is drawn at the bottom right; it should be a
	// string, ideally 1 or 2 characters long
	private static void generateCursor(int idx,String annot,int ax,int ay)
	{
		// cursor indices which are mapped to the defaults
		if (idx==CURSOR_POINTER) {cursors[idx]=Cursor.getPredefinedCursor(Cursor.DEFAULT_CURSOR); return;}
	
		Toolkit tk=Toolkit.getDefaultToolkit();
		Class<?> cls=refClass==null ? tk.getClass() : refClass;
		//Image img=new ImageIcon(cls.getResource(refFile[idx])).getImage();
		Image img=MainPanel.loadIcon(refFile[idx],cls).getImage();
		Point hotspot=new Point(refHotX[idx],refHotY[idx]);
		String name=refFile[idx];
		if (name.lastIndexOf("/")>=0) name=name.substring(name.lastIndexOf("/")+1);
		
		if (annot!=null)
		{
			name+=":"+annot;
		
			int w=img.getWidth(null),h=img.getWidth(null);
			BufferedImage newimg=new BufferedImage(w,h,BufferedImage.TYPE_INT_ARGB);
			Graphics2D g=(Graphics2D)newimg.getGraphics();
			g.setRenderingHint(RenderingHints.KEY_ANTIALIASING,RenderingHints.VALUE_ANTIALIAS_OFF);
			g.setColor(new Color(0x00000000,true));
			g.fillRect(0,0,w,h);
			g.drawImage(img,0,0,null);
			
			g.setFont(new Font("SansSerif",Font.PLAIN,10));
			FontMetrics metrics=g.getFontMetrics();
			int x=Math.min(w-1-metrics.stringWidth(annot),ax);
			int y=Math.min(h-1-metrics.getDescent(),ay+metrics.getAscent());
			g.setColor(new Color(255,255,255));
			g.drawString(annot,x-1,y);
			g.drawString(annot,x+1,y);
			g.drawString(annot,x,y-1);
			g.drawString(annot,x,y+1);
			g.setColor(new Color(0,0,0));
			g.drawString(annot,x,y);
			
			img=newimg;
		}
		
		cursors[idx]=tk.createCustomCursor(img,hotspot,name);
		annotations[idx]=annot;
	}
}

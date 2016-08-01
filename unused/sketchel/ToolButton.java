/*
	Sketch Elements: Chemistry molecular diagram drawing tool.
	
	(c) 2005-2013 Dr. Alex M. Clark, all rights reserved
	
	Released as GNUware, under the Gnu Public License (GPL)
	
	See www.gnu.org for details.
*/

package org.sketchel;

import javax.swing.*;
import javax.swing.plaf.*;
import java.awt.*;
import java.awt.event.*;
import java.awt.font.*;
import java.io.*;
import java.util.*;

// Subclassed version of the ToolButton which supports tool-tips with multiple lines.

public class ToolButton extends JToggleButton
{
	public ToolButton(Icon icon) 
	{
		super(icon);
		setFocusable(false);
	}

	public JToolTip createToolTip() 
	{
		MultiLineToolTip tip=new MultiLineToolTip();
		tip.setComponent(this);
		return tip;
	}
}

class MultiLineToolTip extends JToolTip 
{
	public MultiLineToolTip() 
	{
		setUI(new MultiLineToolTipUI());
	}
}

class MultiLineToolTipUI extends ToolTipUI 
{
	String[] strs;
	int maxWidth=0;
	
	public void paint(Graphics g,JComponent c) 
	{
		Font font=g.getFont();
		FontMetrics metrics=g.getFontMetrics();
		FontRenderContext frc=new FontRenderContext(null,false,false);
		Dimension size=c.getSize();
		g.setColor(c.getBackground());
		g.fillRect(0,0,size.width,size.height);
		g.setColor(c.getForeground());
		g.drawRect(0,0,size.width-1,size.height-1);
		if (strs!=null) 
		{
			int y=0;
			for (int i=0;i<strs.length;i++) 
			{
				y+=(int)font.getLineMetrics(strs[i],frc).getHeight()+2;
				g.drawString(strs[i],3,y);
				//g.drawString(strs[i],3,(metrics.getHeight())*(i+1));
			}
		}
	}

	public Dimension getPreferredSize(JComponent c) 
	{
		Font font=c.getFont();
		FontRenderContext frc=new FontRenderContext(null,false,false);
		String tipText=((JToolTip) c).getTipText();
		if (tipText==null) tipText="";
		while (tipText.endsWith("\n")) {tipText=tipText.substring(0,tipText.length()-1);}
		BufferedReader br=new BufferedReader(new StringReader(tipText));
		String line;
		int maxWidth=0,totalHeight=0;
		Vector<String> v=new Vector<String>();
		try 
		{
			while ((line=br.readLine())!=null) 
			{
				int width=(int)font.getStringBounds(line,frc).getWidth();
				maxWidth=(maxWidth<width) ? width : maxWidth;
				v.addElement(line);
				totalHeight+=(int)font.getLineMetrics(line,frc).getHeight()+2;
			}
		} 
		catch (IOException ex) 
		{
			ex.printStackTrace();
		}
		int lines=v.size();
		if (lines<1) 
		{
			strs=null; 
			lines=1;
		}
		else 
		{
			strs=new String[lines];
			int i=0;
			//for (Enumeration e=v.elements();e.hasMoreElements();i++) strs[i]=(String)e.nextElement();
			for (String s : v) strs[i++]=s;
		}
		this.maxWidth=maxWidth;
		return new Dimension(maxWidth+6,totalHeight+4);
	}
}

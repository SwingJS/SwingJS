/*
	Sketch Elements: Chemistry molecular diagram drawing tool.
	
	(c) 2005-2013 Dr. Alex M. Clark, all rights reserved
	
	Released as GNUware, under the Gnu Public License (GPL)
	
	See www.gnu.org for details.
*/

package org.sketchel;

import java.io.*;
import java.awt.*;
import java.awt.event.*;
import java.util.*;
import javax.swing.*;

public class LaunchApplet extends JApplet implements ActionListener
{
	JButton openbutton;

	public void init()
	{
		openbutton=new JButton("Open SketchEl");
		add(openbutton);
		openbutton.addActionListener(this);
	}
	
	public void actionPerformed(ActionEvent e) 
	{
		if (e.getSource()==openbutton)
		{
			MainWindow mw=new MainWindow(null,false);
			mw.setVisible(true);
			System.out.println("foo");
		}
	}

	public String getAppletInfo() 
	{
		return "SketchEl: Applet version of chemistry\nmolecular diagram drawing tool.";
	}
}

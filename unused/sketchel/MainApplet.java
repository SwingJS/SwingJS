/*
	Sketch Elements: Chemistry molecular diagram drawing tool.
	
	(c) 2005-2013 Dr. Alex M. Clark, all rights reserved
	
	Released as GNUware, under the Gnu Public License (GPL)
	
	See www.gnu.org for details.
*/

package org.sketchel;

import java.awt.BorderLayout;
import java.awt.event.ComponentEvent;
import java.awt.event.ComponentListener;
import java.io.BufferedReader;
import java.io.BufferedWriter;
import java.io.IOException;
import java.io.StringReader;
import java.io.StringWriter;
import java.util.ArrayList;

import javax.swing.JApplet;
import javax.swing.JOptionPane;

public class MainApplet extends JApplet implements ComponentListener
{
	MainPanel mainPanel=null;

	public void init()
	{
		getContentPane().setLayout(new BorderLayout());
		mainPanel=new MainPanel(null,MainPanel.MODE_APPLET,null);
		getContentPane().add(mainPanel,BorderLayout.CENTER);
		
		Molecule mol=parseParams();
		if (mol!=null) mainPanel.setMolecule(mol);
		
		addComponentListener(this);
		
		repaint(1000);
		
		mainPanel.grabFocus();
	}

	public String getAppletInfo() 
	{
		return "SketchEl: Applet version of chemistry\nmolecular diagram drawing tool.";
	}

	// if the source webpage wishes to supply a molecule at startup time, there is a slightly cumbersome way to accomplish this:
	// the <params> tag may be used; "nlines" should have the total number of lines of text, and each "line{#}" (e.g. "line1", "line50",
	// etc.) should contain the content; the string that emerges should be either SketchEl native format, or MDL MOL
	private Molecule parseParams()
	{
		try
		{
			String str=getParameter("nlines");
			if (str==null) return null;
			int nlines=Integer.valueOf(str).intValue();
			if (nlines<3 || nlines>10000) return null; // insanity

			StringBuffer buff=new StringBuffer();
			for (int n=1;n<=nlines;n++)
			{
				str=getParameter("line"+n);
				if (str==null) return null;
				for (int i=0;i<str.length();i++) 
				{
					if (str.charAt(i)=='_') str=str.substring(0,i)+" "+str.substring(i+1); else break;
				}
				buff.append(str+"\n");
			}
			
			Molecule mol=MoleculeReader.readUnknown(new BufferedReader(new StringReader(buff.toString())));
			if (mol.numAtoms()>0) return mol;
			
			return null;
		}
		catch (Exception e) 
		{
			JOptionPane.showMessageDialog(null,"Unable to parse parameter molecule:\n"+e.getMessage(),"zog",JOptionPane.ERROR_MESSAGE); 
		}

		return null;
	}
	
	// methods intended to interact with Javascript
	
	// replace the current molecule with the content of the string, which can be any of the formats which SketchEl
	// is able to read out from a file; returns true if successful
	public boolean setMolecule(String Source) 
	{
		try
		{
			Molecule mol=MoleculeReader.readUnknown(new BufferedReader(new StringReader(Source)));
			mainPanel.setMolecule(mol);
			mainPanel.repaint();
			return true;
		}
		catch (IOException e) {}
		
		return false;
	}
	
	// appends the indicated molecular source to the current molecule, in the same way as the paste feature; otherwise works
	// the same as SetMolecule
	public boolean appendMolecule(String Source)
	{
		try
		{
			Molecule mol=MoleculeReader.readUnknown(new BufferedReader(new StringReader(Source)));
			mainPanel.addMolecule(mol);
			mainPanel.repaint();
			return true;
		}
		catch (IOException e) {}
		
		return false;
	}
	
	// return the string representation of the molecule, in SketchEl native format
	public String getMoleculeNative()
	{
		try
		{
			StringWriter sw=new StringWriter();
			BufferedWriter bw=new BufferedWriter(sw);
			MoleculeWriter.writeNative(bw,mainPanel.molData());
			return sw.toString();
		}
		catch (IOException e) {}
		
		return null;
	}
	
	// return the string representation of the molecule, in MDL MOL-file format
	public String getMoleculeMDLMOL()
	{
		try
		{
			StringWriter sw=new StringWriter();
			BufferedWriter bw=new BufferedWriter(sw);
			MoleculeWriter.writeMDLMOL(bw,mainPanel.molData());
			return sw.toString();
		}
		catch (IOException e) {}
		
		return null;
	}

	// return the string representation of the molecule, in MDL MOL-file format
	public String getMoleculeMDLMOL_WithHydrogens()
	{
		try
		{
			Molecule mol=mainPanel.molData().clone();
			ArrayList<Integer> all=new ArrayList<Integer>();
			for (int n=1;n<=mol.numAtoms();n++) all.add(n);
			ToolChest.hydrogenCreateActual(mol,all);
			
			StringWriter sw=new StringWriter();
			BufferedWriter bw=new BufferedWriter(sw);
			MoleculeWriter.writeMDLMOL(bw,mainPanel.molData());
			return sw.toString();
		}
		catch (IOException e) {}
		
		return null;
	}


	public void componentHidden(ComponentEvent e) {}
	public void componentMoved(ComponentEvent e) {}
	public void componentResized(ComponentEvent e)
	{
	}
	public void componentShown(ComponentEvent e) 
	{
		mainPanel.scaleToFit();
		mainPanel.repaint();
	}
}

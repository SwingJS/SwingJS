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
import java.util.regex.*;
import java.awt.image.*;
import javax.swing.*;

/*
	Repository of information used to influence how a molecule is rendered.
*/

public class RenderPolicy
{
	public String name; // policies get to have names...
	public double fontSize,lineSize,bondSep; // in Angstroms
	public double pointScale; // points per angstrom, mainly used for sizing when exporting graphics
	public double defaultPadding; // minimum space around each atom, in Angstroms, when sizing into a constrained area
	public Color foreground; // colour for bonds and general decorations
	public Color[] atomCols; // 0=colour for non-atoms; 1=for hydrogen, 2=helium, etc.; see Molecule.ELEMENTS
	
	public RenderPolicy()
	{
		fontSize=0.6;
		lineSize=0.075;
		bondSep=0.2;
		pointScale=DrawMolecule.DEFSCALE;
		defaultPadding=0.2;
		foreground=Color.BLACK;
		atomCols=new Color[Molecule.ELEMENTS.length];
		for (int n=0;n<atomCols.length;n++) atomCols[n]=Color.BLACK;
	}
	
	public RenderPolicy clone()
	{
		RenderPolicy p=new RenderPolicy();
		p.name=name;
		p.fontSize=fontSize;
		p.lineSize=lineSize;
		p.bondSep=bondSep;
		p.pointScale=pointScale;
		p.defaultPadding=defaultPadding;
		p.foreground=foreground;
		p.atomCols=new Color[atomCols.length];
		for (int n=0;n<atomCols.length;n++) p.atomCols[n]=atomCols[n];
		return p;
	}
}
/*
	Sketch Elements: Chemistry molecular diagram drawing tool.
	
	(c) 2005-2013 Dr. Alex M. Clark, all rights reserved
	
	Released as GNUware, under the Gnu Public License (GPL)
	
	See www.gnu.org for details.
*/

package org.sketchel;

import java.awt.Color;
import java.io.BufferedReader;
import java.io.BufferedWriter;
import java.io.File;
import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStreamReader;
import java.io.OutputStreamWriter;
import java.util.ArrayList;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

/* 
	Configuration data container: holds the user's personal config info, which can be used to customise various
	functionality. Provides suitable defaults, and a mechanism for storing the information in a configuration file.
	
	The file format is:
		
	<?xml version="1.0" encoding="UTF-8"?>
	<ConfigData>
		<RenderPolicies count=~>
			<Policy id={1-based}>
				<Name>{name}</Name>
				<FontSize>{size}</FontSize>
				<LineSize>{size}</LineSize}
				<BondSep>{bondsep}</BondSep>
				<PointScale>{pointscale}</PointScale>
				<Foreground>{#RRGGBB}</Foreground>
				<AtomCols>{element1}:{#RRGGBB} {element2}:{#RRGGBB} ...</AtomCols> [non-specified elements default to black]
			</Policy>
			...
		</RenderPolicies>
	</ConfigData>
*/

public class ConfigData
{
	private static Object mutex=""; // general lock for file reading/writing

	private String filename;
	private long lastMod=0,lastSize=0;
	
	ArrayList<RenderPolicy> policies=new ArrayList<RenderPolicy>();

	// creates a new instance 
	public ConfigData()
	{
		filename=null;
	}

	// creates a new instance with the given filename, which will have the user's home directory prepended to it 
	public ConfigData(String fn)
	{
		filename=fn;
		if (!new File(filename).isAbsolute())
		{
			filename=System.getProperty("user.home")+"/"+filename;
		}
	}
	
	// duplicates the data in the provided instance
	public ConfigData(ConfigData cpy)
	{
		filename=cpy.fullFN();
		lastMod=cpy.lastMod;
		lastSize=cpy.lastSize;
		for (int n=0;n<cpy.numPolicies();n++) policies.add(cpy.getPolicy(n).clone());
	}
	
	public String fullFN() {return filename;}
	public boolean fileExists() {return filename==null ? false : new File(filename).exists();}
	
	// access to data content
	public int numPolicies() {return policies.size();}
	public RenderPolicy getPolicy(int N) {return policies.get(N);}
	public void setPolicy(int N,RenderPolicy p) {policies.set(N,p);}
	public void addPolicy(RenderPolicy p) {policies.add(p);}
	public void deletePolicy(int N) {policies.remove(N);}
	
	// checks to see if the underlying file has changed; if so, then reload it
	public void refresh()
	{
		synchronized (mutex)
		{
			if (!new File(filename).exists()) return;
			try
			{
				File f=new File(filename);
				if (f.lastModified()>lastMod || lastSize!=f.length()) loadFile();
			}
			catch (IOException ex) {} // silent failure
		}
	}
	
	// loads the file, if it exists and can be parsed; if the file is not present, uses the defaults, without complaining;
	// if the file is unparseable, or some other problem, throws an exception; recommended that the caller notify the user,
	// then revert to the defaults
	public void loadFile() throws IOException
	{	
		if (!new File(filename).exists()) {useDefaults(); return;}
		
		TrivialDOM xml=null;
		
		synchronized (mutex)
		{
			FileInputStream istr=new FileInputStream(filename);
			xml=TrivialDOM.readXML(new BufferedReader(new InputStreamReader(istr)));
			istr.close();
			
			File f=new File(filename);
			lastMod=f.lastModified();
			lastSize=f.length();
		}
		
		if (xml.document().nodeName().compareTo("ConfigData")!=0) 
			throw new IOException("Input file is XML, but the root node is not <ConfigData>.");
		
		parseContent(xml);
		
		if (policies.size()==0) throw new IOException("Configuration file has no render policies.");
	}
	
	// extracts the content from the XML DOM; subclasses should extend this
	protected void parseContent(TrivialDOM xml)
	{
		policies.clear();
		
		/* !!
		// run over outer nodes
		TrivialDOM.Node doc=xml.document(),polgrp=null;
		for (int n=0;n<doc.numChildren();n++) if (doc.childType(n)==TrivialDOM.TYPE_NODE)
		{
			TrivialDOM.Node node=doc.getChildNode(n);
			if (node.nodeName().equals("RenderPolicies")) polgrp=node;
		}
		
		if (polgrp!=null) for (int n=0;n<polgrp.numChildren();n++) if (polgrp.childType(n)==TrivialDOM.TYPE_NODE)*/
		
		TrivialDOM.Node polgrp=xml.document().findChildNode("RenderPolicies");
		for (int n=0;n<(polgrp==null ? 0 : polgrp.numChildren());n++) if (polgrp.childType(n)==TrivialDOM.TYPE_NODE)
		{
			TrivialDOM.Node grp=polgrp.getChildNode(n);
			if (!grp.nodeName().equals("Policy")) continue;
			
			RenderPolicy p=new RenderPolicy();
			p.name="?";
			p.fontSize=0.6;
			p.lineSize=0.075;
			p.bondSep=0.20;
			p.pointScale=DrawMolecule.DEFSCALE;
			p.foreground=Color.BLACK;
			p.atomCols=new Color[Molecule.ELEMENTS.length];
			for (int i=0;i<p.atomCols.length;i++) p.atomCols[i]=Color.BLACK;
			for (int i=0;i<grp.numChildren();i++) if (grp.childType(i)==TrivialDOM.TYPE_NODE)
			{
				TrivialDOM.Node node=grp.getChildNode(i);
				String name=node.nodeName(),text=node.getText();
				
				if (name.equals("Name")) p.name=text;
				else if (name.equals("FontSize")) p.fontSize=Util.safeDouble(text);
				else if (name.equals("LineSize")) p.lineSize=Util.safeDouble(text);
				else if (name.equals("BondSep")) p.bondSep=Util.safeDouble(text);
				else if (name.equals("PointScale")) p.pointScale=Util.safeDouble(text);
				else if (name.equals("Foreground"))
				{
					if (text.length()>=7 && text.charAt(0)=='#')
					p.foreground=new Color(Integer.valueOf(text.substring(1),16).intValue());
				}
				else if (name.equals("AtomCols")) parseAtomColourString(p.foreground,p.atomCols,text);
			}
			policies.add(p);
		}
	}
	
	// convert into XML and write to the file; barf only if something goes seriously wrong
	public void saveFile() throws IOException
	{
		TrivialDOM xml=new TrivialDOM("ConfigData");
		produceContent(xml);
		
		File f=new File(filename).getAbsoluteFile().getParentFile();
		if (f!=null)
		{
			if (f.isFile()) throw new IOException("Part of config prefix, "+filename+", is a file: "+f.getAbsolutePath());
			try 
			{
				if (!f.isDirectory()) if (!f.mkdirs())
				{
					// ACTUALLY: on some weird network filesystems, the parent directory may seem like a file; not sure why,
					// but anyway, it's better to let the process fail later on, when it tries to write the file
					//throw new IOException("Unable to construct directory structure for "+f.getAbsolutePath());
				}
			}
			catch (SecurityException ex) {throw new IOException(ex);}
		}
		
		synchronized (mutex)
		{
			FileOutputStream ostr=new FileOutputStream(filename);
			TrivialDOM.writeXML(new BufferedWriter(new OutputStreamWriter(ostr)),xml);
			ostr.close();
		}
	}
	
	// fills up the XML DOM with config info; subclasses should extend this
	protected void produceContent(TrivialDOM xml)
	{
		TrivialDOM.Node polgrp=xml.document().appendNode("RenderPolicies");
		// !! polgrp.setAttribute("count",String.valueOf(policies.size()));
		for (int n=0;n<policies.size();n++)
		{
			RenderPolicy p=policies.get(n);
			TrivialDOM.Node xpol=polgrp.appendNode("Policy");
			// !! xpol.setAttribute("id",String.valueOf(n+1));
			xpol.appendNode("Name").setText(p.name,false);
			xpol.appendNode("FontSize").setText(String.valueOf(p.fontSize),false);
			xpol.appendNode("LineSize").setText(String.valueOf(p.lineSize),false);
			xpol.appendNode("BondSep").setText(String.valueOf(p.bondSep),false);
			xpol.appendNode("PointScale").setText(String.valueOf(p.pointScale),false);
			xpol.appendNode("Foreground").setText(Util.colourHTML(p.foreground.getRGB()&0xFFFFFF),false);
			StringBuffer colstr=new StringBuffer();
			for (int i=0;i<p.atomCols.length;i++) if (p.atomCols[i].getRGB()!=p.foreground.getRGB())
				//if (p.atomCols[i].getRed()!=0 || p.atomCols[i].getGreen()!=0 || p.atomCols[i].getBlue()!=0)
			{
				if (colstr.length()>0) colstr.append(" ");
				colstr.append((i==0 ? "X" : Molecule.ELEMENTS[i])+"="+Util.colourHTML(p.atomCols[i].getRGB()&0xFFFFFF));
			}
			xpol.appendNode("AtomCols").setText(colstr.toString(),false);
		}
	}
	
	// produce useful defaults which are appropriate for most use of SketchEl
	public void useDefaults()
	{
		policies.clear();
		
		RenderPolicy p=new RenderPolicy();
		p.name="Black'N'White";
		// (the rest of the properties are set to defaults via the constructor)
		policies.add(p);
		
		RenderPolicy p1=p.clone();
		p1.name="OrganicColours";
		p1.atomCols[0]=new Color(64,64,64); // X
		p1.atomCols[1]=new Color(128,128,128); // H
		p1.atomCols[6]=new Color(0,0,0); // C
		p1.atomCols[7]=new Color(0,0,255); // N
		p1.atomCols[8]=new Color(255,0,0); // O
		p1.atomCols[9]=new Color(255,128,128); // F
		p1.atomCols[15]=new Color(255,128,0); // P
		p1.atomCols[16]=new Color(128,128,0); // S
		p1.atomCols[17]=new Color(0,192,0); // Cl
		p1.atomCols[35]=new Color(192,64,0); // Br
		policies.add(p1);
		
		RenderPolicy p2=p.clone();
		p2.name="PublicationMetrics";
		p2.pointScale=7;
		p2.fontSize=0.8;
		policies.add(p2);
	}
	
	// function for converting a somewhat free-text version of atom colour strings into an array of colours
	public static void parseAtomColourString(Color foreground,Color[] atomCols,String text)
	{
		for (int n=0;n<atomCols.length;n++) atomCols[n]=foreground;
		
		String[] blk=text.split(" ");
		Pattern assn=Pattern.compile("^([A-Z][a-z]?)=\\#([0-9a-fA-F]{6})$");
		
		for (int n=0;n<blk.length;n++)
		{
			Matcher m=assn.matcher(blk[n]);
			if (!m.find()) continue;
			String sym=m.group(1),col=m.group(2);
			int idx=-1;
			if (sym.equals("X")) idx=0;
			else for (int i=1;i<Molecule.ELEMENTS.length;i++)
			{
				if (Molecule.ELEMENTS[i].equals(sym)) {idx=i; break;}
			}
			if (idx<0 || idx>=atomCols.length) continue;
			atomCols[idx]=new Color(Integer.valueOf(col,16).intValue());
		}
	}
}



/*
	Sketch Elements: Chemistry molecular diagram drawing tool.
	
	(c) 2005-2013 Dr. Alex M. Clark, all rights reserved
	
	Released as GNUware, under the Gnu Public License (GPL)
	
	See www.gnu.org for details.
*/

package org.sketchel;

import java.util.*;
import java.util.regex.*;
import java.util.zip.*;
import java.io.*;
import java.text.*;
import java.lang.*;
import java.nio.channels.*;
import javax.xml.parsers.*;
import org.xml.sax.*;
import org.xml.sax.helpers.*;

/*
	Handles reading of molecules from streams. The "native" format is SketchEl, which is a structured text format. Most (but not
	all) of the commonly used fields are analogous to the MDL MOL format, which can also be read. There is a composite version
	of these formats called "Unknown", which is a MDL MOL file followed by a SketchEl file. This is a trick way of making the
	industry standard format available, if needed, but not losing data, since the second one will be read preferentially.
	
	Methods are also provided for digging embedded data out of other formats, such as SVG and ODG vector graphics. And importing
	from other less ubiquitous non-native formats.
	
	All methods are static, and provide convenient input from different stream types. See FileTypeGuess for figuring out which
	format a file is, and the DataSheet I/O classes for tabular molecule data.
	
	The methods always return an instantiated molecule, or throw an exception. Whenever possible to distinguish, an IOException
	is thrown when there is something wrong with the underlying stream, or the subspeciated MoleculeIOException when the bytes
	are available but not compliant with the corresponding format.

	The MDL MOL reader supports the M__CHG, M__ZCH and M__ZBO extensions, as described in:

		  "Accurate Specification of Molecular Structures: The Case for Zero-Order Bonds and Explicit Hydrogen Counting"
		  Alex M. Clark, Journal of Chemical Information and Modeling, vol. 51, pp. 3149-3157 (2011)
		  http://pubs.acs.org/doi/abs/10.1021/ci200488k
*/

public class MoleculeReader
{
	// ----------------- reading native OR mdl mol -----------------

	// special implementation of the reader for when the format is not known a-priori, or might be a combination-of-two formats
	// as used by the clipboard; do some extra work to try to pull out the SketchEl file preferentially
	
	public static Molecule readUnknown(InputStream istr) throws IOException 
	{
		return readUnknown(new BufferedReader(new InputStreamReader(istr)));
	}
	public static Molecule readUnknown(File file) throws IOException
	{
		FileReader rdr=null;
		try {return readUnknown(new BufferedReader(rdr=new FileReader(file)));}
		finally {if (rdr!=null) rdr.close();}
	}
	public static Molecule readUnknown(BufferedReader in) throws IOException
	{
		Molecule mdlmol=null,elmol=null;
		final int BUFFMAX=100000;
		in.mark(BUFFMAX);
		
		// first of all, see if the input stream is either MDL or SketchEl, or the two of them catenated together... read both 
		// if possible, and favour the latter
		try
		{
			mdlmol=readMDLMOL(in);
			if (mdlmol!=null) in.mark(BUFFMAX); // so the SketchEl version could follow
		}
		catch (IOException e) 
		{
			mdlmol=null;
			in.reset();
		}
		
		try
		{
			elmol=readNative(in);
		}
		catch (IOException e) {elmol=null;}
		
		if (elmol!=null) return elmol;
		if (mdlmol!=null) return mdlmol;
		
		/* !!
		// 'twas neither of the above, so try a long shot: see if it is an SVG file with embedded content
		in.reset();
		Molecule svgmol=readSVG(in);
		if (svgmol!=null) return svgmol;*/
		
		throw new MoleculeIOException("Unknown or invalid format.");
	}

	// ----------------- reading native -----------------

	// reads a molecule encoded in the native SketchEl format
	
	public static Molecule readNative(InputStream istr) throws IOException 
	{
		return readNative(new BufferedReader(new InputStreamReader(istr)));
	}
	public static Molecule readNative(File file) throws IOException
	{
		FileReader rdr=null;
		try {return readNative(new BufferedReader(rdr=new FileReader(file)));}
		finally {if (rdr!=null) rdr.close();}
	}
	public static Molecule readNative(BufferedReader in) throws IOException
	{
		Molecule mol=new Molecule();
		mol.setKeepTransient(true);
		final String GENERIC_ERROR="Invalid SketchEl file.";
		
		try
		{
			String line=in.readLine();
			if (line==null || !line.startsWith("SketchEl!")) throw new MoleculeIOException("Not a SketchEl file.");
			int p1=line.indexOf('('),p2=line.indexOf(','),p3=line.indexOf(')');
			if (p1==0 || p2==0 || p3==0) throw new MoleculeIOException(GENERIC_ERROR);
		
			ArrayList<String> extra=new ArrayList<String>(),trans=new ArrayList<String>();
		
			int numAtoms=Integer.parseInt(line.substring(p1+1,p2).trim());
			int numBonds=Integer.parseInt(line.substring(p2+1,p3).trim());
			for (int n=0;n<numAtoms;n++) 
			{
				line=in.readLine();
				String[] bits=line.split("[\\=\\,\\;]");
				if (bits.length<5) throw new MoleculeIOException(GENERIC_ERROR);
				int num=mol.addAtom(unescape(bits[0]),Double.parseDouble(bits[1].trim()),Double.parseDouble(bits[2].trim()),
									Integer.parseInt(bits[3].trim()),Integer.parseInt(bits[4].trim()));
				extra.clear(); trans.clear();
				for (int i=5;i<bits.length;i++) if (bits[i].length()>0)
				{
					if (bits[i].charAt(0)=='i') {} // ignore
					else if (bits[i].charAt(0)=='e') mol.setAtomHExplicit(num,Integer.parseInt(bits[i].substring(1)));
					else if (bits[i].charAt(0)=='m') mol.setAtomIsotope(num,Integer.parseInt(bits[i].substring(1)));
					else if (bits[i].charAt(0)=='n') mol.setAtomMapNum(num,Integer.parseInt(bits[i].substring(1)));
					else if (bits[i].charAt(0)=='x') extra.add(unescape(bits[i]));
					else if (bits[i].charAt(0)=='y') trans.add(unescape(bits[i]));
					else extra.add(unescape(bits[i])); // preserve unrecognised
				}
				if (extra.size()>0) mol.setAtomExtra(num,extra.toArray(new String[extra.size()]));
				if (trans.size()>0) mol.setAtomTransient(num,trans.toArray(new String[trans.size()]));
			}
			for (int n=0;n<numBonds;n++)
			{
				line=in.readLine();
				String[] bits=line.split("[\\=\\,]");
				if (bits.length<3) throw new MoleculeIOException(GENERIC_ERROR);
				String[] frto=bits[0].split("-");
				if (frto.length!=2) throw new MoleculeIOException(GENERIC_ERROR);
				int num=mol.addBond(Integer.parseInt(frto[0].trim()),Integer.parseInt(frto[1].trim()),
									Integer.parseInt(bits[1].trim()),Integer.parseInt(bits[2].trim()));
				extra.clear(); trans.clear();
				for (int i=3;i<bits.length;i++) if (bits[i].length()>0)
				{
					if (bits[i].charAt(0)=='x') extra.add(unescape(bits[i]));
					else if (bits[i].charAt(0)=='y') trans.add(unescape(bits[i]));
					else extra.add(unescape(bits[i])); // preserve unrecognised
				}
				if (extra.size()>0) mol.setBondExtra(num,extra.toArray(new String[extra.size()]));
				if (trans.size()>0) mol.setBondTransient(num,trans.toArray(new String[trans.size()]));
			}
			line=in.readLine();
			if (line.compareTo("!End")!=0) throw new MoleculeIOException(GENERIC_ERROR);
		}
		catch (NumberFormatException ex) {throw new MoleculeIOException("Malformed molecule representation",ex);}
		catch (IOException ex) {throw ex;}

		mol.setKeepTransient(false);
		return mol;
	}
	
	// converts an escaped string back to its original form
	public static String unescape(String str)
	{
		if (str.indexOf('\\')<0) return str; // no need
		StringBuffer buff=new StringBuffer();
		for (int n=0;n<str.length();n++)
		{
			char ch=str.charAt(n);
			if (ch=='\\' && n<=str.length()-5)
			{
				try 
				{
					ch=(char)Integer.parseInt(str.substring(n+1,n+5),16);
					buff.append(ch);
				}
				catch (NumberFormatException ex) {} // too bad
				n+=4;
			}
			else buff.append(ch);
		}
		return buff.toString();
	}	 
	
	// ----------------- reading MDL MOL -----------------
	
	// parses and returns a molecule from the MDL MOL-file format, if possible
	
	public static Molecule readMDLMOL(File file) throws IOException
	{
		FileReader rdr=null;
		try {return readMDLMOL(new BufferedReader(rdr=new FileReader(file)));}
		finally {if (rdr!=null) rdr.close();}
	}
	public static Molecule readMDLMOL(BufferedReader in) throws IOException
	{
		Molecule mol=new Molecule();
		final String GENERIC_ERROR="Invalid MDL MOL file.";

		try
		{
			String line=null;
			for (int n=0;n<4;n++) line=in.readLine();
			if (line.length()<39 || !line.substring(34,39).equals("V2000")) throw new MoleculeIOException(GENERIC_ERROR);
			int numAtoms=Integer.parseInt(line.substring(0,3).trim());
			int numBonds=Integer.parseInt(line.substring(3,6).trim());

			for (int n=0;n<numAtoms;n++)
			{
				line=in.readLine();
				if (line==null) throw new IOException("Unexpected end of file, in atom block");

				double x=Double.parseDouble(line.substring(0,10).trim());
				double y=Double.parseDouble(line.substring(10,20).trim());
				String el=line.substring(31,34).trim();
				int chg=Integer.parseInt(line.substring(36,39).trim()),rad=0;
				int mapnum=line.length()<63 ? 0 : Integer.parseInt(line.substring(60,63).trim());

				if (chg>=1 && chg<=3) chg=4-chg;
				else if (chg==4) {chg=0; rad=2;}
				else if (chg>=5 && chg<=7) chg=4-chg;
				else chg=0;

				mol.addAtom(el,x,y,chg,rad);
				mol.setAtomMapNum(mol.numAtoms(),mapnum);
			}
			for (int n=0;n<numBonds;n++)
			{
				line=in.readLine();
				if (line==null) throw new IOException("Unexpected end of file, in bond block");

				int from=Integer.parseInt(line.substring(0,3).trim()),to=Integer.parseInt(line.substring(3,6).trim());
				int type=Integer.parseInt(line.substring(6,9).trim()),stereo=Integer.parseInt(line.substring(9,12).trim());

				if (from==to || from<1 || from>numAtoms || to<1 || to>numAtoms) throw new MoleculeIOException(GENERIC_ERROR);

				int order=type>=1 && type<=3 ? type : 1;
				int style=Molecule.BONDTYPE_NORMAL;
				if (stereo==1) style=Molecule.BONDTYPE_INCLINED;
				else if (stereo==6) style=Molecule.BONDTYPE_DECLINED;
				// !! supposed to be for double bonds... else if (stereo==3 || stereo==4) style=Molecule.BONDTYPE_UNKNOWN;

				mol.addBond(from,to,order,style);
			}
			while (true)
			{
				line=in.readLine();
				if (line==null) break;
				if (line.startsWith("M  END")) break;

				final int MBLK_CHG=1,MBLK_RAD=2,MBLK_ISO=3,MBLK_RGP=4,MBLK_HYD=5,MBLK_ZCH=6,MBLK_ZBO=7;
				int type=0;
				if (line.startsWith("M  CHG")) type=MBLK_CHG;
				else if (line.startsWith("M  RAD")) type=MBLK_RAD;
				else if (line.startsWith("M  ISO")) type=MBLK_ISO;
				else if (line.startsWith("M  RGP")) type=MBLK_RGP;
				else if (line.startsWith("M  HYD")) type=MBLK_HYD;
				else if (line.startsWith("M  ZCH")) type=MBLK_ZCH;
				else if (line.startsWith("M  ZBO")) type=MBLK_ZBO;
				else if (line.startsWith("A  "))
				{
					int apos=Integer.parseInt(line.substring(3,6).trim());
					if (apos>=1 && apos<=mol.numAtoms())
					{
						line=in.readLine();
						if (line==null) break;
						if (line.length()>0) mol.setAtomElement(apos,line);
					}
				}

				if (type>0)
				{
					int len=Integer.parseInt(line.substring(6,9).trim());
					for (int n=0;n<len;n++)
					{
						int pos=Integer.parseInt(line.substring(9+8*n,13+8*n).trim());
						int val=Integer.parseInt(line.substring(13+8*n,17+8*n).trim());
						if (pos<1) continue;

            			if (type==MBLK_CHG) mol.setAtomCharge(pos,val);
            			else if (type==MBLK_RAD) mol.setAtomUnpaired(pos,val);
            			else if (type==MBLK_ISO) mol.setAtomIsotope(pos,val);
            			else if (type==MBLK_RGP) mol.setAtomElement(pos,"R"+val);
            			else if (type==MBLK_HYD) mol.setAtomHExplicit(pos,val);
            			else if (type==MBLK_ZCH) mol.setAtomCharge(pos,val);
            			else if (type==MBLK_ZBO) mol.setBondOrder(pos,val);
					}
				}
			}
		}
		catch (IOException ex) {throw ex;}
		catch (Exception e) {throw new IOException(GENERIC_ERROR,e);}

		return mol;
	}
	
	// ----------------- reading CML -----------------	  
	
	// translates as much as possible of the CML molecule format
	
	public static Molecule readCML(InputStream istr) throws IOException
	{
		return readCML(new BufferedReader(new InputStreamReader(istr)));
	}
	public static Molecule readCML(File file) throws IOException
	{
		FileReader rdr=null;
		try {return readCML(new BufferedReader(rdr=new FileReader(file)));}
		finally {if (rdr!=null) rdr.close();}
	}
	public static Molecule readCML(BufferedReader in) throws IOException
	{
		TrivialDOM dom=TrivialDOM.readXML(in);
		final String GENERIC_ERROR="Invalid CML XML file.";
		
		TrivialDOM.Node node=dom.document(),molecule=null;
		while (node!=null)
		{
			if (node.nodeName().equals("molecule")) {molecule=node; break;}
			boolean hit=false;
			for (int n=0;n<node.numChildren();n++) if (node.childType(n)==TrivialDOM.TYPE_NODE)
				{node=node.getChildNode(n); hit=true; break;}
			if (!hit) break;
		}
		if (molecule==null) throw new MoleculeIOException("Required node <molecule> not found.");
		
		TrivialDOM.Node atoms=null,bonds=null;
		for (int n=0;n<molecule.numChildren();n++) if (node.childType(n)==TrivialDOM.TYPE_NODE)
		{
			TrivialDOM.Node sub=molecule.getChildNode(n);
			if (sub.nodeName().equals("atomArray")) atoms=sub;
			if (sub.nodeName().equals("bondArray")) bonds=sub;
			if (atoms!=null && bonds!=null) break;
		}
		if (atoms==null) throw new MoleculeIOException("Required node <atomArray> not found.");
		if (bonds==null) throw new MoleculeIOException("Required node <bondArray> not found.");
		
		Molecule mol=new Molecule();
		
		// parse the atoms
		ArrayList<String> atomID=new ArrayList<String>();
		ArrayList<Integer> explicitH=new ArrayList<Integer>();
		for (int n=0;n<atoms.numChildren();n++) if (atoms.childType(n)==TrivialDOM.TYPE_NODE)
		{
			node=atoms.getChildNode(n);
			if (!node.nodeName().equals("atom")) continue;
			
			String id=node.attribute("id");
			if (id==null || id.length()==0) throw new MoleculeIOException("Encountered <atom> node with no @id.");
			String el=node.attribute("elementType");
			if (el==null || el.length()==0) throw new MoleculeIOException("Encountered <atom> node with no @elementType.");
			
			String x=node.attribute("x2"),y=node.attribute("y2");
			if (x==null) x=node.attribute("x3");
			if (y==null) x=node.attribute("y3");

			String charge=node.attribute("formalCharge");

			String radical=node.attribute("radical"),spin=node.attribute("spinMultiplicity");
			int unpaired=radical!=null ? Util.safeInt(radical) : spin!=null ? Util.safeInt(spin,1)-1 : 0;

			int anum=mol.addAtom(el,Util.safeDouble(x),Util.safeDouble(y),Util.safeInt(charge),unpaired);

			atomID.add(id);

			String isotope=node.attribute("isotope");
			mol.setAtomIsotope(anum,Util.safeInt(isotope,Molecule.ISOTOPE_NATURAL));

			TrivialDOM.Node[] sub=node.listChildNodes();
			if (sub!=null) for (int i=0;i<sub.length;i++)
			{
				if (sub[i].nodeName().equals("extraField"))
				{
					String v=sub[i].getText();
					if (v.length()==0) {}
					else if (v.charAt(0)=='y')
					{
						String[] trans=mol.atomTransient(anum),newtrans=new String[trans==null ? 1 : trans.length+1];
						for (int j=trans==null ? -1 : trans.length-1;j>=0;j--) newtrans[j]=trans[j];
						newtrans[newtrans.length-1]=v;
						mol.setAtomTransient(anum,newtrans);
					}
					else
					{
						String[] extra=mol.atomExtra(anum),newextra=new String[extra==null ? 1 : extra.length+1];
						for (int j=extra==null ? -1 : extra.length-1;j>=0;j--) newextra[j]=extra[j];
						newextra[newextra.length-1]=v;
						mol.setAtomExtra(anum,newextra);
					}
				}
			}
			
			String hcount=node.attribute("hydrogenCount"),believe=node.attribute("believeHCount");
			if (believe!=null && believe.equalsIgnoreCase("true")) 
			{
				mol.setAtomHExplicit(anum,Util.safeInt(hcount));
				explicitH.add(-1);
			}
			else explicitH.add(Util.safeInt(hcount,-1)); // decide whether to believe it later on
		}
		
		// parse the bonds
		for (int n=0;n<bonds.numChildren();n++) if (bonds.childType(n)==TrivialDOM.TYPE_NODE)
		{
			node=bonds.getChildNode(n);
			if (!node.nodeName().equals("bond")) continue;
			
			String aref=node.attribute("atomRefs2");
			if (aref==null || aref.length()==0) throw new MoleculeIOException("Encountered <bond> node with no @atomRefs2.");
			String[] bits=aref.split(" ");
			if (bits.length!=2) throw new MoleculeIOException("Encountered <bond> node with malformed @atomRefs2.");
			int a1=0,a2=0;
			for (int i=0;i<atomID.size();i++) 
			{
				if (bits[0].equals(atomID.get(i))) a1=i+1;
				if (bits[1].equals(atomID.get(i))) a2=i+1;
			}
			if (a1==0 || a2==0) throw new MoleculeIOException("Encountered <bond> with invalid @atomRefs2 links.");

			String odef=node.attribute("order");
			int order=Util.safeInt(odef,1);
			if (odef==null) {}
			else if (odef.equals("S")) order=1;
			else if (odef.equals("D")) order=2;
			else if (odef.equals("T")) order=3;
			
			int bnum=mol.addBond(a1,a2,order,Molecule.BONDTYPE_NORMAL);
			
			TrivialDOM.Node[] sub=node.listChildNodes();
			if (sub!=null) for (int i=0;i<sub.length;i++)
			{
				if (sub[i].nodeName().equals("bondStereo"))
				{
					String cnv=sub[i].attribute("convention"),val=sub[i].attribute("conventionValue");
					if (cnv!=null && cnv.equals("MDL") && val!=null)
					{
						if (Util.safeInt(val)==1) mol.setBondType(bnum,Molecule.BONDTYPE_INCLINED);
						else if (Util.safeInt(val)==6) mol.setBondType(bnum,Molecule.BONDTYPE_DECLINED);
						else if (Util.safeInt(val)==4) mol.setBondType(bnum,Molecule.BONDTYPE_UNKNOWN);
					}
					String dict=sub[i].attribute("dictRef");
					if (dict!=null)
					{
						if (dict.equals("cml:W")) mol.setBondType(bnum,Molecule.BONDTYPE_INCLINED);
						if (dict.equals("cml:H")) mol.setBondType(bnum,Molecule.BONDTYPE_DECLINED);
					}
				}
				else if (sub[i].nodeName().equals("extraField"))
				{
					String v=sub[i].getText();
					if (v.length()==0) {}
					else if (v.charAt(0)=='y')
					{
						String[] trans=mol.bondTransient(bnum),newtrans=new String[trans==null ? 1 : trans.length+1];
						for (int j=trans==null ? -1 : trans.length-1;j>=0;j--) newtrans[j]=trans[j];
						newtrans[newtrans.length-1]=v;
						mol.setBondTransient(bnum,newtrans);
					}
					else
					{
						String[] extra=mol.bondExtra(bnum),newextra=new String[extra==null ? 1 : extra.length+1];
						for (int j=extra==null ? -1 : extra.length-1;j>=0;j--) newextra[j]=extra[j];
						newextra[newextra.length-1]=v;
						mol.setBondExtra(bnum,newextra);
					}
				}
			}
			
		}
		
		// reconcile stashed hydrogen-counts
		for (int n=1;n<=mol.numAtoms();n++)
		{
			int hcount=explicitH.get(n-1);
			if (hcount<0) continue;
			if (hcount!=mol.atomHydrogens(n)) mol.setAtomHExplicit(n,hcount);
		}
		 
		// scale the average bond length, if totally insane
		ToolChest.normaliseBondLengths(mol,CanvasMolecule.IDEALBOND-0.5,CanvasMolecule.IDEALBOND+0.5);
		
		return mol;
	}
	
	// ----------------- reading SVG/embedded -----------------
	
	// digs through a stream which is believed could be an SVG file which has a SketchEl molecule buried in the metadata
	
	public static Molecule readSVG(InputStream istr) throws IOException
	{
		return readSVG(new BufferedReader(new InputStreamReader(istr)));
	}
	public static Molecule readSVG(File file) throws IOException
	{
		FileReader rdr=null;
		try {return readSVG(new BufferedReader(rdr=new FileReader(file)));}
		finally {if (rdr!=null) rdr.close();}
	}
	public static Molecule readSVG(BufferedReader in) throws IOException
	{
		SAXParserFactory factory=null;
		SAXParser sax=null;

		try
		{
			factory=SAXParserFactory.newInstance();
			sax=factory.newSAXParser();
		}
		catch (Exception ex) {throw new IOException(ex);} // consolidate
	
		SVGHandler handler=new SVGHandler();
		try {sax.parse(new InputSource(in),handler);}
		catch (SAXException ex) {}
		if (handler.moldata!=null)
		{
			return readNative(new BufferedReader(new StringReader(handler.moldata)));
		}
		throw new MoleculeIOException("SVG file does not contain embedded sketch.");
	}
	
	// ----------------- reading ODG/embedded -----------------

	public static Molecule readODG(File file) throws IOException
	{
		FileReader istr=null;
		try {return readODG(new FileInputStream(file));}
		finally {if (istr!=null) istr.close();}
	}
	public static Molecule readODG(InputStream istr) throws IOException
	{
		ZipInputStream zip=new ZipInputStream(istr);
		
		while (true)
		{
			ZipEntry ent=zip.getNextEntry();
			if (ent==null) break;
			if (ent.getName().equals("structure/molecule.el") && !ent.isDirectory())
			{
				StringBuffer buff=new StringBuffer();
				for (int ch=zip.read();ch!=-1;ch=zip.read()) buff.append((char)ch);
				return readNative(new BufferedReader(new StringReader(buff.toString())));
			}
			zip.closeEntry();
		}
		
		throw new MoleculeIOException("ODG file does not contain embedded sketch.");
	}
}

/*
	Used internally for scouring SVG files looking for the good stuff.
*/

class SVGHandler extends DefaultHandler
{
	public String moldata=null;

	private int level=0;
	private String primary=null;
	private boolean moneyshot=false;

	// NOTE: the <metadata> section must be the first or second element, and may only be preceded by <defs>; otherwise
	// will stop reading and assume that there is no molecule

	public void startElement(String uri,String localName,String qName,Attributes attributes) throws SAXException 
	{
		level++;
		
		if (level==1)
		{
			if (!qName.equals("svg")) throw new SAXException("BAD");
		}
		else if (level==2) 
		{
			if (!qName.equals("defs") && !qName.equals("metadata")) throw new SAXException("BAD");
			primary=qName;
		}
		else if (level==3)
		{
			if (primary.equals("metadata") && (qName.equals("molecule.el") || qName.equals("sketchel:molecule.el"))) moneyshot=true;
		}
	}
	
	public void endElement(String uri,String localName,String qName) throws SAXException 
	{
		if (level==2 && qName.equals("metadata")) throw new SAXException("BAD");
		level--;
	}

	public void characters(char[] ch,int pos,int len) throws SAXException 
	{
		if (!moneyshot) return;
		moldata=new String(ch,pos,len);
		throw new SAXException("OK");
	}

	public InputSource resolveEntity(String publicId,String systemId)
	{
		return new InputSource(new StringReader("")); // get lost... (null means go look it up - that would be awful)
	}
}


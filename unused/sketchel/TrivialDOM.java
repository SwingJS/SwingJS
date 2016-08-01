/*
	Sketch Elements: Chemistry molecular diagram drawing tool.
	
	(c) 2005-2013 Dr. Alex M. Clark, all rights reserved
	
	Released as GNUware, under the Gnu Public License (GPL)
	
	See www.gnu.org for details.
*/

package org.sketchel;

import org.sketchel.*;

import java.io.*;
import java.util.*;
import java.util.regex.*;

/*
	An incredibly lightweight implementation of DOM-style access to XML content. Only a subset of XML files are supported, that 
	being simple combinations of elements, attributes and text. Overly sophisticated input files may break the reader. Also, some
	of the pedantic XML treatment of whitespace is simplified (which suits the rest of this application nicely). Malformed XML
	should generate vaguely helpful explanations, by and large.
	
	This class is intended to be used with XML documents which describe hierarchical data, rather than text with XML markup.
	Manipulation of the underlying content liberally rearranges whitespace to emphasise human-readability of the hierarchichy,
	as well as removing unnecessary whitespace text nodes which get in the way of programmatically traversing the document.
*/

public class TrivialDOM
{
	public static final int TYPE_NODE=1;
	public static final int TYPE_TEXT=2;
	
	public static class Node
	{
		private Node parentNode=null;
		private String nodeName;
		private Hashtable<String,String> nodeAttr;
		private ArrayList<Object> children;
		
		public Node(String NodeName)
		{
			nodeName=NodeName;
			nodeAttr=new Hashtable<String,String>();
			children=new ArrayList<Object>();
		}
		
		// makes a superficial copy of the node, i.e. the returned node has the same name and attributes, but no children
		public Node clone()
		{
			Node ret=new Node(nodeName);
			Set<String> attr=nodeAttr.keySet();
			String[] names=new String[attr.size()];
			attr.toArray(names);
			for (int n=0;n<names.length;n++) ret.setAttribute(names[n],nodeAttr.get(names[n]));
			return ret;
		}
		
		// makes a deep copy of the node: a new node is created with the same name and attributes, and all of its children are
		// similarly duplicated; changing the new node will not affect the original
		public Node deepClone()
		{
			Node ret=clone();
			for (int n=0;n<children.size();n++)
			{
				Object o=children.get(n);
				if (o instanceof Node) ret.appendChild(((Node)o).deepClone());
				else if (o instanceof Text)
				{
					Text t=(Text)o;
					ret.appendText(t.get(),t.preserve());
				}
			}
			return ret;
		}
		
		public Node parent() {return parentNode;}
		public void setParent(Node Parent) {parentNode=Parent;}
		
		public String nodeName() {return nodeName;}
		public void setNodeName(String Name) {nodeName=Name;}
		public String attribute(String Attr) {return nodeAttr.containsKey(Attr) ? nodeAttr.get(Attr) : null;}
		public void setAttribute(String Attr,String Value) {nodeAttr.put(Attr,Value);}
		public String[] getAttributeNames() 
		{
			Set<String> attr=nodeAttr.keySet();
			String[] names=new String[attr.size()];
			return attr.toArray(names);
		}
		
		public int numChildren() {return children.size();}
		public int childType(int N) 
		{
			Object child=children.get(N);
			if (child instanceof Node) return TYPE_NODE;
			if (child instanceof Text) return TYPE_TEXT;
			return 0;
		}
		public Node getChildNode(int N) {return (Node)children.get(N);}
		public Text getChildText(int N) {return (Text)children.get(N);}
		
		public void clear() {children.clear();}
		public void deleteChild(int N) {children.remove(N);}
		
		public void setText(String Txt,boolean Preserve)
		{
			clear();
			Text txt=new Text(Txt,Preserve);
			txt.setParent(this);
			children.add(txt);
		}
		
		public String getText()
		{
			String txt="";
			for (int n=0;n<numChildren();n++)
			{
				if (childType(n)==TYPE_TEXT) txt+=getChildText(n).get();
				else txt+=getChildNode(n).getText();
			}
			return txt;
		}
		
		public Node appendChild(Node Nod) {Nod.setParent(this); children.add(Nod); return Nod;}
		public Text appendChild(Text Txt) {Txt.setParent(this); children.add(Txt); return Txt;}
		public Node insertChild(int N,Node Nod) {Nod.setParent(this); children.add(N,Nod); return Nod;}
		public Text insertChild(int N,Text Txt) {Txt.setParent(this); children.add(N,Txt); return Txt;}

		public Node appendNode(String Name) 
		{
			Node nod=new Node(Name);
			nod.setParent(this);
			children.add(nod); 
			return nod;
		}
		public Text appendText(String Txt,boolean Preserve) 
		{
			Text txt=new Text(Txt,Preserve); 
			txt.setParent(this);
			children.add(txt); 
			return txt;
		}
		
		// scans the child-list for the first instance of the named node; several variations
		public int findChildIndex(String name) {return findChildIndex(name,0);}
		public int findChildIndex(String name,int startAt)
		{
			for (int n=startAt;n<numChildren();n++)
				if (childType(n)==TYPE_NODE && getChildNode(n).nodeName().equals(name)) return n;
			return -1;
		}
		public Node findChildNode(String name)
		{
			int i=findChildIndex(name);
			if (i>=0) return getChildNode(i);
			return null;
		}
		
		// returns a list of only the node children, or null if there are none
		public Node[] listChildNodes()
		{
			int count=0;
			for (int n=0;n<numChildren();n++) if (childType(n)==TYPE_NODE) count++;
			if (count==0) return null;
			Node[] list=new Node[count];
			for (int n=0,p=0;n<numChildren();n++) if (childType(n)==TYPE_NODE) list[p++]=getChildNode(n);
			return list;
		}
		
		// a convenience function: given a stream of XML source, adds each piece as a child of the current node; e.g.
		//		"ning<nang>nong</nang>"
		// adds two children: one text ("ning") and one non-empty element (<nang>nong</nang>)
		public void appendRawXML(String raw) throws IOException {appendRawXML(raw,true);}
		public void appendRawXML(String raw,boolean trimWS) throws IOException
		{
			TrivialDOM.Node head=TrivialDOM.readString("<z>"+raw+"</z>",trimWS).document();
			for (int n=0;n<head.numChildren();n++)
			{
				if (head.childType(n)==TYPE_NODE) appendChild(head.getChildNode(n));
				else if (head.childType(n)==TYPE_TEXT) appendChild(head.getChildText(n));
			}
		}
		
		// returns a string containing the entire contents of this element, including the tag & attributes
		public String toString() {return new TrivialDOM(this).toString(true);}
		public String toString(boolean prettyPrint) {return new TrivialDOM(this).toString(prettyPrint);}
	
		// returns an XML string containing all of the child nodes, but not the enclosing element wrapper; note that this
		// is never pretty-printed
		public String getRawXML()
		{
			StringBuffer buff=new StringBuffer();
			for (int n=0;n<numChildren();n++)
			{
				if (childType(n)==TYPE_NODE) buff.append(new TrivialDOM(getChildNode(n)).toString(false));
				else if (childType(n)==TYPE_TEXT) buff.append(getChildText(n).get());
			}
			return buff.toString();
		}
	}
	
	public static class Text
	{
		private Node parentNode=null;
		private String text;
		private boolean preserve; // if true, is CDATA type; otherwise may be freely trimmed for whitespace
	
		public Text(String Text,boolean Preserve) {text=Text; preserve=Preserve;}

		public Node parent() {return parentNode;}
		public void setParent(Node Parent) {parentNode=Parent;}

		public String get() {return text;}
		public void set(String Txt) {text=Txt;}
		public boolean preserve() {return preserve;}
	}
	
	public Node createNode(String Name) {return new Node(Name);}
	public Text createText(String Text,boolean Preserve) {return new Text(Text,Preserve);}
	
	protected Node doc=null;

	// constructors
	
	public TrivialDOM() {}

	public TrivialDOM(String docName)
	{
		doc=new Node(docName);
	}
	public TrivialDOM(TrivialDOM cpy)
	{
		doc=cpy.document(); // !! CLONE
	}
	public TrivialDOM(Node docNode)
	{
		doc=docNode; // !! CLONE
	}
	
	public Node document() {return doc;}
	public String toString() {return toString(true);}
	public String toString(boolean prettyPrint)
	{
		StringWriter out=new StringWriter();
		try {writeXML(out,this,false,true,prettyPrint);}
		catch (IOException e) {return e.getMessage();}
		return out.toString();
	}

	// parsing input from a prespecified string
	public static TrivialDOM readString(String str) throws IOException {return readString(str,true);}
	public static TrivialDOM readString(String str,boolean trimWS) throws IOException
	{
		return readXML(new BufferedReader(new StringReader(str)),trimWS);
	}

	// parsing input files

	public static TrivialDOM readXML(BufferedReader in) throws IOException {return readXML(in,true);}
	public static TrivialDOM readXML(BufferedReader in,boolean trimWS) throws IOException
	{
		final String EOF="ReadXML: unexpected end of file during parsing";

		// PART 1: read the input file one character at a time, and carve it up into chunks, which are preserved as strings; these
		// include tag start & end, text, CDATA, and comments.
		
		ArrayList<String> chunks=new ArrayList<String>();
		StringBuffer strbuf=new StringBuffer(8192);
		while (true)
		{
			int ich;
			if (strbuf.length()==0)
			{
				ich=in.read();
				if (ich<0) break;
				strbuf.delete(0,strbuf.length());
				strbuf.append((char)ich);
			}
			
			if (strbuf.charAt(0)=='<') // either a tag or a CDATA
			{
				for (int n=0;n<2;n++)
				{
					ich=in.read();
					if (ich<0) throw new TrivialDOMException(EOF);
					strbuf.append((char)ich);
				}
				
				if (strbuf.length()>=3 && strbuf.substring(0,3).equals("<![")) // it's a CDATA
				{
					while (true)
					{
						ich=in.read();
						if (ich<0) throw new TrivialDOMException(EOF);
						strbuf.append((char)ich);
						if (strbuf.length()>=6 && strbuf.substring(strbuf.length()-3,strbuf.length()).equals("]]>")) 
						{
							chunks.add(strbuf.toString());
							strbuf.delete(0,strbuf.length());
							break;
						}
					}
				}
				else if (strbuf.length()>=3 && strbuf.substring(0,3).equals("<!-")) // it's a comment
				{
					while (true)
					{
						ich=in.read();
						if (ich<0) throw new TrivialDOMException(EOF);
						strbuf.append((char)ich);
						if (strbuf.length()>=6 && strbuf.substring(strbuf.length()-3,strbuf.length()).equals("-->")) 
						{
							chunks.add(strbuf.toString());
							strbuf.delete(0,strbuf.length());
							break;
						}
					}
				}
				else if (strbuf.length()==3 && strbuf.charAt(0)=='<' && strbuf.charAt(2)=='>') // very short tag
				{
					chunks.add(strbuf.toString());
					strbuf.delete(0,strbuf.length());
				}
				else // it's an opening tag, which will get closed later
				{
					boolean inquot=false;
					while (true)
					{
						ich=in.read();
						if (ich<0) throw new TrivialDOMException(EOF);
						strbuf.append((char)ich);
						if ((char)ich=='"') inquot=!inquot;
						else if ((char)ich=='>') 
						{
							chunks.add(strbuf.toString());
							strbuf.delete(0,strbuf.length());
							break;
						}
					}
				}
			}
			else // must be plain text
			{
				boolean eof=false;
				while (true)
				{
					ich=in.read();
					if (ich<0) {eof=true; break;}
					if ((char)ich=='<')
					{
						chunks.add(strbuf.toString());
						strbuf.delete(0,strbuf.length());
						strbuf.append((char)ich);
						break;
					}
					strbuf.append((char)ich);
				}
				if (eof)
				{
					if (strbuf.toString().trim().length()==0) break; else throw new TrivialDOMException(EOF);
				}
			}
		}

		// PART 2: analyze the resulting pieces, and build up the node tree

		TrivialDOM xml=new TrivialDOM("unknown");
		Node node=null;
		String str=null;
		for (int n=0;n<chunks.size();n++)
		{
			str=chunks.get(n);
			if ((trimWS || node==null) && str.trim().length()==0) continue; // ignore chunks which are pure whitespace

			if (str.charAt(0)=='<' && str.length()>=2 && ((str.charAt(1)>='A' && str.charAt(1)<='Z') ||
														  (str.charAt(1)>='a' && str.charAt(1)<='z')) && str.endsWith(">"))
			{
				str=str.substring(1,str.length()-1);
				boolean isclosed=str.endsWith("/");
				if (isclosed) str=str.substring(0,str.length()-1);
				
				String[] bits=splitSpace(str);
				Node newNode=null;
				if (node==null)
				{
					newNode=xml.document();
					newNode.setNodeName(bits[0]);
				}
				else newNode=node.appendNode(bits[0]);
				
				for (int i=1;i<bits.length;i++)
				{
					int spc=bits[i].indexOf("=");
					if (spc<=0) throw new TrivialDOMException("Malformed attribute: ["+snip(bits[i])+"].");
					String key=bits[i].substring(0,spc),val=bits[i].substring(spc+1);
					if (!val.startsWith("\"") || !val.endsWith("\""))
						throw new TrivialDOMException("Malformed attribute value: ["+snip(bits[i])+"].");
					val=val.substring(1,val.length()-1);
					newNode.setAttribute(key,val);
				}
				
				if (!isclosed) node=newNode;
			}
			else if (str.startsWith("</"))
			{
				if (node==null) throw new TrivialDOMException("Unexpected end tag: ["+snip(str)+"].");
				str=str.substring(2,str.length()-1);
				if (str.compareTo(node.nodeName())!=0)
					throw new TrivialDOMException("Closing tag does not match opening tag: ["+snip(str)+"].");
				node=node.parent();
			}
			else if (str.startsWith("<![CDATA["))
			{
				if (node==null) throw new TrivialDOMException("Unexpected CDATA node: ["+snip(str)+"].");
				if (!str.endsWith("]]>")) throw new TrivialDOMException("CDATA node not ended: ["+snip(str)+"].");
				str=str.substring(9,str.length()-3);
				node.appendText(str,true);
			}
			else if (str.startsWith("<!--"))
			{
				if (!str.endsWith("-->")) throw new TrivialDOMException("Unterminated comment: ["+snip(str)+"].");
			}
			else if (str.startsWith("<?")) {} // ignore
			else if (str.startsWith("<")) throw new TrivialDOMException("Unexpected angle bracket, near: ["+snip(str)+"].");
			else
			{
				if (node==null) throw new TrivialDOMException("Misplaced text-like block: ["+snip(str)+"].");
				String txt=unescapeText(str);
				if (trimWS) txt=txt.trim();
				node.appendText(txt,false);
			}
		}		

		return xml;
	}
	
	// chop a string off if it's too big to go in an exception
	private static String snip(String str)
	{
		if (str.length()<60) return str;
		return str.substring(0,60)+"...";
	}
	
	// writing output files

	public static void writeXML(Writer out,TrivialDOM dom) throws IOException {writeXML(out,dom,true,true);}
	public static void writeXML(Writer out,TrivialDOM dom,boolean xmlHeader) throws IOException  {writeXML(out,dom,xmlHeader,true);}
	public static void writeXML(Writer out,TrivialDOM dom,boolean xmlHeader,boolean shortClose) throws IOException {writeXML(out,dom,xmlHeader,true,true);}
	public static void writeXML(Writer out,TrivialDOM dom,boolean xmlHeader,boolean shortClose,boolean prettyPrint) throws IOException
	{
		if (xmlHeader) out.write("<?xml version=\"1.0\" encoding=\"UTF-8\"?>\n");
		recursiveWriteNode(out,dom.document(),0,shortClose,prettyPrint);
		out.flush();
	}
	
	private static void recursiveWriteNode(Writer out,Node nod,int level,boolean shortClose,boolean prettyPrint) throws IOException
	{
		// emit the node tag & attributes
		
		if (prettyPrint) for (int n=0;n<level;n++) out.write(" ");
		out.write("<"+nod.nodeName());
		String[] attr=nod.getAttributeNames();
		for (int n=0;n<attr.length;n++) out.write(" "+attr[n]+"=\""+escapeAttr(nod.attribute(attr[n]))+"\"");

		// special case for empty nodes
		if (nod.numChildren()==0) 
		{
			if (shortClose) out.write("/>"); 
			else out.write("></"+nod.nodeName()+">");
			if (prettyPrint) out.write("\n");
			return;
		}

		out.write(">");
		
		boolean doIndent=true;
		if (!prettyPrint) doIndent=false;
		else if (nod.numChildren()==1 && nod.childType(0)==TYPE_TEXT) doIndent=false;
		else if (nod.numChildren()>0 && nod.childType(0)==TYPE_TEXT && nod.getChildText(0).preserve()) doIndent=false;
		
		if (doIndent) out.write("\n");
		
		// emit the child nodes
		
		for (int n=0;n<nod.numChildren();n++)
		{
			if (nod.childType(n)==TYPE_TEXT)
			{
				Text txt=nod.getChildText(n);
				if (doIndent) for (int i=0;i<level+1;i++) out.write(" ");
				
				if (txt.preserve())
					out.write("<![CDATA["+txt.get()+"]]>");
				else
					out.write(escapeText(txt.get()));
				
				if (doIndent) out.write("\n");
			}
			else recursiveWriteNode(out,nod.getChildNode(n),level+1,shortClose,prettyPrint);
		}
		
		// emit the closing tag
		
		if (doIndent) for (int n=0;n<level;n++) out.write(" ");
		out.write("</"+nod.nodeName()+">");
		if (prettyPrint) out.write("\n");
	}
	
	// miscellaneous
	
	// splits a string into pieces based on whitespace, but avoiding quotation marks
	private static String[] splitSpace(String str)
	{
		ArrayList<String> bits=new ArrayList<String>();
		boolean inquot=false;
		StringBuffer buff=new StringBuffer();
		for (int n=0;n<str.length();n++)
		{
			char ch=str.charAt(n);
			if (!inquot && (ch==' ' || ch=='\r' || ch=='\n' || ch=='\t'))
			{
				if (buff.length()>0) bits.add(buff.toString());
				buff.delete(0,buff.length());
				continue;
			}
			if (ch=='"') inquot=!inquot;
			buff.append(ch);
		}
		if (buff.length()>0) bits.add(buff.toString());
		if (bits.size()==0) bits.add("");
		return bits.toArray(new String[bits.size()]);
	}
	
	// make sure a string is suitable to encode in an attribute value (quoted)
	public static String escapeAttr(String S)
	{
		int i;
		while ((i=S.indexOf('"'))>=0) {S=S.substring(0,i)+"&quot;"+S.substring(i+1);}
		while ((i=S.indexOf('\''))>=0) {S=S.substring(0,i)+"&apos;"+S.substring(i+1);}
		return S;
	}
	// make sure a string is suitable for general XML text
	public static String escapeText(String S)
	{
		StringBuffer buff=new StringBuffer();
		for (int n=0;n<S.length();n++)
		{
			char ch=S.charAt(n);
			if (ch=='&') buff.append("&amp;");
			else if (ch=='<') buff.append("&lt;");
			else if (ch=='>') buff.append("&gt;");
			else if (ch>=127) buff.append("&#"+(int)ch+";");
			else buff.append(ch);
		}
		return buff.toString();
	}
	// convert any escaped entities back into regular text
	public static String unescapeText(String S)
	{
		Pattern hexcode=null;
	
		StringBuffer buff=new StringBuffer();
		int i=0;
		while (i<S.length())
		{
			if (i+5<=S.length() && S.substring(i,i+5).equals("&amp;")) {buff.append("&"); i+=5;}
			else if (i+4<=S.length() && S.substring(i,i+4).equals("&lt;")) {buff.append("<"); i+=4;}
			else if (i+4<=S.length() && S.substring(i,i+4).equals("&gt;")) {buff.append(">"); i+=4;}
			else if (i+6<=S.length() && S.substring(i,i+3).equals("&#x")) // hex unicode
			{
				if (hexcode==null) hexcode=Pattern.compile("\\&\\#x([0-9a-zA-Z]+)\\;");
				Matcher m=hexcode.matcher(S.substring(i));
				if (m.find())
				{
					String hex=m.group(1);
					try
					{
						char ch=(char)Integer.parseInt(hex,16);
						buff.append(ch);
					}
					catch (NumberFormatException ex) {} // oh well
					i+=4+hex.length();
				}
				else {buff.append(S.charAt(i)); i++;}
			}
			else if (i+4<=S.length() && S.substring(i,i+2).equals("&#")) // decimal unicode
			{
				int j=i+2;
				boolean bad=false;
				while (j<S.length()) 
				{
					if (S.charAt(j)==';') break;
					if (j>i+10 || S.charAt(j)<'0' || S.charAt(j)>'9') {bad=true; break;}
					j++;
				}
				if (bad) {buff.append(S.charAt(i)); i++;}
				else
				{
					int ch=Util.safeInt(S.substring(i+2,j));
					buff.append((char)ch);
					i+=j-i+1;
				}
			}
			else {buff.append(S.charAt(i)); i++;}
		}
		return buff.toString();
	}
}

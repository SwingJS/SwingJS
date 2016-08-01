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

/*
	A specialised subclass of TrivialDOM, which starts out with a blank document and a reader stream, and is instructed to read 
	pieces as necessary, by the caller. This is an alternative to reading the whole document before making it available. The DOM
	content may be accessed while the reading is in progress, but modification of the content is not advisable.
	
	Note: would have used StAX, except that it's not part of JDK1.5.
*/

public class TrivialDOMReader extends TrivialDOM
{
	private BufferedReader rdr;
	private int line=1;
	private Node current=null;

	private final String ERROR_EOF="Unexpected end of file.";
	private final String ERROR_BAD="Malformed XML document.";

	public TrivialDOMReader(BufferedReader rdr)
	{
		super();
		this.rdr=rdr;
	}
	
	// returns true if the input source is finished
	public boolean isFinished() {return rdr==null;}
	
	// shuts down the source
	public void close()
	{
		if (rdr!=null) try {rdr.close();} catch (IOException ex) {}
		rdr=null;
	}
	
	// reads out a block of XML, and updates the document status accordingly
	public void readBlock() throws IOException
	{
		if (rdr==null) throw new TrivialDOMException("Reading from closed input source.",line);
		
		StringBuffer buff=new StringBuffer();
		
		int ch=read();
		if (ch<0) throw new TrivialDOMException(ERROR_EOF,line);
		buff.append((char)ch);
		
		if (ch!='<') {readText(buff); return;}
		
		ch=read();
		if (ch<0) throw new TrivialDOMException(ERROR_EOF,line);
		buff.append((char)ch);
		
		if (ch=='/') readCloseTag(buff);
		else if (ch=='?') readHeader(buff);
		else if (ch=='!') readCDATA(buff);
		else if (Character.isLetterOrDigit((char)ch)) readOpenTag(buff);
		else throw new TrivialDOMException(ERROR_BAD,line);
	}
	
	// -------------- private reading methods --------------

	// wrapped version of the reader, which tracks line number
	private int read() throws IOException
	{
		int ch=rdr.read();
		if (ch=='\n') line++;
		return ch;
	}

	// read out the <?xml...> header
	private void readHeader(StringBuffer buff) throws IOException
	{
		if (current!=null) throw new TrivialDOMException("Unexpected XML header.",line);
		grabTag(buff);
		// (ignore it)
	}
		
	private void readOpenTag(StringBuffer buff) throws IOException
	{
		grabTag(buff);
		String tag=buff.toString().substring(1,buff.length()-1).trim();
		boolean selfclose=tag.endsWith("/");
		if (selfclose) tag=tag.substring(0,tag.length()-1).trim();
		
		ArrayList<Integer> widx=new ArrayList<Integer>();
		boolean instr=false;
		for (int n=0;n<tag.length();n++) 
		{
			char ch=tag.charAt(n);
			if (ch=='"') instr=!instr;
			else if (!instr && (ch==' ' || ch=='\t' || ch=='\r' || ch=='\n')) widx.add(n);
		}
		
		Node newnode=new Node(widx.size()==0 ? tag : tag.substring(0,widx.get(0)));
		if (doc==null) doc=current=newnode; else current.appendChild(newnode);
		
		for (int n=1;n<=widx.size();n++)
		{
			int p1=widx.get(n-1)+1;
			int p2=n<widx.size() ? widx.get(n) : tag.length();
			String attr=tag.substring(p1,p2);
			int i=attr.indexOf("=");
			if (i<0) throw new TrivialDOMException("Malformed element attribute.",line);
			String key=attr.substring(0,i),val=attr.substring(i+1);
			if (val.length()>=2 && val.startsWith("\"") && val.endsWith("\"")) val=val.substring(1,val.length()-1);
			newnode.setAttribute(key,val);
		}
		
		if (!selfclose) current=newnode;
	}
	
	private void readCloseTag(StringBuffer buff) throws IOException
	{
		if (current==null) throw new TrivialDOMException("Unexpected end tag.",line);
		
		grabTag(buff);
		
		String tag=buff.toString().substring(2,buff.length()-1).trim();
		if (!current.nodeName().equals(tag)) 
			throw new TrivialDOMException("Non-matching end tag: ["+tag+"] vs. ["+current.nodeName()+"].",line);
			
		current=current.parent();
		
		if (current==null) close();
	}
		
	private void readText(StringBuffer buff) throws IOException
	{	 
		while (true)
		{
			rdr.mark(1);
			int ch=read();
			if (ch<0) throw new TrivialDOMException(ERROR_EOF,line);
			if (ch=='<') {rdr.reset(); break;}
			buff.append((char)ch);
		}
		
		String str=buff.toString().trim();
		if (str.length()==0) return;
		if (current==null) throw new TrivialDOMException("Unexpected text.",line);
		
		str=TrivialDOM.unescapeText(str);
		
		current.appendText(str,false);
	}
		
	private void readCDATA(StringBuffer buff) throws IOException
	{
		if (current==null) throw new TrivialDOMException("Unexpected CDATA section.",line);
		
		while (true)
		{
			int ch=read();
			if (ch<0) throw new TrivialDOMException(ERROR_EOF,line);
			buff.append((char)ch);
			
			int sz=buff.length();
			if (sz==9 && !buff.toString().startsWith("<![CDATA["))
				throw new TrivialDOMException("Malformed CDataSection.",line);
			if (sz>=12 && buff.charAt(sz-3)==']'  && buff.charAt(sz-2)==']' && buff.charAt(sz-1)=='>') break;
		}
		
		current.appendText(buff.toString().substring(9,buff.length()-3),true);
	}
	
	// runs through the input, and grabs everything up to the end-of-tag
	private void grabTag(StringBuffer buff) throws IOException
	{
		boolean instr=false;
		while (true)
		{
			int ch=read();
			if (ch<0) throw new TrivialDOMException(ERROR_EOF,line);
			buff.append((char)ch);
			
			if (ch=='"') instr=!instr;
			else if (ch=='>') break;
		}
	}
}

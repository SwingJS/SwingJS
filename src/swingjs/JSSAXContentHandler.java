package swingjs;

// SAX event handler for demos.
// No warranty; no copyright -- use this as you will.
// $Id: DemoHandler.java,v 1.3 1998/05/01 20:45:16 david Exp $

import javajs.util.PT;
import javajs.util.SB;

import org.xml.sax.Attributes;
import org.xml.sax.SAXException;
import org.xml.sax.helpers.DefaultHandler;

/**
 * Event handler class for SAX demos.
 * 
 * <p>
 * This handler simply reports all of the events that it receives. It is useful
 * for testing and comparing SAX implementations, and for teaching or learning
 * about SAX. This is also a demonstration of how one class can implement all
 * four handler interfaces.
 * </p>
 * 
 * @see org.xml.sax.EntityResolver
 * @see org.xml.sax.DTDHandler
 * @see org.xml.sax.DocumentHandler
 * @see org.xml.sax.ErrorHandler
 */
public class JSSAXContentHandler extends DefaultHandler {

	// ////////////////////////////////////////////////////////////////////
	// Implementation of org.xml.sax.DocumentHandler
	// ////////////////////////////////////////////////////////////////////

	/**
	 * Print a message for a processing instruction.
	 * 
	 * @see org.xml.sax.DocumentHandler#processingInstruction
	 */
	public void processingInstruction(String target, String data) {
		System.out.println("<?" + target + ' ' + data + "?>");
	}


	/**
	 * Print a message at the start of the document.
	 * 
	 * @see org.xml.sax.DocumentHandler#startDocument
	 */
	public void startDocument() {
		System.out.println("Start document");
	}

	@Override
	public void startElement(String uri, String localName, String qName,
			Attributes atts) throws SAXException {
		SB sb = new SB();
		sb.append("Start element: name="
				+ JSSAXAttributes.getFullName(uri, localName, qName));
		for (int i = 0; i < atts.getLength(); i++)
			sb.append("\n  "
					+ JSSAXAttributes.getFullName(atts.getURI(i), atts.getLocalName(i),
							atts.getQName(i)) + " = \"" + atts.getValue(i) + "\"");
		System.out.println(sb);
	}

	/**
	 * Print a message for character data.
	 * 
	 * @see org.xml.sax.DocumentHandler#characters
	 */
	public void characters(char ch[], int start, int length) {
		System.out.println("Characters: " + display(ch, start, length));
	}

	@Override
	public void endElement(String uri, String localName, String qName)
			throws SAXException {
		System.out.println("End element: " + JSSAXAttributes.getFullName(uri, localName, qName));
	}

	/**
	 * Display text, escaping some characters.
	 */
	private String display(char ch[], int start, int length) {
		String s = "";
		for (int i = start; i < start + length; i++)
			s += ch[i];
		return PT.esc(s);
	}

	/**
	 * Print a message for the end of the document.
	 * 
	 * @see org.xml.sax.DocumentHandler#endDocument
	 */
	public void endDocument() {
		System.out.println("End document");
	}

}

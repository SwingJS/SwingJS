package swingjs.test;

import java.io.IOException;

import javax.xml.parsers.ParserConfigurationException;

import javajs.util.Rdr;

import org.xml.sax.InputSource;
import org.xml.sax.SAXException;

import swingjs.JSSAXContentHandler;
import swingjs.JSToolkit;

/**
 * in JavaScript, run this as
 * 
 * Clazz.loadClass("swingjs.test.TestXML", function(){ new swingjs.test.TestXML([]); })
 * 
 * @author Bob Hanson	
 *
 */
public class TestXML {

	public TestXML(String[] args) {
		String s = null;
		switch (args.length) {
		case 0:
			s = "<DocumentElement param=\"value\">     <FirstElement>         &#xb6; Some Text     </FirstElement>     <SecondElement param2=\"something\">       Pre-Text <Inline>Inlined text</Inline> Post-text.     </SecondElement></DocumentElement>";
			// s = "<?xml version=\"1.0\" encoding=\"UTF-8\"?><DocumentElement param=\"value\">     <FirstElement>         &#xb6; Some Text     </FirstElement> 	    <SecondElement param2=\"something\">       Pre-Text <Inline>Inlined text</Inline> Post-text.     	</SecondElement></DocumentElement>";
			// below fails with JavaScript -- missing DTD: 
			// s = "<DocumentElement param=\"value\">     <yyi:FirstElement>         &#xb6; Some Text     </yyi:FirstElement>    <SecondElement xxi:param2=\"something\">       Pre-Text <Inline>Inlined text</Inline> Post-text.     </SecondElement></DocumentElement>";
			// no problem here:
			//s = (String) JSToolkit.getFileContents("http://chemapps.stolaf.edu/jmol/jsmol/data/estron.cml");
			break;
		case 1:
			s = args[0];
			break;
		default:
			s = (String) JSToolkit.getFileContents(args[1]);
		}
		InputSource is = new InputSource(Rdr.getBR(s));
		try {
			javax.xml.parsers.SAXParserFactory.newInstance().newSAXParser()
					.parse(is, new JSSAXContentHandler());
		} catch (SAXException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		} catch (IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		} catch (ParserConfigurationException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}

	}

	/**
	 * 
	 * @param args [] (use test default), [stringData] or [-file, fileName]
	 */
	public static void main(String[] args) {
		new TestXML(args);
	}
} 
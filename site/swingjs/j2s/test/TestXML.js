Clazz.declarePackage ("test");
Clazz.load (null, "test.TestXML", ["JU.Rdr", "javax.xml.parsers.SAXParserFactory", "org.xml.sax.InputSource", "swingjs.JSSAXContentHandler", "$.JSToolkit"], function () {
c$ = Clazz.declareType (test, "TestXML");
Clazz.makeConstructor (c$, 
function (args) {
var s = null;
switch (args.length) {
case 0:
s = "<DocumentElement param=\"value\">     <FirstElement>         &#xb6; Some Text     </FirstElement>     <SecondElement param2=\"something\">       Pre-Text <Inline>Inlined text</Inline> Post-text.     </SecondElement></DocumentElement>";
s = swingjs.JSToolkit.getFileContents ("http://chemapps.stolaf.edu/jmol/jsmol/data/estron.cml");
break;
case 1:
s = args[0];
break;
default:
s = swingjs.JSToolkit.getFileContents (args[1]);
}
var is =  new org.xml.sax.InputSource (JU.Rdr.getBR (s));
try {
javax.xml.parsers.SAXParserFactory.newInstance ().newSAXParser ().parse (is,  new swingjs.JSSAXContentHandler ());
} catch (e$$) {
if (Clazz.exceptionOf (e$$, org.xml.sax.SAXException)) {
var e = e$$;
{
e.printStackTrace ();
}
} else if (Clazz.exceptionOf (e$$, java.io.IOException)) {
var e = e$$;
{
e.printStackTrace ();
}
} else if (Clazz.exceptionOf (e$$, javax.xml.parsers.ParserConfigurationException)) {
var e = e$$;
{
e.printStackTrace ();
}
} else {
throw e$$;
}
}
}, "~A");
c$.main = Clazz.defineMethod (c$, "main", 
function (args) {
 new test.TestXML (args);
}, "~A");
});

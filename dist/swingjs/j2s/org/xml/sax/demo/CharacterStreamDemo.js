Clazz.declarePackage ("org.xml.sax.demo");
Clazz.load (null, "org.xml.sax.demo.CharacterStreamDemo", ["java.io.StringReader", "org.xml.sax.InputSource", "org.xml.sax.demo.DemoHandler", "org.xml.sax.helpers.ParserFactory"], function () {
c$ = Clazz.declareType (org.xml.sax.demo, "CharacterStreamDemo");
c$.main = Clazz.defineMethod (c$, "main", 
function (args) {
var handler;
var source;
var parser;
var reader;
if (args.length != 0) {
System.err.println ("Usage: java CharTest");
System.exit (2);
}parser = org.xml.sax.helpers.ParserFactory.makeParser ();
handler =  new org.xml.sax.demo.DemoHandler ();
parser.setEntityResolver (handler);
parser.setDTDHandler (handler);
parser.setDocumentHandler (handler);
parser.setErrorHandler (handler);
reader =  new java.io.StringReader ("<?xml version=\"1.0\"?><doc>\n<title>Hello</title>\n<para>Hello, world!</para>\n</doc>\n");
parser.parse ( new org.xml.sax.InputSource (reader));
}, "~A");
Clazz.defineStatics (c$,
"doc", "<?xml version=\"1.0\"?><doc>\n<title>Hello</title>\n<para>Hello, world!</para>\n</doc>\n");
});

Clazz.declarePackage ("org.xml.sax.demo");
Clazz.load (null, "org.xml.sax.demo.ByteStreamDemo", ["java.io.FileInputStream", "org.xml.sax.InputSource", "org.xml.sax.demo.DemoHandler", "org.xml.sax.helpers.ParserFactory"], function () {
c$ = Clazz.declareType (org.xml.sax.demo, "ByteStreamDemo");
c$.main = Clazz.defineMethod (c$, "main", 
function (args) {
var parser;
var source;
var handler;
var input;
if (args.length != 1) {
System.err.println ("Usage: java -Dorg.xml.sax.parser=<classname> SystemIdDemo <document>");
System.exit (2);
}parser = org.xml.sax.helpers.ParserFactory.makeParser ();
handler =  new org.xml.sax.demo.DemoHandler ();
parser.setEntityResolver (handler);
parser.setDTDHandler (handler);
parser.setDocumentHandler (handler);
parser.setErrorHandler (handler);
input =  new java.io.FileInputStream (args[0]);
source =  new org.xml.sax.InputSource (input);
source.setSystemId (args[0]);
parser.parse (source);
}, "~A");
});

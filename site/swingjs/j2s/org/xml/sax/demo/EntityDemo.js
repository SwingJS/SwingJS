Clazz.declarePackage ("org.xml.sax.demo");
Clazz.load (["org.xml.sax.demo.DemoHandler", "java.io.StringReader"], "org.xml.sax.demo.EntityDemo", ["java.net.MalformedURLException", "$.URL", "org.xml.sax.InputSource", "org.xml.sax.helpers.ParserFactory"], function () {
c$ = Clazz.decorateAsClass (function () {
this.reader = null;
Clazz.instantialize (this, arguments);
}, org.xml.sax.demo, "EntityDemo", org.xml.sax.demo.DemoHandler);
Clazz.prepareFields (c$, function () {
this.reader =  new java.io.StringReader ("Entity resolution works!");
});
c$.main = Clazz.defineMethod (c$, "main", 
function (args) {
var parser;
var handler;
if (args.length != 1) {
System.err.println ("Usage: java -Dorg.xml.sax.parser=<classname> EntityDemo <document>");
System.exit (2);
}parser = org.xml.sax.helpers.ParserFactory.makeParser ();
handler =  new org.xml.sax.demo.EntityDemo ();
parser.setEntityResolver (handler);
parser.setDTDHandler (handler);
parser.setDocumentHandler (handler);
parser.setErrorHandler (handler);
parser.parse (org.xml.sax.demo.EntityDemo.makeAbsoluteURL (args[0]));
}, "~A");
Clazz.overrideMethod (c$, "resolveEntity", 
function (publicId, systemId) {
if (publicId != null && publicId.equals ("-//megginson//TEXT Sample Entity//EN")) {
return  new org.xml.sax.InputSource (this.reader);
} else {
return null;
}}, "~S,~S");
c$.makeAbsoluteURL = Clazz.defineMethod (c$, "makeAbsoluteURL", 
 function (url) {
var baseURL;
var currentDirectory = System.getProperty ("user.dir");
var fileSep = System.getProperty ("file.separator");
var file = currentDirectory.$replace (fileSep.charAt (0), '/') + '/';
if (file.charAt (0) != '/') {
file = "/" + file;
}baseURL =  new java.net.URL ("file", null, file);
return  new java.net.URL (baseURL, url).toString ();
}, "~S");
});

Clazz.declarePackage ("org.xml.sax.demo");
Clazz.load (["org.xml.sax.DTDHandler", "$.DocumentHandler", "$.EntityResolver", "$.ErrorHandler"], "org.xml.sax.demo.DemoHandler", null, function () {
c$ = Clazz.declareType (org.xml.sax.demo, "DemoHandler", null, [org.xml.sax.EntityResolver, org.xml.sax.DTDHandler, org.xml.sax.DocumentHandler, org.xml.sax.ErrorHandler]);
Clazz.overrideMethod (c$, "resolveEntity", 
function (publicId, systemId) {
System.out.print ("Resolve entity:");
if (publicId != null) {
System.out.print (" publicId=\"" + publicId + '"');
}System.out.println (" systemId=\"" + systemId + '"');
return null;
}, "~S,~S");
Clazz.overrideMethod (c$, "notationDecl", 
function (name, publicId, systemId) {
System.out.print ("Notation declaration: " + name);
if (publicId != null) {
System.out.print (" publicId=\"" + publicId + '"');
}if (systemId != null) {
System.out.print (" systemId=\"" + systemId + '"');
}System.out.print ('\n');
}, "~S,~S,~S");
Clazz.overrideMethod (c$, "unparsedEntityDecl", 
function (name, publicId, systemId, notationName) {
System.out.print ("Unparsed Entity Declaration: " + name);
if (publicId != null) {
System.out.print (" publicId=\"" + publicId + '"');
}if (systemId != null) {
System.out.print (" systemId=\"" + systemId + '"');
}System.out.println (" notationName=\"" + notationName + '"');
}, "~S,~S,~S,~S");
Clazz.overrideMethod (c$, "setDocumentLocator", 
function (locator) {
System.out.println ("Document locator supplied.");
}, "org.xml.sax.Locator");
Clazz.overrideMethod (c$, "startDocument", 
function () {
System.out.println ("Start document");
});
Clazz.overrideMethod (c$, "endDocument", 
function () {
System.out.println ("End document");
});
Clazz.overrideMethod (c$, "startElement", 
function (name, attributes) {
System.out.println ("Start element: " + name);
for (var i = 0; i < attributes.getLength (); i++) {
System.out.println ("  Attribute: " + attributes.getName (i) + ' ' + attributes.getType (i) + " \"" + attributes.getValue (i) + '"');
}
}, "~S,org.xml.sax.AttributeList");
Clazz.overrideMethod (c$, "endElement", 
function (name) {
System.out.println ("End element: " + name);
}, "~S");
Clazz.overrideMethod (c$, "characters", 
function (ch, start, length) {
System.out.print ("Characters: ");
org.xml.sax.demo.DemoHandler.display (ch, start, length);
}, "~A,~N,~N");
Clazz.overrideMethod (c$, "ignorableWhitespace", 
function (ch, start, length) {
System.out.print ("Ignorable Whitespace: ");
org.xml.sax.demo.DemoHandler.display (ch, start, length);
}, "~A,~N,~N");
Clazz.overrideMethod (c$, "processingInstruction", 
function (target, data) {
System.out.println ("Processing instruction: " + target + ' ' + data);
}, "~S,~S");
Clazz.overrideMethod (c$, "warning", 
function (exception) {
System.out.println ("Warning: " + exception.getMessage () + " (" + exception.getSystemId () + ':' + exception.getLineNumber () + ',' + exception.getColumnNumber () + ')');
}, "org.xml.sax.SAXParseException");
Clazz.overrideMethod (c$, "error", 
function (exception) {
System.out.println ("Recoverable Error: " + exception.getMessage () + " (" + exception.getSystemId () + ':' + exception.getLineNumber () + ',' + exception.getColumnNumber () + ')');
}, "org.xml.sax.SAXParseException");
Clazz.overrideMethod (c$, "fatalError", 
function (exception) {
System.out.println ("Fatal Error: " + exception.getMessage () + " (" + exception.getSystemId () + ':' + exception.getLineNumber () + ',' + exception.getColumnNumber () + ')');
}, "org.xml.sax.SAXParseException");
c$.display = Clazz.defineMethod (c$, "display", 
 function (ch, start, length) {
for (var i = start; i < start + length; i++) {
switch (ch[i]) {
case '\n':
System.out.print ("\\n");
break;
case '\t':
System.out.print ("\\t");
break;
default:
System.out.print (ch[i]);
break;
}
}
System.out.print ("\n");
}, "~A,~N,~N");
});

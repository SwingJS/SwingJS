Clazz.declarePackage ("swingjs");
Clazz.load (["org.xml.sax.helpers.DefaultHandler"], "swingjs.JSSAXContentHandler", ["JU.PT", "$.SB", "swingjs.JSSAXAttributes"], function () {
c$ = Clazz.declareType (swingjs, "JSSAXContentHandler", org.xml.sax.helpers.DefaultHandler);
Clazz.overrideMethod (c$, "processingInstruction", 
function (target, data) {
System.out.println ("<?" + target + ' ' + data + "?>");
}, "~S,~S");
Clazz.overrideMethod (c$, "startDocument", 
function () {
System.out.println ("Start document");
});
Clazz.overrideMethod (c$, "startElement", 
function (uri, localName, nodeName, atts) {
localName = this.fixXerces (localName, nodeName);
var sb =  new JU.SB ();
sb.append ("Start element: " + swingjs.JSSAXAttributes.getFullName (uri, localName, nodeName));
for (var i = 0; i < atts.getLength (); i++) sb.append ("\n  " + swingjs.JSSAXAttributes.getFullName (atts.getURI (i), atts.getLocalName (i), atts.getQName (i)) + " = \"" + atts.getValue (i) + "\"");

System.out.println (sb.toString ());
}, "~S,~S,~S,org.xml.sax.Attributes");
Clazz.overrideMethod (c$, "characters", 
function (ch, start, length) {
var s = "";
for (var i = start; i < start + length; i++) s += ch[i];

System.out.println ("Characters: " + JU.PT.esc (s));
}, "~A,~N,~N");
Clazz.overrideMethod (c$, "endElement", 
function (uri, localName, nodeName) {
localName = this.fixXerces (localName, nodeName);
System.out.println ("End element: " + swingjs.JSSAXAttributes.getFullName (uri, localName, nodeName));
}, "~S,~S,~S");
Clazz.overrideMethod (c$, "endDocument", 
function () {
System.out.println ("End document");
});
Clazz.defineMethod (c$, "fixXerces", 
 function (localName, nodeName) {
if (localName != null && localName.length > 0 || nodeName == null || nodeName.length == 0) return (localName == null ? "" : localName);
var pt = nodeName.indexOf (":");
return (pt < 0 ? nodeName : nodeName.substring (0, pt));
}, "~S,~S");
});

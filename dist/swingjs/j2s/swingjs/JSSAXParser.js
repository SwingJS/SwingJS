Clazz.declarePackage ("swingjs");
Clazz.load (["org.xml.sax.Parser", "$.XMLReader"], "swingjs.JSSAXParser", ["java.io.BufferedInputStream", "$.BufferedReader", "java.lang.Boolean", "java.util.Hashtable", "JU.AU", "$.PT", "$.Rdr", "org.xml.sax.SAXParseException", "swingjs.JSSAXAttributes", "$.JSSAXContentHandler", "$.JSToolkit", "swingjs.api.DOMNode"], function () {
c$ = Clazz.decorateAsClass (function () {
this.resolver = null;
this.dtdHandler = null;
this.docHandler = null;
this.contentHandler = null;
this.errorHandler = null;
this.havePre = false;
this.uniqueSeq = null;
this.ver2 = false;
this.tempChars = null;
this.props = null;
Clazz.instantialize (this, arguments);
}, swingjs, "JSSAXParser", null, [org.xml.sax.Parser, org.xml.sax.XMLReader]);
Clazz.prepareFields (c$, function () {
this.tempChars =  Clazz.newCharArray (1024, '\0');
});
Clazz.overrideMethod (c$, "setLocale", 
function (locale) {
}, "java.util.Locale");
Clazz.overrideMethod (c$, "setEntityResolver", 
function (resolver) {
this.resolver = resolver;
}, "org.xml.sax.EntityResolver");
Clazz.overrideMethod (c$, "setDTDHandler", 
function (handler) {
this.dtdHandler = handler;
}, "org.xml.sax.DTDHandler");
Clazz.overrideMethod (c$, "setDocumentHandler", 
function (handler) {
this.docHandler = handler;
}, "org.xml.sax.DocumentHandler");
Clazz.overrideMethod (c$, "setErrorHandler", 
function (handler) {
this.errorHandler = handler;
}, "org.xml.sax.ErrorHandler");
Clazz.defineMethod (c$, "parse", 
function (source, handler) {
this.setContentHandler (handler);
this.parseSource (source);
}, "org.xml.sax.InputSource,swingjs.JSSAXContentHandler");
Clazz.defineMethod (c$, "parse", 
function (source) {
this.parseSource (source);
}, "org.xml.sax.InputSource");
Clazz.defineMethod (c$, "parseSource", 
 function (source) {
var rdr = source.getCharacterStream ();
var data =  new Array (1);
if (rdr == null) {
var bs = source.getByteStream ();
if (!(Clazz.instanceOf (bs, java.io.BufferedInputStream))) bs =  new java.io.BufferedInputStream (bs);
data[0] = JU.Rdr.fixUTF (JU.Rdr.getStreamAsBytes (bs, null));
} else {
if (!(Clazz.instanceOf (rdr, java.io.BufferedReader))) rdr =  new java.io.BufferedReader (rdr);
JU.Rdr.readAllAsString (rdr, -1, false, data, 0);
}try {
this.parseDocument (this.parseXML (data[0]));
} catch (e) {
if (Clazz.exceptionOf (e, Exception)) {
this.error (e);
} else {
throw e;
}
}
}, "org.xml.sax.InputSource");
Clazz.defineMethod (c$, "parse", 
function (fileName) {
try {
this.parseDocument (this.parseXML (swingjs.JSToolkit.getFileContents (fileName)));
} catch (e) {
if (Clazz.exceptionOf (e, Exception)) {
this.error (e);
} else {
throw e;
}
}
}, "~S");
Clazz.defineMethod (c$, "parseXMLString", 
function (data) {
try {
this.parseDocument (this.parseXML (data));
} catch (e) {
if (Clazz.exceptionOf (e, Exception)) {
this.error (e);
} else {
throw e;
}
}
}, "~S");
Clazz.defineMethod (c$, "parseXML", 
 function (data) {
return swingjs.JSToolkit.getJQuery ().parseXML (this.removeProcessing (data));
}, "~S");
Clazz.defineMethod (c$, "removeProcessing", 
 function (data) {
if (data.indexOf ("<?") >= 0) {
this.getUniqueSequence (data);
data = JU.PT.rep (JU.PT.rep (data, "<?", "<![CDATA[" + this.uniqueSeq), "?>", "]]>");
if (data.startsWith ("<!")) {
data = "<pre>" + data + "</pre>";
this.havePre = true;
}}return data;
}, "~S");
Clazz.defineMethod (c$, "getUniqueSequence", 
 function (data) {
var s = "~";
while (data.indexOf ("<![CDATA[" + s) >= 0) s += "~";

this.uniqueSeq = s;
}, "~S");
Clazz.defineMethod (c$, "error", 
 function (e) {
var ee =  new org.xml.sax.SAXParseException ("Invalid Document", null);
if (this.errorHandler == null) throw (ee);
 else this.errorHandler.fatalError (ee);
}, "Exception");
Clazz.defineMethod (c$, "parseDocument", 
 function (doc) {
if (this.docHandler == null && this.contentHandler == null) this.contentHandler =  new swingjs.JSSAXContentHandler ();
this.ver2 = (this.contentHandler != null);
if (this.ver2) this.contentHandler.startDocument ();
 else this.docHandler.startDocument ();
this.walkDOMTree (swingjs.api.DOMNode.getAttr (doc, "firstChild"), this.havePre);
if (this.ver2) this.contentHandler.endDocument ();
 else this.docHandler.endDocument ();
}, "swingjs.api.DOMNode");
Clazz.defineMethod (c$, "walkDOMTree", 
 function (node, skipTag) {
var localName = (swingjs.api.DOMNode.getAttr (node, "localName"));
var qName = swingjs.api.DOMNode.getAttr (node, "nodeName");
var uri = swingjs.api.DOMNode.getAttr (node, "namespaceURI");
if (localName == null) {
var isText = "#text".equals (qName);
if (isText || "#cdata-section".equals (qName)) {
var data = swingjs.api.DOMNode.getAttr (node, "textContent");
if (isText || this.uniqueSeq == null || !data.startsWith (this.uniqueSeq)) {
var len = data.length;
var ch = this.tempChars;
if (len > ch.length) ch = this.tempChars = JU.AU.ensureLength (ch, len * 2);
for (var i = len; --i >= 0; ) ch[i] = data.charAt (i);

if (this.ver2) this.contentHandler.characters (ch, 0, len);
 else this.docHandler.characters (ch, 0, len);
return;
}data = data.substring (this.uniqueSeq.length);
var target = data + " ";
target = target.substring (0, target.indexOf (" "));
data = data.substring (target.length).trim ();
if (this.ver2) this.contentHandler.processingInstruction (target, data);
 else this.docHandler.processingInstruction (target, data);
}} else if (!skipTag) {
var atts =  new swingjs.JSSAXAttributes (node);
if (this.ver2) this.contentHandler.startElement (uri, localName, qName, atts);
 else this.docHandler.startElement (localName, atts);
}node = swingjs.api.DOMNode.getAttr (node, "firstChild");
while (node != null) {
this.walkDOMTree (node, false);
node = swingjs.api.DOMNode.getAttr (node, "nextSibling");
}
if (localName == null || skipTag) return;
if (this.ver2) this.contentHandler.endElement (uri, localName, qName);
 else this.docHandler.endElement (localName);
}, "swingjs.api.DOMNode,~B");
Clazz.overrideMethod (c$, "getFeature", 
function (name) {
return (this.getProperty ("\1" + name) != null);
}, "~S");
Clazz.overrideMethod (c$, "setFeature", 
function (name, value) {
this.setProperty ("\1" + name, value ? Boolean.TRUE : null);
}, "~S,~B");
Clazz.overrideMethod (c$, "getProperty", 
function (name) {
return (this.props == null ? null : this.props.get (name));
}, "~S");
Clazz.overrideMethod (c$, "setProperty", 
function (name, value) {
if (value == null) {
if (this.props != null) this.props.remove (name);
return;
}if (this.props == null) this.props =  new java.util.Hashtable ();
this.props.put (name, value);
}, "~S,~O");
Clazz.overrideMethod (c$, "getEntityResolver", 
function () {
return this.resolver;
});
Clazz.overrideMethod (c$, "getDTDHandler", 
function () {
return this.dtdHandler;
});
Clazz.overrideMethod (c$, "setContentHandler", 
function (handler) {
this.contentHandler = handler;
}, "org.xml.sax.ContentHandler");
Clazz.overrideMethod (c$, "getContentHandler", 
function () {
return this.contentHandler;
});
Clazz.overrideMethod (c$, "getErrorHandler", 
function () {
return this.errorHandler;
});
});

Clazz.declarePackage ("org.xml.sax.helpers");
Clazz.load (["org.xml.sax.Attributes", "$.DocumentHandler", "$.XMLReader"], "org.xml.sax.helpers.ParserAdapter", ["java.lang.IllegalStateException", "$.NullPointerException", "java.util.Vector", "org.xml.sax.InputSource", "$.SAXException", "$.SAXNotRecognizedException", "$.SAXNotSupportedException", "$.SAXParseException", "org.xml.sax.helpers.AttributesImpl", "$.NamespaceSupport", "$.ParserFactory"], function () {
c$ = Clazz.decorateAsClass (function () {
this.nsSupport = null;
this.attAdapter = null;
this.parsing = false;
this.nameParts = null;
this.parser = null;
this.atts = null;
this.namespaces = true;
this.prefixes = false;
this.uris = false;
this.locator = null;
this.entityResolver = null;
this.dtdHandler = null;
this.contentHandler = null;
this.errorHandler = null;
if (!Clazz.isClassDefined ("org.xml.sax.helpers.ParserAdapter.AttributeListAdapter")) {
org.xml.sax.helpers.ParserAdapter.$ParserAdapter$AttributeListAdapter$ ();
}
Clazz.instantialize (this, arguments);
}, org.xml.sax.helpers, "ParserAdapter", null, [org.xml.sax.XMLReader, org.xml.sax.DocumentHandler]);
Clazz.prepareFields (c$, function () {
this.nameParts =  new Array (3);
});
Clazz.makeConstructor (c$, 
function () {
var driver = System.getProperty ("org.xml.sax.parser");
try {
this.setup (org.xml.sax.helpers.ParserFactory.makeParser ());
} catch (e$$) {
if (Clazz.exceptionOf (e$$, ClassNotFoundException)) {
var e1 = e$$;
{
throw  new org.xml.sax.SAXException ("Cannot find SAX1 driver class " + driver, e1);
}
} else if (Clazz.exceptionOf (e$$, IllegalAccessException)) {
var e2 = e$$;
{
throw  new org.xml.sax.SAXException ("SAX1 driver class " + driver + " found but cannot be loaded", e2);
}
} else if (Clazz.exceptionOf (e$$, InstantiationException)) {
var e3 = e$$;
{
throw  new org.xml.sax.SAXException ("SAX1 driver class " + driver + " loaded but cannot be instantiated", e3);
}
} else if (Clazz.exceptionOf (e$$, ClassCastException)) {
var e4 = e$$;
{
throw  new org.xml.sax.SAXException ("SAX1 driver class " + driver + " does not implement org.xml.sax.Parser");
}
} else if (Clazz.exceptionOf (e$$, NullPointerException)) {
var e5 = e$$;
{
throw  new org.xml.sax.SAXException ("System property org.xml.sax.parser not specified");
}
} else {
throw e$$;
}
}
});
Clazz.makeConstructor (c$, 
function (parser) {
this.setup (parser);
}, "org.xml.sax.Parser");
Clazz.defineMethod (c$, "setup", 
 function (parser) {
if (parser == null) {
throw  new NullPointerException ("Parser argument must not be null");
}this.parser = parser;
this.atts =  new org.xml.sax.helpers.AttributesImpl ();
this.nsSupport =  new org.xml.sax.helpers.NamespaceSupport ();
this.attAdapter = Clazz.innerTypeInstance (org.xml.sax.helpers.ParserAdapter.AttributeListAdapter, this, null);
}, "org.xml.sax.Parser");
Clazz.overrideMethod (c$, "setFeature", 
function (name, value) {
if (name.equals ("http://xml.org/sax/features/namespaces")) {
this.checkNotParsing ("feature", name);
this.namespaces = value;
if (!this.namespaces && !this.prefixes) {
this.prefixes = true;
}} else if (name.equals ("http://xml.org/sax/features/namespace-prefixes")) {
this.checkNotParsing ("feature", name);
this.prefixes = value;
if (!this.prefixes && !this.namespaces) {
this.namespaces = true;
}} else if (name.equals ("http://xml.org/sax/features/xmlns-uris")) {
this.checkNotParsing ("feature", name);
this.uris = value;
} else {
throw  new org.xml.sax.SAXNotRecognizedException ("Feature: " + name);
}}, "~S,~B");
Clazz.overrideMethod (c$, "getFeature", 
function (name) {
if (name.equals ("http://xml.org/sax/features/namespaces")) {
return this.namespaces;
} else if (name.equals ("http://xml.org/sax/features/namespace-prefixes")) {
return this.prefixes;
} else if (name.equals ("http://xml.org/sax/features/xmlns-uris")) {
return this.uris;
} else {
throw  new org.xml.sax.SAXNotRecognizedException ("Feature: " + name);
}}, "~S");
Clazz.overrideMethod (c$, "setProperty", 
function (name, value) {
throw  new org.xml.sax.SAXNotRecognizedException ("Property: " + name);
}, "~S,~O");
Clazz.overrideMethod (c$, "getProperty", 
function (name) {
throw  new org.xml.sax.SAXNotRecognizedException ("Property: " + name);
}, "~S");
Clazz.overrideMethod (c$, "setEntityResolver", 
function (resolver) {
this.entityResolver = resolver;
}, "org.xml.sax.EntityResolver");
Clazz.overrideMethod (c$, "getEntityResolver", 
function () {
return this.entityResolver;
});
Clazz.overrideMethod (c$, "setDTDHandler", 
function (handler) {
this.dtdHandler = handler;
}, "org.xml.sax.DTDHandler");
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
Clazz.overrideMethod (c$, "setErrorHandler", 
function (handler) {
this.errorHandler = handler;
}, "org.xml.sax.ErrorHandler");
Clazz.overrideMethod (c$, "getErrorHandler", 
function () {
return this.errorHandler;
});
Clazz.defineMethod (c$, "parse", 
function (systemId) {
this.parse ( new org.xml.sax.InputSource (systemId));
}, "~S");
Clazz.defineMethod (c$, "parse", 
function (input) {
if (this.parsing) {
throw  new org.xml.sax.SAXException ("Parser is already in use");
}this.setupParser ();
this.parsing = true;
try {
this.parser.parse (input);
} finally {
this.parsing = false;
}
this.parsing = false;
}, "org.xml.sax.InputSource");
Clazz.overrideMethod (c$, "setDocumentLocator", 
function (locator) {
this.locator = locator;
if (this.contentHandler != null) {
this.contentHandler.setDocumentLocator (locator);
}}, "org.xml.sax.Locator");
Clazz.overrideMethod (c$, "startDocument", 
function () {
if (this.contentHandler != null) {
this.contentHandler.startDocument ();
}});
Clazz.overrideMethod (c$, "endDocument", 
function () {
if (this.contentHandler != null) {
this.contentHandler.endDocument ();
}});
Clazz.overrideMethod (c$, "startElement", 
function (qName, qAtts) {
var exceptions = null;
if (!this.namespaces) {
if (this.contentHandler != null) {
this.attAdapter.setAttributeList (qAtts);
this.contentHandler.startElement ("", "", qName.intern (), this.attAdapter);
}return;
}this.nsSupport.pushContext ();
var length = qAtts.getLength ();
for (var i = 0; i < length; i++) {
var attQName = qAtts.getName (i);
if (!attQName.startsWith ("xmlns")) continue;
var prefix;
var n = attQName.indexOf (':');
if (n == -1 && attQName.length == 5) {
prefix = "";
} else if (n != 5) {
continue;
} else prefix = attQName.substring (n + 1);
var value = qAtts.getValue (i);
if (!this.nsSupport.declarePrefix (prefix, value)) {
this.reportError ("Illegal Namespace prefix: " + prefix);
continue;
}if (this.contentHandler != null) this.contentHandler.startPrefixMapping (prefix, value);
}
this.atts.clear ();
for (var i = 0; i < length; i++) {
var attQName = qAtts.getName (i);
var type = qAtts.getType (i);
var value = qAtts.getValue (i);
if (attQName.startsWith ("xmlns")) {
var prefix;
var n = attQName.indexOf (':');
if (n == -1 && attQName.length == 5) {
prefix = "";
} else if (n != 5) {
prefix = null;
} else {
prefix = attQName.substring (6);
}if (prefix != null) {
if (this.prefixes) {
if (this.uris) this.atts.addAttribute (org.xml.sax.helpers.NamespaceSupport.XMLNS, prefix, attQName.intern (), type, value);
 else this.atts.addAttribute ("", "", attQName.intern (), type, value);
}continue;
}}try {
var attName = this.processName (attQName, true, true);
this.atts.addAttribute (attName[0], attName[1], attName[2], type, value);
} catch (e) {
if (Clazz.exceptionOf (e, org.xml.sax.SAXException)) {
if (exceptions == null) exceptions =  new java.util.Vector ();
exceptions.addElement (e);
this.atts.addAttribute ("", attQName, attQName, type, value);
} else {
throw e;
}
}
}
if (exceptions != null && this.errorHandler != null) {
for (var i = 0; i < exceptions.size (); i++) this.errorHandler.error ((exceptions.elementAt (i)));

}if (this.contentHandler != null) {
var name = this.processName (qName, false, false);
this.contentHandler.startElement (name[0], name[1], name[2], this.atts);
}}, "~S,org.xml.sax.AttributeList");
Clazz.overrideMethod (c$, "endElement", 
function (qName) {
if (!this.namespaces) {
if (this.contentHandler != null) {
this.contentHandler.endElement ("", "", qName.intern ());
}return;
}var names = this.processName (qName, false, false);
if (this.contentHandler != null) {
this.contentHandler.endElement (names[0], names[1], names[2]);
var prefixes = this.nsSupport.getDeclaredPrefixes ();
while (prefixes.hasMoreElements ()) {
var prefix = prefixes.nextElement ();
this.contentHandler.endPrefixMapping (prefix);
}
}this.nsSupport.popContext ();
}, "~S");
Clazz.overrideMethod (c$, "characters", 
function (ch, start, length) {
if (this.contentHandler != null) {
this.contentHandler.characters (ch, start, length);
}}, "~A,~N,~N");
Clazz.overrideMethod (c$, "ignorableWhitespace", 
function (ch, start, length) {
if (this.contentHandler != null) {
this.contentHandler.ignorableWhitespace (ch, start, length);
}}, "~A,~N,~N");
Clazz.overrideMethod (c$, "processingInstruction", 
function (target, data) {
if (this.contentHandler != null) {
this.contentHandler.processingInstruction (target, data);
}}, "~S,~S");
Clazz.defineMethod (c$, "setupParser", 
 function () {
if (!this.prefixes && !this.namespaces) throw  new IllegalStateException ();
this.nsSupport.reset ();
if (this.uris) this.nsSupport.setNamespaceDeclUris (true);
if (this.entityResolver != null) {
this.parser.setEntityResolver (this.entityResolver);
}if (this.dtdHandler != null) {
this.parser.setDTDHandler (this.dtdHandler);
}if (this.errorHandler != null) {
this.parser.setErrorHandler (this.errorHandler);
}this.parser.setDocumentHandler (this);
this.locator = null;
});
Clazz.defineMethod (c$, "processName", 
 function (qName, isAttribute, useException) {
var parts = this.nsSupport.processName (qName, this.nameParts, isAttribute);
if (parts == null) {
if (useException) throw this.makeException ("Undeclared prefix: " + qName);
this.reportError ("Undeclared prefix: " + qName);
parts =  new Array (3);
parts[0] = parts[1] = "";
parts[2] = qName.intern ();
}return parts;
}, "~S,~B,~B");
Clazz.defineMethod (c$, "reportError", 
function (message) {
if (this.errorHandler != null) this.errorHandler.error (this.makeException (message));
}, "~S");
Clazz.defineMethod (c$, "makeException", 
 function (message) {
if (this.locator != null) {
return  new org.xml.sax.SAXParseException (message, this.locator);
} else {
return  new org.xml.sax.SAXParseException (message, null, null, -1, -1);
}}, "~S");
Clazz.defineMethod (c$, "checkNotParsing", 
 function (type, name) {
if (this.parsing) {
throw  new org.xml.sax.SAXNotSupportedException ("Cannot change " + type + ' ' + name + " while parsing");
}}, "~S,~S");
c$.$ParserAdapter$AttributeListAdapter$ = function () {
Clazz.pu$h(self.c$);
c$ = Clazz.decorateAsClass (function () {
Clazz.prepareCallback (this, arguments);
this.qAtts = null;
Clazz.instantialize (this, arguments);
}, org.xml.sax.helpers.ParserAdapter, "AttributeListAdapter", null, org.xml.sax.Attributes);
Clazz.makeConstructor (c$, 
function () {
});
Clazz.defineMethod (c$, "setAttributeList", 
function (a) {
this.qAtts = a;
}, "org.xml.sax.AttributeList");
Clazz.overrideMethod (c$, "getLength", 
function () {
return this.qAtts.getLength ();
});
Clazz.overrideMethod (c$, "getURI", 
function (a) {
return "";
}, "~N");
Clazz.overrideMethod (c$, "getLocalName", 
function (a) {
return "";
}, "~N");
Clazz.overrideMethod (c$, "getQName", 
function (a) {
return this.qAtts.getName (a).intern ();
}, "~N");
Clazz.defineMethod (c$, "getType", 
function (a) {
return this.qAtts.getType (a).intern ();
}, "~N");
Clazz.defineMethod (c$, "getValue", 
function (a) {
return this.qAtts.getValue (a);
}, "~N");
Clazz.defineMethod (c$, "getIndex", 
function (a, b) {
return -1;
}, "~S,~S");
Clazz.defineMethod (c$, "getIndex", 
function (a) {
var b = this.b$["org.xml.sax.helpers.ParserAdapter"].atts.getLength ();
for (var c = 0; c < b; c++) {
if (this.qAtts.getName (c).equals (a)) {
return c;
}}
return -1;
}, "~S");
Clazz.defineMethod (c$, "getType", 
function (a, b) {
return null;
}, "~S,~S");
Clazz.defineMethod (c$, "getType", 
function (a) {
return this.qAtts.getType (a).intern ();
}, "~S");
Clazz.defineMethod (c$, "getValue", 
function (a, b) {
return null;
}, "~S,~S");
Clazz.defineMethod (c$, "getValue", 
function (a) {
return this.qAtts.getValue (a);
}, "~S");
c$ = Clazz.p0p ();
};
Clazz.defineStatics (c$,
"FEATURES", "http://xml.org/sax/features/");
c$.NAMESPACES = c$.prototype.NAMESPACES = "http://xml.org/sax/features/namespaces";
c$.NAMESPACE_PREFIXES = c$.prototype.NAMESPACE_PREFIXES = "http://xml.org/sax/features/namespace-prefixes";
c$.XMLNS_URIs = c$.prototype.XMLNS_URIs = "http://xml.org/sax/features/xmlns-uris";
});

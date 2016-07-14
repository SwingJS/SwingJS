Clazz.declarePackage ("org.xml.sax.helpers");
Clazz.load (["org.xml.sax.AttributeList", "$.ContentHandler", "$.Parser"], "org.xml.sax.helpers.XMLReaderAdapter", ["java.lang.NullPointerException", "org.xml.sax.InputSource", "$.SAXNotSupportedException", "org.xml.sax.helpers.XMLReaderFactory"], function () {
c$ = Clazz.decorateAsClass (function () {
this.xmlReader = null;
this.documentHandler = null;
this.qAtts = null;
if (!Clazz.isClassDefined ("org.xml.sax.helpers.XMLReaderAdapter.AttributesAdapter")) {
org.xml.sax.helpers.XMLReaderAdapter.$XMLReaderAdapter$AttributesAdapter$ ();
}
Clazz.instantialize (this, arguments);
}, org.xml.sax.helpers, "XMLReaderAdapter", null, [org.xml.sax.Parser, org.xml.sax.ContentHandler]);
Clazz.makeConstructor (c$, 
function () {
this.setup (org.xml.sax.helpers.XMLReaderFactory.createXMLReader ());
});
Clazz.makeConstructor (c$, 
function (xmlReader) {
this.setup (xmlReader);
}, "org.xml.sax.XMLReader");
Clazz.defineMethod (c$, "setup", 
 function (xmlReader) {
if (xmlReader == null) {
throw  new NullPointerException ("XMLReader must not be null");
}this.xmlReader = xmlReader;
this.qAtts = Clazz.innerTypeInstance (org.xml.sax.helpers.XMLReaderAdapter.AttributesAdapter, this, null);
}, "org.xml.sax.XMLReader");
Clazz.overrideMethod (c$, "setLocale", 
function (locale) {
throw  new org.xml.sax.SAXNotSupportedException ("setLocale not supported");
}, "java.util.Locale");
Clazz.overrideMethod (c$, "setEntityResolver", 
function (resolver) {
this.xmlReader.setEntityResolver (resolver);
}, "org.xml.sax.EntityResolver");
Clazz.overrideMethod (c$, "setDTDHandler", 
function (handler) {
this.xmlReader.setDTDHandler (handler);
}, "org.xml.sax.DTDHandler");
Clazz.overrideMethod (c$, "setDocumentHandler", 
function (handler) {
this.documentHandler = handler;
}, "org.xml.sax.DocumentHandler");
Clazz.overrideMethod (c$, "setErrorHandler", 
function (handler) {
this.xmlReader.setErrorHandler (handler);
}, "org.xml.sax.ErrorHandler");
Clazz.defineMethod (c$, "parse", 
function (systemId) {
this.parse ( new org.xml.sax.InputSource (systemId));
}, "~S");
Clazz.defineMethod (c$, "parse", 
function (input) {
this.setupXMLReader ();
this.xmlReader.parse (input);
}, "org.xml.sax.InputSource");
Clazz.defineMethod (c$, "setupXMLReader", 
 function () {
this.xmlReader.setFeature ("http://xml.org/sax/features/namespace-prefixes", true);
try {
this.xmlReader.setFeature ("http://xml.org/sax/features/namespaces", false);
} catch (e) {
if (Clazz.exceptionOf (e, org.xml.sax.SAXException)) {
} else {
throw e;
}
}
this.xmlReader.setContentHandler (this);
});
Clazz.overrideMethod (c$, "setDocumentLocator", 
function (locator) {
if (this.documentHandler != null) this.documentHandler.setDocumentLocator (locator);
}, "org.xml.sax.Locator");
Clazz.overrideMethod (c$, "startDocument", 
function () {
if (this.documentHandler != null) this.documentHandler.startDocument ();
});
Clazz.overrideMethod (c$, "endDocument", 
function () {
if (this.documentHandler != null) this.documentHandler.endDocument ();
});
Clazz.overrideMethod (c$, "startPrefixMapping", 
function (prefix, uri) {
}, "~S,~S");
Clazz.overrideMethod (c$, "endPrefixMapping", 
function (prefix) {
}, "~S");
Clazz.overrideMethod (c$, "startElement", 
function (uri, localName, qName, atts) {
if (this.documentHandler != null) {
this.qAtts.setAttributes (atts);
this.documentHandler.startElement (qName, this.qAtts);
}}, "~S,~S,~S,org.xml.sax.Attributes");
Clazz.overrideMethod (c$, "endElement", 
function (uri, localName, qName) {
if (this.documentHandler != null) this.documentHandler.endElement (qName);
}, "~S,~S,~S");
Clazz.overrideMethod (c$, "characters", 
function (ch, start, length) {
if (this.documentHandler != null) this.documentHandler.characters (ch, start, length);
}, "~A,~N,~N");
Clazz.overrideMethod (c$, "ignorableWhitespace", 
function (ch, start, length) {
if (this.documentHandler != null) this.documentHandler.ignorableWhitespace (ch, start, length);
}, "~A,~N,~N");
Clazz.overrideMethod (c$, "processingInstruction", 
function (target, data) {
if (this.documentHandler != null) this.documentHandler.processingInstruction (target, data);
}, "~S,~S");
Clazz.overrideMethod (c$, "skippedEntity", 
function (name) {
}, "~S");
c$.$XMLReaderAdapter$AttributesAdapter$ = function () {
Clazz.pu$h(self.c$);
c$ = Clazz.decorateAsClass (function () {
Clazz.prepareCallback (this, arguments);
this.attributes = null;
Clazz.instantialize (this, arguments);
}, org.xml.sax.helpers.XMLReaderAdapter, "AttributesAdapter", null, org.xml.sax.AttributeList);
Clazz.makeConstructor (c$, 
function () {
});
Clazz.defineMethod (c$, "setAttributes", 
function (a) {
this.attributes = a;
}, "org.xml.sax.Attributes");
Clazz.overrideMethod (c$, "getLength", 
function () {
return this.attributes.getLength ();
});
Clazz.overrideMethod (c$, "getName", 
function (a) {
return this.attributes.getQName (a);
}, "~N");
Clazz.defineMethod (c$, "getType", 
function (a) {
return this.attributes.getType (a);
}, "~N");
Clazz.defineMethod (c$, "getValue", 
function (a) {
return this.attributes.getValue (a);
}, "~N");
Clazz.defineMethod (c$, "getType", 
function (a) {
return this.attributes.getType (a);
}, "~S");
Clazz.defineMethod (c$, "getValue", 
function (a) {
return this.attributes.getValue (a);
}, "~S");
c$ = Clazz.p0p ();
};
});

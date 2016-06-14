Clazz.declarePackage ("org.xml.sax.helpers");
Clazz.load (["org.xml.sax.ContentHandler", "$.DTDHandler", "$.EntityResolver", "$.ErrorHandler", "$.XMLFilter"], "org.xml.sax.helpers.XMLFilterImpl", ["java.lang.NullPointerException", "org.xml.sax.InputSource", "$.SAXNotRecognizedException"], function () {
c$ = Clazz.decorateAsClass (function () {
this.parent = null;
this.locator = null;
this.entityResolver = null;
this.dtdHandler = null;
this.contentHandler = null;
this.errorHandler = null;
Clazz.instantialize (this, arguments);
}, org.xml.sax.helpers, "XMLFilterImpl", null, [org.xml.sax.XMLFilter, org.xml.sax.EntityResolver, org.xml.sax.DTDHandler, org.xml.sax.ContentHandler, org.xml.sax.ErrorHandler]);
Clazz.makeConstructor (c$, 
function () {
});
Clazz.makeConstructor (c$, 
function (parent) {
this.setParent (parent);
}, "org.xml.sax.XMLReader");
Clazz.overrideMethod (c$, "setParent", 
function (parent) {
this.parent = parent;
}, "org.xml.sax.XMLReader");
Clazz.overrideMethod (c$, "getParent", 
function () {
return this.parent;
});
Clazz.defineMethod (c$, "setFeature", 
function (name, value) {
if (this.parent != null) {
this.parent.setFeature (name, value);
} else {
throw  new org.xml.sax.SAXNotRecognizedException ("Feature: " + name);
}}, "~S,~B");
Clazz.defineMethod (c$, "getFeature", 
function (name) {
if (this.parent != null) {
return this.parent.getFeature (name);
} else {
throw  new org.xml.sax.SAXNotRecognizedException ("Feature: " + name);
}}, "~S");
Clazz.defineMethod (c$, "setProperty", 
function (name, value) {
if (this.parent != null) {
this.parent.setProperty (name, value);
} else {
throw  new org.xml.sax.SAXNotRecognizedException ("Property: " + name);
}}, "~S,~O");
Clazz.defineMethod (c$, "getProperty", 
function (name) {
if (this.parent != null) {
return this.parent.getProperty (name);
} else {
throw  new org.xml.sax.SAXNotRecognizedException ("Property: " + name);
}}, "~S");
Clazz.defineMethod (c$, "setEntityResolver", 
function (resolver) {
this.entityResolver = resolver;
}, "org.xml.sax.EntityResolver");
Clazz.overrideMethod (c$, "getEntityResolver", 
function () {
return this.entityResolver;
});
Clazz.defineMethod (c$, "setDTDHandler", 
function (handler) {
this.dtdHandler = handler;
}, "org.xml.sax.DTDHandler");
Clazz.overrideMethod (c$, "getDTDHandler", 
function () {
return this.dtdHandler;
});
Clazz.defineMethod (c$, "setContentHandler", 
function (handler) {
this.contentHandler = handler;
}, "org.xml.sax.ContentHandler");
Clazz.overrideMethod (c$, "getContentHandler", 
function () {
return this.contentHandler;
});
Clazz.defineMethod (c$, "setErrorHandler", 
function (handler) {
this.errorHandler = handler;
}, "org.xml.sax.ErrorHandler");
Clazz.overrideMethod (c$, "getErrorHandler", 
function () {
return this.errorHandler;
});
Clazz.defineMethod (c$, "parse", 
function (input) {
this.setupParse ();
this.parent.parse (input);
}, "org.xml.sax.InputSource");
Clazz.defineMethod (c$, "parse", 
function (systemId) {
this.parse ( new org.xml.sax.InputSource (systemId));
}, "~S");
Clazz.defineMethod (c$, "resolveEntity", 
function (publicId, systemId) {
if (this.entityResolver != null) {
return this.entityResolver.resolveEntity (publicId, systemId);
} else {
return null;
}}, "~S,~S");
Clazz.defineMethod (c$, "notationDecl", 
function (name, publicId, systemId) {
if (this.dtdHandler != null) {
this.dtdHandler.notationDecl (name, publicId, systemId);
}}, "~S,~S,~S");
Clazz.defineMethod (c$, "unparsedEntityDecl", 
function (name, publicId, systemId, notationName) {
if (this.dtdHandler != null) {
this.dtdHandler.unparsedEntityDecl (name, publicId, systemId, notationName);
}}, "~S,~S,~S,~S");
Clazz.defineMethod (c$, "setDocumentLocator", 
function (locator) {
this.locator = locator;
if (this.contentHandler != null) {
this.contentHandler.setDocumentLocator (locator);
}}, "org.xml.sax.Locator");
Clazz.defineMethod (c$, "startDocument", 
function () {
if (this.contentHandler != null) {
this.contentHandler.startDocument ();
}});
Clazz.defineMethod (c$, "endDocument", 
function () {
if (this.contentHandler != null) {
this.contentHandler.endDocument ();
}});
Clazz.defineMethod (c$, "startPrefixMapping", 
function (prefix, uri) {
if (this.contentHandler != null) {
this.contentHandler.startPrefixMapping (prefix, uri);
}}, "~S,~S");
Clazz.defineMethod (c$, "endPrefixMapping", 
function (prefix) {
if (this.contentHandler != null) {
this.contentHandler.endPrefixMapping (prefix);
}}, "~S");
Clazz.defineMethod (c$, "startElement", 
function (uri, localName, qName, atts) {
if (this.contentHandler != null) {
this.contentHandler.startElement (uri, localName, qName, atts);
}}, "~S,~S,~S,org.xml.sax.Attributes");
Clazz.defineMethod (c$, "endElement", 
function (uri, localName, qName) {
if (this.contentHandler != null) {
this.contentHandler.endElement (uri, localName, qName);
}}, "~S,~S,~S");
Clazz.defineMethod (c$, "characters", 
function (ch, start, length) {
if (this.contentHandler != null) {
this.contentHandler.characters (ch, start, length);
}}, "~A,~N,~N");
Clazz.defineMethod (c$, "ignorableWhitespace", 
function (ch, start, length) {
if (this.contentHandler != null) {
this.contentHandler.ignorableWhitespace (ch, start, length);
}}, "~A,~N,~N");
Clazz.defineMethod (c$, "processingInstruction", 
function (target, data) {
if (this.contentHandler != null) {
this.contentHandler.processingInstruction (target, data);
}}, "~S,~S");
Clazz.defineMethod (c$, "skippedEntity", 
function (name) {
if (this.contentHandler != null) {
this.contentHandler.skippedEntity (name);
}}, "~S");
Clazz.defineMethod (c$, "warning", 
function (e) {
if (this.errorHandler != null) {
this.errorHandler.warning (e);
}}, "org.xml.sax.SAXParseException");
Clazz.defineMethod (c$, "error", 
function (e) {
if (this.errorHandler != null) {
this.errorHandler.error (e);
}}, "org.xml.sax.SAXParseException");
Clazz.defineMethod (c$, "fatalError", 
function (e) {
if (this.errorHandler != null) {
this.errorHandler.fatalError (e);
}}, "org.xml.sax.SAXParseException");
Clazz.defineMethod (c$, "setupParse", 
 function () {
if (this.parent == null) {
throw  new NullPointerException ("No parent for filter");
}this.parent.setEntityResolver (this);
this.parent.setDTDHandler (this);
this.parent.setContentHandler (this);
this.parent.setErrorHandler (this);
});
});

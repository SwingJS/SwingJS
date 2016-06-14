Clazz.declarePackage ("org.xml.sax.helpers");
Clazz.load (["org.xml.sax.ContentHandler", "$.DTDHandler", "$.EntityResolver", "$.ErrorHandler"], "org.xml.sax.helpers.DefaultHandler", null, function () {
c$ = Clazz.declareType (org.xml.sax.helpers, "DefaultHandler", null, [org.xml.sax.EntityResolver, org.xml.sax.DTDHandler, org.xml.sax.ContentHandler, org.xml.sax.ErrorHandler]);
Clazz.overrideMethod (c$, "resolveEntity", 
function (publicId, systemId) {
return null;
}, "~S,~S");
Clazz.overrideMethod (c$, "notationDecl", 
function (name, publicId, systemId) {
}, "~S,~S,~S");
Clazz.overrideMethod (c$, "unparsedEntityDecl", 
function (name, publicId, systemId, notationName) {
}, "~S,~S,~S,~S");
Clazz.overrideMethod (c$, "setDocumentLocator", 
function (locator) {
}, "org.xml.sax.Locator");
Clazz.overrideMethod (c$, "startDocument", 
function () {
});
Clazz.overrideMethod (c$, "endDocument", 
function () {
});
Clazz.overrideMethod (c$, "startPrefixMapping", 
function (prefix, uri) {
}, "~S,~S");
Clazz.overrideMethod (c$, "endPrefixMapping", 
function (prefix) {
}, "~S");
Clazz.overrideMethod (c$, "startElement", 
function (uri, localName, qName, attributes) {
}, "~S,~S,~S,org.xml.sax.Attributes");
Clazz.overrideMethod (c$, "endElement", 
function (uri, localName, qName) {
}, "~S,~S,~S");
Clazz.overrideMethod (c$, "characters", 
function (ch, start, length) {
}, "~A,~N,~N");
Clazz.overrideMethod (c$, "ignorableWhitespace", 
function (ch, start, length) {
}, "~A,~N,~N");
Clazz.overrideMethod (c$, "processingInstruction", 
function (target, data) {
}, "~S,~S");
Clazz.overrideMethod (c$, "skippedEntity", 
function (name) {
}, "~S");
Clazz.overrideMethod (c$, "warning", 
function (e) {
}, "org.xml.sax.SAXParseException");
Clazz.overrideMethod (c$, "error", 
function (e) {
}, "org.xml.sax.SAXParseException");
Clazz.overrideMethod (c$, "fatalError", 
function (e) {
throw e;
}, "org.xml.sax.SAXParseException");
});

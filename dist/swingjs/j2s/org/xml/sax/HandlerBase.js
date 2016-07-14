Clazz.declarePackage ("org.xml.sax");
Clazz.load (["org.xml.sax.DTDHandler", "$.DocumentHandler", "$.EntityResolver", "$.ErrorHandler"], "org.xml.sax.HandlerBase", null, function () {
c$ = Clazz.declareType (org.xml.sax, "HandlerBase", null, [org.xml.sax.EntityResolver, org.xml.sax.DTDHandler, org.xml.sax.DocumentHandler, org.xml.sax.ErrorHandler]);
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
Clazz.overrideMethod (c$, "startElement", 
function (name, attributes) {
}, "~S,org.xml.sax.AttributeList");
Clazz.overrideMethod (c$, "endElement", 
function (name) {
}, "~S");
Clazz.overrideMethod (c$, "characters", 
function (ch, start, length) {
}, "~A,~N,~N");
Clazz.overrideMethod (c$, "ignorableWhitespace", 
function (ch, start, length) {
}, "~A,~N,~N");
Clazz.overrideMethod (c$, "processingInstruction", 
function (target, data) {
}, "~S,~S");
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

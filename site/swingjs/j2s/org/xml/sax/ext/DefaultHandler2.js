Clazz.declarePackage ("org.xml.sax.ext");
Clazz.load (["org.xml.sax.ext.DeclHandler", "$.EntityResolver2", "$.LexicalHandler", "org.xml.sax.helpers.DefaultHandler"], "org.xml.sax.ext.DefaultHandler2", null, function () {
c$ = Clazz.declareType (org.xml.sax.ext, "DefaultHandler2", org.xml.sax.helpers.DefaultHandler, [org.xml.sax.ext.LexicalHandler, org.xml.sax.ext.DeclHandler, org.xml.sax.ext.EntityResolver2]);
Clazz.makeConstructor (c$, 
function () {
Clazz.superConstructor (this, org.xml.sax.ext.DefaultHandler2, []);
});
Clazz.overrideMethod (c$, "startCDATA", 
function () {
});
Clazz.overrideMethod (c$, "endCDATA", 
function () {
});
Clazz.overrideMethod (c$, "startDTD", 
function (name, publicId, systemId) {
}, "~S,~S,~S");
Clazz.overrideMethod (c$, "endDTD", 
function () {
});
Clazz.overrideMethod (c$, "startEntity", 
function (name) {
}, "~S");
Clazz.overrideMethod (c$, "endEntity", 
function (name) {
}, "~S");
Clazz.overrideMethod (c$, "comment", 
function (ch, start, length) {
}, "~A,~N,~N");
Clazz.overrideMethod (c$, "attributeDecl", 
function (eName, aName, type, mode, value) {
}, "~S,~S,~S,~S,~S");
Clazz.overrideMethod (c$, "elementDecl", 
function (name, model) {
}, "~S,~S");
Clazz.overrideMethod (c$, "externalEntityDecl", 
function (name, publicId, systemId) {
}, "~S,~S,~S");
Clazz.overrideMethod (c$, "internalEntityDecl", 
function (name, value) {
}, "~S,~S");
Clazz.overrideMethod (c$, "getExternalSubset", 
function (name, baseURI) {
return null;
}, "~S,~S");
Clazz.defineMethod (c$, "resolveEntity", 
function (name, publicId, baseURI, systemId) {
return null;
}, "~S,~S,~S,~S");
Clazz.defineMethod (c$, "resolveEntity", 
function (publicId, systemId) {
return this.resolveEntity (null, publicId, null, systemId);
}, "~S,~S");
});

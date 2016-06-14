Clazz.declarePackage ("org.xml.sax");
c$ = Clazz.decorateAsClass (function () {
this.publicId = null;
this.systemId = null;
this.byteStream = null;
this.encoding = null;
this.characterStream = null;
Clazz.instantialize (this, arguments);
}, org.xml.sax, "InputSource");
Clazz.makeConstructor (c$, 
function () {
});
Clazz.makeConstructor (c$, 
function (systemId) {
this.setSystemId (systemId);
}, "~S");
Clazz.makeConstructor (c$, 
function (byteStream) {
this.setByteStream (byteStream);
}, "java.io.InputStream");
Clazz.makeConstructor (c$, 
function (characterStream) {
this.setCharacterStream (characterStream);
}, "java.io.Reader");
Clazz.defineMethod (c$, "setPublicId", 
function (publicId) {
this.publicId = publicId;
}, "~S");
Clazz.defineMethod (c$, "getPublicId", 
function () {
return this.publicId;
});
Clazz.defineMethod (c$, "setSystemId", 
function (systemId) {
this.systemId = systemId;
}, "~S");
Clazz.defineMethod (c$, "getSystemId", 
function () {
return this.systemId;
});
Clazz.defineMethod (c$, "setByteStream", 
function (byteStream) {
this.byteStream = byteStream;
}, "java.io.InputStream");
Clazz.defineMethod (c$, "getByteStream", 
function () {
return this.byteStream;
});
Clazz.defineMethod (c$, "setEncoding", 
function (encoding) {
this.encoding = encoding;
}, "~S");
Clazz.defineMethod (c$, "getEncoding", 
function () {
return this.encoding;
});
Clazz.defineMethod (c$, "setCharacterStream", 
function (characterStream) {
this.characterStream = characterStream;
}, "java.io.Reader");
Clazz.defineMethod (c$, "getCharacterStream", 
function () {
return this.characterStream;
});

Clazz.declarePackage ("org.xml.sax");
Clazz.load (["org.xml.sax.SAXException"], "org.xml.sax.SAXParseException", null, function () {
c$ = Clazz.decorateAsClass (function () {
this.publicId = null;
this.systemId = null;
this.lineNumber = 0;
this.columnNumber = 0;
Clazz.instantialize (this, arguments);
}, org.xml.sax, "SAXParseException", org.xml.sax.SAXException);
Clazz.makeConstructor (c$, 
function (message, locator) {
Clazz.superConstructor (this, org.xml.sax.SAXParseException, [message]);
if (locator != null) {
this.init (locator.getPublicId (), locator.getSystemId (), locator.getLineNumber (), locator.getColumnNumber ());
} else {
this.init (null, null, -1, -1);
}}, "~S,org.xml.sax.Locator");
Clazz.makeConstructor (c$, 
function (message, locator, e) {
Clazz.superConstructor (this, org.xml.sax.SAXParseException, [message, e]);
if (locator != null) {
this.init (locator.getPublicId (), locator.getSystemId (), locator.getLineNumber (), locator.getColumnNumber ());
} else {
this.init (null, null, -1, -1);
}}, "~S,org.xml.sax.Locator,Exception");
Clazz.makeConstructor (c$, 
function (message, publicId, systemId, lineNumber, columnNumber) {
Clazz.superConstructor (this, org.xml.sax.SAXParseException, [message]);
this.init (publicId, systemId, lineNumber, columnNumber);
}, "~S,~S,~S,~N,~N");
Clazz.makeConstructor (c$, 
function (message, publicId, systemId, lineNumber, columnNumber, e) {
Clazz.superConstructor (this, org.xml.sax.SAXParseException, [message, e]);
this.init (publicId, systemId, lineNumber, columnNumber);
}, "~S,~S,~S,~N,~N,Exception");
Clazz.defineMethod (c$, "init", 
 function (publicId, systemId, lineNumber, columnNumber) {
this.publicId = publicId;
this.systemId = systemId;
this.lineNumber = lineNumber;
this.columnNumber = columnNumber;
}, "~S,~S,~N,~N");
Clazz.defineMethod (c$, "getPublicId", 
function () {
return this.publicId;
});
Clazz.defineMethod (c$, "getSystemId", 
function () {
return this.systemId;
});
Clazz.defineMethod (c$, "getLineNumber", 
function () {
return this.lineNumber;
});
Clazz.defineMethod (c$, "getColumnNumber", 
function () {
return this.columnNumber;
});
});

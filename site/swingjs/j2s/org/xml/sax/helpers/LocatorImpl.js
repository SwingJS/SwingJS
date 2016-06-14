Clazz.declarePackage ("org.xml.sax.helpers");
Clazz.load (["org.xml.sax.Locator"], "org.xml.sax.helpers.LocatorImpl", null, function () {
c$ = Clazz.decorateAsClass (function () {
this.publicId = null;
this.systemId = null;
this.lineNumber = 0;
this.columnNumber = 0;
Clazz.instantialize (this, arguments);
}, org.xml.sax.helpers, "LocatorImpl", null, org.xml.sax.Locator);
Clazz.makeConstructor (c$, 
function () {
});
Clazz.makeConstructor (c$, 
function (locator) {
this.setPublicId (locator.getPublicId ());
this.setSystemId (locator.getSystemId ());
this.setLineNumber (locator.getLineNumber ());
this.setColumnNumber (locator.getColumnNumber ());
}, "org.xml.sax.Locator");
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
Clazz.defineMethod (c$, "setPublicId", 
function (publicId) {
this.publicId = publicId;
}, "~S");
Clazz.defineMethod (c$, "setSystemId", 
function (systemId) {
this.systemId = systemId;
}, "~S");
Clazz.defineMethod (c$, "setLineNumber", 
function (lineNumber) {
this.lineNumber = lineNumber;
}, "~N");
Clazz.defineMethod (c$, "setColumnNumber", 
function (columnNumber) {
this.columnNumber = columnNumber;
}, "~N");
});

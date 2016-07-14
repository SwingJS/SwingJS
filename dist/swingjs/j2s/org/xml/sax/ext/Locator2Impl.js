Clazz.declarePackage ("org.xml.sax.ext");
Clazz.load (["org.xml.sax.ext.Locator2", "org.xml.sax.helpers.LocatorImpl"], "org.xml.sax.ext.Locator2Impl", null, function () {
c$ = Clazz.decorateAsClass (function () {
this.encoding = null;
this.version = null;
Clazz.instantialize (this, arguments);
}, org.xml.sax.ext, "Locator2Impl", org.xml.sax.helpers.LocatorImpl, org.xml.sax.ext.Locator2);
Clazz.makeConstructor (c$, 
function () {
Clazz.superConstructor (this, org.xml.sax.ext.Locator2Impl, []);
});
Clazz.makeConstructor (c$, 
function (locator) {
Clazz.superConstructor (this, org.xml.sax.ext.Locator2Impl, [locator]);
if (Clazz.instanceOf (locator, org.xml.sax.ext.Locator2)) {
var l2 = locator;
this.version = l2.getXMLVersion ();
this.encoding = l2.getEncoding ();
}}, "org.xml.sax.Locator");
Clazz.defineMethod (c$, "getXMLVersion", 
function () {
return this.version;
});
Clazz.defineMethod (c$, "getEncoding", 
function () {
return this.encoding;
});
Clazz.defineMethod (c$, "setXMLVersion", 
function (version) {
this.version = version;
}, "~S");
Clazz.defineMethod (c$, "setEncoding", 
function (encoding) {
this.encoding = encoding;
}, "~S");
});

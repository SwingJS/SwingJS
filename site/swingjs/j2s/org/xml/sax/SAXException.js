Clazz.declarePackage ("org.xml.sax");
Clazz.load (["java.lang.Exception"], "org.xml.sax.SAXException", null, function () {
c$ = Clazz.decorateAsClass (function () {
this.exception = null;
Clazz.instantialize (this, arguments);
}, org.xml.sax, "SAXException", Exception);
Clazz.makeConstructor (c$, 
function () {
Clazz.superConstructor (this, org.xml.sax.SAXException);
this.exception = null;
});
Clazz.makeConstructor (c$, 
function (message) {
Clazz.superConstructor (this, org.xml.sax.SAXException, [message]);
this.exception = null;
}, "~S");
Clazz.makeConstructor (c$, 
function (e) {
Clazz.superConstructor (this, org.xml.sax.SAXException);
this.exception = e;
}, "Exception");
Clazz.makeConstructor (c$, 
function (message, e) {
Clazz.superConstructor (this, org.xml.sax.SAXException, [message]);
this.exception = e;
}, "~S,Exception");
Clazz.defineMethod (c$, "getMessage", 
function () {
var message = Clazz.superCall (this, org.xml.sax.SAXException, "getMessage", []);
if (message == null && this.exception != null) {
return this.exception.getMessage ();
} else {
return message;
}});
Clazz.defineMethod (c$, "getException", 
function () {
return this.exception;
});
Clazz.defineMethod (c$, "toString", 
function () {
if (this.exception != null) {
return this.exception.toString ();
} else {
return Clazz.superCall (this, org.xml.sax.SAXException, "toString", []);
}});
});

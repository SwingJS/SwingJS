Clazz.declarePackage ("java.util");
Clazz.load (["java.util.IllegalFormatException"], "java.util.MissingFormatArgumentException", ["java.lang.NullPointerException"], function () {
c$ = Clazz.decorateAsClass (function () {
this.s = null;
Clazz.instantialize (this, arguments);
}, java.util, "MissingFormatArgumentException", java.util.IllegalFormatException);
Clazz.makeConstructor (c$, 
function (s) {
Clazz.superConstructor (this, java.util.MissingFormatArgumentException, []);
if (s == null) throw  new NullPointerException ();
this.s = s;
}, "~S");
Clazz.defineMethod (c$, "getFormatSpecifier", 
function () {
return this.s;
});
Clazz.overrideMethod (c$, "getMessage", 
function () {
return "Format specifier '" + this.s + "'";
});
});

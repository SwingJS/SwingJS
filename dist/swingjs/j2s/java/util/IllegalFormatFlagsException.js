Clazz.declarePackage ("java.util");
Clazz.load (["java.util.IllegalFormatException"], "java.util.IllegalFormatFlagsException", ["java.lang.NullPointerException"], function () {
c$ = Clazz.decorateAsClass (function () {
this.flags = null;
Clazz.instantialize (this, arguments);
}, java.util, "IllegalFormatFlagsException", java.util.IllegalFormatException);
Clazz.makeConstructor (c$, 
function (f) {
Clazz.superConstructor (this, java.util.IllegalFormatFlagsException, []);
if (f == null) throw  new NullPointerException ();
this.flags = f;
}, "~S");
Clazz.defineMethod (c$, "getFlags", 
function () {
return this.flags;
});
Clazz.overrideMethod (c$, "getMessage", 
function () {
return "Flags = '" + this.flags + "'";
});
});

Clazz.declarePackage ("java.util");
Clazz.load (["java.util.IllegalFormatException"], "java.util.DuplicateFormatFlagsException", ["java.lang.NullPointerException"], function () {
c$ = Clazz.decorateAsClass (function () {
this.flags = null;
Clazz.instantialize (this, arguments);
}, java.util, "DuplicateFormatFlagsException", java.util.IllegalFormatException);
Clazz.makeConstructor (c$, 
function (f) {
Clazz.superConstructor (this, java.util.DuplicateFormatFlagsException, []);
if (f == null) throw  new NullPointerException ();
this.flags = f;
}, "~S");
Clazz.defineMethod (c$, "getFlags", 
function () {
return this.flags;
});
Clazz.overrideMethod (c$, "getMessage", 
function () {
return String.format ("Flags = '%s'", [this.flags]);
});
});

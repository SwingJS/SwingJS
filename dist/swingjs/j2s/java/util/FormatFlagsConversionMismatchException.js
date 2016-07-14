Clazz.declarePackage ("java.util");
Clazz.load (["java.util.IllegalFormatException"], "java.util.FormatFlagsConversionMismatchException", ["java.lang.NullPointerException"], function () {
c$ = Clazz.decorateAsClass (function () {
this.f = null;
this.c = '\0';
Clazz.instantialize (this, arguments);
}, java.util, "FormatFlagsConversionMismatchException", java.util.IllegalFormatException);
Clazz.makeConstructor (c$, 
function (f, c) {
Clazz.superConstructor (this, java.util.FormatFlagsConversionMismatchException, []);
if (f == null) throw  new NullPointerException ();
this.f = f;
this.c = c;
}, "~S,~S");
Clazz.defineMethod (c$, "getFlags", 
function () {
return this.f;
});
Clazz.defineMethod (c$, "getConversion", 
function () {
return this.c;
});
Clazz.overrideMethod (c$, "getMessage", 
function () {
return "Conversion = " + this.c + ", Flags = " + this.f;
});
});

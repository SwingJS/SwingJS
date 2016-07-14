Clazz.declarePackage ("java.util");
Clazz.load (["java.util.IllegalFormatException"], "java.util.IllegalFormatConversionException", ["java.lang.NullPointerException"], function () {
c$ = Clazz.decorateAsClass (function () {
this.c = '\0';
this.arg = null;
Clazz.instantialize (this, arguments);
}, java.util, "IllegalFormatConversionException", java.util.IllegalFormatException);
Clazz.makeConstructor (c$, 
function (c, arg) {
Clazz.superConstructor (this, java.util.IllegalFormatConversionException, []);
if (arg == null) throw  new NullPointerException ();
this.c = c;
this.arg = arg;
}, "~S,Class");
Clazz.defineMethod (c$, "getConversion", 
function () {
return this.c;
});
Clazz.defineMethod (c$, "getArgumentClass", 
function () {
return this.arg;
});
Clazz.overrideMethod (c$, "getMessage", 
function () {
return String.format ("%c != %s", [new Character (this.c).charCodeAt (0), this.arg.getName ()]);
});
});

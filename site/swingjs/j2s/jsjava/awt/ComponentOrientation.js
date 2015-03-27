Clazz.declarePackage ("jsjava.awt");
Clazz.load (null, "jsjava.awt.ComponentOrientation", ["java.util.Locale"], function () {
c$ = Clazz.decorateAsClass (function () {
this.orientation = 0;
Clazz.instantialize (this, arguments);
}, jsjava.awt, "ComponentOrientation");
Clazz.defineMethod (c$, "isHorizontal", 
function () {
return (this.orientation & 2) != 0;
});
Clazz.defineMethod (c$, "isLeftToRight", 
function () {
return (this.orientation & 4) != 0;
});
c$.getOrientation = Clazz.defineMethod (c$, "getOrientation", 
function (locale) {
var lang = locale.getLanguage ();
if ("iw".equals (lang) || "ar".equals (lang) || "fa".equals (lang) || "ur".equals (lang)) {
return jsjava.awt.ComponentOrientation.RIGHT_TO_LEFT;
} else {
return jsjava.awt.ComponentOrientation.LEFT_TO_RIGHT;
}}, "java.util.Locale");
c$.getOrientation = Clazz.defineMethod (c$, "getOrientation", 
function (bdl) {
var result = null;
try {
result = bdl.getObject ("Orientation");
} catch (e) {
if (Clazz.exceptionOf (e, Exception)) {
} else {
throw e;
}
}
if (result == null) {
result = jsjava.awt.ComponentOrientation.getOrientation (bdl.getLocale ());
}if (result == null) {
result = jsjava.awt.ComponentOrientation.getOrientation (java.util.Locale.getDefault ());
}return result;
}, "java.util.ResourceBundle");
Clazz.makeConstructor (c$, 
($fz = function (value) {
this.orientation = value;
}, $fz.isPrivate = true, $fz), "~N");
Clazz.defineStatics (c$,
"UNK_BIT", 1,
"HORIZ_BIT", 2,
"LTR_BIT", 4);
c$.LEFT_TO_RIGHT = c$.prototype.LEFT_TO_RIGHT =  new jsjava.awt.ComponentOrientation (6);
c$.RIGHT_TO_LEFT = c$.prototype.RIGHT_TO_LEFT =  new jsjava.awt.ComponentOrientation (2);
c$.UNKNOWN = c$.prototype.UNKNOWN =  new jsjava.awt.ComponentOrientation (7);
});

Clazz.declarePackage ("swingjs");
Clazz.load (["java.awt.FontMetrics"], "swingjs.JSFontMetrics", ["swingjs.JSToolkit"], function () {
c$ = Clazz.decorateAsClass (function () {
this.fwidths = null;
this.iwidths = null;
this.FIRST_PRINTABLE = 32;
Clazz.instantialize (this, arguments);
}, swingjs, "JSFontMetrics", java.awt.FontMetrics);
Clazz.makeConstructor (c$, 
function () {
Clazz.superConstructor (this, swingjs.JSFontMetrics, [null]);
});
Clazz.defineMethod (c$, "setFont", 
function (f) {
this.font = f;
}, "java.awt.Font");
Clazz.overrideMethod (c$, "getLeading", 
function () {
return Clazz.doubleToInt (this.font.getSize () / 20) + 1;
});
Clazz.overrideMethod (c$, "getAscent", 
function () {
return this.font.getSize ();
});
Clazz.overrideMethod (c$, "getDescent", 
function () {
return Clazz.doubleToInt (this.font.getSize () / 4) + 1;
});
Clazz.defineMethod (c$, "charWidth", 
function (pt) {
{
var spt;
return ((pt + 0 == pt ? pt : (pt = (spt = pt).charCodeAt(0))) < 256 ?
Clazz.floatToInt(this.getWidthsFloat()[pt])
: this.stringWidth(isChar ? spt : String.fromCharCode (pt)));
}}, "~N");
Clazz.overrideMethod (c$, "stringWidth", 
function (s) {
return Clazz.floatToInt (swingjs.JSToolkit.getStringWidth (null, this.font, s));
}, "~S");
Clazz.overrideMethod (c$, "getWidths", 
function () {
if (this.iwidths != null) return this.iwidths;
this.iwidths =  Clazz.newIntArray (256, 0);
this.getWidthsFloat ();
for (var ch = this.FIRST_PRINTABLE; ch < 256; ch++) {
this.iwidths[ch] = Clazz.floatToInt (this.fwidths[ch]);
}
return this.iwidths;
});
Clazz.defineMethod (c$, "getWidthsFloat", 
function () {
if (this.fwidths != null) return this.fwidths;
this.fwidths =  Clazz.newFloatArray (256, 0);
for (var ch = this.FIRST_PRINTABLE; ch < 256; ch++) {
this.fwidths[ch] = swingjs.JSToolkit.getStringWidth (null, this.font, "" + String.fromCharCode (ch));
}
return this.fwidths;
});
});

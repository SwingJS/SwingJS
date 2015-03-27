Clazz.declarePackage ("jssun.font");
Clazz.load (["java.lang.ref.SoftReference", "jsjava.awt.FontMetrics", "java.util.Hashtable"], "jssun.font.FontDesignMetrics", null, function () {
c$ = Clazz.decorateAsClass (function () {
this.ascent = 0;
this.descent = 0;
this.leading = 0;
this.height = -1;
this.frc = null;
Clazz.instantialize (this, arguments);
}, jssun.font, "FontDesignMetrics", jsjava.awt.FontMetrics);
c$.getDefaultFrc = Clazz.defineMethod (c$, "getDefaultFrc", 
($fz = function () {
if (jssun.font.FontDesignMetrics.$DEFAULT_FRC == null) {
}return jssun.font.FontDesignMetrics.$DEFAULT_FRC;
}, $fz.isPrivate = true, $fz));
c$.getMetrics = Clazz.defineMethod (c$, "getMetrics", 
function (font) {
return jssun.font.FontDesignMetrics.getMetrics (font, jssun.font.FontDesignMetrics.getDefaultFrc ());
}, "jsjava.awt.Font");
c$.getMetrics = Clazz.defineMethod (c$, "getMetrics", 
function (font, frc) {
var m = null;
var r;
r = jssun.font.FontDesignMetrics.metricsCache.get (font);
if (r != null) {
m = r.get ();
}if (m == null) {
m =  new jssun.font.FontDesignMetrics (font, frc);
jssun.font.FontDesignMetrics.metricsCache.put (font,  new jssun.font.FontDesignMetrics.KeyReference (font, m));
}for (var i = 0; i < jssun.font.FontDesignMetrics.recentMetrics.length; i++) {
if (jssun.font.FontDesignMetrics.recentMetrics[i] === m) {
return m;
}}
{
jssun.font.FontDesignMetrics.recentMetrics[jssun.font.FontDesignMetrics.recentIndex++] = m;
if (jssun.font.FontDesignMetrics.recentIndex == 5) {
jssun.font.FontDesignMetrics.recentIndex = 0;
}}return m;
}, "jsjava.awt.Font,jsjava.awt.font.FontRenderContext");
Clazz.makeConstructor (c$, 
($fz = function (font, frc) {
Clazz.superConstructor (this, jssun.font.FontDesignMetrics, [font]);
this.font = font;
this.frc = frc;
this.initMatrixAndMetrics ();
}, $fz.isPrivate = true, $fz), "jsjava.awt.Font,jsjava.awt.font.FontRenderContext");
Clazz.defineMethod (c$, "initMatrixAndMetrics", 
($fz = function () {
{
//need to calculate ascent, descent, leading, and maxAdvance
}}, $fz.isPrivate = true, $fz));
Clazz.overrideMethod (c$, "getFontRenderContext", 
function () {
return this.frc;
});
Clazz.defineMethod (c$, "charWidth", 
function (ch) {
{
return this.stringWidth("" + ch);
}}, "~S");
Clazz.overrideMethod (c$, "stringWidth", 
function (str) {
var width = 0;
{
}return Clazz.doubleToInt (0.5 + width);
}, "~S");
Clazz.overrideMethod (c$, "charsWidth", 
function (data, off, len) {
var width = 0;
{
var s = "";
for (var i = 0; i < len; i++)
s += data[i + off];
return this.stringWidth(s);
}return Clazz.doubleToInt (0.5 + width);
}, "~A,~N,~N");
Clazz.overrideMethod (c$, "getWidths", 
function () {
var widths =  Clazz.newIntArray (256, 0);
return widths;
});
Clazz.overrideMethod (c$, "getAscent", 
function () {
return Clazz.floatToInt (jssun.font.FontDesignMetrics.roundingUpValue + this.ascent);
});
Clazz.overrideMethod (c$, "getDescent", 
function () {
return Clazz.floatToInt (jssun.font.FontDesignMetrics.roundingUpValue + this.descent);
});
Clazz.overrideMethod (c$, "getLeading", 
function () {
return Clazz.floatToInt (jssun.font.FontDesignMetrics.roundingUpValue + this.descent + this.leading) - Clazz.floatToInt (jssun.font.FontDesignMetrics.roundingUpValue + this.descent);
});
Clazz.overrideMethod (c$, "getHeight", 
function () {
if (this.height < 0) {
this.height = this.getAscent () + Clazz.floatToInt (jssun.font.FontDesignMetrics.roundingUpValue + this.descent + this.leading);
}return this.height;
});
Clazz.pu$h ();
c$ = Clazz.decorateAsClass (function () {
this.key = null;
Clazz.instantialize (this, arguments);
}, jssun.font.FontDesignMetrics, "KeyReference", java.lang.ref.SoftReference);
Clazz.makeConstructor (c$, 
function (a, b) {
Clazz.superConstructor (this, jssun.font.FontDesignMetrics.KeyReference, [b, null]);
this.key = a;
}, "~O,~O");
Clazz.defineMethod (c$, "dispose", 
function () {
if (jssun.font.FontDesignMetrics.metricsCache.get (this.key) === this) {
jssun.font.FontDesignMetrics.metricsCache.remove (this.key);
}});
c$ = Clazz.p0p ();
Clazz.defineStatics (c$,
"roundingUpValue", 0.95,
"$DEFAULT_FRC", null);
c$.metricsCache = c$.prototype.metricsCache =  new java.util.Hashtable ();
Clazz.defineStatics (c$,
"MAXRECENT", 5);
c$.recentMetrics = c$.prototype.recentMetrics =  new Array (5);
Clazz.defineStatics (c$,
"recentIndex", 0);
});

Clazz.declarePackage ("jsjava.awt");
Clazz.load (["java.util.Map", "$.HashMap", "jssun.awt.SunHints"], "jsjava.awt.RenderingHints", ["java.lang.IllegalArgumentException", "$.InternalError", "java.lang.ref.WeakReference", "java.util.Collections"], function () {
c$ = Clazz.decorateAsClass (function () {
this.hintmap = null;
Clazz.instantialize (this, arguments);
}, jsjava.awt, "RenderingHints", null, [java.util.Map, Cloneable]);
Clazz.prepareFields (c$, function () {
this.hintmap =  new java.util.HashMap (7);
});
Clazz.makeConstructor (c$, 
function (init) {
if (init != null) {
this.hintmap.putAll (init);
}}, "java.util.Map");
Clazz.makeConstructor (c$, 
function (key, value) {
this.hintmap.put (key, value);
}, "jsjava.awt.RenderingHints.Key,~O");
Clazz.overrideMethod (c$, "size", 
function () {
return this.hintmap.size ();
});
Clazz.overrideMethod (c$, "isEmpty", 
function () {
return this.hintmap.isEmpty ();
});
Clazz.overrideMethod (c$, "containsKey", 
function (key) {
return this.hintmap.containsKey (key);
}, "~O");
Clazz.overrideMethod (c$, "containsValue", 
function (value) {
return this.hintmap.containsValue (value);
}, "~O");
Clazz.overrideMethod (c$, "get", 
function (key) {
return this.hintmap.get (key);
}, "~O");
Clazz.overrideMethod (c$, "put", 
function (key, value) {
if (!(key).isCompatibleValue (value)) {
throw  new IllegalArgumentException (value + " incompatible with " + key);
}return this.hintmap.put (key, value);
}, "~O,~O");
Clazz.defineMethod (c$, "add", 
function (hints) {
this.hintmap.putAll (hints.hintmap);
}, "jsjava.awt.RenderingHints");
Clazz.overrideMethod (c$, "clear", 
function () {
this.hintmap.clear ();
});
Clazz.overrideMethod (c$, "remove", 
function (key) {
return this.hintmap.remove (key);
}, "~O");
Clazz.overrideMethod (c$, "putAll", 
function (m) {
if (jsjava.awt.RenderingHints.isInstance (m)) {
for (var entry, $entry = m.entrySet ().iterator (); $entry.hasNext () && ((entry = $entry.next ()) || true);) this.hintmap.put (entry.getKey (), entry.getValue ());

} else {
for (var entry, $entry = m.entrySet ().iterator (); $entry.hasNext () && ((entry = $entry.next ()) || true);) this.put (entry.getKey (), entry.getValue ());

}}, "java.util.Map");
Clazz.overrideMethod (c$, "keySet", 
function () {
return this.hintmap.keySet ();
});
Clazz.overrideMethod (c$, "values", 
function () {
return this.hintmap.values ();
});
Clazz.overrideMethod (c$, "entrySet", 
function () {
return java.util.Collections.unmodifiableMap (this.hintmap).entrySet ();
});
Clazz.overrideMethod (c$, "equals", 
function (o) {
if (Clazz.instanceOf (o, jsjava.awt.RenderingHints)) {
return this.hintmap.equals ((o).hintmap);
} else if (Clazz.instanceOf (o, java.util.Map)) {
return this.hintmap.equals (o);
}return false;
}, "~O");
Clazz.overrideMethod (c$, "hashCode", 
function () {
return this.hintmap.hashCode ();
});
Clazz.defineMethod (c$, "clone", 
function () {
var rh;
try {
rh = Clazz.superCall (this, jsjava.awt.RenderingHints, "clone", []);
if (this.hintmap != null) {
rh.hintmap = this.hintmap.clone ();
}} catch (e) {
if (Clazz.exceptionOf (e, CloneNotSupportedException)) {
throw  new InternalError ();
} else {
throw e;
}
}
return rh;
});
Clazz.overrideMethod (c$, "toString", 
function () {
if (this.hintmap == null) {
return this.getClass ().getName () + "@" + Integer.toHexString (this.hashCode ()) + " (0 hints)";
}return this.hintmap.toString ();
});
Clazz.pu$h ();
c$ = Clazz.decorateAsClass (function () {
this.privatekey = 0;
Clazz.instantialize (this, arguments);
}, jsjava.awt.RenderingHints, "Key");
Clazz.defineMethod (c$, "getIdentity", 
($fz = function () {
return this.getClass ().getName () + "@" + Integer.toHexString (System.identityHashCode (this.getClass ())) + ":" + Integer.toHexString (this.privatekey);
}, $fz.isPrivate = true, $fz));
c$.recordIdentity = Clazz.defineMethod (c$, "recordIdentity", 
($fz = function (a) {
var b = a.getIdentity ();
var c = jsjava.awt.RenderingHints.Key.identitymap.get (b);
if (c != null) {
var d = (c).get ();
if (d != null && d.getClass () === a.getClass ()) {
throw  new IllegalArgumentException (b + " already registered");
}}jsjava.awt.RenderingHints.Key.identitymap.put (b,  new java.lang.ref.WeakReference (a));
}, $fz.isPrivate = true, $fz), "jsjava.awt.RenderingHints.Key");
Clazz.makeConstructor (c$, 
function (a) {
this.privatekey = a;
jsjava.awt.RenderingHints.Key.recordIdentity (this);
}, "~N");
Clazz.defineMethod (c$, "intKey", 
function () {
return this.privatekey;
});
Clazz.overrideMethod (c$, "equals", 
function (a) {
return this === a;
}, "~O");
c$.identitymap = c$.prototype.identitymap =  new java.util.HashMap (17);
c$ = Clazz.p0p ();
c$.KEY_ANTIALIASING = c$.prototype.KEY_ANTIALIASING = jssun.awt.SunHints.KEY_ANTIALIASING;
c$.VALUE_ANTIALIAS_ON = c$.prototype.VALUE_ANTIALIAS_ON = jssun.awt.SunHints.VALUE_ANTIALIAS_ON;
c$.VALUE_ANTIALIAS_OFF = c$.prototype.VALUE_ANTIALIAS_OFF = jssun.awt.SunHints.VALUE_ANTIALIAS_OFF;
c$.VALUE_ANTIALIAS_DEFAULT = c$.prototype.VALUE_ANTIALIAS_DEFAULT = jssun.awt.SunHints.VALUE_ANTIALIAS_DEFAULT;
c$.KEY_RENDERING = c$.prototype.KEY_RENDERING = jssun.awt.SunHints.KEY_RENDERING;
c$.VALUE_RENDER_SPEED = c$.prototype.VALUE_RENDER_SPEED = jssun.awt.SunHints.VALUE_RENDER_SPEED;
c$.VALUE_RENDER_QUALITY = c$.prototype.VALUE_RENDER_QUALITY = jssun.awt.SunHints.VALUE_RENDER_QUALITY;
c$.VALUE_RENDER_DEFAULT = c$.prototype.VALUE_RENDER_DEFAULT = jssun.awt.SunHints.VALUE_RENDER_DEFAULT;
c$.KEY_DITHERING = c$.prototype.KEY_DITHERING = jssun.awt.SunHints.KEY_DITHERING;
c$.VALUE_DITHER_DISABLE = c$.prototype.VALUE_DITHER_DISABLE = jssun.awt.SunHints.VALUE_DITHER_DISABLE;
c$.VALUE_DITHER_ENABLE = c$.prototype.VALUE_DITHER_ENABLE = jssun.awt.SunHints.VALUE_DITHER_ENABLE;
c$.VALUE_DITHER_DEFAULT = c$.prototype.VALUE_DITHER_DEFAULT = jssun.awt.SunHints.VALUE_DITHER_DEFAULT;
c$.KEY_TEXT_ANTIALIASING = c$.prototype.KEY_TEXT_ANTIALIASING = jssun.awt.SunHints.KEY_TEXT_ANTIALIASING;
c$.VALUE_TEXT_ANTIALIAS_ON = c$.prototype.VALUE_TEXT_ANTIALIAS_ON = jssun.awt.SunHints.VALUE_TEXT_ANTIALIAS_ON;
c$.VALUE_TEXT_ANTIALIAS_OFF = c$.prototype.VALUE_TEXT_ANTIALIAS_OFF = jssun.awt.SunHints.VALUE_TEXT_ANTIALIAS_OFF;
c$.VALUE_TEXT_ANTIALIAS_DEFAULT = c$.prototype.VALUE_TEXT_ANTIALIAS_DEFAULT = jssun.awt.SunHints.VALUE_TEXT_ANTIALIAS_DEFAULT;
c$.VALUE_TEXT_ANTIALIAS_GASP = c$.prototype.VALUE_TEXT_ANTIALIAS_GASP = jssun.awt.SunHints.VALUE_TEXT_ANTIALIAS_GASP;
c$.VALUE_TEXT_ANTIALIAS_LCD_HRGB = c$.prototype.VALUE_TEXT_ANTIALIAS_LCD_HRGB = jssun.awt.SunHints.VALUE_TEXT_ANTIALIAS_LCD_HRGB;
c$.VALUE_TEXT_ANTIALIAS_LCD_HBGR = c$.prototype.VALUE_TEXT_ANTIALIAS_LCD_HBGR = jssun.awt.SunHints.VALUE_TEXT_ANTIALIAS_LCD_HBGR;
c$.VALUE_TEXT_ANTIALIAS_LCD_VRGB = c$.prototype.VALUE_TEXT_ANTIALIAS_LCD_VRGB = jssun.awt.SunHints.VALUE_TEXT_ANTIALIAS_LCD_VRGB;
c$.VALUE_TEXT_ANTIALIAS_LCD_VBGR = c$.prototype.VALUE_TEXT_ANTIALIAS_LCD_VBGR = jssun.awt.SunHints.VALUE_TEXT_ANTIALIAS_LCD_VBGR;
c$.KEY_TEXT_LCD_CONTRAST = c$.prototype.KEY_TEXT_LCD_CONTRAST = jssun.awt.SunHints.KEY_TEXT_ANTIALIAS_LCD_CONTRAST;
c$.KEY_FRACTIONALMETRICS = c$.prototype.KEY_FRACTIONALMETRICS = jssun.awt.SunHints.KEY_FRACTIONALMETRICS;
c$.VALUE_FRACTIONALMETRICS_OFF = c$.prototype.VALUE_FRACTIONALMETRICS_OFF = jssun.awt.SunHints.VALUE_FRACTIONALMETRICS_OFF;
c$.VALUE_FRACTIONALMETRICS_ON = c$.prototype.VALUE_FRACTIONALMETRICS_ON = jssun.awt.SunHints.VALUE_FRACTIONALMETRICS_ON;
c$.VALUE_FRACTIONALMETRICS_DEFAULT = c$.prototype.VALUE_FRACTIONALMETRICS_DEFAULT = jssun.awt.SunHints.VALUE_FRACTIONALMETRICS_DEFAULT;
c$.KEY_INTERPOLATION = c$.prototype.KEY_INTERPOLATION = jssun.awt.SunHints.KEY_INTERPOLATION;
c$.VALUE_INTERPOLATION_NEAREST_NEIGHBOR = c$.prototype.VALUE_INTERPOLATION_NEAREST_NEIGHBOR = jssun.awt.SunHints.VALUE_INTERPOLATION_NEAREST_NEIGHBOR;
c$.VALUE_INTERPOLATION_BILINEAR = c$.prototype.VALUE_INTERPOLATION_BILINEAR = jssun.awt.SunHints.VALUE_INTERPOLATION_BILINEAR;
c$.VALUE_INTERPOLATION_BICUBIC = c$.prototype.VALUE_INTERPOLATION_BICUBIC = jssun.awt.SunHints.VALUE_INTERPOLATION_BICUBIC;
c$.KEY_ALPHA_INTERPOLATION = c$.prototype.KEY_ALPHA_INTERPOLATION = jssun.awt.SunHints.KEY_ALPHA_INTERPOLATION;
c$.VALUE_ALPHA_INTERPOLATION_SPEED = c$.prototype.VALUE_ALPHA_INTERPOLATION_SPEED = jssun.awt.SunHints.VALUE_ALPHA_INTERPOLATION_SPEED;
c$.VALUE_ALPHA_INTERPOLATION_QUALITY = c$.prototype.VALUE_ALPHA_INTERPOLATION_QUALITY = jssun.awt.SunHints.VALUE_ALPHA_INTERPOLATION_QUALITY;
c$.VALUE_ALPHA_INTERPOLATION_DEFAULT = c$.prototype.VALUE_ALPHA_INTERPOLATION_DEFAULT = jssun.awt.SunHints.VALUE_ALPHA_INTERPOLATION_DEFAULT;
c$.KEY_COLOR_RENDERING = c$.prototype.KEY_COLOR_RENDERING = jssun.awt.SunHints.KEY_COLOR_RENDERING;
c$.VALUE_COLOR_RENDER_SPEED = c$.prototype.VALUE_COLOR_RENDER_SPEED = jssun.awt.SunHints.VALUE_COLOR_RENDER_SPEED;
c$.VALUE_COLOR_RENDER_QUALITY = c$.prototype.VALUE_COLOR_RENDER_QUALITY = jssun.awt.SunHints.VALUE_COLOR_RENDER_QUALITY;
c$.VALUE_COLOR_RENDER_DEFAULT = c$.prototype.VALUE_COLOR_RENDER_DEFAULT = jssun.awt.SunHints.VALUE_COLOR_RENDER_DEFAULT;
c$.KEY_STROKE_CONTROL = c$.prototype.KEY_STROKE_CONTROL = jssun.awt.SunHints.KEY_STROKE_CONTROL;
c$.VALUE_STROKE_DEFAULT = c$.prototype.VALUE_STROKE_DEFAULT = jssun.awt.SunHints.VALUE_STROKE_DEFAULT;
c$.VALUE_STROKE_NORMALIZE = c$.prototype.VALUE_STROKE_NORMALIZE = jssun.awt.SunHints.VALUE_STROKE_NORMALIZE;
c$.VALUE_STROKE_PURE = c$.prototype.VALUE_STROKE_PURE = jssun.awt.SunHints.VALUE_STROKE_PURE;
});

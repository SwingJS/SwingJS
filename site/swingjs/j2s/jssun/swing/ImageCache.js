Clazz.declarePackage ("jssun.swing");
Clazz.load (null, "jssun.swing.ImageCache", ["java.lang.ref.SoftReference", "java.util.LinkedList"], function () {
c$ = Clazz.decorateAsClass (function () {
this.maxCount = 0;
this.entries = null;
Clazz.instantialize (this, arguments);
}, jssun.swing, "ImageCache");
Clazz.makeConstructor (c$, 
function (maxCount) {
this.maxCount = maxCount;
this.entries =  new java.util.LinkedList ();
}, "~N");
Clazz.defineMethod (c$, "setMaxCount", 
function (maxCount) {
this.maxCount = maxCount;
}, "~N");
Clazz.defineMethod (c$, "flush", 
function () {
this.entries.clear ();
});
Clazz.defineMethod (c$, "getEntry", 
($fz = function (key, config, w, h, args) {
var entry;
var iter = this.entries.listIterator ();
while (iter.hasNext ()) {
var ref = iter.next ();
entry = ref.get ();
if (entry == null) {
iter.remove ();
} else if (entry.equals (config, w, h, args)) {
iter.remove ();
this.entries.addFirst (ref);
return entry;
}}
entry =  new jssun.swing.ImageCache.Entry (config, w, h, args);
if (this.entries.size () >= this.maxCount) {
this.entries.removeLast ();
}this.entries.addFirst ( new java.lang.ref.SoftReference (entry));
return entry;
}, $fz.isPrivate = true, $fz), "~O,jsjava.awt.GraphicsConfiguration,~N,~N,~A");
Clazz.defineMethod (c$, "getImage", 
function (key, config, w, h, args) {
var entry = this.getEntry (key, config, w, h, args);
return entry.getImage ();
}, "~O,jsjava.awt.GraphicsConfiguration,~N,~N,~A");
Clazz.defineMethod (c$, "setImage", 
function (key, config, w, h, args, image) {
var entry = this.getEntry (key, config, w, h, args);
entry.setImage (image);
}, "~O,jsjava.awt.GraphicsConfiguration,~N,~N,~A,jsjava.awt.Image");
Clazz.pu$h ();
c$ = Clazz.decorateAsClass (function () {
this.config = null;
this.w = 0;
this.h = 0;
this.args = null;
this.image = null;
Clazz.instantialize (this, arguments);
}, jssun.swing.ImageCache, "Entry");
Clazz.makeConstructor (c$, 
function (a, b, c, d) {
this.config = a;
this.args = d;
this.w = b;
this.h = c;
}, "jsjava.awt.GraphicsConfiguration,~N,~N,~A");
Clazz.defineMethod (c$, "setImage", 
function (a) {
this.image = a;
}, "jsjava.awt.Image");
Clazz.defineMethod (c$, "getImage", 
function () {
return this.image;
});
Clazz.defineMethod (c$, "toString", 
function () {
var a = Clazz.superCall (this, jssun.swing.ImageCache.Entry, "toString", []) + "[ graphicsConfig=" + this.config + ", image=" + this.image + ", w=" + this.w + ", h=" + this.h;
if (this.args != null) {
for (var b = 0; b < this.args.length; b++) {
a += ", " + this.args[b];
}
}a += "]";
return a;
});
Clazz.defineMethod (c$, "equals", 
function (a, b, c, d) {
if (this.w == b && this.h == c && ((this.config != null && this.config.equals (a)) || (this.config == null && a == null))) {
if (this.args == null && d == null) {
return true;
}if (this.args != null && d != null && this.args.length == d.length) {
for (var e = d.length - 1; e >= 0; e--) {
var f = this.args[e];
var g = d[e];
if ((f == null && g != null) || (f != null && !f.equals (g))) {
return false;
}}
return true;
}}return false;
}, "jsjava.awt.GraphicsConfiguration,~N,~N,~A");
c$ = Clazz.p0p ();
});

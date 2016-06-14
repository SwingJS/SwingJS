Clazz.declarePackage ("jssun.java2d");
Clazz.load (["java.awt.Graphics2D"], "jssun.java2d.SunGraphics2D", ["java.awt.geom.AffineTransform"], function () {
c$ = Clazz.decorateAsClass (function () {
this.transformState = 0;
this.foregroundColor = null;
this.backgroundColor = null;
this.$transform = null;
this.transX = 0;
this.transY = 0;
this.hints = null;
Clazz.instantialize (this, arguments);
}, jssun.java2d, "SunGraphics2D", java.awt.Graphics2D);
Clazz.defineMethod (c$, "clone", 
function () {
return this.clone0 ();
});
Clazz.defineMethod (c$, "clone0", 
function () {
try {
var g;
{
g = Clazz.clone(this);
}g.$transform =  new java.awt.geom.AffineTransform (this.$transform);
if (this.hints != null) {
g.hints = this.hints.clone ();
}return g;
} catch (e) {
if (Clazz.exceptionOf (e, CloneNotSupportedException)) {
} else {
throw e;
}
}
return null;
});
Clazz.defineMethod (c$, "create", 
function () {
return this.clone0 ();
});
Clazz.defineStatics (c$,
"TRANSFORM_GENERIC", 4,
"TRANSFORM_TRANSLATESCALE", 3,
"TRANSFORM_ANY_TRANSLATE", 2,
"TRANSFORM_INT_TRANSLATE", 1,
"TRANSFORM_ISIDENT", 0);
});

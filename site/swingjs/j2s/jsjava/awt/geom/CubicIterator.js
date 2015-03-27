Clazz.declarePackage ("jsjava.awt.geom");
Clazz.load (["jsjava.awt.geom.PathIterator"], "jsjava.awt.geom.CubicIterator", ["java.util.NoSuchElementException"], function () {
c$ = Clazz.decorateAsClass (function () {
this.cubic = null;
this.affine = null;
this.index = 0;
Clazz.instantialize (this, arguments);
}, jsjava.awt.geom, "CubicIterator", null, jsjava.awt.geom.PathIterator);
Clazz.makeConstructor (c$, 
function (q, at) {
this.cubic = q;
this.affine = at;
}, "jsjava.awt.geom.CubicCurve2D,jsjava.awt.geom.AffineTransform");
Clazz.overrideMethod (c$, "getWindingRule", 
function () {
return 1;
});
Clazz.overrideMethod (c$, "isDone", 
function () {
return (this.index > 1);
});
Clazz.overrideMethod (c$, "next", 
function () {
this.index++;
});
Clazz.defineMethod (c$, "currentSegment", 
function (coords) {
if (this.isDone ()) {
throw  new java.util.NoSuchElementException ("cubic iterator iterator out of bounds");
}var type;
if (this.index == 0) {
coords[0] = this.cubic.getX1 ();
coords[1] = this.cubic.getY1 ();
type = 0;
} else {
coords[0] = this.cubic.getCtrlX1 ();
coords[1] = this.cubic.getCtrlY1 ();
coords[2] = this.cubic.getCtrlX2 ();
coords[3] = this.cubic.getCtrlY2 ();
coords[4] = this.cubic.getX2 ();
coords[5] = this.cubic.getY2 ();
type = 3;
}if (this.affine != null) {
this.affine.transform (coords, 0, coords, 0, this.index == 0 ? 1 : 3);
}return type;
}, "~A");
Clazz.defineMethod (c$, "currentSegment", 
function (coords) {
if (this.isDone ()) {
throw  new java.util.NoSuchElementException ("cubic iterator iterator out of bounds");
}var type;
if (this.index == 0) {
coords[0] = this.cubic.getX1 ();
coords[1] = this.cubic.getY1 ();
type = 0;
} else {
coords[0] = this.cubic.getCtrlX1 ();
coords[1] = this.cubic.getCtrlY1 ();
coords[2] = this.cubic.getCtrlX2 ();
coords[3] = this.cubic.getCtrlY2 ();
coords[4] = this.cubic.getX2 ();
coords[5] = this.cubic.getY2 ();
type = 3;
}if (this.affine != null) {
this.affine.transform (coords, 0, coords, 0, this.index == 0 ? 1 : 3);
}return type;
}, "~A");
});

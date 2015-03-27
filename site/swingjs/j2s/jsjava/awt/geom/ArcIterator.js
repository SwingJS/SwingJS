Clazz.declarePackage ("jsjava.awt.geom");
Clazz.load (["jsjava.awt.geom.PathIterator"], "jsjava.awt.geom.ArcIterator", ["java.util.NoSuchElementException"], function () {
c$ = Clazz.decorateAsClass (function () {
this.x = 0;
this.y = 0;
this.w = 0;
this.h = 0;
this.angStRad = 0;
this.increment = 0;
this.cv = 0;
this.affine = null;
this.index = 0;
this.arcSegs = 0;
this.lineSegs = 0;
Clazz.instantialize (this, arguments);
}, jsjava.awt.geom, "ArcIterator", null, jsjava.awt.geom.PathIterator);
Clazz.makeConstructor (c$, 
function (a, at) {
this.w = a.getWidth () / 2;
this.h = a.getHeight () / 2;
this.x = a.getX () + this.w;
this.y = a.getY () + this.h;
this.angStRad = -Math.toRadians (a.getAngleStart ());
this.affine = at;
var ext = -a.getAngleExtent ();
if (ext >= 360.0 || ext <= -360) {
this.arcSegs = 4;
this.increment = 1.5707963267948966;
this.cv = 0.5522847498307933;
if (ext < 0) {
this.increment = -this.increment;
this.cv = -this.cv;
}} else {
this.arcSegs = Clazz.doubleToInt (Math.ceil (Math.abs (ext) / 90.0));
this.increment = Math.toRadians (ext / this.arcSegs);
this.cv = jsjava.awt.geom.ArcIterator.btan (this.increment);
if (this.cv == 0) {
this.arcSegs = 0;
}}switch (a.getArcType ()) {
case 0:
this.lineSegs = 0;
break;
case 1:
this.lineSegs = 1;
break;
case 2:
this.lineSegs = 2;
break;
}
if (this.w < 0 || this.h < 0) {
this.arcSegs = this.lineSegs = -1;
}}, "jsjava.awt.geom.Arc2D,jsjava.awt.geom.AffineTransform");
Clazz.overrideMethod (c$, "getWindingRule", 
function () {
return 1;
});
Clazz.overrideMethod (c$, "isDone", 
function () {
return this.index > this.arcSegs + this.lineSegs;
});
Clazz.overrideMethod (c$, "next", 
function () {
this.index++;
});
c$.btan = Clazz.defineMethod (c$, "btan", 
($fz = function (increment) {
increment /= 2.0;
return 1.3333333333333333 * Math.sin (increment) / (1.0 + Math.cos (increment));
}, $fz.isPrivate = true, $fz), "~N");
Clazz.defineMethod (c$, "currentSegment", 
function (coords) {
if (this.isDone ()) {
throw  new java.util.NoSuchElementException ("arc iterator out of bounds");
}var angle = this.angStRad;
if (this.index == 0) {
coords[0] = (this.x + Math.cos (angle) * this.w);
coords[1] = (this.y + Math.sin (angle) * this.h);
if (this.affine != null) {
this.affine.transform (coords, 0, coords, 0, 1);
}return 0;
}if (this.index > this.arcSegs) {
if (this.index == this.arcSegs + this.lineSegs) {
return 4;
}coords[0] = this.x;
coords[1] = this.y;
if (this.affine != null) {
this.affine.transform (coords, 0, coords, 0, 1);
}return 1;
}angle += this.increment * (this.index - 1);
var relx = Math.cos (angle);
var rely = Math.sin (angle);
coords[0] = (this.x + (relx - this.cv * rely) * this.w);
coords[1] = (this.y + (rely + this.cv * relx) * this.h);
angle += this.increment;
relx = Math.cos (angle);
rely = Math.sin (angle);
coords[2] = (this.x + (relx + this.cv * rely) * this.w);
coords[3] = (this.y + (rely - this.cv * relx) * this.h);
coords[4] = (this.x + relx * this.w);
coords[5] = (this.y + rely * this.h);
if (this.affine != null) {
this.affine.transform (coords, 0, coords, 0, 3);
}return 3;
}, "~A");
Clazz.defineMethod (c$, "currentSegment", 
function (coords) {
if (this.isDone ()) {
throw  new java.util.NoSuchElementException ("arc iterator out of bounds");
}var angle = this.angStRad;
if (this.index == 0) {
coords[0] = this.x + Math.cos (angle) * this.w;
coords[1] = this.y + Math.sin (angle) * this.h;
if (this.affine != null) {
this.affine.transform (coords, 0, coords, 0, 1);
}return 0;
}if (this.index > this.arcSegs) {
if (this.index == this.arcSegs + this.lineSegs) {
return 4;
}coords[0] = this.x;
coords[1] = this.y;
if (this.affine != null) {
this.affine.transform (coords, 0, coords, 0, 1);
}return 1;
}angle += this.increment * (this.index - 1);
var relx = Math.cos (angle);
var rely = Math.sin (angle);
coords[0] = this.x + (relx - this.cv * rely) * this.w;
coords[1] = this.y + (rely + this.cv * relx) * this.h;
angle += this.increment;
relx = Math.cos (angle);
rely = Math.sin (angle);
coords[2] = this.x + (relx + this.cv * rely) * this.w;
coords[3] = this.y + (rely - this.cv * relx) * this.h;
coords[4] = this.x + relx * this.w;
coords[5] = this.y + rely * this.h;
if (this.affine != null) {
this.affine.transform (coords, 0, coords, 0, 3);
}return 3;
}, "~A");
});

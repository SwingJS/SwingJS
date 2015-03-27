Clazz.declarePackage ("jsjava.awt.geom");
Clazz.load (["jsjava.awt.Shape"], "jsjava.awt.geom.RectangularShape", ["java.lang.InternalError", "jsjava.awt.geom.FlatteningPathIterator"], function () {
c$ = Clazz.declareType (jsjava.awt.geom, "RectangularShape", null, [jsjava.awt.Shape, Cloneable]);
Clazz.makeConstructor (c$, 
function () {
});
Clazz.defineMethod (c$, "getMinX", 
function () {
return this.getX ();
});
Clazz.defineMethod (c$, "getMinY", 
function () {
return this.getY ();
});
Clazz.defineMethod (c$, "getMaxX", 
function () {
return this.getX () + this.getWidth ();
});
Clazz.defineMethod (c$, "getMaxY", 
function () {
return this.getY () + this.getHeight ();
});
Clazz.defineMethod (c$, "getCenterX", 
function () {
return this.getX () + this.getWidth () / 2.0;
});
Clazz.defineMethod (c$, "getCenterY", 
function () {
return this.getY () + this.getHeight () / 2.0;
});
Clazz.defineMethod (c$, "getFrame", 
function () {
return  new jsjava.awt.geom.Rectangle2D.Double (this.getX (), this.getY (), this.getWidth (), this.getHeight ());
});
Clazz.defineMethod (c$, "setFrame", 
function (loc, size) {
this.setFrame (loc.getX (), loc.getY (), size.getWidth (), size.getHeight ());
}, "jsjava.awt.geom.Point2D,jsjava.awt.geom.Dimension2D");
Clazz.defineMethod (c$, "setFrame", 
function (r) {
this.setFrame (r.getX (), r.getY (), r.getWidth (), r.getHeight ());
}, "jsjava.awt.geom.Rectangle2D");
Clazz.defineMethod (c$, "setFrameFromDiagonal", 
function (x1, y1, x2, y2) {
if (x2 < x1) {
var t = x1;
x1 = x2;
x2 = t;
}if (y2 < y1) {
var t = y1;
y1 = y2;
y2 = t;
}this.setFrame (x1, y1, x2 - x1, y2 - y1);
}, "~N,~N,~N,~N");
Clazz.defineMethod (c$, "setFrameFromDiagonal", 
function (p1, p2) {
this.setFrameFromDiagonal (p1.getX (), p1.getY (), p2.getX (), p2.getY ());
}, "jsjava.awt.geom.Point2D,jsjava.awt.geom.Point2D");
Clazz.defineMethod (c$, "setFrameFromCenter", 
function (centerX, centerY, cornerX, cornerY) {
var halfW = Math.abs (cornerX - centerX);
var halfH = Math.abs (cornerY - centerY);
this.setFrame (centerX - halfW, centerY - halfH, halfW * 2.0, halfH * 2.0);
}, "~N,~N,~N,~N");
Clazz.defineMethod (c$, "setFrameFromCenter", 
function (center, corner) {
this.setFrameFromCenter (center.getX (), center.getY (), corner.getX (), corner.getY ());
}, "jsjava.awt.geom.Point2D,jsjava.awt.geom.Point2D");
Clazz.defineMethod (c$, "contains", 
function (p) {
return this.contains (p.getX (), p.getY ());
}, "jsjava.awt.geom.Point2D");
Clazz.overrideMethod (c$, "intersects", 
function (r) {
return this.intersects (r.getX (), r.getY (), r.getWidth (), r.getHeight ());
}, "jsjava.awt.geom.Rectangle2D");
Clazz.defineMethod (c$, "contains", 
function (r) {
return this.contains (r.getX (), r.getY (), r.getWidth (), r.getHeight ());
}, "jsjava.awt.geom.Rectangle2D");
Clazz.overrideMethod (c$, "getBounds", 
function () {
var width = this.getWidth ();
var height = this.getHeight ();
if (width < 0 || height < 0) {
return  new jsjava.awt.Rectangle ();
}var x = this.getX ();
var y = this.getY ();
var x1 = Math.floor (x);
var y1 = Math.floor (y);
var x2 = Math.ceil (x + width);
var y2 = Math.ceil (y + height);
return  new jsjava.awt.Rectangle (Clazz.doubleToInt (x1), Clazz.doubleToInt (y1), Clazz.doubleToInt (x2 - x1), Clazz.doubleToInt (y2 - y1));
});
Clazz.overrideMethod (c$, "getPathIterator", 
function (at, flatness) {
return  new jsjava.awt.geom.FlatteningPathIterator (this.getPathIterator (at), flatness);
}, "jsjava.awt.geom.AffineTransform,~N");
Clazz.defineMethod (c$, "clone", 
function () {
try {
return Clazz.superCall (this, jsjava.awt.geom.RectangularShape, "clone", []);
} catch (e) {
if (Clazz.exceptionOf (e, CloneNotSupportedException)) {
throw  new InternalError ();
} else {
throw e;
}
}
});
});

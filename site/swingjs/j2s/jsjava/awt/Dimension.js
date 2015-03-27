Clazz.declarePackage ("jsjava.awt");
Clazz.load (["jsjava.awt.geom.Dimension2D"], "jsjava.awt.Dimension", null, function () {
c$ = Clazz.decorateAsClass (function () {
this.width = 0;
this.height = 0;
Clazz.instantialize (this, arguments);
}, jsjava.awt, "Dimension", jsjava.awt.geom.Dimension2D);
Clazz.makeConstructor (c$, 
function () {
this.construct (0, 0);
});
Clazz.makeConstructor (c$, 
function (d) {
this.construct (d.width, d.height);
}, "jsjava.awt.Dimension");
Clazz.makeConstructor (c$, 
function (width, height) {
Clazz.superConstructor (this, jsjava.awt.Dimension, []);
this.width = width;
this.height = height;
}, "~N,~N");
Clazz.overrideMethod (c$, "getWidth", 
function () {
return this.width;
});
Clazz.overrideMethod (c$, "getHeight", 
function () {
return this.height;
});
Clazz.defineMethod (c$, "setSize", 
function (width, height) {
this.width = Clazz.doubleToInt (Math.ceil (width));
this.height = Clazz.doubleToInt (Math.ceil (height));
}, "~N,~N");
Clazz.defineMethod (c$, "getSize", 
function () {
return  new jsjava.awt.Dimension (this.width, this.height);
});
Clazz.defineMethod (c$, "setSize", 
function (d) {
this.setSize (d.width, d.height);
}, "jsjava.awt.Dimension");
Clazz.defineMethod (c$, "setSize", 
function (width, height) {
this.width = width;
this.height = height;
}, "~N,~N");
Clazz.overrideMethod (c$, "equals", 
function (obj) {
if (Clazz.instanceOf (obj, jsjava.awt.Dimension)) {
var d = obj;
return (this.width == d.width) && (this.height == d.height);
}return false;
}, "~O");
Clazz.overrideMethod (c$, "hashCode", 
function () {
var sum = this.width + this.height;
return Clazz.doubleToInt (sum * (sum + 1) / 2) + this.width;
});
Clazz.overrideMethod (c$, "toString", 
function () {
return this.getClass ().getName () + "[width=" + this.width + ",height=" + this.height + "]";
});
});

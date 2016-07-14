Clazz.declarePackage ("javax.swing.border");
Clazz.load (["javax.swing.border.AbstractBorder"], "javax.swing.border.EmptyBorder", ["java.awt.Insets"], function () {
c$ = Clazz.decorateAsClass (function () {
this.left = 0;
this.right = 0;
this.top = 0;
this.bottom = 0;
Clazz.instantialize (this, arguments);
}, javax.swing.border, "EmptyBorder", javax.swing.border.AbstractBorder);
Clazz.makeConstructor (c$, 
function (top, left, bottom, right) {
Clazz.superConstructor (this, javax.swing.border.EmptyBorder, []);
this.top = top;
this.right = right;
this.bottom = bottom;
this.left = left;
}, "~N,~N,~N,~N");
Clazz.makeConstructor (c$, 
function (borderInsets) {
Clazz.superConstructor (this, javax.swing.border.EmptyBorder, []);
this.top = borderInsets.top;
this.right = borderInsets.right;
this.bottom = borderInsets.bottom;
this.left = borderInsets.left;
}, "java.awt.Insets");
Clazz.overrideMethod (c$, "paintBorder", 
function (c, g, x, y, width, height) {
}, "java.awt.Component,java.awt.Graphics,~N,~N,~N,~N");
Clazz.defineMethod (c$, "getBorderInsets", 
function (c) {
return this.getBorderInsets ();
}, "java.awt.Component");
Clazz.defineMethod (c$, "getBorderInsets", 
function (c, insets) {
insets.left = this.left;
insets.top = this.top;
insets.right = this.right;
insets.bottom = this.bottom;
return insets;
}, "java.awt.Component,java.awt.Insets");
Clazz.defineMethod (c$, "getBorderInsets", 
function () {
return  new java.awt.Insets (this.top, this.left, this.bottom, this.right);
});
Clazz.overrideMethod (c$, "isBorderOpaque", 
function () {
return false;
});
});

Clazz.declarePackage ("jsjavax.swing.border");
Clazz.load (["jsjavax.swing.border.AbstractBorder"], "jsjavax.swing.border.EmptyBorder", ["jsjava.awt.Insets"], function () {
c$ = Clazz.decorateAsClass (function () {
this.left = 0;
this.right = 0;
this.top = 0;
this.bottom = 0;
Clazz.instantialize (this, arguments);
}, jsjavax.swing.border, "EmptyBorder", jsjavax.swing.border.AbstractBorder);
Clazz.makeConstructor (c$, 
function (top, left, bottom, right) {
Clazz.superConstructor (this, jsjavax.swing.border.EmptyBorder, []);
this.top = top;
this.right = right;
this.bottom = bottom;
this.left = left;
}, "~N,~N,~N,~N");
Clazz.makeConstructor (c$, 
function (borderInsets) {
Clazz.superConstructor (this, jsjavax.swing.border.EmptyBorder, []);
this.top = borderInsets.top;
this.right = borderInsets.right;
this.bottom = borderInsets.bottom;
this.left = borderInsets.left;
}, "jsjava.awt.Insets");
Clazz.overrideMethod (c$, "paintBorder", 
function (c, g, x, y, width, height) {
}, "jsjava.awt.Component,jsjava.awt.Graphics,~N,~N,~N,~N");
Clazz.defineMethod (c$, "getBorderInsets", 
function (c) {
return this.getBorderInsets ();
}, "jsjava.awt.Component");
Clazz.defineMethod (c$, "getBorderInsets", 
function (c, insets) {
insets.left = this.left;
insets.top = this.top;
insets.right = this.right;
insets.bottom = this.bottom;
return insets;
}, "jsjava.awt.Component,jsjava.awt.Insets");
Clazz.defineMethod (c$, "getBorderInsets", 
function () {
return  new jsjava.awt.Insets (this.top, this.left, this.bottom, this.right);
});
Clazz.overrideMethod (c$, "isBorderOpaque", 
function () {
return false;
});
});

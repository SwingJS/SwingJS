Clazz.declarePackage ("jsjavax.swing.border");
Clazz.load (["jsjavax.swing.border.AbstractBorder"], "jsjavax.swing.border.CompoundBorder", ["jsjava.awt.Insets"], function () {
c$ = Clazz.decorateAsClass (function () {
this.outsideBorder = null;
this.insideBorder = null;
Clazz.instantialize (this, arguments);
}, jsjavax.swing.border, "CompoundBorder", jsjavax.swing.border.AbstractBorder);
Clazz.makeConstructor (c$, 
function () {
Clazz.superConstructor (this, jsjavax.swing.border.CompoundBorder, []);
this.outsideBorder = null;
this.insideBorder = null;
});
Clazz.makeConstructor (c$, 
function (outsideBorder, insideBorder) {
Clazz.superConstructor (this, jsjavax.swing.border.CompoundBorder, []);
this.outsideBorder = outsideBorder;
this.insideBorder = insideBorder;
}, "jsjavax.swing.border.Border,jsjavax.swing.border.Border");
Clazz.overrideMethod (c$, "isBorderOpaque", 
function () {
return (this.outsideBorder == null || this.outsideBorder.isBorderOpaque ()) && (this.insideBorder == null || this.insideBorder.isBorderOpaque ());
});
Clazz.overrideMethod (c$, "paintBorder", 
function (c, g, x, y, width, height) {
var nextInsets;
var px;
var py;
var pw;
var ph;
px = x;
py = y;
pw = width;
ph = height;
if (this.outsideBorder != null) {
this.outsideBorder.paintBorder (c, g, px, py, pw, ph);
nextInsets = this.outsideBorder.getBorderInsets (c);
px += nextInsets.left;
py += nextInsets.top;
pw = pw - nextInsets.right - nextInsets.left;
ph = ph - nextInsets.bottom - nextInsets.top;
}if (this.insideBorder != null) this.insideBorder.paintBorder (c, g, px, py, pw, ph);
}, "jsjava.awt.Component,jsjava.awt.Graphics,~N,~N,~N,~N");
Clazz.defineMethod (c$, "getBorderInsets", 
function (c, insets) {
var nextInsets;
insets.top = insets.left = insets.right = insets.bottom = 0;
if (this.outsideBorder != null) {
nextInsets = this.outsideBorder.getBorderInsets (c);
insets.top += nextInsets.top;
insets.left += nextInsets.left;
insets.right += nextInsets.right;
insets.bottom += nextInsets.bottom;
}if (this.insideBorder != null) {
nextInsets = this.insideBorder.getBorderInsets (c);
insets.top += nextInsets.top;
insets.left += nextInsets.left;
insets.right += nextInsets.right;
insets.bottom += nextInsets.bottom;
}return insets;
}, "jsjava.awt.Component,jsjava.awt.Insets");
Clazz.defineMethod (c$, "getBorderInsets", 
function (c) {
return this.getBorderInsets (c,  new jsjava.awt.Insets (0, 0, 0, 0));
}, "jsjava.awt.Component");
Clazz.defineMethod (c$, "getOutsideBorder", 
function () {
return this.outsideBorder;
});
Clazz.defineMethod (c$, "getInsideBorder", 
function () {
return this.insideBorder;
});
});

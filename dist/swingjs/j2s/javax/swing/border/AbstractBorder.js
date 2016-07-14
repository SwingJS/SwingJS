Clazz.declarePackage ("javax.swing.border");
Clazz.load (["javax.swing.border.Border"], "javax.swing.border.AbstractBorder", ["java.lang.IllegalArgumentException", "$.NullPointerException", "java.awt.Component", "$.Insets", "$.Rectangle"], function () {
c$ = Clazz.declareType (javax.swing.border, "AbstractBorder", null, javax.swing.border.Border);
Clazz.overrideMethod (c$, "paintBorder", 
function (c, g, x, y, width, height) {
}, "java.awt.Component,java.awt.Graphics,~N,~N,~N,~N");
Clazz.defineMethod (c$, "getBorderInsets", 
function (c) {
return  new java.awt.Insets (0, 0, 0, 0);
}, "java.awt.Component");
Clazz.defineMethod (c$, "getBorderInsets", 
function (c, insets) {
insets.left = insets.top = insets.right = insets.bottom = 0;
return insets;
}, "java.awt.Component,java.awt.Insets");
Clazz.overrideMethod (c$, "isBorderOpaque", 
function () {
return false;
});
Clazz.defineMethod (c$, "getInteriorRectangle", 
function (c, x, y, width, height) {
return javax.swing.border.AbstractBorder.getInteriorRectangle (c, this, x, y, width, height);
}, "java.awt.Component,~N,~N,~N,~N");
c$.getInteriorRectangle = Clazz.defineMethod (c$, "getInteriorRectangle", 
function (c, b, x, y, width, height) {
var insets;
if (b != null) insets = b.getBorderInsets (c);
 else insets =  new java.awt.Insets (0, 0, 0, 0);
return  new java.awt.Rectangle (x + insets.left, y + insets.top, width - insets.right - insets.left, height - insets.top - insets.bottom);
}, "java.awt.Component,javax.swing.border.Border,~N,~N,~N,~N");
Clazz.defineMethod (c$, "getBaseline", 
function (c, width, height) {
if (width < 0 || height < 0) {
throw  new IllegalArgumentException ("Width and height must be >= 0");
}return -1;
}, "java.awt.Component,~N,~N");
Clazz.defineMethod (c$, "getBaselineResizeBehavior", 
function (c) {
if (c == null) {
throw  new NullPointerException ("Component must be non-null");
}return java.awt.Component.BaselineResizeBehavior.OTHER;
}, "java.awt.Component");
c$.isLeftToRight = Clazz.defineMethod (c$, "isLeftToRight", 
function (c) {
return c.getComponentOrientation ().isLeftToRight ();
}, "java.awt.Component");
});

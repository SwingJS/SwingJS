Clazz.declarePackage ("jsjavax.swing.border");
Clazz.load (["jsjavax.swing.border.Border"], "jsjavax.swing.border.AbstractBorder", ["java.lang.IllegalArgumentException", "$.NullPointerException", "jsjava.awt.Component", "$.Insets", "$.Rectangle"], function () {
c$ = Clazz.declareType (jsjavax.swing.border, "AbstractBorder", null, jsjavax.swing.border.Border);
Clazz.overrideMethod (c$, "paintBorder", 
function (c, g, x, y, width, height) {
}, "jsjava.awt.Component,jsjava.awt.Graphics,~N,~N,~N,~N");
Clazz.defineMethod (c$, "getBorderInsets", 
function (c) {
return  new jsjava.awt.Insets (0, 0, 0, 0);
}, "jsjava.awt.Component");
Clazz.defineMethod (c$, "getBorderInsets", 
function (c, insets) {
insets.left = insets.top = insets.right = insets.bottom = 0;
return insets;
}, "jsjava.awt.Component,jsjava.awt.Insets");
Clazz.overrideMethod (c$, "isBorderOpaque", 
function () {
return false;
});
Clazz.defineMethod (c$, "getInteriorRectangle", 
function (c, x, y, width, height) {
return jsjavax.swing.border.AbstractBorder.getInteriorRectangle (c, this, x, y, width, height);
}, "jsjava.awt.Component,~N,~N,~N,~N");
c$.getInteriorRectangle = Clazz.defineMethod (c$, "getInteriorRectangle", 
function (c, b, x, y, width, height) {
var insets;
if (b != null) insets = b.getBorderInsets (c);
 else insets =  new jsjava.awt.Insets (0, 0, 0, 0);
return  new jsjava.awt.Rectangle (x + insets.left, y + insets.top, width - insets.right - insets.left, height - insets.top - insets.bottom);
}, "jsjava.awt.Component,jsjavax.swing.border.Border,~N,~N,~N,~N");
Clazz.defineMethod (c$, "getBaseline", 
function (c, width, height) {
if (width < 0 || height < 0) {
throw  new IllegalArgumentException ("Width and height must be >= 0");
}return -1;
}, "jsjava.awt.Component,~N,~N");
Clazz.defineMethod (c$, "getBaselineResizeBehavior", 
function (c) {
if (c == null) {
throw  new NullPointerException ("Component must be non-null");
}return jsjava.awt.Component.BaselineResizeBehavior.OTHER;
}, "jsjava.awt.Component");
c$.isLeftToRight = Clazz.defineMethod (c$, "isLeftToRight", 
function (c) {
return c.getComponentOrientation ().isLeftToRight ();
}, "jsjava.awt.Component");
});

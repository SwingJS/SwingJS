Clazz.declarePackage ("javax.swing.border");
Clazz.load (["javax.swing.border.AbstractBorder"], "javax.swing.border.LineBorder", ["java.awt.Color", "$.Graphics2D", "$.Insets", "java.awt.geom.Path2D", "$.Rectangle2D", "$.RoundRectangle2D"], function () {
c$ = Clazz.decorateAsClass (function () {
this.thickness = 0;
this.lineColor = null;
this.roundedCorners = false;
Clazz.instantialize (this, arguments);
}, javax.swing.border, "LineBorder", javax.swing.border.AbstractBorder);
c$.createBlackLineBorder = Clazz.defineMethod (c$, "createBlackLineBorder", 
function () {
if (javax.swing.border.LineBorder.blackLine == null) {
javax.swing.border.LineBorder.blackLine =  new javax.swing.border.LineBorder (java.awt.Color.black, 1);
}return javax.swing.border.LineBorder.blackLine;
});
c$.createGrayLineBorder = Clazz.defineMethod (c$, "createGrayLineBorder", 
function () {
if (javax.swing.border.LineBorder.grayLine == null) {
javax.swing.border.LineBorder.grayLine =  new javax.swing.border.LineBorder (java.awt.Color.gray, 1);
}return javax.swing.border.LineBorder.grayLine;
});
Clazz.makeConstructor (c$, 
function (color) {
this.construct (color, 1, false);
}, "java.awt.Color");
Clazz.makeConstructor (c$, 
function (color, thickness) {
this.construct (color, thickness, false);
}, "java.awt.Color,~N");
Clazz.makeConstructor (c$, 
function (color, thickness, roundedCorners) {
Clazz.superConstructor (this, javax.swing.border.LineBorder, []);
this.lineColor = color;
this.thickness = thickness;
this.roundedCorners = roundedCorners;
}, "java.awt.Color,~N,~B");
Clazz.overrideMethod (c$, "paintBorder", 
function (c, g, x, y, width, height) {
if ((this.thickness > 0) && (Clazz.instanceOf (g, java.awt.Graphics2D))) {
var g2d = g;
var oldColor = g2d.getColor ();
g2d.setColor (this.lineColor);
var outer;
var inner;
var offs = this.thickness;
var size = offs + offs;
if (this.roundedCorners) {
var arc = offs + size;
outer =  new java.awt.geom.RoundRectangle2D.Float (x, y, width, height, arc, arc);
inner =  new java.awt.geom.RoundRectangle2D.Float (x + offs, y + offs, width - size, height - size, arc, arc);
} else {
outer =  new java.awt.geom.Rectangle2D.Float (x, y, width, height);
inner =  new java.awt.geom.Rectangle2D.Float (x + offs, y + offs, width - size, height - size);
}var path =  new java.awt.geom.Path2D.Float (0);
path.append (outer, false);
path.append (inner, false);
g2d.fill (path);
g2d.setColor (oldColor);
}}, "java.awt.Component,java.awt.Graphics,~N,~N,~N,~N");
Clazz.defineMethod (c$, "getBorderInsets", 
function (c) {
return  new java.awt.Insets (this.thickness, this.thickness, this.thickness, this.thickness);
}, "java.awt.Component");
Clazz.defineMethod (c$, "getBorderInsets", 
function (c, insets) {
insets.left = insets.top = insets.right = insets.bottom = this.thickness;
return insets;
}, "java.awt.Component,java.awt.Insets");
Clazz.defineMethod (c$, "getLineColor", 
function () {
return this.lineColor;
});
Clazz.defineMethod (c$, "getThickness", 
function () {
return this.thickness;
});
Clazz.defineMethod (c$, "getRoundedCorners", 
function () {
return this.roundedCorners;
});
Clazz.overrideMethod (c$, "isBorderOpaque", 
function () {
return !this.roundedCorners;
});
Clazz.defineStatics (c$,
"blackLine", null,
"grayLine", null);
});

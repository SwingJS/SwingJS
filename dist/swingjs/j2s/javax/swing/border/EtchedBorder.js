Clazz.declarePackage ("javax.swing.border");
Clazz.load (["javax.swing.border.AbstractBorder"], "javax.swing.border.EtchedBorder", ["java.awt.Insets"], function () {
c$ = Clazz.decorateAsClass (function () {
this.etchType = 0;
this.highlight = null;
this.shadow = null;
Clazz.instantialize (this, arguments);
}, javax.swing.border, "EtchedBorder", javax.swing.border.AbstractBorder);
Clazz.makeConstructor (c$, 
function () {
this.construct (1);
});
Clazz.makeConstructor (c$, 
function (etchType) {
this.construct (etchType, null, null);
}, "~N");
Clazz.makeConstructor (c$, 
function (highlight, shadow) {
this.construct (1, highlight, shadow);
}, "java.awt.Color,java.awt.Color");
Clazz.makeConstructor (c$, 
function (etchType, highlight, shadow) {
Clazz.superConstructor (this, javax.swing.border.EtchedBorder, []);
this.etchType = etchType;
this.highlight = highlight;
this.shadow = shadow;
}, "~N,java.awt.Color,java.awt.Color");
Clazz.overrideMethod (c$, "paintBorder", 
function (c, g, x, y, width, height) {
var w = width;
var h = height;
g.translate (x, y);
g.setColor (this.etchType == 1 ? this.getShadowColor (c) : this.getHighlightColor (c));
g.drawRect (0, 0, w - 2, h - 2);
g.setColor (this.etchType == 1 ? this.getHighlightColor (c) : this.getShadowColor (c));
g.drawLine (1, h - 3, 1, 1);
g.drawLine (1, 1, w - 3, 1);
g.drawLine (0, h - 1, w - 1, h - 1);
g.drawLine (w - 1, h - 1, w - 1, 0);
g.translate (-x, -y);
}, "java.awt.Component,java.awt.Graphics,~N,~N,~N,~N");
Clazz.defineMethod (c$, "getBorderInsets", 
function (c) {
return  new java.awt.Insets (2, 2, 2, 2);
}, "java.awt.Component");
Clazz.defineMethod (c$, "getBorderInsets", 
function (c, insets) {
insets.left = insets.top = insets.right = insets.bottom = 2;
return insets;
}, "java.awt.Component,java.awt.Insets");
Clazz.overrideMethod (c$, "isBorderOpaque", 
function () {
return true;
});
Clazz.defineMethod (c$, "getEtchType", 
function () {
return this.etchType;
});
Clazz.defineMethod (c$, "getHighlightColor", 
function (c) {
return this.highlight != null ? this.highlight : c.getBackground ().brighter ();
}, "java.awt.Component");
Clazz.defineMethod (c$, "getHighlightColor", 
function () {
return this.highlight;
});
Clazz.defineMethod (c$, "getShadowColor", 
function (c) {
return this.shadow != null ? this.shadow : c.getBackground ().darker ();
}, "java.awt.Component");
Clazz.defineMethod (c$, "getShadowColor", 
function () {
return this.shadow;
});
Clazz.defineStatics (c$,
"RAISED", 0,
"LOWERED", 1);
});

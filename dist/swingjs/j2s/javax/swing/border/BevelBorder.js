Clazz.declarePackage ("javax.swing.border");
Clazz.load (["javax.swing.border.AbstractBorder"], "javax.swing.border.BevelBorder", ["java.awt.Insets"], function () {
c$ = Clazz.decorateAsClass (function () {
this.bevelType = 0;
this.highlightOuter = null;
this.highlightInner = null;
this.shadowInner = null;
this.shadowOuter = null;
Clazz.instantialize (this, arguments);
}, javax.swing.border, "BevelBorder", javax.swing.border.AbstractBorder);
Clazz.makeConstructor (c$, 
function (bevelType) {
Clazz.superConstructor (this, javax.swing.border.BevelBorder, []);
this.bevelType = bevelType;
}, "~N");
Clazz.makeConstructor (c$, 
function (bevelType, highlight, shadow) {
this.construct (bevelType, highlight.brighter (), highlight, shadow, shadow.brighter ());
}, "~N,java.awt.Color,java.awt.Color");
Clazz.makeConstructor (c$, 
function (bevelType, highlightOuterColor, highlightInnerColor, shadowOuterColor, shadowInnerColor) {
this.construct (bevelType);
this.highlightOuter = highlightOuterColor;
this.highlightInner = highlightInnerColor;
this.shadowOuter = shadowOuterColor;
this.shadowInner = shadowInnerColor;
}, "~N,java.awt.Color,java.awt.Color,java.awt.Color,java.awt.Color");
Clazz.overrideMethod (c$, "paintBorder", 
function (c, g, x, y, width, height) {
if (this.bevelType == 0) {
this.paintRaisedBevel (c, g, x, y, width, height);
} else if (this.bevelType == 1) {
this.paintLoweredBevel (c, g, x, y, width, height);
}}, "java.awt.Component,java.awt.Graphics,~N,~N,~N,~N");
Clazz.defineMethod (c$, "getBorderInsets", 
function (c) {
return  new java.awt.Insets (2, 2, 2, 2);
}, "java.awt.Component");
Clazz.defineMethod (c$, "getBorderInsets", 
function (c, insets) {
insets.left = insets.top = insets.right = insets.bottom = 2;
return insets;
}, "java.awt.Component,java.awt.Insets");
Clazz.defineMethod (c$, "getHighlightOuterColor", 
function (c) {
var highlight = this.getHighlightOuterColor ();
return highlight != null ? highlight : c.getBackground ().brighter ().brighter ();
}, "java.awt.Component");
Clazz.defineMethod (c$, "getHighlightInnerColor", 
function (c) {
var highlight = this.getHighlightInnerColor ();
return highlight != null ? highlight : c.getBackground ().brighter ();
}, "java.awt.Component");
Clazz.defineMethod (c$, "getShadowInnerColor", 
function (c) {
var shadow = this.getShadowInnerColor ();
return shadow != null ? shadow : c.getBackground ().darker ();
}, "java.awt.Component");
Clazz.defineMethod (c$, "getShadowOuterColor", 
function (c) {
var shadow = this.getShadowOuterColor ();
return shadow != null ? shadow : c.getBackground ().darker ().darker ();
}, "java.awt.Component");
Clazz.defineMethod (c$, "getHighlightOuterColor", 
function () {
return this.highlightOuter;
});
Clazz.defineMethod (c$, "getHighlightInnerColor", 
function () {
return this.highlightInner;
});
Clazz.defineMethod (c$, "getShadowInnerColor", 
function () {
return this.shadowInner;
});
Clazz.defineMethod (c$, "getShadowOuterColor", 
function () {
return this.shadowOuter;
});
Clazz.defineMethod (c$, "getBevelType", 
function () {
return this.bevelType;
});
Clazz.overrideMethod (c$, "isBorderOpaque", 
function () {
return true;
});
Clazz.defineMethod (c$, "paintRaisedBevel", 
function (c, g, x, y, width, height) {
var oldColor = g.getColor ();
var h = height;
var w = width;
g.translate (x, y);
g.setColor (this.getHighlightOuterColor (c));
g.drawLine (0, 0, 0, h - 2);
g.drawLine (1, 0, w - 2, 0);
g.setColor (this.getHighlightInnerColor (c));
g.drawLine (1, 1, 1, h - 3);
g.drawLine (2, 1, w - 3, 1);
g.setColor (this.getShadowOuterColor (c));
g.drawLine (0, h - 1, w - 1, h - 1);
g.drawLine (w - 1, 0, w - 1, h - 2);
g.setColor (this.getShadowInnerColor (c));
g.drawLine (1, h - 2, w - 2, h - 2);
g.drawLine (w - 2, 1, w - 2, h - 3);
g.translate (-x, -y);
g.setColor (oldColor);
}, "java.awt.Component,java.awt.Graphics,~N,~N,~N,~N");
Clazz.defineMethod (c$, "paintLoweredBevel", 
function (c, g, x, y, width, height) {
var oldColor = g.getColor ();
var h = height;
var w = width;
g.translate (x, y);
g.setColor (this.getShadowInnerColor (c));
g.drawLine (0, 0, 0, h - 1);
g.drawLine (1, 0, w - 1, 0);
g.setColor (this.getShadowOuterColor (c));
g.drawLine (1, 1, 1, h - 2);
g.drawLine (2, 1, w - 2, 1);
g.setColor (this.getHighlightOuterColor (c));
g.drawLine (1, h - 1, w - 1, h - 1);
g.drawLine (w - 1, 1, w - 1, h - 2);
g.setColor (this.getHighlightInnerColor (c));
g.drawLine (2, h - 2, w - 2, h - 2);
g.drawLine (w - 2, 2, w - 2, h - 3);
g.translate (-x, -y);
g.setColor (oldColor);
}, "java.awt.Component,java.awt.Graphics,~N,~N,~N,~N");
Clazz.defineStatics (c$,
"RAISED", 0,
"LOWERED", 1);
});

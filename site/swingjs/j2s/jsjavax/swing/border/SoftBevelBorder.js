Clazz.declarePackage ("jsjavax.swing.border");
Clazz.load (["jsjavax.swing.border.BevelBorder"], "jsjavax.swing.border.SoftBevelBorder", ["jsjava.awt.Insets"], function () {
c$ = Clazz.declareType (jsjavax.swing.border, "SoftBevelBorder", jsjavax.swing.border.BevelBorder);
Clazz.overrideMethod (c$, "paintBorder", 
function (c, g, x, y, width, height) {
var oldColor = g.getColor ();
g.translate (x, y);
if (this.bevelType == 0) {
g.setColor (this.getHighlightOuterColor (c));
g.drawLine (0, 0, width - 2, 0);
g.drawLine (0, 0, 0, height - 2);
g.drawLine (1, 1, 1, 1);
g.setColor (this.getHighlightInnerColor (c));
g.drawLine (2, 1, width - 2, 1);
g.drawLine (1, 2, 1, height - 2);
g.drawLine (2, 2, 2, 2);
g.drawLine (0, height - 1, 0, height - 2);
g.drawLine (width - 1, 0, width - 1, 0);
g.setColor (this.getShadowOuterColor (c));
g.drawLine (2, height - 1, width - 1, height - 1);
g.drawLine (width - 1, 2, width - 1, height - 1);
g.setColor (this.getShadowInnerColor (c));
g.drawLine (width - 2, height - 2, width - 2, height - 2);
} else if (this.bevelType == 1) {
g.setColor (this.getShadowOuterColor (c));
g.drawLine (0, 0, width - 2, 0);
g.drawLine (0, 0, 0, height - 2);
g.drawLine (1, 1, 1, 1);
g.setColor (this.getShadowInnerColor (c));
g.drawLine (2, 1, width - 2, 1);
g.drawLine (1, 2, 1, height - 2);
g.drawLine (2, 2, 2, 2);
g.drawLine (0, height - 1, 0, height - 2);
g.drawLine (width - 1, 0, width - 1, 0);
g.setColor (this.getHighlightOuterColor (c));
g.drawLine (2, height - 1, width - 1, height - 1);
g.drawLine (width - 1, 2, width - 1, height - 1);
g.setColor (this.getHighlightInnerColor (c));
g.drawLine (width - 2, height - 2, width - 2, height - 2);
}g.translate (-x, -y);
g.setColor (oldColor);
}, "jsjava.awt.Component,jsjava.awt.Graphics,~N,~N,~N,~N");
Clazz.defineMethod (c$, "getBorderInsets", 
function (c) {
return this.getBorderInsets (c,  new jsjava.awt.Insets (0, 0, 0, 0));
}, "jsjava.awt.Component");
Clazz.defineMethod (c$, "getBorderInsets", 
function (c, insets) {
insets.top = insets.left = insets.bottom = insets.right = 3;
return insets;
}, "jsjava.awt.Component,jsjava.awt.Insets");
Clazz.overrideMethod (c$, "isBorderOpaque", 
function () {
return false;
});
});

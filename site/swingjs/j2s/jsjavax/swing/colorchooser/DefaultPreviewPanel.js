Clazz.declarePackage ("jsjavax.swing.colorchooser");
Clazz.load (["jsjavax.swing.JPanel", "jsjava.awt.Font", "jsjavax.swing.UIManager"], "jsjavax.swing.colorchooser.DefaultPreviewPanel", ["jsjava.awt.Color", "$.Dimension", "jsjavax.swing.JColorChooser", "$.SwingUtilities", "jssun.swing.SwingUtilities2"], function () {
c$ = Clazz.decorateAsClass (function () {
this.squareSize = 25;
this.squareGap = 5;
this.innerGap = 5;
this.textGap = 5;
this.$font = null;
this.sampleText = null;
this.swatchWidth = 50;
this.oldColor = null;
Clazz.instantialize (this, arguments);
}, jsjavax.swing.colorchooser, "DefaultPreviewPanel", jsjavax.swing.JPanel);
Clazz.prepareFields (c$, function () {
this.$font =  new jsjava.awt.Font ("Dialog", 0, 12);
this.sampleText = jsjavax.swing.UIManager.getString ("ColorChooser.sampleText");
});
Clazz.defineMethod (c$, "getColorChooser", 
($fz = function () {
return jsjavax.swing.SwingUtilities.getAncestorOfClass (jsjavax.swing.JColorChooser, this);
}, $fz.isPrivate = true, $fz));
Clazz.overrideMethod (c$, "getPreferredSize", 
function () {
var host = this.getColorChooser ();
if (host == null) {
host = this;
}var fm = host.getFontMetrics (this.getFont ());
var ascent = fm.getAscent ();
var height = fm.getHeight ();
var width = jssun.swing.SwingUtilities2.stringWidth (host, fm, this.sampleText);
var y = height * 3 + this.textGap * 3;
var x = this.squareSize * 3 + this.squareGap * 2 + this.swatchWidth + width + this.textGap * 3;
return  new jsjava.awt.Dimension (x, y);
});
Clazz.overrideMethod (c$, "paintComponent", 
function (g) {
if (this.oldColor == null) this.oldColor = this.getForeground ();
g.setColor (this.getBackground ());
g.fillRect (0, 0, this.getWidth (), this.getHeight ());
if (this.getComponentOrientation ().isLeftToRight ()) {
var squareWidth = this.paintSquares (g, 0);
var textWidth = this.paintText (g, squareWidth);
this.paintSwatch (g, squareWidth + textWidth);
} else {
var swatchWidth = this.paintSwatch (g, 0);
var textWidth = this.paintText (g, swatchWidth);
this.paintSquares (g, swatchWidth + textWidth);
}}, "jsjava.awt.Graphics");
Clazz.defineMethod (c$, "paintSwatch", 
($fz = function (g, offsetX) {
var swatchX = offsetX;
g.setColor (this.oldColor);
g.fillRect (swatchX, 0, this.swatchWidth, (this.squareSize) + (Clazz.doubleToInt (this.squareGap / 2)));
g.setColor (this.getForeground ());
g.fillRect (swatchX, (this.squareSize) + (Clazz.doubleToInt (this.squareGap / 2)), this.swatchWidth, (this.squareSize) + (Clazz.doubleToInt (this.squareGap / 2)));
return (swatchX + this.swatchWidth);
}, $fz.isPrivate = true, $fz), "jsjava.awt.Graphics,~N");
Clazz.defineMethod (c$, "paintText", 
($fz = function (g, offsetX) {
g.setFont (this.getFont ());
var host = this.getColorChooser ();
if (host == null) {
host = this;
}var fm = jssun.swing.SwingUtilities2.getFontMetrics (host, g);
var ascent = fm.getAscent ();
var height = fm.getHeight ();
var width = jssun.swing.SwingUtilities2.stringWidth (host, fm, this.sampleText);
var textXOffset = offsetX + this.textGap;
var color = this.getForeground ();
g.setColor (color);
jssun.swing.SwingUtilities2.drawString (host, g, this.sampleText, textXOffset + (Clazz.doubleToInt (this.textGap / 2)), ascent + 2);
g.fillRect (textXOffset, (height) + this.textGap, width + (this.textGap), height + 2);
g.setColor (jsjava.awt.Color.black);
jssun.swing.SwingUtilities2.drawString (host, g, this.sampleText, textXOffset + (Clazz.doubleToInt (this.textGap / 2)), height + ascent + this.textGap + 2);
g.setColor (jsjava.awt.Color.white);
g.fillRect (textXOffset, (height + this.textGap) * 2, width + (this.textGap), height + 2);
g.setColor (color);
jssun.swing.SwingUtilities2.drawString (host, g, this.sampleText, textXOffset + (Clazz.doubleToInt (this.textGap / 2)), ((height + this.textGap) * 2) + ascent + 2);
return width + this.textGap * 3;
}, $fz.isPrivate = true, $fz), "jsjava.awt.Graphics,~N");
Clazz.defineMethod (c$, "paintSquares", 
($fz = function (g, offsetX) {
var squareXOffset = offsetX;
var color = this.getForeground ();
g.setColor (jsjava.awt.Color.white);
g.fillRect (squareXOffset, 0, this.squareSize, this.squareSize);
g.setColor (color);
g.fillRect (squareXOffset + this.innerGap, this.innerGap, this.squareSize - (this.innerGap * 2), this.squareSize - (this.innerGap * 2));
g.setColor (jsjava.awt.Color.white);
g.fillRect (squareXOffset + this.innerGap * 2, this.innerGap * 2, this.squareSize - (this.innerGap * 4), this.squareSize - (this.innerGap * 4));
g.setColor (color);
g.fillRect (squareXOffset, this.squareSize + this.squareGap, this.squareSize, this.squareSize);
g.translate (this.squareSize + this.squareGap, 0);
g.setColor (jsjava.awt.Color.black);
g.fillRect (squareXOffset, 0, this.squareSize, this.squareSize);
g.setColor (color);
g.fillRect (squareXOffset + this.innerGap, this.innerGap, this.squareSize - (this.innerGap * 2), this.squareSize - (this.innerGap * 2));
g.setColor (jsjava.awt.Color.white);
g.fillRect (squareXOffset + this.innerGap * 2, this.innerGap * 2, this.squareSize - (this.innerGap * 4), this.squareSize - (this.innerGap * 4));
g.translate (-(this.squareSize + this.squareGap), 0);
g.translate (this.squareSize + this.squareGap, this.squareSize + this.squareGap);
g.setColor (jsjava.awt.Color.white);
g.fillRect (squareXOffset, 0, this.squareSize, this.squareSize);
g.setColor (color);
g.fillRect (squareXOffset + this.innerGap, this.innerGap, this.squareSize - (this.innerGap * 2), this.squareSize - (this.innerGap * 2));
g.translate (-(this.squareSize + this.squareGap), -(this.squareSize + this.squareGap));
g.translate ((this.squareSize + this.squareGap) * 2, 0);
g.setColor (jsjava.awt.Color.white);
g.fillRect (squareXOffset, 0, this.squareSize, this.squareSize);
g.setColor (color);
g.fillRect (squareXOffset + this.innerGap, this.innerGap, this.squareSize - (this.innerGap * 2), this.squareSize - (this.innerGap * 2));
g.setColor (jsjava.awt.Color.black);
g.fillRect (squareXOffset + this.innerGap * 2, this.innerGap * 2, this.squareSize - (this.innerGap * 4), this.squareSize - (this.innerGap * 4));
g.translate (-((this.squareSize + this.squareGap) * 2), 0);
g.translate ((this.squareSize + this.squareGap) * 2, (this.squareSize + this.squareGap));
g.setColor (jsjava.awt.Color.black);
g.fillRect (squareXOffset, 0, this.squareSize, this.squareSize);
g.setColor (color);
g.fillRect (squareXOffset + this.innerGap, this.innerGap, this.squareSize - (this.innerGap * 2), this.squareSize - (this.innerGap * 2));
g.translate (-((this.squareSize + this.squareGap) * 2), -(this.squareSize + this.squareGap));
return (this.squareSize * 3 + this.squareGap * 2);
}, $fz.isPrivate = true, $fz), "jsjava.awt.Graphics,~N");
});

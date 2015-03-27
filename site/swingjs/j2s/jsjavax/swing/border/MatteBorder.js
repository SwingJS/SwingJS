Clazz.declarePackage ("jsjavax.swing.border");
Clazz.load (["jsjavax.swing.border.EmptyBorder"], "jsjavax.swing.border.MatteBorder", ["jsjava.awt.Color", "$.Insets"], function () {
c$ = Clazz.decorateAsClass (function () {
this.color = null;
this.tileIcon = null;
Clazz.instantialize (this, arguments);
}, jsjavax.swing.border, "MatteBorder", jsjavax.swing.border.EmptyBorder);
Clazz.makeConstructor (c$, 
function (top, left, bottom, right, matteColor) {
Clazz.superConstructor (this, jsjavax.swing.border.MatteBorder, [top, left, bottom, right]);
this.color = matteColor;
}, "~N,~N,~N,~N,jsjava.awt.Color");
Clazz.makeConstructor (c$, 
function (borderInsets, matteColor) {
Clazz.superConstructor (this, jsjavax.swing.border.MatteBorder, [borderInsets]);
this.color = matteColor;
}, "jsjava.awt.Insets,jsjava.awt.Color");
Clazz.makeConstructor (c$, 
function (top, left, bottom, right, tileIcon) {
Clazz.superConstructor (this, jsjavax.swing.border.MatteBorder, [top, left, bottom, right]);
this.tileIcon = tileIcon;
}, "~N,~N,~N,~N,jsjavax.swing.Icon");
Clazz.makeConstructor (c$, 
function (borderInsets, tileIcon) {
Clazz.superConstructor (this, jsjavax.swing.border.MatteBorder, [borderInsets]);
this.tileIcon = tileIcon;
}, "jsjava.awt.Insets,jsjavax.swing.Icon");
Clazz.makeConstructor (c$, 
function (tileIcon) {
this.construct (-1, -1, -1, -1, tileIcon);
}, "jsjavax.swing.Icon");
Clazz.overrideMethod (c$, "paintBorder", 
function (c, g, x, y, width, height) {
var insets = this.getBorderInsets (c);
var oldColor = g.getColor ();
g.translate (x, y);
if (this.tileIcon != null) {
this.color = (this.tileIcon.getIconWidth () == -1) ? jsjava.awt.Color.gray : null;
}if (this.color != null) {
g.setColor (this.color);
g.fillRect (0, 0, width - insets.right, insets.top);
g.fillRect (0, insets.top, insets.left, height - insets.top);
g.fillRect (insets.left, height - insets.bottom, width - insets.left, insets.bottom);
g.fillRect (width - insets.right, 0, insets.right, height - insets.bottom);
} else if (this.tileIcon != null) {
var tileW = this.tileIcon.getIconWidth ();
var tileH = this.tileIcon.getIconHeight ();
var xpos;
var ypos;
var startx;
var starty;
var cg;
cg = g.create ();
cg.setClip (0, 0, width, insets.top);
for (ypos = 0; insets.top - ypos > 0; ypos += tileH) {
for (xpos = 0; width - xpos > 0; xpos += tileW) {
this.tileIcon.paintIcon (c, cg, xpos, ypos);
}
}
cg.dispose ();
cg = g.create ();
cg.setClip (0, insets.top, insets.left, height - insets.top);
starty = insets.top - (insets.top % tileH);
startx = 0;
for (ypos = starty; height - ypos > 0; ypos += tileH) {
for (xpos = startx; insets.left - xpos > 0; xpos += tileW) {
this.tileIcon.paintIcon (c, cg, xpos, ypos);
}
}
cg.dispose ();
cg = g.create ();
cg.setClip (insets.left, height - insets.bottom, width - insets.left, insets.bottom);
starty = (height - insets.bottom) - ((height - insets.bottom) % tileH);
startx = insets.left - (insets.left % tileW);
for (ypos = starty; height - ypos > 0; ypos += tileH) {
for (xpos = startx; width - xpos > 0; xpos += tileW) {
this.tileIcon.paintIcon (c, cg, xpos, ypos);
}
}
cg.dispose ();
cg = g.create ();
cg.setClip (width - insets.right, insets.top, insets.right, height - insets.top - insets.bottom);
starty = insets.top - (insets.top % tileH);
startx = width - insets.right - ((width - insets.right) % tileW);
for (ypos = starty; height - ypos > 0; ypos += tileH) {
for (xpos = startx; width - xpos > 0; xpos += tileW) {
this.tileIcon.paintIcon (c, cg, xpos, ypos);
}
}
cg.dispose ();
}g.translate (-x, -y);
g.setColor (oldColor);
}, "jsjava.awt.Component,jsjava.awt.Graphics,~N,~N,~N,~N");
Clazz.defineMethod (c$, "getBorderInsets", 
function (c) {
return this.getBorderInsets ();
}, "jsjava.awt.Component");
Clazz.defineMethod (c$, "getBorderInsets", 
function (c, insets) {
return this.computeInsets (insets);
}, "jsjava.awt.Component,jsjava.awt.Insets");
Clazz.defineMethod (c$, "getBorderInsets", 
function () {
return this.computeInsets ( new jsjava.awt.Insets (0, 0, 0, 0));
});
Clazz.defineMethod (c$, "computeInsets", 
($fz = function (insets) {
if (this.tileIcon != null && this.top == -1 && this.bottom == -1 && this.left == -1 && this.right == -1) {
var w = this.tileIcon.getIconWidth ();
var h = this.tileIcon.getIconHeight ();
insets.top = h;
insets.right = w;
insets.bottom = h;
insets.left = w;
} else {
insets.left = this.left;
insets.top = this.top;
insets.right = this.right;
insets.bottom = this.bottom;
}return insets;
}, $fz.isPrivate = true, $fz), "jsjava.awt.Insets");
Clazz.defineMethod (c$, "getMatteColor", 
function () {
return this.color;
});
Clazz.defineMethod (c$, "getTileIcon", 
function () {
return this.tileIcon;
});
Clazz.overrideMethod (c$, "isBorderOpaque", 
function () {
return this.color != null;
});
});

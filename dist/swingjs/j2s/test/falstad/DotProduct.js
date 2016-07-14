Clazz.declarePackage ("test.falstad");
Clazz.load (["java.awt.LayoutManager", "java.awt.event.ActionListener", "$.AdjustmentListener", "$.ComponentListener", "$.MouseListener", "$.MouseMotionListener", "swingjs.awt.Applet", "$.Canvas"], ["test.falstad.DotProductLayout", "$.DotProduct", "$.DotProductCanvas"], ["java.awt.Color", "$.Dimension", "java.text.NumberFormat", "java.util.Random", "swingjs.awt.Button"], function () {
c$ = Clazz.decorateAsClass (function () {
this.pg = null;
Clazz.instantialize (this, arguments);
}, test.falstad, "DotProductCanvas", swingjs.awt.Canvas);
Clazz.makeConstructor (c$, 
function (p) {
Clazz.superConstructor (this, test.falstad.DotProductCanvas, []);
this.pg = p;
}, "test.falstad.DotProduct");
Clazz.overrideMethod (c$, "getPreferredSize", 
function () {
return  new java.awt.Dimension (300, 400);
});
Clazz.overrideMethod (c$, "update", 
function (g) {
this.pg.updateDotProduct (g);
}, "java.awt.Graphics");
Clazz.overrideMethod (c$, "paintComponent", 
function (g) {
this.pg.updateDotProduct (g);
}, "java.awt.Graphics");
c$ = Clazz.declareType (test.falstad, "DotProductLayout", null, java.awt.LayoutManager);
Clazz.makeConstructor (c$, 
function () {
});
Clazz.overrideMethod (c$, "addLayoutComponent", 
function (name, c) {
}, "~S,java.awt.Component");
Clazz.overrideMethod (c$, "removeLayoutComponent", 
function (c) {
}, "java.awt.Component");
Clazz.overrideMethod (c$, "preferredLayoutSize", 
function (target) {
return  new java.awt.Dimension (500, 500);
}, "java.awt.Container");
Clazz.overrideMethod (c$, "minimumLayoutSize", 
function (target) {
return  new java.awt.Dimension (100, 100);
}, "java.awt.Container");
Clazz.overrideMethod (c$, "layoutContainer", 
function (target) {
var cw = target.size ().width;
var ct = target.getComponentCount ();
target.getComponent (ct - 1).move (0, 0);
target.getComponent (ct - 1).resize (cw, target.size ().height);
var i;
var h = 0;
for (i = 0; i < ct - 1; i++) {
var m = target.getComponent (i);
if (m.isVisible ()) {
var d = m.getPreferredSize ();
m.move (cw - d.width, h);
m.resize (d.width, d.height);
h += d.height;
}}
}, "java.awt.Container");
c$ = Clazz.decorateAsClass (function () {
this.engine = null;
this.winSize = null;
this.dbimage = null;
this.random = null;
this.swapButton = null;
this.vecs = null;
this.selection = -1;
this.cv = null;
Clazz.instantialize (this, arguments);
}, test.falstad, "DotProduct", swingjs.awt.Applet, [java.awt.event.ComponentListener, java.awt.event.ActionListener, java.awt.event.AdjustmentListener, java.awt.event.MouseMotionListener, java.awt.event.MouseListener]);
Clazz.overrideMethod (c$, "getAppletInfo", 
function () {
return "DotProduct by Paul Falstad";
});
Clazz.defineMethod (c$, "getrand", 
function (x) {
var q = this.random.nextInt ();
if (q < 0) q = -q;
return q % x;
}, "~N");
Clazz.overrideMethod (c$, "init", 
function () {
this.setLayout ( new test.falstad.DotProductLayout ());
this.cv =  new test.falstad.DotProductCanvas (this);
this.cv.addComponentListener (this);
this.cv.addMouseMotionListener (this);
this.cv.addMouseListener (this);
this.add (this.swapButton =  new swingjs.awt.Button ("Swap"));
this.swapButton.addActionListener (this);
this.add (this.cv);
this.setBackground (java.awt.Color.black);
this.setForeground (java.awt.Color.lightGray);
this.random =  new java.util.Random ();
this.vecs =  Clazz.newDoubleArray (2, 2, 0);
this.vecs[0][0] = 0;
this.vecs[0][1] = 1;
this.vecs[1][0] = 1;
this.vecs[1][1] = 1;
this.reinit ();
this.repaint ();
});
Clazz.defineMethod (c$, "reinit", 
function () {
var d = this.winSize = this.cv.getSize ();
if (this.winSize.width == 0) return;
this.dbimage = this.createImage (d.width, d.height);
});
Clazz.defineMethod (c$, "paintComponent", 
function (g) {
this.cv.repaint ();
}, "java.awt.Graphics");
Clazz.defineMethod (c$, "findVecCoords", 
function (x, y, result) {
var cy = Clazz.doubleToInt (this.winSize.height / 4);
var cx = cy;
result[0] = Clazz.doubleToInt (cx * (x + 2));
result[1] = Clazz.doubleToInt (cy * (2 - y));
}, "~N,~N,~A");
Clazz.defineMethod (c$, "findVecCoords", 
function (num, result) {
this.findVecCoords (this.vecs[num][0], this.vecs[num][1], result);
}, "~N,~A");
Clazz.defineMethod (c$, "drawArrow", 
function (g, x1, y1, x2, y2, len) {
g.drawLine (x1, y1, x2, y2);
if (len > .05) {
var l = java.lang.Math.sqrt ((x2 - x1) * (x2 - x1) + (y2 - y1) * (y2 - y1));
var hatx = (x2 - x1) / l;
var haty = (y2 - y1) / l;
var as = 10;
g.drawLine (x2, y2, Clazz.doubleToInt (haty * as - hatx * as + x2), Clazz.doubleToInt (-hatx * as - haty * as + y2));
g.drawLine (x2, y2, Clazz.doubleToInt (-haty * as - hatx * as + x2), Clazz.doubleToInt (hatx * as - haty * as + y2));
}}, "java.awt.Graphics,~N,~N,~N,~N,~N");
Clazz.defineMethod (c$, "drawBar", 
function (g, offset, val) {
var x = Clazz.doubleToInt (this.winSize.width * val / 6);
var cx = Clazz.doubleToInt (this.winSize.width / 2);
var h = 5;
var y = this.winSize.height + h * offset;
var y2 = y + h - 1;
if (val < 0) g.fillRect (cx + x, y, -x, h);
 else g.fillRect (cx, y, x, h);
}, "java.awt.Graphics,~N,~N");
Clazz.defineMethod (c$, "updateDotProduct", 
function (realg) {
var alen = java.lang.Math.sqrt (this.vecs[0][0] * this.vecs[0][0] + this.vecs[0][1] * this.vecs[0][1]);
var blen = java.lang.Math.sqrt (this.vecs[1][0] * this.vecs[1][0] + this.vecs[1][1] * this.vecs[1][1]);
var piadj = 57.29577957855229;
var dot = this.vecs[0][0] * this.vecs[1][0] + this.vecs[0][1] * this.vecs[1][1];
var acosth = (blen > 0) ? dot / blen : 0;
var costh = (alen > 0) ? acosth / alen : 0;
var theta = java.lang.Math.acos (costh) * piadj;
var g = this.dbimage.getGraphics ();
if (this.winSize == null || this.winSize.width == 0) return;
g.setColor (this.cv.getBackground ());
g.fillRect (0, 0, this.winSize.width, this.winSize.height);
g.setColor (java.awt.Color.gray);
var i;
var j;
for (i = -2; i <= 2; i++) {
var x = Clazz.doubleToInt (this.winSize.height * (i + 2) / 4);
g.drawLine (x, 0, x, this.winSize.height);
g.drawLine (0, x, this.winSize.height, x);
}
var cy = Clazz.doubleToInt (this.winSize.height / 2);
var cx = cy;
var vc =  Clazz.newIntArray (2, 0);
if (blen > 0) {
var vc2 =  Clazz.newIntArray (2, 0);
this.findVecCoords (this.vecs[1][0] * acosth / blen, this.vecs[1][1] * acosth / blen, vc);
this.findVecCoords (0, vc2);
g.setColor (java.awt.Color.gray);
g.drawLine (vc[0], vc[1], vc2[0], vc2[1]);
}if (alen > .1 && blen > .1) {
var c1x = Clazz.doubleToInt (cx / 10);
var c1y = Clazz.doubleToInt (cy / 10);
var a1 = Clazz.doubleToInt (piadj * java.lang.Math.atan2 (this.vecs[0][1], this.vecs[0][0]));
var a2 = Clazz.doubleToInt (piadj * java.lang.Math.atan2 (this.vecs[1][1], this.vecs[1][0]));
if (a1 > a2 && a1 < a2 + 180) {
var a3 = a1;
a1 = a2;
a2 = a3;
}if (a2 < a1) a2 += 360;
g.setColor (java.awt.Color.orange);
g.drawArc (cx - c1x, cy - c1y, c1x * 2, c1y * 2, a1, a2 - a1);
}this.findVecCoords (0, vc);
g.setColor (java.awt.Color.red);
this.drawArrow (g, cx, cy, vc[0], vc[1], alen);
this.findVecCoords (1, vc);
g.setColor (java.awt.Color.cyan);
this.drawArrow (g, cx, cy, vc[0], vc[1], blen);
var yl = g.getFontMetrics ().getHeight ();
var y = yl;
var nf = java.text.NumberFormat.getInstance ();
nf.setMaximumFractionDigits (3);
g.setColor (java.awt.Color.red);
this.displayString (g, "A = (" + nf.format (this.vecs[0][0]) + ", " + nf.format (this.vecs[0][1]) + ")", y += yl);
this.displayString (g, "|A| = " + nf.format (alen), y += yl);
this.drawBar (g, -4, alen);
g.setColor (java.awt.Color.cyan);
this.displayString (g, "B = (" + nf.format (this.vecs[1][0]) + ", " + nf.format (this.vecs[1][1]) + ")", y += yl);
this.displayString (g, "|B| = " + nf.format (blen), y += yl);
this.drawBar (g, -3, blen);
g.setColor (java.awt.Color.yellow);
this.displayString (g, "|A| cos theta = " + nf.format (acosth), y += yl);
this.drawBar (g, -2, acosth);
if (blen > 0) {
this.findVecCoords (this.vecs[1][0] * acosth / blen, this.vecs[1][1] * acosth / blen, vc);
g.setColor (java.awt.Color.yellow);
g.drawLine (cx, cy, vc[0], vc[1]);
}g.setColor (java.awt.Color.white);
this.displayString (g, "cos theta = " + nf.format (costh), y += yl);
g.setColor (java.awt.Color.orange);
this.displayString (g, "theta = " + nf.format (theta) + "\u00b0", y += yl);
g.setColor (java.awt.Color.green);
this.displayString (g, "A dot B = " + nf.format (dot), y += yl);
this.drawBar (g, -1, dot);
realg.drawImage (this.dbimage, 0, 0, this);
}, "java.awt.Graphics");
Clazz.defineMethod (c$, "displayString", 
function (g, s, y) {
var lx = this.winSize.height;
var lw = this.winSize.width - lx;
var fm = g.getFontMetrics ();
g.drawString (s, lx + Clazz.doubleToInt ((lw - fm.stringWidth (s)) / 2), y);
}, "java.awt.Graphics,~S,~N");
Clazz.defineMethod (c$, "edit", 
function (e) {
if (this.selection == -1) return;
var x = e.getX ();
var y = e.getY ();
var cy = Clazz.doubleToInt (this.winSize.height / 4);
var cx = cy;
var xf = x / cx - 2;
var yf = 2 - y / cy;
if (xf < -2) xf = -2;
if (yf < -2) yf = -2;
if (xf > 2) xf = 2;
if (yf > 2) yf = 2;
this.vecs[this.selection][0] = xf;
this.vecs[this.selection][1] = yf;
this.cv.repaint ();
}, "java.awt.event.MouseEvent");
Clazz.overrideMethod (c$, "componentHidden", 
function (e) {
}, "java.awt.event.ComponentEvent");
Clazz.overrideMethod (c$, "componentMoved", 
function (e) {
}, "java.awt.event.ComponentEvent");
Clazz.overrideMethod (c$, "componentShown", 
function (e) {
this.cv.repaint ();
}, "java.awt.event.ComponentEvent");
Clazz.overrideMethod (c$, "componentResized", 
function (e) {
this.reinit ();
this.cv.repaint (100);
}, "java.awt.event.ComponentEvent");
Clazz.overrideMethod (c$, "actionPerformed", 
function (e) {
if (e.getSource () === this.swapButton) {
var x;
for (x = 0; x < 2; x++) {
var y = this.vecs[0][x];
this.vecs[0][x] = this.vecs[1][x];
this.vecs[1][x] = y;
}
this.cv.repaint ();
}}, "java.awt.event.ActionEvent");
Clazz.overrideMethod (c$, "adjustmentValueChanged", 
function (e) {
}, "java.awt.event.AdjustmentEvent");
Clazz.overrideMethod (c$, "mouseDragged", 
function (e) {
this.edit (e);
}, "java.awt.event.MouseEvent");
Clazz.overrideMethod (c$, "mouseMoved", 
function (e) {
if ((e.getModifiers () & 16) != 0) return;
this.edit (e);
}, "java.awt.event.MouseEvent");
Clazz.overrideMethod (c$, "mouseClicked", 
function (e) {
}, "java.awt.event.MouseEvent");
Clazz.overrideMethod (c$, "mouseEntered", 
function (e) {
}, "java.awt.event.MouseEvent");
Clazz.overrideMethod (c$, "mouseExited", 
function (e) {
}, "java.awt.event.MouseEvent");
Clazz.overrideMethod (c$, "mousePressed", 
function (e) {
if ((e.getModifiers () & 16) == 0) return;
var x = e.getX ();
var y = e.getY ();
var vc =  Clazz.newIntArray (2, 0);
var i;
this.selection = -1;
for (i = 0; i != 2; i++) {
this.findVecCoords (i, vc);
var space = 10;
if (vc[0] >= x - space && vc[0] <= x + space && vc[1] >= y - space && vc[1] <= y + space) {
this.selection = i;
break;
}}
if (this.selection != -1) this.edit (e);
}, "java.awt.event.MouseEvent");
Clazz.overrideMethod (c$, "mouseReleased", 
function (e) {
if ((e.getModifiers () & 16) == 0) return;
this.selection = -1;
}, "java.awt.event.MouseEvent");
});

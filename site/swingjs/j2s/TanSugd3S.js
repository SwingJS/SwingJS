Clazz.load (["java.awt.Canvas", "java.awt.event.ItemListener", "$.MouseListener", "javax.swing.JApplet", "$.JPanel", "java.awt.Color", "$.Font", "$.Rectangle"], ["TanSugd3S", "TSd3Controls", "TSd3Canvas"], ["java.awt.BasicStroke", "$.BorderLayout", "$.Frame", "$.Point", "java.lang.Double", "$.StringBuffer", "javax.swing.ButtonGroup", "$.JRadioButton"], function () {
c$ = Clazz.decorateAsClass (function () {
this.canvas = null;
this.controls = null;
Clazz.instantialize (this, arguments);
}, null, "TanSugd3S", javax.swing.JApplet);
Clazz.makeConstructor (c$, 
function () {
Clazz.superConstructor (this, TanSugd3S, []);
});
Clazz.overrideMethod (c$, "init", 
function () {
this.setBackground (java.awt.Color.white);
this.setLayout ( new java.awt.BorderLayout ());
this.canvas =  new TSd3Canvas ();
this.canvas.setSize (700, 500);
var c = this.getContentPane ();
c.add (this.canvas, "Center");
c.add (this.controls =  new TSd3Controls (this.canvas), "South");
});
Clazz.defineMethod (c$, "setSize", 
function (width, height) {
Clazz.superCall (this, TanSugd3S, "setSize", [width, height]);
this.validate ();
}, "~N,~N");
Clazz.overrideMethod (c$, "destroy", 
function () {
this.remove (this.controls);
this.remove (this.canvas);
});
Clazz.overrideMethod (c$, "start", 
function () {
this.controls.setEnabled (true);
});
Clazz.overrideMethod (c$, "stop", 
function () {
this.controls.setEnabled (false);
});
Clazz.overrideMethod (c$, "processEvent", 
function (e) {
if (e.getID () == 201) {
System.exit (0);
}}, "java.awt.AWTEvent");
c$.main = Clazz.defineMethod (c$, "main", 
function (args) {
var f =  new java.awt.Frame ("Tanabe-Sugano");
var tanabe =  new TanSugd3S ();
tanabe.init ();
tanabe.start ();
f.add ("Center", tanabe);
f.pack ();
f.setVisible (true);
}, "~A");
Clazz.overrideMethod (c$, "getAppletInfo", 
function () {
return "A d3 octahedral Tanabe-Sugano Diagram";
});
c$.CalcF4T1g = Clazz.defineMethod (c$, "CalcF4T1g", 
function (x1) {
return (15 + (3 * x1) - Math.sqrt (225 - (18 * x1) + (x1 * x1))) / 2;
}, "~N");
c$.CalcP4T1g = Clazz.defineMethod (c$, "CalcP4T1g", 
function (x1) {
return (15 + (3 * x1) + Math.sqrt (225 - (18 * x1) + (x1 * x1))) / 2;
}, "~N");
c$.CalcG2Eg = Clazz.defineMethod (c$, "CalcG2Eg", 
function (x1) {
return 0.0000002727 * x1 * x1 * x1 * x1 * x1 - 0.00003926 * x1 * x1 * x1 * x1 + 0.002110 * x1 * x1 * x1 - 0.05256 * x1 * x1 + 0.6345 * x1 + 17.50161;
}, "~N");
c$.CalcG2A1g = Clazz.defineMethod (c$, "CalcG2A1g", 
function (x1) {
return x1 + 17.50161;
}, "~N");
c$.CalcG2T1g = Clazz.defineMethod (c$, "CalcG2T1g", 
function (x1) {
return 0.0000003205 * x1 * x1 * x1 * x1 * x1 - 0.00004689 * x1 * x1 * x1 * x1 + 0.00258 * x1 * x1 * x1 - 0.06641 * x1 * x1 + 0.8232 * x1 + 17.50161;
}, "~N");
c$.CalcG2T2g = Clazz.defineMethod (c$, "CalcG2T2g", 
function (x1) {
return 0.0000001933 * x1 * x1 * x1 * x1 * x1 - 0.00003336 * x1 * x1 * x1 * x1 + 0.002274 * x1 * x1 * x1 - 0.07898 * x1 * x1 + 1.557 * x1 + 17.50161;
}, "~N");
c$.CalcH2T2g = Clazz.defineMethod (c$, "CalcH2T2g", 
function (x1) {
return 0.00000002443 * x1 * x1 * x1 * x1 * x1 + 0.0000002677 * x1 * x1 * x1 * x1 - 0.0003003 * x1 * x1 * x1 + 0.01745 * x1 * x1 + 0.6635 * x1 + 22.50161;
}, "~N");
c$.CalcH2T1g = Clazz.defineMethod (c$, "CalcH2T1g", 
function (x1) {
return 0.00000002195 * x1 * x1 * x1 * x1 * x1 - 0.000005305 * x1 * x1 * x1 * x1 + 0.0004933 * x1 * x1 * x1 - 0.02294 * x1 * x1 + 1.570 * x1 + 22.50161;
}, "~N");
c$.CalcH2Eg = Clazz.defineMethod (c$, "CalcH2Eg", 
function (x1) {
return 0.0000001881 * x1 * x1 * x1 * x1 * x1 - 0.00002683 * x1 * x1 * x1 * x1 + 0.001416 * x1 * x1 * x1 - 0.0338 * x1 * x1 + 1.3525 * x1 + 22.50161;
}, "~N");
c$.CalcD2T2g = Clazz.defineMethod (c$, "CalcD2T2g", 
function (x1) {
return -7.532E-7 * x1 * x1 * x1 * x1 * x1 + 0.00009886 * x1 * x1 * x1 * x1 - 0.004352 * x1 * x1 * x1 + 0.06092 * x1 * x1 + 1.378 * x1 + 24.8951929;
}, "~N");
Clazz.defineMethod (c$, "processDelB", 
function (msgstr) {
var x1;
var y1;
var y2;
var y3;
var fE;
var fT1;
var fT2;
var fA1;
var fT2b;
var fT2H;
var fT1H;
var fEH;
var Delta;
var Bp;
var ret =  new StringBuffer ();
var ii = msgstr.indexOf (":");
var ll = msgstr.length;
Delta = Double.parseDouble (msgstr.substring (0, ii).trim ());
Bp = Double.parseDouble (msgstr.substring (ii + 1, ll).trim ());
x1 = Delta / Bp;
y1 = x1;
y2 = TanSugd3S.CalcF4T1g (x1);
y3 = TanSugd3S.CalcP4T1g (x1);
fE = TanSugd3S.CalcG2Eg (x1);
fT1 = TanSugd3S.CalcG2T1g (x1);
fT2 = TanSugd3S.CalcG2T2g (x1);
fA1 = TanSugd3S.CalcG2A1g (x1);
fT2b = TanSugd3S.CalcD2T2g (x1);
fT2H = TanSugd3S.CalcH2T2g (x1);
fEH = TanSugd3S.CalcH2Eg (x1);
fT1H = TanSugd3S.CalcH2T1g (x1);
var sBp = "" + Math.round (Bp);
var va1 = "" + Math.round (y1 * Bp);
var va2 = "" + Math.round (y2 * Bp);
var va3 = "" + Math.round (y3 * Bp);
var vfE = "" + Math.round (fE * Bp);
var vfT1 = "" + Math.round (fT1 * Bp);
var vfT2 = "" + Math.round (fT2 * Bp);
var vfA1 = "" + Math.round (fA1 * Bp);
var vfT2b = "" + Math.round (fT2b * Bp);
var vfT2H = "" + Math.round (fT2H * Bp);
var vfEH = "" + Math.round (fEH * Bp);
var vfT1H = "" + Math.round (fT1H * Bp);
ret.append ("B\' " + sBp + ", A " + va1 + ", " + va2 + ", " + va3 + ", F " + vfE + ", " + vfT1 + ", " + vfT2 + ", " + vfA1 + ", " + vfT2H + ", " + vfEH + ", " + vfT1H + ", " + vfT2b);
this.canvas.start_x = 0;
this.canvas.end_x = 50;
this.canvas.mouseOn = true;
this.canvas.deltaB = x1;
this.canvas.y1 = x1;
this.canvas.y2 = y2;
this.canvas.y3 = y3;
this.canvas.fE = fE;
this.canvas.fT1 = fT1;
this.canvas.fT2 = fT2;
this.canvas.fA1 = fA1;
this.canvas.fT2b = fT2b;
this.canvas.fT2H = fT2H;
this.canvas.fEH = fEH;
this.canvas.fT1H = fT1H;
this.canvas.ratio21 = y2 / y1;
this.canvas.repaint ();
return ret.toString ();
}, "~S");
Clazz.defineMethod (c$, "processRatio", 
function (msgstr) {
var x1;
var temp_ratio21;
var y1;
var y2;
var y3;
var ratio21;
var v1;
var fE;
var fT1;
var fT2;
var fA1;
var fT2b;
var fT2H;
var fT1H;
var fEH;
var ii = msgstr.indexOf (":");
var ll = msgstr.length;
ratio21 = Double.parseDouble (msgstr.substring (0, ii).trim ());
v1 = Double.parseDouble (msgstr.substring (ii + 1, ll).trim ());
var x;
var ratioFound = false;
var ret =  new StringBuffer ();
ret.append ("no value");
for (x = 0; x <= 50; x++) {
y1 = x;
y2 = TanSugd3S.CalcF4T1g (x);
temp_ratio21 = y2 / y1;
if ((temp_ratio21 < ratio21) && (ratio21 > 1.192) && (ratio21 < 1.75)) {
ratioFound = true;
break;
}}
if (ratioFound) {
for (x1 = (x - 1); x1 < x; x1 += 0.02) {
y1 = x1;
y2 = TanSugd3S.CalcF4T1g (x1);
y3 = TanSugd3S.CalcP4T1g (x1);
fE = TanSugd3S.CalcG2Eg (x1);
fT1 = TanSugd3S.CalcG2T1g (x1);
fT2 = TanSugd3S.CalcG2T2g (x1);
fA1 = TanSugd3S.CalcG2A1g (x1);
fT2b = TanSugd3S.CalcD2T2g (x1);
fT2H = TanSugd3S.CalcH2T2g (x1);
fEH = TanSugd3S.CalcH2Eg (x1);
fT1H = TanSugd3S.CalcH2T1g (x1);
temp_ratio21 = y2 / y1;
if (temp_ratio21 < ratio21) {
ret =  new StringBuffer ();
var Bp = v1 / x1;
var temp = Math.round (Bp * 10);
var tmp =  String.instantialize ("" + temp);
var Bprime = (tmp.substring (0, tmp.length - 1) + "." + tmp.substring (tmp.length - 1, tmp.length));
y3 = TanSugd3S.CalcP4T1g (x1);
var va1 = "" + Math.round (y1 * Bp);
var va2 = "" + Math.round (y2 * Bp);
var va3 = "" + Math.round (y3 * Bp);
var vfE = "" + Math.round (fE * Bp);
var vfT1 = "" + Math.round (fT1 * Bp);
var vfT2 = "" + Math.round (fT2 * Bp);
var vfA1 = "" + Math.round (fA1 * Bp);
var vfT2b = "" + Math.round (fT2b * Bp);
var vfT2H = "" + Math.round (fT2H * Bp);
var vfEH = "" + Math.round (fEH * Bp);
var vfT1H = "" + Math.round (fT1H * Bp);
ret.append ("B\' " + Bprime + ", A " + va1 + ", " + va2 + ", " + va3 + ", F " + vfE + ", " + vfT1 + ", " + vfT2 + ", " + vfA1 + ", " + vfT2H + ", " + vfEH + ", " + vfT1H + ", " + vfT2b);
this.canvas.start_x = 0;
this.canvas.end_x = 50;
this.canvas.mouseOn = true;
this.canvas.deltaB = x1;
this.canvas.y1 = x1;
this.canvas.y2 = y2;
this.canvas.y3 = y3;
this.canvas.fE = fE;
this.canvas.fT1 = fT1;
this.canvas.fT2 = fT2;
this.canvas.fA1 = fA1;
this.canvas.fT2b = fT2b;
this.canvas.fT2H = fT2H;
this.canvas.fEH = fEH;
this.canvas.fT1H = fT1H;
this.canvas.ratio21 = y2 / y1;
this.canvas.repaint ();
return ret.toString ();
}}
}this.canvas.mouseOn = false;
this.canvas.repaint ();
return ret.toString ();
}, "~S");
c$ = Clazz.decorateAsClass (function () {
this.$y = 0;
this.bottomLeft = null;
this.btmLeft = null;
this.start_x = 0;
this.end_x = 0;
this.lrange = 0;
this.$x = 0;
this.hlines = 0;
this.vlines = 0;
this.gx = 0;
this.deltaB = 0;
this.xScale = 0;
this.yScale = 0;
this.mouseOn = false;
this.x1 = 0;
this.y1 = 0;
this.y2 = 0;
this.y3 = 0;
this.ratio21 = 0;
this.ratio31 = 0;
this.ratio32 = 0;
this.fE = 0;
this.fT2 = 0;
this.fT1 = 0;
this.fA1 = 0;
this.fT2b = 0;
this.fT2H = 0;
this.fT1H = 0;
this.fEH = 0;
this.fb = null;
this.f = null;
this.dkgreen = null;
this.gold = null;
this.ltgrey = null;
this.teal = null;
this.purple = null;
this.lgreen = null;
this.dgreen = null;
this.copper = null;
this.graphRec = null;
this.outPRec = null;
Clazz.instantialize (this, arguments);
}, null, "TSd3Canvas", java.awt.Canvas, java.awt.event.MouseListener);
Clazz.prepareFields (c$, function () {
this.fb =  new java.awt.Font ("Arial", 1, 18);
this.f =  new java.awt.Font ("Courier", 0, 16);
this.dkgreen =  new java.awt.Color (142, 244, 108);
this.gold =  new java.awt.Color (191, 139, 32);
this.ltgrey =  new java.awt.Color (233, 233, 233);
this.teal =  new java.awt.Color (168, 207, 251);
this.purple =  new java.awt.Color (192, 12, 255);
this.lgreen =  new java.awt.Color (82, 179, 53);
this.dgreen =  new java.awt.Color (41, 94, 28);
this.copper =  new java.awt.Color (179, 100, 13);
this.graphRec =  new java.awt.Rectangle (50, 10, 600, 460);
this.outPRec =  new java.awt.Rectangle (650, 10, 685, 360);
});
Clazz.makeConstructor (c$, 
function () {
Clazz.superConstructor (this, TSd3Canvas, []);
this.setBackground (java.awt.Color.white);
this.start_x = 0;
this.end_x = 50;
this.hlines = 10;
this.vlines = 10;
this.addMouseListener (this);
this.mouseOn = false;
});
Clazz.overrideMethod (c$, "paint", 
function (g) {
g.setColor (this.getForeground ());
g.setPaintMode ();
this.drawDiagram (g);
}, "java.awt.Graphics");
Clazz.defineMethod (c$, "redraw", 
function (range) {
switch (range) {
case 0:
this.start_x = 0;
this.end_x = 50;
this.lrange = 0;
break;
case 1:
this.start_x = 0;
this.end_x = 10;
this.lrange = 1;
break;
case 2:
this.start_x = 10;
this.end_x = 20;
this.lrange = 2;
break;
case 3:
this.start_x = 20;
this.end_x = 30;
this.lrange = 3;
break;
case 4:
this.start_x = 30;
this.end_x = 40;
this.lrange = 4;
break;
case 5:
this.start_x = 40;
this.end_x = 50;
this.lrange = 4;
break;
}
this.repaint ();
}, "~N");
Clazz.defineMethod (c$, "drawDiagram", 
($fz = function (g) {
this.displayGraph (g);
}, $fz.isPrivate = true, $fz), "java.awt.Graphics");
Clazz.defineMethod (c$, "displayGraph", 
($fz = function (g) {
var g2 = g;
var stroke2 =  new java.awt.BasicStroke (2);
var stroke1 =  new java.awt.BasicStroke (1);
var stroke_d1 =  new java.awt.BasicStroke (1, 0, 2, 0,  Clazz.newFloatArray (-1, [6, 6]), 0);
var yDivisor;
g2.clearRect (70, 10, 685, 460);
g2.setColor (java.awt.Color.black);
this.bottomLeft =  new java.awt.Point (this.graphRec.x, this.graphRec.y + this.graphRec.height);
this.btmLeft =  new java.awt.Point (this.outPRec.x, this.outPRec.y + this.outPRec.height);
g2.drawLine (this.bottomLeft.x, this.bottomLeft.y, this.bottomLeft.x + this.graphRec.width, this.bottomLeft.y);
g2.drawLine (this.bottomLeft.x, this.bottomLeft.y, this.bottomLeft.x, this.graphRec.y);
this.xScale = (this.graphRec.width / (this.end_x - this.start_x));
if (this.end_x < 35) {
yDivisor = TanSugd3S.CalcD2T2g (this.end_x);
} else yDivisor = TanSugd3S.CalcP4T1g (this.end_x);
this.yScale = this.graphRec.height / yDivisor;
var start_x1 =  Clazz.newIntArray (-1, [(this.bottomLeft.x)]);
var start_x2 =  Clazz.newIntArray (-1, [(this.bottomLeft.x)]);
var start_x3 =  Clazz.newIntArray (-1, [(this.bottomLeft.x)]);
var start_x4 =  Clazz.newIntArray (-1, [(this.bottomLeft.x)]);
var start_x5 =  Clazz.newIntArray (-1, [(this.bottomLeft.x)]);
var start_x6 =  Clazz.newIntArray (-1, [(this.bottomLeft.x)]);
var start_x7 =  Clazz.newIntArray (-1, [(this.bottomLeft.x)]);
var start_x8 =  Clazz.newIntArray (-1, [(this.bottomLeft.x)]);
var start_x9 =  Clazz.newIntArray (-1, [(this.bottomLeft.x)]);
var start_x10 =  Clazz.newIntArray (-1, [(this.bottomLeft.x)]);
var start_x11 =  Clazz.newIntArray (-1, [(this.bottomLeft.x)]);
var start_y1 =  Clazz.newIntArray (-1, [Clazz.doubleToInt (this.bottomLeft.y - (this.start_x * this.yScale))]);
this.$y = TanSugd3S.CalcF4T1g (this.start_x);
var start_y2 =  Clazz.newIntArray (-1, [Clazz.doubleToInt (this.bottomLeft.y - (this.yScale * this.$y))]);
this.$y = TanSugd3S.CalcP4T1g (this.start_x);
var start_y3 =  Clazz.newIntArray (-1, [Clazz.doubleToInt (this.bottomLeft.y - (this.yScale * this.$y))]);
this.$y = TanSugd3S.CalcG2Eg (this.start_x);
var start_y4 =  Clazz.newIntArray (-1, [Clazz.doubleToInt (this.bottomLeft.y - (this.yScale * this.$y))]);
this.$y = TanSugd3S.CalcG2T1g (this.start_x);
var start_y5 =  Clazz.newIntArray (-1, [Clazz.doubleToInt (this.bottomLeft.y - (this.yScale * this.$y))]);
this.$y = TanSugd3S.CalcG2T2g (this.start_x);
var start_y6 =  Clazz.newIntArray (-1, [Clazz.doubleToInt (this.bottomLeft.y - (this.yScale * this.$y))]);
this.$y = TanSugd3S.CalcG2A1g (this.start_x);
var start_y7 =  Clazz.newIntArray (-1, [Clazz.doubleToInt (this.bottomLeft.y - (this.yScale * this.$y))]);
this.$y = TanSugd3S.CalcD2T2g (this.start_x);
var start_y8 =  Clazz.newIntArray (-1, [Clazz.doubleToInt (this.bottomLeft.y - (this.yScale * this.$y))]);
this.$y = TanSugd3S.CalcH2T2g (this.start_x);
var start_y9 =  Clazz.newIntArray (-1, [Clazz.doubleToInt (this.bottomLeft.y - (this.yScale * this.$y))]);
this.$y = TanSugd3S.CalcH2T1g (this.start_x);
var start_y10 =  Clazz.newIntArray (-1, [Clazz.doubleToInt (this.bottomLeft.y - (this.yScale * this.$y))]);
this.$y = TanSugd3S.CalcH2Eg (this.start_x);
var start_y11 =  Clazz.newIntArray (-1, [Clazz.doubleToInt (this.bottomLeft.y - (this.yScale * this.$y))]);
var hSlines = Clazz.doubleToInt (this.graphRec.height / this.hlines);
var vSlines = Clazz.doubleToInt (this.graphRec.width / this.vlines);
g2.setColor (this.ltgrey);
g2.setStroke (stroke1);
for (var ii = 1; ii <= this.hlines; ii++) {
g2.drawLine (this.bottomLeft.x, this.bottomLeft.y - (ii * hSlines), this.bottomLeft.x + this.graphRec.width, this.bottomLeft.y - (ii * hSlines));
}
for (var ii = 1; ii <= this.vlines; ii++) {
g2.drawLine (this.bottomLeft.x + (ii * vSlines), this.bottomLeft.y, this.bottomLeft.x + (ii * vSlines), this.bottomLeft.y - this.graphRec.height);
}
for (this.$x = this.start_x; this.$x <= this.end_x; this.$x++) {
g2.setStroke (stroke2);
g2.setColor (java.awt.Color.red);
this.$y = this.$x;
this.drawXtoY (this.$x, this.$y, start_x1, start_y1, g);
g2.setColor (java.awt.Color.blue);
this.$y = TanSugd3S.CalcF4T1g (this.$x);
this.drawXtoY (this.$x, this.$y, start_x2, start_y2, g);
g2.setColor (this.dkgreen);
this.$y = TanSugd3S.CalcP4T1g (this.$x);
this.drawXtoY (this.$x, this.$y, start_x3, start_y3, g);
g2.setStroke (stroke_d1);
g2.setColor (this.teal);
this.$y = TanSugd3S.CalcG2Eg (this.$x);
this.drawXtoY (this.$x, this.$y, start_x4, start_y4, g);
g2.setColor (java.awt.Color.orange);
this.$y = TanSugd3S.CalcG2T1g (this.$x);
this.drawXtoY (this.$x, this.$y, start_x5, start_y5, g);
g2.setColor (this.gold);
this.$y = TanSugd3S.CalcG2T2g (this.$x);
this.drawXtoY (this.$x, this.$y, start_x6, start_y6, g);
g2.setColor (java.awt.Color.gray);
this.$y = TanSugd3S.CalcG2A1g (this.$x);
this.drawXtoY (this.$x, this.$y, start_x7, start_y7, g);
g2.setColor (this.purple);
this.$y = TanSugd3S.CalcD2T2g (this.$x);
this.drawXtoY (this.$x, this.$y, start_x8, start_y8, g);
g2.setColor (this.lgreen);
this.$y = TanSugd3S.CalcH2T2g (this.$x);
this.drawXtoY (this.$x, this.$y, start_x9, start_y9, g);
g2.setColor (this.copper);
this.$y = TanSugd3S.CalcH2Eg (this.$x);
this.drawXtoY (this.$x, this.$y, start_x11, start_y11, g);
g2.setColor (this.dgreen);
this.$y = TanSugd3S.CalcH2T1g (this.$x);
this.drawXtoY (this.$x, this.$y, start_x10, start_y10, g);
}
g2.setStroke (stroke1);
g2.setColor (java.awt.Color.black);
g2.setFont (this.fb);
var sx = this.bottomLeft.x;
var sy = this.bottomLeft.y;
g2.drawString ("" + this.start_x, sx, sy + 15);
g2.drawString ("delta/B", sx + 170, sy + 15);
g2.drawString ("C/B=4.5", sx + 345, sy + 30);
g2.drawString ("" + this.end_x, this.graphRec.width + 35, sy + 15);
g2.drawString ("E/B", sx - 35, this.graphRec.y + 100);
if (this.lrange == 0) {
g2.drawString ("4F", sx - 25, this.graphRec.y + 465);
g2.drawString ("4P", sx - 25, this.graphRec.y + 400);
g2.drawString ("2G", sx - 25, this.graphRec.y + 385);
g2.drawString ("2H", sx - 25, this.graphRec.y + 370);
g2.drawString ("2D", sx - 25, this.graphRec.y + 355);
}if (this.mouseOn) {
g2.setColor (java.awt.Color.black);
this.gx = Clazz.doubleToInt (((this.deltaB - this.start_x) * this.xScale) + this.bottomLeft.x);
g2.drawLine (this.gx, this.bottomLeft.y, this.gx, this.graphRec.y);
g2.setFont (this.f);
g2.drawString ("delta/B'   " + this.toThreePlaces (this.deltaB), this.outPRec.x, this.outPRec.y + 15);
g2.setColor (java.awt.Color.red);
g2.drawString ("v1(T2g)/B' " + this.toThreePlaces (this.y1), this.outPRec.x, this.outPRec.y + 28);
g2.setColor (java.awt.Color.blue);
g2.drawString ("v2(T1g)/B' " + this.toThreePlaces (this.y2), this.outPRec.x, this.outPRec.y + 43);
g2.setColor (this.dkgreen);
g2.drawString ("v3(T1g)/B' " + this.toThreePlaces (this.y3), this.outPRec.x, this.outPRec.y + 56);
g2.setColor (java.awt.Color.black);
g2.drawString ("ratio v2/v1 " + this.toThreePlaces (this.ratio21), this.outPRec.x, this.outPRec.y + 70);
g2.setColor (this.teal);
g2.drawString ("f1 (Eg)/B' " + this.toThreePlaces (this.fE), this.outPRec.x, this.outPRec.y + 83);
g2.setColor (java.awt.Color.orange);
g2.drawString ("f2(T1g)/B' " + this.toThreePlaces (this.fT1), this.outPRec.x, this.outPRec.y + 98);
g2.setColor (this.gold);
g2.drawString ("f3(T2g)/B' " + this.toThreePlaces (this.fT2), this.outPRec.x, this.outPRec.y + 113);
g2.setColor (java.awt.Color.gray);
g2.drawString ("f4(A1g)/B' " + this.toThreePlaces (this.fA1), this.outPRec.x, this.outPRec.y + 128);
g2.setColor (this.lgreen);
g2.drawString ("f5(T2g)/B' " + this.toThreePlaces (this.fT2H), this.outPRec.x, this.outPRec.y + 143);
g2.setColor (this.copper);
g2.drawString ("f6(Eg)/B'  " + this.toThreePlaces (this.fEH), this.outPRec.x, this.outPRec.y + 159);
g2.setColor (this.dgreen);
g2.drawString ("f7(T1g)/B' " + this.toThreePlaces (this.fT1H), this.outPRec.x, this.outPRec.y + 173);
g2.setColor (this.purple);
g2.drawString ("f8(T2g)/B' " + this.toThreePlaces (this.fT2b), this.outPRec.x, this.outPRec.y + 189);
this.mouseOn = false;
}}, $fz.isPrivate = true, $fz), "java.awt.Graphics");
Clazz.defineMethod (c$, "toThreePlaces", 
function ($in) {
var temp = Math.round ($in * 1000);
var tmp =  String.instantialize ("" + temp);
return (tmp.substring (0, tmp.length - 3) + "." + tmp.substring (tmp.length - 3, tmp.length));
}, "~N");
Clazz.defineMethod (c$, "drawXtoY", 
($fz = function (x, y, screen_x, screen_y, g) {
var end_x1;
var end_y1;
end_x1 = Clazz.doubleToInt (((x - this.start_x) * this.xScale) + this.bottomLeft.x);
end_y1 = Clazz.doubleToInt (this.bottomLeft.y - (y * this.yScale));
g.drawLine (screen_x[0], screen_y[0], end_x1, end_y1);
screen_x[0] = end_x1;
screen_y[0] = end_y1;
}, $fz.isPrivate = true, $fz), "~N,~N,~A,~A,java.awt.Graphics");
Clazz.overrideMethod (c$, "mouseReleased", 
function (e) {
this.mouseOn = true;
e.consume ();
this.gx = e.getX ();
this.deltaB = ((this.gx - this.bottomLeft.x) / this.xScale) + this.start_x;
if ((this.deltaB >= this.start_x) && (this.deltaB <= this.end_x)) {
this.x1 = this.deltaB;
this.y1 = this.x1;
this.y2 = TanSugd3S.CalcF4T1g (this.x1);
this.y3 = TanSugd3S.CalcP4T1g (this.x1);
this.fE = TanSugd3S.CalcG2Eg (this.x1);
this.fT1 = TanSugd3S.CalcG2T1g (this.x1);
this.fT2 = TanSugd3S.CalcG2T2g (this.x1);
this.fA1 = TanSugd3S.CalcG2A1g (this.x1);
this.fT2b = TanSugd3S.CalcD2T2g (this.x1);
this.fT2H = TanSugd3S.CalcH2T2g (this.x1);
this.fEH = TanSugd3S.CalcH2Eg (this.x1);
this.fT1H = TanSugd3S.CalcH2T1g (this.x1);
this.ratio21 = this.y2 / this.y1;
this.ratio31 = this.y3 / this.y1;
this.ratio32 = this.y3 / this.y2;
this.repaint ();
}}, "java.awt.event.MouseEvent");
Clazz.overrideMethod (c$, "mouseEntered", 
function (e) {
}, "java.awt.event.MouseEvent");
Clazz.overrideMethod (c$, "mouseExited", 
function (e) {
}, "java.awt.event.MouseEvent");
Clazz.overrideMethod (c$, "mouseClicked", 
function (e) {
}, "java.awt.event.MouseEvent");
Clazz.overrideMethod (c$, "mousePressed", 
function (e) {
}, "java.awt.event.MouseEvent");
c$ = Clazz.decorateAsClass (function () {
this.s = null;
this.e = null;
this.canvas = null;
this.range = 0;
Clazz.instantialize (this, arguments);
}, null, "TSd3Controls", javax.swing.JPanel, java.awt.event.ItemListener);
Clazz.makeConstructor (c$, 
function (canvas) {
Clazz.superConstructor (this, TSd3Controls, []);
this.canvas = canvas;
this.range = 0;
var bg =  new javax.swing.ButtonGroup ();
this.addButton (bg, "0-50", true);
this.addButton (bg, "0-10", false);
this.addButton (bg, "10-20", false);
this.addButton (bg, "20-30", false);
this.addButton (bg, "30-40", false);
this.addButton (bg, "40-50", false);
this.setVisible (true);
}, "TSd3Canvas");
Clazz.defineMethod (c$, "addButton", 
($fz = function (bg, text, b) {
var c;
bg.add (c =  new javax.swing.JRadioButton (text, b));
this.add (c);
c.addItemListener (this);
}, $fz.isPrivate = true, $fz), "javax.swing.ButtonGroup,~S,~B");
Clazz.overrideMethod (c$, "itemStateChanged", 
function (e) {
if (Clazz.instanceOf (e.getSource (), javax.swing.JRadioButton)) {
if ((e.getItemSelectable ()).getText () === "0-50") {
this.range = 0;
this.canvas.redraw (this.range);
} else if ((e.getItemSelectable ()).getText () === "0-10") {
this.range = 1;
this.canvas.redraw (this.range);
} else if ((e.getItemSelectable ()).getText () === "10-20") {
this.range = 2;
this.canvas.redraw (this.range);
} else if ((e.getItemSelectable ()).getText () === "20-30") {
this.range = 3;
this.canvas.redraw (this.range);
} else if ((e.getItemSelectable ()).getText () === "30-40") {
this.range = 4;
this.canvas.redraw (this.range);
} else if ((e.getItemSelectable ()).getText () === "40-50") {
this.range = 5;
this.canvas.redraw (this.range);
}}}, "java.awt.event.ItemEvent");
});

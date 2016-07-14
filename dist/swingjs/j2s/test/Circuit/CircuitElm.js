Clazz.declarePackage ("test.Circuit");
Clazz.load (["test.Circuit.Editable"], "test.Circuit.CircuitElm", ["java.awt.Color", "$.Font", "$.Point", "$.Polygon", "$.Rectangle", "java.text.DecimalFormat", "test.Circuit.CirSim"], function () {
c$ = Clazz.decorateAsClass (function () {
this.x = 0;
this.y = 0;
this.x2 = 0;
this.y2 = 0;
this.flags = 0;
this.nodes = 0;
this.voltSource = 0;
this.dx = 0;
this.dy = 0;
this.dsign = 0;
this.dn = 0;
this.dpx1 = 0;
this.dpy1 = 0;
this.point1 = null;
this.point2 = null;
this.lead1 = null;
this.lead2 = null;
this.volts = null;
this.current = 0;
this.curcount = 0;
this.boundingBox = null;
this.noDiagonal = false;
this.selected = false;
Clazz.instantialize (this, arguments);
}, test.Circuit, "CircuitElm", null, test.Circuit.Editable);
Clazz.defineMethod (c$, "getDumpType", 
function () {
return 0;
});
Clazz.defineMethod (c$, "getDumpClass", 
function () {
return this.getClass ();
});
Clazz.defineMethod (c$, "getDefaultFlags", 
function () {
return 0;
});
c$.initClass = Clazz.defineMethod (c$, "initClass", 
function (s) {
test.Circuit.CircuitElm.unitsFont =  new java.awt.Font ("SansSerif", 0, 10);
test.Circuit.CircuitElm.sim = s;
test.Circuit.CircuitElm.colorScale =  new Array (test.Circuit.CircuitElm.colorScaleCount);
var i;
for (i = 0; i != test.Circuit.CircuitElm.colorScaleCount; i++) {
var v = i * 2. / test.Circuit.CircuitElm.colorScaleCount - 1;
if (v < 0) {
var n1 = Clazz.doubleToInt (128 * -v) + 127;
var n2 = Clazz.doubleToInt (127 * (1 + v));
test.Circuit.CircuitElm.colorScale[i] =  new java.awt.Color (n1, n2, n2);
} else {
var n1 = Clazz.doubleToInt (128 * v) + 127;
var n2 = Clazz.doubleToInt (127 * (1 - v));
test.Circuit.CircuitElm.colorScale[i] =  new java.awt.Color (n2, n1, n2);
}}
test.Circuit.CircuitElm.ps1 =  new java.awt.Point ();
test.Circuit.CircuitElm.ps2 =  new java.awt.Point ();
test.Circuit.CircuitElm.showFormat = java.text.DecimalFormat.getInstance ();
test.Circuit.CircuitElm.showFormat.setMaximumFractionDigits (2);
test.Circuit.CircuitElm.shortFormat = java.text.DecimalFormat.getInstance ();
test.Circuit.CircuitElm.shortFormat.setMaximumFractionDigits (1);
test.Circuit.CircuitElm.noCommaFormat = java.text.DecimalFormat.getInstance ();
test.Circuit.CircuitElm.noCommaFormat.setMaximumFractionDigits (10);
test.Circuit.CircuitElm.noCommaFormat.setGroupingUsed (false);
}, "test.Circuit.CirSim");
Clazz.makeConstructor (c$, 
function (xx, yy) {
this.x = this.x2 = xx;
this.y = this.y2 = yy;
this.flags = this.getDefaultFlags ();
this.allocNodes ();
this.initBoundingBox ();
}, "~N,~N");
Clazz.makeConstructor (c$, 
function (xa, ya, xb, yb, f) {
this.x = xa;
this.y = ya;
this.x2 = xb;
this.y2 = yb;
this.flags = f;
this.allocNodes ();
this.initBoundingBox ();
}, "~N,~N,~N,~N,~N");
Clazz.defineMethod (c$, "initBoundingBox", 
function () {
this.boundingBox =  new java.awt.Rectangle ();
this.boundingBox.setBounds (test.Circuit.CircuitElm.min (this.x, this.x2), test.Circuit.CircuitElm.min (this.y, this.y2), test.Circuit.CircuitElm.abs (this.x2 - this.x) + 1, test.Circuit.CircuitElm.abs (this.y2 - this.y) + 1);
});
Clazz.defineMethod (c$, "allocNodes", 
function () {
this.nodes =  Clazz.newIntArray (this.getPostCount () + this.getInternalNodeCount (), 0);
this.volts =  Clazz.newDoubleArray (this.getPostCount () + this.getInternalNodeCount (), 0);
});
Clazz.defineMethod (c$, "dump", 
function () {
var t = this.getDumpType ();
return (t < 127 ? (String.fromCharCode (t)) + " " : t + " ") + this.x + " " + this.y + " " + this.x2 + " " + this.y2 + " " + this.flags;
});
Clazz.defineMethod (c$, "reset", 
function () {
var i;
for (i = 0; i != this.getPostCount () + this.getInternalNodeCount (); i++) this.volts[i] = 0;

this.curcount = 0;
});
Clazz.defineMethod (c$, "draw", 
function (g) {
}, "java.awt.Graphics");
Clazz.defineMethod (c$, "setCurrent", 
function (x, c) {
this.current = c;
}, "~N,~N");
Clazz.defineMethod (c$, "getCurrent", 
function () {
return this.current;
});
Clazz.defineMethod (c$, "doStep", 
function () {
});
Clazz.defineMethod (c$, "$delete", 
function () {
});
Clazz.defineMethod (c$, "startIteration", 
function () {
});
Clazz.defineMethod (c$, "getPostVoltage", 
function (x) {
return this.volts[x];
}, "~N");
Clazz.defineMethod (c$, "setNodeVoltage", 
function (n, c) {
this.volts[n] = c;
this.calculateCurrent ();
}, "~N,~N");
Clazz.defineMethod (c$, "calculateCurrent", 
function () {
});
Clazz.defineMethod (c$, "setPoints", 
function () {
this.dx = this.x2 - this.x;
this.dy = this.y2 - this.y;
this.dn = Math.sqrt (this.dx * this.dx + this.dy * this.dy);
this.dpx1 = this.dy / this.dn;
this.dpy1 = -this.dx / this.dn;
this.dsign = (this.dy == 0) ? test.Circuit.CircuitElm.sign (this.dx) : test.Circuit.CircuitElm.sign (this.dy);
this.point1 =  new java.awt.Point (this.x, this.y);
this.point2 =  new java.awt.Point (this.x2, this.y2);
});
Clazz.defineMethod (c$, "calcLeads", 
function (len) {
if (this.dn < len || len == 0) {
this.lead1 = this.point1;
this.lead2 = this.point2;
return;
}this.lead1 = this.interpPoint (this.point1, this.point2, (this.dn - len) / (2 * this.dn));
this.lead2 = this.interpPoint (this.point1, this.point2, (this.dn + len) / (2 * this.dn));
}, "~N");
Clazz.defineMethod (c$, "interpPoint", 
function (a, b, f) {
var p =  new java.awt.Point ();
this.interpPoint (a, b, p, f);
return p;
}, "java.awt.Point,java.awt.Point,~N");
Clazz.defineMethod (c$, "interpPoint", 
function (a, b, c, f) {
var xpd = b.x - a.x;
var ypd = b.y - a.y;
c.x = Clazz.doubleToInt (Math.floor (a.x * (1 - f) + b.x * f + .48));
c.y = Clazz.doubleToInt (Math.floor (a.y * (1 - f) + b.y * f + .48));
}, "java.awt.Point,java.awt.Point,java.awt.Point,~N");
Clazz.defineMethod (c$, "interpPoint", 
function (a, b, c, f, g) {
var xpd = b.x - a.x;
var ypd = b.y - a.y;
var gx = b.y - a.y;
var gy = a.x - b.x;
g /= Math.sqrt (gx * gx + gy * gy);
c.x = Clazz.doubleToInt (Math.floor (a.x * (1 - f) + b.x * f + g * gx + .48));
c.y = Clazz.doubleToInt (Math.floor (a.y * (1 - f) + b.y * f + g * gy + .48));
}, "java.awt.Point,java.awt.Point,java.awt.Point,~N,~N");
Clazz.defineMethod (c$, "interpPoint", 
function (a, b, f, g) {
var p =  new java.awt.Point ();
this.interpPoint (a, b, p, f, g);
return p;
}, "java.awt.Point,java.awt.Point,~N,~N");
Clazz.defineMethod (c$, "interpPoint2", 
function (a, b, c, d, f, g) {
var xpd = b.x - a.x;
var ypd = b.y - a.y;
var gx = b.y - a.y;
var gy = a.x - b.x;
g /= Math.sqrt (gx * gx + gy * gy);
c.x = Clazz.doubleToInt (Math.floor (a.x * (1 - f) + b.x * f + g * gx + .48));
c.y = Clazz.doubleToInt (Math.floor (a.y * (1 - f) + b.y * f + g * gy + .48));
d.x = Clazz.doubleToInt (Math.floor (a.x * (1 - f) + b.x * f - g * gx + .48));
d.y = Clazz.doubleToInt (Math.floor (a.y * (1 - f) + b.y * f - g * gy + .48));
}, "java.awt.Point,java.awt.Point,java.awt.Point,java.awt.Point,~N,~N");
Clazz.defineMethod (c$, "draw2Leads", 
function (g) {
this.setVoltageColor (g, this.volts[0]);
test.Circuit.CircuitElm.drawThickLine (g, this.point1, this.lead1);
this.setVoltageColor (g, this.volts[1]);
test.Circuit.CircuitElm.drawThickLine (g, this.lead2, this.point2);
}, "java.awt.Graphics");
Clazz.defineMethod (c$, "newPointArray", 
function (n) {
var a =  new Array (n);
while (n > 0) a[--n] =  new java.awt.Point ();

return a;
}, "~N");
Clazz.defineMethod (c$, "drawDots", 
function (g, pa, pb, pos) {
if (test.Circuit.CircuitElm.sim.stoppedCheck.getState () || pos == 0 || !test.Circuit.CircuitElm.sim.dotsCheckItem.getState ()) return;
var dx = pb.x - pa.x;
var dy = pb.y - pa.y;
var dn = Math.sqrt (dx * dx + dy * dy);
g.setColor (java.awt.Color.yellow);
var ds = 16;
pos %= ds;
if (pos < 0) pos += ds;
var di = 0;
for (di = pos; di < dn; di += ds) {
var x0 = Clazz.doubleToInt (pa.x + di * dx / dn);
var y0 = Clazz.doubleToInt (pa.y + di * dy / dn);
g.fillRect (x0 - 1, y0 - 1, 4, 4);
}
}, "java.awt.Graphics,java.awt.Point,java.awt.Point,~N");
Clazz.defineMethod (c$, "calcArrow", 
function (a, b, al, aw) {
var poly =  new java.awt.Polygon ();
var p1 =  new java.awt.Point ();
var p2 =  new java.awt.Point ();
var adx = b.x - a.x;
var ady = b.y - a.y;
var l = Math.sqrt (adx * adx + ady * ady);
poly.addPoint (b.x, b.y);
this.interpPoint2 (a, b, p1, p2, 1 - al / l, aw);
poly.addPoint (p1.x, p1.y);
poly.addPoint (p2.x, p2.y);
return poly;
}, "java.awt.Point,java.awt.Point,~N,~N");
Clazz.defineMethod (c$, "createPolygon", 
function (a, b, c) {
var p =  new java.awt.Polygon ();
p.addPoint (a.x, a.y);
p.addPoint (b.x, b.y);
p.addPoint (c.x, c.y);
return p;
}, "java.awt.Point,java.awt.Point,java.awt.Point");
Clazz.defineMethod (c$, "createPolygon", 
function (a, b, c, d) {
var p =  new java.awt.Polygon ();
p.addPoint (a.x, a.y);
p.addPoint (b.x, b.y);
p.addPoint (c.x, c.y);
p.addPoint (d.x, d.y);
return p;
}, "java.awt.Point,java.awt.Point,java.awt.Point,java.awt.Point");
Clazz.defineMethod (c$, "createPolygon", 
function (a) {
var p =  new java.awt.Polygon ();
var i;
for (i = 0; i != a.length; i++) p.addPoint (a[i].x, a[i].y);

return p;
}, "~A");
Clazz.defineMethod (c$, "drag", 
function (xx, yy) {
xx = test.Circuit.CircuitElm.sim.snapGrid (xx);
yy = test.Circuit.CircuitElm.sim.snapGrid (yy);
if (this.noDiagonal) {
if (Math.abs (this.x - xx) < Math.abs (this.y - yy)) {
xx = this.x;
} else {
yy = this.y;
}}this.x2 = xx;
this.y2 = yy;
this.setPoints ();
}, "~N,~N");
Clazz.defineMethod (c$, "move", 
function (dx, dy) {
this.x += dx;
this.y += dy;
this.x2 += dx;
this.y2 += dy;
this.boundingBox.move (dx, dy);
this.setPoints ();
}, "~N,~N");
Clazz.defineMethod (c$, "allowMove", 
function (dx, dy) {
var nx = this.x + dx;
var ny = this.y + dy;
var nx2 = this.x2 + dx;
var ny2 = this.y2 + dy;
var i;
for (i = 0; i != test.Circuit.CircuitElm.sim.elmList.size (); i++) {
var ce = test.Circuit.CircuitElm.sim.getElm (i);
if (ce.x == nx && ce.y == ny && ce.x2 == nx2 && ce.y2 == ny2) return false;
if (ce.x == nx2 && ce.y == ny2 && ce.x2 == nx && ce.y2 == ny) return false;
}
return true;
}, "~N,~N");
Clazz.defineMethod (c$, "movePoint", 
function (n, dx, dy) {
if (n == 0) {
this.x += dx;
this.y += dy;
} else {
this.x2 += dx;
this.y2 += dy;
}this.setPoints ();
}, "~N,~N,~N");
Clazz.defineMethod (c$, "drawPosts", 
function (g) {
var i;
for (i = 0; i != this.getPostCount (); i++) {
var p = this.getPost (i);
this.drawPost (g, p.x, p.y, this.nodes[i]);
}
}, "java.awt.Graphics");
Clazz.defineMethod (c$, "stamp", 
function () {
});
Clazz.defineMethod (c$, "getVoltageSourceCount", 
function () {
return 0;
});
Clazz.defineMethod (c$, "getInternalNodeCount", 
function () {
return 0;
});
Clazz.defineMethod (c$, "setNode", 
function (p, n) {
this.nodes[p] = n;
}, "~N,~N");
Clazz.defineMethod (c$, "setVoltageSource", 
function (n, v) {
this.voltSource = v;
}, "~N,~N");
Clazz.defineMethod (c$, "getVoltageSource", 
function () {
return this.voltSource;
});
Clazz.defineMethod (c$, "getVoltageDiff", 
function () {
return this.volts[0] - this.volts[1];
});
Clazz.defineMethod (c$, "nonLinear", 
function () {
return false;
});
Clazz.defineMethod (c$, "getPostCount", 
function () {
return 2;
});
Clazz.defineMethod (c$, "getNode", 
function (n) {
return this.nodes[n];
}, "~N");
Clazz.defineMethod (c$, "getPost", 
function (n) {
return (n == 0) ? this.point1 : (n == 1) ? this.point2 : null;
}, "~N");
Clazz.defineMethod (c$, "drawPost", 
function (g, x0, y0, n) {
if (test.Circuit.CircuitElm.sim.dragElm == null && !this.needsHighlight () && test.Circuit.CircuitElm.sim.getCircuitNode (n).links.size () == 2) return;
if (test.Circuit.CircuitElm.sim.mouseMode == 2 || test.Circuit.CircuitElm.sim.mouseMode == 3) return;
this.drawPost (g, x0, y0);
}, "java.awt.Graphics,~N,~N,~N");
Clazz.defineMethod (c$, "drawPost", 
function (g, x0, y0) {
g.setColor (test.Circuit.CircuitElm.whiteColor);
g.fillOval (x0 - 3, y0 - 3, 7, 7);
}, "java.awt.Graphics,~N,~N");
Clazz.defineMethod (c$, "setBbox", 
function (x1, y1, x2, y2) {
if (x1 > x2) {
var q = x1;
x1 = x2;
x2 = q;
}if (y1 > y2) {
var q = y1;
y1 = y2;
y2 = q;
}this.boundingBox.setBounds (x1, y1, x2 - x1 + 1, y2 - y1 + 1);
}, "~N,~N,~N,~N");
Clazz.defineMethod (c$, "setBbox", 
function (p1, p2, w) {
this.setBbox (p1.x, p1.y, p2.x, p2.y);
var gx = p2.y - p1.y;
var gy = p1.x - p2.x;
var dpx = Clazz.doubleToInt (this.dpx1 * w);
var dpy = Clazz.doubleToInt (this.dpy1 * w);
this.adjustBbox (p1.x + dpx, p1.y + dpy, p1.x - dpx, p1.y - dpy);
}, "java.awt.Point,java.awt.Point,~N");
Clazz.defineMethod (c$, "adjustBbox", 
function (x1, y1, x2, y2) {
if (x1 > x2) {
var q = x1;
x1 = x2;
x2 = q;
}if (y1 > y2) {
var q = y1;
y1 = y2;
y2 = q;
}x1 = test.Circuit.CircuitElm.min (this.boundingBox.x, x1);
y1 = test.Circuit.CircuitElm.min (this.boundingBox.y, y1);
x2 = test.Circuit.CircuitElm.max (this.boundingBox.x + this.boundingBox.width - 1, x2);
y2 = test.Circuit.CircuitElm.max (this.boundingBox.y + this.boundingBox.height - 1, y2);
this.boundingBox.setBounds (x1, y1, x2 - x1, y2 - y1);
}, "~N,~N,~N,~N");
Clazz.defineMethod (c$, "adjustBbox", 
function (p1, p2) {
this.adjustBbox (p1.x, p1.y, p2.x, p2.y);
}, "java.awt.Point,java.awt.Point");
Clazz.defineMethod (c$, "isCenteredText", 
function () {
return false;
});
Clazz.defineMethod (c$, "drawCenteredText", 
function (g, s, x, y, cx) {
var fm = g.getFontMetrics ();
var w = fm.stringWidth (s);
if (cx) x -= Clazz.doubleToInt (w / 2);
g.drawString (s, x, y + Clazz.doubleToInt (fm.getAscent () / 2));
this.adjustBbox (x, y - Clazz.doubleToInt (fm.getAscent () / 2), x + w, y + Clazz.doubleToInt (fm.getAscent () / 2) + fm.getDescent ());
}, "java.awt.Graphics,~S,~N,~N,~B");
Clazz.defineMethod (c$, "drawValues", 
function (g, s, hs) {
if (s == null) return;
g.setFont (test.Circuit.CircuitElm.unitsFont);
var fm = g.getFontMetrics ();
var w = fm.stringWidth (s);
g.setColor (test.Circuit.CircuitElm.whiteColor);
var ya = Clazz.doubleToInt (fm.getAscent () / 2);
var xc;
var yc;
if (Clazz.instanceOf (this, test.Circuit.RailElm) || Clazz.instanceOf (this, test.Circuit.SweepElm)) {
xc = this.x2;
yc = this.y2;
} else {
xc = Clazz.doubleToInt ((this.x2 + this.x) / 2);
yc = Clazz.doubleToInt ((this.y2 + this.y) / 2);
}var dpx = Clazz.doubleToInt (this.dpx1 * hs);
var dpy = Clazz.doubleToInt (this.dpy1 * hs);
if (dpx == 0) {
g.drawString (s, xc - Clazz.doubleToInt (w / 2), yc - test.Circuit.CircuitElm.abs (dpy) - 2);
} else {
var xx = xc + test.Circuit.CircuitElm.abs (dpx) + 2;
if (Clazz.instanceOf (this, test.Circuit.VoltageElm) || (this.x < this.x2 && this.y > this.y2)) xx = xc - (w + test.Circuit.CircuitElm.abs (dpx) + 2);
g.drawString (s, xx, yc + dpy + ya);
}}, "java.awt.Graphics,~S,~N");
Clazz.defineMethod (c$, "drawCoil", 
function (g, hs, p1, p2, v1, v2) {
var len = test.Circuit.CircuitElm.distance (p1, p2);
var segments = 30;
var i;
var segf = 1. / segments;
test.Circuit.CircuitElm.ps1.setLocation (p1);
for (i = 0; i != segments; i++) {
var cx = (((i + 1) * 6. * segf) % 2) - 1;
var hsx = Math.sqrt (1 - cx * cx);
if (hsx < 0) hsx = -hsx;
this.interpPoint (p1, p2, test.Circuit.CircuitElm.ps2, i * segf, hsx * hs);
var v = v1 + (v2 - v1) * i / segments;
this.setVoltageColor (g, v);
test.Circuit.CircuitElm.drawThickLine (g, test.Circuit.CircuitElm.ps1, test.Circuit.CircuitElm.ps2);
test.Circuit.CircuitElm.ps1.setLocation (test.Circuit.CircuitElm.ps2);
}
}, "java.awt.Graphics,~N,java.awt.Point,java.awt.Point,~N,~N");
c$.drawThickLine = Clazz.defineMethod (c$, "drawThickLine", 
function (g, x, y, x2, y2) {
g.drawLine (x, y, x2, y2);
g.drawLine (x + 1, y, x2 + 1, y2);
g.drawLine (x, y + 1, x2, y2 + 1);
g.drawLine (x + 1, y + 1, x2 + 1, y2 + 1);
}, "java.awt.Graphics,~N,~N,~N,~N");
c$.drawThickLine = Clazz.defineMethod (c$, "drawThickLine", 
function (g, pa, pb) {
g.drawLine (pa.x, pa.y, pb.x, pb.y);
g.drawLine (pa.x + 1, pa.y, pb.x + 1, pb.y);
g.drawLine (pa.x, pa.y + 1, pb.x, pb.y + 1);
g.drawLine (pa.x + 1, pa.y + 1, pb.x + 1, pb.y + 1);
}, "java.awt.Graphics,java.awt.Point,java.awt.Point");
c$.drawThickPolygon = Clazz.defineMethod (c$, "drawThickPolygon", 
function (g, xs, ys, c) {
var i;
for (i = 0; i != c - 1; i++) test.Circuit.CircuitElm.drawThickLine (g, xs[i], ys[i], xs[i + 1], ys[i + 1]);

test.Circuit.CircuitElm.drawThickLine (g, xs[i], ys[i], xs[0], ys[0]);
}, "java.awt.Graphics,~A,~A,~N");
c$.drawThickPolygon = Clazz.defineMethod (c$, "drawThickPolygon", 
function (g, p) {
test.Circuit.CircuitElm.drawThickPolygon (g, p.xpoints, p.ypoints, p.npoints);
}, "java.awt.Graphics,java.awt.Polygon");
c$.drawThickCircle = Clazz.defineMethod (c$, "drawThickCircle", 
function (g, cx, cy, ri) {
var a;
var m = 0.017453292519943295;
var r = ri * .98;
for (a = 0; a != 360; a += 20) {
var ax = Math.cos (a * m) * r + cx;
var ay = Math.sin (a * m) * r + cy;
var bx = Math.cos ((a + 20) * m) * r + cx;
var by = Math.sin ((a + 20) * m) * r + cy;
test.Circuit.CircuitElm.drawThickLine (g, Clazz.doubleToInt (ax), Clazz.doubleToInt (ay), Clazz.doubleToInt (bx), Clazz.doubleToInt (by));
}
}, "java.awt.Graphics,~N,~N,~N");
c$.getVoltageDText = Clazz.defineMethod (c$, "getVoltageDText", 
function (v) {
return test.Circuit.CircuitElm.getUnitText (Math.abs (v), "V");
}, "~N");
c$.getVoltageText = Clazz.defineMethod (c$, "getVoltageText", 
function (v) {
return test.Circuit.CircuitElm.getUnitText (v, "V");
}, "~N");
c$.getUnitText = Clazz.defineMethod (c$, "getUnitText", 
function (v, u) {
var va = Math.abs (v);
if (va < 1e-14) return "0 " + u;
if (va < 1e-9) return test.Circuit.CircuitElm.showFormat.format (v * 1e12) + " p" + u;
if (va < 1e-6) return test.Circuit.CircuitElm.showFormat.format (v * 1e9) + " n" + u;
if (va < 1e-3) return test.Circuit.CircuitElm.showFormat.format (v * 1e6) + " " + test.Circuit.CirSim.muString + u;
if (va < 1) return test.Circuit.CircuitElm.showFormat.format (v * 1e3) + " m" + u;
if (va < 1e3) return test.Circuit.CircuitElm.showFormat.format (v) + " " + u;
if (va < 1e6) return test.Circuit.CircuitElm.showFormat.format (v * 1e-3) + " k" + u;
if (va < 1e9) return test.Circuit.CircuitElm.showFormat.format (v * 1e-6) + " M" + u;
return test.Circuit.CircuitElm.showFormat.format (v * 1e-9) + " G" + u;
}, "~N,~S");
c$.getShortUnitText = Clazz.defineMethod (c$, "getShortUnitText", 
function (v, u) {
var va = Math.abs (v);
if (va < 1e-13) return null;
if (va < 1e-9) return test.Circuit.CircuitElm.shortFormat.format (v * 1e12) + "p" + u;
if (va < 1e-6) return test.Circuit.CircuitElm.shortFormat.format (v * 1e9) + "n" + u;
if (va < 1e-3) return test.Circuit.CircuitElm.shortFormat.format (v * 1e6) + test.Circuit.CirSim.muString + u;
if (va < 1) return test.Circuit.CircuitElm.shortFormat.format (v * 1e3) + "m" + u;
if (va < 1e3) return test.Circuit.CircuitElm.shortFormat.format (v) + u;
if (va < 1e6) return test.Circuit.CircuitElm.shortFormat.format (v * 1e-3) + "k" + u;
if (va < 1e9) return test.Circuit.CircuitElm.shortFormat.format (v * 1e-6) + "M" + u;
return test.Circuit.CircuitElm.shortFormat.format (v * 1e-9) + "G" + u;
}, "~N,~S");
c$.getCurrentText = Clazz.defineMethod (c$, "getCurrentText", 
function (i) {
return test.Circuit.CircuitElm.getUnitText (i, "A");
}, "~N");
c$.getCurrentDText = Clazz.defineMethod (c$, "getCurrentDText", 
function (i) {
return test.Circuit.CircuitElm.getUnitText (Math.abs (i), "A");
}, "~N");
Clazz.defineMethod (c$, "updateDotCount", 
function () {
this.curcount = this.updateDotCount (this.current, this.curcount);
});
Clazz.defineMethod (c$, "updateDotCount", 
function (cur, cc) {
if (test.Circuit.CircuitElm.sim.stoppedCheck.getState ()) return cc;
var cadd = cur * test.Circuit.CircuitElm.currentMult;
cadd %= 8;
return cc + cadd;
}, "~N,~N");
Clazz.defineMethod (c$, "doDots", 
function (g) {
this.updateDotCount ();
if (test.Circuit.CircuitElm.sim.dragElm !== this) this.drawDots (g, this.point1, this.point2, this.curcount);
}, "java.awt.Graphics");
Clazz.defineMethod (c$, "doAdjust", 
function () {
});
Clazz.defineMethod (c$, "setupAdjust", 
function () {
});
Clazz.defineMethod (c$, "getInfo", 
function (arr) {
}, "~A");
Clazz.defineMethod (c$, "getBasicInfo", 
function (arr) {
arr[1] = "I = " + test.Circuit.CircuitElm.getCurrentDText (this.getCurrent ());
arr[2] = "Vd = " + test.Circuit.CircuitElm.getVoltageDText (this.getVoltageDiff ());
return 3;
}, "~A");
Clazz.defineMethod (c$, "setVoltageColor", 
function (g, volts) {
if (this.needsHighlight ()) {
g.setColor (test.Circuit.CircuitElm.selectColor);
return;
}if (!test.Circuit.CircuitElm.sim.voltsCheckItem.getState ()) {
if (!test.Circuit.CircuitElm.sim.powerCheckItem.getState ()) g.setColor (test.Circuit.CircuitElm.whiteColor);
return;
}var c = Clazz.doubleToInt ((volts + test.Circuit.CircuitElm.voltageRange) * (test.Circuit.CircuitElm.colorScaleCount - 1) / (test.Circuit.CircuitElm.voltageRange * 2));
if (c < 0) c = 0;
if (c >= test.Circuit.CircuitElm.colorScaleCount) c = test.Circuit.CircuitElm.colorScaleCount - 1;
g.setColor (test.Circuit.CircuitElm.colorScale[c]);
}, "java.awt.Graphics,~N");
Clazz.defineMethod (c$, "setPowerColor", 
function (g, yellow) {
if (!test.Circuit.CircuitElm.sim.powerCheckItem.getState ()) return;
this.setPowerColor (g, this.getPower ());
}, "java.awt.Graphics,~B");
Clazz.defineMethod (c$, "setPowerColor", 
function (g, w0) {
w0 *= test.Circuit.CircuitElm.powerMult;
var w = (w0 < 0) ? -w0 : w0;
if (w > 1) w = 1;
var rg = 128 + Clazz.doubleToInt (w * 127);
var b = Clazz.doubleToInt (128 * (1 - w));
if (w0 > 0) g.setColor ( new java.awt.Color (rg, b, b));
 else g.setColor ( new java.awt.Color (b, rg, b));
}, "java.awt.Graphics,~N");
Clazz.defineMethod (c$, "setConductanceColor", 
function (g, w0) {
w0 *= test.Circuit.CircuitElm.powerMult;
var w = (w0 < 0) ? -w0 : w0;
if (w > 1) w = 1;
var rg = Clazz.doubleToInt (w * 255);
g.setColor ( new java.awt.Color (rg, rg, rg));
}, "java.awt.Graphics,~N");
Clazz.defineMethod (c$, "getPower", 
function () {
return this.getVoltageDiff () * this.current;
});
Clazz.defineMethod (c$, "getScopeValue", 
function (x) {
return (x == 1) ? this.getPower () : this.getVoltageDiff ();
}, "~N");
Clazz.defineMethod (c$, "getScopeUnits", 
function (x) {
return (x == 1) ? "W" : "V";
}, "~N");
Clazz.overrideMethod (c$, "getEditInfo", 
function (n) {
return null;
}, "~N");
Clazz.overrideMethod (c$, "setEditValue", 
function (n, ei) {
}, "~N,test.Circuit.EditInfo");
Clazz.defineMethod (c$, "getConnection", 
function (n1, n2) {
return true;
}, "~N,~N");
Clazz.defineMethod (c$, "hasGroundConnection", 
function (n1) {
return false;
}, "~N");
Clazz.defineMethod (c$, "isWire", 
function () {
return false;
});
Clazz.defineMethod (c$, "canViewInScope", 
function () {
return this.getPostCount () <= 2;
});
Clazz.defineMethod (c$, "comparePair", 
function (x1, x2, y1, y2) {
return ((x1 == y1 && x2 == y2) || (x1 == y2 && x2 == y1));
}, "~N,~N,~N,~N");
Clazz.defineMethod (c$, "needsHighlight", 
function () {
return test.Circuit.CircuitElm.sim.mouseElm === this || this.selected;
});
Clazz.defineMethod (c$, "isSelected", 
function () {
return this.selected;
});
Clazz.defineMethod (c$, "setSelected", 
function (x) {
this.selected = x;
}, "~B");
Clazz.defineMethod (c$, "selectRect", 
function (r) {
this.selected = r.intersects (this.boundingBox);
}, "java.awt.Rectangle");
c$.abs = Clazz.defineMethod (c$, "abs", 
function (x) {
return x < 0 ? -x : x;
}, "~N");
c$.sign = Clazz.defineMethod (c$, "sign", 
function (x) {
return (x < 0) ? -1 : (x == 0) ? 0 : 1;
}, "~N");
c$.min = Clazz.defineMethod (c$, "min", 
function (a, b) {
return (a < b) ? a : b;
}, "~N,~N");
c$.max = Clazz.defineMethod (c$, "max", 
function (a, b) {
return (a > b) ? a : b;
}, "~N,~N");
c$.distance = Clazz.defineMethod (c$, "distance", 
function (p1, p2) {
var x = p1.x - p2.x;
var y = p1.y - p2.y;
return Math.sqrt (x * x + y * y);
}, "java.awt.Point,java.awt.Point");
Clazz.defineMethod (c$, "getBoundingBox", 
function () {
return this.boundingBox;
});
Clazz.defineMethod (c$, "needsShortcut", 
function () {
return this.getShortcut () > 0;
});
Clazz.defineMethod (c$, "getShortcut", 
function () {
return 0;
});
Clazz.defineMethod (c$, "isGraphicElmt", 
function () {
return false;
});
Clazz.defineStatics (c$,
"voltageRange", 5,
"colorScaleCount", 32,
"colorScale", null,
"currentMult", 0,
"powerMult", 0,
"ps1", null,
"ps2", null,
"sim", null,
"whiteColor", null,
"selectColor", null,
"lightGrayColor", null,
"unitsFont", null,
"showFormat", null,
"shortFormat", null,
"noCommaFormat", null,
"pi", 3.14159265358979323846);
});

Clazz.declarePackage ("test.Circuit");
Clazz.load (["test.Circuit.CircuitElm"], "test.Circuit.ChipElm", ["java.awt.Checkbox", "$.Color", "$.Font", "$.Point", "java.lang.Double", "test.Circuit.EditInfo"], function () {
c$ = Clazz.decorateAsClass (function () {
this.csize = 0;
this.cspc = 0;
this.cspc2 = 0;
this.bits = 0;
this.FLAG_SMALL = 1;
this.FLAG_FLIP_X = 1024;
this.FLAG_FLIP_Y = 2048;
this.rectPointsX = null;
this.rectPointsY = null;
this.clockPointsX = null;
this.clockPointsY = null;
this.pins = null;
this.sizeX = 0;
this.sizeY = 0;
this.lastClock = false;
this.SIDE_N = 0;
this.SIDE_S = 1;
this.SIDE_W = 2;
this.SIDE_E = 3;
if (!Clazz.isClassDefined ("test.Circuit.ChipElm.Pin")) {
test.Circuit.ChipElm.$ChipElm$Pin$ ();
}
Clazz.instantialize (this, arguments);
}, test.Circuit, "ChipElm", test.Circuit.CircuitElm);
Clazz.makeConstructor (c$, 
function (xx, yy) {
Clazz.superConstructor (this, test.Circuit.ChipElm, [xx, yy]);
if (this.needsBits ()) this.bits = (Clazz.instanceOf (this, test.Circuit.DecadeElm)) ? 10 : 4;
this.noDiagonal = true;
this.setupPins ();
this.setSize (test.Circuit.CircuitElm.sim.smallGridCheckItem.getState () ? 1 : 2);
}, "~N,~N");
Clazz.makeConstructor (c$, 
function (xa, ya, xb, yb, f, st) {
Clazz.superConstructor (this, test.Circuit.ChipElm, [xa, ya, xb, yb, f]);
if (this.needsBits ()) this.bits =  new Integer (st.nextToken ()).intValue ();
this.noDiagonal = true;
this.setupPins ();
this.setSize ((f & 1) != 0 ? 1 : 2);
var i;
for (i = 0; i != this.getPostCount (); i++) {
if (this.pins[i].state) {
this.volts[i] =  new Double (st.nextToken ()).doubleValue ();
this.pins[i].value = this.volts[i] > 2.5;
}}
}, "~N,~N,~N,~N,~N,java.util.StringTokenizer");
Clazz.defineMethod (c$, "needsBits", 
function () {
return false;
});
Clazz.defineMethod (c$, "setSize", 
function (s) {
this.csize = s;
this.cspc = 8 * s;
this.cspc2 = this.cspc * 2;
this.flags &= -2;
this.flags |= (s == 1) ? 1 : 0;
}, "~N");
Clazz.overrideMethod (c$, "draw", 
function (g) {
this.drawChip (g);
}, "java.awt.Graphics");
Clazz.defineMethod (c$, "drawChip", 
function (g) {
var i;
var f =  new java.awt.Font ("SansSerif", 0, 10 * this.csize);
g.setFont (f);
var fm = g.getFontMetrics ();
for (i = 0; i != this.getPostCount (); i++) {
var p = this.pins[i];
this.setVoltageColor (g, this.volts[i]);
var a = p.post;
var b = p.stub;
test.Circuit.CircuitElm.drawThickLine (g, a, b);
p.curcount = this.updateDotCount (p.current, p.curcount);
this.drawDots (g, b, a, p.curcount);
if (p.bubble) {
g.setColor (test.Circuit.CircuitElm.sim.printableCheckItem.getState () ? java.awt.Color.white : java.awt.Color.black);
test.Circuit.CircuitElm.drawThickCircle (g, p.bubbleX, p.bubbleY, 1);
g.setColor (test.Circuit.CircuitElm.lightGrayColor);
test.Circuit.CircuitElm.drawThickCircle (g, p.bubbleX, p.bubbleY, 3);
}g.setColor (test.Circuit.CircuitElm.whiteColor);
var sw = fm.stringWidth (p.text);
g.drawString (p.text, p.textloc.x - Clazz.doubleToInt (sw / 2), p.textloc.y + Clazz.doubleToInt (fm.getAscent () / 2));
if (p.lineOver) {
var ya = p.textloc.y - Clazz.doubleToInt (fm.getAscent () / 2);
g.drawLine (p.textloc.x - Clazz.doubleToInt (sw / 2), ya, p.textloc.x + Clazz.doubleToInt (sw / 2), ya);
}}
g.setColor (this.needsHighlight () ? test.Circuit.CircuitElm.selectColor : test.Circuit.CircuitElm.lightGrayColor);
test.Circuit.CircuitElm.drawThickPolygon (g, this.rectPointsX, this.rectPointsY, 4);
if (this.clockPointsX != null) g.drawPolyline (this.clockPointsX, this.clockPointsY, 3);
for (i = 0; i != this.getPostCount (); i++) this.drawPost (g, this.pins[i].post.x, this.pins[i].post.y, this.nodes[i]);

}, "java.awt.Graphics");
Clazz.overrideMethod (c$, "drag", 
function (xx, yy) {
yy = test.Circuit.CircuitElm.sim.snapGrid (yy);
if (xx < this.x) {
xx = this.x;
yy = this.y;
} else {
this.y = this.y2 = yy;
this.x2 = test.Circuit.CircuitElm.sim.snapGrid (xx);
}this.setPoints ();
}, "~N,~N");
Clazz.overrideMethod (c$, "setPoints", 
function () {
if (this.x2 - this.x > this.sizeX * this.cspc2 && this === test.Circuit.CircuitElm.sim.dragElm) this.setSize (2);
var hs = this.cspc;
var x0 = this.x + this.cspc2;
var y0 = this.y;
var xr = x0 - this.cspc;
var yr = y0 - this.cspc;
var xs = this.sizeX * this.cspc2;
var ys = this.sizeY * this.cspc2;
this.rectPointsX = [xr, xr + xs, xr + xs, xr];
this.rectPointsY = [yr, yr, yr + ys, yr + ys];
this.setBbox (xr, yr, this.rectPointsX[2], this.rectPointsY[2]);
var i;
for (i = 0; i != this.getPostCount (); i++) {
var p = this.pins[i];
switch (p.side) {
case 0:
p.setPoint (x0, y0, 1, 0, 0, -1, 0, 0);
break;
case 1:
p.setPoint (x0, y0, 1, 0, 0, 1, 0, ys - this.cspc2);
break;
case 2:
p.setPoint (x0, y0, 0, 1, -1, 0, 0, 0);
break;
case 3:
p.setPoint (x0, y0, 0, 1, 1, 0, xs - this.cspc2, 0);
break;
}
}
});
Clazz.overrideMethod (c$, "getPost", 
function (n) {
return this.pins[n].post;
}, "~N");
Clazz.overrideMethod (c$, "setVoltageSource", 
function (j, vs) {
var i;
for (i = 0; i != this.getPostCount (); i++) {
var p = this.pins[i];
if (p.output && j-- == 0) {
p.voltSource = vs;
return;
}}
System.out.println ("setVoltageSource failed for " + this);
}, "~N,~N");
Clazz.overrideMethod (c$, "stamp", 
function () {
var i;
for (i = 0; i != this.getPostCount (); i++) {
var p = this.pins[i];
if (p.output) test.Circuit.CircuitElm.sim.stampVoltageSource (0, this.nodes[i], p.voltSource);
}
});
Clazz.defineMethod (c$, "execute", 
function () {
});
Clazz.overrideMethod (c$, "doStep", 
function () {
var i;
for (i = 0; i != this.getPostCount (); i++) {
var p = this.pins[i];
if (!p.output) p.value = this.volts[i] > 2.5;
}
this.execute ();
for (i = 0; i != this.getPostCount (); i++) {
var p = this.pins[i];
if (p.output) test.Circuit.CircuitElm.sim.updateVoltageSource (0, this.nodes[i], p.voltSource, p.value ? 5 : 0);
}
});
Clazz.overrideMethod (c$, "reset", 
function () {
var i;
for (i = 0; i != this.getPostCount (); i++) {
this.pins[i].value = false;
this.pins[i].curcount = 0;
this.volts[i] = 0;
}
this.lastClock = false;
});
Clazz.defineMethod (c$, "dump", 
function () {
var t = this.getDumpType ();
var s = Clazz.superCall (this, test.Circuit.ChipElm, "dump", []);
if (this.needsBits ()) s += " " + this.bits;
var i;
for (i = 0; i != this.getPostCount (); i++) {
if (this.pins[i].state) s += " " + this.volts[i];
}
return s;
});
Clazz.overrideMethod (c$, "getInfo", 
function (arr) {
arr[0] = this.getChipName ();
var i;
var a = 1;
for (i = 0; i != this.getPostCount (); i++) {
var p = this.pins[i];
if (arr[a] != null) arr[a] += "; ";
 else arr[a] = "";
var t = p.text;
if (p.lineOver) t += '\'';
if (p.clock) t = "Clk";
arr[a] += t + " = " + test.Circuit.CircuitElm.getVoltageText (this.volts[i]);
if (i % 2 == 1) a++;
}
}, "~A");
Clazz.overrideMethod (c$, "setCurrent", 
function (x, c) {
var i;
for (i = 0; i != this.getPostCount (); i++) if (this.pins[i].output && this.pins[i].voltSource == x) this.pins[i].current = c;

}, "~N,~N");
Clazz.defineMethod (c$, "getChipName", 
function () {
return "chip";
});
Clazz.overrideMethod (c$, "getConnection", 
function (n1, n2) {
return false;
}, "~N,~N");
Clazz.overrideMethod (c$, "hasGroundConnection", 
function (n1) {
return this.pins[n1].output;
}, "~N");
Clazz.overrideMethod (c$, "getEditInfo", 
function (n) {
if (n == 0) {
var ei =  new test.Circuit.EditInfo ("", 0, -1, -1);
ei.checkbox =  new java.awt.Checkbox ("Flip X", (this.flags & 1024) != 0);
return ei;
}if (n == 1) {
var ei =  new test.Circuit.EditInfo ("", 0, -1, -1);
ei.checkbox =  new java.awt.Checkbox ("Flip Y", (this.flags & 2048) != 0);
return ei;
}return null;
}, "~N");
Clazz.overrideMethod (c$, "setEditValue", 
function (n, ei) {
if (n == 0) {
if (ei.checkbox.getState ()) this.flags |= 1024;
 else this.flags &= -1025;
this.setPoints ();
}if (n == 1) {
if (ei.checkbox.getState ()) this.flags |= 2048;
 else this.flags &= -2049;
this.setPoints ();
}}, "~N,test.Circuit.EditInfo");
c$.$ChipElm$Pin$ = function () {
Clazz.pu$h(self.c$);
c$ = Clazz.decorateAsClass (function () {
Clazz.prepareCallback (this, arguments);
this.post = null;
this.stub = null;
this.textloc = null;
this.pos = 0;
this.side = 0;
this.voltSource = 0;
this.bubbleX = 0;
this.bubbleY = 0;
this.text = null;
this.lineOver = false;
this.bubble = false;
this.clock = false;
this.output = false;
this.value = false;
this.state = false;
this.curcount = 0;
this.current = 0;
Clazz.instantialize (this, arguments);
}, test.Circuit.ChipElm, "Pin");
Clazz.makeConstructor (c$, 
function (a, b, c) {
this.pos = a;
this.side = b;
this.text = c;
}, "~N,~N,~S");
Clazz.defineMethod (c$, "setPoint", 
function (a, b, c, d, e, f, g, h) {
if ((this.b$["test.Circuit.ChipElm"].flags & 1024) != 0) {
c = -c;
e = -e;
a += this.b$["test.Circuit.ChipElm"].cspc2 * (this.b$["test.Circuit.ChipElm"].sizeX - 1);
g = -g;
}if ((this.b$["test.Circuit.ChipElm"].flags & 2048) != 0) {
d = -d;
f = -f;
b += this.b$["test.Circuit.ChipElm"].cspc2 * (this.b$["test.Circuit.ChipElm"].sizeY - 1);
h = -h;
}var i = a + this.b$["test.Circuit.ChipElm"].cspc2 * c * this.pos + g;
var j = b + this.b$["test.Circuit.ChipElm"].cspc2 * d * this.pos + h;
this.post =  new java.awt.Point (i + e * this.b$["test.Circuit.ChipElm"].cspc2, j + f * this.b$["test.Circuit.ChipElm"].cspc2);
this.stub =  new java.awt.Point (i + e * this.b$["test.Circuit.ChipElm"].cspc, j + f * this.b$["test.Circuit.ChipElm"].cspc);
this.textloc =  new java.awt.Point (i, j);
if (this.bubble) {
this.bubbleX = i + e * 10 * this.b$["test.Circuit.ChipElm"].csize;
this.bubbleY = j + f * 10 * this.b$["test.Circuit.ChipElm"].csize;
}if (this.clock) {
this.b$["test.Circuit.ChipElm"].clockPointsX =  Clazz.newIntArray (3, 0);
this.b$["test.Circuit.ChipElm"].clockPointsY =  Clazz.newIntArray (3, 0);
this.b$["test.Circuit.ChipElm"].clockPointsX[0] = i + e * this.b$["test.Circuit.ChipElm"].cspc - Clazz.doubleToInt (c * this.b$["test.Circuit.ChipElm"].cspc / 2);
this.b$["test.Circuit.ChipElm"].clockPointsY[0] = j + f * this.b$["test.Circuit.ChipElm"].cspc - Clazz.doubleToInt (d * this.b$["test.Circuit.ChipElm"].cspc / 2);
this.b$["test.Circuit.ChipElm"].clockPointsX[1] = i;
this.b$["test.Circuit.ChipElm"].clockPointsY[1] = j;
this.b$["test.Circuit.ChipElm"].clockPointsX[2] = i + e * this.b$["test.Circuit.ChipElm"].cspc + Clazz.doubleToInt (c * this.b$["test.Circuit.ChipElm"].cspc / 2);
this.b$["test.Circuit.ChipElm"].clockPointsY[2] = j + f * this.b$["test.Circuit.ChipElm"].cspc + Clazz.doubleToInt (d * this.b$["test.Circuit.ChipElm"].cspc / 2);
}}, "~N,~N,~N,~N,~N,~N,~N,~N");
c$ = Clazz.p0p ();
};
});

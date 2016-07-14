Clazz.declarePackage ("test.Circuit");
Clazz.load (["test.Circuit.CircuitElm"], "test.Circuit.OpAmpElm", ["java.awt.Font", "java.lang.Double", "test.Circuit.EditInfo"], function () {
c$ = Clazz.decorateAsClass (function () {
this.opsize = 0;
this.opheight = 0;
this.opwidth = 0;
this.opaddtext = 0;
this.maxOut = 0;
this.minOut = 0;
this.gain = 0;
this.gbw = 0;
this.$reset = false;
this.FLAG_SWAP = 1;
this.FLAG_SMALL = 2;
this.FLAG_LOWGAIN = 4;
this.in1p = null;
this.in2p = null;
this.textp = null;
this.triangle = null;
this.plusFont = null;
this.lastvd = 0;
Clazz.instantialize (this, arguments);
}, test.Circuit, "OpAmpElm", test.Circuit.CircuitElm);
Clazz.makeConstructor (c$, 
function (xx, yy) {
Clazz.superConstructor (this, test.Circuit.OpAmpElm, [xx, yy]);
this.noDiagonal = true;
this.maxOut = 15;
this.minOut = -15;
this.gbw = 1e6;
this.setSize (test.Circuit.CircuitElm.sim.smallGridCheckItem.getState () ? 1 : 2);
this.setGain ();
}, "~N,~N");
Clazz.makeConstructor (c$, 
function (xa, ya, xb, yb, f, st) {
Clazz.superConstructor (this, test.Circuit.OpAmpElm, [xa, ya, xb, yb, f]);
this.maxOut = 15;
this.minOut = -15;
this.gbw = 1e6;
try {
this.maxOut =  new Double (st.nextToken ()).doubleValue ();
this.minOut =  new Double (st.nextToken ()).doubleValue ();
this.gbw =  new Double (st.nextToken ()).doubleValue ();
} catch (e) {
if (Clazz.exceptionOf (e, Exception)) {
} else {
throw e;
}
}
this.noDiagonal = true;
this.setSize ((f & 2) != 0 ? 1 : 2);
this.setGain ();
}, "~N,~N,~N,~N,~N,java.util.StringTokenizer");
Clazz.defineMethod (c$, "setGain", 
function () {
this.gain = ((this.flags & 4) != 0) ? 1000 : 100000;
});
Clazz.defineMethod (c$, "dump", 
function () {
return Clazz.superCall (this, test.Circuit.OpAmpElm, "dump", []) + " " + this.maxOut + " " + this.minOut + " " + this.gbw;
});
Clazz.overrideMethod (c$, "nonLinear", 
function () {
return true;
});
Clazz.overrideMethod (c$, "draw", 
function (g) {
this.setBbox (this.point1, this.point2, this.opheight * 2);
this.setVoltageColor (g, this.volts[0]);
test.Circuit.CircuitElm.drawThickLine (g, this.in1p[0], this.in1p[1]);
this.setVoltageColor (g, this.volts[1]);
test.Circuit.CircuitElm.drawThickLine (g, this.in2p[0], this.in2p[1]);
g.setColor (this.needsHighlight () ? test.Circuit.CircuitElm.selectColor : test.Circuit.CircuitElm.lightGrayColor);
this.setPowerColor (g, true);
test.Circuit.CircuitElm.drawThickPolygon (g, this.triangle);
g.setFont (this.plusFont);
this.drawCenteredText (g, "-", this.textp[0].x, this.textp[0].y - 2, true);
this.drawCenteredText (g, "+", this.textp[1].x, this.textp[1].y, true);
this.setVoltageColor (g, this.volts[2]);
test.Circuit.CircuitElm.drawThickLine (g, this.lead2, this.point2);
this.curcount = this.updateDotCount (this.current, this.curcount);
this.drawDots (g, this.point2, this.lead2, this.curcount);
this.drawPosts (g);
}, "java.awt.Graphics");
Clazz.overrideMethod (c$, "getPower", 
function () {
return this.volts[2] * this.current;
});
Clazz.defineMethod (c$, "setSize", 
function (s) {
this.opsize = s;
this.opheight = 8 * s;
this.opwidth = 13 * s;
this.flags = (this.flags & -3) | ((s == 1) ? 2 : 0);
}, "~N");
Clazz.defineMethod (c$, "setPoints", 
function () {
Clazz.superCall (this, test.Circuit.OpAmpElm, "setPoints", []);
if (this.dn > 150 && this === test.Circuit.CircuitElm.sim.dragElm) this.setSize (2);
var ww = this.opwidth;
if (ww > this.dn / 2) ww = Clazz.doubleToInt (this.dn / 2);
this.calcLeads (ww * 2);
var hs = this.opheight * this.dsign;
if ((this.flags & 1) != 0) hs = -hs;
this.in1p = this.newPointArray (2);
this.in2p = this.newPointArray (2);
this.textp = this.newPointArray (2);
this.interpPoint2 (this.point1, this.point2, this.in1p[0], this.in2p[0], 0, hs);
this.interpPoint2 (this.lead1, this.lead2, this.in1p[1], this.in2p[1], 0, hs);
this.interpPoint2 (this.lead1, this.lead2, this.textp[0], this.textp[1], .2, hs);
var tris = this.newPointArray (2);
this.interpPoint2 (this.lead1, this.lead2, tris[0], tris[1], 0, hs * 2);
this.triangle = this.createPolygon (tris[0], tris[1], this.lead2);
this.plusFont =  new java.awt.Font ("SansSerif", 0, this.opsize == 2 ? 14 : 10);
});
Clazz.overrideMethod (c$, "getPostCount", 
function () {
return 3;
});
Clazz.overrideMethod (c$, "getPost", 
function (n) {
return (n == 0) ? this.in1p[0] : (n == 1) ? this.in2p[0] : this.point2;
}, "~N");
Clazz.overrideMethod (c$, "getVoltageSourceCount", 
function () {
return 1;
});
Clazz.overrideMethod (c$, "getInfo", 
function (arr) {
arr[0] = "op-amp";
arr[1] = "V+ = " + test.Circuit.CircuitElm.getVoltageText (this.volts[1]);
arr[2] = "V- = " + test.Circuit.CircuitElm.getVoltageText (this.volts[0]);
var vo = Math.max (Math.min (this.volts[2], this.maxOut), this.minOut);
arr[3] = "Vout = " + test.Circuit.CircuitElm.getVoltageText (vo);
arr[4] = "Iout = " + test.Circuit.CircuitElm.getCurrentText (this.getCurrent ());
arr[5] = "range = " + test.Circuit.CircuitElm.getVoltageText (this.minOut) + " to " + test.Circuit.CircuitElm.getVoltageText (this.maxOut);
}, "~A");
Clazz.overrideMethod (c$, "stamp", 
function () {
var vn = test.Circuit.CircuitElm.sim.nodeList.size () + this.voltSource;
test.Circuit.CircuitElm.sim.stampNonLinear (vn);
test.Circuit.CircuitElm.sim.stampMatrix (this.nodes[2], vn, 1);
});
Clazz.overrideMethod (c$, "doStep", 
function () {
var vd = this.volts[1] - this.volts[0];
if (Math.abs (this.lastvd - vd) > .1) test.Circuit.CircuitElm.sim.converged = false;
 else if (this.volts[2] > this.maxOut + .1 || this.volts[2] < this.minOut - .1) test.Circuit.CircuitElm.sim.converged = false;
var x = 0;
var vn = test.Circuit.CircuitElm.sim.nodeList.size () + this.voltSource;
var dx = 0;
if (vd >= this.maxOut / this.gain && (this.lastvd >= 0 || test.Circuit.CircuitElm.sim.getrand (4) == 1)) {
dx = 1e-4;
x = this.maxOut - dx * this.maxOut / this.gain;
} else if (vd <= this.minOut / this.gain && (this.lastvd <= 0 || test.Circuit.CircuitElm.sim.getrand (4) == 1)) {
dx = 1e-4;
x = this.minOut - dx * this.minOut / this.gain;
} else dx = this.gain;
test.Circuit.CircuitElm.sim.stampMatrix (vn, this.nodes[0], dx);
test.Circuit.CircuitElm.sim.stampMatrix (vn, this.nodes[1], -dx);
test.Circuit.CircuitElm.sim.stampMatrix (vn, this.nodes[2], 1);
test.Circuit.CircuitElm.sim.stampRightSide (vn, x);
this.lastvd = vd;
});
Clazz.overrideMethod (c$, "getConnection", 
function (n1, n2) {
return false;
}, "~N,~N");
Clazz.overrideMethod (c$, "hasGroundConnection", 
function (n1) {
return (n1 == 2);
}, "~N");
Clazz.overrideMethod (c$, "getVoltageDiff", 
function () {
return this.volts[2] - this.volts[1];
});
Clazz.overrideMethod (c$, "getDumpType", 
function () {
return 'a';
});
Clazz.overrideMethod (c$, "getEditInfo", 
function (n) {
if (n == 0) return  new test.Circuit.EditInfo ("Max Output (V)", this.maxOut, 1, 20);
if (n == 1) return  new test.Circuit.EditInfo ("Min Output (V)", this.minOut, -20, 0);
return null;
}, "~N");
Clazz.overrideMethod (c$, "setEditValue", 
function (n, ei) {
if (n == 0) this.maxOut = ei.value;
if (n == 1) this.minOut = ei.value;
}, "~N,test.Circuit.EditInfo");
});

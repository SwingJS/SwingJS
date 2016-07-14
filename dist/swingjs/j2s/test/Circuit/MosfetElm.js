Clazz.declarePackage ("test.Circuit");
Clazz.load (["test.Circuit.CircuitElm"], "test.Circuit.MosfetElm", ["java.awt.Checkbox", "$.Color", "java.lang.Double", "test.Circuit.EditInfo"], function () {
c$ = Clazz.decorateAsClass (function () {
this.pnp = 0;
this.FLAG_PNP = 1;
this.FLAG_SHOWVT = 2;
this.FLAG_DIGITAL = 4;
this.vt = 0;
this.hs = 16;
this.pcircler = 0;
this.src = null;
this.drn = null;
this.gate = null;
this.pcircle = null;
this.arrowPoly = null;
this.lastv1 = 0;
this.lastv2 = 0;
this.ids = 0;
this.mode = 0;
this.gm = 0;
Clazz.instantialize (this, arguments);
}, test.Circuit, "MosfetElm", test.Circuit.CircuitElm);
Clazz.makeConstructor (c$, 
function (xx, yy, pnpflag) {
Clazz.superConstructor (this, test.Circuit.MosfetElm, [xx, yy]);
this.pnp = (pnpflag) ? -1 : 1;
this.flags = (pnpflag) ? this.FLAG_PNP : 0;
this.noDiagonal = true;
this.vt = this.getDefaultThreshold ();
}, "~N,~N,~B");
Clazz.makeConstructor (c$, 
function (xa, ya, xb, yb, f, st) {
Clazz.superConstructor (this, test.Circuit.MosfetElm, [xa, ya, xb, yb, f]);
this.pnp = ((f & this.FLAG_PNP) != 0) ? -1 : 1;
this.noDiagonal = true;
this.vt = this.getDefaultThreshold ();
try {
this.vt =  new Double (st.nextToken ()).doubleValue ();
} catch (e) {
if (Clazz.exceptionOf (e, Exception)) {
} else {
throw e;
}
}
}, "~N,~N,~N,~N,~N,java.util.StringTokenizer");
Clazz.defineMethod (c$, "getDefaultThreshold", 
function () {
return 1.5;
});
Clazz.defineMethod (c$, "getBeta", 
function () {
return .02;
});
Clazz.overrideMethod (c$, "nonLinear", 
function () {
return true;
});
Clazz.defineMethod (c$, "drawDigital", 
function () {
return (this.flags & this.FLAG_DIGITAL) != 0;
});
Clazz.overrideMethod (c$, "reset", 
function () {
this.lastv1 = this.lastv2 = this.volts[0] = this.volts[1] = this.volts[2] = this.curcount = 0;
});
Clazz.defineMethod (c$, "dump", 
function () {
return Clazz.superCall (this, test.Circuit.MosfetElm, "dump", []) + " " + this.vt;
});
Clazz.overrideMethod (c$, "getDumpType", 
function () {
return 'f';
});
Clazz.overrideMethod (c$, "draw", 
function (g) {
this.setBbox (this.point1, this.point2, 16);
this.setVoltageColor (g, this.volts[1]);
test.Circuit.CircuitElm.drawThickLine (g, this.src[0], this.src[1]);
this.setVoltageColor (g, this.volts[2]);
test.Circuit.CircuitElm.drawThickLine (g, this.drn[0], this.drn[1]);
var segments = 6;
var i;
this.setPowerColor (g, true);
var segf = 1. / segments;
for (i = 0; i != segments; i++) {
var v = this.volts[1] + (this.volts[2] - this.volts[1]) * i / segments;
this.setVoltageColor (g, v);
this.interpPoint (this.src[1], this.drn[1], test.Circuit.CircuitElm.ps1, i * segf);
this.interpPoint (this.src[1], this.drn[1], test.Circuit.CircuitElm.ps2, (i + 1) * segf);
test.Circuit.CircuitElm.drawThickLine (g, test.Circuit.CircuitElm.ps1, test.Circuit.CircuitElm.ps2);
}
this.setVoltageColor (g, this.volts[1]);
test.Circuit.CircuitElm.drawThickLine (g, this.src[1], this.src[2]);
this.setVoltageColor (g, this.volts[2]);
test.Circuit.CircuitElm.drawThickLine (g, this.drn[1], this.drn[2]);
if (!this.drawDigital ()) {
this.setVoltageColor (g, this.pnp == 1 ? this.volts[1] : this.volts[2]);
g.fillPolygon (this.arrowPoly);
}if (test.Circuit.CircuitElm.sim.powerCheckItem.getState ()) g.setColor (java.awt.Color.gray);
this.setVoltageColor (g, this.volts[0]);
test.Circuit.CircuitElm.drawThickLine (g, this.point1, this.gate[1]);
test.Circuit.CircuitElm.drawThickLine (g, this.gate[0], this.gate[2]);
if (this.drawDigital () && this.pnp == -1) test.Circuit.CircuitElm.drawThickCircle (g, this.pcircle.x, this.pcircle.y, this.pcircler);
if ((this.flags & this.FLAG_SHOWVT) != 0) {
var s = "" + (this.vt * this.pnp);
g.setColor (test.Circuit.CircuitElm.whiteColor);
g.setFont (test.Circuit.CircuitElm.unitsFont);
this.drawCenteredText (g, s, this.x2 + 2, this.y2, false);
}if ((this.needsHighlight () || test.Circuit.CircuitElm.sim.dragElm === this) && this.dy == 0) {
g.setColor (java.awt.Color.white);
g.setFont (test.Circuit.CircuitElm.unitsFont);
var ds = test.Circuit.CircuitElm.sign (this.dx);
g.drawString ("G", this.gate[1].x - 10 * ds, this.gate[1].y - 5);
g.drawString (this.pnp == -1 ? "D" : "S", this.src[0].x - 3 + 9 * ds, this.src[0].y + 4);
g.drawString (this.pnp == -1 ? "S" : "D", this.drn[0].x - 3 + 9 * ds, this.drn[0].y + 4);
}this.curcount = this.updateDotCount (-this.ids, this.curcount);
this.drawDots (g, this.src[0], this.src[1], this.curcount);
this.drawDots (g, this.src[1], this.drn[1], this.curcount);
this.drawDots (g, this.drn[1], this.drn[0], this.curcount);
this.drawPosts (g);
}, "java.awt.Graphics");
Clazz.overrideMethod (c$, "getPost", 
function (n) {
return (n == 0) ? this.point1 : (n == 1) ? this.src[0] : this.drn[0];
}, "~N");
Clazz.overrideMethod (c$, "getCurrent", 
function () {
return this.ids;
});
Clazz.overrideMethod (c$, "getPower", 
function () {
return this.ids * (this.volts[2] - this.volts[1]);
});
Clazz.overrideMethod (c$, "getPostCount", 
function () {
return 3;
});
Clazz.defineMethod (c$, "setPoints", 
function () {
Clazz.superCall (this, test.Circuit.MosfetElm, "setPoints", []);
var hs2 = 16 * this.dsign;
this.src = this.newPointArray (3);
this.drn = this.newPointArray (3);
this.interpPoint2 (this.point1, this.point2, this.src[0], this.drn[0], 1, -hs2);
this.interpPoint2 (this.point1, this.point2, this.src[1], this.drn[1], 1 - 22 / this.dn, -hs2);
this.interpPoint2 (this.point1, this.point2, this.src[2], this.drn[2], 1 - 22 / this.dn, Clazz.doubleToInt (-hs2 * 4 / 3));
this.gate = this.newPointArray (3);
this.interpPoint2 (this.point1, this.point2, this.gate[0], this.gate[2], 1 - 28 / this.dn, Clazz.doubleToInt (hs2 / 2));
this.interpPoint (this.gate[0], this.gate[2], this.gate[1], .5);
if (!this.drawDigital ()) {
if (this.pnp == 1) this.arrowPoly = this.calcArrow (this.src[1], this.src[0], 10, 4);
 else this.arrowPoly = this.calcArrow (this.drn[0], this.drn[1], 12, 5);
} else if (this.pnp == -1) {
this.interpPoint (this.point1, this.point2, this.gate[1], 1 - 36 / this.dn);
var dist = (this.dsign < 0) ? 32 : 31;
this.pcircle = this.interpPoint (this.point1, this.point2, 1 - dist / this.dn);
this.pcircler = 3;
}});
Clazz.overrideMethod (c$, "stamp", 
function () {
test.Circuit.CircuitElm.sim.stampNonLinear (this.nodes[1]);
test.Circuit.CircuitElm.sim.stampNonLinear (this.nodes[2]);
});
Clazz.overrideMethod (c$, "doStep", 
function () {
var vs =  Clazz.newDoubleArray (3, 0);
vs[0] = this.volts[0];
vs[1] = this.volts[1];
vs[2] = this.volts[2];
if (vs[1] > this.lastv1 + .5) vs[1] = this.lastv1 + .5;
if (vs[1] < this.lastv1 - .5) vs[1] = this.lastv1 - .5;
if (vs[2] > this.lastv2 + .5) vs[2] = this.lastv2 + .5;
if (vs[2] < this.lastv2 - .5) vs[2] = this.lastv2 - .5;
var source = 1;
var drain = 2;
if (this.pnp * vs[1] > this.pnp * vs[2]) {
source = 2;
drain = 1;
}var gate = 0;
var vgs = vs[gate] - vs[source];
var vds = vs[drain] - vs[source];
if (Math.abs (this.lastv1 - vs[1]) > .01 || Math.abs (this.lastv2 - vs[2]) > .01) test.Circuit.CircuitElm.sim.converged = false;
this.lastv1 = vs[1];
this.lastv2 = vs[2];
var realvgs = vgs;
var realvds = vds;
vgs *= this.pnp;
vds *= this.pnp;
this.ids = 0;
this.gm = 0;
var Gds = 0;
var beta = this.getBeta ();
if (vgs > .5 && Clazz.instanceOf (this, test.Circuit.JfetElm)) {
test.Circuit.CircuitElm.sim.stop ("JFET is reverse biased!", this);
return;
}if (vgs < this.vt) {
Gds = 1e-8;
this.ids = vds * Gds;
this.mode = 0;
} else if (vds < vgs - this.vt) {
this.ids = beta * ((vgs - this.vt) * vds - vds * vds * .5);
this.gm = beta * vds;
Gds = beta * (vgs - vds - this.vt);
this.mode = 1;
} else {
this.gm = beta * (vgs - this.vt);
Gds = 1e-8;
this.ids = .5 * beta * (vgs - this.vt) * (vgs - this.vt) + (vds - (vgs - this.vt)) * Gds;
this.mode = 2;
}var rs = -this.pnp * this.ids + Gds * realvds + this.gm * realvgs;
test.Circuit.CircuitElm.sim.stampMatrix (this.nodes[drain], this.nodes[drain], Gds);
test.Circuit.CircuitElm.sim.stampMatrix (this.nodes[drain], this.nodes[source], -Gds - this.gm);
test.Circuit.CircuitElm.sim.stampMatrix (this.nodes[drain], this.nodes[gate], this.gm);
test.Circuit.CircuitElm.sim.stampMatrix (this.nodes[source], this.nodes[drain], -Gds);
test.Circuit.CircuitElm.sim.stampMatrix (this.nodes[source], this.nodes[source], Gds + this.gm);
test.Circuit.CircuitElm.sim.stampMatrix (this.nodes[source], this.nodes[gate], -this.gm);
test.Circuit.CircuitElm.sim.stampRightSide (this.nodes[drain], rs);
test.Circuit.CircuitElm.sim.stampRightSide (this.nodes[source], -rs);
if (source == 2 && this.pnp == 1 || source == 1 && this.pnp == -1) this.ids = -this.ids;
});
Clazz.defineMethod (c$, "getFetInfo", 
function (arr, n) {
arr[0] = ((this.pnp == -1) ? "p-" : "n-") + n;
arr[0] += " (Vt = " + test.Circuit.CircuitElm.getVoltageText (this.pnp * this.vt) + ")";
arr[1] = ((this.pnp == 1) ? "Ids = " : "Isd = ") + test.Circuit.CircuitElm.getCurrentText (this.ids);
arr[2] = "Vgs = " + test.Circuit.CircuitElm.getVoltageText (this.volts[0] - this.volts[this.pnp == -1 ? 2 : 1]);
arr[3] = ((this.pnp == 1) ? "Vds = " : "Vsd = ") + test.Circuit.CircuitElm.getVoltageText (this.volts[2] - this.volts[1]);
arr[4] = (this.mode == 0) ? "off" : (this.mode == 1) ? "linear" : "saturation";
arr[5] = "gm = " + test.Circuit.CircuitElm.getUnitText (this.gm, "A/V");
}, "~A,~S");
Clazz.overrideMethod (c$, "getInfo", 
function (arr) {
this.getFetInfo (arr, "MOSFET");
}, "~A");
Clazz.overrideMethod (c$, "canViewInScope", 
function () {
return true;
});
Clazz.overrideMethod (c$, "getVoltageDiff", 
function () {
return this.volts[2] - this.volts[1];
});
Clazz.overrideMethod (c$, "getConnection", 
function (n1, n2) {
return !(n1 == 0 || n2 == 0);
}, "~N,~N");
Clazz.overrideMethod (c$, "getEditInfo", 
function (n) {
if (n == 0) return  new test.Circuit.EditInfo ("Threshold Voltage", this.pnp * this.vt, .01, 5);
if (n == 1) {
var ei =  new test.Circuit.EditInfo ("", 0, -1, -1);
ei.checkbox =  new java.awt.Checkbox ("Digital Symbol", this.drawDigital ());
return ei;
}return null;
}, "~N");
Clazz.overrideMethod (c$, "setEditValue", 
function (n, ei) {
if (n == 0) this.vt = this.pnp * ei.value;
if (n == 1) {
this.flags = (ei.checkbox.getState ()) ? (this.flags | this.FLAG_DIGITAL) : (this.flags & ~this.FLAG_DIGITAL);
this.setPoints ();
}}, "~N,test.Circuit.EditInfo");
});

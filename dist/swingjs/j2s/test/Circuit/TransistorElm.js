Clazz.declarePackage ("test.Circuit");
Clazz.load (["test.Circuit.CircuitElm"], "test.Circuit.TransistorElm", ["java.awt.Checkbox", "$.Color", "$.Point", "java.lang.Double", "test.Circuit.EditInfo"], function () {
c$ = Clazz.decorateAsClass (function () {
this.pnp = 0;
this.beta = 0;
this.fgain = 0;
this.gmin = 0;
this.FLAG_FLIP = 1;
this.ic = 0;
this.ie = 0;
this.ib = 0;
this.curcount_c = 0;
this.curcount_e = 0;
this.curcount_b = 0;
this.rectPoly = null;
this.arrowPoly = null;
this.rect = null;
this.coll = null;
this.emit = null;
this.base = null;
this.vcrit = 0;
this.lastvbc = 0;
this.lastvbe = 0;
Clazz.instantialize (this, arguments);
}, test.Circuit, "TransistorElm", test.Circuit.CircuitElm);
Clazz.makeConstructor (c$, 
function (xx, yy, pnpflag) {
Clazz.superConstructor (this, test.Circuit.TransistorElm, [xx, yy]);
this.pnp = (pnpflag) ? -1 : 1;
this.beta = 100;
this.setup ();
}, "~N,~N,~B");
Clazz.makeConstructor (c$, 
function (xa, ya, xb, yb, f, st) {
Clazz.superConstructor (this, test.Circuit.TransistorElm, [xa, ya, xb, yb, f]);
this.pnp =  new Integer (st.nextToken ()).intValue ();
this.beta = 100;
try {
this.lastvbe =  new Double (st.nextToken ()).doubleValue ();
this.lastvbc =  new Double (st.nextToken ()).doubleValue ();
this.volts[0] = 0;
this.volts[1] = -this.lastvbe;
this.volts[2] = -this.lastvbc;
this.beta =  new Double (st.nextToken ()).doubleValue ();
} catch (e) {
if (Clazz.exceptionOf (e, Exception)) {
} else {
throw e;
}
}
this.setup ();
}, "~N,~N,~N,~N,~N,java.util.StringTokenizer");
Clazz.defineMethod (c$, "setup", 
function () {
this.vcrit = 0.025 * Math.log (0.025 / (Math.sqrt (2) * 1.0E-13));
this.fgain = this.beta / (this.beta + 1);
this.noDiagonal = true;
});
Clazz.overrideMethod (c$, "nonLinear", 
function () {
return true;
});
Clazz.overrideMethod (c$, "reset", 
function () {
this.volts[0] = this.volts[1] = this.volts[2] = 0;
this.lastvbc = this.lastvbe = this.curcount_c = this.curcount_e = this.curcount_b = 0;
});
Clazz.overrideMethod (c$, "getDumpType", 
function () {
return 't';
});
Clazz.defineMethod (c$, "dump", 
function () {
return Clazz.superCall (this, test.Circuit.TransistorElm, "dump", []) + " " + this.pnp + " " + (this.volts[0] - this.volts[1]) + " " + (this.volts[0] - this.volts[2]) + " " + this.beta;
});
Clazz.overrideMethod (c$, "draw", 
function (g) {
this.setBbox (this.point1, this.point2, 16);
this.setPowerColor (g, true);
this.setVoltageColor (g, this.volts[1]);
test.Circuit.CircuitElm.drawThickLine (g, this.coll[0], this.coll[1]);
this.setVoltageColor (g, this.volts[2]);
test.Circuit.CircuitElm.drawThickLine (g, this.emit[0], this.emit[1]);
g.setColor (test.Circuit.CircuitElm.lightGrayColor);
g.fillPolygon (this.arrowPoly);
this.setVoltageColor (g, this.volts[0]);
if (test.Circuit.CircuitElm.sim.powerCheckItem.getState ()) g.setColor (java.awt.Color.gray);
test.Circuit.CircuitElm.drawThickLine (g, this.point1, this.base);
this.curcount_b = this.updateDotCount (-this.ib, this.curcount_b);
this.drawDots (g, this.base, this.point1, this.curcount_b);
this.curcount_c = this.updateDotCount (-this.ic, this.curcount_c);
this.drawDots (g, this.coll[1], this.coll[0], this.curcount_c);
this.curcount_e = this.updateDotCount (-this.ie, this.curcount_e);
this.drawDots (g, this.emit[1], this.emit[0], this.curcount_e);
this.setVoltageColor (g, this.volts[0]);
this.setPowerColor (g, true);
g.fillPolygon (this.rectPoly);
if ((this.needsHighlight () || test.Circuit.CircuitElm.sim.dragElm === this) && this.dy == 0) {
g.setColor (java.awt.Color.white);
g.setFont (test.Circuit.CircuitElm.unitsFont);
var ds = test.Circuit.CircuitElm.sign (this.dx);
g.drawString ("B", this.base.x - 10 * ds, this.base.y - 5);
g.drawString ("C", this.coll[0].x - 3 + 9 * ds, this.coll[0].y + 4);
g.drawString ("E", this.emit[0].x - 3 + 9 * ds, this.emit[0].y + 4);
}this.drawPosts (g);
}, "java.awt.Graphics");
Clazz.overrideMethod (c$, "getPost", 
function (n) {
return (n == 0) ? this.point1 : (n == 1) ? this.coll[0] : this.emit[0];
}, "~N");
Clazz.overrideMethod (c$, "getPostCount", 
function () {
return 3;
});
Clazz.overrideMethod (c$, "getPower", 
function () {
return (this.volts[0] - this.volts[2]) * this.ib + (this.volts[1] - this.volts[2]) * this.ic;
});
Clazz.defineMethod (c$, "setPoints", 
function () {
Clazz.superCall (this, test.Circuit.TransistorElm, "setPoints", []);
var hs = 16;
if ((this.flags & 1) != 0) this.dsign = -this.dsign;
var hs2 = hs * this.dsign * this.pnp;
this.coll = this.newPointArray (2);
this.emit = this.newPointArray (2);
this.interpPoint2 (this.point1, this.point2, this.coll[0], this.emit[0], 1, hs2);
this.rect = this.newPointArray (4);
this.interpPoint2 (this.point1, this.point2, this.rect[0], this.rect[1], 1 - 16 / this.dn, hs);
this.interpPoint2 (this.point1, this.point2, this.rect[2], this.rect[3], 1 - 13 / this.dn, hs);
this.interpPoint2 (this.point1, this.point2, this.coll[1], this.emit[1], 1 - 13 / this.dn, 6 * this.dsign * this.pnp);
this.base =  new java.awt.Point ();
this.interpPoint (this.point1, this.point2, this.base, 1 - 16 / this.dn);
this.rectPoly = this.createPolygon (this.rect[0], this.rect[2], this.rect[3], this.rect[1]);
if (this.pnp == 1) this.arrowPoly = this.calcArrow (this.emit[1], this.emit[0], 8, 4);
 else {
var pt = this.interpPoint (this.point1, this.point2, 1 - 11 / this.dn, -5 * this.dsign * this.pnp);
this.arrowPoly = this.calcArrow (this.emit[0], pt, 8, 4);
}});
Clazz.defineMethod (c$, "limitStep", 
function (vnew, vold) {
var arg;
var oo = vnew;
if (vnew > this.vcrit && Math.abs (vnew - vold) > (0.05)) {
if (vold > 0) {
arg = 1 + (vnew - vold) / 0.025;
if (arg > 0) {
vnew = vold + 0.025 * Math.log (arg);
} else {
vnew = this.vcrit;
}} else {
vnew = 0.025 * Math.log (vnew / 0.025);
}test.Circuit.CircuitElm.sim.converged = false;
}return (vnew);
}, "~N,~N");
Clazz.overrideMethod (c$, "stamp", 
function () {
test.Circuit.CircuitElm.sim.stampNonLinear (this.nodes[0]);
test.Circuit.CircuitElm.sim.stampNonLinear (this.nodes[1]);
test.Circuit.CircuitElm.sim.stampNonLinear (this.nodes[2]);
});
Clazz.overrideMethod (c$, "doStep", 
function () {
var vbc = this.volts[0] - this.volts[1];
var vbe = this.volts[0] - this.volts[2];
if (Math.abs (vbc - this.lastvbc) > .01 || Math.abs (vbe - this.lastvbe) > .01) test.Circuit.CircuitElm.sim.converged = false;
this.gmin = 0;
if (test.Circuit.CircuitElm.sim.subIterations > 100) {
this.gmin = Math.exp (-9 * Math.log (10) * (1 - test.Circuit.CircuitElm.sim.subIterations / 3000.));
if (this.gmin > .1) this.gmin = .1;
}vbc = this.pnp * this.limitStep (this.pnp * vbc, this.pnp * this.lastvbc);
vbe = this.pnp * this.limitStep (this.pnp * vbe, this.pnp * this.lastvbe);
this.lastvbc = vbc;
this.lastvbe = vbe;
var pcoef = 40.0 * this.pnp;
var expbc = Math.exp (vbc * pcoef);
var expbe = Math.exp (vbe * pcoef);
if (expbe < 1) expbe = 1;
this.ie = this.pnp * 1.0E-13 * (-(expbe - 1) + 0.5 * (expbc - 1));
this.ic = this.pnp * 1.0E-13 * (this.fgain * (expbe - 1) - (expbc - 1));
this.ib = -(this.ie + this.ic);
var gee = -1.0E-13 * 40.0 * expbe;
var gec = 0.5 * 1.0E-13 * 40.0 * expbc;
var gce = -gee * this.fgain;
var gcc = -gec * (2.0);
test.Circuit.CircuitElm.sim.stampMatrix (this.nodes[0], this.nodes[0], -gee - gec - gce - gcc + this.gmin * 2);
test.Circuit.CircuitElm.sim.stampMatrix (this.nodes[0], this.nodes[1], gec + gcc - this.gmin);
test.Circuit.CircuitElm.sim.stampMatrix (this.nodes[0], this.nodes[2], gee + gce - this.gmin);
test.Circuit.CircuitElm.sim.stampMatrix (this.nodes[1], this.nodes[0], gce + gcc - this.gmin);
test.Circuit.CircuitElm.sim.stampMatrix (this.nodes[1], this.nodes[1], -gcc + this.gmin);
test.Circuit.CircuitElm.sim.stampMatrix (this.nodes[1], this.nodes[2], -gce);
test.Circuit.CircuitElm.sim.stampMatrix (this.nodes[2], this.nodes[0], gee + gec - this.gmin);
test.Circuit.CircuitElm.sim.stampMatrix (this.nodes[2], this.nodes[1], -gec);
test.Circuit.CircuitElm.sim.stampMatrix (this.nodes[2], this.nodes[2], -gee + this.gmin);
test.Circuit.CircuitElm.sim.stampRightSide (this.nodes[0], -this.ib - (gec + gcc) * vbc - (gee + gce) * vbe);
test.Circuit.CircuitElm.sim.stampRightSide (this.nodes[1], -this.ic + gce * vbe + gcc * vbc);
test.Circuit.CircuitElm.sim.stampRightSide (this.nodes[2], -this.ie + gee * vbe + gec * vbc);
});
Clazz.overrideMethod (c$, "getInfo", 
function (arr) {
arr[0] = "transistor (" + ((this.pnp == -1) ? "PNP)" : "NPN)") + " beta=" + test.Circuit.CircuitElm.showFormat.format (this.beta);
var vbc = this.volts[0] - this.volts[1];
var vbe = this.volts[0] - this.volts[2];
var vce = this.volts[1] - this.volts[2];
if (vbc * this.pnp > .2) arr[1] = vbe * this.pnp > .2 ? "saturation" : "reverse active";
 else arr[1] = vbe * this.pnp > .2 ? "fwd active" : "cutoff";
arr[2] = "Ic = " + test.Circuit.CircuitElm.getCurrentText (this.ic);
arr[3] = "Ib = " + test.Circuit.CircuitElm.getCurrentText (this.ib);
arr[4] = "Vbe = " + test.Circuit.CircuitElm.getVoltageText (vbe);
arr[5] = "Vbc = " + test.Circuit.CircuitElm.getVoltageText (vbc);
arr[6] = "Vce = " + test.Circuit.CircuitElm.getVoltageText (vce);
}, "~A");
Clazz.overrideMethod (c$, "getScopeValue", 
function (x) {
switch (x) {
case 1:
return this.ib;
case 2:
return this.ic;
case 3:
return this.ie;
case 4:
return this.volts[0] - this.volts[2];
case 5:
return this.volts[0] - this.volts[1];
case 6:
return this.volts[1] - this.volts[2];
}
return 0;
}, "~N");
Clazz.overrideMethod (c$, "getScopeUnits", 
function (x) {
switch (x) {
case 1:
case 2:
case 3:
return "A";
default:
return "V";
}
}, "~N");
Clazz.overrideMethod (c$, "getEditInfo", 
function (n) {
if (n == 0) return  new test.Circuit.EditInfo ("Beta/hFE", this.beta, 10, 1000).setDimensionless ();
if (n == 1) {
var ei =  new test.Circuit.EditInfo ("", 0, -1, -1);
ei.checkbox =  new java.awt.Checkbox ("Swap E/C", (this.flags & 1) != 0);
return ei;
}return null;
}, "~N");
Clazz.overrideMethod (c$, "setEditValue", 
function (n, ei) {
if (n == 0) {
this.beta = ei.value;
this.setup ();
}if (n == 1) {
if (ei.checkbox.getState ()) this.flags |= 1;
 else this.flags &= -2;
this.setPoints ();
}}, "~N,test.Circuit.EditInfo");
Clazz.overrideMethod (c$, "canViewInScope", 
function () {
return true;
});
Clazz.defineStatics (c$,
"leakage", 1e-13,
"vt", .025,
"vdcoef", 40.0,
"rgain", .5);
});

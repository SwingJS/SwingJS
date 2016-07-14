Clazz.declarePackage ("test.Circuit");
Clazz.load (["test.Circuit.CircuitElm"], "test.Circuit.TransLineElm", ["java.awt.Color", "java.lang.Double", "test.Circuit.CirSim", "$.EditInfo"], function () {
c$ = Clazz.decorateAsClass (function () {
this.delay = 0;
this.imped = 0;
this.voltageL = null;
this.voltageR = null;
this.lenSteps = 0;
this.ptr = 0;
this.width = 0;
this.posts = null;
this.inner = null;
this.voltSource1 = 0;
this.voltSource2 = 0;
this.current1 = 0;
this.current2 = 0;
this.curCount1 = 0;
this.curCount2 = 0;
Clazz.instantialize (this, arguments);
}, test.Circuit, "TransLineElm", test.Circuit.CircuitElm);
Clazz.makeConstructor (c$, 
function (xx, yy) {
Clazz.superConstructor (this, test.Circuit.TransLineElm, [xx, yy]);
this.delay = 1000 * test.Circuit.CircuitElm.sim.timeStep;
this.imped = 75;
this.noDiagonal = true;
this.reset ();
}, "~N,~N");
Clazz.makeConstructor (c$, 
function (xa, ya, xb, yb, f, st) {
Clazz.superConstructor (this, test.Circuit.TransLineElm, [xa, ya, xb, yb, f]);
this.delay =  new Double (st.nextToken ()).doubleValue ();
this.imped =  new Double (st.nextToken ()).doubleValue ();
this.width =  new Integer (st.nextToken ()).intValue ();
st.nextToken ();
this.noDiagonal = true;
this.reset ();
}, "~N,~N,~N,~N,~N,java.util.StringTokenizer");
Clazz.overrideMethod (c$, "getDumpType", 
function () {
return 171;
});
Clazz.overrideMethod (c$, "getPostCount", 
function () {
return 4;
});
Clazz.overrideMethod (c$, "getInternalNodeCount", 
function () {
return 2;
});
Clazz.defineMethod (c$, "dump", 
function () {
return Clazz.superCall (this, test.Circuit.TransLineElm, "dump", []) + " " + this.delay + " " + this.imped + " " + this.width + " " + 0.;
});
Clazz.overrideMethod (c$, "drag", 
function (xx, yy) {
xx = test.Circuit.CircuitElm.sim.snapGrid (xx);
yy = test.Circuit.CircuitElm.sim.snapGrid (yy);
var w1 = test.Circuit.CircuitElm.max (test.Circuit.CircuitElm.sim.gridSize, test.Circuit.CircuitElm.abs (yy - this.y));
var w2 = test.Circuit.CircuitElm.max (test.Circuit.CircuitElm.sim.gridSize, test.Circuit.CircuitElm.abs (xx - this.x));
if (w1 > w2) {
xx = this.x;
this.width = w2;
} else {
yy = this.y;
this.width = w1;
}this.x2 = xx;
this.y2 = yy;
this.setPoints ();
}, "~N,~N");
Clazz.defineMethod (c$, "reset", 
function () {
if (test.Circuit.CircuitElm.sim.timeStep == 0) return;
this.lenSteps = Clazz.doubleToInt (this.delay / test.Circuit.CircuitElm.sim.timeStep);
System.out.println (this.lenSteps + " steps");
if (this.lenSteps > 100000) this.voltageL = this.voltageR = null;
 else {
this.voltageL =  Clazz.newDoubleArray (this.lenSteps, 0);
this.voltageR =  Clazz.newDoubleArray (this.lenSteps, 0);
}this.ptr = 0;
Clazz.superCall (this, test.Circuit.TransLineElm, "reset", []);
});
Clazz.defineMethod (c$, "setPoints", 
function () {
Clazz.superCall (this, test.Circuit.TransLineElm, "setPoints", []);
var ds = (this.dy == 0) ? test.Circuit.CircuitElm.sign (this.dx) : -test.Circuit.CircuitElm.sign (this.dy);
var p3 = this.interpPoint (this.point1, this.point2, 0, -this.width * ds);
var p4 = this.interpPoint (this.point1, this.point2, 1, -this.width * ds);
var sep = Clazz.doubleToInt (test.Circuit.CircuitElm.sim.gridSize / 2);
var p5 = this.interpPoint (this.point1, this.point2, 0, -(Clazz.doubleToInt (this.width / 2) - sep) * ds);
var p6 = this.interpPoint (this.point1, this.point2, 1, -(Clazz.doubleToInt (this.width / 2) - sep) * ds);
var p7 = this.interpPoint (this.point1, this.point2, 0, -(Clazz.doubleToInt (this.width / 2) + sep) * ds);
var p8 = this.interpPoint (this.point1, this.point2, 1, -(Clazz.doubleToInt (this.width / 2) + sep) * ds);
this.posts = [p3, p4, this.point1, this.point2];
this.inner = [p7, p8, p5, p6];
});
Clazz.overrideMethod (c$, "draw", 
function (g) {
this.setBbox (this.posts[0], this.posts[3], 0);
var segments = Clazz.doubleToInt (this.dn / 2);
var ix0 = this.ptr - 1 + this.lenSteps;
var segf = 1. / segments;
var i;
g.setColor (java.awt.Color.darkGray);
g.fillRect (this.inner[2].x, this.inner[2].y, this.inner[1].x - this.inner[2].x + 2, this.inner[1].y - this.inner[2].y + 2);
for (i = 0; i != 4; i++) {
this.setVoltageColor (g, this.volts[i]);
test.Circuit.CircuitElm.drawThickLine (g, this.posts[i], this.inner[i]);
}
if (this.voltageL != null) {
for (i = 0; i != segments; i++) {
var ix1 = (ix0 - Clazz.doubleToInt (this.lenSteps * i / segments)) % this.lenSteps;
var ix2 = (ix0 - Clazz.doubleToInt (this.lenSteps * (segments - 1 - i) / segments)) % this.lenSteps;
var v = (this.voltageL[ix1] + this.voltageR[ix2]) / 2;
this.setVoltageColor (g, v);
this.interpPoint (this.inner[0], this.inner[1], test.Circuit.CircuitElm.ps1, i * segf);
this.interpPoint (this.inner[2], this.inner[3], test.Circuit.CircuitElm.ps2, i * segf);
g.drawLine (test.Circuit.CircuitElm.ps1.x, test.Circuit.CircuitElm.ps1.y, test.Circuit.CircuitElm.ps2.x, test.Circuit.CircuitElm.ps2.y);
this.interpPoint (this.inner[2], this.inner[3], test.Circuit.CircuitElm.ps1, (i + 1) * segf);
test.Circuit.CircuitElm.drawThickLine (g, test.Circuit.CircuitElm.ps1, test.Circuit.CircuitElm.ps2);
}
}this.setVoltageColor (g, this.volts[0]);
test.Circuit.CircuitElm.drawThickLine (g, this.inner[0], this.inner[1]);
this.drawPosts (g);
this.curCount1 = this.updateDotCount (-this.current1, this.curCount1);
this.curCount2 = this.updateDotCount (this.current2, this.curCount2);
if (test.Circuit.CircuitElm.sim.dragElm !== this) {
this.drawDots (g, this.posts[0], this.inner[0], this.curCount1);
this.drawDots (g, this.posts[2], this.inner[2], -this.curCount1);
this.drawDots (g, this.posts[1], this.inner[1], -this.curCount2);
this.drawDots (g, this.posts[3], this.inner[3], this.curCount2);
}}, "java.awt.Graphics");
Clazz.overrideMethod (c$, "setVoltageSource", 
function (n, v) {
if (n == 0) this.voltSource1 = v;
 else this.voltSource2 = v;
}, "~N,~N");
Clazz.overrideMethod (c$, "setCurrent", 
function (v, c) {
if (v == this.voltSource1) this.current1 = c;
 else this.current2 = c;
}, "~N,~N");
Clazz.overrideMethod (c$, "stamp", 
function () {
test.Circuit.CircuitElm.sim.stampVoltageSource (this.nodes[4], this.nodes[0], this.voltSource1);
test.Circuit.CircuitElm.sim.stampVoltageSource (this.nodes[5], this.nodes[1], this.voltSource2);
test.Circuit.CircuitElm.sim.stampResistor (this.nodes[2], this.nodes[4], this.imped);
test.Circuit.CircuitElm.sim.stampResistor (this.nodes[3], this.nodes[5], this.imped);
});
Clazz.overrideMethod (c$, "startIteration", 
function () {
if (this.voltageL == null) {
test.Circuit.CircuitElm.sim.stop ("Transmission line delay too large!", this);
return;
}this.voltageL[this.ptr] = this.volts[2] - this.volts[0] + this.volts[2] - this.volts[4];
this.voltageR[this.ptr] = this.volts[3] - this.volts[1] + this.volts[3] - this.volts[5];
this.ptr = (this.ptr + 1) % this.lenSteps;
});
Clazz.overrideMethod (c$, "doStep", 
function () {
if (this.voltageL == null) {
test.Circuit.CircuitElm.sim.stop ("Transmission line delay too large!", this);
return;
}test.Circuit.CircuitElm.sim.updateVoltageSource (this.nodes[4], this.nodes[0], this.voltSource1, -this.voltageR[this.ptr]);
test.Circuit.CircuitElm.sim.updateVoltageSource (this.nodes[5], this.nodes[1], this.voltSource2, -this.voltageL[this.ptr]);
if (Math.abs (this.volts[0]) > 1e-5 || Math.abs (this.volts[1]) > 1e-5) {
test.Circuit.CircuitElm.sim.stop ("Need to ground transmission line!", this);
return;
}});
Clazz.overrideMethod (c$, "getPost", 
function (n) {
return this.posts[n];
}, "~N");
Clazz.overrideMethod (c$, "getVoltageSourceCount", 
function () {
return 2;
});
Clazz.overrideMethod (c$, "hasGroundConnection", 
function (n1) {
return false;
}, "~N");
Clazz.overrideMethod (c$, "getConnection", 
function (n1, n2) {
return false;
}, "~N,~N");
Clazz.overrideMethod (c$, "getInfo", 
function (arr) {
arr[0] = "transmission line";
arr[1] = test.Circuit.CircuitElm.getUnitText (this.imped, test.Circuit.CirSim.ohmString);
arr[2] = "length = " + test.Circuit.CircuitElm.getUnitText (2.9979e8 * this.delay, "m");
arr[3] = "delay = " + test.Circuit.CircuitElm.getUnitText (this.delay, "s");
}, "~A");
Clazz.overrideMethod (c$, "getEditInfo", 
function (n) {
if (n == 0) return  new test.Circuit.EditInfo ("Delay (s)", this.delay, 0, 0);
if (n == 1) return  new test.Circuit.EditInfo ("Impedance (ohms)", this.imped, 0, 0);
return null;
}, "~N");
Clazz.overrideMethod (c$, "setEditValue", 
function (n, ei) {
if (n == 0) {
this.delay = ei.value;
this.reset ();
}if (n == 1) {
this.imped = ei.value;
this.reset ();
}}, "~N,test.Circuit.EditInfo");
});

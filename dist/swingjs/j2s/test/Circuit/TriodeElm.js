Clazz.declarePackage ("test.Circuit");
Clazz.load (["test.Circuit.CircuitElm"], "test.Circuit.TriodeElm", ["java.awt.Color", "java.lang.Double"], function () {
c$ = Clazz.decorateAsClass (function () {
this.mu = 0;
this.kg1 = 0;
this.curcountp = 0;
this.curcountc = 0;
this.curcountg = 0;
this.currentp = 0;
this.currentg = 0;
this.currentc = 0;
this.gridCurrentR = 6000;
this.plate = null;
this.grid = null;
this.cath = null;
this.midgrid = null;
this.midcath = null;
this.circler = 0;
this.lastv0 = 0;
this.lastv1 = 0;
this.lastv2 = 0;
Clazz.instantialize (this, arguments);
}, test.Circuit, "TriodeElm", test.Circuit.CircuitElm);
Clazz.makeConstructor (c$, 
function (xx, yy) {
Clazz.superConstructor (this, test.Circuit.TriodeElm, [xx, yy]);
this.mu = 93;
this.kg1 = 680;
this.setup ();
}, "~N,~N");
Clazz.makeConstructor (c$, 
function (xa, ya, xb, yb, f, st) {
Clazz.superConstructor (this, test.Circuit.TriodeElm, [xa, ya, xb, yb, f]);
this.mu =  new Double (st.nextToken ()).doubleValue ();
this.kg1 =  new Double (st.nextToken ()).doubleValue ();
this.setup ();
}, "~N,~N,~N,~N,~N,java.util.StringTokenizer");
Clazz.defineMethod (c$, "setup", 
function () {
this.noDiagonal = true;
});
Clazz.overrideMethod (c$, "nonLinear", 
function () {
return true;
});
Clazz.overrideMethod (c$, "reset", 
function () {
this.volts[0] = this.volts[1] = this.volts[2] = 0;
this.curcount = 0;
});
Clazz.defineMethod (c$, "dump", 
function () {
return Clazz.superCall (this, test.Circuit.TriodeElm, "dump", []) + " " + this.mu + " " + this.kg1;
});
Clazz.overrideMethod (c$, "getDumpType", 
function () {
return 173;
});
Clazz.defineMethod (c$, "setPoints", 
function () {
Clazz.superCall (this, test.Circuit.TriodeElm, "setPoints", []);
this.plate = this.newPointArray (4);
this.grid = this.newPointArray (8);
this.cath = this.newPointArray (4);
this.grid[0] = this.point1;
var nearw = 8;
this.interpPoint (this.point1, this.point2, this.plate[1], 1, nearw);
var farw = 32;
this.interpPoint (this.point1, this.point2, this.plate[0], 1, farw);
var platew = 18;
this.interpPoint2 (this.point2, this.plate[1], this.plate[2], this.plate[3], 1, platew);
this.circler = 24;
this.interpPoint (this.point1, this.point2, this.grid[1], (this.dn - this.circler) / this.dn, 0);
var i;
for (i = 0; i != 3; i++) {
this.interpPoint (this.grid[1], this.point2, this.grid[2 + i * 2], (i * 3 + 1) / 4.5, 0);
this.interpPoint (this.grid[1], this.point2, this.grid[3 + i * 2], (i * 3 + 2) / 4.5, 0);
}
this.midgrid = this.point2;
var cathw = 16;
this.midcath = this.interpPoint (this.point1, this.point2, 1, -nearw);
this.interpPoint2 (this.point2, this.plate[1], this.cath[1], this.cath[2], -1, cathw);
this.interpPoint (this.point2, this.plate[1], this.cath[3], -1.2, -cathw);
this.interpPoint (this.point2, this.plate[1], this.cath[0], -farw / nearw, cathw);
});
Clazz.overrideMethod (c$, "draw", 
function (g) {
g.setColor (java.awt.Color.gray);
test.Circuit.CircuitElm.drawThickCircle (g, this.point2.x, this.point2.y, this.circler);
this.setBbox (this.point1, this.plate[0], 16);
this.adjustBbox (this.cath[0].x, this.cath[1].y, this.point2.x + this.circler, this.point2.y + this.circler);
this.setPowerColor (g, true);
this.setVoltageColor (g, this.volts[0]);
test.Circuit.CircuitElm.drawThickLine (g, this.plate[0], this.plate[1]);
test.Circuit.CircuitElm.drawThickLine (g, this.plate[2], this.plate[3]);
this.setVoltageColor (g, this.volts[1]);
var i;
for (i = 0; i != 8; i += 2) test.Circuit.CircuitElm.drawThickLine (g, this.grid[i], this.grid[i + 1]);

this.setVoltageColor (g, this.volts[2]);
for (i = 0; i != 3; i++) test.Circuit.CircuitElm.drawThickLine (g, this.cath[i], this.cath[i + 1]);

this.curcountp = this.updateDotCount (this.currentp, this.curcountp);
this.curcountc = this.updateDotCount (this.currentc, this.curcountc);
this.curcountg = this.updateDotCount (this.currentg, this.curcountg);
if (test.Circuit.CircuitElm.sim.dragElm !== this) {
this.drawDots (g, this.plate[0], this.midgrid, this.curcountp);
this.drawDots (g, this.midgrid, this.midcath, this.curcountc);
this.drawDots (g, this.midcath, this.cath[1], this.curcountc + 8);
this.drawDots (g, this.cath[1], this.cath[0], this.curcountc + 8);
this.drawDots (g, this.point1, this.midgrid, this.curcountg);
}this.drawPosts (g);
}, "java.awt.Graphics");
Clazz.overrideMethod (c$, "getPost", 
function (n) {
return (n == 0) ? this.plate[0] : (n == 1) ? this.grid[0] : this.cath[0];
}, "~N");
Clazz.overrideMethod (c$, "getPostCount", 
function () {
return 3;
});
Clazz.overrideMethod (c$, "getPower", 
function () {
return (this.volts[0] - this.volts[2]) * this.current;
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
var grid = 1;
var cath = 2;
var plate = 0;
var vgk = vs[grid] - vs[cath];
var vpk = vs[plate] - vs[cath];
if (Math.abs (this.lastv0 - vs[0]) > .01 || Math.abs (this.lastv1 - vs[1]) > .01 || Math.abs (this.lastv2 - vs[2]) > .01) test.Circuit.CircuitElm.sim.converged = false;
this.lastv0 = vs[0];
this.lastv1 = vs[1];
this.lastv2 = vs[2];
var ids = 0;
var gm = 0;
var Gds = 0;
var ival = vgk + vpk / this.mu;
this.currentg = 0;
if (vgk > .01) {
test.Circuit.CircuitElm.sim.stampResistor (this.nodes[grid], this.nodes[cath], 6000.0);
this.currentg = vgk / 6000.0;
}if (ival < 0) {
Gds = 1e-8;
ids = vpk * Gds;
} else {
ids = Math.pow (ival, 1.5) / this.kg1;
var q = 1.5 * Math.sqrt (ival) / this.kg1;
Gds = q;
gm = q / this.mu;
}this.currentp = ids;
this.currentc = ids + this.currentg;
var rs = -ids + Gds * vpk + gm * vgk;
test.Circuit.CircuitElm.sim.stampMatrix (this.nodes[plate], this.nodes[plate], Gds);
test.Circuit.CircuitElm.sim.stampMatrix (this.nodes[plate], this.nodes[cath], -Gds - gm);
test.Circuit.CircuitElm.sim.stampMatrix (this.nodes[plate], this.nodes[grid], gm);
test.Circuit.CircuitElm.sim.stampMatrix (this.nodes[cath], this.nodes[plate], -Gds);
test.Circuit.CircuitElm.sim.stampMatrix (this.nodes[cath], this.nodes[cath], Gds + gm);
test.Circuit.CircuitElm.sim.stampMatrix (this.nodes[cath], this.nodes[grid], -gm);
test.Circuit.CircuitElm.sim.stampRightSide (this.nodes[plate], rs);
test.Circuit.CircuitElm.sim.stampRightSide (this.nodes[cath], -rs);
});
Clazz.overrideMethod (c$, "stamp", 
function () {
test.Circuit.CircuitElm.sim.stampNonLinear (this.nodes[0]);
test.Circuit.CircuitElm.sim.stampNonLinear (this.nodes[1]);
test.Circuit.CircuitElm.sim.stampNonLinear (this.nodes[2]);
});
Clazz.overrideMethod (c$, "getInfo", 
function (arr) {
arr[0] = "triode";
var vbc = this.volts[0] - this.volts[1];
var vbe = this.volts[0] - this.volts[2];
var vce = this.volts[1] - this.volts[2];
arr[1] = "Vbe = " + test.Circuit.CircuitElm.getVoltageText (vbe);
arr[2] = "Vbc = " + test.Circuit.CircuitElm.getVoltageText (vbc);
arr[3] = "Vce = " + test.Circuit.CircuitElm.getVoltageText (vce);
}, "~A");
Clazz.overrideMethod (c$, "getConnection", 
function (n1, n2) {
return !(n1 == 1 || n2 == 1);
}, "~N,~N");
});

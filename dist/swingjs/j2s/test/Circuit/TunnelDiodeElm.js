Clazz.declarePackage ("test.Circuit");
Clazz.load (["test.Circuit.CircuitElm"], "test.Circuit.TunnelDiodeElm", null, function () {
c$ = Clazz.decorateAsClass (function () {
this.hs = 8;
this.poly = null;
this.cathode = null;
this.lastvoltdiff = 0;
Clazz.instantialize (this, arguments);
}, test.Circuit, "TunnelDiodeElm", test.Circuit.CircuitElm);
Clazz.makeConstructor (c$, 
function (xx, yy) {
Clazz.superConstructor (this, test.Circuit.TunnelDiodeElm, [xx, yy]);
this.setup ();
}, "~N,~N");
Clazz.makeConstructor (c$, 
function (xa, ya, xb, yb, f, st) {
Clazz.superConstructor (this, test.Circuit.TunnelDiodeElm, [xa, ya, xb, yb, f]);
this.setup ();
}, "~N,~N,~N,~N,~N,java.util.StringTokenizer");
Clazz.overrideMethod (c$, "nonLinear", 
function () {
return true;
});
Clazz.defineMethod (c$, "setup", 
function () {
});
Clazz.overrideMethod (c$, "getDumpType", 
function () {
return 175;
});
Clazz.defineMethod (c$, "setPoints", 
function () {
Clazz.superCall (this, test.Circuit.TunnelDiodeElm, "setPoints", []);
this.calcLeads (16);
this.cathode = this.newPointArray (4);
var pa = this.newPointArray (2);
this.interpPoint2 (this.lead1, this.lead2, pa[0], pa[1], 0, 8);
this.interpPoint2 (this.lead1, this.lead2, this.cathode[0], this.cathode[1], 1, 8);
this.interpPoint2 (this.lead1, this.lead2, this.cathode[2], this.cathode[3], .8, 8);
this.poly = this.createPolygon (pa[0], pa[1], this.lead2);
});
Clazz.overrideMethod (c$, "draw", 
function (g) {
this.setBbox (this.point1, this.point2, 8);
var v1 = this.volts[0];
var v2 = this.volts[1];
this.draw2Leads (g);
this.setPowerColor (g, true);
this.setVoltageColor (g, v1);
g.fillPolygon (this.poly);
this.setVoltageColor (g, v2);
test.Circuit.CircuitElm.drawThickLine (g, this.cathode[0], this.cathode[1]);
test.Circuit.CircuitElm.drawThickLine (g, this.cathode[2], this.cathode[0]);
test.Circuit.CircuitElm.drawThickLine (g, this.cathode[3], this.cathode[1]);
this.doDots (g);
this.drawPosts (g);
}, "java.awt.Graphics");
Clazz.overrideMethod (c$, "reset", 
function () {
this.lastvoltdiff = this.volts[0] = this.volts[1] = this.curcount = 0;
});
Clazz.defineMethod (c$, "limitStep", 
function (vnew, vold) {
if (vnew > vold + 1) return vold + 1;
if (vnew < vold - 1) return vold - 1;
return vnew;
}, "~N,~N");
Clazz.overrideMethod (c$, "stamp", 
function () {
test.Circuit.CircuitElm.sim.stampNonLinear (this.nodes[0]);
test.Circuit.CircuitElm.sim.stampNonLinear (this.nodes[1]);
});
Clazz.overrideMethod (c$, "doStep", 
function () {
var voltdiff = this.volts[0] - this.volts[1];
if (Math.abs (voltdiff - this.lastvoltdiff) > .01) test.Circuit.CircuitElm.sim.converged = false;
voltdiff = this.limitStep (voltdiff, this.lastvoltdiff);
this.lastvoltdiff = voltdiff;
var i = 0.0047 * Math.exp (-20.192307692307693) * (Math.exp (voltdiff / 0.026) - 1) + 0.0047 * (voltdiff / 0.1) * Math.exp (1 - voltdiff / 0.1) + 3.7E-4 * Math.exp (voltdiff - 0.37);
var geq = 0.0047 * Math.exp (-20.192307692307693) * Math.exp (voltdiff / 0.026) / 0.026 + 0.0047 * Math.exp (1 - voltdiff / 0.1) / 0.1 - Math.exp (1 - voltdiff / 0.1) * 0.0047 * voltdiff / (0.010000000000000002) + Math.exp (voltdiff - 0.37) * 3.7E-4;
var nc = i - geq * voltdiff;
test.Circuit.CircuitElm.sim.stampConductance (this.nodes[0], this.nodes[1], geq);
test.Circuit.CircuitElm.sim.stampCurrentSource (this.nodes[0], this.nodes[1], nc);
});
Clazz.overrideMethod (c$, "calculateCurrent", 
function () {
var voltdiff = this.volts[0] - this.volts[1];
this.current = 0.0047 * Math.exp (-20.192307692307693) * (Math.exp (voltdiff / 0.026) - 1) + 0.0047 * (voltdiff / 0.1) * Math.exp (1 - voltdiff / 0.1) + 3.7E-4 * Math.exp (voltdiff - 0.37);
});
Clazz.overrideMethod (c$, "getInfo", 
function (arr) {
arr[0] = "tunnel diode";
arr[1] = "I = " + test.Circuit.CircuitElm.getCurrentText (this.getCurrent ());
arr[2] = "Vd = " + test.Circuit.CircuitElm.getVoltageText (this.getVoltageDiff ());
arr[3] = "P = " + test.Circuit.CircuitElm.getUnitText (this.getPower (), "W");
}, "~A");
Clazz.defineStatics (c$,
"pvp", .1,
"pip", 4.7e-3,
"pvv", .37,
"pvt", .026,
"pvpp", .525,
"piv", 370e-6);
});

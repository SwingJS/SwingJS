Clazz.declarePackage ("test.Circuit");
Clazz.load (["test.Circuit.CircuitElm"], "test.Circuit.InverterElm", ["java.lang.Double", "test.Circuit.EditInfo"], function () {
c$ = Clazz.decorateAsClass (function () {
this.slewRate = 0;
this.gatePoly = null;
this.pcircle = null;
Clazz.instantialize (this, arguments);
}, test.Circuit, "InverterElm", test.Circuit.CircuitElm);
Clazz.makeConstructor (c$, 
function (xx, yy) {
Clazz.superConstructor (this, test.Circuit.InverterElm, [xx, yy]);
this.noDiagonal = true;
this.slewRate = .5;
}, "~N,~N");
Clazz.makeConstructor (c$, 
function (xa, ya, xb, yb, f, st) {
Clazz.superConstructor (this, test.Circuit.InverterElm, [xa, ya, xb, yb, f]);
this.noDiagonal = true;
try {
this.slewRate =  new Double (st.nextToken ()).doubleValue ();
} catch (e) {
if (Clazz.exceptionOf (e, Exception)) {
this.slewRate = .5;
} else {
throw e;
}
}
}, "~N,~N,~N,~N,~N,java.util.StringTokenizer");
Clazz.defineMethod (c$, "dump", 
function () {
return Clazz.superCall (this, test.Circuit.InverterElm, "dump", []) + " " + this.slewRate;
});
Clazz.overrideMethod (c$, "getDumpType", 
function () {
return 'I';
});
Clazz.overrideMethod (c$, "draw", 
function (g) {
this.drawPosts (g);
this.draw2Leads (g);
g.setColor (this.needsHighlight () ? test.Circuit.CircuitElm.selectColor : test.Circuit.CircuitElm.lightGrayColor);
test.Circuit.CircuitElm.drawThickPolygon (g, this.gatePoly);
test.Circuit.CircuitElm.drawThickCircle (g, this.pcircle.x, this.pcircle.y, 3);
this.curcount = this.updateDotCount (this.current, this.curcount);
this.drawDots (g, this.lead2, this.point2, this.curcount);
}, "java.awt.Graphics");
Clazz.defineMethod (c$, "setPoints", 
function () {
Clazz.superCall (this, test.Circuit.InverterElm, "setPoints", []);
var hs = 16;
var ww = 16;
if (ww > this.dn / 2) ww = Clazz.doubleToInt (this.dn / 2);
this.lead1 = this.interpPoint (this.point1, this.point2, .5 - ww / this.dn);
this.lead2 = this.interpPoint (this.point1, this.point2, .5 + (ww + 2) / this.dn);
this.pcircle = this.interpPoint (this.point1, this.point2, .5 + (ww - 2) / this.dn);
var triPoints = this.newPointArray (3);
this.interpPoint2 (this.lead1, this.lead2, triPoints[0], triPoints[1], 0, hs);
triPoints[2] = this.interpPoint (this.point1, this.point2, .5 + (ww - 5) / this.dn);
this.gatePoly = this.createPolygon (triPoints);
this.setBbox (this.point1, this.point2, hs);
});
Clazz.overrideMethod (c$, "getVoltageSourceCount", 
function () {
return 1;
});
Clazz.overrideMethod (c$, "stamp", 
function () {
test.Circuit.CircuitElm.sim.stampVoltageSource (0, this.nodes[1], this.voltSource);
});
Clazz.overrideMethod (c$, "doStep", 
function () {
var v0 = this.volts[1];
var out = this.volts[0] > 2.5 ? 0 : 5;
var maxStep = this.slewRate * test.Circuit.CircuitElm.sim.timeStep * 1e9;
out = Math.max (Math.min (v0 + maxStep, out), v0 - maxStep);
test.Circuit.CircuitElm.sim.updateVoltageSource (0, this.nodes[1], this.voltSource, out);
});
Clazz.overrideMethod (c$, "getVoltageDiff", 
function () {
return this.volts[0];
});
Clazz.overrideMethod (c$, "getInfo", 
function (arr) {
arr[0] = "inverter";
arr[1] = "Vi = " + test.Circuit.CircuitElm.getVoltageText (this.volts[0]);
arr[2] = "Vo = " + test.Circuit.CircuitElm.getVoltageText (this.volts[1]);
}, "~A");
Clazz.overrideMethod (c$, "getEditInfo", 
function (n) {
if (n == 0) return  new test.Circuit.EditInfo ("Slew Rate (V/ns)", this.slewRate, 0, 0);
return null;
}, "~N");
Clazz.overrideMethod (c$, "setEditValue", 
function (n, ei) {
this.slewRate = ei.value;
}, "~N,test.Circuit.EditInfo");
Clazz.overrideMethod (c$, "getConnection", 
function (n1, n2) {
return false;
}, "~N,~N");
Clazz.overrideMethod (c$, "hasGroundConnection", 
function (n1) {
return (n1 == 1);
}, "~N");
Clazz.overrideMethod (c$, "getShortcut", 
function () {
return '1';
});
});

Clazz.declarePackage ("test.Circuit");
Clazz.load (["test.Circuit.InvertingSchmittElm"], "test.Circuit.SchmittElm", ["java.awt.Point", "test.Circuit.CircuitElm"], function () {
c$ = Clazz.decorateAsClass (function () {
this.$gatePoly = null;
this.$symbolPoly = null;
Clazz.instantialize (this, arguments);
}, test.Circuit, "SchmittElm", test.Circuit.InvertingSchmittElm);
Clazz.overrideMethod (c$, "getDumpType", 
function () {
return 182;
});
Clazz.overrideMethod (c$, "doStep", 
function () {
var v0 = this.volts[1];
var out;
if (this.state) {
if (this.volts[0] > this.upperTrigger) {
this.state = false;
out = 5;
} else {
out = 0;
}} else {
if (this.volts[0] < this.lowerTrigger) {
this.state = true;
out = 0;
} else {
out = 5;
}}var maxStep = this.slewRate * test.Circuit.CircuitElm.sim.timeStep * 1e9;
out = Math.max (Math.min (v0 + maxStep, out), v0 - maxStep);
test.Circuit.CircuitElm.sim.updateVoltageSource (0, this.nodes[1], this.voltSource, out);
});
Clazz.overrideMethod (c$, "draw", 
function (g) {
this.drawPosts (g);
this.draw2Leads (g);
g.setColor (this.needsHighlight () ? test.Circuit.CircuitElm.selectColor : test.Circuit.CircuitElm.lightGrayColor);
test.Circuit.CircuitElm.drawThickPolygon (g, this.$gatePoly);
test.Circuit.CircuitElm.drawThickPolygon (g, this.$symbolPoly);
this.curcount = this.updateDotCount (this.current, this.curcount);
this.drawDots (g, this.lead2, this.point2, this.curcount);
}, "java.awt.Graphics");
Clazz.defineMethod (c$, "setPoints", 
function () {
Clazz.superCall (this, test.Circuit.SchmittElm, "setPoints", []);
var hs = 16;
var ww = 16;
if (ww > this.dn / 2) ww = Clazz.doubleToInt (this.dn / 2);
this.lead1 = this.interpPoint (this.point1, this.point2, .5 - ww / this.dn);
this.lead2 = this.interpPoint (this.point1, this.point2, .5 + (ww - 3) / this.dn);
var triPoints = this.newPointArray (3);
var symPoints = this.newPointArray (6);
var dummy =  new java.awt.Point (0, 0);
this.interpPoint2 (this.lead1, this.lead2, triPoints[0], triPoints[1], 0, hs);
triPoints[2] = this.interpPoint (this.point1, this.point2, .5 + (ww - 5) / this.dn);
this.interpPoint2 (this.lead1, this.lead2, symPoints[4], symPoints[5], 0.25, Clazz.doubleToInt (hs / 4));
this.interpPoint2 (this.lead1, this.lead2, symPoints[2], symPoints[1], 0.4, Clazz.doubleToInt (hs / 4));
this.interpPoint2 (this.lead1, this.lead2, dummy, symPoints[0], 0.1, Clazz.doubleToInt (hs / 4));
this.interpPoint2 (this.lead1, this.lead2, symPoints[3], dummy, 0.52, Clazz.doubleToInt (hs / 4));
this.$gatePoly = this.createPolygon (triPoints);
this.$symbolPoly = this.createPolygon (symPoints);
this.setBbox (this.point1, this.point2, hs);
});
Clazz.overrideMethod (c$, "getInfo", 
function (arr) {
arr[0] = "Schmitt";
}, "~A");
});

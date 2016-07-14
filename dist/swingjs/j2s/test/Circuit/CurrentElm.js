Clazz.declarePackage ("test.Circuit");
Clazz.load (["test.Circuit.CircuitElm"], "test.Circuit.CurrentElm", ["java.lang.Double", "test.Circuit.EditInfo"], function () {
c$ = Clazz.decorateAsClass (function () {
this.currentValue = 0;
this.arrow = null;
this.ashaft1 = null;
this.ashaft2 = null;
this.center = null;
Clazz.instantialize (this, arguments);
}, test.Circuit, "CurrentElm", test.Circuit.CircuitElm);
Clazz.makeConstructor (c$, 
function (xx, yy) {
Clazz.superConstructor (this, test.Circuit.CurrentElm, [xx, yy]);
this.currentValue = .01;
}, "~N,~N");
Clazz.makeConstructor (c$, 
function (xa, ya, xb, yb, f, st) {
Clazz.superConstructor (this, test.Circuit.CurrentElm, [xa, ya, xb, yb, f]);
try {
this.currentValue =  new Double (st.nextToken ()).doubleValue ();
} catch (e) {
if (Clazz.exceptionOf (e, Exception)) {
this.currentValue = .01;
} else {
throw e;
}
}
}, "~N,~N,~N,~N,~N,java.util.StringTokenizer");
Clazz.defineMethod (c$, "dump", 
function () {
return Clazz.superCall (this, test.Circuit.CurrentElm, "dump", []) + " " + this.currentValue;
});
Clazz.overrideMethod (c$, "getDumpType", 
function () {
return 'i';
});
Clazz.defineMethod (c$, "setPoints", 
function () {
Clazz.superCall (this, test.Circuit.CurrentElm, "setPoints", []);
this.calcLeads (26);
this.ashaft1 = this.interpPoint (this.lead1, this.lead2, .25);
this.ashaft2 = this.interpPoint (this.lead1, this.lead2, .6);
this.center = this.interpPoint (this.lead1, this.lead2, .5);
var p2 = this.interpPoint (this.lead1, this.lead2, .75);
this.arrow = this.calcArrow (this.center, p2, 4, 4);
});
Clazz.overrideMethod (c$, "draw", 
function (g) {
var cr = 12;
this.draw2Leads (g);
this.setVoltageColor (g, (this.volts[0] + this.volts[1]) / 2);
this.setPowerColor (g, false);
test.Circuit.CircuitElm.drawThickCircle (g, this.center.x, this.center.y, cr);
test.Circuit.CircuitElm.drawThickLine (g, this.ashaft1, this.ashaft2);
g.fillPolygon (this.arrow);
this.setBbox (this.point1, this.point2, cr);
this.doDots (g);
if (test.Circuit.CircuitElm.sim.showValuesCheckItem.getState ()) {
var s = test.Circuit.CircuitElm.getShortUnitText (this.currentValue, "A");
if (this.dx == 0 || this.dy == 0) this.drawValues (g, s, cr);
}this.drawPosts (g);
}, "java.awt.Graphics");
Clazz.overrideMethod (c$, "stamp", 
function () {
this.current = this.currentValue;
test.Circuit.CircuitElm.sim.stampCurrentSource (this.nodes[0], this.nodes[1], this.current);
});
Clazz.overrideMethod (c$, "getEditInfo", 
function (n) {
if (n == 0) return  new test.Circuit.EditInfo ("Current (A)", this.currentValue, 0, .1);
return null;
}, "~N");
Clazz.overrideMethod (c$, "setEditValue", 
function (n, ei) {
this.currentValue = ei.value;
}, "~N,test.Circuit.EditInfo");
Clazz.overrideMethod (c$, "getInfo", 
function (arr) {
arr[0] = "current source";
this.getBasicInfo (arr);
}, "~A");
Clazz.overrideMethod (c$, "getVoltageDiff", 
function () {
return this.volts[1] - this.volts[0];
});
});

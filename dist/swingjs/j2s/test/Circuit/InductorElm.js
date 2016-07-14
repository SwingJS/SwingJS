Clazz.declarePackage ("test.Circuit");
Clazz.load (["test.Circuit.CircuitElm"], "test.Circuit.InductorElm", ["java.awt.Checkbox", "java.lang.Double", "test.Circuit.EditInfo", "$.Inductor"], function () {
c$ = Clazz.decorateAsClass (function () {
this.ind = null;
this.inductance = 0;
Clazz.instantialize (this, arguments);
}, test.Circuit, "InductorElm", test.Circuit.CircuitElm);
Clazz.makeConstructor (c$, 
function (xx, yy) {
Clazz.superConstructor (this, test.Circuit.InductorElm, [xx, yy]);
this.ind =  new test.Circuit.Inductor (test.Circuit.CircuitElm.sim);
this.inductance = 1;
this.ind.setup (this.inductance, this.current, this.flags);
}, "~N,~N");
Clazz.makeConstructor (c$, 
function (xa, ya, xb, yb, f, st) {
Clazz.superConstructor (this, test.Circuit.InductorElm, [xa, ya, xb, yb, f]);
this.ind =  new test.Circuit.Inductor (test.Circuit.CircuitElm.sim);
this.inductance =  new Double (st.nextToken ()).doubleValue ();
this.current =  new Double (st.nextToken ()).doubleValue ();
this.ind.setup (this.inductance, this.current, this.flags);
}, "~N,~N,~N,~N,~N,java.util.StringTokenizer");
Clazz.overrideMethod (c$, "getDumpType", 
function () {
return 'l';
});
Clazz.defineMethod (c$, "dump", 
function () {
return Clazz.superCall (this, test.Circuit.InductorElm, "dump", []) + " " + this.inductance + " " + this.current;
});
Clazz.defineMethod (c$, "setPoints", 
function () {
Clazz.superCall (this, test.Circuit.InductorElm, "setPoints", []);
this.calcLeads (32);
});
Clazz.overrideMethod (c$, "draw", 
function (g) {
var v1 = this.volts[0];
var v2 = this.volts[1];
var i;
var hs = 8;
this.setBbox (this.point1, this.point2, hs);
this.draw2Leads (g);
this.setPowerColor (g, false);
this.drawCoil (g, 8, this.lead1, this.lead2, v1, v2);
if (test.Circuit.CircuitElm.sim.showValuesCheckItem.getState ()) {
var s = test.Circuit.CircuitElm.getShortUnitText (this.inductance, "H");
this.drawValues (g, s, hs);
}this.doDots (g);
this.drawPosts (g);
}, "java.awt.Graphics");
Clazz.overrideMethod (c$, "reset", 
function () {
this.current = this.volts[0] = this.volts[1] = this.curcount = 0;
this.ind.reset ();
});
Clazz.overrideMethod (c$, "stamp", 
function () {
this.ind.stamp (this.nodes[0], this.nodes[1]);
});
Clazz.overrideMethod (c$, "startIteration", 
function () {
this.ind.startIteration (this.volts[0] - this.volts[1]);
});
Clazz.overrideMethod (c$, "nonLinear", 
function () {
return this.ind.nonLinear ();
});
Clazz.overrideMethod (c$, "calculateCurrent", 
function () {
var voltdiff = this.volts[0] - this.volts[1];
this.current = this.ind.calculateCurrent (voltdiff);
});
Clazz.overrideMethod (c$, "doStep", 
function () {
var voltdiff = this.volts[0] - this.volts[1];
this.ind.doStep (voltdiff);
});
Clazz.overrideMethod (c$, "getInfo", 
function (arr) {
arr[0] = "inductor";
this.getBasicInfo (arr);
arr[3] = "L = " + test.Circuit.CircuitElm.getUnitText (this.inductance, "H");
arr[4] = "P = " + test.Circuit.CircuitElm.getUnitText (this.getPower (), "W");
}, "~A");
Clazz.overrideMethod (c$, "getEditInfo", 
function (n) {
if (n == 0) return  new test.Circuit.EditInfo ("Inductance (H)", this.inductance, 0, 0);
if (n == 1) {
var ei =  new test.Circuit.EditInfo ("", 0, -1, -1);
ei.checkbox =  new java.awt.Checkbox ("Trapezoidal Approximation", this.ind.isTrapezoidal ());
return ei;
}return null;
}, "~N");
Clazz.overrideMethod (c$, "setEditValue", 
function (n, ei) {
if (n == 0) this.inductance = ei.value;
if (n == 1) {
if (ei.checkbox.getState ()) this.flags &= -3;
 else this.flags |= 2;
}this.ind.setup (this.inductance, this.current, this.flags);
}, "~N,test.Circuit.EditInfo");
});

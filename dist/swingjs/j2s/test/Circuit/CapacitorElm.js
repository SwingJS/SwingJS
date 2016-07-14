Clazz.declarePackage ("test.Circuit");
Clazz.load (["test.Circuit.CircuitElm"], "test.Circuit.CapacitorElm", ["java.awt.Checkbox", "$.Color", "java.lang.Double", "test.Circuit.EditInfo"], function () {
c$ = Clazz.decorateAsClass (function () {
this.capacitance = 0;
this.compResistance = 0;
this.voltdiff = 0;
this.plate1 = null;
this.plate2 = null;
this.curSourceValue = 0;
Clazz.instantialize (this, arguments);
}, test.Circuit, "CapacitorElm", test.Circuit.CircuitElm);
Clazz.makeConstructor (c$, 
function (xx, yy) {
Clazz.superConstructor (this, test.Circuit.CapacitorElm, [xx, yy]);
this.capacitance = 1e-5;
}, "~N,~N");
Clazz.makeConstructor (c$, 
function (xa, ya, xb, yb, f, st) {
Clazz.superConstructor (this, test.Circuit.CapacitorElm, [xa, ya, xb, yb, f]);
this.capacitance =  new Double (st.nextToken ()).doubleValue ();
this.voltdiff =  new Double (st.nextToken ()).doubleValue ();
}, "~N,~N,~N,~N,~N,java.util.StringTokenizer");
Clazz.defineMethod (c$, "isTrapezoidal", 
function () {
return (this.flags & 2) == 0;
});
Clazz.defineMethod (c$, "setNodeVoltage", 
function (n, c) {
Clazz.superCall (this, test.Circuit.CapacitorElm, "setNodeVoltage", [n, c]);
this.voltdiff = this.volts[0] - this.volts[1];
}, "~N,~N");
Clazz.overrideMethod (c$, "reset", 
function () {
this.current = this.curcount = 0;
this.voltdiff = 1e-3;
});
Clazz.overrideMethod (c$, "getDumpType", 
function () {
return 'c';
});
Clazz.defineMethod (c$, "dump", 
function () {
return Clazz.superCall (this, test.Circuit.CapacitorElm, "dump", []) + " " + this.capacitance + " " + this.voltdiff;
});
Clazz.defineMethod (c$, "setPoints", 
function () {
Clazz.superCall (this, test.Circuit.CapacitorElm, "setPoints", []);
var f = (this.dn / 2 - 4) / this.dn;
this.lead1 = this.interpPoint (this.point1, this.point2, f);
this.lead2 = this.interpPoint (this.point1, this.point2, 1 - f);
this.plate1 = this.newPointArray (2);
this.plate2 = this.newPointArray (2);
this.interpPoint2 (this.point1, this.point2, this.plate1[0], this.plate1[1], f, 12);
this.interpPoint2 (this.point1, this.point2, this.plate2[0], this.plate2[1], 1 - f, 12);
});
Clazz.overrideMethod (c$, "draw", 
function (g) {
var hs = 12;
this.setBbox (this.point1, this.point2, hs);
this.setVoltageColor (g, this.volts[0]);
test.Circuit.CircuitElm.drawThickLine (g, this.point1, this.lead1);
this.setPowerColor (g, false);
test.Circuit.CircuitElm.drawThickLine (g, this.plate1[0], this.plate1[1]);
if (test.Circuit.CircuitElm.sim.powerCheckItem.getState ()) g.setColor (java.awt.Color.gray);
this.setVoltageColor (g, this.volts[1]);
test.Circuit.CircuitElm.drawThickLine (g, this.point2, this.lead2);
this.setPowerColor (g, false);
test.Circuit.CircuitElm.drawThickLine (g, this.plate2[0], this.plate2[1]);
this.updateDotCount ();
if (test.Circuit.CircuitElm.sim.dragElm !== this) {
this.drawDots (g, this.point1, this.lead1, this.curcount);
this.drawDots (g, this.point2, this.lead2, -this.curcount);
}this.drawPosts (g);
if (test.Circuit.CircuitElm.sim.showValuesCheckItem.getState ()) {
var s = test.Circuit.CircuitElm.getShortUnitText (this.capacitance, "F");
this.drawValues (g, s, hs);
}}, "java.awt.Graphics");
Clazz.overrideMethod (c$, "stamp", 
function () {
if (this.isTrapezoidal ()) this.compResistance = test.Circuit.CircuitElm.sim.timeStep / (2 * this.capacitance);
 else this.compResistance = test.Circuit.CircuitElm.sim.timeStep / this.capacitance;
test.Circuit.CircuitElm.sim.stampResistor (this.nodes[0], this.nodes[1], this.compResistance);
test.Circuit.CircuitElm.sim.stampRightSide (this.nodes[0]);
test.Circuit.CircuitElm.sim.stampRightSide (this.nodes[1]);
});
Clazz.overrideMethod (c$, "startIteration", 
function () {
if (this.isTrapezoidal ()) this.curSourceValue = -this.voltdiff / this.compResistance - this.current;
 else this.curSourceValue = -this.voltdiff / this.compResistance;
});
Clazz.overrideMethod (c$, "calculateCurrent", 
function () {
var voltdiff = this.volts[0] - this.volts[1];
if (this.compResistance > 0) this.current = voltdiff / this.compResistance + this.curSourceValue;
});
Clazz.overrideMethod (c$, "doStep", 
function () {
test.Circuit.CircuitElm.sim.stampCurrentSource (this.nodes[0], this.nodes[1], this.curSourceValue);
});
Clazz.overrideMethod (c$, "getInfo", 
function (arr) {
arr[0] = "capacitor";
this.getBasicInfo (arr);
arr[3] = "C = " + test.Circuit.CircuitElm.getUnitText (this.capacitance, "F");
arr[4] = "P = " + test.Circuit.CircuitElm.getUnitText (this.getPower (), "W");
}, "~A");
Clazz.overrideMethod (c$, "getEditInfo", 
function (n) {
if (n == 0) return  new test.Circuit.EditInfo ("Capacitance (F)", this.capacitance, 0, 0);
if (n == 1) {
var ei =  new test.Circuit.EditInfo ("", 0, -1, -1);
ei.checkbox =  new java.awt.Checkbox ("Trapezoidal Approximation", this.isTrapezoidal ());
return ei;
}return null;
}, "~N");
Clazz.overrideMethod (c$, "setEditValue", 
function (n, ei) {
if (n == 0 && ei.value > 0) this.capacitance = ei.value;
if (n == 1) {
if (ei.checkbox.getState ()) this.flags &= -3;
 else this.flags |= 2;
}}, "~N,test.Circuit.EditInfo");
Clazz.overrideMethod (c$, "getShortcut", 
function () {
return 'c';
});
Clazz.defineStatics (c$,
"FLAG_BACK_EULER", 2);
});

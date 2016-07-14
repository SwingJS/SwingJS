Clazz.declarePackage ("test.Circuit");
Clazz.load (["test.Circuit.CircuitElm"], "test.Circuit.ResistorElm", ["java.awt.Point", "java.lang.Double", "test.Circuit.CirSim", "$.EditInfo"], function () {
c$ = Clazz.decorateAsClass (function () {
this.resistance = 0;
this.ps3 = null;
this.ps4 = null;
Clazz.instantialize (this, arguments);
}, test.Circuit, "ResistorElm", test.Circuit.CircuitElm);
Clazz.makeConstructor (c$, 
function (xx, yy) {
Clazz.superConstructor (this, test.Circuit.ResistorElm, [xx, yy]);
this.resistance = 100;
}, "~N,~N");
Clazz.makeConstructor (c$, 
function (xa, ya, xb, yb, f, st) {
Clazz.superConstructor (this, test.Circuit.ResistorElm, [xa, ya, xb, yb, f]);
this.resistance =  new Double (st.nextToken ()).doubleValue ();
}, "~N,~N,~N,~N,~N,java.util.StringTokenizer");
Clazz.overrideMethod (c$, "getDumpType", 
function () {
return 'r';
});
Clazz.defineMethod (c$, "dump", 
function () {
return Clazz.superCall (this, test.Circuit.ResistorElm, "dump", []) + " " + this.resistance;
});
Clazz.defineMethod (c$, "setPoints", 
function () {
Clazz.superCall (this, test.Circuit.ResistorElm, "setPoints", []);
this.calcLeads (32);
this.ps3 =  new java.awt.Point ();
this.ps4 =  new java.awt.Point ();
});
Clazz.overrideMethod (c$, "draw", 
function (g) {
var segments = 16;
var i;
var ox = 0;
var hs = test.Circuit.CircuitElm.sim.euroResistorCheckItem.getState () ? 6 : 8;
var v1 = this.volts[0];
var v2 = this.volts[1];
this.setBbox (this.point1, this.point2, hs);
this.draw2Leads (g);
this.setPowerColor (g, true);
var segf = 1. / segments;
if (!test.Circuit.CircuitElm.sim.euroResistorCheckItem.getState ()) {
for (i = 0; i != segments; i++) {
var nx = 0;
switch (i & 3) {
case 0:
nx = 1;
break;
case 2:
nx = -1;
break;
default:
nx = 0;
break;
}
var v = v1 + (v2 - v1) * i / segments;
this.setVoltageColor (g, v);
this.interpPoint (this.lead1, this.lead2, test.Circuit.CircuitElm.ps1, i * segf, hs * ox);
this.interpPoint (this.lead1, this.lead2, test.Circuit.CircuitElm.ps2, (i + 1) * segf, hs * nx);
test.Circuit.CircuitElm.drawThickLine (g, test.Circuit.CircuitElm.ps1, test.Circuit.CircuitElm.ps2);
ox = nx;
}
} else {
this.setVoltageColor (g, v1);
this.interpPoint2 (this.lead1, this.lead2, test.Circuit.CircuitElm.ps1, test.Circuit.CircuitElm.ps2, 0, hs);
test.Circuit.CircuitElm.drawThickLine (g, test.Circuit.CircuitElm.ps1, test.Circuit.CircuitElm.ps2);
for (i = 0; i != segments; i++) {
var v = v1 + (v2 - v1) * i / segments;
this.setVoltageColor (g, v);
this.interpPoint2 (this.lead1, this.lead2, test.Circuit.CircuitElm.ps1, test.Circuit.CircuitElm.ps2, i * segf, hs);
this.interpPoint2 (this.lead1, this.lead2, this.ps3, this.ps4, (i + 1) * segf, hs);
test.Circuit.CircuitElm.drawThickLine (g, test.Circuit.CircuitElm.ps1, this.ps3);
test.Circuit.CircuitElm.drawThickLine (g, test.Circuit.CircuitElm.ps2, this.ps4);
}
this.interpPoint2 (this.lead1, this.lead2, test.Circuit.CircuitElm.ps1, test.Circuit.CircuitElm.ps2, 1, hs);
test.Circuit.CircuitElm.drawThickLine (g, test.Circuit.CircuitElm.ps1, test.Circuit.CircuitElm.ps2);
}if (test.Circuit.CircuitElm.sim.showValuesCheckItem.getState ()) {
var s = test.Circuit.CircuitElm.getShortUnitText (this.resistance, "");
this.drawValues (g, s, hs);
}this.doDots (g);
this.drawPosts (g);
}, "java.awt.Graphics");
Clazz.overrideMethod (c$, "calculateCurrent", 
function () {
this.current = (this.volts[0] - this.volts[1]) / this.resistance;
});
Clazz.overrideMethod (c$, "stamp", 
function () {
test.Circuit.CircuitElm.sim.stampResistor (this.nodes[0], this.nodes[1], this.resistance);
});
Clazz.overrideMethod (c$, "getInfo", 
function (arr) {
arr[0] = "resistor";
this.getBasicInfo (arr);
arr[3] = "R = " + test.Circuit.CircuitElm.getUnitText (this.resistance, test.Circuit.CirSim.ohmString);
arr[4] = "P = " + test.Circuit.CircuitElm.getUnitText (this.getPower (), "W");
}, "~A");
Clazz.overrideMethod (c$, "getEditInfo", 
function (n) {
if (n == 0) return  new test.Circuit.EditInfo ("Resistance (ohms)", this.resistance, 0, 0);
return null;
}, "~N");
Clazz.overrideMethod (c$, "setEditValue", 
function (n, ei) {
if (ei.value > 0) this.resistance = ei.value;
}, "~N,test.Circuit.EditInfo");
Clazz.overrideMethod (c$, "getShortcut", 
function () {
return 'r';
});
});

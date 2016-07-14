Clazz.declarePackage ("test.Circuit");
Clazz.load (["test.Circuit.CircuitElm"], "test.Circuit.MemristorElm", ["java.awt.Point", "java.lang.Double", "test.Circuit.CirSim", "$.EditInfo"], function () {
c$ = Clazz.decorateAsClass (function () {
this.r_on = 0;
this.r_off = 0;
this.dopeWidth = 0;
this.totalWidth = 0;
this.mobility = 0;
this.resistance = 0;
this.ps3 = null;
this.ps4 = null;
Clazz.instantialize (this, arguments);
}, test.Circuit, "MemristorElm", test.Circuit.CircuitElm);
Clazz.makeConstructor (c$, 
function (xx, yy) {
Clazz.superConstructor (this, test.Circuit.MemristorElm, [xx, yy]);
this.r_on = 100;
this.r_off = 160 * this.r_on;
this.dopeWidth = 0;
this.totalWidth = 10e-9;
this.mobility = 1e-10;
this.resistance = 100;
}, "~N,~N");
Clazz.makeConstructor (c$, 
function (xa, ya, xb, yb, f, st) {
Clazz.superConstructor (this, test.Circuit.MemristorElm, [xa, ya, xb, yb, f]);
this.r_on =  new Double (st.nextToken ()).doubleValue ();
this.r_off =  new Double (st.nextToken ()).doubleValue ();
this.dopeWidth =  new Double (st.nextToken ()).doubleValue ();
this.totalWidth =  new Double (st.nextToken ()).doubleValue ();
this.mobility =  new Double (st.nextToken ()).doubleValue ();
this.resistance = 100;
}, "~N,~N,~N,~N,~N,java.util.StringTokenizer");
Clazz.overrideMethod (c$, "getDumpType", 
function () {
return 'm';
});
Clazz.defineMethod (c$, "dump", 
function () {
return Clazz.superCall (this, test.Circuit.MemristorElm, "dump", []) + " " + this.r_on + " " + this.r_off + " " + this.dopeWidth + " " + this.totalWidth + " " + this.mobility;
});
Clazz.defineMethod (c$, "setPoints", 
function () {
Clazz.superCall (this, test.Circuit.MemristorElm, "setPoints", []);
this.calcLeads (32);
this.ps3 =  new java.awt.Point ();
this.ps4 =  new java.awt.Point ();
});
Clazz.overrideMethod (c$, "draw", 
function (g) {
var segments = 6;
var i;
var ox = 0;
var v1 = this.volts[0];
var v2 = this.volts[1];
var hs = 2 + Clazz.doubleToInt (8 * (1 - this.dopeWidth / this.totalWidth));
this.setBbox (this.point1, this.point2, hs);
this.draw2Leads (g);
this.setPowerColor (g, true);
var segf = 1. / segments;
for (i = 0; i <= segments; i++) {
var nx = (i & 1) == 0 ? 1 : -1;
if (i == segments) nx = 0;
var v = v1 + (v2 - v1) * i / segments;
this.setVoltageColor (g, v);
this.interpPoint (this.lead1, this.lead2, test.Circuit.CircuitElm.ps1, i * segf, hs * ox);
this.interpPoint (this.lead1, this.lead2, test.Circuit.CircuitElm.ps2, i * segf, hs * nx);
test.Circuit.CircuitElm.drawThickLine (g, test.Circuit.CircuitElm.ps1, test.Circuit.CircuitElm.ps2);
if (i == segments) break;
this.interpPoint (this.lead1, this.lead2, test.Circuit.CircuitElm.ps1, (i + 1) * segf, hs * nx);
test.Circuit.CircuitElm.drawThickLine (g, test.Circuit.CircuitElm.ps1, test.Circuit.CircuitElm.ps2);
ox = nx;
}
this.doDots (g);
this.drawPosts (g);
}, "java.awt.Graphics");
Clazz.overrideMethod (c$, "nonLinear", 
function () {
return true;
});
Clazz.overrideMethod (c$, "calculateCurrent", 
function () {
this.current = (this.volts[0] - this.volts[1]) / this.resistance;
});
Clazz.overrideMethod (c$, "reset", 
function () {
this.dopeWidth = 0;
});
Clazz.overrideMethod (c$, "startIteration", 
function () {
var wd = this.dopeWidth / this.totalWidth;
this.dopeWidth += test.Circuit.CircuitElm.sim.timeStep * this.mobility * this.r_on * this.current / this.totalWidth;
if (this.dopeWidth < 0) this.dopeWidth = 0;
if (this.dopeWidth > this.totalWidth) this.dopeWidth = this.totalWidth;
this.resistance = this.r_on * wd + this.r_off * (1 - wd);
});
Clazz.overrideMethod (c$, "stamp", 
function () {
test.Circuit.CircuitElm.sim.stampNonLinear (this.nodes[0]);
test.Circuit.CircuitElm.sim.stampNonLinear (this.nodes[1]);
});
Clazz.overrideMethod (c$, "doStep", 
function () {
test.Circuit.CircuitElm.sim.stampResistor (this.nodes[0], this.nodes[1], this.resistance);
});
Clazz.overrideMethod (c$, "getInfo", 
function (arr) {
arr[0] = "memristor";
this.getBasicInfo (arr);
arr[3] = "R = " + test.Circuit.CircuitElm.getUnitText (this.resistance, test.Circuit.CirSim.ohmString);
arr[4] = "P = " + test.Circuit.CircuitElm.getUnitText (this.getPower (), "W");
}, "~A");
Clazz.overrideMethod (c$, "getScopeValue", 
function (x) {
return (x == 2) ? this.resistance : (x == 1) ? this.getPower () : this.getVoltageDiff ();
}, "~N");
Clazz.overrideMethod (c$, "getScopeUnits", 
function (x) {
return (x == 2) ? test.Circuit.CirSim.ohmString : (x == 1) ? "W" : "V";
}, "~N");
Clazz.overrideMethod (c$, "getEditInfo", 
function (n) {
if (n == 0) return  new test.Circuit.EditInfo ("Max Resistance (ohms)", this.r_on, 0, 0);
if (n == 1) return  new test.Circuit.EditInfo ("Min Resistance (ohms)", this.r_off, 0, 0);
if (n == 2) return  new test.Circuit.EditInfo ("Width of Doped Region (nm)", this.dopeWidth * 1e9, 0, 0);
if (n == 3) return  new test.Circuit.EditInfo ("Total Width (nm)", this.totalWidth * 1e9, 0, 0);
if (n == 4) return  new test.Circuit.EditInfo ("Mobility (um^2/(s*V))", this.mobility * 1e12, 0, 0);
return null;
}, "~N");
Clazz.overrideMethod (c$, "setEditValue", 
function (n, ei) {
if (n == 0) this.r_on = ei.value;
if (n == 1) this.r_off = ei.value;
if (n == 2) this.dopeWidth = ei.value * 1e-9;
if (n == 3) this.totalWidth = ei.value * 1e-9;
if (n == 4) this.mobility = ei.value * 1e-12;
}, "~N,test.Circuit.EditInfo");
});

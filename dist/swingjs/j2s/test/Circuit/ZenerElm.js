Clazz.declarePackage ("test.Circuit");
Clazz.load (["test.Circuit.DiodeElm"], "test.Circuit.ZenerElm", ["java.lang.Double", "test.Circuit.EditInfo"], function () {
c$ = Clazz.decorateAsClass (function () {
this.$hs = 8;
this.$poly = null;
this.$cathode = null;
this.wing = null;
this.default_zvoltage = 5.6;
Clazz.instantialize (this, arguments);
}, test.Circuit, "ZenerElm", test.Circuit.DiodeElm);
Clazz.makeConstructor (c$, 
function (xx, yy) {
Clazz.superConstructor (this, test.Circuit.ZenerElm, [xx, yy]);
this.zvoltage = 5.6;
this.setup ();
}, "~N,~N");
Clazz.makeConstructor (c$, 
function (xa, ya, xb, yb, f, st) {
Clazz.superConstructor (this, test.Circuit.ZenerElm, [xa, ya, xb, yb, f, st]);
this.zvoltage =  new Double (st.nextToken ()).doubleValue ();
this.setup ();
}, "~N,~N,~N,~N,~N,java.util.StringTokenizer");
Clazz.defineMethod (c$, "setup", 
function () {
this.diode.leakage = 5e-6;
Clazz.superCall (this, test.Circuit.ZenerElm, "setup", []);
});
Clazz.overrideMethod (c$, "getDumpType", 
function () {
return 'z';
});
Clazz.defineMethod (c$, "dump", 
function () {
return Clazz.superCall (this, test.Circuit.ZenerElm, "dump", []) + " " + this.zvoltage;
});
Clazz.defineMethod (c$, "setPoints", 
function () {
Clazz.superCall (this, test.Circuit.ZenerElm, "setPoints", []);
this.calcLeads (16);
this.$cathode = this.newPointArray (2);
this.wing = this.newPointArray (2);
var pa = this.newPointArray (2);
this.interpPoint2 (this.lead1, this.lead2, pa[0], pa[1], 0, 8);
this.interpPoint2 (this.lead1, this.lead2, this.$cathode[0], this.$cathode[1], 1, 8);
this.interpPoint (this.$cathode[0], this.$cathode[1], this.wing[0], -0.2, -8);
this.interpPoint (this.$cathode[1], this.$cathode[0], this.wing[1], -0.2, -8);
this.$poly = this.createPolygon (pa[0], pa[1], this.lead2);
});
Clazz.overrideMethod (c$, "draw", 
function (g) {
this.setBbox (this.point1, this.point2, 8);
var v1 = this.volts[0];
var v2 = this.volts[1];
this.draw2Leads (g);
this.setPowerColor (g, true);
this.setVoltageColor (g, v1);
g.fillPolygon (this.$poly);
this.setVoltageColor (g, v2);
test.Circuit.CircuitElm.drawThickLine (g, this.$cathode[0], this.$cathode[1]);
test.Circuit.CircuitElm.drawThickLine (g, this.wing[0], this.$cathode[0]);
test.Circuit.CircuitElm.drawThickLine (g, this.wing[1], this.$cathode[1]);
this.doDots (g);
this.drawPosts (g);
}, "java.awt.Graphics");
Clazz.defineMethod (c$, "getInfo", 
function (arr) {
Clazz.superCall (this, test.Circuit.ZenerElm, "getInfo", [arr]);
arr[0] = "Zener diode";
arr[5] = "Vz = " + test.Circuit.CircuitElm.getVoltageText (this.zvoltage);
}, "~A");
Clazz.overrideMethod (c$, "getEditInfo", 
function (n) {
if (n == 0) return  new test.Circuit.EditInfo ("Fwd Voltage @ 1A", this.fwdrop, 10, 1000);
if (n == 1) return  new test.Circuit.EditInfo ("Zener Voltage @ 5mA", this.zvoltage, 1, 25);
return null;
}, "~N");
Clazz.overrideMethod (c$, "setEditValue", 
function (n, ei) {
if (n == 0) this.fwdrop = ei.value;
if (n == 1) this.zvoltage = ei.value;
this.setup ();
}, "~N,test.Circuit.EditInfo");
Clazz.overrideMethod (c$, "getShortcut", 
function () {
return 0;
});
});

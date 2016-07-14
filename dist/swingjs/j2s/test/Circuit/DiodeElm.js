Clazz.declarePackage ("test.Circuit");
Clazz.load (["test.Circuit.CircuitElm"], "test.Circuit.DiodeElm", ["java.lang.Double", "test.Circuit.Diode", "$.EditInfo"], function () {
c$ = Clazz.decorateAsClass (function () {
this.diode = null;
this.defaultdrop = .805904783;
this.fwdrop = 0;
this.zvoltage = 0;
this.hs = 8;
this.poly = null;
this.cathode = null;
Clazz.instantialize (this, arguments);
}, test.Circuit, "DiodeElm", test.Circuit.CircuitElm);
Clazz.makeConstructor (c$, 
function (xx, yy) {
Clazz.superConstructor (this, test.Circuit.DiodeElm, [xx, yy]);
this.diode =  new test.Circuit.Diode (test.Circuit.CircuitElm.sim);
this.fwdrop = 0.805904783;
this.zvoltage = 0;
this.setup ();
}, "~N,~N");
Clazz.makeConstructor (c$, 
function (xa, ya, xb, yb, f, st) {
Clazz.superConstructor (this, test.Circuit.DiodeElm, [xa, ya, xb, yb, f]);
this.diode =  new test.Circuit.Diode (test.Circuit.CircuitElm.sim);
this.fwdrop = 0.805904783;
this.zvoltage = 0;
if ((f & 1) > 0) {
try {
this.fwdrop =  new Double (st.nextToken ()).doubleValue ();
} catch (e) {
if (Clazz.exceptionOf (e, Exception)) {
} else {
throw e;
}
}
}this.setup ();
}, "~N,~N,~N,~N,~N,java.util.StringTokenizer");
Clazz.overrideMethod (c$, "nonLinear", 
function () {
return true;
});
Clazz.defineMethod (c$, "setup", 
function () {
this.diode.setup (this.fwdrop, this.zvoltage);
});
Clazz.overrideMethod (c$, "getDumpType", 
function () {
return 'd';
});
Clazz.defineMethod (c$, "dump", 
function () {
this.flags |= 1;
return Clazz.superCall (this, test.Circuit.DiodeElm, "dump", []) + " " + this.fwdrop;
});
Clazz.defineMethod (c$, "setPoints", 
function () {
Clazz.superCall (this, test.Circuit.DiodeElm, "setPoints", []);
this.calcLeads (16);
this.cathode = this.newPointArray (2);
var pa = this.newPointArray (2);
this.interpPoint2 (this.lead1, this.lead2, pa[0], pa[1], 0, 8);
this.interpPoint2 (this.lead1, this.lead2, this.cathode[0], this.cathode[1], 1, 8);
this.poly = this.createPolygon (pa[0], pa[1], this.lead2);
});
Clazz.overrideMethod (c$, "draw", 
function (g) {
this.drawDiode (g);
this.doDots (g);
this.drawPosts (g);
}, "java.awt.Graphics");
Clazz.overrideMethod (c$, "reset", 
function () {
this.diode.reset ();
this.volts[0] = this.volts[1] = this.curcount = 0;
});
Clazz.defineMethod (c$, "drawDiode", 
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
}, "java.awt.Graphics");
Clazz.overrideMethod (c$, "stamp", 
function () {
this.diode.stamp (this.nodes[0], this.nodes[1]);
});
Clazz.overrideMethod (c$, "doStep", 
function () {
this.diode.doStep (this.volts[0] - this.volts[1]);
});
Clazz.overrideMethod (c$, "calculateCurrent", 
function () {
this.current = this.diode.calculateCurrent (this.volts[0] - this.volts[1]);
});
Clazz.overrideMethod (c$, "getInfo", 
function (arr) {
arr[0] = "diode";
arr[1] = "I = " + test.Circuit.CircuitElm.getCurrentText (this.getCurrent ());
arr[2] = "Vd = " + test.Circuit.CircuitElm.getVoltageText (this.getVoltageDiff ());
arr[3] = "P = " + test.Circuit.CircuitElm.getUnitText (this.getPower (), "W");
arr[4] = "Vf = " + test.Circuit.CircuitElm.getVoltageText (this.fwdrop);
}, "~A");
Clazz.overrideMethod (c$, "getEditInfo", 
function (n) {
if (n == 0) return  new test.Circuit.EditInfo ("Fwd Voltage @ 1A", this.fwdrop, 10, 1000);
return null;
}, "~N");
Clazz.overrideMethod (c$, "setEditValue", 
function (n, ei) {
this.fwdrop = ei.value;
this.setup ();
}, "~N,test.Circuit.EditInfo");
Clazz.overrideMethod (c$, "getShortcut", 
function () {
return 'd';
});
Clazz.defineStatics (c$,
"FLAG_FWDROP", 1);
});

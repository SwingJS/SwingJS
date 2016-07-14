Clazz.declarePackage ("test.Circuit");
Clazz.load (["test.Circuit.CircuitElm"], "test.Circuit.AMElm", ["java.awt.Color", "$.Font", "java.lang.Double", "test.Circuit.EditInfo"], function () {
c$ = Clazz.decorateAsClass (function () {
this.carrierfreq = 0;
this.signalfreq = 0;
this.maxVoltage = 0;
this.freqTimeZero = 0;
this.circleSize = 17;
Clazz.instantialize (this, arguments);
}, test.Circuit, "AMElm", test.Circuit.CircuitElm);
Clazz.makeConstructor (c$, 
function (xx, yy) {
Clazz.superConstructor (this, test.Circuit.AMElm, [xx, yy]);
this.maxVoltage = 5;
this.carrierfreq = 1000;
this.signalfreq = 40;
this.reset ();
}, "~N,~N");
Clazz.makeConstructor (c$, 
function (xa, ya, xb, yb, f, st) {
Clazz.superConstructor (this, test.Circuit.AMElm, [xa, ya, xb, yb, f]);
this.carrierfreq =  new Double (st.nextToken ()).doubleValue ();
this.signalfreq =  new Double (st.nextToken ()).doubleValue ();
this.maxVoltage =  new Double (st.nextToken ()).doubleValue ();
if ((this.flags & 2) != 0) {
this.flags &= -3;
}this.reset ();
}, "~N,~N,~N,~N,~N,java.util.StringTokenizer");
Clazz.overrideMethod (c$, "getDumpType", 
function () {
return 200;
});
Clazz.defineMethod (c$, "dump", 
function () {
return Clazz.superCall (this, test.Circuit.AMElm, "dump", []) + " " + this.carrierfreq + " " + this.signalfreq + " " + this.maxVoltage;
});
Clazz.overrideMethod (c$, "reset", 
function () {
this.freqTimeZero = 0;
this.curcount = 0;
});
Clazz.overrideMethod (c$, "getPostCount", 
function () {
return 1;
});
Clazz.overrideMethod (c$, "stamp", 
function () {
test.Circuit.CircuitElm.sim.stampVoltageSource (0, this.nodes[0], this.voltSource);
});
Clazz.overrideMethod (c$, "doStep", 
function () {
test.Circuit.CircuitElm.sim.updateVoltageSource (0, this.nodes[0], this.voltSource, this.getVoltage ());
});
Clazz.defineMethod (c$, "getVoltage", 
function () {
var w = 2 * 3.141592653589793 * (test.Circuit.CircuitElm.sim.t - this.freqTimeZero);
return ((Math.sin (w * this.signalfreq) + 1) / 2) * Math.sin (w * this.carrierfreq) * this.maxVoltage;
});
Clazz.overrideMethod (c$, "draw", 
function (g) {
this.setBbox (this.point1, this.point2, 17);
this.setVoltageColor (g, this.volts[0]);
test.Circuit.CircuitElm.drawThickLine (g, this.point1, this.lead1);
var f =  new java.awt.Font ("SansSerif", 0, 12);
g.setFont (f);
g.setColor (this.needsHighlight () ? test.Circuit.CircuitElm.selectColor : test.Circuit.CircuitElm.whiteColor);
this.setPowerColor (g, false);
var v = this.getVoltage ();
var s = "AM";
this.drawCenteredText (g, s, this.x2, this.y2, true);
this.drawWaveform (g, this.point2);
this.drawPosts (g);
this.curcount = this.updateDotCount (-this.current, this.curcount);
if (test.Circuit.CircuitElm.sim.dragElm !== this) this.drawDots (g, this.point1, this.lead1, this.curcount);
}, "java.awt.Graphics");
Clazz.defineMethod (c$, "drawWaveform", 
function (g, center) {
g.setColor (this.needsHighlight () ? test.Circuit.CircuitElm.selectColor : java.awt.Color.gray);
this.setPowerColor (g, false);
var xc = center.x;
var yc = center.y;
test.Circuit.CircuitElm.drawThickCircle (g, xc, yc, 17);
var wl = 8;
this.adjustBbox (xc - 17, yc - 17, xc + 17, yc + 17);
}, "java.awt.Graphics,java.awt.Point");
Clazz.defineMethod (c$, "setPoints", 
function () {
Clazz.superCall (this, test.Circuit.AMElm, "setPoints", []);
this.lead1 = this.interpPoint (this.point1, this.point2, 1 - 17 / this.dn);
});
Clazz.overrideMethod (c$, "getVoltageDiff", 
function () {
return this.volts[0];
});
Clazz.overrideMethod (c$, "hasGroundConnection", 
function (n1) {
return true;
}, "~N");
Clazz.overrideMethod (c$, "getVoltageSourceCount", 
function () {
return 1;
});
Clazz.overrideMethod (c$, "getPower", 
function () {
return -this.getVoltageDiff () * this.current;
});
Clazz.overrideMethod (c$, "getInfo", 
function (arr) {
arr[0] = "AM Source";
arr[1] = "I = " + test.Circuit.CircuitElm.getCurrentText (this.getCurrent ());
arr[2] = "V = " + test.Circuit.CircuitElm.getVoltageText (this.getVoltageDiff ());
arr[3] = "cf = " + test.Circuit.CircuitElm.getUnitText (this.carrierfreq, "Hz");
arr[4] = "sf = " + test.Circuit.CircuitElm.getUnitText (this.signalfreq, "Hz");
arr[5] = "Vmax = " + test.Circuit.CircuitElm.getVoltageText (this.maxVoltage);
}, "~A");
Clazz.overrideMethod (c$, "getEditInfo", 
function (n) {
if (n == 0) return  new test.Circuit.EditInfo ("Max Voltage", this.maxVoltage, -20, 20);
if (n == 1) return  new test.Circuit.EditInfo ("Carrier Frequency (Hz)", this.carrierfreq, 4, 500);
if (n == 2) return  new test.Circuit.EditInfo ("Signal Frequency (Hz)", this.signalfreq, 4, 500);
return null;
}, "~N");
Clazz.overrideMethod (c$, "setEditValue", 
function (n, ei) {
if (n == 0) this.maxVoltage = ei.value;
if (n == 1) this.carrierfreq = ei.value;
if (n == 2) this.signalfreq = ei.value;
}, "~N,test.Circuit.EditInfo");
Clazz.defineStatics (c$,
"FLAG_COS", 2);
});

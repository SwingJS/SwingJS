Clazz.declarePackage ("test.Circuit");
Clazz.load (["test.Circuit.VoltageElm"], "test.Circuit.RailElm", ["java.awt.Font", "test.Circuit.CircuitElm"], function () {
c$ = Clazz.decorateAsClass (function () {
this.FLAG_CLOCK = 1;
Clazz.instantialize (this, arguments);
}, test.Circuit, "RailElm", test.Circuit.VoltageElm);
Clazz.makeConstructor (c$, 
function (xx, yy) {
Clazz.superConstructor (this, test.Circuit.RailElm, [xx, yy, 0]);
}, "~N,~N");
Clazz.overrideMethod (c$, "getDumpType", 
function () {
return 'R';
});
Clazz.overrideMethod (c$, "getPostCount", 
function () {
return 1;
});
Clazz.defineMethod (c$, "setPoints", 
function () {
Clazz.superCall (this, test.Circuit.RailElm, "setPoints", []);
this.lead1 = this.interpPoint (this.point1, this.point2, 1 - 17 / this.dn);
});
Clazz.overrideMethod (c$, "draw", 
function (g) {
this.setBbox (this.point1, this.point2, 17);
this.setVoltageColor (g, this.volts[0]);
test.Circuit.CircuitElm.drawThickLine (g, this.point1, this.lead1);
var clock = this.waveform == 2 && (this.flags & 1) != 0;
if (this.waveform == 0 || this.waveform == 6 || clock) {
var f =  new java.awt.Font ("SansSerif", 0, 12);
g.setFont (f);
g.setColor (this.needsHighlight () ? test.Circuit.CircuitElm.selectColor : test.Circuit.CircuitElm.whiteColor);
this.setPowerColor (g, false);
var v = this.getVoltage ();
var s = test.Circuit.CircuitElm.getShortUnitText (v, "V");
if (Math.abs (v) < 1) s = test.Circuit.CircuitElm.showFormat.format (v) + "V";
if (this.getVoltage () > 0) s = "+" + s;
if (Clazz.instanceOf (this, test.Circuit.AntennaElm)) s = "Ant";
if (clock) s = "CLK";
this.drawCenteredText (g, s, this.x2, this.y2, true);
} else {
this.drawWaveform (g, this.point2);
}this.drawPosts (g);
this.curcount = this.updateDotCount (-this.current, this.curcount);
if (test.Circuit.CircuitElm.sim.dragElm !== this) this.drawDots (g, this.point1, this.lead1, this.curcount);
}, "java.awt.Graphics");
Clazz.overrideMethod (c$, "getVoltageDiff", 
function () {
return this.volts[0];
});
Clazz.overrideMethod (c$, "stamp", 
function () {
if (this.waveform == 0) test.Circuit.CircuitElm.sim.stampVoltageSource (0, this.nodes[0], this.voltSource, this.getVoltage ());
 else test.Circuit.CircuitElm.sim.stampVoltageSource (0, this.nodes[0], this.voltSource);
});
Clazz.overrideMethod (c$, "doStep", 
function () {
if (this.waveform != 0) test.Circuit.CircuitElm.sim.updateVoltageSource (0, this.nodes[0], this.voltSource, this.getVoltage ());
});
Clazz.overrideMethod (c$, "hasGroundConnection", 
function (n1) {
return true;
}, "~N");
Clazz.overrideMethod (c$, "getShortcut", 
function () {
return 'V';
});
});

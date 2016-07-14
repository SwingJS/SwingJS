Clazz.declarePackage ("test.Circuit");
Clazz.load (["test.Circuit.CircuitElm"], "test.Circuit.SweepElm", ["java.awt.Checkbox", "$.Color", "java.lang.Double", "test.Circuit.EditInfo"], function () {
c$ = Clazz.decorateAsClass (function () {
this.maxV = 0;
this.maxF = 0;
this.minF = 0;
this.sweepTime = 0;
this.frequency = 0;
this.FLAG_LOG = 1;
this.FLAG_BIDIR = 2;
this.circleSize = 17;
this.fadd = 0;
this.fmul = 0;
this.freqTime = 0;
this.savedTimeStep = 0;
this.dir = 1;
this.v = 0;
Clazz.instantialize (this, arguments);
}, test.Circuit, "SweepElm", test.Circuit.CircuitElm);
Clazz.makeConstructor (c$, 
function (xx, yy) {
Clazz.superConstructor (this, test.Circuit.SweepElm, [xx, yy]);
this.minF = 20;
this.maxF = 4000;
this.maxV = 5;
this.sweepTime = .1;
this.flags = 2;
this.reset ();
}, "~N,~N");
Clazz.makeConstructor (c$, 
function (xa, ya, xb, yb, f, st) {
Clazz.superConstructor (this, test.Circuit.SweepElm, [xa, ya, xb, yb, f]);
this.minF =  new Double (st.nextToken ()).doubleValue ();
this.maxF =  new Double (st.nextToken ()).doubleValue ();
this.maxV =  new Double (st.nextToken ()).doubleValue ();
this.sweepTime =  new Double (st.nextToken ()).doubleValue ();
this.reset ();
}, "~N,~N,~N,~N,~N,java.util.StringTokenizer");
Clazz.overrideMethod (c$, "getDumpType", 
function () {
return 170;
});
Clazz.overrideMethod (c$, "getPostCount", 
function () {
return 1;
});
Clazz.defineMethod (c$, "dump", 
function () {
return Clazz.superCall (this, test.Circuit.SweepElm, "dump", []) + " " + this.minF + " " + this.maxF + " " + this.maxV + " " + this.sweepTime;
});
Clazz.defineMethod (c$, "setPoints", 
function () {
Clazz.superCall (this, test.Circuit.SweepElm, "setPoints", []);
this.lead1 = this.interpPoint (this.point1, this.point2, 1 - 17 / this.dn);
});
Clazz.overrideMethod (c$, "draw", 
function (g) {
this.setBbox (this.point1, this.point2, 17);
this.setVoltageColor (g, this.volts[0]);
test.Circuit.CircuitElm.drawThickLine (g, this.point1, this.lead1);
g.setColor (this.needsHighlight () ? test.Circuit.CircuitElm.selectColor : java.awt.Color.gray);
this.setPowerColor (g, false);
var xc = this.point2.x;
var yc = this.point2.y;
test.Circuit.CircuitElm.drawThickCircle (g, xc, yc, 17);
var wl = 8;
this.adjustBbox (xc - 17, yc - 17, xc + 17, yc + 17);
var i;
var xl = 10;
var ox = -1;
var oy = -1;
var tm = System.currentTimeMillis ();
tm %= 2000;
if (tm > 1000) tm = 2000 - tm;
var w = 1 + tm * .002;
if (!test.Circuit.CircuitElm.sim.stoppedCheck.getState ()) w = 1 + 2 * (this.frequency - this.minF) / (this.maxF - this.minF);
for (i = -xl; i <= xl; i++) {
var yy = yc + Clazz.doubleToInt (.95 * Math.sin (i * 3.141592653589793 * w / xl) * wl);
if (ox != -1) test.Circuit.CircuitElm.drawThickLine (g, ox, oy, xc + i, yy);
ox = xc + i;
oy = yy;
}
if (test.Circuit.CircuitElm.sim.showValuesCheckItem.getState ()) {
var s = test.Circuit.CircuitElm.getShortUnitText (this.frequency, "Hz");
if (this.dx == 0 || this.dy == 0) this.drawValues (g, s, 17);
}this.drawPosts (g);
this.curcount = this.updateDotCount (-this.current, this.curcount);
if (test.Circuit.CircuitElm.sim.dragElm !== this) this.drawDots (g, this.point1, this.lead1, this.curcount);
}, "java.awt.Graphics");
Clazz.overrideMethod (c$, "stamp", 
function () {
test.Circuit.CircuitElm.sim.stampVoltageSource (0, this.nodes[0], this.voltSource);
});
Clazz.defineMethod (c$, "setParams", 
function () {
if (this.frequency < this.minF || this.frequency > this.maxF) {
this.frequency = this.minF;
this.freqTime = 0;
this.dir = 1;
}if ((this.flags & 1) == 0) {
this.fadd = this.dir * test.Circuit.CircuitElm.sim.timeStep * (this.maxF - this.minF) / this.sweepTime;
this.fmul = 1;
} else {
this.fadd = 0;
this.fmul = Math.pow (this.maxF / this.minF, this.dir * test.Circuit.CircuitElm.sim.timeStep / this.sweepTime);
}this.savedTimeStep = test.Circuit.CircuitElm.sim.timeStep;
});
Clazz.overrideMethod (c$, "reset", 
function () {
this.frequency = this.minF;
this.freqTime = 0;
this.dir = 1;
this.setParams ();
});
Clazz.overrideMethod (c$, "startIteration", 
function () {
if (test.Circuit.CircuitElm.sim.timeStep != this.savedTimeStep) this.setParams ();
this.v = Math.sin (this.freqTime) * this.maxV;
this.freqTime += this.frequency * 2 * 3.141592653589793 * test.Circuit.CircuitElm.sim.timeStep;
this.frequency = this.frequency * this.fmul + this.fadd;
if (this.frequency >= this.maxF && this.dir == 1) {
if ((this.flags & 2) != 0) {
this.fadd = -this.fadd;
this.fmul = 1 / this.fmul;
this.dir = -1;
} else this.frequency = this.minF;
}if (this.frequency <= this.minF && this.dir == -1) {
this.fadd = -this.fadd;
this.fmul = 1 / this.fmul;
this.dir = 1;
}});
Clazz.overrideMethod (c$, "doStep", 
function () {
test.Circuit.CircuitElm.sim.updateVoltageSource (0, this.nodes[0], this.voltSource, this.v);
});
Clazz.overrideMethod (c$, "getVoltageDiff", 
function () {
return this.volts[0];
});
Clazz.overrideMethod (c$, "getVoltageSourceCount", 
function () {
return 1;
});
Clazz.overrideMethod (c$, "hasGroundConnection", 
function (n1) {
return true;
}, "~N");
Clazz.overrideMethod (c$, "getInfo", 
function (arr) {
arr[0] = "sweep " + (((this.flags & 1) == 0) ? "(linear)" : "(log)");
arr[1] = "I = " + test.Circuit.CircuitElm.getCurrentDText (this.getCurrent ());
arr[2] = "V = " + test.Circuit.CircuitElm.getVoltageText (this.volts[0]);
arr[3] = "f = " + test.Circuit.CircuitElm.getUnitText (this.frequency, "Hz");
arr[4] = "range = " + test.Circuit.CircuitElm.getUnitText (this.minF, "Hz") + " .. " + test.Circuit.CircuitElm.getUnitText (this.maxF, "Hz");
arr[5] = "time = " + test.Circuit.CircuitElm.getUnitText (this.sweepTime, "s");
}, "~A");
Clazz.overrideMethod (c$, "getEditInfo", 
function (n) {
if (n == 0) return  new test.Circuit.EditInfo ("Min Frequency (Hz)", this.minF, 0, 0);
if (n == 1) return  new test.Circuit.EditInfo ("Max Frequency (Hz)", this.maxF, 0, 0);
if (n == 2) return  new test.Circuit.EditInfo ("Sweep Time (s)", this.sweepTime, 0, 0);
if (n == 3) {
var ei =  new test.Circuit.EditInfo ("", 0, -1, -1);
ei.checkbox =  new java.awt.Checkbox ("Logarithmic", (this.flags & 1) != 0);
return ei;
}if (n == 4) return  new test.Circuit.EditInfo ("Max Voltage", this.maxV, 0, 0);
if (n == 5) {
var ei =  new test.Circuit.EditInfo ("", 0, -1, -1);
ei.checkbox =  new java.awt.Checkbox ("Bidirectional", (this.flags & 2) != 0);
return ei;
}return null;
}, "~N");
Clazz.overrideMethod (c$, "setEditValue", 
function (n, ei) {
var maxfreq = 1 / (8 * test.Circuit.CircuitElm.sim.timeStep);
if (n == 0) {
this.minF = ei.value;
if (this.minF > maxfreq) this.minF = maxfreq;
}if (n == 1) {
this.maxF = ei.value;
if (this.maxF > maxfreq) this.maxF = maxfreq;
}if (n == 2) this.sweepTime = ei.value;
if (n == 3) {
this.flags &= -2;
if (ei.checkbox.getState ()) this.flags |= 1;
}if (n == 4) this.maxV = ei.value;
if (n == 5) {
this.flags &= -3;
if (ei.checkbox.getState ()) this.flags |= 2;
}this.setParams ();
}, "~N,test.Circuit.EditInfo");
});

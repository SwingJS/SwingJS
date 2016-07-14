Clazz.declarePackage ("test.Circuit");
Clazz.load (["test.Circuit.RailElm"], "test.Circuit.AntennaElm", ["test.Circuit.CircuitElm"], function () {
c$ = Clazz.decorateAsClass (function () {
this.fmphase = 0;
Clazz.instantialize (this, arguments);
}, test.Circuit, "AntennaElm", test.Circuit.RailElm);
Clazz.makeConstructor (c$, 
function (xx, yy) {
Clazz.superConstructor (this, test.Circuit.AntennaElm, [xx, yy, 0]);
}, "~N,~N");
Clazz.makeConstructor (c$, 
function (xa, ya, xb, yb, f, st) {
Clazz.superConstructor (this, test.Circuit.AntennaElm, [xa, ya, xb, yb, f, st]);
this.waveform = 0;
}, "~N,~N,~N,~N,~N,java.util.StringTokenizer");
Clazz.overrideMethod (c$, "stamp", 
function () {
test.Circuit.CircuitElm.sim.stampVoltageSource (0, this.nodes[0], this.voltSource);
});
Clazz.overrideMethod (c$, "doStep", 
function () {
test.Circuit.CircuitElm.sim.updateVoltageSource (0, this.nodes[0], this.voltSource, this.getVoltage ());
});
Clazz.overrideMethod (c$, "getVoltage", 
function () {
this.fmphase += 2 * 3.141592653589793 * (2200 + Math.sin (2 * 3.141592653589793 * test.Circuit.CircuitElm.sim.t * 13) * 100) * test.Circuit.CircuitElm.sim.timeStep;
var fm = 3 * Math.sin (this.fmphase);
return Math.sin (2 * 3.141592653589793 * test.Circuit.CircuitElm.sim.t * 3000) * (1.3 + Math.sin (2 * 3.141592653589793 * test.Circuit.CircuitElm.sim.t * 12)) * 3 + Math.sin (2 * 3.141592653589793 * test.Circuit.CircuitElm.sim.t * 2710) * (1.3 + Math.sin (2 * 3.141592653589793 * test.Circuit.CircuitElm.sim.t * 13)) * 3 + Math.sin (2 * 3.141592653589793 * test.Circuit.CircuitElm.sim.t * 2433) * (1.3 + Math.sin (2 * 3.141592653589793 * test.Circuit.CircuitElm.sim.t * 14)) * 3 + fm;
});
Clazz.overrideMethod (c$, "getDumpType", 
function () {
return 'A';
});
Clazz.overrideMethod (c$, "getShortcut", 
function () {
return 0;
});
});

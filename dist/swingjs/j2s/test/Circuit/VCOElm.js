Clazz.declarePackage ("test.Circuit");
Clazz.load (["test.Circuit.ChipElm"], "test.Circuit.VCOElm", ["test.Circuit.CircuitElm"], function () {
c$ = Clazz.decorateAsClass (function () {
this.cResistance = 1e6;
this.cCurrent = 0;
this.cDir = 0;
Clazz.instantialize (this, arguments);
}, test.Circuit, "VCOElm", test.Circuit.ChipElm);
Clazz.overrideMethod (c$, "getChipName", 
function () {
return "VCO";
});
Clazz.overrideMethod (c$, "setupPins", 
function () {
this.sizeX = 2;
this.sizeY = 4;
this.pins =  new Array (6);
this.pins[0] = Clazz.innerTypeInstance (test.Circuit.ChipElm.Pin, this, null, 0, 2, "Vi");
this.pins[1] = Clazz.innerTypeInstance (test.Circuit.ChipElm.Pin, this, null, 3, 2, "Vo");
this.pins[1].output = true;
this.pins[2] = Clazz.innerTypeInstance (test.Circuit.ChipElm.Pin, this, null, 0, 3, "C");
this.pins[3] = Clazz.innerTypeInstance (test.Circuit.ChipElm.Pin, this, null, 1, 3, "C");
this.pins[4] = Clazz.innerTypeInstance (test.Circuit.ChipElm.Pin, this, null, 2, 3, "R1");
this.pins[4].output = true;
this.pins[5] = Clazz.innerTypeInstance (test.Circuit.ChipElm.Pin, this, null, 3, 3, "R2");
this.pins[5].output = true;
});
Clazz.overrideMethod (c$, "nonLinear", 
function () {
return true;
});
Clazz.overrideMethod (c$, "stamp", 
function () {
test.Circuit.CircuitElm.sim.stampVoltageSource (0, this.nodes[1], this.pins[1].voltSource);
test.Circuit.CircuitElm.sim.stampVoltageSource (this.nodes[0], this.nodes[4], this.pins[4].voltSource, 0);
test.Circuit.CircuitElm.sim.stampVoltageSource (0, this.nodes[5], this.pins[5].voltSource, 5);
test.Circuit.CircuitElm.sim.stampResistor (this.nodes[2], this.nodes[3], 1000000.0);
test.Circuit.CircuitElm.sim.stampNonLinear (this.nodes[2]);
test.Circuit.CircuitElm.sim.stampNonLinear (this.nodes[3]);
});
Clazz.overrideMethod (c$, "doStep", 
function () {
var vc = this.volts[3] - this.volts[2];
var vo = this.volts[1];
var dir = (vo < 2.5) ? 1 : -1;
if (vo < 2.5 && vc > 4.5) {
vo = 5;
dir = -1;
}if (vo > 2.5 && vc < .5) {
vo = 0;
dir = 1;
}test.Circuit.CircuitElm.sim.updateVoltageSource (0, this.nodes[1], this.pins[1].voltSource, vo);
var cur1 = test.Circuit.CircuitElm.sim.nodeList.size () + this.pins[4].voltSource;
var cur2 = test.Circuit.CircuitElm.sim.nodeList.size () + this.pins[5].voltSource;
test.Circuit.CircuitElm.sim.stampMatrix (this.nodes[2], cur1, dir);
test.Circuit.CircuitElm.sim.stampMatrix (this.nodes[2], cur2, dir);
test.Circuit.CircuitElm.sim.stampMatrix (this.nodes[3], cur1, -dir);
test.Circuit.CircuitElm.sim.stampMatrix (this.nodes[3], cur2, -dir);
this.cDir = dir;
});
Clazz.defineMethod (c$, "computeCurrent", 
function () {
if (false) return;
var c = this.cDir * (this.pins[4].current + this.pins[5].current) + (this.volts[3] - this.volts[2]) / 1000000.0;
this.pins[2].current = -c;
this.pins[3].current = c;
this.pins[0].current = -this.pins[4].current;
});
Clazz.overrideMethod (c$, "draw", 
function (g) {
this.computeCurrent ();
this.drawChip (g);
}, "java.awt.Graphics");
Clazz.overrideMethod (c$, "getPostCount", 
function () {
return 6;
});
Clazz.overrideMethod (c$, "getVoltageSourceCount", 
function () {
return 3;
});
Clazz.overrideMethod (c$, "getDumpType", 
function () {
return 158;
});
});

Clazz.declarePackage ("test.Circuit");
Clazz.load (["test.Circuit.ChipElm"], "test.Circuit.PhaseCompElm", ["test.Circuit.CircuitElm"], function () {
c$ = Clazz.decorateAsClass (function () {
this.ff1 = false;
this.ff2 = false;
Clazz.instantialize (this, arguments);
}, test.Circuit, "PhaseCompElm", test.Circuit.ChipElm);
Clazz.overrideMethod (c$, "getChipName", 
function () {
return "phase comparator";
});
Clazz.overrideMethod (c$, "setupPins", 
function () {
this.sizeX = 2;
this.sizeY = 2;
this.pins =  new Array (3);
this.pins[0] = Clazz.innerTypeInstance (test.Circuit.ChipElm.Pin, this, null, 0, 2, "I1");
this.pins[1] = Clazz.innerTypeInstance (test.Circuit.ChipElm.Pin, this, null, 1, 2, "I2");
this.pins[2] = Clazz.innerTypeInstance (test.Circuit.ChipElm.Pin, this, null, 0, 3, "O");
this.pins[2].output = true;
});
Clazz.overrideMethod (c$, "nonLinear", 
function () {
return true;
});
Clazz.overrideMethod (c$, "stamp", 
function () {
var vn = test.Circuit.CircuitElm.sim.nodeList.size () + this.pins[2].voltSource;
test.Circuit.CircuitElm.sim.stampNonLinear (vn);
test.Circuit.CircuitElm.sim.stampNonLinear (0);
test.Circuit.CircuitElm.sim.stampNonLinear (this.nodes[2]);
});
Clazz.overrideMethod (c$, "doStep", 
function () {
var v1 = this.volts[0] > 2.5;
var v2 = this.volts[1] > 2.5;
if (v1 && !this.pins[0].value) this.ff1 = true;
if (v2 && !this.pins[1].value) this.ff2 = true;
if (this.ff1 && this.ff2) this.ff1 = this.ff2 = false;
var out = (this.ff1) ? 5 : (this.ff2) ? 0 : -1;
if (out != -1) test.Circuit.CircuitElm.sim.stampVoltageSource (0, this.nodes[2], this.pins[2].voltSource, out);
 else {
var vn = test.Circuit.CircuitElm.sim.nodeList.size () + this.pins[2].voltSource;
test.Circuit.CircuitElm.sim.stampMatrix (vn, vn, 1);
}this.pins[0].value = v1;
this.pins[1].value = v2;
});
Clazz.overrideMethod (c$, "getPostCount", 
function () {
return 3;
});
Clazz.overrideMethod (c$, "getVoltageSourceCount", 
function () {
return 1;
});
Clazz.overrideMethod (c$, "getDumpType", 
function () {
return 161;
});
});

Clazz.declarePackage ("test.Circuit");
Clazz.load (["test.Circuit.ChipElm"], "test.Circuit.DACElm", ["test.Circuit.CircuitElm"], function () {
c$ = Clazz.declareType (test.Circuit, "DACElm", test.Circuit.ChipElm);
Clazz.overrideMethod (c$, "getChipName", 
function () {
return "DAC";
});
Clazz.overrideMethod (c$, "needsBits", 
function () {
return true;
});
Clazz.overrideMethod (c$, "setupPins", 
function () {
this.sizeX = 2;
this.sizeY = this.bits > 2 ? this.bits : 2;
this.pins =  new Array (this.getPostCount ());
var i;
for (i = 0; i != this.bits; i++) this.pins[i] = Clazz.innerTypeInstance (test.Circuit.ChipElm.Pin, this, null, this.bits - 1 - i, 2, "D" + i);

this.pins[this.bits] = Clazz.innerTypeInstance (test.Circuit.ChipElm.Pin, this, null, 0, 3, "O");
this.pins[this.bits].output = true;
this.pins[this.bits + 1] = Clazz.innerTypeInstance (test.Circuit.ChipElm.Pin, this, null, this.sizeY - 1, 3, "V+");
this.allocNodes ();
});
Clazz.overrideMethod (c$, "doStep", 
function () {
var ival = 0;
var i;
for (i = 0; i != this.bits; i++) if (this.volts[i] > 2.5) ival |= 1 << i;

var ivalmax = (1 << this.bits) - 1;
var v = ival * this.volts[this.bits + 1] / ivalmax;
test.Circuit.CircuitElm.sim.updateVoltageSource (0, this.nodes[this.bits], this.pins[this.bits].voltSource, v);
});
Clazz.overrideMethod (c$, "getVoltageSourceCount", 
function () {
return 1;
});
Clazz.overrideMethod (c$, "getPostCount", 
function () {
return this.bits + 2;
});
Clazz.overrideMethod (c$, "getDumpType", 
function () {
return 166;
});
});

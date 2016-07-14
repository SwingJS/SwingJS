Clazz.declarePackage ("test.Circuit");
Clazz.load (["test.Circuit.ChipElm"], "test.Circuit.TimerElm", ["test.Circuit.CircuitElm"], function () {
c$ = Clazz.decorateAsClass (function () {
this.FLAG_RESET = 2;
this.N_DIS = 0;
this.N_TRIG = 1;
this.N_THRES = 2;
this.N_VIN = 3;
this.N_CTL = 4;
this.N_OUT = 5;
this.N_RST = 6;
this.setOut = false;
this.out = false;
Clazz.instantialize (this, arguments);
}, test.Circuit, "TimerElm", test.Circuit.ChipElm);
Clazz.overrideMethod (c$, "getDefaultFlags", 
function () {
return 2;
});
Clazz.overrideMethod (c$, "getChipName", 
function () {
return "555 Timer";
});
Clazz.overrideMethod (c$, "setupPins", 
function () {
this.sizeX = 3;
this.sizeY = 5;
this.pins =  new Array (7);
this.pins[0] = Clazz.innerTypeInstance (test.Circuit.ChipElm.Pin, this, null, 1, 2, "dis");
this.pins[1] = Clazz.innerTypeInstance (test.Circuit.ChipElm.Pin, this, null, 3, 2, "tr");
this.pins[1].lineOver = true;
this.pins[2] = Clazz.innerTypeInstance (test.Circuit.ChipElm.Pin, this, null, 4, 2, "th");
this.pins[3] = Clazz.innerTypeInstance (test.Circuit.ChipElm.Pin, this, null, 1, 0, "Vin");
this.pins[4] = Clazz.innerTypeInstance (test.Circuit.ChipElm.Pin, this, null, 1, 1, "ctl");
this.pins[5] = Clazz.innerTypeInstance (test.Circuit.ChipElm.Pin, this, null, 2, 3, "out");
this.pins[5].output = this.pins[5].state = true;
this.pins[6] = Clazz.innerTypeInstance (test.Circuit.ChipElm.Pin, this, null, 1, 3, "rst");
});
Clazz.overrideMethod (c$, "nonLinear", 
function () {
return true;
});
Clazz.defineMethod (c$, "hasReset", 
function () {
return (this.flags & 2) != 0;
});
Clazz.overrideMethod (c$, "stamp", 
function () {
test.Circuit.CircuitElm.sim.stampResistor (this.nodes[3], this.nodes[4], 5000);
test.Circuit.CircuitElm.sim.stampResistor (this.nodes[4], 0, 10000);
test.Circuit.CircuitElm.sim.stampVoltageSource (0, this.nodes[5], this.pins[5].voltSource);
test.Circuit.CircuitElm.sim.stampNonLinear (this.nodes[0]);
});
Clazz.overrideMethod (c$, "calculateCurrent", 
function () {
this.pins[3].current = (this.volts[4] - this.volts[3]) / 5000;
this.pins[4].current = -this.volts[4] / 10000 - this.pins[3].current;
this.pins[0].current = (!this.out && !this.setOut) ? -this.volts[0] / 10 : 0;
});
Clazz.overrideMethod (c$, "startIteration", 
function () {
this.out = this.volts[5] > this.volts[3] / 2;
this.setOut = false;
if (this.volts[4] / 2 > this.volts[1]) this.setOut = this.out = true;
if (this.volts[2] > this.volts[4] || (this.hasReset () && this.volts[6] < .7)) this.out = false;
});
Clazz.overrideMethod (c$, "doStep", 
function () {
if (!this.out && !this.setOut) test.Circuit.CircuitElm.sim.stampResistor (this.nodes[0], 0, 10);
test.Circuit.CircuitElm.sim.updateVoltageSource (0, this.nodes[5], this.pins[5].voltSource, this.out ? this.volts[3] : 0);
});
Clazz.overrideMethod (c$, "getPostCount", 
function () {
return this.hasReset () ? 7 : 6;
});
Clazz.overrideMethod (c$, "getVoltageSourceCount", 
function () {
return 1;
});
Clazz.overrideMethod (c$, "getDumpType", 
function () {
return 165;
});
});

Clazz.declarePackage ("test.Circuit");
Clazz.load (["test.Circuit.ChipElm"], ["test.Circuit.CC2Elm", "$.CC2NegElm"], ["java.lang.Double", "test.Circuit.CircuitElm"], function () {
c$ = Clazz.decorateAsClass (function () {
this.gain = 0;
Clazz.instantialize (this, arguments);
}, test.Circuit, "CC2Elm", test.Circuit.ChipElm);
Clazz.makeConstructor (c$, 
function (xx, yy) {
Clazz.superConstructor (this, test.Circuit.CC2Elm, [xx, yy]);
this.gain = 1;
}, "~N,~N");
Clazz.makeConstructor (c$, 
function (xx, yy, g) {
Clazz.superConstructor (this, test.Circuit.CC2Elm, [xx, yy]);
this.gain = g;
}, "~N,~N,~N");
Clazz.makeConstructor (c$, 
function (xa, ya, xb, yb, f, st) {
Clazz.superConstructor (this, test.Circuit.CC2Elm, [xa, ya, xb, yb, f, st]);
this.gain =  new Double (st.nextToken ()).doubleValue ();
}, "~N,~N,~N,~N,~N,java.util.StringTokenizer");
Clazz.defineMethod (c$, "dump", 
function () {
return Clazz.superCall (this, test.Circuit.CC2Elm, "dump", []) + " " + this.gain;
});
Clazz.overrideMethod (c$, "getChipName", 
function () {
return "CC2";
});
Clazz.overrideMethod (c$, "setupPins", 
function () {
this.sizeX = 2;
this.sizeY = 3;
this.pins =  new Array (3);
this.pins[0] = Clazz.innerTypeInstance (test.Circuit.ChipElm.Pin, this, null, 0, 2, "X");
this.pins[0].output = true;
this.pins[1] = Clazz.innerTypeInstance (test.Circuit.ChipElm.Pin, this, null, 2, 2, "Y");
this.pins[2] = Clazz.innerTypeInstance (test.Circuit.ChipElm.Pin, this, null, 1, 3, "Z");
});
Clazz.overrideMethod (c$, "getInfo", 
function (arr) {
arr[0] = (this.gain == 1) ? "CCII+" : "CCII-";
arr[1] = "X,Y = " + test.Circuit.CircuitElm.getVoltageText (this.volts[0]);
arr[2] = "Z = " + test.Circuit.CircuitElm.getVoltageText (this.volts[2]);
arr[3] = "I = " + test.Circuit.CircuitElm.getCurrentText (this.pins[0].current);
}, "~A");
Clazz.overrideMethod (c$, "stamp", 
function () {
test.Circuit.CircuitElm.sim.stampVoltageSource (0, this.nodes[0], this.pins[0].voltSource);
test.Circuit.CircuitElm.sim.stampVCVS (0, this.nodes[1], 1, this.pins[0].voltSource);
test.Circuit.CircuitElm.sim.stampCCCS (0, this.nodes[2], this.pins[0].voltSource, this.gain);
});
Clazz.overrideMethod (c$, "draw", 
function (g) {
this.pins[2].current = this.pins[0].current * this.gain;
this.drawChip (g);
}, "java.awt.Graphics");
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
return 179;
});
c$ = Clazz.declareType (test.Circuit, "CC2NegElm", test.Circuit.CC2Elm);
Clazz.makeConstructor (c$, 
function (xx, yy) {
Clazz.superConstructor (this, test.Circuit.CC2NegElm, [xx, yy, -1]);
}, "~N,~N");
Clazz.overrideMethod (c$, "getDumpClass", 
function () {
return test.Circuit.CC2Elm;
});
});

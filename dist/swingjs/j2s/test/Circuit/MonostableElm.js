Clazz.declarePackage ("test.Circuit");
Clazz.load (["test.Circuit.ChipElm"], "test.Circuit.MonostableElm", ["java.awt.Checkbox", "java.lang.Boolean", "$.Double", "test.Circuit.CircuitElm", "$.EditInfo"], function () {
c$ = Clazz.decorateAsClass (function () {
this.prevInputValue = false;
this.retriggerable = false;
this.triggered = false;
this.lastRisingEdge = 0;
this.delay = 0.01;
Clazz.instantialize (this, arguments);
}, test.Circuit, "MonostableElm", test.Circuit.ChipElm);
Clazz.makeConstructor (c$, 
function (xa, ya, xb, yb, f, st) {
Clazz.superConstructor (this, test.Circuit.MonostableElm, [xa, ya, xb, yb, f, st]);
this.retriggerable =  new Boolean (st.nextToken ()).booleanValue ();
this.delay =  new Double (st.nextToken ()).doubleValue ();
}, "~N,~N,~N,~N,~N,java.util.StringTokenizer");
Clazz.overrideMethod (c$, "getChipName", 
function () {
return "Monostable";
});
Clazz.overrideMethod (c$, "setupPins", 
function () {
this.sizeX = 2;
this.sizeY = 2;
this.pins =  new Array (this.getPostCount ());
this.pins[0] = Clazz.innerTypeInstance (test.Circuit.ChipElm.Pin, this, null, 0, 2, "");
this.pins[0].clock = true;
this.pins[1] = Clazz.innerTypeInstance (test.Circuit.ChipElm.Pin, this, null, 0, 3, "Q");
this.pins[1].output = true;
this.pins[2] = Clazz.innerTypeInstance (test.Circuit.ChipElm.Pin, this, null, 1, 3, "Q");
this.pins[2].output = true;
this.pins[2].lineOver = true;
});
Clazz.overrideMethod (c$, "getPostCount", 
function () {
return 3;
});
Clazz.overrideMethod (c$, "getVoltageSourceCount", 
function () {
return 2;
});
Clazz.overrideMethod (c$, "execute", 
function () {
if (this.pins[0].value && this.prevInputValue != this.pins[0].value && (this.retriggerable || !this.triggered)) {
this.lastRisingEdge = test.Circuit.CircuitElm.sim.t;
this.pins[1].value = true;
this.pins[2].value = false;
this.triggered = true;
}if (this.triggered && test.Circuit.CircuitElm.sim.t > this.lastRisingEdge + this.delay) {
this.pins[1].value = false;
this.pins[2].value = true;
this.triggered = false;
}this.prevInputValue = this.pins[0].value;
});
Clazz.defineMethod (c$, "dump", 
function () {
return Clazz.superCall (this, test.Circuit.MonostableElm, "dump", []) + " " + this.retriggerable + " " + this.delay;
});
Clazz.overrideMethod (c$, "getDumpType", 
function () {
return 194;
});
Clazz.defineMethod (c$, "getEditInfo", 
function (n) {
if (n == 2) {
var ei =  new test.Circuit.EditInfo ("", 0, -1, -1);
ei.checkbox =  new java.awt.Checkbox ("Retriggerable", this.retriggerable);
return ei;
}if (n == 3) {
var ei =  new test.Circuit.EditInfo ("Period (s)", this.delay, 0.001, 0.1);
return ei;
}return Clazz.superCall (this, test.Circuit.MonostableElm, "getEditInfo", [n]);
}, "~N");
Clazz.defineMethod (c$, "setEditValue", 
function (n, ei) {
if (n == 2) {
this.retriggerable = ei.checkbox.getState ();
}if (n == 3) {
this.delay = ei.value;
}Clazz.superCall (this, test.Circuit.MonostableElm, "setEditValue", [n, ei]);
}, "~N,test.Circuit.EditInfo");
});

Clazz.declarePackage ("test.Circuit");
Clazz.load (["test.Circuit.ChipElm"], "test.Circuit.SevenSegElm", ["java.awt.Color", "test.Circuit.CircuitElm"], function () {
c$ = Clazz.decorateAsClass (function () {
this.darkred = null;
Clazz.instantialize (this, arguments);
}, test.Circuit, "SevenSegElm", test.Circuit.ChipElm);
Clazz.overrideMethod (c$, "getChipName", 
function () {
return "7-segment driver/display";
});
Clazz.overrideMethod (c$, "setupPins", 
function () {
this.darkred =  new java.awt.Color (30, 0, 0);
this.sizeX = 4;
this.sizeY = 4;
this.pins =  new Array (7);
this.pins[0] = Clazz.innerTypeInstance (test.Circuit.ChipElm.Pin, this, null, 0, 2, "a");
this.pins[1] = Clazz.innerTypeInstance (test.Circuit.ChipElm.Pin, this, null, 1, 2, "b");
this.pins[2] = Clazz.innerTypeInstance (test.Circuit.ChipElm.Pin, this, null, 2, 2, "c");
this.pins[3] = Clazz.innerTypeInstance (test.Circuit.ChipElm.Pin, this, null, 3, 2, "d");
this.pins[4] = Clazz.innerTypeInstance (test.Circuit.ChipElm.Pin, this, null, 1, 1, "e");
this.pins[5] = Clazz.innerTypeInstance (test.Circuit.ChipElm.Pin, this, null, 2, 1, "f");
this.pins[6] = Clazz.innerTypeInstance (test.Circuit.ChipElm.Pin, this, null, 3, 1, "g");
});
Clazz.overrideMethod (c$, "draw", 
function (g) {
this.drawChip (g);
g.setColor (java.awt.Color.red);
var xl = this.x + this.cspc * 5;
var yl = this.y + this.cspc;
this.setColor (g, 0);
test.Circuit.CircuitElm.drawThickLine (g, xl, yl, xl + this.cspc, yl);
this.setColor (g, 1);
test.Circuit.CircuitElm.drawThickLine (g, xl + this.cspc, yl, xl + this.cspc, yl + this.cspc);
this.setColor (g, 2);
test.Circuit.CircuitElm.drawThickLine (g, xl + this.cspc, yl + this.cspc, xl + this.cspc, yl + this.cspc2);
this.setColor (g, 3);
test.Circuit.CircuitElm.drawThickLine (g, xl, yl + this.cspc2, xl + this.cspc, yl + this.cspc2);
this.setColor (g, 4);
test.Circuit.CircuitElm.drawThickLine (g, xl, yl + this.cspc, xl, yl + this.cspc2);
this.setColor (g, 5);
test.Circuit.CircuitElm.drawThickLine (g, xl, yl, xl, yl + this.cspc);
this.setColor (g, 6);
test.Circuit.CircuitElm.drawThickLine (g, xl, yl + this.cspc, xl + this.cspc, yl + this.cspc);
}, "java.awt.Graphics");
Clazz.defineMethod (c$, "setColor", 
function (g, p) {
g.setColor (this.pins[p].value ? java.awt.Color.red : test.Circuit.CircuitElm.sim.printableCheckItem.getState () ? java.awt.Color.white : this.darkred);
}, "java.awt.Graphics,~N");
Clazz.overrideMethod (c$, "getPostCount", 
function () {
return 7;
});
Clazz.overrideMethod (c$, "getVoltageSourceCount", 
function () {
return 0;
});
Clazz.overrideMethod (c$, "getDumpType", 
function () {
return 157;
});
});

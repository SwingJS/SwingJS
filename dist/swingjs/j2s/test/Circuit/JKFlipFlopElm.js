Clazz.declarePackage ("test.Circuit");
Clazz.load (["test.Circuit.ChipElm"], "test.Circuit.JKFlipFlopElm", ["java.awt.Checkbox", "test.Circuit.EditInfo"], function () {
c$ = Clazz.decorateAsClass (function () {
this.FLAG_RESET = 2;
Clazz.instantialize (this, arguments);
}, test.Circuit, "JKFlipFlopElm", test.Circuit.ChipElm);
Clazz.defineMethod (c$, "hasReset", 
function () {
return (this.flags & 2) != 0;
});
Clazz.makeConstructor (c$, 
function (xa, ya, xb, yb, f, st) {
Clazz.superConstructor (this, test.Circuit.JKFlipFlopElm, [xa, ya, xb, yb, f, st]);
this.pins[4].value = !this.pins[3].value;
}, "~N,~N,~N,~N,~N,java.util.StringTokenizer");
Clazz.overrideMethod (c$, "getChipName", 
function () {
return "JK flip-flop";
});
Clazz.overrideMethod (c$, "setupPins", 
function () {
this.sizeX = 2;
this.sizeY = 3;
this.pins =  new Array (this.getPostCount ());
this.pins[0] = Clazz.innerTypeInstance (test.Circuit.ChipElm.Pin, this, null, 0, 2, "J");
this.pins[1] = Clazz.innerTypeInstance (test.Circuit.ChipElm.Pin, this, null, 1, 2, "");
this.pins[1].clock = true;
this.pins[1].bubble = true;
this.pins[2] = Clazz.innerTypeInstance (test.Circuit.ChipElm.Pin, this, null, 2, 2, "K");
this.pins[3] = Clazz.innerTypeInstance (test.Circuit.ChipElm.Pin, this, null, 0, 3, "Q");
this.pins[3].output = this.pins[3].state = true;
this.pins[4] = Clazz.innerTypeInstance (test.Circuit.ChipElm.Pin, this, null, 2, 3, "Q");
this.pins[4].output = true;
this.pins[4].lineOver = true;
if (this.hasReset ()) {
this.pins[5] = Clazz.innerTypeInstance (test.Circuit.ChipElm.Pin, this, null, 1, 3, "R");
}});
Clazz.overrideMethod (c$, "getPostCount", 
function () {
return 5 + (this.hasReset () ? 1 : 0);
});
Clazz.overrideMethod (c$, "getVoltageSourceCount", 
function () {
return 2;
});
Clazz.overrideMethod (c$, "execute", 
function () {
if (!this.pins[1].value && this.lastClock) {
var q = this.pins[3].value;
if (this.pins[0].value) {
if (this.pins[2].value) q = !q;
 else q = true;
} else if (this.pins[2].value) q = false;
this.pins[3].value = q;
this.pins[4].value = !q;
}this.lastClock = this.pins[1].value;
if (this.hasReset ()) {
if (this.pins[5].value) {
this.pins[3].value = false;
this.pins[4].value = true;
}}});
Clazz.overrideMethod (c$, "getDumpType", 
function () {
return 156;
});
Clazz.defineMethod (c$, "getEditInfo", 
function (n) {
if (n == 2) {
var ei =  new test.Circuit.EditInfo ("", 0, -1, -1);
ei.checkbox =  new java.awt.Checkbox ("Reset Pin", this.hasReset ());
return ei;
}return Clazz.superCall (this, test.Circuit.JKFlipFlopElm, "getEditInfo", [n]);
}, "~N");
Clazz.defineMethod (c$, "setEditValue", 
function (n, ei) {
if (n == 2) {
if (ei.checkbox.getState ()) {
this.flags |= 2;
} else {
this.flags &= -3;
}this.setupPins ();
this.allocNodes ();
this.setPoints ();
}Clazz.superCall (this, test.Circuit.JKFlipFlopElm, "setEditValue", [n, ei]);
}, "~N,test.Circuit.EditInfo");
});

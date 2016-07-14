Clazz.declarePackage ("test.Circuit");
Clazz.load (["test.Circuit.ChipElm"], "test.Circuit.TFlipFlopElm", ["java.awt.Checkbox", "test.Circuit.EditInfo"], function () {
c$ = Clazz.decorateAsClass (function () {
this.FLAG_RESET = 2;
this.FLAG_SET = 4;
this.last_val = false;
Clazz.instantialize (this, arguments);
}, test.Circuit, "TFlipFlopElm", test.Circuit.ChipElm);
Clazz.defineMethod (c$, "hasReset", 
function () {
return (this.flags & 2) != 0 || this.hasSet ();
});
Clazz.defineMethod (c$, "hasSet", 
function () {
return (this.flags & 4) != 0;
});
Clazz.makeConstructor (c$, 
function (xa, ya, xb, yb, f, st) {
Clazz.superConstructor (this, test.Circuit.TFlipFlopElm, [xa, ya, xb, yb, f, st]);
this.pins[2].value = !this.pins[1].value;
}, "~N,~N,~N,~N,~N,java.util.StringTokenizer");
Clazz.overrideMethod (c$, "getChipName", 
function () {
return "T flip-flop";
});
Clazz.overrideMethod (c$, "setupPins", 
function () {
this.sizeX = 2;
this.sizeY = 3;
this.pins =  new Array (this.getPostCount ());
this.pins[0] = Clazz.innerTypeInstance (test.Circuit.ChipElm.Pin, this, null, 0, 2, "T");
this.pins[1] = Clazz.innerTypeInstance (test.Circuit.ChipElm.Pin, this, null, 0, 3, "Q");
this.pins[1].output = this.pins[1].state = true;
this.pins[2] = Clazz.innerTypeInstance (test.Circuit.ChipElm.Pin, this, null, this.hasSet () ? 1 : 2, 3, "Q");
this.pins[2].output = true;
this.pins[2].lineOver = true;
this.pins[3] = Clazz.innerTypeInstance (test.Circuit.ChipElm.Pin, this, null, 1, 2, "");
this.pins[3].clock = true;
if (!this.hasSet ()) {
if (this.hasReset ()) this.pins[4] = Clazz.innerTypeInstance (test.Circuit.ChipElm.Pin, this, null, 2, 2, "R");
} else {
this.pins[5] = Clazz.innerTypeInstance (test.Circuit.ChipElm.Pin, this, null, 2, 2, "S");
this.pins[4] = Clazz.innerTypeInstance (test.Circuit.ChipElm.Pin, this, null, 2, 3, "R");
}});
Clazz.overrideMethod (c$, "getPostCount", 
function () {
return 4 + (this.hasReset () ? 1 : 0) + (this.hasSet () ? 1 : 0);
});
Clazz.overrideMethod (c$, "getVoltageSourceCount", 
function () {
return 2;
});
Clazz.defineMethod (c$, "reset", 
function () {
Clazz.superCall (this, test.Circuit.TFlipFlopElm, "reset", []);
this.volts[2] = 5;
this.pins[2].value = true;
});
Clazz.overrideMethod (c$, "execute", 
function () {
if (this.pins[3].value && !this.lastClock) {
if (this.pins[0].value) {
this.pins[1].value = !this.last_val;
this.pins[2].value = !this.pins[1].value;
this.last_val = !this.last_val;
}}if (this.hasSet () && this.pins[5].value) {
this.pins[1].value = true;
this.pins[2].value = false;
}if (this.hasReset () && this.pins[4].value) {
this.pins[1].value = false;
this.pins[2].value = true;
}this.lastClock = this.pins[3].value;
});
Clazz.overrideMethod (c$, "getDumpType", 
function () {
return 193;
});
Clazz.defineMethod (c$, "getEditInfo", 
function (n) {
if (n == 2) {
var ei =  new test.Circuit.EditInfo ("", 0, -1, -1);
ei.checkbox =  new java.awt.Checkbox ("Reset Pin", this.hasReset ());
return ei;
}if (n == 3) {
var ei =  new test.Circuit.EditInfo ("", 0, -1, -1);
ei.checkbox =  new java.awt.Checkbox ("Set Pin", this.hasSet ());
return ei;
}return Clazz.superCall (this, test.Circuit.TFlipFlopElm, "getEditInfo", [n]);
}, "~N");
Clazz.defineMethod (c$, "setEditValue", 
function (n, ei) {
if (n == 2) {
if (ei.checkbox.getState ()) this.flags |= 2;
 else this.flags &= -3;
this.setupPins ();
this.allocNodes ();
this.setPoints ();
}if (n == 3) {
if (ei.checkbox.getState ()) this.flags |= 4;
 else this.flags &= -5;
this.setupPins ();
this.allocNodes ();
this.setPoints ();
}Clazz.superCall (this, test.Circuit.TFlipFlopElm, "setEditValue", [n, ei]);
}, "~N,test.Circuit.EditInfo");
});

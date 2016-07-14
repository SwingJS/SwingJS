Clazz.declarePackage ("test.Circuit");
Clazz.load (["test.Circuit.ChipElm"], "test.Circuit.CounterElm", ["java.awt.Checkbox", "java.lang.Boolean", "test.Circuit.EditInfo"], function () {
c$ = Clazz.decorateAsClass (function () {
this.FLAG_ENABLE = 2;
this.invertreset = false;
Clazz.instantialize (this, arguments);
}, test.Circuit, "CounterElm", test.Circuit.ChipElm);
Clazz.makeConstructor (c$, 
function (xa, ya, xb, yb, f, st) {
Clazz.superConstructor (this, test.Circuit.CounterElm, [xa, ya, xb, yb, f, st]);
if (st.hasMoreTokens ()) this.invertreset =  new Boolean (st.nextToken ()).booleanValue ();
 else this.invertreset = true;
this.pins[1].bubble = this.invertreset;
}, "~N,~N,~N,~N,~N,java.util.StringTokenizer");
Clazz.defineMethod (c$, "dump", 
function () {
return Clazz.superCall (this, test.Circuit.CounterElm, "dump", []) + " " + this.invertreset;
});
Clazz.overrideMethod (c$, "needsBits", 
function () {
return true;
});
Clazz.overrideMethod (c$, "getChipName", 
function () {
return "Counter";
});
Clazz.overrideMethod (c$, "setupPins", 
function () {
this.sizeX = 2;
this.sizeY = this.bits > 2 ? this.bits : 2;
this.pins =  new Array (this.getPostCount ());
this.pins[0] = Clazz.innerTypeInstance (test.Circuit.ChipElm.Pin, this, null, 0, 2, "");
this.pins[0].clock = true;
this.pins[1] = Clazz.innerTypeInstance (test.Circuit.ChipElm.Pin, this, null, this.sizeY - 1, 2, "R");
this.pins[1].bubble = this.invertreset;
var i;
for (i = 0; i != this.bits; i++) {
var ii = i + 2;
this.pins[ii] = Clazz.innerTypeInstance (test.Circuit.ChipElm.Pin, this, null, i, 3, "Q" + (this.bits - i - 1));
this.pins[ii].output = this.pins[ii].state = true;
}
if (this.hasEnable ()) this.pins[this.bits + 2] = Clazz.innerTypeInstance (test.Circuit.ChipElm.Pin, this, null, this.sizeY - 2, 2, "En");
this.allocNodes ();
});
Clazz.overrideMethod (c$, "getPostCount", 
function () {
if (this.hasEnable ()) return this.bits + 3;
return this.bits + 2;
});
Clazz.overrideMethod (c$, "getEditInfo", 
function (n) {
if (n == 0) {
var ei =  new test.Circuit.EditInfo ("", 0, -1, -1);
ei.checkbox =  new java.awt.Checkbox ("Flip X", (this.flags & 1024) != 0);
return ei;
}if (n == 1) {
var ei =  new test.Circuit.EditInfo ("", 0, -1, -1);
ei.checkbox =  new java.awt.Checkbox ("Flip Y", (this.flags & 2048) != 0);
return ei;
}if (n == 2) {
var ei =  new test.Circuit.EditInfo ("", 0, -1, -1);
ei.checkbox =  new java.awt.Checkbox ("Invert reset pin", this.invertreset);
return ei;
}return null;
}, "~N");
Clazz.overrideMethod (c$, "setEditValue", 
function (n, ei) {
if (n == 0) {
if (ei.checkbox.getState ()) this.flags |= 1024;
 else this.flags &= -1025;
this.setPoints ();
}if (n == 1) {
if (ei.checkbox.getState ()) this.flags |= 2048;
 else this.flags &= -2049;
this.setPoints ();
}if (n == 2) {
if (ei.checkbox.getState ()) {
this.invertreset = true;
this.pins[1].bubble = true;
} else {
this.invertreset = false;
this.pins[1].bubble = false;
}this.setPoints ();
}}, "~N,test.Circuit.EditInfo");
Clazz.defineMethod (c$, "hasEnable", 
function () {
return (this.flags & 2) != 0;
});
Clazz.overrideMethod (c$, "getVoltageSourceCount", 
function () {
return this.bits;
});
Clazz.overrideMethod (c$, "execute", 
function () {
var en = true;
if (this.hasEnable ()) en = this.pins[this.bits + 2].value;
if (this.pins[0].value && !this.lastClock && en) {
var i;
for (i = this.bits - 1; i >= 0; i--) {
var ii = i + 2;
if (!this.pins[ii].value) {
this.pins[ii].value = true;
break;
}this.pins[ii].value = false;
}
}if (!this.pins[1].value == this.invertreset) {
var i;
for (i = 0; i != this.bits; i++) this.pins[i + 2].value = false;

}this.lastClock = this.pins[0].value;
});
Clazz.overrideMethod (c$, "getDumpType", 
function () {
return 164;
});
});

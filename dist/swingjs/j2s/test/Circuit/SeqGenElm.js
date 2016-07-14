Clazz.declarePackage ("test.Circuit");
Clazz.load (["test.Circuit.ChipElm"], "test.Circuit.SeqGenElm", ["java.awt.Checkbox", "java.lang.Boolean", "test.Circuit.CircuitElm", "$.EditInfo"], function () {
c$ = Clazz.decorateAsClass (function () {
this.data = 0;
this.position = 0;
this.oneshot = false;
this.lastchangetime = 0;
this.clockstate = false;
Clazz.instantialize (this, arguments);
}, test.Circuit, "SeqGenElm", test.Circuit.ChipElm);
Clazz.defineMethod (c$, "hasReset", 
function () {
return false;
});
Clazz.makeConstructor (c$, 
function (xa, ya, xb, yb, f, st) {
Clazz.superConstructor (this, test.Circuit.SeqGenElm, [xa, ya, xb, yb, f, st]);
this.data = ( new Integer (st.nextToken ()).intValue ());
if (st.hasMoreTokens ()) {
this.oneshot =  new Boolean (st.nextToken ()).booleanValue ();
this.position = 8;
}}, "~N,~N,~N,~N,~N,java.util.StringTokenizer");
Clazz.overrideMethod (c$, "getChipName", 
function () {
return "Sequence generator";
});
Clazz.overrideMethod (c$, "setupPins", 
function () {
this.sizeX = 2;
this.sizeY = 2;
this.pins =  new Array (this.getPostCount ());
this.pins[0] = Clazz.innerTypeInstance (test.Circuit.ChipElm.Pin, this, null, 0, 2, "");
this.pins[0].clock = true;
this.pins[1] = Clazz.innerTypeInstance (test.Circuit.ChipElm.Pin, this, null, 1, 3, "Q");
this.pins[1].output = true;
});
Clazz.overrideMethod (c$, "getPostCount", 
function () {
return 2;
});
Clazz.overrideMethod (c$, "getVoltageSourceCount", 
function () {
return 1;
});
Clazz.defineMethod (c$, "GetNextBit", 
function () {
if (((this.data >>> this.position) & 1) != 0) this.pins[1].value = true;
 else this.pins[1].value = false;
this.position++;
});
Clazz.overrideMethod (c$, "execute", 
function () {
if (this.oneshot) {
if (test.Circuit.CircuitElm.sim.t - this.lastchangetime > 0.005) {
if (this.position <= 8) this.GetNextBit ();
this.lastchangetime = test.Circuit.CircuitElm.sim.t;
}}if (this.pins[0].value && !this.clockstate) {
this.clockstate = true;
if (this.oneshot) {
this.position = 0;
} else {
this.GetNextBit ();
if (this.position >= 8) this.position = 0;
}}if (!this.pins[0].value) this.clockstate = false;
});
Clazz.overrideMethod (c$, "getDumpType", 
function () {
return 188;
});
Clazz.defineMethod (c$, "dump", 
function () {
return Clazz.superCall (this, test.Circuit.SeqGenElm, "dump", []) + " " + this.data + " " + this.oneshot;
});
Clazz.overrideMethod (c$, "getEditInfo", 
function (n) {
if (n == 0) {
var ei =  new test.Circuit.EditInfo ("", 0, -1, -1);
ei.checkbox =  new java.awt.Checkbox ("Bit 0 set", (this.data & 1) != 0);
return ei;
}if (n == 1) {
var ei =  new test.Circuit.EditInfo ("", 0, -1, -1);
ei.checkbox =  new java.awt.Checkbox ("Bit 1 set", (this.data & 2) != 0);
return ei;
}if (n == 2) {
var ei =  new test.Circuit.EditInfo ("", 0, -1, -1);
ei.checkbox =  new java.awt.Checkbox ("Bit 2 set", (this.data & 4) != 0);
return ei;
}if (n == 3) {
var ei =  new test.Circuit.EditInfo ("", 0, -1, -1);
ei.checkbox =  new java.awt.Checkbox ("Bit 3 set", (this.data & 8) != 0);
return ei;
}if (n == 4) {
var ei =  new test.Circuit.EditInfo ("", 0, -1, -1);
ei.checkbox =  new java.awt.Checkbox ("Bit 4 set", (this.data & 16) != 0);
return ei;
}if (n == 5) {
var ei =  new test.Circuit.EditInfo ("", 0, -1, -1);
ei.checkbox =  new java.awt.Checkbox ("Bit 5 set", (this.data & 32) != 0);
return ei;
}if (n == 6) {
var ei =  new test.Circuit.EditInfo ("", 0, -1, -1);
ei.checkbox =  new java.awt.Checkbox ("Bit 6 set", (this.data & 64) != 0);
return ei;
}if (n == 7) {
var ei =  new test.Circuit.EditInfo ("", 0, -1, -1);
ei.checkbox =  new java.awt.Checkbox ("Bit 7 set", (this.data & 128) != 0);
return ei;
}if (n == 8) {
var ei =  new test.Circuit.EditInfo ("", 0, -1, -1);
ei.checkbox =  new java.awt.Checkbox ("One shot", this.oneshot);
return ei;
}return null;
}, "~N");
Clazz.overrideMethod (c$, "setEditValue", 
function (n, ei) {
if (n == 0) {
if (ei.checkbox.getState ()) this.data |= 1;
 else this.data &= -2;
this.setPoints ();
}if (n == 1) {
if (ei.checkbox.getState ()) this.data |= 2;
 else this.data &= -3;
this.setPoints ();
}if (n == 2) {
if (ei.checkbox.getState ()) this.data |= 4;
 else this.data &= -5;
this.setPoints ();
}if (n == 3) {
if (ei.checkbox.getState ()) this.data |= 8;
 else this.data &= -9;
this.setPoints ();
}if (n == 4) {
if (ei.checkbox.getState ()) this.data |= 16;
 else this.data &= -17;
this.setPoints ();
}if (n == 5) {
if (ei.checkbox.getState ()) this.data |= 32;
 else this.data &= -33;
this.setPoints ();
}if (n == 6) {
if (ei.checkbox.getState ()) this.data |= 64;
 else this.data &= -65;
this.setPoints ();
}if (n == 7) {
if (ei.checkbox.getState ()) this.data |= 128;
 else this.data &= -129;
this.setPoints ();
}if (n == 8) {
if (ei.checkbox.getState ()) {
this.oneshot = true;
this.position = 8;
} else {
this.position = 0;
this.oneshot = false;
}}}, "~N,test.Circuit.EditInfo");
});

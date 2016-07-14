Clazz.declarePackage ("test.Circuit");
Clazz.load (["test.Circuit.ChipElm"], "test.Circuit.PisoShiftElm", null, function () {
c$ = Clazz.decorateAsClass (function () {
this.data = 0;
this.clockstate = false;
this.modestate = false;
Clazz.instantialize (this, arguments);
}, test.Circuit, "PisoShiftElm", test.Circuit.ChipElm);
Clazz.defineMethod (c$, "hasReset", 
function () {
return false;
});
Clazz.overrideMethod (c$, "getChipName", 
function () {
return "PISO shift register";
});
Clazz.overrideMethod (c$, "setupPins", 
function () {
this.sizeX = 10;
this.sizeY = 3;
this.pins =  new Array (this.getPostCount ());
this.pins[0] = Clazz.innerTypeInstance (test.Circuit.ChipElm.Pin, this, null, 1, 2, "L");
this.pins[1] = Clazz.innerTypeInstance (test.Circuit.ChipElm.Pin, this, null, 2, 2, "");
this.pins[1].clock = true;
this.pins[2] = Clazz.innerTypeInstance (test.Circuit.ChipElm.Pin, this, null, 1, 0, "I7");
this.pins[3] = Clazz.innerTypeInstance (test.Circuit.ChipElm.Pin, this, null, 2, 0, "I6");
this.pins[4] = Clazz.innerTypeInstance (test.Circuit.ChipElm.Pin, this, null, 3, 0, "I5");
this.pins[5] = Clazz.innerTypeInstance (test.Circuit.ChipElm.Pin, this, null, 4, 0, "I4");
this.pins[6] = Clazz.innerTypeInstance (test.Circuit.ChipElm.Pin, this, null, 5, 0, "I3");
this.pins[7] = Clazz.innerTypeInstance (test.Circuit.ChipElm.Pin, this, null, 6, 0, "I2");
this.pins[8] = Clazz.innerTypeInstance (test.Circuit.ChipElm.Pin, this, null, 7, 0, "I1");
this.pins[9] = Clazz.innerTypeInstance (test.Circuit.ChipElm.Pin, this, null, 8, 0, "I0");
this.pins[10] = Clazz.innerTypeInstance (test.Circuit.ChipElm.Pin, this, null, 1, 3, "Q");
this.pins[10].output = true;
});
Clazz.overrideMethod (c$, "getPostCount", 
function () {
return 11;
});
Clazz.overrideMethod (c$, "getVoltageSourceCount", 
function () {
return 1;
});
Clazz.overrideMethod (c$, "execute", 
function () {
if (this.pins[0].value && !this.modestate) {
this.modestate = true;
this.data = 0;
if (this.pins[2].value) this.data += 128;
if (this.pins[3].value) this.data += 64;
if (this.pins[4].value) this.data += 32;
if (this.pins[5].value) this.data += 16;
if (this.pins[6].value) this.data += 8;
if (this.pins[7].value) this.data += 4;
if (this.pins[8].value) this.data += 2;
if (this.pins[9].value) this.data += 1;
} else if (this.pins[1].value && !this.clockstate) {
this.clockstate = true;
if ((this.data & 1) == 0) this.pins[10].value = false;
 else this.pins[10].value = true;
this.data = (this.data >>> 1);
}if (!this.pins[0].value) this.modestate = false;
if (!this.pins[1].value) this.clockstate = false;
});
Clazz.overrideMethod (c$, "getDumpType", 
function () {
return 186;
});
});

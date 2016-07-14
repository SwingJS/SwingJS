Clazz.declarePackage ("test.Circuit");
Clazz.load (["test.Circuit.ChipElm"], "test.Circuit.SipoShiftElm", null, function () {
c$ = Clazz.decorateAsClass (function () {
this.data = 0;
this.clockstate = false;
Clazz.instantialize (this, arguments);
}, test.Circuit, "SipoShiftElm", test.Circuit.ChipElm);
Clazz.defineMethod (c$, "hasReset", 
function () {
return false;
});
Clazz.overrideMethod (c$, "getChipName", 
function () {
return "SIPO shift register";
});
Clazz.overrideMethod (c$, "setupPins", 
function () {
this.sizeX = 9;
this.sizeY = 3;
this.pins =  new Array (this.getPostCount ());
this.pins[0] = Clazz.innerTypeInstance (test.Circuit.ChipElm.Pin, this, null, 1, 2, "D");
this.pins[1] = Clazz.innerTypeInstance (test.Circuit.ChipElm.Pin, this, null, 2, 2, "");
this.pins[1].clock = true;
this.pins[2] = Clazz.innerTypeInstance (test.Circuit.ChipElm.Pin, this, null, 1, 0, "I7");
this.pins[2].output = true;
this.pins[3] = Clazz.innerTypeInstance (test.Circuit.ChipElm.Pin, this, null, 2, 0, "I6");
this.pins[3].output = true;
this.pins[4] = Clazz.innerTypeInstance (test.Circuit.ChipElm.Pin, this, null, 3, 0, "I5");
this.pins[4].output = true;
this.pins[5] = Clazz.innerTypeInstance (test.Circuit.ChipElm.Pin, this, null, 4, 0, "I4");
this.pins[5].output = true;
this.pins[6] = Clazz.innerTypeInstance (test.Circuit.ChipElm.Pin, this, null, 5, 0, "I3");
this.pins[6].output = true;
this.pins[7] = Clazz.innerTypeInstance (test.Circuit.ChipElm.Pin, this, null, 6, 0, "I2");
this.pins[7].output = true;
this.pins[8] = Clazz.innerTypeInstance (test.Circuit.ChipElm.Pin, this, null, 7, 0, "I1");
this.pins[8].output = true;
this.pins[9] = Clazz.innerTypeInstance (test.Circuit.ChipElm.Pin, this, null, 8, 0, "I0");
this.pins[9].output = true;
});
Clazz.overrideMethod (c$, "getPostCount", 
function () {
return 10;
});
Clazz.overrideMethod (c$, "getVoltageSourceCount", 
function () {
return 8;
});
Clazz.overrideMethod (c$, "execute", 
function () {
if (this.pins[1].value && !this.clockstate) {
this.clockstate = true;
this.data = (this.data >>> 1);
if (this.pins[0].value) this.data += 128;
if ((this.data & 128) > 0) this.pins[2].value = true;
 else this.pins[2].value = false;
if ((this.data & 64) > 0) this.pins[3].value = true;
 else this.pins[3].value = false;
if ((this.data & 32) > 0) this.pins[4].value = true;
 else this.pins[4].value = false;
if ((this.data & 16) > 0) this.pins[5].value = true;
 else this.pins[5].value = false;
if ((this.data & 8) > 0) this.pins[6].value = true;
 else this.pins[6].value = false;
if ((this.data & 4) > 0) this.pins[7].value = true;
 else this.pins[7].value = false;
if ((this.data & 2) > 0) this.pins[8].value = true;
 else this.pins[8].value = false;
if ((this.data & 1) > 0) this.pins[9].value = true;
 else this.pins[9].value = false;
}if (!this.pins[1].value) this.clockstate = false;
});
Clazz.overrideMethod (c$, "getDumpType", 
function () {
return 189;
});
});

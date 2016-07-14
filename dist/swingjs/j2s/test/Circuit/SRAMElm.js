Clazz.declarePackage ("test.Circuit");
Clazz.load (["test.Circuit.ChipElm"], "test.Circuit.SRAMElm", ["test.Circuit.CircuitElm"], function () {
c$ = Clazz.decorateAsClass (function () {
this.data = null;
Clazz.instantialize (this, arguments);
}, test.Circuit, "SRAMElm", test.Circuit.ChipElm);
Clazz.prepareFields (c$, function () {
this.data =  Clazz.newShortArray (256, 0);
});
Clazz.makeConstructor (c$, 
function (xx, yy) {
Clazz.superConstructor (this, test.Circuit.SRAMElm, [xx, yy]);
var i;
for (i = 0; i < 256; i++) this.data[i] = 0;

}, "~N,~N");
Clazz.makeConstructor (c$, 
function (xa, ya, xb, yb, f, st) {
Clazz.superConstructor (this, test.Circuit.SRAMElm, [xa, ya, xb, yb, f, st]);
var i;
for (i = 0; i < 256; i++) this.data[i] = 0;

}, "~N,~N,~N,~N,~N,java.util.StringTokenizer");
Clazz.overrideMethod (c$, "getChipName", 
function () {
return "SRAM";
});
Clazz.overrideMethod (c$, "setupPins", 
function () {
this.sizeX = 4;
this.sizeY = 9;
this.pins =  new Array (19);
this.pins[0] = Clazz.innerTypeInstance (test.Circuit.ChipElm.Pin, this, null, 0, 2, "A7");
this.pins[1] = Clazz.innerTypeInstance (test.Circuit.ChipElm.Pin, this, null, 1, 2, "A6");
this.pins[2] = Clazz.innerTypeInstance (test.Circuit.ChipElm.Pin, this, null, 2, 2, "A5");
this.pins[3] = Clazz.innerTypeInstance (test.Circuit.ChipElm.Pin, this, null, 3, 2, "A4");
this.pins[4] = Clazz.innerTypeInstance (test.Circuit.ChipElm.Pin, this, null, 4, 2, "A3");
this.pins[5] = Clazz.innerTypeInstance (test.Circuit.ChipElm.Pin, this, null, 5, 2, "A2");
this.pins[6] = Clazz.innerTypeInstance (test.Circuit.ChipElm.Pin, this, null, 6, 2, "A1");
this.pins[7] = Clazz.innerTypeInstance (test.Circuit.ChipElm.Pin, this, null, 7, 2, "A0");
this.pins[8] = Clazz.innerTypeInstance (test.Circuit.ChipElm.Pin, this, null, 8, 2, "R");
this.pins[9] = Clazz.innerTypeInstance (test.Circuit.ChipElm.Pin, this, null, 8, 3, "W");
this.pins[10] = Clazz.innerTypeInstance (test.Circuit.ChipElm.Pin, this, null, 0, 3, "D7");
this.pins[11] = Clazz.innerTypeInstance (test.Circuit.ChipElm.Pin, this, null, 1, 3, "D6");
this.pins[12] = Clazz.innerTypeInstance (test.Circuit.ChipElm.Pin, this, null, 2, 3, "D5");
this.pins[13] = Clazz.innerTypeInstance (test.Circuit.ChipElm.Pin, this, null, 3, 3, "D4");
this.pins[14] = Clazz.innerTypeInstance (test.Circuit.ChipElm.Pin, this, null, 4, 3, "D3");
this.pins[15] = Clazz.innerTypeInstance (test.Circuit.ChipElm.Pin, this, null, 5, 3, "D2");
this.pins[16] = Clazz.innerTypeInstance (test.Circuit.ChipElm.Pin, this, null, 6, 3, "D1");
this.pins[17] = Clazz.innerTypeInstance (test.Circuit.ChipElm.Pin, this, null, 7, 3, "D0");
this.pins[10].output = true;
this.pins[11].output = true;
this.pins[12].output = true;
this.pins[13].output = true;
this.pins[14].output = true;
this.pins[15].output = true;
this.pins[16].output = true;
this.pins[17].output = true;
});
Clazz.overrideMethod (c$, "getPostCount", 
function () {
return 18;
});
Clazz.overrideMethod (c$, "getVoltageSourceCount", 
function () {
return 8;
});
Clazz.overrideMethod (c$, "execute", 
function () {
var index = 0;
if (this.pins[8].value || this.pins[9].value) {
if (this.pins[0].value) index += 128;
if (this.pins[1].value) index += 64;
if (this.pins[2].value) index += 32;
if (this.pins[3].value) index += 16;
if (this.pins[4].value) index += 8;
if (this.pins[5].value) index += 4;
if (this.pins[6].value) index += 2;
if (this.pins[7].value) index += 1;
if (this.pins[8].value) {
if ((this.data[index] & 128) > 0) this.pins[10].value = true;
 else this.pins[10].value = false;
if ((this.data[index] & 64) > 0) this.pins[11].value = true;
 else this.pins[11].value = false;
if ((this.data[index] & 32) > 0) this.pins[12].value = true;
 else this.pins[12].value = false;
if ((this.data[index] & 16) > 0) this.pins[13].value = true;
 else this.pins[13].value = false;
if ((this.data[index] & 8) > 0) this.pins[14].value = true;
 else this.pins[14].value = false;
if ((this.data[index] & 4) > 0) this.pins[15].value = true;
 else this.pins[15].value = false;
if ((this.data[index] & 2) > 0) this.pins[16].value = true;
 else this.pins[16].value = false;
if ((this.data[index] & 1) > 0) this.pins[17].value = true;
 else this.pins[17].value = false;
} else {
this.data[index] = 0;
if (this.pins[10].value) this.data[index] += 128;
if (this.pins[11].value) this.data[index] += 64;
if (this.pins[12].value) this.data[index] += 32;
if (this.pins[13].value) this.data[index] += 16;
if (this.pins[14].value) this.data[index] += 8;
if (this.pins[15].value) this.data[index] += 4;
if (this.pins[16].value) this.data[index] += 2;
if (this.pins[17].value) this.data[index] += 1;
}}});
Clazz.overrideMethod (c$, "doStep", 
function () {
var i;
for (i = 0; i != this.getPostCount (); i++) {
var p = this.pins[i];
if (p.output && this.pins[9].value) p.value = this.volts[i] > 2.5;
if (!p.output) p.value = this.volts[i] > 2.5;
}
this.execute ();
for (i = 0; i != this.getPostCount (); i++) {
var p = this.pins[i];
if (p.output && !this.pins[9].value) test.Circuit.CircuitElm.sim.updateVoltageSource (0, this.nodes[i], p.voltSource, p.value ? 5 : 0);
}
});
Clazz.overrideMethod (c$, "getDumpType", 
function () {
return 204;
});
});

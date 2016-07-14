Clazz.declarePackage ("test.Circuit");
Clazz.load (["test.Circuit.ChipElm"], "test.Circuit.LatchElm", null, function () {
c$ = Clazz.decorateAsClass (function () {
this.loadPin = 0;
this.lastLoad = false;
Clazz.instantialize (this, arguments);
}, test.Circuit, "LatchElm", test.Circuit.ChipElm);
Clazz.overrideMethod (c$, "getChipName", 
function () {
return "Latch";
});
Clazz.overrideMethod (c$, "needsBits", 
function () {
return true;
});
Clazz.overrideMethod (c$, "setupPins", 
function () {
this.sizeX = 2;
this.sizeY = this.bits + 1;
this.pins =  new Array (this.getPostCount ());
var i;
for (i = 0; i != this.bits; i++) this.pins[i] = Clazz.innerTypeInstance (test.Circuit.ChipElm.Pin, this, null, this.bits - 1 - i, 2, "I" + i);

for (i = 0; i != this.bits; i++) {
this.pins[i + this.bits] = Clazz.innerTypeInstance (test.Circuit.ChipElm.Pin, this, null, this.bits - 1 - i, 3, "O");
this.pins[i + this.bits].output = true;
}
this.pins[this.loadPin = this.bits * 2] = Clazz.innerTypeInstance (test.Circuit.ChipElm.Pin, this, null, this.bits, 2, "Ld");
this.allocNodes ();
});
Clazz.overrideMethod (c$, "execute", 
function () {
var i;
if (this.pins[this.loadPin].value && !this.lastLoad) for (i = 0; i != this.bits; i++) this.pins[i + this.bits].value = this.pins[i].value;

this.lastLoad = this.pins[this.loadPin].value;
});
Clazz.overrideMethod (c$, "getVoltageSourceCount", 
function () {
return this.bits;
});
Clazz.overrideMethod (c$, "getPostCount", 
function () {
return this.bits * 2 + 1;
});
Clazz.overrideMethod (c$, "getDumpType", 
function () {
return 168;
});
});

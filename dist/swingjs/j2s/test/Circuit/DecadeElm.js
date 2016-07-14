Clazz.declarePackage ("test.Circuit");
Clazz.load (["test.Circuit.ChipElm"], "test.Circuit.DecadeElm", null, function () {
c$ = Clazz.declareType (test.Circuit, "DecadeElm", test.Circuit.ChipElm);
Clazz.overrideMethod (c$, "getChipName", 
function () {
return "decade counter";
});
Clazz.overrideMethod (c$, "needsBits", 
function () {
return true;
});
Clazz.overrideMethod (c$, "setupPins", 
function () {
this.sizeX = this.bits > 2 ? this.bits : 2;
this.sizeY = 2;
this.pins =  new Array (this.getPostCount ());
this.pins[0] = Clazz.innerTypeInstance (test.Circuit.ChipElm.Pin, this, null, 1, 2, "");
this.pins[0].clock = true;
this.pins[1] = Clazz.innerTypeInstance (test.Circuit.ChipElm.Pin, this, null, this.sizeX - 1, 1, "R");
this.pins[1].bubble = true;
var i;
for (i = 0; i != this.bits; i++) {
var ii = i + 2;
this.pins[ii] = Clazz.innerTypeInstance (test.Circuit.ChipElm.Pin, this, null, i, 0, "Q" + i);
this.pins[ii].output = this.pins[ii].state = true;
}
this.allocNodes ();
});
Clazz.overrideMethod (c$, "getPostCount", 
function () {
return this.bits + 2;
});
Clazz.overrideMethod (c$, "getVoltageSourceCount", 
function () {
return this.bits;
});
Clazz.overrideMethod (c$, "execute", 
function () {
var i;
if (this.pins[0].value && !this.lastClock) {
for (i = 0; i != this.bits; i++) if (this.pins[i + 2].value) break;

if (i < this.bits) this.pins[i++ + 2].value = false;
i %= this.bits;
this.pins[i + 2].value = true;
}if (!this.pins[1].value) {
for (i = 1; i != this.bits; i++) this.pins[i + 2].value = false;

this.pins[2].value = true;
}this.lastClock = this.pins[0].value;
});
Clazz.overrideMethod (c$, "getDumpType", 
function () {
return 163;
});
});

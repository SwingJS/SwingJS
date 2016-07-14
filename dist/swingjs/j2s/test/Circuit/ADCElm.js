Clazz.declarePackage ("test.Circuit");
Clazz.load (["test.Circuit.ChipElm"], "test.Circuit.ADCElm", null, function () {
c$ = Clazz.declareType (test.Circuit, "ADCElm", test.Circuit.ChipElm);
Clazz.overrideMethod (c$, "getChipName", 
function () {
return "ADC";
});
Clazz.overrideMethod (c$, "needsBits", 
function () {
return true;
});
Clazz.overrideMethod (c$, "setupPins", 
function () {
this.sizeX = 2;
this.sizeY = this.bits > 2 ? this.bits : 2;
this.pins =  new Array (this.getPostCount ());
var i;
for (i = 0; i != this.bits; i++) {
this.pins[i] = Clazz.innerTypeInstance (test.Circuit.ChipElm.Pin, this, null, this.bits - 1 - i, 3, "D" + i);
this.pins[i].output = true;
}
this.pins[this.bits] = Clazz.innerTypeInstance (test.Circuit.ChipElm.Pin, this, null, 0, 2, "In");
this.pins[this.bits + 1] = Clazz.innerTypeInstance (test.Circuit.ChipElm.Pin, this, null, this.sizeY - 1, 2, "V+");
this.allocNodes ();
});
Clazz.overrideMethod (c$, "execute", 
function () {
var imax = (1 << this.bits) - 1;
var val = imax * this.volts[this.bits] / this.volts[this.bits + 1];
var ival = Clazz.doubleToInt (val);
ival = test.Circuit.CircuitElm.min (imax, test.Circuit.CircuitElm.max (0, ival));
var i;
for (i = 0; i != this.bits; i++) this.pins[i].value = ((ival & (1 << i)) != 0);

});
Clazz.overrideMethod (c$, "getVoltageSourceCount", 
function () {
return this.bits;
});
Clazz.overrideMethod (c$, "getPostCount", 
function () {
return this.bits + 2;
});
Clazz.overrideMethod (c$, "getDumpType", 
function () {
return 167;
});
});

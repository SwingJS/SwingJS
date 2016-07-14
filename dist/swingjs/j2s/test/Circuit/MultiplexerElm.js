Clazz.declarePackage ("test.Circuit");
Clazz.load (["test.Circuit.ChipElm"], "test.Circuit.MultiplexerElm", null, function () {
c$ = Clazz.declareType (test.Circuit, "MultiplexerElm", test.Circuit.ChipElm);
Clazz.defineMethod (c$, "hasReset", 
function () {
return false;
});
Clazz.overrideMethod (c$, "getChipName", 
function () {
return "Multiplexer";
});
Clazz.overrideMethod (c$, "setupPins", 
function () {
this.sizeX = 3;
this.sizeY = 5;
this.pins =  new Array (this.getPostCount ());
this.pins[0] = Clazz.innerTypeInstance (test.Circuit.ChipElm.Pin, this, null, 0, 2, "I0");
this.pins[1] = Clazz.innerTypeInstance (test.Circuit.ChipElm.Pin, this, null, 1, 2, "I1");
this.pins[2] = Clazz.innerTypeInstance (test.Circuit.ChipElm.Pin, this, null, 2, 2, "I2");
this.pins[3] = Clazz.innerTypeInstance (test.Circuit.ChipElm.Pin, this, null, 3, 2, "I3");
this.pins[4] = Clazz.innerTypeInstance (test.Circuit.ChipElm.Pin, this, null, 1, 1, "S0");
this.pins[5] = Clazz.innerTypeInstance (test.Circuit.ChipElm.Pin, this, null, 2, 1, "S1");
this.pins[6] = Clazz.innerTypeInstance (test.Circuit.ChipElm.Pin, this, null, 0, 3, "Q");
this.pins[6].output = true;
});
Clazz.overrideMethod (c$, "getPostCount", 
function () {
return 7;
});
Clazz.overrideMethod (c$, "getVoltageSourceCount", 
function () {
return 1;
});
Clazz.overrideMethod (c$, "execute", 
function () {
var selectedvalue = 0;
if (this.pins[4].value) selectedvalue++;
if (this.pins[5].value) selectedvalue += 2;
this.pins[6].value = this.pins[selectedvalue].value;
});
Clazz.overrideMethod (c$, "getDumpType", 
function () {
return 184;
});
});

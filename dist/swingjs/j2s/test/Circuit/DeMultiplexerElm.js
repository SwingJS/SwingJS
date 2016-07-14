Clazz.declarePackage ("test.Circuit");
Clazz.load (["test.Circuit.ChipElm"], "test.Circuit.DeMultiplexerElm", null, function () {
c$ = Clazz.declareType (test.Circuit, "DeMultiplexerElm", test.Circuit.ChipElm);
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
this.pins[0] = Clazz.innerTypeInstance (test.Circuit.ChipElm.Pin, this, null, 0, 3, "Q0");
this.pins[0].output = true;
this.pins[1] = Clazz.innerTypeInstance (test.Circuit.ChipElm.Pin, this, null, 1, 3, "Q1");
this.pins[1].output = true;
this.pins[2] = Clazz.innerTypeInstance (test.Circuit.ChipElm.Pin, this, null, 2, 3, "Q2");
this.pins[2].output = true;
this.pins[3] = Clazz.innerTypeInstance (test.Circuit.ChipElm.Pin, this, null, 3, 3, "Q3");
this.pins[3].output = true;
this.pins[4] = Clazz.innerTypeInstance (test.Circuit.ChipElm.Pin, this, null, 0, 1, "S0");
this.pins[5] = Clazz.innerTypeInstance (test.Circuit.ChipElm.Pin, this, null, 1, 1, "S1");
this.pins[6] = Clazz.innerTypeInstance (test.Circuit.ChipElm.Pin, this, null, 0, 2, "Q");
});
Clazz.overrideMethod (c$, "getPostCount", 
function () {
return 7;
});
Clazz.overrideMethod (c$, "getVoltageSourceCount", 
function () {
return 4;
});
Clazz.overrideMethod (c$, "execute", 
function () {
var selectedvalue = 0;
if (this.pins[4].value) selectedvalue++;
if (this.pins[5].value) selectedvalue += 2;
for (var i = 0; i < 4; i++) this.pins[i].value = false;

this.pins[selectedvalue].value = this.pins[6].value;
});
Clazz.overrideMethod (c$, "getDumpType", 
function () {
return 185;
});
});

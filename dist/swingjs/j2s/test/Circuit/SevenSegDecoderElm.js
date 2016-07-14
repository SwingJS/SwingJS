Clazz.declarePackage ("test.Circuit");
Clazz.load (["test.Circuit.ChipElm"], "test.Circuit.SevenSegDecoderElm", null, function () {
c$ = Clazz.declareType (test.Circuit, "SevenSegDecoderElm", test.Circuit.ChipElm);
Clazz.defineMethod (c$, "hasReset", 
function () {
return false;
});
Clazz.overrideMethod (c$, "getChipName", 
function () {
return "Seven Segment LED Decoder";
});
Clazz.overrideMethod (c$, "setupPins", 
function () {
this.sizeX = 3;
this.sizeY = 7;
this.pins =  new Array (this.getPostCount ());
this.pins[7] = Clazz.innerTypeInstance (test.Circuit.ChipElm.Pin, this, null, 0, 2, "I3");
this.pins[8] = Clazz.innerTypeInstance (test.Circuit.ChipElm.Pin, this, null, 1, 2, "I2");
this.pins[9] = Clazz.innerTypeInstance (test.Circuit.ChipElm.Pin, this, null, 2, 2, "I1");
this.pins[10] = Clazz.innerTypeInstance (test.Circuit.ChipElm.Pin, this, null, 3, 2, "I0");
this.pins[0] = Clazz.innerTypeInstance (test.Circuit.ChipElm.Pin, this, null, 0, 3, "a");
this.pins[0].output = true;
this.pins[1] = Clazz.innerTypeInstance (test.Circuit.ChipElm.Pin, this, null, 1, 3, "b");
this.pins[1].output = true;
this.pins[2] = Clazz.innerTypeInstance (test.Circuit.ChipElm.Pin, this, null, 2, 3, "c");
this.pins[2].output = true;
this.pins[3] = Clazz.innerTypeInstance (test.Circuit.ChipElm.Pin, this, null, 3, 3, "d");
this.pins[3].output = true;
this.pins[4] = Clazz.innerTypeInstance (test.Circuit.ChipElm.Pin, this, null, 4, 3, "e");
this.pins[4].output = true;
this.pins[5] = Clazz.innerTypeInstance (test.Circuit.ChipElm.Pin, this, null, 5, 3, "f");
this.pins[5].output = true;
this.pins[6] = Clazz.innerTypeInstance (test.Circuit.ChipElm.Pin, this, null, 6, 3, "g");
this.pins[6].output = true;
});
Clazz.overrideMethod (c$, "getPostCount", 
function () {
return 11;
});
Clazz.overrideMethod (c$, "getVoltageSourceCount", 
function () {
return 7;
});
Clazz.overrideMethod (c$, "execute", 
function () {
var input = 0;
if (this.pins[7].value) input += 8;
if (this.pins[8].value) input += 4;
if (this.pins[9].value) input += 2;
if (this.pins[10].value) input += 1;
for (var i = 0; i < 7; i++) {
this.pins[i].value = test.Circuit.SevenSegDecoderElm.symbols[input][i];
}
});
Clazz.overrideMethod (c$, "getDumpType", 
function () {
return 197;
});
Clazz.defineStatics (c$,
"symbols", [[true, true, true, true, true, true, false], [false, true, true, false, false, false, false], [true, true, false, true, true, false, true], [true, true, true, true, false, false, true], [false, true, true, false, false, true, true], [true, false, true, true, false, true, true], [true, false, true, true, true, true, true], [true, true, true, false, false, false, false], [true, true, true, true, true, true, true], [true, true, true, false, false, true, true], [true, true, true, false, true, true, true], [false, false, true, true, true, true, true], [true, false, false, true, true, true, false], [false, true, true, true, true, false, true], [true, false, false, true, true, true, true], [true, false, false, false, true, true, true]]);
});

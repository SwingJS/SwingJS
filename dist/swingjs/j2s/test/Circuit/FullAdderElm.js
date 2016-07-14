Clazz.declarePackage ("test.Circuit");
Clazz.load (["test.Circuit.ChipElm"], "test.Circuit.FullAdderElm", null, function () {
c$ = Clazz.declareType (test.Circuit, "FullAdderElm", test.Circuit.ChipElm);
Clazz.defineMethod (c$, "hasReset", 
function () {
return false;
});
Clazz.overrideMethod (c$, "getChipName", 
function () {
return "Full Adder";
});
Clazz.overrideMethod (c$, "setupPins", 
function () {
this.sizeX = 2;
this.sizeY = 3;
this.pins =  new Array (this.getPostCount ());
this.pins[0] = Clazz.innerTypeInstance (test.Circuit.ChipElm.Pin, this, null, 2, 3, "S");
this.pins[0].output = true;
this.pins[1] = Clazz.innerTypeInstance (test.Circuit.ChipElm.Pin, this, null, 0, 3, "C");
this.pins[1].output = true;
this.pins[2] = Clazz.innerTypeInstance (test.Circuit.ChipElm.Pin, this, null, 0, 2, "A");
this.pins[3] = Clazz.innerTypeInstance (test.Circuit.ChipElm.Pin, this, null, 1, 2, "B");
this.pins[4] = Clazz.innerTypeInstance (test.Circuit.ChipElm.Pin, this, null, 2, 2, "Cin");
});
Clazz.overrideMethod (c$, "getPostCount", 
function () {
return 5;
});
Clazz.overrideMethod (c$, "getVoltageSourceCount", 
function () {
return 2;
});
Clazz.overrideMethod (c$, "execute", 
function () {
this.pins[0].value =  new Boolean (( new Boolean (this.pins[2].value ^ this.pins[3].value).valueOf ()) ^ this.pins[4].value).valueOf ();
this.pins[1].value = (this.pins[2].value && this.pins[3].value) || (this.pins[2].value && this.pins[4].value) || (this.pins[3].value && this.pins[4].value);
});
Clazz.overrideMethod (c$, "getDumpType", 
function () {
return 196;
});
});

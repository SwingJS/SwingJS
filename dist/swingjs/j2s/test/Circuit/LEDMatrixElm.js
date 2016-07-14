Clazz.declarePackage ("test.Circuit");
Clazz.load (["test.Circuit.ChipElm"], "test.Circuit.LEDMatrixElm", ["java.awt.Checkbox", "$.Color", "java.lang.Boolean", "$.Double", "test.Circuit.EditInfo"], function () {
c$ = Clazz.decorateAsClass (function () {
this.negateRows = false;
this.negateColumns = false;
this.colorR = 1.0;
this.colorG = 0.0;
this.colorB = 0.0;
Clazz.instantialize (this, arguments);
}, test.Circuit, "LEDMatrixElm", test.Circuit.ChipElm);
Clazz.makeConstructor (c$, 
function (xa, ya, xb, yb, f, st) {
Clazz.superConstructor (this, test.Circuit.LEDMatrixElm, [xa, ya, xb, yb, f, st]);
this.negateRows =  new Boolean (st.nextToken ()).booleanValue ();
this.negateColumns =  new Boolean (st.nextToken ()).booleanValue ();
this.colorR =  new Double (st.nextToken ()).doubleValue ();
this.colorG =  new Double (st.nextToken ()).doubleValue ();
this.colorB =  new Double (st.nextToken ()).doubleValue ();
}, "~N,~N,~N,~N,~N,java.util.StringTokenizer");
Clazz.overrideMethod (c$, "getChipName", 
function () {
return "LED Matrix";
});
Clazz.overrideMethod (c$, "setupPins", 
function () {
this.sizeX = 8;
this.sizeY = 8;
this.pins =  new Array (16);
this.pins[0] = Clazz.innerTypeInstance (test.Circuit.ChipElm.Pin, this, null, 0, 2, "");
this.pins[1] = Clazz.innerTypeInstance (test.Circuit.ChipElm.Pin, this, null, 1, 2, "");
this.pins[2] = Clazz.innerTypeInstance (test.Circuit.ChipElm.Pin, this, null, 2, 2, "");
this.pins[3] = Clazz.innerTypeInstance (test.Circuit.ChipElm.Pin, this, null, 3, 2, "");
this.pins[4] = Clazz.innerTypeInstance (test.Circuit.ChipElm.Pin, this, null, 4, 2, "");
this.pins[5] = Clazz.innerTypeInstance (test.Circuit.ChipElm.Pin, this, null, 5, 2, "");
this.pins[6] = Clazz.innerTypeInstance (test.Circuit.ChipElm.Pin, this, null, 6, 2, "");
this.pins[7] = Clazz.innerTypeInstance (test.Circuit.ChipElm.Pin, this, null, 7, 2, "");
this.pins[8] = Clazz.innerTypeInstance (test.Circuit.ChipElm.Pin, this, null, 0, 1, "");
this.pins[9] = Clazz.innerTypeInstance (test.Circuit.ChipElm.Pin, this, null, 1, 1, "");
this.pins[10] = Clazz.innerTypeInstance (test.Circuit.ChipElm.Pin, this, null, 2, 1, "");
this.pins[11] = Clazz.innerTypeInstance (test.Circuit.ChipElm.Pin, this, null, 3, 1, "");
this.pins[12] = Clazz.innerTypeInstance (test.Circuit.ChipElm.Pin, this, null, 4, 1, "");
this.pins[13] = Clazz.innerTypeInstance (test.Circuit.ChipElm.Pin, this, null, 5, 1, "");
this.pins[14] = Clazz.innerTypeInstance (test.Circuit.ChipElm.Pin, this, null, 6, 1, "");
this.pins[15] = Clazz.innerTypeInstance (test.Circuit.ChipElm.Pin, this, null, 7, 1, "");
});
Clazz.overrideMethod (c$, "draw", 
function (g) {
this.drawChip (g);
var color =  new java.awt.Color (Clazz.doubleToInt (this.colorR * 255), Clazz.doubleToInt (this.colorG * 255), Clazz.doubleToInt (this.colorB * 255));
for (var col = 0; col < 8; col++) for (var row = 0; row < 8; row++) {
var centreX = this.x + 2 * (col + 1) * this.cspc;
var centreY = this.y + 2 * row * this.cspc;
var radius = Clazz.doubleToInt (this.cspc / 2);
if (( new Boolean (this.negateRows ^ this.pins[row].value).valueOf ()) && ( new Boolean (this.negateColumns ^ this.pins[col + 8].value).valueOf ())) {
g.setColor (color);
g.fillOval (centreX - radius, centreY - radius, radius * 2, radius * 2);
}g.setColor (java.awt.Color.gray);
radius = Clazz.doubleToInt ((3 * this.cspc) / 4);
test.Circuit.CircuitElm.drawThickCircle (g, centreX, centreY, radius);
}

}, "java.awt.Graphics");
Clazz.defineMethod (c$, "getEditInfo", 
function (n) {
if (n == 2) {
var ei =  new test.Circuit.EditInfo ("", 0, -1, -1);
ei.checkbox =  new java.awt.Checkbox ("Negate rows", this.negateRows);
return ei;
}if (n == 3) {
var ei =  new test.Circuit.EditInfo ("", 0, -1, -1);
ei.checkbox =  new java.awt.Checkbox ("Negate columns", this.negateColumns);
return ei;
}if (n == 4) {
return  new test.Circuit.EditInfo ("Red Value (0-1)", this.colorR, 0, 1).setDimensionless ();
}if (n == 5) {
return  new test.Circuit.EditInfo ("Green Value (0-1)", this.colorG, 0, 1).setDimensionless ();
}if (n == 6) {
return  new test.Circuit.EditInfo ("Blue Value (0-1)", this.colorB, 0, 1).setDimensionless ();
}return Clazz.superCall (this, test.Circuit.LEDMatrixElm, "getEditInfo", [n]);
}, "~N");
Clazz.defineMethod (c$, "setEditValue", 
function (n, ei) {
Clazz.superCall (this, test.Circuit.LEDMatrixElm, "setEditValue", [n, ei]);
if (n == 2) this.negateRows = ei.checkbox.getState ();
if (n == 3) this.negateColumns = ei.checkbox.getState ();
if (n == 4) this.colorR = ei.value;
if (n == 5) this.colorG = ei.value;
if (n == 6) this.colorB = ei.value;
}, "~N,test.Circuit.EditInfo");
Clazz.overrideMethod (c$, "getPostCount", 
function () {
return 16;
});
Clazz.overrideMethod (c$, "getVoltageSourceCount", 
function () {
return 0;
});
Clazz.overrideMethod (c$, "getDumpType", 
function () {
return 207;
});
Clazz.defineMethod (c$, "dump", 
function () {
return Clazz.superCall (this, test.Circuit.LEDMatrixElm, "dump", []) + " " + this.negateRows + " " + this.negateColumns + " " + this.colorR + " " + this.colorG + " " + this.colorB;
});
Clazz.defineStatics (c$,
"size", 8,
"resistance", 100);
});

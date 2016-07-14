Clazz.declarePackage ("test.Circuit");
Clazz.load (["test.Circuit.CircuitElm"], "test.Circuit.WireElm", ["java.awt.Checkbox", "test.Circuit.EditInfo"], function () {
c$ = Clazz.declareType (test.Circuit, "WireElm", test.Circuit.CircuitElm);
Clazz.makeConstructor (c$, 
function (xa, ya, xb, yb, f, st) {
Clazz.superConstructor (this, test.Circuit.WireElm, [xa, ya, xb, yb, f]);
}, "~N,~N,~N,~N,~N,java.util.StringTokenizer");
Clazz.overrideMethod (c$, "draw", 
function (g) {
this.setVoltageColor (g, this.volts[0]);
test.Circuit.CircuitElm.drawThickLine (g, this.point1, this.point2);
this.doDots (g);
this.setBbox (this.point1, this.point2, 3);
if (this.mustShowCurrent ()) {
var s = test.Circuit.CircuitElm.getShortUnitText (Math.abs (this.getCurrent ()), "A");
this.drawValues (g, s, 4);
} else if (this.mustShowVoltage ()) {
var s = test.Circuit.CircuitElm.getShortUnitText (this.volts[0], "V");
this.drawValues (g, s, 4);
}this.drawPosts (g);
}, "java.awt.Graphics");
Clazz.overrideMethod (c$, "stamp", 
function () {
test.Circuit.CircuitElm.sim.stampVoltageSource (this.nodes[0], this.nodes[1], this.voltSource, 0);
});
Clazz.defineMethod (c$, "mustShowCurrent", 
function () {
return (this.flags & 1) != 0;
});
Clazz.defineMethod (c$, "mustShowVoltage", 
function () {
return (this.flags & 2) != 0;
});
Clazz.overrideMethod (c$, "getVoltageSourceCount", 
function () {
return 1;
});
Clazz.overrideMethod (c$, "getInfo", 
function (arr) {
arr[0] = "wire";
arr[1] = "I = " + test.Circuit.CircuitElm.getCurrentDText (this.getCurrent ());
arr[2] = "V = " + test.Circuit.CircuitElm.getVoltageText (this.volts[0]);
}, "~A");
Clazz.overrideMethod (c$, "getDumpType", 
function () {
return 'w';
});
Clazz.overrideMethod (c$, "getPower", 
function () {
return 0;
});
Clazz.overrideMethod (c$, "getVoltageDiff", 
function () {
return this.volts[0];
});
Clazz.overrideMethod (c$, "isWire", 
function () {
return true;
});
Clazz.overrideMethod (c$, "getEditInfo", 
function (n) {
if (n == 0) {
var ei =  new test.Circuit.EditInfo ("", 0, -1, -1);
ei.checkbox =  new java.awt.Checkbox ("Show Current", this.mustShowCurrent ());
return ei;
}if (n == 1) {
var ei =  new test.Circuit.EditInfo ("", 0, -1, -1);
ei.checkbox =  new java.awt.Checkbox ("Show Voltage", this.mustShowVoltage ());
return ei;
}return null;
}, "~N");
Clazz.overrideMethod (c$, "setEditValue", 
function (n, ei) {
if (n == 0) {
if (ei.checkbox.getState ()) this.flags = 1;
 else this.flags &= -2;
}if (n == 1) {
if (ei.checkbox.getState ()) this.flags = 2;
 else this.flags &= -3;
}}, "~N,test.Circuit.EditInfo");
Clazz.overrideMethod (c$, "getShortcut", 
function () {
return 'w';
});
Clazz.defineStatics (c$,
"FLAG_SHOWCURRENT", 1,
"FLAG_SHOWVOLTAGE", 2);
});

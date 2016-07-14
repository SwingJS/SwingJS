Clazz.declarePackage ("test.Circuit");
Clazz.load (["test.Circuit.CircuitElm"], "test.Circuit.LogicOutputElm", ["java.awt.Checkbox", "$.Font", "java.lang.Double", "test.Circuit.EditInfo"], function () {
c$ = Clazz.decorateAsClass (function () {
this.FLAG_TERNARY = 1;
this.FLAG_NUMERIC = 2;
this.FLAG_PULLDOWN = 4;
this.threshold = 0;
this.value = null;
Clazz.instantialize (this, arguments);
}, test.Circuit, "LogicOutputElm", test.Circuit.CircuitElm);
Clazz.makeConstructor (c$, 
function (xx, yy) {
Clazz.superConstructor (this, test.Circuit.LogicOutputElm, [xx, yy]);
this.threshold = 2.5;
}, "~N,~N");
Clazz.makeConstructor (c$, 
function (xa, ya, xb, yb, f, st) {
Clazz.superConstructor (this, test.Circuit.LogicOutputElm, [xa, ya, xb, yb, f]);
try {
this.threshold =  new Double (st.nextToken ()).doubleValue ();
} catch (e) {
if (Clazz.exceptionOf (e, Exception)) {
this.threshold = 2.5;
} else {
throw e;
}
}
}, "~N,~N,~N,~N,~N,java.util.StringTokenizer");
Clazz.defineMethod (c$, "dump", 
function () {
return Clazz.superCall (this, test.Circuit.LogicOutputElm, "dump", []) + " " + this.threshold;
});
Clazz.overrideMethod (c$, "getDumpType", 
function () {
return 'M';
});
Clazz.overrideMethod (c$, "getPostCount", 
function () {
return 1;
});
Clazz.defineMethod (c$, "isTernary", 
function () {
return (this.flags & 1) != 0;
});
Clazz.defineMethod (c$, "isNumeric", 
function () {
return (this.flags & (3)) != 0;
});
Clazz.defineMethod (c$, "needsPullDown", 
function () {
return (this.flags & 4) != 0;
});
Clazz.defineMethod (c$, "setPoints", 
function () {
Clazz.superCall (this, test.Circuit.LogicOutputElm, "setPoints", []);
this.lead1 = this.interpPoint (this.point1, this.point2, 1 - 12 / this.dn);
});
Clazz.overrideMethod (c$, "draw", 
function (g) {
var f =  new java.awt.Font ("SansSerif", 1, 20);
g.setFont (f);
g.setColor (test.Circuit.CircuitElm.lightGrayColor);
var s = (this.volts[0] < this.threshold) ? "L" : "H";
if (this.isTernary ()) {
if (this.volts[0] > 3.75) s = "2";
 else if (this.volts[0] > 1.25) s = "1";
 else s = "0";
} else if (this.isNumeric ()) s = (this.volts[0] < this.threshold) ? "0" : "1";
this.value = s;
this.setBbox (this.point1, this.lead1, 0);
this.drawCenteredText (g, s, this.x2, this.y2, true);
this.setVoltageColor (g, this.volts[0]);
test.Circuit.CircuitElm.drawThickLine (g, this.point1, this.lead1);
this.drawPosts (g);
}, "java.awt.Graphics");
Clazz.overrideMethod (c$, "stamp", 
function () {
if (this.needsPullDown ()) test.Circuit.CircuitElm.sim.stampResistor (this.nodes[0], 0, 1e6);
});
Clazz.overrideMethod (c$, "getVoltageDiff", 
function () {
return this.volts[0];
});
Clazz.overrideMethod (c$, "getInfo", 
function (arr) {
arr[0] = "logic output";
arr[1] = (this.volts[0] < this.threshold) ? "low" : "high";
if (this.isNumeric ()) arr[1] = this.value;
arr[2] = "V = " + test.Circuit.CircuitElm.getVoltageText (this.volts[0]);
}, "~A");
Clazz.overrideMethod (c$, "getEditInfo", 
function (n) {
if (n == 0) return  new test.Circuit.EditInfo ("Threshold", this.threshold, 10, -10);
if (n == 1) {
var ei =  new test.Circuit.EditInfo ("", 0, -1, -1);
ei.checkbox =  new java.awt.Checkbox ("Current Required", this.needsPullDown ());
return ei;
}return null;
}, "~N");
Clazz.overrideMethod (c$, "setEditValue", 
function (n, ei) {
if (n == 0) this.threshold = ei.value;
if (n == 1) {
if (ei.checkbox.getState ()) this.flags = 4;
 else this.flags &= -5;
}}, "~N,test.Circuit.EditInfo");
Clazz.overrideMethod (c$, "getShortcut", 
function () {
return 'o';
});
});

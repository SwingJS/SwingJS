Clazz.declarePackage ("test.Circuit");
Clazz.load (["test.Circuit.CircuitElm"], "test.Circuit.OutputElm", ["java.awt.Checkbox", "$.Font", "$.Point", "test.Circuit.EditInfo"], function () {
c$ = Clazz.decorateAsClass (function () {
this.FLAG_VALUE = 1;
Clazz.instantialize (this, arguments);
}, test.Circuit, "OutputElm", test.Circuit.CircuitElm);
Clazz.makeConstructor (c$, 
function (xa, ya, xb, yb, f, st) {
Clazz.superConstructor (this, test.Circuit.OutputElm, [xa, ya, xb, yb, f]);
}, "~N,~N,~N,~N,~N,java.util.StringTokenizer");
Clazz.overrideMethod (c$, "getDumpType", 
function () {
return 'O';
});
Clazz.overrideMethod (c$, "getPostCount", 
function () {
return 1;
});
Clazz.defineMethod (c$, "setPoints", 
function () {
Clazz.superCall (this, test.Circuit.OutputElm, "setPoints", []);
this.lead1 =  new java.awt.Point ();
});
Clazz.overrideMethod (c$, "draw", 
function (g) {
var selected = (this.needsHighlight () || test.Circuit.CircuitElm.sim.plotYElm === this);
var f =  new java.awt.Font ("SansSerif", selected ? 1 : 0, 14);
g.setFont (f);
g.setColor (selected ? test.Circuit.CircuitElm.selectColor : test.Circuit.CircuitElm.whiteColor);
var s = (this.flags & 1) != 0 ? test.Circuit.CircuitElm.getVoltageText (this.volts[0]) : "out";
var fm = g.getFontMetrics ();
if (this === test.Circuit.CircuitElm.sim.plotXElm) s = "X";
if (this === test.Circuit.CircuitElm.sim.plotYElm) s = "Y";
this.interpPoint (this.point1, this.point2, this.lead1, 1 - (Clazz.doubleToInt (fm.stringWidth (s) / 2) + 8) / this.dn);
this.setBbox (this.point1, this.lead1, 0);
this.drawCenteredText (g, s, this.x2, this.y2, true);
this.setVoltageColor (g, this.volts[0]);
if (selected) g.setColor (test.Circuit.CircuitElm.selectColor);
test.Circuit.CircuitElm.drawThickLine (g, this.point1, this.lead1);
this.drawPosts (g);
}, "java.awt.Graphics");
Clazz.overrideMethod (c$, "getVoltageDiff", 
function () {
return this.volts[0];
});
Clazz.overrideMethod (c$, "getInfo", 
function (arr) {
arr[0] = "output";
arr[1] = "V = " + test.Circuit.CircuitElm.getVoltageText (this.volts[0]);
}, "~A");
Clazz.overrideMethod (c$, "getEditInfo", 
function (n) {
if (n == 0) {
var ei =  new test.Circuit.EditInfo ("", 0, -1, -1);
ei.checkbox =  new java.awt.Checkbox ("Show Voltage", (this.flags & 1) != 0);
return ei;
}return null;
}, "~N");
Clazz.overrideMethod (c$, "setEditValue", 
function (n, ei) {
if (n == 0) this.flags = (ei.checkbox.getState ()) ? (this.flags | 1) : (this.flags & -2);
}, "~N,test.Circuit.EditInfo");
});

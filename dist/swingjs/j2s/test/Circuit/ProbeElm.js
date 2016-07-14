Clazz.declarePackage ("test.Circuit");
Clazz.load (["test.Circuit.CircuitElm"], "test.Circuit.ProbeElm", ["java.awt.Checkbox", "$.Font", "test.Circuit.EditInfo"], function () {
c$ = Clazz.decorateAsClass (function () {
this.center = null;
Clazz.instantialize (this, arguments);
}, test.Circuit, "ProbeElm", test.Circuit.CircuitElm);
Clazz.makeConstructor (c$, 
function (xa, ya, xb, yb, f, st) {
Clazz.superConstructor (this, test.Circuit.ProbeElm, [xa, ya, xb, yb, f]);
}, "~N,~N,~N,~N,~N,java.util.StringTokenizer");
Clazz.overrideMethod (c$, "getDumpType", 
function () {
return 'p';
});
Clazz.defineMethod (c$, "setPoints", 
function () {
Clazz.superCall (this, test.Circuit.ProbeElm, "setPoints", []);
if (this.point2.y < this.point1.y) {
var x = this.point1;
this.point1 = this.point2;
this.point2 = x;
}this.center = this.interpPoint (this.point1, this.point2, .5);
});
Clazz.overrideMethod (c$, "draw", 
function (g) {
var hs = 8;
this.setBbox (this.point1, this.point2, hs);
var selected = (this.needsHighlight () || test.Circuit.CircuitElm.sim.plotYElm === this);
var len = (selected || test.Circuit.CircuitElm.sim.dragElm === this) ? 16 : this.dn - 32;
this.calcLeads (Clazz.doubleToInt (len));
this.setVoltageColor (g, this.volts[0]);
if (selected) g.setColor (test.Circuit.CircuitElm.selectColor);
test.Circuit.CircuitElm.drawThickLine (g, this.point1, this.lead1);
this.setVoltageColor (g, this.volts[1]);
if (selected) g.setColor (test.Circuit.CircuitElm.selectColor);
test.Circuit.CircuitElm.drawThickLine (g, this.lead2, this.point2);
var f =  new java.awt.Font ("SansSerif", 1, 14);
g.setFont (f);
if (this === test.Circuit.CircuitElm.sim.plotXElm) this.drawCenteredText (g, "X", this.center.x, this.center.y, true);
if (this === test.Circuit.CircuitElm.sim.plotYElm) this.drawCenteredText (g, "Y", this.center.x, this.center.y, true);
if (this.mustShowVoltage ()) {
var s = test.Circuit.CircuitElm.getShortUnitText (this.volts[0], "V");
this.drawValues (g, s, 4);
}this.drawPosts (g);
}, "java.awt.Graphics");
Clazz.defineMethod (c$, "mustShowVoltage", 
function () {
return (this.flags & 1) != 0;
});
Clazz.overrideMethod (c$, "getInfo", 
function (arr) {
arr[0] = "scope probe";
arr[1] = "Vd = " + test.Circuit.CircuitElm.getVoltageText (this.getVoltageDiff ());
}, "~A");
Clazz.overrideMethod (c$, "getConnection", 
function (n1, n2) {
return false;
}, "~N,~N");
Clazz.overrideMethod (c$, "getEditInfo", 
function (n) {
if (n == 0) {
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
}}, "~N,test.Circuit.EditInfo");
Clazz.defineStatics (c$,
"FLAG_SHOWVOLTAGE", 1);
});

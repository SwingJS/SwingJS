Clazz.declarePackage ("test.Circuit");
Clazz.load (["test.Circuit.GateElm"], "test.Circuit.OrGateElm", ["java.awt.Point"], function () {
c$ = Clazz.declareType (test.Circuit, "OrGateElm", test.Circuit.GateElm);
Clazz.overrideMethod (c$, "getGateName", 
function () {
return "OR gate";
});
Clazz.defineMethod (c$, "setPoints", 
function () {
Clazz.superCall (this, test.Circuit.OrGateElm, "setPoints", []);
var triPoints = this.newPointArray (38);
if (Clazz.instanceOf (this, test.Circuit.XorGateElm)) this.linePoints =  new Array (5);
var i;
for (i = 0; i != 16; i++) {
var a = i / 16.;
var b = 1 - a * a;
this.interpPoint2 (this.lead1, this.lead2, triPoints[i], triPoints[32 - i], .5 + a / 2, b * this.hs2);
}
var ww2 = (this.ww == 0) ? this.dn * 2 : this.ww * 2;
for (i = 0; i != 5; i++) {
var a = (i - 2) / 2.;
var b = 4 * (1 - a * a) - 2;
this.interpPoint (this.lead1, this.lead2, triPoints[33 + i], b / (ww2), a * this.hs2);
if (Clazz.instanceOf (this, test.Circuit.XorGateElm)) this.linePoints[i] = this.interpPoint (this.lead1, this.lead2, (b - 5) / (ww2), a * this.hs2);
}
triPoints[16] =  new java.awt.Point (this.lead2);
if (this.isInverting ()) {
this.pcircle = this.interpPoint (this.point1, this.point2, .5 + (this.ww + 4) / this.dn);
this.lead2 = this.interpPoint (this.point1, this.point2, .5 + (this.ww + 8) / this.dn);
}this.gatePoly = this.createPolygon (triPoints);
});
Clazz.overrideMethod (c$, "calcFunction", 
function () {
var i;
var f = false;
for (i = 0; i != this.inputCount; i++) f = new Boolean (f | this.getInput (i)).valueOf ();

return f;
});
Clazz.overrideMethod (c$, "getDumpType", 
function () {
return 152;
});
Clazz.overrideMethod (c$, "getShortcut", 
function () {
return '3';
});
});

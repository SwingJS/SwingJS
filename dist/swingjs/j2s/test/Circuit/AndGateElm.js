Clazz.declarePackage ("test.Circuit");
Clazz.load (["test.Circuit.GateElm"], "test.Circuit.AndGateElm", ["java.awt.Point"], function () {
c$ = Clazz.declareType (test.Circuit, "AndGateElm", test.Circuit.GateElm);
Clazz.defineMethod (c$, "setPoints", 
function () {
Clazz.superCall (this, test.Circuit.AndGateElm, "setPoints", []);
var triPoints = this.newPointArray (23);
this.interpPoint2 (this.lead1, this.lead2, triPoints[0], triPoints[22], 0, this.hs2);
var i;
for (i = 0; i != 10; i++) {
var a = i * .1;
var b = Math.sqrt (1 - a * a);
this.interpPoint2 (this.lead1, this.lead2, triPoints[i + 1], triPoints[21 - i], .5 + a / 2, b * this.hs2);
}
triPoints[11] =  new java.awt.Point (this.lead2);
if (this.isInverting ()) {
this.pcircle = this.interpPoint (this.point1, this.point2, .5 + (this.ww + 4) / this.dn);
this.lead2 = this.interpPoint (this.point1, this.point2, .5 + (this.ww + 8) / this.dn);
}this.gatePoly = this.createPolygon (triPoints);
});
Clazz.overrideMethod (c$, "getGateName", 
function () {
return "AND gate";
});
Clazz.overrideMethod (c$, "calcFunction", 
function () {
var i;
var f = true;
for (i = 0; i != this.inputCount; i++) f = new Boolean (f & this.getInput (i)).valueOf ();

return f;
});
Clazz.overrideMethod (c$, "getDumpType", 
function () {
return 150;
});
Clazz.overrideMethod (c$, "getShortcut", 
function () {
return '2';
});
});

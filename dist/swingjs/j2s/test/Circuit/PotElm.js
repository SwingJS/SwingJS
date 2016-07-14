Clazz.declarePackage ("test.Circuit");
Clazz.load (["java.awt.event.AdjustmentListener", "test.Circuit.CircuitElm"], "test.Circuit.PotElm", ["java.awt.Label", "$.Point", "$.Scrollbar", "java.lang.Double", "test.Circuit.CirSim", "$.EditInfo"], function () {
c$ = Clazz.decorateAsClass (function () {
this.position = 0;
this.maxResistance = 0;
this.resistance1 = 0;
this.resistance2 = 0;
this.current1 = 0;
this.current2 = 0;
this.current3 = 0;
this.curcount1 = 0;
this.curcount2 = 0;
this.curcount3 = 0;
this.slider = null;
this.label = null;
this.sliderText = null;
this.post3 = null;
this.corner2 = null;
this.arrowPoint = null;
this.midpoint = null;
this.arrow1 = null;
this.arrow2 = null;
this.ps3 = null;
this.ps4 = null;
this.bodyLen = 0;
Clazz.instantialize (this, arguments);
}, test.Circuit, "PotElm", test.Circuit.CircuitElm, java.awt.event.AdjustmentListener);
Clazz.makeConstructor (c$, 
function (xx, yy) {
Clazz.superConstructor (this, test.Circuit.PotElm, [xx, yy]);
this.setup ();
this.maxResistance = 1000;
this.position = .5;
this.sliderText = "Resistance";
this.createSlider ();
}, "~N,~N");
Clazz.makeConstructor (c$, 
function (xa, ya, xb, yb, f, st) {
Clazz.superConstructor (this, test.Circuit.PotElm, [xa, ya, xb, yb, f]);
this.maxResistance =  new Double (st.nextToken ()).doubleValue ();
this.position =  new Double (st.nextToken ()).doubleValue ();
this.sliderText = st.nextToken ();
while (st.hasMoreTokens ()) this.sliderText += ' ' + st.nextToken ();

this.createSlider ();
}, "~N,~N,~N,~N,~N,java.util.StringTokenizer");
Clazz.defineMethod (c$, "setup", 
function () {
});
Clazz.overrideMethod (c$, "getPostCount", 
function () {
return 3;
});
Clazz.overrideMethod (c$, "getDumpType", 
function () {
return 174;
});
Clazz.overrideMethod (c$, "getPost", 
function (n) {
return (n == 0) ? this.point1 : (n == 1) ? this.point2 : this.post3;
}, "~N");
Clazz.defineMethod (c$, "dump", 
function () {
return Clazz.superCall (this, test.Circuit.PotElm, "dump", []) + " " + this.maxResistance + " " + this.position + " " + this.sliderText;
});
Clazz.defineMethod (c$, "createSlider", 
function () {
test.Circuit.CirSim.main.add (this.label =  new java.awt.Label (this.sliderText, 1));
var value = Clazz.doubleToInt (this.position * 100);
test.Circuit.CirSim.main.add (this.slider =  new java.awt.Scrollbar (0, value, 1, 0, 101));
test.Circuit.CirSim.main.validate ();
this.slider.addAdjustmentListener (this);
});
Clazz.overrideMethod (c$, "adjustmentValueChanged", 
function (e) {
test.Circuit.CircuitElm.sim.analyzeFlag = true;
this.setPoints ();
}, "java.awt.event.AdjustmentEvent");
Clazz.overrideMethod (c$, "$delete", 
function () {
test.Circuit.CirSim.main.remove (this.label);
test.Circuit.CirSim.main.remove (this.slider);
});
Clazz.defineMethod (c$, "setPoints", 
function () {
Clazz.superCall (this, test.Circuit.PotElm, "setPoints", []);
var offset = 0;
if (test.Circuit.CircuitElm.abs (this.dx) > test.Circuit.CircuitElm.abs (this.dy)) {
this.dx = test.Circuit.CircuitElm.sim.snapGrid (Clazz.doubleToInt (this.dx / 2)) * 2;
this.point2.x = this.x2 = this.point1.x + this.dx;
offset = (this.dx < 0) ? this.dy : -this.dy;
this.point2.y = this.point1.y;
} else {
this.dy = test.Circuit.CircuitElm.sim.snapGrid (Clazz.doubleToInt (this.dy / 2)) * 2;
this.point2.y = this.y2 = this.point1.y + this.dy;
offset = (this.dy > 0) ? this.dx : -this.dx;
this.point2.x = this.point1.x;
}if (offset == 0) offset = test.Circuit.CircuitElm.sim.gridSize;
this.dn = test.Circuit.CircuitElm.distance (this.point1, this.point2);
var bodyLen = 32;
this.calcLeads (bodyLen);
this.position = this.slider.getValue () * .0099 + .005;
var soff = Clazz.doubleToInt ((this.position - .5) * bodyLen);
this.post3 = this.interpPoint (this.point1, this.point2, .5, offset);
this.corner2 = this.interpPoint (this.point1, this.point2, soff / this.dn + .5, offset);
this.arrowPoint = this.interpPoint (this.point1, this.point2, soff / this.dn + .5, 8 * test.Circuit.CircuitElm.sign (offset));
this.midpoint = this.interpPoint (this.point1, this.point2, soff / this.dn + .5);
this.arrow1 =  new java.awt.Point ();
this.arrow2 =  new java.awt.Point ();
var clen = test.Circuit.CircuitElm.abs (offset) - 8;
this.interpPoint2 (this.corner2, this.arrowPoint, this.arrow1, this.arrow2, (clen - 8) / clen, 8);
this.ps3 =  new java.awt.Point ();
this.ps4 =  new java.awt.Point ();
});
Clazz.overrideMethod (c$, "draw", 
function (g) {
var segments = 16;
var i;
var ox = 0;
var hs = test.Circuit.CircuitElm.sim.euroResistorCheckItem.getState () ? 6 : 8;
var v1 = this.volts[0];
var v2 = this.volts[1];
var v3 = this.volts[2];
this.setBbox (this.point1, this.point2, hs);
this.draw2Leads (g);
this.setPowerColor (g, true);
var segf = 1. / segments;
var divide = Clazz.doubleToInt (segments * this.position);
if (!test.Circuit.CircuitElm.sim.euroResistorCheckItem.getState ()) {
for (i = 0; i != segments; i++) {
var nx = 0;
switch (i & 3) {
case 0:
nx = 1;
break;
case 2:
nx = -1;
break;
default:
nx = 0;
break;
}
var v = v1 + (v3 - v1) * i / divide;
if (i >= divide) v = v3 + (v2 - v3) * (i - divide) / (segments - divide);
this.setVoltageColor (g, v);
this.interpPoint (this.lead1, this.lead2, test.Circuit.CircuitElm.ps1, i * segf, hs * ox);
this.interpPoint (this.lead1, this.lead2, test.Circuit.CircuitElm.ps2, (i + 1) * segf, hs * nx);
test.Circuit.CircuitElm.drawThickLine (g, test.Circuit.CircuitElm.ps1, test.Circuit.CircuitElm.ps2);
ox = nx;
}
} else {
this.setVoltageColor (g, v1);
this.interpPoint2 (this.lead1, this.lead2, test.Circuit.CircuitElm.ps1, test.Circuit.CircuitElm.ps2, 0, hs);
test.Circuit.CircuitElm.drawThickLine (g, test.Circuit.CircuitElm.ps1, test.Circuit.CircuitElm.ps2);
for (i = 0; i != segments; i++) {
var v = v1 + (v3 - v1) * i / divide;
if (i >= divide) v = v3 + (v2 - v3) * (i - divide) / (segments - divide);
this.setVoltageColor (g, v);
this.interpPoint2 (this.lead1, this.lead2, test.Circuit.CircuitElm.ps1, test.Circuit.CircuitElm.ps2, i * segf, hs);
this.interpPoint2 (this.lead1, this.lead2, this.ps3, this.ps4, (i + 1) * segf, hs);
test.Circuit.CircuitElm.drawThickLine (g, test.Circuit.CircuitElm.ps1, this.ps3);
test.Circuit.CircuitElm.drawThickLine (g, test.Circuit.CircuitElm.ps2, this.ps4);
}
this.interpPoint2 (this.lead1, this.lead2, test.Circuit.CircuitElm.ps1, test.Circuit.CircuitElm.ps2, 1, hs);
test.Circuit.CircuitElm.drawThickLine (g, test.Circuit.CircuitElm.ps1, test.Circuit.CircuitElm.ps2);
}this.setVoltageColor (g, v3);
test.Circuit.CircuitElm.drawThickLine (g, this.post3, this.corner2);
test.Circuit.CircuitElm.drawThickLine (g, this.corner2, this.arrowPoint);
test.Circuit.CircuitElm.drawThickLine (g, this.arrow1, this.arrowPoint);
test.Circuit.CircuitElm.drawThickLine (g, this.arrow2, this.arrowPoint);
this.curcount1 = this.updateDotCount (this.current1, this.curcount1);
this.curcount2 = this.updateDotCount (this.current2, this.curcount2);
this.curcount3 = this.updateDotCount (this.current3, this.curcount3);
if (test.Circuit.CircuitElm.sim.dragElm !== this) {
this.drawDots (g, this.point1, this.midpoint, this.curcount1);
this.drawDots (g, this.point2, this.midpoint, this.curcount2);
this.drawDots (g, this.post3, this.corner2, this.curcount3);
this.drawDots (g, this.corner2, this.midpoint, this.curcount3 + test.Circuit.CircuitElm.distance (this.post3, this.corner2));
}this.drawPosts (g);
}, "java.awt.Graphics");
Clazz.overrideMethod (c$, "calculateCurrent", 
function () {
this.current1 = (this.volts[0] - this.volts[2]) / this.resistance1;
this.current2 = (this.volts[1] - this.volts[2]) / this.resistance2;
this.current3 = -this.current1 - this.current2;
});
Clazz.overrideMethod (c$, "stamp", 
function () {
this.resistance1 = this.maxResistance * this.position;
this.resistance2 = this.maxResistance * (1 - this.position);
test.Circuit.CircuitElm.sim.stampResistor (this.nodes[0], this.nodes[2], this.resistance1);
test.Circuit.CircuitElm.sim.stampResistor (this.nodes[2], this.nodes[1], this.resistance2);
});
Clazz.overrideMethod (c$, "getInfo", 
function (arr) {
arr[0] = "potentiometer";
arr[1] = "Vd = " + test.Circuit.CircuitElm.getVoltageDText (this.getVoltageDiff ());
arr[2] = "R1 = " + test.Circuit.CircuitElm.getUnitText (this.resistance1, test.Circuit.CirSim.ohmString);
arr[3] = "R2 = " + test.Circuit.CircuitElm.getUnitText (this.resistance2, test.Circuit.CirSim.ohmString);
arr[4] = "I1 = " + test.Circuit.CircuitElm.getCurrentDText (this.current1);
arr[5] = "I2 = " + test.Circuit.CircuitElm.getCurrentDText (this.current2);
}, "~A");
Clazz.overrideMethod (c$, "getEditInfo", 
function (n) {
if (n == 0) return  new test.Circuit.EditInfo ("Resistance (ohms)", this.maxResistance, 0, 0);
if (n == 1) {
var ei =  new test.Circuit.EditInfo ("Slider Text", 0, -1, -1);
ei.text = this.sliderText;
return ei;
}return null;
}, "~N");
Clazz.overrideMethod (c$, "setEditValue", 
function (n, ei) {
if (n == 0) this.maxResistance = ei.value;
if (n == 1) {
this.sliderText = ei.textf.getText ();
this.label.setText (this.sliderText);
}}, "~N,test.Circuit.EditInfo");
});

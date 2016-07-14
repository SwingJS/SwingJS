Clazz.declarePackage ("test.Circuit");
Clazz.load (["test.Circuit.CircuitElm"], "test.Circuit.LampElm", ["java.awt.Color", "java.lang.Double", "test.Circuit.CirSim", "$.EditInfo"], function () {
c$ = Clazz.decorateAsClass (function () {
this.resistance = 0;
this.roomTemp = 300;
this.temp = 0;
this.nom_pow = 0;
this.nom_v = 0;
this.warmTime = 0;
this.coolTime = 0;
this.bulbLead = null;
this.filament = null;
this.bulb = null;
this.bulbR = 0;
this.filament_len = 24;
Clazz.instantialize (this, arguments);
}, test.Circuit, "LampElm", test.Circuit.CircuitElm);
Clazz.makeConstructor (c$, 
function (xx, yy) {
Clazz.superConstructor (this, test.Circuit.LampElm, [xx, yy]);
this.temp = 300.0;
this.nom_pow = 100;
this.nom_v = 120;
this.warmTime = .4;
this.coolTime = .4;
}, "~N,~N");
Clazz.makeConstructor (c$, 
function (xa, ya, xb, yb, f, st) {
Clazz.superConstructor (this, test.Circuit.LampElm, [xa, ya, xb, yb, f]);
this.temp =  new Double (st.nextToken ()).doubleValue ();
this.nom_pow =  new Double (st.nextToken ()).doubleValue ();
this.nom_v =  new Double (st.nextToken ()).doubleValue ();
this.warmTime =  new Double (st.nextToken ()).doubleValue ();
this.coolTime =  new Double (st.nextToken ()).doubleValue ();
}, "~N,~N,~N,~N,~N,java.util.StringTokenizer");
Clazz.defineMethod (c$, "dump", 
function () {
return Clazz.superCall (this, test.Circuit.LampElm, "dump", []) + " " + this.temp + " " + this.nom_pow + " " + this.nom_v + " " + this.warmTime + " " + this.coolTime;
});
Clazz.overrideMethod (c$, "getDumpType", 
function () {
return 181;
});
Clazz.defineMethod (c$, "reset", 
function () {
Clazz.superCall (this, test.Circuit.LampElm, "reset", []);
this.temp = 300.0;
});
Clazz.defineMethod (c$, "setPoints", 
function () {
Clazz.superCall (this, test.Circuit.LampElm, "setPoints", []);
var llen = 16;
this.calcLeads (llen);
this.bulbLead = this.newPointArray (2);
this.filament = this.newPointArray (2);
this.bulbR = 20;
this.filament[0] = this.interpPoint (this.lead1, this.lead2, 0, 24);
this.filament[1] = this.interpPoint (this.lead1, this.lead2, 1, 24);
var br = 24 - Math.sqrt (this.bulbR * this.bulbR - llen * llen);
this.bulbLead[0] = this.interpPoint (this.lead1, this.lead2, 0, br);
this.bulbLead[1] = this.interpPoint (this.lead1, this.lead2, 1, br);
this.bulb = this.interpPoint (this.filament[0], this.filament[1], .5);
});
Clazz.defineMethod (c$, "getTempColor", 
function () {
if (this.temp < 1200) {
var x = Clazz.doubleToInt (255 * (this.temp - 800) / 400);
if (x < 0) x = 0;
return  new java.awt.Color (x, 0, 0);
}if (this.temp < 1700) {
var x = Clazz.doubleToInt (255 * (this.temp - 1200) / 500);
if (x < 0) x = 0;
return  new java.awt.Color (255, x, 0);
}if (this.temp < 2400) {
var x = Clazz.doubleToInt (255 * (this.temp - 1700) / 700);
if (x < 0) x = 0;
return  new java.awt.Color (255, 255, x);
}return java.awt.Color.white;
});
Clazz.overrideMethod (c$, "draw", 
function (g) {
var v1 = this.volts[0];
var v2 = this.volts[1];
this.setBbox (this.point1, this.point2, 4);
this.adjustBbox (this.bulb.x - this.bulbR, this.bulb.y - this.bulbR, this.bulb.x + this.bulbR, this.bulb.y + this.bulbR);
this.draw2Leads (g);
this.setPowerColor (g, true);
g.setColor (this.getTempColor ());
g.fillOval (this.bulb.x - this.bulbR, this.bulb.y - this.bulbR, this.bulbR * 2, this.bulbR * 2);
g.setColor (java.awt.Color.white);
test.Circuit.CircuitElm.drawThickCircle (g, this.bulb.x, this.bulb.y, this.bulbR);
this.setVoltageColor (g, v1);
test.Circuit.CircuitElm.drawThickLine (g, this.lead1, this.filament[0]);
this.setVoltageColor (g, v2);
test.Circuit.CircuitElm.drawThickLine (g, this.lead2, this.filament[1]);
this.setVoltageColor (g, (v1 + v2) * .5);
test.Circuit.CircuitElm.drawThickLine (g, this.filament[0], this.filament[1]);
this.updateDotCount ();
if (test.Circuit.CircuitElm.sim.dragElm !== this) {
this.drawDots (g, this.point1, this.lead1, this.curcount);
var cc = this.curcount + (this.dn - 16) / 2;
this.drawDots (g, this.lead1, this.filament[0], cc);
cc += 24;
this.drawDots (g, this.filament[0], this.filament[1], cc);
cc += 16;
this.drawDots (g, this.filament[1], this.lead2, cc);
cc += 24;
this.drawDots (g, this.lead2, this.point2, this.curcount);
}this.drawPosts (g);
}, "java.awt.Graphics");
Clazz.overrideMethod (c$, "calculateCurrent", 
function () {
this.current = (this.volts[0] - this.volts[1]) / this.resistance;
});
Clazz.overrideMethod (c$, "stamp", 
function () {
test.Circuit.CircuitElm.sim.stampNonLinear (this.nodes[0]);
test.Circuit.CircuitElm.sim.stampNonLinear (this.nodes[1]);
});
Clazz.overrideMethod (c$, "nonLinear", 
function () {
return true;
});
Clazz.overrideMethod (c$, "startIteration", 
function () {
var nom_r = this.nom_v * this.nom_v / this.nom_pow;
var tp = (this.temp > 5390) ? 5390 : this.temp;
this.resistance = nom_r * (1.26104 - 4.90662 * Math.sqrt (17.1839 / tp - 0.00318794) - 7.8569 / (tp - 187.56));
var cap = 1.57e-4 * this.nom_pow;
var capw = cap * this.warmTime / .4;
var capc = cap * this.coolTime / .4;
this.temp += this.getPower () * test.Circuit.CircuitElm.sim.timeStep / capw;
var cr = 2600 / this.nom_pow;
this.temp -= test.Circuit.CircuitElm.sim.timeStep * (this.temp - 300.0) / (capc * cr);
});
Clazz.overrideMethod (c$, "doStep", 
function () {
test.Circuit.CircuitElm.sim.stampResistor (this.nodes[0], this.nodes[1], this.resistance);
});
Clazz.overrideMethod (c$, "getInfo", 
function (arr) {
arr[0] = "lamp";
this.getBasicInfo (arr);
arr[3] = "R = " + test.Circuit.CircuitElm.getUnitText (this.resistance, test.Circuit.CirSim.ohmString);
arr[4] = "P = " + test.Circuit.CircuitElm.getUnitText (this.getPower (), "W");
arr[5] = "T = " + (Clazz.doubleToInt (this.temp)) + " K";
}, "~A");
Clazz.overrideMethod (c$, "getEditInfo", 
function (n) {
if (n == 0) return  new test.Circuit.EditInfo ("Nominal Power", this.nom_pow, 0, 0);
if (n == 1) return  new test.Circuit.EditInfo ("Nominal Voltage", this.nom_v, 0, 0);
if (n == 2) return  new test.Circuit.EditInfo ("Warmup Time (s)", this.warmTime, 0, 0);
if (n == 3) return  new test.Circuit.EditInfo ("Cooldown Time (s)", this.coolTime, 0, 0);
return null;
}, "~N");
Clazz.overrideMethod (c$, "setEditValue", 
function (n, ei) {
if (n == 0 && ei.value > 0) this.nom_pow = ei.value;
if (n == 1 && ei.value > 0) this.nom_v = ei.value;
if (n == 2 && ei.value > 0) this.warmTime = ei.value;
if (n == 3 && ei.value > 0) this.coolTime = ei.value;
}, "~N,test.Circuit.EditInfo");
});

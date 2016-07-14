Clazz.declarePackage ("test.Circuit");
Clazz.load (["test.Circuit.CircuitElm"], "test.Circuit.ThermistorElm", ["java.awt.Label", "$.Point", "$.Scrollbar", "java.lang.Double", "test.Circuit.CirSim", "$.EditInfo"], function () {
c$ = Clazz.decorateAsClass (function () {
this.minresistance = 0;
this.maxresistance = 0;
this.resistance = 0;
this.slider = null;
this.label = null;
this.ps3 = null;
this.ps4 = null;
Clazz.instantialize (this, arguments);
}, test.Circuit, "ThermistorElm", test.Circuit.CircuitElm);
Clazz.makeConstructor (c$, 
function (xx, yy) {
Clazz.superConstructor (this, test.Circuit.ThermistorElm, [xx, yy]);
this.maxresistance = 1e9;
this.minresistance = 1e3;
this.createSlider ();
}, "~N,~N");
Clazz.makeConstructor (c$, 
function (xa, ya, xb, yb, f, st) {
Clazz.superConstructor (this, test.Circuit.ThermistorElm, [xa, ya, xb, yb, f]);
this.minresistance =  new Double (st.nextToken ()).doubleValue ();
this.maxresistance =  new Double (st.nextToken ()).doubleValue ();
this.createSlider ();
}, "~N,~N,~N,~N,~N,java.util.StringTokenizer");
Clazz.overrideMethod (c$, "nonLinear", 
function () {
return true;
});
Clazz.overrideMethod (c$, "getDumpType", 
function () {
return 192;
});
Clazz.defineMethod (c$, "dump", 
function () {
return Clazz.superCall (this, test.Circuit.ThermistorElm, "dump", []) + " " + this.minresistance + " " + this.maxresistance;
});
Clazz.defineMethod (c$, "createSlider", 
function () {
test.Circuit.CirSim.main.add (this.label =  new java.awt.Label ("Temperature", 1));
var value = 50;
test.Circuit.CirSim.main.add (this.slider =  new java.awt.Scrollbar (0, value, 1, 0, 101));
test.Circuit.CirSim.main.validate ();
});
Clazz.defineMethod (c$, "setPoints", 
function () {
Clazz.superCall (this, test.Circuit.ThermistorElm, "setPoints", []);
this.calcLeads (32);
this.ps3 =  new java.awt.Point ();
this.ps4 =  new java.awt.Point ();
});
Clazz.overrideMethod (c$, "$delete", 
function () {
test.Circuit.CirSim.main.remove (this.label);
test.Circuit.CirSim.main.remove (this.slider);
});
Clazz.overrideMethod (c$, "draw", 
function (g) {
var i;
var v1 = this.volts[0];
var v2 = this.volts[1];
this.setBbox (this.point1, this.point2, 6);
this.draw2Leads (g);
this.setPowerColor (g, true);
this.doDots (g);
this.drawPosts (g);
}, "java.awt.Graphics");
Clazz.overrideMethod (c$, "calculateCurrent", 
function () {
var vd = this.volts[0] - this.volts[1];
this.current = vd / this.resistance;
});
Clazz.overrideMethod (c$, "startIteration", 
function () {
var vd = this.volts[0] - this.volts[1];
this.resistance = this.minresistance;
});
Clazz.overrideMethod (c$, "doStep", 
function () {
test.Circuit.CircuitElm.sim.stampResistor (this.nodes[0], this.nodes[1], this.resistance);
});
Clazz.overrideMethod (c$, "stamp", 
function () {
test.Circuit.CircuitElm.sim.stampNonLinear (this.nodes[0]);
test.Circuit.CircuitElm.sim.stampNonLinear (this.nodes[1]);
});
Clazz.overrideMethod (c$, "getInfo", 
function (arr) {
arr[0] = "spark gap";
this.getBasicInfo (arr);
arr[3] = "R = " + test.Circuit.CircuitElm.getUnitText (this.resistance, test.Circuit.CirSim.ohmString);
arr[4] = "Ron = " + test.Circuit.CircuitElm.getUnitText (this.minresistance, test.Circuit.CirSim.ohmString);
arr[5] = "Roff = " + test.Circuit.CircuitElm.getUnitText (this.maxresistance, test.Circuit.CirSim.ohmString);
}, "~A");
Clazz.overrideMethod (c$, "getEditInfo", 
function (n) {
if (n == 0) return  new test.Circuit.EditInfo ("Min resistance (ohms)", this.minresistance, 0, 0);
if (n == 1) return  new test.Circuit.EditInfo ("Max resistance (ohms)", this.maxresistance, 0, 0);
return null;
}, "~N");
Clazz.overrideMethod (c$, "setEditValue", 
function (n, ei) {
if (ei.value > 0 && n == 0) this.minresistance = ei.value;
if (ei.value > 0 && n == 1) this.maxresistance = ei.value;
}, "~N,test.Circuit.EditInfo");
});

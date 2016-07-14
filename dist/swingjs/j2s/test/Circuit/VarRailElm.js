Clazz.declarePackage ("test.Circuit");
Clazz.load (["test.Circuit.RailElm"], "test.Circuit.VarRailElm", ["java.awt.Label", "$.Scrollbar", "test.Circuit.CirSim", "$.CircuitElm", "$.EditInfo"], function () {
c$ = Clazz.decorateAsClass (function () {
this.slider = null;
this.label = null;
this.sliderText = null;
Clazz.instantialize (this, arguments);
}, test.Circuit, "VarRailElm", test.Circuit.RailElm);
Clazz.makeConstructor (c$, 
function (xx, yy) {
Clazz.superConstructor (this, test.Circuit.VarRailElm, [xx, yy, 6]);
this.sliderText = "Voltage";
this.frequency = this.maxVoltage;
this.createSlider ();
}, "~N,~N");
Clazz.makeConstructor (c$, 
function (xa, ya, xb, yb, f, st) {
Clazz.superConstructor (this, test.Circuit.VarRailElm, [xa, ya, xb, yb, f, st]);
this.sliderText = st.nextToken ();
while (st.hasMoreTokens ()) this.sliderText += ' ' + st.nextToken ();

this.createSlider ();
}, "~N,~N,~N,~N,~N,java.util.StringTokenizer");
Clazz.defineMethod (c$, "dump", 
function () {
return Clazz.superCall (this, test.Circuit.VarRailElm, "dump", []) + " " + this.sliderText;
});
Clazz.overrideMethod (c$, "getDumpType", 
function () {
return 172;
});
Clazz.defineMethod (c$, "createSlider", 
function () {
this.waveform = 6;
test.Circuit.CirSim.main.add (this.label =  new java.awt.Label (this.sliderText, 1));
var value = Clazz.doubleToInt ((this.frequency - this.bias) * 100 / (this.maxVoltage - this.bias));
test.Circuit.CirSim.main.add (this.slider =  new java.awt.Scrollbar (0, value, 1, 0, 101));
test.Circuit.CirSim.main.validate ();
});
Clazz.overrideMethod (c$, "getVoltage", 
function () {
this.frequency = this.slider.getValue () * (this.maxVoltage - this.bias) / 100. + this.bias;
return this.frequency;
});
Clazz.overrideMethod (c$, "$delete", 
function () {
test.Circuit.CirSim.main.remove (this.label);
test.Circuit.CirSim.main.remove (this.slider);
});
Clazz.overrideMethod (c$, "getEditInfo", 
function (n) {
if (n == 0) return  new test.Circuit.EditInfo ("Min Voltage", this.bias, -20, 20);
if (n == 1) return  new test.Circuit.EditInfo ("Max Voltage", this.maxVoltage, -20, 20);
if (n == 2) {
var ei =  new test.Circuit.EditInfo ("Slider Text", 0, -1, -1);
ei.text = this.sliderText;
return ei;
}return null;
}, "~N");
Clazz.overrideMethod (c$, "setEditValue", 
function (n, ei) {
if (n == 0) this.bias = ei.value;
if (n == 1) this.maxVoltage = ei.value;
if (n == 2) {
this.sliderText = ei.textf.getText ();
this.label.setText (this.sliderText);
}}, "~N,test.Circuit.EditInfo");
Clazz.overrideMethod (c$, "getShortcut", 
function () {
return 0;
});
});

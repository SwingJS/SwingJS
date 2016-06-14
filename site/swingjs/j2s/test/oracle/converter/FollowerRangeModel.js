Clazz.declarePackage ("test.oracle.converter");
Clazz.load (["javax.swing.event.ChangeListener", "test.oracle.converter.ConverterRangeModel"], "test.oracle.converter.FollowerRangeModel", null, function () {
c$ = Clazz.decorateAsClass (function () {
this.sourceModel = null;
Clazz.instantialize (this, arguments);
}, test.oracle.converter, "FollowerRangeModel", test.oracle.converter.ConverterRangeModel, javax.swing.event.ChangeListener);
Clazz.makeConstructor (c$, 
function (sourceModel) {
Clazz.superConstructor (this, test.oracle.converter.FollowerRangeModel, []);
this.sourceModel = sourceModel;
sourceModel.addChangeListener (this);
}, "test.oracle.converter.ConverterRangeModel");
Clazz.overrideMethod (c$, "stateChanged", 
function (e) {
this.fireStateChanged ();
}, "javax.swing.event.ChangeEvent");
Clazz.defineMethod (c$, "getMaximum", 
function () {
var modelMax = this.sourceModel.getMaximum ();
var multiplyBy = this.sourceModel.getMultiplier () / this.getMultiplier ();
return Clazz.doubleToInt (modelMax * multiplyBy);
});
Clazz.defineMethod (c$, "setMaximum", 
function (newMaximum) {
this.sourceModel.setMaximum (Clazz.doubleToInt (newMaximum * (this.getMultiplier () / this.sourceModel.getMultiplier ())));
}, "~N");
Clazz.overrideMethod (c$, "getValue", 
function () {
return Clazz.doubleToInt (this.getDoubleValue ());
});
Clazz.overrideMethod (c$, "setValue", 
function (newValue) {
this.setDoubleValue (newValue);
}, "~N");
Clazz.defineMethod (c$, "getDoubleValue", 
function () {
return this.sourceModel.getDoubleValue () * this.sourceModel.getMultiplier () / this.getMultiplier ();
});
Clazz.defineMethod (c$, "setDoubleValue", 
function (newValue) {
this.sourceModel.setDoubleValue (newValue * this.getMultiplier () / this.sourceModel.getMultiplier ());
}, "~N");
Clazz.defineMethod (c$, "setRangeProperties", 
function (value, extent, min, max, adjusting) {
var multiplyBy = this.getMultiplier () / this.sourceModel.getMultiplier ();
this.sourceModel.setRangeProperties (value * multiplyBy, extent, min, Clazz.doubleToInt (max * multiplyBy), adjusting);
}, "~N,~N,~N,~N,~B");
});

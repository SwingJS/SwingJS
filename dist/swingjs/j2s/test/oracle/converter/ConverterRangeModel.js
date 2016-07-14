Clazz.declarePackage ("test.oracle.converter");
Clazz.load (["javax.swing.BoundedRangeModel", "javax.swing.event.EventListenerList"], "test.oracle.converter.ConverterRangeModel", ["javax.swing.event.ChangeEvent", "$.ChangeListener"], function () {
c$ = Clazz.decorateAsClass (function () {
this.changeEvent = null;
this.listenerList = null;
this.maximum = 10000;
this.minimum = 0;
this.extent = 0;
this.value = 0.0;
this.multiplier = 1.0;
this.isAdjusting = false;
Clazz.instantialize (this, arguments);
}, test.oracle.converter, "ConverterRangeModel", null, javax.swing.BoundedRangeModel);
Clazz.prepareFields (c$, function () {
this.listenerList =  new javax.swing.event.EventListenerList ();
});
Clazz.makeConstructor (c$, 
function () {
});
Clazz.defineMethod (c$, "getMultiplier", 
function () {
return this.multiplier;
});
Clazz.defineMethod (c$, "setMultiplier", 
function (multiplier) {
this.multiplier = multiplier;
this.fireStateChanged ();
}, "~N");
Clazz.overrideMethod (c$, "getMaximum", 
function () {
return this.maximum;
});
Clazz.overrideMethod (c$, "setMaximum", 
function (newMaximum) {
this.setRangeProperties (this.value, this.extent, this.minimum, newMaximum, this.isAdjusting);
}, "~N");
Clazz.overrideMethod (c$, "getMinimum", 
function () {
return this.minimum;
});
Clazz.overrideMethod (c$, "setMinimum", 
function (newMinimum) {
System.out.println ("In ConverterRangeModel setMinimum");
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
return this.value;
});
Clazz.defineMethod (c$, "setDoubleValue", 
function (newValue) {
this.setRangeProperties (newValue, this.extent, this.minimum, this.maximum, this.isAdjusting);
}, "~N");
Clazz.overrideMethod (c$, "getExtent", 
function () {
return this.extent;
});
Clazz.overrideMethod (c$, "setExtent", 
function (newExtent) {
}, "~N");
Clazz.overrideMethod (c$, "getValueIsAdjusting", 
function () {
return this.isAdjusting;
});
Clazz.overrideMethod (c$, "setValueIsAdjusting", 
function (b) {
this.setRangeProperties (this.value, this.extent, this.minimum, this.maximum, b);
}, "~B");
Clazz.defineMethod (c$, "setRangeProperties", 
function (newValue, newExtent, newMin, newMax, newAdjusting) {
this.setRangeProperties (newValue, newExtent, newMin, newMax, newAdjusting);
}, "~N,~N,~N,~N,~B");
Clazz.defineMethod (c$, "setRangeProperties", 
function (newValue, unusedExtent, unusedMin, newMax, newAdjusting) {
if (newMax <= this.minimum) {
newMax = this.minimum + 1;
}if (Math.round (newValue) > newMax) {
newValue = newMax;
}var changeOccurred = false;
if (newValue != this.value) {
this.value = newValue;
changeOccurred = true;
}if (newMax != this.maximum) {
this.maximum = newMax;
changeOccurred = true;
}if (newAdjusting != this.isAdjusting) {
this.maximum = newMax;
this.isAdjusting = newAdjusting;
changeOccurred = true;
}if (changeOccurred) {
this.fireStateChanged ();
}}, "~N,~N,~N,~N,~B");
Clazz.overrideMethod (c$, "addChangeListener", 
function (l) {
this.listenerList.add (javax.swing.event.ChangeListener, l);
}, "javax.swing.event.ChangeListener");
Clazz.overrideMethod (c$, "removeChangeListener", 
function (l) {
this.listenerList.remove (javax.swing.event.ChangeListener, l);
}, "javax.swing.event.ChangeListener");
Clazz.defineMethod (c$, "fireStateChanged", 
function () {
var listeners = this.listenerList.getListenerList ();
for (var i = listeners.length - 2; i >= 0; i -= 2) {
if (listeners[i] === javax.swing.event.ChangeListener) {
if (this.changeEvent == null) {
this.changeEvent =  new javax.swing.event.ChangeEvent (this);
}(listeners[i + 1]).stateChanged (this.changeEvent);
}}
});
});

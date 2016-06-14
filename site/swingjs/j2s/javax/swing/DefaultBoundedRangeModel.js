Clazz.declarePackage ("javax.swing");
Clazz.load (["javax.swing.BoundedRangeModel", "javax.swing.event.EventListenerList"], "javax.swing.DefaultBoundedRangeModel", ["java.lang.IllegalArgumentException", "javax.swing.event.ChangeEvent", "$.ChangeListener"], function () {
c$ = Clazz.decorateAsClass (function () {
this.changeEvent = null;
this.listenerList = null;
this.value = 0;
this.extent = 0;
this.min = 0;
this.max = 100;
this.isAdjusting = false;
Clazz.instantialize (this, arguments);
}, javax.swing, "DefaultBoundedRangeModel", null, javax.swing.BoundedRangeModel);
Clazz.prepareFields (c$, function () {
this.listenerList =  new javax.swing.event.EventListenerList ();
});
Clazz.makeConstructor (c$, 
function () {
});
Clazz.makeConstructor (c$, 
function (value, extent, min, max) {
if ((max >= min) && (value >= min) && ((value + extent) >= value) && ((value + extent) <= max)) {
this.value = value;
this.extent = extent;
this.min = min;
this.max = max;
} else {
throw  new IllegalArgumentException ("invalid range properties");
}}, "~N,~N,~N,~N");
Clazz.overrideMethod (c$, "getValue", 
function () {
return this.value;
});
Clazz.overrideMethod (c$, "getExtent", 
function () {
return this.extent;
});
Clazz.overrideMethod (c$, "getMinimum", 
function () {
return this.min;
});
Clazz.overrideMethod (c$, "getMaximum", 
function () {
return this.max;
});
Clazz.overrideMethod (c$, "setValue", 
function (n) {
n = Math.min (n, 2147483647 - this.extent);
var newValue = Math.max (n, this.min);
if (newValue + this.extent > this.max) {
newValue = this.max - this.extent;
}this.setRangeProperties (newValue, this.extent, this.min, this.max, this.isAdjusting);
}, "~N");
Clazz.overrideMethod (c$, "setExtent", 
function (n) {
var newExtent = Math.max (0, n);
if (this.value + newExtent > this.max) {
newExtent = this.max - this.value;
}this.setRangeProperties (this.value, newExtent, this.min, this.max, this.isAdjusting);
}, "~N");
Clazz.overrideMethod (c$, "setMinimum", 
function (n) {
var newMax = Math.max (n, this.max);
var newValue = Math.max (n, this.value);
var newExtent = Math.min (newMax - newValue, this.extent);
this.setRangeProperties (newValue, newExtent, n, newMax, this.isAdjusting);
}, "~N");
Clazz.overrideMethod (c$, "setMaximum", 
function (n) {
var newMin = Math.min (n, this.min);
var newExtent = Math.min (n - newMin, this.extent);
var newValue = Math.min (n - newExtent, this.value);
this.setRangeProperties (newValue, newExtent, newMin, n, this.isAdjusting);
}, "~N");
Clazz.overrideMethod (c$, "setValueIsAdjusting", 
function (b) {
this.setRangeProperties (this.value, this.extent, this.min, this.max, b);
}, "~B");
Clazz.overrideMethod (c$, "getValueIsAdjusting", 
function () {
return this.isAdjusting;
});
Clazz.overrideMethod (c$, "setRangeProperties", 
function (newValue, newExtent, newMin, newMax, adjusting) {
if (newMin > newMax) {
newMin = newMax;
}if (newValue > newMax) {
newMax = newValue;
}if (newValue < newMin) {
newMin = newValue;
}if ((newExtent + newValue) > newMax) {
newExtent = newMax - newValue;
}if (newExtent < 0) {
newExtent = 0;
}var isChange = (newValue != this.value) || (newExtent != this.extent) || (newMin != this.min) || (newMax != this.max) || (adjusting != this.isAdjusting);
if (isChange) {
this.value = newValue;
this.extent = newExtent;
this.min = newMin;
this.max = newMax;
this.isAdjusting = adjusting;
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
Clazz.defineMethod (c$, "getChangeListeners", 
function () {
return this.listenerList.getListeners (javax.swing.event.ChangeListener);
});
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
Clazz.overrideMethod (c$, "toString", 
function () {
var modelString = "value=" + this.getValue () + ", " + "extent=" + this.getExtent () + ", " + "min=" + this.getMinimum () + ", " + "max=" + this.getMaximum () + ", " + "adj=" + this.getValueIsAdjusting ();
return this.getClass ().getName () + "[" + modelString + "]";
});
Clazz.defineMethod (c$, "getListeners", 
function (listenerType) {
return this.listenerList.getListeners (listenerType);
}, "Class");
});

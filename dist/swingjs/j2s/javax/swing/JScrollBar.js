Clazz.declarePackage ("javax.swing");
Clazz.load (["java.awt.Adjustable", "javax.swing.JComponent", "javax.swing.event.ChangeListener"], "javax.swing.JScrollBar", ["java.lang.IllegalArgumentException", "java.awt.Dimension", "java.awt.event.AdjustmentEvent", "$.AdjustmentListener", "javax.swing.BoundedRangeModel", "$.DefaultBoundedRangeModel"], function () {
c$ = Clazz.decorateAsClass (function () {
this.fwdAdjustmentEvents = null;
this.model = null;
this.orientation = 0;
this.unitIncrement = 0;
this.blockIncrement = 0;
if (!Clazz.isClassDefined ("javax.swing.JScrollBar.ModelListener")) {
javax.swing.JScrollBar.$JScrollBar$ModelListener$ ();
}
Clazz.instantialize (this, arguments);
}, javax.swing, "JScrollBar", javax.swing.JComponent, java.awt.Adjustable);
Clazz.prepareFields (c$, function () {
this.fwdAdjustmentEvents = Clazz.innerTypeInstance (javax.swing.JScrollBar.ModelListener, this, null);
});
Clazz.defineMethod (c$, "checkOrientation", 
 function (orientation) {
switch (orientation) {
case 1:
case 0:
break;
default:
throw  new IllegalArgumentException ("orientation must be one of: VERTICAL, HORIZONTAL");
}
}, "~N");
Clazz.makeConstructor (c$, 
function (orientation, value, extent, min, max) {
Clazz.superConstructor (this, javax.swing.JScrollBar, []);
this.checkOrientation (orientation);
this.unitIncrement = 1;
this.blockIncrement = (extent == 0) ? 1 : extent;
this.orientation = orientation;
this.model =  new javax.swing.DefaultBoundedRangeModel (value, extent, min, max);
this.model.addChangeListener (this.fwdAdjustmentEvents);
this.setRequestFocusEnabled (false);
this.uiClassID = "ScrollBarUI";
this.updateUI ();
}, "~N,~N,~N,~N,~N");
Clazz.makeConstructor (c$, 
function (orientation) {
this.construct (orientation, 0, 10, 0, 100);
}, "~N");
Clazz.makeConstructor (c$, 
function () {
this.construct (1);
});
Clazz.defineMethod (c$, "addChangeListener", 
function (l) {
this.model.addChangeListener (l);
}, "javax.swing.event.ChangeListener");
Clazz.defineMethod (c$, "removeChangeListener", 
function (l) {
this.model.removeChangeListener (l);
}, "javax.swing.event.ChangeListener");
Clazz.overrideMethod (c$, "getOrientation", 
function () {
return this.orientation;
});
Clazz.defineMethod (c$, "setOrientation", 
function (orientation) {
this.checkOrientation (orientation);
var oldValue = this.orientation;
this.orientation = orientation;
this.firePropertyChangeInt ("orientation", oldValue, orientation);
if (orientation != oldValue) {
this.revalidate ();
}}, "~N");
Clazz.defineMethod (c$, "getModel", 
function () {
return this.model;
});
Clazz.defineMethod (c$, "setModel", 
function (newModel) {
var oldModel = this.model;
if (this.model != null) {
this.model.removeChangeListener (this.fwdAdjustmentEvents);
}this.model = newModel;
if (this.model != null) {
this.model.addChangeListener (this.fwdAdjustmentEvents);
}this.firePropertyChangeObject ("model", oldModel, this.model);
}, "javax.swing.BoundedRangeModel");
Clazz.defineMethod (c$, "getUnitIncrement", 
function (direction) {
return this.unitIncrement;
}, "~N");
Clazz.overrideMethod (c$, "setUnitIncrement", 
function (unitIncrement) {
var oldValue = this.unitIncrement;
this.unitIncrement = unitIncrement;
this.firePropertyChangeInt ("unitIncrement", oldValue, unitIncrement);
}, "~N");
Clazz.defineMethod (c$, "getBlockIncrement", 
function (direction) {
return this.blockIncrement;
}, "~N");
Clazz.overrideMethod (c$, "setBlockIncrement", 
function (blockIncrement) {
var oldValue = this.blockIncrement;
this.blockIncrement = blockIncrement;
this.firePropertyChangeInt ("blockIncrement", oldValue, blockIncrement);
}, "~N");
Clazz.defineMethod (c$, "getUnitIncrement", 
function () {
return this.unitIncrement;
});
Clazz.defineMethod (c$, "getBlockIncrement", 
function () {
return this.blockIncrement;
});
Clazz.overrideMethod (c$, "getValue", 
function () {
return this.getModel ().getValue ();
});
Clazz.overrideMethod (c$, "setValue", 
function (value) {
var m = this.getModel ();
m.setValue (value);
}, "~N");
Clazz.overrideMethod (c$, "getVisibleAmount", 
function () {
return this.getModel ().getExtent ();
});
Clazz.overrideMethod (c$, "setVisibleAmount", 
function (extent) {
this.getModel ().setExtent (extent);
}, "~N");
Clazz.overrideMethod (c$, "getMinimum", 
function () {
return this.getModel ().getMinimum ();
});
Clazz.overrideMethod (c$, "setMinimum", 
function (minimum) {
this.getModel ().setMinimum (minimum);
}, "~N");
Clazz.overrideMethod (c$, "getMaximum", 
function () {
return this.getModel ().getMaximum ();
});
Clazz.overrideMethod (c$, "setMaximum", 
function (maximum) {
this.getModel ().setMaximum (maximum);
}, "~N");
Clazz.defineMethod (c$, "getValueIsAdjusting", 
function () {
return this.getModel ().getValueIsAdjusting ();
});
Clazz.defineMethod (c$, "setValueIsAdjusting", 
function (b) {
var m = this.getModel ();
m.setValueIsAdjusting (b);
}, "~B");
Clazz.defineMethod (c$, "setValues", 
function (newValue, newExtent, newMin, newMax) {
var m = this.getModel ();
m.setRangeProperties (newValue, newExtent, newMin, newMax, m.getValueIsAdjusting ());
}, "~N,~N,~N,~N");
Clazz.overrideMethod (c$, "addAdjustmentListener", 
function (l) {
this.listenerList.add (java.awt.event.AdjustmentListener, l);
}, "java.awt.event.AdjustmentListener");
Clazz.overrideMethod (c$, "removeAdjustmentListener", 
function (l) {
this.listenerList.remove (java.awt.event.AdjustmentListener, l);
}, "java.awt.event.AdjustmentListener");
Clazz.defineMethod (c$, "getAdjustmentListeners", 
function () {
return this.listenerList.getListeners (java.awt.event.AdjustmentListener);
});
Clazz.defineMethod (c$, "fireAdjustmentValueChanged", 
function (id, type, value) {
this.fireAdjustmentValueChanged (id, type, value, this.getValueIsAdjusting ());
}, "~N,~N,~N");
Clazz.defineMethod (c$, "fireAdjustmentValueChanged", 
 function (id, type, value, isAdjusting) {
var listeners = this.listenerList.getListenerList ();
var e = null;
for (var i = listeners.length - 2; i >= 0; i -= 2) {
if (listeners[i] === java.awt.event.AdjustmentListener) {
if (e == null) {
e =  new java.awt.event.AdjustmentEvent (this, id, type, value, isAdjusting);
}(listeners[i + 1]).adjustmentValueChanged (e);
}}
}, "~N,~N,~N,~B");
Clazz.overrideMethod (c$, "getMinimumSize", 
function () {
var pref = this.getPreferredSize ();
if (this.orientation == 1) {
return  new java.awt.Dimension (pref.width, 5);
} else {
return  new java.awt.Dimension (5, pref.height);
}});
Clazz.overrideMethod (c$, "getMaximumSize", 
function () {
var pref = this.getPreferredSize ();
if (this.getOrientation () == 1) {
return  new java.awt.Dimension (pref.width, 32767);
} else {
return  new java.awt.Dimension (32767, pref.height);
}});
Clazz.defineMethod (c$, "setEnabled", 
function (x) {
Clazz.superCall (this, javax.swing.JScrollBar, "setEnabled", [x]);
var children = this.getComponents ();
for (var i = 0; i < children.length; i++) {
children[i].setEnabled (x);
}
}, "~B");
Clazz.defineMethod (c$, "paramString", 
function () {
var orientationString = (this.orientation == 0 ? "HORIZONTAL" : "VERTICAL");
return Clazz.superCall (this, javax.swing.JScrollBar, "paramString", []) + ",blockIncrement=" + this.blockIncrement + ",orientation=" + orientationString + ",unitIncrement=" + this.unitIncrement;
});
c$.$JScrollBar$ModelListener$ = function () {
Clazz.pu$h(self.c$);
c$ = Clazz.decorateAsClass (function () {
Clazz.prepareCallback (this, arguments);
Clazz.instantialize (this, arguments);
}, javax.swing.JScrollBar, "ModelListener", null, javax.swing.event.ChangeListener);
Clazz.overrideMethod (c$, "stateChanged", 
function (a) {
var b = a.getSource ();
if (Clazz.instanceOf (b, javax.swing.BoundedRangeModel)) {
var c = 601;
var d = 5;
var e = b;
var f = e.getValue ();
var g = e.getValueIsAdjusting ();
this.b$["javax.swing.JScrollBar"].fireAdjustmentValueChanged (c, d, f, g);
}}, "javax.swing.event.ChangeEvent");
c$ = Clazz.p0p ();
};
});

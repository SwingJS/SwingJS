Clazz.declarePackage ("jsjavax.swing");
Clazz.load (["jsjavax.swing.JComponent", "$.SwingConstants", "jsjavax.swing.event.ChangeListener"], "jsjavax.swing.JProgressBar", ["java.lang.Double", "$.IllegalArgumentException", "jsjava.text.NumberFormat", "jsjavax.swing.DefaultBoundedRangeModel", "$.UIManager", "jsjavax.swing.event.ChangeEvent"], function () {
c$ = Clazz.decorateAsClass (function () {
this.orientation = 0;
this.$paintBorder = false;
this.model = null;
this.progressString = null;
this.paintString = false;
this.changeEvent = null;
this.changeListener = null;
this.format = null;
this.indeterminate = false;
if (!Clazz.isClassDefined ("jsjavax.swing.JProgressBar.ModelListener")) {
jsjavax.swing.JProgressBar.$JProgressBar$ModelListener$ ();
}
Clazz.instantialize (this, arguments);
}, jsjavax.swing, "JProgressBar", jsjavax.swing.JComponent, jsjavax.swing.SwingConstants);
Clazz.makeConstructor (c$, 
function () {
this.construct (0);
});
Clazz.makeConstructor (c$, 
function (orient) {
this.construct (orient, 0, 100);
}, "~N");
Clazz.makeConstructor (c$, 
function (min, max) {
this.construct (0, min, max);
}, "~N,~N");
Clazz.makeConstructor (c$, 
function (orient, min, max) {
Clazz.superConstructor (this, jsjavax.swing.JProgressBar, []);
this.setModel ( new jsjavax.swing.DefaultBoundedRangeModel (min, 0, min, max));
this.updateUI ();
this.setOrientation (orient);
this.setBorderPainted (true);
this.setStringPainted (false);
this.setString (null);
this.setIndeterminate (false);
}, "~N,~N,~N");
Clazz.makeConstructor (c$, 
function (newModel) {
Clazz.superConstructor (this, jsjavax.swing.JProgressBar, []);
this.setModel (newModel);
this.updateUI ();
this.setOrientation (0);
this.setBorderPainted (true);
this.setStringPainted (false);
this.setString (null);
this.setIndeterminate (false);
}, "jsjavax.swing.BoundedRangeModel");
Clazz.defineMethod (c$, "getOrientation", 
function () {
return this.orientation;
});
Clazz.defineMethod (c$, "setOrientation", 
function (newOrientation) {
if (this.orientation != newOrientation) {
switch (newOrientation) {
case 1:
case 0:
var oldOrientation = this.orientation;
this.orientation = newOrientation;
this.firePropertyChange ("orientation", oldOrientation, newOrientation);
break;
default:
throw  new IllegalArgumentException (newOrientation + " is not a legal orientation");
}
this.revalidate ();
}}, "~N");
Clazz.defineMethod (c$, "isStringPainted", 
function () {
return this.paintString;
});
Clazz.defineMethod (c$, "setStringPainted", 
function (b) {
var oldValue = this.paintString;
this.paintString = b;
this.firePropertyChange ("stringPainted", oldValue, this.paintString);
if (this.paintString != oldValue) {
this.revalidate ();
this.repaint ();
}}, "~B");
Clazz.defineMethod (c$, "getString", 
function () {
if (this.progressString != null) {
return this.progressString;
} else {
if (this.format == null) {
this.format = jsjava.text.NumberFormat.getPercentInstance ();
}return this.format.format ( new Double (this.getPercentComplete ()));
}});
Clazz.defineMethod (c$, "setString", 
function (s) {
var oldValue = this.progressString;
this.progressString = s;
this.firePropertyChange ("string", oldValue, this.progressString);
if (this.progressString == null || oldValue == null || !this.progressString.equals (oldValue)) {
this.repaint ();
}}, "~S");
Clazz.defineMethod (c$, "getPercentComplete", 
function () {
var span = this.model.getMaximum () - this.model.getMinimum ();
var currentValue = this.model.getValue ();
var pc = (currentValue - this.model.getMinimum ()) / span;
return pc;
});
Clazz.defineMethod (c$, "isBorderPainted", 
function () {
return this.$paintBorder;
});
Clazz.defineMethod (c$, "setBorderPainted", 
function (b) {
var oldValue = this.$paintBorder;
this.$paintBorder = b;
this.firePropertyChange ("borderPainted", oldValue, this.$paintBorder);
if (this.$paintBorder != oldValue) {
this.repaint ();
}}, "~B");
Clazz.defineMethod (c$, "paintBorder", 
function (g) {
if (this.isBorderPainted ()) {
Clazz.superCall (this, jsjavax.swing.JProgressBar, "paintBorder", [g]);
}}, "jsjava.awt.Graphics");
Clazz.defineMethod (c$, "getUI", 
function () {
return this.ui;
});
Clazz.overrideMethod (c$, "updateUI", 
function () {
this.setUI (jsjavax.swing.UIManager.getUI (this));
});
Clazz.overrideMethod (c$, "getUIClassID", 
function () {
return "ProgressBarUI";
});
Clazz.defineMethod (c$, "createChangeListener", 
function () {
return Clazz.innerTypeInstance (jsjavax.swing.JProgressBar.ModelListener, this, null);
});
Clazz.defineMethod (c$, "addChangeListener", 
function (l) {
this.listenerList.add (jsjavax.swing.event.ChangeListener, l);
}, "jsjavax.swing.event.ChangeListener");
Clazz.defineMethod (c$, "removeChangeListener", 
function (l) {
this.listenerList.remove (jsjavax.swing.event.ChangeListener, l);
}, "jsjavax.swing.event.ChangeListener");
Clazz.defineMethod (c$, "getChangeListeners", 
function () {
return this.listenerList.getListeners (jsjavax.swing.event.ChangeListener);
});
Clazz.defineMethod (c$, "fireStateChanged", 
function () {
var listeners = this.listenerList.getListenerList ();
for (var i = listeners.length - 2; i >= 0; i -= 2) {
if (listeners[i] === jsjavax.swing.event.ChangeListener) {
if (this.changeEvent == null) this.changeEvent =  new jsjavax.swing.event.ChangeEvent (this);
(listeners[i + 1]).stateChanged (this.changeEvent);
}}
});
Clazz.defineMethod (c$, "getModel", 
function () {
return this.model;
});
Clazz.defineMethod (c$, "setModel", 
function (newModel) {
var oldModel = this.getModel ();
if (newModel !== oldModel) {
if (oldModel != null) {
oldModel.removeChangeListener (this.changeListener);
this.changeListener = null;
}this.model = newModel;
if (newModel != null) {
this.changeListener = this.createChangeListener ();
newModel.addChangeListener (this.changeListener);
}if (this.model != null) {
this.model.setExtent (0);
}this.repaint ();
}}, "jsjavax.swing.BoundedRangeModel");
Clazz.defineMethod (c$, "getValue", 
function () {
return this.getModel ().getValue ();
});
Clazz.defineMethod (c$, "getMinimum", 
function () {
return this.getModel ().getMinimum ();
});
Clazz.defineMethod (c$, "getMaximum", 
function () {
return this.getModel ().getMaximum ();
});
Clazz.defineMethod (c$, "setValue", 
function (n) {
var brm = this.getModel ();
brm.setValue (n);
}, "~N");
Clazz.defineMethod (c$, "setMinimum", 
function (n) {
this.getModel ().setMinimum (n);
}, "~N");
Clazz.defineMethod (c$, "setMaximum", 
function (n) {
this.getModel ().setMaximum (n);
}, "~N");
Clazz.defineMethod (c$, "setIndeterminate", 
function (newValue) {
var oldValue = this.indeterminate;
this.indeterminate = newValue;
this.firePropertyChange ("indeterminate", oldValue, this.indeterminate);
}, "~B");
Clazz.defineMethod (c$, "isIndeterminate", 
function () {
return this.indeterminate;
});
Clazz.defineMethod (c$, "paramString", 
function () {
var orientationString = (this.orientation == 0 ? "HORIZONTAL" : "VERTICAL");
var paintBorderString = (this.$paintBorder ? "true" : "false");
var progressStringString = (this.progressString != null ? this.progressString : "");
var paintStringString = (this.paintString ? "true" : "false");
var indeterminateString = (this.indeterminate ? "true" : "false");
return Clazz.superCall (this, jsjavax.swing.JProgressBar, "paramString", []) + ",orientation=" + orientationString + ",paintBorder=" + paintBorderString + ",paintString=" + paintStringString + ",progressString=" + progressStringString + ",indeterminateString=" + indeterminateString;
});
c$.$JProgressBar$ModelListener$ = function () {
Clazz.pu$h ();
c$ = Clazz.decorateAsClass (function () {
Clazz.prepareCallback (this, arguments);
Clazz.instantialize (this, arguments);
}, jsjavax.swing.JProgressBar, "ModelListener", null, jsjavax.swing.event.ChangeListener);
Clazz.overrideMethod (c$, "stateChanged", 
function (a) {
this.b$["jsjavax.swing.JProgressBar"].fireStateChanged ();
}, "jsjavax.swing.event.ChangeEvent");
c$ = Clazz.p0p ();
};
Clazz.defineStatics (c$,
"$uiClassID", "ProgressBarUI",
"defaultMinimum", 0,
"defaultMaximum", 100,
"defaultOrientation", 0);
});

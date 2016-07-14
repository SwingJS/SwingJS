Clazz.declarePackage ("javax.swing");
Clazz.load (["java.util.Hashtable", "java.beans.PropertyChangeListener", "javax.swing.JComponent", "$.JLabel", "$.SwingConstants", "javax.swing.event.ChangeListener", "javax.swing.plaf.UIResource"], "javax.swing.JSlider", ["java.lang.IllegalArgumentException", "javax.swing.DefaultBoundedRangeModel", "javax.swing.event.ChangeEvent"], function () {
c$ = Clazz.decorateAsClass (function () {
this.paintTicks = false;
this.paintTrack = true;
this.paintLabels = false;
this.isInverted = false;
this.sliderModel = null;
this.majorTickSpacing = 0;
this.minorTickSpacing = 0;
this.snapToTicks = false;
this.snapToValue = true;
this.orientation = 0;
this.labelTable = null;
this.changeListener = null;
this.changeEvent = null;
if (!Clazz.isClassDefined ("javax.swing.JSlider.ModelListener")) {
javax.swing.JSlider.$JSlider$ModelListener$ ();
}
if (!Clazz.isClassDefined ("javax.swing.JSlider.JSliderSmartHashtable")) {
javax.swing.JSlider.$JSlider$JSliderSmartHashtable$ ();
}
if (!Clazz.isClassDefined ("javax.swing.JSlider.JSliderLabelUIResource")) {
javax.swing.JSlider.$JSlider$JSliderLabelUIResource$ ();
}
Clazz.instantialize (this, arguments);
}, javax.swing, "JSlider", javax.swing.JComponent, javax.swing.SwingConstants);
Clazz.prepareFields (c$, function () {
this.changeListener = this.createChangeListener ();
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
function () {
this.construct (0, 0, 100, 50);
});
Clazz.makeConstructor (c$, 
function (orientation) {
this.construct (orientation, 0, 100, 50);
}, "~N");
Clazz.makeConstructor (c$, 
function (min, max) {
this.construct (0, min, max, Clazz.doubleToInt ((min + max) / 2));
}, "~N,~N");
Clazz.makeConstructor (c$, 
function (min, max, value) {
this.construct (0, min, max, value);
}, "~N,~N,~N");
Clazz.makeConstructor (c$, 
function (orientation, min, max, value) {
Clazz.superConstructor (this, javax.swing.JSlider, []);
this.checkOrientation (orientation);
this.orientation = orientation;
this.sliderModel =  new javax.swing.DefaultBoundedRangeModel (value, 0, min, max);
this.sliderModel.addChangeListener (this.changeListener);
this.uiClassID = "SliderUI";
this.updateUI ();
}, "~N,~N,~N,~N");
Clazz.makeConstructor (c$, 
function (brm) {
Clazz.superConstructor (this, javax.swing.JSlider, []);
this.orientation = 0;
this.setModel (brm);
this.sliderModel.addChangeListener (this.changeListener);
this.uiClassID = "SliderUI";
this.updateUI ();
}, "javax.swing.BoundedRangeModel");
Clazz.defineMethod (c$, "updateUI", 
function () {
Clazz.superCall (this, javax.swing.JSlider, "updateUI", []);
this.updateLabelUIs ();
});
Clazz.defineMethod (c$, "createChangeListener", 
function () {
return Clazz.innerTypeInstance (javax.swing.JSlider.ModelListener, this, null);
});
Clazz.defineMethod (c$, "addChangeListener", 
function (l) {
this.listenerList.add (javax.swing.event.ChangeListener, l);
}, "javax.swing.event.ChangeListener");
Clazz.defineMethod (c$, "removeChangeListener", 
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
Clazz.defineMethod (c$, "getModel", 
function () {
return this.sliderModel;
});
Clazz.defineMethod (c$, "setModel", 
function (newModel) {
var oldModel = this.getModel ();
if (oldModel != null) {
oldModel.removeChangeListener (this.changeListener);
}this.sliderModel = newModel;
if (newModel != null) {
newModel.addChangeListener (this.changeListener);
}this.firePropertyChangeObject ("model", oldModel, this.sliderModel);
}, "javax.swing.BoundedRangeModel");
Clazz.defineMethod (c$, "getValue", 
function () {
return this.getModel ().getValue ();
});
Clazz.defineMethod (c$, "setValue", 
function (n) {
var m = this.getModel ();
var oldValue = m.getValue ();
if (oldValue == n) {
return;
}m.setValue (n);
}, "~N");
Clazz.defineMethod (c$, "getMinimum", 
function () {
return this.getModel ().getMinimum ();
});
Clazz.defineMethod (c$, "setMinimum", 
function (minimum) {
var oldMin = this.getModel ().getMinimum ();
this.getModel ().setMinimum (minimum);
this.firePropertyChangeObject ("minimum",  new Integer (oldMin),  new Integer (minimum));
}, "~N");
Clazz.defineMethod (c$, "getMaximum", 
function () {
return this.getModel ().getMaximum ();
});
Clazz.defineMethod (c$, "setMaximum", 
function (maximum) {
var oldMax = this.getModel ().getMaximum ();
this.getModel ().setMaximum (maximum);
this.firePropertyChangeObject ("maximum",  new Integer (oldMax),  new Integer (maximum));
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
Clazz.defineMethod (c$, "getExtent", 
function () {
return this.getModel ().getExtent ();
});
Clazz.defineMethod (c$, "setExtent", 
function (extent) {
this.getModel ().setExtent (extent);
}, "~N");
Clazz.defineMethod (c$, "getOrientation", 
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
Clazz.defineMethod (c$, "setFont", 
function (font) {
Clazz.superCall (this, javax.swing.JSlider, "setFont", [font]);
this.updateLabelSizes ();
}, "java.awt.Font");
Clazz.defineMethod (c$, "getLabelTable", 
function () {
return this.labelTable;
});
Clazz.defineMethod (c$, "setLabelTable", 
function (labels) {
var oldTable = this.labelTable;
this.labelTable = labels;
this.updateLabelUIs ();
this.firePropertyChangeObject ("labelTable", oldTable, this.labelTable);
if (labels !== oldTable) {
this.revalidate ();
this.repaint ();
}}, "java.util.Dictionary");
Clazz.defineMethod (c$, "updateLabelUIs", 
function () {
if (this.getLabelTable () == null) {
return;
}var labels = this.getLabelTable ().keys ();
while (labels.hasMoreElements ()) {
var value = this.getLabelTable ().get (labels.nextElement ());
if (Clazz.instanceOf (value, javax.swing.JComponent)) {
var component = value;
component.updateUI ();
component.setSize (component.getPreferredSize ());
}}
});
Clazz.defineMethod (c$, "updateLabelSizes", 
 function () {
var labelTable = this.getLabelTable ();
if (labelTable != null) {
var labels = labelTable.elements ();
while (labels.hasMoreElements ()) {
var value = labels.nextElement ();
if (Clazz.instanceOf (value, javax.swing.JComponent)) {
var component = value;
component.setSize (component.getPreferredSize ());
}}
}});
Clazz.defineMethod (c$, "createStandardLabels", 
function (increment) {
return this.createStandardLabels (increment, this.getMinimum ());
}, "~N");
Clazz.defineMethod (c$, "createStandardLabels", 
function (increment, start) {
if (start > this.getMaximum () || start < this.getMinimum ()) {
throw  new IllegalArgumentException ("Slider label start point out of range.");
}if (increment <= 0) {
throw  new IllegalArgumentException ("Label incremement must be > 0");
}var table = Clazz.innerTypeInstance (javax.swing.JSlider.JSliderSmartHashtable, this, null, increment, start);
if (this.getLabelTable () != null && (Clazz.instanceOf (this.getLabelTable (), java.beans.PropertyChangeListener))) {
this.removePropertyChangeListener (this.getLabelTable ());
}this.addPropertyChangeListener (table);
return table;
}, "~N,~N");
Clazz.defineMethod (c$, "getInverted", 
function () {
return this.isInverted;
});
Clazz.defineMethod (c$, "setInverted", 
function (b) {
var oldValue = this.isInverted;
this.isInverted = b;
this.firePropertyChangeBool ("inverted", oldValue, this.isInverted);
if (b != oldValue) {
this.repaint ();
}}, "~B");
Clazz.defineMethod (c$, "getMajorTickSpacing", 
function () {
return this.majorTickSpacing;
});
Clazz.defineMethod (c$, "setMajorTickSpacing", 
function (n) {
var oldValue = this.majorTickSpacing;
this.majorTickSpacing = n;
if (this.labelTable == null && this.getMajorTickSpacing () > 0 && this.getPaintLabels ()) {
this.setLabelTable (this.createStandardLabels (this.getMajorTickSpacing ()));
}this.firePropertyChangeInt ("majorTickSpacing", oldValue, this.majorTickSpacing);
if (this.majorTickSpacing != oldValue && this.getPaintTicks ()) {
this.repaint ();
}}, "~N");
Clazz.defineMethod (c$, "getMinorTickSpacing", 
function () {
return this.minorTickSpacing;
});
Clazz.defineMethod (c$, "setMinorTickSpacing", 
function (n) {
var oldValue = this.minorTickSpacing;
this.minorTickSpacing = n;
this.firePropertyChangeInt ("minorTickSpacing", oldValue, this.minorTickSpacing);
if (this.minorTickSpacing != oldValue && this.getPaintTicks ()) {
this.repaint ();
}}, "~N");
Clazz.defineMethod (c$, "getSnapToTicks", 
function () {
return this.snapToTicks;
});
Clazz.defineMethod (c$, "getSnapToValue", 
function () {
return this.snapToValue;
});
Clazz.defineMethod (c$, "setSnapToTicks", 
function (b) {
var oldValue = this.snapToTicks;
this.snapToTicks = b;
this.firePropertyChangeBool ("snapToTicks", oldValue, this.snapToTicks);
}, "~B");
Clazz.defineMethod (c$, "setSnapToValue", 
function (b) {
var oldValue = this.snapToValue;
this.snapToValue = b;
this.firePropertyChangeBool ("snapToValue", oldValue, this.snapToValue);
}, "~B");
Clazz.defineMethod (c$, "getPaintTicks", 
function () {
return this.paintTicks;
});
Clazz.defineMethod (c$, "setPaintTicks", 
function (b) {
var oldValue = this.paintTicks;
this.paintTicks = b;
this.firePropertyChangeBool ("paintTicks", oldValue, this.paintTicks);
if (this.paintTicks != oldValue) {
this.revalidate ();
this.repaint ();
}}, "~B");
Clazz.defineMethod (c$, "getPaintTrack", 
function () {
return this.paintTrack;
});
Clazz.defineMethod (c$, "setPaintTrack", 
function (b) {
var oldValue = this.paintTrack;
this.paintTrack = b;
this.firePropertyChangeBool ("paintTrack", oldValue, this.paintTrack);
if (this.paintTrack != oldValue) {
this.repaint ();
}}, "~B");
Clazz.defineMethod (c$, "getPaintLabels", 
function () {
return this.paintLabels;
});
Clazz.defineMethod (c$, "setPaintLabels", 
function (b) {
var oldValue = this.paintLabels;
this.paintLabels = b;
if (this.labelTable == null && this.getMajorTickSpacing () > 0) {
this.setLabelTable (this.createStandardLabels (this.getMajorTickSpacing ()));
}this.firePropertyChangeBool ("paintLabels", oldValue, this.paintLabels);
if (this.paintLabels != oldValue) {
this.revalidate ();
this.repaint ();
}}, "~B");
Clazz.defineMethod (c$, "paramString", 
function () {
var paintTicksString = (this.paintTicks ? "true" : "false");
var paintTrackString = (this.paintTrack ? "true" : "false");
var paintLabelsString = (this.paintLabels ? "true" : "false");
var isInvertedString = (this.isInverted ? "true" : "false");
var snapToTicksString = (this.snapToTicks ? "true" : "false");
var snapToValueString = (this.snapToValue ? "true" : "false");
var orientationString = (this.orientation == 0 ? "HORIZONTAL" : "VERTICAL");
return Clazz.superCall (this, javax.swing.JSlider, "paramString", []) + ",isInverted=" + isInvertedString + ",majorTickSpacing=" + this.majorTickSpacing + ",minorTickSpacing=" + this.minorTickSpacing + ",orientation=" + orientationString + ",paintLabels=" + paintLabelsString + ",paintTicks=" + paintTicksString + ",paintTrack=" + paintTrackString + ",snapToTicks=" + snapToTicksString + ",snapToValue=" + snapToValueString;
});
c$.$JSlider$ModelListener$ = function () {
Clazz.pu$h(self.c$);
c$ = Clazz.decorateAsClass (function () {
Clazz.prepareCallback (this, arguments);
Clazz.instantialize (this, arguments);
}, javax.swing.JSlider, "ModelListener", null, javax.swing.event.ChangeListener);
Clazz.overrideMethod (c$, "stateChanged", 
function (a) {
this.b$["javax.swing.JSlider"].fireStateChanged ();
}, "javax.swing.event.ChangeEvent");
c$ = Clazz.p0p ();
};
c$.$JSlider$JSliderSmartHashtable$ = function () {
Clazz.pu$h(self.c$);
c$ = Clazz.decorateAsClass (function () {
Clazz.prepareCallback (this, arguments);
this.increment = 0;
this.start = 0;
this.startAtMin = false;
Clazz.instantialize (this, arguments);
}, javax.swing.JSlider, "JSliderSmartHashtable", java.util.Hashtable, java.beans.PropertyChangeListener);
Clazz.makeConstructor (c$, 
function (a, b) {
Clazz.superConstructor (this, javax.swing.JSlider.JSliderSmartHashtable);
this.increment = a;
this.start = b;
this.startAtMin = b == this.b$["javax.swing.JSlider"].getMinimum ();
this.createLabels ();
}, "~N,~N");
Clazz.overrideMethod (c$, "propertyChange", 
function (a) {
if (a.getPropertyName ().equals ("minimum") && this.startAtMin) {
this.start = this.b$["javax.swing.JSlider"].getMinimum ();
}if (a.getPropertyName ().equals ("minimum") || a.getPropertyName ().equals ("maximum")) {
var b = this.b$["javax.swing.JSlider"].getLabelTable ().keys ();
var c = null;
var d =  new java.util.Hashtable ();
while (b.hasMoreElements ()) {
c = b.nextElement ();
var e = this.b$["javax.swing.JSlider"].getLabelTable ().get (c);
if (!(Clazz.instanceOf (e, javax.swing.JSlider.JSliderLabelUIResource))) {
d.put (c, e);
}}
this.clear ();
this.createLabels ();
b = d.keys ();
while (b.hasMoreElements ()) {
c = b.nextElement ();
this.put (c, d.get (c));
}
(a.getSource ()).setLabelTable (this);
}}, "java.beans.PropertyChangeEvent");
Clazz.defineMethod (c$, "createLabels", 
function () {
for (var a = this.start; a <= this.b$["javax.swing.JSlider"].getMaximum (); a += this.increment) {
this.put ( new Integer (a), Clazz.innerTypeInstance (javax.swing.JSlider.JSliderLabelUIResource, this, null, "" + a, 0));
}
});
c$ = Clazz.p0p ();
};
c$.$JSlider$JSliderLabelUIResource$ = function () {
Clazz.pu$h(self.c$);
c$ = Clazz.decorateAsClass (function () {
Clazz.prepareCallback (this, arguments);
Clazz.instantialize (this, arguments);
}, javax.swing.JSlider, "JSliderLabelUIResource", javax.swing.JLabel, javax.swing.plaf.UIResource);
Clazz.makeConstructor (c$, 
function (a, b) {
Clazz.superConstructor (this, javax.swing.JSlider.JSliderLabelUIResource, [a, b]);
this.setName ("Slider.label");
}, "~S,~N");
Clazz.defineMethod (c$, "getFont", 
function () {
var a = Clazz.superCall (this, javax.swing.JSlider.JSliderLabelUIResource, "getFont", []);
if (a != null && !(Clazz.instanceOf (a, javax.swing.plaf.UIResource))) {
return a;
}return this.b$["javax.swing.JSlider"].getFont ();
});
Clazz.defineMethod (c$, "getForeground", 
function () {
var a = Clazz.superCall (this, javax.swing.JSlider.JSliderLabelUIResource, "getForeground", []);
if (a != null && !(Clazz.instanceOf (a, javax.swing.plaf.UIResource))) {
return a;
}if (!(Clazz.instanceOf (this.b$["javax.swing.JSlider"].getForeground (), javax.swing.plaf.UIResource))) {
return this.b$["javax.swing.JSlider"].getForeground ();
}return a;
});
c$ = Clazz.p0p ();
};
});

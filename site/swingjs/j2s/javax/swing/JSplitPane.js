Clazz.declarePackage ("javax.swing");
Clazz.load (["javax.swing.JComponent"], "javax.swing.JSplitPane", ["java.lang.Boolean", "$.IllegalArgumentException", "javax.swing.JButton", "$.UIManager"], function () {
c$ = Clazz.decorateAsClass (function () {
this.orientation = 0;
this.continuousLayout = false;
this.leftComponent = null;
this.rightComponent = null;
this.dividerSize = 0;
this.dividerSizeSet = false;
this.oneTouchExpandable = false;
this.oneTouchExpandableSet = false;
this.lastDividerLocation = 0;
this.resizeWeight = 0;
this.dividerLocation = 0;
Clazz.instantialize (this, arguments);
}, javax.swing, "JSplitPane", javax.swing.JComponent);
Clazz.makeConstructor (c$, 
function () {
this.construct (1, false,  new javax.swing.JButton (javax.swing.UIManager.getString ("SplitPane.leftButtonText")),  new javax.swing.JButton (javax.swing.UIManager.getString ("SplitPane.rightButtonText")));
});
Clazz.makeConstructor (c$, 
function (newOrientation) {
this.construct (newOrientation, false);
}, "~N");
Clazz.makeConstructor (c$, 
function (newOrientation, newContinuousLayout) {
this.construct (newOrientation, newContinuousLayout, null, null);
}, "~N,~B");
Clazz.makeConstructor (c$, 
function (newOrientation, newLeftComponent, newRightComponent) {
this.construct (newOrientation, false, newLeftComponent, newRightComponent);
}, "~N,java.awt.Component,java.awt.Component");
Clazz.makeConstructor (c$, 
function (newOrientation, newContinuousLayout, newLeftComponent, newRightComponent) {
Clazz.superConstructor (this, javax.swing.JSplitPane);
this.dividerLocation = -1;
this.setLayout (null);
this.setUIProperty ("opaque", Boolean.TRUE);
this.orientation = newOrientation;
if (this.orientation != 1 && this.orientation != 0) throw  new IllegalArgumentException ("cannot create JSplitPane, orientation must be one of JSplitPane.HORIZONTAL_SPLIT or JSplitPane.VERTICAL_SPLIT");
this.continuousLayout = newContinuousLayout;
if (newLeftComponent != null) this.setLeftComponent (newLeftComponent);
if (newRightComponent != null) this.setRightComponent (newRightComponent);
this.updateUI ();
}, "~N,~B,java.awt.Component,java.awt.Component");
Clazz.defineMethod (c$, "setUI", 
function (ui) {
if (this.ui !== ui) {
Clazz.superCall (this, javax.swing.JSplitPane, "setUI", [ui]);
this.revalidate ();
}}, "javax.swing.plaf.SplitPaneUI");
Clazz.overrideMethod (c$, "getUI", 
function () {
return this.ui;
});
Clazz.overrideMethod (c$, "updateUI", 
function () {
this.setUI (javax.swing.UIManager.getUI (this));
this.revalidate ();
});
Clazz.overrideMethod (c$, "getUIClassID", 
function () {
return "SplitPaneUI";
});
Clazz.defineMethod (c$, "setDividerSize", 
function (newSize) {
var oldSize = this.dividerSize;
this.dividerSizeSet = true;
if (oldSize != newSize) {
this.dividerSize = newSize;
this.firePropertyChangeInt ("dividerSize", oldSize, newSize);
}}, "~N");
Clazz.defineMethod (c$, "getDividerSize", 
function () {
return this.dividerSize;
});
Clazz.defineMethod (c$, "setLeftComponent", 
function (comp) {
if (comp == null) {
if (this.leftComponent != null) {
this.remove (this.leftComponent);
this.leftComponent = null;
}} else {
this.add (comp, "left");
}}, "java.awt.Component");
Clazz.defineMethod (c$, "getLeftComponent", 
function () {
return this.leftComponent;
});
Clazz.defineMethod (c$, "setTopComponent", 
function (comp) {
this.setLeftComponent (comp);
}, "java.awt.Component");
Clazz.defineMethod (c$, "getTopComponent", 
function () {
return this.leftComponent;
});
Clazz.defineMethod (c$, "setRightComponent", 
function (comp) {
if (comp == null) {
if (this.rightComponent != null) {
this.remove (this.rightComponent);
this.rightComponent = null;
}} else {
this.add (comp, "right");
}}, "java.awt.Component");
Clazz.defineMethod (c$, "getRightComponent", 
function () {
return this.rightComponent;
});
Clazz.defineMethod (c$, "setBottomComponent", 
function (comp) {
this.setRightComponent (comp);
}, "java.awt.Component");
Clazz.defineMethod (c$, "getBottomComponent", 
function () {
return this.rightComponent;
});
Clazz.defineMethod (c$, "setOneTouchExpandable", 
function (newValue) {
var oldValue = this.oneTouchExpandable;
this.oneTouchExpandable = newValue;
this.oneTouchExpandableSet = true;
this.firePropertyChangeBool ("oneTouchExpandable", oldValue, newValue);
this.repaint ();
}, "~B");
Clazz.defineMethod (c$, "isOneTouchExpandable", 
function () {
return this.oneTouchExpandable;
});
Clazz.defineMethod (c$, "setLastDividerLocation", 
function (newLastLocation) {
var oldLocation = this.lastDividerLocation;
this.lastDividerLocation = newLastLocation;
this.firePropertyChangeInt ("lastDividerLocation", oldLocation, newLastLocation);
}, "~N");
Clazz.defineMethod (c$, "getLastDividerLocation", 
function () {
return this.lastDividerLocation;
});
Clazz.defineMethod (c$, "setOrientation", 
function (orientation) {
if ((orientation != 0) && (orientation != 1)) {
throw  new IllegalArgumentException ("JSplitPane: orientation must be one of JSplitPane.VERTICAL_SPLIT or JSplitPane.HORIZONTAL_SPLIT");
}var oldOrientation = this.orientation;
this.orientation = orientation;
this.firePropertyChangeInt ("orientation", oldOrientation, orientation);
}, "~N");
Clazz.defineMethod (c$, "getOrientation", 
function () {
return this.orientation;
});
Clazz.defineMethod (c$, "setContinuousLayout", 
function (newContinuousLayout) {
var oldCD = this.continuousLayout;
this.continuousLayout = newContinuousLayout;
this.firePropertyChangeBool ("continuousLayout", oldCD, newContinuousLayout);
}, "~B");
Clazz.defineMethod (c$, "isContinuousLayout", 
function () {
return this.continuousLayout;
});
Clazz.defineMethod (c$, "setResizeWeight", 
function (value) {
if (value < 0 || value > 1) {
throw  new IllegalArgumentException ("JSplitPane weight must be between 0 and 1");
}var oldWeight = this.resizeWeight;
this.resizeWeight = value;
this.firePropertyChangeObject ("resizeWeight", new Double (oldWeight), new Double (value));
}, "~N");
Clazz.defineMethod (c$, "getResizeWeight", 
function () {
return this.resizeWeight;
});
Clazz.defineMethod (c$, "resetToPreferredSizes", 
function () {
var ui = this.getUI ();
if (ui != null) {
ui.resetToPreferredSizes (this);
}});
Clazz.defineMethod (c$, "setDividerLocation", 
function (proportionalLocation) {
if (proportionalLocation < 0.0 || proportionalLocation > 1.0) {
throw  new IllegalArgumentException ("proportional location must be between 0.0 and 1.0.");
}if (this.getOrientation () == 0) {
this.setDividerLocation (Clazz.doubleToInt ((this.getHeight () - this.getDividerSize ()) * proportionalLocation));
} else {
this.setDividerLocation (Clazz.doubleToInt ((this.getWidth () - this.getDividerSize ()) * proportionalLocation));
}}, "~N");
Clazz.defineMethod (c$, "setDividerLocation", 
function (location) {
var oldValue = this.dividerLocation;
this.dividerLocation = location;
var ui = this.getUI ();
if (ui != null) {
ui.setDividerLocation (this, location);
}this.firePropertyChangeInt ("dividerLocation", oldValue, location);
this.setLastDividerLocation (oldValue);
}, "~N");
Clazz.defineMethod (c$, "getDividerLocation", 
function () {
return this.dividerLocation;
});
Clazz.defineMethod (c$, "getMinimumDividerLocation", 
function () {
var ui = this.getUI ();
if (ui != null) {
return ui.getMinimumDividerLocation (this);
}return -1;
});
Clazz.defineMethod (c$, "getMaximumDividerLocation", 
function () {
var ui = this.getUI ();
if (ui != null) {
return ui.getMaximumDividerLocation (this);
}return -1;
});
Clazz.defineMethod (c$, "remove", 
function (component) {
if (component === this.leftComponent) {
this.leftComponent = null;
} else if (component === this.rightComponent) {
this.rightComponent = null;
}Clazz.superCall (this, javax.swing.JSplitPane, "remove", [component]);
this.revalidate ();
this.repaint ();
}, "java.awt.Component");
Clazz.defineMethod (c$, "remove", 
function (index) {
var comp = this.getComponent (index);
if (comp === this.leftComponent) {
this.leftComponent = null;
} else if (comp === this.rightComponent) {
this.rightComponent = null;
}Clazz.superCall (this, javax.swing.JSplitPane, "remove", [index]);
this.revalidate ();
this.repaint ();
}, "~N");
Clazz.defineMethod (c$, "removeAll", 
function () {
this.leftComponent = this.rightComponent = null;
Clazz.superCall (this, javax.swing.JSplitPane, "removeAll", []);
this.revalidate ();
this.repaint ();
});
Clazz.overrideMethod (c$, "isValidateRoot", 
function () {
return true;
});
Clazz.overrideMethod (c$, "addImpl", 
function (comp, constraints, index) {
var toRemove;
if (constraints != null && !(Clazz.instanceOf (constraints, String))) {
throw  new IllegalArgumentException ("cannot add to layout: constraint must be a string (or null)");
}if (constraints == null) {
if (this.getLeftComponent () == null) {
constraints = "left";
} else if (this.getRightComponent () == null) {
constraints = "right";
}}if (constraints != null && (constraints.equals ("left") || constraints.equals ("top"))) {
toRemove = this.getLeftComponent ();
if (toRemove != null) {
this.remove (toRemove);
}this.leftComponent = comp;
index = -1;
} else if (constraints != null && (constraints.equals ("right") || constraints.equals ("bottom"))) {
toRemove = this.getRightComponent ();
if (toRemove != null) {
this.remove (toRemove);
}this.rightComponent = comp;
index = -1;
} else if (constraints != null && constraints.equals ("divider")) {
index = -1;
}this.addImplSAEM (comp, constraints, index);
this.revalidate ();
this.repaint ();
return comp;
}, "java.awt.Component,~O,~N");
Clazz.defineMethod (c$, "paintChildren", 
function (g) {
Clazz.superCall (this, javax.swing.JSplitPane, "paintChildren", [g]);
var ui = this.getUI ();
if (ui != null) {
var tempG = g.createSwingJS ();
ui.finishedPaintingChildren (this, tempG);
tempG.dispose ();
}}, "java.awt.Graphics");
Clazz.defineMethod (c$, "setUIProperty", 
function (propertyName, value) {
if (propertyName === "dividerSize") {
if (!this.dividerSizeSet) {
this.setDividerSize ((value).intValue ());
this.dividerSizeSet = false;
}} else if (propertyName === "oneTouchExpandable") {
if (!this.oneTouchExpandableSet) {
this.setOneTouchExpandable ((value).booleanValue ());
this.oneTouchExpandableSet = false;
}} else {
Clazz.superCall (this, javax.swing.JSplitPane, "setUIProperty", [propertyName, value]);
}}, "~S,~O");
Clazz.defineMethod (c$, "paramString", 
function () {
var orientationString = (this.orientation == 1 ? "HORIZONTAL_SPLIT" : "VERTICAL_SPLIT");
var continuousLayoutString = (this.continuousLayout ? "true" : "false");
var oneTouchExpandableString = (this.oneTouchExpandable ? "true" : "false");
return Clazz.superCall (this, javax.swing.JSplitPane, "paramString", []) + ",continuousLayout=" + continuousLayoutString + ",dividerSize=" + this.dividerSize + ",lastDividerLocation=" + this.lastDividerLocation + ",oneTouchExpandable=" + oneTouchExpandableString + ",orientation=" + orientationString;
});
Clazz.defineStatics (c$,
"$uiClassID", "SplitPaneUI",
"VERTICAL_SPLIT", 0,
"HORIZONTAL_SPLIT", 1,
"LEFT", "left",
"RIGHT", "right",
"TOP", "top",
"BOTTOM", "bottom",
"DIVIDER", "divider",
"ORIENTATION_PROPERTY", "orientation",
"CONTINUOUS_LAYOUT_PROPERTY", "continuousLayout",
"DIVIDER_SIZE_PROPERTY", "dividerSize",
"ONE_TOUCH_EXPANDABLE_PROPERTY", "oneTouchExpandable",
"LAST_DIVIDER_LOCATION_PROPERTY", "lastDividerLocation",
"DIVIDER_LOCATION_PROPERTY", "dividerLocation",
"RESIZE_WEIGHT_PROPERTY", "resizeWeight");
});

Clazz.declarePackage ("jsjavax.swing");
Clazz.load (["jsjava.awt.LayoutManager2", "jsjava.beans.PropertyChangeListener", "jsjavax.swing.JComponent", "$.JSeparator", "$.SwingConstants", "jsjavax.swing.plaf.UIResource"], "jsjavax.swing.JToolBar", ["java.lang.Boolean", "$.IllegalArgumentException", "jsjava.awt.Insets", "jsjavax.swing.BoxLayout", "$.JButton", "$.UIManager"], function () {
c$ = Clazz.decorateAsClass (function () {
this.$paintBorder = true;
this.margin = null;
this.floatable = true;
this.orientation = 0;
if (!Clazz.isClassDefined ("jsjavax.swing.JToolBar.DefaultToolBarLayout")) {
jsjavax.swing.JToolBar.$JToolBar$DefaultToolBarLayout$ ();
}
Clazz.instantialize (this, arguments);
}, jsjavax.swing, "JToolBar", jsjavax.swing.JComponent, jsjavax.swing.SwingConstants);
Clazz.makeConstructor (c$, 
function () {
this.construct (0);
});
Clazz.makeConstructor (c$, 
function (orientation) {
this.construct (null, orientation);
}, "~N");
Clazz.makeConstructor (c$, 
function (name) {
this.construct (name, 0);
}, "~S");
Clazz.makeConstructor (c$, 
function (name, orientation) {
Clazz.superConstructor (this, jsjavax.swing.JToolBar, []);
this.setName (name);
this.checkOrientation (orientation);
this.orientation = orientation;
var layout = Clazz.innerTypeInstance (jsjavax.swing.JToolBar.DefaultToolBarLayout, this, null, orientation);
this.setLayout (layout);
this.addPropertyChangeListener (layout);
this.updateUI ();
}, "~S,~N");
Clazz.defineMethod (c$, "getUI", 
function () {
return this.ui;
});
Clazz.overrideMethod (c$, "updateUI", 
function () {
this.setUI (jsjavax.swing.UIManager.getUI (this));
if (this.getLayout () == null) {
this.setLayout (Clazz.innerTypeInstance (jsjavax.swing.JToolBar.DefaultToolBarLayout, this, null, this.getOrientation ()));
}this.invalidate ();
});
Clazz.overrideMethod (c$, "getUIClassID", 
function () {
return "ToolBarUI";
});
Clazz.defineMethod (c$, "getComponentIndex", 
function (c) {
var ncomponents = this.getComponentCount ();
var component = this.getComponents ();
for (var i = 0; i < ncomponents; i++) {
var comp = component[i];
if (comp === c) return i;
}
return -1;
}, "jsjava.awt.Component");
Clazz.defineMethod (c$, "getComponentAtIndex", 
function (i) {
var ncomponents = this.getComponentCount ();
if (i >= 0 && i < ncomponents) {
var component = this.getComponents ();
return component[i];
}return null;
}, "~N");
Clazz.defineMethod (c$, "setMargin", 
function (m) {
var old = this.margin;
this.margin = m;
this.firePropertyChange ("margin", old, m);
this.revalidate ();
this.repaint ();
}, "jsjava.awt.Insets");
Clazz.defineMethod (c$, "getMargin", 
function () {
if (this.margin == null) {
return  new jsjava.awt.Insets (0, 0, 0, 0);
} else {
return this.margin;
}});
Clazz.defineMethod (c$, "isBorderPainted", 
function () {
return this.$paintBorder;
});
Clazz.defineMethod (c$, "setBorderPainted", 
function (b) {
if (this.$paintBorder != b) {
var old = this.$paintBorder;
this.$paintBorder = b;
this.firePropertyChange ("borderPainted", old, b);
this.revalidate ();
this.repaint ();
}}, "~B");
Clazz.defineMethod (c$, "paintBorder", 
function (g) {
if (this.isBorderPainted ()) {
Clazz.superCall (this, jsjavax.swing.JToolBar, "paintBorder", [g]);
}}, "jsjava.awt.Graphics");
Clazz.defineMethod (c$, "isFloatable", 
function () {
return this.floatable;
});
Clazz.defineMethod (c$, "setFloatable", 
function (b) {
if (this.floatable != b) {
var old = this.floatable;
this.floatable = b;
this.firePropertyChange ("floatable", old, b);
this.revalidate ();
this.repaint ();
}}, "~B");
Clazz.defineMethod (c$, "getOrientation", 
function () {
return this.orientation;
});
Clazz.defineMethod (c$, "setOrientation", 
function (o) {
this.checkOrientation (o);
if (this.orientation != o) {
var old = this.orientation;
this.orientation = o;
this.firePropertyChange ("orientation", old, o);
this.revalidate ();
this.repaint ();
}}, "~N");
Clazz.defineMethod (c$, "setRollover", 
function (rollover) {
this.putClientProperty ("JToolBar.isRollover", rollover ? Boolean.TRUE : Boolean.FALSE);
}, "~B");
Clazz.defineMethod (c$, "isRollover", 
function () {
var rollover = this.getClientProperty ("JToolBar.isRollover");
if (rollover != null) {
return rollover.booleanValue ();
}return false;
});
Clazz.defineMethod (c$, "checkOrientation", 
($fz = function (orientation) {
switch (orientation) {
case 1:
case 0:
break;
default:
throw  new IllegalArgumentException ("orientation must be one of: VERTICAL, HORIZONTAL");
}
}, $fz.isPrivate = true, $fz), "~N");
Clazz.defineMethod (c$, "addSeparator", 
function () {
this.addSeparator (null);
});
Clazz.defineMethod (c$, "addSeparator", 
function (size) {
var s =  new jsjavax.swing.JToolBar.Separator (size);
this.add (s);
}, "jsjava.awt.Dimension");
Clazz.defineMethod (c$, "add", 
function (a) {
var b = this.createActionComponent (a);
b.setAction (a);
this.add (b);
return b;
}, "jsjavax.swing.Action");
Clazz.defineMethod (c$, "createActionComponent", 
function (a) {
var b = ((Clazz.isClassDefined ("jsjavax.swing.JToolBar$1") ? 0 : jsjavax.swing.JToolBar.$JToolBar$1$ ()), Clazz.innerTypeInstance (jsjavax.swing.JToolBar$1, this, null));
if (a != null && (a.getValue ("SmallIcon") != null || a.getValue ("SwingLargeIconKey") != null)) {
b.setHideActionText (true);
}b.setHorizontalTextPosition (0);
b.setVerticalTextPosition (3);
return b;
}, "jsjavax.swing.Action");
Clazz.defineMethod (c$, "createActionChangeListener", 
function (b) {
return null;
}, "jsjavax.swing.JButton");
Clazz.defineMethod (c$, "addImpl", 
function (comp, constraints, index) {
if (Clazz.instanceOf (comp, jsjavax.swing.JToolBar.Separator)) {
if (this.getOrientation () == 1) {
(comp).setOrientation (0);
} else {
(comp).setOrientation (1);
}}Clazz.superCall (this, jsjavax.swing.JToolBar, "addImpl", [comp, constraints, index]);
if (Clazz.instanceOf (comp, jsjavax.swing.JButton)) {
(comp).setDefaultCapable (false);
}}, "jsjava.awt.Component,~O,~N");
Clazz.defineMethod (c$, "paramString", 
function () {
var paintBorderString = (this.$paintBorder ? "true" : "false");
var marginString = (this.margin != null ? this.margin.toString () : "");
var floatableString = (this.floatable ? "true" : "false");
var orientationString = (this.orientation == 0 ? "HORIZONTAL" : "VERTICAL");
return Clazz.superCall (this, jsjavax.swing.JToolBar, "paramString", []) + ",floatable=" + floatableString + ",margin=" + marginString + ",orientation=" + orientationString + ",paintBorder=" + paintBorderString;
});
Clazz.defineMethod (c$, "setLayout", 
function (mgr) {
var oldMgr = this.getLayout ();
if (Clazz.instanceOf (oldMgr, jsjava.beans.PropertyChangeListener)) {
this.removePropertyChangeListener (oldMgr);
}Clazz.superCall (this, jsjavax.swing.JToolBar, "setLayout", [mgr]);
}, "jsjava.awt.LayoutManager");
c$.$JToolBar$DefaultToolBarLayout$ = function () {
Clazz.pu$h ();
c$ = Clazz.decorateAsClass (function () {
Clazz.prepareCallback (this, arguments);
this.lm = null;
Clazz.instantialize (this, arguments);
}, jsjavax.swing.JToolBar, "DefaultToolBarLayout", null, [jsjava.awt.LayoutManager2, jsjava.beans.PropertyChangeListener, jsjavax.swing.plaf.UIResource]);
Clazz.makeConstructor (c$, 
function (a) {
if (a == 1) {
this.lm =  new jsjavax.swing.BoxLayout (this.b$["jsjavax.swing.JToolBar"], 3);
} else {
this.lm =  new jsjavax.swing.BoxLayout (this.b$["jsjavax.swing.JToolBar"], 2);
}}, "~N");
Clazz.defineMethod (c$, "addLayoutComponent", 
function (a, b) {
this.lm.addLayoutComponent (a, b);
}, "~S,jsjava.awt.Component");
Clazz.defineMethod (c$, "addLayoutComponent", 
function (a, b) {
this.lm.addLayoutComponent (a, b);
}, "jsjava.awt.Component,~O");
Clazz.overrideMethod (c$, "removeLayoutComponent", 
function (a) {
this.lm.removeLayoutComponent (a);
}, "jsjava.awt.Component");
Clazz.overrideMethod (c$, "preferredLayoutSize", 
function (a) {
return this.lm.preferredLayoutSize (a);
}, "jsjava.awt.Container");
Clazz.overrideMethod (c$, "minimumLayoutSize", 
function (a) {
return this.lm.minimumLayoutSize (a);
}, "jsjava.awt.Container");
Clazz.overrideMethod (c$, "maximumLayoutSize", 
function (a) {
return this.lm.maximumLayoutSize (a);
}, "jsjava.awt.Container");
Clazz.overrideMethod (c$, "layoutContainer", 
function (a) {
this.lm.layoutContainer (a);
}, "jsjava.awt.Container");
Clazz.overrideMethod (c$, "getLayoutAlignmentX", 
function (a) {
return this.lm.getLayoutAlignmentX (a);
}, "jsjava.awt.Container");
Clazz.overrideMethod (c$, "getLayoutAlignmentY", 
function (a) {
return this.lm.getLayoutAlignmentY (a);
}, "jsjava.awt.Container");
Clazz.overrideMethod (c$, "invalidateLayout", 
function (a) {
this.lm.invalidateLayout (a);
}, "jsjava.awt.Container");
Clazz.overrideMethod (c$, "propertyChange", 
function (a) {
var b = a.getPropertyName ();
if (b.equals ("orientation")) {
var c = (a.getNewValue ()).intValue ();
if (c == 1) this.lm =  new jsjavax.swing.BoxLayout (this.b$["jsjavax.swing.JToolBar"], 3);
 else {
this.lm =  new jsjavax.swing.BoxLayout (this.b$["jsjavax.swing.JToolBar"], 2);
}}}, "jsjava.beans.PropertyChangeEvent");
c$ = Clazz.p0p ();
};
c$.$JToolBar$1$ = function () {
Clazz.pu$h ();
c$ = Clazz.declareAnonymous (jsjavax.swing, "JToolBar$1", jsjavax.swing.JButton);
Clazz.defineMethod (c$, "createActionPropertyChangeListener", 
function (a) {
var pcl = this.b$["jsjavax.swing.JToolBar"].createActionChangeListener (this);
if (pcl == null) {
pcl = Clazz.superCall (this, jsjavax.swing.JToolBar$1, "createActionPropertyChangeListener", [a]);
}return pcl;
}, "jsjavax.swing.Action");
c$ = Clazz.p0p ();
};
Clazz.pu$h ();
c$ = Clazz.decorateAsClass (function () {
this.separatorSize = null;
Clazz.instantialize (this, arguments);
}, jsjavax.swing.JToolBar, "Separator", jsjavax.swing.JSeparator);
Clazz.makeConstructor (c$, 
function () {
this.construct (null);
});
Clazz.makeConstructor (c$, 
function (a) {
Clazz.superConstructor (this, jsjavax.swing.JToolBar.Separator, [0]);
this.setSeparatorSize (a);
}, "jsjava.awt.Dimension");
Clazz.overrideMethod (c$, "getUIClassID", 
function () {
return "ToolBarSeparatorUI";
});
Clazz.defineMethod (c$, "setSeparatorSize", 
function (a) {
if (a != null) {
this.separatorSize = a;
} else {
Clazz.superCall (this, jsjavax.swing.JToolBar.Separator, "updateUI", []);
}this.invalidate ();
}, "jsjava.awt.Dimension");
Clazz.defineMethod (c$, "getSeparatorSize", 
function () {
return this.separatorSize;
});
Clazz.defineMethod (c$, "getMinimumSize", 
function () {
if (this.separatorSize != null) {
return this.separatorSize.getSize ();
} else {
return Clazz.superCall (this, jsjavax.swing.JToolBar.Separator, "getMinimumSize", []);
}});
Clazz.defineMethod (c$, "getMaximumSize", 
function () {
if (this.separatorSize != null) {
return this.separatorSize.getSize ();
} else {
return Clazz.superCall (this, jsjavax.swing.JToolBar.Separator, "getMaximumSize", []);
}});
Clazz.defineMethod (c$, "getPreferredSize", 
function () {
if (this.separatorSize != null) {
return this.separatorSize.getSize ();
} else {
return Clazz.superCall (this, jsjavax.swing.JToolBar.Separator, "getPreferredSize", []);
}});
c$ = Clazz.p0p ();
Clazz.defineStatics (c$,
"$uiClassID", "ToolBarUI");
});

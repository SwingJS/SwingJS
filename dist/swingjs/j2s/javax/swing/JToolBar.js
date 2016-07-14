Clazz.declarePackage ("javax.swing");
Clazz.load (["java.awt.LayoutManager2", "java.beans.PropertyChangeListener", "javax.swing.JComponent", "$.JSeparator", "$.SwingConstants", "javax.swing.plaf.UIResource"], "javax.swing.JToolBar", ["java.lang.Boolean", "$.IllegalArgumentException", "java.awt.Insets", "javax.swing.BoxLayout", "$.JButton"], function () {
c$ = Clazz.decorateAsClass (function () {
this.$paintBorder = true;
this.margin = null;
this.floatable = true;
this.orientation = 0;
if (!Clazz.isClassDefined ("javax.swing.JToolBar.DefaultToolBarLayout")) {
javax.swing.JToolBar.$JToolBar$DefaultToolBarLayout$ ();
}
Clazz.instantialize (this, arguments);
}, javax.swing, "JToolBar", javax.swing.JComponent, javax.swing.SwingConstants);
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
Clazz.superConstructor (this, javax.swing.JToolBar, []);
this.setName (name);
this.checkOrientation (orientation);
this.orientation = orientation;
var layout = Clazz.innerTypeInstance (javax.swing.JToolBar.DefaultToolBarLayout, this, null, orientation);
this.setLayout (layout);
this.addPropertyChangeListener (layout);
this.uiClassID = "ToolBarUI";
this.updateUI ();
}, "~S,~N");
Clazz.defineMethod (c$, "updateUI", 
function () {
Clazz.superCall (this, javax.swing.JToolBar, "updateUI", []);
if (this.getLayout () == null) {
this.setLayout (Clazz.innerTypeInstance (javax.swing.JToolBar.DefaultToolBarLayout, this, null, this.getOrientation ()));
}this.invalidate ();
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
}, "java.awt.Component");
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
this.firePropertyChangeObject ("margin", old, m);
this.revalidate ();
this.repaint ();
}, "java.awt.Insets");
Clazz.defineMethod (c$, "getMargin", 
function () {
if (this.margin == null) {
return  new java.awt.Insets (0, 0, 0, 0);
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
this.firePropertyChangeBool ("borderPainted", old, b);
this.revalidate ();
this.repaint ();
}}, "~B");
Clazz.defineMethod (c$, "paintBorder", 
function (g) {
if (this.isBorderPainted ()) {
Clazz.superCall (this, javax.swing.JToolBar, "paintBorder", [g]);
}}, "java.awt.Graphics");
Clazz.defineMethod (c$, "isFloatable", 
function () {
return this.floatable;
});
Clazz.defineMethod (c$, "setFloatable", 
function (b) {
if (this.floatable != b) {
var old = this.floatable;
this.floatable = b;
this.firePropertyChangeBool ("floatable", old, b);
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
this.firePropertyChangeInt ("orientation", old, o);
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
 function (orientation) {
switch (orientation) {
case 1:
case 0:
break;
default:
throw  new IllegalArgumentException ("orientation must be one of: VERTICAL, HORIZONTAL");
}
}, "~N");
Clazz.defineMethod (c$, "addSeparator", 
function () {
this.addSeparator (null);
});
Clazz.defineMethod (c$, "addSeparator", 
function (size) {
var s =  new javax.swing.JToolBar.Separator (size);
this.add (s);
}, "java.awt.Dimension");
Clazz.defineMethod (c$, "add", 
function (a) {
var b = this.createActionComponent (a);
b.setAction (a);
this.add (b);
return b;
}, "javax.swing.Action");
Clazz.defineMethod (c$, "createActionComponent", 
function (a) {
var b = ((Clazz.isClassDefined ("javax.swing.JToolBar$1") ? 0 : javax.swing.JToolBar.$JToolBar$1$ ()), Clazz.innerTypeInstance (javax.swing.JToolBar$1, this, null));
if (a != null && (a.getValue ("SmallIcon") != null || a.getValue ("SwingLargeIconKey") != null)) {
b.setHideActionText (true);
}b.setHorizontalTextPosition (0);
b.setVerticalTextPosition (3);
return b;
}, "javax.swing.Action");
Clazz.defineMethod (c$, "createActionChangeListener", 
function (b) {
return null;
}, "javax.swing.JButton");
Clazz.overrideMethod (c$, "addImpl", 
function (comp, constraints, index) {
if (Clazz.instanceOf (comp, javax.swing.JToolBar.Separator)) {
if (this.getOrientation () == 1) {
(comp).setOrientation (0);
} else {
(comp).setOrientation (1);
}}this.addImplSAEM (comp, constraints, index);
if (Clazz.instanceOf (comp, javax.swing.JButton)) {
(comp).setDefaultCapable (false);
}return comp;
}, "java.awt.Component,~O,~N");
Clazz.defineMethod (c$, "paramString", 
function () {
var paintBorderString = (this.$paintBorder ? "true" : "false");
var marginString = (this.margin != null ? this.margin.toString () : "");
var floatableString = (this.floatable ? "true" : "false");
var orientationString = (this.orientation == 0 ? "HORIZONTAL" : "VERTICAL");
return Clazz.superCall (this, javax.swing.JToolBar, "paramString", []) + ",floatable=" + floatableString + ",margin=" + marginString + ",orientation=" + orientationString + ",paintBorder=" + paintBorderString;
});
Clazz.defineMethod (c$, "setLayout", 
function (mgr) {
var oldMgr = this.getLayout ();
if (Clazz.instanceOf (oldMgr, java.beans.PropertyChangeListener)) {
this.removePropertyChangeListener (oldMgr);
}Clazz.superCall (this, javax.swing.JToolBar, "setLayout", [mgr]);
}, "java.awt.LayoutManager");
c$.$JToolBar$DefaultToolBarLayout$ = function () {
Clazz.pu$h(self.c$);
c$ = Clazz.decorateAsClass (function () {
Clazz.prepareCallback (this, arguments);
this.lm = null;
Clazz.instantialize (this, arguments);
}, javax.swing.JToolBar, "DefaultToolBarLayout", null, [java.awt.LayoutManager2, java.beans.PropertyChangeListener, javax.swing.plaf.UIResource]);
Clazz.makeConstructor (c$, 
function (a) {
if (a == 1) {
this.lm =  new javax.swing.BoxLayout (this.b$["javax.swing.JToolBar"], 3);
} else {
this.lm =  new javax.swing.BoxLayout (this.b$["javax.swing.JToolBar"], 2);
}}, "~N");
Clazz.defineMethod (c$, "addLayoutComponent", 
function (a, b) {
this.lm.addLayoutComponent (a, b);
}, "~S,java.awt.Component");
Clazz.defineMethod (c$, "addLayoutComponent", 
function (a, b) {
this.lm.addLayoutComponent (a, b);
}, "java.awt.Component,~O");
Clazz.overrideMethod (c$, "removeLayoutComponent", 
function (a) {
this.lm.removeLayoutComponent (a);
}, "java.awt.Component");
Clazz.overrideMethod (c$, "preferredLayoutSize", 
function (a) {
return this.lm.preferredLayoutSize (a);
}, "java.awt.Container");
Clazz.overrideMethod (c$, "minimumLayoutSize", 
function (a) {
return this.lm.minimumLayoutSize (a);
}, "java.awt.Container");
Clazz.overrideMethod (c$, "maximumLayoutSize", 
function (a) {
return this.lm.maximumLayoutSize (a);
}, "java.awt.Container");
Clazz.overrideMethod (c$, "layoutContainer", 
function (a) {
this.lm.layoutContainer (a);
}, "java.awt.Container");
Clazz.overrideMethod (c$, "getLayoutAlignmentX", 
function (a) {
return this.lm.getLayoutAlignmentX (a);
}, "java.awt.Container");
Clazz.overrideMethod (c$, "getLayoutAlignmentY", 
function (a) {
return this.lm.getLayoutAlignmentY (a);
}, "java.awt.Container");
Clazz.overrideMethod (c$, "invalidateLayout", 
function (a) {
this.lm.invalidateLayout (a);
}, "java.awt.Container");
Clazz.overrideMethod (c$, "propertyChange", 
function (a) {
var b = a.getPropertyName ();
if (b.equals ("orientation")) {
var c = (a.getNewValue ()).intValue ();
if (c == 1) this.lm =  new javax.swing.BoxLayout (this.b$["javax.swing.JToolBar"], 3);
 else {
this.lm =  new javax.swing.BoxLayout (this.b$["javax.swing.JToolBar"], 2);
}}}, "java.beans.PropertyChangeEvent");
c$ = Clazz.p0p ();
};
c$.$JToolBar$1$ = function () {
Clazz.pu$h(self.c$);
c$ = Clazz.declareAnonymous (javax.swing, "JToolBar$1", javax.swing.JButton);
Clazz.defineMethod (c$, "createActionPropertyChangeListener", 
function (a) {
var pcl = this.b$["javax.swing.JToolBar"].createActionChangeListener (this);
if (pcl == null) {
pcl = Clazz.superCall (this, javax.swing.JToolBar$1, "createActionPropertyChangeListener", [a]);
}return pcl;
}, "javax.swing.Action");
c$ = Clazz.p0p ();
};
Clazz.pu$h(self.c$);
c$ = Clazz.decorateAsClass (function () {
this.separatorSize = null;
Clazz.instantialize (this, arguments);
}, javax.swing.JToolBar, "Separator", javax.swing.JSeparator);
Clazz.makeConstructor (c$, 
function () {
this.construct (null);
});
Clazz.makeConstructor (c$, 
function (a) {
Clazz.superConstructor (this, javax.swing.JToolBar.Separator, [0, "ToolBarSeparatorUI"]);
this.setSeparatorSize (a);
}, "java.awt.Dimension");
Clazz.defineMethod (c$, "setSeparatorSize", 
function (a) {
if (a != null) {
this.separatorSize = a;
} else {
Clazz.superCall (this, javax.swing.JToolBar.Separator, "updateUI", []);
}this.invalidate ();
}, "java.awt.Dimension");
Clazz.defineMethod (c$, "getSeparatorSize", 
function () {
return this.separatorSize;
});
Clazz.defineMethod (c$, "getMinimumSize", 
function () {
if (this.separatorSize != null) {
return this.separatorSize.getSize ();
} else {
return Clazz.superCall (this, javax.swing.JToolBar.Separator, "getMinimumSize", []);
}});
Clazz.defineMethod (c$, "getMaximumSize", 
function () {
if (this.separatorSize != null) {
return this.separatorSize.getSize ();
} else {
return Clazz.superCall (this, javax.swing.JToolBar.Separator, "getMaximumSize", []);
}});
Clazz.overrideMethod (c$, "getPreferredSize", 
function () {
if (this.separatorSize != null) {
return this.separatorSize.getSize ();
} else {
return this.getPrefSizeJComp ();
}});
c$ = Clazz.p0p ();
});

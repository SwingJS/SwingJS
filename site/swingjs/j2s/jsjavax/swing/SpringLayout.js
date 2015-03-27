Clazz.declarePackage ("jsjavax.swing");
Clazz.load (["jsjava.awt.LayoutManager2", "jsjavax.swing.Spring", "java.util.ArrayList", "$.HashMap"], "jsjavax.swing.SpringLayout", ["java.util.Collections", "$.HashSet", "jsjava.awt.Component", "$.Dimension", "jsjavax.swing.JComponent", "jsjavax.swing.Spring.HeightSpring", "$.SpringMap", "$.WidthSpring"], function () {
c$ = Clazz.decorateAsClass (function () {
this.componentConstraints = null;
this.cyclicReference = null;
this.cyclicSprings = null;
this.acyclicSprings = null;
Clazz.instantialize (this, arguments);
}, jsjavax.swing, "SpringLayout", null, jsjava.awt.LayoutManager2);
Clazz.prepareFields (c$, function () {
this.componentConstraints =  new java.util.HashMap ();
this.cyclicReference = jsjavax.swing.Spring.constant (-2147483648);
});
Clazz.makeConstructor (c$, 
function () {
});
Clazz.defineMethod (c$, "resetCyclicStatuses", 
($fz = function () {
this.cyclicSprings =  new java.util.HashSet ();
this.acyclicSprings =  new java.util.HashSet ();
}, $fz.isPrivate = true, $fz));
Clazz.defineMethod (c$, "setParent", 
($fz = function (p) {
this.resetCyclicStatuses ();
var pc = this.getConstraints (p);
pc.setX (jsjavax.swing.Spring.constant (0));
pc.setY (jsjavax.swing.Spring.constant (0));
var width = pc.getWidth ();
if (Clazz.instanceOf (width, jsjavax.swing.Spring.WidthSpring) && (width).c === p) {
pc.setWidth (jsjavax.swing.Spring.constant (0, 0, 2147483647));
}var height = pc.getHeight ();
if (Clazz.instanceOf (height, jsjavax.swing.Spring.HeightSpring) && (height).c === p) {
pc.setHeight (jsjavax.swing.Spring.constant (0, 0, 2147483647));
}}, $fz.isPrivate = true, $fz), "jsjava.awt.Container");
Clazz.defineMethod (c$, "isCyclic", 
function (s) {
if (s == null) {
return false;
}if (this.cyclicSprings.contains (s)) {
return true;
}if (this.acyclicSprings.contains (s)) {
return false;
}this.cyclicSprings.add (s);
var result = s.isCyclic (this);
if (!result) {
this.acyclicSprings.add (s);
this.cyclicSprings.remove (s);
} else {
System.err.println (s + " is cyclic. ");
}return result;
}, "jsjavax.swing.Spring");
Clazz.defineMethod (c$, "abandonCycles", 
($fz = function (s) {
return this.isCyclic (s) ? this.cyclicReference : s;
}, $fz.isPrivate = true, $fz), "jsjavax.swing.Spring");
Clazz.defineMethod (c$, "addLayoutComponent", 
function (name, c) {
}, "~S,jsjava.awt.Component");
Clazz.overrideMethod (c$, "removeLayoutComponent", 
function (c) {
this.componentConstraints.remove (c);
}, "jsjava.awt.Component");
c$.addInsets = Clazz.defineMethod (c$, "addInsets", 
($fz = function (width, height, p) {
var i = p.getInsets ();
return  new jsjava.awt.Dimension (width + i.left + i.right, height + i.top + i.bottom);
}, $fz.isPrivate = true, $fz), "~N,~N,jsjava.awt.Container");
Clazz.overrideMethod (c$, "minimumLayoutSize", 
function (parent) {
this.setParent (parent);
var pc = this.getConstraints (parent);
return jsjavax.swing.SpringLayout.addInsets (this.abandonCycles (pc.getWidth ()).getMinimumValue (), this.abandonCycles (pc.getHeight ()).getMinimumValue (), parent);
}, "jsjava.awt.Container");
Clazz.overrideMethod (c$, "preferredLayoutSize", 
function (parent) {
this.setParent (parent);
var pc = this.getConstraints (parent);
return jsjavax.swing.SpringLayout.addInsets (this.abandonCycles (pc.getWidth ()).getPreferredValue (), this.abandonCycles (pc.getHeight ()).getPreferredValue (), parent);
}, "jsjava.awt.Container");
Clazz.overrideMethod (c$, "maximumLayoutSize", 
function (parent) {
this.setParent (parent);
var pc = this.getConstraints (parent);
return jsjavax.swing.SpringLayout.addInsets (this.abandonCycles (pc.getWidth ()).getMaximumValue (), this.abandonCycles (pc.getHeight ()).getMaximumValue (), parent);
}, "jsjava.awt.Container");
Clazz.defineMethod (c$, "addLayoutComponent", 
function (component, constraints) {
if (Clazz.instanceOf (constraints, jsjavax.swing.SpringLayout.Constraints)) {
this.putConstraints (component, constraints);
}}, "jsjava.awt.Component,~O");
Clazz.overrideMethod (c$, "getLayoutAlignmentX", 
function (p) {
return 0.5;
}, "jsjava.awt.Container");
Clazz.overrideMethod (c$, "getLayoutAlignmentY", 
function (p) {
return 0.5;
}, "jsjava.awt.Container");
Clazz.overrideMethod (c$, "invalidateLayout", 
function (p) {
}, "jsjava.awt.Container");
Clazz.defineMethod (c$, "putConstraint", 
function (e1, c1, pad, e2, c2) {
this.putConstraint (e1, c1, jsjavax.swing.Spring.constant (pad), e2, c2);
}, "~S,jsjava.awt.Component,~N,~S,jsjava.awt.Component");
Clazz.defineMethod (c$, "putConstraint", 
function (e1, c1, s, e2, c2) {
this.putConstraint (e1, c1, jsjavax.swing.Spring.sum (s, this.getConstraint (e2, c2)));
}, "~S,jsjava.awt.Component,jsjavax.swing.Spring,~S,jsjava.awt.Component");
Clazz.defineMethod (c$, "putConstraint", 
($fz = function (e, c, s) {
if (s != null) {
this.getConstraints (c).setConstraint (e, s);
}}, $fz.isPrivate = true, $fz), "~S,jsjava.awt.Component,jsjavax.swing.Spring");
Clazz.defineMethod (c$, "applyDefaults", 
($fz = function (c, constraints) {
if (constraints == null) {
constraints =  new jsjavax.swing.SpringLayout.Constraints ();
}if (constraints.c == null) {
constraints.c = c;
}if (constraints.horizontalHistory.size () < 2) {
this.applyDefaults (constraints, "West", jsjavax.swing.Spring.constant (0), "Width", jsjavax.swing.Spring.width (c), constraints.horizontalHistory);
}if (constraints.verticalHistory.size () < 2) {
this.applyDefaults (constraints, "North", jsjavax.swing.Spring.constant (0), "Height", jsjavax.swing.Spring.height (c), constraints.verticalHistory);
}return constraints;
}, $fz.isPrivate = true, $fz), "jsjava.awt.Component,jsjavax.swing.SpringLayout.Constraints");
Clazz.defineMethod (c$, "applyDefaults", 
($fz = function (constraints, name1, spring1, name2, spring2, history) {
if (history.size () == 0) {
constraints.setConstraint (name1, spring1);
constraints.setConstraint (name2, spring2);
} else {
if (constraints.getConstraint (name2) == null) {
constraints.setConstraint (name2, spring2);
} else {
constraints.setConstraint (name1, spring1);
}java.util.Collections.rotate (history, 1);
}}, $fz.isPrivate = true, $fz), "jsjavax.swing.SpringLayout.Constraints,~S,jsjavax.swing.Spring,~S,jsjavax.swing.Spring,java.util.List");
Clazz.defineMethod (c$, "putConstraints", 
($fz = function (component, constraints) {
this.componentConstraints.put (component, this.applyDefaults (component, constraints));
}, $fz.isPrivate = true, $fz), "jsjava.awt.Component,jsjavax.swing.SpringLayout.Constraints");
Clazz.defineMethod (c$, "getConstraints", 
function (c) {
var result = this.componentConstraints.get (c);
if (result == null) {
if (Clazz.instanceOf (c, jsjavax.swing.JComponent)) {
var cp = (c).getClientProperty (jsjavax.swing.SpringLayout);
if (Clazz.instanceOf (cp, jsjavax.swing.SpringLayout.Constraints)) {
return this.applyDefaults (c, cp);
}}result =  new jsjavax.swing.SpringLayout.Constraints ();
this.putConstraints (c, result);
}return result;
}, "jsjava.awt.Component");
Clazz.defineMethod (c$, "getConstraint", 
function (edgeName, c) {
edgeName = edgeName.intern ();
return  new jsjavax.swing.SpringLayout.SpringProxy (edgeName, c, this);
}, "~S,jsjava.awt.Component");
Clazz.overrideMethod (c$, "layoutContainer", 
function (parent) {
this.setParent (parent);
var n = parent.getComponentCount ();
this.getConstraints (parent).reset ();
for (var i = 0; i < n; i++) {
this.getConstraints (parent.getComponent (i)).reset ();
}
var insets = parent.getInsets ();
var pc = this.getConstraints (parent);
this.abandonCycles (pc.getX ()).setValue (0);
this.abandonCycles (pc.getY ()).setValue (0);
this.abandonCycles (pc.getWidth ()).setValue (parent.getWidth () - insets.left - insets.right);
this.abandonCycles (pc.getHeight ()).setValue (parent.getHeight () - insets.top - insets.bottom);
for (var i = 0; i < n; i++) {
var c = parent.getComponent (i);
var cc = this.getConstraints (c);
var x = this.abandonCycles (cc.getX ()).getValue ();
var y = this.abandonCycles (cc.getY ()).getValue ();
var width = this.abandonCycles (cc.getWidth ()).getValue ();
var height = this.abandonCycles (cc.getHeight ()).getValue ();
c.setBounds (insets.left + x, insets.top + y, width, height);
}
}, "jsjava.awt.Container");
Clazz.pu$h ();
c$ = Clazz.decorateAsClass (function () {
this.x = null;
this.y = null;
this.width = null;
this.height = null;
this.east = null;
this.south = null;
this.horizontalCenter = null;
this.verticalCenter = null;
this.baseline = null;
this.horizontalHistory = null;
this.verticalHistory = null;
this.c = null;
Clazz.instantialize (this, arguments);
}, jsjavax.swing.SpringLayout, "Constraints");
Clazz.prepareFields (c$, function () {
this.horizontalHistory =  new java.util.ArrayList (2);
this.verticalHistory =  new java.util.ArrayList (2);
});
Clazz.makeConstructor (c$, 
function () {
});
Clazz.makeConstructor (c$, 
function (a, b) {
this.setX (a);
this.setY (b);
}, "jsjavax.swing.Spring,jsjavax.swing.Spring");
Clazz.makeConstructor (c$, 
function (a, b, c, d) {
this.setX (a);
this.setY (b);
this.setWidth (c);
this.setHeight (d);
}, "jsjavax.swing.Spring,jsjavax.swing.Spring,jsjavax.swing.Spring,jsjavax.swing.Spring");
Clazz.makeConstructor (c$, 
function (a) {
this.c = a;
this.setX (jsjavax.swing.Spring.constant (a.getX ()));
this.setY (jsjavax.swing.Spring.constant (a.getY ()));
this.setWidth (jsjavax.swing.Spring.width (a));
this.setHeight (jsjavax.swing.Spring.height (a));
}, "jsjava.awt.Component");
Clazz.defineMethod (c$, "pushConstraint", 
($fz = function (a, b, c) {
var d = true;
var e = c ? this.horizontalHistory : this.verticalHistory;
if (e.contains (a)) {
e.remove (a);
d = false;
} else if (e.size () == 2 && b != null) {
e.remove (0);
d = false;
}if (b != null) {
e.add (a);
}if (!d) {
var f = c ? jsjavax.swing.SpringLayout.ALL_HORIZONTAL : jsjavax.swing.SpringLayout.ALL_VERTICAL;
for (var g = 0; g < f.length; g++) {
var h = f[g];
if (!e.contains (h)) {
this.setConstraint (h, null);
}}
}}, $fz.isPrivate = true, $fz), "~S,jsjavax.swing.Spring,~B");
Clazz.defineMethod (c$, "sum", 
($fz = function (a, b) {
return (a == null || b == null) ? null : jsjavax.swing.Spring.sum (a, b);
}, $fz.isPrivate = true, $fz), "jsjavax.swing.Spring,jsjavax.swing.Spring");
Clazz.defineMethod (c$, "difference", 
($fz = function (a, b) {
return (a == null || b == null) ? null : jsjavax.swing.Spring.difference (a, b);
}, $fz.isPrivate = true, $fz), "jsjavax.swing.Spring,jsjavax.swing.Spring");
Clazz.defineMethod (c$, "scale", 
($fz = function (a, b) {
return (a == null) ? null : jsjavax.swing.Spring.scale (a, b);
}, $fz.isPrivate = true, $fz), "jsjavax.swing.Spring,~N");
Clazz.defineMethod (c$, "getBaselineFromHeight", 
($fz = function (a) {
if (a < 0) {
return -this.c.getBaseline (this.c.getPreferredSize ().width, -a);
}return this.c.getBaseline (this.c.getPreferredSize ().width, a);
}, $fz.isPrivate = true, $fz), "~N");
Clazz.defineMethod (c$, "getHeightFromBaseLine", 
($fz = function (a) {
var b = this.c.getPreferredSize ();
var c = b.height;
var d = this.c.getBaseline (b.width, c);
if (d == a) {
return c;
}switch (this.c.getBaselineResizeBehavior ()) {
case jsjava.awt.Component.BaselineResizeBehavior.CONSTANT_DESCENT:
return c + (a - d);
case jsjava.awt.Component.BaselineResizeBehavior.CENTER_OFFSET:
return c + 2 * (a - d);
case jsjava.awt.Component.BaselineResizeBehavior.CONSTANT_ASCENT:
default:
}
return -2147483648;
}, $fz.isPrivate = true, $fz), "~N");
Clazz.defineMethod (c$, "heightToRelativeBaseline", 
($fz = function (a) {
return ((Clazz.isClassDefined ("jsjavax.swing.SpringLayout$Constraints$1") ? 0 : jsjavax.swing.SpringLayout.Constraints.$SpringLayout$Constraints$1$ ()), Clazz.innerTypeInstance (jsjavax.swing.SpringLayout$Constraints$1, this, null, a));
}, $fz.isPrivate = true, $fz), "jsjavax.swing.Spring");
Clazz.defineMethod (c$, "relativeBaselineToHeight", 
($fz = function (a) {
return ((Clazz.isClassDefined ("jsjavax.swing.SpringLayout$Constraints$2") ? 0 : jsjavax.swing.SpringLayout.Constraints.$SpringLayout$Constraints$2$ ()), Clazz.innerTypeInstance (jsjavax.swing.SpringLayout$Constraints$2, this, null, a));
}, $fz.isPrivate = true, $fz), "jsjavax.swing.Spring");
Clazz.defineMethod (c$, "defined", 
($fz = function (a, b, c) {
return a.contains (b) && a.contains (c);
}, $fz.isPrivate = true, $fz), "java.util.List,~S,~S");
Clazz.defineMethod (c$, "setX", 
function (a) {
this.x = a;
this.pushConstraint ("West", a, true);
}, "jsjavax.swing.Spring");
Clazz.defineMethod (c$, "getX", 
function () {
if (this.x == null) {
if (this.defined (this.horizontalHistory, "East", "Width")) {
this.x = this.difference (this.east, this.width);
} else if (this.defined (this.horizontalHistory, "HorizontalCenter", "Width")) {
this.x = this.difference (this.horizontalCenter, this.scale (this.width, 0.5));
} else if (this.defined (this.horizontalHistory, "HorizontalCenter", "East")) {
this.x = this.difference (this.scale (this.horizontalCenter, 2), this.east);
}}return this.x;
});
Clazz.defineMethod (c$, "setY", 
function (a) {
this.y = a;
this.pushConstraint ("North", a, false);
}, "jsjavax.swing.Spring");
Clazz.defineMethod (c$, "getY", 
function () {
if (this.y == null) {
if (this.defined (this.verticalHistory, "South", "Height")) {
this.y = this.difference (this.south, this.height);
} else if (this.defined (this.verticalHistory, "VerticalCenter", "Height")) {
this.y = this.difference (this.verticalCenter, this.scale (this.height, 0.5));
} else if (this.defined (this.verticalHistory, "VerticalCenter", "South")) {
this.y = this.difference (this.scale (this.verticalCenter, 2), this.south);
} else if (this.defined (this.verticalHistory, "Baseline", "Height")) {
this.y = this.difference (this.baseline, this.heightToRelativeBaseline (this.height));
} else if (this.defined (this.verticalHistory, "Baseline", "South")) {
this.y = this.scale (this.difference (this.baseline, this.heightToRelativeBaseline (this.south)), 2);
}}return this.y;
});
Clazz.defineMethod (c$, "setWidth", 
function (a) {
this.width = a;
this.pushConstraint ("Width", a, true);
}, "jsjavax.swing.Spring");
Clazz.defineMethod (c$, "getWidth", 
function () {
if (this.width == null) {
if (this.horizontalHistory.contains ("East")) {
this.width = this.difference (this.east, this.getX ());
} else if (this.horizontalHistory.contains ("HorizontalCenter")) {
this.width = this.scale (this.difference (this.horizontalCenter, this.getX ()), 2);
}}return this.width;
});
Clazz.defineMethod (c$, "setHeight", 
function (a) {
this.height = a;
this.pushConstraint ("Height", a, false);
}, "jsjavax.swing.Spring");
Clazz.defineMethod (c$, "getHeight", 
function () {
if (this.height == null) {
if (this.verticalHistory.contains ("South")) {
this.height = this.difference (this.south, this.getY ());
} else if (this.verticalHistory.contains ("VerticalCenter")) {
this.height = this.scale (this.difference (this.verticalCenter, this.getY ()), 2);
} else if (this.verticalHistory.contains ("Baseline")) {
this.height = this.relativeBaselineToHeight (this.difference (this.baseline, this.getY ()));
}}return this.height;
});
Clazz.defineMethod (c$, "setEast", 
($fz = function (a) {
this.east = a;
this.pushConstraint ("East", a, true);
}, $fz.isPrivate = true, $fz), "jsjavax.swing.Spring");
Clazz.defineMethod (c$, "getEast", 
($fz = function () {
if (this.east == null) {
this.east = this.sum (this.getX (), this.getWidth ());
}return this.east;
}, $fz.isPrivate = true, $fz));
Clazz.defineMethod (c$, "setSouth", 
($fz = function (a) {
this.south = a;
this.pushConstraint ("South", a, false);
}, $fz.isPrivate = true, $fz), "jsjavax.swing.Spring");
Clazz.defineMethod (c$, "getSouth", 
($fz = function () {
if (this.south == null) {
this.south = this.sum (this.getY (), this.getHeight ());
}return this.south;
}, $fz.isPrivate = true, $fz));
Clazz.defineMethod (c$, "getHorizontalCenter", 
($fz = function () {
if (this.horizontalCenter == null) {
this.horizontalCenter = this.sum (this.getX (), this.scale (this.getWidth (), 0.5));
}return this.horizontalCenter;
}, $fz.isPrivate = true, $fz));
Clazz.defineMethod (c$, "setHorizontalCenter", 
($fz = function (a) {
this.horizontalCenter = a;
this.pushConstraint ("HorizontalCenter", a, true);
}, $fz.isPrivate = true, $fz), "jsjavax.swing.Spring");
Clazz.defineMethod (c$, "getVerticalCenter", 
($fz = function () {
if (this.verticalCenter == null) {
this.verticalCenter = this.sum (this.getY (), this.scale (this.getHeight (), 0.5));
}return this.verticalCenter;
}, $fz.isPrivate = true, $fz));
Clazz.defineMethod (c$, "setVerticalCenter", 
($fz = function (a) {
this.verticalCenter = a;
this.pushConstraint ("VerticalCenter", a, false);
}, $fz.isPrivate = true, $fz), "jsjavax.swing.Spring");
Clazz.defineMethod (c$, "getBaseline", 
($fz = function () {
if (this.baseline == null) {
this.baseline = this.sum (this.getY (), this.heightToRelativeBaseline (this.getHeight ()));
}return this.baseline;
}, $fz.isPrivate = true, $fz));
Clazz.defineMethod (c$, "setBaseline", 
($fz = function (a) {
this.baseline = a;
this.pushConstraint ("Baseline", a, false);
}, $fz.isPrivate = true, $fz), "jsjavax.swing.Spring");
Clazz.defineMethod (c$, "setConstraint", 
function (a, b) {
a = a.intern ();
if (a === "West") {
this.setX (b);
} else if (a === "North") {
this.setY (b);
} else if (a === "East") {
this.setEast (b);
} else if (a === "South") {
this.setSouth (b);
} else if (a === "HorizontalCenter") {
this.setHorizontalCenter (b);
} else if (a === "Width") {
this.setWidth (b);
} else if (a === "Height") {
this.setHeight (b);
} else if (a === "VerticalCenter") {
this.setVerticalCenter (b);
} else if (a === "Baseline") {
this.setBaseline (b);
}}, "~S,jsjavax.swing.Spring");
Clazz.defineMethod (c$, "getConstraint", 
function (a) {
a = a.intern ();
return (a === "West") ? this.getX () : (a === "North") ? this.getY () : (a === "East") ? this.getEast () : (a === "South") ? this.getSouth () : (a === "Width") ? this.getWidth () : (a === "Height") ? this.getHeight () : (a === "HorizontalCenter") ? this.getHorizontalCenter () : (a === "VerticalCenter") ? this.getVerticalCenter () : (a === "Baseline") ? this.getBaseline () : null;
}, "~S");
Clazz.defineMethod (c$, "reset", 
function () {
var a =  Clazz.newArray (-1, [this.x, this.y, this.width, this.height, this.east, this.south, this.horizontalCenter, this.verticalCenter, this.baseline]);
for (var b = 0; b < a.length; b++) {
var c = a[b];
if (c != null) {
c.setValue (-2147483648);
}}
});
c$.$SpringLayout$Constraints$1$ = function () {
Clazz.pu$h ();
c$ = Clazz.declareAnonymous (jsjavax.swing, "SpringLayout$Constraints$1", jsjavax.swing.Spring.SpringMap);
Clazz.overrideMethod (c$, "map", 
function (a) {
return this.b$["jsjavax.swing.SpringLayout.Constraints"].getBaselineFromHeight (a);
}, "~N");
Clazz.overrideMethod (c$, "inv", 
function (a) {
return this.b$["jsjavax.swing.SpringLayout.Constraints"].getHeightFromBaseLine (a);
}, "~N");
c$ = Clazz.p0p ();
};
c$.$SpringLayout$Constraints$2$ = function () {
Clazz.pu$h ();
c$ = Clazz.declareAnonymous (jsjavax.swing, "SpringLayout$Constraints$2", jsjavax.swing.Spring.SpringMap);
Clazz.overrideMethod (c$, "map", 
function (a) {
return this.b$["jsjavax.swing.SpringLayout.Constraints"].getHeightFromBaseLine (a);
}, "~N");
Clazz.overrideMethod (c$, "inv", 
function (a) {
return this.b$["jsjavax.swing.SpringLayout.Constraints"].getBaselineFromHeight (a);
}, "~N");
c$ = Clazz.p0p ();
};
c$ = Clazz.p0p ();
Clazz.pu$h ();
c$ = Clazz.decorateAsClass (function () {
this.edgeName = null;
this.c = null;
this.l = null;
Clazz.instantialize (this, arguments);
}, jsjavax.swing.SpringLayout, "SpringProxy", jsjavax.swing.Spring);
Clazz.makeConstructor (c$, 
function (a, b, c) {
Clazz.superConstructor (this, jsjavax.swing.SpringLayout.SpringProxy, []);
this.edgeName = a;
this.c = b;
this.l = c;
}, "~S,jsjava.awt.Component,jsjavax.swing.SpringLayout");
Clazz.defineMethod (c$, "getConstraint", 
($fz = function () {
return this.l.getConstraints (this.c).getConstraint (this.edgeName);
}, $fz.isPrivate = true, $fz));
Clazz.defineMethod (c$, "getMinimumValue", 
function () {
return this.getConstraint ().getMinimumValue ();
});
Clazz.defineMethod (c$, "getPreferredValue", 
function () {
return this.getConstraint ().getPreferredValue ();
});
Clazz.defineMethod (c$, "getMaximumValue", 
function () {
return this.getConstraint ().getMaximumValue ();
});
Clazz.defineMethod (c$, "getValue", 
function () {
return this.getConstraint ().getValue ();
});
Clazz.defineMethod (c$, "setValue", 
function (a) {
this.getConstraint ().setValue (a);
}, "~N");
Clazz.overrideMethod (c$, "isCyclic", 
function (a) {
return a.isCyclic (this.getConstraint ());
}, "jsjavax.swing.SpringLayout");
Clazz.overrideMethod (c$, "toString", 
function () {
return "SpringProxy for " + this.edgeName + " edge of " + this.c.getName () + ".";
});
c$ = Clazz.p0p ();
Clazz.defineStatics (c$,
"NORTH", "North",
"SOUTH", "South",
"EAST", "East",
"WEST", "West",
"HORIZONTAL_CENTER", "HorizontalCenter",
"VERTICAL_CENTER", "VerticalCenter",
"BASELINE", "Baseline",
"WIDTH", "Width",
"HEIGHT", "Height");
c$.ALL_HORIZONTAL = c$.prototype.ALL_HORIZONTAL =  Clazz.newArray (-1, ["West", "Width", "East", "HorizontalCenter"]);
c$.ALL_VERTICAL = c$.prototype.ALL_VERTICAL =  Clazz.newArray (-1, ["North", "Height", "South", "VerticalCenter", "Baseline"]);
});

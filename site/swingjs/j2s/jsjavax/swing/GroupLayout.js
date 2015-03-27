Clazz.declarePackage ("jsjavax.swing");
Clazz.load (["java.lang.Enum", "jsjava.awt.LayoutManager2"], "jsjavax.swing.GroupLayout", ["java.lang.IllegalArgumentException", "$.IllegalStateException", "$.StringBuffer", "java.util.ArrayList", "$.Collections", "$.HashMap", "$.HashSet", "jsjava.awt.Component", "$.Dimension", "jsjavax.swing.JComponent", "$.LayoutStyle"], function () {
c$ = Clazz.decorateAsClass (function () {
this.autocreatePadding = false;
this.autocreateContainerPadding = false;
this.horizontalGroup = null;
this.verticalGroup = null;
this.componentInfos = null;
this.host = null;
this.tmpParallelSet = null;
this.springsChanged = false;
this.isValid = false;
this.hasPreferredPaddingSprings = false;
this.layoutStyle = null;
this.honorsVisibility = false;
if (!Clazz.isClassDefined ("jsjavax.swing.GroupLayout.Spring")) {
jsjavax.swing.GroupLayout.$GroupLayout$Spring$ ();
}
if (!Clazz.isClassDefined ("jsjavax.swing.GroupLayout.Group")) {
jsjavax.swing.GroupLayout.$GroupLayout$Group$ ();
}
if (!Clazz.isClassDefined ("jsjavax.swing.GroupLayout.SequentialGroup")) {
jsjavax.swing.GroupLayout.$GroupLayout$SequentialGroup$ ();
}
if (!Clazz.isClassDefined ("jsjavax.swing.GroupLayout.ParallelGroup")) {
jsjavax.swing.GroupLayout.$GroupLayout$ParallelGroup$ ();
}
if (!Clazz.isClassDefined ("jsjavax.swing.GroupLayout.BaselineGroup")) {
jsjavax.swing.GroupLayout.$GroupLayout$BaselineGroup$ ();
}
if (!Clazz.isClassDefined ("jsjavax.swing.GroupLayout.ComponentSpring")) {
jsjavax.swing.GroupLayout.$GroupLayout$ComponentSpring$ ();
}
if (!Clazz.isClassDefined ("jsjavax.swing.GroupLayout.PreferredGapSpring")) {
jsjavax.swing.GroupLayout.$GroupLayout$PreferredGapSpring$ ();
}
if (!Clazz.isClassDefined ("jsjavax.swing.GroupLayout.GapSpring")) {
jsjavax.swing.GroupLayout.$GroupLayout$GapSpring$ ();
}
if (!Clazz.isClassDefined ("jsjavax.swing.GroupLayout.AutoPreferredGapSpring")) {
jsjavax.swing.GroupLayout.$GroupLayout$AutoPreferredGapSpring$ ();
}
if (!Clazz.isClassDefined ("jsjavax.swing.GroupLayout.ContainerAutoPreferredGapSpring")) {
jsjavax.swing.GroupLayout.$GroupLayout$ContainerAutoPreferredGapSpring$ ();
}
if (!Clazz.isClassDefined ("jsjavax.swing.GroupLayout.ComponentInfo")) {
jsjavax.swing.GroupLayout.$GroupLayout$ComponentInfo$ ();
}
Clazz.instantialize (this, arguments);
}, jsjavax.swing, "GroupLayout", null, jsjava.awt.LayoutManager2);
c$.checkSize = Clazz.defineMethod (c$, "checkSize", 
($fz = function (min, pref, max, isComponentSpring) {
jsjavax.swing.GroupLayout.checkResizeType (min, isComponentSpring);
if (!isComponentSpring && pref < 0) {
throw  new IllegalArgumentException ("Pref must be >= 0");
} else if (isComponentSpring) {
jsjavax.swing.GroupLayout.checkResizeType (pref, true);
}jsjavax.swing.GroupLayout.checkResizeType (max, isComponentSpring);
jsjavax.swing.GroupLayout.checkLessThan (min, pref);
jsjavax.swing.GroupLayout.checkLessThan (pref, max);
}, $fz.isPrivate = true, $fz), "~N,~N,~N,~B");
c$.checkResizeType = Clazz.defineMethod (c$, "checkResizeType", 
($fz = function (type, isComponentSpring) {
if (type < 0 && ((isComponentSpring && type != -1 && type != -2) || (!isComponentSpring && type != -2))) {
throw  new IllegalArgumentException ("Invalid size");
}}, $fz.isPrivate = true, $fz), "~N,~B");
c$.checkLessThan = Clazz.defineMethod (c$, "checkLessThan", 
($fz = function (min, max) {
if (min >= 0 && max >= 0 && min > max) {
throw  new IllegalArgumentException ("Following is not met: min<=pref<=max");
}}, $fz.isPrivate = true, $fz), "~N,~N");
Clazz.makeConstructor (c$, 
function (host) {
if (host == null) {
throw  new IllegalArgumentException ("Container must be non-null");
}this.honorsVisibility = true;
this.host = host;
this.setHorizontalGroup (this.createParallelGroup (jsjavax.swing.GroupLayout.Alignment.LEADING, true));
this.setVerticalGroup (this.createParallelGroup (jsjavax.swing.GroupLayout.Alignment.LEADING, true));
this.componentInfos =  new java.util.HashMap ();
this.tmpParallelSet =  new java.util.HashSet ();
}, "jsjava.awt.Container");
Clazz.defineMethod (c$, "setHonorsVisibility", 
function (honorsVisibility) {
if (this.honorsVisibility != honorsVisibility) {
this.honorsVisibility = honorsVisibility;
this.springsChanged = true;
this.isValid = false;
this.invalidateHost ();
}}, "~B");
Clazz.defineMethod (c$, "getHonorsVisibility", 
function () {
return this.honorsVisibility;
});
Clazz.defineMethod (c$, "setHonorsVisibility", 
function (component, honorsVisibility) {
if (component == null) {
throw  new IllegalArgumentException ("Component must be non-null");
}this.getComponentInfo (component).setHonorsVisibility (honorsVisibility);
this.springsChanged = true;
this.isValid = false;
this.invalidateHost ();
}, "jsjava.awt.Component,Boolean");
Clazz.defineMethod (c$, "setAutoCreateGaps", 
function (autoCreatePadding) {
if (this.autocreatePadding != autoCreatePadding) {
this.autocreatePadding = autoCreatePadding;
this.invalidateHost ();
}}, "~B");
Clazz.defineMethod (c$, "getAutoCreateGaps", 
function () {
return this.autocreatePadding;
});
Clazz.defineMethod (c$, "setAutoCreateContainerGaps", 
function (autoCreateContainerPadding) {
if (this.autocreateContainerPadding != autoCreateContainerPadding) {
this.autocreateContainerPadding = autoCreateContainerPadding;
this.horizontalGroup = this.createTopLevelGroup (this.getHorizontalGroup ());
this.verticalGroup = this.createTopLevelGroup (this.getVerticalGroup ());
this.invalidateHost ();
}}, "~B");
Clazz.defineMethod (c$, "getAutoCreateContainerGaps", 
function () {
return this.autocreateContainerPadding;
});
Clazz.defineMethod (c$, "setHorizontalGroup", 
function (group) {
if (group == null) {
throw  new IllegalArgumentException ("Group must be non-null");
}this.horizontalGroup = this.createTopLevelGroup (group);
this.invalidateHost ();
}, "jsjavax.swing.GroupLayout.Group");
Clazz.defineMethod (c$, "getHorizontalGroup", 
($fz = function () {
var index = 0;
if (this.horizontalGroup.springs.size () > 1) {
index = 1;
}return this.horizontalGroup.springs.get (index);
}, $fz.isPrivate = true, $fz));
Clazz.defineMethod (c$, "setVerticalGroup", 
function (group) {
if (group == null) {
throw  new IllegalArgumentException ("Group must be non-null");
}this.verticalGroup = this.createTopLevelGroup (group);
this.invalidateHost ();
}, "jsjavax.swing.GroupLayout.Group");
Clazz.defineMethod (c$, "getVerticalGroup", 
($fz = function () {
var index = 0;
if (this.verticalGroup.springs.size () > 1) {
index = 1;
}return this.verticalGroup.springs.get (index);
}, $fz.isPrivate = true, $fz));
Clazz.defineMethod (c$, "createTopLevelGroup", 
($fz = function (specifiedGroup) {
var group = this.createSequentialGroup ();
if (this.getAutoCreateContainerGaps ()) {
group.addSpring (Clazz.innerTypeInstance (jsjavax.swing.GroupLayout.ContainerAutoPreferredGapSpring, this, null));
group.addGroup (specifiedGroup);
group.addSpring (Clazz.innerTypeInstance (jsjavax.swing.GroupLayout.ContainerAutoPreferredGapSpring, this, null));
} else {
group.addGroup (specifiedGroup);
}return group;
}, $fz.isPrivate = true, $fz), "jsjavax.swing.GroupLayout.Group");
Clazz.defineMethod (c$, "createSequentialGroup", 
function () {
return Clazz.innerTypeInstance (jsjavax.swing.GroupLayout.SequentialGroup, this, null);
});
Clazz.defineMethod (c$, "createParallelGroup", 
function () {
return this.createParallelGroup (jsjavax.swing.GroupLayout.Alignment.LEADING);
});
Clazz.defineMethod (c$, "createParallelGroup", 
function (alignment) {
return this.createParallelGroup (alignment, true);
}, "jsjavax.swing.GroupLayout.Alignment");
Clazz.defineMethod (c$, "createParallelGroup", 
function (alignment, resizable) {
if (alignment === jsjavax.swing.GroupLayout.Alignment.BASELINE) {
return Clazz.innerTypeInstance (jsjavax.swing.GroupLayout.BaselineGroup, this, null, resizable);
}return Clazz.innerTypeInstance (jsjavax.swing.GroupLayout.ParallelGroup, this, null, alignment, resizable);
}, "jsjavax.swing.GroupLayout.Alignment,~B");
Clazz.defineMethod (c$, "createBaselineGroup", 
function (resizable, anchorBaselineToTop) {
return Clazz.innerTypeInstance (jsjavax.swing.GroupLayout.BaselineGroup, this, null, resizable, anchorBaselineToTop);
}, "~B,~B");
Clazz.defineMethod (c$, "linkSize", 
function (components) {
this.linkSize (0, components);
this.linkSize (1, components);
}, "~A");
Clazz.defineMethod (c$, "linkSize", 
function (axis, components) {
if (components == null) {
throw  new IllegalArgumentException ("Components must be non-null");
}for (var counter = components.length - 1; counter >= 0; counter--) {
var c = components[counter];
if (components[counter] == null) {
throw  new IllegalArgumentException ("Components must be non-null");
}this.getComponentInfo (c);
}
var glAxis;
if (axis == 0) {
glAxis = 0;
} else if (axis == 1) {
glAxis = 1;
} else {
throw  new IllegalArgumentException ("Axis must be one of SwingConstants.HORIZONTAL or SwingConstants.VERTICAL");
}var master = this.getComponentInfo (components[components.length - 1]).getLinkInfo (glAxis);
for (var counter = components.length - 2; counter >= 0; counter--) {
master.add (this.getComponentInfo (components[counter]));
}
this.invalidateHost ();
}, "~N,~A");
Clazz.defineMethod (c$, "replace", 
function (existingComponent, newComponent) {
if (existingComponent == null || newComponent == null) {
throw  new IllegalArgumentException ("Components must be non-null");
}if (this.springsChanged) {
this.registerComponents (this.horizontalGroup, 0);
this.registerComponents (this.verticalGroup, 1);
}var info = this.componentInfos.remove (existingComponent);
if (info == null) {
throw  new IllegalArgumentException ("Component must already exist");
}this.host.remove (existingComponent);
if (newComponent.getParent () !== this.host) {
this.host.add (newComponent);
}info.setComponent (newComponent);
this.componentInfos.put (newComponent, info);
this.invalidateHost ();
}, "jsjava.awt.Component,jsjava.awt.Component");
Clazz.defineMethod (c$, "setLayoutStyle", 
function (layoutStyle) {
this.layoutStyle = layoutStyle;
this.invalidateHost ();
}, "jsjavax.swing.LayoutStyle");
Clazz.defineMethod (c$, "getLayoutStyle", 
function () {
return this.layoutStyle;
});
Clazz.defineMethod (c$, "getLayoutStyle0", 
($fz = function () {
var layoutStyle = this.getLayoutStyle ();
if (layoutStyle == null) {
layoutStyle = jsjavax.swing.LayoutStyle.getInstance ();
}return layoutStyle;
}, $fz.isPrivate = true, $fz));
Clazz.defineMethod (c$, "invalidateHost", 
($fz = function () {
if (Clazz.instanceOf (this.host, jsjavax.swing.JComponent)) {
(this.host).revalidate ();
} else {
this.host.invalidate ();
}this.host.repaint ();
}, $fz.isPrivate = true, $fz));
Clazz.defineMethod (c$, "addLayoutComponent", 
function (name, component) {
}, "~S,jsjava.awt.Component");
Clazz.overrideMethod (c$, "removeLayoutComponent", 
function (component) {
var info = this.componentInfos.remove (component);
if (info != null) {
info.dispose ();
this.springsChanged = true;
this.isValid = false;
}}, "jsjava.awt.Component");
Clazz.overrideMethod (c$, "preferredLayoutSize", 
function (parent) {
this.checkParent (parent);
this.prepare (1);
return this.adjustSize (this.horizontalGroup.getPreferredSize (0), this.verticalGroup.getPreferredSize (1));
}, "jsjava.awt.Container");
Clazz.overrideMethod (c$, "minimumLayoutSize", 
function (parent) {
this.checkParent (parent);
this.prepare (0);
return this.adjustSize (this.horizontalGroup.getMinimumSize (0), this.verticalGroup.getMinimumSize (1));
}, "jsjava.awt.Container");
Clazz.overrideMethod (c$, "layoutContainer", 
function (parent) {
this.prepare (3);
var insets = parent.getInsets ();
var width = parent.getWidth () - insets.left - insets.right;
var height = parent.getHeight () - insets.top - insets.bottom;
var ltr = this.isLeftToRight ();
if (this.getAutoCreateGaps () || this.getAutoCreateContainerGaps () || this.hasPreferredPaddingSprings) {
this.calculateAutopadding (this.horizontalGroup, 0, 3, 0, width);
this.calculateAutopadding (this.verticalGroup, 1, 3, 0, height);
}this.horizontalGroup.setSize (0, 0, width);
this.verticalGroup.setSize (1, 0, height);
for (var info, $info = this.componentInfos.values ().iterator (); $info.hasNext () && ((info = $info.next ()) || true);) {
info.setBounds (insets, width, ltr);
}
}, "jsjava.awt.Container");
Clazz.defineMethod (c$, "addLayoutComponent", 
function (component, constraints) {
}, "jsjava.awt.Component,~O");
Clazz.overrideMethod (c$, "maximumLayoutSize", 
function (parent) {
this.checkParent (parent);
this.prepare (2);
return this.adjustSize (this.horizontalGroup.getMaximumSize (0), this.verticalGroup.getMaximumSize (1));
}, "jsjava.awt.Container");
Clazz.overrideMethod (c$, "getLayoutAlignmentX", 
function (parent) {
this.checkParent (parent);
return .5;
}, "jsjava.awt.Container");
Clazz.overrideMethod (c$, "getLayoutAlignmentY", 
function (parent) {
this.checkParent (parent);
return .5;
}, "jsjava.awt.Container");
Clazz.overrideMethod (c$, "invalidateLayout", 
function (parent) {
this.checkParent (parent);
{
this.isValid = false;
}}, "jsjava.awt.Container");
Clazz.defineMethod (c$, "prepare", 
($fz = function (sizeType) {
var visChanged = false;
if (!this.isValid) {
this.isValid = true;
this.horizontalGroup.setSize (0, -2147483648, -2147483648);
this.verticalGroup.setSize (1, -2147483648, -2147483648);
for (var ci, $ci = this.componentInfos.values ().iterator (); $ci.hasNext () && ((ci = $ci.next ()) || true);) {
if (ci.updateVisibility ()) {
visChanged = true;
}ci.clearCachedSize ();
}
}if (this.springsChanged) {
this.registerComponents (this.horizontalGroup, 0);
this.registerComponents (this.verticalGroup, 1);
}if (this.springsChanged || visChanged) {
this.checkComponents ();
this.horizontalGroup.removeAutopadding ();
this.verticalGroup.removeAutopadding ();
if (this.getAutoCreateGaps ()) {
this.insertAutopadding (true);
} else if (this.hasPreferredPaddingSprings || this.getAutoCreateContainerGaps ()) {
this.insertAutopadding (false);
}this.springsChanged = false;
}if (sizeType != 3 && (this.getAutoCreateGaps () || this.getAutoCreateContainerGaps () || this.hasPreferredPaddingSprings)) {
this.calculateAutopadding (this.horizontalGroup, 0, sizeType, 0, 0);
this.calculateAutopadding (this.verticalGroup, 1, sizeType, 0, 0);
}}, $fz.isPrivate = true, $fz), "~N");
Clazz.defineMethod (c$, "calculateAutopadding", 
($fz = function (group, axis, sizeType, origin, size) {
group.unsetAutopadding ();
switch (sizeType) {
case 0:
size = group.getMinimumSize (axis);
break;
case 1:
size = group.getPreferredSize (axis);
break;
case 2:
size = group.getMaximumSize (axis);
break;
default:
break;
}
group.setSize (axis, origin, size);
group.calculateAutopadding (axis);
}, $fz.isPrivate = true, $fz), "jsjavax.swing.GroupLayout.Group,~N,~N,~N,~N");
Clazz.defineMethod (c$, "checkComponents", 
($fz = function () {
for (var info, $info = this.componentInfos.values ().iterator (); $info.hasNext () && ((info = $info.next ()) || true);) {
if (info.horizontalSpring == null) {
throw  new IllegalStateException (info.component + " is not attached to a horizontal group");
}if (info.verticalSpring == null) {
throw  new IllegalStateException (info.component + " is not attached to a vertical group");
}}
}, $fz.isPrivate = true, $fz));
Clazz.defineMethod (c$, "registerComponents", 
($fz = function (group, axis) {
var springs = group.springs;
for (var counter = springs.size () - 1; counter >= 0; counter--) {
var spring = springs.get (counter);
if (Clazz.instanceOf (spring, jsjavax.swing.GroupLayout.ComponentSpring)) {
(spring).installIfNecessary (axis);
} else if (Clazz.instanceOf (spring, jsjavax.swing.GroupLayout.Group)) {
this.registerComponents (spring, axis);
}}
}, $fz.isPrivate = true, $fz), "jsjavax.swing.GroupLayout.Group,~N");
Clazz.defineMethod (c$, "adjustSize", 
($fz = function (width, height) {
var insets = this.host.getInsets ();
return  new jsjava.awt.Dimension (width + insets.left + insets.right, height + insets.top + insets.bottom);
}, $fz.isPrivate = true, $fz), "~N,~N");
Clazz.defineMethod (c$, "checkParent", 
($fz = function (parent) {
if (parent !== this.host) {
throw  new IllegalArgumentException ("GroupLayout can only be used with one Container at a time");
}}, $fz.isPrivate = true, $fz), "jsjava.awt.Container");
Clazz.defineMethod (c$, "getComponentInfo", 
($fz = function (component) {
var info = this.componentInfos.get (component);
if (info == null) {
info = Clazz.innerTypeInstance (jsjavax.swing.GroupLayout.ComponentInfo, this, null, component);
this.componentInfos.put (component, info);
if (component.getParent () !== this.host) {
this.host.add (component);
}}return info;
}, $fz.isPrivate = true, $fz), "jsjava.awt.Component");
Clazz.defineMethod (c$, "insertAutopadding", 
($fz = function (insert) {
this.horizontalGroup.insertAutopadding (0,  new java.util.ArrayList (1),  new java.util.ArrayList (1),  new java.util.ArrayList (1),  new java.util.ArrayList (1), insert);
this.verticalGroup.insertAutopadding (1,  new java.util.ArrayList (1),  new java.util.ArrayList (1),  new java.util.ArrayList (1),  new java.util.ArrayList (1), insert);
}, $fz.isPrivate = true, $fz), "~B");
Clazz.defineMethod (c$, "areParallelSiblings", 
($fz = function (source, target, axis) {
var sourceInfo = this.getComponentInfo (source);
var targetInfo = this.getComponentInfo (target);
var sourceSpring;
var targetSpring;
if (axis == 0) {
sourceSpring = sourceInfo.horizontalSpring;
targetSpring = targetInfo.horizontalSpring;
} else {
sourceSpring = sourceInfo.verticalSpring;
targetSpring = targetInfo.verticalSpring;
}var sourcePath = this.tmpParallelSet;
sourcePath.clear ();
var spring = sourceSpring.getParent ();
while (spring != null) {
sourcePath.add (spring);
spring = spring.getParent ();
}
spring = targetSpring.getParent ();
while (spring != null) {
if (sourcePath.contains (spring)) {
sourcePath.clear ();
while (spring != null) {
if (Clazz.instanceOf (spring, jsjavax.swing.GroupLayout.ParallelGroup)) {
return true;
}spring = spring.getParent ();
}
return false;
}spring = spring.getParent ();
}
sourcePath.clear ();
return false;
}, $fz.isPrivate = true, $fz), "jsjava.awt.Component,jsjava.awt.Component,~N");
Clazz.defineMethod (c$, "isLeftToRight", 
($fz = function () {
return this.host.getComponentOrientation ().isLeftToRight ();
}, $fz.isPrivate = true, $fz));
Clazz.defineMethod (c$, "toString", 
function () {
if (this.springsChanged) {
this.registerComponents (this.horizontalGroup, 0);
this.registerComponents (this.verticalGroup, 1);
}var buffer =  new StringBuffer ();
buffer.append ("HORIZONTAL\n");
this.createSpringDescription (buffer, this.horizontalGroup, "  ", 0);
buffer.append ("\nVERTICAL\n");
this.createSpringDescription (buffer, this.verticalGroup, "  ", 1);
return buffer.toString ();
});
Clazz.defineMethod (c$, "createSpringDescription", 
($fz = function (buffer, spring, indent, axis) {
var origin = "";
var padding = "";
if (Clazz.instanceOf (spring, jsjavax.swing.GroupLayout.ComponentSpring)) {
var cSpring = spring;
origin = Integer.toString (cSpring.getOrigin ()) + " ";
var name = cSpring.getComponent ().getName ();
if (name != null) {
origin = "name=" + name + ", ";
}}if (Clazz.instanceOf (spring, jsjavax.swing.GroupLayout.AutoPreferredGapSpring)) {
var paddingSpring = spring;
padding = ", userCreated=" + paddingSpring.getUserCreated () + ", matches=" + paddingSpring.getMatchDescription ();
}buffer.append (indent + spring.getClass ().getName () + " " + Integer.toHexString (spring.hashCode ()) + " " + origin + ", size=" + spring.getSize () + ", alignment=" + spring.getAlignment () + " prefs=[" + spring.getMinimumSize (axis) + " " + spring.getPreferredSize (axis) + " " + spring.getMaximumSize (axis) + padding + "]\n");
if (Clazz.instanceOf (spring, jsjavax.swing.GroupLayout.Group)) {
var springs = (spring).springs;
indent += "  ";
for (var counter = 0; counter < springs.size (); counter++) {
this.createSpringDescription (buffer, springs.get (counter), indent, axis);
}
}}, $fz.isPrivate = true, $fz), "StringBuffer,jsjavax.swing.GroupLayout.Spring,~S,~N");
c$.$GroupLayout$Spring$ = function () {
Clazz.pu$h ();
c$ = Clazz.decorateAsClass (function () {
Clazz.prepareCallback (this, arguments);
this.size = 0;
this.min = 0;
this.max = 0;
this.pref = 0;
this.parent = null;
this.alignment = null;
Clazz.instantialize (this, arguments);
}, jsjavax.swing.GroupLayout, "Spring");
Clazz.makeConstructor (c$, 
function () {
this.min = this.pref = this.max = -2147483648;
});
Clazz.defineMethod (c$, "setParent", 
function (a) {
this.parent = a;
}, "jsjavax.swing.GroupLayout.Spring");
Clazz.defineMethod (c$, "getParent", 
function () {
return this.parent;
});
Clazz.defineMethod (c$, "setAlignment", 
function (a) {
this.alignment = a;
}, "jsjavax.swing.GroupLayout.Alignment");
Clazz.defineMethod (c$, "getAlignment", 
function () {
return this.alignment;
});
Clazz.defineMethod (c$, "getMinimumSize", 
function (a) {
if (this.min == -2147483648) {
this.min = this.constrain (this.calculateMinimumSize (a));
}return this.min;
}, "~N");
Clazz.defineMethod (c$, "getPreferredSize", 
function (a) {
if (this.pref == -2147483648) {
this.pref = this.constrain (this.calculatePreferredSize (a));
}return this.pref;
}, "~N");
Clazz.defineMethod (c$, "getMaximumSize", 
function (a) {
if (this.max == -2147483648) {
this.max = this.constrain (this.calculateMaximumSize (a));
}return this.max;
}, "~N");
Clazz.defineMethod (c$, "setSize", 
function (a, b, c) {
this.size = c;
if (c == -2147483648) {
this.unset ();
}}, "~N,~N,~N");
Clazz.defineMethod (c$, "unset", 
function () {
this.size = this.min = this.pref = this.max = -2147483648;
});
Clazz.defineMethod (c$, "getSize", 
function () {
return this.size;
});
Clazz.defineMethod (c$, "constrain", 
function (a) {
return Math.min (a, 32767);
}, "~N");
Clazz.defineMethod (c$, "getBaseline", 
function () {
return -1;
});
Clazz.defineMethod (c$, "getBaselineResizeBehavior", 
function () {
return jsjava.awt.Component.BaselineResizeBehavior.OTHER;
});
Clazz.defineMethod (c$, "isResizable", 
function (a) {
var b = this.getMinimumSize (a);
var c = this.getPreferredSize (a);
return (b != c || c != this.getMaximumSize (a));
}, "~N");
c$ = Clazz.p0p ();
};
c$.$GroupLayout$Group$ = function () {
Clazz.pu$h ();
c$ = Clazz.decorateAsClass (function () {
Clazz.prepareCallback (this, arguments);
this.springs = null;
Clazz.instantialize (this, arguments);
}, jsjavax.swing.GroupLayout, "Group", jsjavax.swing.GroupLayout.Spring, null, Clazz.innerTypeInstance (jsjavax.swing.GroupLayout.Spring, this, null, Clazz.inheritArgs));
Clazz.makeConstructor (c$, 
function () {
Clazz.superConstructor (this, jsjavax.swing.GroupLayout.Group, []);
this.springs =  new java.util.ArrayList ();
});
Clazz.defineMethod (c$, "addGroup", 
function (a) {
return this.addSpring (a);
}, "jsjavax.swing.GroupLayout.Group");
Clazz.defineMethod (c$, "addComponent", 
function (a) {
return this.addComponent (a, -1, -1, -1);
}, "jsjava.awt.Component");
Clazz.defineMethod (c$, "addComponent", 
function (a, b, c, d) {
return this.addSpring (Clazz.innerTypeInstance (jsjavax.swing.GroupLayout.ComponentSpring, this, null, a, b, c, d));
}, "jsjava.awt.Component,~N,~N,~N");
Clazz.defineMethod (c$, "addGap", 
function (a) {
return this.addGap (a, a, a);
}, "~N");
Clazz.defineMethod (c$, "addGap", 
function (a, b, c) {
return this.addSpring (Clazz.innerTypeInstance (jsjavax.swing.GroupLayout.GapSpring, this, null, a, b, c));
}, "~N,~N,~N");
Clazz.defineMethod (c$, "getSpring", 
function (a) {
return this.springs.get (a);
}, "~N");
Clazz.defineMethod (c$, "indexOf", 
function (a) {
return this.springs.indexOf (a);
}, "jsjavax.swing.GroupLayout.Spring");
Clazz.defineMethod (c$, "addSpring", 
function (a) {
this.springs.add (a);
a.setParent (this);
if (!(Clazz.instanceOf (a, jsjavax.swing.GroupLayout.AutoPreferredGapSpring)) || !(a).getUserCreated ()) {
this.b$["jsjavax.swing.GroupLayout"].springsChanged = true;
}return this;
}, "jsjavax.swing.GroupLayout.Spring");
Clazz.defineMethod (c$, "setSize", 
function (a, b, c) {
Clazz.superCall (this, jsjavax.swing.GroupLayout.Group, "setSize", [a, b, c]);
if (c == -2147483648) {
for (var d = this.springs.size () - 1; d >= 0; d--) {
this.getSpring (d).setSize (a, b, c);
}
} else {
this.setValidSize (a, b, c);
}}, "~N,~N,~N");
Clazz.overrideMethod (c$, "calculateMinimumSize", 
function (a) {
return this.calculateSize (a, 0);
}, "~N");
Clazz.overrideMethod (c$, "calculatePreferredSize", 
function (a) {
return this.calculateSize (a, 1);
}, "~N");
Clazz.overrideMethod (c$, "calculateMaximumSize", 
function (a) {
return this.calculateSize (a, 2);
}, "~N");
Clazz.defineMethod (c$, "calculateSize", 
function (a, b) {
var c = this.springs.size ();
if (c == 0) {
return 0;
}if (c == 1) {
return this.getSpringSize (this.getSpring (0), a, b);
}var d = this.constrain (this.operator (this.getSpringSize (this.getSpring (0), a, b), this.getSpringSize (this.getSpring (1), a, b)));
for (var e = 2; e < c; e++) {
d = this.constrain (this.operator (d, this.getSpringSize (this.getSpring (e), a, b)));
}
return d;
}, "~N,~N");
Clazz.defineMethod (c$, "getSpringSize", 
function (a, b, c) {
switch (c) {
case 0:
return a.getMinimumSize (b);
case 1:
return a.getPreferredSize (b);
case 2:
return a.getMaximumSize (b);
}
return 0;
}, "jsjavax.swing.GroupLayout.Spring,~N,~N");
Clazz.defineMethod (c$, "removeAutopadding", 
function () {
this.unset ();
for (var a = this.springs.size () - 1; a >= 0; a--) {
var b = this.springs.get (a);
if (Clazz.instanceOf (b, jsjavax.swing.GroupLayout.AutoPreferredGapSpring)) {
if ((b).getUserCreated ()) {
(b).reset ();
} else {
this.springs.remove (a);
}} else if (Clazz.instanceOf (b, jsjavax.swing.GroupLayout.Group)) {
(b).removeAutopadding ();
}}
});
Clazz.defineMethod (c$, "unsetAutopadding", 
function () {
this.unset ();
for (var a = this.springs.size () - 1; a >= 0; a--) {
var b = this.springs.get (a);
if (Clazz.instanceOf (b, jsjavax.swing.GroupLayout.AutoPreferredGapSpring)) {
(b).unset ();
} else if (Clazz.instanceOf (b, jsjavax.swing.GroupLayout.Group)) {
(b).unsetAutopadding ();
}}
});
Clazz.defineMethod (c$, "calculateAutopadding", 
function (a) {
for (var b = this.springs.size () - 1; b >= 0; b--) {
var c = this.springs.get (b);
if (Clazz.instanceOf (c, jsjavax.swing.GroupLayout.AutoPreferredGapSpring)) {
c.unset ();
(c).calculatePadding (a);
} else if (Clazz.instanceOf (c, jsjavax.swing.GroupLayout.Group)) {
(c).calculateAutopadding (a);
}}
this.unset ();
}, "~N");
Clazz.defineMethod (c$, "willHaveZeroSize", 
function (a) {
for (var b = this.springs.size () - 1; b >= 0; b--) {
var c = this.springs.get (b);
if (!c.willHaveZeroSize (a)) {
return false;
}}
return true;
}, "~B");
c$ = Clazz.p0p ();
};
c$.$GroupLayout$SequentialGroup$ = function () {
Clazz.pu$h ();
c$ = Clazz.decorateAsClass (function () {
Clazz.prepareCallback (this, arguments);
this.baselineSpring = null;
Clazz.instantialize (this, arguments);
}, jsjavax.swing.GroupLayout, "SequentialGroup", jsjavax.swing.GroupLayout.Group, null, Clazz.innerTypeInstance (jsjavax.swing.GroupLayout.Group, this, null, Clazz.inheritArgs));
Clazz.makeConstructor (c$, 
function () {
Clazz.superConstructor (this, jsjavax.swing.GroupLayout.SequentialGroup, []);
});
Clazz.defineMethod (c$, "addGroup", 
function (a) {
return Clazz.superCall (this, jsjavax.swing.GroupLayout.SequentialGroup, "addGroup", [a]);
}, "jsjavax.swing.GroupLayout.Group");
Clazz.defineMethod (c$, "addGroup", 
function (a, b) {
Clazz.superCall (this, jsjavax.swing.GroupLayout.SequentialGroup, "addGroup", [b]);
if (a) {
this.baselineSpring = b;
}return this;
}, "~B,jsjavax.swing.GroupLayout.Group");
Clazz.defineMethod (c$, "addComponent", 
function (a) {
return Clazz.superCall (this, jsjavax.swing.GroupLayout.SequentialGroup, "addComponent", [a]);
}, "jsjava.awt.Component");
Clazz.defineMethod (c$, "addComponent", 
function (a, b) {
Clazz.superCall (this, jsjavax.swing.GroupLayout.SequentialGroup, "addComponent", [b]);
if (a) {
this.baselineSpring = this.springs.get (this.springs.size () - 1);
}return this;
}, "~B,jsjava.awt.Component");
Clazz.defineMethod (c$, "addComponent", 
function (a, b, c, d) {
return Clazz.superCall (this, jsjavax.swing.GroupLayout.SequentialGroup, "addComponent", [a, b, c, d]);
}, "jsjava.awt.Component,~N,~N,~N");
Clazz.defineMethod (c$, "addComponent", 
function (a, b, c, d, e) {
Clazz.superCall (this, jsjavax.swing.GroupLayout.SequentialGroup, "addComponent", [b, c, d, e]);
if (a) {
this.baselineSpring = this.springs.get (this.springs.size () - 1);
}return this;
}, "~B,jsjava.awt.Component,~N,~N,~N");
Clazz.defineMethod (c$, "addGap", 
function (a) {
return Clazz.superCall (this, jsjavax.swing.GroupLayout.SequentialGroup, "addGap", [a]);
}, "~N");
Clazz.defineMethod (c$, "addGap", 
function (a, b, c) {
return Clazz.superCall (this, jsjavax.swing.GroupLayout.SequentialGroup, "addGap", [a, b, c]);
}, "~N,~N,~N");
Clazz.defineMethod (c$, "addPreferredGap", 
function (a, b, c) {
return this.addPreferredGap (a, b, c, -1, -2);
}, "jsjavax.swing.JComponent,jsjavax.swing.JComponent,jsjavax.swing.LayoutStyle.ComponentPlacement");
Clazz.defineMethod (c$, "addPreferredGap", 
function (a, b, c, d, e) {
if (c == null) {
throw  new IllegalArgumentException ("Type must be non-null");
}if (a == null || b == null) {
throw  new IllegalArgumentException ("Components must be non-null");
}this.checkPreferredGapValues (d, e);
return this.addSpring (Clazz.innerTypeInstance (jsjavax.swing.GroupLayout.PreferredGapSpring, this, null, a, b, c, d, e));
}, "jsjavax.swing.JComponent,jsjavax.swing.JComponent,jsjavax.swing.LayoutStyle.ComponentPlacement,~N,~N");
Clazz.defineMethod (c$, "addPreferredGap", 
function (a) {
return this.addPreferredGap (a, -1, -1);
}, "jsjavax.swing.LayoutStyle.ComponentPlacement");
Clazz.defineMethod (c$, "addPreferredGap", 
function (a, b, c) {
if (a !== jsjavax.swing.LayoutStyle.ComponentPlacement.RELATED && a !== jsjavax.swing.LayoutStyle.ComponentPlacement.UNRELATED) {
throw  new IllegalArgumentException ("Type must be one of LayoutStyle.ComponentPlacement.RELATED or LayoutStyle.ComponentPlacement.UNRELATED");
}this.checkPreferredGapValues (b, c);
this.b$["jsjavax.swing.GroupLayout"].hasPreferredPaddingSprings = true;
return this.addSpring (Clazz.innerTypeInstance (jsjavax.swing.GroupLayout.AutoPreferredGapSpring, this, null, a, b, c));
}, "jsjavax.swing.LayoutStyle.ComponentPlacement,~N,~N");
Clazz.defineMethod (c$, "addContainerGap", 
function () {
return this.addContainerGap (-1, -1);
});
Clazz.defineMethod (c$, "addContainerGap", 
function (a, b) {
if ((a < 0 && a != -1) || (b < 0 && b != -1 && b != -2) || (a >= 0 && b >= 0 && a > b)) {
throw  new IllegalArgumentException ("Pref and max must be either DEFAULT_VALUE or >= 0 and pref <= max");
}this.b$["jsjavax.swing.GroupLayout"].hasPreferredPaddingSprings = true;
return this.addSpring (Clazz.innerTypeInstance (jsjavax.swing.GroupLayout.ContainerAutoPreferredGapSpring, this, null, a, b));
}, "~N,~N");
Clazz.overrideMethod (c$, "operator", 
function (a, b) {
return this.constrain (a) + this.constrain (b);
}, "~N,~N");
Clazz.overrideMethod (c$, "setValidSize", 
function (a, b, c) {
var d = this.getPreferredSize (a);
if (c == d) {
for (var spring, $spring = this.springs.iterator (); $spring.hasNext () && ((spring = $spring.next ()) || true);) {
var e = spring.getPreferredSize (a);
spring.setSize (a, b, e);
b += e;
}
} else if (this.springs.size () == 1) {
var e = this.getSpring (0);
e.setSize (a, b, Math.min (Math.max (c, e.getMinimumSize (a)), e.getMaximumSize (a)));
} else if (this.springs.size () > 1) {
this.setValidSizeNotPreferred (a, b, c);
}}, "~N,~N,~N");
Clazz.defineMethod (c$, "setValidSizeNotPreferred", 
($fz = function (a, b, c) {
var d = c - this.getPreferredSize (a);
var e = (d < 0);
var f = this.springs.size ();
if (e) {
d *= -1;
}var g = this.buildResizableList (a, e);
var h = g.size ();
if (h > 0) {
var i = Clazz.doubleToInt (d / h);
var j = d - i * h;
var k =  Clazz.newIntArray (f, 0);
var l = e ? -1 : 1;
for (var m = 0; m < h; m++) {
var n = g.get (m);
if ((m + 1) == h) {
i += j;
}n.delta = Math.min (i, n.delta);
d -= n.delta;
if (n.delta != i && m + 1 < h) {
i = Clazz.doubleToInt (d / (h - m - 1));
j = d - i * (h - m - 1);
}k[n.index] = l * n.delta;
}
for (var n = 0; n < f; n++) {
var o = this.getSpring (n);
var p = o.getPreferredSize (a) + k[n];
o.setSize (a, b, p);
b += p;
}
} else {
for (var i = 0; i < f; i++) {
var j = this.getSpring (i);
var k;
if (e) {
k = j.getMinimumSize (a);
} else {
k = j.getMaximumSize (a);
}j.setSize (a, b, k);
b += k;
}
}}, $fz.isPrivate = true, $fz), "~N,~N,~N");
Clazz.defineMethod (c$, "buildResizableList", 
($fz = function (a, b) {
var c = this.springs.size ();
var d =  new java.util.ArrayList (c);
for (var e = 0; e < c; e++) {
var f = this.getSpring (e);
var g;
if (b) {
g = f.getPreferredSize (a) - f.getMinimumSize (a);
} else {
g = f.getMaximumSize (a) - f.getPreferredSize (a);
}if (g > 0) {
d.add ( new jsjavax.swing.GroupLayout.SpringDelta (e, g));
}}
java.util.Collections.sort (d);
return d;
}, $fz.isPrivate = true, $fz), "~N,~B");
Clazz.defineMethod (c$, "indexOfNextNonZeroSpring", 
($fz = function (a, b) {
while (a < this.springs.size ()) {
var c = this.springs.get (a);
if (!c.willHaveZeroSize (b)) {
return a;
}a++;
}
return a;
}, $fz.isPrivate = true, $fz), "~N,~B");
Clazz.defineMethod (c$, "insertAutopadding", 
function (a, b, c, d, e, f) {
var g =  new java.util.ArrayList (b);
var h =  new java.util.ArrayList (1);
var i =  new java.util.ArrayList (d);
var j = null;
var k = 0;
while (k < this.springs.size ()) {
var l = this.getSpring (k);
if (Clazz.instanceOf (l, jsjavax.swing.GroupLayout.AutoPreferredGapSpring)) {
if (g.size () == 0) {
var m = l;
m.setSources (i);
i.clear ();
k = this.indexOfNextNonZeroSpring (k + 1, true);
if (k == this.springs.size ()) {
if (!(Clazz.instanceOf (m, jsjavax.swing.GroupLayout.ContainerAutoPreferredGapSpring))) {
c.add (m);
}} else {
g.clear ();
g.add (m);
}} else {
k = this.indexOfNextNonZeroSpring (k + 1, true);
}} else {
if (i.size () > 0 && f) {
var m = Clazz.innerTypeInstance (jsjavax.swing.GroupLayout.AutoPreferredGapSpring, this, null);
this.springs.add (k, m);
continue;
}if (Clazz.instanceOf (l, jsjavax.swing.GroupLayout.ComponentSpring)) {
var m = l;
if (!m.isVisible ()) {
k++;
continue;
}for (var gapSpring, $gapSpring = g.iterator (); $gapSpring.hasNext () && ((gapSpring = $gapSpring.next ()) || true);) {
gapSpring.addTarget (m, a);
}
i.clear ();
g.clear ();
k = this.indexOfNextNonZeroSpring (k + 1, false);
if (k == this.springs.size ()) {
e.add (m);
} else {
i.add (m);
}} else if (Clazz.instanceOf (l, jsjavax.swing.GroupLayout.Group)) {
if (j == null) {
j =  new java.util.ArrayList (1);
} else {
j.clear ();
}h.clear ();
(l).insertAutopadding (a, g, h, i, j, f);
i.clear ();
g.clear ();
k = this.indexOfNextNonZeroSpring (k + 1, (j.size () == 0));
if (k == this.springs.size ()) {
e.addAll (j);
c.addAll (h);
} else {
i.addAll (j);
g.addAll (h);
}} else {
g.clear ();
i.clear ();
k++;
}}}
}, "~N,java.util.List,java.util.List,java.util.List,java.util.List,~B");
Clazz.defineMethod (c$, "getBaseline", 
function () {
if (this.baselineSpring != null) {
var a = this.baselineSpring.getBaseline ();
if (a >= 0) {
var b = 0;
for (var spring, $spring = this.springs.iterator (); $spring.hasNext () && ((spring = $spring.next ()) || true);) {
if (spring === this.baselineSpring) {
return b + a;
} else {
b += spring.getPreferredSize (1);
}}
}}return -1;
});
Clazz.defineMethod (c$, "getBaselineResizeBehavior", 
function () {
if (this.isResizable (1)) {
if (!this.baselineSpring.isResizable (1)) {
var a = false;
for (var spring, $spring = this.springs.iterator (); $spring.hasNext () && ((spring = $spring.next ()) || true);) {
if (spring === this.baselineSpring) {
break;
} else if (spring.isResizable (1)) {
a = true;
break;
}}
var b = false;
for (var c = this.springs.size () - 1; c >= 0; c--) {
var d = this.springs.get (c);
if (d === this.baselineSpring) {
break;
}if (d.isResizable (1)) {
b = true;
break;
}}
if (a && !b) {
return jsjava.awt.Component.BaselineResizeBehavior.CONSTANT_DESCENT;
} else if (!a && b) {
return jsjava.awt.Component.BaselineResizeBehavior.CONSTANT_ASCENT;
}} else {
var a = this.baselineSpring.getBaselineResizeBehavior ();
if (a === jsjava.awt.Component.BaselineResizeBehavior.CONSTANT_ASCENT) {
for (var spring, $spring = this.springs.iterator (); $spring.hasNext () && ((spring = $spring.next ()) || true);) {
if (spring === this.baselineSpring) {
return jsjava.awt.Component.BaselineResizeBehavior.CONSTANT_ASCENT;
}if (spring.isResizable (1)) {
return jsjava.awt.Component.BaselineResizeBehavior.OTHER;
}}
} else if (a === jsjava.awt.Component.BaselineResizeBehavior.CONSTANT_DESCENT) {
for (var b = this.springs.size () - 1; b >= 0; b--) {
var c = this.springs.get (b);
if (c === this.baselineSpring) {
return jsjava.awt.Component.BaselineResizeBehavior.CONSTANT_DESCENT;
}if (c.isResizable (1)) {
return jsjava.awt.Component.BaselineResizeBehavior.OTHER;
}}
}}return jsjava.awt.Component.BaselineResizeBehavior.OTHER;
}return jsjava.awt.Component.BaselineResizeBehavior.CONSTANT_ASCENT;
});
Clazz.defineMethod (c$, "checkPreferredGapValues", 
($fz = function (a, b) {
if ((a < 0 && a != -1 && a != -2) || (b < 0 && b != -1 && b != -2) || (a >= 0 && b >= 0 && a > b)) {
throw  new IllegalArgumentException ("Pref and max must be either DEFAULT_SIZE, PREFERRED_SIZE, or >= 0 and pref <= max");
}}, $fz.isPrivate = true, $fz), "~N,~N");
c$ = Clazz.p0p ();
};
c$.$GroupLayout$ParallelGroup$ = function () {
Clazz.pu$h ();
c$ = Clazz.decorateAsClass (function () {
Clazz.prepareCallback (this, arguments);
this.childAlignment = null;
this.resizable = false;
Clazz.instantialize (this, arguments);
}, jsjavax.swing.GroupLayout, "ParallelGroup", jsjavax.swing.GroupLayout.Group, null, Clazz.innerTypeInstance (jsjavax.swing.GroupLayout.Group, this, null, Clazz.inheritArgs));
Clazz.makeConstructor (c$, 
function (a, b) {
Clazz.superConstructor (this, jsjavax.swing.GroupLayout.ParallelGroup, []);
this.childAlignment = a;
this.resizable = b;
}, "jsjavax.swing.GroupLayout.Alignment,~B");
Clazz.defineMethod (c$, "addGroup", 
function (a) {
return Clazz.superCall (this, jsjavax.swing.GroupLayout.ParallelGroup, "addGroup", [a]);
}, "jsjavax.swing.GroupLayout.Group");
Clazz.defineMethod (c$, "addComponent", 
function (a) {
return Clazz.superCall (this, jsjavax.swing.GroupLayout.ParallelGroup, "addComponent", [a]);
}, "jsjava.awt.Component");
Clazz.defineMethod (c$, "addComponent", 
function (a, b, c, d) {
return Clazz.superCall (this, jsjavax.swing.GroupLayout.ParallelGroup, "addComponent", [a, b, c, d]);
}, "jsjava.awt.Component,~N,~N,~N");
Clazz.defineMethod (c$, "addGap", 
function (a) {
return Clazz.superCall (this, jsjavax.swing.GroupLayout.ParallelGroup, "addGap", [a]);
}, "~N");
Clazz.defineMethod (c$, "addGap", 
function (a, b, c) {
return Clazz.superCall (this, jsjavax.swing.GroupLayout.ParallelGroup, "addGap", [a, b, c]);
}, "~N,~N,~N");
Clazz.defineMethod (c$, "addGroup", 
function (a, b) {
this.checkChildAlignment (a);
b.setAlignment (a);
return this.addSpring (b);
}, "jsjavax.swing.GroupLayout.Alignment,jsjavax.swing.GroupLayout.Group");
Clazz.defineMethod (c$, "addComponent", 
function (a, b) {
return this.addComponent (a, b, -1, -1, -1);
}, "jsjava.awt.Component,jsjavax.swing.GroupLayout.Alignment");
Clazz.defineMethod (c$, "addComponent", 
function (a, b, c, d, e) {
this.checkChildAlignment (b);
var f = Clazz.innerTypeInstance (jsjavax.swing.GroupLayout.ComponentSpring, this, null, a, c, d, e);
f.setAlignment (b);
return this.addSpring (f);
}, "jsjava.awt.Component,jsjavax.swing.GroupLayout.Alignment,~N,~N,~N");
Clazz.defineMethod (c$, "isResizable", 
function () {
return this.resizable;
});
Clazz.overrideMethod (c$, "operator", 
function (a, b) {
return Math.max (a, b);
}, "~N,~N");
Clazz.defineMethod (c$, "calculateMinimumSize", 
function (a) {
if (!this.isResizable ()) {
return this.getPreferredSize (a);
}return Clazz.superCall (this, jsjavax.swing.GroupLayout.ParallelGroup, "calculateMinimumSize", [a]);
}, "~N");
Clazz.defineMethod (c$, "calculateMaximumSize", 
function (a) {
if (!this.isResizable ()) {
return this.getPreferredSize (a);
}return Clazz.superCall (this, jsjavax.swing.GroupLayout.ParallelGroup, "calculateMaximumSize", [a]);
}, "~N");
Clazz.overrideMethod (c$, "setValidSize", 
function (a, b, c) {
for (var spring, $spring = this.springs.iterator (); $spring.hasNext () && ((spring = $spring.next ()) || true);) {
this.setChildSize (spring, a, b, c);
}
}, "~N,~N,~N");
Clazz.defineMethod (c$, "setChildSize", 
function (a, b, c, d) {
var e = a.getAlignment ();
var f = Math.min (Math.max (a.getMinimumSize (b), d), a.getMaximumSize (b));
if (e == null) {
e = this.childAlignment;
}switch (e) {
case jsjavax.swing.GroupLayout.Alignment.TRAILING:
a.setSize (b, c + d - f, f);
break;
case jsjavax.swing.GroupLayout.Alignment.CENTER:
a.setSize (b, c + Clazz.doubleToInt ((d - f) / 2), f);
break;
default:
a.setSize (b, c, f);
break;
}
}, "jsjavax.swing.GroupLayout.Spring,~N,~N,~N");
Clazz.defineMethod (c$, "insertAutopadding", 
function (a, b, c, d, e, f) {
for (var spring, $spring = this.springs.iterator (); $spring.hasNext () && ((spring = $spring.next ()) || true);) {
if (Clazz.instanceOf (spring, jsjavax.swing.GroupLayout.ComponentSpring)) {
if ((spring).isVisible ()) {
for (var gapSpring, $gapSpring = b.iterator (); $gapSpring.hasNext () && ((gapSpring = $gapSpring.next ()) || true);) {
gapSpring.addTarget (spring, a);
}
e.add (spring);
}} else if (Clazz.instanceOf (spring, jsjavax.swing.GroupLayout.Group)) {
(spring).insertAutopadding (a, b, c, d, e, f);
} else if (Clazz.instanceOf (spring, jsjavax.swing.GroupLayout.AutoPreferredGapSpring)) {
(spring).setSources (d);
c.add (spring);
}}
}, "~N,java.util.List,java.util.List,java.util.List,java.util.List,~B");
Clazz.defineMethod (c$, "checkChildAlignment", 
($fz = function (a) {
this.checkChildAlignment (a, (Clazz.instanceOf (this, jsjavax.swing.GroupLayout.BaselineGroup)));
}, $fz.isPrivate = true, $fz), "jsjavax.swing.GroupLayout.Alignment");
Clazz.defineMethod (c$, "checkChildAlignment", 
($fz = function (a, b) {
if (a == null) {
throw  new IllegalArgumentException ("Alignment must be non-null");
}if (!b && a === jsjavax.swing.GroupLayout.Alignment.BASELINE) {
throw  new IllegalArgumentException ("Alignment must be one of:LEADING, TRAILING or CENTER");
}}, $fz.isPrivate = true, $fz), "jsjavax.swing.GroupLayout.Alignment,~B");
c$ = Clazz.p0p ();
};
c$.$GroupLayout$BaselineGroup$ = function () {
Clazz.pu$h ();
c$ = Clazz.decorateAsClass (function () {
Clazz.prepareCallback (this, arguments);
this.allSpringsHaveBaseline = false;
this.prefAscent = 0;
this.prefDescent = 0;
this.baselineAnchorSet = false;
this.baselineAnchoredToTop = false;
this.calcedBaseline = false;
Clazz.instantialize (this, arguments);
}, jsjavax.swing.GroupLayout, "BaselineGroup", jsjavax.swing.GroupLayout.ParallelGroup, null, Clazz.innerTypeInstance (jsjavax.swing.GroupLayout.ParallelGroup, this, null, Clazz.inheritArgs));
Clazz.makeConstructor (c$, 
function (a) {
Clazz.superConstructor (this, jsjavax.swing.GroupLayout.BaselineGroup, [jsjavax.swing.GroupLayout.Alignment.LEADING, a]);
this.prefAscent = this.prefDescent = -1;
this.calcedBaseline = false;
}, "~B");
Clazz.makeConstructor (c$, 
function (a, b) {
this.construct (a);
this.baselineAnchoredToTop = b;
this.baselineAnchorSet = true;
}, "~B,~B");
Clazz.defineMethod (c$, "unset", 
function () {
Clazz.superCall (this, jsjavax.swing.GroupLayout.BaselineGroup, "unset", []);
this.prefAscent = this.prefDescent = -1;
this.calcedBaseline = false;
});
Clazz.defineMethod (c$, "setValidSize", 
function (a, b, c) {
this.checkAxis (a);
if (this.prefAscent == -1) {
Clazz.superCall (this, jsjavax.swing.GroupLayout.BaselineGroup, "setValidSize", [a, b, c]);
} else {
this.baselineLayout (b, c);
}}, "~N,~N,~N");
Clazz.defineMethod (c$, "calculateSize", 
function (a, b) {
this.checkAxis (a);
if (!this.calcedBaseline) {
this.calculateBaselineAndResizeBehavior ();
}if (b == 0) {
return this.calculateMinSize ();
}if (b == 2) {
return this.calculateMaxSize ();
}if (this.allSpringsHaveBaseline) {
return this.prefAscent + this.prefDescent;
}return Math.max (this.prefAscent + this.prefDescent, Clazz.superCall (this, jsjavax.swing.GroupLayout.BaselineGroup, "calculateSize", [a, b]));
}, "~N,~N");
Clazz.defineMethod (c$, "calculateBaselineAndResizeBehavior", 
($fz = function () {
this.prefAscent = 0;
this.prefDescent = 0;
var a = 0;
var b = null;
for (var spring, $spring = this.springs.iterator (); $spring.hasNext () && ((spring = $spring.next ()) || true);) {
if (spring.getAlignment () == null || spring.getAlignment () === jsjavax.swing.GroupLayout.Alignment.BASELINE) {
var c = spring.getBaseline ();
if (c >= 0) {
if (spring.isResizable (1)) {
var d = spring.getBaselineResizeBehavior ();
if (b == null) {
b = d;
} else if (d !== b) {
b = jsjava.awt.Component.BaselineResizeBehavior.CONSTANT_ASCENT;
}}this.prefAscent = Math.max (this.prefAscent, c);
this.prefDescent = Math.max (this.prefDescent, spring.getPreferredSize (1) - c);
a++;
}}}
if (!this.baselineAnchorSet) {
if (b === jsjava.awt.Component.BaselineResizeBehavior.CONSTANT_DESCENT) {
this.baselineAnchoredToTop = false;
} else {
this.baselineAnchoredToTop = true;
}}this.allSpringsHaveBaseline = (a == this.springs.size ());
this.calcedBaseline = true;
}, $fz.isPrivate = true, $fz));
Clazz.defineMethod (c$, "calculateMaxSize", 
($fz = function () {
var a = this.prefAscent;
var b = this.prefDescent;
var c = 0;
for (var spring, $spring = this.springs.iterator (); $spring.hasNext () && ((spring = $spring.next ()) || true);) {
var d;
var e = spring.getMaximumSize (1);
if ((spring.getAlignment () == null || spring.getAlignment () === jsjavax.swing.GroupLayout.Alignment.BASELINE) && (d = spring.getBaseline ()) >= 0) {
var f = spring.getPreferredSize (1);
if (f != e) {
switch (spring.getBaselineResizeBehavior ()) {
case jsjava.awt.Component.BaselineResizeBehavior.CONSTANT_ASCENT:
if (this.baselineAnchoredToTop) {
b = Math.max (b, e - d);
}break;
case jsjava.awt.Component.BaselineResizeBehavior.CONSTANT_DESCENT:
if (!this.baselineAnchoredToTop) {
a = Math.max (a, e - f + d);
}break;
default:
break;
}
}} else {
c = Math.max (c, e);
}}
return Math.max (c, a + b);
}, $fz.isPrivate = true, $fz));
Clazz.defineMethod (c$, "calculateMinSize", 
($fz = function () {
var a = 0;
var b = 0;
var c = 0;
if (this.baselineAnchoredToTop) {
a = this.prefAscent;
} else {
b = this.prefDescent;
}for (var spring, $spring = this.springs.iterator (); $spring.hasNext () && ((spring = $spring.next ()) || true);) {
var d = spring.getMinimumSize (1);
var e;
if ((spring.getAlignment () == null || spring.getAlignment () === jsjavax.swing.GroupLayout.Alignment.BASELINE) && (e = spring.getBaseline ()) >= 0) {
var f = spring.getPreferredSize (1);
var g = spring.getBaselineResizeBehavior ();
switch (g) {
case jsjava.awt.Component.BaselineResizeBehavior.CONSTANT_ASCENT:
if (this.baselineAnchoredToTop) {
b = Math.max (d - e, b);
} else {
a = Math.max (e, a);
}break;
case jsjava.awt.Component.BaselineResizeBehavior.CONSTANT_DESCENT:
if (!this.baselineAnchoredToTop) {
a = Math.max (e - (f - d), a);
} else {
b = Math.max (f - e, b);
}break;
default:
a = Math.max (e, a);
b = Math.max (f - e, b);
break;
}
} else {
c = Math.max (c, d);
}}
return Math.max (c, a + b);
}, $fz.isPrivate = true, $fz));
Clazz.defineMethod (c$, "baselineLayout", 
($fz = function (a, b) {
var c;
var d;
if (this.baselineAnchoredToTop) {
c = this.prefAscent;
d = b - c;
} else {
c = b - this.prefDescent;
d = this.prefDescent;
}for (var spring, $spring = this.springs.iterator (); $spring.hasNext () && ((spring = $spring.next ()) || true);) {
var e = spring.getAlignment ();
if (e == null || e === jsjavax.swing.GroupLayout.Alignment.BASELINE) {
var f = spring.getBaseline ();
if (f >= 0) {
var g = spring.getMaximumSize (1);
var h = spring.getPreferredSize (1);
var i = h;
var j;
switch (spring.getBaselineResizeBehavior ()) {
case jsjava.awt.Component.BaselineResizeBehavior.CONSTANT_ASCENT:
j = a + c - f;
i = Math.min (d, g - f) + f;
break;
case jsjava.awt.Component.BaselineResizeBehavior.CONSTANT_DESCENT:
i = Math.min (c, g - h + f) + (h - f);
j = a + c + (h - f) - i;
break;
default:
j = a + c - f;
break;
}
spring.setSize (1, j, i);
} else {
this.setChildSize (spring, 1, a, b);
}} else {
this.setChildSize (spring, 1, a, b);
}}
}, $fz.isPrivate = true, $fz), "~N,~N");
Clazz.defineMethod (c$, "getBaseline", 
function () {
if (this.springs.size () > 1) {
this.getPreferredSize (1);
return this.prefAscent;
} else if (this.springs.size () == 1) {
return this.springs.get (0).getBaseline ();
}return -1;
});
Clazz.defineMethod (c$, "getBaselineResizeBehavior", 
function () {
if (this.springs.size () == 1) {
return this.springs.get (0).getBaselineResizeBehavior ();
}if (this.baselineAnchoredToTop) {
return jsjava.awt.Component.BaselineResizeBehavior.CONSTANT_ASCENT;
}return jsjava.awt.Component.BaselineResizeBehavior.CONSTANT_DESCENT;
});
Clazz.defineMethod (c$, "checkAxis", 
($fz = function (a) {
if (a == 0) {
throw  new IllegalStateException ("Baseline must be used along vertical axis");
}}, $fz.isPrivate = true, $fz), "~N");
c$ = Clazz.p0p ();
};
c$.$GroupLayout$ComponentSpring$ = function () {
Clazz.pu$h ();
c$ = Clazz.decorateAsClass (function () {
Clazz.prepareCallback (this, arguments);
this.component = null;
this.origin = 0;
this.$min = 0;
this.$pref = 0;
this.$max = 0;
this.baseline = -1;
this.installed = false;
Clazz.instantialize (this, arguments);
}, jsjavax.swing.GroupLayout, "ComponentSpring", jsjavax.swing.GroupLayout.Spring, null, Clazz.innerTypeInstance (jsjavax.swing.GroupLayout.Spring, this, null, Clazz.inheritArgs));
Clazz.makeConstructor (c$, 
($fz = function (a, b, c, d) {
Clazz.superConstructor (this, jsjavax.swing.GroupLayout.ComponentSpring, []);
this.component = a;
if (a == null) {
throw  new IllegalArgumentException ("Component must be non-null");
}jsjavax.swing.GroupLayout.checkSize (b, c, d, true);
this.$min = b;
this.$max = d;
this.$pref = c;
this.b$["jsjavax.swing.GroupLayout"].getComponentInfo (a);
}, $fz.isPrivate = true, $fz), "jsjava.awt.Component,~N,~N,~N");
Clazz.overrideMethod (c$, "calculateMinimumSize", 
function (a) {
if (this.isLinked (a)) {
return this.getLinkSize (a, 0);
}return this.calculateNonlinkedMinimumSize (a);
}, "~N");
Clazz.overrideMethod (c$, "calculatePreferredSize", 
function (a) {
if (this.isLinked (a)) {
return this.getLinkSize (a, 1);
}var b = this.getMinimumSize (a);
var c = this.calculateNonlinkedPreferredSize (a);
var d = this.getMaximumSize (a);
return Math.min (d, Math.max (b, c));
}, "~N");
Clazz.overrideMethod (c$, "calculateMaximumSize", 
function (a) {
if (this.isLinked (a)) {
return this.getLinkSize (a, 2);
}return Math.max (this.getMinimumSize (a), this.calculateNonlinkedMaximumSize (a));
}, "~N");
Clazz.defineMethod (c$, "isVisible", 
function () {
return this.b$["jsjavax.swing.GroupLayout"].getComponentInfo (this.getComponent ()).isVisible ();
});
Clazz.defineMethod (c$, "calculateNonlinkedMinimumSize", 
function (a) {
if (!this.isVisible ()) {
return 0;
}if (this.$min >= 0) {
return this.$min;
}if (this.$min == -2) {
return this.calculateNonlinkedPreferredSize (a);
}return this.getSizeAlongAxis (a, this.component.getMinimumSize ());
}, "~N");
Clazz.defineMethod (c$, "calculateNonlinkedPreferredSize", 
function (a) {
if (!this.isVisible ()) {
return 0;
}if (this.$pref >= 0) {
return this.$pref;
}return this.getSizeAlongAxis (a, this.component.getPreferredSize ());
}, "~N");
Clazz.defineMethod (c$, "calculateNonlinkedMaximumSize", 
function (a) {
if (!this.isVisible ()) {
return 0;
}if (this.$max >= 0) {
return this.$max;
}if (this.$max == -2) {
return this.calculateNonlinkedPreferredSize (a);
}return this.getSizeAlongAxis (a, this.component.getMaximumSize ());
}, "~N");
Clazz.defineMethod (c$, "getSizeAlongAxis", 
($fz = function (a, b) {
return (a == 0) ? b.width : b.height;
}, $fz.isPrivate = true, $fz), "~N,jsjava.awt.Dimension");
Clazz.defineMethod (c$, "getLinkSize", 
($fz = function (a, b) {
if (!this.isVisible ()) {
return 0;
}var c = this.b$["jsjavax.swing.GroupLayout"].getComponentInfo (this.component);
return c.getLinkSize (a, b);
}, $fz.isPrivate = true, $fz), "~N,~N");
Clazz.defineMethod (c$, "setSize", 
function (a, b, c) {
Clazz.superCall (this, jsjavax.swing.GroupLayout.ComponentSpring, "setSize", [a, b, c]);
this.origin = b;
if (c == -2147483648) {
this.baseline = -1;
}}, "~N,~N,~N");
Clazz.defineMethod (c$, "getOrigin", 
function () {
return this.origin;
});
Clazz.defineMethod (c$, "setComponent", 
function (a) {
this.component = a;
}, "jsjava.awt.Component");
Clazz.defineMethod (c$, "getComponent", 
function () {
return this.component;
});
Clazz.overrideMethod (c$, "getBaseline", 
function () {
if (this.baseline == -1) {
var a = this.b$["jsjavax.swing.GroupLayout"].getComponentInfo (this.component).horizontalSpring;
var b = a.getPreferredSize (0);
var c = this.getPreferredSize (1);
if (b > 0 && c > 0) {
this.baseline = this.component.getBaseline (b, c);
}}return this.baseline;
});
Clazz.overrideMethod (c$, "getBaselineResizeBehavior", 
function () {
return this.getComponent ().getBaselineResizeBehavior ();
});
Clazz.defineMethod (c$, "isLinked", 
($fz = function (a) {
return this.b$["jsjavax.swing.GroupLayout"].getComponentInfo (this.component).isLinked (a);
}, $fz.isPrivate = true, $fz), "~N");
Clazz.defineMethod (c$, "installIfNecessary", 
function (a) {
if (!this.installed) {
this.installed = true;
if (a == 0) {
this.b$["jsjavax.swing.GroupLayout"].getComponentInfo (this.component).horizontalSpring = this;
} else {
this.b$["jsjavax.swing.GroupLayout"].getComponentInfo (this.component).verticalSpring = this;
}}}, "~N");
Clazz.overrideMethod (c$, "willHaveZeroSize", 
function (a) {
return !this.isVisible ();
}, "~B");
c$ = Clazz.p0p ();
};
c$.$GroupLayout$PreferredGapSpring$ = function () {
Clazz.pu$h ();
c$ = Clazz.decorateAsClass (function () {
Clazz.prepareCallback (this, arguments);
this.source = null;
this.target = null;
this.type = null;
this.$pref = 0;
this.$max = 0;
Clazz.instantialize (this, arguments);
}, jsjavax.swing.GroupLayout, "PreferredGapSpring", jsjavax.swing.GroupLayout.Spring, null, Clazz.innerTypeInstance (jsjavax.swing.GroupLayout.Spring, this, null, Clazz.inheritArgs));
Clazz.makeConstructor (c$, 
function (a, b, c, d, e) {
Clazz.superConstructor (this, jsjavax.swing.GroupLayout.PreferredGapSpring, []);
this.source = a;
this.target = b;
this.type = c;
this.$pref = d;
this.$max = e;
}, "jsjavax.swing.JComponent,jsjavax.swing.JComponent,jsjavax.swing.LayoutStyle.ComponentPlacement,~N,~N");
Clazz.overrideMethod (c$, "calculateMinimumSize", 
function (a) {
return this.getPadding (a);
}, "~N");
Clazz.overrideMethod (c$, "calculatePreferredSize", 
function (a) {
if (this.$pref == -1 || this.$pref == -2) {
return this.getMinimumSize (a);
}var b = this.getMinimumSize (a);
var c = this.getMaximumSize (a);
return Math.min (c, Math.max (b, this.$pref));
}, "~N");
Clazz.overrideMethod (c$, "calculateMaximumSize", 
function (a) {
if (this.$max == -2 || this.$max == -1) {
return this.getPadding (a);
}return Math.max (this.getMinimumSize (a), this.$max);
}, "~N");
Clazz.defineMethod (c$, "getPadding", 
($fz = function (a) {
var b;
if (a == 0) {
b = 3;
} else {
b = 5;
}return this.b$["jsjavax.swing.GroupLayout"].getLayoutStyle0 ().getPreferredGap (this.source, this.target, this.type, b, this.b$["jsjavax.swing.GroupLayout"].host);
}, $fz.isPrivate = true, $fz), "~N");
Clazz.overrideMethod (c$, "willHaveZeroSize", 
function (a) {
return false;
}, "~B");
c$ = Clazz.p0p ();
};
c$.$GroupLayout$GapSpring$ = function () {
Clazz.pu$h ();
c$ = Clazz.decorateAsClass (function () {
Clazz.prepareCallback (this, arguments);
this.$min = 0;
this.$pref = 0;
this.$max = 0;
Clazz.instantialize (this, arguments);
}, jsjavax.swing.GroupLayout, "GapSpring", jsjavax.swing.GroupLayout.Spring, null, Clazz.innerTypeInstance (jsjavax.swing.GroupLayout.Spring, this, null, Clazz.inheritArgs));
Clazz.makeConstructor (c$, 
function (a, b, c) {
Clazz.superConstructor (this, jsjavax.swing.GroupLayout.GapSpring, []);
jsjavax.swing.GroupLayout.checkSize (a, b, c, false);
this.$min = a;
this.$pref = b;
this.$max = c;
}, "~N,~N,~N");
Clazz.overrideMethod (c$, "calculateMinimumSize", 
function (a) {
if (this.$min == -2) {
return this.getPreferredSize (a);
}return this.$min;
}, "~N");
Clazz.overrideMethod (c$, "calculatePreferredSize", 
function (a) {
return this.$pref;
}, "~N");
Clazz.overrideMethod (c$, "calculateMaximumSize", 
function (a) {
if (this.$max == -2) {
return this.getPreferredSize (a);
}return this.$max;
}, "~N");
Clazz.overrideMethod (c$, "willHaveZeroSize", 
function (a) {
return false;
}, "~B");
c$ = Clazz.p0p ();
};
c$.$GroupLayout$AutoPreferredGapSpring$ = function () {
Clazz.pu$h ();
c$ = Clazz.decorateAsClass (function () {
Clazz.prepareCallback (this, arguments);
this.sources = null;
this.source = null;
this.matches = null;
this.$size = 0;
this.lastSize = 0;
this.$pref = 0;
this.$max = 0;
this.type = null;
this.userCreated = false;
Clazz.instantialize (this, arguments);
}, jsjavax.swing.GroupLayout, "AutoPreferredGapSpring", jsjavax.swing.GroupLayout.Spring, null, Clazz.innerTypeInstance (jsjavax.swing.GroupLayout.Spring, this, null, Clazz.inheritArgs));
Clazz.makeConstructor (c$, 
($fz = function () {
Clazz.superConstructor (this, jsjavax.swing.GroupLayout.AutoPreferredGapSpring, []);
this.$pref = -2;
this.$max = -2;
this.type = jsjavax.swing.LayoutStyle.ComponentPlacement.RELATED;
}, $fz.isPrivate = true, $fz));
Clazz.makeConstructor (c$, 
function (a, b) {
Clazz.superConstructor (this, jsjavax.swing.GroupLayout.AutoPreferredGapSpring, []);
this.$pref = a;
this.$max = b;
}, "~N,~N");
Clazz.makeConstructor (c$, 
function (a, b, c) {
Clazz.superConstructor (this, jsjavax.swing.GroupLayout.AutoPreferredGapSpring, []);
this.type = a;
this.$pref = b;
this.$max = c;
this.userCreated = true;
}, "jsjavax.swing.LayoutStyle.ComponentPlacement,~N,~N");
Clazz.defineMethod (c$, "setSources", 
function (a) {
this.sources =  new java.util.ArrayList (a);
}, "java.util.List");
Clazz.defineMethod (c$, "setUserCreated", 
function (a) {
this.userCreated = a;
}, "~B");
Clazz.defineMethod (c$, "getUserCreated", 
function () {
return this.userCreated;
});
Clazz.defineMethod (c$, "unset", 
function () {
this.lastSize = this.getSize ();
Clazz.superCall (this, jsjavax.swing.GroupLayout.AutoPreferredGapSpring, "unset", []);
this.$size = 0;
});
Clazz.defineMethod (c$, "reset", 
function () {
this.$size = 0;
this.sources = null;
this.source = null;
this.matches = null;
});
Clazz.defineMethod (c$, "calculatePadding", 
function (a) {
this.$size = -2147483648;
var b = -2147483648;
if (this.matches != null) {
var c = this.b$["jsjavax.swing.GroupLayout"].getLayoutStyle0 ();
var d;
if (a == 0) {
if (this.b$["jsjavax.swing.GroupLayout"].isLeftToRight ()) {
d = 3;
} else {
d = 7;
}} else {
d = 5;
}for (var e = this.matches.size () - 1; e >= 0; e--) {
var f = this.matches.get (e);
b = Math.max (b, this.calculatePadding (c, d, f.source, f.target));
}
}if (this.$size == -2147483648) {
this.$size = 0;
}if (b == -2147483648) {
b = 0;
}if (this.lastSize != -2147483648) {
this.$size += Math.min (b, this.lastSize);
}}, "~N");
Clazz.defineMethod (c$, "calculatePadding", 
($fz = function (a, b, c, d) {
var e = d.getOrigin () - (c.getOrigin () + c.getSize ());
if (e >= 0) {
var f;
if ((Clazz.instanceOf (c.getComponent (), jsjavax.swing.JComponent)) && (Clazz.instanceOf (d.getComponent (), jsjavax.swing.JComponent))) {
f = a.getPreferredGap (c.getComponent (), d.getComponent (), this.type, b, this.b$["jsjavax.swing.GroupLayout"].host);
} else {
f = 10;
}if (f > e) {
this.$size = Math.max (this.$size, f - e);
}return f;
}return 0;
}, $fz.isPrivate = true, $fz), "jsjavax.swing.LayoutStyle,~N,jsjavax.swing.GroupLayout.ComponentSpring,jsjavax.swing.GroupLayout.ComponentSpring");
Clazz.defineMethod (c$, "addTarget", 
function (a, b) {
var c = (b == 0) ? 1 : 0;
if (this.source != null) {
if (this.b$["jsjavax.swing.GroupLayout"].areParallelSiblings (this.source.getComponent (), a.getComponent (), c)) {
this.addValidTarget (this.source, a);
}} else {
var d = a.getComponent ();
for (var e = this.sources.size () - 1; e >= 0; e--) {
var f = this.sources.get (e);
if (this.b$["jsjavax.swing.GroupLayout"].areParallelSiblings (f.getComponent (), d, c)) {
this.addValidTarget (f, a);
}}
}}, "jsjavax.swing.GroupLayout.ComponentSpring,~N");
Clazz.defineMethod (c$, "addValidTarget", 
($fz = function (a, b) {
if (this.matches == null) {
this.matches =  new java.util.ArrayList (1);
}this.matches.add ( new jsjavax.swing.GroupLayout.AutoPreferredGapMatch (a, b));
}, $fz.isPrivate = true, $fz), "jsjavax.swing.GroupLayout.ComponentSpring,jsjavax.swing.GroupLayout.ComponentSpring");
Clazz.overrideMethod (c$, "calculateMinimumSize", 
function (a) {
return this.$size;
}, "~N");
Clazz.overrideMethod (c$, "calculatePreferredSize", 
function (a) {
if (this.$pref == -2 || this.$pref == -1) {
return this.$size;
}return Math.max (this.$size, this.$pref);
}, "~N");
Clazz.overrideMethod (c$, "calculateMaximumSize", 
function (a) {
if (this.$max >= 0) {
return Math.max (this.getPreferredSize (a), this.$max);
}return this.$size;
}, "~N");
Clazz.defineMethod (c$, "getMatchDescription", 
function () {
return (this.matches == null) ? "" : this.matches.toString ();
});
Clazz.defineMethod (c$, "toString", 
function () {
return Clazz.superCall (this, jsjavax.swing.GroupLayout.AutoPreferredGapSpring, "toString", []) + this.getMatchDescription ();
});
Clazz.overrideMethod (c$, "willHaveZeroSize", 
function (a) {
return a;
}, "~B");
c$ = Clazz.p0p ();
};
c$.$GroupLayout$ContainerAutoPreferredGapSpring$ = function () {
Clazz.pu$h ();
c$ = Clazz.decorateAsClass (function () {
Clazz.prepareCallback (this, arguments);
this.targets = null;
Clazz.instantialize (this, arguments);
}, jsjavax.swing.GroupLayout, "ContainerAutoPreferredGapSpring", jsjavax.swing.GroupLayout.AutoPreferredGapSpring, null, Clazz.innerTypeInstance (jsjavax.swing.GroupLayout.AutoPreferredGapSpring, this, null, Clazz.inheritArgs));
Clazz.makeConstructor (c$, 
function () {
Clazz.superConstructor (this, jsjavax.swing.GroupLayout.ContainerAutoPreferredGapSpring);
this.setUserCreated (true);
});
Clazz.makeConstructor (c$, 
function (a, b) {
Clazz.superConstructor (this, jsjavax.swing.GroupLayout.ContainerAutoPreferredGapSpring, [a, b]);
this.setUserCreated (true);
}, "~N,~N");
Clazz.overrideMethod (c$, "addTarget", 
function (a, b) {
if (this.targets == null) {
this.targets =  new java.util.ArrayList (1);
}this.targets.add (a);
}, "jsjavax.swing.GroupLayout.ComponentSpring,~N");
Clazz.defineMethod (c$, "calculatePadding", 
function (a) {
var $private = Clazz.checkPrivateMethod (arguments);
if ($private != null) {
return $private.apply (this, arguments);
}
var b = this.b$["jsjavax.swing.GroupLayout"].getLayoutStyle0 ();
var c = 0;
var d;
this.$size = 0;
if (this.targets != null) {
if (a == 0) {
if (this.b$["jsjavax.swing.GroupLayout"].isLeftToRight ()) {
d = 7;
} else {
d = 3;
}} else {
d = 5;
}for (var e = this.targets.size () - 1; e >= 0; e--) {
var f = this.targets.get (e);
var g = 10;
if (Clazz.instanceOf (f.getComponent (), jsjavax.swing.JComponent)) {
g = b.getContainerGap (f.getComponent (), d, this.b$["jsjavax.swing.GroupLayout"].host);
c = Math.max (g, c);
g -= f.getOrigin ();
} else {
c = Math.max (g, c);
}this.$size = Math.max (this.$size, g);
}
} else {
if (a == 0) {
if (this.b$["jsjavax.swing.GroupLayout"].isLeftToRight ()) {
d = 3;
} else {
d = 7;
}} else {
d = 5;
}if (this.sources != null) {
for (var e = this.sources.size () - 1; e >= 0; e--) {
var f = this.sources.get (e);
c = Math.max (c, this.updateSize (b, f, d));
}
} else if (this.source != null) {
c = this.updateSize (b, this.source, d);
}}if (this.lastSize != -2147483648) {
this.$size += Math.min (c, this.lastSize);
}}, "~N");
Clazz.defineMethod (c$, "updateSize", 
($fz = function (a, b, c) {
var d = 10;
if (Clazz.instanceOf (b.getComponent (), jsjavax.swing.JComponent)) {
d = a.getContainerGap (b.getComponent (), c, this.b$["jsjavax.swing.GroupLayout"].host);
}var e = Math.max (0, this.getParent ().getSize () - b.getSize () - b.getOrigin ());
this.$size = Math.max (this.$size, d - e);
return d;
}, $fz.isPrivate = true, $fz), "jsjavax.swing.LayoutStyle,jsjavax.swing.GroupLayout.ComponentSpring,~N");
Clazz.overrideMethod (c$, "getMatchDescription", 
function () {
if (this.targets != null) {
return "leading: " + this.targets.toString ();
}if (this.sources != null) {
return "trailing: " + this.sources.toString ();
}return "--";
});
c$ = Clazz.p0p ();
};
c$.$GroupLayout$ComponentInfo$ = function () {
Clazz.pu$h ();
c$ = Clazz.decorateAsClass (function () {
Clazz.prepareCallback (this, arguments);
this.component = null;
this.horizontalSpring = null;
this.verticalSpring = null;
this.horizontalMaster = null;
this.verticalMaster = null;
this.visible = false;
this.honorsVisibility = null;
Clazz.instantialize (this, arguments);
}, jsjavax.swing.GroupLayout, "ComponentInfo");
Clazz.makeConstructor (c$, 
function (a) {
this.component = a;
this.updateVisibility ();
}, "jsjava.awt.Component");
Clazz.defineMethod (c$, "dispose", 
function () {
this.removeSpring (this.horizontalSpring);
this.horizontalSpring = null;
this.removeSpring (this.verticalSpring);
this.verticalSpring = null;
if (this.horizontalMaster != null) {
this.horizontalMaster.remove (this);
}if (this.verticalMaster != null) {
this.verticalMaster.remove (this);
}});
Clazz.defineMethod (c$, "setHonorsVisibility", 
function (a) {
this.honorsVisibility = a;
}, "Boolean");
Clazz.defineMethod (c$, "removeSpring", 
($fz = function (a) {
if (a != null) {
(a.getParent ()).springs.remove (a);
}}, $fz.isPrivate = true, $fz), "jsjavax.swing.GroupLayout.Spring");
Clazz.defineMethod (c$, "isVisible", 
function () {
return this.visible;
});
Clazz.defineMethod (c$, "updateVisibility", 
function () {
var a;
if (this.honorsVisibility == null) {
a = this.b$["jsjavax.swing.GroupLayout"].getHonorsVisibility ();
} else {
a = (this.honorsVisibility).booleanValue ();
}var b = (a) ? this.component.isVisible () : true;
if (this.visible != b) {
this.visible = b;
return true;
}return false;
});
Clazz.defineMethod (c$, "setBounds", 
function (a, b, c) {
var d = this.horizontalSpring.getOrigin ();
var e = this.horizontalSpring.getSize ();
var f = this.verticalSpring.getOrigin ();
var g = this.verticalSpring.getSize ();
if (!c) {
d = b - d - e;
}this.component.setBounds (d + a.left, f + a.top, e, g);
}, "jsjava.awt.Insets,~N,~B");
Clazz.defineMethod (c$, "setComponent", 
function (a) {
this.component = a;
if (this.horizontalSpring != null) {
this.horizontalSpring.setComponent (a);
}if (this.verticalSpring != null) {
this.verticalSpring.setComponent (a);
}}, "jsjava.awt.Component");
Clazz.defineMethod (c$, "isLinked", 
function (a) {
if (a == 0) {
return this.horizontalMaster != null;
}return (this.verticalMaster != null);
}, "~N");
Clazz.defineMethod (c$, "setLinkInfo", 
($fz = function (a, b) {
if (a == 0) {
this.horizontalMaster = b;
} else {
this.verticalMaster = b;
}}, $fz.isPrivate = true, $fz), "~N,jsjavax.swing.GroupLayout.LinkInfo");
Clazz.defineMethod (c$, "getLinkInfo", 
function (a) {
return this.getLinkInfo (a, true);
}, "~N");
Clazz.defineMethod (c$, "getLinkInfo", 
($fz = function (a, b) {
if (a == 0) {
if (this.horizontalMaster == null && b) {
 new jsjavax.swing.GroupLayout.LinkInfo (0).add (this);
}return this.horizontalMaster;
} else {
if (this.verticalMaster == null && b) {
 new jsjavax.swing.GroupLayout.LinkInfo (1).add (this);
}return this.verticalMaster;
}}, $fz.isPrivate = true, $fz), "~N,~B");
Clazz.defineMethod (c$, "clearCachedSize", 
function () {
if (this.horizontalMaster != null) {
this.horizontalMaster.clearCachedSize ();
}if (this.verticalMaster != null) {
this.verticalMaster.clearCachedSize ();
}});
Clazz.defineMethod (c$, "getLinkSize", 
function (a, b) {
if (a == 0) {
return this.horizontalMaster.getSize (a);
} else {
return this.verticalMaster.getSize (a);
}}, "~N,~N");
c$ = Clazz.p0p ();
};
Clazz.pu$h ();
c$ = Clazz.declareType (jsjavax.swing.GroupLayout, "Alignment", Enum);
Clazz.defineEnumConstant (c$, "LEADING", 0, []);
Clazz.defineEnumConstant (c$, "TRAILING", 1, []);
Clazz.defineEnumConstant (c$, "CENTER", 2, []);
Clazz.defineEnumConstant (c$, "BASELINE", 3, []);
c$ = Clazz.p0p ();
Clazz.pu$h ();
c$ = Clazz.decorateAsClass (function () {
this.index = 0;
this.delta = 0;
Clazz.instantialize (this, arguments);
}, jsjavax.swing.GroupLayout, "SpringDelta", null, Comparable);
Clazz.makeConstructor (c$, 
function (a, b) {
this.index = a;
this.delta = b;
}, "~N,~N");
Clazz.overrideMethod (c$, "compareTo", 
function (a) {
return this.delta - a.delta;
}, "jsjavax.swing.GroupLayout.SpringDelta");
Clazz.defineMethod (c$, "toString", 
function () {
return Clazz.superCall (this, jsjavax.swing.GroupLayout.SpringDelta, "toString", []) + "[index=" + this.index + ", delta=" + this.delta + "]";
});
c$ = Clazz.p0p ();
Clazz.pu$h ();
c$ = Clazz.decorateAsClass (function () {
this.source = null;
this.target = null;
Clazz.instantialize (this, arguments);
}, jsjavax.swing.GroupLayout, "AutoPreferredGapMatch");
Clazz.makeConstructor (c$, 
function (a, b) {
this.source = a;
this.target = b;
}, "jsjavax.swing.GroupLayout.ComponentSpring,jsjavax.swing.GroupLayout.ComponentSpring");
Clazz.defineMethod (c$, "toString", 
($fz = function (a) {
return a.getComponent ().getName ();
}, $fz.isPrivate = true, $fz), "jsjavax.swing.GroupLayout.ComponentSpring");
Clazz.defineMethod (c$, "toString", 
function () {
return "[" + this.toString (this.source) + "-" + this.toString (this.target) + "]";
});
c$ = Clazz.p0p ();
Clazz.pu$h ();
c$ = Clazz.decorateAsClass (function () {
this.axis = 0;
this.linked = null;
this.size = 0;
Clazz.instantialize (this, arguments);
}, jsjavax.swing.GroupLayout, "LinkInfo");
Clazz.makeConstructor (c$, 
function (a) {
this.linked =  new java.util.ArrayList ();
this.size = -2147483648;
this.axis = a;
}, "~N");
Clazz.defineMethod (c$, "add", 
function (a) {
var b = a.getLinkInfo (this.axis, false);
if (b == null) {
this.linked.add (a);
a.setLinkInfo (this.axis, this);
} else if (b !== this) {
this.linked.addAll (b.linked);
for (var childInfo, $childInfo = b.linked.iterator (); $childInfo.hasNext () && ((childInfo = $childInfo.next ()) || true);) {
childInfo.setLinkInfo (this.axis, this);
}
}this.clearCachedSize ();
}, "jsjavax.swing.GroupLayout.ComponentInfo");
Clazz.defineMethod (c$, "remove", 
function (a) {
this.linked.remove (a);
a.setLinkInfo (this.axis, null);
if (this.linked.size () == 1) {
this.linked.get (0).setLinkInfo (this.axis, null);
}this.clearCachedSize ();
}, "jsjavax.swing.GroupLayout.ComponentInfo");
Clazz.defineMethod (c$, "clearCachedSize", 
function () {
this.size = -2147483648;
});
Clazz.defineMethod (c$, "getSize", 
function (a) {
if (this.size == -2147483648) {
this.size = this.calculateLinkedSize (a);
}return this.size;
}, "~N");
Clazz.defineMethod (c$, "calculateLinkedSize", 
($fz = function (a) {
var b = 0;
for (var info, $info = this.linked.iterator (); $info.hasNext () && ((info = $info.next ()) || true);) {
var c;
if (a == 0) {
c = info.horizontalSpring;
} else {
c = info.verticalSpring;
}b = Math.max (b, c.calculateNonlinkedPreferredSize (a));
}
return b;
}, $fz.isPrivate = true, $fz), "~N");
c$ = Clazz.p0p ();
Clazz.defineStatics (c$,
"MIN_SIZE", 0,
"PREF_SIZE", 1,
"MAX_SIZE", 2,
"SPECIFIC_SIZE", 3,
"UNSET", -2147483648,
"DEFAULT_SIZE", -1,
"PREFERRED_SIZE", -2);
});

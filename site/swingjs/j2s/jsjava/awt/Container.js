Clazz.declarePackage ("jsjava.awt");
Clazz.load (["jsjava.awt.Component", "jsjava.awt.event.AWTEventListener", "java.util.ArrayList"], ["jsjava.awt.LightweightDispatcher", "$.Container"], ["java.lang.ArrayIndexOutOfBoundsException", "$.IllegalArgumentException", "jsjava.awt.AWTEventMulticaster", "$.Dimension", "$.GraphicsCallback", "$.Insets", "$.LayoutManager2", "$.Toolkit", "jsjava.awt.event.ContainerEvent", "$.ContainerListener", "$.MouseEvent", "$.MouseWheelEvent"], function () {
c$ = Clazz.decorateAsClass (function () {
this.component = null;
this.layoutMgr = null;
this.dispatcher = null;
this.focusCycleRoot = false;
this.focusTraversalPolicyProvider = false;
this.containerListener = null;
this.listeningChildren = 0;
this.listeningBoundsChildren = 0;
this.descendantsCount = 0;
this.preserveBackgroundColor = null;
this.numOfHWComponents = 0;
this.numOfLWComponents = 0;
this.modalComp = null;
this.modalAppContext = null;
Clazz.instantialize (this, arguments);
}, jsjava.awt, "Container", jsjava.awt.Component);
Clazz.prepareFields (c$, function () {
this.component =  new java.util.ArrayList ();
});
Clazz.makeConstructor (c$, 
function () {
Clazz.superConstructor (this, jsjava.awt.Container, []);
});
Clazz.defineMethod (c$, "initializeFocusTraversalKeys", 
function () {
});
Clazz.defineMethod (c$, "getComponentCount", 
function () {
return this.countComponents ();
});
Clazz.defineMethod (c$, "countComponents", 
function () {
return this.component.size ();
});
Clazz.defineMethod (c$, "getComponent", 
function (n) {
if ((n < 0) || (n >= this.component.size ())) {
throw  new ArrayIndexOutOfBoundsException ("No such child: " + n);
}return this.component.get (n);
}, "~N");
Clazz.defineMethod (c$, "getComponents", 
function () {
return this.getComponents_NoClientCode ();
});
Clazz.defineMethod (c$, "getComponents_NoClientCode", 
function () {
return this.component.toArray (jsjava.awt.Container.EMPTY_ARRAY);
});
Clazz.defineMethod (c$, "getInsets", 
function () {
return  new jsjava.awt.Insets (0, 0, 0, 0);
});
Clazz.defineMethod (c$, "add", 
function (comp) {
this.addImpl (comp, null, -1);
return comp;
}, "jsjava.awt.Component");
Clazz.defineMethod (c$, "add", 
function (name, comp) {
this.addImpl (comp, name, -1);
return comp;
}, "~S,jsjava.awt.Component");
Clazz.defineMethod (c$, "add", 
function (comp, index) {
this.addImpl (comp, null, index);
return comp;
}, "jsjava.awt.Component,~N");
Clazz.defineMethod (c$, "checkAddToSelf", 
($fz = function (comp) {
if (Clazz.instanceOf (comp, jsjava.awt.Container)) {
for (var cn = this; cn != null; cn = cn.parent) {
if (cn === comp) {
throw  new IllegalArgumentException ("adding container's parent to itself");
}}
}}, $fz.isPrivate = true, $fz), "jsjava.awt.Component");
Clazz.defineMethod (c$, "checkNotAWindow", 
($fz = function (comp) {
if (Clazz.instanceOf (comp, jsjava.awt.Window)) {
throw  new IllegalArgumentException ("adding a window to a container");
}}, $fz.isPrivate = true, $fz), "jsjava.awt.Component");
Clazz.defineMethod (c$, "removeDelicately", 
($fz = function (comp, newParent, newIndex) {
var index = this.getComponentZOrder (comp);
var needRemoveNotify = jsjava.awt.Container.isRemoveNotifyNeeded (comp, this, newParent);
if (needRemoveNotify) {
comp.removeNotify ();
}if (newParent !== this) {
if (this.layoutMgr != null) {
this.layoutMgr.removeLayoutComponent (comp);
}this.adjustListeningChildren (32768, -comp.numListening (32768));
this.adjustListeningChildren (65536, -comp.numListening (65536));
this.adjustDescendants (-(comp.countHierarchyMembers ()));
comp.parent = null;
this.component.remove (index);
this.invalidateIfValid ();
} else {
this.component.remove (index);
this.component.add (newIndex, comp);
}if (comp.parent == null) {
}return needRemoveNotify;
}, $fz.isPrivate = true, $fz), "jsjava.awt.Component,jsjava.awt.Container,~N");
Clazz.defineMethod (c$, "canContainFocusOwner", 
function (focusOwnerCandidate) {
if (!(this.isEnabled () && this.isDisplayable () && this.isVisible () && this.isFocusable ())) {
return false;
}{
if (this.parent != null) {
return this.parent.canContainFocusOwner (focusOwnerCandidate);
}}return true;
}, "jsjava.awt.Component");
Clazz.defineMethod (c$, "hasHeavyweightDescendants", 
function () {
return this.numOfHWComponents > 0;
});
Clazz.defineMethod (c$, "hasLightweightDescendants", 
function () {
return this.numOfLWComponents > 0;
});
Clazz.defineMethod (c$, "getHeavyweightContainer", 
function () {
return this;
});
c$.isRemoveNotifyNeeded = Clazz.defineMethod (c$, "isRemoveNotifyNeeded", 
($fz = function (comp, oldContainer, newContainer) {
return false;
}, $fz.isPrivate = true, $fz), "jsjava.awt.Component,jsjava.awt.Container,jsjava.awt.Container");
Clazz.defineMethod (c$, "setComponentZOrder", 
function (comp, index) {
{
var curParent = comp.parent;
var oldZindex = this.getComponentZOrder (comp);
if (curParent === this && index == oldZindex) {
return;
}var peerRecreated = (curParent != null) ? curParent.removeDelicately (comp, this, index) : false;
this.addDelicately (comp, curParent, index);
if (!peerRecreated && oldZindex != -1) {
comp.mixOnZOrderChanging (oldZindex, index);
}}}, "jsjava.awt.Component,~N");
Clazz.defineMethod (c$, "addDelicately", 
($fz = function (comp, curParent, index) {
this.checkTreeLock ();
if (curParent !== this) {
if (index == -1) {
this.component.add (comp);
} else {
this.component.add (index, comp);
}comp.parent = this;
this.adjustListeningChildren (32768, comp.numListening (32768));
this.adjustListeningChildren (65536, comp.numListening (65536));
this.adjustDescendants (comp.countHierarchyMembers ());
} else {
if (index < this.component.size ()) {
this.component.set (index, comp);
}}this.invalidateIfValid ();
if (curParent !== this) {
if (this.layoutMgr != null) {
if (Clazz.instanceOf (this.layoutMgr, jsjava.awt.LayoutManager2)) {
(this.layoutMgr).addLayoutComponent (comp, null);
} else {
this.layoutMgr.addLayoutComponent (null, comp);
}}if (this.containerListener != null || (this.eventMask & 2) != 0 || jsjava.awt.Toolkit.enabledOnToolkit (2)) {
var e =  new jsjava.awt.event.ContainerEvent (this, 300, comp);
this.dispatchEvent (e);
}comp.createHierarchyEvents (1400, comp, this, 1, jsjava.awt.Toolkit.enabledOnToolkit (32768));
} else {
comp.createHierarchyEvents (1400, comp, this, 1400, jsjava.awt.Toolkit.enabledOnToolkit (32768));
}}, $fz.isPrivate = true, $fz), "jsjava.awt.Component,jsjava.awt.Container,~N");
Clazz.defineMethod (c$, "checkTreeLock", 
($fz = function () {
}, $fz.isPrivate = true, $fz));
Clazz.defineMethod (c$, "getComponentZOrder", 
function (comp) {
if (comp == null) {
return -1;
}{
if (comp.parent !== this) {
return -1;
}return this.component.indexOf (comp);
}}, "jsjava.awt.Component");
Clazz.defineMethod (c$, "add", 
function (comp, constraints) {
this.addImpl (comp, constraints, -1);
}, "jsjava.awt.Component,~O");
Clazz.defineMethod (c$, "add", 
function (comp, constraints, index) {
this.addImpl (comp, constraints, index);
}, "jsjava.awt.Component,~O,~N");
Clazz.defineMethod (c$, "addImpl", 
function (comp, constraints, index) {
{
if (index > this.component.size () || (index < 0 && index != -1)) {
throw  new IllegalArgumentException ("illegal component position");
}this.checkAddToSelf (comp);
this.checkNotAWindow (comp);
if (comp.parent != null) {
comp.parent.remove (comp);
if (index > this.component.size ()) {
throw  new IllegalArgumentException ("illegal component position");
}}if (index == -1) {
this.component.add (comp);
} else {
this.component.add (index, comp);
}comp.parent = this;
this.adjustListeningChildren (32768, comp.numListening (32768));
this.adjustListeningChildren (65536, comp.numListening (65536));
this.adjustDescendants (comp.countHierarchyMembers ());
this.invalidateIfValid ();
if (this.layoutMgr != null) {
if (Clazz.instanceOf (this.layoutMgr, jsjava.awt.LayoutManager2)) {
(this.layoutMgr).addLayoutComponent (comp, constraints);
} else if (Clazz.instanceOf (constraints, String)) {
this.layoutMgr.addLayoutComponent (constraints, comp);
}}if (this.containerListener != null || (this.eventMask & 2) != 0 || jsjava.awt.Toolkit.enabledOnToolkit (2)) {
var e =  new jsjava.awt.event.ContainerEvent (this, 300, comp);
this.dispatchEvent (e);
}comp.createHierarchyEvents (1400, comp, this, 1, jsjava.awt.Toolkit.enabledOnToolkit (32768));
}}, "jsjava.awt.Component,~O,~N");
Clazz.defineMethod (c$, "checkGD", 
function (stringID) {
}, "~S");
Clazz.defineMethod (c$, "remove", 
function (index) {
{
if (index < 0 || index >= this.component.size ()) {
throw  new ArrayIndexOutOfBoundsException (index);
}var comp = this.component.get (index);
if (this.layoutMgr != null) {
this.layoutMgr.removeLayoutComponent (comp);
}this.adjustListeningChildren (32768, -comp.numListening (32768));
this.adjustListeningChildren (65536, -comp.numListening (65536));
this.adjustDescendants (-(comp.countHierarchyMembers ()));
comp.parent = null;
this.component.remove (index);
this.invalidateIfValid ();
if (this.containerListener != null || (this.eventMask & 2) != 0 || jsjava.awt.Toolkit.enabledOnToolkit (2)) {
var e =  new jsjava.awt.event.ContainerEvent (this, 301, comp);
this.dispatchEvent (e);
}comp.createHierarchyEvents (1400, comp, this, 1, jsjava.awt.Toolkit.enabledOnToolkit (32768));
}}, "~N");
Clazz.defineMethod (c$, "remove", 
function (comp) {
{
if (comp.parent === this) {
var index = this.component.indexOf (comp);
if (index >= 0) {
this.remove (index);
}}}}, "jsjava.awt.Component");
Clazz.defineMethod (c$, "removeAll", 
function () {
{
this.adjustListeningChildren (32768, -this.listeningChildren);
this.adjustListeningChildren (65536, -this.listeningBoundsChildren);
this.adjustDescendants (-this.descendantsCount);
while (!this.component.isEmpty ()) {
var comp = this.component.remove (this.component.size () - 1);
if (this.layoutMgr != null) {
this.layoutMgr.removeLayoutComponent (comp);
}comp.parent = null;
if (this.containerListener != null || (this.eventMask & 2) != 0 || jsjava.awt.Toolkit.enabledOnToolkit (2)) {
var e =  new jsjava.awt.event.ContainerEvent (this, 301, comp);
this.dispatchEvent (e);
}comp.createHierarchyEvents (1400, comp, this, 1, jsjava.awt.Toolkit.enabledOnToolkit (32768));
}
this.invalidateIfValid ();
}});
Clazz.defineMethod (c$, "numListening", 
function (mask) {
var superListening = Clazz.superCall (this, jsjava.awt.Container, "numListening", [mask]);
if (mask == 32768) {
return this.listeningChildren + superListening;
} else if (mask == 65536) {
return this.listeningBoundsChildren + superListening;
} else {
return superListening;
}}, "~N");
Clazz.defineMethod (c$, "adjustListeningChildren", 
function (mask, num) {
if (num == 0) return;
if ((mask & 32768) != 0) {
this.listeningChildren += num;
}if ((mask & 65536) != 0) {
this.listeningBoundsChildren += num;
}this.adjustListeningChildrenOnParent (mask, num);
}, "~N,~N");
Clazz.defineMethod (c$, "adjustDescendants", 
function (num) {
if (num == 0) return;
this.descendantsCount += num;
this.adjustDecendantsOnParent (num);
}, "~N");
Clazz.defineMethod (c$, "adjustDecendantsOnParent", 
function (num) {
if (this.parent != null) {
this.parent.adjustDescendants (num);
}}, "~N");
Clazz.defineMethod (c$, "countHierarchyMembers", 
function () {
return this.descendantsCount + 1;
});
Clazz.defineMethod (c$, "getListenersCount", 
($fz = function (id, enabledOnToolkit) {
if (enabledOnToolkit) {
return this.descendantsCount;
}switch (id) {
case 1400:
return this.listeningChildren;
case 1401:
case 1402:
return this.listeningBoundsChildren;
default:
return 0;
}
}, $fz.isPrivate = true, $fz), "~N,~B");
Clazz.defineMethod (c$, "createHierarchyEvents", 
function (id, changed, changedParent, changeFlags, enabledOnToolkit) {
var listeners = this.getListenersCount (id, enabledOnToolkit);
for (var count = listeners, i = 0; count > 0; i++) {
count -= this.component.get (i).createHierarchyEvents (id, changed, changedParent, changeFlags, enabledOnToolkit);
}
return listeners + Clazz.superCall (this, jsjava.awt.Container, "createHierarchyEvents", [id, changed, changedParent, changeFlags, enabledOnToolkit]);
}, "~N,jsjava.awt.Component,jsjava.awt.Container,~N,~B");
Clazz.defineMethod (c$, "createChildHierarchyEvents", 
function (id, changeFlags, enabledOnToolkit) {
if (this.component.isEmpty ()) {
return;
}var listeners = this.getListenersCount (id, enabledOnToolkit);
for (var count = listeners, i = 0; count > 0; i++) {
count -= this.component.get (i).createHierarchyEvents (id, this, this.parent, changeFlags, enabledOnToolkit);
}
}, "~N,~N,~B");
Clazz.defineMethod (c$, "getLayout", 
function () {
return this.layoutMgr;
});
Clazz.defineMethod (c$, "setLayout", 
function (mgr) {
this.layoutMgr = mgr;
this.invalidateIfValid ();
}, "jsjava.awt.LayoutManager");
Clazz.overrideMethod (c$, "doLayout", 
function () {
this.layout ();
});
Clazz.overrideMethod (c$, "layout", 
function () {
var layoutMgr = this.layoutMgr;
if (layoutMgr != null) {
layoutMgr.layoutContainer (this);
}});
Clazz.defineMethod (c$, "invalidate", 
function () {
var layoutMgr = this.layoutMgr;
if (Clazz.instanceOf (layoutMgr, jsjava.awt.LayoutManager2)) {
var lm = layoutMgr;
lm.invalidateLayout (this);
}Clazz.superCall (this, jsjava.awt.Container, "invalidate", []);
});
Clazz.defineMethod (c$, "validate", 
function () {
});
Clazz.defineMethod (c$, "validateTree", 
function () {
Clazz.superCall (this, jsjava.awt.Container, "validate", []);
});
Clazz.defineMethod (c$, "invalidateTree", 
function () {
{
for (var i = 0; i < this.component.size (); i++) {
var comp = this.component.get (i);
if (Clazz.instanceOf (comp, jsjava.awt.Container)) {
(comp).invalidateTree ();
} else {
comp.invalidateIfValid ();
}}
this.invalidateIfValid ();
}});
Clazz.defineMethod (c$, "setFont", 
function (f) {
var oldfont = this.getFont ();
Clazz.superCall (this, jsjava.awt.Container, "setFont", [f]);
var newfont = this.getFont ();
if (newfont !== oldfont && (oldfont == null || !oldfont.equals (newfont))) {
this.invalidateTree ();
}}, "jsjava.awt.Font");
Clazz.overrideMethod (c$, "getPreferredSize", 
function () {
return this.preferredSize ();
});
Clazz.defineMethod (c$, "preferredSize", 
function () {
var dim = this.prefSize;
if (dim == null || !(this.isPreferredSizeSet () || this.isValid ())) {
{
this.prefSize = (this.layoutMgr != null) ? this.layoutMgr.preferredLayoutSize (this) : Clazz.superCall (this, jsjava.awt.Container, "preferredSize", []);
dim = this.prefSize;
}}if (dim != null) {
return  new jsjava.awt.Dimension (dim);
} else {
return dim;
}});
Clazz.overrideMethod (c$, "getMinimumSize", 
function () {
var dim = this.minSize;
if (dim == null || !(this.isMinimumSizeSet () || this.isValid ())) {
{
this.minSize = (this.layoutMgr != null) ? this.layoutMgr.minimumLayoutSize (this) : Clazz.superCall (this, jsjava.awt.Container, "minimumSize", []);
dim = this.minSize;
}}if (dim != null) {
return  new jsjava.awt.Dimension (dim);
} else {
return dim;
}});
Clazz.defineMethod (c$, "getMaximumSize", 
function () {
var dim = this.maxSize;
if (dim == null || !(this.isMaximumSizeSet () || this.isValid ())) {
{
if (Clazz.instanceOf (this.layoutMgr, jsjava.awt.LayoutManager2)) {
var lm = this.layoutMgr;
this.maxSize = lm.maximumLayoutSize (this);
} else {
this.maxSize = Clazz.superCall (this, jsjava.awt.Container, "getMaximumSize", []);
}dim = this.maxSize;
}}if (dim != null) {
return  new jsjava.awt.Dimension (dim);
} else {
return dim;
}});
Clazz.defineMethod (c$, "getAlignmentX", 
function () {
var xAlign;
if (Clazz.instanceOf (this.layoutMgr, jsjava.awt.LayoutManager2)) {
{
var lm = this.layoutMgr;
xAlign = lm.getLayoutAlignmentX (this);
}} else {
xAlign = Clazz.superCall (this, jsjava.awt.Container, "getAlignmentX", []);
}return xAlign;
});
Clazz.defineMethod (c$, "getAlignmentY", 
function () {
var yAlign;
if (Clazz.instanceOf (this.layoutMgr, jsjava.awt.LayoutManager2)) {
{
var lm = this.layoutMgr;
yAlign = lm.getLayoutAlignmentY (this);
}} else {
yAlign = Clazz.superCall (this, jsjava.awt.Container, "getAlignmentY", []);
}return yAlign;
});
Clazz.overrideMethod (c$, "paint", 
function (g) {
}, "jsjava.awt.Graphics");
Clazz.overrideMethod (c$, "update", 
function (g) {
if (this.isShowing ()) {
g.clearRect (0, 0, this.width, this.height);
this.paint (g);
}}, "jsjava.awt.Graphics");
Clazz.defineMethod (c$, "paintComponents", 
function (g) {
if (this.isShowing ()) {
jsjava.awt.GraphicsCallback.PaintAllCallback.getInstance ().runComponents (this.component.toArray (jsjava.awt.Container.EMPTY_ARRAY), g, 4);
}}, "jsjava.awt.Graphics");
Clazz.defineMethod (c$, "lightweightPaint", 
function (g) {
Clazz.superCall (this, jsjava.awt.Container, "lightweightPaint", [g]);
this.paintHeavyweightComponents (g);
}, "jsjava.awt.Graphics");
Clazz.overrideMethod (c$, "paintHeavyweightComponents", 
function (g) {
if (this.isShowing ()) {
jsjava.awt.GraphicsCallback.PaintHeavyweightComponentsCallback.getInstance ().runComponents (this.component.toArray (jsjava.awt.Container.EMPTY_ARRAY), g, 3);
}}, "jsjava.awt.Graphics");
Clazz.defineMethod (c$, "addContainerListener", 
function (l) {
if (l == null) {
return;
}this.containerListener = jsjava.awt.AWTEventMulticaster.add (this.containerListener, l);
this.newEventsOnly = true;
}, "jsjava.awt.event.ContainerListener");
Clazz.defineMethod (c$, "removeContainerListener", 
function (l) {
if (l == null) {
return;
}this.containerListener = jsjava.awt.AWTEventMulticaster.remove (this.containerListener, l);
}, "jsjava.awt.event.ContainerListener");
Clazz.defineMethod (c$, "getContainerListeners", 
function () {
return (this.getListeners (jsjava.awt.event.ContainerListener));
});
Clazz.defineMethod (c$, "getListeners", 
function (listenerType) {
var l = null;
if (listenerType === jsjava.awt.event.ContainerListener) {
l = this.containerListener;
} else {
return Clazz.superCall (this, jsjava.awt.Container, "getListeners", [listenerType]);
}return jsjava.awt.AWTEventMulticaster.getListeners (l, listenerType);
}, "Class");
Clazz.defineMethod (c$, "eventEnabled", 
function (e) {
var id = e.getID ();
if (id == 300 || id == 301) {
if ((this.eventMask & 2) != 0 || this.containerListener != null) {
return true;
}return false;
}return Clazz.superCall (this, jsjava.awt.Container, "eventEnabled", [e]);
}, "jsjava.awt.AWTEvent");
Clazz.defineMethod (c$, "processEvent", 
function (e) {
if (Clazz.instanceOf (e, jsjava.awt.event.ContainerEvent)) {
this.processContainerEvent (e);
return;
}Clazz.superCall (this, jsjava.awt.Container, "processEvent", [e]);
}, "jsjava.awt.AWTEvent");
Clazz.defineMethod (c$, "processContainerEvent", 
function (e) {
var listener = this.containerListener;
if (listener != null) {
switch (e.getID ()) {
case 300:
listener.componentAdded (e);
break;
case 301:
listener.componentRemoved (e);
break;
}
}}, "jsjava.awt.event.ContainerEvent");
Clazz.defineMethod (c$, "dispatchEventImpl", 
function (e) {
if ((this.dispatcher != null) && this.dispatcher.dispatchEvent (e)) {
e.consume ();
return;
}Clazz.superCall (this, jsjava.awt.Container, "dispatchEventImpl", [e]);
{
switch (e.getID ()) {
case 101:
break;
case 100:
break;
default:
break;
}
}}, "jsjava.awt.AWTEvent");
Clazz.defineMethod (c$, "dispatchEventToSelf", 
function (e) {
Clazz.superCall (this, jsjava.awt.Container, "dispatchEventImpl", [e]);
}, "jsjava.awt.AWTEvent");
Clazz.defineMethod (c$, "getMouseEventTarget", 
function (x, y, includeSelf) {
return this.getMouseEventTarget (x, y, includeSelf, jsjava.awt.Container.MouseEventTargetFilter.FILTER, false);
}, "~N,~N,~B");
Clazz.defineMethod (c$, "getMouseEventTarget", 
($fz = function (x, y, includeSelf, filter, searchHeavyweights) {
var comp = null;
return comp;
}, $fz.isPrivate = true, $fz), "~N,~N,~B,jsjava.awt.Container.EventTargetFilter,~B");
Clazz.defineMethod (c$, "proxyEnableEvents", 
function (events) {
if (this.parent != null) {
this.parent.proxyEnableEvents (events);
}}, "~N");
Clazz.defineMethod (c$, "deliverEvent", 
function (e) {
var comp = this.getComponentAt (e.x, e.y);
if ((comp != null) && (comp !== this)) {
e.translate (-comp.x, -comp.y);
comp.deliverEvent (e);
} else {
this.postEvent (e);
}}, "jsjava.awt.Event");
Clazz.defineMethod (c$, "getComponentAt", 
function (x, y) {
return this.locate (x, y);
}, "~N,~N");
Clazz.overrideMethod (c$, "locate", 
function (x, y) {
return this;
}, "~N,~N");
Clazz.defineMethod (c$, "getComponentAt", 
function (p) {
return this.getComponentAt (p.x, p.y);
}, "jsjava.awt.Point");
Clazz.defineMethod (c$, "getMousePosition", 
function (allowChildren) {
return null;
}, "~B");
Clazz.overrideMethod (c$, "isSameOrAncestorOf", 
function (comp, allowChildren) {
return this === comp || (allowChildren && this.isParentOf (comp));
}, "jsjava.awt.Component,~B");
Clazz.defineMethod (c$, "findComponentAt", 
function (x, y) {
{
return this.findComponentAt (x, y, true);
}}, "~N,~N");
Clazz.defineMethod (c$, "findComponentAt", 
function (x, y, ignoreEnabled) {
return null;
}, "~N,~N,~B");
Clazz.defineMethod (c$, "findComponentAt", 
function (p) {
return this.findComponentAt (p.x, p.y);
}, "jsjava.awt.Point");
Clazz.overrideMethod (c$, "addNotify", 
function () {
});
Clazz.defineMethod (c$, "removeNotify", 
function () {
});
Clazz.defineMethod (c$, "isAncestorOf", 
function (c) {
var p;
if (c == null || ((p = c.getParent ()) == null)) {
return false;
}while (p != null) {
if (p === this) {
return true;
}p = p.getParent ();
}
return false;
}, "jsjava.awt.Component");
Clazz.defineMethod (c$, "setFocusTraversalKeys", 
function (id, keystrokes) {
}, "~N,java.util.Set");
Clazz.defineMethod (c$, "getFocusTraversalKeys", 
function (id) {
return null;
}, "~N");
Clazz.defineMethod (c$, "areFocusTraversalKeysSet", 
function (id) {
return false;
}, "~N");
Clazz.defineMethod (c$, "isFocusCycleRoot", 
function (container) {
if (this.isFocusCycleRoot () && container === this) {
return true;
} else {
return Clazz.superCall (this, jsjava.awt.Container, "isFocusCycleRoot", [container]);
}}, "jsjava.awt.Container");
Clazz.overrideMethod (c$, "containsFocus", 
function () {
return false;
});
Clazz.defineMethod (c$, "isParentOf", 
($fz = function (comp) {
{
while (comp != null && comp !== this && !(Clazz.instanceOf (comp, jsjava.awt.Window))) {
comp = comp.getParent ();
}
return (comp === this);
}}, $fz.isPrivate = true, $fz), "jsjava.awt.Component");
Clazz.defineMethod (c$, "clearMostRecentFocusOwnerOnHide", 
function () {
});
Clazz.overrideMethod (c$, "clearCurrentFocusCycleRootOnHide", 
function () {
});
Clazz.defineMethod (c$, "getTraversalRoot", 
function () {
return null;
});
Clazz.defineMethod (c$, "isFocusCycleRoot", 
function () {
return this.focusCycleRoot;
});
Clazz.defineMethod (c$, "setFocusTraversalPolicyProvider", 
function (provider) {
var oldProvider;
{
oldProvider = this.focusTraversalPolicyProvider;
this.focusTraversalPolicyProvider = provider;
}this.firePropertyChange ("focusTraversalPolicyProvider", oldProvider, provider);
}, "~B");
Clazz.defineMethod (c$, "isFocusTraversalPolicyProvider", 
function () {
return this.focusTraversalPolicyProvider;
});
Clazz.defineMethod (c$, "transferFocusDownCycle", 
function () {
});
Clazz.defineMethod (c$, "preProcessKeyEvent", 
function (e) {
var parent = this.parent;
if (parent != null) {
parent.preProcessKeyEvent (e);
}}, "jsjava.awt.event.KeyEvent");
Clazz.defineMethod (c$, "postProcessKeyEvent", 
function (e) {
var parent = this.parent;
if (parent != null) {
parent.postProcessKeyEvent (e);
}}, "jsjava.awt.event.KeyEvent");
Clazz.overrideMethod (c$, "postsOldMouseEvents", 
function () {
return true;
});
Clazz.defineMethod (c$, "applyComponentOrientation", 
function (o) {
Clazz.superCall (this, jsjava.awt.Container, "applyComponentOrientation", [o]);
{
for (var i = 0; i < this.component.size (); i++) {
var comp = this.component.get (i);
comp.applyComponentOrientation (o);
}
}}, "jsjava.awt.ComponentOrientation");
Clazz.declareInterface (jsjava.awt.Container, "EventTargetFilter");
Clazz.pu$h ();
c$ = Clazz.declareType (jsjava.awt.Container, "MouseEventTargetFilter", null, jsjava.awt.Container.EventTargetFilter);
Clazz.makeConstructor (c$, 
($fz = function () {
}, $fz.isPrivate = true, $fz));
Clazz.overrideMethod (c$, "accept", 
function (a) {
return (a.eventMask & 32) != 0 || (a.eventMask & 16) != 0 || (a.eventMask & 131072) != 0 || a.mouseListener != null || a.mouseMotionListener != null || a.mouseWheelListener != null;
}, "jsjava.awt.Component");
c$.FILTER = c$.prototype.FILTER =  new jsjava.awt.Container.MouseEventTargetFilter ();
c$ = Clazz.p0p ();
c$.EMPTY_ARRAY = c$.prototype.EMPTY_ARRAY =  new Array (0);
Clazz.defineStatics (c$,
"INCLUDE_SELF", true,
"SEARCH_HEAVYWEIGHTS", true);
c$ = Clazz.decorateAsClass (function () {
this.nativeContainer = null;
this.mouseEventTarget = null;
this.targetLastEntered = null;
this.isMouseInNativeContainer = false;
this.eventMask = 0;
Clazz.instantialize (this, arguments);
}, jsjava.awt, "LightweightDispatcher", null, jsjava.awt.event.AWTEventListener);
Clazz.makeConstructor (c$, 
function (nativeContainer) {
this.nativeContainer = nativeContainer;
this.mouseEventTarget = null;
this.eventMask = 0;
}, "jsjava.awt.Container");
Clazz.defineMethod (c$, "dispose", 
function () {
this.stopListeningForOtherDrags ();
this.mouseEventTarget = null;
});
Clazz.defineMethod (c$, "enableEvents", 
function (events) {
this.eventMask |= events;
}, "~N");
Clazz.defineMethod (c$, "dispatchEvent", 
function (e) {
var ret = false;
if (Clazz.instanceOf (e, jsjava.awt.event.MouseEvent) && (this.eventMask & 131120) != 0) {
var me = e;
ret = this.processMouseEvent (me);
}if (e.getID () == 503) {
this.nativeContainer.updateCursorImmediately ();
}return ret;
}, "jsjava.awt.AWTEvent");
Clazz.defineMethod (c$, "isMouseGrab", 
($fz = function (e) {
var modifiers = e.getModifiersEx ();
if (e.getID () == 501 || e.getID () == 502) {
switch (e.getButton ()) {
case 1:
modifiers ^= 1024;
break;
case 2:
modifiers ^= 2048;
break;
case 3:
modifiers ^= 4096;
break;
}
}return ((modifiers & (7168)) != 0);
}, $fz.isPrivate = true, $fz), "jsjava.awt.event.MouseEvent");
Clazz.defineMethod (c$, "processMouseEvent", 
($fz = function (e) {
var id = e.getID ();
var mouseOver = this.nativeContainer.getMouseEventTarget (e.getX (), e.getY (), true);
this.trackMouseEnterExit (mouseOver, e);
if (!this.isMouseGrab (e) && id != 500) {
this.mouseEventTarget = (mouseOver !== this.nativeContainer) ? mouseOver : null;
}if (this.mouseEventTarget != null) {
switch (id) {
case 504:
case 505:
break;
case 501:
this.retargetMouseEvent (this.mouseEventTarget, id, e);
break;
case 502:
this.retargetMouseEvent (this.mouseEventTarget, id, e);
break;
case 500:
if (mouseOver === this.mouseEventTarget) {
this.retargetMouseEvent (mouseOver, id, e);
}break;
case 503:
this.retargetMouseEvent (this.mouseEventTarget, id, e);
break;
case 506:
if (this.isMouseGrab (e)) {
this.retargetMouseEvent (this.mouseEventTarget, id, e);
}break;
case 507:
this.retargetMouseEvent (mouseOver, id, e);
break;
}
e.consume ();
}return e.isConsumed ();
}, $fz.isPrivate = true, $fz), "jsjava.awt.event.MouseEvent");
Clazz.defineMethod (c$, "trackMouseEnterExit", 
($fz = function (targetOver, e) {
var targetEnter = null;
var id = e.getID ();
if (id != 505 && id != 506 && id != 1500 && this.isMouseInNativeContainer == false) {
this.isMouseInNativeContainer = true;
this.startListeningForOtherDrags ();
} else if (id == 505) {
this.isMouseInNativeContainer = false;
this.stopListeningForOtherDrags ();
}if (this.isMouseInNativeContainer) {
targetEnter = targetOver;
}if (this.targetLastEntered === targetEnter) {
return;
}if (this.targetLastEntered != null) {
this.retargetMouseEvent (this.targetLastEntered, 505, e);
}if (id == 505) {
e.consume ();
}if (targetEnter != null) {
this.retargetMouseEvent (targetEnter, 504, e);
}if (id == 504) {
e.consume ();
}this.targetLastEntered = targetEnter;
}, $fz.isPrivate = true, $fz), "jsjava.awt.Component,jsjava.awt.event.MouseEvent");
Clazz.defineMethod (c$, "startListeningForOtherDrags", 
($fz = function () {
}, $fz.isPrivate = true, $fz));
Clazz.defineMethod (c$, "stopListeningForOtherDrags", 
($fz = function () {
}, $fz.isPrivate = true, $fz));
Clazz.overrideMethod (c$, "eventDispatched", 
function (e) {
var isForeignDrag = (Clazz.instanceOf (e, jsjava.awt.event.MouseEvent)) && (e.id == 506) && (e.getSource () !== this.nativeContainer);
if (!isForeignDrag) {
return;
}var srcEvent = e;
var me;
{
var srcComponent = srcEvent.getComponent ();
if (!srcComponent.isShowing ()) {
return;
}var c = this.nativeContainer;
while ((c != null) && !(Clazz.instanceOf (c, jsjava.awt.Window))) {
c = c.getParent_NoClientCode ();
}
if ((c == null) || (c).isModalBlocked ()) {
return;
}me =  new jsjava.awt.event.MouseEvent (this.nativeContainer, 1500, srcEvent.getWhen (), srcEvent.getModifiersEx () | srcEvent.getModifiers (), srcEvent.getX (), srcEvent.getY (), srcEvent.getXOnScreen (), srcEvent.getYOnScreen (), srcEvent.getClickCount (), srcEvent.isPopupTrigger (), srcEvent.getButton ());
(srcEvent).copyPrivateDataInto (me);
}var targetOver = this.nativeContainer.getMouseEventTarget (me.getX (), me.getY (), true);
this.trackMouseEnterExit (targetOver, me);
}, "jsjava.awt.AWTEvent");
Clazz.defineMethod (c$, "retargetMouseEvent", 
function (target, id, e) {
if (target == null) {
return;
}var x = e.getX ();
var y = e.getY ();
var component;
for (component = target; component != null && component !== this.nativeContainer; component = component.getParent ()) {
x -= component.x;
y -= component.y;
}
var retargeted;
if (component != null) {
if (id == 507) {
retargeted =  new jsjava.awt.event.MouseWheelEvent (target, id, e.getWhen (), e.getModifiersEx () | e.getModifiers (), x, y, e.getXOnScreen (), e.getYOnScreen (), e.getClickCount (), e.isPopupTrigger (), (e).getScrollType (), (e).getScrollAmount (), (e).getWheelRotation ());
} else {
retargeted =  new jsjava.awt.event.MouseEvent (target, id, e.getWhen (), e.getModifiersEx () | e.getModifiers (), x, y, e.getXOnScreen (), e.getYOnScreen (), e.getClickCount (), e.isPopupTrigger (), e.getButton ());
}(e).copyPrivateDataInto (retargeted);
if (target === this.nativeContainer) {
(target).dispatchEventToSelf (retargeted);
} else {
if (this.nativeContainer.modalComp != null) {
if ((this.nativeContainer.modalComp).isAncestorOf (target)) {
target.dispatchEvent (retargeted);
} else {
e.consume ();
}} else {
target.dispatchEvent (retargeted);
}}}}, "jsjava.awt.Component,~N,jsjava.awt.event.MouseEvent");
Clazz.defineStatics (c$,
"LWD_MOUSE_DRAGGED_OVER", 1500,
"MOUSE_MASK", 131120);
});

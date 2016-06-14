Clazz.declarePackage ("javax.swing");
Clazz.load (["java.awt.Frame", "java.awt.event.WindowListener", "javax.swing.SwingConstants"], "javax.swing.SwingUtilities", ["java.lang.Character", "$.Error", "$.Thread", "java.applet.Applet", "java.awt.Component", "$.Container", "$.EventQueue", "$.Point", "$.Rectangle", "$.Window", "java.awt.event.ActionEvent", "$.MouseEvent", "$.MouseWheelEvent", "javax.swing.JComponent", "$.JRootPane", "$.RootPaneContainer", "javax.swing.event.MenuDragMouseEvent", "javax.swing.plaf.UIResource", "jssun.awt.AppContext", "jssun.swing.UIAction", "swingjs.api.Interface"], function () {
c$ = Clazz.declareType (javax.swing, "SwingUtilities", null, javax.swing.SwingConstants);
c$.installSwingDropTargetAsNecessary = Clazz.defineMethod (c$, "installSwingDropTargetAsNecessary", 
function (c, t) {
}, "java.awt.Component,javax.swing.TransferHandler");
c$.isRectangleContainingRectangle = Clazz.defineMethod (c$, "isRectangleContainingRectangle", 
function (a, b) {
if (b.x >= a.x && (b.x + b.width) <= (a.x + a.width) && b.y >= a.y && (b.y + b.height) <= (a.y + a.height)) {
return true;
}return false;
}, "java.awt.Rectangle,java.awt.Rectangle");
c$.getLocalBounds = Clazz.defineMethod (c$, "getLocalBounds", 
function (aComponent) {
var b =  new java.awt.Rectangle (aComponent.getBounds ());
b.x = b.y = 0;
return b;
}, "java.awt.Component");
c$.getWindowAncestor = Clazz.defineMethod (c$, "getWindowAncestor", 
function (c) {
for (var p = c.getParent (); p != null; p = p.getParent ()) {
if (Clazz.instanceOf (p, java.awt.Window)) {
return p;
}}
return null;
}, "java.awt.Component");
c$.convertScreenLocationToParent = Clazz.defineMethod (c$, "convertScreenLocationToParent", 
function (parent, x, y) {
for (var p = parent; p != null; p = p.getParent ()) {
if (Clazz.instanceOf (p, java.awt.Window)) {
var point =  new java.awt.Point (x, y);
javax.swing.SwingUtilities.convertPointFromScreen (point, parent);
return point;
}}
throw  new Error ("convertScreenLocationToParent: no window ancestor");
}, "java.awt.Container,~N,~N");
c$.convertPoint = Clazz.defineMethod (c$, "convertPoint", 
function (source, aPoint, destination) {
var p;
if (source == null && destination == null) return aPoint;
if (source == null) {
source = javax.swing.SwingUtilities.getWindowAncestor (destination);
if (source == null) throw  new Error ("Source component not connected to component tree hierarchy");
}p =  new java.awt.Point (aPoint);
javax.swing.SwingUtilities.convertPointToScreen (p, source);
if (destination == null) {
destination = javax.swing.SwingUtilities.getWindowAncestor (source);
if (destination == null) throw  new Error ("Destination component not connected to component tree hierarchy");
}javax.swing.SwingUtilities.convertPointFromScreen (p, destination);
return p;
}, "java.awt.Component,java.awt.Point,java.awt.Component");
c$.convertPoint = Clazz.defineMethod (c$, "convertPoint", 
function (source, x, y, destination) {
var point =  new java.awt.Point (x, y);
return javax.swing.SwingUtilities.convertPoint (source, point, destination);
}, "java.awt.Component,~N,~N,java.awt.Component");
c$.convertRectangle = Clazz.defineMethod (c$, "convertRectangle", 
function (source, aRectangle, destination) {
var point =  new java.awt.Point (aRectangle.x, aRectangle.y);
point = javax.swing.SwingUtilities.convertPoint (source, point, destination);
return  new java.awt.Rectangle (point.x, point.y, aRectangle.width, aRectangle.height);
}, "java.awt.Component,java.awt.Rectangle,java.awt.Component");
c$.getAncestorOfClass = Clazz.defineMethod (c$, "getAncestorOfClass", 
function (c, comp) {
if (comp == null || c == null) return null;
var parent = comp.getParent ();
while (parent != null && !(c.isInstance (parent))) parent = parent.getParent ();

return parent;
}, "Class,java.awt.Component");
c$.getAncestorNamed = Clazz.defineMethod (c$, "getAncestorNamed", 
function (name, comp) {
if (comp == null || name == null) return null;
var parent = comp.getParent ();
while (parent != null && !(name.equals (parent.getName ()))) parent = parent.getParent ();

return parent;
}, "~S,java.awt.Component");
c$.getDeepestComponentAt = Clazz.defineMethod (c$, "getDeepestComponentAt", 
function (parent, x, y) {
if (!parent.contains (x, y)) {
return null;
}if (Clazz.instanceOf (parent, java.awt.Container)) {
var components = (parent).getComponents ();
for (var i = 0; i < components.length; i++) {
var comp = components[i];
if (comp != null && comp.isVisible ()) {
var loc = comp.getLocation ();
if (Clazz.instanceOf (comp, java.awt.Container)) {
comp = javax.swing.SwingUtilities.getDeepestComponentAt (comp, x - loc.x, y - loc.y);
} else {
comp = comp.getComponentAt (x - loc.x, y - loc.y);
}if (comp != null && comp.isVisible ()) {
return comp;
}}}
}return parent;
}, "java.awt.Component,~N,~N");
c$.convertMouseEvent = Clazz.defineMethod (c$, "convertMouseEvent", 
function (source, sourceEvent, destination) {
var p = javax.swing.SwingUtilities.convertPoint (source,  new java.awt.Point (sourceEvent.getX (), sourceEvent.getY ()), destination);
var newSource;
if (destination != null) newSource = destination;
 else newSource = source;
var newEvent;
if (Clazz.instanceOf (sourceEvent, java.awt.event.MouseWheelEvent)) {
var sourceWheelEvent = sourceEvent;
newEvent =  new java.awt.event.MouseWheelEvent (newSource, sourceWheelEvent.getID (), sourceWheelEvent.getWhen (), sourceWheelEvent.getModifiers (), p.x, p.y, sourceWheelEvent.getXOnScreen (), sourceWheelEvent.getYOnScreen (), sourceWheelEvent.getClickCount (), sourceWheelEvent.isPopupTrigger (), sourceWheelEvent.getScrollType (), sourceWheelEvent.getScrollAmount (), sourceWheelEvent.getWheelRotation ());
} else if (Clazz.instanceOf (sourceEvent, javax.swing.event.MenuDragMouseEvent)) {
var sourceMenuDragEvent = sourceEvent;
newEvent =  new javax.swing.event.MenuDragMouseEvent (newSource, sourceMenuDragEvent.getID (), sourceMenuDragEvent.getWhen (), sourceMenuDragEvent.getModifiers (), p.x, p.y, sourceMenuDragEvent.getXOnScreen (), sourceMenuDragEvent.getYOnScreen (), sourceMenuDragEvent.getClickCount (), sourceMenuDragEvent.isPopupTrigger (), sourceMenuDragEvent.getPath (), sourceMenuDragEvent.getMenuSelectionManager ());
} else {
newEvent =  new java.awt.event.MouseEvent (newSource, sourceEvent.getID (), sourceEvent.getWhen (), sourceEvent.getModifiers (), p.x, p.y, sourceEvent.getXOnScreen (), sourceEvent.getYOnScreen (), sourceEvent.getClickCount (), sourceEvent.isPopupTrigger (), 0);
}return newEvent;
}, "java.awt.Component,java.awt.event.MouseEvent,java.awt.Component");
c$.convertPointToScreen = Clazz.defineMethod (c$, "convertPointToScreen", 
function (p, c) {
var x;
var y;
do {
if (Clazz.instanceOf (c, javax.swing.JComponent)) {
x = (c).getX ();
y = (c).getY ();
} else if (Clazz.instanceOf (c, java.applet.Applet) || Clazz.instanceOf (c, java.awt.Window)) {
try {
var pp = c.getLocationOnScreen ();
x = pp.x;
y = pp.y;
} catch (icse) {
if (Clazz.exceptionOf (icse, java.awt.IllegalComponentStateException)) {
x = c.getX ();
y = c.getY ();
} else {
throw icse;
}
}
} else {
x = c.getX ();
y = c.getY ();
}p.x += x;
p.y += y;
if (Clazz.instanceOf (c, java.awt.Window) || Clazz.instanceOf (c, java.applet.Applet)) break;
c = c.getParent ();
} while (c != null);
}, "java.awt.Point,java.awt.Component");
c$.convertPointFromScreen = Clazz.defineMethod (c$, "convertPointFromScreen", 
function (p, c) {
var x;
var y;
do {
if (Clazz.instanceOf (c, javax.swing.JComponent)) {
x = (c).getX ();
y = (c).getY ();
} else if (Clazz.instanceOf (c, java.applet.Applet) || Clazz.instanceOf (c, java.awt.Window)) {
try {
var pp = c.getLocationOnScreen ();
x = pp.x;
y = pp.y;
} catch (icse) {
if (Clazz.exceptionOf (icse, java.awt.IllegalComponentStateException)) {
x = c.getX ();
y = c.getY ();
} else {
throw icse;
}
}
} else {
x = c.getX ();
y = c.getY ();
}p.x -= x;
p.y -= y;
if (Clazz.instanceOf (c, java.awt.Window) || Clazz.instanceOf (c, java.applet.Applet)) break;
c = c.getParent ();
} while (c != null);
}, "java.awt.Point,java.awt.Component");
c$.windowForComponent = Clazz.defineMethod (c$, "windowForComponent", 
function (c) {
return javax.swing.SwingUtilities.getWindowAncestor (c);
}, "java.awt.Component");
c$.isDescendingFrom = Clazz.defineMethod (c$, "isDescendingFrom", 
function (a, b) {
if (a === b) return true;
for (var p = a.getParent (); p != null; p = p.getParent ()) if (p === b) return true;

return false;
}, "java.awt.Component,java.awt.Component");
c$.computeIntersection = Clazz.defineMethod (c$, "computeIntersection", 
function (x, y, width, height, dest) {
var x1 = (x > dest.x) ? x : dest.x;
var x2 = ((x + width) < (dest.x + dest.width)) ? (x + width) : (dest.x + dest.width);
var y1 = (y > dest.y) ? y : dest.y;
var y2 = ((y + height) < (dest.y + dest.height) ? (y + height) : (dest.y + dest.height));
dest.x = x1;
dest.y = y1;
dest.width = x2 - x1;
dest.height = y2 - y1;
if (dest.width < 0 || dest.height < 0) {
dest.x = dest.y = dest.width = dest.height = 0;
}return dest;
}, "~N,~N,~N,~N,java.awt.Rectangle");
c$.computeUnion = Clazz.defineMethod (c$, "computeUnion", 
function (x, y, width, height, dest) {
var x1 = (x < dest.x) ? x : dest.x;
var x2 = ((x + width) > (dest.x + dest.width)) ? (x + width) : (dest.x + dest.width);
var y1 = (y < dest.y) ? y : dest.y;
var y2 = ((y + height) > (dest.y + dest.height)) ? (y + height) : (dest.y + dest.height);
dest.x = x1;
dest.y = y1;
dest.width = (x2 - x1);
dest.height = (y2 - y1);
return dest;
}, "~N,~N,~N,~N,java.awt.Rectangle");
c$.computeDifference = Clazz.defineMethod (c$, "computeDifference", 
function (rectA, rectB) {
if (rectB == null || !rectA.intersects (rectB) || javax.swing.SwingUtilities.isRectangleContainingRectangle (rectB, rectA)) {
return  new Array (0);
}var t =  new java.awt.Rectangle ();
var a = null;
var b = null;
var c = null;
var d = null;
var result;
var rectCount = 0;
if (javax.swing.SwingUtilities.isRectangleContainingRectangle (rectA, rectB)) {
t.x = rectA.x;
t.y = rectA.y;
t.width = rectB.x - rectA.x;
t.height = rectA.height;
if (t.width > 0 && t.height > 0) {
a =  new java.awt.Rectangle (t);
rectCount++;
}t.x = rectB.x;
t.y = rectA.y;
t.width = rectB.width;
t.height = rectB.y - rectA.y;
if (t.width > 0 && t.height > 0) {
b =  new java.awt.Rectangle (t);
rectCount++;
}t.x = rectB.x;
t.y = rectB.y + rectB.height;
t.width = rectB.width;
t.height = rectA.y + rectA.height - (rectB.y + rectB.height);
if (t.width > 0 && t.height > 0) {
c =  new java.awt.Rectangle (t);
rectCount++;
}t.x = rectB.x + rectB.width;
t.y = rectA.y;
t.width = rectA.x + rectA.width - (rectB.x + rectB.width);
t.height = rectA.height;
if (t.width > 0 && t.height > 0) {
d =  new java.awt.Rectangle (t);
rectCount++;
}} else {
if (rectB.x <= rectA.x && rectB.y <= rectA.y) {
if ((rectB.x + rectB.width) > (rectA.x + rectA.width)) {
t.x = rectA.x;
t.y = rectB.y + rectB.height;
t.width = rectA.width;
t.height = rectA.y + rectA.height - (rectB.y + rectB.height);
if (t.width > 0 && t.height > 0) {
a = t;
rectCount++;
}} else if ((rectB.y + rectB.height) > (rectA.y + rectA.height)) {
t.reshape ((rectB.x + rectB.width), rectA.y, (rectA.x + rectA.width) - (rectB.x + rectB.width), rectA.height);
if (t.width > 0 && t.height > 0) {
a = t;
rectCount++;
}} else {
t.reshape ((rectB.x + rectB.width), rectA.y, (rectA.x + rectA.width) - (rectB.x + rectB.width), (rectB.y + rectB.height) - rectA.y);
if (t.width > 0 && t.height > 0) {
a =  new java.awt.Rectangle (t);
rectCount++;
}t.reshape (rectA.x, (rectB.y + rectB.height), rectA.width, (rectA.y + rectA.height) - (rectB.y + rectB.height));
if (t.width > 0 && t.height > 0) {
b =  new java.awt.Rectangle (t);
rectCount++;
}}} else if (rectB.x <= rectA.x && (rectB.y + rectB.height) >= (rectA.y + rectA.height)) {
if ((rectB.x + rectB.width) > (rectA.x + rectA.width)) {
t.reshape (rectA.x, rectA.y, rectA.width, rectB.y - rectA.y);
if (t.width > 0 && t.height > 0) {
a = t;
rectCount++;
}} else {
t.reshape (rectA.x, rectA.y, rectA.width, rectB.y - rectA.y);
if (t.width > 0 && t.height > 0) {
a =  new java.awt.Rectangle (t);
rectCount++;
}t.reshape ((rectB.x + rectB.width), rectB.y, (rectA.x + rectA.width) - (rectB.x + rectB.width), (rectA.y + rectA.height) - rectB.y);
if (t.width > 0 && t.height > 0) {
b =  new java.awt.Rectangle (t);
rectCount++;
}}} else if (rectB.x <= rectA.x) {
if ((rectB.x + rectB.width) >= (rectA.x + rectA.width)) {
t.reshape (rectA.x, rectA.y, rectA.width, rectB.y - rectA.y);
if (t.width > 0 && t.height > 0) {
a =  new java.awt.Rectangle (t);
rectCount++;
}t.reshape (rectA.x, (rectB.y + rectB.height), rectA.width, (rectA.y + rectA.height) - (rectB.y + rectB.height));
if (t.width > 0 && t.height > 0) {
b =  new java.awt.Rectangle (t);
rectCount++;
}} else {
t.reshape (rectA.x, rectA.y, rectA.width, rectB.y - rectA.y);
if (t.width > 0 && t.height > 0) {
a =  new java.awt.Rectangle (t);
rectCount++;
}t.reshape ((rectB.x + rectB.width), rectB.y, (rectA.x + rectA.width) - (rectB.x + rectB.width), rectB.height);
if (t.width > 0 && t.height > 0) {
b =  new java.awt.Rectangle (t);
rectCount++;
}t.reshape (rectA.x, (rectB.y + rectB.height), rectA.width, (rectA.y + rectA.height) - (rectB.y + rectB.height));
if (t.width > 0 && t.height > 0) {
c =  new java.awt.Rectangle (t);
rectCount++;
}}} else if (rectB.x <= (rectA.x + rectA.width) && (rectB.x + rectB.width) > (rectA.x + rectA.width)) {
if (rectB.y <= rectA.y && (rectB.y + rectB.height) > (rectA.y + rectA.height)) {
t.reshape (rectA.x, rectA.y, rectB.x - rectA.x, rectA.height);
if (t.width > 0 && t.height > 0) {
a = t;
rectCount++;
}} else if (rectB.y <= rectA.y) {
t.reshape (rectA.x, rectA.y, rectB.x - rectA.x, (rectB.y + rectB.height) - rectA.y);
if (t.width > 0 && t.height > 0) {
a =  new java.awt.Rectangle (t);
rectCount++;
}t.reshape (rectA.x, (rectB.y + rectB.height), rectA.width, (rectA.y + rectA.height) - (rectB.y + rectB.height));
if (t.width > 0 && t.height > 0) {
b =  new java.awt.Rectangle (t);
rectCount++;
}} else if ((rectB.y + rectB.height) > (rectA.y + rectA.height)) {
t.reshape (rectA.x, rectA.y, rectA.width, rectB.y - rectA.y);
if (t.width > 0 && t.height > 0) {
a =  new java.awt.Rectangle (t);
rectCount++;
}t.reshape (rectA.x, rectB.y, rectB.x - rectA.x, (rectA.y + rectA.height) - rectB.y);
if (t.width > 0 && t.height > 0) {
b =  new java.awt.Rectangle (t);
rectCount++;
}} else {
t.reshape (rectA.x, rectA.y, rectA.width, rectB.y - rectA.y);
if (t.width > 0 && t.height > 0) {
a =  new java.awt.Rectangle (t);
rectCount++;
}t.reshape (rectA.x, rectB.y, rectB.x - rectA.x, rectB.height);
if (t.width > 0 && t.height > 0) {
b =  new java.awt.Rectangle (t);
rectCount++;
}t.reshape (rectA.x, (rectB.y + rectB.height), rectA.width, (rectA.y + rectA.height) - (rectB.y + rectB.height));
if (t.width > 0 && t.height > 0) {
c =  new java.awt.Rectangle (t);
rectCount++;
}}} else if (rectB.x >= rectA.x && (rectB.x + rectB.width) <= (rectA.x + rectA.width)) {
if (rectB.y <= rectA.y && (rectB.y + rectB.height) > (rectA.y + rectA.height)) {
t.reshape (rectA.x, rectA.y, rectB.x - rectA.x, rectA.height);
if (t.width > 0 && t.height > 0) {
a =  new java.awt.Rectangle (t);
rectCount++;
}t.reshape ((rectB.x + rectB.width), rectA.y, (rectA.x + rectA.width) - (rectB.x + rectB.width), rectA.height);
if (t.width > 0 && t.height > 0) {
b =  new java.awt.Rectangle (t);
rectCount++;
}} else if (rectB.y <= rectA.y) {
t.reshape (rectA.x, rectA.y, rectB.x - rectA.x, rectA.height);
if (t.width > 0 && t.height > 0) {
a =  new java.awt.Rectangle (t);
rectCount++;
}t.reshape (rectB.x, (rectB.y + rectB.height), rectB.width, (rectA.y + rectA.height) - (rectB.y + rectB.height));
if (t.width > 0 && t.height > 0) {
b =  new java.awt.Rectangle (t);
rectCount++;
}t.reshape ((rectB.x + rectB.width), rectA.y, (rectA.x + rectA.width) - (rectB.x + rectB.width), rectA.height);
if (t.width > 0 && t.height > 0) {
c =  new java.awt.Rectangle (t);
rectCount++;
}} else {
t.reshape (rectA.x, rectA.y, rectB.x - rectA.x, rectA.height);
if (t.width > 0 && t.height > 0) {
a =  new java.awt.Rectangle (t);
rectCount++;
}t.reshape (rectB.x, rectA.y, rectB.width, rectB.y - rectA.y);
if (t.width > 0 && t.height > 0) {
b =  new java.awt.Rectangle (t);
rectCount++;
}t.reshape ((rectB.x + rectB.width), rectA.y, (rectA.x + rectA.width) - (rectB.x + rectB.width), rectA.height);
if (t.width > 0 && t.height > 0) {
c =  new java.awt.Rectangle (t);
rectCount++;
}}}}result =  new Array (rectCount);
rectCount = 0;
if (a != null) result[rectCount++] = a;
if (b != null) result[rectCount++] = b;
if (c != null) result[rectCount++] = c;
if (d != null) result[rectCount++] = d;
return result;
}, "java.awt.Rectangle,java.awt.Rectangle");
c$.isLeftMouseButton = Clazz.defineMethod (c$, "isLeftMouseButton", 
function (anEvent) {
return ((anEvent.getModifiers () & 16) != 0);
}, "java.awt.event.MouseEvent");
c$.isMiddleMouseButton = Clazz.defineMethod (c$, "isMiddleMouseButton", 
function (anEvent) {
return ((anEvent.getModifiers () & 8) == 8);
}, "java.awt.event.MouseEvent");
c$.isRightMouseButton = Clazz.defineMethod (c$, "isRightMouseButton", 
function (anEvent) {
return ((anEvent.getModifiers () & 4) == 4);
}, "java.awt.event.MouseEvent");
c$.paintComponent = Clazz.defineMethod (c$, "paintComponent", 
function (g, c, p, x, y, w, h) {
javax.swing.SwingUtilities.getCellRendererPane (c, p).paintComponent (g, c, p, x, y, w, h, false);
}, "java.awt.Graphics,java.awt.Component,java.awt.Container,~N,~N,~N,~N");
c$.paintComponent = Clazz.defineMethod (c$, "paintComponent", 
function (g, c, p, r) {
javax.swing.SwingUtilities.paintComponent (g, c, p, r.x, r.y, r.width, r.height);
}, "java.awt.Graphics,java.awt.Component,java.awt.Container,java.awt.Rectangle");
c$.getCellRendererPane = Clazz.defineMethod (c$, "getCellRendererPane", 
 function (c, p) {
var shell = c.getParent ();
if (Clazz.instanceOf (shell, javax.swing.CellRendererPane)) {
if (shell.getParent () !== p) {
p.add (shell);
}} else {
shell = swingjs.api.Interface.getInstance ("javax.swing.CellRendererPane", false);
shell.add (c);
p.add (shell);
}return shell;
}, "java.awt.Component,java.awt.Container");
c$.updateComponentTreeUI = Clazz.defineMethod (c$, "updateComponentTreeUI", 
function (c) {
javax.swing.SwingUtilities.updateComponentTreeUI0 (c);
c.invalidate ();
c.validate ();
c.repaint ();
}, "java.awt.Component");
c$.updateComponentTreeUI0 = Clazz.defineMethod (c$, "updateComponentTreeUI0", 
 function (c) {
if (Clazz.instanceOf (c, javax.swing.JComponent)) {
var jc = c;
jc.updateUI ();
var jpm = jc.getComponentPopupMenu ();
if (jpm != null) {
javax.swing.SwingUtilities.updateComponentTreeUI (jpm);
}}var children = null;
if (Clazz.instanceOf (c, javax.swing.JMenu)) {
children = (c).getMenuComponents ();
} else if (Clazz.instanceOf (c, java.awt.Container)) {
children = (c).getComponents ();
}if (children != null) {
for (var i = 0; i < children.length; i++) {
javax.swing.SwingUtilities.updateComponentTreeUI0 (children[i]);
}
}}, "java.awt.Component");
c$.invokeLater = Clazz.defineMethod (c$, "invokeLater", 
function (doRun) {
java.awt.EventQueue.invokeLater (doRun);
}, "Runnable");
c$.invokeAndWait = Clazz.defineMethod (c$, "invokeAndWait", 
function (doRun) {
java.awt.EventQueue.invokeAndWait (doRun);
}, "Runnable");
c$.isEventDispatchThread = Clazz.defineMethod (c$, "isEventDispatchThread", 
function () {
return java.awt.EventQueue.isDispatchThread ();
});
c$.getRootPane = Clazz.defineMethod (c$, "getRootPane", 
function (c) {
if (Clazz.instanceOf (c, javax.swing.RootPaneContainer)) {
return (c).getRootPane ();
}for (; c != null; c = c.getParent ()) {
if (Clazz.instanceOf (c, javax.swing.JRootPane)) {
return c;
}}
return null;
}, "java.awt.Component");
c$.getRoot = Clazz.defineMethod (c$, "getRoot", 
function (c) {
var applet = null;
for (var p = c; p != null; p = p.getParent ()) {
if (Clazz.instanceOf (p, java.awt.Window)) {
return p;
}if (Clazz.instanceOf (p, java.applet.Applet)) {
applet = p;
}}
return applet;
}, "java.awt.Component");
c$.processKeyBindings = Clazz.defineMethod (c$, "processKeyBindings", 
function (event) {
if (event != null) {
if (event.isConsumed ()) {
return false;
}var component = event.getComponent ();
var pressed = (event.getID () == 401);
if (!javax.swing.SwingUtilities.isValidKeyEventForKeyBindings (event)) {
return false;
}while (component != null) {
if (Clazz.instanceOf (component, javax.swing.JComponent)) {
return (component).processKeyBindings (event, pressed);
}if ((Clazz.instanceOf (component, java.applet.Applet)) || (Clazz.instanceOf (component, java.awt.Window))) {
return javax.swing.JComponent.processKeyBindingsForAllComponents (event, component, pressed);
}component = component.getParent ();
}
}return false;
}, "java.awt.event.KeyEvent");
c$.isValidKeyEventForKeyBindings = Clazz.defineMethod (c$, "isValidKeyEventForKeyBindings", 
function (e) {
if (e.getID () == 400) {
var mod = e.getModifiers ();
if (((mod & 8) != 0) && ((mod & 2) == 0)) {
return false;
}}return true;
}, "java.awt.event.KeyEvent");
c$.notifyAction = Clazz.defineMethod (c$, "notifyAction", 
function (action, ks, event, sender, modifiers) {
if (action == null) {
return false;
}if (Clazz.instanceOf (action, jssun.swing.UIAction)) {
if (!(action).isEnabled (sender)) {
return false;
}} else if (!action.isEnabled ()) {
return false;
}var commandO;
var stayNull;
commandO = action.getValue ("ActionCommandKey");
if (commandO == null && javax.swing.JComponent.isActionStandin (action)) {
stayNull = true;
} else {
stayNull = false;
}var command;
if (commandO != null) {
command = commandO.toString ();
} else if (!stayNull && event.getKeyChar () != '\uffff') {
command = String.valueOf (event.getKeyChar ());
} else {
command = null;
}action.actionPerformed ( new java.awt.event.ActionEvent (sender, 1001, command, event.getWhen (), modifiers));
return true;
}, "javax.swing.Action,javax.swing.KeyStroke,java.awt.event.KeyEvent,~O,~N");
c$.replaceUIInputMap = Clazz.defineMethod (c$, "replaceUIInputMap", 
function (component, type, uiInputMap) {
var map = component.getInputMap (type, (uiInputMap != null));
while (map != null) {
var parent = map.getParent ();
if (parent == null || (Clazz.instanceOf (parent, javax.swing.plaf.UIResource))) {
map.setParent (uiInputMap);
return;
}map = parent;
}
}, "javax.swing.JComponent,~N,javax.swing.InputMap");
c$.replaceUIActionMap = Clazz.defineMethod (c$, "replaceUIActionMap", 
function (component, uiActionMap) {
var map = component.getActionMap ((uiActionMap != null));
;while (map != null) {
var parent = map.getParent ();
if (parent == null || (Clazz.instanceOf (parent, javax.swing.plaf.UIResource))) {
map.setParent (uiActionMap);
return;
}map = parent;
}
}, "javax.swing.JComponent,javax.swing.ActionMap");
c$.getUIInputMap = Clazz.defineMethod (c$, "getUIInputMap", 
function (component, condition) {
var map = component.getInputMap (condition, false);
while (map != null) {
var parent = map.getParent ();
if (Clazz.instanceOf (parent, javax.swing.plaf.UIResource)) {
return parent;
}map = parent;
}
return null;
}, "javax.swing.JComponent,~N");
c$.getUIActionMap = Clazz.defineMethod (c$, "getUIActionMap", 
function (component) {
var map = component.getActionMap (false);
while (map != null) {
var parent = map.getParent ();
if (Clazz.instanceOf (parent, javax.swing.plaf.UIResource)) {
return parent;
}map = parent;
}
return null;
}, "javax.swing.JComponent");
c$.getSharedOwnerFrame = Clazz.defineMethod (c$, "getSharedOwnerFrame", 
function () {
var sharedOwnerFrame = javax.swing.SwingUtilities.appContextGet (javax.swing.SwingUtilities.sharedOwnerFrameKey);
if (sharedOwnerFrame == null) {
sharedOwnerFrame =  new javax.swing.SwingUtilities.SharedOwnerFrame ();
javax.swing.SwingUtilities.appContextPut (javax.swing.SwingUtilities.sharedOwnerFrameKey, sharedOwnerFrame);
}return sharedOwnerFrame;
});
c$.getSharedOwnerFrameShutdownListener = Clazz.defineMethod (c$, "getSharedOwnerFrameShutdownListener", 
function () {
var sharedOwnerFrame = javax.swing.SwingUtilities.getSharedOwnerFrame ();
return sharedOwnerFrame;
});
c$.appContextGet = Clazz.defineMethod (c$, "appContextGet", 
function (key) {
return jssun.awt.AppContext.getAppContext ().get (key);
}, "~O");
c$.appContextPut = Clazz.defineMethod (c$, "appContextPut", 
function (key, value) {
jssun.awt.AppContext.getAppContext ().put (key, value);
}, "~O,~O");
c$.appContextRemove = Clazz.defineMethod (c$, "appContextRemove", 
function (key) {
jssun.awt.AppContext.getAppContext ().remove (key);
}, "~O");
c$.loadSystemClass = Clazz.defineMethod (c$, "loadSystemClass", 
function (className) {
return Clazz._4Name (className, true, Thread.currentThread ().getContextClassLoader ());
}, "~S");
c$.isLeftToRight = Clazz.defineMethod (c$, "isLeftToRight", 
function (c) {
return c.getComponentOrientation ().isLeftToRight ();
}, "java.awt.Component");
c$.doesIconReferenceImage = Clazz.defineMethod (c$, "doesIconReferenceImage", 
function (icon, image) {
var iconImage = (icon != null && (Clazz.instanceOf (icon, javax.swing.ImageIcon))) ? (icon).getImage () : null;
return (iconImage === image);
}, "javax.swing.Icon,java.awt.Image");
c$.findDisplayedMnemonicIndex = Clazz.defineMethod (c$, "findDisplayedMnemonicIndex", 
function (text, mnemonic) {
if (text == null || mnemonic == 0) {
return -1;
}var uc = Character.toUpperCase (String.fromCharCode (mnemonic));
var lc = Character.toLowerCase (String.fromCharCode (mnemonic));
var uci = text.indexOf (uc);
var lci = text.indexOf (lc);
if (uci == -1) {
return lci;
} else if (lci == -1) {
return uci;
} else {
return (lci < uci) ? lci : uci;
}}, "~S,~N");
c$.calculateInnerArea = Clazz.defineMethod (c$, "calculateInnerArea", 
function (c, r) {
if (c == null) {
return null;
}var rect = r;
var insets = c.getInsets ();
if (rect == null) {
rect =  new java.awt.Rectangle ();
}rect.x = insets.left;
rect.y = insets.top;
rect.width = c.getWidth () - insets.left - insets.right;
rect.height = c.getHeight () - insets.top - insets.bottom;
return rect;
}, "javax.swing.JComponent,java.awt.Rectangle");
c$.updateRendererOrEditorUI = Clazz.defineMethod (c$, "updateRendererOrEditorUI", 
function (rendererOrEditor) {
if (rendererOrEditor == null) {
return;
}var component = null;
if (Clazz.instanceOf (rendererOrEditor, java.awt.Component)) {
component = rendererOrEditor;
}if (Clazz.instanceOf (rendererOrEditor, javax.swing.DefaultCellEditor)) {
component = (rendererOrEditor).getComponent ();
}if (component != null) {
javax.swing.SwingUtilities.updateComponentTreeUI (component);
}}, "~O");
Clazz.pu$h(self.c$);
c$ = Clazz.declareType (javax.swing.SwingUtilities, "SharedOwnerFrame", java.awt.Frame, java.awt.event.WindowListener);
Clazz.defineMethod (c$, "addNotify", 
function () {
Clazz.superCall (this, javax.swing.SwingUtilities.SharedOwnerFrame, "addNotify", []);
this.installListeners ();
});
Clazz.defineMethod (c$, "installListeners", 
function () {
var a = this.getOwnedWindows ();
for (var b = 0; b < a.length; b++) {
var c = a[b];
if (c != null) {
c.removeWindowListener (this);
c.addWindowListener (this);
}}
});
Clazz.overrideMethod (c$, "windowClosed", 
function (a) {
var b = this.getOwnedWindows ();
for (var c = 0; c < b.length; c++) {
var d = b[c];
if (d != null) {
if (d.isDisplayable ()) {
return;
}d.removeWindowListener (this);
}this.dispose ();
}
}, "java.awt.event.WindowEvent");
Clazz.overrideMethod (c$, "windowOpened", 
function (a) {
}, "java.awt.event.WindowEvent");
Clazz.overrideMethod (c$, "windowClosing", 
function (a) {
}, "java.awt.event.WindowEvent");
Clazz.overrideMethod (c$, "windowIconified", 
function (a) {
}, "java.awt.event.WindowEvent");
Clazz.overrideMethod (c$, "windowDeiconified", 
function (a) {
}, "java.awt.event.WindowEvent");
Clazz.overrideMethod (c$, "windowActivated", 
function (a) {
}, "java.awt.event.WindowEvent");
Clazz.overrideMethod (c$, "windowDeactivated", 
function (a) {
}, "java.awt.event.WindowEvent");
Clazz.defineMethod (c$, "show", 
function () {
});
Clazz.overrideMethod (c$, "dispose", 
function () {
});
c$ = Clazz.p0p ();
c$.sharedOwnerFrameKey = c$.prototype.sharedOwnerFrameKey =  new Clazz._O ();
});

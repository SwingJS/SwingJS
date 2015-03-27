Clazz.declarePackage ("jsjava.awt");
Clazz.load (["jsjava.awt.event.ActionListener", "$.AdjustmentListener", "$.ComponentListener", "$.ContainerListener", "$.FocusListener", "$.HierarchyBoundsListener", "$.HierarchyListener", "$.InputMethodListener", "$.ItemListener", "$.KeyListener", "$.MouseListener", "$.MouseMotionListener", "$.MouseWheelListener", "$.TextListener", "$.WindowFocusListener", "$.WindowListener", "$.WindowStateListener"], "jsjava.awt.AWTEventMulticaster", ["java.lang.NullPointerException", "java.lang.reflect.Array"], function () {
c$ = Clazz.decorateAsClass (function () {
this.a = null;
this.b = null;
Clazz.instantialize (this, arguments);
}, jsjava.awt, "AWTEventMulticaster", null, [jsjava.awt.event.ComponentListener, jsjava.awt.event.ContainerListener, jsjava.awt.event.FocusListener, jsjava.awt.event.KeyListener, jsjava.awt.event.MouseListener, jsjava.awt.event.MouseMotionListener, jsjava.awt.event.WindowListener, jsjava.awt.event.WindowFocusListener, jsjava.awt.event.WindowStateListener, jsjava.awt.event.ActionListener, jsjava.awt.event.ItemListener, jsjava.awt.event.AdjustmentListener, jsjava.awt.event.TextListener, jsjava.awt.event.InputMethodListener, jsjava.awt.event.HierarchyListener, jsjava.awt.event.HierarchyBoundsListener, jsjava.awt.event.MouseWheelListener]);
Clazz.makeConstructor (c$, 
function (a, b) {
this.a = a;
this.b = b;
}, "java.util.EventListener,java.util.EventListener");
Clazz.defineMethod (c$, "remove", 
function (oldl) {
if (oldl === this.a) return this.b;
if (oldl === this.b) return this.a;
var a2 = jsjava.awt.AWTEventMulticaster.removeInternal (this.a, oldl);
var b2 = jsjava.awt.AWTEventMulticaster.removeInternal (this.b, oldl);
if (a2 === this.a && b2 === this.b) {
return this;
}return jsjava.awt.AWTEventMulticaster.addInternal (a2, b2);
}, "java.util.EventListener");
Clazz.defineMethod (c$, "componentResized", 
function (e) {
(this.a).componentResized (e);
(this.b).componentResized (e);
}, "jsjava.awt.event.ComponentEvent");
Clazz.defineMethod (c$, "componentMoved", 
function (e) {
(this.a).componentMoved (e);
(this.b).componentMoved (e);
}, "jsjava.awt.event.ComponentEvent");
Clazz.defineMethod (c$, "componentShown", 
function (e) {
(this.a).componentShown (e);
(this.b).componentShown (e);
}, "jsjava.awt.event.ComponentEvent");
Clazz.defineMethod (c$, "componentHidden", 
function (e) {
(this.a).componentHidden (e);
(this.b).componentHidden (e);
}, "jsjava.awt.event.ComponentEvent");
Clazz.defineMethod (c$, "componentAdded", 
function (e) {
(this.a).componentAdded (e);
(this.b).componentAdded (e);
}, "jsjava.awt.event.ContainerEvent");
Clazz.defineMethod (c$, "componentRemoved", 
function (e) {
(this.a).componentRemoved (e);
(this.b).componentRemoved (e);
}, "jsjava.awt.event.ContainerEvent");
Clazz.defineMethod (c$, "focusGained", 
function (e) {
(this.a).focusGained (e);
(this.b).focusGained (e);
}, "jsjava.awt.event.FocusEvent");
Clazz.defineMethod (c$, "focusLost", 
function (e) {
(this.a).focusLost (e);
(this.b).focusLost (e);
}, "jsjava.awt.event.FocusEvent");
Clazz.defineMethod (c$, "keyTyped", 
function (e) {
(this.a).keyTyped (e);
(this.b).keyTyped (e);
}, "jsjava.awt.event.KeyEvent");
Clazz.defineMethod (c$, "keyPressed", 
function (e) {
(this.a).keyPressed (e);
(this.b).keyPressed (e);
}, "jsjava.awt.event.KeyEvent");
Clazz.defineMethod (c$, "keyReleased", 
function (e) {
(this.a).keyReleased (e);
(this.b).keyReleased (e);
}, "jsjava.awt.event.KeyEvent");
Clazz.defineMethod (c$, "mouseClicked", 
function (e) {
(this.a).mouseClicked (e);
(this.b).mouseClicked (e);
}, "jsjava.awt.event.MouseEvent");
Clazz.defineMethod (c$, "mousePressed", 
function (e) {
(this.a).mousePressed (e);
(this.b).mousePressed (e);
}, "jsjava.awt.event.MouseEvent");
Clazz.defineMethod (c$, "mouseReleased", 
function (e) {
(this.a).mouseReleased (e);
(this.b).mouseReleased (e);
}, "jsjava.awt.event.MouseEvent");
Clazz.defineMethod (c$, "mouseEntered", 
function (e) {
(this.a).mouseEntered (e);
(this.b).mouseEntered (e);
}, "jsjava.awt.event.MouseEvent");
Clazz.defineMethod (c$, "mouseExited", 
function (e) {
(this.a).mouseExited (e);
(this.b).mouseExited (e);
}, "jsjava.awt.event.MouseEvent");
Clazz.defineMethod (c$, "mouseDragged", 
function (e) {
(this.a).mouseDragged (e);
(this.b).mouseDragged (e);
}, "jsjava.awt.event.MouseEvent");
Clazz.defineMethod (c$, "mouseMoved", 
function (e) {
(this.a).mouseMoved (e);
(this.b).mouseMoved (e);
}, "jsjava.awt.event.MouseEvent");
Clazz.defineMethod (c$, "windowOpened", 
function (e) {
(this.a).windowOpened (e);
(this.b).windowOpened (e);
}, "jsjava.awt.event.WindowEvent");
Clazz.defineMethod (c$, "windowClosing", 
function (e) {
(this.a).windowClosing (e);
(this.b).windowClosing (e);
}, "jsjava.awt.event.WindowEvent");
Clazz.defineMethod (c$, "windowClosed", 
function (e) {
(this.a).windowClosed (e);
(this.b).windowClosed (e);
}, "jsjava.awt.event.WindowEvent");
Clazz.defineMethod (c$, "windowIconified", 
function (e) {
(this.a).windowIconified (e);
(this.b).windowIconified (e);
}, "jsjava.awt.event.WindowEvent");
Clazz.defineMethod (c$, "windowDeiconified", 
function (e) {
(this.a).windowDeiconified (e);
(this.b).windowDeiconified (e);
}, "jsjava.awt.event.WindowEvent");
Clazz.defineMethod (c$, "windowActivated", 
function (e) {
(this.a).windowActivated (e);
(this.b).windowActivated (e);
}, "jsjava.awt.event.WindowEvent");
Clazz.defineMethod (c$, "windowDeactivated", 
function (e) {
(this.a).windowDeactivated (e);
(this.b).windowDeactivated (e);
}, "jsjava.awt.event.WindowEvent");
Clazz.defineMethod (c$, "windowStateChanged", 
function (e) {
(this.a).windowStateChanged (e);
(this.b).windowStateChanged (e);
}, "jsjava.awt.event.WindowEvent");
Clazz.defineMethod (c$, "windowGainedFocus", 
function (e) {
(this.a).windowGainedFocus (e);
(this.b).windowGainedFocus (e);
}, "jsjava.awt.event.WindowEvent");
Clazz.defineMethod (c$, "windowLostFocus", 
function (e) {
(this.a).windowLostFocus (e);
(this.b).windowLostFocus (e);
}, "jsjava.awt.event.WindowEvent");
Clazz.defineMethod (c$, "actionPerformed", 
function (e) {
(this.a).actionPerformed (e);
(this.b).actionPerformed (e);
}, "jsjava.awt.event.ActionEvent");
Clazz.defineMethod (c$, "itemStateChanged", 
function (e) {
(this.a).itemStateChanged (e);
(this.b).itemStateChanged (e);
}, "jsjava.awt.event.ItemEvent");
Clazz.defineMethod (c$, "adjustmentValueChanged", 
function (e) {
(this.a).adjustmentValueChanged (e);
(this.b).adjustmentValueChanged (e);
}, "jsjava.awt.event.AdjustmentEvent");
Clazz.defineMethod (c$, "textValueChanged", 
function (e) {
(this.a).textValueChanged (e);
(this.b).textValueChanged (e);
}, "jsjava.awt.event.TextEvent");
Clazz.defineMethod (c$, "inputMethodTextChanged", 
function (e) {
(this.a).inputMethodTextChanged (e);
(this.b).inputMethodTextChanged (e);
}, "jsjava.awt.event.InputMethodEvent");
Clazz.defineMethod (c$, "caretPositionChanged", 
function (e) {
(this.a).caretPositionChanged (e);
(this.b).caretPositionChanged (e);
}, "jsjava.awt.event.InputMethodEvent");
Clazz.defineMethod (c$, "hierarchyChanged", 
function (e) {
(this.a).hierarchyChanged (e);
(this.b).hierarchyChanged (e);
}, "jsjava.awt.event.HierarchyEvent");
Clazz.defineMethod (c$, "ancestorMoved", 
function (e) {
(this.a).ancestorMoved (e);
(this.b).ancestorMoved (e);
}, "jsjava.awt.event.HierarchyEvent");
Clazz.defineMethod (c$, "ancestorResized", 
function (e) {
(this.a).ancestorResized (e);
(this.b).ancestorResized (e);
}, "jsjava.awt.event.HierarchyEvent");
Clazz.defineMethod (c$, "mouseWheelMoved", 
function (e) {
(this.a).mouseWheelMoved (e);
(this.b).mouseWheelMoved (e);
}, "jsjava.awt.event.MouseWheelEvent");
c$.add = Clazz.defineMethod (c$, "add", 
function (a, b) {
return jsjava.awt.AWTEventMulticaster.addInternal (a, b);
}, "jsjava.awt.event.ComponentListener,jsjava.awt.event.ComponentListener");
c$.add = Clazz.defineMethod (c$, "add", 
function (a, b) {
return jsjava.awt.AWTEventMulticaster.addInternal (a, b);
}, "jsjava.awt.event.ContainerListener,jsjava.awt.event.ContainerListener");
c$.add = Clazz.defineMethod (c$, "add", 
function (a, b) {
return jsjava.awt.AWTEventMulticaster.addInternal (a, b);
}, "jsjava.awt.event.FocusListener,jsjava.awt.event.FocusListener");
c$.add = Clazz.defineMethod (c$, "add", 
function (a, b) {
return jsjava.awt.AWTEventMulticaster.addInternal (a, b);
}, "jsjava.awt.event.KeyListener,jsjava.awt.event.KeyListener");
c$.add = Clazz.defineMethod (c$, "add", 
function (a, b) {
return jsjava.awt.AWTEventMulticaster.addInternal (a, b);
}, "jsjava.awt.event.MouseListener,jsjava.awt.event.MouseListener");
c$.add = Clazz.defineMethod (c$, "add", 
function (a, b) {
return jsjava.awt.AWTEventMulticaster.addInternal (a, b);
}, "jsjava.awt.event.MouseMotionListener,jsjava.awt.event.MouseMotionListener");
c$.add = Clazz.defineMethod (c$, "add", 
function (a, b) {
return jsjava.awt.AWTEventMulticaster.addInternal (a, b);
}, "jsjava.awt.event.WindowListener,jsjava.awt.event.WindowListener");
c$.add = Clazz.defineMethod (c$, "add", 
function (a, b) {
return jsjava.awt.AWTEventMulticaster.addInternal (a, b);
}, "jsjava.awt.event.WindowStateListener,jsjava.awt.event.WindowStateListener");
c$.add = Clazz.defineMethod (c$, "add", 
function (a, b) {
return jsjava.awt.AWTEventMulticaster.addInternal (a, b);
}, "jsjava.awt.event.WindowFocusListener,jsjava.awt.event.WindowFocusListener");
c$.add = Clazz.defineMethod (c$, "add", 
function (a, b) {
return jsjava.awt.AWTEventMulticaster.addInternal (a, b);
}, "jsjava.awt.event.ActionListener,jsjava.awt.event.ActionListener");
c$.add = Clazz.defineMethod (c$, "add", 
function (a, b) {
return jsjava.awt.AWTEventMulticaster.addInternal (a, b);
}, "jsjava.awt.event.ItemListener,jsjava.awt.event.ItemListener");
c$.add = Clazz.defineMethod (c$, "add", 
function (a, b) {
return jsjava.awt.AWTEventMulticaster.addInternal (a, b);
}, "jsjava.awt.event.AdjustmentListener,jsjava.awt.event.AdjustmentListener");
c$.add = Clazz.defineMethod (c$, "add", 
function (a, b) {
return jsjava.awt.AWTEventMulticaster.addInternal (a, b);
}, "jsjava.awt.event.TextListener,jsjava.awt.event.TextListener");
c$.add = Clazz.defineMethod (c$, "add", 
function (a, b) {
return jsjava.awt.AWTEventMulticaster.addInternal (a, b);
}, "jsjava.awt.event.InputMethodListener,jsjava.awt.event.InputMethodListener");
c$.add = Clazz.defineMethod (c$, "add", 
function (a, b) {
return jsjava.awt.AWTEventMulticaster.addInternal (a, b);
}, "jsjava.awt.event.HierarchyListener,jsjava.awt.event.HierarchyListener");
c$.add = Clazz.defineMethod (c$, "add", 
function (a, b) {
return jsjava.awt.AWTEventMulticaster.addInternal (a, b);
}, "jsjava.awt.event.HierarchyBoundsListener,jsjava.awt.event.HierarchyBoundsListener");
c$.add = Clazz.defineMethod (c$, "add", 
function (a, b) {
return jsjava.awt.AWTEventMulticaster.addInternal (a, b);
}, "jsjava.awt.event.MouseWheelListener,jsjava.awt.event.MouseWheelListener");
c$.remove = Clazz.defineMethod (c$, "remove", 
function (l, oldl) {
return jsjava.awt.AWTEventMulticaster.removeInternal (l, oldl);
}, "jsjava.awt.event.ComponentListener,jsjava.awt.event.ComponentListener");
c$.remove = Clazz.defineMethod (c$, "remove", 
function (l, oldl) {
return jsjava.awt.AWTEventMulticaster.removeInternal (l, oldl);
}, "jsjava.awt.event.ContainerListener,jsjava.awt.event.ContainerListener");
c$.remove = Clazz.defineMethod (c$, "remove", 
function (l, oldl) {
return jsjava.awt.AWTEventMulticaster.removeInternal (l, oldl);
}, "jsjava.awt.event.FocusListener,jsjava.awt.event.FocusListener");
c$.remove = Clazz.defineMethod (c$, "remove", 
function (l, oldl) {
return jsjava.awt.AWTEventMulticaster.removeInternal (l, oldl);
}, "jsjava.awt.event.KeyListener,jsjava.awt.event.KeyListener");
c$.remove = Clazz.defineMethod (c$, "remove", 
function (l, oldl) {
return jsjava.awt.AWTEventMulticaster.removeInternal (l, oldl);
}, "jsjava.awt.event.MouseListener,jsjava.awt.event.MouseListener");
c$.remove = Clazz.defineMethod (c$, "remove", 
function (l, oldl) {
return jsjava.awt.AWTEventMulticaster.removeInternal (l, oldl);
}, "jsjava.awt.event.MouseMotionListener,jsjava.awt.event.MouseMotionListener");
c$.remove = Clazz.defineMethod (c$, "remove", 
function (l, oldl) {
return jsjava.awt.AWTEventMulticaster.removeInternal (l, oldl);
}, "jsjava.awt.event.WindowListener,jsjava.awt.event.WindowListener");
c$.remove = Clazz.defineMethod (c$, "remove", 
function (l, oldl) {
return jsjava.awt.AWTEventMulticaster.removeInternal (l, oldl);
}, "jsjava.awt.event.WindowStateListener,jsjava.awt.event.WindowStateListener");
c$.remove = Clazz.defineMethod (c$, "remove", 
function (l, oldl) {
return jsjava.awt.AWTEventMulticaster.removeInternal (l, oldl);
}, "jsjava.awt.event.WindowFocusListener,jsjava.awt.event.WindowFocusListener");
c$.remove = Clazz.defineMethod (c$, "remove", 
function (l, oldl) {
return jsjava.awt.AWTEventMulticaster.removeInternal (l, oldl);
}, "jsjava.awt.event.ActionListener,jsjava.awt.event.ActionListener");
c$.remove = Clazz.defineMethod (c$, "remove", 
function (l, oldl) {
return jsjava.awt.AWTEventMulticaster.removeInternal (l, oldl);
}, "jsjava.awt.event.ItemListener,jsjava.awt.event.ItemListener");
c$.remove = Clazz.defineMethod (c$, "remove", 
function (l, oldl) {
return jsjava.awt.AWTEventMulticaster.removeInternal (l, oldl);
}, "jsjava.awt.event.AdjustmentListener,jsjava.awt.event.AdjustmentListener");
c$.remove = Clazz.defineMethod (c$, "remove", 
function (l, oldl) {
return jsjava.awt.AWTEventMulticaster.removeInternal (l, oldl);
}, "jsjava.awt.event.TextListener,jsjava.awt.event.TextListener");
c$.remove = Clazz.defineMethod (c$, "remove", 
function (l, oldl) {
return jsjava.awt.AWTEventMulticaster.removeInternal (l, oldl);
}, "jsjava.awt.event.InputMethodListener,jsjava.awt.event.InputMethodListener");
c$.remove = Clazz.defineMethod (c$, "remove", 
function (l, oldl) {
return jsjava.awt.AWTEventMulticaster.removeInternal (l, oldl);
}, "jsjava.awt.event.HierarchyListener,jsjava.awt.event.HierarchyListener");
c$.remove = Clazz.defineMethod (c$, "remove", 
function (l, oldl) {
return jsjava.awt.AWTEventMulticaster.removeInternal (l, oldl);
}, "jsjava.awt.event.HierarchyBoundsListener,jsjava.awt.event.HierarchyBoundsListener");
c$.remove = Clazz.defineMethod (c$, "remove", 
function (l, oldl) {
return jsjava.awt.AWTEventMulticaster.removeInternal (l, oldl);
}, "jsjava.awt.event.MouseWheelListener,jsjava.awt.event.MouseWheelListener");
c$.addInternal = Clazz.defineMethod (c$, "addInternal", 
function (a, b) {
if (a == null) return b;
if (b == null) return a;
return  new jsjava.awt.AWTEventMulticaster (a, b);
}, "java.util.EventListener,java.util.EventListener");
c$.removeInternal = Clazz.defineMethod (c$, "removeInternal", 
function (l, oldl) {
if (l === oldl || l == null) {
return null;
} else if (Clazz.instanceOf (l, jsjava.awt.AWTEventMulticaster)) {
return (l).remove (oldl);
} else {
return l;
}}, "java.util.EventListener,java.util.EventListener");
c$.getListenerCount = Clazz.defineMethod (c$, "getListenerCount", 
($fz = function (l, listenerType) {
if (Clazz.instanceOf (l, jsjava.awt.AWTEventMulticaster)) {
var mc = l;
return jsjava.awt.AWTEventMulticaster.getListenerCount (mc.a, listenerType) + jsjava.awt.AWTEventMulticaster.getListenerCount (mc.b, listenerType);
} else {
return listenerType.isInstance (l) ? 1 : 0;
}}, $fz.isPrivate = true, $fz), "java.util.EventListener,Class");
c$.populateListenerArray = Clazz.defineMethod (c$, "populateListenerArray", 
($fz = function (a, l, index) {
if (Clazz.instanceOf (l, jsjava.awt.AWTEventMulticaster)) {
var mc = l;
var lhs = jsjava.awt.AWTEventMulticaster.populateListenerArray (a, mc.a, index);
return jsjava.awt.AWTEventMulticaster.populateListenerArray (a, mc.b, lhs);
} else if (a.getClass ().getComponentType ().isInstance (l)) {
a[index] = l;
return index + 1;
} else {
return index;
}}, $fz.isPrivate = true, $fz), "~A,java.util.EventListener,~N");
c$.getListeners = Clazz.defineMethod (c$, "getListeners", 
function (l, listenerType) {
if (listenerType == null) {
throw  new NullPointerException ("Listener type should not be null");
}var n = jsjava.awt.AWTEventMulticaster.getListenerCount (l, listenerType);
var result = java.lang.reflect.Array.newInstance (listenerType, n);
jsjava.awt.AWTEventMulticaster.populateListenerArray (result, l, 0);
return result;
}, "java.util.EventListener,Class");
});

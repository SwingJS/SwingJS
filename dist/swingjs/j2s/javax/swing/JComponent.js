Clazz.declarePackage ("javax.swing");
Clazz.load (["java.awt.Container", "javax.swing.Action", "JU.Lst", "javax.swing.SwingUtilities", "javax.swing.event.EventListenerList", "sun.awt.RequestFocusController"], "javax.swing.JComponent", ["java.lang.IllegalArgumentException", "java.util.ArrayList", "$.HashSet", "$.Hashtable", "java.applet.Applet", "java.awt.Component", "$.Insets", "$.Rectangle", "$.Window", "java.beans.PropertyChangeListener", "java.util.Locale", "javax.swing.ActionMap", "$.AncestorNotifier", "$.ArrayTable", "$.CellRendererPane", "$.ClientPropertyKey", "$.ComponentInputMap", "$.InputMap", "$.JApplet", "$.JDialog", "$.JFrame", "$.JWindow", "$.KeyStroke", "$.KeyboardManager", "$.Popup", "$.RepaintManager", "javax.swing.border.AbstractBorder", "javax.swing.event.AncestorListener", "sun.font.FontDesignMetrics", "swingjs.JSToolkit"], function () {
c$ = Clazz.decorateAsClass (function () {
this.isAlignmentXSet = false;
this.alignmentX = 0;
this.isAlignmentYSet = false;
this.alignmentY = 0;
this.listenerList = null;
this.clientProperties = null;
this.autoscrolls = false;
this.border = null;
this.flags = 0;
this.verifyInputWhenFocusTarget = true;
this.paintingChild = null;
this.popupMenu = null;
this.focusInputMap = null;
this.ancestorInputMap = null;
this.windowInputMap = null;
this.actionMap = null;
if (!Clazz.isClassDefined ("javax.swing.JComponent.ActionStandin")) {
javax.swing.JComponent.$JComponent$ActionStandin$ ();
}
Clazz.instantialize (this, arguments);
}, javax.swing, "JComponent", java.awt.Container);
Clazz.prepareFields (c$, function () {
this.listenerList =  new javax.swing.event.EventListenerList ();
});
c$.safelyGetGraphics = Clazz.defineMethod (c$, "safelyGetGraphics", 
function (c, root) {
{
javax.swing.JComponent.componentObtainingGraphicsFrom = root;
var g = c.getGraphics ();
javax.swing.JComponent.componentObtainingGraphicsFrom = null;
return g;
}}, "java.awt.Component,java.awt.Component");
c$.getGraphicsInvoked = Clazz.defineMethod (c$, "getGraphicsInvoked", 
function (root) {
if (!javax.swing.JComponent.isComponentObtainingGraphicsFrom (root)) {
var rootPane = (root).getRootPane ();
if (rootPane != null) {
rootPane.disableTrueDoubleBuffering ();
}}}, "java.awt.Component");
c$.isComponentObtainingGraphicsFrom = Clazz.defineMethod (c$, "isComponentObtainingGraphicsFrom", 
 function (c) {
{
return (javax.swing.JComponent.componentObtainingGraphicsFrom === c);
}}, "java.awt.Component");
c$.getManagingFocusForwardTraversalKeys = Clazz.defineMethod (c$, "getManagingFocusForwardTraversalKeys", 
function () {
{
if (javax.swing.JComponent.managingFocusForwardTraversalKeys == null) {
javax.swing.JComponent.managingFocusForwardTraversalKeys =  new java.util.HashSet (1);
javax.swing.JComponent.managingFocusForwardTraversalKeys.add (javax.swing.KeyStroke.getKeyStroke (9, 2));
}}return javax.swing.JComponent.managingFocusForwardTraversalKeys;
});
c$.getManagingFocusBackwardTraversalKeys = Clazz.defineMethod (c$, "getManagingFocusBackwardTraversalKeys", 
function () {
{
if (javax.swing.JComponent.managingFocusBackwardTraversalKeys == null) {
javax.swing.JComponent.managingFocusBackwardTraversalKeys =  new java.util.HashSet (1);
javax.swing.JComponent.managingFocusBackwardTraversalKeys.add (javax.swing.KeyStroke.getKeyStroke (9, 3));
}}return javax.swing.JComponent.managingFocusBackwardTraversalKeys;
});
c$.fetchRectangle = Clazz.defineMethod (c$, "fetchRectangle", 
 function () {
{
var rect;
var size = javax.swing.JComponent.tempRectangles.size ();
if (size > 0) {
rect = javax.swing.JComponent.tempRectangles.removeItemAt (size - 1);
} else {
rect =  new java.awt.Rectangle (0, 0, 0, 0);
}return rect;
}});
c$.recycleRectangle = Clazz.defineMethod (c$, "recycleRectangle", 
 function (rect) {
{
javax.swing.JComponent.tempRectangles.addLast (rect);
}}, "java.awt.Rectangle");
Clazz.defineMethod (c$, "setInheritsPopupMenu", 
function (value) {
var oldValue = this.getFlag (23);
this.setFlag (23, value);
this.firePropertyChangeBool ("inheritsPopupMenu", oldValue, value);
}, "~B");
Clazz.defineMethod (c$, "getInheritsPopupMenu", 
function () {
return this.getFlag (23);
});
Clazz.defineMethod (c$, "setComponentPopupMenu", 
function (popup) {
if (popup != null) {
this.enableEvents (16);
}var oldPopup = this.popupMenu;
this.popupMenu = popup;
this.firePropertyChangeObject ("componentPopupMenu", oldPopup, popup);
}, "javax.swing.JPopupMenu");
Clazz.defineMethod (c$, "getComponentPopupMenu", 
function () {
if (!this.getInheritsPopupMenu ()) {
return this.popupMenu;
}if (this.popupMenu == null) {
var parent = this.getParent ();
while (parent != null) {
if (Clazz.instanceOf (parent, javax.swing.JComponent)) {
return (parent).getComponentPopupMenu ();
}if (Clazz.instanceOf (parent, java.awt.Window) || Clazz.instanceOf (parent, java.applet.Applet)) {
break;
}parent = parent.getParent ();
}
return null;
}return this.popupMenu;
});
Clazz.makeConstructor (c$, 
function () {
Clazz.superConstructor (this, javax.swing.JComponent);
this.enableEvents (8);
Clazz.superCall (this, javax.swing.JComponent, "setLocale", [javax.swing.JComponent.getDefaultLocale ()]);
});
Clazz.defineMethod (c$, "getComponentGraphics", 
function (g) {
var componentGraphics = g;
componentGraphics.setColor (this.getForeground ());
componentGraphics.setFont (this.getFont ());
return componentGraphics;
}, "java.awt.Graphics");
Clazz.defineMethod (c$, "paintComponent", 
function (g) {
if (this.ui != null) {
this.isBackgroundPainted = false;
var scratchGraphics = (g == null) ? null : g.create ();
try {
this.ui.update (scratchGraphics, this);
this.isBackgroundPainted = ((scratchGraphics).getBackgroundCount () > 0);
} finally {
scratchGraphics.dispose ();
}
}}, "java.awt.Graphics");
Clazz.defineMethod (c$, "paintChildren", 
function (g) {
var isJComponent;
var sg = g;
{
var i = this.getComponentCount () - 1;
if (i < 0) {
return;
}if (this.paintingChild != null && (Clazz.instanceOf (this.paintingChild, javax.swing.JComponent))) {
for (; i >= 0; i--) {
if (this.getComponent (i) === this.paintingChild) {
break;
}}
}var tmpRect = javax.swing.JComponent.fetchRectangle ();
for (; i >= 0; i--) {
var comp = this.getComponent (i);
isJComponent = (Clazz.instanceOf (comp, javax.swing.JComponent));
if (comp != null && (isJComponent || javax.swing.JComponent.isLightweightComponent (comp)) && (comp.isVisible () == true)) {
var cr = comp.getBounds (tmpRect);
var cg = sg.create4 (cr.x, cr.y, cr.width, cr.height);
cg.setColor (comp.getForeground ());
cg.setFont (comp.getFont ());
var shouldSetFlagBack = false;
try {
if (isJComponent) {
(comp).paint (cg);
} else {
comp.paint (cg);
}} finally {
cg.dispose ();
if (shouldSetFlagBack) {
(comp).setFlag (1, false);
(comp).setFlag (2, false);
}}
}}
javax.swing.JComponent.recycleRectangle (tmpRect);
}}, "java.awt.Graphics");
Clazz.defineMethod (c$, "paintBorder", 
function (g) {
var border = this.getBorder ();
if (border != null) {
border.paintBorder (this, g, 0, 0, this.getWidth (), this.getHeight ());
}}, "java.awt.Graphics");
Clazz.overrideMethod (c$, "update", 
function (g) {
this.paint (g);
}, "java.awt.Graphics");
Clazz.overrideMethod (c$, "paint", 
function (g) {
var shouldClearPaintFlags = false;
if ((this.getWidth () <= 0) || (this.getHeight () <= 0)) {
return;
}var componentGraphics = this.getComponentGraphics (g);
var cg = componentGraphics.create ();
try {
if (this.getParent () != null && !(Clazz.instanceOf (this.getParent (), javax.swing.JComponent))) {
this.adjustPaintFlags ();
shouldClearPaintFlags = true;
}var printing = this.getFlag (11);
if (!printing) {
this.paintComponentSafely (cg);
this.paintBorderSafely (cg);
} else {
this.printComponentSafely (cg);
this.printBorderSafely (cg);
}if (!printing) {
this.paintChildren (cg);
} else {
this.printChildren (cg);
}} finally {
cg.dispose ();
if (shouldClearPaintFlags) {
this.setFlag (1, false);
this.setFlag (2, false);
this.setFlag (11, false);
this.setFlag (12, false);
}}
}, "java.awt.Graphics");
Clazz.defineMethod (c$, "paintForceDoubleBuffered", 
function (g) {
var rm = javax.swing.RepaintManager.currentManager (this);
var clip = g.getClipBounds ();
rm.beginPaint ();
this.setFlag (13, true);
try {
rm.paint (this, this, g, clip.x, clip.y, clip.width, clip.height);
} finally {
rm.endPaint ();
this.setFlag (13, false);
}
}, "java.awt.Graphics");
Clazz.defineMethod (c$, "isPainting", 
function () {
var component = this;
while (component != null) {
if (Clazz.instanceOf (component, javax.swing.JComponent) && (component).getFlag (1)) {
return true;
}component = component.getParent ();
}
return false;
});
Clazz.defineMethod (c$, "adjustPaintFlags", 
 function () {
var jparent = null;
var parent;
for (parent = this.getParent (); parent != null; parent = parent.getParent ()) {
if (Clazz.instanceOf (parent, javax.swing.JComponent)) {
jparent = parent;
if (jparent.getFlag (1)) this.setFlag (1, true);
if (jparent.getFlag (2)) this.setFlag (2, true);
if (jparent.getFlag (11)) this.setFlag (11, true);
if (jparent.getFlag (12)) this.setFlag (12, true);
break;
}}
});
Clazz.overrideMethod (c$, "printAll", 
function (g) {
this.setFlag (12, true);
try {
this.print (g);
} finally {
this.setFlag (12, false);
}
}, "java.awt.Graphics");
Clazz.overrideMethod (c$, "print", 
function (g) {
this.setFlag (11, true);
this.firePropertyChangeBool ("paintingForPrint", false, true);
try {
this.paint (g);
} finally {
this.setFlag (11, false);
this.firePropertyChangeBool ("paintingForPrint", true, false);
}
}, "java.awt.Graphics");
Clazz.defineMethod (c$, "paintComponentSafely", 
 function (g) {
var nSave = (g).mark ();
this.paintComponent (g);
(g).reset (nSave);
}, "java.awt.Graphics");
Clazz.defineMethod (c$, "printComponentSafely", 
 function (g) {
var nSave = (g).mark ();
this.printComponent (g);
(g).reset (nSave);
}, "java.awt.Graphics");
Clazz.defineMethod (c$, "paintBorderSafely", 
 function (g) {
var nSave = (g).mark ();
this.printBorder (g);
(g).reset (nSave);
}, "java.awt.Graphics");
Clazz.defineMethod (c$, "printBorderSafely", 
 function (g) {
var nSave = (g).mark ();
this.printBorder (g);
(g).reset (nSave);
}, "java.awt.Graphics");
Clazz.defineMethod (c$, "printComponent", 
function (g) {
this.paintComponent (g);
}, "java.awt.Graphics");
Clazz.defineMethod (c$, "printChildren", 
function (g) {
this.paintChildren (g);
}, "java.awt.Graphics");
Clazz.defineMethod (c$, "printBorder", 
function (g) {
this.paintBorder (g);
}, "java.awt.Graphics");
Clazz.defineMethod (c$, "isPaintingTile", 
function () {
return this.getFlag (2);
});
Clazz.defineMethod (c$, "isPaintingForPrint", 
function () {
return this.getFlag (11);
});
Clazz.defineMethod (c$, "isManagingFocus", 
function () {
return false;
});
Clazz.defineMethod (c$, "registerNextFocusableComponent", 
 function () {
this.registerNextFocusableComponent (this.getNextFocusableComponent ());
});
Clazz.defineMethod (c$, "registerNextFocusableComponent", 
 function (nextFocusableComponent) {
if (nextFocusableComponent == null) {
return;
}}, "java.awt.Component");
Clazz.defineMethod (c$, "deregisterNextFocusableComponent", 
 function () {
var nextFocusableComponent = this.getNextFocusableComponent ();
if (nextFocusableComponent == null) {
return;
}var nearestRoot = (this.isFocusCycleRoot ()) ? this : this.getFocusCycleRootAncestor ();
if (nearestRoot == null) {
return;
}});
Clazz.defineMethod (c$, "setNextFocusableComponent", 
function (aComponent) {
var displayable = this.isDisplayable ();
if (displayable) {
this.deregisterNextFocusableComponent ();
}this.putClientProperty ("nextFocus", aComponent);
if (displayable) {
this.registerNextFocusableComponent (aComponent);
}}, "java.awt.Component");
Clazz.defineMethod (c$, "getNextFocusableComponent", 
function () {
return this.getClientProperty ("nextFocus");
});
Clazz.defineMethod (c$, "setRequestFocusEnabled", 
function (requestFocusEnabled) {
this.setFlag (22, !requestFocusEnabled);
}, "~B");
Clazz.defineMethod (c$, "isRequestFocusEnabled", 
function () {
return !this.getFlag (22);
});
Clazz.defineMethod (c$, "requestFocus", 
function (temporary) {
Clazz.superCall (this, javax.swing.JComponent, "requestFocus", []);
return true;
}, "~B");
Clazz.defineMethod (c$, "requestFocusInWindow", 
function (temporary) {
return Clazz.superCall (this, javax.swing.JComponent, "requestFocusInWindow", []);
}, "~B");
Clazz.defineMethod (c$, "grabFocus", 
function () {
this.requestFocus ();
});
Clazz.defineMethod (c$, "setVerifyInputWhenFocusTarget", 
function (verifyInputWhenFocusTarget) {
var oldVerifyInputWhenFocusTarget = this.verifyInputWhenFocusTarget;
this.verifyInputWhenFocusTarget = verifyInputWhenFocusTarget;
this.firePropertyChangeBool ("verifyInputWhenFocusTarget", oldVerifyInputWhenFocusTarget, verifyInputWhenFocusTarget);
}, "~B");
Clazz.defineMethod (c$, "getVerifyInputWhenFocusTarget", 
function () {
return this.verifyInputWhenFocusTarget;
});
Clazz.overrideMethod (c$, "getFontMetrics", 
function (font) {
return sun.font.FontDesignMetrics.getMetrics (font);
}, "java.awt.Font");
Clazz.overrideMethod (c$, "getPreferredSize", 
function () {
return this.getPrefSizeJComp ();
});
Clazz.defineMethod (c$, "getPrefSizeJComp", 
function () {
var size = (this.isPreferredSizeSet () || this.ui == null ? null : this.ui.getPreferredSize ());
return (size == null ? this.preferredSize () : size);
});
Clazz.defineMethod (c$, "getMaximumSize", 
function () {
if (this.isMaximumSizeSet ()) {
return Clazz.superCall (this, javax.swing.JComponent, "getMaximumSize", []);
}var size = null;
if (this.ui != null) {
size = this.ui.getMaximumSize ();
}return (size != null) ? size : Clazz.superCall (this, javax.swing.JComponent, "getMaximumSize", []);
});
Clazz.defineMethod (c$, "getMinimumSize", 
function () {
if (this.isMinimumSizeSet ()) {
return Clazz.superCall (this, javax.swing.JComponent, "getMinimumSize", []);
}var size = null;
if (this.ui != null) {
size = this.ui.getMinimumSize ();
}return (size != null) ? size : Clazz.superCall (this, javax.swing.JComponent, "getMinimumSize", []);
});
Clazz.overrideMethod (c$, "contains", 
function (x, y) {
return (this.ui != null) ? this.ui.contains (this, x, y) : this.inside (x, y);
}, "~N,~N");
Clazz.defineMethod (c$, "setBorder", 
function (border) {
var oldBorder = this.border;
this.border = border;
this.firePropertyChangeObject ("border", oldBorder, border);
if (border !== oldBorder) {
if (border == null || oldBorder == null || !(border.getBorderInsets (this).equals (oldBorder.getBorderInsets (this)))) {
this.revalidate ();
}this.repaint ();
}}, "javax.swing.border.Border");
Clazz.defineMethod (c$, "getBorder", 
function () {
return this.border;
});
Clazz.defineMethod (c$, "getInsets", 
function () {
if (this.border != null) {
return this.border.getBorderInsets (this);
}return Clazz.superCall (this, javax.swing.JComponent, "getInsets", []);
});
Clazz.defineMethod (c$, "getInsets", 
function (insets) {
if (insets == null) {
insets =  new java.awt.Insets (0, 0, 0, 0);
}if (this.border != null) {
if (Clazz.instanceOf (this.border, javax.swing.border.AbstractBorder)) {
return (this.border).getBorderInsets (this, insets);
} else {
return this.border.getBorderInsets (this);
}} else {
insets.left = insets.top = insets.right = insets.bottom = 0;
return insets;
}}, "java.awt.Insets");
Clazz.defineMethod (c$, "getAlignmentY", 
function () {
if (this.isAlignmentYSet) {
return this.alignmentY;
}return Clazz.superCall (this, javax.swing.JComponent, "getAlignmentY", []);
});
Clazz.defineMethod (c$, "setAlignmentY", 
function (alignmentY) {
this.alignmentY = alignmentY > 1.0 ? 1.0 : alignmentY < 0.0 ? 0.0 : alignmentY;
this.isAlignmentYSet = true;
}, "~N");
Clazz.defineMethod (c$, "getAlignmentX", 
function () {
if (this.isAlignmentXSet) {
return this.alignmentX;
}return Clazz.superCall (this, javax.swing.JComponent, "getAlignmentX", []);
});
Clazz.defineMethod (c$, "setAlignmentX", 
function (alignmentX) {
this.alignmentX = alignmentX > 1.0 ? 1.0 : alignmentX < 0.0 ? 0.0 : alignmentX;
this.isAlignmentXSet = true;
}, "~N");
Clazz.defineMethod (c$, "setInputVerifier", 
function (inputVerifier) {
var oldInputVerifier = this.getClientProperty (javax.swing.ClientPropertyKey.JComponent_INPUT_VERIFIER);
this.putClientProperty (javax.swing.ClientPropertyKey.JComponent_INPUT_VERIFIER, inputVerifier);
this.firePropertyChangeObject ("inputVerifier", oldInputVerifier, inputVerifier);
}, "javax.swing.InputVerifier");
Clazz.defineMethod (c$, "getInputVerifier", 
function () {
return this.getClientProperty (javax.swing.ClientPropertyKey.JComponent_INPUT_VERIFIER);
});
Clazz.defineMethod (c$, "registerKeyboardAction", 
function (anAction, aCommand, aKeyStroke, aCondition) {
var inputMap = this.getInputMap (aCondition, true);
if (inputMap != null) {
var actionMap = this.getActionMap (true);
var action = Clazz.innerTypeInstance (javax.swing.JComponent.ActionStandin, this, null, anAction, aCommand);
inputMap.put (aKeyStroke, action);
if (actionMap != null) {
actionMap.put (action, action);
}}}, "java.awt.event.ActionListener,~S,javax.swing.KeyStroke,~N");
Clazz.defineMethod (c$, "registerWithKeyboardManager", 
 function (onlyIfNew) {
var inputMap = this.getInputMap (2, false);
var strokes;
var registered = this.getClientProperty ("_WhenInFocusedWindow");
if (inputMap != null) {
strokes = inputMap.allKeys ();
if (strokes != null) {
for (var counter = strokes.length - 1; counter >= 0; counter--) {
if (!onlyIfNew || registered == null || registered.get (strokes[counter]) == null) {
this.registerWithKeyboardManager (strokes[counter]);
}if (registered != null) {
registered.remove (strokes[counter]);
}}
}} else {
strokes = null;
}if (registered != null && registered.size () > 0) {
var keys = registered.keys ();
while (keys.hasMoreElements ()) {
var ks = keys.nextElement ();
this.unregisterWithKeyboardManager (ks);
}
registered.clear ();
}if (strokes != null && strokes.length > 0) {
if (registered == null) {
registered =  new java.util.Hashtable (strokes.length);
this.putClientProperty ("_WhenInFocusedWindow", registered);
}for (var counter = strokes.length - 1; counter >= 0; counter--) {
registered.put (strokes[counter], strokes[counter]);
}
} else {
this.putClientProperty ("_WhenInFocusedWindow", null);
}}, "~B");
Clazz.defineMethod (c$, "unregisterWithKeyboardManager", 
 function () {
var registered = this.getClientProperty ("_WhenInFocusedWindow");
if (registered != null && registered.size () > 0) {
var keys = registered.keys ();
while (keys.hasMoreElements ()) {
var ks = keys.nextElement ();
this.unregisterWithKeyboardManager (ks);
}
}this.putClientProperty ("_WhenInFocusedWindow", null);
});
Clazz.defineMethod (c$, "componentInputMapChanged", 
function (inputMap) {
var km = this.getInputMap (2, false);
while (km !== inputMap && km != null) {
km = km.getParent ();
}
if (km != null) {
this.registerWithKeyboardManager (false);
}}, "javax.swing.ComponentInputMap");
Clazz.defineMethod (c$, "registerWithKeyboardManager", 
 function (aKeyStroke) {
javax.swing.KeyboardManager.getCurrentManager ().registerKeyStroke (aKeyStroke, this);
}, "javax.swing.KeyStroke");
Clazz.defineMethod (c$, "unregisterWithKeyboardManager", 
 function (aKeyStroke) {
javax.swing.KeyboardManager.getCurrentManager ().unregisterKeyStroke (aKeyStroke, this);
}, "javax.swing.KeyStroke");
Clazz.defineMethod (c$, "registerKeyboardAction", 
function (anAction, aKeyStroke, aCondition) {
this.registerKeyboardAction (anAction, null, aKeyStroke, aCondition);
}, "java.awt.event.ActionListener,javax.swing.KeyStroke,~N");
Clazz.defineMethod (c$, "unregisterKeyboardAction", 
function (aKeyStroke) {
var am = this.getActionMap (false);
for (var counter = 0; counter < 3; counter++) {
var km = this.getInputMap (counter, false);
if (km != null) {
var actionID = km.get (aKeyStroke);
if (am != null && actionID != null) {
am.remove (actionID);
}km.remove (aKeyStroke);
}}
}, "javax.swing.KeyStroke");
Clazz.defineMethod (c$, "getRegisteredKeyStrokes", 
function () {
var counts =  Clazz.newIntArray (3, 0);
var strokes =  new Array (3);
for (var counter = 0; counter < 3; counter++) {
var km = this.getInputMap (counter, false);
strokes[counter] = (km != null) ? km.allKeys () : null;
counts[counter] = (strokes[counter] != null) ? strokes[counter].length : 0;
}
var retValue =  new Array (counts[0] + counts[1] + counts[2]);
for (var counter = 0, last = 0; counter < 3; counter++) {
if (counts[counter] > 0) {
System.arraycopy (strokes[counter], 0, retValue, last, counts[counter]);
last += counts[counter];
}}
return retValue;
});
Clazz.defineMethod (c$, "getConditionForKeyStroke", 
function (aKeyStroke) {
for (var counter = 0; counter < 3; counter++) {
var inputMap = this.getInputMap (counter, false);
if (inputMap != null && inputMap.get (aKeyStroke) != null) {
return counter;
}}
return -1;
}, "javax.swing.KeyStroke");
Clazz.defineMethod (c$, "getActionForKeyStroke", 
function (aKeyStroke) {
var am = this.getActionMap (false);
if (am == null) {
return null;
}for (var counter = 0; counter < 3; counter++) {
var inputMap = this.getInputMap (counter, false);
if (inputMap != null) {
var actionBinding = inputMap.get (aKeyStroke);
if (actionBinding != null) {
var action = am.get (actionBinding);
if (Clazz.instanceOf (action, javax.swing.JComponent.ActionStandin)) {
return (action).actionListener;
}return action;
}}}
return null;
}, "javax.swing.KeyStroke");
Clazz.defineMethod (c$, "resetKeyboardActions", 
function () {
for (var counter = 0; counter < 3; counter++) {
var inputMap = this.getInputMap (counter, false);
if (inputMap != null) {
inputMap.clear ();
}}
var am = this.getActionMap (false);
if (am != null) {
am.clear ();
}});
Clazz.defineMethod (c$, "setInputMap", 
function (condition, map) {
switch (condition) {
case 2:
if (map != null && !(Clazz.instanceOf (map, javax.swing.ComponentInputMap))) {
throw  new IllegalArgumentException ("WHEN_IN_FOCUSED_WINDOW InputMaps must be of type ComponentInputMap");
}this.windowInputMap = map;
this.setFlag (7, true);
this.registerWithKeyboardManager (false);
break;
case 1:
this.ancestorInputMap = map;
this.setFlag (6, true);
break;
case 0:
this.focusInputMap = map;
this.setFlag (5, true);
break;
default:
throw  new IllegalArgumentException ("condition must be one of JComponent.WHEN_IN_FOCUSED_WINDOW, JComponent.WHEN_FOCUSED or JComponent.WHEN_ANCESTOR_OF_FOCUSED_COMPONENT");
}
}, "~N,javax.swing.InputMap");
Clazz.defineMethod (c$, "getInputMap", 
function (condition) {
return this.getInputMap (condition, true);
}, "~N");
Clazz.defineMethod (c$, "getInputMap", 
function () {
return this.getInputMap (0, true);
});
Clazz.defineMethod (c$, "setActionMap", 
function (am) {
this.actionMap = am;
this.setFlag (8, true);
}, "javax.swing.ActionMap");
Clazz.defineMethod (c$, "getActionMap", 
function () {
return this.getActionMap (true);
});
Clazz.defineMethod (c$, "getInputMap", 
function (condition, create) {
switch (condition) {
case 0:
if (this.getFlag (5)) {
return this.focusInputMap;
}if (create) {
var km =  new javax.swing.InputMap ();
this.setInputMap (condition, km);
return km;
}break;
case 1:
if (this.getFlag (6)) {
return this.ancestorInputMap;
}if (create) {
var km =  new javax.swing.InputMap ();
this.setInputMap (condition, km);
return km;
}break;
case 2:
if (this.getFlag (7)) {
return this.windowInputMap;
}if (create) {
var km =  new javax.swing.ComponentInputMap (this);
this.setInputMap (condition, km);
return km;
}break;
default:
throw  new IllegalArgumentException ("condition must be one of JComponent.WHEN_IN_FOCUSED_WINDOW, JComponent.WHEN_FOCUSED or JComponent.WHEN_ANCESTOR_OF_FOCUSED_COMPONENT");
}
return null;
}, "~N,~B");
Clazz.defineMethod (c$, "getActionMap", 
function (create) {
{
(arguments.length == 0) && (create = true);
}if (this.getFlag (8)) {
return this.actionMap;
}if (create) {
var am =  new javax.swing.ActionMap ();
this.setActionMap (am);
return am;
}return null;
}, "~B");
Clazz.defineMethod (c$, "getBaseline", 
function (width, height) {
Clazz.superCall (this, javax.swing.JComponent, "getBaseline", [width, height]);
if (this.ui != null) {
return this.ui.getBaseline (this, width, height);
}return -1;
}, "~N,~N");
Clazz.overrideMethod (c$, "getBaselineResizeBehavior", 
function () {
if (this.ui != null) {
return this.ui.getBaselineResizeBehavior (this);
}return java.awt.Component.BaselineResizeBehavior.OTHER;
});
Clazz.defineMethod (c$, "requestDefaultFocus", 
function () {
var nearestRoot = (this.isFocusCycleRoot ()) ? this : this.getFocusCycleRootAncestor ();
if (nearestRoot == null) {
return false;
}return false;
});
Clazz.defineMethod (c$, "setVisible", 
function (aFlag) {
if (aFlag != this.isVisible ()) {
Clazz.superCall (this, javax.swing.JComponent, "setVisible", [aFlag]);
var parent = this.getParent ();
if (parent != null) {
var r = this.getBounds ();
parent.repaint (r.x, r.y, r.width, r.height);
}this.revalidate ();
}}, "~B");
Clazz.defineMethod (c$, "setEnabled", 
function (enabled) {
var oldEnabled = this.isEnabled ();
Clazz.superCall (this, javax.swing.JComponent, "setEnabled", [enabled]);
this.firePropertyChangeBool ("enabled", oldEnabled, enabled);
if (enabled != oldEnabled) {
this.repaint ();
}}, "~B");
Clazz.defineMethod (c$, "setForeground", 
function (fg) {
var oldFg = this.getForeground ();
Clazz.superCall (this, javax.swing.JComponent, "setForeground", [fg]);
if ((oldFg != null) ? !oldFg.equals (fg) : ((fg != null) && !fg.equals (oldFg))) {
this.repaint ();
}}, "java.awt.Color");
Clazz.defineMethod (c$, "setBackground", 
function (bg) {
var oldBg = this.getBackground ();
Clazz.superCall (this, javax.swing.JComponent, "setBackground", [bg]);
if ((oldBg != null) ? !oldBg.equals (bg) : ((bg != null) && !bg.equals (oldBg))) {
this.repaint ();
}}, "java.awt.Color");
Clazz.defineMethod (c$, "setFont", 
function (font) {
var oldFont = this.getFont ();
Clazz.superCall (this, javax.swing.JComponent, "setFont", [font]);
if (font !== oldFont) {
this.revalidate ();
this.repaint ();
}}, "java.awt.Font");
c$.getDefaultLocale = Clazz.defineMethod (c$, "getDefaultLocale", 
function () {
var l = javax.swing.SwingUtilities.appContextGet ("JComponent.defaultLocale");
if (l == null) {
l = java.util.Locale.getDefault ();
javax.swing.JComponent.setDefaultLocale (l);
}return l;
});
c$.setDefaultLocale = Clazz.defineMethod (c$, "setDefaultLocale", 
function (l) {
javax.swing.SwingUtilities.appContextPut ("JComponent.defaultLocale", l);
}, "java.util.Locale");
Clazz.defineMethod (c$, "processComponentKeyEvent", 
function (e) {
}, "java.awt.event.KeyEvent");
Clazz.defineMethod (c$, "processKeyEvent", 
function (e) {
var shouldProcessKey;
Clazz.superCall (this, javax.swing.JComponent, "processKeyEvent", [e]);
if (!e.isConsumed ()) {
this.processComponentKeyEvent (e);
}shouldProcessKey = javax.swing.JComponent.KeyboardState.shouldProcess (e);
if (e.isConsumed ()) {
return;
}if (shouldProcessKey && this.processKeyBindings (e, e.getID () == 401)) {
e.consume ();
}}, "java.awt.event.KeyEvent");
Clazz.defineMethod (c$, "processKeyBinding", 
function (ks, e, condition, pressed) {
var map = this.getInputMap (condition, false);
var am = this.getActionMap (false);
if (map != null && am != null && this.isEnabled ()) {
var binding = map.get (ks);
var action = (binding == null) ? null : am.get (binding);
if (action != null) {
return javax.swing.SwingUtilities.notifyAction (action, ks, e, this, e.getModifiers ());
}}return false;
}, "javax.swing.KeyStroke,java.awt.event.KeyEvent,~N,~B");
Clazz.defineMethod (c$, "processKeyBindings", 
function (e, pressed) {
if (!javax.swing.SwingUtilities.isValidKeyEventForKeyBindings (e)) {
return false;
}var ks;
if (e.getID () == 400) {
ks = javax.swing.KeyStroke.getKeyStroke (e.getKeyChar ());
} else {
ks = javax.swing.KeyStroke.getKeyStroke (e.getKeyCode (), e.getModifiers (), (pressed ? false : true));
}if (this.processKeyBinding (ks, e, 0, pressed)) return true;
var parent = this;
while (parent != null && !(Clazz.instanceOf (parent, java.awt.Window)) && !(Clazz.instanceOf (parent, java.applet.Applet))) {
if (Clazz.instanceOf (parent, javax.swing.JComponent)) {
if ((parent).processKeyBinding (ks, e, 1, pressed)) return true;
}parent = parent.getParent ();
}
if (parent != null) {
return javax.swing.JComponent.processKeyBindingsForAllComponents (e, parent, pressed);
}return false;
}, "java.awt.event.KeyEvent,~B");
c$.processKeyBindingsForAllComponents = Clazz.defineMethod (c$, "processKeyBindingsForAllComponents", 
function (e, container, pressed) {
while (true) {
if (javax.swing.KeyboardManager.getCurrentManager ().fireKeyboardAction (e, pressed, container)) {
return true;
}if (javax.swing.Popup.isHeavyWeight (container)) {
container = (container).getOwner ();
} else {
return false;
}}
}, "java.awt.event.KeyEvent,java.awt.Container,~B");
Clazz.defineMethod (c$, "setToolTipText", 
function (text) {
this.putClientProperty ("ToolTipText", text);
}, "~S");
Clazz.defineMethod (c$, "getToolTipText", 
function () {
return this.getClientProperty ("ToolTipText");
});
Clazz.defineMethod (c$, "getToolTipText", 
function (event) {
return this.getToolTipText ();
}, "java.awt.event.MouseEvent");
Clazz.defineMethod (c$, "getToolTipLocation", 
function (event) {
return null;
}, "java.awt.event.MouseEvent");
Clazz.defineMethod (c$, "getPopupLocation", 
function (event) {
return null;
}, "java.awt.event.MouseEvent");
Clazz.defineMethod (c$, "createToolTip", 
function () {
var tip =  new javax.swing.JToolTip ();
tip.setComponent (this);
return tip;
});
Clazz.defineMethod (c$, "scrollRectToVisible", 
function (aRect) {
var parent;
var dx = this.getX ();
var dy = this.getY ();
for (parent = this.getParent (); !(parent == null) && !(Clazz.instanceOf (parent, javax.swing.JComponent)) && !(Clazz.instanceOf (parent, javax.swing.CellRendererPane)); parent = parent.getParent ()) {
var bounds = parent.getBounds ();
dx += bounds.x;
dy += bounds.y;
}
if (!(parent == null) && !(Clazz.instanceOf (parent, javax.swing.CellRendererPane))) {
aRect.x += dx;
aRect.y += dy;
(parent).scrollRectToVisible (aRect);
aRect.x -= dx;
aRect.y -= dy;
}}, "java.awt.Rectangle");
Clazz.defineMethod (c$, "setAutoscrolls", 
function (autoscrolls) {
}, "~B");
Clazz.defineMethod (c$, "getAutoscrolls", 
function () {
return this.autoscrolls;
});
Clazz.defineMethod (c$, "superProcessMouseMotionEvent", 
function (e) {
Clazz.superCall (this, javax.swing.JComponent, "processMouseMotionEvent", [e]);
}, "java.awt.event.MouseEvent");
Clazz.defineMethod (c$, "setCreatedDoubleBuffer", 
function (newValue) {
this.setFlag (9, newValue);
}, "~B");
Clazz.defineMethod (c$, "getCreatedDoubleBuffer", 
function () {
return this.getFlag (9);
});
Clazz.defineMethod (c$, "getClientProperties", 
 function () {
if (this.clientProperties == null) {
this.clientProperties =  new javax.swing.ArrayTable ();
}return this.clientProperties;
});
Clazz.defineMethod (c$, "getClientProperty", 
function (key) {
if (this.clientProperties == null) {
return null;
} else {
{
return this.clientProperties.get (key);
}}}, "~O");
Clazz.defineMethod (c$, "putClientProperty", 
function (key, value) {
if (value == null && this.clientProperties == null) {
return;
}var clientProperties = this.getClientProperties ();
var oldValue;
{
oldValue = clientProperties.get (key);
if (value != null) {
clientProperties.put (key, value);
} else if (oldValue != null) {
clientProperties.remove (key);
} else {
return;
}}this.clientPropertyChanged (key, oldValue, value);
this.firePropertyChangeObject (key.toString (), oldValue, value);
}, "~O,~O");
Clazz.defineMethod (c$, "clientPropertyChanged", 
function (key, oldValue, newValue) {
}, "~O,~O,~O");
Clazz.overrideMethod (c$, "setUI", 
function (newUI) {
this.uninstallUIAndProperties ();
this.ui = newUI;
if (this.ui != null) {
this.ui.installUI (this);
}this.revalidate ();
this.repaint ();
}, "javax.swing.plaf.ComponentUI");
Clazz.defineMethod (c$, "uninstallUIAndProperties", 
 function () {
if (this.ui != null) {
this.ui.uninstallUI (this);
}});
Clazz.defineMethod (c$, "setUIProperty", 
function (propertyName, value) {
if (propertyName === "opaque") {
if (!this.getFlag (24)) {
this.setOpaque ((value).booleanValue ());
this.setFlag (24, false);
}} else if (propertyName === "autoscrolls") {
if (!this.getFlag (25)) {
this.setAutoscrolls ((value).booleanValue ());
this.setFlag (25, false);
}} else if (propertyName === "focusTraversalKeysForward") {
} else if (propertyName === "focusTraversalKeysBackward") {
} else {
System.out.println (swingjs.JSToolkit.getClassName (this) + " property \"" + propertyName + "\" cannot be set using this method" + swingjs.JSToolkit.getStackTrace (5));
}}, "~S,~O");
c$.isLightweightComponent = Clazz.defineMethod (c$, "isLightweightComponent", 
function (c) {
return !(Clazz.instanceOf (c, javax.swing.JApplet) || Clazz.instanceOf (c, javax.swing.JFrame) || Clazz.instanceOf (c, javax.swing.JWindow) || Clazz.instanceOf (c, javax.swing.JDialog));
}, "java.awt.Component");
Clazz.overrideMethod (c$, "isOpaque", 
function () {
return this.getFlag (3);
});
Clazz.defineMethod (c$, "setOpaque", 
function (isOpaque) {
var oldValue = this.getFlag (3);
this.setFlag (3, isOpaque);
this.setFlag (24, true);
this.firePropertyChangeBool ("opaque", oldValue, isOpaque);
}, "~B");
Clazz.defineMethod (c$, "rectangleIsObscured", 
function (x, y, width, height) {
var numChildren = this.getComponentCount ();
for (var i = 0; i < numChildren; i++) {
var child = this.getComponent (i);
var cx;
var cy;
var cw;
var ch;
cx = child.getX ();
cy = child.getY ();
cw = child.getWidth ();
ch = child.getHeight ();
if (x >= cx && (x + width) <= (cx + cw) && y >= cy && (y + height) <= (cy + ch) && child.isVisible ()) {
if (Clazz.instanceOf (child, javax.swing.JComponent)) {
return (child).isOpaque ();
} else {
return false;
}}}
return false;
}, "~N,~N,~N,~N");
c$.computeVisibleRect = Clazz.defineMethod (c$, "computeVisibleRect", 
function (c, visibleRect) {
var p = c.getParent ();
var bounds = c.getBounds ();
if (p == null || Clazz.instanceOf (p, java.awt.Window) || Clazz.instanceOf (p, java.applet.Applet)) {
visibleRect.reshape (0, 0, bounds.width, bounds.height);
} else {
javax.swing.JComponent.computeVisibleRect (p, visibleRect);
visibleRect.x -= bounds.x;
visibleRect.y -= bounds.y;
javax.swing.SwingUtilities.computeIntersection (0, 0, bounds.width, bounds.height, visibleRect);
}}, "java.awt.Component,java.awt.Rectangle");
Clazz.defineMethod (c$, "computeVisibleRect", 
function (visibleRect) {
javax.swing.JComponent.computeVisibleRect (this, visibleRect);
}, "java.awt.Rectangle");
Clazz.defineMethod (c$, "getVisibleRect", 
function () {
var visibleRect =  new java.awt.Rectangle ();
this.computeVisibleRect (visibleRect);
return visibleRect;
});
Clazz.defineMethod (c$, "getTopLevelAncestor", 
function () {
for (var p = this; p != null; p = p.getParent ()) {
if (Clazz.instanceOf (p, java.awt.Window) || Clazz.instanceOf (p, java.applet.Applet)) {
return p;
}}
return null;
});
Clazz.defineMethod (c$, "getAncestorNotifier", 
 function () {
return this.getClientProperty (javax.swing.ClientPropertyKey.JComponent_ANCESTOR_NOTIFIER);
});
Clazz.defineMethod (c$, "addAncestorListener", 
function (listener) {
var ancestorNotifier = this.getAncestorNotifier ();
if (ancestorNotifier == null) {
ancestorNotifier =  new javax.swing.AncestorNotifier (this);
this.putClientProperty (javax.swing.ClientPropertyKey.JComponent_ANCESTOR_NOTIFIER, ancestorNotifier);
}ancestorNotifier.addAncestorListener (listener);
}, "javax.swing.event.AncestorListener");
Clazz.defineMethod (c$, "removeAncestorListener", 
function (listener) {
var ancestorNotifier = this.getAncestorNotifier ();
if (ancestorNotifier == null) {
return;
}ancestorNotifier.removeAncestorListener (listener);
if (ancestorNotifier.listenerList.getListenerList ().length == 0) {
ancestorNotifier.removeAllListeners ();
this.putClientProperty (javax.swing.ClientPropertyKey.JComponent_ANCESTOR_NOTIFIER, null);
}}, "javax.swing.event.AncestorListener");
Clazz.defineMethod (c$, "getAncestorListeners", 
function () {
var ancestorNotifier = this.getAncestorNotifier ();
if (ancestorNotifier == null) {
return  new Array (0);
}return ancestorNotifier.getAncestorListeners ();
});
Clazz.defineMethod (c$, "getListeners", 
function (listenerType) {
var result;
if (listenerType === javax.swing.event.AncestorListener) {
result = this.getAncestorListeners ();
} else if (listenerType === java.beans.PropertyChangeListener) {
result = this.getPropertyChangeListeners ();
} else {
result = this.listenerList.getListeners (listenerType);
}if (result.length == 0) {
return Clazz.superCall (this, javax.swing.JComponent, "getListeners", [listenerType]);
}return result;
}, "Class");
Clazz.defineMethod (c$, "addNotify", 
function () {
Clazz.superCall (this, javax.swing.JComponent, "addNotify", []);
this.firePropertyChangeObject ("ancestor", null, this.getParent ());
this.registerWithKeyboardManager (false);
this.registerNextFocusableComponent ();
});
Clazz.defineMethod (c$, "removeNotify", 
function () {
Clazz.superCall (this, javax.swing.JComponent, "removeNotify", []);
this.firePropertyChangeObject ("ancestor", this.getParent (), null);
this.unregisterWithKeyboardManager ();
this.deregisterNextFocusableComponent ();
if (this.getCreatedDoubleBuffer ()) {
javax.swing.RepaintManager.currentManager (this).resetDoubleBuffer ();
this.setCreatedDoubleBuffer (false);
}});
Clazz.defineMethod (c$, "repaint", 
function (tm, x, y, width, height) {
javax.swing.RepaintManager.currentManager (this).addDirtyRegion (this, x, y, width, height);
}, "~N,~N,~N,~N,~N");
Clazz.defineMethod (c$, "repaint", 
function (r) {
this.repaint (0, r.x, r.y, r.width, r.height);
}, "java.awt.Rectangle");
Clazz.defineMethod (c$, "revalidate", 
function () {
if (this.getParent () == null) {
return;
}if (javax.swing.SwingUtilities.isEventDispatchThread ()) {
this.invalidate ();
javax.swing.RepaintManager.currentManager (this).addInvalidComponent (this);
} else {
{
if (this.getFlag (28)) {
return;
}this.setFlag (28, true);
}var callRevalidate = ((Clazz.isClassDefined ("javax.swing.JComponent$2") ? 0 : javax.swing.JComponent.$JComponent$2$ ()), Clazz.innerTypeInstance (javax.swing.JComponent$2, this, null));
javax.swing.SwingUtilities.invokeLater (callRevalidate);
}});
Clazz.defineMethod (c$, "isValidateRoot", 
function () {
return false;
});
Clazz.defineMethod (c$, "isOptimizedDrawingEnabled", 
function () {
return true;
});
Clazz.defineMethod (c$, "isPaintingOrigin", 
function () {
return false;
});
Clazz.defineMethod (c$, "paintImmediately", 
function (x, y, w, h) {
var c = this;
var parent;
if (!this.isShowing ()) {
return;
}while (!(c).isOpaque ()) {
parent = c.getParent ();
if (parent != null) {
x += c.getX ();
y += c.getY ();
c = parent;
} else {
break;
}if (!(Clazz.instanceOf (c, javax.swing.JComponent))) {
break;
}}
if (Clazz.instanceOf (c, javax.swing.JComponent)) {
(c)._paintImmediately (x, y, w, h);
} else {
c.repaint (x, y, w, h);
}}, "~N,~N,~N,~N");
Clazz.defineMethod (c$, "paintImmediately", 
function (r) {
this.paintImmediately (r.x, r.y, r.width, r.height);
}, "java.awt.Rectangle");
Clazz.defineMethod (c$, "alwaysOnTop", 
function () {
return false;
});
Clazz.defineMethod (c$, "setPaintingChild", 
function (paintingChild) {
this.paintingChild = paintingChild;
}, "java.awt.Component");
Clazz.defineMethod (c$, "_paintImmediately", 
function (x, y, w, h) {
var g;
var c;
var tmpX;
var tmpY;
var tmpWidth;
var tmpHeight;
var offsetX = 0;
var offsetY = 0;
var hasBuffer = false;
var bufferedComponent = null;
var paintingComponent = this;
var path =  new java.util.ArrayList (7);
var pIndex = -1;
var pCount = 0;
tmpX = tmpY = tmpWidth = tmpHeight = 0;
var paintImmediatelyClip = javax.swing.JComponent.fetchRectangle ();
paintImmediatelyClip.x = x;
paintImmediatelyClip.y = y;
paintImmediatelyClip.width = w;
paintImmediatelyClip.height = h;
var ontop = this.alwaysOnTop () && this.isOpaque ();
if (ontop) {
javax.swing.SwingUtilities.computeIntersection (0, 0, this.getWidth (), this.getHeight (), paintImmediatelyClip);
if (paintImmediatelyClip.width == 0) {
javax.swing.JComponent.recycleRectangle (paintImmediatelyClip);
return;
}}var child;
for (c = this, child = null; c != null && !(Clazz.instanceOf (c, java.awt.Window)) && !(Clazz.instanceOf (c, java.applet.Applet)); child = c, c = c.getParent ()) {
var jc = (Clazz.instanceOf (c, javax.swing.JComponent)) ? c : null;
path.add (c);
if (!ontop && jc != null && !jc.isOptimizedDrawingEnabled ()) {
var resetPC;
if (c !== this) {
if (jc.isPaintingOrigin ()) {
resetPC = true;
} else {
var children = c.getComponents ();
var i = 0;
for (; i < children.length; i++) {
if (children[i] === child) break;
}
switch (jc.getObscuredState (i, paintImmediatelyClip.x, paintImmediatelyClip.y, paintImmediatelyClip.width, paintImmediatelyClip.height)) {
case 0:
resetPC = false;
break;
case 2:
javax.swing.JComponent.recycleRectangle (paintImmediatelyClip);
return;
default:
resetPC = true;
break;
}
}} else {
resetPC = false;
}if (resetPC) {
paintingComponent = jc;
pIndex = pCount;
offsetX = offsetY = 0;
hasBuffer = false;
}}pCount++;
if (!ontop) {
var bx = c.getX ();
var by = c.getY ();
tmpWidth = c.getWidth ();
tmpHeight = c.getHeight ();
javax.swing.SwingUtilities.computeIntersection (tmpX, tmpY, tmpWidth, tmpHeight, paintImmediatelyClip);
paintImmediatelyClip.x += bx;
paintImmediatelyClip.y += by;
offsetX += bx;
offsetY += by;
}}
if (c == null || paintImmediatelyClip.width <= 0 || paintImmediatelyClip.height <= 0) {
javax.swing.JComponent.recycleRectangle (paintImmediatelyClip);
return;
}paintingComponent.setFlag (13, true);
paintImmediatelyClip.x -= offsetX;
paintImmediatelyClip.y -= offsetY;
if (paintingComponent !== this) {
var comp;
var i = pIndex;
for (; i > 0; i--) {
comp = path.get (i);
if (Clazz.instanceOf (comp, javax.swing.JComponent)) {
(comp).setPaintingChild (path.get (i - 1));
}}
}try {
g = javax.swing.JComponent.safelyGetGraphics (paintingComponent, c);
try {
if (hasBuffer) {
var rm = javax.swing.RepaintManager.currentManager (bufferedComponent);
rm.beginPaint ();
try {
rm.paint (paintingComponent, bufferedComponent, g, paintImmediatelyClip.x, paintImmediatelyClip.y, paintImmediatelyClip.width, paintImmediatelyClip.height);
} finally {
rm.endPaint ();
}
} else {
paintingComponent.paint (g);
}} finally {
g.dispose ();
}
} finally {
if (paintingComponent !== this) {
var comp;
var i = pIndex;
for (; i > 0; i--) {
comp = path.get (i);
if (Clazz.instanceOf (comp, javax.swing.JComponent)) {
(comp).setPaintingChild (null);
}}
}paintingComponent.setFlag (13, false);
}
javax.swing.JComponent.recycleRectangle (paintImmediatelyClip);
}, "~N,~N,~N,~N");
Clazz.defineMethod (c$, "paintToOffscreen", 
function (g, x, y, w, h, maxX, maxY) {
try {
this.setFlag (1, true);
if ((y + h) < maxY || (x + w) < maxX) {
this.setFlag (2, true);
}if (this.getFlag (13)) {
this.paint (g);
} else {
if (!this.rectangleIsObscured (x, y, w, h)) {
this.paintComponentSafely (g);
this.paintBorder (g);
}this.paintChildren (g);
}} finally {
this.setFlag (1, false);
this.setFlag (2, false);
}
}, "java.awt.Graphics,~N,~N,~N,~N,~N,~N");
Clazz.defineMethod (c$, "getObscuredState", 
 function (compIndex, x, y, width, height) {
var retValue = 0;
var tmpRect = javax.swing.JComponent.fetchRectangle ();
for (var i = compIndex - 1; i >= 0; i--) {
var sibling = this.getComponent (i);
if (!sibling.isVisible ()) {
continue;
}var siblingRect;
var opaque;
if (Clazz.instanceOf (sibling, javax.swing.JComponent)) {
opaque = (sibling).isOpaque ();
if (!opaque) {
if (retValue == 1) {
continue;
}}} else {
opaque = true;
}siblingRect = sibling.getBounds (tmpRect);
if (opaque && x >= siblingRect.x && (x + width) <= (siblingRect.x + siblingRect.width) && y >= siblingRect.y && (y + height) <= (siblingRect.y + siblingRect.height)) {
javax.swing.JComponent.recycleRectangle (tmpRect);
return 2;
} else if (retValue == 0 && !((x + width <= siblingRect.x) || (y + height <= siblingRect.y) || (x >= siblingRect.x + siblingRect.width) || (y >= siblingRect.y + siblingRect.height))) {
retValue = 1;
}}
javax.swing.JComponent.recycleRectangle (tmpRect);
return retValue;
}, "~N,~N,~N,~N,~N");
Clazz.defineMethod (c$, "checkIfChildObscuredBySibling", 
function () {
return true;
});
Clazz.defineMethod (c$, "setFlag", 
 function (aFlag, aValue) {
if (aValue) {
this.flags |= (1 << aFlag);
} else {
this.flags &= ~(1 << aFlag);
}}, "~N,~B");
Clazz.defineMethod (c$, "getFlag", 
 function (aFlag) {
var mask = (1 << aFlag);
return ((this.flags & mask) == mask);
}, "~N");
Clazz.defineMethod (c$, "setDoubleBuffered", 
function (aFlag) {
}, "~B");
Clazz.overrideMethod (c$, "isDoubleBuffered", 
function () {
return this.getFlag (0);
});
Clazz.defineMethod (c$, "getRootPane", 
function () {
return javax.swing.SwingUtilities.getRootPane (this);
});
Clazz.defineMethod (c$, "paramString", 
function () {
var preferredSizeString = (this.isPreferredSizeSet () ? this.getPreferredSize ().toString () : "");
var minimumSizeString = (this.isMinimumSizeSet () ? this.getMinimumSize ().toString () : "");
var maximumSizeString = (this.isMaximumSizeSet () ? this.getMaximumSize ().toString () : "");
var borderString = (this.border == null ? "" : (this.border === this ? "this" : this.border.toString ()));
return Clazz.superCall (this, javax.swing.JComponent, "paramString", []) + ",alignmentX=" + this.alignmentX + ",alignmentY=" + this.alignmentY + ",border=" + borderString + ",flags=" + this.flags + ",maximumSize=" + maximumSizeString + ",minimumSize=" + minimumSizeString + ",preferredSize=" + preferredSizeString;
});
c$.isActionStandin = Clazz.defineMethod (c$, "isActionStandin", 
function (action) {
return Clazz.instanceOf (action, javax.swing.JComponent.ActionStandin);
}, "javax.swing.Action");
c$.$JComponent$ActionStandin$ = function () {
Clazz.pu$h(self.c$);
c$ = Clazz.decorateAsClass (function () {
Clazz.prepareCallback (this, arguments);
this.actionListener = null;
this.command = null;
this.action = null;
Clazz.instantialize (this, arguments);
}, javax.swing.JComponent, "ActionStandin", null, javax.swing.Action);
Clazz.makeConstructor (c$, 
function (a, b) {
this.actionListener = a;
if (Clazz.instanceOf (a, javax.swing.Action)) {
this.action = a;
} else {
this.action = null;
}this.command = b;
}, "java.awt.event.ActionListener,~S");
Clazz.defineMethod (c$, "getValue", 
function (a) {
if (a != null) {
if (a.equals ("ActionCommandKey")) {
return this.command;
}if (this.action != null) {
return this.action.getValue (a);
}if (a.equals ("Name")) {
return "ActionStandin";
}}return null;
}, "~S");
Clazz.defineMethod (c$, "isEnabled", 
function () {
if (this.actionListener == null) {
return false;
}if (this.action == null) {
return true;
}return this.action.isEnabled ();
});
Clazz.defineMethod (c$, "actionPerformed", 
function (a) {
if (this.actionListener != null) {
this.actionListener.actionPerformed (a);
}}, "java.awt.event.ActionEvent");
Clazz.overrideMethod (c$, "putValue", 
function (a, b) {
}, "~S,~O");
Clazz.overrideMethod (c$, "setEnabled", 
function (a) {
}, "~B");
Clazz.overrideMethod (c$, "addPropertyChangeListener", 
function (a) {
}, "java.beans.PropertyChangeListener");
Clazz.overrideMethod (c$, "removePropertyChangeListener", 
function (a) {
}, "java.beans.PropertyChangeListener");
c$ = Clazz.p0p ();
};
c$.$JComponent$2$ = function () {
Clazz.pu$h(self.c$);
c$ = Clazz.declareAnonymous (javax.swing, "JComponent$2", null, Runnable);
Clazz.overrideMethod (c$, "run", 
function () {
{
this.b$["javax.swing.JComponent"].setFlag (28, false);
}this.b$["javax.swing.JComponent"].revalidate ();
});
c$ = Clazz.p0p ();
};
c$.$JComponent$1$ = function () {
Clazz.pu$h(self.c$);
c$ = Clazz.declareAnonymous (javax.swing, "JComponent$1", null, sun.awt.RequestFocusController);
Clazz.overrideMethod (c$, "acceptRequestFocus", 
function (from, to, temporary, focusedWindowChangeAllowed, cause) {
if ((to == null) || !(Clazz.instanceOf (to, javax.swing.JComponent))) {
return true;
}if ((from == null) || !(Clazz.instanceOf (from, javax.swing.JComponent))) {
return true;
}var target = to;
if (!target.getVerifyInputWhenFocusTarget ()) {
return true;
}var jFocusOwner = from;
var iv = jFocusOwner.getInputVerifier ();
if (iv == null) {
return true;
} else {
var currentSource = javax.swing.SwingUtilities.appContextGet (javax.swing.JComponent.INPUT_VERIFIER_SOURCE_KEY);
if (currentSource === jFocusOwner) {
return true;
}javax.swing.SwingUtilities.appContextPut (javax.swing.JComponent.INPUT_VERIFIER_SOURCE_KEY, jFocusOwner);
try {
return iv.shouldYieldFocus (jFocusOwner);
} finally {
if (currentSource != null) {
javax.swing.SwingUtilities.appContextPut (javax.swing.JComponent.INPUT_VERIFIER_SOURCE_KEY, currentSource);
} else {
javax.swing.SwingUtilities.appContextRemove (javax.swing.JComponent.INPUT_VERIFIER_SOURCE_KEY);
}}
}}, "java.awt.Component,java.awt.Component,~B,~B,sun.awt.CausedFocusEvent.Cause");
c$ = Clazz.p0p ();
};
Clazz.pu$h(self.c$);
c$ = Clazz.decorateAsClass (function () {
this.array = null;
this.count = 0;
this.capacity = 0;
Clazz.instantialize (this, arguments);
}, javax.swing.JComponent, "IntVector");
Clazz.defineMethod (c$, "size", 
function () {
return this.count;
});
Clazz.defineMethod (c$, "elementAt", 
function (a) {
return this.array[a];
}, "~N");
Clazz.defineMethod (c$, "addElement", 
function (a) {
if (this.count == this.capacity) {
this.capacity = (this.capacity + 2) * 2;
var b =  Clazz.newIntArray (this.capacity, 0);
if (this.count > 0) {
System.arraycopy (this.array, 0, b, 0, this.count);
}this.array = b;
}this.array[this.count++] = a;
}, "~N");
Clazz.defineMethod (c$, "setElementAt", 
function (a, b) {
this.array[b] = a;
}, "~N,~N");
c$ = Clazz.p0p ();
Clazz.pu$h(self.c$);
c$ = Clazz.declareType (javax.swing.JComponent, "KeyboardState");
c$.getKeyCodeArray = Clazz.defineMethod (c$, "getKeyCodeArray", 
function () {
var a = javax.swing.SwingUtilities.appContextGet (javax.swing.JComponent.KeyboardState.keyCodesKey);
if (a == null) {
a =  new javax.swing.JComponent.IntVector ();
javax.swing.SwingUtilities.appContextPut (javax.swing.JComponent.KeyboardState.keyCodesKey, a);
}return a;
});
c$.registerKeyPressed = Clazz.defineMethod (c$, "registerKeyPressed", 
function (a) {
var b = javax.swing.JComponent.KeyboardState.getKeyCodeArray ();
var c = b.size ();
var d;
for (d = 0; d < c; d++) {
if (b.elementAt (d) == -1) {
b.setElementAt (a, d);
return;
}}
b.addElement (a);
}, "~N");
c$.registerKeyReleased = Clazz.defineMethod (c$, "registerKeyReleased", 
function (a) {
var b = javax.swing.JComponent.KeyboardState.getKeyCodeArray ();
var c = b.size ();
var d;
for (d = 0; d < c; d++) {
if (b.elementAt (d) == a) {
b.setElementAt (-1, d);
return;
}}
}, "~N");
c$.keyIsPressed = Clazz.defineMethod (c$, "keyIsPressed", 
function (a) {
var b = javax.swing.JComponent.KeyboardState.getKeyCodeArray ();
var c = b.size ();
var d;
for (d = 0; d < c; d++) {
if (b.elementAt (d) == a) {
return true;
}}
return false;
}, "~N");
c$.shouldProcess = Clazz.defineMethod (c$, "shouldProcess", 
function (a) {
switch (a.getID ()) {
case 401:
if (!javax.swing.JComponent.KeyboardState.keyIsPressed (a.getKeyCode ())) {
javax.swing.JComponent.KeyboardState.registerKeyPressed (a.getKeyCode ());
}return true;
case 402:
if (javax.swing.JComponent.KeyboardState.keyIsPressed (a.getKeyCode ()) || a.getKeyCode () == 154) {
javax.swing.JComponent.KeyboardState.registerKeyReleased (a.getKeyCode ());
return true;
}return false;
case 400:
return true;
default:
return false;
}
}, "java.awt.event.KeyEvent");
c$.keyCodesKey = c$.prototype.keyCodesKey = javax.swing.JComponent.KeyboardState;
c$ = Clazz.p0p ();
Clazz.defineStatics (c$,
"managingFocusForwardTraversalKeys", null,
"managingFocusBackwardTraversalKeys", null,
"NOT_OBSCURED", 0,
"PARTIALLY_OBSCURED", 1,
"COMPLETELY_OBSCURED", 2,
"DEBUG_GRAPHICS_LOADED", false);
c$.INPUT_VERIFIER_SOURCE_KEY = c$.prototype.INPUT_VERIFIER_SOURCE_KEY =  new Clazz._O ();
Clazz.defineStatics (c$,
"WHEN_FOCUSED", 0,
"WHEN_ANCESTOR_OF_FOCUSED_COMPONENT", 1,
"WHEN_IN_FOCUSED_WINDOW", 2,
"UNDEFINED_CONDITION", -1,
"WHEN_IN_FOCUSED_WINDOW_BINDINGS", "_WhenInFocusedWindow",
"TOOL_TIP_TEXT_KEY", "ToolTipText",
"NEXT_FOCUS", "nextFocus",
"IS_DOUBLE_BUFFERED", 0,
"ANCESTOR_USING_BUFFER", 1,
"IS_PAINTING_TILE", 2,
"IS_OPAQUE", 3,
"FOCUS_INPUTMAP_CREATED", 5,
"ANCESTOR_INPUTMAP_CREATED", 6,
"WIF_INPUTMAP_CREATED", 7,
"ACTIONMAP_CREATED", 8,
"CREATED_DOUBLE_BUFFER", 9,
"IS_PRINTING", 11,
"IS_PRINTING_ALL", 12,
"IS_REPAINTING", 13,
"REQUEST_FOCUS_DISABLED", 22,
"INHERITS_POPUP_MENU", 23,
"OPAQUE_SET", 24,
"AUTOSCROLLS_SET", 25,
"REVALIDATE_RUNNABLE_SCHEDULED", 28);
c$.tempRectangles = c$.prototype.tempRectangles =  new JU.Lst ();
Clazz.defineStatics (c$,
"defaultLocale", "JComponent.defaultLocale",
"componentObtainingGraphicsFrom", null);
c$.componentObtainingGraphicsFromLock = c$.prototype.componentObtainingGraphicsFromLock =  new Clazz._O ();
c$.focusController = c$.prototype.focusController = ((Clazz.isClassDefined ("javax.swing.JComponent$1") ? 0 : javax.swing.JComponent.$JComponent$1$ ()), Clazz.innerTypeInstance (javax.swing.JComponent$1, this, null));
});

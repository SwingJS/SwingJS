Clazz.declarePackage ("jsjavax.swing");
Clazz.load (["jsjava.awt.event.FocusListener", "jsjavax.swing.AbstractButton", "$.MenuElement"], "jsjavax.swing.JMenuItem", ["java.lang.Boolean", "jsjavax.swing.DefaultButtonModel", "$.UIManager", "jsjavax.swing.event.MenuDragMouseEvent", "$.MenuDragMouseListener", "$.MenuKeyEvent", "$.MenuKeyListener"], function () {
c$ = Clazz.decorateAsClass (function () {
this.isMouseDragged = false;
this.accelerator = null;
Clazz.instantialize (this, arguments);
}, jsjavax.swing, "JMenuItem", jsjavax.swing.AbstractButton, jsjavax.swing.MenuElement);
Clazz.makeConstructor (c$, 
function () {
this.construct (null, Clazz.castNullAs ("jsjavax.swing.Icon"));
});
Clazz.makeConstructor (c$, 
function (icon) {
this.construct (null, icon);
}, "jsjavax.swing.Icon");
Clazz.makeConstructor (c$, 
function (text) {
this.construct (text, Clazz.castNullAs ("jsjavax.swing.Icon"));
}, "~S");
Clazz.makeConstructor (c$, 
function (a) {
this.construct ();
this.setAction (a);
}, "jsjavax.swing.Action");
Clazz.makeConstructor (c$, 
function (text, icon) {
Clazz.superConstructor (this, jsjavax.swing.JMenuItem, []);
this.setModel ( new jsjavax.swing.DefaultButtonModel ());
this.init (text, icon);
this.initFocusability ();
}, "~S,jsjavax.swing.Icon");
Clazz.makeConstructor (c$, 
function (text, mnemonic) {
Clazz.superConstructor (this, jsjavax.swing.JMenuItem, []);
this.setModel ( new jsjavax.swing.DefaultButtonModel ());
this.init (text, null);
this.setMnemonic (mnemonic);
this.initFocusability ();
}, "~S,~N");
Clazz.defineMethod (c$, "setModel", 
function (newModel) {
Clazz.superCall (this, jsjavax.swing.JMenuItem, "setModel", [newModel]);
if (Clazz.instanceOf (newModel, jsjavax.swing.DefaultButtonModel)) {
(newModel).setMenuItem (true);
}}, "jsjavax.swing.ButtonModel");
Clazz.defineMethod (c$, "initFocusability", 
function () {
this.setFocusable (false);
});
Clazz.overrideMethod (c$, "init", 
function (text, icon) {
if (text != null) {
this.setText (text);
}if (icon != null) {
this.setIcon (icon);
}this.addFocusListener ( new jsjavax.swing.JMenuItem.MenuItemFocusListener ());
this.setUIProperty ("borderPainted", Boolean.FALSE);
this.setFocusPainted (false);
this.setHorizontalTextPosition (11);
this.setHorizontalAlignment (10);
this.updateUI ();
}, "~S,jsjavax.swing.Icon");
Clazz.overrideMethod (c$, "updateUI", 
function () {
this.setUI (jsjavax.swing.UIManager.getUI (this));
});
Clazz.overrideMethod (c$, "getUIClassID", 
function () {
return "MenuItemUI";
});
Clazz.defineMethod (c$, "setArmed", 
function (b) {
var model = this.getModel ();
if (model.isArmed () != b) {
model.setArmed (b);
}}, "~B");
Clazz.defineMethod (c$, "isArmed", 
function () {
var model = this.getModel ();
return model.isArmed ();
});
Clazz.defineMethod (c$, "setEnabled", 
function (b) {
if (!b && !jsjavax.swing.UIManager.getBoolean ("MenuItem.disabledAreNavigable")) {
this.setArmed (false);
}Clazz.superCall (this, jsjavax.swing.JMenuItem, "setEnabled", [b]);
}, "~B");
Clazz.overrideMethod (c$, "alwaysOnTop", 
function () {
return true;
});
Clazz.defineMethod (c$, "setAccelerator", 
function (keyStroke) {
var oldAccelerator = this.accelerator;
this.accelerator = keyStroke;
this.repaint ();
this.revalidate ();
this.firePropertyChange ("accelerator", oldAccelerator, this.accelerator);
}, "jsjavax.swing.KeyStroke");
Clazz.defineMethod (c$, "getAccelerator", 
function () {
return this.accelerator;
});
Clazz.defineMethod (c$, "configurePropertiesFromAction", 
function (a) {
Clazz.superCall (this, jsjavax.swing.JMenuItem, "configurePropertiesFromAction", [a]);
this.configureAcceleratorFromAction (a);
}, "jsjavax.swing.Action");
Clazz.overrideMethod (c$, "setIconFromAction", 
function (a) {
var icon = null;
if (a != null) {
icon = a.getValue ("SmallIcon");
}this.setIcon (icon);
}, "jsjavax.swing.Action");
Clazz.overrideMethod (c$, "largeIconChanged", 
function (a) {
}, "jsjavax.swing.Action");
Clazz.overrideMethod (c$, "smallIconChanged", 
function (a) {
this.setIconFromAction (a);
}, "jsjavax.swing.Action");
Clazz.defineMethod (c$, "configureAcceleratorFromAction", 
function (a) {
var ks = (a == null) ? null : a.getValue ("AcceleratorKey");
this.setAccelerator (ks);
}, "jsjavax.swing.Action");
Clazz.defineMethod (c$, "actionPropertyChanged", 
function (action, propertyName) {
if (propertyName === "AcceleratorKey") {
this.configureAcceleratorFromAction (action);
} else {
Clazz.superCall (this, jsjavax.swing.JMenuItem, "actionPropertyChanged", [action, propertyName]);
}}, "jsjavax.swing.Action,~S");
Clazz.defineMethod (c$, "processMouseEvent", 
function (e, path, manager) {
this.processMenuDragMouseEvent ( new jsjavax.swing.event.MenuDragMouseEvent (e.getComponent (), e.getID (), e.getWhen (), e.getModifiers (), e.getX (), e.getY (), e.getXOnScreen (), e.getYOnScreen (), e.getClickCount (), e.isPopupTrigger (), path, manager));
}, "jsjava.awt.event.MouseEvent,~A,jsjavax.swing.MenuSelectionManager");
Clazz.defineMethod (c$, "processKeyEvent", 
function (e, path, manager) {
var mke =  new jsjavax.swing.event.MenuKeyEvent (e.getComponent (), e.getID (), e.getWhen (), e.getModifiers (), e.getKeyCode (), e.getKeyChar (), path, manager);
this.processMenuKeyEvent (mke);
if (mke.isConsumed ()) {
e.consume ();
}}, "jsjava.awt.event.KeyEvent,~A,jsjavax.swing.MenuSelectionManager");
Clazz.defineMethod (c$, "processMenuDragMouseEvent", 
function (e) {
switch (e.getID ()) {
case 504:
this.isMouseDragged = false;
this.fireMenuDragMouseEntered (e);
break;
case 505:
this.isMouseDragged = false;
this.fireMenuDragMouseExited (e);
break;
case 506:
this.isMouseDragged = true;
this.fireMenuDragMouseDragged (e);
break;
case 502:
if (this.isMouseDragged) this.fireMenuDragMouseReleased (e);
break;
default:
break;
}
}, "jsjavax.swing.event.MenuDragMouseEvent");
Clazz.defineMethod (c$, "processMenuKeyEvent", 
function (e) {
switch (e.getID ()) {
case 401:
this.fireMenuKeyPressed (e);
break;
case 402:
this.fireMenuKeyReleased (e);
break;
case 400:
this.fireMenuKeyTyped (e);
break;
default:
break;
}
}, "jsjavax.swing.event.MenuKeyEvent");
Clazz.defineMethod (c$, "fireMenuDragMouseEntered", 
function (event) {
var listeners = this.listenerList.getListenerList ();
for (var i = listeners.length - 2; i >= 0; i -= 2) {
if (listeners[i] === jsjavax.swing.event.MenuDragMouseListener) {
(listeners[i + 1]).menuDragMouseEntered (event);
}}
}, "jsjavax.swing.event.MenuDragMouseEvent");
Clazz.defineMethod (c$, "fireMenuDragMouseExited", 
function (event) {
var listeners = this.listenerList.getListenerList ();
for (var i = listeners.length - 2; i >= 0; i -= 2) {
if (listeners[i] === jsjavax.swing.event.MenuDragMouseListener) {
(listeners[i + 1]).menuDragMouseExited (event);
}}
}, "jsjavax.swing.event.MenuDragMouseEvent");
Clazz.defineMethod (c$, "fireMenuDragMouseDragged", 
function (event) {
var listeners = this.listenerList.getListenerList ();
for (var i = listeners.length - 2; i >= 0; i -= 2) {
if (listeners[i] === jsjavax.swing.event.MenuDragMouseListener) {
(listeners[i + 1]).menuDragMouseDragged (event);
}}
}, "jsjavax.swing.event.MenuDragMouseEvent");
Clazz.defineMethod (c$, "fireMenuDragMouseReleased", 
function (event) {
var listeners = this.listenerList.getListenerList ();
for (var i = listeners.length - 2; i >= 0; i -= 2) {
if (listeners[i] === jsjavax.swing.event.MenuDragMouseListener) {
(listeners[i + 1]).menuDragMouseReleased (event);
}}
}, "jsjavax.swing.event.MenuDragMouseEvent");
Clazz.defineMethod (c$, "fireMenuKeyPressed", 
function (event) {
var listeners = this.listenerList.getListenerList ();
for (var i = listeners.length - 2; i >= 0; i -= 2) {
if (listeners[i] === jsjavax.swing.event.MenuKeyListener) {
(listeners[i + 1]).menuKeyPressed (event);
}}
}, "jsjavax.swing.event.MenuKeyEvent");
Clazz.defineMethod (c$, "fireMenuKeyReleased", 
function (event) {
var listeners = this.listenerList.getListenerList ();
for (var i = listeners.length - 2; i >= 0; i -= 2) {
if (listeners[i] === jsjavax.swing.event.MenuKeyListener) {
(listeners[i + 1]).menuKeyReleased (event);
}}
}, "jsjavax.swing.event.MenuKeyEvent");
Clazz.defineMethod (c$, "fireMenuKeyTyped", 
function (event) {
var listeners = this.listenerList.getListenerList ();
for (var i = listeners.length - 2; i >= 0; i -= 2) {
if (listeners[i] === jsjavax.swing.event.MenuKeyListener) {
(listeners[i + 1]).menuKeyTyped (event);
}}
}, "jsjavax.swing.event.MenuKeyEvent");
Clazz.overrideMethod (c$, "menuSelectionChanged", 
function (isIncluded) {
this.setArmed (isIncluded);
}, "~B");
Clazz.overrideMethod (c$, "getSubElements", 
function () {
return  new Array (0);
});
Clazz.defineMethod (c$, "getComponent", 
function () {
return this;
});
Clazz.defineMethod (c$, "addMenuDragMouseListener", 
function (l) {
this.listenerList.add (jsjavax.swing.event.MenuDragMouseListener, l);
}, "jsjavax.swing.event.MenuDragMouseListener");
Clazz.defineMethod (c$, "removeMenuDragMouseListener", 
function (l) {
this.listenerList.remove (jsjavax.swing.event.MenuDragMouseListener, l);
}, "jsjavax.swing.event.MenuDragMouseListener");
Clazz.defineMethod (c$, "getMenuDragMouseListeners", 
function () {
return this.listenerList.getListeners (jsjavax.swing.event.MenuDragMouseListener);
});
Clazz.defineMethod (c$, "addMenuKeyListener", 
function (l) {
this.listenerList.add (jsjavax.swing.event.MenuKeyListener, l);
}, "jsjavax.swing.event.MenuKeyListener");
Clazz.defineMethod (c$, "removeMenuKeyListener", 
function (l) {
this.listenerList.remove (jsjavax.swing.event.MenuKeyListener, l);
}, "jsjavax.swing.event.MenuKeyListener");
Clazz.defineMethod (c$, "getMenuKeyListeners", 
function () {
return this.listenerList.getListeners (jsjavax.swing.event.MenuKeyListener);
});
Clazz.pu$h ();
c$ = Clazz.declareType (jsjavax.swing.JMenuItem, "MenuItemFocusListener", null, jsjava.awt.event.FocusListener);
Clazz.overrideMethod (c$, "focusGained", 
function (a) {
}, "jsjava.awt.event.FocusEvent");
Clazz.overrideMethod (c$, "focusLost", 
function (a) {
var b = a.getSource ();
if (b.isFocusPainted ()) {
b.repaint ();
}}, "jsjava.awt.event.FocusEvent");
c$ = Clazz.p0p ();
Clazz.defineStatics (c$,
"$uiClassID", "MenuItemUI");
});

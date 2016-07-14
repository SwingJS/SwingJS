Clazz.declarePackage ("javax.swing");
Clazz.load (["java.awt.event.FocusListener", "javax.swing.AbstractButton", "$.MenuElement"], "javax.swing.JMenuItem", ["java.lang.Boolean", "javax.swing.DefaultButtonModel", "$.UIManager", "javax.swing.event.MenuDragMouseEvent", "$.MenuDragMouseListener", "$.MenuKeyEvent", "$.MenuKeyListener"], function () {
c$ = Clazz.decorateAsClass (function () {
this.isMouseDragged = false;
this.accelerator = null;
Clazz.instantialize (this, arguments);
}, javax.swing, "JMenuItem", javax.swing.AbstractButton, javax.swing.MenuElement);
Clazz.makeConstructor (c$, 
function () {
Clazz.superConstructor (this, javax.swing.JMenuItem, []);
this.init0 (null, null, -2147483648, "MenuItemUI");
});
Clazz.makeConstructor (c$, 
function (icon) {
Clazz.superConstructor (this, javax.swing.JMenuItem, []);
this.init0 (null, icon, -2147483648, "MenuItemUI");
}, "javax.swing.Icon");
Clazz.makeConstructor (c$, 
function (text) {
Clazz.superConstructor (this, javax.swing.JMenuItem, []);
this.init0 (text, null, -2147483648, "MenuItemUI");
}, "~S");
Clazz.makeConstructor (c$, 
function (a) {
Clazz.superConstructor (this, javax.swing.JMenuItem, []);
this.init0 (null, null, -2147483648, "MenuItemUI");
this.setAction (a);
}, "javax.swing.Action");
Clazz.makeConstructor (c$, 
function (text, icon) {
Clazz.superConstructor (this, javax.swing.JMenuItem, []);
this.init0 (text, icon, -2147483648, "MenuItemUI");
}, "~S,javax.swing.Icon");
Clazz.makeConstructor (c$, 
function (text, mnemonic) {
Clazz.superConstructor (this, javax.swing.JMenuItem, []);
this.init0 (text, null, mnemonic, "MenuItemUI");
}, "~S,~N");
Clazz.makeConstructor (c$, 
function (text, icon, uid) {
Clazz.superConstructor (this, javax.swing.JMenuItem, []);
this.init0 (text, icon, 0, uid);
}, "~S,javax.swing.Icon,~S");
Clazz.makeConstructor (c$, 
function (text, icon, mnemonic, uid) {
Clazz.superConstructor (this, javax.swing.JMenuItem, []);
this.init0 (text, icon, mnemonic, uid);
}, "~S,javax.swing.Icon,~N,~S");
Clazz.defineMethod (c$, "init0", 
 function (text, icon, mnemonic, uid) {
this.setModel ( new javax.swing.DefaultButtonModel ());
this.init (text, icon, uid);
if (mnemonic >= 0) this.setMnemonic (mnemonic);
this.initFocusability ();
}, "~S,javax.swing.Icon,~N,~S");
Clazz.overrideMethod (c$, "init", 
function (text, icon, uid) {
this.uiClassID = uid;
this.updateUI ();
if (text != null) this.setText (text);
if (icon != null) this.setIcon (icon);
this.addFocusListener ( new javax.swing.JMenuItem.MenuItemFocusListener ());
this.setUIProperty ("borderPainted", Boolean.FALSE);
this.setFocusPainted (false);
this.setHorizontalTextPosition (11);
this.setHorizontalAlignment (10);
}, "~S,javax.swing.Icon,~S");
Clazz.defineMethod (c$, "setModel", 
function (newModel) {
Clazz.superCall (this, javax.swing.JMenuItem, "setModel", [newModel]);
if (Clazz.instanceOf (newModel, javax.swing.DefaultButtonModel)) {
(newModel).setMenuItem (true);
}}, "javax.swing.ButtonModel");
Clazz.defineMethod (c$, "initFocusability", 
function () {
this.setFocusable (false);
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
if (!b && !javax.swing.UIManager.getBoolean ("MenuItem.disabledAreNavigable")) {
this.setArmed (false);
}Clazz.superCall (this, javax.swing.JMenuItem, "setEnabled", [b]);
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
this.firePropertyChangeObject ("accelerator", oldAccelerator, this.accelerator);
}, "javax.swing.KeyStroke");
Clazz.defineMethod (c$, "getAccelerator", 
function () {
return this.accelerator;
});
Clazz.defineMethod (c$, "configurePropertiesFromAction", 
function (a) {
Clazz.superCall (this, javax.swing.JMenuItem, "configurePropertiesFromAction", [a]);
this.configureAcceleratorFromAction (a);
}, "javax.swing.Action");
Clazz.overrideMethod (c$, "setIconFromAction", 
function (a) {
var icon = null;
if (a != null) {
icon = a.getValue ("SmallIcon");
}this.setIcon (icon);
}, "javax.swing.Action");
Clazz.overrideMethod (c$, "largeIconChanged", 
function (a) {
}, "javax.swing.Action");
Clazz.overrideMethod (c$, "smallIconChanged", 
function (a) {
this.setIconFromAction (a);
}, "javax.swing.Action");
Clazz.defineMethod (c$, "configureAcceleratorFromAction", 
function (a) {
var ks = (a == null) ? null : a.getValue ("AcceleratorKey");
this.setAccelerator (ks);
}, "javax.swing.Action");
Clazz.defineMethod (c$, "actionPropertyChanged", 
function (action, propertyName) {
if (propertyName === "AcceleratorKey") {
this.configureAcceleratorFromAction (action);
} else {
Clazz.superCall (this, javax.swing.JMenuItem, "actionPropertyChanged", [action, propertyName]);
}}, "javax.swing.Action,~S");
Clazz.defineMethod (c$, "processMouseEvent", 
function (e, path, manager) {
this.processMenuDragMouseEvent ( new javax.swing.event.MenuDragMouseEvent (e.getComponent (), e.getID (), e.getWhen (), e.getModifiers (), e.getX (), e.getY (), e.getXOnScreen (), e.getYOnScreen (), e.getClickCount (), e.isPopupTrigger (), path, manager));
}, "java.awt.event.MouseEvent,~A,javax.swing.MenuSelectionManager");
Clazz.defineMethod (c$, "processKeyEvent", 
function (e, path, manager) {
var mke =  new javax.swing.event.MenuKeyEvent (e.getComponent (), e.getID (), e.getWhen (), e.getModifiers (), e.getKeyCode (), e.getKeyChar (), path, manager);
this.processMenuKeyEvent (mke);
if (mke.isConsumed ()) {
e.consume ();
}}, "java.awt.event.KeyEvent,~A,javax.swing.MenuSelectionManager");
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
}, "javax.swing.event.MenuDragMouseEvent");
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
}, "javax.swing.event.MenuKeyEvent");
Clazz.defineMethod (c$, "fireMenuDragMouseEntered", 
function (event) {
var listeners = this.listenerList.getListenerList ();
for (var i = listeners.length - 2; i >= 0; i -= 2) {
if (listeners[i] === javax.swing.event.MenuDragMouseListener) {
(listeners[i + 1]).menuDragMouseEntered (event);
}}
}, "javax.swing.event.MenuDragMouseEvent");
Clazz.defineMethod (c$, "fireMenuDragMouseExited", 
function (event) {
var listeners = this.listenerList.getListenerList ();
for (var i = listeners.length - 2; i >= 0; i -= 2) {
if (listeners[i] === javax.swing.event.MenuDragMouseListener) {
(listeners[i + 1]).menuDragMouseExited (event);
}}
}, "javax.swing.event.MenuDragMouseEvent");
Clazz.defineMethod (c$, "fireMenuDragMouseDragged", 
function (event) {
var listeners = this.listenerList.getListenerList ();
for (var i = listeners.length - 2; i >= 0; i -= 2) {
if (listeners[i] === javax.swing.event.MenuDragMouseListener) {
(listeners[i + 1]).menuDragMouseDragged (event);
}}
}, "javax.swing.event.MenuDragMouseEvent");
Clazz.defineMethod (c$, "fireMenuDragMouseReleased", 
function (event) {
var listeners = this.listenerList.getListenerList ();
for (var i = listeners.length - 2; i >= 0; i -= 2) {
if (listeners[i] === javax.swing.event.MenuDragMouseListener) {
(listeners[i + 1]).menuDragMouseReleased (event);
}}
}, "javax.swing.event.MenuDragMouseEvent");
Clazz.defineMethod (c$, "fireMenuKeyPressed", 
function (event) {
var listeners = this.listenerList.getListenerList ();
for (var i = listeners.length - 2; i >= 0; i -= 2) {
if (listeners[i] === javax.swing.event.MenuKeyListener) {
(listeners[i + 1]).menuKeyPressed (event);
}}
}, "javax.swing.event.MenuKeyEvent");
Clazz.defineMethod (c$, "fireMenuKeyReleased", 
function (event) {
var listeners = this.listenerList.getListenerList ();
for (var i = listeners.length - 2; i >= 0; i -= 2) {
if (listeners[i] === javax.swing.event.MenuKeyListener) {
(listeners[i + 1]).menuKeyReleased (event);
}}
}, "javax.swing.event.MenuKeyEvent");
Clazz.defineMethod (c$, "fireMenuKeyTyped", 
function (event) {
var listeners = this.listenerList.getListenerList ();
for (var i = listeners.length - 2; i >= 0; i -= 2) {
if (listeners[i] === javax.swing.event.MenuKeyListener) {
(listeners[i + 1]).menuKeyTyped (event);
}}
}, "javax.swing.event.MenuKeyEvent");
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
this.listenerList.add (javax.swing.event.MenuDragMouseListener, l);
}, "javax.swing.event.MenuDragMouseListener");
Clazz.defineMethod (c$, "removeMenuDragMouseListener", 
function (l) {
this.listenerList.remove (javax.swing.event.MenuDragMouseListener, l);
}, "javax.swing.event.MenuDragMouseListener");
Clazz.defineMethod (c$, "getMenuDragMouseListeners", 
function () {
return this.listenerList.getListeners (javax.swing.event.MenuDragMouseListener);
});
Clazz.defineMethod (c$, "addMenuKeyListener", 
function (l) {
this.listenerList.add (javax.swing.event.MenuKeyListener, l);
}, "javax.swing.event.MenuKeyListener");
Clazz.defineMethod (c$, "removeMenuKeyListener", 
function (l) {
this.listenerList.remove (javax.swing.event.MenuKeyListener, l);
}, "javax.swing.event.MenuKeyListener");
Clazz.defineMethod (c$, "getMenuKeyListeners", 
function () {
return this.listenerList.getListeners (javax.swing.event.MenuKeyListener);
});
Clazz.pu$h(self.c$);
c$ = Clazz.declareType (javax.swing.JMenuItem, "MenuItemFocusListener", null, java.awt.event.FocusListener);
Clazz.overrideMethod (c$, "focusGained", 
function (a) {
}, "java.awt.event.FocusEvent");
Clazz.overrideMethod (c$, "focusLost", 
function (a) {
var b = a.getSource ();
if (b.isFocusPainted ()) {
b.repaint ();
}}, "java.awt.event.FocusEvent");
c$ = Clazz.p0p ();
});

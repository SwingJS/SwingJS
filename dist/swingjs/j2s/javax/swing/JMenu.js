Clazz.declarePackage ("javax.swing");
Clazz.load (["java.awt.event.WindowAdapter", "javax.swing.JMenuItem", "$.MenuElement", "javax.swing.event.ChangeListener"], "javax.swing.JMenu", ["java.lang.Error", "$.IllegalArgumentException", "java.util.Vector", "java.awt.Point", "$.Rectangle", "$.Toolkit", "javax.swing.JMenuBar", "$.JPopupMenu", "$.MenuSelectionManager", "$.SwingUtilities", "$.UIManager", "javax.swing.event.MenuEvent", "$.MenuListener"], function () {
c$ = Clazz.decorateAsClass (function () {
this.$popupMenu = null;
this.menuChangeListener = null;
this.menuEvent = null;
this.delay = 0;
this.customMenuLocation = null;
this.popupListener = null;
if (!Clazz.isClassDefined ("javax.swing.JMenu.MenuChangeListener")) {
javax.swing.JMenu.$JMenu$MenuChangeListener$ ();
}
if (!Clazz.isClassDefined ("javax.swing.JMenu.WinListener")) {
javax.swing.JMenu.$JMenu$WinListener$ ();
}
Clazz.instantialize (this, arguments);
}, javax.swing, "JMenu", javax.swing.JMenuItem, javax.swing.MenuElement);
Clazz.makeConstructor (c$, 
function () {
Clazz.superConstructor (this, javax.swing.JMenu, ["", null, -2147483648, "MenuUI"]);
});
Clazz.makeConstructor (c$, 
function (s) {
Clazz.superConstructor (this, javax.swing.JMenu, [s, null, -2147483648, "MenuUI"]);
}, "~S");
Clazz.makeConstructor (c$, 
function (a) {
Clazz.superConstructor (this, javax.swing.JMenu, ["", null, -2147483648, "MenuUI"]);
this.setAction (a);
}, "javax.swing.Action");
Clazz.makeConstructor (c$, 
function (s, b) {
Clazz.superConstructor (this, javax.swing.JMenu, [s, null, -2147483648, "MenuUI"]);
}, "~S,~B");
Clazz.overrideMethod (c$, "initFocusability", 
function () {
});
Clazz.defineMethod (c$, "updateUI", 
function () {
Clazz.superCall (this, javax.swing.JMenu, "updateUI", []);
if (this.$popupMenu != null) {
this.$popupMenu.setUI (javax.swing.UIManager.getUI (this.$popupMenu));
}});
Clazz.defineMethod (c$, "setModel", 
function (newModel) {
var oldModel = this.getModel ();
Clazz.superCall (this, javax.swing.JMenu, "setModel", [newModel]);
if (oldModel != null && this.menuChangeListener != null) {
oldModel.removeChangeListener (this.menuChangeListener);
this.menuChangeListener = null;
}this.model = newModel;
if (newModel != null) {
this.menuChangeListener = this.createMenuChangeListener ();
newModel.addChangeListener (this.menuChangeListener);
}}, "javax.swing.ButtonModel");
Clazz.overrideMethod (c$, "isSelected", 
function () {
return this.getModel ().isSelected ();
});
Clazz.overrideMethod (c$, "setSelected", 
function (b) {
var model = this.getModel ();
if (b != model.isSelected ()) {
this.getModel ().setSelected (b);
}}, "~B");
Clazz.defineMethod (c$, "isPopupMenuVisible", 
function () {
this.ensurePopupMenuCreated ();
return this.$popupMenu.isVisible ();
});
Clazz.defineMethod (c$, "setPopupMenuVisible", 
function (b) {
var isVisible = this.isPopupMenuVisible ();
if (b != isVisible && (this.isEnabled () || !b)) {
this.ensurePopupMenuCreated ();
if ((b == true) && this.isShowing ()) {
var p = this.getCustomMenuLocation ();
if (p == null) {
p = this.getPopupMenuOrigin ();
}this.getPopupMenu ().show (this, p.x, p.y);
} else {
this.getPopupMenu ().setVisible (false);
}}}, "~B");
Clazz.defineMethod (c$, "getPopupMenuOrigin", 
function () {
var x = 0;
var y = 0;
var pm = this.getPopupMenu ();
var s = this.getSize ();
var pmSize = pm.getSize ();
if (pmSize.width == 0) {
pmSize = pm.getPreferredSize ();
}var position = this.getLocationOnScreen ();
var toolkit = java.awt.Toolkit.getDefaultToolkit ();
var gc = this.getGraphicsConfiguration ();
var screenBounds =  new java.awt.Rectangle (toolkit.getScreenSize ());
if (gc != null) {
screenBounds = gc.getBounds ();
var screenInsets = toolkit.getScreenInsets (gc);
screenBounds.width -= Math.abs (screenInsets.left + screenInsets.right);
screenBounds.height -= Math.abs (screenInsets.top + screenInsets.bottom);
position.x -= Math.abs (screenInsets.left);
position.y -= Math.abs (screenInsets.top);
}var parent = this.getParent ();
if (Clazz.instanceOf (parent, javax.swing.JPopupMenu)) {
var xOffset = javax.swing.UIManager.getInt ("Menu.submenuPopupOffsetX");
var yOffset = javax.swing.UIManager.getInt ("Menu.submenuPopupOffsetY");
if (javax.swing.SwingUtilities.isLeftToRight (this)) {
x = s.width + xOffset;
if (position.x + x + pmSize.width >= screenBounds.width + screenBounds.x && screenBounds.width - s.width < 2 * (position.x - screenBounds.x)) {
x = 0 - xOffset - pmSize.width;
}} else {
x = 0 - xOffset - pmSize.width;
if (position.x + x < screenBounds.x && screenBounds.width - s.width > 2 * (position.x - screenBounds.x)) {
x = s.width + xOffset;
}}y = yOffset;
if (position.y + y + pmSize.height >= screenBounds.height + screenBounds.y && screenBounds.height - s.height < 2 * (position.y - screenBounds.y)) {
y = s.height - yOffset - pmSize.height;
}} else {
var xOffset = javax.swing.UIManager.getInt ("Menu.menuPopupOffsetX");
var yOffset = javax.swing.UIManager.getInt ("Menu.menuPopupOffsetY");
if (javax.swing.SwingUtilities.isLeftToRight (this)) {
x = xOffset;
if (position.x + x + pmSize.width >= screenBounds.width + screenBounds.x && screenBounds.width - s.width < 2 * (position.x - screenBounds.x)) {
x = s.width - xOffset - pmSize.width;
}} else {
x = s.width - xOffset - pmSize.width;
if (position.x + x < screenBounds.x && screenBounds.width - s.width > 2 * (position.x - screenBounds.x)) {
x = xOffset;
}}y = s.height + yOffset;
if (position.y + y + pmSize.height >= screenBounds.height && screenBounds.height - s.height < 2 * (position.y - screenBounds.y)) {
y = 0 - yOffset - pmSize.height;
}}return  new java.awt.Point (x, y);
});
Clazz.defineMethod (c$, "getDelay", 
function () {
return this.delay;
});
Clazz.defineMethod (c$, "setDelay", 
function (d) {
if (d < 0) throw  new IllegalArgumentException ("Delay must be a positive integer");
this.delay = d;
}, "~N");
Clazz.defineMethod (c$, "ensurePopupMenuCreated", 
 function () {
if (this.$popupMenu == null) {
this.$popupMenu =  new javax.swing.JPopupMenu ();
this.$popupMenu.setInvoker (this);
this.popupListener = this.createWinListener (this.$popupMenu);
}});
Clazz.defineMethod (c$, "getCustomMenuLocation", 
 function () {
return this.customMenuLocation;
});
Clazz.defineMethod (c$, "setMenuLocation", 
function (x, y) {
this.customMenuLocation =  new java.awt.Point (x, y);
if (this.$popupMenu != null) this.$popupMenu.setLocation (x, y);
}, "~N,~N");
Clazz.defineMethod (c$, "add", 
function (menuItem) {
this.ensurePopupMenuCreated ();
return this.$popupMenu.add (menuItem);
}, "javax.swing.JMenuItem");
Clazz.defineMethod (c$, "add", 
function (c) {
this.ensurePopupMenuCreated ();
this.$popupMenu.add (c);
return c;
}, "java.awt.Component");
Clazz.defineMethod (c$, "add", 
function (c, index) {
this.ensurePopupMenuCreated ();
this.$popupMenu.add (c, index);
return c;
}, "java.awt.Component,~N");
Clazz.defineMethod (c$, "add", 
function (s) {
return this.add ( new javax.swing.JMenuItem (s));
}, "~S");
Clazz.defineMethod (c$, "add", 
function (a) {
var mi = this.createActionComponent (a);
mi.setAction (a);
this.add (mi);
return mi;
}, "javax.swing.Action");
Clazz.defineMethod (c$, "createActionComponent", 
function (a) {
var mi = ((Clazz.isClassDefined ("javax.swing.JMenu$1") ? 0 : javax.swing.JMenu.$JMenu$1$ ()), Clazz.innerTypeInstance (javax.swing.JMenu$1, this, null));
mi.setHorizontalTextPosition (11);
mi.setVerticalTextPosition (0);
return mi;
}, "javax.swing.Action");
Clazz.defineMethod (c$, "createActionChangeListener", 
function (b) {
return b.createActionPropertyChangeListener0 (b.getAction ());
}, "javax.swing.JMenuItem");
Clazz.defineMethod (c$, "addSeparator", 
function () {
this.ensurePopupMenuCreated ();
this.$popupMenu.addSeparator ();
});
Clazz.defineMethod (c$, "insert", 
function (s, pos) {
if (pos < 0) {
throw  new IllegalArgumentException ("index less than zero.");
}this.ensurePopupMenuCreated ();
this.$popupMenu.insert ( new javax.swing.JMenuItem (s), pos);
}, "~S,~N");
Clazz.defineMethod (c$, "insert", 
function (mi, pos) {
if (pos < 0) {
throw  new IllegalArgumentException ("index less than zero.");
}this.ensurePopupMenuCreated ();
this.$popupMenu.insert (mi, pos);
return mi;
}, "javax.swing.JMenuItem,~N");
Clazz.defineMethod (c$, "insert", 
function (a, pos) {
if (pos < 0) {
throw  new IllegalArgumentException ("index less than zero.");
}this.ensurePopupMenuCreated ();
var mi =  new javax.swing.JMenuItem (a);
mi.setHorizontalTextPosition (11);
mi.setVerticalTextPosition (0);
this.$popupMenu.insert (mi, pos);
return mi;
}, "javax.swing.Action,~N");
Clazz.defineMethod (c$, "insertSeparator", 
function (index) {
if (index < 0) {
throw  new IllegalArgumentException ("index less than zero.");
}this.ensurePopupMenuCreated ();
this.$popupMenu.insert ( new javax.swing.JPopupMenu.Separator (), index);
}, "~N");
Clazz.defineMethod (c$, "getItem", 
function (pos) {
if (pos < 0) {
throw  new IllegalArgumentException ("index less than zero.");
}var c = this.getMenuComponent (pos);
if (Clazz.instanceOf (c, javax.swing.JMenuItem)) {
var mi = c;
return mi;
}return null;
}, "~N");
Clazz.defineMethod (c$, "getItemCount", 
function () {
return this.getMenuComponentCount ();
});
Clazz.defineMethod (c$, "isTearOff", 
function () {
throw  new Error ("boolean isTearOff() {} not yet implemented");
});
Clazz.defineMethod (c$, "remove", 
function (pos) {
if (pos < 0) {
throw  new IllegalArgumentException ("index less than zero.");
}if (pos > this.getItemCount ()) {
throw  new IllegalArgumentException ("index greater than the number of items.");
}if (this.$popupMenu != null) this.$popupMenu.remove (pos);
}, "~N");
Clazz.defineMethod (c$, "remove", 
function (c) {
if (Clazz.instanceOf (c, javax.swing.JMenuItem)) if (this.$popupMenu != null) this.$popupMenu.remove (c);
if (this.$popupMenu != null) this.$popupMenu.remove (c);
}, "java.awt.Component");
Clazz.defineMethod (c$, "removeAll", 
function () {
if (this.$popupMenu != null) this.$popupMenu.removeAll ();
});
Clazz.defineMethod (c$, "getMenuComponentCount", 
function () {
var componentCount = 0;
if (this.$popupMenu != null) componentCount = this.$popupMenu.getComponentCount ();
return componentCount;
});
Clazz.defineMethod (c$, "getMenuComponent", 
function (n) {
if (this.$popupMenu != null) return this.$popupMenu.getComponent (n);
return null;
}, "~N");
Clazz.defineMethod (c$, "getMenuComponents", 
function () {
if (this.$popupMenu != null) return this.$popupMenu.getComponents ();
return  new Array (0);
});
Clazz.defineMethod (c$, "isTopLevelMenu", 
function () {
if (Clazz.instanceOf (this.getParent (), javax.swing.JMenuBar)) return true;
return false;
});
Clazz.defineMethod (c$, "isMenuComponent", 
function (c) {
if (c === this) return true;
if (Clazz.instanceOf (c, javax.swing.JPopupMenu)) {
var comp = c;
if (comp === this.getPopupMenu ()) return true;
}var ncomponents = this.getMenuComponentCount ();
var component = this.getMenuComponents ();
for (var i = 0; i < ncomponents; i++) {
var comp = component[i];
if (comp === c) return true;
if (Clazz.instanceOf (comp, javax.swing.JMenu)) {
var subMenu = comp;
if (subMenu.isMenuComponent (c)) return true;
}}
return false;
}, "java.awt.Component");
Clazz.defineMethod (c$, "getPopupMenu", 
function () {
this.ensurePopupMenuCreated ();
return this.$popupMenu;
});
Clazz.defineMethod (c$, "addMenuListener", 
function (l) {
this.listenerList.add (javax.swing.event.MenuListener, l);
}, "javax.swing.event.MenuListener");
Clazz.defineMethod (c$, "removeMenuListener", 
function (l) {
this.listenerList.remove (javax.swing.event.MenuListener, l);
}, "javax.swing.event.MenuListener");
Clazz.defineMethod (c$, "getMenuListeners", 
function () {
return this.listenerList.getListeners (javax.swing.event.MenuListener);
});
Clazz.defineMethod (c$, "fireMenuSelected", 
function () {
var listeners = this.listenerList.getListenerList ();
for (var i = listeners.length - 2; i >= 0; i -= 2) {
if (listeners[i] === javax.swing.event.MenuListener) {
if (listeners[i + 1] == null) {
throw  new Error (this.getText () + " has a NULL Listener!! " + i);
} else {
if (this.menuEvent == null) this.menuEvent =  new javax.swing.event.MenuEvent (this);
(listeners[i + 1]).menuSelected (this.menuEvent);
}}}
});
Clazz.defineMethod (c$, "fireMenuDeselected", 
function () {
var listeners = this.listenerList.getListenerList ();
for (var i = listeners.length - 2; i >= 0; i -= 2) {
if (listeners[i] === javax.swing.event.MenuListener) {
if (listeners[i + 1] == null) {
throw  new Error (this.getText () + " has a NULL Listener!! " + i);
} else {
if (this.menuEvent == null) this.menuEvent =  new javax.swing.event.MenuEvent (this);
(listeners[i + 1]).menuDeselected (this.menuEvent);
}}}
});
Clazz.defineMethod (c$, "fireMenuCanceled", 
function () {
var listeners = this.listenerList.getListenerList ();
for (var i = listeners.length - 2; i >= 0; i -= 2) {
if (listeners[i] === javax.swing.event.MenuListener) {
if (listeners[i + 1] == null) {
throw  new Error (this.getText () + " has a NULL Listener!! " + i);
} else {
if (this.menuEvent == null) this.menuEvent =  new javax.swing.event.MenuEvent (this);
(listeners[i + 1]).menuCanceled (this.menuEvent);
}}}
});
Clazz.overrideMethod (c$, "configureAcceleratorFromAction", 
function (a) {
}, "javax.swing.Action");
Clazz.defineMethod (c$, "createMenuChangeListener", 
 function () {
return Clazz.innerTypeInstance (javax.swing.JMenu.MenuChangeListener, this, null);
});
Clazz.defineMethod (c$, "createWinListener", 
function (p) {
return Clazz.innerTypeInstance (javax.swing.JMenu.WinListener, this, null, p);
}, "javax.swing.JPopupMenu");
Clazz.overrideMethod (c$, "menuSelectionChanged", 
function (isIncluded) {
this.setSelected (isIncluded);
}, "~B");
Clazz.overrideMethod (c$, "getSubElements", 
function () {
if (this.$popupMenu == null) return  new Array (0);
 else {
var result =  new Array (1);
result[0] = this.$popupMenu;
return result;
}});
Clazz.defineMethod (c$, "getComponent", 
function () {
return this;
});
Clazz.defineMethod (c$, "applyComponentOrientation", 
function (o) {
Clazz.superCall (this, javax.swing.JMenu, "applyComponentOrientation", [o]);
if (this.$popupMenu != null) {
var ncomponents = this.getMenuComponentCount ();
for (var i = 0; i < ncomponents; ++i) {
this.getMenuComponent (i).applyComponentOrientation (o);
}
this.$popupMenu.setComponentOrientation (o);
}}, "java.awt.ComponentOrientation");
Clazz.defineMethod (c$, "setComponentOrientation", 
function (o) {
Clazz.superCall (this, javax.swing.JMenu, "setComponentOrientation", [o]);
if (this.$popupMenu != null) {
this.$popupMenu.setComponentOrientation (o);
}}, "java.awt.ComponentOrientation");
Clazz.overrideMethod (c$, "setAccelerator", 
function (keyStroke) {
throw  new Error ("setAccelerator() is not defined for JMenu.  Use setMnemonic() instead.");
}, "javax.swing.KeyStroke");
Clazz.defineMethod (c$, "processKeyEvent", 
function (evt) {
javax.swing.MenuSelectionManager.defaultManager ().processKeyEvent (evt);
if (evt.isConsumed ()) return;
Clazz.superCall (this, javax.swing.JMenu, "processKeyEvent", [evt]);
}, "java.awt.event.KeyEvent");
Clazz.defineMethod (c$, "doClick", 
function (pressTime) {
var me = this.buildMenuElementArray (this);
javax.swing.MenuSelectionManager.defaultManager ().setSelectedPath (me);
}, "~N");
Clazz.defineMethod (c$, "buildMenuElementArray", 
 function (leaf) {
var elements =  new java.util.Vector ();
var current = leaf.getPopupMenu ();
var pop;
var menu;
var bar;
while (true) {
if (Clazz.instanceOf (current, javax.swing.JPopupMenu)) {
pop = current;
elements.insertElementAt (pop, 0);
current = pop.getInvoker ();
} else if (Clazz.instanceOf (current, javax.swing.JMenu)) {
menu = current;
elements.insertElementAt (menu, 0);
current = menu.getParent ();
} else if (Clazz.instanceOf (current, javax.swing.JMenuBar)) {
bar = current;
elements.insertElementAt (bar, 0);
var me =  new Array (elements.size ());
elements.copyInto (me);
return me;
}}
}, "javax.swing.JMenu");
c$.$JMenu$MenuChangeListener$ = function () {
Clazz.pu$h(self.c$);
c$ = Clazz.decorateAsClass (function () {
Clazz.prepareCallback (this, arguments);
this.isSelected = false;
Clazz.instantialize (this, arguments);
}, javax.swing.JMenu, "MenuChangeListener", null, javax.swing.event.ChangeListener);
Clazz.overrideMethod (c$, "stateChanged", 
function (a) {
var b = a.getSource ();
var c = b.isSelected ();
if (c != this.isSelected) {
if (c == true) {
this.b$["javax.swing.JMenu"].fireMenuSelected ();
} else {
this.b$["javax.swing.JMenu"].fireMenuDeselected ();
}this.isSelected = c;
}}, "javax.swing.event.ChangeEvent");
c$ = Clazz.p0p ();
};
c$.$JMenu$WinListener$ = function () {
Clazz.pu$h(self.c$);
c$ = Clazz.decorateAsClass (function () {
Clazz.prepareCallback (this, arguments);
this.popupMenu = null;
Clazz.instantialize (this, arguments);
}, javax.swing.JMenu, "WinListener", java.awt.event.WindowAdapter);
Clazz.makeConstructor (c$, 
function (a) {
Clazz.superConstructor (this, javax.swing.JMenu.WinListener, []);
this.popupMenu = a;
}, "javax.swing.JPopupMenu");
Clazz.overrideMethod (c$, "windowClosing", 
function (a) {
this.b$["javax.swing.JMenu"].setSelected (false);
}, "java.awt.event.WindowEvent");
c$ = Clazz.p0p ();
};
c$.$JMenu$1$ = function () {
Clazz.pu$h(self.c$);
c$ = Clazz.declareAnonymous (javax.swing, "JMenu$1", javax.swing.JMenuItem);
Clazz.defineMethod (c$, "createActionPropertyChangeListener", 
function (a) {
var pcl = this.b$["javax.swing.JMenu"].createActionChangeListener (this);
if (pcl == null) {
pcl = Clazz.superCall (this, javax.swing.JMenu$1, "createActionPropertyChangeListener", [a]);
}return pcl;
}, "javax.swing.Action");
c$ = Clazz.p0p ();
};
});

Clazz.declarePackage ("jsjavax.swing");
Clazz.load (["jsjava.awt.event.WindowAdapter", "jsjavax.swing.JMenuItem", "$.MenuElement", "jsjavax.swing.event.ChangeListener"], "jsjavax.swing.JMenu", ["java.lang.Error", "$.IllegalArgumentException", "java.util.Vector", "jsjava.awt.Point", "$.Rectangle", "$.Toolkit", "jsjavax.swing.JMenuBar", "$.JPopupMenu", "$.MenuSelectionManager", "$.SwingUtilities", "$.UIManager", "jsjavax.swing.event.MenuEvent", "$.MenuListener"], function () {
c$ = Clazz.decorateAsClass (function () {
this.$popupMenu = null;
this.menuChangeListener = null;
this.menuEvent = null;
this.delay = 0;
this.customMenuLocation = null;
this.popupListener = null;
if (!Clazz.isClassDefined ("jsjavax.swing.JMenu.MenuChangeListener")) {
jsjavax.swing.JMenu.$JMenu$MenuChangeListener$ ();
}
if (!Clazz.isClassDefined ("jsjavax.swing.JMenu.WinListener")) {
jsjavax.swing.JMenu.$JMenu$WinListener$ ();
}
Clazz.instantialize (this, arguments);
}, jsjavax.swing, "JMenu", jsjavax.swing.JMenuItem, jsjavax.swing.MenuElement);
Clazz.makeConstructor (c$, 
function () {
this.construct ("");
});
Clazz.makeConstructor (c$, 
function (a) {
this.construct ();
this.setAction (a);
}, "jsjavax.swing.Action");
Clazz.makeConstructor (c$, 
function (s, b) {
this.construct (s);
}, "~S,~B");
Clazz.overrideMethod (c$, "initFocusability", 
function () {
});
Clazz.overrideMethod (c$, "updateUI", 
function () {
this.setUI (jsjavax.swing.UIManager.getUI (this));
if (this.$popupMenu != null) {
this.$popupMenu.setUI (jsjavax.swing.UIManager.getUI (this.$popupMenu));
}});
Clazz.overrideMethod (c$, "getUIClassID", 
function () {
return "MenuUI";
});
Clazz.defineMethod (c$, "setModel", 
function (newModel) {
var oldModel = this.getModel ();
Clazz.superCall (this, jsjavax.swing.JMenu, "setModel", [newModel]);
if (oldModel != null && this.menuChangeListener != null) {
oldModel.removeChangeListener (this.menuChangeListener);
this.menuChangeListener = null;
}this.model = newModel;
if (newModel != null) {
this.menuChangeListener = this.createMenuChangeListener ();
newModel.addChangeListener (this.menuChangeListener);
}}, "jsjavax.swing.ButtonModel");
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
var toolkit = jsjava.awt.Toolkit.getDefaultToolkit ();
var gc = this.getGraphicsConfiguration ();
var screenBounds =  new jsjava.awt.Rectangle (toolkit.getScreenSize ());
if (gc != null) {
screenBounds = gc.getBounds ();
var screenInsets = toolkit.getScreenInsets (gc);
screenBounds.width -= Math.abs (screenInsets.left + screenInsets.right);
screenBounds.height -= Math.abs (screenInsets.top + screenInsets.bottom);
position.x -= Math.abs (screenInsets.left);
position.y -= Math.abs (screenInsets.top);
}var parent = this.getParent ();
if (Clazz.instanceOf (parent, jsjavax.swing.JPopupMenu)) {
var xOffset = jsjavax.swing.UIManager.getInt ("Menu.submenuPopupOffsetX");
var yOffset = jsjavax.swing.UIManager.getInt ("Menu.submenuPopupOffsetY");
if (jsjavax.swing.SwingUtilities.isLeftToRight (this)) {
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
var xOffset = jsjavax.swing.UIManager.getInt ("Menu.menuPopupOffsetX");
var yOffset = jsjavax.swing.UIManager.getInt ("Menu.menuPopupOffsetY");
if (jsjavax.swing.SwingUtilities.isLeftToRight (this)) {
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
}}return  new jsjava.awt.Point (x, y);
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
($fz = function () {
if (this.$popupMenu == null) {
this.$popupMenu =  new jsjavax.swing.JPopupMenu ();
this.$popupMenu.setInvoker (this);
this.popupListener = this.createWinListener (this.$popupMenu);
}}, $fz.isPrivate = true, $fz));
Clazz.defineMethod (c$, "getCustomMenuLocation", 
($fz = function () {
return this.customMenuLocation;
}, $fz.isPrivate = true, $fz));
Clazz.defineMethod (c$, "setMenuLocation", 
function (x, y) {
this.customMenuLocation =  new jsjava.awt.Point (x, y);
if (this.$popupMenu != null) this.$popupMenu.setLocation (x, y);
}, "~N,~N");
Clazz.defineMethod (c$, "add", 
function (menuItem) {
this.ensurePopupMenuCreated ();
return this.$popupMenu.add (menuItem);
}, "jsjavax.swing.JMenuItem");
Clazz.defineMethod (c$, "add", 
function (c) {
this.ensurePopupMenuCreated ();
this.$popupMenu.add (c);
return c;
}, "jsjava.awt.Component");
Clazz.defineMethod (c$, "add", 
function (c, index) {
this.ensurePopupMenuCreated ();
this.$popupMenu.add (c, index);
return c;
}, "jsjava.awt.Component,~N");
Clazz.defineMethod (c$, "add", 
function (s) {
return this.add ( new jsjavax.swing.JMenuItem (s));
}, "~S");
Clazz.defineMethod (c$, "add", 
function (a) {
var mi = this.createActionComponent (a);
mi.setAction (a);
this.add (mi);
return mi;
}, "jsjavax.swing.Action");
Clazz.defineMethod (c$, "createActionComponent", 
function (a) {
var mi = ((Clazz.isClassDefined ("jsjavax.swing.JMenu$1") ? 0 : jsjavax.swing.JMenu.$JMenu$1$ ()), Clazz.innerTypeInstance (jsjavax.swing.JMenu$1, this, null));
mi.setHorizontalTextPosition (11);
mi.setVerticalTextPosition (0);
return mi;
}, "jsjavax.swing.Action");
Clazz.defineMethod (c$, "createActionChangeListener", 
function (b) {
return b.createActionPropertyChangeListener0 (b.getAction ());
}, "jsjavax.swing.JMenuItem");
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
this.$popupMenu.insert ( new jsjavax.swing.JMenuItem (s), pos);
}, "~S,~N");
Clazz.defineMethod (c$, "insert", 
function (mi, pos) {
if (pos < 0) {
throw  new IllegalArgumentException ("index less than zero.");
}this.ensurePopupMenuCreated ();
this.$popupMenu.insert (mi, pos);
return mi;
}, "jsjavax.swing.JMenuItem,~N");
Clazz.defineMethod (c$, "insert", 
function (a, pos) {
if (pos < 0) {
throw  new IllegalArgumentException ("index less than zero.");
}this.ensurePopupMenuCreated ();
var mi =  new jsjavax.swing.JMenuItem (a);
mi.setHorizontalTextPosition (11);
mi.setVerticalTextPosition (0);
this.$popupMenu.insert (mi, pos);
return mi;
}, "jsjavax.swing.Action,~N");
Clazz.defineMethod (c$, "insertSeparator", 
function (index) {
if (index < 0) {
throw  new IllegalArgumentException ("index less than zero.");
}this.ensurePopupMenuCreated ();
this.$popupMenu.insert ( new jsjavax.swing.JPopupMenu.Separator (), index);
}, "~N");
Clazz.defineMethod (c$, "getItem", 
function (pos) {
if (pos < 0) {
throw  new IllegalArgumentException ("index less than zero.");
}var c = this.getMenuComponent (pos);
if (Clazz.instanceOf (c, jsjavax.swing.JMenuItem)) {
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
function (item) {
if (this.$popupMenu != null) this.$popupMenu.remove (item);
}, "jsjavax.swing.JMenuItem");
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
if (this.$popupMenu != null) this.$popupMenu.remove (c);
}, "jsjava.awt.Component");
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
if (Clazz.instanceOf (this.getParent (), jsjavax.swing.JMenuBar)) return true;
return false;
});
Clazz.defineMethod (c$, "isMenuComponent", 
function (c) {
if (c === this) return true;
if (Clazz.instanceOf (c, jsjavax.swing.JPopupMenu)) {
var comp = c;
if (comp === this.getPopupMenu ()) return true;
}var ncomponents = this.getMenuComponentCount ();
var component = this.getMenuComponents ();
for (var i = 0; i < ncomponents; i++) {
var comp = component[i];
if (comp === c) return true;
if (Clazz.instanceOf (comp, jsjavax.swing.JMenu)) {
var subMenu = comp;
if (subMenu.isMenuComponent (c)) return true;
}}
return false;
}, "jsjava.awt.Component");
Clazz.defineMethod (c$, "getPopupMenu", 
function () {
this.ensurePopupMenuCreated ();
return this.$popupMenu;
});
Clazz.defineMethod (c$, "addMenuListener", 
function (l) {
this.listenerList.add (jsjavax.swing.event.MenuListener, l);
}, "jsjavax.swing.event.MenuListener");
Clazz.defineMethod (c$, "removeMenuListener", 
function (l) {
this.listenerList.remove (jsjavax.swing.event.MenuListener, l);
}, "jsjavax.swing.event.MenuListener");
Clazz.defineMethod (c$, "getMenuListeners", 
function () {
return this.listenerList.getListeners (jsjavax.swing.event.MenuListener);
});
Clazz.defineMethod (c$, "fireMenuSelected", 
function () {
var listeners = this.listenerList.getListenerList ();
for (var i = listeners.length - 2; i >= 0; i -= 2) {
if (listeners[i] === jsjavax.swing.event.MenuListener) {
if (listeners[i + 1] == null) {
throw  new Error (this.getText () + " has a NULL Listener!! " + i);
} else {
if (this.menuEvent == null) this.menuEvent =  new jsjavax.swing.event.MenuEvent (this);
(listeners[i + 1]).menuSelected (this.menuEvent);
}}}
});
Clazz.defineMethod (c$, "fireMenuDeselected", 
function () {
var listeners = this.listenerList.getListenerList ();
for (var i = listeners.length - 2; i >= 0; i -= 2) {
if (listeners[i] === jsjavax.swing.event.MenuListener) {
if (listeners[i + 1] == null) {
throw  new Error (this.getText () + " has a NULL Listener!! " + i);
} else {
if (this.menuEvent == null) this.menuEvent =  new jsjavax.swing.event.MenuEvent (this);
(listeners[i + 1]).menuDeselected (this.menuEvent);
}}}
});
Clazz.defineMethod (c$, "fireMenuCanceled", 
function () {
var listeners = this.listenerList.getListenerList ();
for (var i = listeners.length - 2; i >= 0; i -= 2) {
if (listeners[i] === jsjavax.swing.event.MenuListener) {
if (listeners[i + 1] == null) {
throw  new Error (this.getText () + " has a NULL Listener!! " + i);
} else {
if (this.menuEvent == null) this.menuEvent =  new jsjavax.swing.event.MenuEvent (this);
(listeners[i + 1]).menuCanceled (this.menuEvent);
}}}
});
Clazz.overrideMethod (c$, "configureAcceleratorFromAction", 
function (a) {
}, "jsjavax.swing.Action");
Clazz.defineMethod (c$, "createMenuChangeListener", 
($fz = function () {
return Clazz.innerTypeInstance (jsjavax.swing.JMenu.MenuChangeListener, this, null);
}, $fz.isPrivate = true, $fz));
Clazz.defineMethod (c$, "createWinListener", 
function (p) {
return Clazz.innerTypeInstance (jsjavax.swing.JMenu.WinListener, this, null, p);
}, "jsjavax.swing.JPopupMenu");
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
Clazz.superCall (this, jsjavax.swing.JMenu, "applyComponentOrientation", [o]);
if (this.$popupMenu != null) {
var ncomponents = this.getMenuComponentCount ();
for (var i = 0; i < ncomponents; ++i) {
this.getMenuComponent (i).applyComponentOrientation (o);
}
this.$popupMenu.setComponentOrientation (o);
}}, "jsjava.awt.ComponentOrientation");
Clazz.defineMethod (c$, "setComponentOrientation", 
function (o) {
Clazz.superCall (this, jsjavax.swing.JMenu, "setComponentOrientation", [o]);
if (this.$popupMenu != null) {
this.$popupMenu.setComponentOrientation (o);
}}, "jsjava.awt.ComponentOrientation");
Clazz.overrideMethod (c$, "setAccelerator", 
function (keyStroke) {
throw  new Error ("setAccelerator() is not defined for JMenu.  Use setMnemonic() instead.");
}, "jsjavax.swing.KeyStroke");
Clazz.defineMethod (c$, "processKeyEvent", 
function (evt) {
jsjavax.swing.MenuSelectionManager.defaultManager ().processKeyEvent (evt);
if (evt.isConsumed ()) return;
Clazz.superCall (this, jsjavax.swing.JMenu, "processKeyEvent", [evt]);
}, "jsjava.awt.event.KeyEvent");
Clazz.defineMethod (c$, "doClick", 
function (pressTime) {
var me = this.buildMenuElementArray (this);
jsjavax.swing.MenuSelectionManager.defaultManager ().setSelectedPath (me);
}, "~N");
Clazz.defineMethod (c$, "buildMenuElementArray", 
($fz = function (leaf) {
var elements =  new java.util.Vector ();
var current = leaf.getPopupMenu ();
var pop;
var menu;
var bar;
while (true) {
if (Clazz.instanceOf (current, jsjavax.swing.JPopupMenu)) {
pop = current;
elements.insertElementAt (pop, 0);
current = pop.getInvoker ();
} else if (Clazz.instanceOf (current, jsjavax.swing.JMenu)) {
menu = current;
elements.insertElementAt (menu, 0);
current = menu.getParent ();
} else if (Clazz.instanceOf (current, jsjavax.swing.JMenuBar)) {
bar = current;
elements.insertElementAt (bar, 0);
var me =  new Array (elements.size ());
elements.copyInto (me);
return me;
}}
}, $fz.isPrivate = true, $fz), "jsjavax.swing.JMenu");
c$.$JMenu$MenuChangeListener$ = function () {
Clazz.pu$h ();
c$ = Clazz.decorateAsClass (function () {
Clazz.prepareCallback (this, arguments);
this.isSelected = false;
Clazz.instantialize (this, arguments);
}, jsjavax.swing.JMenu, "MenuChangeListener", null, jsjavax.swing.event.ChangeListener);
Clazz.overrideMethod (c$, "stateChanged", 
function (a) {
var b = a.getSource ();
var c = b.isSelected ();
if (c != this.isSelected) {
if (c == true) {
this.b$["jsjavax.swing.JMenu"].fireMenuSelected ();
} else {
this.b$["jsjavax.swing.JMenu"].fireMenuDeselected ();
}this.isSelected = c;
}}, "jsjavax.swing.event.ChangeEvent");
c$ = Clazz.p0p ();
};
c$.$JMenu$WinListener$ = function () {
Clazz.pu$h ();
c$ = Clazz.decorateAsClass (function () {
Clazz.prepareCallback (this, arguments);
this.popupMenu = null;
Clazz.instantialize (this, arguments);
}, jsjavax.swing.JMenu, "WinListener", jsjava.awt.event.WindowAdapter);
Clazz.makeConstructor (c$, 
function (a) {
Clazz.superConstructor (this, jsjavax.swing.JMenu.WinListener, []);
this.popupMenu = a;
}, "jsjavax.swing.JPopupMenu");
Clazz.overrideMethod (c$, "windowClosing", 
function (a) {
this.b$["jsjavax.swing.JMenu"].setSelected (false);
}, "jsjava.awt.event.WindowEvent");
c$ = Clazz.p0p ();
};
c$.$JMenu$1$ = function () {
Clazz.pu$h ();
c$ = Clazz.declareAnonymous (jsjavax.swing, "JMenu$1", jsjavax.swing.JMenuItem);
Clazz.defineMethod (c$, "createActionPropertyChangeListener", 
function (a) {
var pcl = this.b$["jsjavax.swing.JMenu"].createActionChangeListener (this);
if (pcl == null) {
pcl = Clazz.superCall (this, jsjavax.swing.JMenu$1, "createActionPropertyChangeListener", [a]);
}return pcl;
}, "jsjavax.swing.Action");
c$ = Clazz.p0p ();
};
Clazz.defineStatics (c$,
"$$uiClassID", "MenuUI");
});

Clazz.declarePackage ("javax.swing");
Clazz.load (["javax.swing.JComponent", "$.JSeparator", "$.MenuElement", "swingjs.api.JSComponent"], "javax.swing.JPopupMenu", ["java.lang.Boolean", "$.IllegalArgumentException", "java.util.Vector", "java.awt.Dimension", "$.Frame", "$.GraphicsEnvironment", "$.Insets", "$.Point", "javax.swing.DefaultSingleSelectionModel", "$.JMenu", "$.JMenuItem", "$.MenuSelectionManager", "$.PopupFactory", "$.SwingUtilities", "$.UIManager", "javax.swing.event.MenuKeyEvent", "$.MenuKeyListener", "$.PopupMenuEvent", "$.PopupMenuListener"], function () {
c$ = Clazz.decorateAsClass (function () {
this.invoker = null;
this.popup = null;
this.frame = null;
this.desiredLocationX = 0;
this.desiredLocationY = 0;
this.label = null;
this.$paintBorder = true;
this.margin = null;
this.lightWeightPopup = true;
this.selectionModel = null;
Clazz.instantialize (this, arguments);
}, javax.swing, "JPopupMenu", javax.swing.JComponent, [swingjs.api.JSComponent, javax.swing.MenuElement]);
c$.setDefaultLightWeightPopupEnabled = Clazz.defineMethod (c$, "setDefaultLightWeightPopupEnabled", 
function (aFlag) {
javax.swing.SwingUtilities.appContextPut (javax.swing.JPopupMenu.defaultLWPopupEnabledKey, Boolean.$valueOf (aFlag));
}, "~B");
c$.getDefaultLightWeightPopupEnabled = Clazz.defineMethod (c$, "getDefaultLightWeightPopupEnabled", 
function () {
var b = javax.swing.SwingUtilities.appContextGet (javax.swing.JPopupMenu.defaultLWPopupEnabledKey);
if (b == null) {
javax.swing.SwingUtilities.appContextPut (javax.swing.JPopupMenu.defaultLWPopupEnabledKey, Boolean.TRUE);
return true;
}return b.booleanValue ();
});
Clazz.makeConstructor (c$, 
function () {
this.construct (null);
});
Clazz.makeConstructor (c$, 
function (label) {
Clazz.superConstructor (this, javax.swing.JPopupMenu, []);
this.label = label;
this.lightWeightPopup = javax.swing.JPopupMenu.getDefaultLightWeightPopupEnabled ();
this.setSelectionModel ( new javax.swing.DefaultSingleSelectionModel ());
this.enableEvents (16);
this.updateUI ();
}, "~S");
Clazz.overrideMethod (c$, "getUI", 
function () {
return this.ui;
});
Clazz.overrideMethod (c$, "updateUI", 
function () {
this.setUI (javax.swing.UIManager.getUI (this));
});
Clazz.overrideMethod (c$, "getUIClassID", 
function () {
return "PopupMenuUI";
});
Clazz.defineMethod (c$, "processKeyEvent", 
function (evt) {
javax.swing.MenuSelectionManager.defaultManager ().processKeyEvent (evt);
if (evt.isConsumed ()) {
return;
}Clazz.superCall (this, javax.swing.JPopupMenu, "processKeyEvent", [evt]);
}, "java.awt.event.KeyEvent");
Clazz.defineMethod (c$, "getSelectionModel", 
function () {
return this.selectionModel;
});
Clazz.defineMethod (c$, "setSelectionModel", 
function (model) {
this.selectionModel = model;
}, "javax.swing.SingleSelectionModel");
Clazz.defineMethod (c$, "add", 
function (menuItem) {
Clazz.superCall (this, javax.swing.JPopupMenu, "add", [menuItem]);
return menuItem;
}, "javax.swing.JMenuItem");
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
Clazz.defineMethod (c$, "adjustPopupLocationToFitScreen", 
function (xposition, yposition) {
var p =  new java.awt.Point (xposition, yposition);
if (javax.swing.JPopupMenu.popupPostionFixDisabled == true || java.awt.GraphicsEnvironment.isHeadless ()) return p;
return p;
}, "~N,~N");
Clazz.defineMethod (c$, "createActionComponent", 
function (a) {
var mi = ((Clazz.isClassDefined ("javax.swing.JPopupMenu$1") ? 0 : javax.swing.JPopupMenu.$JPopupMenu$1$ ()), Clazz.innerTypeInstance (javax.swing.JPopupMenu$1, this, null));
mi.setHorizontalTextPosition (11);
mi.setVerticalTextPosition (0);
return mi;
}, "javax.swing.Action");
Clazz.defineMethod (c$, "createActionChangeListener", 
function (b) {
return b.createActionPropertyChangeListener0 (b.getAction ());
}, "javax.swing.JMenuItem");
Clazz.defineMethod (c$, "remove", 
function (pos) {
if (pos < 0) {
throw  new IllegalArgumentException ("index less than zero.");
}if (pos > this.getComponentCount () - 1) {
throw  new IllegalArgumentException ("index greater than the number of items.");
}Clazz.superCall (this, javax.swing.JPopupMenu, "remove", [pos]);
}, "~N");
Clazz.defineMethod (c$, "setLightWeightPopupEnabled", 
function (aFlag) {
this.lightWeightPopup = aFlag;
}, "~B");
Clazz.defineMethod (c$, "isLightWeightPopupEnabled", 
function () {
return this.lightWeightPopup;
});
Clazz.defineMethod (c$, "getLabel", 
function () {
return this.label;
});
Clazz.defineMethod (c$, "setLabel", 
function (label) {
var oldValue = this.label;
this.label = label;
this.firePropertyChangeObject ("label", oldValue, label);
this.invalidate ();
this.repaint ();
}, "~S");
Clazz.defineMethod (c$, "addSeparator", 
function () {
this.add ( new javax.swing.JPopupMenu.Separator ());
});
Clazz.defineMethod (c$, "insert", 
function (a, index) {
var mi = this.createActionComponent (a);
mi.setAction (a);
this.insert (mi, index);
}, "javax.swing.Action,~N");
Clazz.defineMethod (c$, "insert", 
function (component, index) {
if (index < 0) {
throw  new IllegalArgumentException ("index less than zero.");
}var nitems = this.getComponentCount ();
var tempItems =  new java.util.Vector ();
for (var i = index; i < nitems; i++) {
tempItems.addElement (this.getComponent (index));
this.remove (index);
}
this.add (component);
for (var i = 0; i < tempItems.size (); i++) {
this.add (tempItems.elementAt (i));
}
}, "java.awt.Component,~N");
Clazz.defineMethod (c$, "addPopupMenuListener", 
function (l) {
this.listenerList.add (javax.swing.event.PopupMenuListener, l);
}, "javax.swing.event.PopupMenuListener");
Clazz.defineMethod (c$, "removePopupMenuListener", 
function (l) {
this.listenerList.remove (javax.swing.event.PopupMenuListener, l);
}, "javax.swing.event.PopupMenuListener");
Clazz.defineMethod (c$, "getPopupMenuListeners", 
function () {
return this.listenerList.getListeners (javax.swing.event.PopupMenuListener);
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
Clazz.defineMethod (c$, "firePopupMenuWillBecomeVisible", 
function () {
var listeners = this.listenerList.getListenerList ();
var e = null;
for (var i = listeners.length - 2; i >= 0; i -= 2) {
if (listeners[i] === javax.swing.event.PopupMenuListener) {
if (e == null) e =  new javax.swing.event.PopupMenuEvent (this);
(listeners[i + 1]).popupMenuWillBecomeVisible (e);
}}
});
Clazz.defineMethod (c$, "firePopupMenuWillBecomeInvisible", 
function () {
var listeners = this.listenerList.getListenerList ();
var e = null;
for (var i = listeners.length - 2; i >= 0; i -= 2) {
if (listeners[i] === javax.swing.event.PopupMenuListener) {
if (e == null) e =  new javax.swing.event.PopupMenuEvent (this);
(listeners[i + 1]).popupMenuWillBecomeInvisible (e);
}}
});
Clazz.defineMethod (c$, "firePopupMenuCanceled", 
function () {
var listeners = this.listenerList.getListenerList ();
var e = null;
for (var i = listeners.length - 2; i >= 0; i -= 2) {
if (listeners[i] === javax.swing.event.PopupMenuListener) {
if (e == null) e =  new javax.swing.event.PopupMenuEvent (this);
(listeners[i + 1]).popupMenuCanceled (e);
}}
});
Clazz.overrideMethod (c$, "alwaysOnTop", 
function () {
return true;
});
Clazz.defineMethod (c$, "pack", 
function () {
if (this.popup != null) {
var pref = this.getPreferredSize ();
if (pref == null || pref.width != this.getWidth () || pref.height != this.getHeight ()) {
this.popup = this.getPopup ();
} else {
this.validate ();
}}});
Clazz.overrideMethod (c$, "setVisible", 
function (b) {
if (b == this.isVisible ()) return;
if (b == false) {
var doCanceled = this.getClientProperty ("JPopupMenu.firePopupMenuCanceled");
if (doCanceled != null && doCanceled === Boolean.TRUE) {
this.putClientProperty ("JPopupMenu.firePopupMenuCanceled", Boolean.FALSE);
this.firePopupMenuCanceled ();
}this.getSelectionModel ().clearSelection ();
} else {
if (this.isPopupMenu ()) {
var me =  new Array (1);
me[0] = this;
javax.swing.MenuSelectionManager.defaultManager ().setSelectedPath (me);
}}if (b) {
this.firePopupMenuWillBecomeVisible ();
this.popup = this.getPopup ();
this.firePropertyChangeObject ("visible", Boolean.FALSE, Boolean.TRUE);
} else if (this.popup != null) {
this.firePopupMenuWillBecomeInvisible ();
this.popup.hide ();
this.popup = null;
this.firePropertyChangeObject ("visible", Boolean.TRUE, Boolean.FALSE);
if (this.isPopupMenu ()) {
javax.swing.MenuSelectionManager.defaultManager ().clearSelectedPath ();
}}}, "~B");
Clazz.defineMethod (c$, "getPopup", 
 function () {
var oldPopup = this.popup;
if (oldPopup != null) {
oldPopup.hide ();
}var popupFactory = javax.swing.PopupFactory.getSharedInstance ();
if (this.isLightWeightPopupEnabled ()) {
popupFactory.setPopupType (0);
} else {
popupFactory.setPopupType (1);
}var p = this.adjustPopupLocationToFitScreen (this.desiredLocationX, this.desiredLocationY);
this.desiredLocationX = p.x;
this.desiredLocationY = p.y;
var newPopup = this.getUI ().getPopup (this, this.desiredLocationX, this.desiredLocationY);
popupFactory.setPopupType (0);
newPopup.show ();
return newPopup;
});
Clazz.overrideMethod (c$, "isVisible", 
function () {
if (this.popup != null) return true;
 else return false;
});
Clazz.defineMethod (c$, "setLocation", 
function (x, y) {
var oldX = this.desiredLocationX;
var oldY = this.desiredLocationY;
this.desiredLocationX = x;
this.desiredLocationY = y;
if (this.popup != null && (x != oldX || y != oldY)) {
this.popup = this.getPopup ();
}}, "~N,~N");
Clazz.defineMethod (c$, "isPopupMenu", 
 function () {
return ((this.invoker != null) && !(Clazz.instanceOf (this.invoker, javax.swing.JMenu)));
});
Clazz.defineMethod (c$, "getInvoker", 
function () {
return this.invoker;
});
Clazz.defineMethod (c$, "setInvoker", 
function (invoker) {
var oldInvoker = this.invoker;
this.invoker = invoker;
if ((oldInvoker !== this.invoker) && (this.ui != null)) {
this.ui.uninstallUI (this);
this.ui.installUI (this);
}this.invalidate ();
}, "java.awt.Component");
Clazz.defineMethod (c$, "show", 
function (invoker, x, y) {
this.setInvoker (invoker);
var newFrame = javax.swing.JPopupMenu.getFrame (invoker);
if (newFrame !== this.frame) {
if (newFrame != null) {
this.frame = newFrame;
if (this.popup != null) {
this.setVisible (false);
}}}var invokerOrigin;
if (invoker != null) {
invokerOrigin = invoker.getLocationOnScreen ();
var lx;
var ly;
lx = (invokerOrigin.x) + (x);
ly = (invokerOrigin.y) + (y);
if (lx > 2147483647) lx = 2147483647;
if (lx < -2147483648) lx = -2147483648;
if (ly > 2147483647) ly = 2147483647;
if (ly < -2147483648) ly = -2147483648;
this.setLocation (lx, ly);
} else {
this.setLocation (x, y);
}this.setVisible (true);
}, "java.awt.Component,~N,~N");
Clazz.defineMethod (c$, "getRootPopupMenu", 
function () {
var mp = this;
while ((mp != null) && (mp.isPopupMenu () != true) && (mp.getInvoker () != null) && (mp.getInvoker ().getParent () != null) && (Clazz.instanceOf (mp.getInvoker ().getParent (), javax.swing.JPopupMenu))) {
mp = mp.getInvoker ().getParent ();
}
return mp;
});
Clazz.defineMethod (c$, "getComponentAtIndex", 
function (i) {
return this.getComponent (i);
}, "~N");
Clazz.defineMethod (c$, "getComponentIndex", 
function (c) {
var ncomponents = this.getComponentCount ();
var component = this.getComponents ();
for (var i = 0; i < ncomponents; i++) {
var comp = component[i];
if (comp === c) return i;
}
return -1;
}, "java.awt.Component");
Clazz.defineMethod (c$, "setPopupSize", 
function (d) {
var oldSize = this.getPreferredSize ();
this.setPreferredSize (d);
if (this.popup != null) {
var newSize = this.getPreferredSize ();
if (!oldSize.equals (newSize)) {
this.popup = this.getPopup ();
}}}, "java.awt.Dimension");
Clazz.defineMethod (c$, "setPopupSize", 
function (width, height) {
this.setPopupSize ( new java.awt.Dimension (width, height));
}, "~N,~N");
Clazz.defineMethod (c$, "setSelected", 
function (sel) {
var model = this.getSelectionModel ();
var index = this.getComponentIndex (sel);
model.setSelectedIndex (index);
}, "java.awt.Component");
Clazz.defineMethod (c$, "isBorderPainted", 
function () {
return this.$paintBorder;
});
Clazz.defineMethod (c$, "setBorderPainted", 
function (b) {
this.$paintBorder = b;
this.repaint ();
}, "~B");
Clazz.defineMethod (c$, "paintBorder", 
function (g) {
if (this.isBorderPainted ()) {
Clazz.superCall (this, javax.swing.JPopupMenu, "paintBorder", [g]);
}}, "java.awt.Graphics");
Clazz.defineMethod (c$, "getMargin", 
function () {
if (this.margin == null) {
return  new java.awt.Insets (0, 0, 0, 0);
} else {
return this.margin;
}});
Clazz.defineMethod (c$, "isSubPopupMenu", 
function (popup) {
var ncomponents = this.getComponentCount ();
var component = this.getComponents ();
for (var i = 0; i < ncomponents; i++) {
var comp = component[i];
if (Clazz.instanceOf (comp, javax.swing.JMenu)) {
var menu = comp;
var subPopup = menu.getPopupMenu ();
if (subPopup === popup) return true;
if (subPopup.isSubPopupMenu (popup)) return true;
}}
return false;
}, "javax.swing.JPopupMenu");
c$.getFrame = Clazz.defineMethod (c$, "getFrame", 
 function (c) {
var w = c;
while (!(Clazz.instanceOf (w, java.awt.Frame)) && (w != null)) {
w = w.getParent ();
}
return w;
}, "java.awt.Component");
Clazz.defineMethod (c$, "paramString", 
function () {
var labelString = (this.label != null ? this.label : "");
var paintBorderString = (this.$paintBorder ? "true" : "false");
var marginString = (this.margin != null ? this.margin.toString () : "");
var lightWeightPopupEnabledString = (this.isLightWeightPopupEnabled () ? "true" : "false");
return Clazz.superCall (this, javax.swing.JPopupMenu, "paramString", []) + ",desiredLocationX=" + this.desiredLocationX + ",desiredLocationY=" + this.desiredLocationY + ",label=" + labelString + ",lightWeightPopupEnabled=" + lightWeightPopupEnabledString + ",margin=" + marginString + ",paintBorder=" + paintBorderString;
});
Clazz.defineMethod (c$, "processMouseEvent", 
function (event, path, manager) {
}, "java.awt.event.MouseEvent,~A,javax.swing.MenuSelectionManager");
Clazz.defineMethod (c$, "processKeyEvent", 
function (e, path, manager) {
var mke =  new javax.swing.event.MenuKeyEvent (e.getComponent (), e.getID (), e.getWhen (), e.getModifiers (), e.getKeyCode (), e.getKeyChar (), path, manager);
this.processMenuKeyEvent (mke);
if (mke.isConsumed ()) {
e.consume ();
}}, "java.awt.event.KeyEvent,~A,javax.swing.MenuSelectionManager");
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
if (Clazz.instanceOf (this.invoker, javax.swing.JMenu)) {
var m = this.invoker;
if (isIncluded) m.setPopupMenuVisible (true);
 else m.setPopupMenuVisible (false);
}if (this.isPopupMenu () && !isIncluded) this.setVisible (false);
}, "~B");
Clazz.overrideMethod (c$, "getSubElements", 
function () {
var result;
var tmp =  new java.util.Vector ();
var c = this.getComponentCount ();
var i;
var m;
for (i = 0; i < c; i++) {
m = this.getComponent (i);
if (Clazz.instanceOf (m, javax.swing.MenuElement)) tmp.addElement (m);
}
result =  new Array (tmp.size ());
for (i = 0, c = tmp.size (); i < c; i++) result[i] = tmp.elementAt (i);

return result;
});
Clazz.defineMethod (c$, "getComponent", 
function () {
return this;
});
Clazz.defineMethod (c$, "isPopupTrigger", 
function (e) {
return this.getUI ().isPopupTrigger (e);
}, "java.awt.event.MouseEvent");
c$.$JPopupMenu$1$ = function () {
Clazz.pu$h(self.c$);
c$ = Clazz.declareAnonymous (javax.swing, "JPopupMenu$1", javax.swing.JMenuItem);
Clazz.defineMethod (c$, "createActionPropertyChangeListener", 
function (a) {
var pcl = this.b$["javax.swing.JPopupMenu"].createActionChangeListener (this);
if (pcl == null) {
pcl = Clazz.superCall (this, javax.swing.JPopupMenu$1, "createActionPropertyChangeListener", [a]);
}return pcl;
}, "javax.swing.Action");
c$ = Clazz.p0p ();
};
Clazz.pu$h(self.c$);
c$ = Clazz.declareType (javax.swing.JPopupMenu, "Separator", javax.swing.JSeparator);
Clazz.makeConstructor (c$, 
function () {
Clazz.superConstructor (this, javax.swing.JPopupMenu.Separator, [0]);
});
Clazz.overrideMethod (c$, "getUIClassID", 
function () {
return "PopupMenuSeparatorUI";
});
c$ = Clazz.p0p ();
Clazz.defineStatics (c$,
"$uiClassID", "PopupMenuUI");
c$.defaultLWPopupEnabledKey = c$.prototype.defaultLWPopupEnabledKey =  new Clazz._O ();
Clazz.defineStatics (c$,
"popupPostionFixDisabled", false);
});

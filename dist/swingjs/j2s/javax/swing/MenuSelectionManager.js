Clazz.declarePackage ("javax.swing");
Clazz.load (["java.util.Vector", "javax.swing.event.EventListenerList"], "javax.swing.MenuSelectionManager", ["java.awt.event.MouseEvent", "javax.swing.JComponent", "$.SwingUtilities", "javax.swing.event.ChangeEvent", "$.ChangeListener", "sun.awt.AppContext"], function () {
c$ = Clazz.decorateAsClass (function () {
this.selection = null;
this.changeEvent = null;
this.listenerList = null;
Clazz.instantialize (this, arguments);
}, javax.swing, "MenuSelectionManager");
Clazz.prepareFields (c$, function () {
this.selection =  new java.util.Vector ();
this.listenerList =  new javax.swing.event.EventListenerList ();
});
c$.defaultManager = Clazz.defineMethod (c$, "defaultManager", 
function () {
{
var context = sun.awt.AppContext.getAppContext ();
var msm = context.get (javax.swing.MenuSelectionManager.MENU_SELECTION_MANAGER_KEY);
if (msm == null) {
msm =  new javax.swing.MenuSelectionManager ();
context.put (javax.swing.MenuSelectionManager.MENU_SELECTION_MANAGER_KEY, msm);
}return msm;
}});
Clazz.defineMethod (c$, "setSelectedPath", 
function (path) {
var i;
var c;
var currentSelectionCount = this.selection.size ();
var firstDifference = 0;
if (path == null) {
path =  new Array (0);
}for (i = 0, c = path.length; i < c; i++) {
if (i < currentSelectionCount && this.selection.elementAt (i) === path[i]) firstDifference++;
 else break;
}
for (i = currentSelectionCount - 1; i >= firstDifference; i--) {
var me = this.selection.elementAt (i);
this.selection.removeElementAt (i);
me.menuSelectionChanged (false);
}
for (i = firstDifference, c = path.length; i < c; i++) {
if (path[i] != null) {
this.selection.addElement (path[i]);
path[i].menuSelectionChanged (true);
}}
this.fireStateChanged ();
}, "~A");
Clazz.defineMethod (c$, "getSelectedPath", 
function () {
var res =  new Array (this.selection.size ());
var i;
var c;
for (i = 0, c = this.selection.size (); i < c; i++) res[i] = this.selection.elementAt (i);

return res;
});
Clazz.defineMethod (c$, "clearSelectedPath", 
function () {
if (this.selection.size () > 0) {
this.setSelectedPath (null);
}});
Clazz.defineMethod (c$, "addChangeListener", 
function (l) {
this.listenerList.add (javax.swing.event.ChangeListener, l);
}, "javax.swing.event.ChangeListener");
Clazz.defineMethod (c$, "removeChangeListener", 
function (l) {
this.listenerList.remove (javax.swing.event.ChangeListener, l);
}, "javax.swing.event.ChangeListener");
Clazz.defineMethod (c$, "getChangeListeners", 
function () {
return this.listenerList.getListeners (javax.swing.event.ChangeListener);
});
Clazz.defineMethod (c$, "fireStateChanged", 
function () {
var listeners = this.listenerList.getListenerList ();
for (var i = listeners.length - 2; i >= 0; i -= 2) {
if (listeners[i] === javax.swing.event.ChangeListener) {
if (this.changeEvent == null) this.changeEvent =  new javax.swing.event.ChangeEvent (this);
(listeners[i + 1]).stateChanged (this.changeEvent);
}}
});
Clazz.defineMethod (c$, "processMouseEvent", 
function (event) {
var screenX;
var screenY;
var p;
var i;
var j;
var d;
var mc;
var r2;
var cWidth;
var cHeight;
var menuElement;
var subElements;
var path;
var tmp;
var selectionSize;
p = event.getPoint ();
var source = event.getSource ();
if (!source.isShowing ()) {
return;
}var type = event.getID ();
var modifiers = event.getModifiers ();
if ((type == 504 || type == 505) && ((modifiers & (28)) != 0)) {
return;
}javax.swing.SwingUtilities.convertPointToScreen (p, source);
screenX = p.x;
screenY = p.y;
tmp = this.selection.clone ();
selectionSize = tmp.size ();
var success = false;
for (i = selectionSize - 1; i >= 0 && success == false; i--) {
menuElement = tmp.elementAt (i);
subElements = menuElement.getSubElements ();
path = null;
for (j = 0, d = subElements.length; j < d && success == false; j++) {
if (subElements[j] == null) continue;
mc = subElements[j].getComponent ();
if (!mc.isShowing ()) continue;
if (Clazz.instanceOf (mc, javax.swing.JComponent)) {
cWidth = (mc).getWidth ();
cHeight = (mc).getHeight ();
} else {
r2 = mc.getBounds ();
cWidth = r2.width;
cHeight = r2.height;
}p.x = screenX;
p.y = screenY;
javax.swing.SwingUtilities.convertPointFromScreen (p, mc);
if ((p.x >= 0 && p.x < cWidth && p.y >= 0 && p.y < cHeight)) {
var k;
if (path == null) {
path =  new Array (i + 2);
for (k = 0; k <= i; k++) path[k] = tmp.elementAt (k);

}path[i + 1] = subElements[j];
var currentSelection = this.getSelectedPath ();
if (currentSelection[currentSelection.length - 1] !== path[i + 1] && (currentSelection.length < 2 || currentSelection[currentSelection.length - 2] !== path[i + 1])) {
var oldMC = currentSelection[currentSelection.length - 1].getComponent ();
var exitEvent =  new java.awt.event.MouseEvent (oldMC, 505, event.getWhen (), event.getModifiers (), p.x, p.y, event.getXOnScreen (), event.getYOnScreen (), event.getClickCount (), event.isPopupTrigger (), 0);
currentSelection[currentSelection.length - 1].processMouseEvent (exitEvent, path, this);
var enterEvent =  new java.awt.event.MouseEvent (mc, 504, event.getWhen (), event.getModifiers (), p.x, p.y, event.getXOnScreen (), event.getYOnScreen (), event.getClickCount (), event.isPopupTrigger (), 0);
subElements[j].processMouseEvent (enterEvent, path, this);
}var mouseEvent =  new java.awt.event.MouseEvent (mc, event.getID (), event.getWhen (), event.getModifiers (), p.x, p.y, event.getXOnScreen (), event.getYOnScreen (), event.getClickCount (), event.isPopupTrigger (), 0);
subElements[j].processMouseEvent (mouseEvent, path, this);
success = true;
event.consume ();
}}
}
}, "java.awt.event.MouseEvent");
Clazz.defineMethod (c$, "componentForPoint", 
function (source, sourcePoint) {
var screenX;
var screenY;
var p = sourcePoint;
var i;
var j;
var d;
var mc;
var r2;
var cWidth;
var cHeight;
var menuElement;
var subElements;
var tmp;
var selectionSize;
javax.swing.SwingUtilities.convertPointToScreen (p, source);
screenX = p.x;
screenY = p.y;
tmp = this.selection.clone ();
selectionSize = tmp.size ();
for (i = selectionSize - 1; i >= 0; i--) {
menuElement = tmp.elementAt (i);
subElements = menuElement.getSubElements ();
for (j = 0, d = subElements.length; j < d; j++) {
if (subElements[j] == null) continue;
mc = subElements[j].getComponent ();
if (!mc.isShowing ()) continue;
if (Clazz.instanceOf (mc, javax.swing.JComponent)) {
cWidth = (mc).getWidth ();
cHeight = (mc).getHeight ();
} else {
r2 = mc.getBounds ();
cWidth = r2.width;
cHeight = r2.height;
}p.x = screenX;
p.y = screenY;
javax.swing.SwingUtilities.convertPointFromScreen (p, mc);
if (p.x >= 0 && p.x < cWidth && p.y >= 0 && p.y < cHeight) {
return mc;
}}
}
return null;
}, "java.awt.Component,java.awt.Point");
Clazz.defineMethod (c$, "processKeyEvent", 
function (e) {
var sel2 =  new Array (0);
sel2 = this.selection.toArray (sel2);
var selSize = sel2.length;
var path;
if (selSize < 1) {
return;
}for (var i = selSize - 1; i >= 0; i--) {
var elem = sel2[i];
var subs = elem.getSubElements ();
path = null;
for (var j = 0; j < subs.length; j++) {
if (subs[j] == null || !subs[j].getComponent ().isShowing () || !subs[j].getComponent ().isEnabled ()) {
continue;
}if (path == null) {
path =  new Array (i + 2);
System.arraycopy (sel2, 0, path, 0, i + 1);
}path[i + 1] = subs[j];
subs[j].processKeyEvent (e, path, this);
if (e.isConsumed ()) {
return;
}}
}
path =  new Array (1);
path[0] = sel2[0];
path[0].processKeyEvent (e, path, this);
if (e.isConsumed ()) {
return;
}}, "java.awt.event.KeyEvent");
Clazz.defineMethod (c$, "isComponentPartOfCurrentMenu", 
function (c) {
if (this.selection.size () > 0) {
var me = this.selection.elementAt (0);
return this.isComponentPartOfCurrentMenu (me, c);
} else return false;
}, "java.awt.Component");
Clazz.defineMethod (c$, "isComponentPartOfCurrentMenu", 
 function (root, c) {
var children;
var i;
var d;
if (root == null) return false;
if (root.getComponent () === c) return true;
 else {
children = root.getSubElements ();
for (i = 0, d = children.length; i < d; i++) {
if (this.isComponentPartOfCurrentMenu (children[i], c)) return true;
}
}return false;
}, "javax.swing.MenuElement,java.awt.Component");
c$.MENU_SELECTION_MANAGER_KEY = c$.prototype.MENU_SELECTION_MANAGER_KEY =  new Clazz._O ();
});

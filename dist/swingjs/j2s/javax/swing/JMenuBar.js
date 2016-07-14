Clazz.declarePackage ("javax.swing");
Clazz.load (["javax.swing.JComponent", "$.MenuElement"], "javax.swing.JMenuBar", ["java.lang.Error", "java.util.Vector", "java.awt.Insets", "javax.swing.DefaultSingleSelectionModel", "$.JMenu", "$.JPopupMenu", "$.KeyboardManager"], function () {
c$ = Clazz.decorateAsClass (function () {
this.selectionModel = null;
this.$paintBorder = false;
this.margin = null;
Clazz.instantialize (this, arguments);
}, javax.swing, "JMenuBar", javax.swing.JComponent, javax.swing.MenuElement);
Clazz.makeConstructor (c$, 
function () {
Clazz.superConstructor (this, javax.swing.JMenuBar);
this.setSelectionModel ( new javax.swing.DefaultSingleSelectionModel ());
this.uiClassID = "MenuBarUI";
this.updateUI ();
});
Clazz.defineMethod (c$, "getSelectionModel", 
function () {
return this.selectionModel;
});
Clazz.defineMethod (c$, "setSelectionModel", 
function (model) {
var oldValue = this.selectionModel;
this.selectionModel = model;
this.firePropertyChangeObject ("selectionModel", oldValue, this.selectionModel);
}, "javax.swing.SingleSelectionModel");
Clazz.defineMethod (c$, "add", 
function (c) {
Clazz.superCall (this, javax.swing.JMenuBar, "add", [c]);
return c;
}, "javax.swing.JMenu");
Clazz.defineMethod (c$, "getMenu", 
function (index) {
var c = this.getComponentAtIndex (index);
if (Clazz.instanceOf (c, javax.swing.JMenu)) return c;
return null;
}, "~N");
Clazz.defineMethod (c$, "getMenuCount", 
function () {
return this.getComponentCount ();
});
Clazz.defineMethod (c$, "setHelpMenu", 
function (menu) {
throw  new Error ("setHelpMenu() not yet implemented.");
}, "javax.swing.JMenu");
Clazz.defineMethod (c$, "getHelpMenu", 
function () {
throw  new Error ("getHelpMenu() not yet implemented.");
});
Clazz.defineMethod (c$, "getComponentAtIndex", 
function (i) {
if (i < 0 || i >= this.getComponentCount ()) {
return null;
}return this.getComponent (i);
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
Clazz.defineMethod (c$, "setSelected", 
function (sel) {
var model = this.getSelectionModel ();
var index = this.getComponentIndex (sel);
model.setSelectedIndex (index);
}, "java.awt.Component");
Clazz.defineMethod (c$, "isSelected", 
function () {
return this.selectionModel.isSelected ();
});
Clazz.defineMethod (c$, "isBorderPainted", 
function () {
return this.$paintBorder;
});
Clazz.defineMethod (c$, "setBorderPainted", 
function (b) {
{
}}, "~B");
Clazz.defineMethod (c$, "paintBorder", 
function (g) {
if (this.isBorderPainted ()) {
Clazz.superCall (this, javax.swing.JMenuBar, "paintBorder", [g]);
}}, "java.awt.Graphics");
Clazz.defineMethod (c$, "setMargin", 
function (m) {
var old = this.margin;
this.margin = m;
this.firePropertyChangeObject ("margin", old, m);
if (old == null || !old.equals (m)) {
this.revalidate ();
this.repaint ();
}}, "java.awt.Insets");
Clazz.defineMethod (c$, "getMargin", 
function () {
if (this.margin == null) {
return  new java.awt.Insets (0, 0, 0, 0);
} else {
return this.margin;
}});
Clazz.defineMethod (c$, "processMouseEvent", 
function (event, path, manager) {
}, "java.awt.event.MouseEvent,~A,javax.swing.MenuSelectionManager");
Clazz.defineMethod (c$, "processKeyEvent", 
function (e, path, manager) {
}, "java.awt.event.KeyEvent,~A,javax.swing.MenuSelectionManager");
Clazz.overrideMethod (c$, "menuSelectionChanged", 
function (isIncluded) {
}, "~B");
Clazz.defineMethod (c$, "getSubElements", 
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
Clazz.defineMethod (c$, "paramString", 
function () {
var paintBorderString = (this.$paintBorder ? "true" : "false");
var marginString = (this.margin != null ? this.margin.toString () : "");
return Clazz.superCall (this, javax.swing.JMenuBar, "paramString", []) + ",margin=" + marginString + ",paintBorder=" + paintBorderString;
});
Clazz.defineMethod (c$, "processKeyBinding", 
function (ks, e, condition, pressed) {
var retValue = Clazz.superCall (this, javax.swing.JMenuBar, "processKeyBinding", [ks, e, condition, pressed]);
if (!retValue) {
var subElements = this.getSubElements ();
for (var i = 0; i < subElements.length; i++) {
if (javax.swing.JMenuBar.processBindingForKeyStrokeRecursive (subElements[i], ks, e, condition, pressed)) {
return true;
}}
}return retValue;
}, "javax.swing.KeyStroke,java.awt.event.KeyEvent,~N,~B");
c$.processBindingForKeyStrokeRecursive = Clazz.defineMethod (c$, "processBindingForKeyStrokeRecursive", 
function (elem, ks, e, condition, pressed) {
if (elem == null) {
return false;
}var c = elem.getComponent ();
if (!(c.isVisible () || (Clazz.instanceOf (c, javax.swing.JPopupMenu))) || !c.isEnabled ()) {
return false;
}if (c != null && Clazz.instanceOf (c, javax.swing.JComponent) && (c).processKeyBinding (ks, e, condition, pressed)) {
return true;
}var subElements = elem.getSubElements ();
for (var i = 0; i < subElements.length; i++) {
if (javax.swing.JMenuBar.processBindingForKeyStrokeRecursive (subElements[i], ks, e, condition, pressed)) {
return true;
}}
return false;
}, "javax.swing.MenuElement,javax.swing.KeyStroke,java.awt.event.KeyEvent,~N,~B");
Clazz.defineMethod (c$, "addNotify", 
function () {
Clazz.superCall (this, javax.swing.JMenuBar, "addNotify", []);
javax.swing.KeyboardManager.getCurrentManager ().registerMenuBar (this);
});
Clazz.defineMethod (c$, "removeNotify", 
function () {
Clazz.superCall (this, javax.swing.JMenuBar, "removeNotify", []);
javax.swing.KeyboardManager.getCurrentManager ().unregisterMenuBar (this);
});
});

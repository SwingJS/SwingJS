Clazz.declarePackage ("jsjavax.swing");
Clazz.load (["jsjavax.swing.JComponent", "$.MenuElement"], "jsjavax.swing.JMenuBar", ["java.lang.Error", "java.util.Vector", "jsjava.awt.Insets", "jsjavax.swing.DefaultSingleSelectionModel", "$.JMenu", "$.JPopupMenu", "$.KeyboardManager", "$.UIManager"], function () {
c$ = Clazz.decorateAsClass (function () {
this.selectionModel = null;
this.$paintBorder = true;
this.margin = null;
Clazz.instantialize (this, arguments);
}, jsjavax.swing, "JMenuBar", jsjavax.swing.JComponent, jsjavax.swing.MenuElement);
Clazz.makeConstructor (c$, 
function () {
Clazz.superConstructor (this, jsjavax.swing.JMenuBar);
this.setSelectionModel ( new jsjavax.swing.DefaultSingleSelectionModel ());
this.updateUI ();
});
Clazz.defineMethod (c$, "getUI", 
function () {
return this.ui;
});
Clazz.overrideMethod (c$, "updateUI", 
function () {
this.setUI (jsjavax.swing.UIManager.getUI (this));
});
Clazz.overrideMethod (c$, "getUIClassID", 
function () {
return "MenuBarUI";
});
Clazz.defineMethod (c$, "getSelectionModel", 
function () {
return this.selectionModel;
});
Clazz.defineMethod (c$, "setSelectionModel", 
function (model) {
var oldValue = this.selectionModel;
this.selectionModel = model;
this.firePropertyChange ("selectionModel", oldValue, this.selectionModel);
}, "jsjavax.swing.SingleSelectionModel");
Clazz.defineMethod (c$, "add", 
function (c) {
Clazz.superCall (this, jsjavax.swing.JMenuBar, "add", [c]);
return c;
}, "jsjavax.swing.JMenu");
Clazz.defineMethod (c$, "getMenu", 
function (index) {
var c = this.getComponentAtIndex (index);
if (Clazz.instanceOf (c, jsjavax.swing.JMenu)) return c;
return null;
}, "~N");
Clazz.defineMethod (c$, "getMenuCount", 
function () {
return this.getComponentCount ();
});
Clazz.defineMethod (c$, "setHelpMenu", 
function (menu) {
throw  new Error ("setHelpMenu() not yet implemented.");
}, "jsjavax.swing.JMenu");
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
}, "jsjava.awt.Component");
Clazz.defineMethod (c$, "setSelected", 
function (sel) {
var model = this.getSelectionModel ();
var index = this.getComponentIndex (sel);
model.setSelectedIndex (index);
}, "jsjava.awt.Component");
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
var oldValue = this.$paintBorder;
this.$paintBorder = b;
this.firePropertyChange ("borderPainted", oldValue, this.$paintBorder);
if (b != oldValue) {
this.revalidate ();
this.repaint ();
}}, "~B");
Clazz.defineMethod (c$, "paintBorder", 
function (g) {
if (this.isBorderPainted ()) {
Clazz.superCall (this, jsjavax.swing.JMenuBar, "paintBorder", [g]);
}}, "jsjava.awt.Graphics");
Clazz.defineMethod (c$, "setMargin", 
function (m) {
var old = this.margin;
this.margin = m;
this.firePropertyChange ("margin", old, m);
if (old == null || !old.equals (m)) {
this.revalidate ();
this.repaint ();
}}, "jsjava.awt.Insets");
Clazz.defineMethod (c$, "getMargin", 
function () {
if (this.margin == null) {
return  new jsjava.awt.Insets (0, 0, 0, 0);
} else {
return this.margin;
}});
Clazz.defineMethod (c$, "processMouseEvent", 
function (event, path, manager) {
}, "jsjava.awt.event.MouseEvent,~A,jsjavax.swing.MenuSelectionManager");
Clazz.defineMethod (c$, "processKeyEvent", 
function (e, path, manager) {
}, "jsjava.awt.event.KeyEvent,~A,jsjavax.swing.MenuSelectionManager");
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
if (Clazz.instanceOf (m, jsjavax.swing.MenuElement)) tmp.addElement (m);
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
return Clazz.superCall (this, jsjavax.swing.JMenuBar, "paramString", []) + ",margin=" + marginString + ",paintBorder=" + paintBorderString;
});
Clazz.defineMethod (c$, "processKeyBinding", 
function (ks, e, condition, pressed) {
var retValue = Clazz.superCall (this, jsjavax.swing.JMenuBar, "processKeyBinding", [ks, e, condition, pressed]);
if (!retValue) {
var subElements = this.getSubElements ();
for (var i = 0; i < subElements.length; i++) {
if (jsjavax.swing.JMenuBar.processBindingForKeyStrokeRecursive (subElements[i], ks, e, condition, pressed)) {
return true;
}}
}return retValue;
}, "jsjavax.swing.KeyStroke,jsjava.awt.event.KeyEvent,~N,~B");
c$.processBindingForKeyStrokeRecursive = Clazz.defineMethod (c$, "processBindingForKeyStrokeRecursive", 
function (elem, ks, e, condition, pressed) {
if (elem == null) {
return false;
}var c = elem.getComponent ();
if (!(c.isVisible () || (Clazz.instanceOf (c, jsjavax.swing.JPopupMenu))) || !c.isEnabled ()) {
return false;
}if (c != null && Clazz.instanceOf (c, jsjavax.swing.JComponent) && (c).processKeyBinding (ks, e, condition, pressed)) {
return true;
}var subElements = elem.getSubElements ();
for (var i = 0; i < subElements.length; i++) {
if (jsjavax.swing.JMenuBar.processBindingForKeyStrokeRecursive (subElements[i], ks, e, condition, pressed)) {
return true;
}}
return false;
}, "jsjavax.swing.MenuElement,jsjavax.swing.KeyStroke,jsjava.awt.event.KeyEvent,~N,~B");
Clazz.defineMethod (c$, "addNotify", 
function () {
Clazz.superCall (this, jsjavax.swing.JMenuBar, "addNotify", []);
jsjavax.swing.KeyboardManager.getCurrentManager ().registerMenuBar (this);
});
Clazz.defineMethod (c$, "removeNotify", 
function () {
Clazz.superCall (this, jsjavax.swing.JMenuBar, "removeNotify", []);
jsjavax.swing.KeyboardManager.getCurrentManager ().unregisterMenuBar (this);
});
Clazz.defineStatics (c$,
"$uiClassID", "MenuBarUI");
});

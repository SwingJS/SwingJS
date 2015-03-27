Clazz.declarePackage ("jsjavax.swing");
Clazz.load (["jsjavax.swing.AbstractButton"], "jsjavax.swing.JButton", ["jsjavax.swing.DefaultButtonModel", "$.SwingUtilities", "$.UIManager"], function () {
c$ = Clazz.declareType (jsjavax.swing, "JButton", jsjavax.swing.AbstractButton);
Clazz.makeConstructor (c$, 
function () {
this.construct (null, null);
});
Clazz.makeConstructor (c$, 
function (icon) {
this.construct (null, icon);
}, "jsjavax.swing.Icon");
Clazz.makeConstructor (c$, 
function (text) {
this.construct (text, null);
}, "~S");
Clazz.makeConstructor (c$, 
function (a) {
this.construct ();
this.setAction (a);
}, "jsjavax.swing.Action");
Clazz.makeConstructor (c$, 
function (text, icon) {
Clazz.superConstructor (this, jsjavax.swing.JButton, []);
this.setModel ( new jsjavax.swing.DefaultButtonModel ());
this.init (text, icon);
}, "~S,jsjavax.swing.Icon");
Clazz.overrideMethod (c$, "updateUI", 
function () {
this.setUI (jsjavax.swing.UIManager.getUI (this));
});
Clazz.overrideMethod (c$, "getUIClassID", 
function () {
return "ButtonUI";
});
Clazz.defineMethod (c$, "isDefaultButton", 
function () {
var root = jsjavax.swing.SwingUtilities.getRootPane (this);
if (root != null) {
return root.getDefaultButton () === this;
}return false;
});
Clazz.defineMethod (c$, "isDefaultCapable", 
function () {
return this.defaultCapable;
});
Clazz.defineMethod (c$, "setDefaultCapable", 
function (defaultCapable) {
var oldDefaultCapable = this.defaultCapable;
this.defaultCapable = defaultCapable;
this.firePropertyChange ("defaultCapable", oldDefaultCapable, defaultCapable);
}, "~B");
Clazz.defineMethod (c$, "removeNotify", 
function () {
var root = jsjavax.swing.SwingUtilities.getRootPane (this);
if (root != null && root.getDefaultButton () === this) {
root.setDefaultButton (null);
}Clazz.superCall (this, jsjavax.swing.JButton, "removeNotify", []);
});
Clazz.defineMethod (c$, "paramString", 
function () {
var defaultCapableString = (this.defaultCapable ? "true" : "false");
return Clazz.superCall (this, jsjavax.swing.JButton, "paramString", []) + ",defaultCapable=" + defaultCapableString;
});
Clazz.defineStatics (c$,
"$uiClassID", "ButtonUI");
});

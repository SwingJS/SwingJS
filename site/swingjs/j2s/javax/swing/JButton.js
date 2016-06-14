Clazz.declarePackage ("javax.swing");
Clazz.load (["javax.swing.AbstractButton"], "javax.swing.JButton", ["javax.swing.DefaultButtonModel", "$.SwingUtilities", "$.UIManager"], function () {
c$ = Clazz.declareType (javax.swing, "JButton", javax.swing.AbstractButton);
Clazz.makeConstructor (c$, 
function () {
this.construct (null, null);
});
Clazz.makeConstructor (c$, 
function (icon) {
this.construct (null, icon);
}, "javax.swing.Icon");
Clazz.makeConstructor (c$, 
function (text) {
this.construct (text, null);
}, "~S");
Clazz.makeConstructor (c$, 
function (a) {
this.construct ();
this.setAction (a);
}, "javax.swing.Action");
Clazz.makeConstructor (c$, 
function (text, icon) {
Clazz.superConstructor (this, javax.swing.JButton, []);
this.setModel ( new javax.swing.DefaultButtonModel ());
this.init (text, icon);
}, "~S,javax.swing.Icon");
Clazz.overrideMethod (c$, "updateUI", 
function () {
this.setUI (javax.swing.UIManager.getUI (this));
});
Clazz.overrideMethod (c$, "getUIClassID", 
function () {
return "ButtonUI";
});
Clazz.defineMethod (c$, "isDefaultButton", 
function () {
var root = javax.swing.SwingUtilities.getRootPane (this);
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
this.firePropertyChangeBool ("defaultCapable", oldDefaultCapable, defaultCapable);
}, "~B");
Clazz.defineMethod (c$, "removeNotify", 
function () {
var root = javax.swing.SwingUtilities.getRootPane (this);
if (root != null && root.getDefaultButton () === this) {
root.setDefaultButton (null);
}Clazz.superCall (this, javax.swing.JButton, "removeNotify", []);
});
Clazz.defineMethod (c$, "paramString", 
function () {
var defaultCapableString = (this.defaultCapable ? "true" : "false");
return Clazz.superCall (this, javax.swing.JButton, "paramString", []) + ",defaultCapable=" + defaultCapableString;
});
Clazz.defineStatics (c$,
"$uiClassID", "ButtonUI");
});

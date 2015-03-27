Clazz.declarePackage ("jsjavax.swing");
Clazz.load (["jsjavax.swing.JComponent"], "jsjavax.swing.JToolTip", ["jsjavax.swing.UIManager"], function () {
c$ = Clazz.decorateAsClass (function () {
this.tipText = null;
this.$component = null;
Clazz.instantialize (this, arguments);
}, jsjavax.swing, "JToolTip", jsjavax.swing.JComponent);
Clazz.makeConstructor (c$, 
function () {
Clazz.superConstructor (this, jsjavax.swing.JToolTip, []);
this.setOpaque (true);
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
return "ToolTipUI";
});
Clazz.defineMethod (c$, "setTipText", 
function (tipText) {
var oldValue = this.tipText;
this.tipText = tipText;
this.firePropertyChange ("tiptext", oldValue, tipText);
}, "~S");
Clazz.defineMethod (c$, "getTipText", 
function () {
return this.tipText;
});
Clazz.defineMethod (c$, "setComponent", 
function (c) {
var oldValue = this.$component;
this.$component = c;
this.firePropertyChange ("component", oldValue, c);
}, "jsjavax.swing.JComponent");
Clazz.defineMethod (c$, "getComponent", 
function () {
return this.$component;
});
Clazz.overrideMethod (c$, "alwaysOnTop", 
function () {
return true;
});
Clazz.defineMethod (c$, "paramString", 
function () {
var tipTextString = (this.tipText != null ? this.tipText : "");
return Clazz.superCall (this, jsjavax.swing.JToolTip, "paramString", []) + ",tipText=" + tipTextString;
});
Clazz.defineStatics (c$,
"$uiClassID", "ToolTipUI");
});

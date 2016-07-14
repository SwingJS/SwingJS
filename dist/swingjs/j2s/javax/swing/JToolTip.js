Clazz.declarePackage ("javax.swing");
Clazz.load (["javax.swing.JComponent"], "javax.swing.JToolTip", null, function () {
c$ = Clazz.decorateAsClass (function () {
this.tipText = null;
this.component = null;
Clazz.instantialize (this, arguments);
}, javax.swing, "JToolTip", javax.swing.JComponent);
Clazz.makeConstructor (c$, 
function () {
Clazz.superConstructor (this, javax.swing.JToolTip, []);
this.setOpaque (true);
this.uiClassID = "ToolTipUI";
this.updateUI ();
});
Clazz.defineMethod (c$, "setTipText", 
function (tipText) {
var oldValue = this.tipText;
this.tipText = tipText;
this.firePropertyChangeObject ("tiptext", oldValue, tipText);
}, "~S");
Clazz.defineMethod (c$, "getTipText", 
function () {
return this.tipText;
});
Clazz.defineMethod (c$, "setComponent", 
function (c) {
var oldValue = this.component;
this.component = c;
this.firePropertyChangeObject ("component", oldValue, c);
}, "javax.swing.JComponent");
Clazz.defineMethod (c$, "getComponent", 
function () {
return this.component;
});
Clazz.overrideMethod (c$, "alwaysOnTop", 
function () {
return true;
});
Clazz.defineMethod (c$, "paramString", 
function () {
var tipTextString = (this.tipText != null ? this.tipText : "");
return Clazz.superCall (this, javax.swing.JToolTip, "paramString", []) + ",tipText=" + tipTextString;
});
});

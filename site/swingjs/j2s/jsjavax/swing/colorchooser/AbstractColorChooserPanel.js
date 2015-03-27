Clazz.declarePackage ("jsjavax.swing.colorchooser");
Clazz.load (["jsjavax.swing.JPanel", "jsjavax.swing.event.ChangeListener"], "jsjavax.swing.colorchooser.AbstractColorChooserPanel", ["java.lang.RuntimeException", "jsjavax.swing.UIManager"], function () {
c$ = Clazz.decorateAsClass (function () {
this.chooser = null;
this.colorListener = null;
this.dirty = true;
if (!Clazz.isClassDefined ("jsjavax.swing.colorchooser.AbstractColorChooserPanel.ModelListener")) {
jsjavax.swing.colorchooser.AbstractColorChooserPanel.$AbstractColorChooserPanel$ModelListener$ ();
}
Clazz.instantialize (this, arguments);
}, jsjavax.swing.colorchooser, "AbstractColorChooserPanel", jsjavax.swing.JPanel);
Clazz.defineMethod (c$, "getMnemonic", 
function () {
return 0;
});
Clazz.defineMethod (c$, "getDisplayedMnemonicIndex", 
function () {
return -1;
});
Clazz.defineMethod (c$, "installChooserPanel", 
function (enclosingChooser) {
if (this.chooser != null) {
throw  new RuntimeException ("This chooser panel is already installed");
}this.chooser = enclosingChooser;
this.buildChooser ();
this.updateChooser ();
this.colorListener = Clazz.innerTypeInstance (jsjavax.swing.colorchooser.AbstractColorChooserPanel.ModelListener, this, null);
this.getColorSelectionModel ().addChangeListener (this.colorListener);
}, "jsjavax.swing.JColorChooser");
Clazz.defineMethod (c$, "uninstallChooserPanel", 
function (enclosingChooser) {
this.getColorSelectionModel ().removeChangeListener (this.colorListener);
this.chooser = null;
}, "jsjavax.swing.JColorChooser");
Clazz.defineMethod (c$, "getColorSelectionModel", 
function () {
return this.chooser.getSelectionModel ();
});
Clazz.defineMethod (c$, "getColorFromModel", 
function () {
return this.getColorSelectionModel ().getSelectedColor ();
});
Clazz.defineMethod (c$, "paint", 
function (g) {
if (this.dirty) {
this.updateChooser ();
this.dirty = false;
}Clazz.superCall (this, jsjavax.swing.colorchooser.AbstractColorChooserPanel, "paint", [g]);
}, "jsjava.awt.Graphics");
c$.getInt = Clazz.defineMethod (c$, "getInt", 
function (key, defaultValue) {
var value = jsjavax.swing.UIManager.get (key);
if (Clazz.instanceOf (value, Integer)) {
return (value).intValue ();
}if (Clazz.instanceOf (value, String)) {
try {
return Integer.parseInt (value);
} catch (nfe) {
if (Clazz.exceptionOf (nfe, NumberFormatException)) {
} else {
throw nfe;
}
}
}return defaultValue;
}, "~O,~N");
c$.$AbstractColorChooserPanel$ModelListener$ = function () {
Clazz.pu$h ();
c$ = Clazz.decorateAsClass (function () {
Clazz.prepareCallback (this, arguments);
Clazz.instantialize (this, arguments);
}, jsjavax.swing.colorchooser.AbstractColorChooserPanel, "ModelListener", null, jsjavax.swing.event.ChangeListener);
Clazz.overrideMethod (c$, "stateChanged", 
function (a) {
if (this.b$["jsjavax.swing.colorchooser.AbstractColorChooserPanel"].isShowing ()) {
this.b$["jsjavax.swing.colorchooser.AbstractColorChooserPanel"].updateChooser ();
this.b$["jsjavax.swing.colorchooser.AbstractColorChooserPanel"].dirty = false;
} else {
this.b$["jsjavax.swing.colorchooser.AbstractColorChooserPanel"].dirty = true;
}}, "jsjavax.swing.event.ChangeEvent");
c$ = Clazz.p0p ();
};
});

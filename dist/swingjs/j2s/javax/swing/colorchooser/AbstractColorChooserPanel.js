Clazz.declarePackage ("javax.swing.colorchooser");
Clazz.load (["javax.swing.JPanel", "javax.swing.event.ChangeListener"], "javax.swing.colorchooser.AbstractColorChooserPanel", ["java.lang.RuntimeException", "javax.swing.UIManager"], function () {
c$ = Clazz.decorateAsClass (function () {
this.chooser = null;
this.colorListener = null;
this.dirty = true;
if (!Clazz.isClassDefined ("javax.swing.colorchooser.AbstractColorChooserPanel.ModelListener")) {
javax.swing.colorchooser.AbstractColorChooserPanel.$AbstractColorChooserPanel$ModelListener$ ();
}
Clazz.instantialize (this, arguments);
}, javax.swing.colorchooser, "AbstractColorChooserPanel", javax.swing.JPanel);
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
this.colorListener = Clazz.innerTypeInstance (javax.swing.colorchooser.AbstractColorChooserPanel.ModelListener, this, null);
this.getColorSelectionModel ().addChangeListener (this.colorListener);
}, "javax.swing.JColorChooser");
Clazz.defineMethod (c$, "uninstallChooserPanel", 
function (enclosingChooser) {
this.getColorSelectionModel ().removeChangeListener (this.colorListener);
this.chooser = null;
}, "javax.swing.JColorChooser");
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
}Clazz.superCall (this, javax.swing.colorchooser.AbstractColorChooserPanel, "paint", [g]);
}, "java.awt.Graphics");
c$.getInt = Clazz.defineMethod (c$, "getInt", 
function (key, defaultValue) {
var value = javax.swing.UIManager.get (key);
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
Clazz.pu$h(self.c$);
c$ = Clazz.decorateAsClass (function () {
Clazz.prepareCallback (this, arguments);
Clazz.instantialize (this, arguments);
}, javax.swing.colorchooser.AbstractColorChooserPanel, "ModelListener", null, javax.swing.event.ChangeListener);
Clazz.overrideMethod (c$, "stateChanged", 
function (a) {
if (this.b$["javax.swing.colorchooser.AbstractColorChooserPanel"].isShowing ()) {
this.b$["javax.swing.colorchooser.AbstractColorChooserPanel"].updateChooser ();
this.b$["javax.swing.colorchooser.AbstractColorChooserPanel"].dirty = false;
} else {
this.b$["javax.swing.colorchooser.AbstractColorChooserPanel"].dirty = true;
}}, "javax.swing.event.ChangeEvent");
c$ = Clazz.p0p ();
};
});

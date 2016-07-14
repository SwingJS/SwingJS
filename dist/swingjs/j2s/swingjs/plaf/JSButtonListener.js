Clazz.declarePackage ("swingjs.plaf");
Clazz.load (["java.awt.event.FocusListener", "$.MouseListener", "$.MouseMotionListener", "java.beans.PropertyChangeListener", "javax.swing.event.ChangeListener", "sun.swing.UIAction"], "swingjs.plaf.JSButtonListener", ["javax.swing.AbstractButton", "$.KeyStroke", "$.SwingUtilities", "javax.swing.plaf.ComponentInputMapUIResource", "swingjs.plaf.LazyActionMap"], function () {
c$ = Clazz.decorateAsClass (function () {
this.btn = null;
Clazz.instantialize (this, arguments);
}, swingjs.plaf, "JSButtonListener", null, [java.awt.event.MouseListener, java.awt.event.MouseMotionListener, java.awt.event.FocusListener, javax.swing.event.ChangeListener, java.beans.PropertyChangeListener]);
c$.loadActionMap = Clazz.defineMethod (c$, "loadActionMap", 
function (map) {
map.put ( new swingjs.plaf.JSButtonListener.Actions ("pressed"));
map.put ( new swingjs.plaf.JSButtonListener.Actions ("released"));
}, "swingjs.plaf.LazyActionMap");
Clazz.makeConstructor (c$, 
function (b, isMenuItem) {
this.btn = b;
}, "javax.swing.AbstractButton,~B");
Clazz.overrideMethod (c$, "propertyChange", 
function (e) {
var prop = e.getPropertyName ();
if (prop === "mnemonic") {
this.updateMnemonicBinding (e.getSource ());
} else if (prop === "contentAreaFilled") {
this.checkOpacity (e.getSource ());
} else if ("font" === prop || "foreground" === prop || swingjs.plaf.JSButtonListener.labelprops.indexOf (prop) >= 0) {
var b = e.getSource ();
(b.getUI ()).notifyPropertyChanged (prop);
}}, "java.beans.PropertyChangeEvent");
Clazz.defineMethod (c$, "checkOpacity", 
function (b) {
b.setOpaque (b.isContentAreaFilled ());
}, "javax.swing.AbstractButton");
Clazz.defineMethod (c$, "installKeyboardActions", 
function (c) {
var b = c;
this.updateMnemonicBinding (b);
swingjs.plaf.LazyActionMap.installLazyActionMap (c, swingjs.plaf.JSButtonListener, "Button.actionMap");
var km = this.getInputMap (0, c);
javax.swing.SwingUtilities.replaceUIInputMap (c, 0, km);
}, "javax.swing.JComponent");
Clazz.defineMethod (c$, "uninstallKeyboardActions", 
function (c) {
javax.swing.SwingUtilities.replaceUIInputMap (c, 2, null);
javax.swing.SwingUtilities.replaceUIInputMap (c, 0, null);
javax.swing.SwingUtilities.replaceUIActionMap (c, null);
}, "javax.swing.JComponent");
Clazz.defineMethod (c$, "getInputMap", 
function (condition, c) {
return null;
}, "~N,javax.swing.JComponent");
Clazz.defineMethod (c$, "updateMnemonicBinding", 
function (b) {
var m = b.getMnemonic ();
if (m != 0) {
var map = javax.swing.SwingUtilities.getUIInputMap (b, 2);
if (map == null) {
map =  new javax.swing.plaf.ComponentInputMapUIResource (b);
javax.swing.SwingUtilities.replaceUIInputMap (b, 2, map);
}map.clear ();
map.put (javax.swing.KeyStroke.getKeyStroke (m, 8, false), "pressed");
map.put (javax.swing.KeyStroke.getKeyStroke (m, 8, true), "released");
map.put (javax.swing.KeyStroke.getKeyStroke (m, 0, true), "released");
} else {
var map = javax.swing.SwingUtilities.getUIInputMap (b, 2);
if (map != null) {
map.clear ();
}}}, "javax.swing.AbstractButton");
Clazz.overrideMethod (c$, "stateChanged", 
function (e) {
var b = e.getSource ();
this.verifyButtonClick (b);
}, "javax.swing.event.ChangeEvent");
Clazz.overrideMethod (c$, "focusGained", 
function (e) {
}, "java.awt.event.FocusEvent");
Clazz.overrideMethod (c$, "focusLost", 
function (e) {
var b = e.getSource ();
var model = b.getModel ();
model.setArmed (false);
model.setPressed (false);
}, "java.awt.event.FocusEvent");
Clazz.overrideMethod (c$, "mouseMoved", 
function (e) {
}, "java.awt.event.MouseEvent");
Clazz.overrideMethod (c$, "mouseDragged", 
function (e) {
}, "java.awt.event.MouseEvent");
Clazz.overrideMethod (c$, "mouseClicked", 
function (e) {
}, "java.awt.event.MouseEvent");
Clazz.overrideMethod (c$, "mousePressed", 
function (e) {
}, "java.awt.event.MouseEvent");
Clazz.overrideMethod (c$, "mouseReleased", 
function (e) {
if (javax.swing.SwingUtilities.isLeftMouseButton (e)) {
var b = e.getSource ();
b.doClick (0);
this.verifyButtonClick (b);
}}, "java.awt.event.MouseEvent");
Clazz.defineMethod (c$, "verifyButtonClick", 
function (b) {
var ui = b.getUI ();
var m = b.getModel ();
var btn = ui.domBtn;
var state = m.isSelected () && !ui.isRadio;
{
setTimeout(function(){btn && (btn.checked = state)}, 0);
}return true;
}, "javax.swing.AbstractButton");
Clazz.overrideMethod (c$, "mouseEntered", 
function (e) {
var b = e.getSource ();
var model = b.getModel ();
if (b.isRolloverEnabled () && !javax.swing.SwingUtilities.isLeftMouseButton (e)) {
model.setRollover (true);
}if (model.isPressed ()) model.setArmed (true);
}, "java.awt.event.MouseEvent");
Clazz.overrideMethod (c$, "mouseExited", 
function (e) {
var b = e.getSource ();
var model = b.getModel ();
if (b.isRolloverEnabled ()) {
model.setRollover (false);
}model.setArmed (false);
}, "java.awt.event.MouseEvent");
Clazz.pu$h(self.c$);
c$ = Clazz.declareType (swingjs.plaf.JSButtonListener, "Actions", sun.swing.UIAction);
Clazz.overrideMethod (c$, "actionPerformed", 
function (a) {
var b = a.getSource ();
var c = this.getName ();
if (c === "pressed") {
var d = b.getModel ();
d.setArmed (true);
d.setPressed (true);
if (!b.hasFocus ()) {
b.requestFocus ();
}} else if (c === "released") {
var d = b.getModel ();
d.setPressed (false);
d.setArmed (false);
}}, "java.awt.event.ActionEvent");
Clazz.defineMethod (c$, "isEnabled", 
function (a) {
if (a != null && (Clazz.instanceOf (a, javax.swing.AbstractButton)) && !(a).getModel ().isEnabled ()) {
return false;
} else {
return true;
}}, "~O");
Clazz.defineStatics (c$,
"PRESS", "pressed",
"RELEASE", "released");
c$ = Clazz.p0p ();
c$.labelprops = c$.prototype.labelprops = ";text;margin;verticalAlignment;horizontalAlignment;verticalTextPosition;horizontalTextPosition";
});

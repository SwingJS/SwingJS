Clazz.declarePackage ("jsjavax.swing");
Clazz.load (["jsjavax.swing.JOptionPane"], "jsjavax.swing.ProgressMonitor", ["jsjava.awt.BorderLayout", "$.Frame", "jsjava.awt.event.WindowAdapter", "jsjava.beans.PropertyChangeListener", "jsjavax.swing.JDialog", "$.JLabel", "$.JProgressBar", "$.SwingUtilities", "jsjavax.swing.SwingUtilities.SharedOwnerFrame", "jsjavax.swing.UIManager"], function () {
c$ = Clazz.decorateAsClass (function () {
this.root = null;
this.dialog = null;
this.pane = null;
this.myBar = null;
this.noteLabel = null;
this.parentComponent = null;
this.note = null;
this.cancelOption = null;
this.message = null;
this.T0 = 0;
this.millisToDecideToPopup = 500;
this.millisToPopup = 2000;
this.min = 0;
this.max = 0;
if (!Clazz.isClassDefined ("jsjavax.swing.ProgressMonitor.ProgressOptionPane")) {
jsjavax.swing.ProgressMonitor.$ProgressMonitor$ProgressOptionPane$ ();
}
Clazz.instantialize (this, arguments);
}, jsjavax.swing, "ProgressMonitor");
Clazz.makeConstructor (c$, 
function (parentComponent, message, note, min, max) {
this.construct (parentComponent, message, note, min, max, null);
}, "jsjava.awt.Component,~O,~S,~N,~N");
Clazz.makeConstructor (c$, 
($fz = function (parentComponent, message, note, min, max, group) {
this.min = min;
this.max = max;
this.parentComponent = parentComponent;
this.cancelOption =  new Array (1);
this.cancelOption[0] = jsjavax.swing.UIManager.getString ("OptionPane.cancelButtonText");
this.message = message;
this.note = note;
if (group != null) {
this.root = (group.root != null) ? group.root : group;
this.T0 = this.root.T0;
this.dialog = this.root.dialog;
} else {
this.T0 = System.currentTimeMillis ();
}}, $fz.isPrivate = true, $fz), "jsjava.awt.Component,~O,~S,~N,~N,jsjavax.swing.ProgressMonitor");
Clazz.defineMethod (c$, "setProgress", 
function (nv) {
if (nv >= this.max) {
this.close ();
} else {
if (this.myBar != null) {
this.myBar.setValue (nv);
} else {
var T = System.currentTimeMillis ();
var dT = (T - this.T0);
if (dT >= this.millisToDecideToPopup) {
var predictedCompletionTime;
if (nv > this.min) {
predictedCompletionTime = (Clazz.doubleToInt (dT * (this.max - this.min) / (nv - this.min)));
} else {
predictedCompletionTime = this.millisToPopup;
}if (predictedCompletionTime >= this.millisToPopup) {
this.myBar =  new jsjavax.swing.JProgressBar ();
this.myBar.setMinimum (this.min);
this.myBar.setMaximum (this.max);
this.myBar.setValue (nv);
if (this.note != null) this.noteLabel =  new jsjavax.swing.JLabel (this.note);
this.pane = Clazz.innerTypeInstance (jsjavax.swing.ProgressMonitor.ProgressOptionPane, this, null,  Clazz.newArray (-1, [this.message, this.noteLabel, this.myBar]));
this.dialog = this.pane.createDialog (this.parentComponent, jsjavax.swing.UIManager.getString ("ProgressMonitor.progressText"));
this.dialog.show ();
}}}}}, "~N");
Clazz.defineMethod (c$, "close", 
function () {
if (this.dialog != null) {
this.dialog.setVisible (false);
this.dialog.dispose ();
this.dialog = null;
this.pane = null;
this.myBar = null;
}});
Clazz.defineMethod (c$, "getMinimum", 
function () {
return this.min;
});
Clazz.defineMethod (c$, "setMinimum", 
function (m) {
if (this.myBar != null) {
this.myBar.setMinimum (m);
}this.min = m;
}, "~N");
Clazz.defineMethod (c$, "getMaximum", 
function () {
return this.max;
});
Clazz.defineMethod (c$, "setMaximum", 
function (m) {
if (this.myBar != null) {
this.myBar.setMaximum (m);
}this.max = m;
}, "~N");
Clazz.defineMethod (c$, "isCanceled", 
function () {
if (this.pane == null) return false;
var v = this.pane.getValue ();
return ((v != null) && (this.cancelOption.length == 1) && (v.equals (this.cancelOption[0])));
});
Clazz.defineMethod (c$, "setMillisToDecideToPopup", 
function (millisToDecideToPopup) {
this.millisToDecideToPopup = millisToDecideToPopup;
}, "~N");
Clazz.defineMethod (c$, "getMillisToDecideToPopup", 
function () {
return this.millisToDecideToPopup;
});
Clazz.defineMethod (c$, "setMillisToPopup", 
function (millisToPopup) {
this.millisToPopup = millisToPopup;
}, "~N");
Clazz.defineMethod (c$, "getMillisToPopup", 
function () {
return this.millisToPopup;
});
Clazz.defineMethod (c$, "setNote", 
function (note) {
this.note = note;
if (this.noteLabel != null) {
this.noteLabel.setText (note);
}}, "~S");
Clazz.defineMethod (c$, "getNote", 
function () {
return this.note;
});
c$.$ProgressMonitor$ProgressOptionPane$ = function () {
Clazz.pu$h ();
c$ = Clazz.decorateAsClass (function () {
Clazz.prepareCallback (this, arguments);
Clazz.instantialize (this, arguments);
}, jsjavax.swing.ProgressMonitor, "ProgressOptionPane", jsjavax.swing.JOptionPane);
Clazz.makeConstructor (c$, 
function (a) {
Clazz.superConstructor (this, jsjavax.swing.ProgressMonitor.ProgressOptionPane, [a, 1, -1, null, this.b$["jsjavax.swing.ProgressMonitor"].cancelOption, null]);
}, "~O");
Clazz.overrideMethod (c$, "getMaxCharactersPerLineCount", 
function () {
return 60;
});
Clazz.defineMethod (c$, "createDialog", 
function (a, b) {
var $private = Clazz.checkPrivateMethod (arguments);
if ($private != null) {
return $private.apply (this, arguments);
}
var c;
var d = jsjavax.swing.JOptionPane.getWindowForComponent (a);
if (Clazz.instanceOf (d, jsjava.awt.Frame)) {
c =  new jsjavax.swing.JDialog (d, b, false);
} else {
c =  new jsjavax.swing.JDialog (d, b, false);
}if (Clazz.instanceOf (d, jsjavax.swing.SwingUtilities.SharedOwnerFrame)) {
var e = jsjavax.swing.SwingUtilities.getSharedOwnerFrameShutdownListener ();
c.addWindowListener (e);
}var e = c.getContentPane ();
e.setLayout ( new jsjava.awt.BorderLayout ());
e.add (this, "Center");
c.pack ();
c.setLocationRelativeTo (a);
c.addWindowListener (((Clazz.isClassDefined ("jsjavax.swing.ProgressMonitor$ProgressOptionPane$1") ? 0 : jsjavax.swing.ProgressMonitor.ProgressOptionPane.$ProgressMonitor$ProgressOptionPane$1$ ()), Clazz.innerTypeInstance (jsjavax.swing.ProgressMonitor$ProgressOptionPane$1, this, null)));
this.addPropertyChangeListener (((Clazz.isClassDefined ("jsjavax.swing.ProgressMonitor$ProgressOptionPane$2") ? 0 : jsjavax.swing.ProgressMonitor.ProgressOptionPane.$ProgressMonitor$ProgressOptionPane$2$ ()), Clazz.innerTypeInstance (jsjavax.swing.ProgressMonitor$ProgressOptionPane$2, this, Clazz.cloneFinals ("c", c))));
return c;
}, "jsjava.awt.Component,~S");
c$.$ProgressMonitor$ProgressOptionPane$1$ = function () {
Clazz.pu$h ();
c$ = Clazz.decorateAsClass (function () {
Clazz.prepareCallback (this, arguments);
this.gotFocus = false;
Clazz.instantialize (this, arguments);
}, jsjavax.swing, "ProgressMonitor$ProgressOptionPane$1", jsjava.awt.event.WindowAdapter);
Clazz.overrideMethod (c$, "windowClosing", 
function (a) {
this.b$["jsjavax.swing.ProgressMonitor.ProgressOptionPane"].setValue (this.b$["jsjavax.swing.ProgressMonitor"].cancelOption[0]);
}, "jsjava.awt.event.WindowEvent");
Clazz.overrideMethod (c$, "windowActivated", 
function (a) {
if (!this.gotFocus) {
this.b$["jsjavax.swing.ProgressMonitor.ProgressOptionPane"].selectInitialValue ();
this.gotFocus = true;
}}, "jsjava.awt.event.WindowEvent");
c$ = Clazz.p0p ();
};
c$.$ProgressMonitor$ProgressOptionPane$2$ = function () {
Clazz.pu$h ();
c$ = Clazz.declareAnonymous (jsjavax.swing, "ProgressMonitor$ProgressOptionPane$2", null, jsjava.beans.PropertyChangeListener);
Clazz.overrideMethod (c$, "propertyChange", 
function (a) {
if (this.f$.c.isVisible () && a.getSource () === this.b$["jsjavax.swing.ProgressMonitor.ProgressOptionPane"] && (a.getPropertyName ().equals ("value") || a.getPropertyName ().equals ("inputValue"))) {
this.f$.c.setVisible (false);
this.f$.c.dispose ();
}}, "jsjava.beans.PropertyChangeEvent");
c$ = Clazz.p0p ();
};
c$ = Clazz.p0p ();
};
});

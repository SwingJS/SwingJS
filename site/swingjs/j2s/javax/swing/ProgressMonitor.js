Clazz.declarePackage ("javax.swing");
Clazz.load (["javax.swing.JOptionPane"], "javax.swing.ProgressMonitor", ["java.awt.BorderLayout", "$.Frame", "java.awt.event.WindowAdapter", "java.beans.PropertyChangeListener", "javax.swing.JDialog", "$.JLabel", "$.JProgressBar", "$.SwingUtilities", "javax.swing.SwingUtilities.SharedOwnerFrame", "javax.swing.UIManager"], function () {
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
if (!Clazz.isClassDefined ("javax.swing.ProgressMonitor.ProgressOptionPane")) {
javax.swing.ProgressMonitor.$ProgressMonitor$ProgressOptionPane$ ();
}
Clazz.instantialize (this, arguments);
}, javax.swing, "ProgressMonitor");
Clazz.makeConstructor (c$, 
function (parentComponent, message, note, min, max) {
this.construct (parentComponent, message, note, min, max, null);
}, "java.awt.Component,~O,~S,~N,~N");
Clazz.makeConstructor (c$, 
 function (parentComponent, message, note, min, max, group) {
this.min = min;
this.max = max;
this.parentComponent = parentComponent;
this.cancelOption =  new Array (1);
this.cancelOption[0] = javax.swing.UIManager.getString ("OptionPane.cancelButtonText");
this.message = message;
this.note = note;
if (group != null) {
this.root = (group.root != null) ? group.root : group;
this.T0 = this.root.T0;
this.dialog = this.root.dialog;
} else {
this.T0 = System.currentTimeMillis ();
}}, "java.awt.Component,~O,~S,~N,~N,javax.swing.ProgressMonitor");
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
this.myBar =  new javax.swing.JProgressBar ();
this.myBar.setMinimum (this.min);
this.myBar.setMaximum (this.max);
this.myBar.setValue (nv);
if (this.note != null) this.noteLabel =  new javax.swing.JLabel (this.note);
this.pane = Clazz.innerTypeInstance (javax.swing.ProgressMonitor.ProgressOptionPane, this, null, [this.message, this.noteLabel, this.myBar]);
this.dialog = this.pane.createDialog (this.parentComponent, javax.swing.UIManager.getString ("ProgressMonitor.progressText"));
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
Clazz.pu$h(self.c$);
c$ = Clazz.decorateAsClass (function () {
Clazz.prepareCallback (this, arguments);
Clazz.instantialize (this, arguments);
}, javax.swing.ProgressMonitor, "ProgressOptionPane", javax.swing.JOptionPane);
Clazz.makeConstructor (c$, 
function (a) {
Clazz.superConstructor (this, javax.swing.ProgressMonitor.ProgressOptionPane, [a, 1, -1, null, this.b$["javax.swing.ProgressMonitor"].cancelOption, null]);
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
var d = javax.swing.JOptionPane.getWindowForComponent (a);
if (Clazz.instanceOf (d, java.awt.Frame)) {
c =  new javax.swing.JDialog (d, b, false);
} else {
c =  new javax.swing.JDialog (d, b, false);
}if (Clazz.instanceOf (d, javax.swing.SwingUtilities.SharedOwnerFrame)) {
var e = javax.swing.SwingUtilities.getSharedOwnerFrameShutdownListener ();
c.addWindowListener (e);
}var e = c.getContentPane ();
e.setLayout ( new java.awt.BorderLayout ());
e.add (this, "Center");
c.pack ();
c.setLocationRelativeTo (a);
c.addWindowListener (((Clazz.isClassDefined ("javax.swing.ProgressMonitor$ProgressOptionPane$1") ? 0 : javax.swing.ProgressMonitor.ProgressOptionPane.$ProgressMonitor$ProgressOptionPane$1$ ()), Clazz.innerTypeInstance (javax.swing.ProgressMonitor$ProgressOptionPane$1, this, null)));
this.addPropertyChangeListener (((Clazz.isClassDefined ("javax.swing.ProgressMonitor$ProgressOptionPane$2") ? 0 : javax.swing.ProgressMonitor.ProgressOptionPane.$ProgressMonitor$ProgressOptionPane$2$ ()), Clazz.innerTypeInstance (javax.swing.ProgressMonitor$ProgressOptionPane$2, this, Clazz.cloneFinals ("c", c))));
return c;
}, "java.awt.Component,~S");
c$.$ProgressMonitor$ProgressOptionPane$1$ = function () {
Clazz.pu$h(self.c$);
c$ = Clazz.decorateAsClass (function () {
Clazz.prepareCallback (this, arguments);
this.gotFocus = false;
Clazz.instantialize (this, arguments);
}, javax.swing, "ProgressMonitor$ProgressOptionPane$1", java.awt.event.WindowAdapter);
Clazz.overrideMethod (c$, "windowClosing", 
function (a) {
this.b$["javax.swing.ProgressMonitor.ProgressOptionPane"].setValue (this.b$["javax.swing.ProgressMonitor"].cancelOption[0]);
}, "java.awt.event.WindowEvent");
Clazz.overrideMethod (c$, "windowActivated", 
function (a) {
if (!this.gotFocus) {
this.b$["javax.swing.ProgressMonitor.ProgressOptionPane"].selectInitialValue ();
this.gotFocus = true;
}}, "java.awt.event.WindowEvent");
c$ = Clazz.p0p ();
};
c$.$ProgressMonitor$ProgressOptionPane$2$ = function () {
Clazz.pu$h(self.c$);
c$ = Clazz.declareAnonymous (javax.swing, "ProgressMonitor$ProgressOptionPane$2", null, java.beans.PropertyChangeListener);
Clazz.overrideMethod (c$, "propertyChange", 
function (a) {
if (this.f$.c.isVisible () && a.getSource () === this.b$["javax.swing.ProgressMonitor.ProgressOptionPane"] && (a.getPropertyName ().equals ("value") || a.getPropertyName ().equals ("inputValue"))) {
this.f$.c.setVisible (false);
this.f$.c.dispose ();
}}, "java.beans.PropertyChangeEvent");
c$ = Clazz.p0p ();
};
c$ = Clazz.p0p ();
};
});

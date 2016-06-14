Clazz.declarePackage ("javax.swing");
Clazz.load (["java.awt.event.ActionListener", "$.ComponentAdapter", "$.WindowAdapter", "javax.swing.JComponent", "$.JDialog"], ["javax.swing.ColorChooserDialog", "$.ColorTracker", "$.JColorChooser"], ["java.lang.IllegalArgumentException", "$.StringBuffer", "java.awt.BorderLayout", "$.Color", "$.FlowLayout", "$.Frame", "javax.swing.AbstractAction", "$.JButton", "$.JOptionPane", "$.JPanel", "$.KeyStroke", "$.UIManager", "javax.swing.colorchooser.DefaultColorSelectionModel", "jssun.swing.SwingUtilities2"], function () {
c$ = Clazz.decorateAsClass (function () {
this.selectionModel = null;
this.previewPanel = null;
this.chooserPanels = null;
this.dragEnabled = false;
Clazz.instantialize (this, arguments);
}, javax.swing, "JColorChooser", javax.swing.JComponent);
Clazz.prepareFields (c$, function () {
this.chooserPanels =  new Array (0);
});
c$.showDialog = Clazz.defineMethod (c$, "showDialog", 
function (component, title, initialColor) {
var pane =  new javax.swing.JColorChooser (initialColor != null ? initialColor : java.awt.Color.white);
var ok =  new javax.swing.ColorTracker (pane);
var dialog = javax.swing.JColorChooser.createDialog (component, title, true, pane, ok, null);
dialog.addComponentListener ( new javax.swing.ColorChooserDialog.DisposeOnClose ());
dialog.show ();
return ok.getColor ();
}, "java.awt.Component,~S,java.awt.Color");
c$.createDialog = Clazz.defineMethod (c$, "createDialog", 
function (c, title, modal, chooserPane, okListener, cancelListener) {
var window = javax.swing.JOptionPane.getWindowForComponent (c);
var dialog;
if (Clazz.instanceOf (window, java.awt.Frame)) {
dialog =  new javax.swing.ColorChooserDialog (window, title, modal, c, chooserPane, okListener, cancelListener);
} else {
dialog =  new javax.swing.ColorChooserDialog (window, title, modal, c, chooserPane, okListener, cancelListener);
}return dialog;
}, "java.awt.Component,~S,~B,javax.swing.JColorChooser,java.awt.event.ActionListener,java.awt.event.ActionListener");
Clazz.makeConstructor (c$, 
function () {
this.construct (java.awt.Color.white);
});
Clazz.makeConstructor (c$, 
function (initialColor) {
this.construct ( new javax.swing.colorchooser.DefaultColorSelectionModel (initialColor));
}, "java.awt.Color");
Clazz.makeConstructor (c$, 
function (model) {
Clazz.superConstructor (this, javax.swing.JColorChooser, []);
this.selectionModel = model;
this.updateUI ();
this.dragEnabled = false;
}, "javax.swing.colorchooser.ColorSelectionModel");
Clazz.overrideMethod (c$, "getUI", 
function () {
return this.ui;
});
Clazz.overrideMethod (c$, "updateUI", 
function () {
this.setUI (javax.swing.UIManager.getUI (this));
});
Clazz.overrideMethod (c$, "getUIClassID", 
function () {
return "ColorChooserUI";
});
Clazz.defineMethod (c$, "getColor", 
function () {
return this.selectionModel.getSelectedColor ();
});
Clazz.defineMethod (c$, "setColor", 
function (color) {
this.selectionModel.setSelectedColor (color);
}, "java.awt.Color");
Clazz.defineMethod (c$, "setColor", 
function (r, g, b) {
this.setColor ( new java.awt.Color (r, g, b));
}, "~N,~N,~N");
Clazz.defineMethod (c$, "setColor", 
function (c) {
this.setColor ((c >> 16) & 0xFF, (c >> 8) & 0xFF, c & 0xFF);
}, "~N");
Clazz.defineMethod (c$, "setDragEnabled", 
function (b) {
this.dragEnabled = b;
}, "~B");
Clazz.defineMethod (c$, "getDragEnabled", 
function () {
return this.dragEnabled;
});
Clazz.defineMethod (c$, "setPreviewPanel", 
function (preview) {
if (this.previewPanel !== preview) {
var oldPreview = this.previewPanel;
this.previewPanel = preview;
this.firePropertyChangeObject ("previewPanel", oldPreview, preview);
}}, "javax.swing.JComponent");
Clazz.defineMethod (c$, "getPreviewPanel", 
function () {
return this.previewPanel;
});
Clazz.defineMethod (c$, "addChooserPanel", 
function (panel) {
var oldPanels = this.getChooserPanels ();
var newPanels =  new Array (oldPanels.length + 1);
System.arraycopy (oldPanels, 0, newPanels, 0, oldPanels.length);
newPanels[newPanels.length - 1] = panel;
this.setChooserPanels (newPanels);
}, "javax.swing.colorchooser.AbstractColorChooserPanel");
Clazz.defineMethod (c$, "removeChooserPanel", 
function (panel) {
var containedAt = -1;
for (var i = 0; i < this.chooserPanels.length; i++) {
if (this.chooserPanels[i] === panel) {
containedAt = i;
break;
}}
if (containedAt == -1) {
throw  new IllegalArgumentException ("chooser panel not in this chooser");
}var newArray =  new Array (this.chooserPanels.length - 1);
if (containedAt == this.chooserPanels.length - 1) {
System.arraycopy (this.chooserPanels, 0, newArray, 0, newArray.length);
} else if (containedAt == 0) {
System.arraycopy (this.chooserPanels, 1, newArray, 0, newArray.length);
} else {
System.arraycopy (this.chooserPanels, 0, newArray, 0, containedAt);
System.arraycopy (this.chooserPanels, containedAt + 1, newArray, containedAt, (this.chooserPanels.length - containedAt - 1));
}this.setChooserPanels (newArray);
return panel;
}, "javax.swing.colorchooser.AbstractColorChooserPanel");
Clazz.defineMethod (c$, "setChooserPanels", 
function (panels) {
var oldValue = this.chooserPanels;
this.chooserPanels = panels;
this.firePropertyChangeObject ("chooserPanels", oldValue, panels);
}, "~A");
Clazz.defineMethod (c$, "getChooserPanels", 
function () {
return this.chooserPanels;
});
Clazz.defineMethod (c$, "getSelectionModel", 
function () {
return this.selectionModel;
});
Clazz.defineMethod (c$, "setSelectionModel", 
function (newModel) {
var oldModel = this.selectionModel;
this.selectionModel = newModel;
this.firePropertyChangeObject ("selectionModel", oldModel, newModel);
}, "javax.swing.colorchooser.ColorSelectionModel");
Clazz.defineMethod (c$, "paramString", 
function () {
var chooserPanelsString =  new StringBuffer ("");
for (var i = 0; i < this.chooserPanels.length; i++) {
chooserPanelsString.append ("[" + this.chooserPanels[i].toString () + "]");
}
var previewPanelString = (this.previewPanel != null ? this.previewPanel.toString () : "");
return Clazz.superCall (this, javax.swing.JColorChooser, "paramString", []) + ",chooserPanels=" + chooserPanelsString.toString () + ",previewPanel=" + previewPanelString;
});
Clazz.defineStatics (c$,
"$uiClassID", "ColorChooserUI",
"SELECTION_MODEL_PROPERTY", "selectionModel",
"PREVIEW_PANEL_PROPERTY", "previewPanel",
"CHOOSER_PANELS_PROPERTY", "chooserPanels");
c$ = Clazz.decorateAsClass (function () {
this.initialColor = null;
this.chooserPane = null;
this.cancelButton = null;
if (!Clazz.isClassDefined ("javax.swing.ColorChooserDialog.Closer")) {
javax.swing.ColorChooserDialog.$ColorChooserDialog$Closer$ ();
}
Clazz.instantialize (this, arguments);
}, javax.swing, "ColorChooserDialog", javax.swing.JDialog);
Clazz.makeConstructor (c$, 
function (owner, title, modal, c, chooserPane, okListener, cancelListener) {
Clazz.superConstructor (this, javax.swing.ColorChooserDialog, [owner, title, modal]);
this.initColorChooserDialog (c, chooserPane, okListener, cancelListener);
}, "java.awt.Dialog,~S,~B,java.awt.Component,javax.swing.JColorChooser,java.awt.event.ActionListener,java.awt.event.ActionListener");
Clazz.makeConstructor (c$, 
function (owner, title, modal, c, chooserPane, okListener, cancelListener) {
Clazz.superConstructor (this, javax.swing.ColorChooserDialog, [owner, title, modal]);
this.initColorChooserDialog (c, chooserPane, okListener, cancelListener);
}, "java.awt.Frame,~S,~B,java.awt.Component,javax.swing.JColorChooser,java.awt.event.ActionListener,java.awt.event.ActionListener");
Clazz.defineMethod (c$, "initColorChooserDialog", 
function (c, chooserPane, okListener, cancelListener) {
this.chooserPane = chooserPane;
var okString = javax.swing.UIManager.getString ("ColorChooser.okText");
var cancelString = javax.swing.UIManager.getString ("ColorChooser.cancelText");
var resetString = javax.swing.UIManager.getString ("ColorChooser.resetText");
var contentPane = this.getContentPane ();
contentPane.setLayout ( new java.awt.BorderLayout ());
contentPane.add (chooserPane, "Center");
var buttonPane =  new javax.swing.JPanel ();
buttonPane.setLayout ( new java.awt.FlowLayout (1));
var okButton =  new javax.swing.JButton (okString);
this.getRootPane ().setDefaultButton (okButton);
okButton.setActionCommand ("OK");
okButton.addActionListener (((Clazz.isClassDefined ("javax.swing.ColorChooserDialog$1") ? 0 : javax.swing.ColorChooserDialog.$ColorChooserDialog$1$ ()), Clazz.innerTypeInstance (javax.swing.ColorChooserDialog$1, this, null)));
if (okListener != null) {
okButton.addActionListener (okListener);
}buttonPane.add (okButton);
this.cancelButton =  new javax.swing.JButton (cancelString);
var cancelKeyAction = ((Clazz.isClassDefined ("javax.swing.ColorChooserDialog$2") ? 0 : javax.swing.ColorChooserDialog.$ColorChooserDialog$2$ ()), Clazz.innerTypeInstance (javax.swing.ColorChooserDialog$2, this, null));
var cancelKeyStroke = javax.swing.KeyStroke.getKeyStroke (27, 0);
var inputMap = this.cancelButton.getInputMap (2);
var actionMap = this.cancelButton.getActionMap ();
if (inputMap != null && actionMap != null) {
inputMap.put (cancelKeyStroke, "cancel");
actionMap.put ("cancel", cancelKeyAction);
}this.cancelButton.setActionCommand ("cancel");
this.cancelButton.addActionListener (((Clazz.isClassDefined ("javax.swing.ColorChooserDialog$3") ? 0 : javax.swing.ColorChooserDialog.$ColorChooserDialog$3$ ()), Clazz.innerTypeInstance (javax.swing.ColorChooserDialog$3, this, null)));
if (cancelListener != null) {
this.cancelButton.addActionListener (cancelListener);
}buttonPane.add (this.cancelButton);
var resetButton =  new javax.swing.JButton (resetString);
resetButton.addActionListener (((Clazz.isClassDefined ("javax.swing.ColorChooserDialog$4") ? 0 : javax.swing.ColorChooserDialog.$ColorChooserDialog$4$ ()), Clazz.innerTypeInstance (javax.swing.ColorChooserDialog$4, this, null)));
var mnemonic = jssun.swing.SwingUtilities2.getUIDefaultsInt ("ColorChooser.resetMnemonic", -1);
if (mnemonic != -1) {
resetButton.setMnemonic (mnemonic);
}buttonPane.add (resetButton);
contentPane.add (buttonPane, "South");
if (javax.swing.JDialog.isDefaultLookAndFeelDecorated ()) {
var supportsWindowDecorations = javax.swing.UIManager.getLookAndFeel ().getSupportsWindowDecorations ();
if (supportsWindowDecorations) {
this.getRootPane ().setWindowDecorationStyle (5);
}}this.applyComponentOrientation (((c == null) ? this.getRootPane () : c).getComponentOrientation ());
this.pack ();
this.setLocationRelativeTo (c);
this.addWindowListener (Clazz.innerTypeInstance (javax.swing.ColorChooserDialog.Closer, this, null));
}, "java.awt.Component,javax.swing.JColorChooser,java.awt.event.ActionListener,java.awt.event.ActionListener");
Clazz.defineMethod (c$, "show", 
function () {
this.initialColor = this.chooserPane.getColor ();
Clazz.superCall (this, javax.swing.ColorChooserDialog, "show", []);
});
Clazz.defineMethod (c$, "reset", 
function () {
this.chooserPane.setColor (this.initialColor);
});
c$.$ColorChooserDialog$Closer$ = function () {
Clazz.pu$h(self.c$);
c$ = Clazz.decorateAsClass (function () {
Clazz.prepareCallback (this, arguments);
Clazz.instantialize (this, arguments);
}, javax.swing.ColorChooserDialog, "Closer", java.awt.event.WindowAdapter);
Clazz.overrideMethod (c$, "windowClosing", 
function (a) {
this.b$["javax.swing.ColorChooserDialog"].cancelButton.doClick (0);
var b = a.getWindow ();
b.hide ();
}, "java.awt.event.WindowEvent");
c$ = Clazz.p0p ();
};
c$.$ColorChooserDialog$1$ = function () {
Clazz.pu$h(self.c$);
c$ = Clazz.declareAnonymous (javax.swing, "ColorChooserDialog$1", null, java.awt.event.ActionListener);
Clazz.overrideMethod (c$, "actionPerformed", 
function (e) {
this.b$["javax.swing.ColorChooserDialog"].hide ();
}, "java.awt.event.ActionEvent");
c$ = Clazz.p0p ();
};
c$.$ColorChooserDialog$2$ = function () {
Clazz.pu$h(self.c$);
c$ = Clazz.declareAnonymous (javax.swing, "ColorChooserDialog$2", javax.swing.AbstractAction);
Clazz.overrideMethod (c$, "actionPerformed", 
function (e) {
(e.getSource ()).fireActionPerformed (e);
}, "java.awt.event.ActionEvent");
c$ = Clazz.p0p ();
};
c$.$ColorChooserDialog$3$ = function () {
Clazz.pu$h(self.c$);
c$ = Clazz.declareAnonymous (javax.swing, "ColorChooserDialog$3", null, java.awt.event.ActionListener);
Clazz.overrideMethod (c$, "actionPerformed", 
function (e) {
this.b$["javax.swing.ColorChooserDialog"].hide ();
}, "java.awt.event.ActionEvent");
c$ = Clazz.p0p ();
};
c$.$ColorChooserDialog$4$ = function () {
Clazz.pu$h(self.c$);
c$ = Clazz.declareAnonymous (javax.swing, "ColorChooserDialog$4", null, java.awt.event.ActionListener);
Clazz.overrideMethod (c$, "actionPerformed", 
function (e) {
this.b$["javax.swing.ColorChooserDialog"].reset ();
}, "java.awt.event.ActionEvent");
c$ = Clazz.p0p ();
};
Clazz.pu$h(self.c$);
c$ = Clazz.declareType (javax.swing.ColorChooserDialog, "DisposeOnClose", java.awt.event.ComponentAdapter);
Clazz.overrideMethod (c$, "componentHidden", 
function (a) {
var b = a.getComponent ();
b.dispose ();
}, "java.awt.event.ComponentEvent");
c$ = Clazz.p0p ();
c$ = Clazz.decorateAsClass (function () {
this.chooser = null;
this.color = null;
Clazz.instantialize (this, arguments);
}, javax.swing, "ColorTracker", null, java.awt.event.ActionListener);
Clazz.makeConstructor (c$, 
function (c) {
this.chooser = c;
}, "javax.swing.JColorChooser");
Clazz.overrideMethod (c$, "actionPerformed", 
function (e) {
this.color = this.chooser.getColor ();
}, "java.awt.event.ActionEvent");
Clazz.defineMethod (c$, "getColor", 
function () {
return this.color;
});
});

Clazz.declarePackage ("javax.swing");
Clazz.load (["java.awt.Dialog", "javax.swing.RootPaneContainer", "$.WindowConstants"], "javax.swing.JDialog", ["java.lang.Boolean", "$.IllegalArgumentException", "javax.swing.JComponent", "$.JRootPane", "$.RepaintManager", "$.SwingUtilities", "$.UIManager", "swingjs.JSFrameViewer"], function () {
c$ = Clazz.decorateAsClass (function () {
this.defaultCloseOperation = 1;
this.rootPane = null;
this.rootPaneCheckingEnabled = false;
this.transferHandler = null;
Clazz.instantialize (this, arguments);
}, javax.swing, "JDialog", java.awt.Dialog, [javax.swing.WindowConstants, javax.swing.RootPaneContainer]);
Clazz.makeConstructor (c$, 
function () {
this.construct (Clazz.castNullAs ("java.awt.Frame"), false);
});
Clazz.makeConstructor (c$, 
function (owner) {
this.construct (owner, false);
}, "java.awt.Frame");
Clazz.makeConstructor (c$, 
function (owner, modal) {
this.construct (owner, null, modal);
}, "java.awt.Frame,~B");
Clazz.makeConstructor (c$, 
function (owner, title) {
this.construct (owner, title, false);
}, "java.awt.Frame,~S");
Clazz.makeConstructor (c$, 
function (owner, title, modal) {
Clazz.superConstructor (this, javax.swing.JDialog, [owner == null ? javax.swing.SwingUtilities.getSharedOwnerFrame () : owner, title, modal]);
if (owner == null) {
var ownerShutdownListener = javax.swing.SwingUtilities.getSharedOwnerFrameShutdownListener ();
this.addWindowListener (ownerShutdownListener);
}this.dialogInit ();
}, "java.awt.Frame,~S,~B");
Clazz.makeConstructor (c$, 
function (owner, title, modal, gc) {
Clazz.superConstructor (this, javax.swing.JDialog, [owner == null ? javax.swing.SwingUtilities.getSharedOwnerFrame () : owner, title, modal, gc]);
if (owner == null) {
var ownerShutdownListener = javax.swing.SwingUtilities.getSharedOwnerFrameShutdownListener ();
this.addWindowListener (ownerShutdownListener);
}this.dialogInit ();
}, "java.awt.Frame,~S,~B,java.awt.GraphicsConfiguration");
Clazz.makeConstructor (c$, 
function (owner) {
this.construct (owner, false);
}, "java.awt.Dialog");
Clazz.makeConstructor (c$, 
function (owner, modal) {
this.construct (owner, null, modal);
}, "java.awt.Dialog,~B");
Clazz.makeConstructor (c$, 
function (owner, title) {
this.construct (owner, title, false);
}, "java.awt.Dialog,~S");
Clazz.makeConstructor (c$, 
function (owner, title, modal) {
Clazz.superConstructor (this, javax.swing.JDialog, [owner, title, modal]);
this.dialogInit ();
}, "java.awt.Dialog,~S,~B");
Clazz.makeConstructor (c$, 
function (owner, title, modal, gc) {
Clazz.superConstructor (this, javax.swing.JDialog, [owner, title, modal, gc]);
this.dialogInit ();
}, "java.awt.Dialog,~S,~B,java.awt.GraphicsConfiguration");
Clazz.makeConstructor (c$, 
function (owner) {
this.construct (owner, java.awt.Dialog.ModalityType.MODELESS);
}, "java.awt.Window");
Clazz.makeConstructor (c$, 
function (owner, modalityType) {
this.construct (owner, null, modalityType);
}, "java.awt.Window,java.awt.Dialog.ModalityType");
Clazz.makeConstructor (c$, 
function (owner, title) {
this.construct (owner, title, java.awt.Dialog.ModalityType.MODELESS);
}, "java.awt.Window,~S");
Clazz.makeConstructor (c$, 
function (owner, title, modalityType) {
Clazz.superConstructor (this, javax.swing.JDialog, [owner, title, modalityType]);
this.dialogInit ();
}, "java.awt.Window,~S,java.awt.Dialog.ModalityType");
Clazz.makeConstructor (c$, 
function (owner, title, modalityType, gc) {
Clazz.superConstructor (this, javax.swing.JDialog, [owner, title, modalityType, gc]);
this.dialogInit ();
}, "java.awt.Window,~S,java.awt.Dialog.ModalityType,java.awt.GraphicsConfiguration");
Clazz.defineMethod (c$, "dialogInit", 
function () {
this.frameViewer =  new swingjs.JSFrameViewer ().setForWindow (this);
this.enableEvents (72);
this.setLocale (javax.swing.JComponent.getDefaultLocale ());
this.setRootPane (this.createRootPane ());
this.rootPane.setFrameViewer (this.frameViewer);
this.setRootPaneCheckingEnabled (true);
if (javax.swing.JDialog.isDefaultLookAndFeelDecorated ()) {
var supportsWindowDecorations = javax.swing.UIManager.getLookAndFeel ().getSupportsWindowDecorations ();
if (supportsWindowDecorations) {
this.setUndecorated (true);
this.getRootPane ().setWindowDecorationStyle (2);
}}this.uiClassID = "DialogUI";
this.updateUI ();
this.addNotify ();
this.rootPane.addNotify ();
});
Clazz.defineMethod (c$, "createRootPane", 
function () {
var rp =  new javax.swing.JRootPane ("_Dialog" + (++javax.swing.JDialog.dialogCount), false);
rp.setOpaque (true);
return rp;
});
Clazz.defineMethod (c$, "processWindowEvent", 
function (e) {
Clazz.superCall (this, javax.swing.JDialog, "processWindowEvent", [e]);
if (e.getID () == 201) {
switch (this.defaultCloseOperation) {
case 1:
this.setVisible (false);
break;
case 2:
this.dispose ();
break;
case 0:
default:
break;
}
}}, "java.awt.event.WindowEvent");
Clazz.defineMethod (c$, "setDefaultCloseOperation", 
function (operation) {
if (operation != 0 && operation != 1 && operation != 2) {
throw  new IllegalArgumentException ("defaultCloseOperation must be one of: DO_NOTHING_ON_CLOSE, HIDE_ON_CLOSE, or DISPOSE_ON_CLOSE");
}var oldValue = this.defaultCloseOperation;
this.defaultCloseOperation = operation;
this.firePropertyChangeInt ("defaultCloseOperation", oldValue, operation);
}, "~N");
Clazz.defineMethod (c$, "getDefaultCloseOperation", 
function () {
return this.defaultCloseOperation;
});
Clazz.defineMethod (c$, "setTransferHandler", 
function (newHandler) {
var oldHandler = this.transferHandler;
this.transferHandler = newHandler;
javax.swing.SwingUtilities.installSwingDropTargetAsNecessary (this, this.transferHandler);
this.firePropertyChangeObject ("transferHandler", oldHandler, newHandler);
}, "javax.swing.TransferHandler");
Clazz.defineMethod (c$, "getTransferHandler", 
function () {
return this.transferHandler;
});
Clazz.overrideMethod (c$, "update", 
function (g) {
this.paint (g);
}, "java.awt.Graphics");
Clazz.defineMethod (c$, "setJMenuBar", 
function (menu) {
this.getRootPane ().setMenuBar (menu);
}, "javax.swing.JMenuBar");
Clazz.defineMethod (c$, "getJMenuBar", 
function () {
return this.getRootPane ().getMenuBar ();
});
Clazz.defineMethod (c$, "isRootPaneCheckingEnabled", 
function () {
return this.rootPaneCheckingEnabled;
});
Clazz.defineMethod (c$, "setRootPaneCheckingEnabled", 
function (enabled) {
this.rootPaneCheckingEnabled = enabled;
}, "~B");
Clazz.overrideMethod (c$, "addImpl", 
function (comp, constraints, index) {
if (this.isRootPaneCheckingEnabled ()) {
return this.getContentPane ().add (comp, constraints, index);
}return this.addImplSAEM (comp, constraints, index);
}, "java.awt.Component,~O,~N");
Clazz.defineMethod (c$, "remove", 
function (comp) {
if (comp === this.rootPane) {
this.removeChild (comp);
} else {
this.getContentPane ().removeChild (comp);
}}, "java.awt.Component");
Clazz.defineMethod (c$, "setLayout", 
function (manager) {
if (this.isRootPaneCheckingEnabled ()) {
this.getContentPane ().setLayout (manager);
} else {
Clazz.superCall (this, javax.swing.JDialog, "setLayout", [manager]);
}}, "java.awt.LayoutManager");
Clazz.overrideMethod (c$, "getRootPane", 
function () {
return this.rootPane;
});
Clazz.defineMethod (c$, "setRootPane", 
function (root) {
if (this.rootPane != null) {
this.remove (this.rootPane);
}this.rootPane = root;
if (this.rootPane != null) {
var checkingEnabled = this.isRootPaneCheckingEnabled ();
try {
this.setRootPaneCheckingEnabled (false);
this.add (this.rootPane, "Center");
} finally {
this.setRootPaneCheckingEnabled (checkingEnabled);
}
}}, "javax.swing.JRootPane");
Clazz.overrideMethod (c$, "getContentPane", 
function () {
return this.getRootPane ().getContentPane ();
});
Clazz.overrideMethod (c$, "setContentPane", 
function (contentPane) {
this.getRootPane ().setContentPane (contentPane);
}, "java.awt.Container");
Clazz.overrideMethod (c$, "getLayeredPane", 
function () {
return this.getRootPane ().getLayeredPane ();
});
Clazz.overrideMethod (c$, "setLayeredPane", 
function (layeredPane) {
this.getRootPane ().setLayeredPane (layeredPane);
}, "javax.swing.JLayeredPane");
Clazz.overrideMethod (c$, "getGlassPane", 
function () {
return this.getRootPane ().getGlassPane ();
});
Clazz.overrideMethod (c$, "setGlassPane", 
function (glassPane) {
this.getRootPane ().setGlassPane (glassPane);
}, "java.awt.Component");
Clazz.defineMethod (c$, "getGraphics", 
function () {
javax.swing.JComponent.getGraphicsInvoked (this);
return Clazz.superCall (this, javax.swing.JDialog, "getGraphics", []);
});
Clazz.defineMethod (c$, "repaint", 
function (time, x, y, width, height) {
if (javax.swing.RepaintManager.HANDLE_TOP_LEVEL_PAINT) {
javax.swing.RepaintManager.currentManager (this).addDirtyRegion (this, x, y, width, height);
} else {
Clazz.superCall (this, javax.swing.JDialog, "repaint", [time, x, y, width, height]);
}}, "~N,~N,~N,~N,~N");
c$.setDefaultLookAndFeelDecorated = Clazz.defineMethod (c$, "setDefaultLookAndFeelDecorated", 
function (defaultLookAndFeelDecorated) {
if (defaultLookAndFeelDecorated) {
javax.swing.SwingUtilities.appContextPut (javax.swing.JDialog.defaultLookAndFeelDecoratedKey, Boolean.TRUE);
} else {
javax.swing.SwingUtilities.appContextPut (javax.swing.JDialog.defaultLookAndFeelDecoratedKey, Boolean.FALSE);
}}, "~B");
c$.isDefaultLookAndFeelDecorated = Clazz.defineMethod (c$, "isDefaultLookAndFeelDecorated", 
function () {
var defaultLookAndFeelDecorated = javax.swing.SwingUtilities.appContextGet (javax.swing.JDialog.defaultLookAndFeelDecoratedKey);
if (defaultLookAndFeelDecorated == null) {
defaultLookAndFeelDecorated = Boolean.FALSE;
}return defaultLookAndFeelDecorated.booleanValue ();
});
Clazz.defineMethod (c$, "paramString", 
function () {
var defaultCloseOperationString;
if (this.defaultCloseOperation == 1) {
defaultCloseOperationString = "HIDE_ON_CLOSE";
} else if (this.defaultCloseOperation == 2) {
defaultCloseOperationString = "DISPOSE_ON_CLOSE";
} else if (this.defaultCloseOperation == 0) {
defaultCloseOperationString = "DO_NOTHING_ON_CLOSE";
} else defaultCloseOperationString = "";
var rootPaneString = (this.rootPane != null ? this.rootPane.toString () : "");
var rootPaneCheckingEnabledString = (this.rootPaneCheckingEnabled ? "true" : "false");
return Clazz.superCall (this, javax.swing.JDialog, "paramString", []) + ",defaultCloseOperation=" + defaultCloseOperationString + ",rootPane=" + rootPaneString + ",rootPaneCheckingEnabled=" + rootPaneCheckingEnabledString;
});
c$.defaultLookAndFeelDecoratedKey = c$.prototype.defaultLookAndFeelDecoratedKey =  new Clazz._O ();
Clazz.defineStatics (c$,
"dialogCount", 0);
});

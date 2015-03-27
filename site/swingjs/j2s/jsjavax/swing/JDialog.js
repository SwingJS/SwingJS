Clazz.declarePackage ("jsjavax.swing");
Clazz.load (["jsjava.awt.Dialog", "jsjavax.swing.RootPaneContainer", "$.WindowConstants"], "jsjavax.swing.JDialog", ["java.lang.Boolean", "$.IllegalArgumentException", "jsjavax.swing.JComponent", "$.JRootPane", "$.RepaintManager", "$.SwingUtilities", "$.UIManager"], function () {
c$ = Clazz.decorateAsClass (function () {
this.defaultCloseOperation = 1;
this.rootPane = null;
this.rootPaneCheckingEnabled = false;
this.transferHandler = null;
Clazz.instantialize (this, arguments);
}, jsjavax.swing, "JDialog", jsjava.awt.Dialog, [jsjavax.swing.WindowConstants, jsjavax.swing.RootPaneContainer]);
Clazz.makeConstructor (c$, 
function () {
this.construct (Clazz.castNullAs ("jsjava.awt.Frame"), false);
});
Clazz.makeConstructor (c$, 
function (owner) {
this.construct (owner, false);
}, "jsjava.awt.Frame");
Clazz.makeConstructor (c$, 
function (owner, modal) {
this.construct (owner, null, modal);
}, "jsjava.awt.Frame,~B");
Clazz.makeConstructor (c$, 
function (owner, title) {
this.construct (owner, title, false);
}, "jsjava.awt.Frame,~S");
Clazz.makeConstructor (c$, 
function (owner, title, modal) {
Clazz.superConstructor (this, jsjavax.swing.JDialog, [owner == null ? jsjavax.swing.SwingUtilities.getSharedOwnerFrame () : owner, title, modal]);
if (owner == null) {
var ownerShutdownListener = jsjavax.swing.SwingUtilities.getSharedOwnerFrameShutdownListener ();
this.addWindowListener (ownerShutdownListener);
}this.dialogInit ();
}, "jsjava.awt.Frame,~S,~B");
Clazz.makeConstructor (c$, 
function (owner, title, modal, gc) {
Clazz.superConstructor (this, jsjavax.swing.JDialog, [owner == null ? jsjavax.swing.SwingUtilities.getSharedOwnerFrame () : owner, title, modal, gc]);
if (owner == null) {
var ownerShutdownListener = jsjavax.swing.SwingUtilities.getSharedOwnerFrameShutdownListener ();
this.addWindowListener (ownerShutdownListener);
}this.dialogInit ();
}, "jsjava.awt.Frame,~S,~B,jsjava.awt.GraphicsConfiguration");
Clazz.makeConstructor (c$, 
function (owner) {
this.construct (owner, false);
}, "jsjava.awt.Dialog");
Clazz.makeConstructor (c$, 
function (owner, modal) {
this.construct (owner, null, modal);
}, "jsjava.awt.Dialog,~B");
Clazz.makeConstructor (c$, 
function (owner, title) {
this.construct (owner, title, false);
}, "jsjava.awt.Dialog,~S");
Clazz.makeConstructor (c$, 
function (owner, title, modal) {
Clazz.superConstructor (this, jsjavax.swing.JDialog, [owner, title, modal]);
this.dialogInit ();
}, "jsjava.awt.Dialog,~S,~B");
Clazz.makeConstructor (c$, 
function (owner, title, modal, gc) {
Clazz.superConstructor (this, jsjavax.swing.JDialog, [owner, title, modal, gc]);
this.dialogInit ();
}, "jsjava.awt.Dialog,~S,~B,jsjava.awt.GraphicsConfiguration");
Clazz.makeConstructor (c$, 
function (owner) {
this.construct (owner, jsjava.awt.Dialog.ModalityType.MODELESS);
}, "jsjava.awt.Window");
Clazz.makeConstructor (c$, 
function (owner, modalityType) {
this.construct (owner, null, modalityType);
}, "jsjava.awt.Window,jsjava.awt.Dialog.ModalityType");
Clazz.makeConstructor (c$, 
function (owner, title) {
this.construct (owner, title, jsjava.awt.Dialog.ModalityType.MODELESS);
}, "jsjava.awt.Window,~S");
Clazz.makeConstructor (c$, 
function (owner, title, modalityType) {
Clazz.superConstructor (this, jsjavax.swing.JDialog, [owner, title, modalityType]);
this.dialogInit ();
}, "jsjava.awt.Window,~S,jsjava.awt.Dialog.ModalityType");
Clazz.makeConstructor (c$, 
function (owner, title, modalityType, gc) {
Clazz.superConstructor (this, jsjavax.swing.JDialog, [owner, title, modalityType, gc]);
this.dialogInit ();
}, "jsjava.awt.Window,~S,jsjava.awt.Dialog.ModalityType,jsjava.awt.GraphicsConfiguration");
Clazz.defineMethod (c$, "dialogInit", 
function () {
this.enableEvents (72);
this.setLocale (jsjavax.swing.JComponent.getDefaultLocale ());
this.setRootPane (this.createRootPane ());
this.setRootPaneCheckingEnabled (true);
if (jsjavax.swing.JDialog.isDefaultLookAndFeelDecorated ()) {
var supportsWindowDecorations = jsjavax.swing.UIManager.getLookAndFeel ().getSupportsWindowDecorations ();
if (supportsWindowDecorations) {
this.setUndecorated (true);
this.getRootPane ().setWindowDecorationStyle (2);
}}});
Clazz.defineMethod (c$, "createRootPane", 
function () {
var rp =  new jsjavax.swing.JRootPane ();
rp.setOpaque (true);
return rp;
});
Clazz.defineMethod (c$, "processWindowEvent", 
function (e) {
Clazz.superCall (this, jsjavax.swing.JDialog, "processWindowEvent", [e]);
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
}}, "jsjava.awt.event.WindowEvent");
Clazz.defineMethod (c$, "setDefaultCloseOperation", 
function (operation) {
if (operation != 0 && operation != 1 && operation != 2) {
throw  new IllegalArgumentException ("defaultCloseOperation must be one of: DO_NOTHING_ON_CLOSE, HIDE_ON_CLOSE, or DISPOSE_ON_CLOSE");
}var oldValue = this.defaultCloseOperation;
this.defaultCloseOperation = operation;
this.firePropertyChange ("defaultCloseOperation", oldValue, operation);
}, "~N");
Clazz.defineMethod (c$, "getDefaultCloseOperation", 
function () {
return this.defaultCloseOperation;
});
Clazz.defineMethod (c$, "setTransferHandler", 
function (newHandler) {
var oldHandler = this.transferHandler;
this.transferHandler = newHandler;
jsjavax.swing.SwingUtilities.installSwingDropTargetAsNecessary (this, this.transferHandler);
this.firePropertyChange ("transferHandler", oldHandler, newHandler);
}, "jsjavax.swing.TransferHandler");
Clazz.defineMethod (c$, "getTransferHandler", 
function () {
return this.transferHandler;
});
Clazz.overrideMethod (c$, "update", 
function (g) {
this.paint (g);
}, "jsjava.awt.Graphics");
Clazz.defineMethod (c$, "setJMenuBar", 
function (menu) {
this.getRootPane ().setMenuBar (menu);
}, "jsjavax.swing.JMenuBar");
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
Clazz.defineMethod (c$, "addImpl", 
function (comp, constraints, index) {
if (this.isRootPaneCheckingEnabled ()) {
this.getContentPane ().add (comp, constraints, index);
} else {
Clazz.superCall (this, jsjavax.swing.JDialog, "addImpl", [comp, constraints, index]);
}}, "jsjava.awt.Component,~O,~N");
Clazz.defineMethod (c$, "remove", 
function (comp) {
if (comp === this.rootPane) {
Clazz.superCall (this, jsjavax.swing.JDialog, "remove", [comp]);
} else {
this.getContentPane ().remove (comp);
}}, "jsjava.awt.Component");
Clazz.defineMethod (c$, "setLayout", 
function (manager) {
if (this.isRootPaneCheckingEnabled ()) {
this.getContentPane ().setLayout (manager);
} else {
Clazz.superCall (this, jsjavax.swing.JDialog, "setLayout", [manager]);
}}, "jsjava.awt.LayoutManager");
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
}}, "jsjavax.swing.JRootPane");
Clazz.overrideMethod (c$, "getContentPane", 
function () {
return this.getRootPane ().getContentPane ();
});
Clazz.overrideMethod (c$, "setContentPane", 
function (contentPane) {
this.getRootPane ().setContentPane (contentPane);
}, "jsjava.awt.Container");
Clazz.overrideMethod (c$, "getLayeredPane", 
function () {
return this.getRootPane ().getLayeredPane ();
});
Clazz.overrideMethod (c$, "setLayeredPane", 
function (layeredPane) {
this.getRootPane ().setLayeredPane (layeredPane);
}, "jsjavax.swing.JLayeredPane");
Clazz.overrideMethod (c$, "getGlassPane", 
function () {
return this.getRootPane ().getGlassPane ();
});
Clazz.overrideMethod (c$, "setGlassPane", 
function (glassPane) {
this.getRootPane ().setGlassPane (glassPane);
}, "jsjava.awt.Component");
Clazz.defineMethod (c$, "getGraphics", 
function () {
jsjavax.swing.JComponent.getGraphicsInvoked (this);
return Clazz.superCall (this, jsjavax.swing.JDialog, "getGraphics", []);
});
Clazz.defineMethod (c$, "repaint", 
function (time, x, y, width, height) {
if (jsjavax.swing.RepaintManager.HANDLE_TOP_LEVEL_PAINT) {
jsjavax.swing.RepaintManager.currentManager (this).addDirtyRegion (this, x, y, width, height);
} else {
Clazz.superCall (this, jsjavax.swing.JDialog, "repaint", [time, x, y, width, height]);
}}, "~N,~N,~N,~N,~N");
c$.setDefaultLookAndFeelDecorated = Clazz.defineMethod (c$, "setDefaultLookAndFeelDecorated", 
function (defaultLookAndFeelDecorated) {
if (defaultLookAndFeelDecorated) {
jsjavax.swing.SwingUtilities.appContextPut (jsjavax.swing.JDialog.defaultLookAndFeelDecoratedKey, Boolean.TRUE);
} else {
jsjavax.swing.SwingUtilities.appContextPut (jsjavax.swing.JDialog.defaultLookAndFeelDecoratedKey, Boolean.FALSE);
}}, "~B");
c$.isDefaultLookAndFeelDecorated = Clazz.defineMethod (c$, "isDefaultLookAndFeelDecorated", 
function () {
var defaultLookAndFeelDecorated = jsjavax.swing.SwingUtilities.appContextGet (jsjavax.swing.JDialog.defaultLookAndFeelDecoratedKey);
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
return Clazz.superCall (this, jsjavax.swing.JDialog, "paramString", []) + ",defaultCloseOperation=" + defaultCloseOperationString + ",rootPane=" + rootPaneString + ",rootPaneCheckingEnabled=" + rootPaneCheckingEnabledString;
});
c$.defaultLookAndFeelDecoratedKey = c$.prototype.defaultLookAndFeelDecoratedKey =  new JavaObject ();
});

Clazz.declarePackage ("javax.swing");
Clazz.load (["java.awt.Frame", "javax.swing.RootPaneContainer", "$.WindowConstants"], "javax.swing.JFrame", ["java.lang.Boolean", "$.IllegalArgumentException", "javax.swing.JComponent", "$.JRootPane", "$.RepaintManager", "$.SwingUtilities", "$.UIManager", "swingjs.JSFrameViewer"], function () {
c$ = Clazz.decorateAsClass (function () {
this.defaultCloseOperation = 1;
this.transferHandler = null;
this.rootPane = null;
this.rootPaneCheckingEnabled = false;
Clazz.instantialize (this, arguments);
}, javax.swing, "JFrame", java.awt.Frame, [javax.swing.WindowConstants, javax.swing.RootPaneContainer]);
Clazz.makeConstructor (c$, 
function () {
this.construct (null, null);
});
Clazz.makeConstructor (c$, 
function (gc) {
this.construct (null, gc);
}, "java.awt.GraphicsConfiguration");
Clazz.makeConstructor (c$, 
function (title) {
this.construct (title, null);
}, "~S");
Clazz.makeConstructor (c$, 
function (title, gc) {
Clazz.superConstructor (this, javax.swing.JFrame, []);
this.frameViewer =  new swingjs.JSFrameViewer ().setForWindow (this);
this.initTitleGC (title, gc);
this.enableEvents (72);
this.setLocale (javax.swing.JComponent.getDefaultLocale ());
this.uiClassID = "FrameUI";
this.setRootPane (this.createRootPane ());
this.rootPane.setFrameViewer (this.frameViewer);
this.setBackground (javax.swing.UIManager.getColor ("control"));
this.setRootPaneCheckingEnabled (true);
if (javax.swing.JFrame.isDefaultLookAndFeelDecorated ()) {
var supportsWindowDecorations = javax.swing.UIManager.getLookAndFeel ().getSupportsWindowDecorations ();
if (supportsWindowDecorations) {
this.setUndecorated (true);
this.getRootPane ().setWindowDecorationStyle (1);
}}this.updateUI ();
this.addNotify ();
this.rootPane.addNotify ();
}, "~S,java.awt.GraphicsConfiguration");
Clazz.defineMethod (c$, "createRootPane", 
function () {
var rp =  new javax.swing.JRootPane ("_Frame" + (++javax.swing.JFrame.frameCount), false);
rp.setOpaque (true);
return rp;
});
Clazz.defineMethod (c$, "processWindowEvent", 
function (e) {
Clazz.superCall (this, javax.swing.JFrame, "processWindowEvent", [e]);
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
case 3:
System.exit (0);
break;
}
}}, "java.awt.event.WindowEvent");
Clazz.defineMethod (c$, "setDefaultCloseOperation", 
function (operation) {
if (operation != 0 && operation != 1 && operation != 2 && operation != 3) {
throw  new IllegalArgumentException ("defaultCloseOperation must be one of: DO_NOTHING_ON_CLOSE, HIDE_ON_CLOSE, DISPOSE_ON_CLOSE, or EXIT_ON_CLOSE");
}if (this.defaultCloseOperation != operation) {
if (operation == 3) {
var security = System.getSecurityManager ();
if (security != null) {
security.checkExit (0);
}}var oldValue = this.defaultCloseOperation;
this.defaultCloseOperation = operation;
this.firePropertyChangeInt ("defaultCloseOperation", oldValue, operation);
}}, "~N");
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
function (menubar) {
this.getRootPane ().setMenuBar (menubar);
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
Clazz.superCall (this, javax.swing.JFrame, "setLayout", [manager]);
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
return Clazz.superCall (this, javax.swing.JFrame, "getGraphics", []);
});
Clazz.defineMethod (c$, "repaint", 
function (time, x, y, width, height) {
if (javax.swing.RepaintManager.HANDLE_TOP_LEVEL_PAINT) {
javax.swing.RepaintManager.currentManager (this).addDirtyRegion (this, x, y, width, height);
} else {
Clazz.superCall (this, javax.swing.JFrame, "repaint", [time, x, y, width, height]);
}}, "~N,~N,~N,~N,~N");
c$.setDefaultLookAndFeelDecorated = Clazz.defineMethod (c$, "setDefaultLookAndFeelDecorated", 
function (defaultLookAndFeelDecorated) {
if (defaultLookAndFeelDecorated) {
javax.swing.SwingUtilities.appContextPut (javax.swing.JFrame.defaultLookAndFeelDecoratedKey, Boolean.TRUE);
} else {
javax.swing.SwingUtilities.appContextPut (javax.swing.JFrame.defaultLookAndFeelDecoratedKey, Boolean.FALSE);
}}, "~B");
c$.isDefaultLookAndFeelDecorated = Clazz.defineMethod (c$, "isDefaultLookAndFeelDecorated", 
function () {
var defaultLookAndFeelDecorated = javax.swing.SwingUtilities.appContextGet (javax.swing.JFrame.defaultLookAndFeelDecoratedKey);
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
} else if (this.defaultCloseOperation == 3) {
defaultCloseOperationString = "EXIT_ON_CLOSE";
} else defaultCloseOperationString = "";
var rootPaneString = (this.rootPane != null ? this.rootPane.toString () : "");
var rootPaneCheckingEnabledString = (this.rootPaneCheckingEnabled ? "true" : "false");
return Clazz.superCall (this, javax.swing.JFrame, "paramString", []) + ",defaultCloseOperation=" + defaultCloseOperationString + ",rootPane=" + rootPaneString + ",rootPaneCheckingEnabled=" + rootPaneCheckingEnabledString;
});
Clazz.defineStatics (c$,
"EXIT_ON_CLOSE", 3);
c$.defaultLookAndFeelDecoratedKey = c$.prototype.defaultLookAndFeelDecoratedKey =  new Clazz._O ();
Clazz.defineStatics (c$,
"frameCount", 0);
});

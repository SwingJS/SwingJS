Clazz.declarePackage ("jsjavax.swing");
Clazz.load (["jsjava.awt.Frame", "jsjavax.swing.RootPaneContainer", "$.WindowConstants"], "jsjavax.swing.JFrame", ["java.lang.Boolean", "$.IllegalArgumentException", "jsjavax.swing.JComponent", "$.JRootPane", "$.RepaintManager", "$.SwingUtilities", "$.UIManager"], function () {
c$ = Clazz.decorateAsClass (function () {
this.defaultCloseOperation = 1;
this.transferHandler = null;
this.rootPane = null;
this.rootPaneCheckingEnabled = false;
Clazz.instantialize (this, arguments);
}, jsjavax.swing, "JFrame", jsjava.awt.Frame, [jsjavax.swing.WindowConstants, jsjavax.swing.RootPaneContainer]);
Clazz.makeConstructor (c$, 
function () {
Clazz.superConstructor (this, jsjavax.swing.JFrame);
this.frameInit ();
});
Clazz.makeConstructor (c$, 
function (gc) {
Clazz.superConstructor (this, jsjavax.swing.JFrame, [gc]);
this.frameInit ();
}, "jsjava.awt.GraphicsConfiguration");
Clazz.makeConstructor (c$, 
function (title) {
Clazz.superConstructor (this, jsjavax.swing.JFrame, [title]);
this.frameInit ();
}, "~S");
Clazz.makeConstructor (c$, 
function (title, gc) {
Clazz.superConstructor (this, jsjavax.swing.JFrame, [title, gc]);
this.frameInit ();
}, "~S,jsjava.awt.GraphicsConfiguration");
Clazz.defineMethod (c$, "frameInit", 
function () {
this.enableEvents (72);
this.setLocale (jsjavax.swing.JComponent.getDefaultLocale ());
this.setRootPane (this.createRootPane ());
this.setBackground (jsjavax.swing.UIManager.getColor ("control"));
this.setRootPaneCheckingEnabled (true);
if (jsjavax.swing.JFrame.isDefaultLookAndFeelDecorated ()) {
var supportsWindowDecorations = jsjavax.swing.UIManager.getLookAndFeel ().getSupportsWindowDecorations ();
if (supportsWindowDecorations) {
this.setUndecorated (true);
this.getRootPane ().setWindowDecorationStyle (1);
}}});
Clazz.defineMethod (c$, "createRootPane", 
function () {
var rp =  new jsjavax.swing.JRootPane ();
rp.setOpaque (true);
return rp;
});
Clazz.defineMethod (c$, "processWindowEvent", 
function (e) {
Clazz.superCall (this, jsjavax.swing.JFrame, "processWindowEvent", [e]);
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
}}, "jsjava.awt.event.WindowEvent");
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
this.firePropertyChange ("defaultCloseOperation", oldValue, operation);
}}, "~N");
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
function (menubar) {
this.getRootPane ().setMenuBar (menubar);
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
Clazz.superCall (this, jsjavax.swing.JFrame, "addImpl", [comp, constraints, index]);
}}, "jsjava.awt.Component,~O,~N");
Clazz.defineMethod (c$, "remove", 
function (comp) {
if (comp === this.rootPane) {
Clazz.superCall (this, jsjavax.swing.JFrame, "remove", [comp]);
} else {
this.getContentPane ().remove (comp);
}}, "jsjava.awt.Component");
Clazz.defineMethod (c$, "setLayout", 
function (manager) {
if (this.isRootPaneCheckingEnabled ()) {
this.getContentPane ().setLayout (manager);
} else {
Clazz.superCall (this, jsjavax.swing.JFrame, "setLayout", [manager]);
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
return Clazz.superCall (this, jsjavax.swing.JFrame, "getGraphics", []);
});
Clazz.defineMethod (c$, "repaint", 
function (time, x, y, width, height) {
if (jsjavax.swing.RepaintManager.HANDLE_TOP_LEVEL_PAINT) {
jsjavax.swing.RepaintManager.currentManager (this).addDirtyRegion (this, x, y, width, height);
} else {
Clazz.superCall (this, jsjavax.swing.JFrame, "repaint", [time, x, y, width, height]);
}}, "~N,~N,~N,~N,~N");
c$.setDefaultLookAndFeelDecorated = Clazz.defineMethod (c$, "setDefaultLookAndFeelDecorated", 
function (defaultLookAndFeelDecorated) {
if (defaultLookAndFeelDecorated) {
jsjavax.swing.SwingUtilities.appContextPut (jsjavax.swing.JFrame.defaultLookAndFeelDecoratedKey, Boolean.TRUE);
} else {
jsjavax.swing.SwingUtilities.appContextPut (jsjavax.swing.JFrame.defaultLookAndFeelDecoratedKey, Boolean.FALSE);
}}, "~B");
c$.isDefaultLookAndFeelDecorated = Clazz.defineMethod (c$, "isDefaultLookAndFeelDecorated", 
function () {
var defaultLookAndFeelDecorated = jsjavax.swing.SwingUtilities.appContextGet (jsjavax.swing.JFrame.defaultLookAndFeelDecoratedKey);
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
return Clazz.superCall (this, jsjavax.swing.JFrame, "paramString", []) + ",defaultCloseOperation=" + defaultCloseOperationString + ",rootPane=" + rootPaneString + ",rootPaneCheckingEnabled=" + rootPaneCheckingEnabledString;
});
Clazz.defineStatics (c$,
"EXIT_ON_CLOSE", 3);
c$.defaultLookAndFeelDecoratedKey = c$.prototype.defaultLookAndFeelDecoratedKey =  new JavaObject ();
});

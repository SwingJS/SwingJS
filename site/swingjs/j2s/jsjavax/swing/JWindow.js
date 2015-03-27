Clazz.declarePackage ("jsjavax.swing");
Clazz.load (["jsjava.awt.Window", "jsjavax.swing.RootPaneContainer"], "jsjavax.swing.JWindow", ["jsjavax.swing.JComponent", "$.JRootPane", "$.RepaintManager", "$.SwingUtilities"], function () {
c$ = Clazz.decorateAsClass (function () {
this.rootPane = null;
this.rootPaneCheckingEnabled = false;
this.transferHandler = null;
Clazz.instantialize (this, arguments);
}, jsjavax.swing, "JWindow", jsjava.awt.Window, jsjavax.swing.RootPaneContainer);
Clazz.makeConstructor (c$, 
function () {
this.construct (Clazz.castNullAs ("jsjava.awt.Frame"));
});
Clazz.makeConstructor (c$, 
function (gc) {
this.construct (null, gc);
Clazz.superCall (this, jsjavax.swing.JWindow, "setFocusableWindowState", [false]);
}, "jsjava.awt.GraphicsConfiguration");
Clazz.makeConstructor (c$, 
function (owner) {
Clazz.superConstructor (this, jsjavax.swing.JWindow, [owner == null ? jsjavax.swing.SwingUtilities.getSharedOwnerFrame () : owner]);
if (owner == null) {
var ownerShutdownListener = jsjavax.swing.SwingUtilities.getSharedOwnerFrameShutdownListener ();
this.addWindowListener (ownerShutdownListener);
}this.windowInit ();
}, "jsjava.awt.Frame");
Clazz.makeConstructor (c$, 
function (owner) {
Clazz.superConstructor (this, jsjavax.swing.JWindow, [owner == null ? jsjavax.swing.SwingUtilities.getSharedOwnerFrame () : owner]);
if (owner == null) {
var ownerShutdownListener = jsjavax.swing.SwingUtilities.getSharedOwnerFrameShutdownListener ();
this.addWindowListener (ownerShutdownListener);
}this.windowInit ();
}, "jsjava.awt.Window");
Clazz.makeConstructor (c$, 
function (owner, gc) {
Clazz.superConstructor (this, jsjavax.swing.JWindow, [owner == null ? jsjavax.swing.SwingUtilities.getSharedOwnerFrame () : owner, gc]);
if (owner == null) {
var ownerShutdownListener = jsjavax.swing.SwingUtilities.getSharedOwnerFrameShutdownListener ();
this.addWindowListener (ownerShutdownListener);
}this.windowInit ();
}, "jsjava.awt.Window,jsjava.awt.GraphicsConfiguration");
Clazz.defineMethod (c$, "windowInit", 
function () {
this.setLocale (jsjavax.swing.JComponent.getDefaultLocale ());
this.setRootPane (this.createRootPane ());
this.setRootPaneCheckingEnabled (true);
});
Clazz.defineMethod (c$, "createRootPane", 
function () {
var rp =  new jsjavax.swing.JRootPane ();
rp.setOpaque (true);
return rp;
});
Clazz.defineMethod (c$, "isRootPaneCheckingEnabled", 
function () {
return this.rootPaneCheckingEnabled;
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
Clazz.defineMethod (c$, "setRootPaneCheckingEnabled", 
function (enabled) {
this.rootPaneCheckingEnabled = enabled;
}, "~B");
Clazz.defineMethod (c$, "addImpl", 
function (comp, constraints, index) {
if (this.isRootPaneCheckingEnabled ()) {
this.getContentPane ().add (comp, constraints, index);
} else {
Clazz.superCall (this, jsjavax.swing.JWindow, "addImpl", [comp, constraints, index]);
}}, "jsjava.awt.Component,~O,~N");
Clazz.defineMethod (c$, "remove", 
function (comp) {
if (comp === this.rootPane) {
Clazz.superCall (this, jsjavax.swing.JWindow, "remove", [comp]);
} else {
this.getContentPane ().remove (comp);
}}, "jsjava.awt.Component");
Clazz.defineMethod (c$, "setLayout", 
function (manager) {
if (this.isRootPaneCheckingEnabled ()) {
this.getContentPane ().setLayout (manager);
} else {
Clazz.superCall (this, jsjavax.swing.JWindow, "setLayout", [manager]);
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
return Clazz.superCall (this, jsjavax.swing.JWindow, "getGraphics", []);
});
Clazz.defineMethod (c$, "repaint", 
function (time, x, y, width, height) {
if (jsjavax.swing.RepaintManager.HANDLE_TOP_LEVEL_PAINT) {
jsjavax.swing.RepaintManager.currentManager (this).addDirtyRegion (this, x, y, width, height);
} else {
Clazz.superCall (this, jsjavax.swing.JWindow, "repaint", [time, x, y, width, height]);
}}, "~N,~N,~N,~N,~N");
Clazz.defineMethod (c$, "paramString", 
function () {
var rootPaneCheckingEnabledString = (this.rootPaneCheckingEnabled ? "true" : "false");
return Clazz.superCall (this, jsjavax.swing.JWindow, "paramString", []) + ",rootPaneCheckingEnabled=" + rootPaneCheckingEnabledString;
});
});

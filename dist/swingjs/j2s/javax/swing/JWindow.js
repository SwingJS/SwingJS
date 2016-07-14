Clazz.declarePackage ("javax.swing");
Clazz.load (["java.awt.Window", "javax.swing.RootPaneContainer"], "javax.swing.JWindow", ["javax.swing.JComponent", "$.JRootPane", "$.RepaintManager", "$.SwingUtilities", "swingjs.JSFrameViewer"], function () {
c$ = Clazz.decorateAsClass (function () {
this.rootPane = null;
this.rootPaneCheckingEnabled = false;
this.transferHandler = null;
Clazz.instantialize (this, arguments);
}, javax.swing, "JWindow", java.awt.Window, javax.swing.RootPaneContainer);
Clazz.makeConstructor (c$, 
function () {
this.construct (Clazz.castNullAs ("java.awt.Frame"));
});
Clazz.makeConstructor (c$, 
function (gc) {
this.construct (null, gc);
Clazz.superCall (this, javax.swing.JWindow, "setFocusableWindowState", [false]);
}, "java.awt.GraphicsConfiguration");
Clazz.makeConstructor (c$, 
function (owner) {
Clazz.superConstructor (this, javax.swing.JWindow, [owner == null ? javax.swing.SwingUtilities.getSharedOwnerFrame () : owner]);
if (owner == null) {
var ownerShutdownListener = javax.swing.SwingUtilities.getSharedOwnerFrameShutdownListener ();
this.addWindowListener (ownerShutdownListener);
}this.windowInit ();
}, "java.awt.Frame");
Clazz.makeConstructor (c$, 
function (owner) {
Clazz.superConstructor (this, javax.swing.JWindow, [owner == null ? javax.swing.SwingUtilities.getSharedOwnerFrame () : owner]);
if (owner == null) {
var ownerShutdownListener = javax.swing.SwingUtilities.getSharedOwnerFrameShutdownListener ();
this.addWindowListener (ownerShutdownListener);
}this.windowInit ();
}, "java.awt.Window");
Clazz.makeConstructor (c$, 
function (owner, gc) {
Clazz.superConstructor (this, javax.swing.JWindow, [owner == null ? javax.swing.SwingUtilities.getSharedOwnerFrame () : owner, gc]);
if (owner == null) {
var ownerShutdownListener = javax.swing.SwingUtilities.getSharedOwnerFrameShutdownListener ();
this.addWindowListener (ownerShutdownListener);
}this.windowInit ();
}, "java.awt.Window,java.awt.GraphicsConfiguration");
Clazz.defineMethod (c$, "windowInit", 
function () {
this.frameViewer =  new swingjs.JSFrameViewer ().setForWindow (this);
this.setLocale (javax.swing.JComponent.getDefaultLocale ());
this.setRootPane (this.createRootPane ());
this.rootPane.setFrameViewer (this.frameViewer);
this.setRootPaneCheckingEnabled (true);
this.uiClassID = "WindowUI";
this.updateUI ();
this.addNotify ();
this.rootPane.addNotify ();
});
Clazz.defineMethod (c$, "createRootPane", 
function () {
var rp =  new javax.swing.JRootPane ("_Window" + (++javax.swing.JWindow.windowCount), false);
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
Clazz.superCall (this, javax.swing.JWindow, "setLayout", [manager]);
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
return Clazz.superCall (this, javax.swing.JWindow, "getGraphics", []);
});
Clazz.defineMethod (c$, "repaint", 
function (time, x, y, width, height) {
if (javax.swing.RepaintManager.HANDLE_TOP_LEVEL_PAINT) {
javax.swing.RepaintManager.currentManager (this).addDirtyRegion (this, x, y, width, height);
} else {
Clazz.superCall (this, javax.swing.JWindow, "repaint", [time, x, y, width, height]);
}}, "~N,~N,~N,~N,~N");
Clazz.defineMethod (c$, "paramString", 
function () {
var rootPaneCheckingEnabledString = (this.rootPaneCheckingEnabled ? "true" : "false");
return Clazz.superCall (this, javax.swing.JWindow, "paramString", []) + ",rootPaneCheckingEnabled=" + rootPaneCheckingEnabledString;
});
Clazz.defineStatics (c$,
"windowCount", 0);
});

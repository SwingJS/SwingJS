Clazz.declarePackage ("javax.swing");
Clazz.load (["java.applet.Applet", "javax.swing.RootPaneContainer"], "javax.swing.JApplet", ["java.awt.BorderLayout", "$.Color", "javax.swing.JComponent", "$.JRootPane", "$.RepaintManager", "$.SwingUtilities", "swingjs.JSToolkit"], function () {
c$ = Clazz.decorateAsClass (function () {
this.rootPane = null;
this.rootPaneCheckingEnabled = false;
this.transferHandler = null;
Clazz.instantialize (this, arguments);
}, javax.swing, "JApplet", java.applet.Applet, javax.swing.RootPaneContainer);
Clazz.makeConstructor (c$, 
function () {
Clazz.superConstructor (this, javax.swing.JApplet, []);
this.frameViewer = this.appletViewer;
this.setJApplet ();
});
Clazz.defineMethod (c$, "setJApplet", 
 function () {
this.setForeground (java.awt.Color.black);
this.setBackground (java.awt.Color.white);
this.setLocale (javax.swing.JComponent.getDefaultLocale ());
this.setLayout ( new java.awt.BorderLayout ());
this.setRootPane (this.createRootPane ());
this.rootPane.setFrameViewer (this.frameViewer);
this.setRootPaneCheckingEnabled (true);
this.setFocusTraversalPolicyProvider (true);
this.enableEvents (8);
});
Clazz.defineMethod (c$, "createRootPane", 
function () {
var rp =  new javax.swing.JRootPane ("", true);
rp.setOpaque (true);
return rp;
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
Clazz.defineMethod (c$, "paint", 
function (g) {
this.getRootPane ().paint (g);
var p = swingjs.JSToolkit.getAppletViewer ();
if (p.allWindows != null) for (var i = p.allWindows.size (); --i >= 0; ) p.allWindows.get (i).paint (g);

}, "java.awt.Graphics");
Clazz.overrideMethod (c$, "update", 
function (g) {
this.paint (g);
}, "java.awt.Graphics");
Clazz.defineMethod (c$, "setJMenuBar", 
function (menuBar) {
this.getRootPane ().setMenuBar (menuBar);
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
Clazz.superCall (this, javax.swing.JApplet, "setLayout", [manager]);
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
return Clazz.superCall (this, javax.swing.JApplet, "getGraphics", []);
});
Clazz.defineMethod (c$, "repaint", 
function (time, x, y, width, height) {
if (javax.swing.RepaintManager.HANDLE_TOP_LEVEL_PAINT) {
javax.swing.RepaintManager.currentManager (this).addDirtyRegion (this, x, y, width, height);
} else {
Clazz.superCall (this, javax.swing.JApplet, "repaint", [time, x, y, width, height]);
}}, "~N,~N,~N,~N,~N");
Clazz.defineMethod (c$, "repaintNow", 
function () {
this.repaint (100, 0, 0, this.getWidth (), this.getHeight ());
});
Clazz.defineMethod (c$, "paramString", 
function () {
var rootPaneString = (this.rootPane != null ? this.rootPane.toString () : "");
var rootPaneCheckingEnabledString = (this.rootPaneCheckingEnabled ? "true" : "false");
return Clazz.superCall (this, javax.swing.JApplet, "paramString", []) + ",rootPane=" + rootPaneString + ",rootPaneCheckingEnabled=" + rootPaneCheckingEnabledString;
});
});

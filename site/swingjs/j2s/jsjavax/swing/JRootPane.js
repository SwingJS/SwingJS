Clazz.declarePackage ("jsjavax.swing");
Clazz.load (["jsjava.awt.LayoutManager2", "jsjavax.swing.AbstractAction", "$.JComponent"], "jsjavax.swing.JRootPane", ["java.lang.IllegalArgumentException", "$.NullPointerException", "$.Thread", "jsjava.awt.BorderLayout", "$.Dimension", "$.IllegalComponentStateException", "$.Rectangle", "jsjavax.swing.JLayeredPane", "$.JPanel", "$.RepaintManager", "$.SwingUtilities", "$.UIManager", "jssun.awt.AWTAccessor"], function () {
c$ = Clazz.decorateAsClass (function () {
this.windowDecorationStyle = 0;
this.menuBar = null;
this.contentPane = null;
this.layeredPane = null;
this.glassPane = null;
this.defaultButton = null;
this.defaultPressAction = null;
this.defaultReleaseAction = null;
this.useTrueDoubleBuffering = true;
if (!Clazz.isClassDefined ("jsjavax.swing.JRootPane.RootLayout")) {
jsjavax.swing.JRootPane.$JRootPane$RootLayout$ ();
}
Clazz.instantialize (this, arguments);
}, jsjavax.swing, "JRootPane", jsjavax.swing.JComponent);
Clazz.makeConstructor (c$, 
function () {
Clazz.superConstructor (this, jsjavax.swing.JRootPane, []);
this.setGlassPane (this.createGlassPane ());
this.setLayeredPane (this.createLayeredPane ());
this.setContentPane (this.createContentPane ());
this.setLayout (this.createRootLayout ());
this.setDoubleBuffered (true);
this.updateUI ();
});
Clazz.defineMethod (c$, "setDoubleBuffered", 
function (aFlag) {
if (this.isDoubleBuffered () != aFlag) {
Clazz.superCall (this, jsjavax.swing.JRootPane, "setDoubleBuffered", [aFlag]);
jsjavax.swing.RepaintManager.currentManager (this).doubleBufferingChanged (this);
}}, "~B");
Clazz.defineMethod (c$, "getWindowDecorationStyle", 
function () {
return this.windowDecorationStyle;
});
Clazz.defineMethod (c$, "setWindowDecorationStyle", 
function (windowDecorationStyle) {
if (windowDecorationStyle < 0 || windowDecorationStyle > 8) {
throw  new IllegalArgumentException ("Invalid decoration style");
}var oldWindowDecorationStyle = this.getWindowDecorationStyle ();
this.windowDecorationStyle = windowDecorationStyle;
this.firePropertyChange ("windowDecorationStyle", oldWindowDecorationStyle, windowDecorationStyle);
}, "~N");
Clazz.defineMethod (c$, "getUI", 
function () {
return this.ui;
});
Clazz.overrideMethod (c$, "updateUI", 
function () {
this.setUI (jsjavax.swing.UIManager.getUI (this));
});
Clazz.overrideMethod (c$, "getUIClassID", 
function () {
return "RootPaneUI";
});
Clazz.defineMethod (c$, "createLayeredPane", 
function () {
var p =  new jsjavax.swing.JLayeredPane ();
p.setName (this.getName () + ".layeredPane");
return p;
});
Clazz.defineMethod (c$, "createContentPane", 
function () {
var c =  new jsjavax.swing.JPanel ();
c.setName (this.getName () + ".contentPane");
c.setLayout (((Clazz.isClassDefined ("jsjavax.swing.JRootPane$1") ? 0 : jsjavax.swing.JRootPane.$JRootPane$1$ ()), Clazz.innerTypeInstance (jsjavax.swing.JRootPane$1, this, null)));
return c;
});
Clazz.defineMethod (c$, "createGlassPane", 
function () {
var c =  new jsjavax.swing.JPanel ();
c.setName (this.getName () + ".glassPane");
c.setVisible (false);
(c).setOpaque (false);
return c;
});
Clazz.defineMethod (c$, "createRootLayout", 
function () {
return Clazz.innerTypeInstance (jsjavax.swing.JRootPane.RootLayout, this, null);
});
Clazz.defineMethod (c$, "setJMenuBar", 
function (menu) {
if (this.menuBar != null && this.menuBar.getParent () === this.layeredPane) this.layeredPane.remove (this.menuBar);
this.menuBar = menu;
if (this.menuBar != null) this.layeredPane.add (this.menuBar, jsjavax.swing.JLayeredPane.FRAME_CONTENT_LAYER);
}, "jsjavax.swing.JMenuBar");
Clazz.defineMethod (c$, "setMenuBar", 
function (menu) {
if (this.menuBar != null && this.menuBar.getParent () === this.layeredPane) this.layeredPane.remove (this.menuBar);
this.menuBar = menu;
if (this.menuBar != null) this.layeredPane.add (this.menuBar, jsjavax.swing.JLayeredPane.FRAME_CONTENT_LAYER);
}, "jsjavax.swing.JMenuBar");
Clazz.defineMethod (c$, "getJMenuBar", 
function () {
return this.menuBar;
});
Clazz.defineMethod (c$, "getMenuBar", 
function () {
return this.menuBar;
});
Clazz.defineMethod (c$, "setContentPane", 
function (content) {
if (content == null) throw  new jsjava.awt.IllegalComponentStateException ("contentPane cannot be set to null.");
if (this.contentPane != null && this.contentPane.getParent () === this.layeredPane) this.layeredPane.remove (this.contentPane);
this.contentPane = content;
this.layeredPane.add (this.contentPane, jsjavax.swing.JLayeredPane.FRAME_CONTENT_LAYER);
}, "jsjava.awt.Container");
Clazz.defineMethod (c$, "getContentPane", 
function () {
return this.contentPane;
});
Clazz.defineMethod (c$, "setLayeredPane", 
function (layered) {
if (layered == null) throw  new jsjava.awt.IllegalComponentStateException ("layeredPane cannot be set to null.");
if (this.layeredPane != null && this.layeredPane.getParent () === this) this.remove (this.layeredPane);
this.layeredPane = layered;
this.add (this.layeredPane, -1);
}, "jsjavax.swing.JLayeredPane");
Clazz.defineMethod (c$, "getLayeredPane", 
function () {
return this.layeredPane;
});
Clazz.defineMethod (c$, "setGlassPane", 
function (glass) {
if (glass == null) {
throw  new NullPointerException ("glassPane cannot be set to null.");
}jssun.awt.AWTAccessor.getComponentAccessor ().setMixingCutoutShape (glass,  new jsjava.awt.Rectangle ());
var visible = false;
if (this.glassPane != null && this.glassPane.getParent () === this) {
this.remove (this.glassPane);
visible = this.glassPane.isVisible ();
}glass.setVisible (visible);
this.glassPane = glass;
this.add (this.glassPane, 0);
if (visible) {
this.repaint ();
}}, "jsjava.awt.Component");
Clazz.defineMethod (c$, "getGlassPane", 
function () {
return this.glassPane;
});
Clazz.overrideMethod (c$, "isValidateRoot", 
function () {
return true;
});
Clazz.overrideMethod (c$, "isOptimizedDrawingEnabled", 
function () {
return !this.glassPane.isVisible ();
});
Clazz.defineMethod (c$, "addNotify", 
function () {
Clazz.superCall (this, jsjavax.swing.JRootPane, "addNotify", []);
this.enableEvents (8);
});
Clazz.defineMethod (c$, "setDefaultButton", 
function (defaultButton) {
var oldDefault = this.defaultButton;
if (oldDefault !== defaultButton) {
this.defaultButton = defaultButton;
if (oldDefault != null) {
oldDefault.repaint ();
}if (defaultButton != null) {
defaultButton.repaint ();
}}this.firePropertyChange ("defaultButton", oldDefault, defaultButton);
}, "jsjavax.swing.JButton");
Clazz.defineMethod (c$, "getDefaultButton", 
function () {
return this.defaultButton;
});
Clazz.defineMethod (c$, "setUseTrueDoubleBuffering", 
function (useTrueDoubleBuffering) {
this.useTrueDoubleBuffering = useTrueDoubleBuffering;
}, "~B");
Clazz.defineMethod (c$, "getUseTrueDoubleBuffering", 
function () {
return this.useTrueDoubleBuffering;
});
Clazz.defineMethod (c$, "disableTrueDoubleBuffering", 
function () {
if (this.useTrueDoubleBuffering) {
if (!jsjavax.swing.JRootPane.IGNORE_DISABLE_TRUE_DOUBLE_BUFFERING) {
if (jsjavax.swing.JRootPane.LOG_DISABLE_TRUE_DOUBLE_BUFFERING) {
System.out.println ("Disabling true double buffering for " + this);
Thread.dumpStack ();
}this.useTrueDoubleBuffering = false;
jsjavax.swing.RepaintManager.currentManager (this).doubleBufferingChanged (this);
}}});
Clazz.defineMethod (c$, "addImpl", 
function (comp, constraints, index) {
Clazz.superCall (this, jsjavax.swing.JRootPane, "addImpl", [comp, constraints, index]);
if (this.glassPane != null && this.glassPane.getParent () === this && this.getComponent (0) !== this.glassPane) {
this.add (this.glassPane, 0);
}}, "jsjava.awt.Component,~O,~N");
c$.$JRootPane$RootLayout$ = function () {
Clazz.pu$h ();
c$ = Clazz.decorateAsClass (function () {
Clazz.prepareCallback (this, arguments);
Clazz.instantialize (this, arguments);
}, jsjavax.swing.JRootPane, "RootLayout", null, jsjava.awt.LayoutManager2);
Clazz.overrideMethod (c$, "preferredLayoutSize", 
function (a) {
var b;
var c;
var d = this.b$["jsjavax.swing.JRootPane"].getInsets ();
if (this.b$["jsjavax.swing.JRootPane"].contentPane != null) {
b = this.b$["jsjavax.swing.JRootPane"].contentPane.getPreferredSize ();
} else {
b = a.getSize ();
}if (this.b$["jsjavax.swing.JRootPane"].menuBar != null && this.b$["jsjavax.swing.JRootPane"].menuBar.isVisible ()) {
c = this.b$["jsjavax.swing.JRootPane"].menuBar.getPreferredSize ();
} else {
c =  new jsjava.awt.Dimension (0, 0);
}return  new jsjava.awt.Dimension (Math.max (b.width, c.width) + d.left + d.right, b.height + c.height + d.top + d.bottom);
}, "jsjava.awt.Container");
Clazz.overrideMethod (c$, "minimumLayoutSize", 
function (a) {
var b;
var c;
var d = this.b$["jsjavax.swing.JRootPane"].getInsets ();
if (this.b$["jsjavax.swing.JRootPane"].contentPane != null) {
b = this.b$["jsjavax.swing.JRootPane"].contentPane.getMinimumSize ();
} else {
b = a.getSize ();
}if (this.b$["jsjavax.swing.JRootPane"].menuBar != null && this.b$["jsjavax.swing.JRootPane"].menuBar.isVisible ()) {
c = this.b$["jsjavax.swing.JRootPane"].menuBar.getMinimumSize ();
} else {
c =  new jsjava.awt.Dimension (0, 0);
}return  new jsjava.awt.Dimension (Math.max (b.width, c.width) + d.left + d.right, b.height + c.height + d.top + d.bottom);
}, "jsjava.awt.Container");
Clazz.overrideMethod (c$, "maximumLayoutSize", 
function (a) {
var b;
var c;
var d = this.b$["jsjavax.swing.JRootPane"].getInsets ();
if (this.b$["jsjavax.swing.JRootPane"].menuBar != null && this.b$["jsjavax.swing.JRootPane"].menuBar.isVisible ()) {
c = this.b$["jsjavax.swing.JRootPane"].menuBar.getMaximumSize ();
} else {
c =  new jsjava.awt.Dimension (0, 0);
}if (this.b$["jsjavax.swing.JRootPane"].contentPane != null) {
b = this.b$["jsjavax.swing.JRootPane"].contentPane.getMaximumSize ();
} else {
b =  new jsjava.awt.Dimension (2147483647, 2147483647 - d.top - d.bottom - c.height - 1);
}return  new jsjava.awt.Dimension (Math.min (b.width, c.width) + d.left + d.right, b.height + c.height + d.top + d.bottom);
}, "jsjava.awt.Container");
Clazz.overrideMethod (c$, "layoutContainer", 
function (a) {
var b = a.getBounds ();
var c = this.b$["jsjavax.swing.JRootPane"].getInsets ();
var d = 0;
var e = b.width - c.right - c.left;
var f = b.height - c.top - c.bottom;
if (this.b$["jsjavax.swing.JRootPane"].layeredPane != null) {
this.b$["jsjavax.swing.JRootPane"].layeredPane.setBounds (c.left, c.top, e, f);
}if (this.b$["jsjavax.swing.JRootPane"].glassPane != null) {
this.b$["jsjavax.swing.JRootPane"].glassPane.setBounds (c.left, c.top, e, f);
}if (this.b$["jsjavax.swing.JRootPane"].menuBar != null && this.b$["jsjavax.swing.JRootPane"].menuBar.isVisible ()) {
var g = this.b$["jsjavax.swing.JRootPane"].menuBar.getPreferredSize ();
this.b$["jsjavax.swing.JRootPane"].menuBar.setBounds (0, 0, e, g.height);
d += g.height;
}if (this.b$["jsjavax.swing.JRootPane"].contentPane != null) {
this.b$["jsjavax.swing.JRootPane"].contentPane.setBounds (0, d, e, f - d);
}}, "jsjava.awt.Container");
Clazz.defineMethod (c$, "addLayoutComponent", 
function (a, b) {
}, "~S,jsjava.awt.Component");
Clazz.overrideMethod (c$, "removeLayoutComponent", 
function (a) {
}, "jsjava.awt.Component");
Clazz.defineMethod (c$, "addLayoutComponent", 
function (a, b) {
}, "jsjava.awt.Component,~O");
Clazz.overrideMethod (c$, "getLayoutAlignmentX", 
function (a) {
return 0.0;
}, "jsjava.awt.Container");
Clazz.overrideMethod (c$, "getLayoutAlignmentY", 
function (a) {
return 0.0;
}, "jsjava.awt.Container");
Clazz.overrideMethod (c$, "invalidateLayout", 
function (a) {
}, "jsjava.awt.Container");
c$ = Clazz.p0p ();
};
c$.$JRootPane$1$ = function () {
Clazz.pu$h ();
c$ = Clazz.declareAnonymous (jsjavax.swing, "JRootPane$1", jsjava.awt.BorderLayout);
Clazz.defineMethod (c$, "addLayoutComponent", 
function (comp, constraints) {
if (constraints == null) {
constraints = "Center";
}Clazz.superCall (this, jsjavax.swing.JRootPane$1, "addLayoutComponent", [comp, constraints]);
}, "jsjava.awt.Component,~O");
c$ = Clazz.p0p ();
};
Clazz.pu$h ();
c$ = Clazz.decorateAsClass (function () {
this.owner = null;
this.root = null;
this.press = false;
Clazz.instantialize (this, arguments);
}, jsjavax.swing.JRootPane, "DefaultAction", jsjavax.swing.AbstractAction);
Clazz.makeConstructor (c$, 
function (a, b) {
Clazz.superConstructor (this, jsjavax.swing.JRootPane.DefaultAction, []);
this.root = a;
this.press = b;
}, "jsjavax.swing.JRootPane,~B");
Clazz.defineMethod (c$, "setOwner", 
function (a) {
this.owner = a;
}, "jsjavax.swing.JButton");
Clazz.overrideMethod (c$, "actionPerformed", 
function (a) {
if (this.owner != null && jsjavax.swing.SwingUtilities.getRootPane (this.owner) === this.root) {
var b = this.owner.getModel ();
if (this.press) {
b.setArmed (true);
b.setPressed (true);
} else {
b.setPressed (false);
}}}, "jsjava.awt.event.ActionEvent");
Clazz.overrideMethod (c$, "isEnabled", 
function () {
return this.owner.getModel ().isEnabled ();
});
c$ = Clazz.p0p ();
Clazz.defineStatics (c$,
"$uiClassID", "RootPaneUI",
"LOG_DISABLE_TRUE_DOUBLE_BUFFERING", false,
"IGNORE_DISABLE_TRUE_DOUBLE_BUFFERING", false,
"NONE", 0,
"FRAME", 1,
"PLAIN_DIALOG", 2,
"INFORMATION_DIALOG", 3,
"ERROR_DIALOG", 4,
"COLOR_CHOOSER_DIALOG", 5,
"FILE_CHOOSER_DIALOG", 6,
"QUESTION_DIALOG", 7,
"WARNING_DIALOG", 8);
{
jsjavax.swing.JRootPane.LOG_DISABLE_TRUE_DOUBLE_BUFFERING = false;
jsjavax.swing.JRootPane.IGNORE_DISABLE_TRUE_DOUBLE_BUFFERING = true;
}});

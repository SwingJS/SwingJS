Clazz.declarePackage ("jsjavax.swing");
Clazz.load (["jsjavax.swing.JComponent"], "jsjavax.swing.Box", ["jsjava.awt.AWTError", "$.Dimension", "jsjavax.swing.BoxLayout"], function () {
c$ = Clazz.declareType (jsjavax.swing, "Box", jsjavax.swing.JComponent);
Clazz.makeConstructor (c$, 
function (axis) {
Clazz.superConstructor (this, jsjavax.swing.Box);
Clazz.superCall (this, jsjavax.swing.Box, "setLayout", [ new jsjavax.swing.BoxLayout (this, axis)]);
}, "~N");
c$.createHorizontalBox = Clazz.defineMethod (c$, "createHorizontalBox", 
function () {
return  new jsjavax.swing.Box (0);
});
c$.createVerticalBox = Clazz.defineMethod (c$, "createVerticalBox", 
function () {
return  new jsjavax.swing.Box (1);
});
c$.createRigidArea = Clazz.defineMethod (c$, "createRigidArea", 
function (d) {
return  new jsjavax.swing.Box.Filler (d, d, d);
}, "jsjava.awt.Dimension");
c$.createHorizontalStrut = Clazz.defineMethod (c$, "createHorizontalStrut", 
function (width) {
return  new jsjavax.swing.Box.Filler ( new jsjava.awt.Dimension (width, 0),  new jsjava.awt.Dimension (width, 0),  new jsjava.awt.Dimension (width, 32767));
}, "~N");
c$.createVerticalStrut = Clazz.defineMethod (c$, "createVerticalStrut", 
function (height) {
return  new jsjavax.swing.Box.Filler ( new jsjava.awt.Dimension (0, height),  new jsjava.awt.Dimension (0, height),  new jsjava.awt.Dimension (32767, height));
}, "~N");
c$.createGlue = Clazz.defineMethod (c$, "createGlue", 
function () {
return  new jsjavax.swing.Box.Filler ( new jsjava.awt.Dimension (0, 0),  new jsjava.awt.Dimension (0, 0),  new jsjava.awt.Dimension (32767, 32767));
});
c$.createHorizontalGlue = Clazz.defineMethod (c$, "createHorizontalGlue", 
function () {
return  new jsjavax.swing.Box.Filler ( new jsjava.awt.Dimension (0, 0),  new jsjava.awt.Dimension (0, 0),  new jsjava.awt.Dimension (32767, 0));
});
c$.createVerticalGlue = Clazz.defineMethod (c$, "createVerticalGlue", 
function () {
return  new jsjavax.swing.Box.Filler ( new jsjava.awt.Dimension (0, 0),  new jsjava.awt.Dimension (0, 0),  new jsjava.awt.Dimension (0, 32767));
});
Clazz.defineMethod (c$, "setLayout", 
function (l) {
throw  new jsjava.awt.AWTError ("Illegal request");
}, "jsjava.awt.LayoutManager");
Clazz.defineMethod (c$, "paintComponent", 
function (g) {
if (this.ui != null) {
Clazz.superCall (this, jsjavax.swing.Box, "paintComponent", [g]);
} else if (this.isOpaque ()) {
g.setColor (this.getBackground ());
g.fillRect (0, 0, this.getWidth (), this.getHeight ());
}}, "jsjava.awt.Graphics");
Clazz.pu$h ();
c$ = Clazz.declareType (jsjavax.swing.Box, "Filler", jsjavax.swing.JComponent);
Clazz.makeConstructor (c$, 
function (a, b, c) {
Clazz.superConstructor (this, jsjavax.swing.Box.Filler, []);
this.setMinimumSize (a);
this.setPreferredSize (b);
this.setMaximumSize (c);
}, "jsjava.awt.Dimension,jsjava.awt.Dimension,jsjava.awt.Dimension");
Clazz.defineMethod (c$, "changeShape", 
function (a, b, c) {
this.setMinimumSize (a);
this.setPreferredSize (b);
this.setMaximumSize (c);
this.revalidate ();
}, "jsjava.awt.Dimension,jsjava.awt.Dimension,jsjava.awt.Dimension");
Clazz.defineMethod (c$, "paintComponent", 
function (a) {
if (this.ui != null) {
Clazz.superCall (this, jsjavax.swing.Box.Filler, "paintComponent", [a]);
} else if (this.isOpaque ()) {
a.setColor (this.getBackground ());
a.fillRect (0, 0, this.getWidth (), this.getHeight ());
}}, "jsjava.awt.Graphics");
c$ = Clazz.p0p ();
});

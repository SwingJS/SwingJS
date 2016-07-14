Clazz.declarePackage ("javax.swing");
Clazz.load (["javax.swing.JComponent"], "javax.swing.Box", ["java.awt.AWTError", "$.Dimension", "javax.swing.BoxLayout"], function () {
c$ = Clazz.declareType (javax.swing, "Box", javax.swing.JComponent);
Clazz.makeConstructor (c$, 
function (axis) {
Clazz.superConstructor (this, javax.swing.Box);
Clazz.superCall (this, javax.swing.Box, "setLayout", [ new javax.swing.BoxLayout (this, axis)]);
}, "~N");
c$.createHorizontalBox = Clazz.defineMethod (c$, "createHorizontalBox", 
function () {
return  new javax.swing.Box (0);
});
c$.createVerticalBox = Clazz.defineMethod (c$, "createVerticalBox", 
function () {
return  new javax.swing.Box (1);
});
c$.createRigidArea = Clazz.defineMethod (c$, "createRigidArea", 
function (d) {
return  new javax.swing.Box.Filler (d, d, d);
}, "java.awt.Dimension");
c$.createHorizontalStrut = Clazz.defineMethod (c$, "createHorizontalStrut", 
function (width) {
return  new javax.swing.Box.Filler ( new java.awt.Dimension (width, 0),  new java.awt.Dimension (width, 0),  new java.awt.Dimension (width, 32767));
}, "~N");
c$.createVerticalStrut = Clazz.defineMethod (c$, "createVerticalStrut", 
function (height) {
return  new javax.swing.Box.Filler ( new java.awt.Dimension (0, height),  new java.awt.Dimension (0, height),  new java.awt.Dimension (32767, height));
}, "~N");
c$.createGlue = Clazz.defineMethod (c$, "createGlue", 
function () {
return  new javax.swing.Box.Filler ( new java.awt.Dimension (0, 0),  new java.awt.Dimension (0, 0),  new java.awt.Dimension (32767, 32767));
});
c$.createHorizontalGlue = Clazz.defineMethod (c$, "createHorizontalGlue", 
function () {
return  new javax.swing.Box.Filler ( new java.awt.Dimension (0, 0),  new java.awt.Dimension (0, 0),  new java.awt.Dimension (32767, 0));
});
c$.createVerticalGlue = Clazz.defineMethod (c$, "createVerticalGlue", 
function () {
return  new javax.swing.Box.Filler ( new java.awt.Dimension (0, 0),  new java.awt.Dimension (0, 0),  new java.awt.Dimension (0, 32767));
});
Clazz.defineMethod (c$, "setLayout", 
function (l) {
throw  new java.awt.AWTError ("Illegal request");
}, "java.awt.LayoutManager");
Clazz.defineMethod (c$, "paintComponent", 
function (g) {
if (this.ui != null) {
Clazz.superCall (this, javax.swing.Box, "paintComponent", [g]);
} else if (this.isOpaque ()) {
g.setColor (this.getBackground ());
g.fillRect (0, 0, this.getWidth (), this.getHeight ());
}}, "java.awt.Graphics");
Clazz.pu$h(self.c$);
c$ = Clazz.declareType (javax.swing.Box, "Filler", javax.swing.JComponent);
Clazz.makeConstructor (c$, 
function (a, b, c) {
Clazz.superConstructor (this, javax.swing.Box.Filler, []);
this.setMinimumSize (a);
this.setPreferredSize (b);
this.setMaximumSize (c);
}, "java.awt.Dimension,java.awt.Dimension,java.awt.Dimension");
Clazz.defineMethod (c$, "changeShape", 
function (a, b, c) {
this.setMinimumSize (a);
this.setPreferredSize (b);
this.setMaximumSize (c);
this.revalidate ();
}, "java.awt.Dimension,java.awt.Dimension,java.awt.Dimension");
Clazz.defineMethod (c$, "paintComponent", 
function (a) {
if (this.ui != null) {
Clazz.superCall (this, javax.swing.Box.Filler, "paintComponent", [a]);
} else if (this.isOpaque ()) {
a.setColor (this.getBackground ());
a.fillRect (0, 0, this.getWidth (), this.getHeight ());
}}, "java.awt.Graphics");
c$ = Clazz.p0p ();
});

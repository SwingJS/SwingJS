Clazz.declarePackage ("javax.swing");
Clazz.load (["java.awt.Container"], "javax.swing.CellRendererPane", null, function () {
c$ = Clazz.declareType (javax.swing, "CellRendererPane", java.awt.Container);
Clazz.makeConstructor (c$, 
function () {
Clazz.superConstructor (this, javax.swing.CellRendererPane);
this.setLayout (null);
this.setVisible (false);
});
Clazz.overrideMethod (c$, "invalidate", 
function () {
});
Clazz.overrideMethod (c$, "paint", 
function (g) {
}, "java.awt.Graphics");
Clazz.overrideMethod (c$, "update", 
function (g) {
}, "java.awt.Graphics");
Clazz.overrideMethod (c$, "addImpl", 
function (x, constraints, index) {
if (x.getParent () === this) {
return null;
} else {
return this.addImplSAEM (x, constraints, index);
}}, "java.awt.Component,~O,~N");
Clazz.defineMethod (c$, "paintComponent", 
function (g, c, p, x, y, w, h, shouldValidate) {
if (c == null) {
if (p != null) {
var oldColor = g.getColor ();
g.setColor (p.getBackground ());
g.fillRect (x, y, w, h);
g.setColor (oldColor);
}return;
}if (c.getParent () !== this) {
this.add (c);
}c.setBounds (x, y, w, h);
if (shouldValidate) {
c.validate ();
}var cg = g.create4 (x, y, w, h);
try {
c.paint (cg);
} finally {
cg.dispose ();
}
c.setBounds (-w, -h, 0, 0);
}, "java.awt.Graphics,java.awt.Component,java.awt.Container,~N,~N,~N,~N,~B");
Clazz.defineMethod (c$, "paintComponent", 
function (g, c, p, x, y, w, h) {
this.paintComponent (g, c, p, x, y, w, h, false);
}, "java.awt.Graphics,java.awt.Component,java.awt.Container,~N,~N,~N,~N");
Clazz.defineMethod (c$, "paintComponent", 
function (g, c, p, r) {
this.paintComponent (g, c, p, r.x, r.y, r.width, r.height);
}, "java.awt.Graphics,java.awt.Component,java.awt.Container,java.awt.Rectangle");
});

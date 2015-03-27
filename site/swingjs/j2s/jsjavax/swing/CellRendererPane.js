Clazz.declarePackage ("jsjavax.swing");
Clazz.load (["jsjava.awt.Container"], "jsjavax.swing.CellRendererPane", ["jsjavax.swing.JComponent"], function () {
c$ = Clazz.declareType (jsjavax.swing, "CellRendererPane", jsjava.awt.Container);
Clazz.makeConstructor (c$, 
function () {
Clazz.superConstructor (this, jsjavax.swing.CellRendererPane);
this.setLayout (null);
this.setVisible (false);
});
Clazz.overrideMethod (c$, "invalidate", 
function () {
});
Clazz.overrideMethod (c$, "paint", 
function (g) {
}, "jsjava.awt.Graphics");
Clazz.overrideMethod (c$, "update", 
function (g) {
}, "jsjava.awt.Graphics");
Clazz.defineMethod (c$, "addImpl", 
function (x, constraints, index) {
if (x.getParent () === this) {
return;
} else {
Clazz.superCall (this, jsjavax.swing.CellRendererPane, "addImpl", [x, constraints, index]);
}}, "jsjava.awt.Component,~O,~N");
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
}var wasDoubleBuffered = false;
if ((Clazz.instanceOf (c, jsjavax.swing.JComponent)) && (c).isDoubleBuffered ()) {
wasDoubleBuffered = true;
(c).setDoubleBuffered (false);
}var cg = g.create (x, y, w, h);
try {
c.paint (cg);
} finally {
cg.dispose ();
}
if (wasDoubleBuffered && (Clazz.instanceOf (c, jsjavax.swing.JComponent))) {
(c).setDoubleBuffered (true);
}c.setBounds (-w, -h, 0, 0);
}, "jsjava.awt.Graphics,jsjava.awt.Component,jsjava.awt.Container,~N,~N,~N,~N,~B");
Clazz.defineMethod (c$, "paintComponent", 
function (g, c, p, x, y, w, h) {
this.paintComponent (g, c, p, x, y, w, h, false);
}, "jsjava.awt.Graphics,jsjava.awt.Component,jsjava.awt.Container,~N,~N,~N,~N");
Clazz.defineMethod (c$, "paintComponent", 
function (g, c, p, r) {
this.paintComponent (g, c, p, r.x, r.y, r.width, r.height);
}, "jsjava.awt.Graphics,jsjava.awt.Component,jsjava.awt.Container,jsjava.awt.Rectangle");
});

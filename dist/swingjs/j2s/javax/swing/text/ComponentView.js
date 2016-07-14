Clazz.declarePackage ("javax.swing.text");
Clazz.load (["java.awt.Container", "java.beans.PropertyChangeListener", "javax.swing.text.View"], "javax.swing.text.ComponentView", ["java.lang.IllegalArgumentException", "java.awt.Dimension", "$.Rectangle", "javax.swing.SwingUtilities", "javax.swing.text.AbstractDocument", "$.BadLocationException", "$.Position", "$.StyleConstants"], function () {
c$ = Clazz.decorateAsClass (function () {
this.createdC = null;
this.c = null;
if (!Clazz.isClassDefined ("javax.swing.text.ComponentView.Invalidator")) {
javax.swing.text.ComponentView.$ComponentView$Invalidator$ ();
}
Clazz.instantialize (this, arguments);
}, javax.swing.text, "ComponentView", javax.swing.text.View);
Clazz.defineMethod (c$, "createComponent", 
function () {
var attr = this.getElement ().getAttributes ();
var comp = javax.swing.text.StyleConstants.getComponent (attr);
return comp;
});
Clazz.defineMethod (c$, "getComponent", 
function () {
return this.createdC;
});
Clazz.overrideMethod (c$, "paint", 
function (g, a) {
if (this.c != null) {
var alloc = (Clazz.instanceOf (a, java.awt.Rectangle)) ? a : a.getBounds ();
this.c.setBounds (alloc.x, alloc.y, alloc.width, alloc.height);
}}, "java.awt.Graphics,java.awt.Shape");
Clazz.overrideMethod (c$, "getPreferredSpan", 
function (axis) {
if ((axis != 0) && (axis != 1)) {
throw  new IllegalArgumentException ("Invalid axis: " + axis);
}if (this.c != null) {
var size = this.c.getPreferredSize ();
if (axis == 0) {
return size.width;
} else {
return size.height;
}}return 0;
}, "~N");
Clazz.overrideMethod (c$, "getMinimumSpan", 
function (axis) {
if ((axis != 0) && (axis != 1)) {
throw  new IllegalArgumentException ("Invalid axis: " + axis);
}if (this.c != null) {
var size = this.c.getMinimumSize ();
if (axis == 0) {
return size.width;
} else {
return size.height;
}}return 0;
}, "~N");
Clazz.overrideMethod (c$, "getMaximumSpan", 
function (axis) {
if ((axis != 0) && (axis != 1)) {
throw  new IllegalArgumentException ("Invalid axis: " + axis);
}if (this.c != null) {
var size = this.c.getMaximumSize ();
if (axis == 0) {
return size.width;
} else {
return size.height;
}}return 0;
}, "~N");
Clazz.defineMethod (c$, "getAlignment", 
function (axis) {
if (this.c != null) {
switch (axis) {
case 0:
return this.c.getAlignmentX ();
case 1:
return this.c.getAlignmentY ();
}
}return Clazz.superCall (this, javax.swing.text.ComponentView, "getAlignment", [axis]);
}, "~N");
Clazz.defineMethod (c$, "setParent", 
function (p) {
Clazz.superCall (this, javax.swing.text.ComponentView, "setParent", [p]);
if (javax.swing.SwingUtilities.isEventDispatchThread ()) {
this.setComponentParent ();
} else {
var callSetComponentParent = ((Clazz.isClassDefined ("javax.swing.text.ComponentView$1") ? 0 : javax.swing.text.ComponentView.$ComponentView$1$ ()), Clazz.innerTypeInstance (javax.swing.text.ComponentView$1, this, null));
javax.swing.SwingUtilities.invokeLater (callSetComponentParent);
}}, "javax.swing.text.View");
Clazz.defineMethod (c$, "setComponentParent", 
function () {
var p = this.getParent ();
if (p != null) {
var parent = this.getContainer ();
if (parent != null) {
if (this.c == null) {
var comp = this.createComponent ();
if (comp != null) {
this.createdC = comp;
this.c = Clazz.innerTypeInstance (javax.swing.text.ComponentView.Invalidator, this, null, comp);
}}if (this.c != null) {
if (this.c.getParent () == null) {
parent.add (this.c, this);
parent.addPropertyChangeListener ("enabled", this.c);
}}}} else {
if (this.c != null) {
var parent = this.c.getParent ();
if (parent != null) {
parent.remove (this.c);
parent.removePropertyChangeListener ("enabled", this.c);
}}}});
Clazz.defineMethod (c$, "modelToView", 
function (pos, a, b) {
var p0 = this.getStartOffset ();
var p1 = this.getEndOffset ();
if ((pos >= p0) && (pos <= p1)) {
var r = a.getBounds ();
if (pos == p1) {
r.x += r.width;
}r.width = 0;
return r;
}throw  new javax.swing.text.BadLocationException (pos + " not in range " + p0 + "," + p1, pos);
}, "~N,java.awt.Shape,javax.swing.text.Position.Bias");
Clazz.defineMethod (c$, "viewToModel", 
function (x, y, a, bias) {
var alloc = a;
if (x < alloc.x + (Clazz.doubleToInt (alloc.width / 2))) {
bias[0] = javax.swing.text.Position.Bias.Forward;
return this.getStartOffset ();
}bias[0] = javax.swing.text.Position.Bias.Backward;
return this.getEndOffset ();
}, "~N,~N,java.awt.Shape,~A");
c$.$ComponentView$Invalidator$ = function () {
Clazz.pu$h(self.c$);
c$ = Clazz.decorateAsClass (function () {
Clazz.prepareCallback (this, arguments);
this.min = null;
this.pref = null;
this.max = null;
this.yalign = 0;
this.xalign = 0;
Clazz.instantialize (this, arguments);
}, javax.swing.text.ComponentView, "Invalidator", java.awt.Container, java.beans.PropertyChangeListener);
Clazz.makeConstructor (c$, 
function (a) {
Clazz.superConstructor (this, javax.swing.text.ComponentView.Invalidator, []);
this.setLayout (null);
this.add (a);
this.cacheChildSizes ();
}, "java.awt.Component");
Clazz.defineMethod (c$, "invalidate", 
function () {
Clazz.superCall (this, javax.swing.text.ComponentView.Invalidator, "invalidate", []);
if (this.getParent () != null) {
this.b$["javax.swing.text.ComponentView"].preferenceChanged (null, true, true);
}});
Clazz.overrideMethod (c$, "doLayout", 
function () {
this.cacheChildSizes ();
});
Clazz.defineMethod (c$, "setBounds", 
function (a, b, c, d) {
Clazz.superCall (this, javax.swing.text.ComponentView.Invalidator, "setBounds", [a, b, c, d]);
if (this.getComponentCount () > 0) {
this.getComponent (0).setSize (c, d);
}this.cacheChildSizes ();
}, "~N,~N,~N,~N");
Clazz.defineMethod (c$, "validateIfNecessary", 
function () {
if (!this.isValid ()) {
this.validate ();
}});
Clazz.defineMethod (c$, "cacheChildSizes", 
 function () {
if (this.getComponentCount () > 0) {
var a = this.getComponent (0);
this.min = a.getMinimumSize ();
this.pref = a.getPreferredSize ();
this.max = a.getMaximumSize ();
this.yalign = a.getAlignmentY ();
this.xalign = a.getAlignmentX ();
} else {
this.min = this.pref = this.max =  new java.awt.Dimension (0, 0);
}});
Clazz.defineMethod (c$, "setVisible", 
function (a) {
Clazz.superCall (this, javax.swing.text.ComponentView.Invalidator, "setVisible", [a]);
if (this.getComponentCount () > 0) {
this.getComponent (0).setVisible (a);
}}, "~B");
Clazz.overrideMethod (c$, "isShowing", 
function () {
return true;
});
Clazz.overrideMethod (c$, "getMinimumSize", 
function () {
this.validateIfNecessary ();
return this.min;
});
Clazz.overrideMethod (c$, "getPreferredSize", 
function () {
this.validateIfNecessary ();
return this.pref;
});
Clazz.overrideMethod (c$, "getMaximumSize", 
function () {
this.validateIfNecessary ();
return this.max;
});
Clazz.overrideMethod (c$, "getAlignmentX", 
function () {
this.validateIfNecessary ();
return this.xalign;
});
Clazz.overrideMethod (c$, "getAlignmentY", 
function () {
this.validateIfNecessary ();
return this.yalign;
});
Clazz.overrideMethod (c$, "propertyChange", 
function (a) {
var b = a.getNewValue ();
if (this.getComponentCount () > 0) {
this.getComponent (0).setEnabled ((b).booleanValue ());
}}, "java.beans.PropertyChangeEvent");
c$ = Clazz.p0p ();
};
c$.$ComponentView$1$ = function () {
Clazz.pu$h(self.c$);
c$ = Clazz.declareAnonymous (javax.swing.text, "ComponentView$1", null, Runnable);
Clazz.overrideMethod (c$, "run", 
function () {
var doc = this.b$["javax.swing.text.ComponentView"].getDocument ();
try {
if (Clazz.instanceOf (doc, javax.swing.text.AbstractDocument)) {
(doc).readLock ();
}this.b$["javax.swing.text.ComponentView"].setComponentParent ();
var host = this.b$["javax.swing.text.ComponentView"].getContainer ();
if (host != null) {
this.b$["javax.swing.text.ComponentView"].preferenceChanged (null, true, true);
host.repaint ();
}} finally {
if (Clazz.instanceOf (doc, javax.swing.text.AbstractDocument)) {
(doc).readUnlock ();
}}
});
c$ = Clazz.p0p ();
};
});

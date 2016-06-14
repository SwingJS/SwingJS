Clazz.declarePackage ("javax.swing.text");
Clazz.load (["javax.swing.text.BoxView", "$.CompositeView"], "javax.swing.text.FlowView", ["java.util.Vector", "javax.swing.SizeRequirements", "javax.swing.text.ComponentView", "$.LabelView", "$.Position", "$.TabExpander", "$.TabableView"], function () {
c$ = Clazz.decorateAsClass (function () {
this.layoutSpan = 0;
this.layoutPool = null;
this.strategy = null;
Clazz.instantialize (this, arguments);
}, javax.swing.text, "FlowView", javax.swing.text.BoxView);
Clazz.makeConstructor (c$, 
function (elem, axis) {
Clazz.superConstructor (this, javax.swing.text.FlowView, [elem, axis]);
this.layoutSpan = 2147483647;
this.strategy =  new javax.swing.text.FlowView.FlowStrategy ();
}, "javax.swing.text.Element,~N");
Clazz.defineMethod (c$, "getFlowAxis", 
function () {
if (this.getAxis () == 1) {
return 0;
}return 1;
});
Clazz.defineMethod (c$, "getFlowSpan", 
function (index) {
return this.layoutSpan;
}, "~N");
Clazz.defineMethod (c$, "getFlowStart", 
function (index) {
return 0;
}, "~N");
Clazz.defineMethod (c$, "loadChildren", 
function (f) {
if (this.layoutPool == null) {
this.layoutPool =  new javax.swing.text.FlowView.LogicalView (this.getElement ());
}this.layoutPool.setParent (this);
this.strategy.insertUpdate (this, null, null);
}, "javax.swing.text.ViewFactory");
Clazz.defineMethod (c$, "getViewIndexAtPosition", 
function (pos) {
if (pos >= this.getStartOffset () && (pos < this.getEndOffset ())) {
for (var counter = 0; counter < this.getViewCount (); counter++) {
var v = this.getView (counter);
if (pos >= v.getStartOffset () && pos < v.getEndOffset ()) {
return counter;
}}
}return -1;
}, "~N");
Clazz.defineMethod (c$, "layout", 
function (width, height) {
var faxis = this.getFlowAxis ();
var newSpan;
if (faxis == 0) {
newSpan = width;
} else {
newSpan = height;
}if (this.layoutSpan != newSpan) {
this.layoutChanged (faxis);
this.layoutChanged (this.getAxis ());
this.layoutSpan = newSpan;
}if (!this.isLayoutValid (faxis)) {
var heightAxis = this.getAxis ();
var oldFlowHeight = ((heightAxis == 0) ? this.getWidth () : this.getHeight ());
this.strategy.layout (this);
var newFlowHeight = Clazz.floatToInt (this.getPreferredSpan (heightAxis));
if (oldFlowHeight != newFlowHeight) {
var p = this.getParent ();
if (p != null) {
p.preferenceChanged (this, (heightAxis == 0), (heightAxis == 1));
}var host = this.getContainer ();
if (host != null) {
host.repaint ();
}}}Clazz.superCall (this, javax.swing.text.FlowView, "layout", [width, height]);
}, "~N,~N");
Clazz.overrideMethod (c$, "calculateMinorAxisRequirements", 
function (axis, r) {
if (r == null) {
r =  new javax.swing.SizeRequirements ();
}var pref = this.layoutPool.getPreferredSpan (axis);
var min = this.layoutPool.getMinimumSpan (axis);
r.minimum = Clazz.floatToInt (min);
r.preferred = Math.max (r.minimum, Clazz.floatToInt (pref));
r.maximum = 2147483647;
r.alignment = 0.5;
return r;
}, "~N,javax.swing.SizeRequirements");
Clazz.defineMethod (c$, "insertUpdate", 
function (changes, a, f) {
this.layoutPool.insertUpdate (changes, a, f);
this.strategy.insertUpdate (this, changes, this.getInsideAllocation (a));
}, "javax.swing.event.DocumentEvent,java.awt.Shape,javax.swing.text.ViewFactory");
Clazz.defineMethod (c$, "removeUpdate", 
function (changes, a, f) {
this.layoutPool.removeUpdate (changes, a, f);
this.strategy.removeUpdate (this, changes, this.getInsideAllocation (a));
}, "javax.swing.event.DocumentEvent,java.awt.Shape,javax.swing.text.ViewFactory");
Clazz.defineMethod (c$, "changedUpdate", 
function (changes, a, f) {
this.layoutPool.changedUpdate (changes, a, f);
this.strategy.changedUpdate (this, changes, this.getInsideAllocation (a));
}, "javax.swing.event.DocumentEvent,java.awt.Shape,javax.swing.text.ViewFactory");
Clazz.defineMethod (c$, "setParent", 
function (parent) {
Clazz.superCall (this, javax.swing.text.FlowView, "setParent", [parent]);
if (parent == null && this.layoutPool != null) {
this.layoutPool.setParent (null);
}}, "javax.swing.text.View");
Clazz.pu$h(self.c$);
c$ = Clazz.decorateAsClass (function () {
this.damageStart = 2147483647;
this.viewBuffer = null;
Clazz.instantialize (this, arguments);
}, javax.swing.text.FlowView, "FlowStrategy");
Clazz.defineMethod (c$, "addDamage", 
function (a, b) {
if (b >= a.getStartOffset () && b < a.getEndOffset ()) {
this.damageStart = Math.min (this.damageStart, b);
}}, "javax.swing.text.FlowView,~N");
Clazz.defineMethod (c$, "unsetDamage", 
function () {
this.damageStart = 2147483647;
});
Clazz.defineMethod (c$, "insertUpdate", 
function (a, b, c) {
if (b != null) {
this.addDamage (a, b.getOffset ());
}if (c != null) {
var d = a.getContainer ();
if (d != null) {
d.repaint (c.x, c.y, c.width, c.height);
}} else {
a.preferenceChanged (null, true, true);
}}, "javax.swing.text.FlowView,javax.swing.event.DocumentEvent,java.awt.Rectangle");
Clazz.defineMethod (c$, "removeUpdate", 
function (a, b, c) {
this.addDamage (a, b.getOffset ());
if (c != null) {
var d = a.getContainer ();
if (d != null) {
d.repaint (c.x, c.y, c.width, c.height);
}} else {
a.preferenceChanged (null, true, true);
}}, "javax.swing.text.FlowView,javax.swing.event.DocumentEvent,java.awt.Rectangle");
Clazz.defineMethod (c$, "changedUpdate", 
function (a, b, c) {
this.addDamage (a, b.getOffset ());
if (c != null) {
var d = a.getContainer ();
if (d != null) {
d.repaint (c.x, c.y, c.width, c.height);
}} else {
a.preferenceChanged (null, true, true);
}}, "javax.swing.text.FlowView,javax.swing.event.DocumentEvent,java.awt.Rectangle");
Clazz.defineMethod (c$, "getLogicalView", 
function (a) {
return a.layoutPool;
}, "javax.swing.text.FlowView");
Clazz.defineMethod (c$, "layout", 
function (a) {
var b = this.getLogicalView (a);
var c;
var d;
var e = a.getEndOffset ();
if (a.majorAllocValid) {
if (this.damageStart == 2147483647) {
return;
}while ((c = a.getViewIndexAtPosition (this.damageStart)) < 0) {
this.damageStart--;
}
if (c > 0) {
c--;
}d = a.getView (c).getStartOffset ();
} else {
c = 0;
d = a.getStartOffset ();
}this.reparentViews (b, d);
this.viewBuffer =  new java.util.Vector (10, 10);
var f = a.getViewCount ();
while (d < e) {
var g;
if (c >= f) {
g = a.createRow ();
a.append (g);
} else {
g = a.getView (c);
}d = this.layoutRow (a, c, d);
c++;
}
this.viewBuffer = null;
if (c < f) {
a.replace (c, f - c, null);
}this.unsetDamage ();
}, "javax.swing.text.FlowView");
Clazz.defineMethod (c$, "layoutRow", 
function (a, b, c) {
var d = a.getView (b);
var e = a.getFlowStart (b);
var f = a.getFlowSpan (b);
var g = a.getEndOffset ();
var h = (Clazz.instanceOf (a, javax.swing.text.TabExpander)) ? a : null;
var i = a.getFlowAxis ();
var j = 0;
var k = 0;
var l = 0;
var m = -1;
var n = 0;
this.viewBuffer.clear ();
while (c < g && f >= 0) {
var o = this.createView (a, c, Clazz.floatToInt (f), b);
if (o == null) {
break;
}var p = o.getBreakWeight (i, e, f);
if (p >= 3000) {
var q = o.breakView (i, c, e, f);
if (q != null) {
this.viewBuffer.add (q);
} else if (n == 0) {
this.viewBuffer.add (o);
}break;
} else if (p >= j && p > 0) {
j = p;
k = e;
l = f;
m = n;
}var q;
if (i == 0 && Clazz.instanceOf (o, javax.swing.text.TabableView)) {
q = (o).getTabbedSpan (e, h);
} else {
q = o.getPreferredSpan (i);
}if (q > f && m >= 0) {
if (m < n) {
o = this.viewBuffer.get (m);
}for (var r = n - 1; r >= m; r--) {
this.viewBuffer.remove (r);
}
o = o.breakView (i, o.getStartOffset (), k, l);
}f -= q;
e += q;
this.viewBuffer.add (o);
c = o.getEndOffset ();
n++;
}
var o =  new Array (this.viewBuffer.size ());
this.viewBuffer.toArray (o);
d.replace (0, d.getViewCount (), o);
return (o.length > 0 ? d.getEndOffset () : c);
}, "javax.swing.text.FlowView,~N,~N");
Clazz.defineMethod (c$, "adjustRow", 
function (a, b, c, d) {
var e = a.getFlowAxis ();
var f = a.getView (b);
var g = f.getViewCount ();
var h = 0;
var i = 0;
var j = 0;
var k = -1;
var l;
for (var m = 0; m < g; m++) {
l = f.getView (m);
var n = c - h;
var o = l.getBreakWeight (e, d + h, n);
if ((o >= i) && (o > 0)) {
i = o;
k = m;
j = h;
if (o >= 3000) {
break;
}}h += l.getPreferredSpan (e);
}
if (k < 0) {
return;
}var n = c - j;
l = f.getView (k);
l = l.breakView (e, l.getStartOffset (), d + j, n);
var o =  new Array (1);
o[0] = l;
var p = this.getLogicalView (a);
var q = f.getView (k).getStartOffset ();
var r = f.getEndOffset ();
for (var s = 0; s < p.getViewCount (); s++) {
var t = p.getView (s);
if (t.getEndOffset () > r) {
break;
}if (t.getStartOffset () >= q) {
t.setParent (p);
}}
f.replace (k, g - k, o);
}, "javax.swing.text.FlowView,~N,~N,~N");
Clazz.defineMethod (c$, "reparentViews", 
function (a, b) {
var c = a.getViewIndex (b, javax.swing.text.Position.Bias.Forward);
if (c >= 0) {
for (var d = c; d < a.getViewCount (); d++) {
a.getView (d).setParent (a);
}
}}, "javax.swing.text.View,~N");
Clazz.defineMethod (c$, "createView", 
function (a, b, c, d) {
var e = this.getLogicalView (a);
var f = e.getViewIndex (b, javax.swing.text.Position.Bias.Forward);
var g = e.getView (f);
if (b == g.getStartOffset ()) {
return g;
}g = g.createFragment (b, g.getEndOffset ());
return g;
}, "javax.swing.text.FlowView,~N,~N,~N");
c$ = Clazz.p0p ();
Clazz.pu$h(self.c$);
c$ = Clazz.declareType (javax.swing.text.FlowView, "LogicalView", javax.swing.text.CompositeView);
Clazz.defineMethod (c$, "getViewIndexAtPosition", 
function (a) {
var b = this.getElement ();
if (b.isLeaf ()) {
return 0;
}return Clazz.superCall (this, javax.swing.text.FlowView.LogicalView, "getViewIndexAtPosition", [a]);
}, "~N");
Clazz.defineMethod (c$, "loadChildren", 
function (a) {
var b = this.getElement ();
if (b.isLeaf ()) {
var c =  new javax.swing.text.LabelView (b);
this.append (c);
} else {
Clazz.superCall (this, javax.swing.text.FlowView.LogicalView, "loadChildren", [a]);
}}, "javax.swing.text.ViewFactory");
Clazz.defineMethod (c$, "getAttributes", 
function () {
var a = this.getParent ();
return (a != null) ? a.getAttributes () : null;
});
Clazz.defineMethod (c$, "getPreferredSpan", 
function (a) {
var b = 0;
var c = 0;
var d = this.getViewCount ();
for (var e = 0; e < d; e++) {
var f = this.getView (e);
c += f.getPreferredSpan (a);
if (f.getBreakWeight (a, 0, 2147483647) >= 3000) {
b = Math.max (b, c);
c = 0;
}}
b = Math.max (b, c);
return b;
}, "~N");
Clazz.defineMethod (c$, "getMinimumSpan", 
function (a) {
var b = 0;
var c = 0;
var d = false;
var e = this.getViewCount ();
for (var f = 0; f < e; f++) {
var g = this.getView (f);
if (g.getBreakWeight (a, 0, 2147483647) == 0) {
c += g.getPreferredSpan (a);
d = true;
} else if (d) {
b = Math.max (c, b);
d = false;
c = 0;
}if (Clazz.instanceOf (g, javax.swing.text.ComponentView)) {
b = Math.max (b, g.getMinimumSpan (a));
}}
b = Math.max (b, c);
return b;
}, "~N");
Clazz.defineMethod (c$, "forwardUpdateToView", 
function (a, b, c, d) {
var e = a.getParent ();
a.setParent (this);
Clazz.superCall (this, javax.swing.text.FlowView.LogicalView, "forwardUpdateToView", [a, b, c, d]);
a.setParent (e);
}, "javax.swing.text.View,javax.swing.event.DocumentEvent,java.awt.Shape,javax.swing.text.ViewFactory");
Clazz.overrideMethod (c$, "paint", 
function (a, b) {
}, "java.awt.Graphics,java.awt.Shape");
Clazz.overrideMethod (c$, "isBefore", 
function (a, b, c) {
return false;
}, "~N,~N,java.awt.Rectangle");
Clazz.overrideMethod (c$, "isAfter", 
function (a, b, c) {
return false;
}, "~N,~N,java.awt.Rectangle");
Clazz.overrideMethod (c$, "getViewAtPoint", 
function (a, b, c) {
return null;
}, "~N,~N,java.awt.Rectangle");
Clazz.overrideMethod (c$, "childAllocation", 
function (a, b) {
}, "~N,java.awt.Rectangle");
c$ = Clazz.p0p ();
});

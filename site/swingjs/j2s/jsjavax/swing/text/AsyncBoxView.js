Clazz.declarePackage ("jsjavax.swing.text");
Clazz.load (["jsjavax.swing.text.View"], "jsjavax.swing.text.AsyncBoxView", ["java.util.ArrayList", "jsjava.awt.Rectangle", "jsjavax.swing.text.LayoutQueue", "$.Position", "$.Utilities"], function () {
c$ = Clazz.decorateAsClass (function () {
this.axis = 0;
this.stats = null;
this.majorSpan = 0;
this.estimatedMajorSpan = false;
this.minorSpan = 0;
this.locator = null;
this.topInset = 0;
this.bottomInset = 0;
this.leftInset = 0;
this.rightInset = 0;
this.minRequest = null;
this.prefRequest = null;
this.majorChanged = false;
this.minorChanged = false;
this.flushTask = null;
this.changing = null;
if (!Clazz.isClassDefined ("jsjavax.swing.text.AsyncBoxView.ChildLocator")) {
jsjavax.swing.text.AsyncBoxView.$AsyncBoxView$ChildLocator$ ();
}
if (!Clazz.isClassDefined ("jsjavax.swing.text.AsyncBoxView.ChildState")) {
jsjavax.swing.text.AsyncBoxView.$AsyncBoxView$ChildState$ ();
}
if (!Clazz.isClassDefined ("jsjavax.swing.text.AsyncBoxView.FlushTask")) {
jsjavax.swing.text.AsyncBoxView.$AsyncBoxView$FlushTask$ ();
}
Clazz.instantialize (this, arguments);
}, jsjavax.swing.text, "AsyncBoxView", jsjavax.swing.text.View);
Clazz.makeConstructor (c$, 
function (elem, axis) {
Clazz.superConstructor (this, jsjavax.swing.text.AsyncBoxView, [elem]);
this.stats =  new java.util.ArrayList ();
this.axis = axis;
this.locator = Clazz.innerTypeInstance (jsjavax.swing.text.AsyncBoxView.ChildLocator, this, null);
this.flushTask = Clazz.innerTypeInstance (jsjavax.swing.text.AsyncBoxView.FlushTask, this, null);
this.minorSpan = 32767;
this.estimatedMajorSpan = false;
}, "jsjavax.swing.text.Element,~N");
Clazz.defineMethod (c$, "getMajorAxis", 
function () {
return this.axis;
});
Clazz.defineMethod (c$, "getMinorAxis", 
function () {
return (this.axis == 0) ? 1 : 0;
});
Clazz.defineMethod (c$, "getTopInset", 
function () {
return this.topInset;
});
Clazz.defineMethod (c$, "setTopInset", 
function (i) {
this.topInset = i;
}, "~N");
Clazz.defineMethod (c$, "getBottomInset", 
function () {
return this.bottomInset;
});
Clazz.defineMethod (c$, "setBottomInset", 
function (i) {
this.bottomInset = i;
}, "~N");
Clazz.defineMethod (c$, "getLeftInset", 
function () {
return this.leftInset;
});
Clazz.defineMethod (c$, "setLeftInset", 
function (i) {
this.leftInset = i;
}, "~N");
Clazz.defineMethod (c$, "getRightInset", 
function () {
return this.rightInset;
});
Clazz.defineMethod (c$, "setRightInset", 
function (i) {
this.rightInset = i;
}, "~N");
Clazz.defineMethod (c$, "getInsetSpan", 
function (axis) {
var margin = (axis == 0) ? this.getLeftInset () + this.getRightInset () : this.getTopInset () + this.getBottomInset ();
return margin;
}, "~N");
Clazz.defineMethod (c$, "setEstimatedMajorSpan", 
function (isEstimated) {
this.estimatedMajorSpan = isEstimated;
}, "~B");
Clazz.defineMethod (c$, "getEstimatedMajorSpan", 
function () {
return this.estimatedMajorSpan;
});
Clazz.defineMethod (c$, "getChildState", 
function (index) {
{
if ((index >= 0) && (index < this.stats.size ())) {
return this.stats.get (index);
}return null;
}}, "~N");
Clazz.defineMethod (c$, "getLayoutQueue", 
function () {
return jsjavax.swing.text.LayoutQueue.getDefaultQueue ();
});
Clazz.defineMethod (c$, "createChildState", 
function (v) {
return Clazz.innerTypeInstance (jsjavax.swing.text.AsyncBoxView.ChildState, this, null, v);
}, "jsjavax.swing.text.View");
Clazz.defineMethod (c$, "majorRequirementChange", 
function (cs, delta) {
if (this.estimatedMajorSpan == false) {
this.majorSpan += delta;
}this.majorChanged = true;
}, "jsjavax.swing.text.AsyncBoxView.ChildState,~N");
Clazz.defineMethod (c$, "minorRequirementChange", 
function (cs) {
this.minorChanged = true;
}, "jsjavax.swing.text.AsyncBoxView.ChildState");
Clazz.defineMethod (c$, "flushRequirementChanges", 
function () {
var doc = this.getDocument ();
try {
doc.readLock ();
var parent = null;
var horizontal = false;
var vertical = false;
{
{
var n = this.getViewCount ();
if ((n > 0) && (this.minorChanged || this.estimatedMajorSpan)) {
var min = this.getChildState (0);
var pref = this.getChildState (0);
var span = 0;
for (var i = 1; i < n; i++) {
var cs = this.getChildState (i);
if (this.minorChanged) {
if (cs.min > min.min) {
min = cs;
}if (cs.pref > pref.pref) {
pref = cs;
}}if (this.estimatedMajorSpan) {
span += cs.getMajorSpan ();
}}
if (this.minorChanged) {
this.minRequest = min;
this.prefRequest = pref;
}if (this.estimatedMajorSpan) {
this.majorSpan = span;
this.estimatedMajorSpan = false;
this.majorChanged = true;
}}}if (this.majorChanged || this.minorChanged) {
parent = this.getParent ();
if (parent != null) {
if (this.axis == 0) {
horizontal = this.majorChanged;
vertical = this.minorChanged;
} else {
vertical = this.majorChanged;
horizontal = this.minorChanged;
}}this.majorChanged = false;
this.minorChanged = false;
}}if (parent != null) {
parent.preferenceChanged (this, horizontal, vertical);
var c = this.getContainer ();
if (c != null) {
c.repaint ();
}}} finally {
doc.readUnlock ();
}
});
Clazz.overrideMethod (c$, "replace", 
function (offset, length, views) {
{
for (var i = 0; i < length; i++) {
var cs = this.stats.remove (offset);
var csSpan = cs.getMajorSpan ();
cs.getChildView ().setParent (null);
if (csSpan != 0) {
this.majorRequirementChange (cs, -csSpan);
}}
var q = this.getLayoutQueue ();
if (views != null) {
for (var i = 0; i < views.length; i++) {
var s = this.createChildState (views[i]);
this.stats.add (offset + i, s);
q.addTask (s);
}
}q.addTask (this.flushTask);
}}, "~N,~N,~A");
Clazz.defineMethod (c$, "loadChildren", 
function (f) {
var e = this.getElement ();
var n = e.getElementCount ();
if (n > 0) {
var added =  new Array (n);
for (var i = 0; i < n; i++) {
added[i] = f.create (e.getElement (i));
}
this.replace (0, 0, added);
}}, "jsjavax.swing.text.ViewFactory");
Clazz.defineMethod (c$, "getViewIndexAtPosition", 
function (pos, b) {
var isBackward = (b === jsjavax.swing.text.Position.Bias.Backward);
pos = (isBackward) ? Math.max (0, pos - 1) : pos;
var elem = this.getElement ();
return elem.getElementIndex (pos);
}, "~N,jsjavax.swing.text.Position.Bias");
Clazz.overrideMethod (c$, "updateLayout", 
function (ec, e, a) {
if (ec != null) {
var index = Math.max (ec.getIndex () - 1, 0);
var cs = this.getChildState (index);
this.locator.childChanged (cs);
}}, "jsjavax.swing.event.DocumentEvent.ElementChange,jsjavax.swing.event.DocumentEvent,jsjava.awt.Shape");
Clazz.defineMethod (c$, "setParent", 
function (parent) {
Clazz.superCall (this, jsjavax.swing.text.AsyncBoxView, "setParent", [parent]);
if ((parent != null) && (this.getViewCount () == 0)) {
var f = this.getViewFactory ();
this.loadChildren (f);
}}, "jsjavax.swing.text.View");
Clazz.defineMethod (c$, "preferenceChanged", 
function (child, width, height) {
if (child == null) {
this.getParent ().preferenceChanged (this, width, height);
} else {
if (this.changing != null) {
var cv = this.changing.getChildView ();
if (cv === child) {
this.changing.preferenceChanged (width, height);
return;
}}var index = this.getViewIndex (child.getStartOffset (), jsjavax.swing.text.Position.Bias.Forward);
var cs = this.getChildState (index);
cs.preferenceChanged (width, height);
var q = this.getLayoutQueue ();
q.addTask (cs);
q.addTask (this.flushTask);
}}, "jsjavax.swing.text.View,~B,~B");
Clazz.defineMethod (c$, "setSize", 
function (width, height) {
this.setSpanOnAxis (0, width);
this.setSpanOnAxis (1, height);
}, "~N,~N");
Clazz.defineMethod (c$, "getSpanOnAxis", 
function (axis) {
if (axis == this.getMajorAxis ()) {
return this.majorSpan;
}return this.minorSpan;
}, "~N");
Clazz.defineMethod (c$, "setSpanOnAxis", 
function (axis, span) {
var margin = this.getInsetSpan (axis);
if (axis == this.getMinorAxis ()) {
var targetSpan = span - margin;
if (targetSpan != this.minorSpan) {
this.minorSpan = targetSpan;
var n = this.getViewCount ();
if (n != 0) {
var q = this.getLayoutQueue ();
for (var i = 0; i < n; i++) {
var cs = this.getChildState (i);
cs.childSizeValid = false;
q.addTask (cs);
}
q.addTask (this.flushTask);
}}} else {
if (this.estimatedMajorSpan) {
this.majorSpan = span - margin;
}}}, "~N,~N");
Clazz.defineMethod (c$, "paint", 
function (g, alloc) {
{
this.locator.setAllocation (alloc);
this.locator.paintChildren (g);
}}, "jsjava.awt.Graphics,jsjava.awt.Shape");
Clazz.defineMethod (c$, "getPreferredSpan", 
function (axis) {
var margin = this.getInsetSpan (axis);
if (axis == this.axis) {
return this.majorSpan + margin;
}if (this.prefRequest != null) {
var child = this.prefRequest.getChildView ();
return child.getPreferredSpan (axis) + margin;
}return margin + 30;
}, "~N");
Clazz.defineMethod (c$, "getMinimumSpan", 
function (axis) {
if (axis == this.axis) {
return this.getPreferredSpan (axis);
}if (this.minRequest != null) {
var child = this.minRequest.getChildView ();
return child.getMinimumSpan (axis);
}if (axis == 0) {
return this.getLeftInset () + this.getRightInset () + 5;
} else {
return this.getTopInset () + this.getBottomInset () + 5;
}}, "~N");
Clazz.defineMethod (c$, "getMaximumSpan", 
function (axis) {
if (axis == this.axis) {
return this.getPreferredSpan (axis);
}return 2147483647;
}, "~N");
Clazz.overrideMethod (c$, "getViewCount", 
function () {
{
return this.stats.size ();
}});
Clazz.overrideMethod (c$, "getView", 
function (n) {
var cs = this.getChildState (n);
if (cs != null) {
return cs.getChildView ();
}return null;
}, "~N");
Clazz.overrideMethod (c$, "getChildAllocation", 
function (index, a) {
var ca = this.locator.getChildAllocation (index, a);
return ca;
}, "~N,jsjava.awt.Shape");
Clazz.defineMethod (c$, "getViewIndex", 
function (pos, b) {
return this.getViewIndexAtPosition (pos, b);
}, "~N,jsjavax.swing.text.Position.Bias");
Clazz.defineMethod (c$, "modelToView", 
function (pos, a, b) {
var index = this.getViewIndex (pos, b);
var ca = this.locator.getChildAllocation (index, a);
var cs = this.getChildState (index);
{
var cv = cs.getChildView ();
var v = cv.modelToView (pos, ca, b);
return v;
}}, "~N,jsjava.awt.Shape,jsjavax.swing.text.Position.Bias");
Clazz.defineMethod (c$, "viewToModel", 
function (x, y, a, biasReturn) {
var pos;
var index;
var ca;
{
index = this.locator.getViewIndexAtPoint (x, y, a);
ca = this.locator.getChildAllocation (index, a);
}var cs = this.getChildState (index);
{
var v = cs.getChildView ();
pos = v.viewToModel (x, y, ca, biasReturn);
}return pos;
}, "~N,~N,jsjava.awt.Shape,~A");
Clazz.overrideMethod (c$, "getNextVisualPositionFrom", 
function (pos, b, a, direction, biasRet) {
return jsjavax.swing.text.Utilities.getNextVisualPositionFrom (this, pos, b, a, direction, biasRet);
}, "~N,jsjavax.swing.text.Position.Bias,jsjava.awt.Shape,~N,~A");
c$.$AsyncBoxView$ChildLocator$ = function () {
Clazz.pu$h ();
c$ = Clazz.decorateAsClass (function () {
Clazz.prepareCallback (this, arguments);
this.lastValidOffset = null;
this.lastAlloc = null;
this.childAlloc = null;
Clazz.instantialize (this, arguments);
}, jsjavax.swing.text.AsyncBoxView, "ChildLocator");
Clazz.makeConstructor (c$, 
function () {
this.lastAlloc =  new jsjava.awt.Rectangle ();
this.childAlloc =  new jsjava.awt.Rectangle ();
});
Clazz.defineMethod (c$, "childChanged", 
function (a) {
if (this.lastValidOffset == null) {
this.lastValidOffset = a;
} else if (a.getChildView ().getStartOffset () < this.lastValidOffset.getChildView ().getStartOffset ()) {
this.lastValidOffset = a;
}}, "jsjavax.swing.text.AsyncBoxView.ChildState");
Clazz.defineMethod (c$, "paintChildren", 
function (a) {
var b = a.getClipBounds ();
var c = (this.b$["jsjavax.swing.text.AsyncBoxView"].axis == 0) ? b.x - this.lastAlloc.x : b.y - this.lastAlloc.y;
var d = this.getViewIndexAtVisualOffset (c);
var e = this.b$["jsjavax.swing.text.AsyncBoxView"].getViewCount ();
var f = this.b$["jsjavax.swing.text.AsyncBoxView"].getChildState (d).getMajorOffset ();
for (var g = d; g < e; g++) {
var h = this.b$["jsjavax.swing.text.AsyncBoxView"].getChildState (g);
h.setMajorOffset (f);
var i = this.getChildAllocation (g);
if (this.intersectsClip (i, b)) {
{
var j = h.getChildView ();
j.paint (a, i);
}} else {
break;
}f += h.getMajorSpan ();
}
}, "jsjava.awt.Graphics");
Clazz.defineMethod (c$, "getChildAllocation", 
function (a, b) {
if (b == null) {
return null;
}this.setAllocation (b);
var c = this.b$["jsjavax.swing.text.AsyncBoxView"].getChildState (a);
if (this.lastValidOffset == null) {
this.lastValidOffset = this.b$["jsjavax.swing.text.AsyncBoxView"].getChildState (0);
}if (c.getChildView ().getStartOffset () > this.lastValidOffset.getChildView ().getStartOffset ()) {
this.updateChildOffsetsToIndex (a);
}var d = this.getChildAllocation (a);
return d;
}, "~N,jsjava.awt.Shape");
Clazz.defineMethod (c$, "getViewIndexAtPoint", 
function (a, b, c) {
this.setAllocation (c);
var d = (this.b$["jsjavax.swing.text.AsyncBoxView"].axis == 0) ? a - this.lastAlloc.x : b - this.lastAlloc.y;
var e = this.getViewIndexAtVisualOffset (d);
return e;
}, "~N,~N,jsjava.awt.Shape");
Clazz.defineMethod (c$, "getChildAllocation", 
function (a) {
var b = this.b$["jsjavax.swing.text.AsyncBoxView"].getChildState (a);
if (!b.isLayoutValid ()) {
b.run ();
}if (this.b$["jsjavax.swing.text.AsyncBoxView"].axis == 0) {
this.childAlloc.x = this.lastAlloc.x + Clazz.floatToInt (b.getMajorOffset ());
this.childAlloc.y = this.lastAlloc.y + Clazz.floatToInt (b.getMinorOffset ());
this.childAlloc.width = Clazz.floatToInt (b.getMajorSpan ());
this.childAlloc.height = Clazz.floatToInt (b.getMinorSpan ());
} else {
this.childAlloc.y = this.lastAlloc.y + Clazz.floatToInt (b.getMajorOffset ());
this.childAlloc.x = this.lastAlloc.x + Clazz.floatToInt (b.getMinorOffset ());
this.childAlloc.height = Clazz.floatToInt (b.getMajorSpan ());
this.childAlloc.width = Clazz.floatToInt (b.getMinorSpan ());
}this.childAlloc.x += Clazz.floatToInt (this.b$["jsjavax.swing.text.AsyncBoxView"].getLeftInset ());
this.childAlloc.y += Clazz.floatToInt (this.b$["jsjavax.swing.text.AsyncBoxView"].getRightInset ());
return this.childAlloc;
}, "~N");
Clazz.defineMethod (c$, "setAllocation", 
function (a) {
if (Clazz.instanceOf (a, jsjava.awt.Rectangle)) {
this.lastAlloc.setBounds (a);
} else {
this.lastAlloc.setBounds (a.getBounds ());
}this.b$["jsjavax.swing.text.AsyncBoxView"].setSize (this.lastAlloc.width, this.lastAlloc.height);
}, "jsjava.awt.Shape");
Clazz.defineMethod (c$, "getViewIndexAtVisualOffset", 
function (a) {
var b = this.b$["jsjavax.swing.text.AsyncBoxView"].getViewCount ();
if (b > 0) {
var c = (this.lastValidOffset != null);
if (this.lastValidOffset == null) {
this.lastValidOffset = this.b$["jsjavax.swing.text.AsyncBoxView"].getChildState (0);
}if (a > this.b$["jsjavax.swing.text.AsyncBoxView"].majorSpan) {
if (!c) {
return 0;
}var d = this.lastValidOffset.getChildView ().getStartOffset ();
var e = this.b$["jsjavax.swing.text.AsyncBoxView"].getViewIndex (d, jsjavax.swing.text.Position.Bias.Forward);
return e;
} else if (a > this.lastValidOffset.getMajorOffset ()) {
return this.updateChildOffsets (a);
} else {
var d = 0;
for (var e = 0; e < b; e++) {
var f = this.b$["jsjavax.swing.text.AsyncBoxView"].getChildState (e);
var g = d + f.getMajorSpan ();
if (a < g) {
return e;
}d = g;
}
}}return b - 1;
}, "~N");
Clazz.defineMethod (c$, "updateChildOffsets", 
function (a) {
var b = this.b$["jsjavax.swing.text.AsyncBoxView"].getViewCount ();
var c = b - 1;
;var d = this.lastValidOffset.getChildView ().getStartOffset ();
var e = this.b$["jsjavax.swing.text.AsyncBoxView"].getViewIndex (d, jsjavax.swing.text.Position.Bias.Forward);
var f = this.lastValidOffset.getMajorOffset ();
var g = f;
for (var h = e; h < b; h++) {
var i = this.b$["jsjavax.swing.text.AsyncBoxView"].getChildState (h);
i.setMajorOffset (g);
g += i.getMajorSpan ();
if (a < g) {
c = h;
this.lastValidOffset = i;
break;
}}
return c;
}, "~N");
Clazz.defineMethod (c$, "updateChildOffsetsToIndex", 
function (a) {
var b = this.lastValidOffset.getChildView ().getStartOffset ();
var c = this.b$["jsjavax.swing.text.AsyncBoxView"].getViewIndex (b, jsjavax.swing.text.Position.Bias.Forward);
var d = this.lastValidOffset.getMajorOffset ();
for (var e = c; e <= a; e++) {
var f = this.b$["jsjavax.swing.text.AsyncBoxView"].getChildState (e);
f.setMajorOffset (d);
d += f.getMajorSpan ();
}
}, "~N");
Clazz.defineMethod (c$, "intersectsClip", 
function (a, b) {
var c = (Clazz.instanceOf (a, jsjava.awt.Rectangle)) ? a : a.getBounds ();
if (c.intersects (b)) {
return this.lastAlloc.intersects (c);
}return false;
}, "jsjava.awt.Shape,jsjava.awt.Rectangle");
c$ = Clazz.p0p ();
};
c$.$AsyncBoxView$ChildState$ = function () {
Clazz.pu$h ();
c$ = Clazz.decorateAsClass (function () {
Clazz.prepareCallback (this, arguments);
this.min = 0;
this.pref = 0;
this.max = 0;
this.minorValid = false;
this.span = 0;
this.offset = 0;
this.majorValid = false;
this.child = null;
this.childSizeValid = false;
Clazz.instantialize (this, arguments);
}, jsjavax.swing.text.AsyncBoxView, "ChildState", null, Runnable);
Clazz.makeConstructor (c$, 
function (a) {
this.child = a;
this.minorValid = false;
this.majorValid = false;
this.childSizeValid = false;
this.child.setParent (this.b$["jsjavax.swing.text.AsyncBoxView"]);
}, "jsjavax.swing.text.View");
Clazz.defineMethod (c$, "getChildView", 
function () {
return this.child;
});
Clazz.overrideMethod (c$, "run", 
function () {
var a = this.b$["jsjavax.swing.text.AsyncBoxView"].getDocument ();
try {
a.readLock ();
if (this.minorValid && this.majorValid && this.childSizeValid) {
return;
}if (this.child.getParent () === this.b$["jsjavax.swing.text.AsyncBoxView"]) {
{
this.b$["jsjavax.swing.text.AsyncBoxView"].changing = this;
}this.updateChild ();
{
this.b$["jsjavax.swing.text.AsyncBoxView"].changing = null;
}this.updateChild ();
}} finally {
a.readUnlock ();
}
});
Clazz.defineMethod (c$, "updateChild", 
function () {
var a = false;
{
if (!this.minorValid) {
var b = this.b$["jsjavax.swing.text.AsyncBoxView"].getMinorAxis ();
this.min = this.child.getMinimumSpan (b);
this.pref = this.child.getPreferredSpan (b);
this.max = this.child.getMaximumSpan (b);
this.minorValid = true;
a = true;
}}if (a) {
this.b$["jsjavax.swing.text.AsyncBoxView"].minorRequirementChange (this);
}var b = false;
var c = 0.0;
{
if (!this.majorValid) {
var d = this.span;
this.span = this.child.getPreferredSpan (this.b$["jsjavax.swing.text.AsyncBoxView"].axis);
c = this.span - d;
this.majorValid = true;
b = true;
}}if (b) {
this.b$["jsjavax.swing.text.AsyncBoxView"].majorRequirementChange (this, c);
this.b$["jsjavax.swing.text.AsyncBoxView"].locator.childChanged (this);
}{
if (!this.childSizeValid) {
var d;
var e;
if (this.b$["jsjavax.swing.text.AsyncBoxView"].axis == 0) {
d = this.span;
e = this.getMinorSpan ();
} else {
d = this.getMinorSpan ();
e = this.span;
}this.childSizeValid = true;
this.child.setSize (d, e);
}}});
Clazz.defineMethod (c$, "getMinorSpan", 
function () {
if (this.max < this.b$["jsjavax.swing.text.AsyncBoxView"].minorSpan) {
return this.max;
}return Math.max (this.min, this.b$["jsjavax.swing.text.AsyncBoxView"].minorSpan);
});
Clazz.defineMethod (c$, "getMinorOffset", 
function () {
if (this.max < this.b$["jsjavax.swing.text.AsyncBoxView"].minorSpan) {
var a = this.child.getAlignment (this.b$["jsjavax.swing.text.AsyncBoxView"].getMinorAxis ());
return ((this.b$["jsjavax.swing.text.AsyncBoxView"].minorSpan - this.max) * a);
}return 0;
});
Clazz.defineMethod (c$, "getMajorSpan", 
function () {
return this.span;
});
Clazz.defineMethod (c$, "getMajorOffset", 
function () {
return this.offset;
});
Clazz.defineMethod (c$, "setMajorOffset", 
function (a) {
this.offset = a;
}, "~N");
Clazz.defineMethod (c$, "preferenceChanged", 
function (a, b) {
if (this.b$["jsjavax.swing.text.AsyncBoxView"].axis == 0) {
if (a) {
this.majorValid = false;
}if (b) {
this.minorValid = false;
}} else {
if (a) {
this.minorValid = false;
}if (b) {
this.majorValid = false;
}}this.childSizeValid = false;
}, "~B,~B");
Clazz.defineMethod (c$, "isLayoutValid", 
function () {
return (this.minorValid && this.majorValid && this.childSizeValid);
});
c$ = Clazz.p0p ();
};
c$.$AsyncBoxView$FlushTask$ = function () {
Clazz.pu$h ();
c$ = Clazz.decorateAsClass (function () {
Clazz.prepareCallback (this, arguments);
Clazz.instantialize (this, arguments);
}, jsjavax.swing.text.AsyncBoxView, "FlushTask", null, Runnable);
Clazz.overrideMethod (c$, "run", 
function () {
this.b$["jsjavax.swing.text.AsyncBoxView"].flushRequirementChanges ();
});
c$ = Clazz.p0p ();
};
});

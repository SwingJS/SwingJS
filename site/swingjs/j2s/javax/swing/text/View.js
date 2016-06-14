Clazz.declarePackage ("javax.swing.text");
Clazz.load (["javax.swing.SwingConstants"], "javax.swing.text.View", ["java.lang.IllegalArgumentException", "java.awt.Rectangle", "javax.swing.event.DocumentEvent", "javax.swing.text.Position", "$.Utilities"], function () {
c$ = Clazz.decorateAsClass (function () {
this.parent = null;
this.elem = null;
Clazz.instantialize (this, arguments);
}, javax.swing.text, "View", null, javax.swing.SwingConstants);
Clazz.makeConstructor (c$, 
function (elem) {
this.elem = elem;
}, "javax.swing.text.Element");
Clazz.defineMethod (c$, "getParent", 
function () {
return this.parent;
});
Clazz.defineMethod (c$, "isVisible", 
function () {
return true;
});
Clazz.defineMethod (c$, "getMinimumSpan", 
function (axis) {
var w = this.getResizeWeight (axis);
if (w == 0) {
return this.getPreferredSpan (axis);
}return 0;
}, "~N");
Clazz.defineMethod (c$, "getMaximumSpan", 
function (axis) {
var w = this.getResizeWeight (axis);
if (w == 0) {
return this.getPreferredSpan (axis);
}return 2147483647;
}, "~N");
Clazz.defineMethod (c$, "preferenceChanged", 
function (child, width, height) {
var parent = this.getParent ();
if (parent != null) {
parent.preferenceChanged (this, width, height);
}}, "javax.swing.text.View,~B,~B");
Clazz.defineMethod (c$, "getAlignment", 
function (axis) {
return 0.5;
}, "~N");
Clazz.defineMethod (c$, "setParent", 
function (parent) {
if (parent == null) {
for (var i = 0; i < this.getViewCount (); i++) {
if (this.getView (i).getParent () === this) {
this.getView (i).setParent (null);
}}
}this.parent = parent;
}, "javax.swing.text.View");
Clazz.defineMethod (c$, "getViewCount", 
function () {
return 0;
});
Clazz.defineMethod (c$, "getView", 
function (n) {
return null;
}, "~N");
Clazz.defineMethod (c$, "removeAll", 
function () {
this.replace (0, this.getViewCount (), null);
});
Clazz.defineMethod (c$, "remove", 
function (i) {
this.replace (i, 1, null);
}, "~N");
Clazz.defineMethod (c$, "insert", 
function (offs, v) {
var one =  new Array (1);
one[0] = v;
this.replace (offs, 0, one);
}, "~N,javax.swing.text.View");
Clazz.defineMethod (c$, "append", 
function (v) {
var one =  new Array (1);
one[0] = v;
this.replace (this.getViewCount (), 0, one);
}, "javax.swing.text.View");
Clazz.defineMethod (c$, "replace", 
function (offset, length, views) {
}, "~N,~N,~A");
Clazz.defineMethod (c$, "getViewIndex", 
function (pos, b) {
return -1;
}, "~N,javax.swing.text.Position.Bias");
Clazz.defineMethod (c$, "getChildAllocation", 
function (index, a) {
return null;
}, "~N,java.awt.Shape");
Clazz.defineMethod (c$, "getNextVisualPositionFrom", 
function (pos, b, a, direction, biasRet) {
biasRet[0] = javax.swing.text.Position.Bias.Forward;
switch (direction) {
case 1:
case 5:
{
if (pos == -1) {
pos = (direction == 1) ? Math.max (0, this.getEndOffset () - 1) : this.getStartOffset ();
break;
}var target = this.getContainer ();
var c = (target != null) ? target.getCaret () : null;
var mcp;
if (c != null) {
mcp = c.getMagicCaretPosition ();
} else {
mcp = null;
}var x;
if (mcp == null) {
var loc = target.modelToView (pos);
x = (loc == null) ? 0 : loc.x;
} else {
x = mcp.x;
}if (direction == 1) {
pos = javax.swing.text.Utilities.getPositionAbove (target, pos, x);
} else {
pos = javax.swing.text.Utilities.getPositionBelow (target, pos, x);
}}break;
case 7:
if (pos == -1) {
pos = Math.max (0, this.getEndOffset () - 1);
} else {
pos = Math.max (0, pos - 1);
}break;
case 3:
if (pos == -1) {
pos = this.getStartOffset ();
} else {
pos = Math.min (pos + 1, this.getDocument ().getLength ());
}break;
default:
throw  new IllegalArgumentException ("Bad direction: " + direction);
}
return pos;
}, "~N,javax.swing.text.Position.Bias,java.awt.Shape,~N,~A");
Clazz.defineMethod (c$, "modelToView", 
function (p0, b0, p1, b1, a) {
var s0 = this.modelToView (p0, a, b0);
var s1;
if (p1 == this.getEndOffset ()) {
try {
s1 = this.modelToView (p1, a, b1);
} catch (ble) {
if (Clazz.exceptionOf (ble, javax.swing.text.BadLocationException)) {
s1 = null;
} else {
throw ble;
}
}
if (s1 == null) {
var alloc = (Clazz.instanceOf (a, java.awt.Rectangle)) ? a : a.getBounds ();
s1 =  new java.awt.Rectangle (alloc.x + alloc.width - 1, alloc.y, 1, alloc.height);
}} else {
s1 = this.modelToView (p1, a, b1);
}var r0 = s0.getBounds ();
var r1 = (Clazz.instanceOf (s1, java.awt.Rectangle)) ? s1 : s1.getBounds ();
if (r0.y != r1.y) {
var alloc = (Clazz.instanceOf (a, java.awt.Rectangle)) ? a : a.getBounds ();
r0.x = alloc.x;
r0.width = alloc.width;
}r0.add (r1);
return r0;
}, "~N,javax.swing.text.Position.Bias,~N,javax.swing.text.Position.Bias,java.awt.Shape");
Clazz.defineMethod (c$, "insertUpdate", 
function (e, a, f) {
if (this.getViewCount () > 0) {
var elem = this.getElement ();
var ec = e.getChange (elem);
if (ec != null) {
if (!this.updateChildren (ec, e, f)) {
ec = null;
}}this.forwardUpdate (ec, e, a, f);
this.updateLayout (ec, e, a);
}}, "javax.swing.event.DocumentEvent,java.awt.Shape,javax.swing.text.ViewFactory");
Clazz.defineMethod (c$, "removeUpdate", 
function (e, a, f) {
if (this.getViewCount () > 0) {
var elem = this.getElement ();
var ec = e.getChange (elem);
if (ec != null) {
if (!this.updateChildren (ec, e, f)) {
ec = null;
}}this.forwardUpdate (ec, e, a, f);
this.updateLayout (ec, e, a);
}}, "javax.swing.event.DocumentEvent,java.awt.Shape,javax.swing.text.ViewFactory");
Clazz.defineMethod (c$, "changedUpdate", 
function (e, a, f) {
if (this.getViewCount () > 0) {
var elem = this.getElement ();
var ec = e.getChange (elem);
if (ec != null) {
if (!this.updateChildren (ec, e, f)) {
ec = null;
}}this.forwardUpdate (ec, e, a, f);
this.updateLayout (ec, e, a);
}}, "javax.swing.event.DocumentEvent,java.awt.Shape,javax.swing.text.ViewFactory");
Clazz.defineMethod (c$, "getDocument", 
function () {
return this.elem.getDocument ();
});
Clazz.defineMethod (c$, "getStartOffset", 
function () {
return this.elem.getStartOffset ();
});
Clazz.defineMethod (c$, "getEndOffset", 
function () {
return this.elem.getEndOffset ();
});
Clazz.defineMethod (c$, "getElement", 
function () {
return this.elem;
});
Clazz.defineMethod (c$, "getGraphics", 
function () {
var c = this.getContainer ();
return c.getGraphics ();
});
Clazz.defineMethod (c$, "getAttributes", 
function () {
return this.elem.getAttributes ();
});
Clazz.defineMethod (c$, "breakView", 
function (axis, offset, pos, len) {
return this;
}, "~N,~N,~N,~N");
Clazz.defineMethod (c$, "createFragment", 
function (p0, p1) {
return this;
}, "~N,~N");
Clazz.defineMethod (c$, "getBreakWeight", 
function (axis, pos, len) {
if (len > this.getPreferredSpan (axis)) {
return 1000;
}return 0;
}, "~N,~N,~N");
Clazz.defineMethod (c$, "getResizeWeight", 
function (axis) {
return 0;
}, "~N");
Clazz.defineMethod (c$, "setSize", 
function (width, height) {
}, "~N,~N");
Clazz.defineMethod (c$, "getContainer", 
function () {
var v = this.getParent ();
return (v != null) ? v.getContainer () : null;
});
Clazz.defineMethod (c$, "getViewFactory", 
function () {
var v = this.getParent ();
return (v != null) ? v.getViewFactory () : null;
});
Clazz.defineMethod (c$, "getToolTipText", 
function (x, y, allocation) {
var viewIndex = this.getViewIndex (x, y, allocation);
if (viewIndex >= 0) {
allocation = this.getChildAllocation (viewIndex, allocation);
var rect = (Clazz.instanceOf (allocation, java.awt.Rectangle)) ? allocation : allocation.getBounds ();
if (rect.contains (x, y)) {
return this.getView (viewIndex).getToolTipText (x, y, allocation);
}}return null;
}, "~N,~N,java.awt.Shape");
Clazz.defineMethod (c$, "getViewIndex", 
function (x, y, allocation) {
for (var counter = this.getViewCount () - 1; counter >= 0; counter--) {
var childAllocation = this.getChildAllocation (counter, allocation);
if (childAllocation != null) {
var rect = (Clazz.instanceOf (childAllocation, java.awt.Rectangle)) ? childAllocation : childAllocation.getBounds ();
if (rect.contains (x, y)) {
return counter;
}}}
return -1;
}, "~N,~N,java.awt.Shape");
Clazz.defineMethod (c$, "updateChildren", 
function (ec, e, f) {
var removedElems = ec.getChildrenRemoved ();
var addedElems = ec.getChildrenAdded ();
var added = null;
if (addedElems != null) {
added =  new Array (addedElems.length);
for (var i = 0; i < addedElems.length; i++) {
added[i] = f.create (addedElems[i]);
}
}var nremoved = 0;
var index = ec.getIndex ();
if (removedElems != null) {
nremoved = removedElems.length;
}this.replace (index, nremoved, added);
return true;
}, "javax.swing.event.DocumentEvent.ElementChange,javax.swing.event.DocumentEvent,javax.swing.text.ViewFactory");
Clazz.defineMethod (c$, "forwardUpdate", 
function (ec, e, a, f) {
var elem = this.getElement ();
var pos = e.getOffset ();
var index0 = this.getViewIndex (pos, javax.swing.text.Position.Bias.Forward);
if (index0 == -1 && e.getType () === javax.swing.event.DocumentEvent.EventType.REMOVE && pos >= this.getEndOffset ()) {
index0 = this.getViewCount () - 1;
}var index1 = index0;
var v = (index0 >= 0) ? this.getView (index0) : null;
if (v != null) {
if ((v.getStartOffset () == pos) && (pos > 0)) {
index0 = Math.max (index0 - 1, 0);
}}if (e.getType () !== javax.swing.event.DocumentEvent.EventType.REMOVE) {
index1 = this.getViewIndex (pos + e.getLength (), javax.swing.text.Position.Bias.Forward);
if (index1 < 0) {
index1 = this.getViewCount () - 1;
}}var hole0 = index1 + 1;
var hole1 = hole0;
var addedElems = (ec != null) ? ec.getChildrenAdded () : null;
if ((addedElems != null) && (addedElems.length > 0)) {
hole0 = ec.getIndex ();
hole1 = hole0 + addedElems.length - 1;
}index0 = Math.max (index0, 0);
for (var i = index0; i <= index1; i++) {
if (!((i >= hole0) && (i <= hole1))) {
v = this.getView (i);
if (v != null) {
var childAlloc = this.getChildAllocation (i, a);
this.forwardUpdateToView (v, e, childAlloc, f);
}}}
}, "javax.swing.event.DocumentEvent.ElementChange,javax.swing.event.DocumentEvent,java.awt.Shape,javax.swing.text.ViewFactory");
Clazz.defineMethod (c$, "forwardUpdateToView", 
function (v, e, a, f) {
var type = e.getType ();
if (type === javax.swing.event.DocumentEvent.EventType.INSERT) {
v.insertUpdate (e, a, f);
} else if (type === javax.swing.event.DocumentEvent.EventType.REMOVE) {
v.removeUpdate (e, a, f);
} else {
v.changedUpdate (e, a, f);
}}, "javax.swing.text.View,javax.swing.event.DocumentEvent,java.awt.Shape,javax.swing.text.ViewFactory");
Clazz.defineMethod (c$, "updateLayout", 
function (ec, e, a) {
if ((ec != null) && (a != null)) {
this.preferenceChanged (null, true, true);
var host = this.getContainer ();
if (host != null) {
host.repaint ();
}}}, "javax.swing.event.DocumentEvent.ElementChange,javax.swing.event.DocumentEvent,java.awt.Shape");
Clazz.defineMethod (c$, "modelToView", 
function (pos, a) {
return this.modelToView (pos, a, javax.swing.text.Position.Bias.Forward);
}, "~N,java.awt.Shape");
Clazz.defineMethod (c$, "viewToModel", 
function (x, y, a) {
javax.swing.text.View.sharedBiasReturn[0] = javax.swing.text.Position.Bias.Forward;
return this.viewToModel (x, y, a, javax.swing.text.View.sharedBiasReturn);
}, "~N,~N,java.awt.Shape");
Clazz.defineStatics (c$,
"BadBreakWeight", 0,
"GoodBreakWeight", 1000,
"ExcellentBreakWeight", 2000,
"ForcedBreakWeight", 3000,
"X_AXIS", 0,
"Y_AXIS", 1);
c$.sharedBiasReturn = c$.prototype.sharedBiasReturn =  new Array (1);
});

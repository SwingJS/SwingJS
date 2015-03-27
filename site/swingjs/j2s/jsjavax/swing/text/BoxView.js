Clazz.declarePackage ("jsjavax.swing.text");
Clazz.load (["jsjavax.swing.text.CompositeView"], "jsjavax.swing.text.BoxView", ["java.lang.IllegalArgumentException", "jsjava.awt.Rectangle", "jsjavax.swing.SizeRequirements", "jsjavax.swing.text.Position"], function () {
c$ = Clazz.decorateAsClass (function () {
this.majorAxis = 0;
this.majorSpan = 0;
this.minorSpan = 0;
this.majorReqValid = false;
this.minorReqValid = false;
this.majorRequest = null;
this.minorRequest = null;
this.majorAllocValid = false;
this.majorOffsets = null;
this.majorSpans = null;
this.minorAllocValid = false;
this.minorOffsets = null;
this.minorSpans = null;
this.tempRect = null;
Clazz.instantialize (this, arguments);
}, jsjavax.swing.text, "BoxView", jsjavax.swing.text.CompositeView);
Clazz.makeConstructor (c$, 
function (elem, axis) {
Clazz.superConstructor (this, jsjavax.swing.text.BoxView, [elem]);
this.tempRect =  new jsjava.awt.Rectangle ();
this.majorAxis = axis;
this.majorOffsets =  Clazz.newIntArray (0, 0);
this.majorSpans =  Clazz.newIntArray (0, 0);
this.majorReqValid = false;
this.majorAllocValid = false;
this.minorOffsets =  Clazz.newIntArray (0, 0);
this.minorSpans =  Clazz.newIntArray (0, 0);
this.minorReqValid = false;
this.minorAllocValid = false;
}, "jsjavax.swing.text.Element,~N");
Clazz.defineMethod (c$, "getAxis", 
function () {
return this.majorAxis;
});
Clazz.defineMethod (c$, "setAxis", 
function (axis) {
var axisChanged = (axis != this.majorAxis);
this.majorAxis = axis;
if (axisChanged) {
this.preferenceChanged (null, true, true);
}}, "~N");
Clazz.defineMethod (c$, "layoutChanged", 
function (axis) {
if (axis == this.majorAxis) {
this.majorAllocValid = false;
} else {
this.minorAllocValid = false;
}}, "~N");
Clazz.defineMethod (c$, "isLayoutValid", 
function (axis) {
if (axis == this.majorAxis) {
return this.majorAllocValid;
} else {
return this.minorAllocValid;
}}, "~N");
Clazz.defineMethod (c$, "paintChild", 
function (g, alloc, index) {
var child = this.getView (index);
child.paint (g, alloc);
}, "jsjava.awt.Graphics,jsjava.awt.Rectangle,~N");
Clazz.defineMethod (c$, "replace", 
function (index, length, elems) {
Clazz.superCall (this, jsjavax.swing.text.BoxView, "replace", [index, length, elems]);
var nInserted = (elems != null) ? elems.length : 0;
this.majorOffsets = this.updateLayoutArray (this.majorOffsets, index, nInserted);
this.majorSpans = this.updateLayoutArray (this.majorSpans, index, nInserted);
this.majorReqValid = false;
this.majorAllocValid = false;
this.minorOffsets = this.updateLayoutArray (this.minorOffsets, index, nInserted);
this.minorSpans = this.updateLayoutArray (this.minorSpans, index, nInserted);
this.minorReqValid = false;
this.minorAllocValid = false;
}, "~N,~N,~A");
Clazz.defineMethod (c$, "updateLayoutArray", 
function (oldArray, offset, nInserted) {
var n = this.getViewCount ();
var newArray =  Clazz.newIntArray (n, 0);
System.arraycopy (oldArray, 0, newArray, 0, offset);
System.arraycopy (oldArray, offset, newArray, offset + nInserted, n - nInserted - offset);
return newArray;
}, "~A,~N,~N");
Clazz.defineMethod (c$, "forwardUpdate", 
function (ec, e, a, f) {
var wasValid = this.isLayoutValid (this.majorAxis);
Clazz.superCall (this, jsjavax.swing.text.BoxView, "forwardUpdate", [ec, e, a, f]);
if (wasValid && (!this.isLayoutValid (this.majorAxis))) {
var c = this.getContainer ();
if ((a != null) && (c != null)) {
var pos = e.getOffset ();
var index = this.getViewIndexAtPosition (pos);
var alloc = this.getInsideAllocation (a);
if (this.majorAxis == 0) {
alloc.x += this.majorOffsets[index];
alloc.width -= this.majorOffsets[index];
} else {
alloc.y += this.minorOffsets[index];
alloc.height -= this.minorOffsets[index];
}c.repaint (alloc.x, alloc.y, alloc.width, alloc.height);
}}}, "jsjavax.swing.event.DocumentEvent.ElementChange,jsjavax.swing.event.DocumentEvent,jsjava.awt.Shape,jsjavax.swing.text.ViewFactory");
Clazz.defineMethod (c$, "preferenceChanged", 
function (child, width, height) {
var majorChanged = (this.majorAxis == 0) ? width : height;
var minorChanged = (this.majorAxis == 0) ? height : width;
if (majorChanged) {
this.majorReqValid = false;
this.majorAllocValid = false;
}if (minorChanged) {
this.minorReqValid = false;
this.minorAllocValid = false;
}Clazz.superCall (this, jsjavax.swing.text.BoxView, "preferenceChanged", [child, width, height]);
}, "jsjavax.swing.text.View,~B,~B");
Clazz.defineMethod (c$, "getResizeWeight", 
function (axis) {
this.checkRequests (axis);
if (axis == this.majorAxis) {
if ((this.majorRequest.preferred != this.majorRequest.minimum) || (this.majorRequest.preferred != this.majorRequest.maximum)) {
return 1;
}} else {
if ((this.minorRequest.preferred != this.minorRequest.minimum) || (this.minorRequest.preferred != this.minorRequest.maximum)) {
return 1;
}}return 0;
}, "~N");
Clazz.defineMethod (c$, "setSpanOnAxis", 
function (axis, span) {
if (axis == this.majorAxis) {
if (this.majorSpan != Clazz.floatToInt (span)) {
this.majorAllocValid = false;
}if (!this.majorAllocValid) {
this.majorSpan = Clazz.floatToInt (span);
this.checkRequests (this.majorAxis);
this.layoutMajorAxis (this.majorSpan, axis, this.majorOffsets, this.majorSpans);
this.majorAllocValid = true;
this.updateChildSizes ();
}} else {
if ((Clazz.floatToInt (span)) != this.minorSpan) {
this.minorAllocValid = false;
}if (!this.minorAllocValid) {
this.minorSpan = Clazz.floatToInt (span);
this.checkRequests (axis);
this.layoutMinorAxis (this.minorSpan, axis, this.minorOffsets, this.minorSpans);
this.minorAllocValid = true;
this.updateChildSizes ();
}}}, "~N,~N");
Clazz.defineMethod (c$, "updateChildSizes", 
function () {
var n = this.getViewCount ();
if (this.majorAxis == 0) {
for (var i = 0; i < n; i++) {
var v = this.getView (i);
v.setSize (this.majorSpans[i], this.minorSpans[i]);
}
} else {
for (var i = 0; i < n; i++) {
var v = this.getView (i);
v.setSize (this.minorSpans[i], this.majorSpans[i]);
}
}});
Clazz.defineMethod (c$, "getSpanOnAxis", 
function (axis) {
if (axis == this.majorAxis) {
return this.majorSpan;
} else {
return this.minorSpan;
}}, "~N");
Clazz.defineMethod (c$, "setSize", 
function (width, height) {
this.layout (Math.max (0, Clazz.floatToInt (width - this.getLeftInset () - this.getRightInset ())), Math.max (0, Clazz.floatToInt (height - this.getTopInset () - this.getBottomInset ())));
}, "~N,~N");
Clazz.defineMethod (c$, "paint", 
function (g, allocation) {
var alloc = (Clazz.instanceOf (allocation, jsjava.awt.Rectangle)) ? allocation : allocation.getBounds ();
var n = this.getViewCount ();
var x = alloc.x + this.getLeftInset ();
var y = alloc.y + this.getTopInset ();
var clip = g.getClipBounds ();
for (var i = 0; i < n; i++) {
this.tempRect.x = x + this.getOffset (0, i);
this.tempRect.y = y + this.getOffset (1, i);
this.tempRect.width = this.getSpan (0, i);
this.tempRect.height = this.getSpan (1, i);
var trx0 = this.tempRect.x;
var trx1 = trx0 + this.tempRect.width;
var try0 = this.tempRect.y;
var try1 = try0 + this.tempRect.height;
var crx0 = clip.x;
var crx1 = crx0 + clip.width;
var cry0 = clip.y;
var cry1 = cry0 + clip.height;
if ((trx1 >= crx0) && (try1 >= cry0) && (crx1 >= trx0) && (cry1 >= try0)) {
this.paintChild (g, this.tempRect, i);
}}
}, "jsjava.awt.Graphics,jsjava.awt.Shape");
Clazz.defineMethod (c$, "getChildAllocation", 
function (index, a) {
if (a != null) {
var ca = Clazz.superCall (this, jsjavax.swing.text.BoxView, "getChildAllocation", [index, a]);
if ((ca != null) && (!this.isAllocationValid ())) {
var r = (Clazz.instanceOf (ca, jsjava.awt.Rectangle)) ? ca : ca.getBounds ();
if ((r.width == 0) && (r.height == 0)) {
return null;
}}return ca;
}return null;
}, "~N,jsjava.awt.Shape");
Clazz.defineMethod (c$, "modelToView", 
function (pos, a, b) {
if (!this.isAllocationValid ()) {
var alloc = a.getBounds ();
this.setSize (alloc.width, alloc.height);
}return Clazz.superCall (this, jsjavax.swing.text.BoxView, "modelToView", [pos, a, b]);
}, "~N,jsjava.awt.Shape,jsjavax.swing.text.Position.Bias");
Clazz.defineMethod (c$, "viewToModel", 
function (x, y, a, bias) {
if (!this.isAllocationValid ()) {
var alloc = a.getBounds ();
this.setSize (alloc.width, alloc.height);
}return Clazz.superCall (this, jsjavax.swing.text.BoxView, "viewToModel", [x, y, a, bias]);
}, "~N,~N,jsjava.awt.Shape,~A");
Clazz.defineMethod (c$, "getAlignment", 
function (axis) {
this.checkRequests (axis);
if (axis == this.majorAxis) {
return this.majorRequest.alignment;
} else {
return this.minorRequest.alignment;
}}, "~N");
Clazz.defineMethod (c$, "getPreferredSpan", 
function (axis) {
this.checkRequests (axis);
var marginSpan = (axis == 0) ? this.getLeftInset () + this.getRightInset () : this.getTopInset () + this.getBottomInset ();
if (axis == this.majorAxis) {
return (this.majorRequest.preferred) + marginSpan;
} else {
return (this.minorRequest.preferred) + marginSpan;
}}, "~N");
Clazz.defineMethod (c$, "getMinimumSpan", 
function (axis) {
this.checkRequests (axis);
var marginSpan = (axis == 0) ? this.getLeftInset () + this.getRightInset () : this.getTopInset () + this.getBottomInset ();
if (axis == this.majorAxis) {
return (this.majorRequest.minimum) + marginSpan;
} else {
return (this.minorRequest.minimum) + marginSpan;
}}, "~N");
Clazz.defineMethod (c$, "getMaximumSpan", 
function (axis) {
this.checkRequests (axis);
var marginSpan = (axis == 0) ? this.getLeftInset () + this.getRightInset () : this.getTopInset () + this.getBottomInset ();
if (axis == this.majorAxis) {
return (this.majorRequest.maximum) + marginSpan;
} else {
return (this.minorRequest.maximum) + marginSpan;
}}, "~N");
Clazz.defineMethod (c$, "isAllocationValid", 
function () {
return (this.majorAllocValid && this.minorAllocValid);
});
Clazz.overrideMethod (c$, "isBefore", 
function (x, y, innerAlloc) {
if (this.majorAxis == 0) {
return (x < innerAlloc.x);
} else {
return (y < innerAlloc.y);
}}, "~N,~N,jsjava.awt.Rectangle");
Clazz.overrideMethod (c$, "isAfter", 
function (x, y, innerAlloc) {
if (this.majorAxis == 0) {
return (x > (innerAlloc.width + innerAlloc.x));
} else {
return (y > (innerAlloc.height + innerAlloc.y));
}}, "~N,~N,jsjava.awt.Rectangle");
Clazz.overrideMethod (c$, "getViewAtPoint", 
function (x, y, alloc) {
var n = this.getViewCount ();
if (this.majorAxis == 0) {
if (x < (alloc.x + this.majorOffsets[0])) {
this.childAllocation (0, alloc);
return this.getView (0);
}for (var i = 0; i < n; i++) {
if (x < (alloc.x + this.majorOffsets[i])) {
this.childAllocation (i - 1, alloc);
return this.getView (i - 1);
}}
this.childAllocation (n - 1, alloc);
return this.getView (n - 1);
} else {
if (y < (alloc.y + this.majorOffsets[0])) {
this.childAllocation (0, alloc);
return this.getView (0);
}for (var i = 0; i < n; i++) {
if (y < (alloc.y + this.majorOffsets[i])) {
this.childAllocation (i - 1, alloc);
return this.getView (i - 1);
}}
this.childAllocation (n - 1, alloc);
return this.getView (n - 1);
}}, "~N,~N,jsjava.awt.Rectangle");
Clazz.overrideMethod (c$, "childAllocation", 
function (index, alloc) {
alloc.x += this.getOffset (0, index);
alloc.y += this.getOffset (1, index);
alloc.width = this.getSpan (0, index);
alloc.height = this.getSpan (1, index);
}, "~N,jsjava.awt.Rectangle");
Clazz.defineMethod (c$, "layout", 
function (width, height) {
this.setSpanOnAxis (0, width);
this.setSpanOnAxis (1, height);
}, "~N,~N");
Clazz.defineMethod (c$, "getWidth", 
function () {
var span;
if (this.majorAxis == 0) {
span = this.majorSpan;
} else {
span = this.minorSpan;
}span += this.getLeftInset () - this.getRightInset ();
return span;
});
Clazz.defineMethod (c$, "getHeight", 
function () {
var span;
if (this.majorAxis == 1) {
span = this.majorSpan;
} else {
span = this.minorSpan;
}span += this.getTopInset () - this.getBottomInset ();
return span;
});
Clazz.defineMethod (c$, "layoutMajorAxis", 
function (targetSpan, axis, offsets, spans) {
var preferred = 0;
var n = this.getViewCount ();
for (var i = 0; i < n; i++) {
var v = this.getView (i);
spans[i] = Clazz.floatToInt (v.getPreferredSpan (axis));
preferred += spans[i];
}
var desiredAdjustment = targetSpan - preferred;
var adjustmentFactor = 0.0;
var diffs = null;
if (desiredAdjustment != 0) {
var totalSpan = 0;
diffs =  Clazz.newIntArray (n, 0);
for (var i = 0; i < n; i++) {
var v = this.getView (i);
var tmp;
if (desiredAdjustment < 0) {
tmp = Clazz.floatToInt (v.getMinimumSpan (axis));
diffs[i] = spans[i] - tmp;
} else {
tmp = Clazz.floatToInt (v.getMaximumSpan (axis));
diffs[i] = tmp - spans[i];
}totalSpan += tmp;
}
var maximumAdjustment = Math.abs (totalSpan - preferred);
adjustmentFactor = desiredAdjustment / maximumAdjustment;
adjustmentFactor = Math.min (adjustmentFactor, 1.0);
adjustmentFactor = Math.max (adjustmentFactor, -1.0);
}var totalOffset = 0;
for (var i = 0; i < n; i++) {
offsets[i] = totalOffset;
if (desiredAdjustment != 0) {
var adjF = adjustmentFactor * diffs[i];
spans[i] += Math.round (adjF);
}totalOffset = Math.min (totalOffset + spans[i], 2147483647);
}
}, "~N,~N,~A,~A");
Clazz.defineMethod (c$, "layoutMinorAxis", 
function (targetSpan, axis, offsets, spans) {
var n = this.getViewCount ();
for (var i = 0; i < n; i++) {
var v = this.getView (i);
var max = Clazz.floatToInt (v.getMaximumSpan (axis));
if (max < targetSpan) {
var align = v.getAlignment (axis);
offsets[i] = Clazz.floatToInt ((targetSpan - max) * align);
spans[i] = max;
} else {
var min = Clazz.floatToInt (v.getMinimumSpan (axis));
offsets[i] = 0;
spans[i] = Math.max (min, targetSpan);
}}
}, "~N,~N,~A,~A");
Clazz.defineMethod (c$, "calculateMajorAxisRequirements", 
function (axis, r) {
var min = 0;
var pref = 0;
var max = 0;
var n = this.getViewCount ();
for (var i = 0; i < n; i++) {
var v = this.getView (i);
min += v.getMinimumSpan (axis);
pref += v.getPreferredSpan (axis);
max += v.getMaximumSpan (axis);
}
if (r == null) {
r =  new jsjavax.swing.SizeRequirements ();
}r.alignment = 0.5;
r.minimum = Clazz.floatToInt (min);
r.preferred = Clazz.floatToInt (pref);
r.maximum = Clazz.floatToInt (max);
return r;
}, "~N,jsjavax.swing.SizeRequirements");
Clazz.defineMethod (c$, "calculateMinorAxisRequirements", 
function (axis, r) {
var min = 0;
var pref = 0;
var max = 2147483647;
var n = this.getViewCount ();
for (var i = 0; i < n; i++) {
var v = this.getView (i);
min = Math.max (Clazz.floatToInt (v.getMinimumSpan (axis)), min);
pref = Math.max (Clazz.floatToInt (v.getPreferredSpan (axis)), pref);
max = Math.max (Clazz.floatToInt (v.getMaximumSpan (axis)), max);
}
if (r == null) {
r =  new jsjavax.swing.SizeRequirements ();
r.alignment = 0.5;
}r.preferred = pref;
r.minimum = min;
r.maximum = max;
return r;
}, "~N,jsjavax.swing.SizeRequirements");
Clazz.defineMethod (c$, "checkRequests", 
function (axis) {
if ((axis != 0) && (axis != 1)) {
throw  new IllegalArgumentException ("Invalid axis: " + axis);
}if (axis == this.majorAxis) {
if (!this.majorReqValid) {
this.majorRequest = this.calculateMajorAxisRequirements (axis, this.majorRequest);
this.majorReqValid = true;
}} else if (!this.minorReqValid) {
this.minorRequest = this.calculateMinorAxisRequirements (axis, this.minorRequest);
this.minorReqValid = true;
}}, "~N");
Clazz.defineMethod (c$, "baselineLayout", 
function (targetSpan, axis, offsets, spans) {
var totalAscent = Clazz.floatToInt (targetSpan * this.getAlignment (axis));
var totalDescent = targetSpan - totalAscent;
var n = this.getViewCount ();
for (var i = 0; i < n; i++) {
var v = this.getView (i);
var align = v.getAlignment (axis);
var viewSpan;
if (v.getResizeWeight (axis) > 0) {
var minSpan = v.getMinimumSpan (axis);
var maxSpan = v.getMaximumSpan (axis);
if (align == 0.0) {
viewSpan = Math.max (Math.min (maxSpan, totalDescent), minSpan);
} else if (align == 1.0) {
viewSpan = Math.max (Math.min (maxSpan, totalAscent), minSpan);
} else {
var fitSpan = Math.min (totalAscent / align, totalDescent / (1.0 - align));
viewSpan = Math.max (Math.min (maxSpan, fitSpan), minSpan);
}} else {
viewSpan = v.getPreferredSpan (axis);
}offsets[i] = totalAscent - Clazz.floatToInt (viewSpan * align);
spans[i] = Clazz.floatToInt (viewSpan);
}
}, "~N,~N,~A,~A");
Clazz.defineMethod (c$, "baselineRequirements", 
function (axis, r) {
var totalAscent =  new jsjavax.swing.SizeRequirements ();
var totalDescent =  new jsjavax.swing.SizeRequirements ();
if (r == null) {
r =  new jsjavax.swing.SizeRequirements ();
}r.alignment = 0.5;
var n = this.getViewCount ();
for (var i = 0; i < n; i++) {
var v = this.getView (i);
var align = v.getAlignment (axis);
var span;
var ascent;
var descent;
span = v.getPreferredSpan (axis);
ascent = Clazz.floatToInt (align * span);
descent = Clazz.floatToInt (span - ascent);
totalAscent.preferred = Math.max (ascent, totalAscent.preferred);
totalDescent.preferred = Math.max (descent, totalDescent.preferred);
if (v.getResizeWeight (axis) > 0) {
span = v.getMinimumSpan (axis);
ascent = Clazz.floatToInt (align * span);
descent = Clazz.floatToInt (span - ascent);
totalAscent.minimum = Math.max (ascent, totalAscent.minimum);
totalDescent.minimum = Math.max (descent, totalDescent.minimum);
span = v.getMaximumSpan (axis);
ascent = Clazz.floatToInt (align * span);
descent = Clazz.floatToInt (span - ascent);
totalAscent.maximum = Math.max (ascent, totalAscent.maximum);
totalDescent.maximum = Math.max (descent, totalDescent.maximum);
} else {
totalAscent.minimum = Math.max (ascent, totalAscent.minimum);
totalDescent.minimum = Math.max (descent, totalDescent.minimum);
totalAscent.maximum = Math.max (ascent, totalAscent.maximum);
totalDescent.maximum = Math.max (descent, totalDescent.maximum);
}}
r.preferred = Math.min (totalAscent.preferred + totalDescent.preferred, 2147483647);
if (r.preferred > 0) {
r.alignment = totalAscent.preferred / r.preferred;
}if (r.alignment == 0.0) {
r.minimum = totalDescent.minimum;
r.maximum = totalDescent.maximum;
} else if (r.alignment == 1.0) {
r.minimum = totalAscent.minimum;
r.maximum = totalAscent.maximum;
} else {
r.minimum = Math.round (Math.max (totalAscent.minimum / r.alignment, totalDescent.minimum / (1.0 - r.alignment)));
r.maximum = Math.round (Math.min (totalAscent.maximum / r.alignment, totalDescent.maximum / (1.0 - r.alignment)));
}return r;
}, "~N,jsjavax.swing.SizeRequirements");
Clazz.defineMethod (c$, "getOffset", 
function (axis, childIndex) {
var offsets = (axis == this.majorAxis) ? this.majorOffsets : this.minorOffsets;
return offsets[childIndex];
}, "~N,~N");
Clazz.defineMethod (c$, "getSpan", 
function (axis, childIndex) {
var spans = (axis == this.majorAxis) ? this.majorSpans : this.minorSpans;
return spans[childIndex];
}, "~N,~N");
Clazz.defineMethod (c$, "flipEastAndWestAtEnds", 
function (position, bias) {
if (this.majorAxis == 1) {
var testPos = (bias === jsjavax.swing.text.Position.Bias.Backward) ? Math.max (0, position - 1) : position;
var index = this.getViewIndexAtPosition (testPos);
if (index != -1) {
var v = this.getView (index);
if (v != null && Clazz.instanceOf (v, jsjavax.swing.text.CompositeView)) {
return (v).flipEastAndWestAtEnds (position, bias);
}}}return false;
}, "~N,jsjavax.swing.text.Position.Bias");
});

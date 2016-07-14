Clazz.declarePackage ("javax.swing.text");
Clazz.load (["javax.swing.text.View"], "javax.swing.text.CompositeView", ["java.lang.IllegalArgumentException", "java.awt.Rectangle", "javax.swing.text.BadLocationException", "$.Position", "$.StyleConstants", "$.Utilities"], function () {
c$ = Clazz.decorateAsClass (function () {
this.children = null;
this.nchildren = 0;
this.left = 0;
this.right = 0;
this.top = 0;
this.bottom = 0;
this.childAlloc = null;
Clazz.instantialize (this, arguments);
}, javax.swing.text, "CompositeView", javax.swing.text.View);
Clazz.makeConstructor (c$, 
function (elem) {
Clazz.superConstructor (this, javax.swing.text.CompositeView, [elem]);
this.children =  new Array (1);
this.nchildren = 0;
this.childAlloc =  new java.awt.Rectangle ();
}, "javax.swing.text.Element");
Clazz.defineMethod (c$, "loadChildren", 
function (f) {
if (f == null) {
return;
}var e = this.getElement ();
var n = e.getElementCount ();
if (n > 0) {
var added =  new Array (n);
for (var i = 0; i < n; i++) {
added[i] = f.create (e.getElement (i));
}
this.replace (0, 0, added);
}}, "javax.swing.text.ViewFactory");
Clazz.defineMethod (c$, "setParent", 
function (parent) {
Clazz.superCall (this, javax.swing.text.CompositeView, "setParent", [parent]);
if ((parent != null) && (this.nchildren == 0)) {
var f = this.getViewFactory ();
this.loadChildren (f);
}}, "javax.swing.text.View");
Clazz.overrideMethod (c$, "getViewCount", 
function () {
return this.nchildren;
});
Clazz.overrideMethod (c$, "getView", 
function (n) {
return this.children[n];
}, "~N");
Clazz.overrideMethod (c$, "replace", 
function (offset, length, views) {
if (views == null) {
views = javax.swing.text.CompositeView.ZERO;
}for (var i = offset; i < offset + length; i++) {
if (this.children[i].getParent () === this) {
this.children[i].setParent (null);
}this.children[i] = null;
}
var delta = views.length - length;
var src = offset + length;
var nmove = this.nchildren - src;
var dest = src + delta;
if ((this.nchildren + delta) >= this.children.length) {
var newLength = Math.max (2 * this.children.length, this.nchildren + delta);
var newChildren =  new Array (newLength);
System.arraycopy (this.children, 0, newChildren, 0, offset);
System.arraycopy (views, 0, newChildren, offset, views.length);
System.arraycopy (this.children, src, newChildren, dest, nmove);
this.children = newChildren;
} else {
System.arraycopy (this.children, src, this.children, dest, nmove);
System.arraycopy (views, 0, this.children, offset, views.length);
}this.nchildren = this.nchildren + delta;
for (var i = 0; i < views.length; i++) {
views[i].setParent (this);
}
}, "~N,~N,~A");
Clazz.overrideMethod (c$, "getChildAllocation", 
function (index, a) {
var alloc = this.getInsideAllocation (a);
this.childAllocation (index, alloc);
return alloc;
}, "~N,java.awt.Shape");
Clazz.defineMethod (c$, "modelToView", 
function (pos, a, b) {
var isBackward = (b === javax.swing.text.Position.Bias.Backward);
var testPos = (isBackward) ? Math.max (0, pos - 1) : pos;
if (isBackward && testPos < this.getStartOffset ()) {
return null;
}var vIndex = this.getViewIndexAtPosition (testPos);
if ((vIndex != -1) && (vIndex < this.getViewCount ())) {
var v = this.getView (vIndex);
if (v != null && testPos >= v.getStartOffset () && testPos < v.getEndOffset ()) {
var childShape = this.getChildAllocation (vIndex, a);
if (childShape == null) {
return null;
}var retShape = v.modelToView (pos, childShape, b);
if (retShape == null && v.getEndOffset () == pos) {
if (++vIndex < this.getViewCount ()) {
v = this.getView (vIndex);
retShape = v.modelToView (pos, this.getChildAllocation (vIndex, a), b);
}}return retShape;
}}throw  new javax.swing.text.BadLocationException ("Position not represented by view", pos);
}, "~N,java.awt.Shape,javax.swing.text.Position.Bias");
Clazz.defineMethod (c$, "modelToView", 
function (p0, b0, p1, b1, a) {
if (p0 == this.getStartOffset () && p1 == this.getEndOffset ()) {
return a;
}var alloc = this.getInsideAllocation (a);
var r0 =  new java.awt.Rectangle (alloc);
var v0 = this.getViewAtPosition ((b0 === javax.swing.text.Position.Bias.Backward) ? Math.max (0, p0 - 1) : p0, r0);
var r1 =  new java.awt.Rectangle (alloc);
var v1 = this.getViewAtPosition ((b1 === javax.swing.text.Position.Bias.Backward) ? Math.max (0, p1 - 1) : p1, r1);
if (v0 === v1) {
if (v0 == null) {
return a;
}return v0.modelToView (p0, b0, p1, b1, r0);
}var viewCount = this.getViewCount ();
var counter = 0;
while (counter < viewCount) {
var v;
if ((v = this.getView (counter)) === v0 || v === v1) {
var endView;
var retRect;
var tempRect =  new java.awt.Rectangle ();
if (v === v0) {
retRect = v0.modelToView (p0, b0, v0.getEndOffset (), javax.swing.text.Position.Bias.Backward, r0).getBounds ();
endView = v1;
} else {
retRect = v1.modelToView (v1.getStartOffset (), javax.swing.text.Position.Bias.Forward, p1, b1, r1).getBounds ();
endView = v0;
}while (++counter < viewCount && (v = this.getView (counter)) !== endView) {
tempRect.setBounds (alloc);
this.childAllocation (counter, tempRect);
retRect.add (tempRect);
}
if (endView != null) {
var endShape;
if (endView === v1) {
endShape = v1.modelToView (v1.getStartOffset (), javax.swing.text.Position.Bias.Forward, p1, b1, r1);
} else {
endShape = v0.modelToView (p0, b0, v0.getEndOffset (), javax.swing.text.Position.Bias.Backward, r0);
}if (Clazz.instanceOf (endShape, java.awt.Rectangle)) {
retRect.add (endShape);
} else {
retRect.add (endShape.getBounds ());
}}return retRect;
}counter++;
}
throw  new javax.swing.text.BadLocationException ("Position not represented by view", p0);
}, "~N,javax.swing.text.Position.Bias,~N,javax.swing.text.Position.Bias,java.awt.Shape");
Clazz.defineMethod (c$, "viewToModel", 
function (x, y, a, bias) {
var alloc = this.getInsideAllocation (a);
if (this.isBefore (Clazz.floatToInt (x), Clazz.floatToInt (y), alloc)) {
var retValue = -1;
try {
retValue = this.getNextVisualPositionFrom (-1, javax.swing.text.Position.Bias.Forward, a, 3, bias);
} catch (e$$) {
if (Clazz.exceptionOf (e$$, javax.swing.text.BadLocationException)) {
var ble = e$$;
{
}
} else if (Clazz.exceptionOf (e$$, IllegalArgumentException)) {
var iae = e$$;
{
}
} else {
throw e$$;
}
}
if (retValue == -1) {
retValue = this.getStartOffset ();
bias[0] = javax.swing.text.Position.Bias.Forward;
}return retValue;
} else if (this.isAfter (Clazz.floatToInt (x), Clazz.floatToInt (y), alloc)) {
var retValue = -1;
try {
retValue = this.getNextVisualPositionFrom (-1, javax.swing.text.Position.Bias.Forward, a, 7, bias);
} catch (e$$) {
if (Clazz.exceptionOf (e$$, javax.swing.text.BadLocationException)) {
var ble = e$$;
{
}
} else if (Clazz.exceptionOf (e$$, IllegalArgumentException)) {
var iae = e$$;
{
}
} else {
throw e$$;
}
}
if (retValue == -1) {
retValue = this.getEndOffset () - 1;
bias[0] = javax.swing.text.Position.Bias.Forward;
}return retValue;
} else {
var v = this.getViewAtPoint (Clazz.floatToInt (x), Clazz.floatToInt (y), alloc);
if (v != null) {
return v.viewToModel (x, y, alloc, bias);
}}return -1;
}, "~N,~N,java.awt.Shape,~A");
Clazz.overrideMethod (c$, "getNextVisualPositionFrom", 
function (pos, b, a, direction, biasRet) {
switch (direction) {
case 1:
return this.getNextNorthSouthVisualPositionFrom (pos, b, a, direction, biasRet);
case 5:
return this.getNextNorthSouthVisualPositionFrom (pos, b, a, direction, biasRet);
case 3:
return this.getNextEastWestVisualPositionFrom (pos, b, a, direction, biasRet);
case 7:
return this.getNextEastWestVisualPositionFrom (pos, b, a, direction, biasRet);
default:
throw  new IllegalArgumentException ("Bad direction: " + direction);
}
}, "~N,javax.swing.text.Position.Bias,java.awt.Shape,~N,~A");
Clazz.defineMethod (c$, "getViewIndex", 
function (pos, b) {
if (b === javax.swing.text.Position.Bias.Backward) {
pos -= 1;
}if ((pos >= this.getStartOffset ()) && (pos < this.getEndOffset ())) {
return this.getViewIndexAtPosition (pos);
}return -1;
}, "~N,javax.swing.text.Position.Bias");
Clazz.defineMethod (c$, "getViewAtPosition", 
function (pos, a) {
var index = this.getViewIndexAtPosition (pos);
if ((index >= 0) && (index < this.getViewCount ())) {
var v = this.getView (index);
if (a != null) {
this.childAllocation (index, a);
}return v;
}return null;
}, "~N,java.awt.Rectangle");
Clazz.defineMethod (c$, "getViewIndexAtPosition", 
function (pos) {
var elem = this.getElement ();
return elem.getElementIndex (pos);
}, "~N");
Clazz.defineMethod (c$, "getInsideAllocation", 
function (a) {
if (a != null) {
var alloc;
if (Clazz.instanceOf (a, java.awt.Rectangle)) {
alloc = a;
} else {
alloc = a.getBounds ();
}this.childAlloc.setBounds (alloc);
this.childAlloc.x += this.getLeftInset ();
this.childAlloc.y += this.getTopInset ();
this.childAlloc.width -= this.getLeftInset () + this.getRightInset ();
this.childAlloc.height -= this.getTopInset () + this.getBottomInset ();
return this.childAlloc;
}return null;
}, "java.awt.Shape");
Clazz.defineMethod (c$, "setParagraphInsets", 
function (attr) {
this.top = Clazz.floatToShort (javax.swing.text.StyleConstants.getSpaceAbove (attr));
this.left = Clazz.floatToShort (javax.swing.text.StyleConstants.getLeftIndent (attr));
this.bottom = Clazz.floatToShort (javax.swing.text.StyleConstants.getSpaceBelow (attr));
this.right = Clazz.floatToShort (javax.swing.text.StyleConstants.getRightIndent (attr));
}, "javax.swing.text.AttributeSet");
Clazz.defineMethod (c$, "setInsets", 
function (top, left, bottom, right) {
this.top = top;
this.left = left;
this.right = right;
this.bottom = bottom;
}, "~N,~N,~N,~N");
Clazz.defineMethod (c$, "getLeftInset", 
function () {
return this.left;
});
Clazz.defineMethod (c$, "getRightInset", 
function () {
return this.right;
});
Clazz.defineMethod (c$, "getTopInset", 
function () {
return this.top;
});
Clazz.defineMethod (c$, "getBottomInset", 
function () {
return this.bottom;
});
Clazz.defineMethod (c$, "getNextNorthSouthVisualPositionFrom", 
function (pos, b, a, direction, biasRet) {
return javax.swing.text.Utilities.getNextVisualPositionFrom (this, pos, b, a, direction, biasRet);
}, "~N,javax.swing.text.Position.Bias,java.awt.Shape,~N,~A");
Clazz.defineMethod (c$, "getNextEastWestVisualPositionFrom", 
function (pos, b, a, direction, biasRet) {
return javax.swing.text.Utilities.getNextVisualPositionFrom (this, pos, b, a, direction, biasRet);
}, "~N,javax.swing.text.Position.Bias,java.awt.Shape,~N,~A");
Clazz.defineMethod (c$, "flipEastAndWestAtEnds", 
function (position, bias) {
return false;
}, "~N,javax.swing.text.Position.Bias");
c$.ZERO = c$.prototype.ZERO =  new Array (0);
});

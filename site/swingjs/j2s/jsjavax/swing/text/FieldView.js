Clazz.declarePackage ("jsjavax.swing.text");
Clazz.load (["jsjavax.swing.text.PlainView"], "jsjavax.swing.text.FieldView", ["jsjavax.swing.JComponent", "$.JTextField", "jsjavax.swing.text.SegmentCache", "$.Utilities", "jssun.swing.SwingUtilities2"], function () {
c$ = Clazz.declareType (jsjavax.swing.text, "FieldView", jsjavax.swing.text.PlainView);
Clazz.defineMethod (c$, "getFontMetrics", 
function () {
var c = this.getContainer ();
return c.getFontMetrics (c.getFont ());
});
Clazz.defineMethod (c$, "adjustAllocation", 
function (a) {
if (a != null) {
var bounds = a.getBounds ();
var vspan = Clazz.floatToInt (this.getPreferredSpan (1));
var hspan = Clazz.floatToInt (this.getPreferredSpan (0));
if (bounds.height != vspan) {
var slop = bounds.height - vspan;
bounds.y += Clazz.doubleToInt (slop / 2);
bounds.height -= slop;
}var c = this.getContainer ();
if (Clazz.instanceOf (c, jsjavax.swing.JTextField)) {
var field = c;
var vis = field.getHorizontalVisibility ();
var max = Math.max (hspan, bounds.width);
var value = vis.getValue ();
var extent = Math.min (max, bounds.width - 1);
if ((value + extent) > max) {
value = max - extent;
}vis.setRangeProperties (value, extent, vis.getMinimum (), max, false);
if (hspan < bounds.width) {
var slop = bounds.width - 1 - hspan;
var align = (c).getHorizontalAlignment ();
if (jsjavax.swing.text.Utilities.isLeftToRight (c)) {
if (align == 10) {
align = 2;
} else if (align == 11) {
align = 4;
}} else {
if (align == 10) {
align = 4;
} else if (align == 11) {
align = 2;
}}switch (align) {
case 0:
bounds.x += Clazz.doubleToInt (slop / 2);
bounds.width -= slop;
break;
case 4:
bounds.x += slop;
bounds.width -= slop;
break;
}
} else {
bounds.width = hspan;
bounds.x -= vis.getValue ();
}}return bounds;
}return null;
}, "jsjava.awt.Shape");
Clazz.defineMethod (c$, "updateVisibilityModel", 
function () {
var c = this.getContainer ();
if (Clazz.instanceOf (c, jsjavax.swing.JTextField)) {
var field = c;
var vis = field.getHorizontalVisibility ();
var hspan = Clazz.floatToInt (this.getPreferredSpan (0));
var extent = vis.getExtent ();
var maximum = Math.max (hspan, extent);
extent = (extent == 0) ? maximum : extent;
var value = maximum - extent;
var oldValue = vis.getValue ();
if ((oldValue + extent) > maximum) {
oldValue = maximum - extent;
}value = Math.max (0, Math.min (value, oldValue));
vis.setRangeProperties (value, extent, 0, maximum, false);
}});
Clazz.defineMethod (c$, "paint", 
function (g, a) {
var r = a;
g.clipRect (r.x, r.y, r.width, r.height);
Clazz.superCall (this, jsjavax.swing.text.FieldView, "paint", [g, a]);
}, "jsjava.awt.Graphics,jsjava.awt.Shape");
Clazz.overrideMethod (c$, "adjustPaintRegion", 
function (a) {
return this.adjustAllocation (a);
}, "jsjava.awt.Shape");
Clazz.defineMethod (c$, "getPreferredSpan", 
function (axis) {
switch (axis) {
case 0:
var buff = jsjavax.swing.text.SegmentCache.getSharedSegment ();
var doc = this.getDocument ();
var width;
try {
var fm = this.getFontMetrics ();
doc.getText (0, doc.getLength (), buff);
width = jsjavax.swing.text.Utilities.getTabbedTextWidth (buff, fm, 0, this, 0);
if (buff.count > 0) {
var c = this.getContainer ();
this.firstLineOffset = jssun.swing.SwingUtilities2.getLeftSideBearing ((Clazz.instanceOf (c, jsjavax.swing.JComponent)) ? c : null, fm, buff.array[buff.offset]);
this.firstLineOffset = Math.max (0, -this.firstLineOffset);
} else {
this.firstLineOffset = 0;
}} catch (bl) {
if (Clazz.exceptionOf (bl, jsjavax.swing.text.BadLocationException)) {
width = 0;
} else {
throw bl;
}
}
jsjavax.swing.text.SegmentCache.releaseSharedSegment (buff);
return width + this.firstLineOffset;
default:
return Clazz.superCall (this, jsjavax.swing.text.FieldView, "getPreferredSpan", [axis]);
}
}, "~N");
Clazz.overrideMethod (c$, "getResizeWeight", 
function (axis) {
if (axis == 0) {
return 1;
}return 0;
}, "~N");
Clazz.defineMethod (c$, "modelToView", 
function (pos, a, b) {
return Clazz.superCall (this, jsjavax.swing.text.FieldView, "modelToView", [pos, this.adjustAllocation (a), b]);
}, "~N,jsjava.awt.Shape,jsjavax.swing.text.Position.Bias");
Clazz.defineMethod (c$, "viewToModel", 
function (fx, fy, a, bias) {
return Clazz.superCall (this, jsjavax.swing.text.FieldView, "viewToModel", [fx, fy, this.adjustAllocation (a), bias]);
}, "~N,~N,jsjava.awt.Shape,~A");
Clazz.defineMethod (c$, "insertUpdate", 
function (changes, a, f) {
Clazz.superCall (this, jsjavax.swing.text.FieldView, "insertUpdate", [changes, this.adjustAllocation (a), f]);
this.updateVisibilityModel ();
}, "jsjavax.swing.event.DocumentEvent,jsjava.awt.Shape,jsjavax.swing.text.ViewFactory");
Clazz.defineMethod (c$, "removeUpdate", 
function (changes, a, f) {
Clazz.superCall (this, jsjavax.swing.text.FieldView, "removeUpdate", [changes, this.adjustAllocation (a), f]);
this.updateVisibilityModel ();
}, "jsjavax.swing.event.DocumentEvent,jsjava.awt.Shape,jsjavax.swing.text.ViewFactory");
});

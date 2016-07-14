Clazz.declarePackage ("javax.swing.text");
Clazz.load (["javax.swing.text.TabExpander", "$.View"], "javax.swing.text.PlainView", ["java.lang.IllegalArgumentException", "java.awt.Rectangle", "javax.swing.event.DocumentEvent", "javax.swing.text.Position", "$.Segment", "$.SegmentCache", "$.Utilities"], function () {
c$ = Clazz.decorateAsClass (function () {
this.metrics = null;
this.longLine = null;
this.font = null;
this.lineBuffer = null;
this.tabSize = 0;
this.tabBase = 0;
this.sel0 = 0;
this.sel1 = 0;
this.unselected = null;
this.selected = null;
this.firstLineOffset = 0;
Clazz.instantialize (this, arguments);
}, javax.swing.text, "PlainView", javax.swing.text.View, javax.swing.text.TabExpander);
Clazz.defineMethod (c$, "getTabSize", 
function () {
var i = this.getDocument ().getProperty ("tabSize");
var size = (i != null) ? i.intValue () : 8;
return size;
});
Clazz.defineMethod (c$, "getLineBuffer", 
function () {
if (this.lineBuffer == null) {
this.lineBuffer =  new javax.swing.text.Segment ();
}return this.lineBuffer;
});
Clazz.defineMethod (c$, "updateMetrics", 
function () {
var host = this.getContainer ();
var f = host.getFont ();
if (this.font !== f) {
this.calculateLongestLine ();
this.tabSize = this.getTabSize () * this.metrics.charWidth ('m');
}});
Clazz.overrideMethod (c$, "getPreferredSpan", 
function (axis) {
this.updateMetrics ();
switch (axis) {
case 0:
return this.getLineWidth (this.longLine);
case 1:
return this.getElement ().getElementCount () * this.metrics.getHeight ();
default:
throw  new IllegalArgumentException ("Invalid axis: " + axis);
}
}, "~N");
Clazz.overrideMethod (c$, "paint", 
function (g, a) {
}, "java.awt.Graphics,java.awt.Shape");
Clazz.defineMethod (c$, "adjustPaintRegion", 
function (a) {
return a;
}, "java.awt.Shape");
Clazz.defineMethod (c$, "modelToView", 
function (pos, a, b) {
var doc = this.getDocument ();
var map = this.getElement ();
var lineIndex = map.getElementIndex (pos);
if (lineIndex < 0) {
return this.lineToRect (a, 0);
}var lineArea = this.lineToRect (a, lineIndex);
this.tabBase = lineArea.x;
var line = map.getElement (lineIndex);
var p0 = line.getStartOffset ();
var s = javax.swing.text.SegmentCache.getSharedSegment ();
doc.getText (p0, pos - p0, s);
var xOffs = javax.swing.text.Utilities.getTabbedTextWidth (s, this.metrics, this.tabBase, this, p0);
javax.swing.text.SegmentCache.releaseSharedSegment (s);
lineArea.x += xOffs;
lineArea.width = 1;
lineArea.height = this.metrics.getHeight ();
return lineArea;
}, "~N,java.awt.Shape,javax.swing.text.Position.Bias");
Clazz.defineMethod (c$, "viewToModel", 
function (fx, fy, a, bias) {
bias[0] = javax.swing.text.Position.Bias.Forward;
var alloc = a.getBounds ();
var doc = this.getDocument ();
var x = Clazz.floatToInt (fx);
var y = Clazz.floatToInt (fy);
if (y < alloc.y) {
return this.getStartOffset ();
} else if (y > alloc.y + alloc.height) {
return this.getEndOffset () - 1;
} else {
var map = doc.getDefaultRootElement ();
var fontHeight = this.metrics.getHeight ();
var lineIndex = (fontHeight > 0 ? Math.abs (Clazz.doubleToInt ((y - alloc.y) / fontHeight)) : map.getElementCount () - 1);
if (lineIndex >= map.getElementCount ()) {
return this.getEndOffset () - 1;
}var line = map.getElement (lineIndex);
if (lineIndex == 0) {
alloc.x += this.firstLineOffset;
alloc.width -= this.firstLineOffset;
}if (x < alloc.x) {
return line.getStartOffset ();
} else if (x > alloc.x + alloc.width) {
return line.getEndOffset () - 1;
} else {
try {
var p0 = line.getStartOffset ();
var p1 = line.getEndOffset () - 1;
var s = javax.swing.text.SegmentCache.getSharedSegment ();
doc.getText (p0, p1 - p0, s);
this.tabBase = alloc.x;
var offs = p0 + javax.swing.text.Utilities.getTabbedTextOffset (s, this.metrics, this.tabBase, x, this, p0);
javax.swing.text.SegmentCache.releaseSharedSegment (s);
return offs;
} catch (e) {
if (Clazz.exceptionOf (e, javax.swing.text.BadLocationException)) {
return -1;
} else {
throw e;
}
}
}}}, "~N,~N,java.awt.Shape,~A");
Clazz.overrideMethod (c$, "insertUpdate", 
function (changes, a, f) {
this.updateDamage (changes, a, f);
}, "javax.swing.event.DocumentEvent,java.awt.Shape,javax.swing.text.ViewFactory");
Clazz.overrideMethod (c$, "removeUpdate", 
function (changes, a, f) {
this.updateDamage (changes, a, f);
}, "javax.swing.event.DocumentEvent,java.awt.Shape,javax.swing.text.ViewFactory");
Clazz.overrideMethod (c$, "changedUpdate", 
function (changes, a, f) {
this.updateDamage (changes, a, f);
}, "javax.swing.event.DocumentEvent,java.awt.Shape,javax.swing.text.ViewFactory");
Clazz.defineMethod (c$, "setSize", 
function (width, height) {
Clazz.superCall (this, javax.swing.text.PlainView, "setSize", [width, height]);
this.updateMetrics ();
}, "~N,~N");
Clazz.overrideMethod (c$, "nextTabStop", 
function (x, tabOffset) {
if (this.tabSize == 0) {
return x;
}var ntabs = Clazz.doubleToInt (((Clazz.floatToInt (x)) - this.tabBase) / this.tabSize);
return this.tabBase + ((ntabs + 1) * this.tabSize);
}, "~N,~N");
Clazz.defineMethod (c$, "updateDamage", 
function (changes, a, f) {
var host = this.getContainer ();
this.updateMetrics ();
var elem = this.getElement ();
var ec = changes.getChange (elem);
var added = (ec != null) ? ec.getChildrenAdded () : null;
var removed = (ec != null) ? ec.getChildrenRemoved () : null;
if (((added != null) && (added.length > 0)) || ((removed != null) && (removed.length > 0))) {
if (added != null) {
var currWide = this.getLineWidth (this.longLine);
for (var i = 0; i < added.length; i++) {
var w = this.getLineWidth (added[i]);
if (w > currWide) {
currWide = w;
this.longLine = added[i];
}}
}if (removed != null) {
for (var i = 0; i < removed.length; i++) {
if (removed[i] === this.longLine) {
this.calculateLongestLine ();
break;
}}
}this.preferenceChanged (null, true, true);
host.repaint ();
} else {
var map = this.getElement ();
var line = map.getElementIndex (changes.getOffset ());
this.damageLineRange (line, line, a, host);
if (changes.getType () === javax.swing.event.DocumentEvent.EventType.INSERT) {
var w = this.getLineWidth (this.longLine);
var e = map.getElement (line);
if (e === this.longLine) {
this.preferenceChanged (null, true, false);
} else if (this.getLineWidth (e) > w) {
this.longLine = e;
this.preferenceChanged (null, true, false);
}} else if (changes.getType () === javax.swing.event.DocumentEvent.EventType.REMOVE) {
if (map.getElement (line) === this.longLine) {
this.calculateLongestLine ();
this.preferenceChanged (null, true, false);
}}}}, "javax.swing.event.DocumentEvent,java.awt.Shape,javax.swing.text.ViewFactory");
Clazz.defineMethod (c$, "damageLineRange", 
function (line0, line1, a, host) {
if (a != null) {
var area0 = this.lineToRect (a, line0);
var area1 = this.lineToRect (a, line1);
if ((area0 != null) && (area1 != null)) {
var damage = area0.union (area1);
host.repaint (damage.x, damage.y, damage.width, damage.height);
} else {
host.repaint ();
}}}, "~N,~N,java.awt.Shape,java.awt.Component");
Clazz.defineMethod (c$, "lineToRect", 
function (a, line) {
var r = null;
this.updateMetrics ();
if (this.metrics != null) {
var alloc = a.getBounds ();
if (line == 0) {
alloc.x += this.firstLineOffset;
alloc.width -= this.firstLineOffset;
}r =  new java.awt.Rectangle (alloc.x, alloc.y + (line * this.metrics.getHeight ()), alloc.width, this.metrics.getHeight ());
}return r;
}, "java.awt.Shape,~N");
Clazz.defineMethod (c$, "calculateLongestLine", 
 function () {
var c = this.getContainer ();
this.font = c.getFont ();
this.metrics = c.getFontMetrics (this.font);
var lines = this.getElement ();
var n = lines.getElementCount ();
var maxWidth = -1;
for (var i = 0; i < n; i++) {
var line = lines.getElement (i);
var w = this.getLineWidth (line);
if (w > maxWidth) {
maxWidth = w;
this.longLine = line;
}}
});
Clazz.defineMethod (c$, "getLineWidth", 
 function (line) {
if (line == null) {
return 0;
}var p0 = line.getStartOffset ();
var p1 = line.getEndOffset ();
var w;
var s = javax.swing.text.SegmentCache.getSharedSegment ();
try {
line.getDocument ().getText (p0, p1 - p0, s);
w = javax.swing.text.Utilities.getTabbedTextWidth (s, this.metrics, this.tabBase, this, p0);
} catch (ble) {
if (Clazz.exceptionOf (ble, javax.swing.text.BadLocationException)) {
w = 0;
} else {
throw ble;
}
}
javax.swing.text.SegmentCache.releaseSharedSegment (s);
return w;
}, "javax.swing.text.Element");
});

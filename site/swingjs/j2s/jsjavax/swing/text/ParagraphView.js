Clazz.declarePackage ("jsjavax.swing.text");
Clazz.load (["jsjavax.swing.text.BoxView", "$.FlowView", "$.TabExpander"], "jsjavax.swing.text.ParagraphView", ["java.lang.Boolean", "$.IllegalArgumentException", "java.util.Arrays", "jsjava.awt.Rectangle", "jsjava.awt.font.TextAttribute", "jsjavax.swing.text.AbstractDocument", "jsjavax.swing.text.FlowView.FlowStrategy", "jsjavax.swing.text.GlyphView", "$.Position", "$.Segment", "$.StateInvariantError", "$.StyleConstants", "$.TabableView"], function () {
c$ = Clazz.decorateAsClass (function () {
this.justification = 0;
this.lineSpacing = 0;
this.firstLineIndent = 0;
this.tabBase = 0;
if (!Clazz.isClassDefined ("jsjavax.swing.text.ParagraphView.Row")) {
jsjavax.swing.text.ParagraphView.$ParagraphView$Row$ ();
}
Clazz.instantialize (this, arguments);
}, jsjavax.swing.text, "ParagraphView", jsjavax.swing.text.FlowView, jsjavax.swing.text.TabExpander);
Clazz.makeConstructor (c$, 
function (elem) {
Clazz.superConstructor (this, jsjavax.swing.text.ParagraphView, [elem, 1]);
this.setPropertiesFromAttributes ();
var doc = elem.getDocument ();
var i18nFlag = doc.getProperty ("i18n");
if ((i18nFlag != null) && i18nFlag.equals (Boolean.TRUE)) {
try {
if (jsjavax.swing.text.ParagraphView.i18nStrategy == null) {
var classname = "jsjavax.swing.text.TextLayoutStrategy";
var loader = this.getClass ().getClassLoader ();
if (loader != null) {
jsjavax.swing.text.ParagraphView.i18nStrategy = loader.loadClass (classname);
} else {
jsjavax.swing.text.ParagraphView.i18nStrategy = Class.forName (classname);
}}var o = jsjavax.swing.text.ParagraphView.i18nStrategy.newInstance ();
if (Clazz.instanceOf (o, jsjavax.swing.text.FlowView.FlowStrategy)) {
this.strategy = o;
}} catch (e) {
throw  new jsjavax.swing.text.StateInvariantError ("ParagraphView: Can't create i18n strategy: " + e.getMessage ());
}
}}, "jsjavax.swing.text.Element");
Clazz.defineMethod (c$, "setJustification", 
function (j) {
this.justification = j;
}, "~N");
Clazz.defineMethod (c$, "setLineSpacing", 
function (ls) {
this.lineSpacing = ls;
}, "~N");
Clazz.defineMethod (c$, "setFirstLineIndent", 
function (fi) {
this.firstLineIndent = Clazz.floatToInt (fi);
}, "~N");
Clazz.defineMethod (c$, "setPropertiesFromAttributes", 
function () {
var attr = this.getAttributes ();
if (attr != null) {
this.setParagraphInsets (attr);
var a = attr.getAttribute (jsjavax.swing.text.StyleConstants.Alignment);
var alignment;
if (a == null) {
var doc = this.getElement ().getDocument ();
var o = doc.getProperty (jsjava.awt.font.TextAttribute.RUN_DIRECTION);
if ((o != null) && o.equals (jsjava.awt.font.TextAttribute.RUN_DIRECTION_RTL)) {
alignment = 2;
} else {
alignment = 0;
}} else {
alignment = a.intValue ();
}this.setJustification (alignment);
this.setLineSpacing (jsjavax.swing.text.StyleConstants.getLineSpacing (attr));
this.setFirstLineIndent (jsjavax.swing.text.StyleConstants.getFirstLineIndent (attr));
}});
Clazz.defineMethod (c$, "getLayoutViewCount", 
function () {
return this.layoutPool.getViewCount ();
});
Clazz.defineMethod (c$, "getLayoutView", 
function (index) {
return this.layoutPool.getView (index);
}, "~N");
Clazz.defineMethod (c$, "adjustRow", 
function (r, desiredSpan, x) {
}, "jsjavax.swing.text.ParagraphView.Row,~N,~N");
Clazz.overrideMethod (c$, "getNextNorthSouthVisualPositionFrom", 
function (pos, b, a, direction, biasRet) {
var vIndex;
if (pos == -1) {
vIndex = (direction == 1) ? this.getViewCount () - 1 : 0;
} else {
if (b === jsjavax.swing.text.Position.Bias.Backward && pos > 0) {
vIndex = this.getViewIndexAtPosition (pos - 1);
} else {
vIndex = this.getViewIndexAtPosition (pos);
}if (direction == 1) {
if (vIndex == 0) {
return -1;
}vIndex--;
} else if (++vIndex >= this.getViewCount ()) {
return -1;
}}var text = this.getContainer ();
var c = text.getCaret ();
var magicPoint;
magicPoint = (c != null) ? c.getMagicCaretPosition () : null;
var x;
if (magicPoint == null) {
var posBounds;
try {
posBounds = text.getUI ().modelToView (text, pos, b);
} catch (exc) {
if (Clazz.exceptionOf (exc, jsjavax.swing.text.BadLocationException)) {
posBounds = null;
} else {
throw exc;
}
}
if (posBounds == null) {
x = 0;
} else {
x = posBounds.getBounds ().x;
}} else {
x = magicPoint.x;
}return this.getClosestPositionTo (pos, b, a, direction, biasRet, vIndex, x);
}, "~N,jsjavax.swing.text.Position.Bias,jsjava.awt.Shape,~N,~A");
Clazz.defineMethod (c$, "getClosestPositionTo", 
function (pos, b, a, direction, biasRet, rowIndex, x) {
var text = this.getContainer ();
var doc = this.getDocument ();
var aDoc = (Clazz.instanceOf (doc, jsjavax.swing.text.AbstractDocument)) ? doc : null;
var row = this.getView (rowIndex);
var lastPos = -1;
biasRet[0] = jsjavax.swing.text.Position.Bias.Forward;
for (var vc = 0, numViews = row.getViewCount (); vc < numViews; vc++) {
var v = row.getView (vc);
var start = v.getStartOffset ();
var ltr = (aDoc != null) ? aDoc.isLeftToRight (start, start + 1) : true;
if (ltr) {
lastPos = start;
for (var end = v.getEndOffset (); lastPos < end; lastPos++) {
var xx = text.modelToView (lastPos).getBounds ().x;
if (xx >= x) {
while (++lastPos < end && text.modelToView (lastPos).getBounds ().x == xx) {
}
return --lastPos;
}}
lastPos--;
} else {
for (lastPos = v.getEndOffset () - 1; lastPos >= start; lastPos--) {
var xx = text.modelToView (lastPos).getBounds ().x;
if (xx >= x) {
while (--lastPos >= start && text.modelToView (lastPos).getBounds ().x == xx) {
}
return ++lastPos;
}}
lastPos++;
}}
if (lastPos == -1) {
return this.getStartOffset ();
}return lastPos;
}, "~N,jsjavax.swing.text.Position.Bias,jsjava.awt.Shape,~N,~A,~N,~N");
Clazz.overrideMethod (c$, "flipEastAndWestAtEnds", 
function (position, bias) {
var doc = this.getDocument ();
if (Clazz.instanceOf (doc, jsjavax.swing.text.AbstractDocument) && !(doc).isLeftToRight (this.getStartOffset (), this.getStartOffset () + 1)) {
return true;
}return false;
}, "~N,jsjavax.swing.text.Position.Bias");
Clazz.overrideMethod (c$, "getFlowSpan", 
function (index) {
var child = this.getView (index);
var adjust = 0;
if (Clazz.instanceOf (child, jsjavax.swing.text.ParagraphView.Row)) {
var row = child;
adjust = row.getLeftInset () + row.getRightInset ();
}return (this.layoutSpan == 2147483647) ? this.layoutSpan : (this.layoutSpan - adjust);
}, "~N");
Clazz.overrideMethod (c$, "getFlowStart", 
function (index) {
var child = this.getView (index);
var adjust = 0;
if (Clazz.instanceOf (child, jsjavax.swing.text.ParagraphView.Row)) {
var row = child;
adjust = row.getLeftInset ();
}return this.tabBase + adjust;
}, "~N");
Clazz.overrideMethod (c$, "createRow", 
function () {
return Clazz.innerTypeInstance (jsjavax.swing.text.ParagraphView.Row, this, null, this.getElement ());
});
Clazz.overrideMethod (c$, "nextTabStop", 
function (x, tabOffset) {
if (this.justification != 0) return x + 10.0;
x -= this.tabBase;
var tabs = this.getTabSet ();
if (tabs == null) {
return (this.tabBase + ((Clazz.doubleToInt (Clazz.floatToInt (x) / 72) + 1) * 72));
}var tab = tabs.getTabAfter (x + .01);
if (tab == null) {
return this.tabBase + x + 5.0;
}var alignment = tab.getAlignment ();
var offset;
switch (alignment) {
default:
case 0:
return this.tabBase + tab.getPosition ();
case 5:
return this.tabBase + tab.getPosition ();
case 1:
case 2:
offset = this.findOffsetToCharactersInString (jsjavax.swing.text.ParagraphView.tabChars, tabOffset + 1);
break;
case 4:
offset = this.findOffsetToCharactersInString (jsjavax.swing.text.ParagraphView.tabDecimalChars, tabOffset + 1);
break;
}
if (offset == -1) {
offset = this.getEndOffset ();
}var charsSize = this.getPartialSize (tabOffset + 1, offset);
switch (alignment) {
case 1:
case 4:
return this.tabBase + Math.max (x, tab.getPosition () - charsSize);
case 2:
return this.tabBase + Math.max (x, tab.getPosition () - charsSize / 2.0);
}
return x;
}, "~N,~N");
Clazz.defineMethod (c$, "getTabSet", 
function () {
return jsjavax.swing.text.StyleConstants.getTabSet (this.getElement ().getAttributes ());
});
Clazz.defineMethod (c$, "getPartialSize", 
function (startOffset, endOffset) {
var size = 0.0;
var viewIndex;
var numViews = this.getViewCount ();
var view;
var viewEnd;
var tempEnd;
viewIndex = this.getElement ().getElementIndex (startOffset);
numViews = this.layoutPool.getViewCount ();
while (startOffset < endOffset && viewIndex < numViews) {
view = this.layoutPool.getView (viewIndex++);
viewEnd = view.getEndOffset ();
tempEnd = Math.min (endOffset, viewEnd);
if (Clazz.instanceOf (view, jsjavax.swing.text.TabableView)) size += (view).getPartialSpan (startOffset, tempEnd);
 else if (startOffset == view.getStartOffset () && tempEnd == view.getEndOffset ()) size += view.getPreferredSpan (0);
 else return 0.0;
startOffset = viewEnd;
}
return size;
}, "~N,~N");
Clazz.defineMethod (c$, "findOffsetToCharactersInString", 
function (string, start) {
var stringLength = string.length;
var end = this.getEndOffset ();
var seg =  new jsjavax.swing.text.Segment ();
try {
this.getDocument ().getText (start, end - start, seg);
} catch (ble) {
if (Clazz.exceptionOf (ble, jsjavax.swing.text.BadLocationException)) {
return -1;
} else {
throw ble;
}
}
for (var counter = seg.offset, maxCounter = seg.offset + seg.count; counter < maxCounter; counter++) {
var currentChar = seg.array[counter];
for (var subCounter = 0; subCounter < stringLength; subCounter++) {
if (currentChar == string[subCounter]) return counter - seg.offset + start;
}
}
return -1;
}, "~A,~N");
Clazz.defineMethod (c$, "getTabBase", 
function () {
return this.tabBase;
});
Clazz.defineMethod (c$, "paint", 
function (g, a) {
var alloc = (Clazz.instanceOf (a, jsjava.awt.Rectangle)) ? a : a.getBounds ();
this.tabBase = alloc.x + this.getLeftInset ();
Clazz.superCall (this, jsjavax.swing.text.ParagraphView, "paint", [g, a]);
if (this.firstLineIndent < 0) {
var sh = this.getChildAllocation (0, a);
if ((sh != null) && sh.intersects (alloc)) {
var x = alloc.x + this.getLeftInset () + this.firstLineIndent;
var y = alloc.y + this.getTopInset ();
var clip = g.getClipBounds ();
this.tempRect.x = x + this.getOffset (0, 0);
this.tempRect.y = y + this.getOffset (1, 0);
this.tempRect.width = this.getSpan (0, 0) - this.firstLineIndent;
this.tempRect.height = this.getSpan (1, 0);
if (this.tempRect.intersects (clip)) {
this.tempRect.x = this.tempRect.x - this.firstLineIndent;
this.paintChild (g, this.tempRect, 0);
}}}}, "jsjava.awt.Graphics,jsjava.awt.Shape");
Clazz.defineMethod (c$, "getAlignment", 
function (axis) {
switch (axis) {
case 1:
var a = 0.5;
if (this.getViewCount () != 0) {
var paragraphSpan = Clazz.floatToInt (this.getPreferredSpan (1));
var v = this.getView (0);
var rowSpan = Clazz.floatToInt (v.getPreferredSpan (1));
a = (paragraphSpan != 0) ? ((Clazz.doubleToInt (rowSpan / 2))) / paragraphSpan : 0;
}return a;
case 0:
return 0.5;
default:
throw  new IllegalArgumentException ("Invalid axis: " + axis);
}
}, "~N");
Clazz.defineMethod (c$, "breakView", 
function (axis, len, a) {
if (axis == 1) {
if (a != null) {
var alloc = a.getBounds ();
this.setSize (alloc.width, alloc.height);
}return this;
}return this;
}, "~N,~N,jsjava.awt.Shape");
Clazz.defineMethod (c$, "getBreakWeight", 
function (axis, len) {
if (axis == 1) {
return 0;
}return 0;
}, "~N,~N");
Clazz.defineMethod (c$, "changedUpdate", 
function (changes, a, f) {
this.setPropertiesFromAttributes ();
this.layoutChanged (0);
this.layoutChanged (1);
Clazz.superCall (this, jsjavax.swing.text.ParagraphView, "changedUpdate", [changes, a, f]);
}, "jsjavax.swing.event.DocumentEvent,jsjava.awt.Shape,jsjavax.swing.text.ViewFactory");
c$.$ParagraphView$Row$ = function () {
Clazz.pu$h ();
c$ = Clazz.decorateAsClass (function () {
Clazz.prepareCallback (this, arguments);
this.justificationData = null;
Clazz.instantialize (this, arguments);
}, jsjavax.swing.text.ParagraphView, "Row", jsjavax.swing.text.BoxView);
Clazz.makeConstructor (c$, 
function (a) {
Clazz.superConstructor (this, jsjavax.swing.text.ParagraphView.Row, [a, 0]);
}, "jsjavax.swing.text.Element");
Clazz.overrideMethod (c$, "loadChildren", 
function (a) {
}, "jsjavax.swing.text.ViewFactory");
Clazz.defineMethod (c$, "getAttributes", 
function () {
var a = this.getParent ();
return (a != null) ? a.getAttributes () : null;
});
Clazz.defineMethod (c$, "getAlignment", 
function (a) {
if (a == 0) {
switch (this.b$["jsjavax.swing.text.ParagraphView"].justification) {
case 0:
return 0;
case 2:
return 1;
case 1:
return 0.5;
case 3:
var b = 0.5;
if (this.isJustifiableDocument ()) {
b = 0;
}return b;
}
}return Clazz.superCall (this, jsjavax.swing.text.ParagraphView.Row, "getAlignment", [a]);
}, "~N");
Clazz.defineMethod (c$, "modelToView", 
function (a, b, c) {
var d = b.getBounds ();
var e = this.getViewAtPosition (a, d);
if ((e != null) && (!e.getElement ().isLeaf ())) {
return Clazz.superCall (this, jsjavax.swing.text.ParagraphView.Row, "modelToView", [a, b, c]);
}d = b.getBounds ();
var f = d.height;
var g = d.y;
var h = Clazz.superCall (this, jsjavax.swing.text.ParagraphView.Row, "modelToView", [a, b, c]);
d = h.getBounds ();
d.height = f;
d.y = g;
return d;
}, "~N,jsjava.awt.Shape,jsjavax.swing.text.Position.Bias");
Clazz.defineMethod (c$, "getStartOffset", 
function () {
var a = 2147483647;
var b = this.getViewCount ();
for (var c = 0; c < b; c++) {
var d = this.getView (c);
a = Math.min (a, d.getStartOffset ());
}
return a;
});
Clazz.defineMethod (c$, "getEndOffset", 
function () {
var a = 0;
var b = this.getViewCount ();
for (var c = 0; c < b; c++) {
var d = this.getView (c);
a = Math.max (a, d.getEndOffset ());
}
return a;
});
Clazz.overrideMethod (c$, "layoutMinorAxis", 
function (a, b, c, d) {
this.baselineLayout (a, b, c, d);
}, "~N,~N,~A,~A");
Clazz.overrideMethod (c$, "calculateMinorAxisRequirements", 
function (a, b) {
return this.baselineRequirements (a, b);
}, "~N,jsjavax.swing.SizeRequirements");
Clazz.defineMethod (c$, "isLastRow", 
($fz = function () {
var a;
return ((a = this.getParent ()) == null || this === a.getView (a.getViewCount () - 1));
}, $fz.isPrivate = true, $fz));
Clazz.defineMethod (c$, "isBrokenRow", 
($fz = function () {
var a = false;
var b = this.getViewCount ();
if (b > 0) {
var c = this.getView (b - 1);
if (c.getBreakWeight (0, 0, 0) >= 3000) {
a = true;
}}return a;
}, $fz.isPrivate = true, $fz));
Clazz.defineMethod (c$, "isJustifiableDocument", 
($fz = function () {
return (!Boolean.TRUE.equals (this.getDocument ().getProperty ("i18n")));
}, $fz.isPrivate = true, $fz));
Clazz.defineMethod (c$, "isJustifyEnabled", 
($fz = function () {
var a = (this.b$["jsjavax.swing.text.ParagraphView"].justification == 3);
a = a && this.isJustifiableDocument ();
a = a && !this.isLastRow ();
a = a && !this.isBrokenRow ();
return a;
}, $fz.isPrivate = true, $fz));
Clazz.defineMethod (c$, "calculateMajorAxisRequirements", 
function (a, b) {
var c = this.justificationData;
this.justificationData = null;
var d = Clazz.superCall (this, jsjavax.swing.text.ParagraphView.Row, "calculateMajorAxisRequirements", [a, b]);
if (this.isJustifyEnabled ()) {
this.justificationData = c;
}return d;
}, "~N,jsjavax.swing.SizeRequirements");
Clazz.defineMethod (c$, "layoutMajorAxis", 
function (a, b, c, d) {
var e = this.justificationData;
this.justificationData = null;
Clazz.superCall (this, jsjavax.swing.text.ParagraphView.Row, "layoutMajorAxis", [a, b, c, d]);
if (!this.isJustifyEnabled ()) {
return;
}var f = 0;
for (var span, $span = 0, $$span = d; $span < $$span.length && ((span = $$span[$span]) || true); $span++) {
f += span;
}
if (f == a) {
return;
}var g = 0;
var h = -1;
var i = -1;
var j = 0;
var k = this.getStartOffset ();
var l = this.getEndOffset ();
var m =  Clazz.newIntArray (l - k, 0);
java.util.Arrays.fill (m, 0);
for (var n = this.getViewCount () - 1; n >= 0; n--) {
var o = this.getView (n);
if (Clazz.instanceOf (o, jsjavax.swing.text.GlyphView)) {
var p = (o).getJustificationInfo (k);
var q = o.getStartOffset ();
var r = q - k;
for (var s = 0; s < p.spaceMap.length (); s++) {
if (p.spaceMap.get (s)) {
m[s + r] = 1;
}}
if (h > 0) {
if (p.end >= 0) {
g += p.trailingSpaces;
} else {
j += p.trailingSpaces;
}}if (p.start >= 0) {
h = p.start + q;
g += j;
}if (p.end >= 0 && i < 0) {
i = p.end + q;
}g += p.contentSpaces;
j = p.leadingSpaces;
if (p.hasTab) {
break;
}}}
if (g <= 0) {
return;
}var o = (a - f);
var p = (g > 0) ? Clazz.doubleToInt (o / g) : 0;
var q = -1;
for (var r = h - k, s = o - p * g; s > 0; s -= m[r], r++) {
q = r;
}
if (p > 0 || q >= 0) {
this.justificationData = (e != null) ? e :  Clazz.newIntArray (4, 0);
this.justificationData[0] = p;
this.justificationData[1] = q;
this.justificationData[2] = h - k;
this.justificationData[3] = i - k;
Clazz.superCall (this, jsjavax.swing.text.ParagraphView.Row, "layoutMajorAxis", [a, b, c, d]);
}}, "~N,~N,~A,~A");
Clazz.defineMethod (c$, "getMaximumSpan", 
function (a) {
var b;
if (0 == a && this.isJustifyEnabled ()) {
b = 3.4028235E38;
} else {
b = Clazz.superCall (this, jsjavax.swing.text.ParagraphView.Row, "getMaximumSpan", [a]);
}return b;
}, "~N");
Clazz.overrideMethod (c$, "getViewIndexAtPosition", 
function (a) {
if (a < this.getStartOffset () || a >= this.getEndOffset ()) return -1;
for (var b = this.getViewCount () - 1; b >= 0; b--) {
var c = this.getView (b);
if (a >= c.getStartOffset () && a < c.getEndOffset ()) {
return b;
}}
return -1;
}, "~N");
Clazz.defineMethod (c$, "getLeftInset", 
function () {
var a;
var b = 0;
if ((a = this.getParent ()) != null) {
if (this === a.getView (0)) {
b = this.b$["jsjavax.swing.text.ParagraphView"].firstLineIndent;
}}return (Clazz.superCall (this, jsjavax.swing.text.ParagraphView.Row, "getLeftInset", []) + b);
});
Clazz.defineMethod (c$, "getBottomInset", 
function () {
return Clazz.floatToShort (Clazz.superCall (this, jsjavax.swing.text.ParagraphView.Row, "getBottomInset", []) + ((this.minorRequest != null) ? this.minorRequest.preferred : 0) * this.b$["jsjavax.swing.text.ParagraphView"].lineSpacing);
});
Clazz.defineStatics (c$,
"SPACE_ADDON", 0,
"SPACE_ADDON_LEFTOVER_END", 1,
"START_JUSTIFIABLE", 2,
"END_JUSTIFIABLE", 3);
c$ = Clazz.p0p ();
};
Clazz.defineStatics (c$,
"i18nStrategy", null,
"tabChars", null,
"tabDecimalChars", null);
{
jsjavax.swing.text.ParagraphView.tabChars =  Clazz.newCharArray (1, '\0');
jsjavax.swing.text.ParagraphView.tabChars[0] = '\t';
jsjavax.swing.text.ParagraphView.tabDecimalChars =  Clazz.newCharArray (2, '\0');
jsjavax.swing.text.ParagraphView.tabDecimalChars[0] = '\t';
jsjavax.swing.text.ParagraphView.tabDecimalChars[1] = '.';
}});

Clazz.declarePackage ("javax.swing.text");
Clazz.load (null, "javax.swing.text.Utilities", ["javax.swing.JComponent", "javax.swing.text.CompositeView", "$.Position", "$.StyleConstants", "$.StyledDocument"], function () {
c$ = Clazz.declareType (javax.swing.text, "Utilities");
c$.getJComponent = Clazz.defineMethod (c$, "getJComponent", 
function (view) {
if (view != null) {
var component = view.getContainer ();
if (Clazz.instanceOf (component, javax.swing.JComponent)) {
return component;
}}return null;
}, "javax.swing.text.View");
c$.getTabbedTextWidth = Clazz.defineMethod (c$, "getTabbedTextWidth", 
function (s, metrics, x, e, startOffset) {
return javax.swing.text.Utilities.getTabbedTextWidth (null, s, metrics, x, e, startOffset, null);
}, "javax.swing.text.Segment,java.awt.FontMetrics,~N,javax.swing.text.TabExpander,~N");
c$.getTabbedTextWidth = Clazz.defineMethod (c$, "getTabbedTextWidth", 
function (view, s, metrics, x, e, startOffset, justificationData) {
var nextX = x;
var txt = s.array;
var txtOffset = s.offset;
var n = s.offset + s.count;
var charCount = 0;
var spaceAddon = 0;
var spaceAddonLeftoverEnd = -1;
var startJustifiableContent = 0;
var endJustifiableContent = 0;
if (justificationData != null) {
var offset = -startOffset + txtOffset;
var parent = null;
if (view != null && (parent = view.getParent ()) != null) {
offset += parent.getStartOffset ();
}spaceAddon = justificationData[0];
spaceAddonLeftoverEnd = justificationData[1] + offset;
startJustifiableContent = justificationData[2] + offset;
endJustifiableContent = justificationData[3] + offset;
}for (var i = txtOffset; i < n; i++) {
if (txt[i] == '\t' || ((spaceAddon != 0 || i <= spaceAddonLeftoverEnd) && (txt[i] == ' ') && startJustifiableContent <= i && i <= endJustifiableContent)) {
nextX += metrics.charsWidth (txt, i - charCount, charCount);
charCount = 0;
if (txt[i] == '\t') {
if (e != null) {
nextX = Clazz.floatToInt (e.nextTabStop (nextX, startOffset + i - txtOffset));
} else {
nextX += metrics.charWidth (' ');
}} else if (txt[i] == ' ') {
nextX += metrics.charWidth (' ') + spaceAddon;
if (i <= spaceAddonLeftoverEnd) {
nextX++;
}}} else if (txt[i] == '\n') {
nextX += metrics.charsWidth (txt, i - charCount, charCount);
charCount = 0;
} else {
charCount++;
}}
nextX += metrics.charsWidth (txt, n - charCount, charCount);
return nextX - x;
}, "javax.swing.text.View,javax.swing.text.Segment,java.awt.FontMetrics,~N,javax.swing.text.TabExpander,~N,~A");
c$.getTabbedTextOffset = Clazz.defineMethod (c$, "getTabbedTextOffset", 
function (s, metrics, x0, x, e, startOffset) {
return javax.swing.text.Utilities.getTabbedTextOffset (s, metrics, x0, x, e, startOffset, true);
}, "javax.swing.text.Segment,java.awt.FontMetrics,~N,~N,javax.swing.text.TabExpander,~N");
c$.getTabbedTextOffset = Clazz.defineMethod (c$, "getTabbedTextOffset", 
function (view, s, metrics, x0, x, e, startOffset, justificationData) {
return javax.swing.text.Utilities.getTabbedTextOffset (view, s, metrics, x0, x, e, startOffset, true, justificationData);
}, "javax.swing.text.View,javax.swing.text.Segment,java.awt.FontMetrics,~N,~N,javax.swing.text.TabExpander,~N,~A");
c$.getTabbedTextOffset = Clazz.defineMethod (c$, "getTabbedTextOffset", 
function (s, metrics, x0, x, e, startOffset, round) {
return javax.swing.text.Utilities.getTabbedTextOffset (null, s, metrics, x0, x, e, startOffset, round, null);
}, "javax.swing.text.Segment,java.awt.FontMetrics,~N,~N,javax.swing.text.TabExpander,~N,~B");
c$.getTabbedTextOffset = Clazz.defineMethod (c$, "getTabbedTextOffset", 
function (view, s, metrics, x0, x, e, startOffset, round, justificationData) {
if (x0 >= x) {
return 0;
}var currX = x0;
var nextX = currX;
var txt = s.array;
var txtOffset = s.offset;
var txtCount = s.count;
var spaceAddon = 0;
var spaceAddonLeftoverEnd = -1;
var startJustifiableContent = 0;
var endJustifiableContent = 0;
if (justificationData != null) {
var offset = -startOffset + txtOffset;
var parent = null;
if (view != null && (parent = view.getParent ()) != null) {
offset += parent.getStartOffset ();
}spaceAddon = justificationData[0];
spaceAddonLeftoverEnd = justificationData[1] + offset;
startJustifiableContent = justificationData[2] + offset;
endJustifiableContent = justificationData[3] + offset;
}var n = s.offset + s.count;
for (var i = s.offset; i < n; i++) {
if (txt[i] == '\t' || ((spaceAddon != 0 || i <= spaceAddonLeftoverEnd) && (txt[i] == ' ') && startJustifiableContent <= i && i <= endJustifiableContent)) {
if (txt[i] == '\t') {
if (e != null) {
nextX = Clazz.floatToInt (e.nextTabStop (nextX, startOffset + i - txtOffset));
} else {
nextX += metrics.charWidth (' ');
}} else if (txt[i] == ' ') {
nextX += metrics.charWidth (' ') + spaceAddon;
if (i <= spaceAddonLeftoverEnd) {
nextX++;
}}} else {
nextX += metrics.charWidth (txt[i]);
}if ((x >= currX) && (x < nextX)) {
if ((round == false) || ((x - currX) < (nextX - x))) {
return i - txtOffset;
} else {
return i + 1 - txtOffset;
}}currX = nextX;
}
return txtCount;
}, "javax.swing.text.View,javax.swing.text.Segment,java.awt.FontMetrics,~N,~N,javax.swing.text.TabExpander,~N,~B,~A");
c$.getBreakLocation = Clazz.defineMethod (c$, "getBreakLocation", 
function (s, metrics, x0, x, e, startOffset) {
return 0;
}, "javax.swing.text.Segment,java.awt.FontMetrics,~N,~N,javax.swing.text.TabExpander,~N");
c$.getRowStart = Clazz.defineMethod (c$, "getRowStart", 
function (c, offs) {
var r = c.modelToView (offs);
if (r == null) {
return -1;
}var lastOffs = offs;
var y = r.y;
while ((r != null) && (y == r.y)) {
if (r.height != 0) {
offs = lastOffs;
}lastOffs -= 1;
r = (lastOffs >= 0) ? c.modelToView (lastOffs) : null;
}
return offs;
}, "javax.swing.text.JTextComponent,~N");
c$.getRowEnd = Clazz.defineMethod (c$, "getRowEnd", 
function (c, offs) {
var r = c.modelToView (offs);
if (r == null) {
return -1;
}var n = c.getDocument ().getLength ();
var lastOffs = offs;
var y = r.y;
while ((r != null) && (y == r.y)) {
if (r.height != 0) {
offs = lastOffs;
}lastOffs += 1;
r = (lastOffs <= n) ? c.modelToView (lastOffs) : null;
}
return offs;
}, "javax.swing.text.JTextComponent,~N");
c$.getPositionAbove = Clazz.defineMethod (c$, "getPositionAbove", 
function (c, offs, x) {
var lastOffs = javax.swing.text.Utilities.getRowStart (c, offs) - 1;
if (lastOffs < 0) {
return -1;
}var bestSpan = 2147483647;
var y = 0;
var r = null;
if (lastOffs >= 0) {
r = c.modelToView (lastOffs);
y = r.y;
}while ((r != null) && (y == r.y)) {
var span = Math.abs (r.x - x);
if (span < bestSpan) {
offs = lastOffs;
bestSpan = span;
}lastOffs -= 1;
r = (lastOffs >= 0) ? c.modelToView (lastOffs) : null;
}
return offs;
}, "javax.swing.text.JTextComponent,~N,~N");
c$.getPositionBelow = Clazz.defineMethod (c$, "getPositionBelow", 
function (c, offs, x) {
var lastOffs = javax.swing.text.Utilities.getRowEnd (c, offs) + 1;
if (lastOffs <= 0) {
return -1;
}var bestSpan = 2147483647;
var n = c.getDocument ().getLength ();
var y = 0;
var r = null;
if (lastOffs <= n) {
r = c.modelToView (lastOffs);
y = r.y;
}while ((r != null) && (y == r.y)) {
var span = Math.abs (x - r.x);
if (span < bestSpan) {
offs = lastOffs;
bestSpan = span;
}lastOffs += 1;
r = (lastOffs <= n) ? c.modelToView (lastOffs) : null;
}
return offs;
}, "javax.swing.text.JTextComponent,~N,~N");
c$.getWordStart = Clazz.defineMethod (c$, "getWordStart", 
function (c, offs) {
return 0;
}, "javax.swing.text.JTextComponent,~N");
c$.getWordEnd = Clazz.defineMethod (c$, "getWordEnd", 
function (c, offs) {
return 0;
}, "javax.swing.text.JTextComponent,~N");
c$.getNextWord = Clazz.defineMethod (c$, "getNextWord", 
function (c, offs) {
var nextWord;
var line = javax.swing.text.Utilities.getParagraphElement (c, offs);
for (nextWord = javax.swing.text.Utilities.getNextWordInParagraph (c, line, offs, false); nextWord == -1; nextWord = javax.swing.text.Utilities.getNextWordInParagraph (c, line, offs, true)) {
offs = line.getEndOffset ();
line = javax.swing.text.Utilities.getParagraphElement (c, offs);
}
return nextWord;
}, "javax.swing.text.JTextComponent,~N");
c$.getNextWordInParagraph = Clazz.defineMethod (c$, "getNextWordInParagraph", 
function (c, line, offs, first) {
return 0;
}, "javax.swing.text.JTextComponent,javax.swing.text.Element,~N,~B");
c$.getPreviousWord = Clazz.defineMethod (c$, "getPreviousWord", 
function (c, offs) {
var prevWord;
var line = javax.swing.text.Utilities.getParagraphElement (c, offs);
for (prevWord = javax.swing.text.Utilities.getPrevWordInParagraph (c, line, offs); prevWord == -1; prevWord = javax.swing.text.Utilities.getPrevWordInParagraph (c, line, offs)) {
offs = line.getStartOffset () - 1;
line = javax.swing.text.Utilities.getParagraphElement (c, offs);
}
return prevWord;
}, "javax.swing.text.JTextComponent,~N");
c$.getPrevWordInParagraph = Clazz.defineMethod (c$, "getPrevWordInParagraph", 
function (c, line, offs) {
return 0;
}, "javax.swing.text.JTextComponent,javax.swing.text.Element,~N");
c$.getParagraphElement = Clazz.defineMethod (c$, "getParagraphElement", 
function (c, offs) {
var doc = c.getDocument ();
if (Clazz.instanceOf (doc, javax.swing.text.StyledDocument)) {
return (doc).getParagraphElement (offs);
}var map = doc.getDefaultRootElement ();
var index = map.getElementIndex (offs);
var paragraph = map.getElement (index);
if ((offs >= paragraph.getStartOffset ()) && (offs < paragraph.getEndOffset ())) {
return paragraph;
}return null;
}, "javax.swing.text.JTextComponent,~N");
c$.isComposedTextElement = Clazz.defineMethod (c$, "isComposedTextElement", 
function (doc, offset) {
var elem = doc.getDefaultRootElement ();
while (!elem.isLeaf ()) {
elem = elem.getElement (elem.getElementIndex (offset));
}
return javax.swing.text.Utilities.isComposedTextElement (elem);
}, "javax.swing.text.Document,~N");
c$.isComposedTextElement = Clazz.defineMethod (c$, "isComposedTextElement", 
function (elem) {
var as = elem.getAttributes ();
return javax.swing.text.Utilities.isComposedTextAttributeDefined (as);
}, "javax.swing.text.Element");
c$.isComposedTextAttributeDefined = Clazz.defineMethod (c$, "isComposedTextAttributeDefined", 
function (as) {
return ((as != null) && (as.isDefined (javax.swing.text.StyleConstants.ComposedTextAttribute)));
}, "javax.swing.text.AttributeSet");
c$.isLeftToRight = Clazz.defineMethod (c$, "isLeftToRight", 
function (c) {
return c.getComponentOrientation ().isLeftToRight ();
}, "java.awt.Component");
c$.getNextVisualPositionFrom = Clazz.defineMethod (c$, "getNextVisualPositionFrom", 
function (v, pos, b, alloc, direction, biasRet) {
if (v.getViewCount () == 0) {
return pos;
}var top = (direction == 1 || direction == 7);
var retValue;
if (pos == -1) {
var childIndex = (top) ? v.getViewCount () - 1 : 0;
var child = v.getView (childIndex);
var childBounds = v.getChildAllocation (childIndex, alloc);
retValue = child.getNextVisualPositionFrom (pos, b, childBounds, direction, biasRet);
if (retValue == -1 && !top && v.getViewCount () > 1) {
child = v.getView (1);
childBounds = v.getChildAllocation (1, alloc);
retValue = child.getNextVisualPositionFrom (-1, biasRet[0], childBounds, direction, biasRet);
}} else {
var increment = (top) ? -1 : 1;
var childIndex;
if (b === javax.swing.text.Position.Bias.Backward && pos > 0) {
childIndex = v.getViewIndex (pos - 1, javax.swing.text.Position.Bias.Forward);
} else {
childIndex = v.getViewIndex (pos, javax.swing.text.Position.Bias.Forward);
}var child = v.getView (childIndex);
var childBounds = v.getChildAllocation (childIndex, alloc);
retValue = child.getNextVisualPositionFrom (pos, b, childBounds, direction, biasRet);
if ((direction == 3 || direction == 7) && (Clazz.instanceOf (v, javax.swing.text.CompositeView)) && (v).flipEastAndWestAtEnds (pos, b)) {
increment *= -1;
}childIndex += increment;
if (retValue == -1 && childIndex >= 0 && childIndex < v.getViewCount ()) {
child = v.getView (childIndex);
childBounds = v.getChildAllocation (childIndex, alloc);
retValue = child.getNextVisualPositionFrom (-1, b, childBounds, direction, biasRet);
if (retValue == pos && biasRet[0] !== b) {
return javax.swing.text.Utilities.getNextVisualPositionFrom (v, pos, biasRet[0], alloc, direction, biasRet);
}} else if (retValue != -1 && biasRet[0] !== b && ((increment == 1 && child.getEndOffset () == retValue) || (increment == -1 && child.getStartOffset () == retValue)) && childIndex >= 0 && childIndex < v.getViewCount ()) {
child = v.getView (childIndex);
childBounds = v.getChildAllocation (childIndex, alloc);
var originalBias = biasRet[0];
var nextPos = child.getNextVisualPositionFrom (-1, b, childBounds, direction, biasRet);
if (biasRet[0] === b) {
retValue = nextPos;
} else {
biasRet[0] = originalBias;
}}}return retValue;
}, "javax.swing.text.View,~N,javax.swing.text.Position.Bias,java.awt.Shape,~N,~A");
});

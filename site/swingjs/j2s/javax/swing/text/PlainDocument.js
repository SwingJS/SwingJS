Clazz.declarePackage ("javax.swing.text");
Clazz.load (["javax.swing.text.AbstractDocument", "java.util.Vector"], "javax.swing.text.PlainDocument", ["java.lang.Boolean", "$.Error", "$.StringBuffer", "javax.swing.text.Segment", "$.Utilities"], function () {
c$ = Clazz.decorateAsClass (function () {
this.defaultRoot = null;
this.added = null;
this.removed = null;
this.s = null;
Clazz.instantialize (this, arguments);
}, javax.swing.text, "PlainDocument", javax.swing.text.AbstractDocument);
Clazz.prepareFields (c$, function () {
this.added =  new java.util.Vector ();
this.removed =  new java.util.Vector ();
});
Clazz.makeConstructor (c$, 
function () {
this.construct (null);
});
Clazz.makeConstructor (c$, 
function (c) {
Clazz.superConstructor (this, javax.swing.text.PlainDocument, [c]);
this.putProperty ("tabSize",  new Integer (8));
this.defaultRoot = this.createDefaultRoot ();
}, "javax.swing.text.AbstractDocument.Content");
Clazz.defineMethod (c$, "insertString", 
function (offs, str, a) {
var filterNewlines = this.getProperty ("filterNewlines");
if ((Clazz.instanceOf (filterNewlines, Boolean)) && filterNewlines.equals (Boolean.TRUE)) {
if ((str != null) && (str.indexOf ('\n') >= 0)) {
var filtered =  new StringBuffer (str);
var n = filtered.length ();
for (var i = 0; i < n; i++) {
if (filtered.charAt (i) == '\n') {
filtered.setCharAt (i, ' ');
}}
str = filtered.toString ();
}}Clazz.superCall (this, javax.swing.text.PlainDocument, "insertString", [offs, str, a]);
}, "~N,~S,javax.swing.text.AttributeSet");
Clazz.overrideMethod (c$, "getDefaultRootElement", 
function () {
return this.defaultRoot;
});
Clazz.defineMethod (c$, "createDefaultRoot", 
function () {
var map = this.createBranchElement (null, null);
var line = this.createLeafElement (map, null, 0, 1);
var lines =  new Array (1);
lines[0] = line;
map.replace (0, 0, lines);
return map;
});
Clazz.overrideMethod (c$, "getParagraphElement", 
function (pos) {
var lineMap = this.getDefaultRootElement ();
return lineMap.getElement (lineMap.getElementIndex (pos));
}, "~N");
Clazz.defineMethod (c$, "insertUpdate", 
function (chng, attr) {
this.removed.removeAllElements ();
this.added.removeAllElements ();
var lineMap = this.getDefaultRootElement ();
var offset = chng.getOffset ();
var length = chng.getLength ();
if (offset > 0) {
offset -= 1;
length += 1;
}var index = lineMap.getElementIndex (offset);
var rmCandidate = lineMap.getElement (index);
var rmOffs0 = rmCandidate.getStartOffset ();
var rmOffs1 = rmCandidate.getEndOffset ();
var lastOffset = rmOffs0;
try {
if (this.s == null) {
this.s =  new javax.swing.text.Segment ();
}this.getContent ().getChars (offset, length, this.s);
var hasBreaks = false;
for (var i = 0; i < length; i++) {
var c = this.s.array[this.s.offset + i];
if (c == '\n') {
var breakOffset = offset + i + 1;
this.added.addElement (this.createLeafElement (lineMap, null, lastOffset, breakOffset));
lastOffset = breakOffset;
hasBreaks = true;
}}
if (hasBreaks) {
var rmCount = 1;
this.removed.addElement (rmCandidate);
if ((offset + length == rmOffs1) && (lastOffset != rmOffs1) && ((index + 1) < lineMap.getElementCount ())) {
rmCount += 1;
var e = lineMap.getElement (index + 1);
this.removed.addElement (e);
rmOffs1 = e.getEndOffset ();
}if (lastOffset < rmOffs1) {
this.added.addElement (this.createLeafElement (lineMap, null, lastOffset, rmOffs1));
}var aelems =  new Array (this.added.size ());
this.added.copyInto (aelems);
var relems =  new Array (this.removed.size ());
this.removed.copyInto (relems);
var ee =  new javax.swing.text.AbstractDocument.ElementEdit (lineMap, index, relems, aelems);
chng.addEdit (ee);
lineMap.replace (index, relems.length, aelems);
}if (javax.swing.text.Utilities.isComposedTextAttributeDefined (attr)) {
this.insertComposedTextUpdate (chng, attr);
}} catch (e) {
if (Clazz.exceptionOf (e, javax.swing.text.BadLocationException)) {
throw  new Error ("Internal error: " + e.toString ());
} else {
throw e;
}
}
Clazz.superCall (this, javax.swing.text.PlainDocument, "insertUpdate", [chng, attr]);
}, "javax.swing.text.AbstractDocument.DefaultDocumentEvent,javax.swing.text.AttributeSet");
Clazz.defineMethod (c$, "removeUpdate", 
function (chng) {
this.removed.removeAllElements ();
var map = this.getDefaultRootElement ();
var offset = chng.getOffset ();
var length = chng.getLength ();
var line0 = map.getElementIndex (offset);
var line1 = map.getElementIndex (offset + length);
if (line0 != line1) {
for (var i = line0; i <= line1; i++) {
this.removed.addElement (map.getElement (i));
}
var p0 = map.getElement (line0).getStartOffset ();
var p1 = map.getElement (line1).getEndOffset ();
var aelems =  new Array (1);
aelems[0] = this.createLeafElement (map, null, p0, p1);
var relems =  new Array (this.removed.size ());
this.removed.copyInto (relems);
var ee =  new javax.swing.text.AbstractDocument.ElementEdit (map, line0, relems, aelems);
chng.addEdit (ee);
map.replace (line0, relems.length, aelems);
} else {
var line = map.getElement (line0);
if (!line.isLeaf ()) {
var leaf = line.getElement (line.getElementIndex (offset));
if (javax.swing.text.Utilities.isComposedTextElement (leaf)) {
var aelem =  new Array (1);
aelem[0] = this.createLeafElement (map, null, line.getStartOffset (), line.getEndOffset ());
var relem =  new Array (1);
relem[0] = line;
var ee =  new javax.swing.text.AbstractDocument.ElementEdit (map, line0, relem, aelem);
chng.addEdit (ee);
map.replace (line0, 1, aelem);
}}}Clazz.superCall (this, javax.swing.text.PlainDocument, "removeUpdate", [chng]);
}, "javax.swing.text.AbstractDocument.DefaultDocumentEvent");
Clazz.defineMethod (c$, "insertComposedTextUpdate", 
 function (chng, attr) {
this.added.removeAllElements ();
var lineMap = this.getDefaultRootElement ();
var offset = chng.getOffset ();
var length = chng.getLength ();
var index = lineMap.getElementIndex (offset);
var elem = lineMap.getElement (index);
var elemStart = elem.getStartOffset ();
var elemEnd = elem.getEndOffset ();
var abelem =  new Array (1);
abelem[0] = this.createBranchElement (lineMap, null);
var relem =  new Array (1);
relem[0] = elem;
if (elemStart != offset) this.added.addElement (this.createLeafElement (abelem[0], null, elemStart, offset));
this.added.addElement (this.createLeafElement (abelem[0], attr, offset, offset + length));
if (elemEnd != offset + length) this.added.addElement (this.createLeafElement (abelem[0], null, offset + length, elemEnd));
var alelem =  new Array (this.added.size ());
this.added.copyInto (alelem);
var ee =  new javax.swing.text.AbstractDocument.ElementEdit (lineMap, index, relem, abelem);
chng.addEdit (ee);
abelem[0].replace (0, 0, alelem);
lineMap.replace (index, 1, abelem);
}, "javax.swing.text.AbstractDocument.DefaultDocumentEvent,javax.swing.text.AttributeSet");
Clazz.overrideMethod (c$, "render", 
function (r) {
}, "Runnable");
Clazz.defineStatics (c$,
"tabSizeAttribute", "tabSize",
"lineLimitAttribute", "lineLimit");
});

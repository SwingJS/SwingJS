Clazz.declarePackage ("javax.swing.text");
Clazz.load (["javax.swing.text.AbstractDocument", "$.GapVector", "$.Position", "javax.swing.undo.AbstractUndoableEdit"], "javax.swing.text.GapContent", ["java.util.Vector", "javax.swing.text.BadLocationException", "$.Segment", "javax.swing.undo.CannotRedoException", "$.CannotUndoException"], function () {
c$ = Clazz.decorateAsClass (function () {
if (!Clazz.isClassDefined ("javax.swing.text.GapContent.MarkData")) {
javax.swing.text.GapContent.$GapContent$MarkData$ ();
}
if (!Clazz.isClassDefined ("javax.swing.text.GapContent.StickyPosition")) {
javax.swing.text.GapContent.$GapContent$StickyPosition$ ();
}
this.marks = null;
this.search = null;
if (!Clazz.isClassDefined ("javax.swing.text.GapContent.UndoPosRef")) {
javax.swing.text.GapContent.$GapContent$UndoPosRef$ ();
}
if (!Clazz.isClassDefined ("javax.swing.text.GapContent.InsertUndo")) {
javax.swing.text.GapContent.$GapContent$InsertUndo$ ();
}
if (!Clazz.isClassDefined ("javax.swing.text.GapContent.RemoveUndo")) {
javax.swing.text.GapContent.$GapContent$RemoveUndo$ ();
}
Clazz.instantialize (this, arguments);
}, javax.swing.text, "GapContent", javax.swing.text.GapVector, javax.swing.text.AbstractDocument.Content);
Clazz.makeConstructor (c$, 
function () {
this.construct (10);
});
Clazz.makeConstructor (c$, 
function (initialLength) {
Clazz.superConstructor (this, javax.swing.text.GapContent, [Math.max (initialLength, 2)]);
var implied =  Clazz.newCharArray (1, '\0');
implied[0] = '\n';
this.replace (0, 0, implied, implied.length);
this.marks =  new javax.swing.text.GapContent.MarkVector ();
this.search = Clazz.innerTypeInstance (javax.swing.text.GapContent.MarkData, this, null, 0);
}, "~N");
Clazz.overrideMethod (c$, "allocateArray", 
function (len) {
return  Clazz.newCharArray (len, '\0');
}, "~N");
Clazz.overrideMethod (c$, "getArrayLength", 
function () {
var carray = this.getArray ();
return carray.length;
});
Clazz.overrideMethod (c$, "length", 
function () {
var len = this.getArrayLength () - (this.getGapEnd () - this.getGapStart ());
return len;
});
Clazz.overrideMethod (c$, "insertString", 
function (where, str) {
if (where > this.length () || where < 0) {
throw  new javax.swing.text.BadLocationException ("Invalid insert", this.length ());
}var chars = str.toCharArray ();
this.replace (where, 0, chars, chars.length);
return Clazz.innerTypeInstance (javax.swing.text.GapContent.InsertUndo, this, null, where, str.length);
}, "~N,~S");
Clazz.overrideMethod (c$, "remove", 
function (where, nitems) {
if (where + nitems >= this.length ()) {
throw  new javax.swing.text.BadLocationException ("Invalid remove", this.length () + 1);
}var removedString = this.getString (where, nitems);
var edit = Clazz.innerTypeInstance (javax.swing.text.GapContent.RemoveUndo, this, null, where, removedString);
this.replace (where, nitems, javax.swing.text.GapContent.empty, 0);
return edit;
}, "~N,~N");
Clazz.overrideMethod (c$, "getString", 
function (where, len) {
var s =  new javax.swing.text.Segment ();
this.getChars (where, len, s);
return  String.instantialize (s.array, s.offset, s.count);
}, "~N,~N");
Clazz.overrideMethod (c$, "getChars", 
function (where, len, chars) {
var end = where + len;
if (where < 0 || end < 0) {
throw  new javax.swing.text.BadLocationException ("Invalid location", -1);
}if (end > this.length () || where > this.length ()) {
throw  new javax.swing.text.BadLocationException ("Invalid location", this.length () + 1);
}var g0 = this.getGapStart ();
var g1 = this.getGapEnd ();
var array = this.getArray ();
if ((where + len) <= g0) {
chars.array = array;
chars.offset = where;
} else if (where >= g0) {
chars.array = array;
chars.offset = g1 + where - g0;
} else {
var before = g0 - where;
if (chars.isPartialReturn ()) {
chars.array = array;
chars.offset = where;
chars.count = before;
return;
}chars.array =  Clazz.newCharArray (len, '\0');
chars.offset = 0;
System.arraycopy (array, where, chars.array, 0, before);
System.arraycopy (array, g1, chars.array, before, len - before);
}chars.count = len;
}, "~N,~N,javax.swing.text.Segment");
Clazz.overrideMethod (c$, "createPosition", 
function (offset) {
var g0 = this.getGapStart ();
var g1 = this.getGapEnd ();
var index = (offset < g0) ? offset : offset + (g1 - g0);
this.search.index = index;
var sortIndex = this.findSortIndex (this.search);
var m;
var position;
if (sortIndex < this.marks.size () && (m = this.marks.elementAt (sortIndex)).index == index && (position = m.getPosition ()) != null) {
} else {
position = Clazz.innerTypeInstance (javax.swing.text.GapContent.StickyPosition, this, null);
m = Clazz.innerTypeInstance (javax.swing.text.GapContent.MarkData, this, null, index, position);
position.setMark (m);
this.marks.insertElementAt (m, sortIndex);
}return position;
}, "~N");
Clazz.defineMethod (c$, "shiftEnd", 
function (newSize) {
var oldGapEnd = this.getGapEnd ();
Clazz.superCall (this, javax.swing.text.GapContent, "shiftEnd", [newSize]);
var dg = this.getGapEnd () - oldGapEnd;
var adjustIndex = this.findMarkAdjustIndex (oldGapEnd);
var n = this.marks.size ();
for (var i = adjustIndex; i < n; i++) {
var mark = this.marks.elementAt (i);
mark.index += dg;
}
}, "~N");
Clazz.defineMethod (c$, "getNewArraySize", 
function (reqSize) {
if (reqSize < 524288) {
return Clazz.superCall (this, javax.swing.text.GapContent, "getNewArraySize", [reqSize]);
} else {
return reqSize + 524288;
}}, "~N");
Clazz.defineMethod (c$, "shiftGap", 
function (newGapStart) {
var oldGapStart = this.getGapStart ();
var dg = newGapStart - oldGapStart;
var oldGapEnd = this.getGapEnd ();
var newGapEnd = oldGapEnd + dg;
var gapSize = oldGapEnd - oldGapStart;
Clazz.superCall (this, javax.swing.text.GapContent, "shiftGap", [newGapStart]);
if (dg > 0) {
var adjustIndex = this.findMarkAdjustIndex (oldGapStart);
var n = this.marks.size ();
for (var i = adjustIndex; i < n; i++) {
var mark = this.marks.elementAt (i);
if (mark.index >= newGapEnd) {
break;
}mark.index -= gapSize;
}
} else if (dg < 0) {
var adjustIndex = this.findMarkAdjustIndex (newGapStart);
var n = this.marks.size ();
for (var i = adjustIndex; i < n; i++) {
var mark = this.marks.elementAt (i);
if (mark.index >= oldGapEnd) {
break;
}mark.index += gapSize;
}
}this.resetMarksAtZero ();
}, "~N");
Clazz.defineMethod (c$, "resetMarksAtZero", 
function () {
if (this.marks != null && this.getGapStart () == 0) {
var g1 = this.getGapEnd ();
for (var counter = 0, maxCounter = this.marks.size (); counter < maxCounter; counter++) {
var mark = this.marks.elementAt (counter);
if (mark.index <= g1) {
mark.index = 0;
} else {
break;
}}
}});
Clazz.defineMethod (c$, "shiftGapStartDown", 
function (newGapStart) {
var adjustIndex = this.findMarkAdjustIndex (newGapStart);
var n = this.marks.size ();
var g0 = this.getGapStart ();
var g1 = this.getGapEnd ();
for (var i = adjustIndex; i < n; i++) {
var mark = this.marks.elementAt (i);
if (mark.index > g0) {
break;
}mark.index = g1;
}
Clazz.superCall (this, javax.swing.text.GapContent, "shiftGapStartDown", [newGapStart]);
this.resetMarksAtZero ();
}, "~N");
Clazz.defineMethod (c$, "shiftGapEndUp", 
function (newGapEnd) {
var adjustIndex = this.findMarkAdjustIndex (this.getGapEnd ());
var n = this.marks.size ();
for (var i = adjustIndex; i < n; i++) {
var mark = this.marks.elementAt (i);
if (mark.index >= newGapEnd) {
break;
}mark.index = newGapEnd;
}
Clazz.superCall (this, javax.swing.text.GapContent, "shiftGapEndUp", [newGapEnd]);
this.resetMarksAtZero ();
}, "~N");
Clazz.defineMethod (c$, "compare", 
function (o1, o2) {
if (o1.index < o2.index) {
return -1;
} else if (o1.index > o2.index) {
return 1;
} else {
return 0;
}}, "javax.swing.text.GapContent.MarkData,javax.swing.text.GapContent.MarkData");
Clazz.defineMethod (c$, "findMarkAdjustIndex", 
function (searchIndex) {
this.search.index = Math.max (searchIndex, 1);
var index = this.findSortIndex (this.search);
for (var i = index - 1; i >= 0; i--) {
var d = this.marks.elementAt (i);
if (d.index != this.search.index) {
break;
}index -= 1;
}
return index;
}, "~N");
Clazz.defineMethod (c$, "findSortIndex", 
function (o) {
var lower = 0;
var upper = this.marks.size () - 1;
var mid = 0;
if (upper == -1) {
return 0;
}var cmp = 0;
var last = this.marks.elementAt (upper);
cmp = this.compare (o, last);
if (cmp > 0) return upper + 1;
while (lower <= upper) {
mid = lower + (Clazz.doubleToInt ((upper - lower) / 2));
var entry = this.marks.elementAt (mid);
cmp = this.compare (o, entry);
if (cmp == 0) {
return mid;
} else if (cmp < 0) {
upper = mid - 1;
} else {
lower = mid + 1;
}}
return (cmp < 0) ? mid : mid + 1;
}, "javax.swing.text.GapContent.MarkData");
Clazz.defineMethod (c$, "removeUnusedMarks", 
function () {
var n = this.marks.size ();
var cleaned =  new javax.swing.text.GapContent.MarkVector (n);
for (var i = 0; i < n; i++) {
var mark = this.marks.elementAt (i);
if (mark != null) {
cleaned.addElement (mark);
}}
this.marks = cleaned;
});
Clazz.defineMethod (c$, "getPositionsInRange", 
function (v, offset, length) {
var endOffset = offset + length;
var startIndex;
var endIndex;
var g0 = this.getGapStart ();
var g1 = this.getGapEnd ();
if (offset < g0) {
if (offset == 0) {
startIndex = 0;
} else {
startIndex = this.findMarkAdjustIndex (offset);
}if (endOffset >= g0) {
endIndex = this.findMarkAdjustIndex (endOffset + (g1 - g0) + 1);
} else {
endIndex = this.findMarkAdjustIndex (endOffset + 1);
}} else {
startIndex = this.findMarkAdjustIndex (offset + (g1 - g0));
endIndex = this.findMarkAdjustIndex (endOffset + (g1 - g0) + 1);
}var placeIn = (v == null) ?  new java.util.Vector (Math.max (1, endIndex - startIndex)) : v;
for (var counter = startIndex; counter < endIndex; counter++) {
placeIn.addElement (Clazz.innerTypeInstance (javax.swing.text.GapContent.UndoPosRef, this, null, this.marks.elementAt (counter)));
}
return placeIn;
}, "java.util.Vector,~N,~N");
Clazz.defineMethod (c$, "updateUndoPositions", 
function (positions, offset, length) {
var endOffset = offset + length;
var g1 = this.getGapEnd ();
var startIndex;
var endIndex = this.findMarkAdjustIndex (g1 + 1);
if (offset != 0) {
startIndex = this.findMarkAdjustIndex (g1);
} else {
startIndex = 0;
}for (var counter = positions.size () - 1; counter >= 0; counter--) {
var ref = positions.elementAt (counter);
ref.resetLocation (endOffset, g1);
}
if (startIndex < endIndex) {
var sorted =  new Array (endIndex - startIndex);
var addIndex = 0;
var counter;
if (offset == 0) {
for (counter = startIndex; counter < endIndex; counter++) {
var mark = this.marks.elementAt (counter);
if (mark.index == 0) {
sorted[addIndex++] = mark;
}}
for (counter = startIndex; counter < endIndex; counter++) {
var mark = this.marks.elementAt (counter);
if (mark.index != 0) {
sorted[addIndex++] = mark;
}}
} else {
for (counter = startIndex; counter < endIndex; counter++) {
var mark = this.marks.elementAt (counter);
if (mark.index != g1) {
sorted[addIndex++] = mark;
}}
for (counter = startIndex; counter < endIndex; counter++) {
var mark = this.marks.elementAt (counter);
if (mark.index == g1) {
sorted[addIndex++] = mark;
}}
}this.marks.replaceRange (startIndex, endIndex, sorted);
}}, "java.util.Vector,~N,~N");
c$.$GapContent$MarkData$ = function () {
Clazz.pu$h(self.c$);
c$ = Clazz.decorateAsClass (function () {
Clazz.prepareCallback (this, arguments);
this.ref = null;
this.index = 0;
Clazz.instantialize (this, arguments);
}, javax.swing.text.GapContent, "MarkData");
Clazz.makeConstructor (c$, 
function (a) {
this.index = a;
}, "~N");
Clazz.makeConstructor (c$, 
function (a, b) {
this.ref = b;
this.index = a;
}, "~N,javax.swing.text.GapContent.StickyPosition");
Clazz.defineMethod (c$, "getOffset", 
function () {
var a = this.b$["javax.swing.text.GapContent"].getGapStart ();
var b = this.b$["javax.swing.text.GapContent"].getGapEnd ();
var c = (this.index < a) ? this.index : this.index - (b - a);
return Math.max (c, 0);
});
Clazz.defineMethod (c$, "getPosition", 
function () {
return this.ref;
});
c$ = Clazz.p0p ();
};
c$.$GapContent$StickyPosition$ = function () {
Clazz.pu$h(self.c$);
c$ = Clazz.decorateAsClass (function () {
Clazz.prepareCallback (this, arguments);
this.mark = null;
Clazz.instantialize (this, arguments);
}, javax.swing.text.GapContent, "StickyPosition", null, javax.swing.text.Position);
Clazz.makeConstructor (c$, 
function () {
});
Clazz.defineMethod (c$, "setMark", 
function (a) {
this.mark = a;
}, "javax.swing.text.GapContent.MarkData");
Clazz.overrideMethod (c$, "getOffset", 
function () {
return this.mark.getOffset ();
});
Clazz.overrideMethod (c$, "toString", 
function () {
return Integer.toString (this.getOffset ());
});
c$ = Clazz.p0p ();
};
c$.$GapContent$UndoPosRef$ = function () {
Clazz.pu$h(self.c$);
c$ = Clazz.decorateAsClass (function () {
Clazz.prepareCallback (this, arguments);
this.undoLocation = 0;
this.rec = null;
Clazz.instantialize (this, arguments);
}, javax.swing.text.GapContent, "UndoPosRef");
Clazz.makeConstructor (c$, 
function (a) {
this.rec = a;
this.undoLocation = a.getOffset ();
}, "javax.swing.text.GapContent.MarkData");
Clazz.defineMethod (c$, "resetLocation", 
function (a, b) {
if (this.undoLocation != a) {
this.rec.index = this.undoLocation;
} else {
this.rec.index = b;
}}, "~N,~N");
c$ = Clazz.p0p ();
};
c$.$GapContent$InsertUndo$ = function () {
Clazz.pu$h(self.c$);
c$ = Clazz.decorateAsClass (function () {
Clazz.prepareCallback (this, arguments);
this.offset = 0;
this.length = 0;
this.string = null;
this.posRefs = null;
Clazz.instantialize (this, arguments);
}, javax.swing.text.GapContent, "InsertUndo", javax.swing.undo.AbstractUndoableEdit);
Clazz.makeConstructor (c$, 
function (a, b) {
Clazz.superConstructor (this, javax.swing.text.GapContent.InsertUndo);
this.offset = a;
this.length = b;
}, "~N,~N");
Clazz.defineMethod (c$, "undo", 
function () {
Clazz.superCall (this, javax.swing.text.GapContent.InsertUndo, "undo", []);
try {
this.posRefs = this.b$["javax.swing.text.GapContent"].getPositionsInRange (null, this.offset, this.length);
this.string = this.b$["javax.swing.text.GapContent"].getString (this.offset, this.length);
this.b$["javax.swing.text.GapContent"].remove (this.offset, this.length);
} catch (bl) {
if (Clazz.exceptionOf (bl, javax.swing.text.BadLocationException)) {
throw  new javax.swing.undo.CannotUndoException ();
} else {
throw bl;
}
}
});
Clazz.defineMethod (c$, "redo", 
function () {
Clazz.superCall (this, javax.swing.text.GapContent.InsertUndo, "redo", []);
try {
this.b$["javax.swing.text.GapContent"].insertString (this.offset, this.string);
this.string = null;
if (this.posRefs != null) {
this.b$["javax.swing.text.GapContent"].updateUndoPositions (this.posRefs, this.offset, this.length);
this.posRefs = null;
}} catch (bl) {
if (Clazz.exceptionOf (bl, javax.swing.text.BadLocationException)) {
throw  new javax.swing.undo.CannotRedoException ();
} else {
throw bl;
}
}
});
c$ = Clazz.p0p ();
};
c$.$GapContent$RemoveUndo$ = function () {
Clazz.pu$h(self.c$);
c$ = Clazz.decorateAsClass (function () {
Clazz.prepareCallback (this, arguments);
this.offset = 0;
this.length = 0;
this.string = null;
this.posRefs = null;
Clazz.instantialize (this, arguments);
}, javax.swing.text.GapContent, "RemoveUndo", javax.swing.undo.AbstractUndoableEdit);
Clazz.makeConstructor (c$, 
function (a, b) {
Clazz.superConstructor (this, javax.swing.text.GapContent.RemoveUndo);
this.offset = a;
this.string = b;
this.length = b.length;
this.posRefs = this.b$["javax.swing.text.GapContent"].getPositionsInRange (null, a, this.length);
}, "~N,~S");
Clazz.defineMethod (c$, "undo", 
function () {
Clazz.superCall (this, javax.swing.text.GapContent.RemoveUndo, "undo", []);
try {
this.b$["javax.swing.text.GapContent"].insertString (this.offset, this.string);
if (this.posRefs != null) {
this.b$["javax.swing.text.GapContent"].updateUndoPositions (this.posRefs, this.offset, this.length);
this.posRefs = null;
}this.string = null;
} catch (bl) {
if (Clazz.exceptionOf (bl, javax.swing.text.BadLocationException)) {
throw  new javax.swing.undo.CannotUndoException ();
} else {
throw bl;
}
}
});
Clazz.defineMethod (c$, "redo", 
function () {
Clazz.superCall (this, javax.swing.text.GapContent.RemoveUndo, "redo", []);
try {
this.string = this.b$["javax.swing.text.GapContent"].getString (this.offset, this.length);
this.posRefs = this.b$["javax.swing.text.GapContent"].getPositionsInRange (null, this.offset, this.length);
this.b$["javax.swing.text.GapContent"].remove (this.offset, this.length);
} catch (bl) {
if (Clazz.exceptionOf (bl, javax.swing.text.BadLocationException)) {
throw  new javax.swing.undo.CannotRedoException ();
} else {
throw bl;
}
}
});
c$ = Clazz.p0p ();
};
Clazz.pu$h(self.c$);
c$ = Clazz.decorateAsClass (function () {
this.oneMark = null;
Clazz.instantialize (this, arguments);
}, javax.swing.text.GapContent, "MarkVector", javax.swing.text.GapVector);
Clazz.prepareFields (c$, function () {
this.oneMark =  new Array (1);
});
Clazz.overrideMethod (c$, "allocateArray", 
function (a) {
return  new Array (a);
}, "~N");
Clazz.overrideMethod (c$, "getArrayLength", 
function () {
var a = this.getArray ();
return a.length;
});
Clazz.defineMethod (c$, "size", 
function () {
var a = this.getArrayLength () - (this.getGapEnd () - this.getGapStart ());
return a;
});
Clazz.defineMethod (c$, "insertElementAt", 
function (a, b) {
this.oneMark[0] = a;
this.replace (b, 0, this.oneMark, 1);
}, "javax.swing.text.GapContent.MarkData,~N");
Clazz.defineMethod (c$, "addElement", 
function (a) {
this.insertElementAt (a, this.size ());
}, "javax.swing.text.GapContent.MarkData");
Clazz.defineMethod (c$, "elementAt", 
function (a) {
var b = this.getGapStart ();
var c = this.getGapEnd ();
var d = this.getArray ();
if (a < b) {
return d[a];
} else {
a += c - b;
return d[a];
}}, "~N");
Clazz.defineMethod (c$, "replaceRange", 
function (a, b, c) {
var d = this.getGapStart ();
var e = this.getGapEnd ();
var f = a;
var g = 0;
var h = this.getArray ();
if (a >= d) {
f += (e - d);
b += (e - d);
} else if (b >= d) {
b += (e - d);
while (f < d) {
h[f++] = c[g++];
}
f = e;
} else {
while (f < b) {
h[f++] = c[g++];
}
}while (f < b) {
h[f++] = c[g++];
}
}, "~N,~N,~A");
c$ = Clazz.p0p ();
Clazz.defineStatics (c$,
"empty",  Clazz.newCharArray (0, '\0'),
"GROWTH_SIZE", 524288);
});

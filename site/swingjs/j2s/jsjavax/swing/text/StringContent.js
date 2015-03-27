Clazz.declarePackage ("jsjavax.swing.text");
Clazz.load (["jsjavax.swing.text.AbstractDocument", "$.Position", "jsjavax.swing.undo.AbstractUndoableEdit"], "jsjavax.swing.text.StringContent", ["java.util.Vector", "jsjavax.swing.text.BadLocationException", "jsjavax.swing.undo.CannotRedoException", "$.CannotUndoException"], function () {
c$ = Clazz.decorateAsClass (function () {
this.data = null;
this.count = 0;
this.marks = null;
if (!Clazz.isClassDefined ("jsjavax.swing.text.StringContent.PosRec")) {
jsjavax.swing.text.StringContent.$StringContent$PosRec$ ();
}
if (!Clazz.isClassDefined ("jsjavax.swing.text.StringContent.StickyPosition")) {
jsjavax.swing.text.StringContent.$StringContent$StickyPosition$ ();
}
if (!Clazz.isClassDefined ("jsjavax.swing.text.StringContent.UndoPosRef")) {
jsjavax.swing.text.StringContent.$StringContent$UndoPosRef$ ();
}
if (!Clazz.isClassDefined ("jsjavax.swing.text.StringContent.InsertUndo")) {
jsjavax.swing.text.StringContent.$StringContent$InsertUndo$ ();
}
if (!Clazz.isClassDefined ("jsjavax.swing.text.StringContent.RemoveUndo")) {
jsjavax.swing.text.StringContent.$StringContent$RemoveUndo$ ();
}
Clazz.instantialize (this, arguments);
}, jsjavax.swing.text, "StringContent", null, jsjavax.swing.text.AbstractDocument.Content);
Clazz.makeConstructor (c$, 
function () {
this.construct (10);
});
Clazz.makeConstructor (c$, 
function (initialLength) {
if (initialLength < 1) {
initialLength = 1;
}this.data =  Clazz.newCharArray (initialLength, '\0');
this.data[0] = '\n';
this.count = 1;
}, "~N");
Clazz.overrideMethod (c$, "length", 
function () {
return this.count;
});
Clazz.overrideMethod (c$, "insertString", 
function (where, str) {
if (where >= this.count || where < 0) {
throw  new jsjavax.swing.text.BadLocationException ("Invalid location", this.count);
}var chars = str.toCharArray ();
this.replace (where, 0, chars, 0, chars.length);
if (this.marks != null) {
this.updateMarksForInsert (where, str.length);
}return Clazz.innerTypeInstance (jsjavax.swing.text.StringContent.InsertUndo, this, null, where, str.length);
}, "~N,~S");
Clazz.overrideMethod (c$, "remove", 
function (where, nitems) {
if (where + nitems >= this.count) {
throw  new jsjavax.swing.text.BadLocationException ("Invalid range", this.count);
}var removedString = this.getString (where, nitems);
var edit = Clazz.innerTypeInstance (jsjavax.swing.text.StringContent.RemoveUndo, this, null, where, removedString);
this.replace (where, nitems, jsjavax.swing.text.StringContent.empty, 0, 0);
if (this.marks != null) {
this.updateMarksForRemove (where, nitems);
}return edit;
}, "~N,~N");
Clazz.overrideMethod (c$, "getString", 
function (where, len) {
if (where + len > this.count) {
throw  new jsjavax.swing.text.BadLocationException ("Invalid range", this.count);
}return  String.instantialize (this.data, where, len);
}, "~N,~N");
Clazz.overrideMethod (c$, "getChars", 
function (where, len, chars) {
if (where + len > this.count) {
throw  new jsjavax.swing.text.BadLocationException ("Invalid location", this.count);
}chars.array = this.data;
chars.offset = where;
chars.count = len;
}, "~N,~N,jsjavax.swing.text.Segment");
Clazz.overrideMethod (c$, "createPosition", 
function (offset) {
if (this.marks == null) {
this.marks =  new java.util.Vector ();
}return Clazz.innerTypeInstance (jsjavax.swing.text.StringContent.StickyPosition, this, null, offset);
}, "~N");
Clazz.defineMethod (c$, "replace", 
function (offset, length, replArray, replOffset, replLength) {
var delta = replLength - length;
var src = offset + length;
var nmove = this.count - src;
var dest = src + delta;
if ((this.count + delta) >= this.data.length) {
var newLength = Math.max (2 * this.data.length, this.count + delta);
var newData =  Clazz.newCharArray (newLength, '\0');
System.arraycopy (this.data, 0, newData, 0, offset);
System.arraycopy (replArray, replOffset, newData, offset, replLength);
System.arraycopy (this.data, src, newData, dest, nmove);
this.data = newData;
} else {
System.arraycopy (this.data, src, this.data, dest, nmove);
System.arraycopy (replArray, replOffset, this.data, offset, replLength);
}this.count = this.count + delta;
}, "~N,~N,~A,~N,~N");
Clazz.defineMethod (c$, "resize", 
function (ncount) {
var ndata =  Clazz.newCharArray (ncount, '\0');
System.arraycopy (this.data, 0, ndata, 0, Math.min (ncount, this.count));
this.data = ndata;
}, "~N");
Clazz.defineMethod (c$, "updateMarksForInsert", 
function (offset, length) {
if (offset == 0) {
offset = 1;
}var n = this.marks.size ();
for (var i = 0; i < n; i++) {
var mark = this.marks.elementAt (i);
if (mark.unused) {
this.marks.removeElementAt (i);
i -= 1;
n -= 1;
} else if (mark.offset >= offset) {
mark.offset += length;
}}
}, "~N,~N");
Clazz.defineMethod (c$, "updateMarksForRemove", 
function (offset, length) {
var n = this.marks.size ();
for (var i = 0; i < n; i++) {
var mark = this.marks.elementAt (i);
if (mark.unused) {
this.marks.removeElementAt (i);
i -= 1;
n -= 1;
} else if (mark.offset >= (offset + length)) {
mark.offset -= length;
} else if (mark.offset >= offset) {
mark.offset = offset;
}}
}, "~N,~N");
Clazz.defineMethod (c$, "getPositionsInRange", 
function (v, offset, length) {
var n = this.marks.size ();
var end = offset + length;
var placeIn = (v == null) ?  new java.util.Vector () : v;
for (var i = 0; i < n; i++) {
var mark = this.marks.elementAt (i);
if (mark.unused) {
this.marks.removeElementAt (i);
i -= 1;
n -= 1;
} else if (mark.offset >= offset && mark.offset <= end) placeIn.addElement (Clazz.innerTypeInstance (jsjavax.swing.text.StringContent.UndoPosRef, this, null, mark));
}
return placeIn;
}, "java.util.Vector,~N,~N");
Clazz.defineMethod (c$, "updateUndoPositions", 
function (positions) {
for (var counter = positions.size () - 1; counter >= 0; counter--) {
var ref = positions.elementAt (counter);
if (ref.rec.unused) {
positions.removeElementAt (counter);
} else ref.resetLocation ();
}
}, "java.util.Vector");
c$.$StringContent$PosRec$ = function () {
Clazz.pu$h ();
c$ = Clazz.decorateAsClass (function () {
Clazz.prepareCallback (this, arguments);
this.offset = 0;
this.unused = false;
Clazz.instantialize (this, arguments);
}, jsjavax.swing.text.StringContent, "PosRec");
Clazz.makeConstructor (c$, 
function (a) {
this.offset = a;
}, "~N");
c$ = Clazz.p0p ();
};
c$.$StringContent$StickyPosition$ = function () {
Clazz.pu$h ();
c$ = Clazz.decorateAsClass (function () {
Clazz.prepareCallback (this, arguments);
this.rec = null;
Clazz.instantialize (this, arguments);
}, jsjavax.swing.text.StringContent, "StickyPosition", null, jsjavax.swing.text.Position);
Clazz.makeConstructor (c$, 
function (a) {
this.rec = Clazz.innerTypeInstance (jsjavax.swing.text.StringContent.PosRec, this, null, a);
this.b$["jsjavax.swing.text.StringContent"].marks.addElement (this.rec);
}, "~N");
Clazz.overrideMethod (c$, "getOffset", 
function () {
return this.rec.offset;
});
Clazz.overrideMethod (c$, "finalize", 
function () {
this.rec.unused = true;
});
Clazz.overrideMethod (c$, "toString", 
function () {
return Integer.toString (this.getOffset ());
});
c$ = Clazz.p0p ();
};
c$.$StringContent$UndoPosRef$ = function () {
Clazz.pu$h ();
c$ = Clazz.decorateAsClass (function () {
Clazz.prepareCallback (this, arguments);
this.undoLocation = 0;
this.rec = null;
Clazz.instantialize (this, arguments);
}, jsjavax.swing.text.StringContent, "UndoPosRef");
Clazz.makeConstructor (c$, 
function (a) {
this.rec = a;
this.undoLocation = a.offset;
}, "jsjavax.swing.text.StringContent.PosRec");
Clazz.defineMethod (c$, "resetLocation", 
function () {
this.rec.offset = this.undoLocation;
});
c$ = Clazz.p0p ();
};
c$.$StringContent$InsertUndo$ = function () {
Clazz.pu$h ();
c$ = Clazz.decorateAsClass (function () {
Clazz.prepareCallback (this, arguments);
this.offset = 0;
this.length = 0;
this.string = null;
this.posRefs = null;
Clazz.instantialize (this, arguments);
}, jsjavax.swing.text.StringContent, "InsertUndo", jsjavax.swing.undo.AbstractUndoableEdit);
Clazz.makeConstructor (c$, 
function (a, b) {
Clazz.superConstructor (this, jsjavax.swing.text.StringContent.InsertUndo);
this.offset = a;
this.length = b;
}, "~N,~N");
Clazz.defineMethod (c$, "undo", 
function () {
Clazz.superCall (this, jsjavax.swing.text.StringContent.InsertUndo, "undo", []);
try {
{
if (this.b$["jsjavax.swing.text.StringContent"].marks != null) this.posRefs = this.b$["jsjavax.swing.text.StringContent"].getPositionsInRange (null, this.offset, this.length);
this.string = this.b$["jsjavax.swing.text.StringContent"].getString (this.offset, this.length);
this.b$["jsjavax.swing.text.StringContent"].remove (this.offset, this.length);
}} catch (bl) {
if (Clazz.exceptionOf (bl, jsjavax.swing.text.BadLocationException)) {
throw  new jsjavax.swing.undo.CannotUndoException ();
} else {
throw bl;
}
}
});
Clazz.defineMethod (c$, "redo", 
function () {
Clazz.superCall (this, jsjavax.swing.text.StringContent.InsertUndo, "redo", []);
try {
{
this.b$["jsjavax.swing.text.StringContent"].insertString (this.offset, this.string);
this.string = null;
if (this.posRefs != null) {
this.b$["jsjavax.swing.text.StringContent"].updateUndoPositions (this.posRefs);
this.posRefs = null;
}}} catch (bl) {
if (Clazz.exceptionOf (bl, jsjavax.swing.text.BadLocationException)) {
throw  new jsjavax.swing.undo.CannotRedoException ();
} else {
throw bl;
}
}
});
c$ = Clazz.p0p ();
};
c$.$StringContent$RemoveUndo$ = function () {
Clazz.pu$h ();
c$ = Clazz.decorateAsClass (function () {
Clazz.prepareCallback (this, arguments);
this.offset = 0;
this.length = 0;
this.string = null;
this.posRefs = null;
Clazz.instantialize (this, arguments);
}, jsjavax.swing.text.StringContent, "RemoveUndo", jsjavax.swing.undo.AbstractUndoableEdit);
Clazz.makeConstructor (c$, 
function (a, b) {
Clazz.superConstructor (this, jsjavax.swing.text.StringContent.RemoveUndo);
this.offset = a;
this.string = b;
this.length = b.length;
if (this.b$["jsjavax.swing.text.StringContent"].marks != null) this.posRefs = this.b$["jsjavax.swing.text.StringContent"].getPositionsInRange (null, a, this.length);
}, "~N,~S");
Clazz.defineMethod (c$, "undo", 
function () {
Clazz.superCall (this, jsjavax.swing.text.StringContent.RemoveUndo, "undo", []);
try {
{
this.b$["jsjavax.swing.text.StringContent"].insertString (this.offset, this.string);
if (this.posRefs != null) {
this.b$["jsjavax.swing.text.StringContent"].updateUndoPositions (this.posRefs);
this.posRefs = null;
}this.string = null;
}} catch (bl) {
if (Clazz.exceptionOf (bl, jsjavax.swing.text.BadLocationException)) {
throw  new jsjavax.swing.undo.CannotUndoException ();
} else {
throw bl;
}
}
});
Clazz.defineMethod (c$, "redo", 
function () {
Clazz.superCall (this, jsjavax.swing.text.StringContent.RemoveUndo, "redo", []);
try {
{
this.string = this.b$["jsjavax.swing.text.StringContent"].getString (this.offset, this.length);
if (this.b$["jsjavax.swing.text.StringContent"].marks != null) this.posRefs = this.b$["jsjavax.swing.text.StringContent"].getPositionsInRange (null, this.offset, this.length);
this.b$["jsjavax.swing.text.StringContent"].remove (this.offset, this.length);
}} catch (bl) {
if (Clazz.exceptionOf (bl, jsjavax.swing.text.BadLocationException)) {
throw  new jsjavax.swing.undo.CannotRedoException ();
} else {
throw bl;
}
}
});
c$ = Clazz.p0p ();
};
Clazz.defineStatics (c$,
"empty",  Clazz.newCharArray (0, '\0'));
});

Clazz.declarePackage ("jsjavax.swing.undo");
Clazz.load (["jsjavax.swing.undo.AbstractUndoableEdit"], "jsjavax.swing.undo.CompoundEdit", ["java.util.Vector"], function () {
c$ = Clazz.decorateAsClass (function () {
this.inProgress = false;
this.edits = null;
Clazz.instantialize (this, arguments);
}, jsjavax.swing.undo, "CompoundEdit", jsjavax.swing.undo.AbstractUndoableEdit);
Clazz.makeConstructor (c$, 
function () {
Clazz.superConstructor (this, jsjavax.swing.undo.CompoundEdit);
this.inProgress = true;
this.edits =  new java.util.Vector ();
});
Clazz.defineMethod (c$, "undo", 
function () {
Clazz.superCall (this, jsjavax.swing.undo.CompoundEdit, "undo", []);
var i = this.edits.size ();
while (i-- > 0) {
var e = this.edits.elementAt (i);
e.undo ();
}
});
Clazz.defineMethod (c$, "redo", 
function () {
Clazz.superCall (this, jsjavax.swing.undo.CompoundEdit, "redo", []);
var cursor = this.edits.elements ();
while (cursor.hasMoreElements ()) {
(cursor.nextElement ()).redo ();
}
});
Clazz.defineMethod (c$, "lastEdit", 
function () {
var count = this.edits.size ();
if (count > 0) return this.edits.elementAt (count - 1);
 else return null;
});
Clazz.defineMethod (c$, "die", 
function () {
var size = this.edits.size ();
for (var i = size - 1; i >= 0; i--) {
var e = this.edits.elementAt (i);
e.die ();
}
Clazz.superCall (this, jsjavax.swing.undo.CompoundEdit, "die", []);
});
Clazz.overrideMethod (c$, "addEdit", 
function (anEdit) {
if (!this.inProgress) {
return false;
} else {
var last = this.lastEdit ();
if (last == null) {
this.edits.addElement (anEdit);
} else if (!last.addEdit (anEdit)) {
if (anEdit.replaceEdit (last)) {
this.edits.removeElementAt (this.edits.size () - 1);
}this.edits.addElement (anEdit);
}return true;
}}, "jsjavax.swing.undo.UndoableEdit");
Clazz.defineMethod (c$, "end", 
function () {
this.inProgress = false;
});
Clazz.defineMethod (c$, "canUndo", 
function () {
return !this.isInProgress () && Clazz.superCall (this, jsjavax.swing.undo.CompoundEdit, "canUndo", []);
});
Clazz.defineMethod (c$, "canRedo", 
function () {
return !this.isInProgress () && Clazz.superCall (this, jsjavax.swing.undo.CompoundEdit, "canRedo", []);
});
Clazz.defineMethod (c$, "isInProgress", 
function () {
return this.inProgress;
});
Clazz.overrideMethod (c$, "isSignificant", 
function () {
var cursor = this.edits.elements ();
while (cursor.hasMoreElements ()) {
if ((cursor.nextElement ()).isSignificant ()) {
return true;
}}
return false;
});
Clazz.defineMethod (c$, "getPresentationName", 
function () {
var last = this.lastEdit ();
if (last != null) {
return last.getPresentationName ();
} else {
return Clazz.superCall (this, jsjavax.swing.undo.CompoundEdit, "getPresentationName", []);
}});
Clazz.defineMethod (c$, "getUndoPresentationName", 
function () {
var last = this.lastEdit ();
if (last != null) {
return last.getUndoPresentationName ();
} else {
return Clazz.superCall (this, jsjavax.swing.undo.CompoundEdit, "getUndoPresentationName", []);
}});
Clazz.defineMethod (c$, "getRedoPresentationName", 
function () {
var last = this.lastEdit ();
if (last != null) {
return last.getRedoPresentationName ();
} else {
return Clazz.superCall (this, jsjavax.swing.undo.CompoundEdit, "getRedoPresentationName", []);
}});
Clazz.defineMethod (c$, "toString", 
function () {
return Clazz.superCall (this, jsjavax.swing.undo.CompoundEdit, "toString", []) + " inProgress: " + this.inProgress + " edits: " + this.edits;
});
});

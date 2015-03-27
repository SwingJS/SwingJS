Clazz.declarePackage ("jsjavax.swing.undo");
Clazz.load (["jsjavax.swing.undo.UndoableEdit"], "jsjavax.swing.undo.AbstractUndoableEdit", ["jsjavax.swing.UIManager", "jsjavax.swing.undo.CannotRedoException", "$.CannotUndoException"], function () {
c$ = Clazz.decorateAsClass (function () {
this.hasBeenDone = false;
this.alive = false;
Clazz.instantialize (this, arguments);
}, jsjavax.swing.undo, "AbstractUndoableEdit", null, jsjavax.swing.undo.UndoableEdit);
Clazz.makeConstructor (c$, 
function () {
this.hasBeenDone = true;
this.alive = true;
});
Clazz.overrideMethod (c$, "die", 
function () {
this.alive = false;
});
Clazz.overrideMethod (c$, "undo", 
function () {
if (!this.canUndo ()) {
throw  new jsjavax.swing.undo.CannotUndoException ();
}this.hasBeenDone = false;
});
Clazz.overrideMethod (c$, "canUndo", 
function () {
return this.alive && this.hasBeenDone;
});
Clazz.overrideMethod (c$, "redo", 
function () {
if (!this.canRedo ()) {
throw  new jsjavax.swing.undo.CannotRedoException ();
}this.hasBeenDone = true;
});
Clazz.overrideMethod (c$, "canRedo", 
function () {
return this.alive && !this.hasBeenDone;
});
Clazz.overrideMethod (c$, "addEdit", 
function (anEdit) {
return false;
}, "jsjavax.swing.undo.UndoableEdit");
Clazz.overrideMethod (c$, "replaceEdit", 
function (anEdit) {
return false;
}, "jsjavax.swing.undo.UndoableEdit");
Clazz.overrideMethod (c$, "isSignificant", 
function () {
return true;
});
Clazz.overrideMethod (c$, "getPresentationName", 
function () {
return "";
});
Clazz.overrideMethod (c$, "getUndoPresentationName", 
function () {
var name = this.getPresentationName ();
if (!"".equals (name)) {
name = jsjavax.swing.UIManager.getString ("AbstractUndoableEdit.undoText") + " " + name;
} else {
name = jsjavax.swing.UIManager.getString ("AbstractUndoableEdit.undoText");
}return name;
});
Clazz.overrideMethod (c$, "getRedoPresentationName", 
function () {
var name = this.getPresentationName ();
if (!"".equals (name)) {
name = jsjavax.swing.UIManager.getString ("AbstractUndoableEdit.redoText") + " " + name;
} else {
name = jsjavax.swing.UIManager.getString ("AbstractUndoableEdit.redoText");
}return name;
});
Clazz.defineMethod (c$, "toString", 
function () {
return Clazz.superCall (this, jsjavax.swing.undo.AbstractUndoableEdit, "toString", []) + " hasBeenDone: " + this.hasBeenDone + " alive: " + this.alive;
});
Clazz.defineStatics (c$,
"UndoName", "Undo",
"RedoName", "Redo");
});

Clazz.declarePackage ("javax.swing.undo");
Clazz.load (["javax.swing.undo.UndoableEdit"], "javax.swing.undo.AbstractUndoableEdit", ["javax.swing.UIManager", "javax.swing.undo.CannotRedoException", "$.CannotUndoException"], function () {
c$ = Clazz.decorateAsClass (function () {
this.hasBeenDone = false;
this.alive = false;
Clazz.instantialize (this, arguments);
}, javax.swing.undo, "AbstractUndoableEdit", null, javax.swing.undo.UndoableEdit);
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
throw  new javax.swing.undo.CannotUndoException ();
}this.hasBeenDone = false;
});
Clazz.overrideMethod (c$, "canUndo", 
function () {
return this.alive && this.hasBeenDone;
});
Clazz.overrideMethod (c$, "redo", 
function () {
if (!this.canRedo ()) {
throw  new javax.swing.undo.CannotRedoException ();
}this.hasBeenDone = true;
});
Clazz.overrideMethod (c$, "canRedo", 
function () {
return this.alive && !this.hasBeenDone;
});
Clazz.overrideMethod (c$, "addEdit", 
function (anEdit) {
return false;
}, "javax.swing.undo.UndoableEdit");
Clazz.overrideMethod (c$, "replaceEdit", 
function (anEdit) {
return false;
}, "javax.swing.undo.UndoableEdit");
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
name = javax.swing.UIManager.getString ("AbstractUndoableEdit.undoText") + " " + name;
} else {
name = javax.swing.UIManager.getString ("AbstractUndoableEdit.undoText");
}return name;
});
Clazz.overrideMethod (c$, "getRedoPresentationName", 
function () {
var name = this.getPresentationName ();
if (!"".equals (name)) {
name = javax.swing.UIManager.getString ("AbstractUndoableEdit.redoText") + " " + name;
} else {
name = javax.swing.UIManager.getString ("AbstractUndoableEdit.redoText");
}return name;
});
Clazz.defineMethod (c$, "toString", 
function () {
return Clazz.superCall (this, javax.swing.undo.AbstractUndoableEdit, "toString", []) + " hasBeenDone: " + this.hasBeenDone + " alive: " + this.alive;
});
Clazz.defineStatics (c$,
"UndoName", "Undo",
"RedoName", "Redo");
});

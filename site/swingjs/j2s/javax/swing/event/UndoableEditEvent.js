Clazz.declarePackage ("javax.swing.event");
Clazz.load (["java.util.EventObject"], "javax.swing.event.UndoableEditEvent", null, function () {
c$ = Clazz.decorateAsClass (function () {
this.myEdit = null;
Clazz.instantialize (this, arguments);
}, javax.swing.event, "UndoableEditEvent", java.util.EventObject);
Clazz.makeConstructor (c$, 
function (source, edit) {
Clazz.superConstructor (this, javax.swing.event.UndoableEditEvent, [source]);
this.myEdit = edit;
}, "~O,javax.swing.undo.UndoableEdit");
Clazz.defineMethod (c$, "getEdit", 
function () {
return this.myEdit;
});
});

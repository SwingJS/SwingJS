Clazz.declarePackage ("jsjavax.swing.event");
Clazz.load (["java.util.EventObject"], "jsjavax.swing.event.UndoableEditEvent", null, function () {
c$ = Clazz.decorateAsClass (function () {
this.myEdit = null;
Clazz.instantialize (this, arguments);
}, jsjavax.swing.event, "UndoableEditEvent", java.util.EventObject);
Clazz.makeConstructor (c$, 
function (source, edit) {
Clazz.superConstructor (this, jsjavax.swing.event.UndoableEditEvent, [source]);
this.myEdit = edit;
}, "~O,jsjavax.swing.undo.UndoableEdit");
Clazz.defineMethod (c$, "getEdit", 
function () {
return this.myEdit;
});
});

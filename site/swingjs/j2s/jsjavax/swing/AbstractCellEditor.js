Clazz.declarePackage ("jsjavax.swing");
Clazz.load (["jsjavax.swing.CellEditor", "jsjavax.swing.event.EventListenerList"], "jsjavax.swing.AbstractCellEditor", ["jsjavax.swing.event.CellEditorListener", "$.ChangeEvent"], function () {
c$ = Clazz.decorateAsClass (function () {
this.listenerList = null;
this.changeEvent = null;
Clazz.instantialize (this, arguments);
}, jsjavax.swing, "AbstractCellEditor", null, jsjavax.swing.CellEditor);
Clazz.prepareFields (c$, function () {
this.listenerList =  new jsjavax.swing.event.EventListenerList ();
});
Clazz.overrideMethod (c$, "isCellEditable", 
function (e) {
return true;
}, "java.util.EventObject");
Clazz.overrideMethod (c$, "shouldSelectCell", 
function (anEvent) {
return true;
}, "java.util.EventObject");
Clazz.overrideMethod (c$, "stopCellEditing", 
function () {
this.fireEditingStopped ();
return true;
});
Clazz.overrideMethod (c$, "cancelCellEditing", 
function () {
this.fireEditingCanceled ();
});
Clazz.overrideMethod (c$, "addCellEditorListener", 
function (l) {
this.listenerList.add (jsjavax.swing.event.CellEditorListener, l);
}, "jsjavax.swing.event.CellEditorListener");
Clazz.overrideMethod (c$, "removeCellEditorListener", 
function (l) {
this.listenerList.remove (jsjavax.swing.event.CellEditorListener, l);
}, "jsjavax.swing.event.CellEditorListener");
Clazz.defineMethod (c$, "getCellEditorListeners", 
function () {
return this.listenerList.getListeners (jsjavax.swing.event.CellEditorListener);
});
Clazz.defineMethod (c$, "fireEditingStopped", 
function () {
var listeners = this.listenerList.getListenerList ();
for (var i = listeners.length - 2; i >= 0; i -= 2) {
if (listeners[i] === jsjavax.swing.event.CellEditorListener) {
if (this.changeEvent == null) this.changeEvent =  new jsjavax.swing.event.ChangeEvent (this);
(listeners[i + 1]).editingStopped (this.changeEvent);
}}
});
Clazz.defineMethod (c$, "fireEditingCanceled", 
function () {
var listeners = this.listenerList.getListenerList ();
for (var i = listeners.length - 2; i >= 0; i -= 2) {
if (listeners[i] === jsjavax.swing.event.CellEditorListener) {
if (this.changeEvent == null) this.changeEvent =  new jsjavax.swing.event.ChangeEvent (this);
(listeners[i + 1]).editingCanceled (this.changeEvent);
}}
});
});

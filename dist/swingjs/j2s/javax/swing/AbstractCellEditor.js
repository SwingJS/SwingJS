Clazz.declarePackage ("javax.swing");
Clazz.load (["javax.swing.CellEditor", "javax.swing.event.EventListenerList"], "javax.swing.AbstractCellEditor", ["javax.swing.event.CellEditorListener", "$.ChangeEvent"], function () {
c$ = Clazz.decorateAsClass (function () {
this.listenerList = null;
this.changeEvent = null;
Clazz.instantialize (this, arguments);
}, javax.swing, "AbstractCellEditor", null, javax.swing.CellEditor);
Clazz.prepareFields (c$, function () {
this.listenerList =  new javax.swing.event.EventListenerList ();
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
this.listenerList.add (javax.swing.event.CellEditorListener, l);
}, "javax.swing.event.CellEditorListener");
Clazz.overrideMethod (c$, "removeCellEditorListener", 
function (l) {
this.listenerList.remove (javax.swing.event.CellEditorListener, l);
}, "javax.swing.event.CellEditorListener");
Clazz.defineMethod (c$, "getCellEditorListeners", 
function () {
return this.listenerList.getListeners (javax.swing.event.CellEditorListener);
});
Clazz.defineMethod (c$, "fireEditingStopped", 
function () {
var listeners = this.listenerList.getListenerList ();
for (var i = listeners.length - 2; i >= 0; i -= 2) {
if (listeners[i] === javax.swing.event.CellEditorListener) {
if (this.changeEvent == null) this.changeEvent =  new javax.swing.event.ChangeEvent (this);
(listeners[i + 1]).editingStopped (this.changeEvent);
}}
});
Clazz.defineMethod (c$, "fireEditingCanceled", 
function () {
var listeners = this.listenerList.getListenerList ();
for (var i = listeners.length - 2; i >= 0; i -= 2) {
if (listeners[i] === javax.swing.event.CellEditorListener) {
if (this.changeEvent == null) this.changeEvent =  new javax.swing.event.ChangeEvent (this);
(listeners[i + 1]).editingCanceled (this.changeEvent);
}}
});
});

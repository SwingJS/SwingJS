Clazz.declarePackage ("jsjavax.swing");
Clazz.load (["jsjavax.swing.SingleSelectionModel", "jsjavax.swing.event.EventListenerList"], "jsjavax.swing.DefaultSingleSelectionModel", ["jsjavax.swing.event.ChangeEvent", "$.ChangeListener"], function () {
c$ = Clazz.decorateAsClass (function () {
this.changeEvent = null;
this.listenerList = null;
this.index = -1;
Clazz.instantialize (this, arguments);
}, jsjavax.swing, "DefaultSingleSelectionModel", null, jsjavax.swing.SingleSelectionModel);
Clazz.prepareFields (c$, function () {
this.listenerList =  new jsjavax.swing.event.EventListenerList ();
});
Clazz.overrideMethod (c$, "getSelectedIndex", 
function () {
return this.index;
});
Clazz.overrideMethod (c$, "setSelectedIndex", 
function (index) {
if (this.index != index) {
this.index = index;
this.fireStateChanged ();
}}, "~N");
Clazz.overrideMethod (c$, "clearSelection", 
function () {
this.setSelectedIndex (-1);
});
Clazz.overrideMethod (c$, "isSelected", 
function () {
var ret = false;
if (this.getSelectedIndex () != -1) {
ret = true;
}return ret;
});
Clazz.overrideMethod (c$, "addChangeListener", 
function (l) {
this.listenerList.add (jsjavax.swing.event.ChangeListener, l);
}, "jsjavax.swing.event.ChangeListener");
Clazz.overrideMethod (c$, "removeChangeListener", 
function (l) {
this.listenerList.remove (jsjavax.swing.event.ChangeListener, l);
}, "jsjavax.swing.event.ChangeListener");
Clazz.defineMethod (c$, "getChangeListeners", 
function () {
return this.listenerList.getListeners (jsjavax.swing.event.ChangeListener);
});
Clazz.defineMethod (c$, "fireStateChanged", 
function () {
var listeners = this.listenerList.getListenerList ();
for (var i = listeners.length - 2; i >= 0; i -= 2) {
if (listeners[i] === jsjavax.swing.event.ChangeListener) {
if (this.changeEvent == null) this.changeEvent =  new jsjavax.swing.event.ChangeEvent (this);
(listeners[i + 1]).stateChanged (this.changeEvent);
}}
});
Clazz.defineMethod (c$, "getListeners", 
function (listenerType) {
return this.listenerList.getListeners (listenerType);
}, "Class");
});

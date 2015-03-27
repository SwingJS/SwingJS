Clazz.declarePackage ("jsjavax.swing.colorchooser");
Clazz.load (["jsjavax.swing.colorchooser.ColorSelectionModel", "jsjavax.swing.event.EventListenerList"], "jsjavax.swing.colorchooser.DefaultColorSelectionModel", ["jsjava.awt.Color", "jsjavax.swing.event.ChangeEvent", "$.ChangeListener"], function () {
c$ = Clazz.decorateAsClass (function () {
this.changeEvent = null;
this.listenerList = null;
this.selectedColor = null;
Clazz.instantialize (this, arguments);
}, jsjavax.swing.colorchooser, "DefaultColorSelectionModel", null, jsjavax.swing.colorchooser.ColorSelectionModel);
Clazz.prepareFields (c$, function () {
this.listenerList =  new jsjavax.swing.event.EventListenerList ();
});
Clazz.makeConstructor (c$, 
function () {
this.selectedColor = jsjava.awt.Color.white;
});
Clazz.makeConstructor (c$, 
function (color) {
this.selectedColor = color;
}, "jsjava.awt.Color");
Clazz.overrideMethod (c$, "getSelectedColor", 
function () {
return this.selectedColor;
});
Clazz.overrideMethod (c$, "setSelectedColor", 
function (color) {
if (color != null && !this.selectedColor.equals (color)) {
this.selectedColor = color;
this.fireStateChanged ();
}}, "jsjava.awt.Color");
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
if (this.changeEvent == null) {
this.changeEvent =  new jsjavax.swing.event.ChangeEvent (this);
}(listeners[i + 1]).stateChanged (this.changeEvent);
}}
});
});

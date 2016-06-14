Clazz.declarePackage ("javax.swing.colorchooser");
Clazz.load (["javax.swing.colorchooser.ColorSelectionModel", "javax.swing.event.EventListenerList"], "javax.swing.colorchooser.DefaultColorSelectionModel", ["java.awt.Color", "javax.swing.event.ChangeEvent", "$.ChangeListener"], function () {
c$ = Clazz.decorateAsClass (function () {
this.changeEvent = null;
this.listenerList = null;
this.selectedColor = null;
Clazz.instantialize (this, arguments);
}, javax.swing.colorchooser, "DefaultColorSelectionModel", null, javax.swing.colorchooser.ColorSelectionModel);
Clazz.prepareFields (c$, function () {
this.listenerList =  new javax.swing.event.EventListenerList ();
});
Clazz.makeConstructor (c$, 
function () {
this.selectedColor = java.awt.Color.white;
});
Clazz.makeConstructor (c$, 
function (color) {
this.selectedColor = color;
}, "java.awt.Color");
Clazz.overrideMethod (c$, "getSelectedColor", 
function () {
return this.selectedColor;
});
Clazz.overrideMethod (c$, "setSelectedColor", 
function (color) {
if (color != null && !this.selectedColor.equals (color)) {
this.selectedColor = color;
this.fireStateChanged ();
}}, "java.awt.Color");
Clazz.overrideMethod (c$, "addChangeListener", 
function (l) {
this.listenerList.add (javax.swing.event.ChangeListener, l);
}, "javax.swing.event.ChangeListener");
Clazz.overrideMethod (c$, "removeChangeListener", 
function (l) {
this.listenerList.remove (javax.swing.event.ChangeListener, l);
}, "javax.swing.event.ChangeListener");
Clazz.defineMethod (c$, "getChangeListeners", 
function () {
return this.listenerList.getListeners (javax.swing.event.ChangeListener);
});
Clazz.defineMethod (c$, "fireStateChanged", 
function () {
var listeners = this.listenerList.getListenerList ();
for (var i = listeners.length - 2; i >= 0; i -= 2) {
if (listeners[i] === javax.swing.event.ChangeListener) {
if (this.changeEvent == null) {
this.changeEvent =  new javax.swing.event.ChangeEvent (this);
}(listeners[i + 1]).stateChanged (this.changeEvent);
}}
});
});

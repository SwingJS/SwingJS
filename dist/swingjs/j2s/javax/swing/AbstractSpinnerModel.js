Clazz.declarePackage ("javax.swing");
Clazz.load (["javax.swing.SpinnerModel", "javax.swing.event.EventListenerList"], "javax.swing.AbstractSpinnerModel", ["javax.swing.event.ChangeEvent", "$.ChangeListener"], function () {
c$ = Clazz.decorateAsClass (function () {
this.changeEvent = null;
this.listenerList = null;
Clazz.instantialize (this, arguments);
}, javax.swing, "AbstractSpinnerModel", null, javax.swing.SpinnerModel);
Clazz.prepareFields (c$, function () {
this.listenerList =  new javax.swing.event.EventListenerList ();
});
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
Clazz.defineMethod (c$, "getListeners", 
function (listenerType) {
return this.listenerList.getListeners (listenerType);
}, "Class");
});

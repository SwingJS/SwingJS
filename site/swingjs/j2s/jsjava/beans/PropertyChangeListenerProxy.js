Clazz.declarePackage ("jsjava.beans");
Clazz.load (["java.util.EventListenerProxy", "jsjava.beans.PropertyChangeListener"], "jsjava.beans.PropertyChangeListenerProxy", null, function () {
c$ = Clazz.decorateAsClass (function () {
this.propertyName = null;
Clazz.instantialize (this, arguments);
}, jsjava.beans, "PropertyChangeListenerProxy", java.util.EventListenerProxy, jsjava.beans.PropertyChangeListener);
Clazz.makeConstructor (c$, 
function (propertyName, listener) {
Clazz.superConstructor (this, jsjava.beans.PropertyChangeListenerProxy, [listener]);
this.propertyName = propertyName;
}, "~S,jsjava.beans.PropertyChangeListener");
Clazz.defineMethod (c$, "propertyChange", 
function (evt) {
(this.getListener ()).propertyChange (evt);
}, "jsjava.beans.PropertyChangeEvent");
Clazz.defineMethod (c$, "getPropertyName", 
function () {
return this.propertyName;
});
});

Clazz.declarePackage ("javax.swing");
Clazz.load (["java.beans.PropertyChangeListener"], "javax.swing.ActionPropertyChangeListener", null, function () {
c$ = Clazz.decorateAsClass (function () {
this.action = null;
Clazz.instantialize (this, arguments);
}, javax.swing, "ActionPropertyChangeListener", null, java.beans.PropertyChangeListener);
Clazz.makeConstructor (c$, 
function (c, a) {
this.setTarget (c);
this.action = a;
}, "~O,javax.swing.Action");
Clazz.overrideMethod (c$, "propertyChange", 
function (e) {
var target = this.getTarget ();
if (target == null) {
this.getAction ().removePropertyChangeListener (this);
} else {
this.actionPropertyChanged (target, this.getAction (), e);
}}, "java.beans.PropertyChangeEvent");
Clazz.defineMethod (c$, "setTarget", 
 function (c) {
}, "~O");
Clazz.defineMethod (c$, "getTarget", 
function () {
return null;
});
Clazz.defineMethod (c$, "getAction", 
function () {
return this.action;
});
});

Clazz.declarePackage ("javax.swing");
Clazz.load (["javax.swing.Action", "$.ArrayTable"], "javax.swing.AbstractAction", ["java.lang.Boolean", "javax.swing.event.SwingPropertyChangeSupport"], function () {
c$ = Clazz.decorateAsClass (function () {
this.enabled = true;
this.arrayTable = null;
this.changeSupport = null;
Clazz.instantialize (this, arguments);
}, javax.swing, "AbstractAction", null, [javax.swing.Action, Cloneable]);
c$.shouldReconfigure = Clazz.defineMethod (c$, "shouldReconfigure", 
function (e) {
if (e.getPropertyName () == null) {
javax.swing.AbstractAction.RECONFIGURE_ON_NULL = new Boolean (false);
}return false;
}, "java.beans.PropertyChangeEvent");
c$.setEnabledFromAction = Clazz.defineMethod (c$, "setEnabledFromAction", 
function (c, a) {
c.setEnabled ((a != null) ? a.isEnabled () : true);
}, "javax.swing.JComponent,javax.swing.Action");
c$.setToolTipTextFromAction = Clazz.defineMethod (c$, "setToolTipTextFromAction", 
function (c, a) {
c.setToolTipText (a != null ? a.getValue ("ShortDescription") : null);
}, "javax.swing.JComponent,javax.swing.Action");
c$.hasSelectedKey = Clazz.defineMethod (c$, "hasSelectedKey", 
function (a) {
return (a != null && a.getValue ("SwingSelectedKey") != null);
}, "javax.swing.Action");
c$.isSelected = Clazz.defineMethod (c$, "isSelected", 
function (a) {
return Boolean.TRUE.equals (a.getValue ("SwingSelectedKey"));
}, "javax.swing.Action");
Clazz.makeConstructor (c$, 
function () {
});
Clazz.makeConstructor (c$, 
function (name) {
this.putValue ("Name", name);
}, "~S");
Clazz.makeConstructor (c$, 
function (name, icon) {
this.construct (name);
this.putValue ("SmallIcon", icon);
}, "~S,javax.swing.Icon");
Clazz.defineMethod (c$, "getValue", 
function (key) {
if (key === "enabled") {
return this.enabled;
}if (this.arrayTable == null) {
return null;
}return this.arrayTable.get (key);
}, "~S");
Clazz.overrideMethod (c$, "putValue", 
function (key, newValue) {
var oldValue = null;
if (key === "enabled") {
if (newValue == null || !(Clazz.instanceOf (newValue, Boolean))) {
newValue = new Boolean (false);
}oldValue = new Boolean (this.enabled);
this.enabled = (newValue).booleanValue ();
} else {
if (this.arrayTable == null) {
this.arrayTable =  new javax.swing.ArrayTable ();
}if (this.arrayTable.containsKey (key)) oldValue = this.arrayTable.get (key);
if (newValue == null) {
this.arrayTable.remove (key);
} else {
this.arrayTable.put (key, newValue);
}}this.firePropertyChange (key, oldValue, newValue);
}, "~S,~O");
Clazz.defineMethod (c$, "isEnabled", 
function () {
return this.enabled;
});
Clazz.overrideMethod (c$, "setEnabled", 
function (newValue) {
var oldValue = this.enabled;
if (oldValue != newValue) {
this.enabled = newValue;
this.firePropertyChange ("enabled", Boolean.$valueOf (oldValue), Boolean.$valueOf (newValue));
}}, "~B");
Clazz.defineMethod (c$, "getKeys", 
function () {
if (this.arrayTable == null) {
return null;
}var keys =  new Array (this.arrayTable.size ());
this.arrayTable.getKeys (keys);
return keys;
});
Clazz.defineMethod (c$, "firePropertyChange", 
function (propertyName, oldValue, newValue) {
if (this.changeSupport == null || (oldValue != null && newValue != null && oldValue.equals (newValue))) {
return;
}this.changeSupport.firePropertyChange (propertyName, oldValue, newValue);
}, "~S,~O,~O");
Clazz.overrideMethod (c$, "addPropertyChangeListener", 
function (listener) {
if (this.changeSupport == null) {
this.changeSupport =  new javax.swing.event.SwingPropertyChangeSupport (this);
}this.changeSupport.addPropertyChangeListener (listener);
}, "java.beans.PropertyChangeListener");
Clazz.overrideMethod (c$, "removePropertyChangeListener", 
function (listener) {
if (this.changeSupport == null) {
return;
}this.changeSupport.removePropertyChangeListener (listener);
}, "java.beans.PropertyChangeListener");
Clazz.defineMethod (c$, "getPropertyChangeListeners", 
function () {
if (this.changeSupport == null) {
return  new Array (0);
}return this.changeSupport.getPropertyChangeListeners ();
});
Clazz.defineMethod (c$, "clone", 
function () {
var newAction = Clazz.superCall (this, javax.swing.AbstractAction, "clone", []);
{
if (this.arrayTable != null) {
newAction.arrayTable = this.arrayTable.clone ();
}}return newAction;
});
Clazz.defineStatics (c$,
"RECONFIGURE_ON_NULL", null);
});

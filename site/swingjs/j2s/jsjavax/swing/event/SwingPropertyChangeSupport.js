Clazz.declarePackage ("jsjavax.swing.event");
Clazz.load (["jsjava.beans.PropertyChangeSupport"], "jsjavax.swing.event.SwingPropertyChangeSupport", ["java.lang.NullPointerException", "jsjavax.swing.SwingUtilities"], function () {
c$ = Clazz.decorateAsClass (function () {
this.notifyOnEDT = false;
Clazz.instantialize (this, arguments);
}, jsjavax.swing.event, "SwingPropertyChangeSupport", jsjava.beans.PropertyChangeSupport);
Clazz.makeConstructor (c$, 
function (sourceBean) {
this.construct (sourceBean, false);
}, "~O");
Clazz.makeConstructor (c$, 
function (sourceBean, notifyOnEDT) {
Clazz.superConstructor (this, jsjavax.swing.event.SwingPropertyChangeSupport, [sourceBean]);
this.notifyOnEDT = notifyOnEDT;
}, "~O,~B");
Clazz.defineMethod (c$, "firePropertyChange", 
function (evt) {
if (evt == null) {
throw  new NullPointerException ();
}if (!this.isNotifyOnEDT () || jsjavax.swing.SwingUtilities.isEventDispatchThread ()) {
Clazz.superCall (this, jsjavax.swing.event.SwingPropertyChangeSupport, "firePropertyChange", [evt]);
} else {
jsjavax.swing.SwingUtilities.invokeLater (((Clazz.isClassDefined ("jsjavax.swing.event.SwingPropertyChangeSupport$1") ? 0 : jsjavax.swing.event.SwingPropertyChangeSupport.$SwingPropertyChangeSupport$1$ ()), Clazz.innerTypeInstance (jsjavax.swing.event.SwingPropertyChangeSupport$1, this, Clazz.cloneFinals ("evt", evt))));
}}, "jsjava.beans.PropertyChangeEvent");
Clazz.defineMethod (c$, "isNotifyOnEDT", 
function () {
return this.notifyOnEDT;
});
c$.$SwingPropertyChangeSupport$1$ = function () {
Clazz.pu$h ();
c$ = Clazz.declareAnonymous (jsjavax.swing.event, "SwingPropertyChangeSupport$1", null, Runnable);
Clazz.overrideMethod (c$, "run", 
function () {
this.b$["jsjavax.swing.event.SwingPropertyChangeSupport"].firePropertyChange (this.f$.evt);
});
c$ = Clazz.p0p ();
};
});

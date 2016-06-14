Clazz.declarePackage ("javax.swing.event");
Clazz.load (["java.beans.PropertyChangeSupport"], "javax.swing.event.SwingPropertyChangeSupport", ["java.lang.NullPointerException", "javax.swing.SwingUtilities"], function () {
c$ = Clazz.decorateAsClass (function () {
this.notifyOnEDT = false;
Clazz.instantialize (this, arguments);
}, javax.swing.event, "SwingPropertyChangeSupport", java.beans.PropertyChangeSupport);
Clazz.makeConstructor (c$, 
function (sourceBean) {
this.construct (sourceBean, false);
}, "~O");
Clazz.makeConstructor (c$, 
function (sourceBean, notifyOnEDT) {
Clazz.superConstructor (this, javax.swing.event.SwingPropertyChangeSupport, [sourceBean]);
this.notifyOnEDT = notifyOnEDT;
}, "~O,~B");
Clazz.defineMethod (c$, "firePropertyChangeEvt", 
function (evt) {
if (evt == null) {
throw  new NullPointerException ();
}if (!this.isNotifyOnEDT () || javax.swing.SwingUtilities.isEventDispatchThread ()) {
Clazz.superCall (this, javax.swing.event.SwingPropertyChangeSupport, "firePropertyChangeEvt", [evt]);
} else {
javax.swing.SwingUtilities.invokeLater (((Clazz.isClassDefined ("javax.swing.event.SwingPropertyChangeSupport$1") ? 0 : javax.swing.event.SwingPropertyChangeSupport.$SwingPropertyChangeSupport$1$ ()), Clazz.innerTypeInstance (javax.swing.event.SwingPropertyChangeSupport$1, this, Clazz.cloneFinals ("evt", evt))));
}}, "java.beans.PropertyChangeEvent");
Clazz.defineMethod (c$, "isNotifyOnEDT", 
function () {
return this.notifyOnEDT;
});
c$.$SwingPropertyChangeSupport$1$ = function () {
Clazz.pu$h(self.c$);
c$ = Clazz.declareAnonymous (javax.swing.event, "SwingPropertyChangeSupport$1", null, Runnable);
Clazz.overrideMethod (c$, "run", 
function () {
this.b$["javax.swing.event.SwingPropertyChangeSupport"].firePropertyChangeEvt (this.f$.evt);
});
c$ = Clazz.p0p ();
};
});

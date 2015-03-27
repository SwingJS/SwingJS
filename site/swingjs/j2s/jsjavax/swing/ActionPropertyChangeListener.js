Clazz.declarePackage ("jsjavax.swing");
Clazz.load (["java.lang.ref.WeakReference", "jsjava.beans.PropertyChangeListener"], "jsjavax.swing.ActionPropertyChangeListener", ["java.lang.ref.ReferenceQueue"], function () {
c$ = Clazz.decorateAsClass (function () {
this.target = null;
this.action = null;
Clazz.instantialize (this, arguments);
}, jsjavax.swing, "ActionPropertyChangeListener", null, jsjava.beans.PropertyChangeListener);
c$.getQueue = Clazz.defineMethod (c$, "getQueue", 
($fz = function () {
{
if (jsjavax.swing.ActionPropertyChangeListener.queue == null) {
jsjavax.swing.ActionPropertyChangeListener.queue =  new java.lang.ref.ReferenceQueue ();
}}return jsjavax.swing.ActionPropertyChangeListener.queue;
}, $fz.isPrivate = true, $fz));
Clazz.makeConstructor (c$, 
function (c, a) {
this.setTarget (c);
this.action = a;
}, "~O,jsjavax.swing.Action");
Clazz.overrideMethod (c$, "propertyChange", 
function (e) {
var target = this.getTarget ();
if (target == null) {
this.getAction ().removePropertyChangeListener (this);
} else {
this.actionPropertyChanged (target, this.getAction (), e);
}}, "jsjava.beans.PropertyChangeEvent");
Clazz.defineMethod (c$, "setTarget", 
($fz = function (c) {
var queue = jsjavax.swing.ActionPropertyChangeListener.getQueue ();
var r;
while ((r = queue.poll ()) != null) {
var oldPCL = r.getOwner ();
var oldAction = oldPCL.getAction ();
if (oldAction != null) {
oldAction.removePropertyChangeListener (oldPCL);
}}
this.target =  new jsjavax.swing.ActionPropertyChangeListener.OwnedWeakReference (c, queue, this);
}, $fz.isPrivate = true, $fz), "~O");
Clazz.defineMethod (c$, "getTarget", 
function () {
if (this.target == null) {
return null;
}return this.target.get ();
});
Clazz.defineMethod (c$, "getAction", 
function () {
return this.action;
});
Clazz.pu$h ();
c$ = Clazz.decorateAsClass (function () {
this.owner = null;
Clazz.instantialize (this, arguments);
}, jsjavax.swing.ActionPropertyChangeListener, "OwnedWeakReference", java.lang.ref.WeakReference);
Clazz.makeConstructor (c$, 
function (a, b, c) {
Clazz.superConstructor (this, jsjavax.swing.ActionPropertyChangeListener.OwnedWeakReference, [a, b]);
this.owner = c;
}, "~O,java.lang.ref.ReferenceQueue,jsjavax.swing.ActionPropertyChangeListener");
Clazz.defineMethod (c$, "getOwner", 
function () {
return this.owner;
});
c$ = Clazz.p0p ();
Clazz.defineStatics (c$,
"queue", null);
});

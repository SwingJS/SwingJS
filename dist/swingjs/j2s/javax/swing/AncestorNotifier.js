Clazz.declarePackage ("javax.swing");
Clazz.load (["java.awt.event.ComponentListener", "java.beans.PropertyChangeListener", "javax.swing.event.EventListenerList"], "javax.swing.AncestorNotifier", ["java.awt.Window", "javax.swing.JComponent", "javax.swing.event.AncestorEvent", "$.AncestorListener"], function () {
c$ = Clazz.decorateAsClass (function () {
this.firstInvisibleAncestor = null;
this.listenerList = null;
this.root = null;
Clazz.instantialize (this, arguments);
}, javax.swing, "AncestorNotifier", null, [java.awt.event.ComponentListener, java.beans.PropertyChangeListener]);
Clazz.prepareFields (c$, function () {
this.listenerList =  new javax.swing.event.EventListenerList ();
});
Clazz.makeConstructor (c$, 
function (root) {
this.root = root;
this.addListeners (root, true);
}, "javax.swing.JComponent");
Clazz.defineMethod (c$, "addAncestorListener", 
function (l) {
this.listenerList.add (javax.swing.event.AncestorListener, l);
}, "javax.swing.event.AncestorListener");
Clazz.defineMethod (c$, "removeAncestorListener", 
function (l) {
this.listenerList.remove (javax.swing.event.AncestorListener, l);
}, "javax.swing.event.AncestorListener");
Clazz.defineMethod (c$, "getAncestorListeners", 
function () {
return this.listenerList.getListeners (javax.swing.event.AncestorListener);
});
Clazz.defineMethod (c$, "fireAncestorAdded", 
function (source, id, ancestor, ancestorParent) {
var listeners = this.listenerList.getListenerList ();
for (var i = listeners.length - 2; i >= 0; i -= 2) {
if (listeners[i] === javax.swing.event.AncestorListener) {
var ancestorEvent =  new javax.swing.event.AncestorEvent (source, id, ancestor, ancestorParent);
(listeners[i + 1]).ancestorAdded (ancestorEvent);
}}
}, "javax.swing.JComponent,~N,java.awt.Container,java.awt.Container");
Clazz.defineMethod (c$, "fireAncestorRemoved", 
function (source, id, ancestor, ancestorParent) {
var listeners = this.listenerList.getListenerList ();
for (var i = listeners.length - 2; i >= 0; i -= 2) {
if (listeners[i] === javax.swing.event.AncestorListener) {
var ancestorEvent =  new javax.swing.event.AncestorEvent (source, id, ancestor, ancestorParent);
(listeners[i + 1]).ancestorRemoved (ancestorEvent);
}}
}, "javax.swing.JComponent,~N,java.awt.Container,java.awt.Container");
Clazz.defineMethod (c$, "fireAncestorMoved", 
function (source, id, ancestor, ancestorParent) {
var listeners = this.listenerList.getListenerList ();
for (var i = listeners.length - 2; i >= 0; i -= 2) {
if (listeners[i] === javax.swing.event.AncestorListener) {
var ancestorEvent =  new javax.swing.event.AncestorEvent (source, id, ancestor, ancestorParent);
(listeners[i + 1]).ancestorMoved (ancestorEvent);
}}
}, "javax.swing.JComponent,~N,java.awt.Container,java.awt.Container");
Clazz.defineMethod (c$, "removeAllListeners", 
function () {
this.removeListeners (this.root);
});
Clazz.defineMethod (c$, "addListeners", 
function (ancestor, addToFirst) {
var a;
this.firstInvisibleAncestor = null;
for (a = ancestor; this.firstInvisibleAncestor == null; a = a.getParent ()) {
if (addToFirst || a !== ancestor) {
a.addComponentListener (this);
if (Clazz.instanceOf (a, javax.swing.JComponent)) {
var jAncestor = a;
jAncestor.addPropertyChangeListener (this);
}}if (!a.isVisible () || a.getParent () == null || Clazz.instanceOf (a, java.awt.Window)) {
this.firstInvisibleAncestor = a;
}}
if (Clazz.instanceOf (this.firstInvisibleAncestor, java.awt.Window) && this.firstInvisibleAncestor.isVisible ()) {
this.firstInvisibleAncestor = null;
}}, "java.awt.Component,~B");
Clazz.defineMethod (c$, "removeListeners", 
function (ancestor) {
var a;
for (a = ancestor; a != null; a = a.getParent ()) {
a.removeComponentListener (this);
if (Clazz.instanceOf (a, javax.swing.JComponent)) {
var jAncestor = a;
jAncestor.removePropertyChangeListener (this);
}if (a === this.firstInvisibleAncestor || Clazz.instanceOf (a, java.awt.Window)) {
break;
}}
}, "java.awt.Component");
Clazz.overrideMethod (c$, "componentResized", 
function (e) {
}, "java.awt.event.ComponentEvent");
Clazz.overrideMethod (c$, "componentMoved", 
function (e) {
var source = e.getComponent ();
this.fireAncestorMoved (this.root, 3, source, source.getParent ());
}, "java.awt.event.ComponentEvent");
Clazz.overrideMethod (c$, "componentShown", 
function (e) {
var ancestor = e.getComponent ();
if (ancestor === this.firstInvisibleAncestor) {
this.addListeners (ancestor, false);
if (this.firstInvisibleAncestor == null) {
this.fireAncestorAdded (this.root, 1, ancestor, ancestor.getParent ());
}}}, "java.awt.event.ComponentEvent");
Clazz.overrideMethod (c$, "componentHidden", 
function (e) {
var ancestor = e.getComponent ();
var needsNotify = this.firstInvisibleAncestor == null;
if (!(Clazz.instanceOf (ancestor, java.awt.Window))) {
this.removeListeners (ancestor.getParent ());
}this.firstInvisibleAncestor = ancestor;
if (needsNotify) {
this.fireAncestorRemoved (this.root, 2, ancestor, ancestor.getParent ());
}}, "java.awt.event.ComponentEvent");
Clazz.overrideMethod (c$, "propertyChange", 
function (evt) {
var s = evt.getPropertyName ();
if (s != null && (s.equals ("parent") || s.equals ("ancestor"))) {
var component = evt.getSource ();
if (evt.getNewValue () != null) {
if (component === this.firstInvisibleAncestor) {
this.addListeners (component, false);
if (this.firstInvisibleAncestor == null) {
this.fireAncestorAdded (this.root, 1, component, component.getParent ());
}}} else {
var needsNotify = this.firstInvisibleAncestor == null;
var oldParent = evt.getOldValue ();
this.removeListeners (oldParent);
this.firstInvisibleAncestor = component;
if (needsNotify) {
this.fireAncestorRemoved (this.root, 2, component, oldParent);
}}}}, "java.beans.PropertyChangeEvent");
});

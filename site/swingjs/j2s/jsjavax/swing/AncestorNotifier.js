Clazz.declarePackage ("jsjavax.swing");
Clazz.load (["jsjava.awt.event.ComponentListener", "jsjava.beans.PropertyChangeListener", "jsjavax.swing.event.EventListenerList"], "jsjavax.swing.AncestorNotifier", ["jsjava.awt.Window", "jsjavax.swing.JComponent", "jsjavax.swing.event.AncestorEvent", "$.AncestorListener"], function () {
c$ = Clazz.decorateAsClass (function () {
this.firstInvisibleAncestor = null;
this.listenerList = null;
this.root = null;
Clazz.instantialize (this, arguments);
}, jsjavax.swing, "AncestorNotifier", null, [jsjava.awt.event.ComponentListener, jsjava.beans.PropertyChangeListener]);
Clazz.prepareFields (c$, function () {
this.listenerList =  new jsjavax.swing.event.EventListenerList ();
});
Clazz.makeConstructor (c$, 
function (root) {
this.root = root;
this.addListeners (root, true);
}, "jsjavax.swing.JComponent");
Clazz.defineMethod (c$, "addAncestorListener", 
function (l) {
this.listenerList.add (jsjavax.swing.event.AncestorListener, l);
}, "jsjavax.swing.event.AncestorListener");
Clazz.defineMethod (c$, "removeAncestorListener", 
function (l) {
this.listenerList.remove (jsjavax.swing.event.AncestorListener, l);
}, "jsjavax.swing.event.AncestorListener");
Clazz.defineMethod (c$, "getAncestorListeners", 
function () {
return this.listenerList.getListeners (jsjavax.swing.event.AncestorListener);
});
Clazz.defineMethod (c$, "fireAncestorAdded", 
function (source, id, ancestor, ancestorParent) {
var listeners = this.listenerList.getListenerList ();
for (var i = listeners.length - 2; i >= 0; i -= 2) {
if (listeners[i] === jsjavax.swing.event.AncestorListener) {
var ancestorEvent =  new jsjavax.swing.event.AncestorEvent (source, id, ancestor, ancestorParent);
(listeners[i + 1]).ancestorAdded (ancestorEvent);
}}
}, "jsjavax.swing.JComponent,~N,jsjava.awt.Container,jsjava.awt.Container");
Clazz.defineMethod (c$, "fireAncestorRemoved", 
function (source, id, ancestor, ancestorParent) {
var listeners = this.listenerList.getListenerList ();
for (var i = listeners.length - 2; i >= 0; i -= 2) {
if (listeners[i] === jsjavax.swing.event.AncestorListener) {
var ancestorEvent =  new jsjavax.swing.event.AncestorEvent (source, id, ancestor, ancestorParent);
(listeners[i + 1]).ancestorRemoved (ancestorEvent);
}}
}, "jsjavax.swing.JComponent,~N,jsjava.awt.Container,jsjava.awt.Container");
Clazz.defineMethod (c$, "fireAncestorMoved", 
function (source, id, ancestor, ancestorParent) {
var listeners = this.listenerList.getListenerList ();
for (var i = listeners.length - 2; i >= 0; i -= 2) {
if (listeners[i] === jsjavax.swing.event.AncestorListener) {
var ancestorEvent =  new jsjavax.swing.event.AncestorEvent (source, id, ancestor, ancestorParent);
(listeners[i + 1]).ancestorMoved (ancestorEvent);
}}
}, "jsjavax.swing.JComponent,~N,jsjava.awt.Container,jsjava.awt.Container");
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
if (Clazz.instanceOf (a, jsjavax.swing.JComponent)) {
var jAncestor = a;
jAncestor.addPropertyChangeListener (this);
}}if (!a.isVisible () || a.getParent () == null || Clazz.instanceOf (a, jsjava.awt.Window)) {
this.firstInvisibleAncestor = a;
}}
if (Clazz.instanceOf (this.firstInvisibleAncestor, jsjava.awt.Window) && this.firstInvisibleAncestor.isVisible ()) {
this.firstInvisibleAncestor = null;
}}, "jsjava.awt.Component,~B");
Clazz.defineMethod (c$, "removeListeners", 
function (ancestor) {
var a;
for (a = ancestor; a != null; a = a.getParent ()) {
a.removeComponentListener (this);
if (Clazz.instanceOf (a, jsjavax.swing.JComponent)) {
var jAncestor = a;
jAncestor.removePropertyChangeListener (this);
}if (a === this.firstInvisibleAncestor || Clazz.instanceOf (a, jsjava.awt.Window)) {
break;
}}
}, "jsjava.awt.Component");
Clazz.overrideMethod (c$, "componentResized", 
function (e) {
}, "jsjava.awt.event.ComponentEvent");
Clazz.overrideMethod (c$, "componentMoved", 
function (e) {
var source = e.getComponent ();
this.fireAncestorMoved (this.root, 3, source, source.getParent ());
}, "jsjava.awt.event.ComponentEvent");
Clazz.overrideMethod (c$, "componentShown", 
function (e) {
var ancestor = e.getComponent ();
if (ancestor === this.firstInvisibleAncestor) {
this.addListeners (ancestor, false);
if (this.firstInvisibleAncestor == null) {
this.fireAncestorAdded (this.root, 1, ancestor, ancestor.getParent ());
}}}, "jsjava.awt.event.ComponentEvent");
Clazz.overrideMethod (c$, "componentHidden", 
function (e) {
var ancestor = e.getComponent ();
var needsNotify = this.firstInvisibleAncestor == null;
if (!(Clazz.instanceOf (ancestor, jsjava.awt.Window))) {
this.removeListeners (ancestor.getParent ());
}this.firstInvisibleAncestor = ancestor;
if (needsNotify) {
this.fireAncestorRemoved (this.root, 2, ancestor, ancestor.getParent ());
}}, "jsjava.awt.event.ComponentEvent");
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
}}}}, "jsjava.beans.PropertyChangeEvent");
});

Clazz.declarePackage ("jsjavax.swing");
Clazz.load (["jsjavax.swing.ListModel", "jsjavax.swing.event.EventListenerList"], "jsjavax.swing.AbstractListModel", ["jsjavax.swing.event.ListDataEvent", "$.ListDataListener"], function () {
c$ = Clazz.decorateAsClass (function () {
this.listenerList = null;
Clazz.instantialize (this, arguments);
}, jsjavax.swing, "AbstractListModel", null, jsjavax.swing.ListModel);
Clazz.prepareFields (c$, function () {
this.listenerList =  new jsjavax.swing.event.EventListenerList ();
});
Clazz.overrideMethod (c$, "addListDataListener", 
function (l) {
this.listenerList.add (jsjavax.swing.event.ListDataListener, l);
}, "jsjavax.swing.event.ListDataListener");
Clazz.overrideMethod (c$, "removeListDataListener", 
function (l) {
this.listenerList.remove (jsjavax.swing.event.ListDataListener, l);
}, "jsjavax.swing.event.ListDataListener");
Clazz.defineMethod (c$, "getListDataListeners", 
function () {
return this.listenerList.getListeners (jsjavax.swing.event.ListDataListener);
});
Clazz.defineMethod (c$, "fireContentsChanged", 
function (source, index0, index1) {
var listeners = this.listenerList.getListenerList ();
var e = null;
for (var i = listeners.length - 2; i >= 0; i -= 2) {
if (listeners[i] === jsjavax.swing.event.ListDataListener) {
if (e == null) {
e =  new jsjavax.swing.event.ListDataEvent (source, 0, index0, index1);
}(listeners[i + 1]).contentsChanged (e);
}}
}, "~O,~N,~N");
Clazz.defineMethod (c$, "fireIntervalAdded", 
function (source, index0, index1) {
var listeners = this.listenerList.getListenerList ();
var e = null;
for (var i = listeners.length - 2; i >= 0; i -= 2) {
if (listeners[i] === jsjavax.swing.event.ListDataListener) {
if (e == null) {
e =  new jsjavax.swing.event.ListDataEvent (source, 1, index0, index1);
}(listeners[i + 1]).intervalAdded (e);
}}
}, "~O,~N,~N");
Clazz.defineMethod (c$, "fireIntervalRemoved", 
function (source, index0, index1) {
var listeners = this.listenerList.getListenerList ();
var e = null;
for (var i = listeners.length - 2; i >= 0; i -= 2) {
if (listeners[i] === jsjavax.swing.event.ListDataListener) {
if (e == null) {
e =  new jsjavax.swing.event.ListDataEvent (source, 2, index0, index1);
}(listeners[i + 1]).intervalRemoved (e);
}}
}, "~O,~N,~N");
Clazz.defineMethod (c$, "getListeners", 
function (listenerType) {
return this.listenerList.getListeners (listenerType);
}, "Class");
});

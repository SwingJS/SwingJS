Clazz.declarePackage ("jsjavax.swing");
Clazz.load (["jsjavax.swing.event.EventListenerList"], "jsjavax.swing.RowSorter", ["java.lang.IllegalArgumentException", "jsjavax.swing.event.RowSorterEvent", "$.RowSorterListener"], function () {
c$ = Clazz.decorateAsClass (function () {
this.listenerList = null;
Clazz.instantialize (this, arguments);
}, jsjavax.swing, "RowSorter");
Clazz.prepareFields (c$, function () {
this.listenerList =  new jsjavax.swing.event.EventListenerList ();
});
Clazz.makeConstructor (c$, 
function () {
});
Clazz.defineMethod (c$, "addRowSorterListener", 
function (l) {
this.listenerList.add (jsjavax.swing.event.RowSorterListener, l);
}, "jsjavax.swing.event.RowSorterListener");
Clazz.defineMethod (c$, "removeRowSorterListener", 
function (l) {
this.listenerList.remove (jsjavax.swing.event.RowSorterListener, l);
}, "jsjavax.swing.event.RowSorterListener");
Clazz.defineMethod (c$, "fireSortOrderChanged", 
function () {
this.fireRowSorterChanged ( new jsjavax.swing.event.RowSorterEvent (this));
});
Clazz.defineMethod (c$, "fireRowSorterChanged", 
function (lastRowIndexToModel) {
this.fireRowSorterChanged ( new jsjavax.swing.event.RowSorterEvent (this, jsjavax.swing.event.RowSorterEvent.Type.SORTED, lastRowIndexToModel));
}, "~A");
Clazz.defineMethod (c$, "fireRowSorterChanged", 
function (event) {
var listeners = this.listenerList.getListenerList ();
for (var i = listeners.length - 2; i >= 0; i -= 2) {
if (listeners[i] === jsjavax.swing.event.RowSorterListener) {
(listeners[i + 1]).sorterChanged (event);
}}
}, "jsjavax.swing.event.RowSorterEvent");
Clazz.pu$h ();
c$ = Clazz.decorateAsClass (function () {
this.column = 0;
this.sortOrder = null;
Clazz.instantialize (this, arguments);
}, jsjavax.swing.RowSorter, "SortKey");
Clazz.makeConstructor (c$, 
function (a, b) {
if (b == null) {
throw  new IllegalArgumentException ("sort order must be non-null");
}this.column = a;
this.sortOrder = b;
}, "~N,jsjavax.swing.SortOrder");
Clazz.defineMethod (c$, "getColumn", 
function () {
return this.column;
});
Clazz.defineMethod (c$, "getSortOrder", 
function () {
return this.sortOrder;
});
Clazz.overrideMethod (c$, "hashCode", 
function () {
var a = 17;
a = 37 * a + this.column;
a = 37 * a + this.sortOrder.hashCode ();
return a;
});
Clazz.overrideMethod (c$, "equals", 
function (a) {
if (a === this) {
return true;
}if (Clazz.instanceOf (a, jsjavax.swing.RowSorter.SortKey)) {
return ((a).column == this.column && (a).sortOrder === this.sortOrder);
}return false;
}, "~O");
c$ = Clazz.p0p ();
});

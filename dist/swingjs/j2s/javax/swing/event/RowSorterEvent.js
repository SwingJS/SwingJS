Clazz.declarePackage ("javax.swing.event");
Clazz.load (["java.lang.Enum", "java.util.EventObject"], "javax.swing.event.RowSorterEvent", ["java.lang.IllegalArgumentException"], function () {
c$ = Clazz.decorateAsClass (function () {
this.type = null;
this.oldViewToModel = null;
Clazz.instantialize (this, arguments);
}, javax.swing.event, "RowSorterEvent", java.util.EventObject);
Clazz.makeConstructor (c$, 
function (source) {
this.construct (source, javax.swing.event.RowSorterEvent.Type.SORT_ORDER_CHANGED, null);
}, "javax.swing.RowSorter");
Clazz.makeConstructor (c$, 
function (source, type, previousRowIndexToModel) {
Clazz.superConstructor (this, javax.swing.event.RowSorterEvent, [source]);
if (type == null) {
throw  new IllegalArgumentException ("type must be non-null");
}this.type = type;
this.oldViewToModel = previousRowIndexToModel;
}, "javax.swing.RowSorter,javax.swing.event.RowSorterEvent.Type,~A");
Clazz.defineMethod (c$, "getSource", 
function () {
return Clazz.superCall (this, javax.swing.event.RowSorterEvent, "getSource", []);
});
Clazz.defineMethod (c$, "getType", 
function () {
return this.type;
});
Clazz.defineMethod (c$, "convertPreviousRowIndexToModel", 
function (index) {
if (this.oldViewToModel != null && index >= 0 && index < this.oldViewToModel.length) {
return this.oldViewToModel[index];
}return -1;
}, "~N");
Clazz.defineMethod (c$, "getPreviousRowCount", 
function () {
return (this.oldViewToModel == null) ? 0 : this.oldViewToModel.length;
});
Clazz.pu$h(self.c$);
c$ = Clazz.declareType (javax.swing.event.RowSorterEvent, "Type", Enum);
Clazz.defineEnumConstant (c$, "SORT_ORDER_CHANGED", 0, []);
Clazz.defineEnumConstant (c$, "SORTED", 1, []);
c$ = Clazz.p0p ();
});

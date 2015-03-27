Clazz.declarePackage ("jsjavax.swing.event");
Clazz.load (["java.util.EventObject"], "jsjavax.swing.event.TableColumnModelEvent", null, function () {
c$ = Clazz.decorateAsClass (function () {
this.fromIndex = 0;
this.toIndex = 0;
Clazz.instantialize (this, arguments);
}, jsjavax.swing.event, "TableColumnModelEvent", java.util.EventObject);
Clazz.makeConstructor (c$, 
function (source, from, to) {
Clazz.superConstructor (this, jsjavax.swing.event.TableColumnModelEvent, [source]);
this.fromIndex = from;
this.toIndex = to;
}, "jsjavax.swing.table.TableColumnModel,~N,~N");
Clazz.defineMethod (c$, "getFromIndex", 
function () {
return this.fromIndex;
});
Clazz.defineMethod (c$, "getToIndex", 
function () {
return this.toIndex;
});
});

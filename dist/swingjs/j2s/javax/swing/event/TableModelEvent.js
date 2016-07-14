Clazz.declarePackage ("javax.swing.event");
Clazz.load (["java.util.EventObject"], "javax.swing.event.TableModelEvent", null, function () {
c$ = Clazz.decorateAsClass (function () {
this.type = 0;
this.firstRow = 0;
this.lastRow = 0;
this.column = 0;
Clazz.instantialize (this, arguments);
}, javax.swing.event, "TableModelEvent", java.util.EventObject);
Clazz.makeConstructor (c$, 
function (source) {
this.construct (source, 0, 2147483647, -1, 0);
}, "javax.swing.table.TableModel");
Clazz.makeConstructor (c$, 
function (source, row) {
this.construct (source, row, row, -1, 0);
}, "javax.swing.table.TableModel,~N");
Clazz.makeConstructor (c$, 
function (source, firstRow, lastRow) {
this.construct (source, firstRow, lastRow, -1, 0);
}, "javax.swing.table.TableModel,~N,~N");
Clazz.makeConstructor (c$, 
function (source, firstRow, lastRow, column) {
this.construct (source, firstRow, lastRow, column, 0);
}, "javax.swing.table.TableModel,~N,~N,~N");
Clazz.makeConstructor (c$, 
function (source, firstRow, lastRow, column, type) {
Clazz.superConstructor (this, javax.swing.event.TableModelEvent, [source]);
this.firstRow = firstRow;
this.lastRow = lastRow;
this.column = column;
this.type = type;
}, "javax.swing.table.TableModel,~N,~N,~N,~N");
Clazz.defineMethod (c$, "getFirstRow", 
function () {
return this.firstRow;
});
Clazz.defineMethod (c$, "getLastRow", 
function () {
return this.lastRow;
});
Clazz.defineMethod (c$, "getColumn", 
function () {
return this.column;
});
Clazz.defineMethod (c$, "getType", 
function () {
return this.type;
});
Clazz.defineStatics (c$,
"INSERT", 1,
"UPDATE", 0,
"DELETE", -1,
"HEADER_ROW", -1,
"ALL_COLUMNS", -1);
});

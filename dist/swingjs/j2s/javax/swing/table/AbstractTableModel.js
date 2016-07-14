Clazz.declarePackage ("javax.swing.table");
Clazz.load (["javax.swing.table.TableModel", "javax.swing.event.EventListenerList"], "javax.swing.table.AbstractTableModel", ["javax.swing.event.TableModelEvent", "$.TableModelListener"], function () {
c$ = Clazz.decorateAsClass (function () {
this.listenerList = null;
Clazz.instantialize (this, arguments);
}, javax.swing.table, "AbstractTableModel", null, javax.swing.table.TableModel);
Clazz.prepareFields (c$, function () {
this.listenerList =  new javax.swing.event.EventListenerList ();
});
Clazz.overrideMethod (c$, "getColumnName", 
function (column) {
var result = "";
for (; column >= 0; column = Clazz.doubleToInt (column / 26) - 1) {
result = String.fromCharCode ((String.fromCharCode (column % 26)).charCodeAt (0) + 65) + result;
}
return result;
}, "~N");
Clazz.defineMethod (c$, "findColumn", 
function (columnName) {
for (var i = 0; i < this.getColumnCount (); i++) {
if (columnName.equals (this.getColumnName (i))) {
return i;
}}
return -1;
}, "~S");
Clazz.overrideMethod (c$, "getColumnClass", 
function (columnIndex) {
return Clazz._O;
}, "~N");
Clazz.overrideMethod (c$, "isCellEditable", 
function (rowIndex, columnIndex) {
return false;
}, "~N,~N");
Clazz.overrideMethod (c$, "setValueAt", 
function (aValue, rowIndex, columnIndex) {
}, "~O,~N,~N");
Clazz.overrideMethod (c$, "addTableModelListener", 
function (l) {
this.listenerList.add (javax.swing.event.TableModelListener, l);
}, "javax.swing.event.TableModelListener");
Clazz.overrideMethod (c$, "removeTableModelListener", 
function (l) {
this.listenerList.remove (javax.swing.event.TableModelListener, l);
}, "javax.swing.event.TableModelListener");
Clazz.defineMethod (c$, "getTableModelListeners", 
function () {
return this.listenerList.getListeners (javax.swing.event.TableModelListener);
});
Clazz.defineMethod (c$, "fireTableDataChanged", 
function () {
this.fireTableChanged ( new javax.swing.event.TableModelEvent (this));
});
Clazz.defineMethod (c$, "fireTableStructureChanged", 
function () {
this.fireTableChanged ( new javax.swing.event.TableModelEvent (this, -1));
});
Clazz.defineMethod (c$, "fireTableRowsInserted", 
function (firstRow, lastRow) {
this.fireTableChanged ( new javax.swing.event.TableModelEvent (this, firstRow, lastRow, -1, 1));
}, "~N,~N");
Clazz.defineMethod (c$, "fireTableRowsUpdated", 
function (firstRow, lastRow) {
this.fireTableChanged ( new javax.swing.event.TableModelEvent (this, firstRow, lastRow, -1, 0));
}, "~N,~N");
Clazz.defineMethod (c$, "fireTableRowsDeleted", 
function (firstRow, lastRow) {
this.fireTableChanged ( new javax.swing.event.TableModelEvent (this, firstRow, lastRow, -1, -1));
}, "~N,~N");
Clazz.defineMethod (c$, "fireTableCellUpdated", 
function (row, column) {
this.fireTableChanged ( new javax.swing.event.TableModelEvent (this, row, row, column));
}, "~N,~N");
Clazz.defineMethod (c$, "fireTableChanged", 
function (e) {
var listeners = this.listenerList.getListenerList ();
for (var i = listeners.length - 2; i >= 0; i -= 2) {
if (listeners[i] === javax.swing.event.TableModelListener) {
(listeners[i + 1]).tableChanged (e);
}}
}, "javax.swing.event.TableModelEvent");
Clazz.defineMethod (c$, "getListeners", 
function (listenerType) {
return this.listenerList.getListeners (listenerType);
}, "Class");
});

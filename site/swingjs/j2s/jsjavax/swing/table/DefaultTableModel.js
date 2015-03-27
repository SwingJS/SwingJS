Clazz.declarePackage ("jsjavax.swing.table");
Clazz.load (["jsjavax.swing.table.AbstractTableModel"], "jsjavax.swing.table.DefaultTableModel", ["java.util.Vector"], function () {
c$ = Clazz.decorateAsClass (function () {
this.dataVector = null;
this.columnIdentifiers = null;
Clazz.instantialize (this, arguments);
}, jsjavax.swing.table, "DefaultTableModel", jsjavax.swing.table.AbstractTableModel);
Clazz.makeConstructor (c$, 
function () {
this.construct (0, 0);
});
c$.newVector = Clazz.defineMethod (c$, "newVector", 
($fz = function (size) {
var v =  new java.util.Vector (size);
v.setSize (size);
return v;
}, $fz.isPrivate = true, $fz), "~N");
Clazz.makeConstructor (c$, 
function (rowCount, columnCount) {
this.construct (jsjavax.swing.table.DefaultTableModel.newVector (columnCount), rowCount);
}, "~N,~N");
Clazz.makeConstructor (c$, 
function (columnNames, rowCount) {
Clazz.superConstructor (this, jsjavax.swing.table.DefaultTableModel, []);
this.setDataVector (jsjavax.swing.table.DefaultTableModel.newVector (rowCount), columnNames);
}, "java.util.Vector,~N");
Clazz.makeConstructor (c$, 
function (columnNames, rowCount) {
this.construct (jsjavax.swing.table.DefaultTableModel.convertToVector (columnNames), rowCount);
}, "~A,~N");
Clazz.makeConstructor (c$, 
function (data, columnNames) {
Clazz.superConstructor (this, jsjavax.swing.table.DefaultTableModel, []);
this.setDataVector (data, columnNames);
}, "java.util.Vector,java.util.Vector");
Clazz.makeConstructor (c$, 
function (data, columnNames) {
Clazz.superConstructor (this, jsjavax.swing.table.DefaultTableModel, []);
this.setDataVector (data, columnNames);
}, "~A,~A");
Clazz.defineMethod (c$, "getDataVector", 
function () {
return this.dataVector;
});
c$.nonNullVector = Clazz.defineMethod (c$, "nonNullVector", 
($fz = function (v) {
return (v != null) ? v :  new java.util.Vector ();
}, $fz.isPrivate = true, $fz), "java.util.Vector");
Clazz.defineMethod (c$, "setDataVector", 
function (dataVector, columnIdentifiers) {
this.dataVector = jsjavax.swing.table.DefaultTableModel.nonNullVector (dataVector);
this.columnIdentifiers = jsjavax.swing.table.DefaultTableModel.nonNullVector (columnIdentifiers);
this.justifyRows (0, this.getRowCount ());
this.fireTableStructureChanged ();
}, "java.util.Vector,java.util.Vector");
Clazz.defineMethod (c$, "setDataVector", 
function (dataVector, columnIdentifiers) {
this.setDataVector (jsjavax.swing.table.DefaultTableModel.convertToVector (dataVector), jsjavax.swing.table.DefaultTableModel.convertToVector (columnIdentifiers));
}, "~A,~A");
Clazz.defineMethod (c$, "newDataAvailable", 
function (event) {
this.fireTableChanged (event);
}, "jsjavax.swing.event.TableModelEvent");
Clazz.defineMethod (c$, "justifyRows", 
($fz = function (from, to) {
this.dataVector.setSize (this.getRowCount ());
for (var i = from; i < to; i++) {
if (this.dataVector.elementAt (i) == null) {
this.dataVector.setElementAt ( new java.util.Vector (), i);
}(this.dataVector.elementAt (i)).setSize (this.getColumnCount ());
}
}, $fz.isPrivate = true, $fz), "~N,~N");
Clazz.defineMethod (c$, "newRowsAdded", 
function (e) {
this.justifyRows (e.getFirstRow (), e.getLastRow () + 1);
this.fireTableChanged (e);
}, "jsjavax.swing.event.TableModelEvent");
Clazz.defineMethod (c$, "rowsRemoved", 
function (event) {
this.fireTableChanged (event);
}, "jsjavax.swing.event.TableModelEvent");
Clazz.defineMethod (c$, "setNumRows", 
function (rowCount) {
var old = this.getRowCount ();
if (old == rowCount) {
return;
}this.dataVector.setSize (rowCount);
if (rowCount <= old) {
this.fireTableRowsDeleted (rowCount, old - 1);
} else {
this.justifyRows (old, rowCount);
this.fireTableRowsInserted (old, rowCount - 1);
}}, "~N");
Clazz.defineMethod (c$, "setRowCount", 
function (rowCount) {
this.setNumRows (rowCount);
}, "~N");
Clazz.defineMethod (c$, "addRow", 
function (rowData) {
this.insertRow (this.getRowCount (), rowData);
}, "java.util.Vector");
Clazz.defineMethod (c$, "addRow", 
function (rowData) {
this.addRow (jsjavax.swing.table.DefaultTableModel.convertToVector (rowData));
}, "~A");
Clazz.defineMethod (c$, "insertRow", 
function (row, rowData) {
this.dataVector.insertElementAt (rowData, row);
this.justifyRows (row, row + 1);
this.fireTableRowsInserted (row, row);
}, "~N,java.util.Vector");
Clazz.defineMethod (c$, "insertRow", 
function (row, rowData) {
this.insertRow (row, jsjavax.swing.table.DefaultTableModel.convertToVector (rowData));
}, "~N,~A");
c$.gcd = Clazz.defineMethod (c$, "gcd", 
($fz = function (i, j) {
return (j == 0) ? i : jsjavax.swing.table.DefaultTableModel.gcd (j, i % j);
}, $fz.isPrivate = true, $fz), "~N,~N");
c$.rotate = Clazz.defineMethod (c$, "rotate", 
($fz = function (v, a, b, shift) {
var size = b - a;
var r = size - shift;
var g = jsjavax.swing.table.DefaultTableModel.gcd (size, r);
for (var i = 0; i < g; i++) {
var to = i;
var tmp = v.elementAt (a + to);
for (var from = (to + r) % size; from != i; from = (to + r) % size) {
v.setElementAt (v.elementAt (a + from), a + to);
to = from;
}
v.setElementAt (tmp, a + to);
}
}, $fz.isPrivate = true, $fz), "java.util.Vector,~N,~N,~N");
Clazz.defineMethod (c$, "moveRow", 
function (start, end, to) {
var shift = to - start;
var first;
var last;
if (shift < 0) {
first = to;
last = end;
} else {
first = start;
last = to + end - start;
}jsjavax.swing.table.DefaultTableModel.rotate (this.dataVector, first, last + 1, shift);
this.fireTableRowsUpdated (first, last);
}, "~N,~N,~N");
Clazz.defineMethod (c$, "removeRow", 
function (row) {
this.dataVector.removeElementAt (row);
this.fireTableRowsDeleted (row, row);
}, "~N");
Clazz.defineMethod (c$, "setColumnIdentifiers", 
function (columnIdentifiers) {
this.setDataVector (this.dataVector, columnIdentifiers);
}, "java.util.Vector");
Clazz.defineMethod (c$, "setColumnIdentifiers", 
function (newIdentifiers) {
this.setColumnIdentifiers (jsjavax.swing.table.DefaultTableModel.convertToVector (newIdentifiers));
}, "~A");
Clazz.defineMethod (c$, "setColumnCount", 
function (columnCount) {
this.columnIdentifiers.setSize (columnCount);
this.justifyRows (0, this.getRowCount ());
this.fireTableStructureChanged ();
}, "~N");
Clazz.defineMethod (c$, "addColumn", 
function (columnName) {
this.addColumn (columnName, Clazz.castNullAs ("java.util.Vector"));
}, "~O");
Clazz.defineMethod (c$, "addColumn", 
function (columnName, columnData) {
this.columnIdentifiers.addElement (columnName);
if (columnData != null) {
var columnSize = columnData.size ();
if (columnSize > this.getRowCount ()) {
this.dataVector.setSize (columnSize);
}this.justifyRows (0, this.getRowCount ());
var newColumn = this.getColumnCount () - 1;
for (var i = 0; i < columnSize; i++) {
var row = this.dataVector.elementAt (i);
row.setElementAt (columnData.elementAt (i), newColumn);
}
} else {
this.justifyRows (0, this.getRowCount ());
}this.fireTableStructureChanged ();
}, "~O,java.util.Vector");
Clazz.defineMethod (c$, "addColumn", 
function (columnName, columnData) {
this.addColumn (columnName, jsjavax.swing.table.DefaultTableModel.convertToVector (columnData));
}, "~O,~A");
Clazz.overrideMethod (c$, "getRowCount", 
function () {
return this.dataVector.size ();
});
Clazz.overrideMethod (c$, "getColumnCount", 
function () {
return this.columnIdentifiers.size ();
});
Clazz.defineMethod (c$, "getColumnName", 
function (column) {
var id = null;
if (column < this.columnIdentifiers.size () && (column >= 0)) {
id = this.columnIdentifiers.elementAt (column);
}return (id == null) ? Clazz.superCall (this, jsjavax.swing.table.DefaultTableModel, "getColumnName", [column]) : id.toString ();
}, "~N");
Clazz.overrideMethod (c$, "isCellEditable", 
function (row, column) {
return true;
}, "~N,~N");
Clazz.overrideMethod (c$, "getValueAt", 
function (row, column) {
var rowVector = this.dataVector.elementAt (row);
return rowVector.elementAt (column);
}, "~N,~N");
Clazz.overrideMethod (c$, "setValueAt", 
function (aValue, row, column) {
var rowVector = this.dataVector.elementAt (row);
rowVector.setElementAt (aValue, column);
this.fireTableCellUpdated (row, column);
}, "~O,~N,~N");
c$.convertToVector = Clazz.defineMethod (c$, "convertToVector", 
function (anArray) {
if (anArray == null) {
return null;
}var v =  new java.util.Vector (anArray.length);
for (var i = 0; i < anArray.length; i++) {
v.addElement (anArray[i]);
}
return v;
}, "~A");
c$.convertToVector = Clazz.defineMethod (c$, "convertToVector", 
function (anArray) {
if (anArray == null) {
return null;
}var v =  new java.util.Vector (anArray.length);
for (var i = 0; i < anArray.length; i++) {
v.addElement (jsjavax.swing.table.DefaultTableModel.convertToVector (anArray[i]));
}
return v;
}, "~A");
});

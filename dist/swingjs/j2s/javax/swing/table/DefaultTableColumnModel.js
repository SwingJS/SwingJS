Clazz.declarePackage ("javax.swing.table");
Clazz.load (["java.beans.PropertyChangeListener", "javax.swing.event.ListSelectionListener", "javax.swing.table.TableColumnModel", "javax.swing.event.EventListenerList"], "javax.swing.table.DefaultTableColumnModel", ["java.lang.IllegalArgumentException", "java.util.Vector", "javax.swing.DefaultListSelectionModel", "javax.swing.event.ChangeEvent", "$.TableColumnModelEvent", "$.TableColumnModelListener"], function () {
c$ = Clazz.decorateAsClass (function () {
this.tableColumns = null;
this.selectionModel = null;
this.columnMargin = 0;
this.listenerList = null;
this.changeEvent = null;
this.columnSelectionAllowed = false;
this.totalColumnWidth = 0;
Clazz.instantialize (this, arguments);
}, javax.swing.table, "DefaultTableColumnModel", null, [javax.swing.table.TableColumnModel, java.beans.PropertyChangeListener, javax.swing.event.ListSelectionListener]);
Clazz.prepareFields (c$, function () {
this.listenerList =  new javax.swing.event.EventListenerList ();
});
Clazz.makeConstructor (c$, 
function () {
this.tableColumns =  new java.util.Vector ();
this.setSelectionModel (this.createSelectionModel ());
this.setColumnMargin (1);
this.invalidateWidthCache ();
this.setColumnSelectionAllowed (false);
});
Clazz.overrideMethod (c$, "addColumn", 
function (aColumn) {
if (aColumn == null) {
throw  new IllegalArgumentException ("Object is null");
}this.tableColumns.addElement (aColumn);
aColumn.addPropertyChangeListener (this);
this.invalidateWidthCache ();
this.fireColumnAdded ( new javax.swing.event.TableColumnModelEvent (this, 0, this.getColumnCount () - 1));
}, "javax.swing.table.TableColumn");
Clazz.overrideMethod (c$, "removeColumn", 
function (column) {
var columnIndex = this.tableColumns.indexOf (column);
if (columnIndex != -1) {
if (this.selectionModel != null) {
this.selectionModel.removeIndexInterval (columnIndex, columnIndex);
}column.removePropertyChangeListener (this);
this.tableColumns.removeElementAt (columnIndex);
this.invalidateWidthCache ();
this.fireColumnRemoved ( new javax.swing.event.TableColumnModelEvent (this, columnIndex, 0));
}}, "javax.swing.table.TableColumn");
Clazz.overrideMethod (c$, "moveColumn", 
function (columnIndex, newIndex) {
if ((columnIndex < 0) || (columnIndex >= this.getColumnCount ()) || (newIndex < 0) || (newIndex >= this.getColumnCount ())) throw  new IllegalArgumentException ("moveColumn() - Index out of range");
var aColumn;
if (columnIndex == newIndex) {
this.fireColumnMoved ( new javax.swing.event.TableColumnModelEvent (this, columnIndex, newIndex));
return;
}aColumn = this.tableColumns.elementAt (columnIndex);
this.tableColumns.removeElementAt (columnIndex);
var selected = this.selectionModel.isSelectedIndex (columnIndex);
this.selectionModel.removeIndexInterval (columnIndex, columnIndex);
this.tableColumns.insertElementAt (aColumn, newIndex);
this.selectionModel.insertIndexInterval (newIndex, 1, true);
if (selected) {
this.selectionModel.addSelectionInterval (newIndex, newIndex);
} else {
this.selectionModel.removeSelectionInterval (newIndex, newIndex);
}this.fireColumnMoved ( new javax.swing.event.TableColumnModelEvent (this, columnIndex, newIndex));
}, "~N,~N");
Clazz.overrideMethod (c$, "setColumnMargin", 
function (newMargin) {
if (newMargin != this.columnMargin) {
this.columnMargin = newMargin;
this.fireColumnMarginChanged ();
}}, "~N");
Clazz.overrideMethod (c$, "getColumnCount", 
function () {
return this.tableColumns.size ();
});
Clazz.overrideMethod (c$, "getColumns", 
function () {
return this.tableColumns.elements ();
});
Clazz.overrideMethod (c$, "getColumnIndex", 
function (identifier) {
if (identifier == null) {
throw  new IllegalArgumentException ("Identifier is null");
}var enumeration = this.getColumns ();
var aColumn;
var index = 0;
while (enumeration.hasMoreElements ()) {
aColumn = enumeration.nextElement ();
if (identifier.equals (aColumn.getIdentifier ())) return index;
index++;
}
throw  new IllegalArgumentException ("Identifier not found");
}, "~O");
Clazz.overrideMethod (c$, "getColumn", 
function (columnIndex) {
return this.tableColumns.elementAt (columnIndex);
}, "~N");
Clazz.overrideMethod (c$, "getColumnMargin", 
function () {
return this.columnMargin;
});
Clazz.overrideMethod (c$, "getColumnIndexAtX", 
function (x) {
if (x < 0) {
return -1;
}var cc = this.getColumnCount ();
for (var column = 0; column < cc; column++) {
x = x - this.getColumn (column).getWidth ();
if (x < 0) {
return column;
}}
return -1;
}, "~N");
Clazz.overrideMethod (c$, "getTotalColumnWidth", 
function () {
if (this.totalColumnWidth == -1) {
this.recalcWidthCache ();
}return this.totalColumnWidth;
});
Clazz.overrideMethod (c$, "setSelectionModel", 
function (newModel) {
if (newModel == null) {
throw  new IllegalArgumentException ("Cannot set a null SelectionModel");
}var oldModel = this.selectionModel;
if (newModel !== oldModel) {
if (oldModel != null) {
oldModel.removeListSelectionListener (this);
}this.selectionModel = newModel;
newModel.addListSelectionListener (this);
}}, "javax.swing.ListSelectionModel");
Clazz.overrideMethod (c$, "getSelectionModel", 
function () {
return this.selectionModel;
});
Clazz.overrideMethod (c$, "setColumnSelectionAllowed", 
function (flag) {
this.columnSelectionAllowed = flag;
}, "~B");
Clazz.overrideMethod (c$, "getColumnSelectionAllowed", 
function () {
return this.columnSelectionAllowed;
});
Clazz.overrideMethod (c$, "getSelectedColumns", 
function () {
if (this.selectionModel != null) {
var iMin = this.selectionModel.getMinSelectionIndex ();
var iMax = this.selectionModel.getMaxSelectionIndex ();
if ((iMin == -1) || (iMax == -1)) {
return  Clazz.newIntArray (0, 0);
}var rvTmp =  Clazz.newIntArray (1 + (iMax - iMin), 0);
var n = 0;
for (var i = iMin; i <= iMax; i++) {
if (this.selectionModel.isSelectedIndex (i)) {
rvTmp[n++] = i;
}}
var rv =  Clazz.newIntArray (n, 0);
System.arraycopy (rvTmp, 0, rv, 0, n);
return rv;
}return  Clazz.newIntArray (0, 0);
});
Clazz.overrideMethod (c$, "getSelectedColumnCount", 
function () {
if (this.selectionModel != null) {
var iMin = this.selectionModel.getMinSelectionIndex ();
var iMax = this.selectionModel.getMaxSelectionIndex ();
var count = 0;
for (var i = iMin; i <= iMax; i++) {
if (this.selectionModel.isSelectedIndex (i)) {
count++;
}}
return count;
}return 0;
});
Clazz.overrideMethod (c$, "addColumnModelListener", 
function (x) {
this.listenerList.add (javax.swing.event.TableColumnModelListener, x);
}, "javax.swing.event.TableColumnModelListener");
Clazz.overrideMethod (c$, "removeColumnModelListener", 
function (x) {
this.listenerList.remove (javax.swing.event.TableColumnModelListener, x);
}, "javax.swing.event.TableColumnModelListener");
Clazz.defineMethod (c$, "getColumnModelListeners", 
function () {
return this.listenerList.getListeners (javax.swing.event.TableColumnModelListener);
});
Clazz.defineMethod (c$, "fireColumnAdded", 
function (e) {
var listeners = this.listenerList.getListenerList ();
for (var i = listeners.length - 2; i >= 0; i -= 2) {
if (listeners[i] === javax.swing.event.TableColumnModelListener) {
(listeners[i + 1]).columnAdded (e);
}}
}, "javax.swing.event.TableColumnModelEvent");
Clazz.defineMethod (c$, "fireColumnRemoved", 
function (e) {
var listeners = this.listenerList.getListenerList ();
for (var i = listeners.length - 2; i >= 0; i -= 2) {
if (listeners[i] === javax.swing.event.TableColumnModelListener) {
(listeners[i + 1]).columnRemoved (e);
}}
}, "javax.swing.event.TableColumnModelEvent");
Clazz.defineMethod (c$, "fireColumnMoved", 
function (e) {
var listeners = this.listenerList.getListenerList ();
for (var i = listeners.length - 2; i >= 0; i -= 2) {
if (listeners[i] === javax.swing.event.TableColumnModelListener) {
(listeners[i + 1]).columnMoved (e);
}}
}, "javax.swing.event.TableColumnModelEvent");
Clazz.defineMethod (c$, "fireColumnSelectionChanged", 
function (e) {
var listeners = this.listenerList.getListenerList ();
for (var i = listeners.length - 2; i >= 0; i -= 2) {
if (listeners[i] === javax.swing.event.TableColumnModelListener) {
(listeners[i + 1]).columnSelectionChanged (e);
}}
}, "javax.swing.event.ListSelectionEvent");
Clazz.defineMethod (c$, "fireColumnMarginChanged", 
function () {
var listeners = this.listenerList.getListenerList ();
for (var i = listeners.length - 2; i >= 0; i -= 2) {
if (listeners[i] === javax.swing.event.TableColumnModelListener) {
if (this.changeEvent == null) this.changeEvent =  new javax.swing.event.ChangeEvent (this);
(listeners[i + 1]).columnMarginChanged (this.changeEvent);
}}
});
Clazz.defineMethod (c$, "getListeners", 
function (listenerType) {
return this.listenerList.getListeners (listenerType);
}, "Class");
Clazz.overrideMethod (c$, "propertyChange", 
function (evt) {
var name = evt.getPropertyName ();
if (name === "width" || name === "preferredWidth") {
this.invalidateWidthCache ();
this.fireColumnMarginChanged ();
}}, "java.beans.PropertyChangeEvent");
Clazz.overrideMethod (c$, "valueChanged", 
function (e) {
this.fireColumnSelectionChanged (e);
}, "javax.swing.event.ListSelectionEvent");
Clazz.defineMethod (c$, "createSelectionModel", 
function () {
return  new javax.swing.DefaultListSelectionModel ();
});
Clazz.defineMethod (c$, "recalcWidthCache", 
function () {
var enumeration = this.getColumns ();
this.totalColumnWidth = 0;
while (enumeration.hasMoreElements ()) {
this.totalColumnWidth += (enumeration.nextElement ()).getWidth ();
}
});
Clazz.defineMethod (c$, "invalidateWidthCache", 
 function () {
this.totalColumnWidth = -1;
});
});

Clazz.declarePackage ("javax.swing.table");
Clazz.load (["javax.swing.JComponent", "javax.swing.event.TableColumnModelListener"], "javax.swing.table.JTableHeader", ["java.lang.IllegalArgumentException", "java.awt.Component", "$.Rectangle", "java.awt.event.MouseEvent", "javax.swing.SwingUtilities", "$.UIManager", "javax.swing.table.DefaultTableColumnModel", "jssun.swing.table.DefaultTableCellHeaderRenderer"], function () {
c$ = Clazz.decorateAsClass (function () {
this.table = null;
this.columnModel = null;
this.reorderingAllowed = false;
this.resizingAllowed = false;
this.updateTableInRealTime = false;
this.resizingColumn = null;
this.draggedColumn = null;
this.draggedDistance = 0;
this.defaultRenderer = null;
Clazz.instantialize (this, arguments);
}, javax.swing.table, "JTableHeader", javax.swing.JComponent, javax.swing.event.TableColumnModelListener);
Clazz.makeConstructor (c$, 
function () {
this.construct (null);
});
Clazz.makeConstructor (c$, 
function (cm) {
Clazz.superConstructor (this, javax.swing.table.JTableHeader);
if (cm == null) cm = this.createDefaultColumnModel ();
this.setColumnModel (cm);
this.initializeLocalVars ();
this.updateUI ();
}, "javax.swing.table.TableColumnModel");
Clazz.defineMethod (c$, "setTable", 
function (table) {
var old = this.table;
this.table = table;
this.firePropertyChangeObject ("table", old, table);
}, "javax.swing.JTable");
Clazz.defineMethod (c$, "getTable", 
function () {
return this.table;
});
Clazz.defineMethod (c$, "setReorderingAllowed", 
function (reorderingAllowed) {
var old = this.reorderingAllowed;
this.reorderingAllowed = reorderingAllowed;
this.firePropertyChangeBool ("reorderingAllowed", old, reorderingAllowed);
}, "~B");
Clazz.defineMethod (c$, "getReorderingAllowed", 
function () {
return this.reorderingAllowed;
});
Clazz.defineMethod (c$, "setResizingAllowed", 
function (resizingAllowed) {
var old = this.resizingAllowed;
this.resizingAllowed = resizingAllowed;
this.firePropertyChangeBool ("resizingAllowed", old, resizingAllowed);
}, "~B");
Clazz.defineMethod (c$, "getResizingAllowed", 
function () {
return this.resizingAllowed;
});
Clazz.defineMethod (c$, "getDraggedColumn", 
function () {
return this.draggedColumn;
});
Clazz.defineMethod (c$, "getDraggedDistance", 
function () {
return this.draggedDistance;
});
Clazz.defineMethod (c$, "getResizingColumn", 
function () {
return this.resizingColumn;
});
Clazz.defineMethod (c$, "setUpdateTableInRealTime", 
function (flag) {
this.updateTableInRealTime = flag;
}, "~B");
Clazz.defineMethod (c$, "getUpdateTableInRealTime", 
function () {
return this.updateTableInRealTime;
});
Clazz.defineMethod (c$, "setDefaultRenderer", 
function (defaultRenderer) {
this.defaultRenderer = defaultRenderer;
}, "javax.swing.table.TableCellRenderer");
Clazz.defineMethod (c$, "getDefaultRenderer", 
function () {
return this.defaultRenderer;
});
Clazz.defineMethod (c$, "columnAtPoint", 
function (point) {
var x = point.x;
if (!this.getComponentOrientation ().isLeftToRight ()) {
x = this.getWidthInRightToLeft () - x - 1;
}return this.getColumnModel ().getColumnIndexAtX (x);
}, "java.awt.Point");
Clazz.defineMethod (c$, "getHeaderRect", 
function (column) {
var r =  new java.awt.Rectangle ();
var cm = this.getColumnModel ();
r.height = this.getHeight ();
if (column < 0) {
if (!this.getComponentOrientation ().isLeftToRight ()) {
r.x = this.getWidthInRightToLeft ();
}} else if (column >= cm.getColumnCount ()) {
if (this.getComponentOrientation ().isLeftToRight ()) {
r.x = this.getWidth ();
}} else {
for (var i = 0; i < column; i++) {
r.x += cm.getColumn (i).getWidth ();
}
if (!this.getComponentOrientation ().isLeftToRight ()) {
r.x = this.getWidthInRightToLeft () - r.x - cm.getColumn (column).getWidth ();
}r.width = cm.getColumn (column).getWidth ();
}return r;
}, "~N");
Clazz.defineMethod (c$, "getToolTipText", 
function (event) {
var tip = null;
var p = event.getPoint ();
var column;
if ((column = this.columnAtPoint (p)) != -1) {
var aColumn = this.columnModel.getColumn (column);
var renderer = aColumn.getHeaderRenderer ();
if (renderer == null) {
renderer = this.defaultRenderer;
}var component = renderer.getTableCellRendererComponent (this.getTable (), aColumn.getHeaderValue (), false, false, -1, column);
if (Clazz.instanceOf (component, javax.swing.JComponent)) {
var newEvent;
var cellRect = this.getHeaderRect (column);
p.translate (-cellRect.x, -cellRect.y);
newEvent =  new java.awt.event.MouseEvent (component, event.getID (), event.getWhen (), event.getModifiers (), p.x, p.y, event.getXOnScreen (), event.getYOnScreen (), event.getClickCount (), event.isPopupTrigger (), 0);
tip = (component).getToolTipText (newEvent);
}}if (tip == null) tip = this.getToolTipText ();
return tip;
}, "java.awt.event.MouseEvent");
Clazz.overrideMethod (c$, "getUI", 
function () {
return this.ui;
});
Clazz.defineMethod (c$, "setUI", 
function (ui) {
if (this.ui !== ui) {
Clazz.superCall (this, javax.swing.table.JTableHeader, "setUI", [ui]);
this.repaint ();
}}, "javax.swing.plaf.TableHeaderUI");
Clazz.overrideMethod (c$, "updateUI", 
function () {
this.setUI (javax.swing.UIManager.getUI (this));
var renderer = this.getDefaultRenderer ();
if (Clazz.instanceOf (renderer, java.awt.Component)) {
javax.swing.SwingUtilities.updateComponentTreeUI (renderer);
}});
Clazz.overrideMethod (c$, "getUIClassID", 
function () {
return "TableHeaderUI";
});
Clazz.defineMethod (c$, "setColumnModel", 
function (columnModel) {
if (columnModel == null) {
throw  new IllegalArgumentException ("Cannot set a null ColumnModel");
}var old = this.columnModel;
if (columnModel !== old) {
if (old != null) {
old.removeColumnModelListener (this);
}this.columnModel = columnModel;
columnModel.addColumnModelListener (this);
this.firePropertyChangeObject ("columnModel", old, columnModel);
this.resizeAndRepaint ();
}}, "javax.swing.table.TableColumnModel");
Clazz.defineMethod (c$, "getColumnModel", 
function () {
return this.columnModel;
});
Clazz.overrideMethod (c$, "columnAdded", 
function (e) {
this.resizeAndRepaint ();
}, "javax.swing.event.TableColumnModelEvent");
Clazz.overrideMethod (c$, "columnRemoved", 
function (e) {
this.resizeAndRepaint ();
}, "javax.swing.event.TableColumnModelEvent");
Clazz.overrideMethod (c$, "columnMoved", 
function (e) {
this.repaint ();
}, "javax.swing.event.TableColumnModelEvent");
Clazz.overrideMethod (c$, "columnMarginChanged", 
function (e) {
this.resizeAndRepaint ();
}, "javax.swing.event.ChangeEvent");
Clazz.overrideMethod (c$, "columnSelectionChanged", 
function (e) {
}, "javax.swing.event.ListSelectionEvent");
Clazz.defineMethod (c$, "createDefaultColumnModel", 
function () {
return  new javax.swing.table.DefaultTableColumnModel ();
});
Clazz.defineMethod (c$, "createDefaultRenderer", 
function () {
return  new jssun.swing.table.DefaultTableCellHeaderRenderer ();
});
Clazz.defineMethod (c$, "initializeLocalVars", 
function () {
this.setOpaque (true);
this.table = null;
this.reorderingAllowed = true;
this.resizingAllowed = true;
this.draggedColumn = null;
this.draggedDistance = 0;
this.resizingColumn = null;
this.updateTableInRealTime = true;
this.setDefaultRenderer (this.createDefaultRenderer ());
});
Clazz.defineMethod (c$, "resizeAndRepaint", 
function () {
this.revalidate ();
this.repaint ();
});
Clazz.defineMethod (c$, "setDraggedColumn", 
function (aColumn) {
this.draggedColumn = aColumn;
}, "javax.swing.table.TableColumn");
Clazz.defineMethod (c$, "setDraggedDistance", 
function (distance) {
this.draggedDistance = distance;
}, "~N");
Clazz.defineMethod (c$, "setResizingColumn", 
function (aColumn) {
this.resizingColumn = aColumn;
}, "javax.swing.table.TableColumn");
Clazz.defineMethod (c$, "getWidthInRightToLeft", 
 function () {
if ((this.table != null) && (this.table.getAutoResizeMode () != 0)) {
return this.table.getWidth ();
}return Clazz.superCall (this, javax.swing.table.JTableHeader, "getWidth", []);
});
Clazz.defineMethod (c$, "paramString", 
function () {
var reorderingAllowedString = (this.reorderingAllowed ? "true" : "false");
var resizingAllowedString = (this.resizingAllowed ? "true" : "false");
var updateTableInRealTimeString = (this.updateTableInRealTime ? "true" : "false");
return Clazz.superCall (this, javax.swing.table.JTableHeader, "paramString", []) + ",draggedDistance=" + this.draggedDistance + ",reorderingAllowed=" + reorderingAllowedString + ",resizingAllowed=" + resizingAllowedString + ",updateTableInRealTime=" + updateTableInRealTimeString;
});
Clazz.defineStatics (c$,
"$uiClassID", "TableHeaderUI");
});

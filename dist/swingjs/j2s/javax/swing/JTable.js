Clazz.declarePackage ("javax.swing");
Clazz.load (["java.lang.Enum", "javax.swing.DefaultCellEditor", "$.JCheckBox", "$.JComponent", "$.Scrollable", "javax.swing.event.CellEditorListener", "$.ListSelectionListener", "$.RowSorterListener", "$.TableColumnModelListener", "$.TableModelListener", "javax.swing.plaf.UIResource", "javax.swing.table.DefaultTableCellRenderer", "$.TableCellRenderer", "javax.swing.DropMode", "javax.swing.border.EmptyBorder"], "javax.swing.JTable", ["java.lang.Boolean", "$.Double", "$.Float", "$.IllegalArgumentException", "$.Number", "java.util.Date", "java.awt.Color", "$.Dimension", "$.Point", "$.Rectangle", "java.awt.event.MouseEvent", "java.text.NumberFormat", "javax.swing.DefaultListSelectionModel", "$.Icon", "$.ImageIcon", "$.JScrollPane", "$.JTextField", "$.JViewport", "$.SizeSequence", "$.SwingUtilities", "$.UIDefaults", "$.UIManager", "javax.swing.border.LineBorder", "javax.swing.event.RowSorterEvent", "$.TableModelEvent", "javax.swing.table.AbstractTableModel", "$.DefaultTableColumnModel", "$.DefaultTableModel", "$.JTableHeader", "$.TableColumn", "$.TableRowSorter", "sun.swing.SwingUtilities2"], function () {
c$ = Clazz.decorateAsClass (function () {
this.dataModel = null;
this.columnModel = null;
this.selectionModel = null;
this.tableHeader = null;
this.rowHeight = 0;
this.rowMargin = 0;
this.gridColor = null;
this.showHorizontalLines = false;
this.showVerticalLines = false;
this.autoResizeMode = 0;
this.autoCreateColumnsFromModel = false;
this.preferredViewportSize = null;
this.rowSelectionAllowed = false;
this.cellSelectionEnabled = false;
this.editorComp = null;
this.cellEditor = null;
this.editingColumn = 0;
this.editingRow = 0;
this.defaultRenderersByColumnClass = null;
this.defaultEditorsByColumnClass = null;
this.selectionForeground = null;
this.selectionBackground = null;
this.rowModel = null;
this.dragEnabled = false;
this.surrendersFocusOnKeystroke = false;
this.editorRemover = null;
this.columnSelectionAdjusting = false;
this.rowSelectionAdjusting = false;
this.isRowHeightSet = false;
this.updateSelectionOnSort = false;
this.sortManager = null;
this.ignoreSortChange = false;
this.$sorterChanged = false;
this.autoCreateRowSorter = false;
this.fillsViewportHeight = false;
this.dropMode = null;
if (!Clazz.isClassDefined ("javax.swing.JTable.SortManager")) {
javax.swing.JTable.$JTable$SortManager$ ();
}
if (!Clazz.isClassDefined ("javax.swing.JTable.ModelChange")) {
javax.swing.JTable.$JTable$ModelChange$ ();
}
Clazz.instantialize (this, arguments);
}, javax.swing, "JTable", javax.swing.JComponent, [javax.swing.event.TableModelListener, javax.swing.Scrollable, javax.swing.event.TableColumnModelListener, javax.swing.event.ListSelectionListener, javax.swing.event.CellEditorListener, javax.swing.event.RowSorterListener]);
Clazz.prepareFields (c$, function () {
this.dropMode = javax.swing.DropMode.USE_SELECTION;
});
Clazz.makeConstructor (c$, 
function () {
this.construct (null, null, null);
});
Clazz.makeConstructor (c$, 
function (dm) {
this.construct (dm, null, null);
}, "javax.swing.table.TableModel");
Clazz.makeConstructor (c$, 
function (dm, cm) {
this.construct (dm, cm, null);
}, "javax.swing.table.TableModel,javax.swing.table.TableColumnModel");
Clazz.makeConstructor (c$, 
function (dm, cm, sm) {
Clazz.superConstructor (this, javax.swing.JTable);
this.setLayout (null);
if (cm == null) {
cm = this.createDefaultColumnModel ();
this.autoCreateColumnsFromModel = true;
}this.setColumnModel (cm);
if (sm == null) {
sm = this.createDefaultSelectionModel ();
}this.setSelectionModel (sm);
if (dm == null) {
dm = this.createDefaultDataModel ();
}this.setModel (dm);
this.initializeLocalVars ();
this.uiClassID = "TableUI";
this.updateUI ();
}, "javax.swing.table.TableModel,javax.swing.table.TableColumnModel,javax.swing.ListSelectionModel");
Clazz.makeConstructor (c$, 
function (numRows, numColumns) {
this.construct ( new javax.swing.table.DefaultTableModel (numRows, numColumns));
}, "~N,~N");
Clazz.makeConstructor (c$, 
function (rowData, columnNames) {
this.construct ( new javax.swing.table.DefaultTableModel (rowData, columnNames));
}, "java.util.Vector,java.util.Vector");
Clazz.makeConstructor (c$, 
function (rowData, columnNames) {
this.construct (((Clazz.isClassDefined ("javax.swing.JTable$1") ? 0 : javax.swing.JTable.$JTable$1$ ()), Clazz.innerTypeInstance (javax.swing.JTable$1, this, Clazz.cloneFinals ("columnNames", columnNames, "rowData", rowData))));
}, "~A,~A");
Clazz.defineMethod (c$, "addNotify", 
function () {
Clazz.superCall (this, javax.swing.JTable, "addNotify", []);
this.configureEnclosingScrollPane ();
});
Clazz.defineMethod (c$, "configureEnclosingScrollPane", 
function () {
var p = this.getParent ();
if (Clazz.instanceOf (p, javax.swing.JViewport)) {
var gp = p.getParent ();
if (Clazz.instanceOf (gp, javax.swing.JScrollPane)) {
var scrollPane = gp;
var viewport = scrollPane.getViewport ();
if (viewport == null || viewport.getView () !== this) {
return;
}scrollPane.setColumnHeaderView (this.getTableHeader ());
this.configureEnclosingScrollPaneUI ();
}}});
Clazz.defineMethod (c$, "configureEnclosingScrollPaneUI", 
 function () {
var p = this.getParent ();
if (Clazz.instanceOf (p, javax.swing.JViewport)) {
var gp = p.getParent ();
if (Clazz.instanceOf (gp, javax.swing.JScrollPane)) {
var scrollPane = gp;
var viewport = scrollPane.getViewport ();
if (viewport == null || viewport.getView () !== this) {
return;
}var border = scrollPane.getBorder ();
if (border == null || Clazz.instanceOf (border, javax.swing.plaf.UIResource)) {
var scrollPaneBorder = javax.swing.UIManager.getBorder ("Table.scrollPaneBorder");
if (scrollPaneBorder != null) {
scrollPane.setBorder (scrollPaneBorder);
}}var corner = scrollPane.getCorner ("UPPER_TRAILING_CORNER");
if (corner == null || Clazz.instanceOf (corner, javax.swing.plaf.UIResource)) {
corner = null;
try {
corner = javax.swing.UIManager.get ("Table.scrollPaneCornerComponent");
} catch (e) {
if (Clazz.exceptionOf (e, Exception)) {
} else {
throw e;
}
}
scrollPane.setCorner ("UPPER_TRAILING_CORNER", corner);
}}}});
Clazz.overrideMethod (c$, "removeNotify", 
function () {
});
Clazz.defineMethod (c$, "unconfigureEnclosingScrollPane", 
function () {
var p = this.getParent ();
if (Clazz.instanceOf (p, javax.swing.JViewport)) {
var gp = p.getParent ();
if (Clazz.instanceOf (gp, javax.swing.JScrollPane)) {
var scrollPane = gp;
var viewport = scrollPane.getViewport ();
if (viewport == null || viewport.getView () !== this) {
return;
}scrollPane.setColumnHeaderView (null);
var corner = scrollPane.getCorner ("UPPER_TRAILING_CORNER");
if (Clazz.instanceOf (corner, javax.swing.plaf.UIResource)) {
scrollPane.setCorner ("UPPER_TRAILING_CORNER", null);
}}}});
Clazz.defineMethod (c$, "setUIProperty", 
function (propertyName, value) {
if (propertyName === "rowHeight") {
if (!this.isRowHeightSet) {
this.setRowHeight ((value).intValue ());
this.isRowHeightSet = false;
}return;
}Clazz.superCall (this, javax.swing.JTable, "setUIProperty", [propertyName, value]);
}, "~S,~O");
c$.createScrollPaneForTable = Clazz.defineMethod (c$, "createScrollPaneForTable", 
function (aTable) {
return  new javax.swing.JScrollPane (aTable);
}, "javax.swing.JTable");
Clazz.defineMethod (c$, "setTableHeader", 
function (tableHeader) {
if (this.tableHeader !== tableHeader) {
var old = this.tableHeader;
if (old != null) {
old.setTable (null);
}this.tableHeader = tableHeader;
if (tableHeader != null) {
tableHeader.setTable (this);
}this.firePropertyChangeObject ("tableHeader", old, tableHeader);
}}, "javax.swing.table.JTableHeader");
Clazz.defineMethod (c$, "getTableHeader", 
function () {
return this.tableHeader;
});
Clazz.defineMethod (c$, "setRowHeight", 
function (rowHeight) {
if (rowHeight <= 0) {
throw  new IllegalArgumentException ("New row height less than 1");
}var old = this.rowHeight;
this.rowHeight = rowHeight;
this.rowModel = null;
if (this.sortManager != null) {
this.sortManager.modelRowSizes = null;
}this.isRowHeightSet = true;
this.resizeAndRepaint ();
this.firePropertyChangeInt ("rowHeight", old, rowHeight);
}, "~N");
Clazz.defineMethod (c$, "getRowHeight", 
function () {
return this.rowHeight;
});
Clazz.defineMethod (c$, "getRowModel", 
 function () {
if (this.rowModel == null) {
this.rowModel =  new javax.swing.SizeSequence (this.getRowCount (), this.getRowHeight ());
}return this.rowModel;
});
Clazz.defineMethod (c$, "setRowHeight", 
function (row, rowHeight) {
if (rowHeight <= 0) {
throw  new IllegalArgumentException ("New row height less than 1");
}this.getRowModel ().setSize (row, rowHeight);
if (this.sortManager != null) {
this.sortManager.setViewRowHeight (row, rowHeight);
}this.resizeAndRepaint ();
}, "~N,~N");
Clazz.defineMethod (c$, "getRowHeight", 
function (row) {
return (this.rowModel == null) ? this.getRowHeight () : this.rowModel.getSize (row);
}, "~N");
Clazz.defineMethod (c$, "setRowMargin", 
function (rowMargin) {
var old = this.rowMargin;
this.rowMargin = rowMargin;
this.resizeAndRepaint ();
this.firePropertyChangeInt ("rowMargin", old, rowMargin);
}, "~N");
Clazz.defineMethod (c$, "getRowMargin", 
function () {
return this.rowMargin;
});
Clazz.defineMethod (c$, "setIntercellSpacing", 
function (intercellSpacing) {
this.setRowMargin (intercellSpacing.height);
this.getColumnModel ().setColumnMargin (intercellSpacing.width);
this.resizeAndRepaint ();
}, "java.awt.Dimension");
Clazz.defineMethod (c$, "getIntercellSpacing", 
function () {
return  new java.awt.Dimension (this.getColumnModel ().getColumnMargin (), this.rowMargin);
});
Clazz.defineMethod (c$, "setGridColor", 
function (gridColor) {
if (gridColor == null) {
throw  new IllegalArgumentException ("New color is null");
}var old = this.gridColor;
this.gridColor = gridColor;
this.firePropertyChangeObject ("gridColor", old, gridColor);
this.repaint ();
}, "java.awt.Color");
Clazz.defineMethod (c$, "getGridColor", 
function () {
return this.gridColor;
});
Clazz.defineMethod (c$, "setShowGrid", 
function (showGrid) {
this.setShowHorizontalLines (showGrid);
this.setShowVerticalLines (showGrid);
this.repaint ();
}, "~B");
Clazz.defineMethod (c$, "setShowHorizontalLines", 
function (showHorizontalLines) {
var old = this.showHorizontalLines;
this.showHorizontalLines = showHorizontalLines;
this.firePropertyChangeBool ("showHorizontalLines", old, showHorizontalLines);
this.repaint ();
}, "~B");
Clazz.defineMethod (c$, "setShowVerticalLines", 
function (showVerticalLines) {
var old = this.showVerticalLines;
this.showVerticalLines = showVerticalLines;
this.firePropertyChangeBool ("showVerticalLines", old, showVerticalLines);
this.repaint ();
}, "~B");
Clazz.defineMethod (c$, "getShowHorizontalLines", 
function () {
return this.showHorizontalLines;
});
Clazz.defineMethod (c$, "getShowVerticalLines", 
function () {
return this.showVerticalLines;
});
Clazz.defineMethod (c$, "setAutoResizeMode", 
function (mode) {
if ((mode == 0) || (mode == 1) || (mode == 2) || (mode == 3) || (mode == 4)) {
var old = this.autoResizeMode;
this.autoResizeMode = mode;
this.resizeAndRepaint ();
if (this.tableHeader != null) {
this.tableHeader.resizeAndRepaint ();
}this.firePropertyChangeInt ("autoResizeMode", old, this.autoResizeMode);
}}, "~N");
Clazz.defineMethod (c$, "getAutoResizeMode", 
function () {
return this.autoResizeMode;
});
Clazz.defineMethod (c$, "setAutoCreateColumnsFromModel", 
function (autoCreateColumnsFromModel) {
if (this.autoCreateColumnsFromModel != autoCreateColumnsFromModel) {
var old = this.autoCreateColumnsFromModel;
this.autoCreateColumnsFromModel = autoCreateColumnsFromModel;
if (autoCreateColumnsFromModel) {
this.createDefaultColumnsFromModel ();
}this.firePropertyChangeBool ("autoCreateColumnsFromModel", old, autoCreateColumnsFromModel);
}}, "~B");
Clazz.defineMethod (c$, "getAutoCreateColumnsFromModel", 
function () {
return this.autoCreateColumnsFromModel;
});
Clazz.defineMethod (c$, "createDefaultColumnsFromModel", 
function () {
var m = this.getModel ();
if (m != null) {
var cm = this.getColumnModel ();
while (cm.getColumnCount () > 0) {
cm.removeColumn (cm.getColumn (0));
}
for (var i = 0; i < m.getColumnCount (); i++) {
var newColumn =  new javax.swing.table.TableColumn (i);
this.addColumn (newColumn);
}
}});
Clazz.defineMethod (c$, "setDefaultRenderer", 
function (columnClass, renderer) {
if (renderer != null) {
this.defaultRenderersByColumnClass.put (columnClass, renderer);
} else {
this.defaultRenderersByColumnClass.remove (columnClass);
}}, "Class,javax.swing.table.TableCellRenderer");
Clazz.defineMethod (c$, "getDefaultRenderer", 
function (columnClass) {
if (columnClass == null) {
return null;
} else {
var renderer = this.defaultRenderersByColumnClass.get (columnClass);
if (renderer != null) {
return renderer;
} else {
return this.getDefaultRenderer (columnClass.getSuperclass ());
}}}, "Class");
Clazz.defineMethod (c$, "setDefaultEditor", 
function (columnClass, editor) {
if (editor != null) {
this.defaultEditorsByColumnClass.put (columnClass, editor);
} else {
this.defaultEditorsByColumnClass.remove (columnClass);
}}, "Class,javax.swing.table.TableCellEditor");
Clazz.defineMethod (c$, "getDefaultEditor", 
function (columnClass) {
if (columnClass == null) {
return null;
} else {
var editor = this.defaultEditorsByColumnClass.get (columnClass);
if (editor != null) {
return editor;
} else {
return this.getDefaultEditor (columnClass.getSuperclass ());
}}}, "Class");
Clazz.defineMethod (c$, "setDragEnabled", 
function (b) {
this.dragEnabled = b;
}, "~B");
Clazz.defineMethod (c$, "getDragEnabled", 
function () {
return this.dragEnabled;
});
Clazz.defineMethod (c$, "setDropMode", 
function (dropMode) {
if (dropMode != null) {
switch (dropMode) {
case javax.swing.DropMode.USE_SELECTION:
case javax.swing.DropMode.ON:
case javax.swing.DropMode.INSERT:
case javax.swing.DropMode.INSERT_ROWS:
case javax.swing.DropMode.INSERT_COLS:
case javax.swing.DropMode.ON_OR_INSERT:
case javax.swing.DropMode.ON_OR_INSERT_ROWS:
case javax.swing.DropMode.ON_OR_INSERT_COLS:
this.dropMode = dropMode;
return;
}
}throw  new IllegalArgumentException (dropMode + ": Unsupported drop mode for table");
}, "javax.swing.DropMode");
Clazz.defineMethod (c$, "getDropMode", 
function () {
return this.dropMode;
});
Clazz.defineMethod (c$, "setAutoCreateRowSorter", 
function (autoCreateRowSorter) {
var oldValue = this.autoCreateRowSorter;
this.autoCreateRowSorter = autoCreateRowSorter;
if (autoCreateRowSorter) {
this.setRowSorter ( new javax.swing.table.TableRowSorter (this.getModel ()));
}this.firePropertyChangeBool ("autoCreateRowSorter", oldValue, autoCreateRowSorter);
}, "~B");
Clazz.defineMethod (c$, "getAutoCreateRowSorter", 
function () {
return this.autoCreateRowSorter;
});
Clazz.defineMethod (c$, "setUpdateSelectionOnSort", 
function (update) {
if (this.updateSelectionOnSort != update) {
this.updateSelectionOnSort = update;
this.firePropertyChangeBool ("updateSelectionOnSort", !update, update);
}}, "~B");
Clazz.defineMethod (c$, "getUpdateSelectionOnSort", 
function () {
return this.updateSelectionOnSort;
});
Clazz.defineMethod (c$, "setRowSorter", 
function (sorter) {
var oldRowSorter = null;
if (this.sortManager != null) {
oldRowSorter = this.sortManager.sorter;
this.sortManager.dispose ();
this.sortManager = null;
}this.rowModel = null;
this.clearSelectionAndLeadAnchor ();
if (sorter != null) {
this.sortManager = Clazz.innerTypeInstance (javax.swing.JTable.SortManager, this, null, sorter);
}this.resizeAndRepaint ();
this.firePropertyChangeObject ("rowSorter", oldRowSorter, sorter);
this.firePropertyChangeObject ("sorter", oldRowSorter, sorter);
}, "javax.swing.RowSorter");
Clazz.defineMethod (c$, "getRowSorter", 
function () {
return (this.sortManager != null) ? this.sortManager.sorter : null;
});
Clazz.defineMethod (c$, "setSelectionMode", 
function (selectionMode) {
this.clearSelection ();
this.getSelectionModel ().setSelectionMode (selectionMode);
this.getColumnModel ().getSelectionModel ().setSelectionMode (selectionMode);
}, "~N");
Clazz.defineMethod (c$, "setRowSelectionAllowed", 
function (rowSelectionAllowed) {
var old = this.rowSelectionAllowed;
this.rowSelectionAllowed = rowSelectionAllowed;
if (old != rowSelectionAllowed) {
this.repaint ();
}this.firePropertyChangeBool ("rowSelectionAllowed", old, rowSelectionAllowed);
}, "~B");
Clazz.defineMethod (c$, "getRowSelectionAllowed", 
function () {
return this.rowSelectionAllowed;
});
Clazz.defineMethod (c$, "setColumnSelectionAllowed", 
function (columnSelectionAllowed) {
var old = this.columnModel.getColumnSelectionAllowed ();
this.columnModel.setColumnSelectionAllowed (columnSelectionAllowed);
if (old != columnSelectionAllowed) {
this.repaint ();
}this.firePropertyChangeBool ("columnSelectionAllowed", old, columnSelectionAllowed);
}, "~B");
Clazz.defineMethod (c$, "getColumnSelectionAllowed", 
function () {
return this.columnModel.getColumnSelectionAllowed ();
});
Clazz.defineMethod (c$, "setCellSelectionEnabled", 
function (cellSelectionEnabled) {
this.setRowSelectionAllowed (cellSelectionEnabled);
this.setColumnSelectionAllowed (cellSelectionEnabled);
var old = this.cellSelectionEnabled;
this.cellSelectionEnabled = cellSelectionEnabled;
this.firePropertyChangeBool ("cellSelectionEnabled", old, cellSelectionEnabled);
}, "~B");
Clazz.defineMethod (c$, "getCellSelectionEnabled", 
function () {
return this.getRowSelectionAllowed () && this.getColumnSelectionAllowed ();
});
Clazz.defineMethod (c$, "selectAll", 
function () {
if (this.isEditing ()) {
this.removeEditor ();
}if (this.getRowCount () > 0 && this.getColumnCount () > 0) {
var oldLead;
var oldAnchor;
var selModel;
selModel = this.selectionModel;
selModel.setValueIsAdjusting (true);
oldLead = this.getAdjustedIndex (selModel.getLeadSelectionIndex (), true);
oldAnchor = this.getAdjustedIndex (selModel.getAnchorSelectionIndex (), true);
this.setRowSelectionInterval (0, this.getRowCount () - 1);
sun.swing.SwingUtilities2.setLeadAnchorWithoutSelection (selModel, oldLead, oldAnchor);
selModel.setValueIsAdjusting (false);
selModel = this.columnModel.getSelectionModel ();
selModel.setValueIsAdjusting (true);
oldLead = this.getAdjustedIndex (selModel.getLeadSelectionIndex (), false);
oldAnchor = this.getAdjustedIndex (selModel.getAnchorSelectionIndex (), false);
this.setColumnSelectionInterval (0, this.getColumnCount () - 1);
sun.swing.SwingUtilities2.setLeadAnchorWithoutSelection (selModel, oldLead, oldAnchor);
selModel.setValueIsAdjusting (false);
}});
Clazz.defineMethod (c$, "clearSelection", 
function () {
this.selectionModel.clearSelection ();
this.columnModel.getSelectionModel ().clearSelection ();
});
Clazz.defineMethod (c$, "clearSelectionAndLeadAnchor", 
 function () {
this.selectionModel.setValueIsAdjusting (true);
this.columnModel.getSelectionModel ().setValueIsAdjusting (true);
this.clearSelection ();
this.selectionModel.setAnchorSelectionIndex (-1);
this.selectionModel.setLeadSelectionIndex (-1);
this.columnModel.getSelectionModel ().setAnchorSelectionIndex (-1);
this.columnModel.getSelectionModel ().setLeadSelectionIndex (-1);
this.selectionModel.setValueIsAdjusting (false);
this.columnModel.getSelectionModel ().setValueIsAdjusting (false);
});
Clazz.defineMethod (c$, "getAdjustedIndex", 
 function (index, row) {
var compare = row ? this.getRowCount () : this.getColumnCount ();
return index < compare ? index : -1;
}, "~N,~B");
Clazz.defineMethod (c$, "boundRow", 
 function (row) {
if (row < 0 || row >= this.getRowCount ()) {
throw  new IllegalArgumentException ("Row index out of range");
}return row;
}, "~N");
Clazz.defineMethod (c$, "boundColumn", 
 function (col) {
if (col < 0 || col >= this.getColumnCount ()) {
throw  new IllegalArgumentException ("Column index out of range");
}return col;
}, "~N");
Clazz.defineMethod (c$, "setRowSelectionInterval", 
function (index0, index1) {
this.selectionModel.setSelectionInterval (this.boundRow (index0), this.boundRow (index1));
}, "~N,~N");
Clazz.defineMethod (c$, "setColumnSelectionInterval", 
function (index0, index1) {
this.columnModel.getSelectionModel ().setSelectionInterval (this.boundColumn (index0), this.boundColumn (index1));
}, "~N,~N");
Clazz.defineMethod (c$, "addRowSelectionInterval", 
function (index0, index1) {
this.selectionModel.addSelectionInterval (this.boundRow (index0), this.boundRow (index1));
}, "~N,~N");
Clazz.defineMethod (c$, "addColumnSelectionInterval", 
function (index0, index1) {
this.columnModel.getSelectionModel ().addSelectionInterval (this.boundColumn (index0), this.boundColumn (index1));
}, "~N,~N");
Clazz.defineMethod (c$, "removeRowSelectionInterval", 
function (index0, index1) {
this.selectionModel.removeSelectionInterval (this.boundRow (index0), this.boundRow (index1));
}, "~N,~N");
Clazz.defineMethod (c$, "removeColumnSelectionInterval", 
function (index0, index1) {
this.columnModel.getSelectionModel ().removeSelectionInterval (this.boundColumn (index0), this.boundColumn (index1));
}, "~N,~N");
Clazz.defineMethod (c$, "getSelectedRow", 
function () {
return this.selectionModel.getMinSelectionIndex ();
});
Clazz.defineMethod (c$, "getSelectedColumn", 
function () {
return this.columnModel.getSelectionModel ().getMinSelectionIndex ();
});
Clazz.defineMethod (c$, "getSelectedRows", 
function () {
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
});
Clazz.defineMethod (c$, "getSelectedColumns", 
function () {
return this.columnModel.getSelectedColumns ();
});
Clazz.defineMethod (c$, "getSelectedRowCount", 
function () {
var iMin = this.selectionModel.getMinSelectionIndex ();
var iMax = this.selectionModel.getMaxSelectionIndex ();
var count = 0;
for (var i = iMin; i <= iMax; i++) {
if (this.selectionModel.isSelectedIndex (i)) {
count++;
}}
return count;
});
Clazz.defineMethod (c$, "getSelectedColumnCount", 
function () {
return this.columnModel.getSelectedColumnCount ();
});
Clazz.defineMethod (c$, "isRowSelected", 
function (row) {
return this.selectionModel.isSelectedIndex (row);
}, "~N");
Clazz.defineMethod (c$, "isColumnSelected", 
function (column) {
return this.columnModel.getSelectionModel ().isSelectedIndex (column);
}, "~N");
Clazz.defineMethod (c$, "isCellSelected", 
function (row, column) {
if (!this.getRowSelectionAllowed () && !this.getColumnSelectionAllowed ()) {
return false;
}return (!this.getRowSelectionAllowed () || this.isRowSelected (row)) && (!this.getColumnSelectionAllowed () || this.isColumnSelected (column));
}, "~N,~N");
Clazz.defineMethod (c$, "changeSelectionModel", 
 function (sm, index, toggle, extend, selected, anchor, anchorSelected) {
if (extend) {
if (toggle) {
if (anchorSelected) {
sm.addSelectionInterval (anchor, index);
} else {
sm.removeSelectionInterval (anchor, index);
if (Boolean.TRUE === this.getClientProperty ("Table.isFileList")) {
sm.addSelectionInterval (index, index);
sm.setAnchorSelectionIndex (anchor);
}}} else {
sm.setSelectionInterval (anchor, index);
}} else {
if (toggle) {
if (selected) {
sm.removeSelectionInterval (index, index);
} else {
sm.addSelectionInterval (index, index);
}} else {
sm.setSelectionInterval (index, index);
}}}, "javax.swing.ListSelectionModel,~N,~B,~B,~B,~N,~B");
Clazz.defineMethod (c$, "changeSelection", 
function (rowIndex, columnIndex, toggle, extend) {
var rsm = this.getSelectionModel ();
var csm = this.getColumnModel ().getSelectionModel ();
var anchorRow = this.getAdjustedIndex (rsm.getAnchorSelectionIndex (), true);
var anchorCol = this.getAdjustedIndex (csm.getAnchorSelectionIndex (), false);
var anchorSelected = true;
if (anchorRow == -1) {
if (this.getRowCount () > 0) {
anchorRow = 0;
}anchorSelected = false;
}if (anchorCol == -1) {
if (this.getColumnCount () > 0) {
anchorCol = 0;
}anchorSelected = false;
}var selected = this.isCellSelected (rowIndex, columnIndex);
anchorSelected = anchorSelected && this.isCellSelected (anchorRow, anchorCol);
this.changeSelectionModel (csm, columnIndex, toggle, extend, selected, anchorCol, anchorSelected);
this.changeSelectionModel (rsm, rowIndex, toggle, extend, selected, anchorRow, anchorSelected);
if (this.getAutoscrolls ()) {
var cellRect = this.getCellRect (rowIndex, columnIndex, false);
if (cellRect != null) {
this.scrollRectToVisible (cellRect);
}}}, "~N,~N,~B,~B");
Clazz.defineMethod (c$, "getSelectionForeground", 
function () {
return this.selectionForeground;
});
Clazz.defineMethod (c$, "setSelectionForeground", 
function (selectionForeground) {
var old = this.selectionForeground;
this.selectionForeground = selectionForeground;
this.firePropertyChangeObject ("selectionForeground", old, selectionForeground);
if (!selectionForeground.equals (old)) {
this.repaint ();
}}, "java.awt.Color");
Clazz.defineMethod (c$, "getSelectionBackground", 
function () {
return this.selectionBackground;
});
Clazz.defineMethod (c$, "setSelectionBackground", 
function (selectionBackground) {
var old = this.selectionBackground;
this.selectionBackground = selectionBackground;
this.firePropertyChangeObject ("selectionBackground", old, selectionBackground);
if (!selectionBackground.equals (old)) {
this.repaint ();
}}, "java.awt.Color");
Clazz.defineMethod (c$, "getColumn", 
function (identifier) {
var cm = this.getColumnModel ();
var columnIndex = cm.getColumnIndex (identifier);
return cm.getColumn (columnIndex);
}, "~O");
Clazz.defineMethod (c$, "convertColumnIndexToModel", 
function (viewColumnIndex) {
if (viewColumnIndex < 0) {
return viewColumnIndex;
}return this.getColumnModel ().getColumn (viewColumnIndex).getModelIndex ();
}, "~N");
Clazz.defineMethod (c$, "convertColumnIndexToView", 
function (modelColumnIndex) {
if (modelColumnIndex < 0) {
return modelColumnIndex;
}var cm = this.getColumnModel ();
for (var column = 0; column < this.getColumnCount (); column++) {
if (cm.getColumn (column).getModelIndex () == modelColumnIndex) {
return column;
}}
return -1;
}, "~N");
Clazz.defineMethod (c$, "convertRowIndexToView", 
function (modelRowIndex) {
var sorter = this.getRowSorter ();
if (sorter != null) {
return sorter.convertRowIndexToView (modelRowIndex);
}return modelRowIndex;
}, "~N");
Clazz.defineMethod (c$, "convertRowIndexToModel", 
function (viewRowIndex) {
var sorter = this.getRowSorter ();
if (sorter != null) {
return sorter.convertRowIndexToModel (viewRowIndex);
}return viewRowIndex;
}, "~N");
Clazz.defineMethod (c$, "getRowCount", 
function () {
var sorter = this.getRowSorter ();
if (sorter != null) {
return sorter.getViewRowCount ();
}return this.getModel ().getRowCount ();
});
Clazz.defineMethod (c$, "getColumnCount", 
function () {
return this.getColumnModel ().getColumnCount ();
});
Clazz.defineMethod (c$, "getColumnName", 
function (column) {
return this.getModel ().getColumnName (this.convertColumnIndexToModel (column));
}, "~N");
Clazz.defineMethod (c$, "getColumnClass", 
function (column) {
return this.getModel ().getColumnClass (this.convertColumnIndexToModel (column));
}, "~N");
Clazz.defineMethod (c$, "getValueAt", 
function (row, column) {
return this.getModel ().getValueAt (this.convertRowIndexToModel (row), this.convertColumnIndexToModel (column));
}, "~N,~N");
Clazz.defineMethod (c$, "setValueAt", 
function (aValue, row, column) {
this.getModel ().setValueAt (aValue, this.convertRowIndexToModel (row), this.convertColumnIndexToModel (column));
}, "~O,~N,~N");
Clazz.defineMethod (c$, "isCellEditable", 
function (row, column) {
return this.getModel ().isCellEditable (this.convertRowIndexToModel (row), this.convertColumnIndexToModel (column));
}, "~N,~N");
Clazz.defineMethod (c$, "addColumn", 
function (aColumn) {
if (aColumn.getHeaderValue () == null) {
var modelColumn = aColumn.getModelIndex ();
var columnName = this.getModel ().getColumnName (modelColumn);
aColumn.setHeaderValue (columnName);
}this.getColumnModel ().addColumn (aColumn);
}, "javax.swing.table.TableColumn");
Clazz.defineMethod (c$, "removeColumn", 
function (aColumn) {
this.getColumnModel ().removeColumn (aColumn);
}, "javax.swing.table.TableColumn");
Clazz.defineMethod (c$, "moveColumn", 
function (column, targetColumn) {
this.getColumnModel ().moveColumn (column, targetColumn);
}, "~N,~N");
Clazz.defineMethod (c$, "columnAtPoint", 
function (point) {
var x = point.x;
if (!this.getComponentOrientation ().isLeftToRight ()) {
x = this.getWidth () - x - 1;
}return this.getColumnModel ().getColumnIndexAtX (x);
}, "java.awt.Point");
Clazz.defineMethod (c$, "rowAtPoint", 
function (point) {
var y = point.y;
var result = (this.rowModel == null) ? Clazz.doubleToInt (y / this.getRowHeight ()) : this.rowModel.getIndex (y);
if (result < 0) {
return -1;
} else if (result >= this.getRowCount ()) {
return -1;
} else {
return result;
}}, "java.awt.Point");
Clazz.defineMethod (c$, "getCellRect", 
function (row, column, includeSpacing) {
var r =  new java.awt.Rectangle ();
var valid = true;
if (row < 0) {
valid = false;
} else if (row >= this.getRowCount ()) {
r.y = this.getHeight ();
valid = false;
} else {
r.height = this.getRowHeight (row);
r.y = (this.rowModel == null) ? row * r.height : this.rowModel.getPosition (row);
}if (column < 0) {
if (!this.getComponentOrientation ().isLeftToRight ()) {
r.x = this.getWidth ();
}valid = false;
} else if (column >= this.getColumnCount ()) {
if (this.getComponentOrientation ().isLeftToRight ()) {
r.x = this.getWidth ();
}valid = false;
} else {
var cm = this.getColumnModel ();
if (this.getComponentOrientation ().isLeftToRight ()) {
for (var i = 0; i < column; i++) {
r.x += cm.getColumn (i).getWidth ();
}
} else {
for (var i = cm.getColumnCount () - 1; i > column; i--) {
r.x += cm.getColumn (i).getWidth ();
}
}r.width = cm.getColumn (column).getWidth ();
}if (valid && !includeSpacing) {
var rm = Math.min (this.getRowMargin (), r.height);
var cm = Math.min (this.getColumnModel ().getColumnMargin (), r.width);
r.reshape (r.x + Clazz.doubleToInt (cm / 2), r.y + Clazz.doubleToInt (rm / 2), r.width - cm, r.height - rm);
}return r;
}, "~N,~N,~B");
Clazz.defineMethod (c$, "viewIndexForColumn", 
 function (aColumn) {
var cm = this.getColumnModel ();
for (var column = 0; column < cm.getColumnCount (); column++) {
if (cm.getColumn (column) === aColumn) {
return column;
}}
return -1;
}, "javax.swing.table.TableColumn");
Clazz.defineMethod (c$, "doLayout", 
function () {
var resizingColumn = this.getResizingColumn ();
if (resizingColumn == null) {
this.setWidthsFromPreferredWidths (false);
} else {
var columnIndex = this.viewIndexForColumn (resizingColumn);
var delta = this.getWidth () - this.getColumnModel ().getTotalColumnWidth ();
this.accommodateDelta (columnIndex, delta);
delta = this.getWidth () - this.getColumnModel ().getTotalColumnWidth ();
if (delta != 0) {
resizingColumn.setWidth (resizingColumn.getWidth () + delta);
}this.setWidthsFromPreferredWidths (true);
}Clazz.superCall (this, javax.swing.JTable, "doLayout", []);
});
Clazz.defineMethod (c$, "getResizingColumn", 
 function () {
return (this.tableHeader == null) ? null : this.tableHeader.getResizingColumn ();
});
Clazz.defineMethod (c$, "sizeColumnsToFit", 
function (lastColumnOnly) {
var oldAutoResizeMode = this.autoResizeMode;
this.setAutoResizeMode (lastColumnOnly ? 3 : 4);
this.sizeColumnsToFit (-1);
this.setAutoResizeMode (oldAutoResizeMode);
}, "~B");
Clazz.defineMethod (c$, "sizeColumnsToFit", 
function (resizingColumn) {
if (resizingColumn == -1) {
this.setWidthsFromPreferredWidths (false);
} else {
if (this.autoResizeMode == 0) {
var aColumn = this.getColumnModel ().getColumn (resizingColumn);
aColumn.setPreferredWidth (aColumn.getWidth ());
} else {
var delta = this.getWidth () - this.getColumnModel ().getTotalColumnWidth ();
this.accommodateDelta (resizingColumn, delta);
this.setWidthsFromPreferredWidths (true);
}}}, "~N");
Clazz.defineMethod (c$, "setWidthsFromPreferredWidths", 
 function (inverse) {
var totalWidth = this.getWidth ();
var totalPreferred = this.getPreferredSize ().width;
var target = !inverse ? totalWidth : totalPreferred;
var cm = this.columnModel;
var r = ((Clazz.isClassDefined ("javax.swing.JTable$2") ? 0 : javax.swing.JTable.$JTable$2$ ()), Clazz.innerTypeInstance (javax.swing.JTable$2, this, Clazz.cloneFinals ("cm", cm, "inverse", inverse)));
this.adjustSizes (target, r, inverse);
}, "~B");
Clazz.defineMethod (c$, "accommodateDelta", 
 function (resizingColumnIndex, delta) {
var columnCount = this.getColumnCount ();
var from = resizingColumnIndex;
var to = columnCount;
switch (this.autoResizeMode) {
case 1:
from = from + 1;
to = Math.min (from + 1, columnCount);
break;
case 2:
from = from + 1;
to = columnCount;
break;
case 3:
from = columnCount - 1;
to = from + 1;
break;
case 4:
from = 0;
to = columnCount;
break;
default:
return;
}
var start = from;
var end = to;
var cm = this.columnModel;
var r = ((Clazz.isClassDefined ("javax.swing.JTable$3") ? 0 : javax.swing.JTable.$JTable$3$ ()), Clazz.innerTypeInstance (javax.swing.JTable$3, this, Clazz.cloneFinals ("end", end, "start", start, "cm", cm)));
var totalWidth = 0;
for (var i = from; i < to; i++) {
var aColumn = this.columnModel.getColumn (i);
var input = aColumn.getWidth ();
totalWidth = totalWidth + input;
}
this.adjustSizes (totalWidth + delta, r, false);
return;
}, "~N,~N");
Clazz.defineMethod (c$, "adjustSizes", 
 function (target, r, inverse) {
var N = r.getElementCount ();
var totalPreferred = 0;
for (var i = 0; i < N; i++) {
totalPreferred += r.getMidPointAt (i);
}
var s;
if ((target < totalPreferred) == !inverse) {
s = ((Clazz.isClassDefined ("javax.swing.JTable$4") ? 0 : javax.swing.JTable.$JTable$4$ ()), Clazz.innerTypeInstance (javax.swing.JTable$4, this, Clazz.cloneFinals ("r", r)));
} else {
s = ((Clazz.isClassDefined ("javax.swing.JTable$5") ? 0 : javax.swing.JTable.$JTable$5$ ()), Clazz.innerTypeInstance (javax.swing.JTable$5, this, Clazz.cloneFinals ("r", r)));
}this.adjustSizes (target, s, !inverse);
}, "~N,javax.swing.JTable.Resizable3,~B");
Clazz.defineMethod (c$, "adjustSizes", 
 function (target, r, limitToRange) {
var totalLowerBound = 0;
var totalUpperBound = 0;
for (var i = 0; i < r.getElementCount (); i++) {
totalLowerBound += r.getLowerBoundAt (i);
totalUpperBound += r.getUpperBoundAt (i);
}
if (limitToRange) {
target = Math.min (Math.max (totalLowerBound, target), totalUpperBound);
}for (var i = 0; i < r.getElementCount (); i++) {
var lowerBound = r.getLowerBoundAt (i);
var upperBound = r.getUpperBoundAt (i);
var newSize;
if (totalLowerBound == totalUpperBound) {
newSize = lowerBound;
} else {
var f = (target - totalLowerBound) / (totalUpperBound - totalLowerBound);
newSize = Math.round (lowerBound + f * (upperBound - lowerBound));
}r.setSizeAt (newSize, i);
target -= newSize;
totalLowerBound -= lowerBound;
totalUpperBound -= upperBound;
}
}, "~N,javax.swing.JTable.Resizable2,~B");
Clazz.defineMethod (c$, "getToolTipText", 
function (event) {
var tip = null;
var p = event.getPoint ();
var hitColumnIndex = this.columnAtPoint (p);
var hitRowIndex = this.rowAtPoint (p);
if ((hitColumnIndex != -1) && (hitRowIndex != -1)) {
var renderer = this.getCellRenderer (hitRowIndex, hitColumnIndex);
var component = this.prepareRenderer (renderer, hitRowIndex, hitColumnIndex);
if (Clazz.instanceOf (component, javax.swing.JComponent)) {
var cellRect = this.getCellRect (hitRowIndex, hitColumnIndex, false);
p.translate (-cellRect.x, -cellRect.y);
var newEvent =  new java.awt.event.MouseEvent (component, event.getID (), event.getWhen (), event.getModifiers (), p.x, p.y, event.getXOnScreen (), event.getYOnScreen (), event.getClickCount (), event.isPopupTrigger (), 0);
tip = (component).getToolTipText (newEvent);
}}if (tip == null) tip = this.getToolTipText ();
return tip;
}, "java.awt.event.MouseEvent");
Clazz.defineMethod (c$, "setSurrendersFocusOnKeystroke", 
function (surrendersFocusOnKeystroke) {
this.surrendersFocusOnKeystroke = surrendersFocusOnKeystroke;
}, "~B");
Clazz.defineMethod (c$, "getSurrendersFocusOnKeystroke", 
function () {
return this.surrendersFocusOnKeystroke;
});
Clazz.defineMethod (c$, "editCellAt", 
function (row, column) {
return this.editCellAt (row, column, null);
}, "~N,~N");
Clazz.defineMethod (c$, "editCellAt", 
function (row, column, e) {
if (this.cellEditor != null && !this.cellEditor.stopCellEditing ()) {
return false;
}if (row < 0 || row >= this.getRowCount () || column < 0 || column >= this.getColumnCount ()) {
return false;
}if (!this.isCellEditable (row, column)) return false;
if (this.editorRemover == null) {
}var editor = this.getCellEditor (row, column);
if (editor != null && editor.isCellEditable (e)) {
this.editorComp = this.prepareEditor (editor, row, column);
if (this.editorComp == null) {
this.removeEditor ();
return false;
}this.editorComp.setBounds (this.getCellRect (row, column, false));
this.add (this.editorComp);
this.editorComp.validate ();
this.editorComp.repaint ();
this.setCellEditor (editor);
this.setEditingRow (row);
this.setEditingColumn (column);
editor.addCellEditorListener (this);
return true;
}return false;
}, "~N,~N,java.util.EventObject");
Clazz.defineMethod (c$, "isEditing", 
function () {
return (this.cellEditor == null) ? false : true;
});
Clazz.defineMethod (c$, "getEditorComponent", 
function () {
return this.editorComp;
});
Clazz.defineMethod (c$, "getEditingColumn", 
function () {
return this.editingColumn;
});
Clazz.defineMethod (c$, "getEditingRow", 
function () {
return this.editingRow;
});
Clazz.overrideMethod (c$, "getUI", 
function () {
return this.ui;
});
Clazz.defineMethod (c$, "setUI", 
function (ui) {
if (this.ui !== ui) {
Clazz.superCall (this, javax.swing.JTable, "setUI", [ui]);
this.repaint ();
}}, "javax.swing.plaf.TableUI");
Clazz.defineMethod (c$, "updateUI", 
function () {
var cm = this.getColumnModel ();
for (var column = 0; column < cm.getColumnCount (); column++) {
var aColumn = cm.getColumn (column);
javax.swing.SwingUtilities.updateRendererOrEditorUI (aColumn.getCellRenderer ());
javax.swing.SwingUtilities.updateRendererOrEditorUI (aColumn.getCellEditor ());
javax.swing.SwingUtilities.updateRendererOrEditorUI (aColumn.getHeaderRenderer ());
}
var defaultRenderers = this.defaultRenderersByColumnClass.elements ();
while (defaultRenderers.hasMoreElements ()) {
javax.swing.SwingUtilities.updateRendererOrEditorUI (defaultRenderers.nextElement ());
}
var defaultEditors = this.defaultEditorsByColumnClass.elements ();
while (defaultEditors.hasMoreElements ()) {
javax.swing.SwingUtilities.updateRendererOrEditorUI (defaultEditors.nextElement ());
}
if (this.tableHeader != null && this.tableHeader.getParent () == null) {
this.tableHeader.updateUI ();
}this.configureEnclosingScrollPaneUI ();
Clazz.superCall (this, javax.swing.JTable, "updateUI", []);
});
Clazz.defineMethod (c$, "setModel", 
function (dataModel) {
if (dataModel == null) {
throw  new IllegalArgumentException ("Cannot set a null TableModel");
}if (this.dataModel !== dataModel) {
var old = this.dataModel;
if (old != null) {
old.removeTableModelListener (this);
}this.dataModel = dataModel;
dataModel.addTableModelListener (this);
this.tableChanged ( new javax.swing.event.TableModelEvent (dataModel, -1));
this.firePropertyChangeObject ("model", old, dataModel);
if (this.getAutoCreateRowSorter ()) {
this.setRowSorter ( new javax.swing.table.TableRowSorter (dataModel));
}}}, "javax.swing.table.TableModel");
Clazz.defineMethod (c$, "getModel", 
function () {
return this.dataModel;
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
if (this.tableHeader != null) {
this.tableHeader.setColumnModel (columnModel);
}this.firePropertyChangeObject ("columnModel", old, columnModel);
this.resizeAndRepaint ();
}}, "javax.swing.table.TableColumnModel");
Clazz.defineMethod (c$, "getColumnModel", 
function () {
return this.columnModel;
});
Clazz.defineMethod (c$, "setSelectionModel", 
function (newModel) {
if (newModel == null) {
throw  new IllegalArgumentException ("Cannot set a null SelectionModel");
}var oldModel = this.selectionModel;
if (newModel !== oldModel) {
if (oldModel != null) {
oldModel.removeListSelectionListener (this);
}this.selectionModel = newModel;
newModel.addListSelectionListener (this);
this.firePropertyChangeObject ("selectionModel", oldModel, newModel);
this.repaint ();
}}, "javax.swing.ListSelectionModel");
Clazz.defineMethod (c$, "getSelectionModel", 
function () {
return this.selectionModel;
});
Clazz.overrideMethod (c$, "sorterChanged", 
function (e) {
if (e.getType () === javax.swing.event.RowSorterEvent.Type.SORT_ORDER_CHANGED) {
var header = this.getTableHeader ();
if (header != null) {
header.repaint ();
}} else if (e.getType () === javax.swing.event.RowSorterEvent.Type.SORTED) {
this.$sorterChanged = true;
if (!this.ignoreSortChange) {
this.sortedTableChanged (e, null);
}}}, "javax.swing.event.RowSorterEvent");
Clazz.defineMethod (c$, "sortedTableChanged", 
 function (sortedEvent, e) {
var editingModelIndex = -1;
var change = (e != null) ? Clazz.innerTypeInstance (javax.swing.JTable.ModelChange, this, null, e) : null;
if ((change == null || !change.allRowsChanged) && this.editingRow != -1) {
editingModelIndex = this.convertRowIndexToModel (sortedEvent, this.editingRow);
}this.sortManager.prepareForChange (sortedEvent, change);
if (e != null) {
if (change.type == 0) {
this.repaintSortedRows (change);
}this.notifySorter (change);
if (change.type != 0) {
this.$sorterChanged = true;
}} else {
this.$sorterChanged = true;
}this.sortManager.processChange (sortedEvent, change, this.$sorterChanged);
if (this.$sorterChanged) {
if (this.editingRow != -1) {
var newIndex = (editingModelIndex == -1) ? -1 : this.convertRowIndexToView (editingModelIndex, change);
this.restoreSortingEditingRow (newIndex);
}if (e == null || change.type != 0) {
this.resizeAndRepaint ();
}}if (change != null && change.allRowsChanged) {
this.clearSelectionAndLeadAnchor ();
this.resizeAndRepaint ();
}}, "javax.swing.event.RowSorterEvent,javax.swing.event.TableModelEvent");
Clazz.defineMethod (c$, "repaintSortedRows", 
 function (change) {
if (change.startModelIndex > change.endModelIndex || change.startModelIndex + 10 < change.endModelIndex) {
this.repaint ();
return;
}var eventColumn = change.event.getColumn ();
var columnViewIndex = eventColumn;
if (columnViewIndex == -1) {
columnViewIndex = 0;
} else {
columnViewIndex = this.convertColumnIndexToView (columnViewIndex);
if (columnViewIndex == -1) {
return;
}}var modelIndex = change.startModelIndex;
while (modelIndex <= change.endModelIndex) {
var viewIndex = this.convertRowIndexToView (modelIndex++);
if (viewIndex != -1) {
var dirty = this.getCellRect (viewIndex, columnViewIndex, false);
var x = dirty.x;
var w = dirty.width;
if (eventColumn == -1) {
x = 0;
w = this.getWidth ();
}this.repaint (x, dirty.y, w, dirty.height);
}}
}, "javax.swing.JTable.ModelChange");
Clazz.defineMethod (c$, "restoreSortingSelection", 
 function (selection, lead, change) {
for (var i = selection.length - 1; i >= 0; i--) {
selection[i] = this.convertRowIndexToView (selection[i], change);
}
lead = this.convertRowIndexToView (lead, change);
if (selection.length == 0 || (selection.length == 1 && selection[0] == this.getSelectedRow ())) {
return;
}this.selectionModel.setValueIsAdjusting (true);
this.selectionModel.clearSelection ();
for (var i = selection.length - 1; i >= 0; i--) {
if (selection[i] != -1) {
this.selectionModel.addSelectionInterval (selection[i], selection[i]);
}}
sun.swing.SwingUtilities2.setLeadAnchorWithoutSelection (this.selectionModel, lead, lead);
this.selectionModel.setValueIsAdjusting (false);
}, "~A,~N,javax.swing.JTable.ModelChange");
Clazz.defineMethod (c$, "restoreSortingEditingRow", 
 function (editingRow) {
if (editingRow == -1) {
var editor = this.getCellEditor ();
if (editor != null) {
editor.cancelCellEditing ();
if (this.getCellEditor () != null) {
this.removeEditor ();
}}} else {
this.editingRow = editingRow;
this.repaint ();
}}, "~N");
Clazz.defineMethod (c$, "notifySorter", 
 function (change) {
try {
this.ignoreSortChange = true;
this.$sorterChanged = false;
switch (change.type) {
case 0:
if (change.event.getLastRow () == 2147483647) {
this.sortManager.sorter.allRowsChanged ();
} else if (change.event.getColumn () == -1) {
this.sortManager.sorter.rowsUpdated (change.startModelIndex, change.endModelIndex);
} else {
this.sortManager.sorter.rowsUpdated (change.startModelIndex, change.endModelIndex, change.event.getColumn ());
}break;
case 1:
this.sortManager.sorter.rowsInserted (change.startModelIndex, change.endModelIndex);
break;
case -1:
this.sortManager.sorter.rowsDeleted (change.startModelIndex, change.endModelIndex);
break;
}
} finally {
this.ignoreSortChange = false;
}
}, "javax.swing.JTable.ModelChange");
Clazz.defineMethod (c$, "convertRowIndexToView", 
 function (modelIndex, change) {
if (modelIndex < 0) {
return -1;
}if (change != null && modelIndex >= change.startModelIndex) {
if (change.type == 1) {
if (modelIndex + change.length >= change.modelRowCount) {
return -1;
}return this.sortManager.sorter.convertRowIndexToView (modelIndex + change.length);
} else if (change.type == -1) {
if (modelIndex <= change.endModelIndex) {
return -1;
} else {
if (modelIndex - change.length >= change.modelRowCount) {
return -1;
}return this.sortManager.sorter.convertRowIndexToView (modelIndex - change.length);
}}}if (modelIndex >= this.getModel ().getRowCount ()) {
return -1;
}return this.sortManager.sorter.convertRowIndexToView (modelIndex);
}, "~N,javax.swing.JTable.ModelChange");
Clazz.defineMethod (c$, "convertSelectionToModel", 
 function (e) {
var selection = this.getSelectedRows ();
for (var i = selection.length - 1; i >= 0; i--) {
selection[i] = this.convertRowIndexToModel (e, selection[i]);
}
return selection;
}, "javax.swing.event.RowSorterEvent");
Clazz.defineMethod (c$, "convertRowIndexToModel", 
 function (e, viewIndex) {
if (e != null) {
if (e.getPreviousRowCount () == 0) {
return viewIndex;
}return e.convertPreviousRowIndexToModel (viewIndex);
}if (viewIndex < 0 || viewIndex >= this.getRowCount ()) {
return -1;
}return this.convertRowIndexToModel (viewIndex);
}, "javax.swing.event.RowSorterEvent,~N");
Clazz.overrideMethod (c$, "tableChanged", 
function (e) {
if (e == null || e.getFirstRow () == -1) {
this.clearSelectionAndLeadAnchor ();
this.rowModel = null;
if (this.sortManager != null) {
try {
this.ignoreSortChange = true;
this.sortManager.sorter.modelStructureChanged ();
} finally {
this.ignoreSortChange = false;
}
this.sortManager.allChanged ();
}if (this.getAutoCreateColumnsFromModel ()) {
this.createDefaultColumnsFromModel ();
return;
}this.resizeAndRepaint ();
return;
}if (this.sortManager != null) {
this.sortedTableChanged (null, e);
return;
}if (this.rowModel != null) {
this.repaint ();
}if (e.getType () == 1) {
this.tableRowsInserted (e);
return;
}if (e.getType () == -1) {
this.tableRowsDeleted (e);
return;
}var modelColumn = e.getColumn ();
var start = e.getFirstRow ();
var end = e.getLastRow ();
var dirtyRegion;
if (modelColumn == -1) {
dirtyRegion =  new java.awt.Rectangle (0, start * this.getRowHeight (), this.getColumnModel ().getTotalColumnWidth (), 0);
} else {
var column = this.convertColumnIndexToView (modelColumn);
dirtyRegion = this.getCellRect (start, column, false);
}if (end != 2147483647) {
dirtyRegion.height = (end - start + 1) * this.getRowHeight ();
this.repaint (dirtyRegion.x, dirtyRegion.y, dirtyRegion.width, dirtyRegion.height);
} else {
this.clearSelectionAndLeadAnchor ();
this.resizeAndRepaint ();
this.rowModel = null;
}}, "javax.swing.event.TableModelEvent");
Clazz.defineMethod (c$, "tableRowsInserted", 
 function (e) {
var start = e.getFirstRow ();
var end = e.getLastRow ();
if (start < 0) {
start = 0;
}if (end < 0) {
end = this.getRowCount () - 1;
}var length = end - start + 1;
this.selectionModel.insertIndexInterval (start, length, true);
if (this.rowModel != null) {
this.rowModel.insertEntries (start, length, this.getRowHeight ());
}var rh = this.getRowHeight ();
var drawRect =  new java.awt.Rectangle (0, start * rh, this.getColumnModel ().getTotalColumnWidth (), (this.getRowCount () - start) * rh);
this.revalidate ();
this.repaint (drawRect);
}, "javax.swing.event.TableModelEvent");
Clazz.defineMethod (c$, "tableRowsDeleted", 
 function (e) {
var start = e.getFirstRow ();
var end = e.getLastRow ();
if (start < 0) {
start = 0;
}if (end < 0) {
end = this.getRowCount () - 1;
}var deletedCount = end - start + 1;
var previousRowCount = this.getRowCount () + deletedCount;
this.selectionModel.removeIndexInterval (start, end);
if (this.rowModel != null) {
this.rowModel.removeEntries (start, deletedCount);
}var rh = this.getRowHeight ();
var drawRect =  new java.awt.Rectangle (0, start * rh, this.getColumnModel ().getTotalColumnWidth (), (previousRowCount - start) * rh);
this.revalidate ();
this.repaint (drawRect);
}, "javax.swing.event.TableModelEvent");
Clazz.overrideMethod (c$, "columnAdded", 
function (e) {
if (this.isEditing ()) {
this.removeEditor ();
}this.resizeAndRepaint ();
}, "javax.swing.event.TableColumnModelEvent");
Clazz.overrideMethod (c$, "columnRemoved", 
function (e) {
if (this.isEditing ()) {
this.removeEditor ();
}this.resizeAndRepaint ();
}, "javax.swing.event.TableColumnModelEvent");
Clazz.overrideMethod (c$, "columnMoved", 
function (e) {
if (this.isEditing ()) {
this.removeEditor ();
}this.repaint ();
}, "javax.swing.event.TableColumnModelEvent");
Clazz.overrideMethod (c$, "columnMarginChanged", 
function (e) {
if (this.isEditing ()) {
this.removeEditor ();
}var resizingColumn = this.getResizingColumn ();
if (resizingColumn != null && this.autoResizeMode == 0) {
resizingColumn.setPreferredWidth (resizingColumn.getWidth ());
}this.resizeAndRepaint ();
}, "javax.swing.event.ChangeEvent");
Clazz.defineMethod (c$, "limit", 
 function (i, a, b) {
return Math.min (b, Math.max (i, a));
}, "~N,~N,~N");
Clazz.overrideMethod (c$, "columnSelectionChanged", 
function (e) {
var isAdjusting = e.getValueIsAdjusting ();
if (this.columnSelectionAdjusting && !isAdjusting) {
this.columnSelectionAdjusting = false;
return;
}this.columnSelectionAdjusting = isAdjusting;
if (this.getRowCount () <= 0 || this.getColumnCount () <= 0) {
return;
}var firstIndex = this.limit (e.getFirstIndex (), 0, this.getColumnCount () - 1);
var lastIndex = this.limit (e.getLastIndex (), 0, this.getColumnCount () - 1);
var minRow = 0;
var maxRow = this.getRowCount () - 1;
if (this.getRowSelectionAllowed ()) {
minRow = this.selectionModel.getMinSelectionIndex ();
maxRow = this.selectionModel.getMaxSelectionIndex ();
var leadRow = this.getAdjustedIndex (this.selectionModel.getLeadSelectionIndex (), true);
if (minRow == -1 || maxRow == -1) {
if (leadRow == -1) {
return;
}minRow = maxRow = leadRow;
} else {
if (leadRow != -1) {
minRow = Math.min (minRow, leadRow);
maxRow = Math.max (maxRow, leadRow);
}}}var firstColumnRect = this.getCellRect (minRow, firstIndex, false);
var lastColumnRect = this.getCellRect (maxRow, lastIndex, false);
var dirtyRegion = firstColumnRect.union (lastColumnRect);
this.repaint (dirtyRegion);
}, "javax.swing.event.ListSelectionEvent");
Clazz.overrideMethod (c$, "valueChanged", 
function (e) {
if (this.sortManager != null) {
this.sortManager.viewSelectionChanged (e);
}var isAdjusting = e.getValueIsAdjusting ();
if (this.rowSelectionAdjusting && !isAdjusting) {
this.rowSelectionAdjusting = false;
return;
}this.rowSelectionAdjusting = isAdjusting;
if (this.getRowCount () <= 0 || this.getColumnCount () <= 0) {
return;
}var firstIndex = this.limit (e.getFirstIndex (), 0, this.getRowCount () - 1);
var lastIndex = this.limit (e.getLastIndex (), 0, this.getRowCount () - 1);
var firstRowRect = this.getCellRect (firstIndex, 0, false);
var lastRowRect = this.getCellRect (lastIndex, this.getColumnCount () - 1, false);
var dirtyRegion = firstRowRect.union (lastRowRect);
this.repaint (dirtyRegion);
}, "javax.swing.event.ListSelectionEvent");
Clazz.overrideMethod (c$, "editingStopped", 
function (e) {
var editor = this.getCellEditor ();
if (editor != null) {
var value = editor.getCellEditorValue ();
this.setValueAt (value, this.editingRow, this.editingColumn);
this.removeEditor ();
}}, "javax.swing.event.ChangeEvent");
Clazz.overrideMethod (c$, "editingCanceled", 
function (e) {
this.removeEditor ();
}, "javax.swing.event.ChangeEvent");
Clazz.defineMethod (c$, "setPreferredScrollableViewportSize", 
function (size) {
this.preferredViewportSize = size;
}, "java.awt.Dimension");
Clazz.overrideMethod (c$, "getPreferredScrollableViewportSize", 
function () {
return this.preferredViewportSize;
});
Clazz.overrideMethod (c$, "getScrollableUnitIncrement", 
function (visibleRect, orientation, direction) {
var leadingRow;
var leadingCol;
var leadingCellRect;
var leadingVisibleEdge;
var leadingCellEdge;
var leadingCellSize;
leadingRow = this.getLeadingRow (visibleRect);
leadingCol = this.getLeadingCol (visibleRect);
if (orientation == 1 && leadingRow < 0) {
return this.getRowHeight ();
} else if (orientation == 0 && leadingCol < 0) {
return 100;
}leadingCellRect = this.getCellRect (leadingRow, leadingCol, true);
leadingVisibleEdge = this.leadingEdge (visibleRect, orientation);
leadingCellEdge = this.leadingEdge (leadingCellRect, orientation);
if (orientation == 1) {
leadingCellSize = leadingCellRect.height;
} else {
leadingCellSize = leadingCellRect.width;
}if (leadingVisibleEdge == leadingCellEdge) {
if (direction < 0) {
var retVal = 0;
if (orientation == 1) {
while (--leadingRow >= 0) {
retVal = this.getRowHeight (leadingRow);
if (retVal != 0) {
break;
}}
} else {
while (--leadingCol >= 0) {
retVal = this.getCellRect (leadingRow, leadingCol, true).width;
if (retVal != 0) {
break;
}}
}return retVal;
} else {
return leadingCellSize;
}} else {
var hiddenAmt = Math.abs (leadingVisibleEdge - leadingCellEdge);
var visibleAmt = leadingCellSize - hiddenAmt;
if (direction > 0) {
return visibleAmt;
} else {
return hiddenAmt;
}}}, "java.awt.Rectangle,~N,~N");
Clazz.overrideMethod (c$, "getScrollableBlockIncrement", 
function (visibleRect, orientation, direction) {
if (this.getRowCount () == 0) {
if (1 == orientation) {
var rh = this.getRowHeight ();
return (rh > 0) ? Math.max (rh, (Clazz.doubleToInt (visibleRect.height / rh)) * rh) : visibleRect.height;
} else {
return visibleRect.width;
}}if (null == this.rowModel && 1 == orientation) {
var row = this.rowAtPoint (visibleRect.getLocation ());
var col = this.columnAtPoint (visibleRect.getLocation ());
var cellRect = this.getCellRect (row, col, true);
if (cellRect.y == visibleRect.y) {
var rh = this.getRowHeight ();
return Math.max (rh, (Clazz.doubleToInt (visibleRect.height / rh)) * rh);
}}if (direction < 0) {
return this.getPreviousBlockIncrement (visibleRect, orientation);
} else {
return this.getNextBlockIncrement (visibleRect, orientation);
}}, "java.awt.Rectangle,~N,~N");
Clazz.defineMethod (c$, "getPreviousBlockIncrement", 
 function (visibleRect, orientation) {
var row;
var col;
var newEdge;
var newCellLoc;
var visibleLeadingEdge = this.leadingEdge (visibleRect, orientation);
var leftToRight = this.getComponentOrientation ().isLeftToRight ();
var newLeadingEdge;
if (orientation == 1) {
newEdge = visibleLeadingEdge - visibleRect.height;
var x = visibleRect.x + (leftToRight ? 0 : visibleRect.width);
newCellLoc =  new java.awt.Point (x, newEdge);
} else if (leftToRight) {
newEdge = visibleLeadingEdge - visibleRect.width;
newCellLoc =  new java.awt.Point (newEdge, visibleRect.y);
} else {
newEdge = visibleLeadingEdge + visibleRect.width;
newCellLoc =  new java.awt.Point (newEdge - 1, visibleRect.y);
}row = this.rowAtPoint (newCellLoc);
col = this.columnAtPoint (newCellLoc);
if ( new Boolean (orientation == 1 & row < 0).valueOf ()) {
newLeadingEdge = 0;
} else if ( new Boolean (orientation == 0 & col < 0).valueOf ()) {
if (leftToRight) {
newLeadingEdge = 0;
} else {
newLeadingEdge = this.getWidth ();
}} else {
var newCellRect = this.getCellRect (row, col, true);
var newCellLeadingEdge = this.leadingEdge (newCellRect, orientation);
var newCellTrailingEdge = this.trailingEdge (newCellRect, orientation);
if ((orientation == 1 || leftToRight) && (newCellTrailingEdge >= visibleLeadingEdge)) {
newLeadingEdge = newCellLeadingEdge;
} else if (orientation == 0 && !leftToRight && newCellTrailingEdge <= visibleLeadingEdge) {
newLeadingEdge = newCellLeadingEdge;
} else if (newEdge == newCellLeadingEdge) {
newLeadingEdge = newCellLeadingEdge;
} else {
newLeadingEdge = newCellTrailingEdge;
}}return Math.abs (visibleLeadingEdge - newLeadingEdge);
}, "java.awt.Rectangle,~N");
Clazz.defineMethod (c$, "getNextBlockIncrement", 
 function (visibleRect, orientation) {
var trailingRow = this.getTrailingRow (visibleRect);
var trailingCol = this.getTrailingCol (visibleRect);
var cellRect;
var cellFillsVis;
var cellLeadingEdge;
var cellTrailingEdge;
var newLeadingEdge;
var visibleLeadingEdge = this.leadingEdge (visibleRect, orientation);
if (orientation == 1 && trailingRow < 0) {
return visibleRect.height;
} else if (orientation == 0 && trailingCol < 0) {
return visibleRect.width;
}cellRect = this.getCellRect (trailingRow, trailingCol, true);
cellLeadingEdge = this.leadingEdge (cellRect, orientation);
cellTrailingEdge = this.trailingEdge (cellRect, orientation);
if (orientation == 1 || this.getComponentOrientation ().isLeftToRight ()) {
cellFillsVis = cellLeadingEdge <= visibleLeadingEdge;
} else {
cellFillsVis = cellLeadingEdge >= visibleLeadingEdge;
}if (cellFillsVis) {
newLeadingEdge = cellTrailingEdge;
} else if (cellTrailingEdge == this.trailingEdge (visibleRect, orientation)) {
newLeadingEdge = cellTrailingEdge;
} else {
newLeadingEdge = cellLeadingEdge;
}return Math.abs (newLeadingEdge - visibleLeadingEdge);
}, "java.awt.Rectangle,~N");
Clazz.defineMethod (c$, "getLeadingRow", 
 function (visibleRect) {
var leadingPoint;
if (this.getComponentOrientation ().isLeftToRight ()) {
leadingPoint =  new java.awt.Point (visibleRect.x, visibleRect.y);
} else {
leadingPoint =  new java.awt.Point (visibleRect.x + visibleRect.width - 1, visibleRect.y);
}return this.rowAtPoint (leadingPoint);
}, "java.awt.Rectangle");
Clazz.defineMethod (c$, "getLeadingCol", 
 function (visibleRect) {
var leadingPoint;
if (this.getComponentOrientation ().isLeftToRight ()) {
leadingPoint =  new java.awt.Point (visibleRect.x, visibleRect.y);
} else {
leadingPoint =  new java.awt.Point (visibleRect.x + visibleRect.width - 1, visibleRect.y);
}return this.columnAtPoint (leadingPoint);
}, "java.awt.Rectangle");
Clazz.defineMethod (c$, "getTrailingRow", 
 function (visibleRect) {
var trailingPoint;
if (this.getComponentOrientation ().isLeftToRight ()) {
trailingPoint =  new java.awt.Point (visibleRect.x, visibleRect.y + visibleRect.height - 1);
} else {
trailingPoint =  new java.awt.Point (visibleRect.x + visibleRect.width - 1, visibleRect.y + visibleRect.height - 1);
}return this.rowAtPoint (trailingPoint);
}, "java.awt.Rectangle");
Clazz.defineMethod (c$, "getTrailingCol", 
 function (visibleRect) {
var trailingPoint;
if (this.getComponentOrientation ().isLeftToRight ()) {
trailingPoint =  new java.awt.Point (visibleRect.x + visibleRect.width - 1, visibleRect.y);
} else {
trailingPoint =  new java.awt.Point (visibleRect.x, visibleRect.y);
}return this.columnAtPoint (trailingPoint);
}, "java.awt.Rectangle");
Clazz.defineMethod (c$, "leadingEdge", 
 function (rect, orientation) {
if (orientation == 1) {
return rect.y;
} else if (this.getComponentOrientation ().isLeftToRight ()) {
return rect.x;
} else {
return rect.x + rect.width;
}}, "java.awt.Rectangle,~N");
Clazz.defineMethod (c$, "trailingEdge", 
 function (rect, orientation) {
if (orientation == 1) {
return rect.y + rect.height;
} else if (this.getComponentOrientation ().isLeftToRight ()) {
return rect.x + rect.width;
} else {
return rect.x;
}}, "java.awt.Rectangle,~N");
Clazz.overrideMethod (c$, "getScrollableTracksViewportWidth", 
function () {
return !(this.autoResizeMode == 0);
});
Clazz.overrideMethod (c$, "getScrollableTracksViewportHeight", 
function () {
return this.getFillsViewportHeight () && Clazz.instanceOf (this.getParent (), javax.swing.JViewport) && ((this.getParent ()).getHeight () > this.getPreferredSize ().height);
});
Clazz.defineMethod (c$, "setFillsViewportHeight", 
function (fillsViewportHeight) {
var old = this.fillsViewportHeight;
this.fillsViewportHeight = fillsViewportHeight;
this.resizeAndRepaint ();
this.firePropertyChangeBool ("fillsViewportHeight", old, fillsViewportHeight);
}, "~B");
Clazz.defineMethod (c$, "getFillsViewportHeight", 
function () {
return this.fillsViewportHeight;
});
Clazz.defineMethod (c$, "processKeyBinding", 
function (ks, e, condition, pressed) {
var retValue = Clazz.superCall (this, javax.swing.JTable, "processKeyBinding", [ks, e, condition, pressed]);
if (!retValue && condition == 1 && this.isFocusOwner () && !Boolean.FALSE.equals (this.getClientProperty ("JTable.autoStartsEdit"))) {
var editorComponent = this.getEditorComponent ();
if (editorComponent == null) {
if (e == null || e.getID () != 401) {
return false;
}var code = e.getKeyCode ();
if (code == 16 || code == 17 || code == 18) {
return false;
}var leadRow = this.getSelectionModel ().getLeadSelectionIndex ();
var leadColumn = this.getColumnModel ().getSelectionModel ().getLeadSelectionIndex ();
if (leadRow != -1 && leadColumn != -1 && !this.isEditing ()) {
if (!this.editCellAt (leadRow, leadColumn, e)) {
return false;
}}editorComponent = this.getEditorComponent ();
if (editorComponent == null) {
return false;
}}if (Clazz.instanceOf (editorComponent, javax.swing.JComponent)) {
retValue = (editorComponent).processKeyBinding (ks, e, 0, pressed);
if (this.getSurrendersFocusOnKeystroke ()) {
editorComponent.requestFocus ();
}}}return retValue;
}, "javax.swing.KeyStroke,java.awt.event.KeyEvent,~N,~B");
Clazz.defineMethod (c$, "setLazyValue", 
 function (h, c, s) {
h.put (c, s);
}, "java.util.Hashtable,Class,~S");
Clazz.defineMethod (c$, "setLazyRenderer", 
 function (c, s) {
this.setLazyValue (this.defaultRenderersByColumnClass, c, s);
}, "Class,~S");
Clazz.defineMethod (c$, "createDefaultRenderers", 
function () {
this.defaultRenderersByColumnClass =  new javax.swing.UIDefaults (8, 0.75);
this.setLazyRenderer (JavaObject, "javax.swing.table.DefaultTableCellRenderer$UIResource");
this.setLazyRenderer (Number, "javax.swing.JTable$NumberRenderer");
this.setLazyRenderer (Float, "javax.swing.JTable$DoubleRenderer");
this.setLazyRenderer (Double, "javax.swing.JTable$DoubleRenderer");
this.setLazyRenderer (java.util.Date, "javax.swing.JTable$DateRenderer");
this.setLazyRenderer (javax.swing.Icon, "javax.swing.JTable$IconRenderer");
this.setLazyRenderer (javax.swing.ImageIcon, "javax.swing.JTable$IconRenderer");
this.setLazyRenderer (Boolean, "javax.swing.JTable$BooleanRenderer");
});
Clazz.defineMethod (c$, "setLazyEditor", 
 function (c, s) {
this.setLazyValue (this.defaultEditorsByColumnClass, c, s);
}, "Class,~S");
Clazz.defineMethod (c$, "createDefaultEditors", 
function () {
this.defaultEditorsByColumnClass =  new javax.swing.UIDefaults (3, 0.75);
this.setLazyEditor (JavaObject, "javax.swing.JTable$GenericEditor");
this.setLazyEditor (Number, "javax.swing.JTable$NumberEditor");
this.setLazyEditor (Boolean, "javax.swing.JTable$BooleanEditor");
});
Clazz.defineMethod (c$, "initializeLocalVars", 
function () {
this.updateSelectionOnSort = true;
this.setOpaque (true);
this.createDefaultRenderers ();
this.createDefaultEditors ();
this.setTableHeader (this.createDefaultTableHeader ());
this.setShowGrid (true);
this.setAutoResizeMode (2);
this.setRowHeight (16);
this.isRowHeightSet = false;
this.setRowMargin (1);
this.setRowSelectionAllowed (true);
this.setCellEditor (null);
this.setEditingColumn (-1);
this.setEditingRow (-1);
this.setSurrendersFocusOnKeystroke (false);
this.setPreferredScrollableViewportSize ( new java.awt.Dimension (450, 400));
this.setAutoscrolls (true);
});
Clazz.defineMethod (c$, "createDefaultDataModel", 
function () {
return  new javax.swing.table.DefaultTableModel ();
});
Clazz.defineMethod (c$, "createDefaultColumnModel", 
function () {
return  new javax.swing.table.DefaultTableColumnModel ();
});
Clazz.defineMethod (c$, "createDefaultSelectionModel", 
function () {
return  new javax.swing.DefaultListSelectionModel ();
});
Clazz.defineMethod (c$, "createDefaultTableHeader", 
function () {
return  new javax.swing.table.JTableHeader (this.columnModel);
});
Clazz.defineMethod (c$, "resizeAndRepaint", 
function () {
this.revalidate ();
this.repaint ();
});
Clazz.defineMethod (c$, "getCellEditor", 
function () {
return this.cellEditor;
});
Clazz.defineMethod (c$, "setCellEditor", 
function (anEditor) {
var oldEditor = this.cellEditor;
this.cellEditor = anEditor;
this.firePropertyChangeObject ("tableCellEditor", oldEditor, anEditor);
}, "javax.swing.table.TableCellEditor");
Clazz.defineMethod (c$, "setEditingColumn", 
function (aColumn) {
this.editingColumn = aColumn;
}, "~N");
Clazz.defineMethod (c$, "setEditingRow", 
function (aRow) {
this.editingRow = aRow;
}, "~N");
Clazz.defineMethod (c$, "getCellRenderer", 
function (row, column) {
var tableColumn = this.getColumnModel ().getColumn (column);
var renderer = tableColumn.getCellRenderer ();
if (renderer == null) {
renderer = this.getDefaultRenderer (this.getColumnClass (column));
}return renderer;
}, "~N,~N");
Clazz.defineMethod (c$, "prepareRenderer", 
function (renderer, row, column) {
var value = this.getValueAt (row, column);
var isSelected = false;
var hasFocus = false;
if (!this.isPaintingForPrint ()) {
isSelected = this.isCellSelected (row, column);
var rowIsLead = (this.selectionModel.getLeadSelectionIndex () == row);
var colIsLead = (this.columnModel.getSelectionModel ().getLeadSelectionIndex () == column);
hasFocus = (rowIsLead && colIsLead) && this.isFocusOwner ();
}return renderer.getTableCellRendererComponent (this, value, isSelected, hasFocus, row, column);
}, "javax.swing.table.TableCellRenderer,~N,~N");
Clazz.defineMethod (c$, "getCellEditor", 
function (row, column) {
var tableColumn = this.getColumnModel ().getColumn (column);
var editor = tableColumn.getCellEditor ();
if (editor == null) {
editor = this.getDefaultEditor (this.getColumnClass (column));
}return editor;
}, "~N,~N");
Clazz.defineMethod (c$, "prepareEditor", 
function (editor, row, column) {
var value = this.getValueAt (row, column);
var isSelected = this.isCellSelected (row, column);
var comp = editor.getTableCellEditorComponent (this, value, isSelected, row, column);
return comp;
}, "javax.swing.table.TableCellEditor,~N,~N");
Clazz.defineMethod (c$, "removeEditor", 
function () {
});
c$.$JTable$SortManager$ = function () {
Clazz.pu$h(self.c$);
c$ = Clazz.decorateAsClass (function () {
Clazz.prepareCallback (this, arguments);
this.sorter = null;
this.modelSelection = null;
this.modelLeadIndex = 0;
this.syncingSelection = false;
this.lastModelSelection = null;
this.modelRowSizes = null;
Clazz.instantialize (this, arguments);
}, javax.swing.JTable, "SortManager");
Clazz.makeConstructor (c$, 
function (a) {
this.sorter = a;
a.addRowSorterListener (this.b$["javax.swing.JTable"]);
}, "javax.swing.RowSorter");
Clazz.defineMethod (c$, "dispose", 
function () {
if (this.sorter != null) {
this.sorter.removeRowSorterListener (this.b$["javax.swing.JTable"]);
}});
Clazz.defineMethod (c$, "setViewRowHeight", 
function (a, b) {
if (this.modelRowSizes == null) {
this.modelRowSizes =  new javax.swing.SizeSequence (this.b$["javax.swing.JTable"].getModel ().getRowCount (), this.b$["javax.swing.JTable"].getRowHeight ());
}this.modelRowSizes.setSize (this.b$["javax.swing.JTable"].convertRowIndexToModel (a), b);
}, "~N,~N");
Clazz.defineMethod (c$, "allChanged", 
function () {
this.modelLeadIndex = -1;
this.modelSelection = null;
this.modelRowSizes = null;
});
Clazz.defineMethod (c$, "viewSelectionChanged", 
function (a) {
if (!this.syncingSelection && this.modelSelection != null) {
this.modelSelection = null;
}}, "javax.swing.event.ListSelectionEvent");
Clazz.defineMethod (c$, "prepareForChange", 
function (a, b) {
if (this.b$["javax.swing.JTable"].getUpdateSelectionOnSort ()) {
this.cacheSelection (a, b);
}}, "javax.swing.event.RowSorterEvent,javax.swing.JTable.ModelChange");
Clazz.defineMethod (c$, "cacheSelection", 
 function (a, b) {
if (a != null) {
if (this.modelSelection == null && this.sorter.getViewRowCount () != this.b$["javax.swing.JTable"].getModel ().getRowCount ()) {
this.modelSelection =  new javax.swing.DefaultListSelectionModel ();
var c = this.b$["javax.swing.JTable"].getSelectionModel ();
var d = c.getMinSelectionIndex ();
var e = c.getMaxSelectionIndex ();
var f;
for (var g = d; g <= e; g++) {
if (c.isSelectedIndex (g)) {
f = this.b$["javax.swing.JTable"].convertRowIndexToModel (a, g);
if (f != -1) {
this.modelSelection.addSelectionInterval (f, f);
}}}
f = this.b$["javax.swing.JTable"].convertRowIndexToModel (a, c.getLeadSelectionIndex ());
sun.swing.SwingUtilities2.setLeadAnchorWithoutSelection (this.modelSelection, f, f);
} else if (this.modelSelection == null) {
this.cacheModelSelection (a);
}} else if (b.allRowsChanged) {
this.modelSelection = null;
} else if (this.modelSelection != null) {
switch (b.type) {
case -1:
this.modelSelection.removeIndexInterval (b.startModelIndex, b.endModelIndex);
break;
case 1:
this.modelSelection.insertIndexInterval (b.startModelIndex, b.endModelIndex, true);
break;
default:
break;
}
} else {
this.cacheModelSelection (null);
}}, "javax.swing.event.RowSorterEvent,javax.swing.JTable.ModelChange");
Clazz.defineMethod (c$, "cacheModelSelection", 
 function (a) {
this.lastModelSelection = this.b$["javax.swing.JTable"].convertSelectionToModel (a);
this.modelLeadIndex = this.b$["javax.swing.JTable"].convertRowIndexToModel (a, this.b$["javax.swing.JTable"].selectionModel.getLeadSelectionIndex ());
}, "javax.swing.event.RowSorterEvent");
Clazz.defineMethod (c$, "processChange", 
function (a, b, c) {
if (b != null) {
if (b.allRowsChanged) {
this.modelRowSizes = null;
this.b$["javax.swing.JTable"].rowModel = null;
} else if (this.modelRowSizes != null) {
if (b.type == 1) {
this.modelRowSizes.insertEntries (b.startModelIndex, b.endModelIndex - b.startModelIndex + 1, this.b$["javax.swing.JTable"].getRowHeight ());
} else if (b.type == -1) {
this.modelRowSizes.removeEntries (b.startModelIndex, b.endModelIndex - b.startModelIndex + 1);
}}}if (c) {
this.setViewRowHeightsFromModel ();
this.restoreSelection (b);
}}, "javax.swing.event.RowSorterEvent,javax.swing.JTable.ModelChange,~B");
Clazz.defineMethod (c$, "setViewRowHeightsFromModel", 
 function () {
if (this.modelRowSizes != null) {
this.b$["javax.swing.JTable"].rowModel.setSizes (this.b$["javax.swing.JTable"].getRowCount (), this.b$["javax.swing.JTable"].getRowHeight ());
for (var a = this.b$["javax.swing.JTable"].getRowCount () - 1; a >= 0; a--) {
var b = this.b$["javax.swing.JTable"].convertRowIndexToModel (a);
this.b$["javax.swing.JTable"].rowModel.setSize (a, this.modelRowSizes.getSize (b));
}
}});
Clazz.defineMethod (c$, "restoreSelection", 
 function (a) {
this.syncingSelection = true;
if (this.lastModelSelection != null) {
this.b$["javax.swing.JTable"].restoreSortingSelection (this.lastModelSelection, this.modelLeadIndex, a);
this.lastModelSelection = null;
} else if (this.modelSelection != null) {
var b = this.b$["javax.swing.JTable"].getSelectionModel ();
b.setValueIsAdjusting (true);
b.clearSelection ();
var c = this.modelSelection.getMinSelectionIndex ();
var d = this.modelSelection.getMaxSelectionIndex ();
var e;
for (var f = c; f <= d; f++) {
if (this.modelSelection.isSelectedIndex (f)) {
e = this.b$["javax.swing.JTable"].convertRowIndexToView (f);
if (e != -1) {
b.addSelectionInterval (e, e);
}}}
var g = this.modelSelection.getLeadSelectionIndex ();
if (g != -1) {
g = this.b$["javax.swing.JTable"].convertRowIndexToView (g);
}sun.swing.SwingUtilities2.setLeadAnchorWithoutSelection (b, g, g);
b.setValueIsAdjusting (false);
}this.syncingSelection = false;
}, "javax.swing.JTable.ModelChange");
c$ = Clazz.p0p ();
};
c$.$JTable$ModelChange$ = function () {
Clazz.pu$h(self.c$);
c$ = Clazz.decorateAsClass (function () {
Clazz.prepareCallback (this, arguments);
this.startModelIndex = 0;
this.endModelIndex = 0;
this.type = 0;
this.modelRowCount = 0;
this.event = null;
this.length = 0;
this.allRowsChanged = false;
Clazz.instantialize (this, arguments);
}, javax.swing.JTable, "ModelChange");
Clazz.makeConstructor (c$, 
function (a) {
this.startModelIndex = Math.max (0, a.getFirstRow ());
this.endModelIndex = a.getLastRow ();
this.modelRowCount = this.b$["javax.swing.JTable"].getModel ().getRowCount ();
if (this.endModelIndex < 0) {
this.endModelIndex = Math.max (0, this.modelRowCount - 1);
}this.length = this.endModelIndex - this.startModelIndex + 1;
this.type = a.getType ();
this.event = a;
this.allRowsChanged = (a.getLastRow () == 2147483647);
}, "javax.swing.event.TableModelEvent");
c$ = Clazz.p0p ();
};
Clazz.pu$h(self.c$);
c$ = Clazz.declareType (javax.swing.JTable, "PrintMode", Enum);
Clazz.defineEnumConstant (c$, "NORMAL", 0, []);
Clazz.defineEnumConstant (c$, "FIT_WIDTH", 1, []);
c$ = Clazz.p0p ();
c$.$JTable$1$ = function () {
Clazz.pu$h(self.c$);
c$ = Clazz.declareAnonymous (javax.swing, "JTable$1", javax.swing.table.AbstractTableModel);
Clazz.overrideMethod (c$, "getColumnName", 
function (column) {
return this.f$.columnNames[column].toString ();
}, "~N");
Clazz.defineMethod (c$, "getRowCount", 
function () {
return this.f$.rowData.length;
});
Clazz.defineMethod (c$, "getColumnCount", 
function () {
return this.f$.columnNames.length;
});
Clazz.defineMethod (c$, "getValueAt", 
function (row, col) {
return this.f$.rowData[row][col];
}, "~N,~N");
Clazz.overrideMethod (c$, "isCellEditable", 
function (row, column) {
return true;
}, "~N,~N");
Clazz.overrideMethod (c$, "setValueAt", 
function (value, row, col) {
this.f$.rowData[row][col] = value;
this.fireTableCellUpdated (row, col);
}, "~O,~N,~N");
c$ = Clazz.p0p ();
};
c$.$JTable$2$ = function () {
Clazz.pu$h(self.c$);
c$ = Clazz.declareAnonymous (javax.swing, "JTable$2", null, javax.swing.JTable.Resizable3);
Clazz.defineMethod (c$, "getElementCount", 
function () {
return this.f$.cm.getColumnCount ();
});
Clazz.defineMethod (c$, "getLowerBoundAt", 
function (i) {
return this.f$.cm.getColumn (i).getMinWidth ();
}, "~N");
Clazz.defineMethod (c$, "getUpperBoundAt", 
function (i) {
return this.f$.cm.getColumn (i).getMaxWidth ();
}, "~N");
Clazz.defineMethod (c$, "getMidPointAt", 
function (i) {
if (!this.f$.inverse) {
return this.f$.cm.getColumn (i).getPreferredWidth ();
} else {
return this.f$.cm.getColumn (i).getWidth ();
}}, "~N");
Clazz.defineMethod (c$, "setSizeAt", 
function (s, i) {
if (!this.f$.inverse) {
this.f$.cm.getColumn (i).setWidth (s);
} else {
this.f$.cm.getColumn (i).setPreferredWidth (s);
}}, "~N,~N");
c$ = Clazz.p0p ();
};
c$.$JTable$3$ = function () {
Clazz.pu$h(self.c$);
c$ = Clazz.declareAnonymous (javax.swing, "JTable$3", null, javax.swing.JTable.Resizable3);
Clazz.defineMethod (c$, "getElementCount", 
function () {
return this.f$.end - this.f$.start;
});
Clazz.defineMethod (c$, "getLowerBoundAt", 
function (i) {
return this.f$.cm.getColumn (i + this.f$.start).getMinWidth ();
}, "~N");
Clazz.defineMethod (c$, "getUpperBoundAt", 
function (i) {
return this.f$.cm.getColumn (i + this.f$.start).getMaxWidth ();
}, "~N");
Clazz.defineMethod (c$, "getMidPointAt", 
function (i) {
return this.f$.cm.getColumn (i + this.f$.start).getWidth ();
}, "~N");
Clazz.defineMethod (c$, "setSizeAt", 
function (s, i) {
this.f$.cm.getColumn (i + this.f$.start).setWidth (s);
}, "~N,~N");
c$ = Clazz.p0p ();
};
c$.$JTable$4$ = function () {
Clazz.pu$h(self.c$);
c$ = Clazz.declareAnonymous (javax.swing, "JTable$4", null, javax.swing.JTable.Resizable2);
Clazz.defineMethod (c$, "getElementCount", 
function () {
return this.f$.r.getElementCount ();
});
Clazz.defineMethod (c$, "getLowerBoundAt", 
function (i) {
return this.f$.r.getLowerBoundAt (i);
}, "~N");
Clazz.defineMethod (c$, "getUpperBoundAt", 
function (i) {
return this.f$.r.getMidPointAt (i);
}, "~N");
Clazz.defineMethod (c$, "setSizeAt", 
function (newSize, i) {
this.f$.r.setSizeAt (newSize, i);
}, "~N,~N");
c$ = Clazz.p0p ();
};
c$.$JTable$5$ = function () {
Clazz.pu$h(self.c$);
c$ = Clazz.declareAnonymous (javax.swing, "JTable$5", null, javax.swing.JTable.Resizable2);
Clazz.defineMethod (c$, "getElementCount", 
function () {
return this.f$.r.getElementCount ();
});
Clazz.defineMethod (c$, "getLowerBoundAt", 
function (i) {
return this.f$.r.getMidPointAt (i);
}, "~N");
Clazz.defineMethod (c$, "getUpperBoundAt", 
function (i) {
return this.f$.r.getUpperBoundAt (i);
}, "~N");
Clazz.defineMethod (c$, "setSizeAt", 
function (newSize, i) {
this.f$.r.setSizeAt (newSize, i);
}, "~N,~N");
c$ = Clazz.p0p ();
};
Clazz.declareInterface (javax.swing.JTable, "Resizable2");
Clazz.declareInterface (javax.swing.JTable, "Resizable3", javax.swing.JTable.Resizable2);
Clazz.pu$h(self.c$);
c$ = Clazz.declareType (javax.swing.JTable, "NumberRenderer", javax.swing.table.DefaultTableCellRenderer.UIResource);
Clazz.makeConstructor (c$, 
function () {
Clazz.superConstructor (this, javax.swing.JTable.NumberRenderer);
this.setHorizontalAlignment (4);
});
c$ = Clazz.p0p ();
Clazz.pu$h(self.c$);
c$ = Clazz.decorateAsClass (function () {
this.formatter = null;
Clazz.instantialize (this, arguments);
}, javax.swing.JTable, "DoubleRenderer", javax.swing.JTable.NumberRenderer);
Clazz.overrideMethod (c$, "setValue", 
function (a) {
if (this.formatter == null) {
this.formatter = java.text.NumberFormat.getInstance ();
}this.setText ((a == null) ? "" : this.formatter.format (a));
}, "~O");
c$ = Clazz.p0p ();
Clazz.pu$h(self.c$);
c$ = Clazz.declareType (javax.swing.JTable, "IconRenderer", javax.swing.table.DefaultTableCellRenderer.UIResource);
Clazz.makeConstructor (c$, 
function () {
Clazz.superConstructor (this, javax.swing.JTable.IconRenderer);
this.setHorizontalAlignment (0);
});
Clazz.overrideMethod (c$, "setValue", 
function (a) {
this.setIcon ((Clazz.instanceOf (a, javax.swing.Icon)) ? a : null);
}, "~O");
c$ = Clazz.p0p ();
Clazz.pu$h(self.c$);
c$ = Clazz.declareType (javax.swing.JTable, "BooleanRenderer", javax.swing.JCheckBox, [javax.swing.table.TableCellRenderer, javax.swing.plaf.UIResource]);
Clazz.makeConstructor (c$, 
function () {
Clazz.superConstructor (this, javax.swing.JTable.BooleanRenderer);
this.setHorizontalAlignment (0);
this.setBorderPainted (true);
});
Clazz.overrideMethod (c$, "getTableCellRendererComponent", 
function (a, b, c, d, e, f) {
if (c) {
this.setForeground (a.getSelectionForeground ());
Clazz.superCall (this, javax.swing.JTable.BooleanRenderer, "setBackground", [a.getSelectionBackground ()]);
} else {
this.setForeground (a.getForeground ());
this.setBackground (a.getBackground ());
}this.setSelected ((b != null && (b).booleanValue ()));
if (d) {
this.setBorder (javax.swing.UIManager.getBorder ("Table.focusCellHighlightBorder"));
} else {
this.setBorder (javax.swing.JTable.BooleanRenderer.noFocusBorder);
}return this;
}, "javax.swing.JTable,~O,~B,~B,~N,~N");
c$.noFocusBorder = c$.prototype.noFocusBorder =  new javax.swing.border.EmptyBorder (1, 1, 1, 1);
c$ = Clazz.p0p ();
Clazz.pu$h(self.c$);
c$ = Clazz.decorateAsClass (function () {
this.argTypes = null;
this.constructor = null;
this.value = null;
Clazz.instantialize (this, arguments);
}, javax.swing.JTable, "GenericEditor", javax.swing.DefaultCellEditor);
Clazz.prepareFields (c$, function () {
this.argTypes = [String];
});
Clazz.makeConstructor (c$, 
function () {
Clazz.superConstructor (this, javax.swing.JTable.GenericEditor, [ new javax.swing.JTextField ()]);
this.getComponent ().setName ("Table.editor");
});
Clazz.defineMethod (c$, "stopCellEditing", 
function () {
var a = Clazz.superCall (this, javax.swing.JTable.GenericEditor, "getCellEditorValue", []);
try {
if ("".equals (a)) {
if (this.constructor.getDeclaringClass () === String) {
this.value = a;
}Clazz.superCall (this, javax.swing.JTable.GenericEditor, "stopCellEditing", []);
}this.value = this.constructor.newInstance ([a]);
} catch (e) {
if (Clazz.exceptionOf (e, Exception)) {
(this.getComponent ()).setBorder ( new javax.swing.border.LineBorder (java.awt.Color.red));
return false;
} else {
throw e;
}
}
return Clazz.superCall (this, javax.swing.JTable.GenericEditor, "stopCellEditing", []);
});
Clazz.defineMethod (c$, "getTableCellEditorComponent", 
function (a, b, c, d, e) {
this.value = null;
(this.getComponent ()).setBorder ( new javax.swing.border.LineBorder (java.awt.Color.black));
try {
var f = a.getColumnClass (e);
if (f === Clazz._O) {
f = String;
}this.constructor = f.getConstructor (this.argTypes);
} catch (e) {
if (Clazz.exceptionOf (e, Exception)) {
return null;
} else {
throw e;
}
}
return Clazz.superCall (this, javax.swing.JTable.GenericEditor, "getTableCellEditorComponent", [a, b, c, d, e]);
}, "javax.swing.JTable,~O,~B,~N,~N");
Clazz.defineMethod (c$, "getCellEditorValue", 
function () {
return this.value;
});
c$ = Clazz.p0p ();
Clazz.pu$h(self.c$);
c$ = Clazz.declareType (javax.swing.JTable, "NumberEditor", javax.swing.JTable.GenericEditor);
Clazz.makeConstructor (c$, 
function () {
Clazz.superConstructor (this, javax.swing.JTable.NumberEditor, []);
(this.getComponent ()).setHorizontalAlignment (4);
});
c$ = Clazz.p0p ();
Clazz.pu$h(self.c$);
c$ = Clazz.declareType (javax.swing.JTable, "BooleanEditor", javax.swing.DefaultCellEditor);
Clazz.makeConstructor (c$, 
function () {
Clazz.superConstructor (this, javax.swing.JTable.BooleanEditor, [ new javax.swing.JCheckBox ()]);
var a = this.getComponent ();
a.setHorizontalAlignment (0);
});
c$ = Clazz.p0p ();
Clazz.defineStatics (c$,
"AUTO_RESIZE_OFF", 0,
"AUTO_RESIZE_NEXT_COLUMN", 1,
"AUTO_RESIZE_SUBSEQUENT_COLUMNS", 2,
"AUTO_RESIZE_LAST_COLUMN", 3,
"AUTO_RESIZE_ALL_COLUMNS", 4);
});

Clazz.declarePackage ("jssun.swing.table");
Clazz.load (["javax.swing.plaf.UIResource", "javax.swing.table.DefaultTableCellRenderer"], "jssun.swing.table.DefaultTableCellHeaderRenderer", ["javax.swing.SortOrder", "jssun.swing.DefaultLookup"], function () {
c$ = Clazz.decorateAsClass (function () {
this.horizontalTextPositionSet = false;
Clazz.instantialize (this, arguments);
}, jssun.swing.table, "DefaultTableCellHeaderRenderer", javax.swing.table.DefaultTableCellRenderer, javax.swing.plaf.UIResource);
Clazz.makeConstructor (c$, 
function () {
Clazz.superConstructor (this, jssun.swing.table.DefaultTableCellHeaderRenderer, []);
this.setHorizontalAlignment (0);
});
Clazz.defineMethod (c$, "setHorizontalTextPosition", 
function (textPosition) {
this.horizontalTextPositionSet = true;
Clazz.superCall (this, jssun.swing.table.DefaultTableCellHeaderRenderer, "setHorizontalTextPosition", [textPosition]);
}, "~N");
Clazz.overrideMethod (c$, "getTableCellRendererComponent", 
function (table, value, isSelected, hasFocus, row, column) {
var sortIcon = null;
var isPaintingForPrint = false;
if (table != null) {
var header = table.getTableHeader ();
if (header != null) {
var fgColor = null;
var bgColor = null;
if (hasFocus) {
fgColor = jssun.swing.DefaultLookup.getColor (this, this.ui, "TableHeader.focusCellForeground");
bgColor = jssun.swing.DefaultLookup.getColor (this, this.ui, "TableHeader.focusCellBackground");
}if (fgColor == null) {
fgColor = header.getForeground ();
}if (bgColor == null) {
bgColor = header.getBackground ();
}this.setForeground (fgColor);
this.setBackground (bgColor);
this.setFont (header.getFont ());
isPaintingForPrint = header.isPaintingForPrint ();
}if (!isPaintingForPrint && table.getRowSorter () != null) {
if (!this.horizontalTextPositionSet) {
this.setHorizontalTextPosition (10);
}var sortOrder = jssun.swing.table.DefaultTableCellHeaderRenderer.getColumnSortOrder (table, column);
if (sortOrder != null) {
switch (sortOrder) {
case javax.swing.SortOrder.ASCENDING:
sortIcon = jssun.swing.DefaultLookup.getIcon (this, this.ui, "Table.ascendingSortIcon");
break;
case javax.swing.SortOrder.DESCENDING:
sortIcon = jssun.swing.DefaultLookup.getIcon (this, this.ui, "Table.descendingSortIcon");
break;
case javax.swing.SortOrder.UNSORTED:
sortIcon = jssun.swing.DefaultLookup.getIcon (this, this.ui, "Table.naturalSortIcon");
break;
}
}}}this.setText (value == null ? "" : value.toString ());
this.setIcon (sortIcon);
var border = null;
if (hasFocus) {
border = jssun.swing.DefaultLookup.getBorder (this, this.ui, "TableHeader.focusCellBorder");
}if (border == null) {
border = jssun.swing.DefaultLookup.getBorder (this, this.ui, "TableHeader.cellBorder");
}this.setBorder (border);
return this;
}, "javax.swing.JTable,~O,~B,~B,~N,~N");
c$.getColumnSortOrder = Clazz.defineMethod (c$, "getColumnSortOrder", 
function (table, column) {
var rv = null;
if (table == null || table.getRowSorter () == null) {
return rv;
}var sortKeys = table.getRowSorter ().getSortKeys ();
if (sortKeys.size () > 0 && sortKeys.get (0).getColumn () == table.convertColumnIndexToModel (column)) {
rv = sortKeys.get (0).getSortOrder ();
}return rv;
}, "javax.swing.JTable,~N");
Clazz.overrideMethod (c$, "paintComponent", 
function (g) {
}, "java.awt.Graphics");
});

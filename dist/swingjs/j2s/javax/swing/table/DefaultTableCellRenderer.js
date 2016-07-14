Clazz.declarePackage ("javax.swing.table");
Clazz.load (["javax.swing.JLabel", "javax.swing.plaf.UIResource", "javax.swing.table.TableCellRenderer", "javax.swing.border.EmptyBorder"], "javax.swing.table.DefaultTableCellRenderer", ["sun.swing.DefaultLookup"], function () {
c$ = Clazz.decorateAsClass (function () {
this.unselectedForeground = null;
this.unselectedBackground = null;
Clazz.instantialize (this, arguments);
}, javax.swing.table, "DefaultTableCellRenderer", javax.swing.JLabel, javax.swing.table.TableCellRenderer);
Clazz.makeConstructor (c$, 
function () {
Clazz.superConstructor (this, javax.swing.table.DefaultTableCellRenderer);
this.setOpaque (true);
this.setBorder (this.getNoFocusBorder ());
this.setName ("Table.cellRenderer");
});
Clazz.defineMethod (c$, "getNoFocusBorder", 
 function () {
var border = sun.swing.DefaultLookup.getBorder (this, this.ui, "Table.cellNoFocusBorder");
if (System.getSecurityManager () != null) {
if (border != null) return border;
return javax.swing.table.DefaultTableCellRenderer.SAFE_NO_FOCUS_BORDER;
} else if (border != null) {
if (javax.swing.table.DefaultTableCellRenderer.noFocusBorder == null || javax.swing.table.DefaultTableCellRenderer.noFocusBorder === javax.swing.table.DefaultTableCellRenderer.DEFAULT_NO_FOCUS_BORDER) {
return border;
}}return javax.swing.table.DefaultTableCellRenderer.noFocusBorder;
});
Clazz.defineMethod (c$, "setForeground", 
function (c) {
Clazz.superCall (this, javax.swing.table.DefaultTableCellRenderer, "setForeground", [c]);
this.unselectedForeground = c;
}, "java.awt.Color");
Clazz.defineMethod (c$, "setBackground", 
function (c) {
Clazz.superCall (this, javax.swing.table.DefaultTableCellRenderer, "setBackground", [c]);
this.unselectedBackground = c;
}, "java.awt.Color");
Clazz.defineMethod (c$, "updateUI", 
function () {
Clazz.superCall (this, javax.swing.table.DefaultTableCellRenderer, "updateUI", []);
this.setForeground (null);
this.setBackground (null);
});
Clazz.overrideMethod (c$, "getTableCellRendererComponent", 
function (table, value, isSelected, hasFocus, row, column) {
var fg = null;
var bg = null;
if (isSelected) {
Clazz.superCall (this, javax.swing.table.DefaultTableCellRenderer, "setForeground", [fg == null ? table.getSelectionForeground () : fg]);
Clazz.superCall (this, javax.swing.table.DefaultTableCellRenderer, "setBackground", [bg == null ? table.getSelectionBackground () : bg]);
} else {
var background = this.unselectedBackground != null ? this.unselectedBackground : table.getBackground ();
if (background == null || Clazz.instanceOf (background, javax.swing.plaf.UIResource)) {
var alternateColor = sun.swing.DefaultLookup.getColor (this, this.ui, "Table.alternateRowColor");
if (alternateColor != null && row % 2 != 0) {
background = alternateColor;
}}Clazz.superCall (this, javax.swing.table.DefaultTableCellRenderer, "setForeground", [this.unselectedForeground != null ? this.unselectedForeground : table.getForeground ()]);
Clazz.superCall (this, javax.swing.table.DefaultTableCellRenderer, "setBackground", [background]);
}this.setFont (table.getFont ());
if (hasFocus) {
var border = null;
if (isSelected) {
border = sun.swing.DefaultLookup.getBorder (this, this.ui, "Table.focusSelectedCellHighlightBorder");
}if (border == null) {
border = sun.swing.DefaultLookup.getBorder (this, this.ui, "Table.focusCellHighlightBorder");
}this.setBorder (border);
if (!isSelected && table.isCellEditable (row, column)) {
var col;
col = sun.swing.DefaultLookup.getColor (this, this.ui, "Table.focusCellForeground");
if (col != null) {
Clazz.superCall (this, javax.swing.table.DefaultTableCellRenderer, "setForeground", [col]);
}col = sun.swing.DefaultLookup.getColor (this, this.ui, "Table.focusCellBackground");
if (col != null) {
Clazz.superCall (this, javax.swing.table.DefaultTableCellRenderer, "setBackground", [col]);
}}} else {
this.setBorder (this.getNoFocusBorder ());
}this.setValue (value);
return this;
}, "javax.swing.JTable,~O,~B,~B,~N,~N");
Clazz.defineMethod (c$, "isOpaque", 
function () {
var back = this.getBackground ();
var p = this.getParent ();
if (p != null) {
p = p.getParent ();
}var colorMatch = (back != null) && (p != null) && back.equals (p.getBackground ()) && p.isOpaque ();
return !colorMatch && Clazz.superCall (this, javax.swing.table.DefaultTableCellRenderer, "isOpaque", []);
});
Clazz.overrideMethod (c$, "invalidate", 
function () {
});
Clazz.overrideMethod (c$, "validate", 
function () {
});
Clazz.overrideMethod (c$, "revalidate", 
function () {
});
Clazz.defineMethod (c$, "repaint", 
function (tm, x, y, width, height) {
}, "~N,~N,~N,~N,~N");
Clazz.defineMethod (c$, "repaint", 
function (r) {
}, "java.awt.Rectangle");
Clazz.defineMethod (c$, "repaint", 
function () {
});
Clazz.overrideMethod (c$, "firePropertyChangeObject", 
function (propertyName, oldValue, newValue) {
}, "~S,~O,~O");
Clazz.overrideMethod (c$, "firePropertyChangeBool", 
function (propertyName, oldValue, newValue) {
}, "~S,~B,~B");
Clazz.defineMethod (c$, "setValue", 
function (value) {
this.setText ((value == null) ? "" : value.toString ());
}, "~O");
Clazz.pu$h(self.c$);
c$ = Clazz.declareType (javax.swing.table.DefaultTableCellRenderer, "UIResource", javax.swing.table.DefaultTableCellRenderer, javax.swing.plaf.UIResource);
c$ = Clazz.p0p ();
c$.SAFE_NO_FOCUS_BORDER = c$.prototype.SAFE_NO_FOCUS_BORDER =  new javax.swing.border.EmptyBorder (1, 1, 1, 1);
c$.DEFAULT_NO_FOCUS_BORDER = c$.prototype.DEFAULT_NO_FOCUS_BORDER =  new javax.swing.border.EmptyBorder (1, 1, 1, 1);
c$.noFocusBorder = c$.prototype.noFocusBorder = javax.swing.table.DefaultTableCellRenderer.DEFAULT_NO_FOCUS_BORDER;
});

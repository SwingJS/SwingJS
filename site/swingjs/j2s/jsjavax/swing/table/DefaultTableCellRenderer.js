Clazz.declarePackage ("jsjavax.swing.table");
Clazz.load (["jsjavax.swing.JLabel", "jsjavax.swing.plaf.UIResource", "jsjavax.swing.table.TableCellRenderer", "jsjavax.swing.border.EmptyBorder"], "jsjavax.swing.table.DefaultTableCellRenderer", ["jssun.swing.DefaultLookup"], function () {
c$ = Clazz.decorateAsClass (function () {
this.unselectedForeground = null;
this.unselectedBackground = null;
Clazz.instantialize (this, arguments);
}, jsjavax.swing.table, "DefaultTableCellRenderer", jsjavax.swing.JLabel, jsjavax.swing.table.TableCellRenderer);
Clazz.makeConstructor (c$, 
function () {
Clazz.superConstructor (this, jsjavax.swing.table.DefaultTableCellRenderer);
this.setOpaque (true);
this.setBorder (this.getNoFocusBorder ());
this.setName ("Table.cellRenderer");
});
Clazz.defineMethod (c$, "getNoFocusBorder", 
($fz = function () {
var border = jssun.swing.DefaultLookup.getBorder (this, this.ui, "Table.cellNoFocusBorder");
if (System.getSecurityManager () != null) {
if (border != null) return border;
return jsjavax.swing.table.DefaultTableCellRenderer.SAFE_NO_FOCUS_BORDER;
} else if (border != null) {
if (jsjavax.swing.table.DefaultTableCellRenderer.noFocusBorder == null || jsjavax.swing.table.DefaultTableCellRenderer.noFocusBorder === jsjavax.swing.table.DefaultTableCellRenderer.DEFAULT_NO_FOCUS_BORDER) {
return border;
}}return jsjavax.swing.table.DefaultTableCellRenderer.noFocusBorder;
}, $fz.isPrivate = true, $fz));
Clazz.defineMethod (c$, "setForeground", 
function (c) {
Clazz.superCall (this, jsjavax.swing.table.DefaultTableCellRenderer, "setForeground", [c]);
this.unselectedForeground = c;
}, "jsjava.awt.Color");
Clazz.defineMethod (c$, "setBackground", 
function (c) {
Clazz.superCall (this, jsjavax.swing.table.DefaultTableCellRenderer, "setBackground", [c]);
this.unselectedBackground = c;
}, "jsjava.awt.Color");
Clazz.defineMethod (c$, "updateUI", 
function () {
Clazz.superCall (this, jsjavax.swing.table.DefaultTableCellRenderer, "updateUI", []);
this.setForeground (null);
this.setBackground (null);
});
Clazz.overrideMethod (c$, "getTableCellRendererComponent", 
function (table, value, isSelected, hasFocus, row, column) {
var fg = null;
var bg = null;
if (isSelected) {
Clazz.superCall (this, jsjavax.swing.table.DefaultTableCellRenderer, "setForeground", [fg == null ? table.getSelectionForeground () : fg]);
Clazz.superCall (this, jsjavax.swing.table.DefaultTableCellRenderer, "setBackground", [bg == null ? table.getSelectionBackground () : bg]);
} else {
var background = this.unselectedBackground != null ? this.unselectedBackground : table.getBackground ();
if (background == null || Clazz.instanceOf (background, jsjavax.swing.plaf.UIResource)) {
var alternateColor = jssun.swing.DefaultLookup.getColor (this, this.ui, "Table.alternateRowColor");
if (alternateColor != null && row % 2 != 0) {
background = alternateColor;
}}Clazz.superCall (this, jsjavax.swing.table.DefaultTableCellRenderer, "setForeground", [this.unselectedForeground != null ? this.unselectedForeground : table.getForeground ()]);
Clazz.superCall (this, jsjavax.swing.table.DefaultTableCellRenderer, "setBackground", [background]);
}this.setFont (table.getFont ());
if (hasFocus) {
var border = null;
if (isSelected) {
border = jssun.swing.DefaultLookup.getBorder (this, this.ui, "Table.focusSelectedCellHighlightBorder");
}if (border == null) {
border = jssun.swing.DefaultLookup.getBorder (this, this.ui, "Table.focusCellHighlightBorder");
}this.setBorder (border);
if (!isSelected && table.isCellEditable (row, column)) {
var col;
col = jssun.swing.DefaultLookup.getColor (this, this.ui, "Table.focusCellForeground");
if (col != null) {
Clazz.superCall (this, jsjavax.swing.table.DefaultTableCellRenderer, "setForeground", [col]);
}col = jssun.swing.DefaultLookup.getColor (this, this.ui, "Table.focusCellBackground");
if (col != null) {
Clazz.superCall (this, jsjavax.swing.table.DefaultTableCellRenderer, "setBackground", [col]);
}}} else {
this.setBorder (this.getNoFocusBorder ());
}this.setValue (value);
return this;
}, "jsjavax.swing.JTable,~O,~B,~B,~N,~N");
Clazz.defineMethod (c$, "isOpaque", 
function () {
var back = this.getBackground ();
var p = this.getParent ();
if (p != null) {
p = p.getParent ();
}var colorMatch = (back != null) && (p != null) && back.equals (p.getBackground ()) && p.isOpaque ();
return !colorMatch && Clazz.superCall (this, jsjavax.swing.table.DefaultTableCellRenderer, "isOpaque", []);
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
}, "jsjava.awt.Rectangle");
Clazz.defineMethod (c$, "repaint", 
function () {
});
Clazz.defineMethod (c$, "firePropertyChange", 
function (propertyName, oldValue, newValue) {
if (propertyName === "text" || propertyName === "labelFor" || propertyName === "displayedMnemonic" || ((propertyName === "font" || propertyName === "foreground") && oldValue !== newValue)) {
Clazz.superCall (this, jsjavax.swing.table.DefaultTableCellRenderer, "firePropertyChange", [propertyName, oldValue, newValue]);
}}, "~S,~O,~O");
Clazz.defineMethod (c$, "firePropertyChange", 
function (propertyName, oldValue, newValue) {
}, "~S,~B,~B");
Clazz.defineMethod (c$, "setValue", 
function (value) {
this.setText ((value == null) ? "" : value.toString ());
}, "~O");
Clazz.pu$h ();
c$ = Clazz.declareType (jsjavax.swing.table.DefaultTableCellRenderer, "UIResource", jsjavax.swing.table.DefaultTableCellRenderer, jsjavax.swing.plaf.UIResource);
c$ = Clazz.p0p ();
c$.SAFE_NO_FOCUS_BORDER = c$.prototype.SAFE_NO_FOCUS_BORDER =  new jsjavax.swing.border.EmptyBorder (1, 1, 1, 1);
c$.DEFAULT_NO_FOCUS_BORDER = c$.prototype.DEFAULT_NO_FOCUS_BORDER =  new jsjavax.swing.border.EmptyBorder (1, 1, 1, 1);
c$.noFocusBorder = c$.prototype.noFocusBorder = jsjavax.swing.table.DefaultTableCellRenderer.DEFAULT_NO_FOCUS_BORDER;
});

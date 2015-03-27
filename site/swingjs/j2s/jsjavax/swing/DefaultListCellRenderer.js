Clazz.declarePackage ("jsjavax.swing");
Clazz.load (["jsjavax.swing.JLabel", "$.ListCellRenderer", "jsjavax.swing.plaf.UIResource", "jsjavax.swing.border.EmptyBorder"], "jsjavax.swing.DefaultListCellRenderer", ["jsjavax.swing.Icon", "jssun.swing.DefaultLookup"], function () {
c$ = Clazz.declareType (jsjavax.swing, "DefaultListCellRenderer", jsjavax.swing.JLabel, jsjavax.swing.ListCellRenderer);
Clazz.makeConstructor (c$, 
function () {
Clazz.superConstructor (this, jsjavax.swing.DefaultListCellRenderer);
this.setOpaque (true);
this.setBorder (this.getNoFocusBorder ());
this.setName ("List.cellRenderer");
});
Clazz.defineMethod (c$, "getNoFocusBorder", 
($fz = function () {
var border = jssun.swing.DefaultLookup.getBorder (this, this.ui, "List.cellNoFocusBorder");
if (System.getSecurityManager () != null) {
if (border != null) return border;
return jsjavax.swing.DefaultListCellRenderer.SAFE_NO_FOCUS_BORDER;
} else {
if (border != null && (jsjavax.swing.DefaultListCellRenderer.noFocusBorder == null || jsjavax.swing.DefaultListCellRenderer.noFocusBorder === jsjavax.swing.DefaultListCellRenderer.DEFAULT_NO_FOCUS_BORDER)) {
return border;
}return jsjavax.swing.DefaultListCellRenderer.noFocusBorder;
}}, $fz.isPrivate = true, $fz));
Clazz.overrideMethod (c$, "getListCellRendererComponent", 
function (list, value, index, isSelected, cellHasFocus) {
this.setComponentOrientation (list.getComponentOrientation ());
var bg = null;
var fg = null;
if (isSelected) {
this.setBackground (bg == null ? list.getSelectionBackground () : bg);
this.setForeground (fg == null ? list.getSelectionForeground () : fg);
} else {
this.setBackground (list.getBackground ());
this.setForeground (list.getForeground ());
}if (Clazz.instanceOf (value, jsjavax.swing.Icon)) {
this.setIcon (value);
this.setText ("");
} else {
this.setIcon (null);
this.setText ((value == null) ? "" : value.toString ());
}this.setEnabled (list.isEnabled ());
this.setFont (list.getFont ());
var border = null;
if (cellHasFocus) {
if (isSelected) {
border = jssun.swing.DefaultLookup.getBorder (this, this.ui, "List.focusSelectedCellHighlightBorder");
}if (border == null) {
border = jssun.swing.DefaultLookup.getBorder (this, this.ui, "List.focusCellHighlightBorder");
}} else {
border = this.getNoFocusBorder ();
}this.setBorder (border);
return this;
}, "jsjavax.swing.JList,~O,~N,~B,~B");
Clazz.defineMethod (c$, "isOpaque", 
function () {
var back = this.getBackground ();
var p = this.getParent ();
if (p != null) {
p = p.getParent ();
}var colorMatch = (back != null) && (p != null) && back.equals (p.getBackground ()) && p.isOpaque ();
return !colorMatch && Clazz.superCall (this, jsjavax.swing.DefaultListCellRenderer, "isOpaque", []);
});
Clazz.overrideMethod (c$, "validate", 
function () {
});
Clazz.overrideMethod (c$, "invalidate", 
function () {
});
Clazz.defineMethod (c$, "repaint", 
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
Clazz.defineMethod (c$, "firePropertyChange", 
function (propertyName, oldValue, newValue) {
if (propertyName === "text" || ((propertyName === "font" || propertyName === "foreground") && oldValue !== newValue)) {
Clazz.superCall (this, jsjavax.swing.DefaultListCellRenderer, "firePropertyChange", [propertyName, oldValue, newValue]);
}}, "~S,~O,~O");
Clazz.defineMethod (c$, "firePropertyChange", 
function (propertyName, oldValue, newValue) {
}, "~S,~N,~N");
Clazz.defineMethod (c$, "firePropertyChange", 
function (propertyName, oldValue, newValue) {
}, "~S,~S,~S");
Clazz.defineMethod (c$, "firePropertyChange", 
function (propertyName, oldValue, newValue) {
}, "~S,~N,~N");
Clazz.defineMethod (c$, "firePropertyChange", 
function (propertyName, oldValue, newValue) {
}, "~S,~N,~N");
Clazz.defineMethod (c$, "firePropertyChange", 
function (propertyName, oldValue, newValue) {
}, "~S,~N,~N");
Clazz.defineMethod (c$, "firePropertyChange", 
function (propertyName, oldValue, newValue) {
}, "~S,~N,~N");
Clazz.defineMethod (c$, "firePropertyChange", 
function (propertyName, oldValue, newValue) {
}, "~S,~N,~N");
Clazz.defineMethod (c$, "firePropertyChange", 
function (propertyName, oldValue, newValue) {
}, "~S,~B,~B");
Clazz.pu$h ();
c$ = Clazz.declareType (jsjavax.swing.DefaultListCellRenderer, "UIResource", jsjavax.swing.DefaultListCellRenderer, jsjavax.swing.plaf.UIResource);
c$ = Clazz.p0p ();
c$.SAFE_NO_FOCUS_BORDER = c$.prototype.SAFE_NO_FOCUS_BORDER =  new jsjavax.swing.border.EmptyBorder (1, 1, 1, 1);
c$.DEFAULT_NO_FOCUS_BORDER = c$.prototype.DEFAULT_NO_FOCUS_BORDER =  new jsjavax.swing.border.EmptyBorder (1, 1, 1, 1);
c$.noFocusBorder = c$.prototype.noFocusBorder = jsjavax.swing.DefaultListCellRenderer.DEFAULT_NO_FOCUS_BORDER;
});

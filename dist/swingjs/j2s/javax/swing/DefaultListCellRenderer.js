Clazz.declarePackage ("javax.swing");
Clazz.load (["javax.swing.JLabel", "$.ListCellRenderer", "javax.swing.plaf.UIResource", "javax.swing.border.EmptyBorder"], "javax.swing.DefaultListCellRenderer", ["javax.swing.Icon", "sun.swing.DefaultLookup"], function () {
c$ = Clazz.declareType (javax.swing, "DefaultListCellRenderer", javax.swing.JLabel, javax.swing.ListCellRenderer);
Clazz.makeConstructor (c$, 
function () {
Clazz.superConstructor (this, javax.swing.DefaultListCellRenderer);
this.setOpaque (true);
this.setBorder (this.getNoFocusBorder ());
this.setName ("List.cellRenderer");
});
Clazz.defineMethod (c$, "getNoFocusBorder", 
 function () {
var border = sun.swing.DefaultLookup.getBorder (this, this.ui, "List.cellNoFocusBorder");
if (System.getSecurityManager () != null) {
if (border != null) return border;
return javax.swing.DefaultListCellRenderer.SAFE_NO_FOCUS_BORDER;
} else {
if (border != null && (javax.swing.DefaultListCellRenderer.noFocusBorder == null || javax.swing.DefaultListCellRenderer.noFocusBorder === javax.swing.DefaultListCellRenderer.DEFAULT_NO_FOCUS_BORDER)) {
return border;
}return javax.swing.DefaultListCellRenderer.noFocusBorder;
}});
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
}if (Clazz.instanceOf (value, javax.swing.Icon)) {
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
border = sun.swing.DefaultLookup.getBorder (this, this.ui, "List.focusSelectedCellHighlightBorder");
}if (border == null) {
border = sun.swing.DefaultLookup.getBorder (this, this.ui, "List.focusCellHighlightBorder");
}} else {
border = this.getNoFocusBorder ();
}this.setBorder (border);
return this;
}, "javax.swing.JList,~O,~N,~B,~B");
Clazz.defineMethod (c$, "isOpaque", 
function () {
var back = this.getBackground ();
var p = this.getParent ();
if (p != null) {
p = p.getParent ();
}var colorMatch = (back != null) && (p != null) && back.equals (p.getBackground ()) && p.isOpaque ();
return !colorMatch && Clazz.superCall (this, javax.swing.DefaultListCellRenderer, "isOpaque", []);
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
}, "java.awt.Rectangle");
Clazz.overrideMethod (c$, "firePropertyChangeObject", 
function (propertyName, oldValue, newValue) {
}, "~S,~O,~O");
Clazz.overrideMethod (c$, "firePropertyChangeByte", 
function (propertyName, oldValue, newValue) {
}, "~S,~N,~N");
Clazz.overrideMethod (c$, "firePropertyChangeChar", 
function (propertyName, oldValue, newValue) {
}, "~S,~S,~S");
Clazz.overrideMethod (c$, "firePropertyChangeShort", 
function (propertyName, oldValue, newValue) {
}, "~S,~N,~N");
Clazz.overrideMethod (c$, "firePropertyChangeInt", 
function (propertyName, oldValue, newValue) {
}, "~S,~N,~N");
Clazz.overrideMethod (c$, "firePropertyChangeLong", 
function (propertyName, oldValue, newValue) {
}, "~S,~N,~N");
Clazz.overrideMethod (c$, "firePropertyChangeFloat", 
function (propertyName, oldValue, newValue) {
}, "~S,~N,~N");
Clazz.overrideMethod (c$, "firePropertyChangeDouble", 
function (propertyName, oldValue, newValue) {
}, "~S,~N,~N");
Clazz.overrideMethod (c$, "firePropertyChangeBool", 
function (propertyName, oldValue, newValue) {
}, "~S,~B,~B");
Clazz.pu$h(self.c$);
c$ = Clazz.declareType (javax.swing.DefaultListCellRenderer, "UIResource", javax.swing.DefaultListCellRenderer, javax.swing.plaf.UIResource);
c$ = Clazz.p0p ();
c$.SAFE_NO_FOCUS_BORDER = c$.prototype.SAFE_NO_FOCUS_BORDER =  new javax.swing.border.EmptyBorder (1, 1, 1, 1);
c$.DEFAULT_NO_FOCUS_BORDER = c$.prototype.DEFAULT_NO_FOCUS_BORDER =  new javax.swing.border.EmptyBorder (1, 1, 1, 1);
c$.noFocusBorder = c$.prototype.noFocusBorder = javax.swing.DefaultListCellRenderer.DEFAULT_NO_FOCUS_BORDER;
});

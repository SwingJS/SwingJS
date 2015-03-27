Clazz.declarePackage ("jsjavax.swing.tree");
Clazz.load (["jsjavax.swing.JLabel", "jsjavax.swing.tree.TreeCellRenderer"], "jsjavax.swing.tree.DefaultTreeCellRenderer", ["jsjava.awt.Dimension", "jsjavax.swing.UIManager", "jsjavax.swing.border.EmptyBorder", "jsjavax.swing.plaf.ColorUIResource", "$.FontUIResource", "jssun.swing.DefaultLookup"], function () {
c$ = Clazz.decorateAsClass (function () {
this.tree = null;
this.selected = false;
this.$hasFocus = false;
this.drawsFocusBorderAroundIcon = false;
this.drawDashedFocusIndicator = false;
this.treeBGColor = null;
this.focusBGColor = null;
this.closedIcon = null;
this.leafIcon = null;
this.openIcon = null;
this.textSelectionColor = null;
this.textNonSelectionColor = null;
this.backgroundSelectionColor = null;
this.backgroundNonSelectionColor = null;
this.borderSelectionColor = null;
this.isDropCell = false;
this.fillBackground = true;
Clazz.instantialize (this, arguments);
}, jsjavax.swing.tree, "DefaultTreeCellRenderer", jsjavax.swing.JLabel, jsjavax.swing.tree.TreeCellRenderer);
Clazz.makeConstructor (c$, 
function () {
Clazz.superConstructor (this, jsjavax.swing.tree.DefaultTreeCellRenderer, []);
this.setLeafIcon (jssun.swing.DefaultLookup.getIcon (this, this.ui, "Tree.leafIcon"));
this.setClosedIcon (jssun.swing.DefaultLookup.getIcon (this, this.ui, "Tree.closedIcon"));
this.setOpenIcon (jssun.swing.DefaultLookup.getIcon (this, this.ui, "Tree.openIcon"));
this.setTextSelectionColor (jssun.swing.DefaultLookup.getColor (this, this.ui, "Tree.selectionForeground"));
this.setTextNonSelectionColor (jssun.swing.DefaultLookup.getColor (this, this.ui, "Tree.textForeground"));
this.setBackgroundSelectionColor (jssun.swing.DefaultLookup.getColor (this, this.ui, "Tree.selectionBackground"));
this.setBackgroundNonSelectionColor (jssun.swing.DefaultLookup.getColor (this, this.ui, "Tree.textBackground"));
this.setBorderSelectionColor (jssun.swing.DefaultLookup.getColor (this, this.ui, "Tree.selectionBorderColor"));
this.drawsFocusBorderAroundIcon = jssun.swing.DefaultLookup.getBoolean (this, this.ui, "Tree.drawsFocusBorderAroundIcon", false);
this.drawDashedFocusIndicator = jssun.swing.DefaultLookup.getBoolean (this, this.ui, "Tree.drawDashedFocusIndicator", false);
this.fillBackground = jssun.swing.DefaultLookup.getBoolean (this, this.ui, "Tree.rendererFillBackground", true);
var margins = jssun.swing.DefaultLookup.getInsets (this, this.ui, "Tree.rendererMargins");
if (margins != null) {
this.setBorder ( new jsjavax.swing.border.EmptyBorder (margins.top, margins.left, margins.bottom, margins.right));
}this.setName ("Tree.cellRenderer");
});
Clazz.defineMethod (c$, "getDefaultOpenIcon", 
function () {
return jssun.swing.DefaultLookup.getIcon (this, this.ui, "Tree.openIcon");
});
Clazz.defineMethod (c$, "getDefaultClosedIcon", 
function () {
return jssun.swing.DefaultLookup.getIcon (this, this.ui, "Tree.closedIcon");
});
Clazz.defineMethod (c$, "getDefaultLeafIcon", 
function () {
return jssun.swing.DefaultLookup.getIcon (this, this.ui, "Tree.leafIcon");
});
Clazz.defineMethod (c$, "setOpenIcon", 
function (newIcon) {
this.openIcon = newIcon;
}, "jsjavax.swing.Icon");
Clazz.defineMethod (c$, "getOpenIcon", 
function () {
return this.openIcon;
});
Clazz.defineMethod (c$, "setClosedIcon", 
function (newIcon) {
this.closedIcon = newIcon;
}, "jsjavax.swing.Icon");
Clazz.defineMethod (c$, "getClosedIcon", 
function () {
return this.closedIcon;
});
Clazz.defineMethod (c$, "setLeafIcon", 
function (newIcon) {
this.leafIcon = newIcon;
}, "jsjavax.swing.Icon");
Clazz.defineMethod (c$, "getLeafIcon", 
function () {
return this.leafIcon;
});
Clazz.defineMethod (c$, "setTextSelectionColor", 
function (newColor) {
this.textSelectionColor = newColor;
}, "jsjava.awt.Color");
Clazz.defineMethod (c$, "getTextSelectionColor", 
function () {
return this.textSelectionColor;
});
Clazz.defineMethod (c$, "setTextNonSelectionColor", 
function (newColor) {
this.textNonSelectionColor = newColor;
}, "jsjava.awt.Color");
Clazz.defineMethod (c$, "getTextNonSelectionColor", 
function () {
return this.textNonSelectionColor;
});
Clazz.defineMethod (c$, "setBackgroundSelectionColor", 
function (newColor) {
this.backgroundSelectionColor = newColor;
}, "jsjava.awt.Color");
Clazz.defineMethod (c$, "getBackgroundSelectionColor", 
function () {
return this.backgroundSelectionColor;
});
Clazz.defineMethod (c$, "setBackgroundNonSelectionColor", 
function (newColor) {
this.backgroundNonSelectionColor = newColor;
}, "jsjava.awt.Color");
Clazz.defineMethod (c$, "getBackgroundNonSelectionColor", 
function () {
return this.backgroundNonSelectionColor;
});
Clazz.defineMethod (c$, "setBorderSelectionColor", 
function (newColor) {
this.borderSelectionColor = newColor;
}, "jsjava.awt.Color");
Clazz.defineMethod (c$, "getBorderSelectionColor", 
function () {
return this.borderSelectionColor;
});
Clazz.defineMethod (c$, "setFont", 
function (font) {
if (Clazz.instanceOf (font, jsjavax.swing.plaf.FontUIResource)) font = null;
Clazz.superCall (this, jsjavax.swing.tree.DefaultTreeCellRenderer, "setFont", [font]);
}, "jsjava.awt.Font");
Clazz.defineMethod (c$, "getFont", 
function () {
var font = Clazz.superCall (this, jsjavax.swing.tree.DefaultTreeCellRenderer, "getFont", []);
if (font == null && this.tree != null) {
font = this.tree.getFont ();
}return font;
});
Clazz.defineMethod (c$, "setBackground", 
function (color) {
if (Clazz.instanceOf (color, jsjavax.swing.plaf.ColorUIResource)) color = null;
Clazz.superCall (this, jsjavax.swing.tree.DefaultTreeCellRenderer, "setBackground", [color]);
}, "jsjava.awt.Color");
Clazz.overrideMethod (c$, "getTreeCellRendererComponent", 
function (tree, value, sel, expanded, leaf, row, hasFocus) {
var stringValue = tree.convertValueToText (value, sel, expanded, leaf, row, hasFocus);
this.tree = tree;
this.$hasFocus = hasFocus;
this.setText (stringValue);
var fg = null;
this.isDropCell = false;
if (sel) {
fg = this.getTextSelectionColor ();
} else {
fg = this.getTextNonSelectionColor ();
}this.setForeground (fg);
var icon = null;
if (leaf) {
icon = this.getLeafIcon ();
} else if (expanded) {
icon = this.getOpenIcon ();
} else {
icon = this.getClosedIcon ();
}if (!tree.isEnabled ()) {
this.setEnabled (false);
var laf = jsjavax.swing.UIManager.getLookAndFeel ();
var disabledIcon = laf.getDisabledIcon (tree, icon);
if (disabledIcon != null) icon = disabledIcon;
this.setDisabledIcon (icon);
} else {
this.setEnabled (true);
this.setIcon (icon);
}this.setComponentOrientation (tree.getComponentOrientation ());
this.selected = sel;
return this;
}, "jsjavax.swing.JTree,~O,~B,~B,~B,~N,~B");
Clazz.defineMethod (c$, "paint", 
function (g) {
var bColor;
if (this.isDropCell) {
bColor = jssun.swing.DefaultLookup.getColor (this, this.ui, "Tree.dropCellBackground");
if (bColor == null) {
bColor = this.getBackgroundSelectionColor ();
}} else if (this.selected) {
bColor = this.getBackgroundSelectionColor ();
} else {
bColor = this.getBackgroundNonSelectionColor ();
if (bColor == null) {
bColor = this.getBackground ();
}}var imageOffset = -1;
if (bColor != null && this.fillBackground) {
imageOffset = this.getLabelStart ();
g.setColor (bColor);
if (this.getComponentOrientation ().isLeftToRight ()) {
g.fillRect (imageOffset, 0, this.getWidth () - imageOffset, this.getHeight ());
} else {
g.fillRect (0, 0, this.getWidth () - imageOffset, this.getHeight ());
}}if (this.$hasFocus) {
if (this.drawsFocusBorderAroundIcon) {
imageOffset = 0;
} else if (imageOffset == -1) {
imageOffset = this.getLabelStart ();
}if (this.getComponentOrientation ().isLeftToRight ()) {
this.paintFocus (g, imageOffset, 0, this.getWidth () - imageOffset, this.getHeight (), bColor);
} else {
this.paintFocus (g, 0, 0, this.getWidth () - imageOffset, this.getHeight (), bColor);
}}Clazz.superCall (this, jsjavax.swing.tree.DefaultTreeCellRenderer, "paint", [g]);
}, "jsjava.awt.Graphics");
Clazz.defineMethod (c$, "paintFocus", 
($fz = function (g, x, y, w, h, notColor) {
var bsColor = this.getBorderSelectionColor ();
if (bsColor != null && (this.selected || !this.drawDashedFocusIndicator)) {
g.setColor (bsColor);
g.drawRect (x, y, w - 1, h - 1);
}}, $fz.isPrivate = true, $fz), "jsjava.awt.Graphics,~N,~N,~N,~N,jsjava.awt.Color");
Clazz.defineMethod (c$, "getLabelStart", 
($fz = function () {
var currentI = this.getIcon ();
if (currentI != null && this.getText () != null) {
return currentI.getIconWidth () + Math.max (0, this.getIconTextGap () - 1);
}return 0;
}, $fz.isPrivate = true, $fz));
Clazz.defineMethod (c$, "getPreferredSize", 
function () {
var retDimension = Clazz.superCall (this, jsjavax.swing.tree.DefaultTreeCellRenderer, "getPreferredSize", []);
if (retDimension != null) retDimension =  new jsjava.awt.Dimension (retDimension.width + 3, retDimension.height);
return retDimension;
});
Clazz.overrideMethod (c$, "validate", 
function () {
});
Clazz.overrideMethod (c$, "invalidate", 
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
if (propertyName === "text" || ((propertyName === "font" || propertyName === "foreground") && oldValue !== newValue)) {
Clazz.superCall (this, jsjavax.swing.tree.DefaultTreeCellRenderer, "firePropertyChange", [propertyName, oldValue, newValue]);
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
});

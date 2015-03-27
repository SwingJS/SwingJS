Clazz.declarePackage ("jsjavax.swing");
Clazz.load (["jsjava.awt.LayoutManager", "jsjavax.swing.ScrollPaneConstants", "jsjavax.swing.plaf.UIResource"], "jsjavax.swing.ScrollPaneLayout", ["java.lang.IllegalArgumentException", "jsjava.awt.Dimension", "$.Insets", "$.Rectangle", "jsjavax.swing.Scrollable", "$.SwingUtilities", "$.UIManager"], function () {
c$ = Clazz.decorateAsClass (function () {
this.viewport = null;
this.vsb = null;
this.hsb = null;
this.rowHead = null;
this.colHead = null;
this.lowerLeft = null;
this.lowerRight = null;
this.upperLeft = null;
this.upperRight = null;
this.vsbPolicy = 20;
this.hsbPolicy = 30;
Clazz.instantialize (this, arguments);
}, jsjavax.swing, "ScrollPaneLayout", null, [jsjava.awt.LayoutManager, jsjavax.swing.ScrollPaneConstants]);
Clazz.defineMethod (c$, "syncWithScrollPane", 
function (sp) {
this.viewport = sp.getViewport ();
this.vsb = sp.getVerticalScrollBar ();
this.hsb = sp.getHorizontalScrollBar ();
this.rowHead = sp.getRowHeader ();
this.colHead = sp.getColumnHeader ();
this.lowerLeft = sp.getCorner ("LOWER_LEFT_CORNER");
this.lowerRight = sp.getCorner ("LOWER_RIGHT_CORNER");
this.upperLeft = sp.getCorner ("UPPER_LEFT_CORNER");
this.upperRight = sp.getCorner ("UPPER_RIGHT_CORNER");
this.vsbPolicy = sp.getVerticalScrollBarPolicy ();
this.hsbPolicy = sp.getHorizontalScrollBarPolicy ();
}, "jsjavax.swing.JScrollPane");
Clazz.defineMethod (c$, "addSingletonComponent", 
function (oldC, newC) {
if ((oldC != null) && (oldC !== newC)) {
oldC.getParent ().remove (oldC);
}return newC;
}, "jsjava.awt.Component,jsjava.awt.Component");
Clazz.overrideMethod (c$, "addLayoutComponent", 
function (s, c) {
if (s.equals ("VIEWPORT")) {
this.viewport = this.addSingletonComponent (this.viewport, c);
} else if (s.equals ("VERTICAL_SCROLLBAR")) {
this.vsb = this.addSingletonComponent (this.vsb, c);
} else if (s.equals ("HORIZONTAL_SCROLLBAR")) {
this.hsb = this.addSingletonComponent (this.hsb, c);
} else if (s.equals ("ROW_HEADER")) {
this.rowHead = this.addSingletonComponent (this.rowHead, c);
} else if (s.equals ("COLUMN_HEADER")) {
this.colHead = this.addSingletonComponent (this.colHead, c);
} else if (s.equals ("LOWER_LEFT_CORNER")) {
this.lowerLeft = this.addSingletonComponent (this.lowerLeft, c);
} else if (s.equals ("LOWER_RIGHT_CORNER")) {
this.lowerRight = this.addSingletonComponent (this.lowerRight, c);
} else if (s.equals ("UPPER_LEFT_CORNER")) {
this.upperLeft = this.addSingletonComponent (this.upperLeft, c);
} else if (s.equals ("UPPER_RIGHT_CORNER")) {
this.upperRight = this.addSingletonComponent (this.upperRight, c);
} else {
throw  new IllegalArgumentException ("invalid layout key " + s);
}}, "~S,jsjava.awt.Component");
Clazz.overrideMethod (c$, "removeLayoutComponent", 
function (c) {
if (c === this.viewport) {
this.viewport = null;
} else if (c === this.vsb) {
this.vsb = null;
} else if (c === this.hsb) {
this.hsb = null;
} else if (c === this.rowHead) {
this.rowHead = null;
} else if (c === this.colHead) {
this.colHead = null;
} else if (c === this.lowerLeft) {
this.lowerLeft = null;
} else if (c === this.lowerRight) {
this.lowerRight = null;
} else if (c === this.upperLeft) {
this.upperLeft = null;
} else if (c === this.upperRight) {
this.upperRight = null;
}}, "jsjava.awt.Component");
Clazz.defineMethod (c$, "getVerticalScrollBarPolicy", 
function () {
return this.vsbPolicy;
});
Clazz.defineMethod (c$, "setVerticalScrollBarPolicy", 
function (x) {
switch (x) {
case 20:
case 21:
case 22:
this.vsbPolicy = x;
break;
default:
throw  new IllegalArgumentException ("invalid verticalScrollBarPolicy");
}
}, "~N");
Clazz.defineMethod (c$, "getHorizontalScrollBarPolicy", 
function () {
return this.hsbPolicy;
});
Clazz.defineMethod (c$, "setHorizontalScrollBarPolicy", 
function (x) {
switch (x) {
case 30:
case 31:
case 32:
this.hsbPolicy = x;
break;
default:
throw  new IllegalArgumentException ("invalid horizontalScrollBarPolicy");
}
}, "~N");
Clazz.defineMethod (c$, "getViewport", 
function () {
return this.viewport;
});
Clazz.defineMethod (c$, "getHorizontalScrollBar", 
function () {
return this.hsb;
});
Clazz.defineMethod (c$, "getVerticalScrollBar", 
function () {
return this.vsb;
});
Clazz.defineMethod (c$, "getRowHeader", 
function () {
return this.rowHead;
});
Clazz.defineMethod (c$, "getColumnHeader", 
function () {
return this.colHead;
});
Clazz.defineMethod (c$, "getCorner", 
function (key) {
if (key.equals ("LOWER_LEFT_CORNER")) {
return this.lowerLeft;
} else if (key.equals ("LOWER_RIGHT_CORNER")) {
return this.lowerRight;
} else if (key.equals ("UPPER_LEFT_CORNER")) {
return this.upperLeft;
} else if (key.equals ("UPPER_RIGHT_CORNER")) {
return this.upperRight;
} else {
return null;
}}, "~S");
Clazz.overrideMethod (c$, "preferredLayoutSize", 
function (parent) {
var scrollPane = parent;
this.vsbPolicy = scrollPane.getVerticalScrollBarPolicy ();
this.hsbPolicy = scrollPane.getHorizontalScrollBarPolicy ();
var insets = parent.getInsets ();
var prefWidth = insets.left + insets.right;
var prefHeight = insets.top + insets.bottom;
var extentSize = null;
var viewSize = null;
var view = null;
if (this.viewport != null) {
extentSize = this.viewport.getPreferredSize ();
view = this.viewport.getView ();
if (view != null) {
viewSize = view.getPreferredSize ();
} else {
viewSize =  new jsjava.awt.Dimension (0, 0);
}}if (extentSize != null) {
prefWidth += extentSize.width;
prefHeight += extentSize.height;
}var viewportBorder = scrollPane.getViewportBorder ();
if (viewportBorder != null) {
var vpbInsets = viewportBorder.getBorderInsets (parent);
prefWidth += vpbInsets.left + vpbInsets.right;
prefHeight += vpbInsets.top + vpbInsets.bottom;
}if ((this.rowHead != null) && this.rowHead.isVisible ()) {
prefWidth += this.rowHead.getPreferredSize ().width;
}if ((this.colHead != null) && this.colHead.isVisible ()) {
prefHeight += this.colHead.getPreferredSize ().height;
}if ((this.vsb != null) && (this.vsbPolicy != 21)) {
if (this.vsbPolicy == 22) {
prefWidth += this.vsb.getPreferredSize ().width;
} else if ((viewSize != null) && (extentSize != null)) {
var canScroll = true;
if (Clazz.instanceOf (view, jsjavax.swing.Scrollable)) {
canScroll = !(view).getScrollableTracksViewportHeight ();
}if (canScroll && (viewSize.height > extentSize.height)) {
prefWidth += this.vsb.getPreferredSize ().width;
}}}if ((this.hsb != null) && (this.hsbPolicy != 31)) {
if (this.hsbPolicy == 32) {
prefHeight += this.hsb.getPreferredSize ().height;
} else if ((viewSize != null) && (extentSize != null)) {
var canScroll = true;
if (Clazz.instanceOf (view, jsjavax.swing.Scrollable)) {
canScroll = !(view).getScrollableTracksViewportWidth ();
}if (canScroll && (viewSize.width > extentSize.width)) {
prefHeight += this.hsb.getPreferredSize ().height;
}}}return  new jsjava.awt.Dimension (prefWidth, prefHeight);
}, "jsjava.awt.Container");
Clazz.overrideMethod (c$, "minimumLayoutSize", 
function (parent) {
var scrollPane = parent;
this.vsbPolicy = scrollPane.getVerticalScrollBarPolicy ();
this.hsbPolicy = scrollPane.getHorizontalScrollBarPolicy ();
var insets = parent.getInsets ();
var minWidth = insets.left + insets.right;
var minHeight = insets.top + insets.bottom;
if (this.viewport != null) {
var size = this.viewport.getMinimumSize ();
minWidth += size.width;
minHeight += size.height;
}var viewportBorder = scrollPane.getViewportBorder ();
if (viewportBorder != null) {
var vpbInsets = viewportBorder.getBorderInsets (parent);
minWidth += vpbInsets.left + vpbInsets.right;
minHeight += vpbInsets.top + vpbInsets.bottom;
}if ((this.rowHead != null) && this.rowHead.isVisible ()) {
var size = this.rowHead.getMinimumSize ();
minWidth += size.width;
minHeight = Math.max (minHeight, size.height);
}if ((this.colHead != null) && this.colHead.isVisible ()) {
var size = this.colHead.getMinimumSize ();
minWidth = Math.max (minWidth, size.width);
minHeight += size.height;
}if ((this.vsb != null) && (this.vsbPolicy != 21)) {
var size = this.vsb.getMinimumSize ();
minWidth += size.width;
minHeight = Math.max (minHeight, size.height);
}if ((this.hsb != null) && (this.hsbPolicy != 31)) {
var size = this.hsb.getMinimumSize ();
minWidth = Math.max (minWidth, size.width);
minHeight += size.height;
}return  new jsjava.awt.Dimension (minWidth, minHeight);
}, "jsjava.awt.Container");
Clazz.overrideMethod (c$, "layoutContainer", 
function (parent) {
var scrollPane = parent;
this.vsbPolicy = scrollPane.getVerticalScrollBarPolicy ();
this.hsbPolicy = scrollPane.getHorizontalScrollBarPolicy ();
var availR = scrollPane.getBounds ();
availR.x = availR.y = 0;
var insets = parent.getInsets ();
availR.x = insets.left;
availR.y = insets.top;
availR.width -= insets.left + insets.right;
availR.height -= insets.top + insets.bottom;
var leftToRight = jsjavax.swing.SwingUtilities.isLeftToRight (scrollPane);
var colHeadR =  new jsjava.awt.Rectangle (0, availR.y, 0, 0);
if ((this.colHead != null) && (this.colHead.isVisible ())) {
var colHeadHeight = Math.min (availR.height, this.colHead.getPreferredSize ().height);
colHeadR.height = colHeadHeight;
availR.y += colHeadHeight;
availR.height -= colHeadHeight;
}var rowHeadR =  new jsjava.awt.Rectangle (0, 0, 0, 0);
if ((this.rowHead != null) && (this.rowHead.isVisible ())) {
var rowHeadWidth = Math.min (availR.width, this.rowHead.getPreferredSize ().width);
rowHeadR.width = rowHeadWidth;
availR.width -= rowHeadWidth;
if (leftToRight) {
rowHeadR.x = availR.x;
availR.x += rowHeadWidth;
} else {
rowHeadR.x = availR.x + availR.width;
}}var viewportBorder = scrollPane.getViewportBorder ();
var vpbInsets;
if (viewportBorder != null) {
vpbInsets = viewportBorder.getBorderInsets (parent);
availR.x += vpbInsets.left;
availR.y += vpbInsets.top;
availR.width -= vpbInsets.left + vpbInsets.right;
availR.height -= vpbInsets.top + vpbInsets.bottom;
} else {
vpbInsets =  new jsjava.awt.Insets (0, 0, 0, 0);
}var view = (this.viewport != null) ? this.viewport.getView () : null;
var viewPrefSize = (view != null) ? view.getPreferredSize () :  new jsjava.awt.Dimension (0, 0);
var extentSize = (this.viewport != null) ? this.viewport.toViewCoordinates (availR.getSize ()) :  new jsjava.awt.Dimension (0, 0);
var viewTracksViewportWidth = false;
var viewTracksViewportHeight = false;
var isEmpty = (availR.width < 0 || availR.height < 0);
var sv;
if (!isEmpty && Clazz.instanceOf (view, jsjavax.swing.Scrollable)) {
sv = view;
viewTracksViewportWidth = sv.getScrollableTracksViewportWidth ();
viewTracksViewportHeight = sv.getScrollableTracksViewportHeight ();
} else {
sv = null;
}var vsbR =  new jsjava.awt.Rectangle (0, availR.y - vpbInsets.top, 0, 0);
var vsbNeeded;
if (isEmpty) {
vsbNeeded = false;
} else if (this.vsbPolicy == 22) {
vsbNeeded = true;
} else if (this.vsbPolicy == 21) {
vsbNeeded = false;
} else {
vsbNeeded = !viewTracksViewportHeight && (viewPrefSize.height > extentSize.height);
}if ((this.vsb != null) && vsbNeeded) {
this.adjustForVSB (true, availR, vsbR, vpbInsets, leftToRight);
extentSize = this.viewport.toViewCoordinates (availR.getSize ());
}var hsbR =  new jsjava.awt.Rectangle (availR.x - vpbInsets.left, 0, 0, 0);
var hsbNeeded;
if (isEmpty) {
hsbNeeded = false;
} else if (this.hsbPolicy == 32) {
hsbNeeded = true;
} else if (this.hsbPolicy == 31) {
hsbNeeded = false;
} else {
hsbNeeded = !viewTracksViewportWidth && (viewPrefSize.width > extentSize.width);
}if ((this.hsb != null) && hsbNeeded) {
this.adjustForHSB (true, availR, hsbR, vpbInsets);
if ((this.vsb != null) && !vsbNeeded && (this.vsbPolicy != 21)) {
extentSize = this.viewport.toViewCoordinates (availR.getSize ());
vsbNeeded = viewPrefSize.height > extentSize.height;
if (vsbNeeded) {
this.adjustForVSB (true, availR, vsbR, vpbInsets, leftToRight);
}}}if (this.viewport != null) {
this.viewport.setBounds (availR);
if (sv != null) {
extentSize = this.viewport.toViewCoordinates (availR.getSize ());
var oldHSBNeeded = hsbNeeded;
var oldVSBNeeded = vsbNeeded;
viewTracksViewportWidth = sv.getScrollableTracksViewportWidth ();
viewTracksViewportHeight = sv.getScrollableTracksViewportHeight ();
if (this.vsb != null && this.vsbPolicy == 20) {
var newVSBNeeded = !viewTracksViewportHeight && (viewPrefSize.height > extentSize.height);
if (newVSBNeeded != vsbNeeded) {
vsbNeeded = newVSBNeeded;
this.adjustForVSB (vsbNeeded, availR, vsbR, vpbInsets, leftToRight);
extentSize = this.viewport.toViewCoordinates (availR.getSize ());
}}if (this.hsb != null && this.hsbPolicy == 30) {
var newHSBbNeeded = !viewTracksViewportWidth && (viewPrefSize.width > extentSize.width);
if (newHSBbNeeded != hsbNeeded) {
hsbNeeded = newHSBbNeeded;
this.adjustForHSB (hsbNeeded, availR, hsbR, vpbInsets);
if ((this.vsb != null) && !vsbNeeded && (this.vsbPolicy != 21)) {
extentSize = this.viewport.toViewCoordinates (availR.getSize ());
vsbNeeded = viewPrefSize.height > extentSize.height;
if (vsbNeeded) {
this.adjustForVSB (true, availR, vsbR, vpbInsets, leftToRight);
}}}}if (oldHSBNeeded != hsbNeeded || oldVSBNeeded != vsbNeeded) {
this.viewport.setBounds (availR);
}}}vsbR.height = availR.height + vpbInsets.top + vpbInsets.bottom;
hsbR.width = availR.width + vpbInsets.left + vpbInsets.right;
rowHeadR.height = availR.height + vpbInsets.top + vpbInsets.bottom;
rowHeadR.y = availR.y - vpbInsets.top;
colHeadR.width = availR.width + vpbInsets.left + vpbInsets.right;
colHeadR.x = availR.x - vpbInsets.left;
if (this.rowHead != null) {
this.rowHead.setBounds (rowHeadR);
}if (this.colHead != null) {
this.colHead.setBounds (colHeadR);
}if (this.vsb != null) {
if (vsbNeeded) {
if (this.colHead != null && jsjavax.swing.UIManager.getBoolean ("ScrollPane.fillUpperCorner")) {
if ((leftToRight && this.upperRight == null) || (!leftToRight && this.upperLeft == null)) {
vsbR.y = colHeadR.y;
vsbR.height += colHeadR.height;
}}this.vsb.setVisible (true);
this.vsb.setBounds (vsbR);
} else {
this.vsb.setVisible (false);
}}if (this.hsb != null) {
if (hsbNeeded) {
if (this.rowHead != null && jsjavax.swing.UIManager.getBoolean ("ScrollPane.fillLowerCorner")) {
if ((leftToRight && this.lowerLeft == null) || (!leftToRight && this.lowerRight == null)) {
if (leftToRight) {
hsbR.x = rowHeadR.x;
}hsbR.width += rowHeadR.width;
}}this.hsb.setVisible (true);
this.hsb.setBounds (hsbR);
} else {
this.hsb.setVisible (false);
}}if (this.lowerLeft != null) {
this.lowerLeft.setBounds (leftToRight ? rowHeadR.x : vsbR.x, hsbR.y, leftToRight ? rowHeadR.width : vsbR.width, hsbR.height);
}if (this.lowerRight != null) {
this.lowerRight.setBounds (leftToRight ? vsbR.x : rowHeadR.x, hsbR.y, leftToRight ? vsbR.width : rowHeadR.width, hsbR.height);
}if (this.upperLeft != null) {
this.upperLeft.setBounds (leftToRight ? rowHeadR.x : vsbR.x, colHeadR.y, leftToRight ? rowHeadR.width : vsbR.width, colHeadR.height);
}if (this.upperRight != null) {
this.upperRight.setBounds (leftToRight ? vsbR.x : rowHeadR.x, colHeadR.y, leftToRight ? vsbR.width : rowHeadR.width, colHeadR.height);
}}, "jsjava.awt.Container");
Clazz.defineMethod (c$, "adjustForVSB", 
($fz = function (wantsVSB, available, vsbR, vpbInsets, leftToRight) {
var oldWidth = vsbR.width;
if (wantsVSB) {
var vsbWidth = Math.max (0, Math.min (this.vsb.getPreferredSize ().width, available.width));
available.width -= vsbWidth;
vsbR.width = vsbWidth;
if (leftToRight) {
vsbR.x = available.x + available.width + vpbInsets.right;
} else {
vsbR.x = available.x - vpbInsets.left;
available.x += vsbWidth;
}} else {
available.width += oldWidth;
}}, $fz.isPrivate = true, $fz), "~B,jsjava.awt.Rectangle,jsjava.awt.Rectangle,jsjava.awt.Insets,~B");
Clazz.defineMethod (c$, "adjustForHSB", 
($fz = function (wantsHSB, available, hsbR, vpbInsets) {
var oldHeight = hsbR.height;
if (wantsHSB) {
var hsbHeight = Math.max (0, Math.min (available.height, this.hsb.getPreferredSize ().height));
available.height -= hsbHeight;
hsbR.y = available.y + available.height + vpbInsets.bottom;
hsbR.height = hsbHeight;
} else {
available.height += oldHeight;
}}, $fz.isPrivate = true, $fz), "~B,jsjava.awt.Rectangle,jsjava.awt.Rectangle,jsjava.awt.Insets");
Clazz.defineMethod (c$, "getViewportBorderBounds", 
function (scrollpane) {
return scrollpane.getViewportBorderBounds ();
}, "jsjavax.swing.JScrollPane");
Clazz.pu$h ();
c$ = Clazz.declareType (jsjavax.swing.ScrollPaneLayout, "UIResource", jsjavax.swing.ScrollPaneLayout, jsjavax.swing.plaf.UIResource);
c$ = Clazz.p0p ();
});

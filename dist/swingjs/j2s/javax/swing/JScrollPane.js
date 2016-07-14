Clazz.declarePackage ("javax.swing");
Clazz.load (["javax.swing.JComponent", "$.JScrollBar", "$.ScrollPaneConstants", "javax.swing.plaf.UIResource"], "javax.swing.JScrollPane", ["java.lang.Boolean", "$.ClassCastException", "$.IllegalArgumentException", "java.awt.Point", "$.Rectangle", "javax.swing.JViewport", "$.ScrollPaneLayout", "$.Scrollable", "$.SwingUtilities"], function () {
c$ = Clazz.decorateAsClass (function () {
this.viewportBorder = null;
this.verticalScrollBarPolicy = 20;
this.horizontalScrollBarPolicy = 30;
this.viewport = null;
this.verticalScrollBar = null;
this.horizontalScrollBar = null;
this.rowHeader = null;
this.columnHeader = null;
this.lowerLeft = null;
this.lowerRight = null;
this.upperLeft = null;
this.upperRight = null;
this.wheelScrollState = true;
if (!Clazz.isClassDefined ("javax.swing.JScrollPane.ScrollBar")) {
javax.swing.JScrollPane.$JScrollPane$ScrollBar$ ();
}
Clazz.instantialize (this, arguments);
}, javax.swing, "JScrollPane", javax.swing.JComponent, javax.swing.ScrollPaneConstants);
Clazz.makeConstructor (c$, 
function (view, vsbPolicy, hsbPolicy) {
Clazz.superConstructor (this, javax.swing.JScrollPane, []);
this.setLayout ( new javax.swing.ScrollPaneLayout.UIResource ());
this.setVerticalScrollBarPolicy (vsbPolicy);
this.setHorizontalScrollBarPolicy (hsbPolicy);
this.setViewport (this.createViewport ());
this.setVerticalScrollBar (this.createVerticalScrollBar ());
this.setHorizontalScrollBar (this.createHorizontalScrollBar ());
if (view != null) {
this.setViewportView (view);
}this.setUIProperty ("opaque", new Boolean (true));
this.uiClassID = "ScrollPaneUI";
this.updateUI ();
if (!this.getComponentOrientation ().isLeftToRight ()) {
this.viewport.setViewPosition ( new java.awt.Point (2147483647, 0));
}}, "java.awt.Component,~N,~N");
Clazz.makeConstructor (c$, 
function (view) {
this.construct (view, 20, 30);
}, "java.awt.Component");
Clazz.makeConstructor (c$, 
function (vsbPolicy, hsbPolicy) {
this.construct (null, vsbPolicy, hsbPolicy);
}, "~N,~N");
Clazz.makeConstructor (c$, 
function () {
this.construct (null, 20, 30);
});
Clazz.defineMethod (c$, "setLayout", 
function (layout) {
if (Clazz.instanceOf (layout, javax.swing.ScrollPaneLayout)) {
Clazz.superCall (this, javax.swing.JScrollPane, "setLayout", [layout]);
(layout).syncWithScrollPane (this);
} else if (layout == null) {
Clazz.superCall (this, javax.swing.JScrollPane, "setLayout", [layout]);
} else {
var s = "layout of JScrollPane must be a ScrollPaneLayout";
throw  new ClassCastException (s);
}}, "java.awt.LayoutManager");
Clazz.overrideMethod (c$, "isValidateRoot", 
function () {
return true;
});
Clazz.defineMethod (c$, "getVerticalScrollBarPolicy", 
function () {
return this.verticalScrollBarPolicy;
});
Clazz.defineMethod (c$, "setVerticalScrollBarPolicy", 
function (policy) {
switch (policy) {
case 20:
case 21:
case 22:
break;
default:
throw  new IllegalArgumentException ("invalid verticalScrollBarPolicy");
}
var old = this.verticalScrollBarPolicy;
this.verticalScrollBarPolicy = policy;
this.firePropertyChangeInt ("verticalScrollBarPolicy", old, policy);
this.revalidate ();
this.repaint ();
}, "~N");
Clazz.defineMethod (c$, "getHorizontalScrollBarPolicy", 
function () {
return this.horizontalScrollBarPolicy;
});
Clazz.defineMethod (c$, "setHorizontalScrollBarPolicy", 
function (policy) {
switch (policy) {
case 30:
case 31:
case 32:
break;
default:
throw  new IllegalArgumentException ("invalid horizontalScrollBarPolicy");
}
var old = this.horizontalScrollBarPolicy;
this.horizontalScrollBarPolicy = policy;
this.firePropertyChangeInt ("horizontalScrollBarPolicy", old, policy);
this.revalidate ();
this.repaint ();
}, "~N");
Clazz.defineMethod (c$, "getViewportBorder", 
function () {
return this.viewportBorder;
});
Clazz.defineMethod (c$, "setViewportBorder", 
function (viewportBorder) {
var oldValue = this.viewportBorder;
this.viewportBorder = viewportBorder;
this.firePropertyChangeObject ("viewportBorder", oldValue, viewportBorder);
}, "javax.swing.border.Border");
Clazz.defineMethod (c$, "getViewportBorderBounds", 
function () {
var borderR =  new java.awt.Rectangle (this.getSize ());
var insets = this.getInsets ();
borderR.x = insets.left;
borderR.y = insets.top;
borderR.width -= insets.left + insets.right;
borderR.height -= insets.top + insets.bottom;
var leftToRight = javax.swing.SwingUtilities.isLeftToRight (this);
var colHead = this.getColumnHeader ();
if ((colHead != null) && (colHead.isVisible ())) {
var colHeadHeight = colHead.getHeight ();
borderR.y += colHeadHeight;
borderR.height -= colHeadHeight;
}var rowHead = this.getRowHeader ();
if ((rowHead != null) && (rowHead.isVisible ())) {
var rowHeadWidth = rowHead.getWidth ();
if (leftToRight) {
borderR.x += rowHeadWidth;
}borderR.width -= rowHeadWidth;
}var vsb = this.getVerticalScrollBar ();
if ((vsb != null) && (vsb.isVisible ())) {
var vsbWidth = vsb.getWidth ();
if (!leftToRight) {
borderR.x += vsbWidth;
}borderR.width -= vsbWidth;
}var hsb = this.getHorizontalScrollBar ();
if ((hsb != null) && (hsb.isVisible ())) {
borderR.height -= hsb.getHeight ();
}return borderR;
});
Clazz.defineMethod (c$, "createHorizontalScrollBar", 
function () {
return Clazz.innerTypeInstance (javax.swing.JScrollPane.ScrollBar, this, null, 0);
});
Clazz.defineMethod (c$, "getHorizontalScrollBar", 
function () {
return this.horizontalScrollBar;
});
Clazz.defineMethod (c$, "setHorizontalScrollBar", 
function (horizontalScrollBar) {
var old = this.getHorizontalScrollBar ();
this.horizontalScrollBar = horizontalScrollBar;
if (horizontalScrollBar != null) {
this.add (horizontalScrollBar, "HORIZONTAL_SCROLLBAR");
} else if (old != null) {
this.remove (old);
}this.firePropertyChangeObject ("horizontalScrollBar", old, horizontalScrollBar);
this.revalidate ();
this.repaint ();
}, "javax.swing.JScrollBar");
Clazz.defineMethod (c$, "createVerticalScrollBar", 
function () {
return Clazz.innerTypeInstance (javax.swing.JScrollPane.ScrollBar, this, null, 1);
});
Clazz.defineMethod (c$, "getVerticalScrollBar", 
function () {
return this.verticalScrollBar;
});
Clazz.defineMethod (c$, "setVerticalScrollBar", 
function (verticalScrollBar) {
var old = this.getVerticalScrollBar ();
this.verticalScrollBar = verticalScrollBar;
this.add (verticalScrollBar, "VERTICAL_SCROLLBAR");
this.firePropertyChangeObject ("verticalScrollBar", old, verticalScrollBar);
this.revalidate ();
this.repaint ();
}, "javax.swing.JScrollBar");
Clazz.defineMethod (c$, "createViewport", 
function () {
return  new javax.swing.JViewport ();
});
Clazz.defineMethod (c$, "getViewport", 
function () {
return this.viewport;
});
Clazz.defineMethod (c$, "setViewport", 
function (viewport) {
var old = this.getViewport ();
this.viewport = viewport;
if (viewport != null) {
this.add (viewport, "VIEWPORT");
} else if (old != null) {
this.remove (old);
}this.firePropertyChangeObject ("viewport", old, viewport);
this.revalidate ();
this.repaint ();
}, "javax.swing.JViewport");
Clazz.defineMethod (c$, "setViewportView", 
function (view) {
if (this.getViewport () == null) {
this.setViewport (this.createViewport ());
}this.getViewport ().setView (view);
}, "java.awt.Component");
Clazz.defineMethod (c$, "getRowHeader", 
function () {
return this.rowHeader;
});
Clazz.defineMethod (c$, "setRowHeader", 
function (rowHeader) {
var old = this.getRowHeader ();
this.rowHeader = rowHeader;
if (rowHeader != null) {
this.add (rowHeader, "ROW_HEADER");
} else if (old != null) {
this.remove (old);
}this.firePropertyChangeObject ("rowHeader", old, rowHeader);
this.revalidate ();
this.repaint ();
}, "javax.swing.JViewport");
Clazz.defineMethod (c$, "setRowHeaderView", 
function (view) {
if (this.getRowHeader () == null) {
this.setRowHeader (this.createViewport ());
}this.getRowHeader ().setView (view);
}, "java.awt.Component");
Clazz.defineMethod (c$, "getColumnHeader", 
function () {
return this.columnHeader;
});
Clazz.defineMethod (c$, "setColumnHeader", 
function (columnHeader) {
var old = this.getColumnHeader ();
this.columnHeader = columnHeader;
if (columnHeader != null) {
this.add (columnHeader, "COLUMN_HEADER");
} else if (old != null) {
this.remove (old);
}this.firePropertyChangeObject ("columnHeader", old, columnHeader);
this.revalidate ();
this.repaint ();
}, "javax.swing.JViewport");
Clazz.defineMethod (c$, "setColumnHeaderView", 
function (view) {
if (this.getColumnHeader () == null) {
this.setColumnHeader (this.createViewport ());
}this.getColumnHeader ().setView (view);
}, "java.awt.Component");
Clazz.defineMethod (c$, "getCorner", 
function (key) {
var isLeftToRight = this.getComponentOrientation ().isLeftToRight ();
if (key.equals ("LOWER_LEADING_CORNER")) {
key = isLeftToRight ? "LOWER_LEFT_CORNER" : "LOWER_RIGHT_CORNER";
} else if (key.equals ("LOWER_TRAILING_CORNER")) {
key = isLeftToRight ? "LOWER_RIGHT_CORNER" : "LOWER_LEFT_CORNER";
} else if (key.equals ("UPPER_LEADING_CORNER")) {
key = isLeftToRight ? "UPPER_LEFT_CORNER" : "UPPER_RIGHT_CORNER";
} else if (key.equals ("UPPER_TRAILING_CORNER")) {
key = isLeftToRight ? "UPPER_RIGHT_CORNER" : "UPPER_LEFT_CORNER";
}if (key.equals ("LOWER_LEFT_CORNER")) {
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
Clazz.defineMethod (c$, "setCorner", 
function (key, corner) {
var old;
var isLeftToRight = this.getComponentOrientation ().isLeftToRight ();
if (key.equals ("LOWER_LEADING_CORNER")) {
key = isLeftToRight ? "LOWER_LEFT_CORNER" : "LOWER_RIGHT_CORNER";
} else if (key.equals ("LOWER_TRAILING_CORNER")) {
key = isLeftToRight ? "LOWER_RIGHT_CORNER" : "LOWER_LEFT_CORNER";
} else if (key.equals ("UPPER_LEADING_CORNER")) {
key = isLeftToRight ? "UPPER_LEFT_CORNER" : "UPPER_RIGHT_CORNER";
} else if (key.equals ("UPPER_TRAILING_CORNER")) {
key = isLeftToRight ? "UPPER_RIGHT_CORNER" : "UPPER_LEFT_CORNER";
}if (key.equals ("LOWER_LEFT_CORNER")) {
old = this.lowerLeft;
this.lowerLeft = corner;
} else if (key.equals ("LOWER_RIGHT_CORNER")) {
old = this.lowerRight;
this.lowerRight = corner;
} else if (key.equals ("UPPER_LEFT_CORNER")) {
old = this.upperLeft;
this.upperLeft = corner;
} else if (key.equals ("UPPER_RIGHT_CORNER")) {
old = this.upperRight;
this.upperRight = corner;
} else {
throw  new IllegalArgumentException ("invalid corner key");
}if (old != null) {
this.remove (old);
}if (corner != null) {
this.add (corner, key);
}this.firePropertyChangeObject (key, old, corner);
this.revalidate ();
this.repaint ();
}, "~S,java.awt.Component");
Clazz.defineMethod (c$, "setComponentOrientation", 
function (co) {
Clazz.superCall (this, javax.swing.JScrollPane, "setComponentOrientation", [co]);
if (this.verticalScrollBar != null) this.verticalScrollBar.setComponentOrientation (co);
if (this.horizontalScrollBar != null) this.horizontalScrollBar.setComponentOrientation (co);
}, "java.awt.ComponentOrientation");
Clazz.defineMethod (c$, "isWheelScrollingEnabled", 
function () {
return this.wheelScrollState;
});
Clazz.defineMethod (c$, "setWheelScrollingEnabled", 
function (handleWheel) {
var old = this.wheelScrollState;
this.wheelScrollState = handleWheel;
this.firePropertyChangeBool ("wheelScrollingEnabled", old, handleWheel);
}, "~B");
Clazz.defineMethod (c$, "paramString", 
function () {
var viewportBorderString = (this.viewportBorder != null ? this.viewportBorder.toString () : "");
var viewportString = (this.viewport != null ? this.viewport.toString () : "");
var verticalScrollBarPolicyString;
if (this.verticalScrollBarPolicy == 20) {
verticalScrollBarPolicyString = "VERTICAL_SCROLLBAR_AS_NEEDED";
} else if (this.verticalScrollBarPolicy == 21) {
verticalScrollBarPolicyString = "VERTICAL_SCROLLBAR_NEVER";
} else if (this.verticalScrollBarPolicy == 22) {
verticalScrollBarPolicyString = "VERTICAL_SCROLLBAR_ALWAYS";
} else verticalScrollBarPolicyString = "";
var horizontalScrollBarPolicyString;
if (this.horizontalScrollBarPolicy == 30) {
horizontalScrollBarPolicyString = "HORIZONTAL_SCROLLBAR_AS_NEEDED";
} else if (this.horizontalScrollBarPolicy == 31) {
horizontalScrollBarPolicyString = "HORIZONTAL_SCROLLBAR_NEVER";
} else if (this.horizontalScrollBarPolicy == 32) {
horizontalScrollBarPolicyString = "HORIZONTAL_SCROLLBAR_ALWAYS";
} else horizontalScrollBarPolicyString = "";
var horizontalScrollBarString = (this.horizontalScrollBar != null ? this.horizontalScrollBar.toString () : "");
var verticalScrollBarString = (this.verticalScrollBar != null ? this.verticalScrollBar.toString () : "");
var columnHeaderString = (this.columnHeader != null ? this.columnHeader.toString () : "");
var rowHeaderString = (this.rowHeader != null ? this.rowHeader.toString () : "");
var lowerLeftString = (this.lowerLeft != null ? this.lowerLeft.toString () : "");
var lowerRightString = (this.lowerRight != null ? this.lowerRight.toString () : "");
var upperLeftString = (this.upperLeft != null ? this.upperLeft.toString () : "");
var upperRightString = (this.upperRight != null ? this.upperRight.toString () : "");
return Clazz.superCall (this, javax.swing.JScrollPane, "paramString", []) + ",columnHeader=" + columnHeaderString + ",horizontalScrollBar=" + horizontalScrollBarString + ",horizontalScrollBarPolicy=" + horizontalScrollBarPolicyString + ",lowerLeft=" + lowerLeftString + ",lowerRight=" + lowerRightString + ",rowHeader=" + rowHeaderString + ",upperLeft=" + upperLeftString + ",upperRight=" + upperRightString + ",verticalScrollBar=" + verticalScrollBarString + ",verticalScrollBarPolicy=" + verticalScrollBarPolicyString + ",viewport=" + viewportString + ",viewportBorder=" + viewportBorderString;
});
c$.$JScrollPane$ScrollBar$ = function () {
Clazz.pu$h(self.c$);
c$ = Clazz.decorateAsClass (function () {
Clazz.prepareCallback (this, arguments);
this.unitIncrementSet = false;
this.blockIncrementSet = false;
Clazz.instantialize (this, arguments);
}, javax.swing.JScrollPane, "ScrollBar", javax.swing.JScrollBar, javax.swing.plaf.UIResource);
Clazz.makeConstructor (c$, 
function (a) {
Clazz.superConstructor (this, javax.swing.JScrollPane.ScrollBar, [a]);
this.putClientProperty ("JScrollBar.fastWheelScrolling", Boolean.TRUE);
}, "~N");
Clazz.defineMethod (c$, "setUnitIncrement", 
function (a) {
this.unitIncrementSet = true;
this.putClientProperty ("JScrollBar.fastWheelScrolling", null);
Clazz.superCall (this, javax.swing.JScrollPane.ScrollBar, "setUnitIncrement", [a]);
}, "~N");
Clazz.defineMethod (c$, "getUnitIncrement", 
function (a) {
var b = this.b$["javax.swing.JScrollPane"].getViewport ();
if (!this.unitIncrementSet && (b != null) && (Clazz.instanceOf (b.getView (), javax.swing.Scrollable))) {
var c = (b.getView ());
var d = b.getViewRect ();
return c.getScrollableUnitIncrement (d, this.getOrientation (), a);
} else {
return Clazz.superCall (this, javax.swing.JScrollPane.ScrollBar, "getUnitIncrement", [a]);
}}, "~N");
Clazz.defineMethod (c$, "setBlockIncrement", 
function (a) {
this.blockIncrementSet = true;
this.putClientProperty ("JScrollBar.fastWheelScrolling", null);
Clazz.superCall (this, javax.swing.JScrollPane.ScrollBar, "setBlockIncrement", [a]);
}, "~N");
Clazz.defineMethod (c$, "getBlockIncrement", 
function (a) {
var b = this.b$["javax.swing.JScrollPane"].getViewport ();
if (this.blockIncrementSet || b == null) {
return Clazz.superCall (this, javax.swing.JScrollPane.ScrollBar, "getBlockIncrement", [a]);
} else if (Clazz.instanceOf (b.getView (), javax.swing.Scrollable)) {
var c = (b.getView ());
var d = b.getViewRect ();
return c.getScrollableBlockIncrement (d, this.getOrientation (), a);
} else if (this.getOrientation () == 1) {
return b.getExtentSize ().height;
} else {
return b.getExtentSize ().width;
}}, "~N");
c$ = Clazz.p0p ();
};
});

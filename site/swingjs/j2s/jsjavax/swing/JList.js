Clazz.declarePackage ("jsjavax.swing");
Clazz.load (["jsjavax.swing.JComponent", "$.Scrollable", "jsjavax.swing.event.ListSelectionListener"], "jsjavax.swing.JList", ["java.lang.IllegalArgumentException", "jsjava.awt.Component", "$.Dimension", "$.Point", "jsjava.awt.event.MouseEvent", "jsjavax.swing.AbstractListModel", "$.DefaultListSelectionModel", "$.JViewport", "$.SwingUtilities", "$.UIManager", "jsjavax.swing.event.ListSelectionEvent", "jsjavax.swing.text.Position"], function () {
c$ = Clazz.decorateAsClass (function () {
this.fixedCellWidth = -1;
this.fixedCellHeight = -1;
this.horizontalScrollIncrement = -1;
this.prototypeCellValue = null;
this.visibleRowCount = 8;
this.selectionForeground = null;
this.selectionBackground = null;
this.dragEnabled = false;
this.selectionModel = null;
this.dataModel = null;
this.cellRenderer = null;
this.selectionListener = null;
this.layoutOrientation = 0;
if (!Clazz.isClassDefined ("jsjavax.swing.JList.ListSelectionHandler")) {
jsjavax.swing.JList.$JList$ListSelectionHandler$ ();
}
Clazz.instantialize (this, arguments);
}, jsjavax.swing, "JList", jsjavax.swing.JComponent, jsjavax.swing.Scrollable);
Clazz.makeConstructor (c$, 
function (dataModel) {
Clazz.superConstructor (this, jsjavax.swing.JList, []);
if (dataModel == null) {
throw  new IllegalArgumentException ("dataModel must be non null");
}this.layoutOrientation = 0;
this.dataModel = dataModel;
this.selectionModel = this.createSelectionModel ();
this.setAutoscrolls (true);
this.setOpaque (true);
this.updateUI ();
}, "jsjavax.swing.ListModel");
Clazz.makeConstructor (c$, 
function (listData) {
this.construct (((Clazz.isClassDefined ("jsjavax.swing.JList$1") ? 0 : jsjavax.swing.JList.$JList$1$ ()), Clazz.innerTypeInstance (jsjavax.swing.JList$1, this, Clazz.cloneFinals ("listData", listData))));
}, "~A");
Clazz.makeConstructor (c$, 
function (listData) {
this.construct (((Clazz.isClassDefined ("jsjavax.swing.JList$2") ? 0 : jsjavax.swing.JList.$JList$2$ ()), Clazz.innerTypeInstance (jsjavax.swing.JList$2, this, Clazz.cloneFinals ("listData", listData))));
}, "java.util.Vector");
Clazz.makeConstructor (c$, 
function () {
this.construct (((Clazz.isClassDefined ("jsjavax.swing.JList$3") ? 0 : jsjavax.swing.JList.$JList$3$ ()), Clazz.innerTypeInstance (jsjavax.swing.JList$3, this, null)));
});
Clazz.defineMethod (c$, "getUI", 
function () {
return this.ui;
});
Clazz.overrideMethod (c$, "updateUI", 
function () {
this.setUI (jsjavax.swing.UIManager.getUI (this));
var renderer = this.getCellRenderer ();
if (Clazz.instanceOf (renderer, jsjava.awt.Component)) {
jsjavax.swing.SwingUtilities.updateComponentTreeUI (renderer);
}});
Clazz.overrideMethod (c$, "getUIClassID", 
function () {
return "ListUI";
});
Clazz.defineMethod (c$, "updateFixedCellSize", 
($fz = function () {
var cr = this.getCellRenderer ();
var value = this.getPrototypeCellValue ();
if ((cr != null) && (value != null)) {
var c = cr.getListCellRendererComponent (this, value, 0, false, false);
var f = c.getFont ();
c.setFont (this.getFont ());
var d = c.getPreferredSize ();
this.fixedCellWidth = d.width;
this.fixedCellHeight = d.height;
c.setFont (f);
}}, $fz.isPrivate = true, $fz));
Clazz.defineMethod (c$, "getPrototypeCellValue", 
function () {
return this.prototypeCellValue;
});
Clazz.defineMethod (c$, "setPrototypeCellValue", 
function (prototypeCellValue) {
var oldValue = this.prototypeCellValue;
this.prototypeCellValue = prototypeCellValue;
if ((prototypeCellValue != null) && !prototypeCellValue.equals (oldValue)) {
this.updateFixedCellSize ();
}this.firePropertyChange ("prototypeCellValue", oldValue, prototypeCellValue);
}, "~O");
Clazz.defineMethod (c$, "getFixedCellWidth", 
function () {
return this.fixedCellWidth;
});
Clazz.defineMethod (c$, "setFixedCellWidth", 
function (width) {
var oldValue = this.fixedCellWidth;
this.fixedCellWidth = width;
this.firePropertyChange ("fixedCellWidth", oldValue, this.fixedCellWidth);
}, "~N");
Clazz.defineMethod (c$, "getFixedCellHeight", 
function () {
return this.fixedCellHeight;
});
Clazz.defineMethod (c$, "setFixedCellHeight", 
function (height) {
var oldValue = this.fixedCellHeight;
this.fixedCellHeight = height;
this.firePropertyChange ("fixedCellHeight", oldValue, this.fixedCellHeight);
}, "~N");
Clazz.defineMethod (c$, "getCellRenderer", 
function () {
return this.cellRenderer;
});
Clazz.defineMethod (c$, "setCellRenderer", 
function (cellRenderer) {
var oldValue = this.cellRenderer;
this.cellRenderer = cellRenderer;
if ((cellRenderer != null) && !cellRenderer.equals (oldValue)) {
this.updateFixedCellSize ();
}this.firePropertyChange ("cellRenderer", oldValue, cellRenderer);
}, "jsjavax.swing.ListCellRenderer");
Clazz.defineMethod (c$, "getSelectionForeground", 
function () {
return this.selectionForeground;
});
Clazz.defineMethod (c$, "setSelectionForeground", 
function (selectionForeground) {
var oldValue = this.selectionForeground;
this.selectionForeground = selectionForeground;
this.firePropertyChange ("selectionForeground", oldValue, selectionForeground);
}, "jsjava.awt.Color");
Clazz.defineMethod (c$, "getSelectionBackground", 
function () {
return this.selectionBackground;
});
Clazz.defineMethod (c$, "setSelectionBackground", 
function (selectionBackground) {
var oldValue = this.selectionBackground;
this.selectionBackground = selectionBackground;
this.firePropertyChange ("selectionBackground", oldValue, selectionBackground);
}, "jsjava.awt.Color");
Clazz.defineMethod (c$, "getVisibleRowCount", 
function () {
return this.visibleRowCount;
});
Clazz.defineMethod (c$, "setVisibleRowCount", 
function (visibleRowCount) {
var oldValue = this.visibleRowCount;
this.visibleRowCount = Math.max (0, visibleRowCount);
this.firePropertyChange ("visibleRowCount", oldValue, visibleRowCount);
}, "~N");
Clazz.defineMethod (c$, "getLayoutOrientation", 
function () {
return this.layoutOrientation;
});
Clazz.defineMethod (c$, "setLayoutOrientation", 
function (layoutOrientation) {
var oldValue = this.layoutOrientation;
switch (layoutOrientation) {
case 0:
case 1:
case 2:
this.layoutOrientation = layoutOrientation;
this.firePropertyChange ("layoutOrientation", oldValue, layoutOrientation);
break;
default:
throw  new IllegalArgumentException ("layoutOrientation must be one of: VERTICAL, HORIZONTAL_WRAP or VERTICAL_WRAP");
}
}, "~N");
Clazz.defineMethod (c$, "getFirstVisibleIndex", 
function () {
var r = this.getVisibleRect ();
var first;
if (this.getComponentOrientation ().isLeftToRight ()) {
first = this.locationToIndex (r.getLocation ());
} else {
first = this.locationToIndex ( new jsjava.awt.Point ((r.x + r.width) - 1, r.y));
}if (first != -1) {
var bounds = this.getCellBounds (first, first);
if (bounds != null) {
jsjavax.swing.SwingUtilities.computeIntersection (r.x, r.y, r.width, r.height, bounds);
if (bounds.width == 0 || bounds.height == 0) {
first = -1;
}}}return first;
});
Clazz.defineMethod (c$, "getLastVisibleIndex", 
function () {
var leftToRight = this.getComponentOrientation ().isLeftToRight ();
var r = this.getVisibleRect ();
var lastPoint;
if (leftToRight) {
lastPoint =  new jsjava.awt.Point ((r.x + r.width) - 1, (r.y + r.height) - 1);
} else {
lastPoint =  new jsjava.awt.Point (r.x, (r.y + r.height) - 1);
}var location = this.locationToIndex (lastPoint);
if (location != -1) {
var bounds = this.getCellBounds (location, location);
if (bounds != null) {
jsjavax.swing.SwingUtilities.computeIntersection (r.x, r.y, r.width, r.height, bounds);
if (bounds.width == 0 || bounds.height == 0) {
var isHorizontalWrap = (this.getLayoutOrientation () == 2);
var visibleLocation = isHorizontalWrap ?  new jsjava.awt.Point (lastPoint.x, r.y) :  new jsjava.awt.Point (r.x, lastPoint.y);
var last;
var visIndex = -1;
var lIndex = location;
location = -1;
do {
last = visIndex;
visIndex = this.locationToIndex (visibleLocation);
if (visIndex != -1) {
bounds = this.getCellBounds (visIndex, visIndex);
if (visIndex != lIndex && bounds != null && bounds.contains (visibleLocation)) {
location = visIndex;
if (isHorizontalWrap) {
visibleLocation.y = bounds.y + bounds.height;
if (visibleLocation.y >= lastPoint.y) {
last = visIndex;
}} else {
visibleLocation.x = bounds.x + bounds.width;
if (visibleLocation.x >= lastPoint.x) {
last = visIndex;
}}} else {
last = visIndex;
}}} while (visIndex != -1 && last != visIndex);
}}}return location;
});
Clazz.defineMethod (c$, "ensureIndexIsVisible", 
function (index) {
var cellBounds = this.getCellBounds (index, index);
if (cellBounds != null) {
this.scrollRectToVisible (cellBounds);
}}, "~N");
Clazz.defineMethod (c$, "setDragEnabled", 
function (b) {
this.dragEnabled = b;
}, "~B");
Clazz.defineMethod (c$, "getDragEnabled", 
function () {
return this.dragEnabled;
});
Clazz.defineMethod (c$, "getNextMatch", 
function (prefix, startIndex, bias) {
var model = this.getModel ();
var max = model.getSize ();
if (prefix == null) {
throw  new IllegalArgumentException ();
}if (startIndex < 0 || startIndex >= max) {
throw  new IllegalArgumentException ();
}prefix = prefix.toUpperCase ();
var increment = (bias === jsjavax.swing.text.Position.Bias.Forward) ? 1 : -1;
var index = startIndex;
do {
var o = model.getElementAt (index);
if (o != null) {
var string;
if (Clazz.instanceOf (o, String)) {
string = (o).toUpperCase ();
} else {
string = o.toString ();
if (string != null) {
string = string.toUpperCase ();
}}if (string != null && string.startsWith (prefix)) {
return index;
}}index = (index + increment + max) % max;
} while (index != startIndex);
return -1;
}, "~S,~N,jsjavax.swing.text.Position.Bias");
Clazz.defineMethod (c$, "getToolTipText", 
function (event) {
if (event != null) {
var p = event.getPoint ();
var index = this.locationToIndex (p);
var r = this.getCellRenderer ();
var cellBounds;
if (index != -1 && r != null && (cellBounds = this.getCellBounds (index, index)) != null && cellBounds.contains (p.x, p.y)) {
var lsm = this.getSelectionModel ();
var rComponent = r.getListCellRendererComponent (this, this.getModel ().getElementAt (index), index, lsm.isSelectedIndex (index), (this.hasFocus () && (lsm.getLeadSelectionIndex () == index)));
if (Clazz.instanceOf (rComponent, jsjavax.swing.JComponent)) {
var newEvent;
p.translate (-cellBounds.x, -cellBounds.y);
newEvent =  new jsjava.awt.event.MouseEvent (rComponent, event.getID (), event.getWhen (), event.getModifiers (), p.x, p.y, event.getXOnScreen (), event.getYOnScreen (), event.getClickCount (), event.isPopupTrigger (), 0);
var tip = (rComponent).getToolTipText (newEvent);
if (tip != null) {
return tip;
}}}}return Clazz.superCall (this, jsjavax.swing.JList, "getToolTipText", []);
}, "jsjava.awt.event.MouseEvent");
Clazz.defineMethod (c$, "locationToIndex", 
function (location) {
var ui = this.getUI ();
return (ui != null) ? ui.locationToIndex (this, location) : -1;
}, "jsjava.awt.Point");
Clazz.defineMethod (c$, "indexToLocation", 
function (index) {
var ui = this.getUI ();
return (ui != null) ? ui.indexToLocation (this, index) : null;
}, "~N");
Clazz.defineMethod (c$, "getCellBounds", 
function (index0, index1) {
var ui = this.getUI ();
return (ui != null) ? ui.getCellBounds (this, index0, index1) : null;
}, "~N,~N");
Clazz.defineMethod (c$, "getModel", 
function () {
return this.dataModel;
});
Clazz.defineMethod (c$, "setModel", 
function (model) {
if (model == null) {
throw  new IllegalArgumentException ("model must be non null");
}var oldValue = this.dataModel;
this.dataModel = model;
this.firePropertyChange ("model", oldValue, this.dataModel);
this.clearSelection ();
}, "jsjavax.swing.ListModel");
Clazz.defineMethod (c$, "setListData", 
function (listData) {
this.setModel (((Clazz.isClassDefined ("jsjavax.swing.JList$4") ? 0 : jsjavax.swing.JList.$JList$4$ ()), Clazz.innerTypeInstance (jsjavax.swing.JList$4, this, Clazz.cloneFinals ("listData", listData))));
}, "~A");
Clazz.defineMethod (c$, "setListData", 
function (listData) {
this.setModel (((Clazz.isClassDefined ("jsjavax.swing.JList$5") ? 0 : jsjavax.swing.JList.$JList$5$ ()), Clazz.innerTypeInstance (jsjavax.swing.JList$5, this, Clazz.cloneFinals ("listData", listData))));
}, "java.util.Vector");
Clazz.defineMethod (c$, "createSelectionModel", 
function () {
return  new jsjavax.swing.DefaultListSelectionModel ();
});
Clazz.defineMethod (c$, "getSelectionModel", 
function () {
return this.selectionModel;
});
Clazz.defineMethod (c$, "fireSelectionValueChanged", 
function (firstIndex, lastIndex, isAdjusting) {
var listeners = this.listenerList.getListenerList ();
var e = null;
for (var i = listeners.length - 2; i >= 0; i -= 2) {
if (listeners[i] === jsjavax.swing.event.ListSelectionListener) {
if (e == null) {
e =  new jsjavax.swing.event.ListSelectionEvent (this, firstIndex, lastIndex, isAdjusting);
}(listeners[i + 1]).valueChanged (e);
}}
}, "~N,~N,~B");
Clazz.defineMethod (c$, "addListSelectionListener", 
function (listener) {
if (this.selectionListener == null) {
this.selectionListener = Clazz.innerTypeInstance (jsjavax.swing.JList.ListSelectionHandler, this, null);
this.getSelectionModel ().addListSelectionListener (this.selectionListener);
}this.listenerList.add (jsjavax.swing.event.ListSelectionListener, listener);
}, "jsjavax.swing.event.ListSelectionListener");
Clazz.defineMethod (c$, "removeListSelectionListener", 
function (listener) {
this.listenerList.remove (jsjavax.swing.event.ListSelectionListener, listener);
}, "jsjavax.swing.event.ListSelectionListener");
Clazz.defineMethod (c$, "getListSelectionListeners", 
function () {
return this.listenerList.getListeners (jsjavax.swing.event.ListSelectionListener);
});
Clazz.defineMethod (c$, "setSelectionModel", 
function (selectionModel) {
if (selectionModel == null) {
throw  new IllegalArgumentException ("selectionModel must be non null");
}if (this.selectionListener != null) {
this.selectionModel.removeListSelectionListener (this.selectionListener);
selectionModel.addListSelectionListener (this.selectionListener);
}var oldValue = this.selectionModel;
this.selectionModel = selectionModel;
this.firePropertyChange ("selectionModel", oldValue, selectionModel);
}, "jsjavax.swing.ListSelectionModel");
Clazz.defineMethod (c$, "setSelectionMode", 
function (selectionMode) {
this.getSelectionModel ().setSelectionMode (selectionMode);
}, "~N");
Clazz.defineMethod (c$, "getSelectionMode", 
function () {
return this.getSelectionModel ().getSelectionMode ();
});
Clazz.defineMethod (c$, "getAnchorSelectionIndex", 
function () {
return this.getSelectionModel ().getAnchorSelectionIndex ();
});
Clazz.defineMethod (c$, "getLeadSelectionIndex", 
function () {
return this.getSelectionModel ().getLeadSelectionIndex ();
});
Clazz.defineMethod (c$, "getMinSelectionIndex", 
function () {
return this.getSelectionModel ().getMinSelectionIndex ();
});
Clazz.defineMethod (c$, "getMaxSelectionIndex", 
function () {
return this.getSelectionModel ().getMaxSelectionIndex ();
});
Clazz.defineMethod (c$, "isSelectedIndex", 
function (index) {
return this.getSelectionModel ().isSelectedIndex (index);
}, "~N");
Clazz.defineMethod (c$, "isSelectionEmpty", 
function () {
return this.getSelectionModel ().isSelectionEmpty ();
});
Clazz.defineMethod (c$, "clearSelection", 
function () {
this.getSelectionModel ().clearSelection ();
});
Clazz.defineMethod (c$, "setSelectionInterval", 
function (anchor, lead) {
this.getSelectionModel ().setSelectionInterval (anchor, lead);
}, "~N,~N");
Clazz.defineMethod (c$, "addSelectionInterval", 
function (anchor, lead) {
this.getSelectionModel ().addSelectionInterval (anchor, lead);
}, "~N,~N");
Clazz.defineMethod (c$, "removeSelectionInterval", 
function (index0, index1) {
this.getSelectionModel ().removeSelectionInterval (index0, index1);
}, "~N,~N");
Clazz.defineMethod (c$, "setValueIsAdjusting", 
function (b) {
this.getSelectionModel ().setValueIsAdjusting (b);
}, "~B");
Clazz.defineMethod (c$, "getValueIsAdjusting", 
function () {
return this.getSelectionModel ().getValueIsAdjusting ();
});
Clazz.defineMethod (c$, "getSelectedIndices", 
function () {
var sm = this.getSelectionModel ();
var iMin = sm.getMinSelectionIndex ();
var iMax = sm.getMaxSelectionIndex ();
if ((iMin < 0) || (iMax < 0)) {
return  Clazz.newIntArray (0, 0);
}var rvTmp =  Clazz.newIntArray (1 + (iMax - iMin), 0);
var n = 0;
for (var i = iMin; i <= iMax; i++) {
if (sm.isSelectedIndex (i)) {
rvTmp[n++] = i;
}}
var rv =  Clazz.newIntArray (n, 0);
System.arraycopy (rvTmp, 0, rv, 0, n);
return rv;
});
Clazz.defineMethod (c$, "setSelectedIndex", 
function (index) {
if (index >= this.getModel ().getSize ()) {
return;
}this.getSelectionModel ().setSelectionInterval (index, index);
}, "~N");
Clazz.defineMethod (c$, "setSelectedIndices", 
function (indices) {
var sm = this.getSelectionModel ();
sm.clearSelection ();
var size = this.getModel ().getSize ();
for (var i = 0; i < indices.length; i++) {
if (indices[i] < size) {
sm.addSelectionInterval (indices[i], indices[i]);
}}
}, "~A");
Clazz.defineMethod (c$, "getSelectedValues", 
function () {
var sm = this.getSelectionModel ();
var dm = this.getModel ();
var iMin = sm.getMinSelectionIndex ();
var iMax = sm.getMaxSelectionIndex ();
if ((iMin < 0) || (iMax < 0)) {
return  new Array (0);
}var rvTmp =  new Array (1 + (iMax - iMin));
var n = 0;
for (var i = iMin; i <= iMax; i++) {
if (sm.isSelectedIndex (i)) {
rvTmp[n++] = dm.getElementAt (i);
}}
var rv =  new Array (n);
System.arraycopy (rvTmp, 0, rv, 0, n);
return rv;
});
Clazz.defineMethod (c$, "getSelectedIndex", 
function () {
return this.getMinSelectionIndex ();
});
Clazz.defineMethod (c$, "getSelectedValue", 
function () {
var i = this.getMinSelectionIndex ();
return (i == -1) ? null : this.getModel ().getElementAt (i);
});
Clazz.defineMethod (c$, "setSelectedValue", 
function (anObject, shouldScroll) {
if (anObject == null) this.setSelectedIndex (-1);
 else if (!anObject.equals (this.getSelectedValue ())) {
var i;
var c;
var dm = this.getModel ();
for (i = 0, c = dm.getSize (); i < c; i++) if (anObject.equals (dm.getElementAt (i))) {
this.setSelectedIndex (i);
if (shouldScroll) this.ensureIndexIsVisible (i);
this.repaint ();
return;
}
this.setSelectedIndex (-1);
}this.repaint ();
}, "~O,~B");
Clazz.defineMethod (c$, "checkScrollableParameters", 
($fz = function (visibleRect, orientation) {
if (visibleRect == null) {
throw  new IllegalArgumentException ("visibleRect must be non-null");
}switch (orientation) {
case 1:
case 0:
break;
default:
throw  new IllegalArgumentException ("orientation must be one of: VERTICAL, HORIZONTAL");
}
}, $fz.isPrivate = true, $fz), "jsjava.awt.Rectangle,~N");
Clazz.overrideMethod (c$, "getPreferredScrollableViewportSize", 
function () {
if (this.getLayoutOrientation () != 0) {
return this.getPreferredSize ();
}var insets = this.getInsets ();
var dx = insets.left + insets.right;
var dy = insets.top + insets.bottom;
var visibleRowCount = this.getVisibleRowCount ();
var fixedCellWidth = this.getFixedCellWidth ();
var fixedCellHeight = this.getFixedCellHeight ();
if ((fixedCellWidth > 0) && (fixedCellHeight > 0)) {
var width = fixedCellWidth + dx;
var height = (visibleRowCount * fixedCellHeight) + dy;
return  new jsjava.awt.Dimension (width, height);
} else if (this.getModel ().getSize () > 0) {
var width = this.getPreferredSize ().width;
var height;
var r = this.getCellBounds (0, 0);
if (r != null) {
height = (visibleRowCount * r.height) + dy;
} else {
height = 1;
}return  new jsjava.awt.Dimension (width, height);
} else {
fixedCellWidth = (fixedCellWidth > 0) ? fixedCellWidth : 256;
fixedCellHeight = (fixedCellHeight > 0) ? fixedCellHeight : 16;
return  new jsjava.awt.Dimension (fixedCellWidth, fixedCellHeight * visibleRowCount);
}});
Clazz.overrideMethod (c$, "getScrollableUnitIncrement", 
function (visibleRect, orientation, direction) {
this.checkScrollableParameters (visibleRect, orientation);
if (orientation == 1) {
var row = this.locationToIndex (visibleRect.getLocation ());
if (row == -1) {
return 0;
} else {
if (direction > 0) {
var r = this.getCellBounds (row, row);
return (r == null) ? 0 : r.height - (visibleRect.y - r.y);
} else {
var r = this.getCellBounds (row, row);
if ((r.y == visibleRect.y) && (row == 0)) {
return 0;
} else if (r.y == visibleRect.y) {
var loc = r.getLocation ();
loc.y--;
var prevIndex = this.locationToIndex (loc);
var prevR = this.getCellBounds (prevIndex, prevIndex);
if (prevR == null || prevR.y >= r.y) {
return 0;
}return prevR.height;
} else {
return visibleRect.y - r.y;
}}}} else if (orientation == 0 && this.getLayoutOrientation () != 0) {
var leftToRight = this.getComponentOrientation ().isLeftToRight ();
var index;
var leadingPoint;
if (leftToRight) {
leadingPoint = visibleRect.getLocation ();
} else {
leadingPoint =  new jsjava.awt.Point (visibleRect.x + visibleRect.width - 1, visibleRect.y);
}index = this.locationToIndex (leadingPoint);
if (index != -1) {
var cellBounds = this.getCellBounds (index, index);
if (cellBounds != null && cellBounds.contains (leadingPoint)) {
var leadingVisibleEdge;
var leadingCellEdge;
if (leftToRight) {
leadingVisibleEdge = visibleRect.x;
leadingCellEdge = cellBounds.x;
} else {
leadingVisibleEdge = visibleRect.x + visibleRect.width;
leadingCellEdge = cellBounds.x + cellBounds.width;
}if (leadingCellEdge != leadingVisibleEdge) {
if (direction < 0) {
return Math.abs (leadingVisibleEdge - leadingCellEdge);
} else if (leftToRight) {
return leadingCellEdge + cellBounds.width - leadingVisibleEdge;
} else {
return leadingVisibleEdge - cellBounds.x;
}}return cellBounds.width;
}}}var f = this.getFont ();
return (f != null) ? f.getSize () : 1;
}, "jsjava.awt.Rectangle,~N,~N");
Clazz.overrideMethod (c$, "getScrollableBlockIncrement", 
function (visibleRect, orientation, direction) {
this.checkScrollableParameters (visibleRect, orientation);
if (orientation == 1) {
var inc = visibleRect.height;
if (direction > 0) {
var last = this.locationToIndex ( new jsjava.awt.Point (visibleRect.x, visibleRect.y + visibleRect.height - 1));
if (last != -1) {
var lastRect = this.getCellBounds (last, last);
if (lastRect != null) {
inc = lastRect.y - visibleRect.y;
if ((inc == 0) && (last < this.getModel ().getSize () - 1)) {
inc = lastRect.height;
}}}} else {
var newFirst = this.locationToIndex ( new jsjava.awt.Point (visibleRect.x, visibleRect.y - visibleRect.height));
var first = this.getFirstVisibleIndex ();
if (newFirst != -1) {
if (first == -1) {
first = this.locationToIndex (visibleRect.getLocation ());
}var newFirstRect = this.getCellBounds (newFirst, newFirst);
var firstRect = this.getCellBounds (first, first);
if ((newFirstRect != null) && (firstRect != null)) {
while ((newFirstRect.y + visibleRect.height < firstRect.y + firstRect.height) && (newFirstRect.y < firstRect.y)) {
newFirst++;
newFirstRect = this.getCellBounds (newFirst, newFirst);
}
inc = visibleRect.y - newFirstRect.y;
if ((inc <= 0) && (newFirstRect.y > 0)) {
newFirst--;
newFirstRect = this.getCellBounds (newFirst, newFirst);
if (newFirstRect != null) {
inc = visibleRect.y - newFirstRect.y;
}}}}}return inc;
} else if (orientation == 0 && this.getLayoutOrientation () != 0) {
var leftToRight = this.getComponentOrientation ().isLeftToRight ();
var inc = visibleRect.width;
if (direction > 0) {
var x = visibleRect.x + (leftToRight ? (visibleRect.width - 1) : 0);
var last = this.locationToIndex ( new jsjava.awt.Point (x, visibleRect.y));
if (last != -1) {
var lastRect = this.getCellBounds (last, last);
if (lastRect != null) {
if (leftToRight) {
inc = lastRect.x - visibleRect.x;
} else {
inc = visibleRect.x + visibleRect.width - (lastRect.x + lastRect.width);
}if (inc < 0) {
inc += lastRect.width;
} else if ((inc == 0) && (last < this.getModel ().getSize () - 1)) {
inc = lastRect.width;
}}}} else {
var x = visibleRect.x + (leftToRight ? -visibleRect.width : visibleRect.width - 1 + visibleRect.width);
var first = this.locationToIndex ( new jsjava.awt.Point (x, visibleRect.y));
if (first != -1) {
var firstRect = this.getCellBounds (first, first);
if (firstRect != null) {
var firstRight = firstRect.x + firstRect.width;
if (leftToRight) {
if ((firstRect.x < visibleRect.x - visibleRect.width) && (firstRight < visibleRect.x)) {
inc = visibleRect.x - firstRight;
} else {
inc = visibleRect.x - firstRect.x;
}} else {
var visibleRight = visibleRect.x + visibleRect.width;
if ((firstRight > visibleRight + visibleRect.width) && (firstRect.x > visibleRight)) {
inc = firstRect.x - visibleRight;
} else {
inc = firstRight - visibleRight;
}}}}}return inc;
}return visibleRect.width;
}, "jsjava.awt.Rectangle,~N,~N");
Clazz.overrideMethod (c$, "getScrollableTracksViewportWidth", 
function () {
if (this.getLayoutOrientation () == 2 && this.getVisibleRowCount () <= 0) {
return true;
}if (Clazz.instanceOf (this.getParent (), jsjavax.swing.JViewport)) {
return ((this.getParent ()).getWidth () > this.getPreferredSize ().width);
}return false;
});
Clazz.overrideMethod (c$, "getScrollableTracksViewportHeight", 
function () {
if (this.getLayoutOrientation () == 1 && this.getVisibleRowCount () <= 0) {
return true;
}if (Clazz.instanceOf (this.getParent (), jsjavax.swing.JViewport)) {
return ((this.getParent ()).getHeight () > this.getPreferredSize ().height);
}return false;
});
Clazz.defineMethod (c$, "paramString", 
function () {
var selectionForegroundString = (this.selectionForeground != null ? this.selectionForeground.toString () : "");
var selectionBackgroundString = (this.selectionBackground != null ? this.selectionBackground.toString () : "");
return Clazz.superCall (this, jsjavax.swing.JList, "paramString", []) + ",fixedCellHeight=" + this.fixedCellHeight + ",fixedCellWidth=" + this.fixedCellWidth + ",horizontalScrollIncrement=" + this.horizontalScrollIncrement + ",selectionBackground=" + selectionBackgroundString + ",selectionForeground=" + selectionForegroundString + ",visibleRowCount=" + this.visibleRowCount + ",layoutOrientation=" + this.layoutOrientation;
});
c$.$JList$ListSelectionHandler$ = function () {
Clazz.pu$h ();
c$ = Clazz.decorateAsClass (function () {
Clazz.prepareCallback (this, arguments);
Clazz.instantialize (this, arguments);
}, jsjavax.swing.JList, "ListSelectionHandler", null, jsjavax.swing.event.ListSelectionListener);
Clazz.overrideMethod (c$, "valueChanged", 
function (a) {
this.b$["jsjavax.swing.JList"].fireSelectionValueChanged (a.getFirstIndex (), a.getLastIndex (), a.getValueIsAdjusting ());
}, "jsjavax.swing.event.ListSelectionEvent");
c$ = Clazz.p0p ();
};
c$.$JList$1$ = function () {
Clazz.pu$h ();
c$ = Clazz.declareAnonymous (jsjavax.swing, "JList$1", jsjavax.swing.AbstractListModel);
Clazz.defineMethod (c$, "getSize", 
function () {
return this.f$.listData.length;
});
Clazz.defineMethod (c$, "getElementAt", 
function (i) {
return this.f$.listData[i];
}, "~N");
c$ = Clazz.p0p ();
};
c$.$JList$2$ = function () {
Clazz.pu$h ();
c$ = Clazz.declareAnonymous (jsjavax.swing, "JList$2", jsjavax.swing.AbstractListModel);
Clazz.defineMethod (c$, "getSize", 
function () {
return this.f$.listData.size ();
});
Clazz.defineMethod (c$, "getElementAt", 
function (i) {
return this.f$.listData.elementAt (i);
}, "~N");
c$ = Clazz.p0p ();
};
c$.$JList$3$ = function () {
Clazz.pu$h ();
c$ = Clazz.declareAnonymous (jsjavax.swing, "JList$3", jsjavax.swing.AbstractListModel);
Clazz.defineMethod (c$, "getSize", 
function () {
return 0;
});
Clazz.defineMethod (c$, "getElementAt", 
function (i) {
return "No Data Model";
}, "~N");
c$ = Clazz.p0p ();
};
c$.$JList$4$ = function () {
Clazz.pu$h ();
c$ = Clazz.declareAnonymous (jsjavax.swing, "JList$4", jsjavax.swing.AbstractListModel);
Clazz.defineMethod (c$, "getSize", 
function () {
return this.f$.listData.length;
});
Clazz.defineMethod (c$, "getElementAt", 
function (i) {
return this.f$.listData[i];
}, "~N");
c$ = Clazz.p0p ();
};
c$.$JList$5$ = function () {
Clazz.pu$h ();
c$ = Clazz.declareAnonymous (jsjavax.swing, "JList$5", jsjavax.swing.AbstractListModel);
Clazz.defineMethod (c$, "getSize", 
function () {
return this.f$.listData.size ();
});
Clazz.defineMethod (c$, "getElementAt", 
function (i) {
return this.f$.listData.elementAt (i);
}, "~N");
c$ = Clazz.p0p ();
};
Clazz.defineStatics (c$,
"$uiClassID", "ListUI",
"VERTICAL", 0,
"VERTICAL_WRAP", 1,
"HORIZONTAL_WRAP", 2);
});

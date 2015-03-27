Clazz.declarePackage ("jsjavax.swing");
Clazz.load (["jsjava.awt.event.ComponentAdapter", "jsjavax.swing.JComponent"], "jsjavax.swing.JViewport", ["java.lang.IllegalArgumentException", "jsjava.applet.Applet", "jsjava.awt.Dimension", "$.Insets", "$.Point", "$.Rectangle", "$.Window", "jsjava.awt.event.ActionListener", "jsjavax.swing.CellRendererPane", "$.RepaintManager", "$.SwingUtilities", "$.Timer", "$.UIManager", "$.ViewportLayout", "jsjavax.swing.event.ChangeEvent", "$.ChangeListener"], function () {
c$ = Clazz.decorateAsClass (function () {
this.isViewSizeSet = false;
this.lastPaintPosition = null;
this.backingStore = false;
this.backingStoreImage = null;
this.scrollUnderway = false;
this.viewListener = null;
this.changeEvent = null;
this.scrollMode = 1;
this.repaintAll = false;
this.waitingForRepaint = false;
this.repaintTimer = null;
this.inBlitPaint = false;
this.hasHadValidView = false;
if (!Clazz.isClassDefined ("jsjavax.swing.JViewport.ViewListener")) {
jsjavax.swing.JViewport.$JViewport$ViewListener$ ();
}
Clazz.instantialize (this, arguments);
}, jsjavax.swing, "JViewport", jsjavax.swing.JComponent);
Clazz.makeConstructor (c$, 
function () {
Clazz.superConstructor (this, jsjavax.swing.JViewport);
this.setLayout (this.createLayoutManager ());
this.setOpaque (true);
this.updateUI ();
this.setInheritsPopupMenu (true);
});
Clazz.defineMethod (c$, "getUI", 
function () {
return this.ui;
});
Clazz.overrideMethod (c$, "updateUI", 
function () {
this.setUI (jsjavax.swing.UIManager.getUI (this));
});
Clazz.overrideMethod (c$, "getUIClassID", 
function () {
return "ViewportUI";
});
Clazz.defineMethod (c$, "addImpl", 
function (child, constraints, index) {
this.setView (child);
}, "jsjava.awt.Component,~O,~N");
Clazz.defineMethod (c$, "remove", 
function (child) {
child.removeComponentListener (this.viewListener);
Clazz.superCall (this, jsjavax.swing.JViewport, "remove", [child]);
}, "jsjava.awt.Component");
Clazz.overrideMethod (c$, "scrollRectToVisible", 
function (contentRect) {
var view = this.getView ();
if (view == null) {
return;
} else {
if (!view.isValid ()) {
this.validateView ();
}var dx = 0;
var dy = 0;
dx = this.positionAdjustment (this.getWidth (), contentRect.width, contentRect.x);
dy = this.positionAdjustment (this.getHeight (), contentRect.height, contentRect.y);
if (dx != 0 || dy != 0) {
var viewPosition = this.getViewPosition ();
var viewSize = view.getSize ();
var startX = viewPosition.x;
var startY = viewPosition.y;
var extent = this.getExtentSize ();
viewPosition.x -= dx;
viewPosition.y -= dy;
if (view.isValid ()) {
if (this.getParent ().getComponentOrientation ().isLeftToRight ()) {
if (viewPosition.x + extent.width > viewSize.width) {
viewPosition.x = Math.max (0, viewSize.width - extent.width);
} else if (viewPosition.x < 0) {
viewPosition.x = 0;
}} else {
if (extent.width > viewSize.width) {
viewPosition.x = viewSize.width - extent.width;
} else {
viewPosition.x = Math.max (0, Math.min (viewSize.width - extent.width, viewPosition.x));
}}if (viewPosition.y + extent.height > viewSize.height) {
viewPosition.y = Math.max (0, viewSize.height - extent.height);
} else if (viewPosition.y < 0) {
viewPosition.y = 0;
}}if (viewPosition.x != startX || viewPosition.y != startY) {
this.setViewPosition (viewPosition);
this.scrollUnderway = false;
}}}}, "jsjava.awt.Rectangle");
Clazz.defineMethod (c$, "validateView", 
($fz = function () {
var validateRoot = null;
for (var c = this; c != null; c = c.getParent ()) {
if ((Clazz.instanceOf (c, jsjavax.swing.CellRendererPane)) || !c.isLightweight ()) {
return;
}if ((Clazz.instanceOf (c, jsjavax.swing.JComponent)) && ((c).isValidateRoot ())) {
validateRoot = c;
break;
}}
if (validateRoot == null) {
return;
}var root = null;
for (var c = validateRoot; c != null; c = c.getParent ()) {
if (!c.isLightweight ()) {
return;
}if ((Clazz.instanceOf (c, jsjava.awt.Window)) || (Clazz.instanceOf (c, jsjava.applet.Applet))) {
root = c;
break;
}}
if (root == null) {
return;
}validateRoot.validate ();
var rm = jsjavax.swing.RepaintManager.currentManager (this);
if (rm != null) {
rm.removeInvalidComponent (validateRoot);
}}, $fz.isPrivate = true, $fz));
Clazz.defineMethod (c$, "positionAdjustment", 
($fz = function (parentWidth, childWidth, childAt) {
if (childAt >= 0 && childWidth + childAt <= parentWidth) {
return 0;
}if (childAt <= 0 && childWidth + childAt >= parentWidth) {
return 0;
}if (childAt > 0 && childWidth <= parentWidth) {
return -childAt + parentWidth - childWidth;
}if (childAt >= 0 && childWidth >= parentWidth) {
return -childAt;
}if (childAt <= 0 && childWidth <= parentWidth) {
return -childAt;
}if (childAt < 0 && childWidth >= parentWidth) {
return -childAt + parentWidth - childWidth;
}return 0;
}, $fz.isPrivate = true, $fz), "~N,~N,~N");
Clazz.overrideMethod (c$, "setBorder", 
function (border) {
if (border != null) {
throw  new IllegalArgumentException ("JViewport.setBorder() not supported");
}}, "jsjavax.swing.border.Border");
Clazz.defineMethod (c$, "getInsets", 
function () {
return  new jsjava.awt.Insets (0, 0, 0, 0);
});
Clazz.defineMethod (c$, "getInsets", 
function (insets) {
insets.left = insets.top = insets.right = insets.bottom = 0;
return insets;
}, "jsjava.awt.Insets");
Clazz.defineMethod (c$, "getBackingStoreGraphics", 
($fz = function (g) {
var bsg = this.backingStoreImage.getGraphics ();
bsg.setColor (g.getColor ());
bsg.setFont (g.getFont ());
bsg.setClip (g.getClipBounds ());
return bsg;
}, $fz.isPrivate = true, $fz), "jsjava.awt.Graphics");
Clazz.defineMethod (c$, "paintViaBackingStore", 
($fz = function (g) {
var bsg = this.getBackingStoreGraphics (g);
try {
Clazz.superCall (this, jsjavax.swing.JViewport, "paint", [bsg]);
g.drawImage (this.backingStoreImage, 0, 0, this);
} finally {
bsg.dispose ();
}
}, $fz.isPrivate = true, $fz), "jsjava.awt.Graphics");
Clazz.defineMethod (c$, "paintViaBackingStore", 
($fz = function (g, oClip) {
var bsg = this.getBackingStoreGraphics (g);
try {
Clazz.superCall (this, jsjavax.swing.JViewport, "paint", [bsg]);
g.setClip (oClip);
g.drawImage (this.backingStoreImage, 0, 0, this);
} finally {
bsg.dispose ();
}
}, $fz.isPrivate = true, $fz), "jsjava.awt.Graphics,jsjava.awt.Rectangle");
Clazz.defineMethod (c$, "isOptimizedDrawingEnabled", 
function () {
return false;
});
Clazz.overrideMethod (c$, "isPaintingOrigin", 
function () {
if (this.scrollMode == 2) {
return true;
}return false;
});
Clazz.defineMethod (c$, "getViewLocation", 
($fz = function () {
var view = this.getView ();
if (view != null) {
return view.getLocation ();
} else {
return  new jsjava.awt.Point (0, 0);
}}, $fz.isPrivate = true, $fz));
Clazz.defineMethod (c$, "paint", 
function (g) {
var width = this.getWidth ();
var height = this.getHeight ();
if ((width <= 0) || (height <= 0)) {
return;
}if (this.inBlitPaint) {
Clazz.superCall (this, jsjavax.swing.JViewport, "paint", [g]);
return;
}if (this.repaintAll) {
this.repaintAll = false;
var clipB = g.getClipBounds ();
if (clipB.width < this.getWidth () || clipB.height < this.getHeight ()) {
this.waitingForRepaint = true;
if (this.repaintTimer == null) {
this.repaintTimer = this.createRepaintTimer ();
}this.repaintTimer.stop ();
this.repaintTimer.start ();
} else {
if (this.repaintTimer != null) {
this.repaintTimer.stop ();
}this.waitingForRepaint = false;
}} else if (this.waitingForRepaint) {
var clipB = g.getClipBounds ();
if (clipB.width >= this.getWidth () && clipB.height >= this.getHeight ()) {
this.waitingForRepaint = false;
this.repaintTimer.stop ();
}}if (!this.backingStore || this.isBlitting () || this.getView () == null) {
Clazz.superCall (this, jsjavax.swing.JViewport, "paint", [g]);
this.lastPaintPosition = this.getViewLocation ();
return;
}var viewBounds = this.getView ().getBounds ();
if (!this.isOpaque ()) {
g.clipRect (0, 0, viewBounds.width, viewBounds.height);
}if (this.backingStoreImage == null) {
this.backingStoreImage = this.createImage (width, height);
var clip = g.getClipBounds ();
if (clip.width != width || clip.height != height) {
if (!this.isOpaque ()) {
g.setClip (0, 0, Math.min (viewBounds.width, width), Math.min (viewBounds.height, height));
} else {
g.setClip (0, 0, width, height);
}this.paintViaBackingStore (g, clip);
} else {
this.paintViaBackingStore (g);
}} else {
if (!this.scrollUnderway || this.lastPaintPosition.equals (this.getViewLocation ())) {
this.paintViaBackingStore (g);
} else {
var blitFrom =  new jsjava.awt.Point ();
var blitTo =  new jsjava.awt.Point ();
var blitSize =  new jsjava.awt.Dimension ();
var blitPaint =  new jsjava.awt.Rectangle ();
var newLocation = this.getViewLocation ();
var dx = newLocation.x - this.lastPaintPosition.x;
var dy = newLocation.y - this.lastPaintPosition.y;
var canBlit = this.computeBlit (dx, dy, blitFrom, blitTo, blitSize, blitPaint);
if (!canBlit) {
this.paintViaBackingStore (g);
} else {
var bdx = blitTo.x - blitFrom.x;
var bdy = blitTo.y - blitFrom.y;
var clip = g.getClipBounds ();
g.setClip (0, 0, width, height);
var bsg = this.getBackingStoreGraphics (g);
try {
bsg.copyArea (blitFrom.x, blitFrom.y, blitSize.width, blitSize.height, bdx, bdy);
g.setClip (clip.x, clip.y, clip.width, clip.height);
var r = viewBounds.intersection (blitPaint);
bsg.setClip (r);
Clazz.superCall (this, jsjavax.swing.JViewport, "paint", [bsg]);
g.drawImage (this.backingStoreImage, 0, 0, this);
} finally {
bsg.dispose ();
}
}}}this.lastPaintPosition = this.getViewLocation ();
this.scrollUnderway = false;
}, "jsjava.awt.Graphics");
Clazz.defineMethod (c$, "reshape", 
function (x, y, w, h) {
var sizeChanged = (this.getWidth () != w) || (this.getHeight () != h);
if (sizeChanged) {
this.backingStoreImage = null;
}Clazz.superCall (this, jsjavax.swing.JViewport, "reshape", [x, y, w, h]);
if (sizeChanged) {
this.fireStateChanged ();
}}, "~N,~N,~N,~N");
Clazz.defineMethod (c$, "setScrollMode", 
function (mode) {
this.scrollMode = mode;
if (mode == 2) {
this.backingStore = true;
} else {
this.backingStore = false;
}}, "~N");
Clazz.defineMethod (c$, "getScrollMode", 
function () {
return this.scrollMode;
});
Clazz.defineMethod (c$, "isBackingStoreEnabled", 
function () {
return this.scrollMode == 2;
});
Clazz.defineMethod (c$, "setBackingStoreEnabled", 
function (enabled) {
if (enabled) {
this.setScrollMode (2);
} else {
this.setScrollMode (1);
}}, "~B");
Clazz.defineMethod (c$, "isBlitting", 
($fz = function () {
var view = this.getView ();
return (this.scrollMode == 1) && (Clazz.instanceOf (view, jsjavax.swing.JComponent)) && (view).isOpaque ();
}, $fz.isPrivate = true, $fz));
Clazz.defineMethod (c$, "getView", 
function () {
return (this.getComponentCount () > 0) ? this.getComponent (0) : null;
});
Clazz.defineMethod (c$, "setView", 
function (view) {
var n = this.getComponentCount ();
for (var i = n - 1; i >= 0; i--) {
this.remove (this.getComponent (i));
}
this.isViewSizeSet = false;
if (view != null) {
Clazz.superCall (this, jsjavax.swing.JViewport, "addImpl", [view, null, -1]);
this.viewListener = this.createViewListener ();
view.addComponentListener (this.viewListener);
}if (this.hasHadValidView) {
this.fireStateChanged ();
} else if (view != null) {
this.hasHadValidView = true;
}this.revalidate ();
this.repaint ();
}, "jsjava.awt.Component");
Clazz.defineMethod (c$, "getViewSize", 
function () {
var view = this.getView ();
if (view == null) {
return  new jsjava.awt.Dimension (0, 0);
} else if (this.isViewSizeSet) {
return view.getSize ();
} else {
return view.getPreferredSize ();
}});
Clazz.defineMethod (c$, "setViewSize", 
function (newSize) {
var view = this.getView ();
if (view != null) {
var oldSize = view.getSize ();
if (!newSize.equals (oldSize)) {
this.scrollUnderway = false;
view.setSize (newSize);
this.isViewSizeSet = true;
this.fireStateChanged ();
}}}, "jsjava.awt.Dimension");
Clazz.defineMethod (c$, "getViewPosition", 
function () {
var view = this.getView ();
if (view != null) {
var p = view.getLocation ();
p.x = -p.x;
p.y = -p.y;
return p;
} else {
return  new jsjava.awt.Point (0, 0);
}});
Clazz.defineMethod (c$, "setViewPosition", 
function (p) {
var view = this.getView ();
if (view == null) {
return;
}var oldX;
var oldY;
var x = p.x;
var y = p.y;
if (Clazz.instanceOf (view, jsjavax.swing.JComponent)) {
var c = view;
oldX = c.getX ();
oldY = c.getY ();
} else {
var r = view.getBounds ();
oldX = r.x;
oldY = r.y;
}var newX = -x;
var newY = -y;
if ((oldX != newX) || (oldY != newY)) {
if (!this.waitingForRepaint && this.isBlitting () && this.canUseWindowBlitter ()) {
var rm = jsjavax.swing.RepaintManager.currentManager (this);
var jview = view;
var dirty = rm.getDirtyRegion (jview);
if (dirty == null || !dirty.contains (jview.getVisibleRect ())) {
rm.beginPaint ();
try {
var g = jsjavax.swing.JComponent.safelyGetGraphics (this);
this.flushViewDirtyRegion (g, dirty);
view.setLocation (newX, newY);
g.setClip (0, 0, this.getWidth (), Math.min (this.getHeight (), jview.getHeight ()));
this.repaintAll = (this.windowBlitPaint (g) && this.needsRepaintAfterBlit ());
g.dispose ();
rm.markCompletelyClean (this.getParent ());
rm.markCompletelyClean (this);
rm.markCompletelyClean (jview);
} finally {
rm.endPaint ();
}
} else {
view.setLocation (newX, newY);
this.repaintAll = false;
}} else {
this.scrollUnderway = true;
view.setLocation (newX, newY);
this.repaintAll = false;
}this.fireStateChanged ();
}}, "jsjava.awt.Point");
Clazz.defineMethod (c$, "getViewRect", 
function () {
return  new jsjava.awt.Rectangle (this.getViewPosition (), this.getExtentSize ());
});
Clazz.defineMethod (c$, "computeBlit", 
function (dx, dy, blitFrom, blitTo, blitSize, blitPaint) {
var dxAbs = Math.abs (dx);
var dyAbs = Math.abs (dy);
var extentSize = this.getExtentSize ();
if ((dx == 0) && (dy != 0) && (dyAbs < extentSize.height)) {
if (dy < 0) {
blitFrom.y = -dy;
blitTo.y = 0;
blitPaint.y = extentSize.height + dy;
} else {
blitFrom.y = 0;
blitTo.y = dy;
blitPaint.y = 0;
}blitPaint.x = blitFrom.x = blitTo.x = 0;
blitSize.width = extentSize.width;
blitSize.height = extentSize.height - dyAbs;
blitPaint.width = extentSize.width;
blitPaint.height = dyAbs;
return true;
} else if ((dy == 0) && (dx != 0) && (dxAbs < extentSize.width)) {
if (dx < 0) {
blitFrom.x = -dx;
blitTo.x = 0;
blitPaint.x = extentSize.width + dx;
} else {
blitFrom.x = 0;
blitTo.x = dx;
blitPaint.x = 0;
}blitPaint.y = blitFrom.y = blitTo.y = 0;
blitSize.width = extentSize.width - dxAbs;
blitSize.height = extentSize.height;
blitPaint.width = dxAbs;
blitPaint.height = extentSize.height;
return true;
} else {
return false;
}}, "~N,~N,jsjava.awt.Point,jsjava.awt.Point,jsjava.awt.Dimension,jsjava.awt.Rectangle");
Clazz.defineMethod (c$, "getExtentSize", 
function () {
return this.getSize ();
});
Clazz.defineMethod (c$, "toViewCoordinates", 
function (size) {
return  new jsjava.awt.Dimension (size);
}, "jsjava.awt.Dimension");
Clazz.defineMethod (c$, "toViewCoordinates", 
function (p) {
return  new jsjava.awt.Point (p);
}, "jsjava.awt.Point");
Clazz.defineMethod (c$, "setExtentSize", 
function (newExtent) {
var oldExtent = this.getExtentSize ();
if (!newExtent.equals (oldExtent)) {
this.setSize (newExtent);
this.fireStateChanged ();
}}, "jsjava.awt.Dimension");
Clazz.defineMethod (c$, "createViewListener", 
function () {
return Clazz.innerTypeInstance (jsjavax.swing.JViewport.ViewListener, this, null);
});
Clazz.defineMethod (c$, "createLayoutManager", 
function () {
return jsjavax.swing.ViewportLayout.SHARED_INSTANCE;
});
Clazz.defineMethod (c$, "addChangeListener", 
function (l) {
this.listenerList.add (jsjavax.swing.event.ChangeListener, l);
}, "jsjavax.swing.event.ChangeListener");
Clazz.defineMethod (c$, "removeChangeListener", 
function (l) {
this.listenerList.remove (jsjavax.swing.event.ChangeListener, l);
}, "jsjavax.swing.event.ChangeListener");
Clazz.defineMethod (c$, "getChangeListeners", 
function () {
return this.listenerList.getListeners (jsjavax.swing.event.ChangeListener);
});
Clazz.defineMethod (c$, "fireStateChanged", 
function () {
var listeners = this.listenerList.getListenerList ();
for (var i = listeners.length - 2; i >= 0; i -= 2) {
if (listeners[i] === jsjavax.swing.event.ChangeListener) {
if (this.changeEvent == null) {
this.changeEvent =  new jsjavax.swing.event.ChangeEvent (this);
}(listeners[i + 1]).stateChanged (this.changeEvent);
}}
});
Clazz.defineMethod (c$, "repaint", 
function (tm, x, y, w, h) {
var parent = this.getParent ();
if (parent != null) parent.repaint (tm, x + this.getX (), y + this.getY (), w, h);
 else Clazz.superCall (this, jsjavax.swing.JViewport, "repaint", [tm, x, y, w, h]);
}, "~N,~N,~N,~N,~N");
Clazz.defineMethod (c$, "paramString", 
function () {
var isViewSizeSetString = (this.isViewSizeSet ? "true" : "false");
var lastPaintPositionString = (this.lastPaintPosition != null ? this.lastPaintPosition.toString () : "");
var scrollUnderwayString = (this.scrollUnderway ? "true" : "false");
return Clazz.superCall (this, jsjavax.swing.JViewport, "paramString", []) + ",isViewSizeSet=" + isViewSizeSetString + ",lastPaintPosition=" + lastPaintPositionString + ",scrollUnderway=" + scrollUnderwayString;
});
Clazz.defineMethod (c$, "firePropertyChange", 
function (propertyName, oldValue, newValue) {
Clazz.superCall (this, jsjavax.swing.JViewport, "firePropertyChange", [propertyName, oldValue, newValue]);
if (propertyName.equals (jsjavax.swing.JViewport.EnableWindowBlit)) {
if (newValue != null) {
this.setScrollMode (1);
} else {
this.setScrollMode (0);
}}}, "~S,~O,~O");
Clazz.defineMethod (c$, "needsRepaintAfterBlit", 
($fz = function () {
var heavyParent = this.getParent ();
while (heavyParent != null && heavyParent.isLightweight ()) {
heavyParent = heavyParent.getParent ();
}
if (heavyParent != null) {
}return true;
}, $fz.isPrivate = true, $fz));
Clazz.defineMethod (c$, "createRepaintTimer", 
($fz = function () {
var timer =  new jsjavax.swing.Timer (300, ((Clazz.isClassDefined ("jsjavax.swing.JViewport$1") ? 0 : jsjavax.swing.JViewport.$JViewport$1$ ()), Clazz.innerTypeInstance (jsjavax.swing.JViewport$1, this, null)));
timer.setRepeats (false);
return timer;
}, $fz.isPrivate = true, $fz));
Clazz.defineMethod (c$, "flushViewDirtyRegion", 
($fz = function (g, dirty) {
var view = this.getView ();
if (dirty != null && dirty.width > 0 && dirty.height > 0) {
dirty.x += view.getX ();
dirty.y += view.getY ();
var clip = g.getClipBounds ();
if (clip == null) {
g.setClip (0, 0, this.getWidth (), this.getHeight ());
}g.clipRect (dirty.x, dirty.y, dirty.width, dirty.height);
clip = g.getClipBounds ();
if (clip.width > 0 && clip.height > 0) {
this.paintView (g);
}}}, $fz.isPrivate = true, $fz), "jsjava.awt.Graphics,jsjava.awt.Rectangle");
Clazz.defineMethod (c$, "windowBlitPaint", 
($fz = function (g) {
var width = this.getWidth ();
var height = this.getHeight ();
if ((width == 0) || (height == 0)) {
return false;
}var retValue;
var rm = jsjavax.swing.RepaintManager.currentManager (this);
var view = this.getView ();
if (this.lastPaintPosition == null || this.lastPaintPosition.equals (this.getViewLocation ())) {
this.paintView (g);
retValue = false;
} else {
var blitFrom =  new jsjava.awt.Point ();
var blitTo =  new jsjava.awt.Point ();
var blitSize =  new jsjava.awt.Dimension ();
var blitPaint =  new jsjava.awt.Rectangle ();
var newLocation = this.getViewLocation ();
var dx = newLocation.x - this.lastPaintPosition.x;
var dy = newLocation.y - this.lastPaintPosition.y;
var canBlit = this.computeBlit (dx, dy, blitFrom, blitTo, blitSize, blitPaint);
if (!canBlit) {
this.paintView (g);
retValue = false;
} else {
var r = view.getBounds ().intersection (blitPaint);
r.x -= view.getX ();
r.y -= view.getY ();
this.blitDoubleBuffered (view, g, r.x, r.y, r.width, r.height, blitFrom.x, blitFrom.y, blitTo.x, blitTo.y, blitSize.width, blitSize.height);
retValue = true;
}}this.lastPaintPosition = this.getViewLocation ();
return retValue;
}, $fz.isPrivate = true, $fz), "jsjava.awt.Graphics");
Clazz.defineMethod (c$, "blitDoubleBuffered", 
($fz = function (view, g, clipX, clipY, clipW, clipH, blitFromX, blitFromY, blitToX, blitToY, blitW, blitH) {
var rm = jsjavax.swing.RepaintManager.currentManager (this);
var bdx = blitToX - blitFromX;
var bdy = blitToY - blitFromY;
rm.copyArea (this, g, blitFromX, blitFromY, blitW, blitH, bdx, bdy, false);
var x = view.getX ();
var y = view.getY ();
g.translate (x, y);
g.setClip (clipX, clipY, clipW, clipH);
view.paintForceDoubleBuffered (g);
g.translate (-x, -y);
}, $fz.isPrivate = true, $fz), "jsjavax.swing.JComponent,jsjava.awt.Graphics,~N,~N,~N,~N,~N,~N,~N,~N,~N,~N");
Clazz.defineMethod (c$, "paintView", 
($fz = function (g) {
var clip = g.getClipBounds ();
var view = this.getView ();
if (view.getWidth () >= this.getWidth ()) {
var x = view.getX ();
var y = view.getY ();
g.translate (x, y);
g.setClip (clip.x - x, clip.y - y, clip.width, clip.height);
view.paintForceDoubleBuffered (g);
g.translate (-x, -y);
g.setClip (clip.x, clip.y, clip.width, clip.height);
} else {
try {
this.inBlitPaint = true;
this.paintForceDoubleBuffered (g);
} finally {
this.inBlitPaint = false;
}
}}, $fz.isPrivate = true, $fz), "jsjava.awt.Graphics");
Clazz.defineMethod (c$, "canUseWindowBlitter", 
($fz = function () {
if (!this.isShowing () || (!(Clazz.instanceOf (this.getParent (), jsjavax.swing.JComponent)) && !(Clazz.instanceOf (this.getView (), jsjavax.swing.JComponent)))) {
return false;
}if (this.isPainting ()) {
return false;
}var dirtyRegion = jsjavax.swing.RepaintManager.currentManager (this).getDirtyRegion (this.getParent ());
if (dirtyRegion != null && dirtyRegion.width > 0 && dirtyRegion.height > 0) {
return false;
}var clip =  new jsjava.awt.Rectangle (0, 0, this.getWidth (), this.getHeight ());
var oldClip =  new jsjava.awt.Rectangle ();
var tmp2 = null;
var parent;
var lastParent = null;
var x;
var y;
var w;
var h;
for (parent = this; parent != null && jsjavax.swing.JComponent.isLightweightComponent (parent); parent = parent.getParent ()) {
x = parent.getX ();
y = parent.getY ();
w = parent.getWidth ();
h = parent.getHeight ();
oldClip.setBounds (clip);
jsjavax.swing.SwingUtilities.computeIntersection (0, 0, w, h, clip);
if (!clip.equals (oldClip)) return false;
if (lastParent != null && Clazz.instanceOf (parent, jsjavax.swing.JComponent) && !(parent).isOptimizedDrawingEnabled ()) {
var comps = parent.getComponents ();
var index = 0;
for (var i = comps.length - 1; i >= 0; i--) {
if (comps[i] === lastParent) {
index = i - 1;
break;
}}
while (index >= 0) {
tmp2 = comps[index].getBounds (tmp2);
if (tmp2.intersects (clip)) return false;
index--;
}
}clip.x += x;
clip.y += y;
lastParent = parent;
}
if (parent == null) {
return false;
}return true;
}, $fz.isPrivate = true, $fz));
c$.$JViewport$ViewListener$ = function () {
Clazz.pu$h ();
c$ = Clazz.decorateAsClass (function () {
Clazz.prepareCallback (this, arguments);
Clazz.instantialize (this, arguments);
}, jsjavax.swing.JViewport, "ViewListener", jsjava.awt.event.ComponentAdapter);
Clazz.overrideMethod (c$, "componentResized", 
function (a) {
this.b$["jsjavax.swing.JViewport"].fireStateChanged ();
this.b$["jsjavax.swing.JViewport"].revalidate ();
}, "jsjava.awt.event.ComponentEvent");
c$ = Clazz.p0p ();
};
c$.$JViewport$1$ = function () {
Clazz.pu$h ();
c$ = Clazz.declareAnonymous (jsjavax.swing, "JViewport$1", null, jsjava.awt.event.ActionListener);
Clazz.overrideMethod (c$, "actionPerformed", 
function (ae) {
if (this.b$["jsjavax.swing.JViewport"].waitingForRepaint) {
this.b$["jsjavax.swing.JViewport"].repaint ();
}}, "jsjava.awt.event.ActionEvent");
c$ = Clazz.p0p ();
};
Clazz.defineStatics (c$,
"$uiClassID", "ViewportUI",
"EnableWindowBlit", "EnableWindowBlit",
"BLIT_SCROLL_MODE", 1,
"BACKINGSTORE_SCROLL_MODE", 2,
"SIMPLE_SCROLL_MODE", 0);
});

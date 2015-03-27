Clazz.declarePackage ("jsjava.awt");
Clazz.load (["java.lang.Enum", "jsjava.awt.image.ImageObserver", "java.util.WeakHashMap", "jsjava.awt.AWTEvent", "$.ComponentOrientation"], "jsjava.awt.Component", ["java.lang.Byte", "$.Character", "$.Double", "$.Float", "$.IllegalArgumentException", "$.Long", "$.NullPointerException", "$.Short", "jsjava.awt.AWTEventMulticaster", "$.Cursor", "$.Dimension", "$.EventQueue", "$.IllegalComponentStateException", "$.Point", "$.Rectangle", "$.Toolkit", "jsjava.awt.event.ComponentEvent", "$.ComponentListener", "$.FocusEvent", "$.FocusListener", "$.HierarchyBoundsListener", "$.HierarchyEvent", "$.HierarchyListener", "$.InputEvent", "$.InputMethodEvent", "$.InputMethodListener", "$.KeyEvent", "$.KeyListener", "$.MouseEvent", "$.MouseListener", "$.MouseMotionListener", "$.MouseWheelEvent", "$.MouseWheelListener", "jsjava.beans.PropertyChangeListener", "$.PropertyChangeSupport", "jsjava.security.AccessController", "$.PrivilegedAction", "jssun.awt.AppContext", "$.SunToolkit", "jssun.font.FontDesignMetrics"], function () {
c$ = Clazz.decorateAsClass (function () {
this.parent = null;
this.appContext = null;
this.x = 0;
this.y = 0;
this.width = 0;
this.height = 0;
this.foreground = null;
this.background = null;
this.font = null;
this.peerFont = null;
this.cursor = null;
this.locale = null;
this.visible = true;
this.enabled = true;
this.valid = false;
this.popups = null;
this.name = null;
this.nameExplicitlySet = false;
this.focusable = true;
this.$isFocusTraversableOverridden = 0;
this.focusTraversalKeysEnabled = false;
this.minSize = null;
this.minSizeSet = false;
this.prefSize = null;
this.prefSizeSet = false;
this.maxSize = null;
this.maxSizeSet = false;
this.componentOrientation = null;
this.newEventsOnly = false;
this.componentListener = null;
this.focusListener = null;
this.hierarchyListener = null;
this.hierarchyBoundsListener = null;
this.keyListener = null;
this.mouseListener = null;
this.mouseMotionListener = null;
this.mouseWheelListener = null;
this.inputMethodListener = null;
this.windowClosingException = null;
this.eventMask = 4096;
this.changeSupport = null;
this.changeSupportLock = null;
this.isPacked = false;
this.backgroundEraseDisabled = false;
this.graphicsConfig = null;
this.eventCache = null;
this.coalescingEnabled = false;
this.autoFocusTransferOnDisposal = true;
Clazz.instantialize (this, arguments);
}, jsjava.awt, "Component", null, jsjava.awt.image.ImageObserver);
Clazz.prepareFields (c$, function () {
this.componentOrientation = jsjava.awt.ComponentOrientation.UNKNOWN;
this.changeSupportLock =  new JavaObject ();
this.coalescingEnabled = this.checkCoalescing ();
});
Clazz.defineMethod (c$, "getChangeSupportLock", 
($fz = function () {
return this.changeSupportLock;
}, $fz.isPrivate = true, $fz));
Clazz.makeConstructor (c$, 
function () {
this.appContext = jssun.awt.AppContext.getAppContext ();
});
Clazz.defineMethod (c$, "constructComponentName", 
function () {
return null;
});
Clazz.defineMethod (c$, "getName", 
function () {
if (this.name == null && !this.nameExplicitlySet) {
{
if (this.name == null && !this.nameExplicitlySet) this.name = this.constructComponentName ();
}}return this.name;
});
Clazz.defineMethod (c$, "setName", 
function (name) {
var oldName;
{
oldName = this.name;
this.name = name;
this.nameExplicitlySet = true;
}this.firePropertyChange ("name", oldName, name);
}, "~S");
Clazz.defineMethod (c$, "getParent", 
function () {
return this.getParent_NoClientCode ();
});
Clazz.defineMethod (c$, "getParent_NoClientCode", 
function () {
return this.parent;
});
Clazz.defineMethod (c$, "getContainer", 
function () {
return this.getParent ();
});
Clazz.defineMethod (c$, "getGraphicsConfiguration", 
function () {
{
if (this.graphicsConfig != null) {
return this.graphicsConfig;
} else if (this.getParent () != null) {
return this.getParent ().getGraphicsConfiguration ();
} else {
return null;
}}});
Clazz.defineMethod (c$, "getGraphicsConfiguration_NoClientCode", 
function () {
var graphicsConfig = this.graphicsConfig;
var parent = this.parent;
if (graphicsConfig != null) {
return graphicsConfig;
} else if (parent != null) {
return parent.getGraphicsConfiguration_NoClientCode ();
} else {
return null;
}});
Clazz.defineMethod (c$, "resetGC", 
function () {
this.graphicsConfig = null;
});
Clazz.defineMethod (c$, "getToolkit", 
function () {
return this.getToolkitImpl ();
});
Clazz.defineMethod (c$, "getToolkitImpl", 
function () {
return jsjava.awt.Toolkit.getDefaultToolkit ();
});
Clazz.defineMethod (c$, "isValid", 
function () {
return this.valid;
});
Clazz.defineMethod (c$, "isDisplayable", 
function () {
return true;
});
Clazz.defineMethod (c$, "isVisible", 
function () {
return this.isVisible_NoClientCode ();
});
Clazz.defineMethod (c$, "isVisible_NoClientCode", 
function () {
return this.visible;
});
Clazz.defineMethod (c$, "isRecursivelyVisible", 
function () {
return this.visible && (this.parent == null || this.parent.isRecursivelyVisible ());
});
Clazz.defineMethod (c$, "pointRelativeToComponent", 
function (absolute) {
var compCoords = this.getLocationOnScreen ();
return  new jsjava.awt.Point (absolute.x - compCoords.x, absolute.y - compCoords.y);
}, "jsjava.awt.Point");
Clazz.defineMethod (c$, "getMousePosition", 
function () {
return null;
});
Clazz.defineMethod (c$, "isSameOrAncestorOf", 
function (comp, allowChildren) {
return comp === this;
}, "jsjava.awt.Component,~B");
Clazz.defineMethod (c$, "isShowing", 
function () {
if (this.visible) {
var parent = this.parent;
return (parent == null) || parent.isShowing ();
}return false;
});
Clazz.defineMethod (c$, "isEnabled", 
function () {
return this.isEnabledImpl ();
});
Clazz.defineMethod (c$, "isEnabledImpl", 
function () {
return this.enabled;
});
Clazz.defineMethod (c$, "setEnabled", 
function (b) {
this.enable (b);
}, "~B");
Clazz.defineMethod (c$, "enable", 
function () {
if (!this.enabled) {
this.enabled = true;
}});
Clazz.defineMethod (c$, "enable", 
function (b) {
if (b) {
this.enable ();
} else {
this.disable ();
}}, "~B");
Clazz.defineMethod (c$, "disable", 
function () {
if (this.enabled) {
this.enabled = false;
}});
Clazz.defineMethod (c$, "isDoubleBuffered", 
function () {
return false;
});
Clazz.defineMethod (c$, "setVisible", 
function (b) {
if (!this.visible) {
this.visible = true;
var parent = this.parent;
if (parent != null) {
parent.invalidate ();
}}}, "~B");
Clazz.defineMethod (c$, "show", 
function (b) {
if (b) {
this.show ();
} else {
this.hide ();
}}, "~B");
Clazz.defineMethod (c$, "show", 
function () {
});
Clazz.defineMethod (c$, "containsFocus", 
function () {
return this.isFocusOwner ();
});
Clazz.defineMethod (c$, "clearCurrentFocusCycleRootOnHide", 
function () {
});
Clazz.defineMethod (c$, "hide", 
function () {
this.isPacked = false;
if (this.visible) {
this.clearCurrentFocusCycleRootOnHide ();
this.visible = false;
if (this.componentListener != null || (this.eventMask & 1) != 0 || jsjava.awt.Toolkit.enabledOnToolkit (1)) {
var e =  new jsjava.awt.event.ComponentEvent (this, 103);
jsjava.awt.Toolkit.getEventQueue ().postEvent (e);
}}var parent = this.parent;
if (parent != null) {
parent.invalidate ();
}});
Clazz.defineMethod (c$, "getForeground", 
function () {
var foreground = this.foreground;
if (foreground != null) {
return foreground;
}var parent = this.parent;
return (parent != null) ? parent.getForeground () : null;
});
Clazz.defineMethod (c$, "setForeground", 
function (c) {
var oldColor = this.foreground;
this.foreground = c;
this.firePropertyChange ("foreground", oldColor, c);
}, "jsjava.awt.Color");
Clazz.defineMethod (c$, "isForegroundSet", 
function () {
return (this.foreground != null);
});
Clazz.defineMethod (c$, "getBackground", 
function () {
var background = this.background;
if (background != null) {
return background;
}var parent = this.parent;
return (parent != null) ? parent.getBackground () : null;
});
Clazz.defineMethod (c$, "setBackground", 
function (c) {
var oldColor = this.background;
this.background = c;
this.firePropertyChange ("background", oldColor, c);
}, "jsjava.awt.Color");
Clazz.defineMethod (c$, "isBackgroundSet", 
function () {
return (this.background != null);
});
Clazz.defineMethod (c$, "getFont", 
function () {
return this.getFont_NoClientCode ();
});
Clazz.defineMethod (c$, "getFont_NoClientCode", 
function () {
var font = this.font;
if (font != null) {
return font;
}var parent = this.parent;
return (parent != null) ? parent.getFont_NoClientCode () : null;
});
Clazz.defineMethod (c$, "setFont", 
function (f) {
var oldFont;
var newFont;
oldFont = this.font;
newFont = this.font = f;
this.firePropertyChange ("font", oldFont, newFont);
if (f !== oldFont && (oldFont == null || !oldFont.equals (f))) {
this.invalidateIfValid ();
}}, "jsjava.awt.Font");
Clazz.defineMethod (c$, "isFontSet", 
function () {
return (this.font != null);
});
Clazz.defineMethod (c$, "getLocale", 
function () {
var locale = this.locale;
if (locale != null) {
return locale;
}var parent = this.parent;
if (parent == null) {
throw  new jsjava.awt.IllegalComponentStateException ("This component must have a parent in order to determine its locale");
} else {
return parent.getLocale ();
}});
Clazz.defineMethod (c$, "setLocale", 
function (l) {
var oldValue = this.locale;
this.locale = l;
this.firePropertyChange ("locale", oldValue, l);
this.invalidateIfValid ();
}, "java.util.Locale");
Clazz.defineMethod (c$, "getLocation", 
function () {
return this.location ();
});
Clazz.defineMethod (c$, "getLocationOnScreen", 
function () {
return this.getLocationOnScreen_NoTreeLock ();
});
Clazz.defineMethod (c$, "getLocationOnScreen_NoTreeLock", 
function () {
return null;
});
Clazz.defineMethod (c$, "location", 
function () {
return this.location_NoClientCode ();
});
Clazz.defineMethod (c$, "location_NoClientCode", 
($fz = function () {
return  new jsjava.awt.Point (this.x, this.y);
}, $fz.isPrivate = true, $fz));
Clazz.defineMethod (c$, "setLocation", 
function (x, y) {
this.setBounds (x, y, this.width, this.height);
}, "~N,~N");
Clazz.defineMethod (c$, "setLocation", 
function (p) {
this.setLocation (p.x, p.y);
}, "jsjava.awt.Point");
Clazz.defineMethod (c$, "getSize", 
function () {
return this.size ();
});
Clazz.defineMethod (c$, "size", 
function () {
return  new jsjava.awt.Dimension (this.width, this.height);
});
Clazz.defineMethod (c$, "setSize", 
function (width, height) {
this.resize (width, height);
}, "~N,~N");
Clazz.defineMethod (c$, "resize", 
function (width, height) {
this.setBounds (this.x, this.y, width, height);
}, "~N,~N");
Clazz.defineMethod (c$, "setSize", 
function (d) {
this.setSize (d.width, d.height);
}, "jsjava.awt.Dimension");
Clazz.defineMethod (c$, "getBounds", 
function () {
return  new jsjava.awt.Rectangle (this.x, this.y, this.width, this.height);
});
Clazz.defineMethod (c$, "setBounds", 
function (x, y, width, height) {
this.reshape (x, y, width, height);
}, "~N,~N,~N,~N");
Clazz.defineMethod (c$, "reshape", 
function (x, y, width, height) {
var resized = (this.width != width) || (this.height != height);
var moved = (this.x != x) || (this.y != y);
if (!resized && !moved) {
return;
}this.x = x;
this.y = y;
this.width = width;
this.height = height;
if (resized) {
this.isPacked = false;
}this.mixOnReshaping ();
}, "~N,~N,~N,~N");
Clazz.defineMethod (c$, "setBounds", 
function (r) {
this.setBounds (r.x, r.y, r.width, r.height);
}, "jsjava.awt.Rectangle");
Clazz.defineMethod (c$, "getX", 
function () {
return this.x;
});
Clazz.defineMethod (c$, "getY", 
function () {
return this.y;
});
Clazz.defineMethod (c$, "getWidth", 
function () {
return this.width;
});
Clazz.defineMethod (c$, "getHeight", 
function () {
return this.height;
});
Clazz.defineMethod (c$, "getBounds", 
function (rv) {
if (rv == null) {
return  new jsjava.awt.Rectangle (this.getX (), this.getY (), this.getWidth (), this.getHeight ());
} else {
rv.setBounds (this.getX (), this.getY (), this.getWidth (), this.getHeight ());
return rv;
}}, "jsjava.awt.Rectangle");
Clazz.defineMethod (c$, "getSize", 
function (rv) {
if (rv == null) {
return  new jsjava.awt.Dimension (this.getWidth (), this.getHeight ());
} else {
rv.setSize (this.getWidth (), this.getHeight ());
return rv;
}}, "jsjava.awt.Dimension");
Clazz.defineMethod (c$, "getLocation", 
function (rv) {
if (rv == null) {
return  new jsjava.awt.Point (this.getX (), this.getY ());
} else {
rv.setLocation (this.getX (), this.getY ());
return rv;
}}, "jsjava.awt.Point");
Clazz.defineMethod (c$, "isOpaque", 
function () {
return true;
});
Clazz.defineMethod (c$, "isLightweight", 
function () {
return false;
});
Clazz.defineMethod (c$, "setPreferredSize", 
function (preferredSize) {
var old;
if (this.prefSizeSet) {
old = this.prefSize;
} else {
old = null;
}this.prefSize = preferredSize;
this.prefSizeSet = (preferredSize != null);
this.firePropertyChange ("preferredSize", old, preferredSize);
}, "jsjava.awt.Dimension");
Clazz.defineMethod (c$, "isPreferredSizeSet", 
function () {
return this.prefSizeSet;
});
Clazz.defineMethod (c$, "getPreferredSize", 
function () {
return this.preferredSize ();
});
Clazz.defineMethod (c$, "preferredSize", 
function () {
var dim = this.prefSize;
if (dim == null || !(this.isPreferredSizeSet () || this.isValid ())) {
this.prefSize = this.getMinimumSize ();
dim = this.prefSize;
}return  new jsjava.awt.Dimension (dim);
});
Clazz.defineMethod (c$, "setMinimumSize", 
function (minimumSize) {
var old;
if (this.minSizeSet) {
old = this.minSize;
} else {
old = null;
}this.minSize = minimumSize;
this.minSizeSet = (minimumSize != null);
this.firePropertyChange ("minimumSize", old, minimumSize);
}, "jsjava.awt.Dimension");
Clazz.defineMethod (c$, "isMinimumSizeSet", 
function () {
return this.minSizeSet;
});
Clazz.defineMethod (c$, "getMinimumSize", 
function () {
return this.minimumSize ();
});
Clazz.defineMethod (c$, "minimumSize", 
function () {
var dim = this.minSize;
if (dim == null || !(this.isMinimumSizeSet () || this.isValid ())) {
this.minSize = this.getSize ();
dim = this.minSize;
}return  new jsjava.awt.Dimension (dim);
});
Clazz.defineMethod (c$, "setMaximumSize", 
function (maximumSize) {
var old;
if (this.maxSizeSet) {
old = this.maxSize;
} else {
old = null;
}this.maxSize = maximumSize;
this.maxSizeSet = (maximumSize != null);
this.firePropertyChange ("maximumSize", old, maximumSize);
}, "jsjava.awt.Dimension");
Clazz.defineMethod (c$, "isMaximumSizeSet", 
function () {
return this.maxSizeSet;
});
Clazz.defineMethod (c$, "getMaximumSize", 
function () {
if (this.isMaximumSizeSet ()) {
return  new jsjava.awt.Dimension (this.maxSize);
}return  new jsjava.awt.Dimension (32767, 32767);
});
Clazz.defineMethod (c$, "getAlignmentX", 
function () {
return 0.5;
});
Clazz.defineMethod (c$, "getAlignmentY", 
function () {
return 0.5;
});
Clazz.defineMethod (c$, "getBaseline", 
function (width, height) {
if (width < 0 || height < 0) {
throw  new IllegalArgumentException ("Width and height must be >= 0");
}return -1;
}, "~N,~N");
Clazz.defineMethod (c$, "getBaselineResizeBehavior", 
function () {
return jsjava.awt.Component.BaselineResizeBehavior.OTHER;
});
Clazz.defineMethod (c$, "doLayout", 
function () {
this.layout ();
});
Clazz.defineMethod (c$, "layout", 
function () {
});
Clazz.defineMethod (c$, "validate", 
function () {
this.valid = true;
});
Clazz.defineMethod (c$, "invalidate", 
function () {
this.valid = false;
if (!this.isPreferredSizeSet ()) {
this.prefSize = null;
}if (!this.isMinimumSizeSet ()) {
this.minSize = null;
}if (!this.isMaximumSizeSet ()) {
this.maxSize = null;
}if (this.parent != null) {
this.parent.invalidateIfValid ();
}});
Clazz.defineMethod (c$, "invalidateIfValid", 
function () {
if (this.isValid ()) {
this.invalidate ();
}});
Clazz.defineMethod (c$, "getGraphics", 
function () {
return null;
});
Clazz.defineMethod (c$, "getTreeLock", 
function () {
return this;
});
Clazz.defineMethod (c$, "getGraphics_NoClientCode", 
function () {
return this.getGraphics ();
});
Clazz.defineMethod (c$, "getFontMetrics", 
function (font) {
return jssun.font.FontDesignMetrics.getMetrics (font);
}, "jsjava.awt.Font");
Clazz.defineMethod (c$, "setCursor", 
function (cursor) {
this.cursor = cursor;
this.updateCursorImmediately ();
}, "jsjava.awt.Cursor");
Clazz.defineMethod (c$, "updateCursorImmediately", 
function () {
});
Clazz.defineMethod (c$, "getCursor", 
function () {
return this.getCursor_NoClientCode ();
});
Clazz.defineMethod (c$, "getCursor_NoClientCode", 
function () {
var cursor = this.cursor;
if (cursor != null) {
return cursor;
}var parent = this.parent;
if (parent != null) {
return parent.getCursor_NoClientCode ();
} else {
return jsjava.awt.Cursor.getPredefinedCursor (0);
}});
Clazz.defineMethod (c$, "isCursorSet", 
function () {
return (this.cursor != null);
});
Clazz.defineMethod (c$, "paint", 
function (g) {
}, "jsjava.awt.Graphics");
Clazz.defineMethod (c$, "update", 
function (g) {
this.paint (g);
}, "jsjava.awt.Graphics");
Clazz.defineMethod (c$, "paintAll", 
function (g) {
if (this.isShowing ()) {
}}, "jsjava.awt.Graphics");
Clazz.defineMethod (c$, "lightweightPaint", 
function (g) {
this.paint (g);
}, "jsjava.awt.Graphics");
Clazz.defineMethod (c$, "paintHeavyweightComponents", 
function (g) {
}, "jsjava.awt.Graphics");
Clazz.defineMethod (c$, "repaint", 
function () {
this.repaint (0, 0, 0, this.width, this.height);
});
Clazz.defineMethod (c$, "repaint", 
function (tm) {
this.repaint (tm, 0, 0, this.width, this.height);
}, "~N");
Clazz.defineMethod (c$, "repaint", 
function (x, y, width, height) {
this.repaint (0, x, y, width, height);
}, "~N,~N,~N,~N");
Clazz.defineMethod (c$, "repaint", 
function (tm, x, y, width, height) {
}, "~N,~N,~N,~N,~N");
Clazz.defineMethod (c$, "print", 
function (g) {
this.paint (g);
}, "jsjava.awt.Graphics");
Clazz.defineMethod (c$, "printAll", 
function (g) {
}, "jsjava.awt.Graphics");
Clazz.defineMethod (c$, "lightweightPrint", 
function (g) {
this.print (g);
}, "jsjava.awt.Graphics");
Clazz.defineMethod (c$, "printHeavyweightComponents", 
function (g) {
}, "jsjava.awt.Graphics");
Clazz.overrideMethod (c$, "imageUpdate", 
function (img, infoflags, x, y, w, h) {
return false;
}, "jsjava.awt.Image,~N,~N,~N,~N,~N");
Clazz.defineMethod (c$, "createImage", 
function (producer) {
return this.getToolkit ().createImage (producer);
}, "jsjava.awt.image.ImageProducer");
Clazz.defineMethod (c$, "createImage", 
function (width, height) {
return null;
}, "~N,~N");
Clazz.defineMethod (c$, "createVolatileImage", 
function (width, height) {
return null;
}, "~N,~N");
Clazz.defineMethod (c$, "createVolatileImage", 
function (width, height, caps) {
return this.createVolatileImage (width, height);
}, "~N,~N,jsjava.awt.ImageCapabilities");
Clazz.defineMethod (c$, "prepareImage", 
function (image, observer) {
return this.prepareImage (image, -1, -1, observer);
}, "jsjava.awt.Image,jsjava.awt.image.ImageObserver");
Clazz.defineMethod (c$, "prepareImage", 
function (image, width, height, observer) {
return false;
}, "jsjava.awt.Image,~N,~N,jsjava.awt.image.ImageObserver");
Clazz.defineMethod (c$, "checkImage", 
function (image, observer) {
return this.checkImage (image, -1, -1, observer);
}, "jsjava.awt.Image,jsjava.awt.image.ImageObserver");
Clazz.defineMethod (c$, "checkImage", 
function (image, width, height, observer) {
return 0;
}, "jsjava.awt.Image,~N,~N,jsjava.awt.image.ImageObserver");
Clazz.defineMethod (c$, "setIgnoreRepaint", 
function (ignoreRepaint) {
}, "~B");
Clazz.defineMethod (c$, "getIgnoreRepaint", 
function () {
return false;
});
Clazz.defineMethod (c$, "contains", 
function (x, y) {
return this.inside (x, y);
}, "~N,~N");
Clazz.defineMethod (c$, "inside", 
function (x, y) {
return (x >= 0) && (x < this.width) && (y >= 0) && (y < this.height);
}, "~N,~N");
Clazz.defineMethod (c$, "contains", 
function (p) {
return this.contains (p.x, p.y);
}, "jsjava.awt.Point");
Clazz.defineMethod (c$, "getComponentAt", 
function (x, y) {
return this.locate (x, y);
}, "~N,~N");
Clazz.defineMethod (c$, "locate", 
function (x, y) {
return this.contains (x, y) ? this : null;
}, "~N,~N");
Clazz.defineMethod (c$, "getComponentAt", 
function (p) {
return this.getComponentAt (p.x, p.y);
}, "jsjava.awt.Point");
Clazz.defineMethod (c$, "deliverEvent", 
function (e) {
this.postEvent (e);
}, "jsjava.awt.Event");
Clazz.defineMethod (c$, "dispatchEvent", 
function (e) {
this.dispatchEventImpl (e);
}, "jsjava.awt.AWTEvent");
Clazz.defineMethod (c$, "dispatchEventImpl", 
function (e) {
var id = e.getID ();
jsjava.awt.EventQueue.setCurrentEventAndMostRecentTime (e);
if (!e.focusManagerIsDispatching) {
if (e.isPosted) {
e.isPosted = true;
}}if (!e.isConsumed ()) {
if (Clazz.instanceOf (e, jsjava.awt.event.KeyEvent)) {
if (e.isConsumed ()) {
return;
}}}if (this.areInputMethodsEnabled ()) {
if ((Clazz.instanceOf (e, jsjava.awt.event.InputEvent)) || (Clazz.instanceOf (e, jsjava.awt.event.FocusEvent))) {
}} else {
if (id == 1004) {
}}switch (id) {
case 401:
case 402:
var p = ((Clazz.instanceOf (this, jsjava.awt.Container)) ? this : this.parent);
if (p != null) {
p.preProcessKeyEvent (e);
}break;
case 201:
break;
default:
break;
}
if (this.newEventsOnly) {
if (this.eventEnabled (e)) {
this.processEvent (e);
}} else if (id == 507) {
this.autoProcessMouseWheel (e);
} else if (!(Clazz.instanceOf (e, jsjava.awt.event.MouseEvent) && !this.postsOldMouseEvents ())) {
}if (id == 201 && !e.isConsumed ()) {
}if (!(Clazz.instanceOf (e, jsjava.awt.event.KeyEvent))) {
}}, "jsjava.awt.AWTEvent");
Clazz.defineMethod (c$, "autoProcessMouseWheel", 
function (e) {
}, "jsjava.awt.event.MouseWheelEvent");
Clazz.defineMethod (c$, "dispatchMouseWheelToAncestor", 
function (e) {
var newX;
var newY;
newX = e.getX () + this.getX ();
newY = e.getY () + this.getY ();
var newMWE;
{
var anc = this.getParent ();
while (anc != null && !anc.eventEnabled (e)) {
newX += anc.getX ();
newY += anc.getY ();
if (!(Clazz.instanceOf (anc, jsjava.awt.Window))) {
anc = anc.getParent ();
} else {
break;
}}
if (anc != null && anc.eventEnabled (e)) {
newMWE =  new jsjava.awt.event.MouseWheelEvent (anc, e.getID (), e.getWhen (), e.getModifiers (), newX, newY, e.getXOnScreen (), e.getYOnScreen (), e.getClickCount (), e.isPopupTrigger (), e.getScrollType (), e.getScrollAmount (), e.getWheelRotation ());
(e).copyPrivateDataInto (newMWE);
anc.dispatchEventToSelf (newMWE);
}}return true;
}, "jsjava.awt.event.MouseWheelEvent");
Clazz.defineMethod (c$, "checkWindowClosingException", 
function () {
if (this.windowClosingException != null) {
if (Clazz.instanceOf (this, jsjava.awt.Dialog)) {
(this).interruptBlocking ();
} else {
this.windowClosingException.fillInStackTrace ();
this.windowClosingException.printStackTrace ();
this.windowClosingException = null;
}return true;
}return false;
});
Clazz.defineMethod (c$, "areInputMethodsEnabled", 
function () {
return ((this.eventMask & 4096) != 0) && ((this.eventMask & 8) != 0 || this.keyListener != null);
});
Clazz.defineMethod (c$, "eventEnabled", 
function (e) {
return this.eventTypeEnabled (e.id);
}, "jsjava.awt.AWTEvent");
Clazz.defineMethod (c$, "eventTypeEnabled", 
function (type) {
switch (type) {
case 100:
case 101:
case 102:
case 103:
if ((this.eventMask & 1) != 0 || this.componentListener != null) {
return true;
}break;
case 1004:
case 1005:
if ((this.eventMask & 4) != 0 || this.focusListener != null) {
return true;
}break;
case 401:
case 402:
case 400:
if ((this.eventMask & 8) != 0 || this.keyListener != null) {
return true;
}break;
case 501:
case 502:
case 504:
case 505:
case 500:
if ((this.eventMask & 16) != 0 || this.mouseListener != null) {
return true;
}break;
case 503:
case 506:
if ((this.eventMask & 32) != 0 || this.mouseMotionListener != null) {
return true;
}break;
case 507:
if ((this.eventMask & 131072) != 0 || this.mouseWheelListener != null) {
return true;
}break;
case 1100:
case 1101:
if ((this.eventMask & 2048) != 0 || this.inputMethodListener != null) {
return true;
}break;
case 1400:
if ((this.eventMask & 32768) != 0 || this.hierarchyListener != null) {
return true;
}break;
case 1401:
case 1402:
if ((this.eventMask & 65536) != 0 || this.hierarchyBoundsListener != null) {
return true;
}break;
case 1001:
if ((this.eventMask & 128) != 0) {
return true;
}break;
case 900:
if ((this.eventMask & 1024) != 0) {
return true;
}break;
case 701:
if ((this.eventMask & 512) != 0) {
return true;
}break;
case 601:
if ((this.eventMask & 256) != 0) {
return true;
}break;
default:
break;
}
if (type > 1999) {
return true;
}return false;
}, "~N");
Clazz.defineMethod (c$, "postEvent", 
function (e) {
if (this.handleEvent (e)) {
e.consume ();
return true;
}var parent = this.parent;
var eventx = e.x;
var eventy = e.y;
if (parent != null) {
e.translate (this.x, this.y);
if (parent.postEvent (e)) {
e.consume ();
return true;
}e.x = eventx;
e.y = eventy;
}return false;
}, "jsjava.awt.Event");
Clazz.defineMethod (c$, "addComponentListener", 
function (l) {
if (l == null) {
return;
}this.componentListener = jsjava.awt.AWTEventMulticaster.add (this.componentListener, l);
this.newEventsOnly = true;
}, "jsjava.awt.event.ComponentListener");
Clazz.defineMethod (c$, "removeComponentListener", 
function (l) {
if (l == null) {
return;
}this.componentListener = jsjava.awt.AWTEventMulticaster.remove (this.componentListener, l);
}, "jsjava.awt.event.ComponentListener");
Clazz.defineMethod (c$, "getComponentListeners", 
function () {
return (this.getListeners (jsjava.awt.event.ComponentListener));
});
Clazz.defineMethod (c$, "addFocusListener", 
function (l) {
if (l == null) {
return;
}this.focusListener = jsjava.awt.AWTEventMulticaster.add (this.focusListener, l);
this.newEventsOnly = true;
}, "jsjava.awt.event.FocusListener");
Clazz.defineMethod (c$, "removeFocusListener", 
function (l) {
if (l == null) {
return;
}this.focusListener = jsjava.awt.AWTEventMulticaster.remove (this.focusListener, l);
}, "jsjava.awt.event.FocusListener");
Clazz.defineMethod (c$, "getFocusListeners", 
function () {
return (this.getListeners (jsjava.awt.event.FocusListener));
});
Clazz.defineMethod (c$, "addHierarchyListener", 
function (l) {
}, "jsjava.awt.event.HierarchyListener");
Clazz.defineMethod (c$, "removeHierarchyListener", 
function (l) {
}, "jsjava.awt.event.HierarchyListener");
Clazz.defineMethod (c$, "getHierarchyListeners", 
function () {
return (this.getListeners (jsjava.awt.event.HierarchyListener));
});
Clazz.defineMethod (c$, "addHierarchyBoundsListener", 
function (l) {
if (l == null) {
return;
}var notifyAncestors;
{
notifyAncestors = (this.hierarchyBoundsListener == null && (this.eventMask & 65536) == 0);
this.hierarchyBoundsListener = jsjava.awt.AWTEventMulticaster.add (this.hierarchyBoundsListener, l);
notifyAncestors = (notifyAncestors && this.hierarchyBoundsListener != null);
this.newEventsOnly = true;
}if (notifyAncestors) {
{
this.adjustListeningChildrenOnParent (65536, 1);
}}}, "jsjava.awt.event.HierarchyBoundsListener");
Clazz.defineMethod (c$, "removeHierarchyBoundsListener", 
function (l) {
if (l == null) {
return;
}var notifyAncestors;
{
notifyAncestors = (this.hierarchyBoundsListener != null && (this.eventMask & 65536) == 0);
this.hierarchyBoundsListener = jsjava.awt.AWTEventMulticaster.remove (this.hierarchyBoundsListener, l);
notifyAncestors = (notifyAncestors && this.hierarchyBoundsListener == null);
}if (notifyAncestors) {
{
this.adjustListeningChildrenOnParent (65536, -1);
}}}, "jsjava.awt.event.HierarchyBoundsListener");
Clazz.defineMethod (c$, "numListening", 
function (mask) {
if ((mask == 32768 && (this.hierarchyListener != null || (this.eventMask & 32768) != 0)) || (mask == 65536 && (this.hierarchyBoundsListener != null || (this.eventMask & 65536) != 0))) {
return 1;
} else {
return 0;
}}, "~N");
Clazz.defineMethod (c$, "countHierarchyMembers", 
function () {
return 1;
});
Clazz.defineMethod (c$, "createHierarchyEvents", 
function (id, changed, changedParent, changeFlags, enabledOnToolkit) {
switch (id) {
case 1400:
if (this.hierarchyListener != null || (this.eventMask & 32768) != 0 || enabledOnToolkit) {
var e =  new jsjava.awt.event.HierarchyEvent (this, id, changed, changedParent, changeFlags);
this.dispatchEvent (e);
return 1;
}break;
case 1401:
case 1402:
if (this.hierarchyBoundsListener != null || (this.eventMask & 65536) != 0 || enabledOnToolkit) {
var e =  new jsjava.awt.event.HierarchyEvent (this, id, changed, changedParent);
this.dispatchEvent (e);
return 1;
}break;
default:
break;
}
return 0;
}, "~N,jsjava.awt.Component,jsjava.awt.Container,~N,~B");
Clazz.defineMethod (c$, "getHierarchyBoundsListeners", 
function () {
return (this.getListeners (jsjava.awt.event.HierarchyBoundsListener));
});
Clazz.defineMethod (c$, "adjustListeningChildrenOnParent", 
function (mask, num) {
if (this.parent != null) {
this.parent.adjustListeningChildren (mask, num);
}}, "~N,~N");
Clazz.defineMethod (c$, "addKeyListener", 
function (l) {
if (l == null) {
return;
}this.keyListener = jsjava.awt.AWTEventMulticaster.add (this.keyListener, l);
this.newEventsOnly = true;
}, "jsjava.awt.event.KeyListener");
Clazz.defineMethod (c$, "removeKeyListener", 
function (l) {
if (l == null) {
return;
}this.keyListener = jsjava.awt.AWTEventMulticaster.remove (this.keyListener, l);
}, "jsjava.awt.event.KeyListener");
Clazz.defineMethod (c$, "getKeyListeners", 
function () {
return (this.getListeners (jsjava.awt.event.KeyListener));
});
Clazz.defineMethod (c$, "addMouseListener", 
function (l) {
if (l == null) {
return;
}this.mouseListener = jsjava.awt.AWTEventMulticaster.add (this.mouseListener, l);
this.newEventsOnly = true;
}, "jsjava.awt.event.MouseListener");
Clazz.defineMethod (c$, "removeMouseListener", 
function (l) {
if (l == null) {
return;
}this.mouseListener = jsjava.awt.AWTEventMulticaster.remove (this.mouseListener, l);
}, "jsjava.awt.event.MouseListener");
Clazz.defineMethod (c$, "getMouseListeners", 
function () {
return (this.getListeners (jsjava.awt.event.MouseListener));
});
Clazz.defineMethod (c$, "addMouseMotionListener", 
function (l) {
if (l == null) {
return;
}this.mouseMotionListener = jsjava.awt.AWTEventMulticaster.add (this.mouseMotionListener, l);
this.newEventsOnly = true;
}, "jsjava.awt.event.MouseMotionListener");
Clazz.defineMethod (c$, "removeMouseMotionListener", 
function (l) {
if (l == null) {
return;
}this.mouseMotionListener = jsjava.awt.AWTEventMulticaster.remove (this.mouseMotionListener, l);
}, "jsjava.awt.event.MouseMotionListener");
Clazz.defineMethod (c$, "getMouseMotionListeners", 
function () {
return (this.getListeners (jsjava.awt.event.MouseMotionListener));
});
Clazz.defineMethod (c$, "addMouseWheelListener", 
function (l) {
if (l == null) {
return;
}this.mouseWheelListener = jsjava.awt.AWTEventMulticaster.add (this.mouseWheelListener, l);
this.newEventsOnly = true;
}, "jsjava.awt.event.MouseWheelListener");
Clazz.defineMethod (c$, "removeMouseWheelListener", 
function (l) {
if (l == null) {
return;
}this.mouseWheelListener = jsjava.awt.AWTEventMulticaster.remove (this.mouseWheelListener, l);
}, "jsjava.awt.event.MouseWheelListener");
Clazz.defineMethod (c$, "getMouseWheelListeners", 
function () {
return (this.getListeners (jsjava.awt.event.MouseWheelListener));
});
Clazz.defineMethod (c$, "addInputMethodListener", 
function (l) {
if (l == null) {
return;
}this.inputMethodListener = jsjava.awt.AWTEventMulticaster.add (this.inputMethodListener, l);
this.newEventsOnly = true;
}, "jsjava.awt.event.InputMethodListener");
Clazz.defineMethod (c$, "removeInputMethodListener", 
function (l) {
if (l == null) {
return;
}this.inputMethodListener = jsjava.awt.AWTEventMulticaster.remove (this.inputMethodListener, l);
}, "jsjava.awt.event.InputMethodListener");
Clazz.defineMethod (c$, "getInputMethodListeners", 
function () {
return (this.getListeners (jsjava.awt.event.InputMethodListener));
});
Clazz.defineMethod (c$, "getListeners", 
function (listenerType) {
var l = null;
if (listenerType === jsjava.awt.event.ComponentListener) {
l = this.componentListener;
} else if (listenerType === jsjava.awt.event.FocusListener) {
l = this.focusListener;
} else if (listenerType === jsjava.awt.event.HierarchyListener) {
l = this.hierarchyListener;
} else if (listenerType === jsjava.awt.event.HierarchyBoundsListener) {
l = this.hierarchyBoundsListener;
} else if (listenerType === jsjava.awt.event.KeyListener) {
l = this.keyListener;
} else if (listenerType === jsjava.awt.event.MouseListener) {
l = this.mouseListener;
} else if (listenerType === jsjava.awt.event.MouseMotionListener) {
l = this.mouseMotionListener;
} else if (listenerType === jsjava.awt.event.MouseWheelListener) {
l = this.mouseWheelListener;
} else if (listenerType === jsjava.awt.event.InputMethodListener) {
l = this.inputMethodListener;
} else if (listenerType === jsjava.beans.PropertyChangeListener) {
return this.getPropertyChangeListeners ();
}return jsjava.awt.AWTEventMulticaster.getListeners (l, listenerType);
}, "Class");
Clazz.defineMethod (c$, "enableEvents", 
function (eventsToEnable) {
var notifyAncestors = 0;
{
if ((eventsToEnable & 32768) != 0 && this.hierarchyListener == null && (this.eventMask & 32768) == 0) {
notifyAncestors |= 32768;
}if ((eventsToEnable & 65536) != 0 && this.hierarchyBoundsListener == null && (this.eventMask & 65536) == 0) {
notifyAncestors |= 65536;
}this.eventMask |= eventsToEnable;
this.newEventsOnly = true;
}if (notifyAncestors != 0) {
{
this.adjustListeningChildrenOnParent (notifyAncestors, 1);
}}}, "~N");
Clazz.defineMethod (c$, "disableEvents", 
function (eventsToDisable) {
var notifyAncestors = 0;
{
if ((eventsToDisable & 32768) != 0 && this.hierarchyListener == null && (this.eventMask & 32768) != 0) {
notifyAncestors |= 32768;
}if ((eventsToDisable & 65536) != 0 && this.hierarchyBoundsListener == null && (this.eventMask & 65536) != 0) {
notifyAncestors |= 65536;
}this.eventMask &= ~eventsToDisable;
}if (notifyAncestors != 0) {
{
this.adjustListeningChildrenOnParent (notifyAncestors, -1);
}}}, "~N");
Clazz.defineMethod (c$, "checkCoalescing", 
($fz = function () {
if (this.getClass ().getClassLoader () == null) {
return false;
}var clazz = this.getClass ();
{
var value = jsjava.awt.Component.coalesceMap.get (clazz);
if (value != null) {
return value;
}var enabled = jsjava.security.AccessController.doPrivileged (((Clazz.isClassDefined ("jsjava.awt.Component$1") ? 0 : jsjava.awt.Component.$Component$1$ ()), Clazz.innerTypeInstance (jsjava.awt.Component$1, this, Clazz.cloneFinals ("clazz", clazz))));
jsjava.awt.Component.coalesceMap.put (clazz, enabled);
return enabled;
}}, $fz.isPrivate = true, $fz));
c$.isCoalesceEventsOverriden = Clazz.defineMethod (c$, "isCoalesceEventsOverriden", 
($fz = function (clazz) {
var superclass = clazz.getSuperclass ();
if (superclass == null) {
return false;
}if (superclass.getClassLoader () != null) {
var value = jsjava.awt.Component.coalesceMap.get (superclass);
if (value == null) {
if (jsjava.awt.Component.isCoalesceEventsOverriden (superclass)) {
jsjava.awt.Component.coalesceMap.put (superclass, new Boolean (true));
return true;
}} else if ((value).booleanValue ()) {
return true;
}}try {
clazz.getDeclaredMethod ("coalesceEvents", jsjava.awt.Component.coalesceEventsParams);
return true;
} catch (e) {
if (Clazz.exceptionOf (e, NoSuchMethodException)) {
return false;
} else {
throw e;
}
}
}, $fz.isPrivate = true, $fz), "Class");
Clazz.defineMethod (c$, "isCoalescingEnabled", 
function () {
return this.coalescingEnabled;
});
Clazz.defineMethod (c$, "coalesceEvents", 
function (existingEvent, newEvent) {
return null;
}, "jsjava.awt.AWTEvent,jsjava.awt.AWTEvent");
Clazz.defineMethod (c$, "processEvent", 
function (e) {
if (Clazz.instanceOf (e, jsjava.awt.event.FocusEvent)) {
this.processFocusEvent (e);
} else if (Clazz.instanceOf (e, jsjava.awt.event.MouseEvent)) {
switch (e.getID ()) {
case 501:
case 502:
case 500:
case 504:
case 505:
this.processMouseEvent (e);
break;
case 503:
case 506:
this.processMouseMotionEvent (e);
break;
case 507:
this.processMouseWheelEvent (e);
break;
}
} else if (Clazz.instanceOf (e, jsjava.awt.event.KeyEvent)) {
this.processKeyEvent (e);
} else if (Clazz.instanceOf (e, jsjava.awt.event.ComponentEvent)) {
this.processComponentEvent (e);
} else if (Clazz.instanceOf (e, jsjava.awt.event.InputMethodEvent)) {
this.processInputMethodEvent (e);
} else if (Clazz.instanceOf (e, jsjava.awt.event.HierarchyEvent)) {
switch (e.getID ()) {
case 1400:
this.processHierarchyEvent (e);
break;
case 1401:
case 1402:
this.processHierarchyBoundsEvent (e);
break;
}
}}, "jsjava.awt.AWTEvent");
Clazz.defineMethod (c$, "processComponentEvent", 
function (e) {
var listener = this.componentListener;
if (listener != null) {
var id = e.getID ();
switch (id) {
case 101:
listener.componentResized (e);
break;
case 100:
listener.componentMoved (e);
break;
case 102:
listener.componentShown (e);
break;
case 103:
listener.componentHidden (e);
break;
}
}}, "jsjava.awt.event.ComponentEvent");
Clazz.defineMethod (c$, "processFocusEvent", 
function (e) {
var listener = this.focusListener;
if (listener != null) {
var id = e.getID ();
switch (id) {
case 1004:
listener.focusGained (e);
break;
case 1005:
listener.focusLost (e);
break;
}
}}, "jsjava.awt.event.FocusEvent");
Clazz.defineMethod (c$, "processKeyEvent", 
function (e) {
var listener = this.keyListener;
if (listener != null) {
var id = e.getID ();
switch (id) {
case 400:
listener.keyTyped (e);
break;
case 401:
listener.keyPressed (e);
break;
case 402:
listener.keyReleased (e);
break;
}
}}, "jsjava.awt.event.KeyEvent");
Clazz.defineMethod (c$, "processMouseEvent", 
function (e) {
var listener = this.mouseListener;
if (listener != null) {
var id = e.getID ();
switch (id) {
case 501:
listener.mousePressed (e);
break;
case 502:
listener.mouseReleased (e);
break;
case 500:
listener.mouseClicked (e);
break;
case 505:
listener.mouseExited (e);
break;
case 504:
listener.mouseEntered (e);
break;
}
}}, "jsjava.awt.event.MouseEvent");
Clazz.defineMethod (c$, "processMouseMotionEvent", 
function (e) {
var listener = this.mouseMotionListener;
if (listener != null) {
var id = e.getID ();
switch (id) {
case 503:
listener.mouseMoved (e);
break;
case 506:
listener.mouseDragged (e);
break;
}
}}, "jsjava.awt.event.MouseEvent");
Clazz.defineMethod (c$, "processMouseWheelEvent", 
function (e) {
var listener = this.mouseWheelListener;
if (listener != null) {
var id = e.getID ();
switch (id) {
case 507:
listener.mouseWheelMoved (e);
break;
}
}}, "jsjava.awt.event.MouseWheelEvent");
Clazz.defineMethod (c$, "postsOldMouseEvents", 
function () {
return false;
});
Clazz.defineMethod (c$, "processInputMethodEvent", 
function (e) {
var listener = this.inputMethodListener;
if (listener != null) {
var id = e.getID ();
switch (id) {
case 1100:
listener.inputMethodTextChanged (e);
break;
case 1101:
listener.caretPositionChanged (e);
break;
}
}}, "jsjava.awt.event.InputMethodEvent");
Clazz.defineMethod (c$, "processHierarchyEvent", 
function (e) {
var listener = this.hierarchyListener;
if (listener != null) {
var id = e.getID ();
switch (id) {
case 1400:
listener.hierarchyChanged (e);
break;
}
}}, "jsjava.awt.event.HierarchyEvent");
Clazz.defineMethod (c$, "processHierarchyBoundsEvent", 
function (e) {
var listener = this.hierarchyBoundsListener;
if (listener != null) {
var id = e.getID ();
switch (id) {
case 1401:
listener.ancestorMoved (e);
break;
case 1402:
listener.ancestorResized (e);
break;
}
}}, "jsjava.awt.event.HierarchyEvent");
Clazz.defineMethod (c$, "handleEvent", 
function (evt) {
switch (evt.id) {
case 504:
return this.mouseEnter (evt, evt.x, evt.y);
case 505:
return this.mouseExit (evt, evt.x, evt.y);
case 503:
return this.mouseMove (evt, evt.x, evt.y);
case 501:
return this.mouseDown (evt, evt.x, evt.y);
case 506:
return this.mouseDrag (evt, evt.x, evt.y);
case 502:
return this.mouseUp (evt, evt.x, evt.y);
case 401:
case 403:
return this.keyDown (evt, evt.key);
case 402:
case 404:
return this.keyUp (evt, evt.key);
case 1001:
return this.action (evt, evt.arg);
case 1004:
return this.gotFocus (evt, evt.arg);
case 1005:
return this.lostFocus (evt, evt.arg);
}
return false;
}, "jsjava.awt.Event");
Clazz.defineMethod (c$, "mouseDown", 
function (evt, x, y) {
return false;
}, "jsjava.awt.Event,~N,~N");
Clazz.defineMethod (c$, "mouseDrag", 
function (evt, x, y) {
return false;
}, "jsjava.awt.Event,~N,~N");
Clazz.defineMethod (c$, "mouseUp", 
function (evt, x, y) {
return false;
}, "jsjava.awt.Event,~N,~N");
Clazz.defineMethod (c$, "mouseMove", 
function (evt, x, y) {
return false;
}, "jsjava.awt.Event,~N,~N");
Clazz.defineMethod (c$, "mouseEnter", 
function (evt, x, y) {
return false;
}, "jsjava.awt.Event,~N,~N");
Clazz.defineMethod (c$, "mouseExit", 
function (evt, x, y) {
return false;
}, "jsjava.awt.Event,~N,~N");
Clazz.defineMethod (c$, "keyDown", 
function (evt, key) {
return false;
}, "jsjava.awt.Event,~N");
Clazz.defineMethod (c$, "keyUp", 
function (evt, key) {
return false;
}, "jsjava.awt.Event,~N");
Clazz.defineMethod (c$, "action", 
function (evt, what) {
return false;
}, "jsjava.awt.Event,~O");
Clazz.defineMethod (c$, "addNotify", 
function () {
});
Clazz.defineMethod (c$, "removeNotify", 
function () {
});
Clazz.defineMethod (c$, "gotFocus", 
function (evt, what) {
return false;
}, "jsjava.awt.Event,~O");
Clazz.defineMethod (c$, "lostFocus", 
function (evt, what) {
return false;
}, "jsjava.awt.Event,~O");
Clazz.defineMethod (c$, "isFocusTraversable", 
function () {
if (this.$isFocusTraversableOverridden == 0) {
this.$isFocusTraversableOverridden = 1;
}return this.focusable;
});
Clazz.defineMethod (c$, "isFocusable", 
function () {
return this.isFocusTraversable ();
});
Clazz.defineMethod (c$, "setFocusable", 
function (focusable) {
var oldFocusable;
{
oldFocusable = this.focusable;
this.focusable = focusable;
}this.$isFocusTraversableOverridden = 2;
this.firePropertyChange ("focusable", oldFocusable, focusable);
}, "~B");
Clazz.defineMethod (c$, "isFocusTraversableOverridden", 
function () {
return (this.$isFocusTraversableOverridden != 1);
});
Clazz.defineMethod (c$, "getFocusTraversalKeysEnabled", 
function () {
return this.focusTraversalKeysEnabled;
});
Clazz.defineMethod (c$, "requestFocus", 
function () {
});
Clazz.defineMethod (c$, "requestFocusInWindow", 
function () {
return false;
});
Clazz.defineMethod (c$, "getFocusCycleRootAncestor", 
function () {
var rootAncestor = this.parent;
while (rootAncestor != null && !rootAncestor.isFocusCycleRoot ()) {
rootAncestor = rootAncestor.parent;
}
return rootAncestor;
});
Clazz.defineMethod (c$, "isFocusCycleRoot", 
function (container) {
var rootAncestor = this.getFocusCycleRootAncestor ();
return (rootAncestor === container);
}, "jsjava.awt.Container");
Clazz.defineMethod (c$, "hasFocus", 
function () {
return false;
});
Clazz.defineMethod (c$, "isFocusOwner", 
function () {
return this.hasFocus ();
});
Clazz.defineMethod (c$, "setAutoFocusTransferOnDisposal", 
function (value) {
this.autoFocusTransferOnDisposal = value;
}, "~B");
Clazz.defineMethod (c$, "isAutoFocusTransferOnDisposal", 
function () {
return this.autoFocusTransferOnDisposal;
});
Clazz.defineMethod (c$, "paramString", 
function () {
var thisName = this.getName ();
var str = (thisName != null ? thisName : "") + "," + this.x + "," + this.y + "," + this.width + "x" + this.height;
if (!this.isValid ()) {
str += ",invalid";
}if (!this.visible) {
str += ",hidden";
}if (!this.enabled) {
str += ",disabled";
}return str;
});
Clazz.overrideMethod (c$, "toString", 
function () {
return this.getClass ().getName () + "[" + this.paramString () + "]";
});
Clazz.defineMethod (c$, "addPropertyChangeListener", 
function (listener) {
{
if (listener == null) {
return;
}if (this.changeSupport == null) {
this.changeSupport =  new jsjava.beans.PropertyChangeSupport (this);
}this.changeSupport.addPropertyChangeListener (listener);
}}, "jsjava.beans.PropertyChangeListener");
Clazz.defineMethod (c$, "removePropertyChangeListener", 
function (listener) {
{
if (listener == null || this.changeSupport == null) {
return;
}this.changeSupport.removePropertyChangeListener (listener);
}}, "jsjava.beans.PropertyChangeListener");
Clazz.defineMethod (c$, "getPropertyChangeListeners", 
function () {
{
if (this.changeSupport == null) {
return  new Array (0);
}return this.changeSupport.getPropertyChangeListeners ();
}});
Clazz.defineMethod (c$, "addPropertyChangeListener", 
function (propertyName, listener) {
{
if (listener == null) {
return;
}if (this.changeSupport == null) {
this.changeSupport =  new jsjava.beans.PropertyChangeSupport (this);
}this.changeSupport.addPropertyChangeListener (propertyName, listener);
}}, "~S,jsjava.beans.PropertyChangeListener");
Clazz.defineMethod (c$, "removePropertyChangeListener", 
function (propertyName, listener) {
{
if (listener == null || this.changeSupport == null) {
return;
}this.changeSupport.removePropertyChangeListener (propertyName, listener);
}}, "~S,jsjava.beans.PropertyChangeListener");
Clazz.defineMethod (c$, "getPropertyChangeListeners", 
function (propertyName) {
{
if (this.changeSupport == null) {
return  new Array (0);
}return this.changeSupport.getPropertyChangeListeners (propertyName);
}}, "~S");
Clazz.defineMethod (c$, "firePropertyChange", 
function (propertyName, oldValue, newValue) {
var changeSupport;
{
changeSupport = this.changeSupport;
}if (changeSupport == null || (oldValue != null && newValue != null && oldValue.equals (newValue))) {
return;
}changeSupport.firePropertyChange (propertyName, oldValue, newValue);
}, "~S,~O,~O");
Clazz.defineMethod (c$, "firePropertyChange", 
function (propertyName, oldValue, newValue) {
var changeSupport = this.changeSupport;
if (changeSupport == null || oldValue == newValue) {
return;
}changeSupport.firePropertyChange (propertyName, oldValue, newValue);
}, "~S,~B,~B");
Clazz.defineMethod (c$, "firePropertyChange", 
function (propertyName, oldValue, newValue) {
var changeSupport = this.changeSupport;
if (changeSupport == null || oldValue == newValue) {
return;
}changeSupport.firePropertyChange (propertyName, oldValue, newValue);
}, "~S,~N,~N");
Clazz.defineMethod (c$, "firePropertyChange", 
function (propertyName, oldValue, newValue) {
if (this.changeSupport == null || oldValue == newValue) {
return;
}this.firePropertyChange (propertyName, Byte.$valueOf (oldValue), Byte.$valueOf (newValue));
}, "~S,~N,~N");
Clazz.defineMethod (c$, "firePropertyChange", 
function (propertyName, oldValue, newValue) {
if (this.changeSupport == null || oldValue == newValue) {
return;
}this.firePropertyChange (propertyName,  new Character (oldValue),  new Character (newValue));
}, "~S,~S,~S");
Clazz.defineMethod (c$, "firePropertyChange", 
function (propertyName, oldValue, newValue) {
if (this.changeSupport == null || oldValue == newValue) {
return;
}this.firePropertyChange (propertyName, Short.$valueOf (oldValue), Short.$valueOf (newValue));
}, "~S,~N,~N");
Clazz.defineMethod (c$, "firePropertyChange", 
function (propertyName, oldValue, newValue) {
if (this.changeSupport == null || oldValue == newValue) {
return;
}this.firePropertyChange (propertyName, Long.$valueOf (oldValue), Long.$valueOf (newValue));
}, "~S,~N,~N");
Clazz.defineMethod (c$, "firePropertyChange", 
function (propertyName, oldValue, newValue) {
if (this.changeSupport == null || oldValue == newValue) {
return;
}this.firePropertyChange (propertyName, Float.$valueOf (oldValue), Float.$valueOf (newValue));
}, "~S,~N,~N");
Clazz.defineMethod (c$, "firePropertyChange", 
function (propertyName, oldValue, newValue) {
if (this.changeSupport == null || oldValue == newValue) {
return;
}this.firePropertyChange (propertyName, Double.$valueOf (oldValue), Double.$valueOf (newValue));
}, "~S,~N,~N");
Clazz.defineMethod (c$, "setComponentOrientation", 
function (o) {
var oldValue = this.componentOrientation;
this.componentOrientation = o;
this.firePropertyChange ("componentOrientation", oldValue, o);
this.invalidateIfValid ();
}, "jsjava.awt.ComponentOrientation");
Clazz.defineMethod (c$, "getComponentOrientation", 
function () {
return this.componentOrientation;
});
Clazz.defineMethod (c$, "applyComponentOrientation", 
function (orientation) {
if (orientation == null) {
throw  new NullPointerException ();
}this.setComponentOrientation (orientation);
}, "jsjava.awt.ComponentOrientation");
Clazz.defineMethod (c$, "canBeFocusOwner", 
function () {
if (this.isEnabled () && this.isDisplayable () && this.isVisible () && this.isFocusable ()) {
return true;
}return false;
});
Clazz.defineMethod (c$, "canBeFocusOwnerRecursively", 
function () {
if (!this.canBeFocusOwner ()) {
return false;
}if (this.parent != null) {
return this.parent.canContainFocusOwner (this);
}return true;
});
Clazz.defineMethod (c$, "relocateComponent", 
function () {
});
Clazz.defineMethod (c$, "getContainingWindow", 
function () {
return jssun.awt.SunToolkit.getContainingWindow (this);
});
c$.isInstanceOf = Clazz.defineMethod (c$, "isInstanceOf", 
function (obj, className) {
if (obj == null) return false;
if (className == null) return false;
var cls = obj.getClass ();
while (cls != null) {
if (cls.getName ().equals (className)) {
return true;
}cls = cls.getSuperclass ();
}
return false;
}, "~O,~S");
Clazz.defineMethod (c$, "areBoundsValid", 
function () {
var cont = this.getContainer ();
return cont == null || cont.isValid () || cont.getLayout () == null;
});
Clazz.defineMethod (c$, "getLocationOnWindow", 
function () {
var curLocation = this.getLocation ();
for (var parent = this.getContainer (); parent != null && !(Clazz.instanceOf (parent, jsjava.awt.Window)); parent = parent.getContainer ()) {
curLocation.x += parent.getX ();
curLocation.y += parent.getY ();
}
return curLocation;
});
Clazz.defineMethod (c$, "getSiblingIndexAbove", 
function () {
var parent = this.getContainer ();
if (parent == null) {
return -1;
}var nextAbove = parent.getComponentZOrder (this) - 1;
return nextAbove < 0 ? -1 : nextAbove;
});
Clazz.defineMethod (c$, "getSiblingIndexBelow", 
function () {
var parent = this.getContainer ();
if (parent == null) {
return -1;
}var nextBelow = parent.getComponentZOrder (this) + 1;
return nextBelow >= parent.getComponentCount () ? -1 : nextBelow;
});
Clazz.defineMethod (c$, "mixOnShowing", 
function () {
});
Clazz.defineMethod (c$, "mixOnHiding", 
function (isLightweight) {
}, "~B");
Clazz.defineMethod (c$, "mixOnReshaping", 
function () {
});
Clazz.defineMethod (c$, "mixOnZOrderChanging", 
function (oldZorder, newZorder) {
}, "~N,~N");
Clazz.defineMethod (c$, "mixOnValidating", 
function () {
});
c$.doesClassImplement = Clazz.defineMethod (c$, "doesClassImplement", 
($fz = function (cls, interfaceName) {
if (cls == null) return false;
for (var c, $c = 0, $$c = cls.getInterfaces (); $c < $$c.length && ((c = $$c[$c]) || true); $c++) {
if (c.getName ().equals (interfaceName)) {
return true;
}}
return jsjava.awt.Component.doesClassImplement (cls.getSuperclass (), interfaceName);
}, $fz.isPrivate = true, $fz), "Class,~S");
c$.doesImplement = Clazz.defineMethod (c$, "doesImplement", 
function (obj, interfaceName) {
if (obj == null) return false;
if (interfaceName == null) return false;
return jsjava.awt.Component.doesClassImplement (obj.getClass (), interfaceName);
}, "~O,~S");
Clazz.pu$h ();
c$ = Clazz.declareType (jsjava.awt.Component, "BaselineResizeBehavior", Enum);
Clazz.defineEnumConstant (c$, "CONSTANT_ASCENT", 0, []);
Clazz.defineEnumConstant (c$, "CONSTANT_DESCENT", 1, []);
Clazz.defineEnumConstant (c$, "CENTER_OFFSET", 2, []);
Clazz.defineEnumConstant (c$, "OTHER", 3, []);
c$ = Clazz.p0p ();
c$.$Component$1$ = function () {
Clazz.pu$h ();
c$ = Clazz.declareAnonymous (jsjava.awt, "Component$1", null, jsjava.security.PrivilegedAction);
Clazz.overrideMethod (c$, "run", 
function () {
return jsjava.awt.Component.isCoalesceEventsOverriden (this.f$.clazz);
});
c$ = Clazz.p0p ();
};
Clazz.pu$h ();
c$ = Clazz.declareType (jsjava.awt.Component, "AWTTreeLock");
c$ = Clazz.p0p ();
Clazz.defineStatics (c$,
"FOCUS_TRAVERSABLE_UNKNOWN", 0,
"FOCUS_TRAVERSABLE_DEFAULT", 1,
"FOCUS_TRAVERSABLE_SET", 2,
"actionListenerK", "actionL",
"adjustmentListenerK", "adjustmentL",
"componentListenerK", "componentL",
"containerListenerK", "containerL",
"focusListenerK", "focusL",
"itemListenerK", "itemL",
"keyListenerK", "keyL",
"mouseListenerK", "mouseL",
"mouseMotionListenerK", "mouseMotionL",
"mouseWheelListenerK", "mouseWheelL",
"textListenerK", "textL",
"ownedWindowK", "ownedL",
"windowListenerK", "windowL",
"inputMethodListenerK", "inputMethodL",
"hierarchyListenerK", "hierarchyL",
"hierarchyBoundsListenerK", "hierarchyBoundsL",
"windowStateListenerK", "windowStateL",
"windowFocusListenerK", "windowFocusL",
"isInc", false,
"incRate", 0,
"TOP_ALIGNMENT", 0.0,
"CENTER_ALIGNMENT", 0.5,
"BOTTOM_ALIGNMENT", 1.0,
"LEFT_ALIGNMENT", 0.0,
"RIGHT_ALIGNMENT", 1.0);
c$.coalesceMap = c$.prototype.coalesceMap =  new java.util.WeakHashMap ();
c$.coalesceEventsParams = c$.prototype.coalesceEventsParams =  Clazz.newArray (-1, [jsjava.awt.AWTEvent, jsjava.awt.AWTEvent]);
});

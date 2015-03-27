Clazz.declarePackage ("jsjavax.swing");
Clazz.load (["java.util.HashMap", "jsjava.awt.Rectangle"], "jsjavax.swing.RepaintManager", ["java.lang.StringBuffer", "$.Thread", "java.util.ArrayList", "$.HashSet", "$.IdentityHashMap", "jsjava.applet.Applet", "jsjava.awt.Dimension", "$.Frame", "$.Toolkit", "$.Window", "jsjava.awt.event.InvocationEvent", "jsjavax.swing.CellRendererPane", "$.JComponent", "$.SwingUtilities", "jssun.awt.AWTAccessor", "$.AppContext", "$.SunToolkit"], function () {
c$ = Clazz.decorateAsClass (function () {
this.volatileMap = null;
this.hwDirtyComponents = null;
this.dirtyComponents = null;
this.tmpDirtyComponents = null;
this.invalidComponents = null;
this.runnableList = null;
this.standardDoubleBuffer = null;
this.paintManager = null;
this.paintDepth = 0;
this.painting = false;
this.repaintRoot = null;
this.paintThread = null;
this.processingRunnable = null;
this.tmp = null;
if (!Clazz.isClassDefined ("jsjavax.swing.RepaintManager.DoubleBufferInfo")) {
jsjavax.swing.RepaintManager.$RepaintManager$DoubleBufferInfo$ ();
}
if (!Clazz.isClassDefined ("jsjavax.swing.RepaintManager.ProcessingRunnable")) {
jsjavax.swing.RepaintManager.$RepaintManager$ProcessingRunnable$ ();
}
Clazz.instantialize (this, arguments);
}, jsjavax.swing, "RepaintManager");
Clazz.prepareFields (c$, function () {
this.volatileMap =  new java.util.HashMap (1);
this.tmp =  new jsjava.awt.Rectangle ();
});
c$.currentManager = Clazz.defineMethod (c$, "currentManager", 
function (c) {
var appContext = jssun.awt.AppContext.getAppContext ();
var rm = appContext.get (jsjavax.swing.RepaintManager.repaintManagerKey);
if (rm == null) {
rm =  new jsjavax.swing.RepaintManager ();
rm.set ();
appContext.put (jsjavax.swing.RepaintManager.repaintManagerKey, rm);
}return rm;
}, "jsjava.awt.Component");
c$.currentManager = Clazz.defineMethod (c$, "currentManager", 
function (c) {
return jsjavax.swing.RepaintManager.currentManager (c);
}, "jsjavax.swing.JComponent");
c$.setCurrentManager = Clazz.defineMethod (c$, "setCurrentManager", 
function (aRepaintManager) {
if (aRepaintManager != null) {
jsjavax.swing.SwingUtilities.appContextPut (jsjavax.swing.RepaintManager.repaintManagerKey, aRepaintManager);
} else {
jsjavax.swing.SwingUtilities.appContextRemove (jsjavax.swing.RepaintManager.repaintManagerKey);
}}, "jsjavax.swing.RepaintManager");
Clazz.makeConstructor (c$, 
function () {
this.set ();
this.processingRunnable = Clazz.innerTypeInstance (jsjavax.swing.RepaintManager.ProcessingRunnable, this, null);
});
Clazz.defineMethod (c$, "set", 
($fz = function () {
this.dirtyComponents =  new java.util.IdentityHashMap ();
this.tmpDirtyComponents =  new java.util.IdentityHashMap ();
this.hwDirtyComponents =  new java.util.IdentityHashMap ();
}, $fz.isPrivate = true, $fz));
Clazz.defineMethod (c$, "addInvalidComponent", 
function (invalidComponent) {
var validateRoot = null;
for (var c = invalidComponent; c != null; c = c.getParent ()) {
if ((Clazz.instanceOf (c, jsjavax.swing.CellRendererPane)) || (c.isLightweight ())) {
return;
}if ((Clazz.instanceOf (c, jsjavax.swing.JComponent)) && ((c).isValidateRoot ())) {
validateRoot = c;
break;
}}
if (validateRoot == null) {
return;
}var root = null;
for (var c = validateRoot; c != null; c = c.getParent ()) {
if (!c.isVisible () || (c.isLightweight ())) {
return;
}if ((Clazz.instanceOf (c, jsjava.awt.Window)) || (Clazz.instanceOf (c, jsjava.applet.Applet))) {
root = c;
break;
}}
if (root == null) {
return;
}if (this.invalidComponents == null) {
this.invalidComponents =  new java.util.ArrayList ();
} else {
var n = this.invalidComponents.size ();
for (var i = 0; i < n; i++) {
if (validateRoot === this.invalidComponents.get (i)) {
return;
}}
}this.invalidComponents.add (validateRoot);
this.scheduleProcessingRunnable ();
}, "jsjavax.swing.JComponent");
Clazz.defineMethod (c$, "removeInvalidComponent", 
function (component) {
if (this.invalidComponents != null) {
var index = this.invalidComponents.indexOf (component);
if (index != -1) {
this.invalidComponents.remove (index);
}}}, "jsjavax.swing.JComponent");
Clazz.defineMethod (c$, "addDirtyRegion0", 
($fz = function (c, x, y, w, h) {
if ((w <= 0) || (h <= 0) || (c == null)) {
return;
}if ((c.getWidth () <= 0) || (c.getHeight () <= 0)) {
return;
}if (this.extendDirtyRegion (c, x, y, w, h)) {
return;
}var root = null;
for (var p = c; p != null; p = p.getParent ()) {
if (!p.isVisible () || (p.isLightweight ())) {
return;
}if ((Clazz.instanceOf (p, jsjava.awt.Window)) || (Clazz.instanceOf (p, jsjava.applet.Applet))) {
if (Clazz.instanceOf (p, jsjava.awt.Frame) && ((p).getExtendedState () & 1) == 1) {
return;
}root = p;
break;
}}
if (root == null) return;
{
if (this.extendDirtyRegion (c, x, y, w, h)) {
return;
}this.dirtyComponents.put (c,  new jsjava.awt.Rectangle (x, y, w, h));
}this.scheduleProcessingRunnable ();
}, $fz.isPrivate = true, $fz), "jsjava.awt.Container,~N,~N,~N,~N");
Clazz.defineMethod (c$, "addDirtyRegion", 
function (c, x, y, w, h) {
this.addDirtyRegion0 (c, x, y, w, h);
}, "jsjavax.swing.JComponent,~N,~N,~N,~N");
Clazz.defineMethod (c$, "addDirtyRegion", 
function (window, x, y, w, h) {
this.addDirtyRegion0 (window, x, y, w, h);
}, "jsjava.awt.Window,~N,~N,~N,~N");
Clazz.defineMethod (c$, "addDirtyRegion", 
function (applet, x, y, w, h) {
this.addDirtyRegion0 (applet, x, y, w, h);
}, "jsjava.applet.Applet,~N,~N,~N,~N");
Clazz.defineMethod (c$, "scheduleHeavyWeightPaints", 
function () {
var hws;
{
if (this.hwDirtyComponents.size () == 0) {
return;
}hws = this.hwDirtyComponents;
this.hwDirtyComponents =  new java.util.IdentityHashMap ();
}for (var hw, $hw = hws.keySet ().iterator (); $hw.hasNext () && ((hw = $hw.next ()) || true);) {
var dirty = hws.get (hw);
if (Clazz.instanceOf (hw, jsjava.awt.Window)) {
this.addDirtyRegion (hw, dirty.x, dirty.y, dirty.width, dirty.height);
} else if (Clazz.instanceOf (hw, jsjava.applet.Applet)) {
this.addDirtyRegion (hw, dirty.x, dirty.y, dirty.width, dirty.height);
} else {
this.addDirtyRegion0 (hw, dirty.x, dirty.y, dirty.width, dirty.height);
}}
});
Clazz.defineMethod (c$, "nativeAddDirtyRegion", 
function (appContext, c, x, y, w, h) {
if (w > 0 && h > 0) {
{
var dirty = this.hwDirtyComponents.get (c);
if (dirty == null) {
this.hwDirtyComponents.put (c,  new jsjava.awt.Rectangle (x, y, w, h));
} else {
this.hwDirtyComponents.put (c, jsjavax.swing.SwingUtilities.computeUnion (x, y, w, h, dirty));
}}this.scheduleProcessingRunnable (appContext);
}}, "jssun.awt.AppContext,jsjava.awt.Container,~N,~N,~N,~N");
Clazz.defineMethod (c$, "extendDirtyRegion", 
($fz = function (c, x, y, w, h) {
var r = this.dirtyComponents.get (c);
if (r != null) {
jsjavax.swing.SwingUtilities.computeUnion (x, y, w, h, r);
return true;
}return false;
}, $fz.isPrivate = true, $fz), "jsjava.awt.Component,~N,~N,~N,~N");
Clazz.defineMethod (c$, "getDirtyRegion", 
function (aComponent) {
var r = null;
{
r = this.dirtyComponents.get (aComponent);
}if (r == null) return  new jsjava.awt.Rectangle (0, 0, 0, 0);
 else return  new jsjava.awt.Rectangle (r);
}, "jsjavax.swing.JComponent");
Clazz.defineMethod (c$, "markCompletelyDirty", 
function (aComponent) {
this.addDirtyRegion (aComponent, 0, 0, 2147483647, 2147483647);
}, "jsjavax.swing.JComponent");
Clazz.defineMethod (c$, "markCompletelyClean", 
function (aComponent) {
{
this.dirtyComponents.remove (aComponent);
}}, "jsjavax.swing.JComponent");
Clazz.defineMethod (c$, "isCompletelyDirty", 
function (aComponent) {
var r;
r = this.getDirtyRegion (aComponent);
if (r.width == 2147483647 && r.height == 2147483647) return true;
 else return false;
}, "jsjavax.swing.JComponent");
Clazz.defineMethod (c$, "validateInvalidComponents", 
function () {
var ic;
{
if (this.invalidComponents == null) {
return;
}ic = this.invalidComponents;
this.invalidComponents = null;
}var n = ic.size ();
for (var i = 0; i < n; i++) {
var c = ic.get (i);
c.validate ();
}
});
Clazz.defineMethod (c$, "prePaintDirtyRegions", 
($fz = function () {
var dirtyComponents;
var runnableList;
{
dirtyComponents = this.dirtyComponents;
runnableList = this.runnableList;
this.runnableList = null;
}if (runnableList != null) {
for (var runnable, $runnable = runnableList.iterator (); $runnable.hasNext () && ((runnable = $runnable.next ()) || true);) {
runnable.run ();
}
}this.paintDirtyRegions ();
if (dirtyComponents.size () > 0) {
this.paintDirtyRegions (dirtyComponents);
}}, $fz.isPrivate = true, $fz));
Clazz.defineMethod (c$, "updateWindows", 
($fz = function (dirtyComponents) {
var toolkit = jsjava.awt.Toolkit.getDefaultToolkit ();
if (!(Clazz.instanceOf (toolkit, jssun.awt.SunToolkit) && (toolkit).needUpdateWindow ())) {
return dirtyComponents;
}var windows =  new java.util.HashSet ();
var dirtyComps = dirtyComponents.keySet ();
for (var it = dirtyComps.iterator (); it.hasNext (); ) {
var dirty = it.next ();
var window = Clazz.instanceOf (dirty, jsjava.awt.Window) ? dirty : jsjavax.swing.SwingUtilities.getWindowAncestor (dirty);
if (window != null && !jssun.awt.AWTAccessor.getWindowAccessor ().isOpaque (window)) {
it.remove ();
windows.add (window);
}}
for (var window, $window = windows.iterator (); $window.hasNext () && ((window = $window.next ()) || true);) {
jssun.awt.AWTAccessor.getWindowAccessor ().updateWindow (window, null);
}
return dirtyComponents;
}, $fz.isPrivate = true, $fz), "java.util.Map");
Clazz.defineMethod (c$, "paintDirtyRegions", 
function () {
{
var tmp = this.tmpDirtyComponents;
this.tmpDirtyComponents = this.dirtyComponents;
this.dirtyComponents = tmp;
this.dirtyComponents.clear ();
}this.paintDirtyRegions (this.tmpDirtyComponents);
});
Clazz.defineMethod (c$, "paintDirtyRegions", 
($fz = function (tmpDirtyComponents) {
if (tmpDirtyComponents.isEmpty ()) {
return;
}this.updateWindows (tmpDirtyComponents);
var roots =  new java.util.ArrayList (tmpDirtyComponents.size ());
for (var dirty, $dirty = tmpDirtyComponents.keySet ().iterator (); $dirty.hasNext () && ((dirty = $dirty.next ()) || true);) {
this.collectDirtyComponents (tmpDirtyComponents, dirty, roots);
}
var count = roots.size ();
this.painting = true;
try {
for (var j = 0; j < count; j++) {
var i = j;
var dirtyComponent = roots.get (j);
var rect = tmpDirtyComponents.get (dirtyComponent);
var localBoundsH = dirtyComponent.getHeight ();
var localBoundsW = dirtyComponent.getWidth ();
jsjavax.swing.SwingUtilities.computeIntersection (0, 0, localBoundsW, localBoundsH, rect);
if (Clazz.instanceOf (dirtyComponent, jsjavax.swing.JComponent)) {
(dirtyComponent).paintImmediately (rect.x, rect.y, rect.width, rect.height);
} else if (dirtyComponent.isShowing ()) {
var g = jsjavax.swing.JComponent.safelyGetGraphics (dirtyComponent, dirtyComponent);
if (g != null) {
g.setClip (rect.x, rect.y, rect.width, rect.height);
try {
dirtyComponent.paint (g);
} finally {
g.dispose ();
}
}}if (this.repaintRoot != null) {
this.adjustRoots (this.repaintRoot, roots, i + 1);
count = roots.size ();
this.paintManager.$isRepaintingRoot = true;
this.repaintRoot.paintImmediately (0, 0, this.repaintRoot.getWidth (), this.repaintRoot.getHeight ());
this.paintManager.$isRepaintingRoot = false;
this.repaintRoot = null;
}}
} finally {
this.painting = false;
}
tmpDirtyComponents.clear ();
}, $fz.isPrivate = true, $fz), "java.util.Map");
Clazz.defineMethod (c$, "adjustRoots", 
($fz = function (root, roots, index) {
for (var i = roots.size () - 1; i >= index; i--) {
var c = roots.get (i);
for (; ; ) {
if (c === root || c == null || !(Clazz.instanceOf (c, jsjavax.swing.JComponent))) {
break;
}c = c.getParent ();
}
if (c === root) {
roots.remove (i);
}}
}, $fz.isPrivate = true, $fz), "jsjavax.swing.JComponent,java.util.List,~N");
Clazz.defineMethod (c$, "collectDirtyComponents", 
function (dirtyComponents, dirtyComponent, roots) {
var dx;
var dy;
var rootDx;
var rootDy;
var component;
var rootDirtyComponent;
var parent;
component = rootDirtyComponent = dirtyComponent;
var x = dirtyComponent.getX ();
var y = dirtyComponent.getY ();
var w = dirtyComponent.getWidth ();
var h = dirtyComponent.getHeight ();
dx = rootDx = 0;
dy = rootDy = 0;
this.tmp.setBounds (dirtyComponents.get (dirtyComponent));
jsjavax.swing.SwingUtilities.computeIntersection (0, 0, w, h, this.tmp);
if (this.tmp.isEmpty ()) {
return;
}for (; ; ) {
if (!(Clazz.instanceOf (component, jsjavax.swing.JComponent))) break;
parent = component.getParent ();
if (parent == null) break;
component = parent;
dx += x;
dy += y;
this.tmp.setLocation (this.tmp.x + x, this.tmp.y + y);
x = component.getX ();
y = component.getY ();
w = component.getWidth ();
h = component.getHeight ();
this.tmp = jsjavax.swing.SwingUtilities.computeIntersection (0, 0, w, h, this.tmp);
if (this.tmp.isEmpty ()) {
return;
}if (dirtyComponents.get (component) != null) {
rootDirtyComponent = component;
rootDx = dx;
rootDy = dy;
}}
if (dirtyComponent !== rootDirtyComponent) {
var r;
this.tmp.setLocation (this.tmp.x + rootDx - dx, this.tmp.y + rootDy - dy);
r = dirtyComponents.get (rootDirtyComponent);
jsjavax.swing.SwingUtilities.computeUnion (this.tmp.x, this.tmp.y, this.tmp.width, this.tmp.height, r);
}if (!roots.contains (rootDirtyComponent)) roots.add (rootDirtyComponent);
}, "java.util.Map,jsjava.awt.Component,java.util.List");
Clazz.overrideMethod (c$, "toString", 
function () {
var sb =  new StringBuffer ();
if (this.dirtyComponents != null) sb.append ("" + this.dirtyComponents);
return sb.toString ();
});
Clazz.defineMethod (c$, "getOffscreenBuffer", 
function (c, proposedWidth, proposedHeight) {
return this._getOffscreenBuffer (c, proposedWidth, proposedHeight);
}, "jsjava.awt.Component,~N,~N");
Clazz.defineMethod (c$, "getVolatileOffscreenBuffer", 
function (c, proposedWidth, proposedHeight) {
var config = c.getGraphicsConfiguration ();
var maxSize = this.getDoubleBufferMaximumSize ();
var width = proposedWidth < 1 ? 1 : (proposedWidth > maxSize.width ? maxSize.width : proposedWidth);
var height = proposedHeight < 1 ? 1 : (proposedHeight > maxSize.height ? maxSize.height : proposedHeight);
var image = this.volatileMap.get (config);
if (image == null || image.getWidth () < width || image.getHeight () < height) {
if (image != null) {
image.flush ();
}image = config.createCompatibleVolatileImage (width, height);
this.volatileMap.put (config, image);
}return image;
}, "jsjava.awt.Component,~N,~N");
Clazz.defineMethod (c$, "_getOffscreenBuffer", 
($fz = function (c, proposedWidth, proposedHeight) {
var maxSize = this.getDoubleBufferMaximumSize ();
var doubleBuffer = null;
var width;
var height;
if (this.standardDoubleBuffer == null) {
this.standardDoubleBuffer = Clazz.innerTypeInstance (jsjavax.swing.RepaintManager.DoubleBufferInfo, this, null);
}doubleBuffer = this.standardDoubleBuffer;
width = proposedWidth < 1 ? 1 : (proposedWidth > maxSize.width ? maxSize.width : proposedWidth);
height = proposedHeight < 1 ? 1 : (proposedHeight > maxSize.height ? maxSize.height : proposedHeight);
if (doubleBuffer.needsReset || (doubleBuffer.image != null && (doubleBuffer.size.width < width || doubleBuffer.size.height < height))) {
doubleBuffer.needsReset = false;
if (doubleBuffer.image != null) {
doubleBuffer.image.flush ();
doubleBuffer.image = null;
}width = Math.max (doubleBuffer.size.width, width);
height = Math.max (doubleBuffer.size.height, height);
}var result = doubleBuffer.image;
if (doubleBuffer.image == null) {
result = c.createImage (width, height);
doubleBuffer.size =  new jsjava.awt.Dimension (width, height);
if (Clazz.instanceOf (c, jsjavax.swing.JComponent)) {
(c).setCreatedDoubleBuffer (true);
doubleBuffer.image = result;
}}return result;
}, $fz.isPrivate = true, $fz), "jsjava.awt.Component,~N,~N");
Clazz.defineMethod (c$, "setDoubleBufferMaximumSize", 
function (d) {
}, "jsjava.awt.Dimension");
Clazz.defineMethod (c$, "getDoubleBufferMaximumSize", 
function () {
return null;
});
Clazz.defineMethod (c$, "setDoubleBufferingEnabled", 
function (aFlag) {
}, "~B");
Clazz.defineMethod (c$, "resetDoubleBuffer", 
function () {
if (this.standardDoubleBuffer != null) {
this.standardDoubleBuffer.needsReset = true;
}});
Clazz.defineMethod (c$, "resetVolatileDoubleBuffer", 
function (gc) {
var image = this.volatileMap.remove (gc);
if (image != null) {
image.flush ();
}}, "jsjava.awt.GraphicsConfiguration");
Clazz.defineMethod (c$, "useVolatileDoubleBuffer", 
function () {
return jsjavax.swing.RepaintManager.volatileImageBufferEnabled;
});
Clazz.defineMethod (c$, "isPaintingThread", 
($fz = function () {
return (Thread.currentThread () === this.paintThread);
}, $fz.isPrivate = true, $fz));
Clazz.defineMethod (c$, "paint", 
function (paintingComponent, bufferComponent, g, x, y, w, h) {
var paintManager = this.getPaintManager ();
if (!this.isPaintingThread ()) {
if (paintManager.getClass () !== jsjavax.swing.RepaintManager.PaintManager) {
paintManager =  new jsjavax.swing.RepaintManager.PaintManager ();
paintManager.repaintManager = this;
}}if (!paintManager.paint (paintingComponent, bufferComponent, g, x, y, w, h)) {
g.setClip (x, y, w, h);
paintingComponent.paintToOffscreen (g, x, y, w, h, x + w, y + h);
}}, "jsjavax.swing.JComponent,jsjavax.swing.JComponent,jsjava.awt.Graphics,~N,~N,~N,~N");
Clazz.defineMethod (c$, "copyArea", 
function (c, g, x, y, w, h, deltaX, deltaY, clip) {
this.getPaintManager ().copyArea (c, g, x, y, w, h, deltaX, deltaY, clip);
}, "jsjavax.swing.JComponent,jsjava.awt.Graphics,~N,~N,~N,~N,~N,~N,~B");
Clazz.defineMethod (c$, "beginPaint", 
function () {
var multiThreadedPaint = false;
var paintDepth = 0;
var currentThread = Thread.currentThread ();
{
paintDepth = this.paintDepth;
if (this.paintThread == null || currentThread === this.paintThread) {
this.paintThread = currentThread;
this.paintDepth++;
} else {
multiThreadedPaint = true;
}}if (!multiThreadedPaint && paintDepth == 0) {
this.getPaintManager ().beginPaint ();
}});
Clazz.defineMethod (c$, "endPaint", 
function () {
if (this.isPaintingThread ()) {
var paintManager = null;
{
if (--this.paintDepth == 0) {
paintManager = this.getPaintManager ();
}}if (paintManager != null) {
paintManager.endPaint ();
{
this.paintThread = null;
}}}});
Clazz.defineMethod (c$, "show", 
function (c, x, y, w, h) {
return this.getPaintManager ().show (c, x, y, w, h);
}, "jsjava.awt.Container,~N,~N,~N,~N");
Clazz.defineMethod (c$, "doubleBufferingChanged", 
function (rootPane) {
this.getPaintManager ().doubleBufferingChanged (rootPane);
}, "jsjavax.swing.JRootPane");
Clazz.defineMethod (c$, "setPaintManager", 
function (paintManager) {
if (paintManager == null) {
paintManager =  new jsjavax.swing.RepaintManager.PaintManager ();
}var oldPaintManager;
{
oldPaintManager = this.paintManager;
this.paintManager = paintManager;
paintManager.repaintManager = this;
}if (oldPaintManager != null) {
oldPaintManager.dispose ();
}}, "jsjavax.swing.RepaintManager.PaintManager");
Clazz.defineMethod (c$, "getPaintManager", 
($fz = function () {
if (this.paintManager == null) {
var paintManager = null;
this.setPaintManager (paintManager);
}return this.paintManager;
}, $fz.isPrivate = true, $fz));
Clazz.defineMethod (c$, "scheduleProcessingRunnable", 
($fz = function () {
this.scheduleProcessingRunnable (jssun.awt.AppContext.getAppContext ());
}, $fz.isPrivate = true, $fz));
Clazz.defineMethod (c$, "scheduleProcessingRunnable", 
($fz = function (context) {
if (this.processingRunnable.markPending ()) {
jssun.awt.SunToolkit.getSystemEventQueueImplPP (context).postEvent ( new jsjava.awt.event.InvocationEvent (jsjava.awt.Toolkit.getDefaultToolkit (), this.processingRunnable));
}}, $fz.isPrivate = true, $fz), "jssun.awt.AppContext");
c$.$RepaintManager$DoubleBufferInfo$ = function () {
Clazz.pu$h ();
c$ = Clazz.decorateAsClass (function () {
Clazz.prepareCallback (this, arguments);
this.image = null;
this.size = null;
this.needsReset = false;
Clazz.instantialize (this, arguments);
}, jsjavax.swing.RepaintManager, "DoubleBufferInfo");
c$ = Clazz.p0p ();
};
c$.$RepaintManager$ProcessingRunnable$ = function () {
Clazz.pu$h ();
c$ = Clazz.decorateAsClass (function () {
Clazz.prepareCallback (this, arguments);
this.pending = false;
Clazz.instantialize (this, arguments);
}, jsjavax.swing.RepaintManager, "ProcessingRunnable", null, Runnable);
Clazz.defineMethod (c$, "markPending", 
function () {
if (!this.pending) {
this.pending = true;
return true;
}return false;
});
Clazz.overrideMethod (c$, "run", 
function () {
{
this.pending = false;
}this.b$["jsjavax.swing.RepaintManager"].scheduleHeavyWeightPaints ();
this.b$["jsjavax.swing.RepaintManager"].validateInvalidComponents ();
this.b$["jsjavax.swing.RepaintManager"].prePaintDirtyRegions ();
});
c$ = Clazz.p0p ();
};
Clazz.pu$h ();
c$ = Clazz.decorateAsClass (function () {
this.repaintManager = null;
this.$isRepaintingRoot = false;
Clazz.instantialize (this, arguments);
}, jsjavax.swing.RepaintManager, "PaintManager");
Clazz.defineMethod (c$, "paint", 
function (a, b, c, d, e, f, g) {
var h = false;
var i;
if (!h && (i = this.getValidImage (this.repaintManager.getOffscreenBuffer (b, f, g))) != null) {
this.paintDoubleBuffered (a, i, c, d, e, f, g);
h = true;
}return h;
}, "jsjavax.swing.JComponent,jsjavax.swing.JComponent,jsjava.awt.Graphics,~N,~N,~N,~N");
Clazz.defineMethod (c$, "copyArea", 
function (a, b, c, d, e, f, g, h, i) {
b.copyArea (c, d, e, f, g, h);
}, "jsjavax.swing.JComponent,jsjava.awt.Graphics,~N,~N,~N,~N,~N,~N,~B");
Clazz.defineMethod (c$, "beginPaint", 
function () {
});
Clazz.defineMethod (c$, "endPaint", 
function () {
});
Clazz.defineMethod (c$, "show", 
function (a, b, c, d, e) {
return false;
}, "jsjava.awt.Container,~N,~N,~N,~N");
Clazz.defineMethod (c$, "doubleBufferingChanged", 
function (a) {
}, "jsjavax.swing.JRootPane");
Clazz.defineMethod (c$, "paintDoubleBuffered", 
function (a, b, c, d, e, f, g) {
var h = b.getGraphics ();
var i = Math.min (f, b.getWidth (null));
var j = Math.min (g, b.getHeight (null));
var k;
var l;
var m;
var n;
try {
for (k = d, m = d + f; k < m; k += i) {
for (l = e, n = e + g; l < n; l += j) {
h.translate (-k, -l);
h.setClip (k, l, i, j);
a.paintToOffscreen (h, k, l, i, j, m, n);
c.setClip (k, l, i, j);
c.drawImage (b, k, l, a);
h.translate (k, l);
}
}
} finally {
h.dispose ();
}
}, "jsjavax.swing.JComponent,jsjava.awt.Image,jsjava.awt.Graphics,~N,~N,~N,~N");
Clazz.defineMethod (c$, "getValidImage", 
($fz = function (a) {
if (a != null && a.getWidth (null) > 0 && a.getHeight (null) > 0) {
return a;
}return null;
}, $fz.isPrivate = true, $fz), "jsjava.awt.Image");
Clazz.defineMethod (c$, "repaintRoot", 
function (a) {
if (this.repaintManager.painting) {
this.repaintManager.repaintRoot = a;
} else {
a.repaint ();
}}, "jsjavax.swing.JComponent");
Clazz.defineMethod (c$, "isRepaintingRoot", 
function () {
return this.$isRepaintingRoot;
});
Clazz.defineMethod (c$, "dispose", 
function () {
});
c$ = Clazz.p0p ();
Clazz.defineStatics (c$,
"HANDLE_TOP_LEVEL_PAINT", false);
c$.repaintManagerKey = c$.prototype.repaintManagerKey = jsjavax.swing.RepaintManager;
Clazz.defineStatics (c$,
"volatileImageBufferEnabled", true);
{
jsjavax.swing.RepaintManager.volatileImageBufferEnabled = false;
var headless = false;
if (jsjavax.swing.RepaintManager.volatileImageBufferEnabled && headless) {
jsjavax.swing.RepaintManager.volatileImageBufferEnabled = false;
}jsjavax.swing.RepaintManager.HANDLE_TOP_LEVEL_PAINT = true;
}});

Clazz.declarePackage ("javax.swing");
Clazz.load (["java.util.HashMap", "java.awt.Rectangle"], "javax.swing.RepaintManager", ["java.lang.StringBuffer", "$.Thread", "java.util.HashSet", "$.IdentityHashMap", "JU.Lst", "java.applet.Applet", "java.awt.Frame", "$.Toolkit", "$.Window", "java.awt.event.InvocationEvent", "javax.swing.CellRendererPane", "$.JComponent", "$.SwingUtilities", "sun.awt.AWTAccessor", "$.AppContext", "$.SunToolkit", "swingjs.JSToolkit"], function () {
c$ = Clazz.decorateAsClass (function () {
this.volatileMap = null;
this.hwDirtyComponents = null;
this.dirtyComponents = null;
this.tmpDirtyComponents = null;
this.invalidComponents = null;
this.runnableList = null;
this.paintDepth = 0;
this.painting = false;
this.repaintRoot = null;
this.paintThread = null;
this.processingRunnable = null;
this.myComponent = null;
this.tmp = null;
if (!Clazz.isClassDefined ("javax.swing.RepaintManager.ProcessingRunnable")) {
javax.swing.RepaintManager.$RepaintManager$ProcessingRunnable$ ();
}
Clazz.instantialize (this, arguments);
}, javax.swing, "RepaintManager");
Clazz.prepareFields (c$, function () {
this.volatileMap =  new java.util.HashMap (1);
this.tmp =  new java.awt.Rectangle ();
});
c$.currentManager = Clazz.defineMethod (c$, "currentManager", 
function (c) {
var appContext = sun.awt.AppContext.getAppContext ();
var rm = appContext.get (javax.swing.RepaintManager.repaintManagerKey);
if (rm == null) {
rm =  new javax.swing.RepaintManager ();
rm.set (c);
appContext.put (javax.swing.RepaintManager.repaintManagerKey, rm);
}return rm;
}, "java.awt.Component");
c$.setCurrentManager = Clazz.defineMethod (c$, "setCurrentManager", 
function (aRepaintManager) {
if (aRepaintManager != null) {
javax.swing.SwingUtilities.appContextPut (javax.swing.RepaintManager.repaintManagerKey, aRepaintManager);
} else {
javax.swing.SwingUtilities.appContextRemove (javax.swing.RepaintManager.repaintManagerKey);
}}, "javax.swing.RepaintManager");
Clazz.makeConstructor (c$, 
 function () {
this.processingRunnable = Clazz.innerTypeInstance (javax.swing.RepaintManager.ProcessingRunnable, this, null);
});
Clazz.defineMethod (c$, "set", 
 function (c) {
this.myComponent = c;
this.dirtyComponents =  new java.util.IdentityHashMap ();
this.tmpDirtyComponents =  new java.util.IdentityHashMap ();
this.hwDirtyComponents =  new java.util.IdentityHashMap ();
}, "java.awt.Component");
Clazz.defineMethod (c$, "addInvalidComponent", 
function (invalidComponent) {
var validateRoot = null;
for (var c = invalidComponent; c != null; c = c.getParent ()) {
if ((Clazz.instanceOf (c, javax.swing.CellRendererPane))) {
return;
}if ((Clazz.instanceOf (c, javax.swing.JComponent)) && ((c).isValidateRoot ())) {
validateRoot = c;
break;
}}
if (validateRoot == null) {
return;
}var root = null;
for (var c = validateRoot; c != null; c = c.getParent ()) {
if (!c.isVisible ()) {
return;
}if ((Clazz.instanceOf (c, java.awt.Window)) || (Clazz.instanceOf (c, java.applet.Applet))) {
root = c;
break;
}}
if (root == null) {
return;
}if (this.invalidComponents == null) {
this.invalidComponents =  new JU.Lst ();
} else {
var n = this.invalidComponents.size ();
for (var i = 0; i < n; i++) {
if (validateRoot === this.invalidComponents.get (i)) {
return;
}}
}this.invalidComponents.add (validateRoot);
this.scheduleProcessingRunnable (root);
}, "javax.swing.JComponent");
Clazz.defineMethod (c$, "removeInvalidComponent", 
function (component) {
if (this.invalidComponents != null) {
var index = this.invalidComponents.indexOf (component);
if (index != -1) {
this.invalidComponents.removeItemAt (index);
}}}, "javax.swing.JComponent");
Clazz.defineMethod (c$, "addDirtyRegion0", 
 function (c, x, y, w, h) {
if (w <= 0 || h <= 0 || c == null || c.getWidth () <= 0 || c.getHeight () <= 0) return;
if (this.extendDirtyRegion (c, x, y, w, h)) {
return;
}var root = null;
for (var p = c; p != null; p = p.getParent ()) {
if (!p.isVisible () || p.getPeer () == null) {
return;
}if ((Clazz.instanceOf (p, java.awt.Window)) || (Clazz.instanceOf (p, java.applet.Applet))) {
if (Clazz.instanceOf (p, java.awt.Frame) && ((p).getExtendedState () & 1) == 1) {
return;
}root = p;
break;
}}
if (root == null) return;
{
if (this.extendDirtyRegion (c, x, y, w, h)) {
return;
}this.dirtyComponents.put (c,  new java.awt.Rectangle (x, y, w, h));
}this.scheduleProcessingRunnable (c);
}, "java.awt.Container,~N,~N,~N,~N");
Clazz.defineMethod (c$, "addDirtyRegion", 
function (c, x, y, w, h) {
this.addDirtyRegion0 (c, x, y, w, h);
}, "javax.swing.JComponent,~N,~N,~N,~N");
Clazz.defineMethod (c$, "addDirtyRegion", 
function (window, x, y, w, h) {
this.addDirtyRegion0 (window, x, y, w, h);
}, "java.awt.Window,~N,~N,~N,~N");
Clazz.defineMethod (c$, "addDirtyRegion", 
function (applet, x, y, w, h) {
this.addDirtyRegion0 (applet, x, y, w, h);
}, "java.applet.Applet,~N,~N,~N,~N");
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
if (Clazz.instanceOf (hw, java.awt.Window)) {
this.addDirtyRegion (hw, dirty.x, dirty.y, dirty.width, dirty.height);
} else if (Clazz.instanceOf (hw, java.applet.Applet)) {
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
this.hwDirtyComponents.put (c,  new java.awt.Rectangle (x, y, w, h));
} else {
this.hwDirtyComponents.put (c, javax.swing.SwingUtilities.computeUnion (x, y, w, h, dirty));
}}this.scheduleProcessingRunnable (appContext);
}}, "sun.awt.AppContext,java.awt.Container,~N,~N,~N,~N");
Clazz.defineMethod (c$, "extendDirtyRegion", 
 function (c, x, y, w, h) {
var r = this.dirtyComponents.get (c);
if (r != null) {
javax.swing.SwingUtilities.computeUnion (x, y, w, h, r);
return true;
}return false;
}, "java.awt.Component,~N,~N,~N,~N");
Clazz.defineMethod (c$, "getDirtyRegion", 
function (aComponent) {
var r = null;
{
r = this.dirtyComponents.get (aComponent);
}if (r == null) return  new java.awt.Rectangle (0, 0, 0, 0);
 else return  new java.awt.Rectangle (r);
}, "javax.swing.JComponent");
Clazz.defineMethod (c$, "markCompletelyDirty", 
function (aComponent) {
this.addDirtyRegion (aComponent, 0, 0, 2147483647, 2147483647);
}, "javax.swing.JComponent");
Clazz.defineMethod (c$, "markCompletelyClean", 
function (aComponent) {
{
this.dirtyComponents.remove (aComponent);
}}, "javax.swing.JComponent");
Clazz.defineMethod (c$, "isCompletelyDirty", 
function (aComponent) {
var r;
r = this.getDirtyRegion (aComponent);
if (r.width == 2147483647 && r.height == 2147483647) return true;
 else return false;
}, "javax.swing.JComponent");
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
 function () {
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
this.paintDirtyRegions1 (dirtyComponents);
}});
Clazz.defineMethod (c$, "updateWindows", 
 function (dirtyComponents) {
var toolkit = java.awt.Toolkit.getDefaultToolkit ();
if (!(Clazz.instanceOf (toolkit, sun.awt.SunToolkit) && (toolkit).needUpdateWindow ())) {
return dirtyComponents;
}var windows =  new java.util.HashSet ();
var dirtyComps = dirtyComponents.keySet ();
for (var it = dirtyComps.iterator (); it.hasNext (); ) {
var dirty = it.next ();
var window = Clazz.instanceOf (dirty, java.awt.Window) ? dirty : javax.swing.SwingUtilities.getWindowAncestor (dirty);
if (window != null && !sun.awt.AWTAccessor.getWindowAccessor ().isOpaque (window)) {
it.remove ();
windows.add (window);
}}
for (var window, $window = windows.iterator (); $window.hasNext () && ((window = $window.next ()) || true);) {
sun.awt.AWTAccessor.getWindowAccessor ().updateWindow (window, null);
}
return dirtyComponents;
}, "java.util.Map");
Clazz.defineMethod (c$, "paintDirtyRegions", 
function () {
{
var tmp = this.tmpDirtyComponents;
this.tmpDirtyComponents = this.dirtyComponents;
this.dirtyComponents = tmp;
this.dirtyComponents.clear ();
}this.paintDirtyRegions1 (this.tmpDirtyComponents);
});
Clazz.defineMethod (c$, "paintDirtyRegions1", 
 function (tmpDirtyComponents) {
if (tmpDirtyComponents.isEmpty ()) {
return;
}this.updateWindows (tmpDirtyComponents);
var roots =  new JU.Lst ();
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
javax.swing.SwingUtilities.computeIntersection (0, 0, localBoundsW, localBoundsH, rect);
if (Clazz.instanceOf (dirtyComponent, javax.swing.JComponent)) {
(dirtyComponent).paintImmediately (rect.x, rect.y, rect.width, rect.height);
} else if (dirtyComponent.isShowing ()) {
var g = javax.swing.JComponent.safelyGetGraphics (dirtyComponent, dirtyComponent);
if (g != null) {
try {
dirtyComponent.paint (g);
} finally {
g.dispose ();
}
}}if (this.repaintRoot != null) {
this.adjustRoots (this.repaintRoot, roots, i + 1);
count = roots.size ();
this.repaintRoot.paintImmediately (0, 0, this.repaintRoot.getWidth (), this.repaintRoot.getHeight ());
this.repaintRoot = null;
}}
} finally {
this.painting = false;
}
tmpDirtyComponents.clear ();
}, "java.util.Map");
Clazz.defineMethod (c$, "adjustRoots", 
 function (root, roots, index) {
for (var i = roots.size () - 1; i >= index; i--) {
var c = roots.get (i);
for (; ; ) {
if (c === root || c == null || !(Clazz.instanceOf (c, javax.swing.JComponent))) {
break;
}c = c.getParent ();
}
if (c === root) {
roots.removeItemAt (i);
}}
}, "javax.swing.JComponent,JU.Lst,~N");
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
javax.swing.SwingUtilities.computeIntersection (0, 0, w, h, this.tmp);
if (this.tmp.isEmpty ()) {
return;
}for (; ; ) {
if (!(Clazz.instanceOf (component, javax.swing.JComponent))) break;
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
this.tmp = javax.swing.SwingUtilities.computeIntersection (0, 0, w, h, this.tmp);
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
javax.swing.SwingUtilities.computeUnion (this.tmp.x, this.tmp.y, this.tmp.width, this.tmp.height, r);
}if (!roots.contains (rootDirtyComponent)) roots.add (rootDirtyComponent);
}, "java.util.Map,java.awt.Component,java.util.List");
Clazz.overrideMethod (c$, "toString", 
function () {
var sb =  new StringBuffer ();
if (this.dirtyComponents != null) sb.append ("" + this.dirtyComponents);
return sb.toString ();
});
Clazz.defineMethod (c$, "getOffscreenBuffer", 
function (c, proposedWidth, proposedHeight) {
return null;
}, "java.awt.Component,~N,~N");
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
}, "java.awt.Component,~N,~N");
Clazz.defineMethod (c$, "setDoubleBufferMaximumSize", 
function (d) {
}, "java.awt.Dimension");
Clazz.defineMethod (c$, "getDoubleBufferMaximumSize", 
function () {
return null;
});
Clazz.defineMethod (c$, "setDoubleBufferingEnabled", 
function (aFlag) {
}, "~B");
Clazz.defineMethod (c$, "resetDoubleBuffer", 
function () {
});
Clazz.defineMethod (c$, "resetVolatileDoubleBuffer", 
function (gc) {
var image = this.volatileMap.remove (gc);
if (image != null) {
image.flush ();
}}, "java.awt.GraphicsConfiguration");
Clazz.defineMethod (c$, "useVolatileDoubleBuffer", 
function () {
return javax.swing.RepaintManager.volatileImageBufferEnabled;
});
Clazz.defineMethod (c$, "isPaintingThread", 
 function () {
return (Thread.currentThread () === this.paintThread);
});
Clazz.defineMethod (c$, "paint", 
function (paintingComponent, bufferComponent, g, x, y, w, h) {
paintingComponent.paintToOffscreen (g, x, y, w, h, x + w, y + h);
}, "javax.swing.JComponent,javax.swing.JComponent,java.awt.Graphics,~N,~N,~N,~N");
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
}}});
Clazz.defineMethod (c$, "endPaint", 
function () {
if (this.isPaintingThread ()) {
}});
Clazz.defineMethod (c$, "doubleBufferingChanged", 
function (rootPane) {
}, "javax.swing.JRootPane");
Clazz.defineMethod (c$, "scheduleProcessingRunnable", 
 function (c) {
this.scheduleProcessingRunnable (c.getAppContext ());
}, "java.awt.Component");
Clazz.defineMethod (c$, "scheduleProcessingRunnable", 
 function (context) {
if (this.processingRunnable.markPending ()) {
sun.awt.SunToolkit.getSystemEventQueueImplPP (context).postEvent ( new java.awt.event.InvocationEvent (java.awt.Toolkit.getDefaultToolkit (), this.processingRunnable));
}}, "sun.awt.AppContext");
c$.$RepaintManager$ProcessingRunnable$ = function () {
Clazz.pu$h(self.c$);
c$ = Clazz.decorateAsClass (function () {
Clazz.prepareCallback (this, arguments);
this.pending = false;
Clazz.instantialize (this, arguments);
}, javax.swing.RepaintManager, "ProcessingRunnable", null, Runnable);
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
}this.b$["javax.swing.RepaintManager"].scheduleHeavyWeightPaints ();
this.b$["javax.swing.RepaintManager"].validateInvalidComponents ();
this.b$["javax.swing.RepaintManager"].prePaintDirtyRegions ();
swingjs.JSToolkit.forceRepaint (this.b$["javax.swing.RepaintManager"].myComponent);
});
c$ = Clazz.p0p ();
};
Clazz.defineStatics (c$,
"HANDLE_TOP_LEVEL_PAINT", false);
c$.repaintManagerKey = c$.prototype.repaintManagerKey = javax.swing.RepaintManager;
Clazz.defineStatics (c$,
"volatileImageBufferEnabled", true);
{
javax.swing.RepaintManager.volatileImageBufferEnabled = false;
var headless = false;
if (javax.swing.RepaintManager.volatileImageBufferEnabled && headless) {
javax.swing.RepaintManager.volatileImageBufferEnabled = false;
}javax.swing.RepaintManager.HANDLE_TOP_LEVEL_PAINT = true;
}});

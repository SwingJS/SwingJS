Clazz.declarePackage ("jsjavax.swing");
Clazz.load (["jssun.awt.PaintEventDispatcher"], "jsjavax.swing.SwingPaintEventDispatcher", ["jsjava.awt.Rectangle", "jsjavax.swing.RepaintManager", "$.RootPaneContainer", "$.SwingHeavyWeight", "jssun.awt.SunToolkit", "jssun.awt.event.IgnorePaintEvent"], function () {
c$ = Clazz.declareType (jsjavax.swing, "SwingPaintEventDispatcher", jssun.awt.PaintEventDispatcher);
Clazz.defineMethod (c$, "createPaintEvent", 
function (component, x, y, w, h) {
if (Clazz.instanceOf (component, jsjavax.swing.RootPaneContainer)) {
var appContext = jssun.awt.SunToolkit.targetToAppContext (component);
var rm = jsjavax.swing.RepaintManager.currentManager (component);
if (!jsjavax.swing.SwingPaintEventDispatcher.SHOW_FROM_DOUBLE_BUFFER || !rm.show (component, x, y, w, h)) {
rm.nativeAddDirtyRegion (appContext, component, x, y, w, h);
}return  new jssun.awt.event.IgnorePaintEvent (component, 800,  new jsjava.awt.Rectangle (x, y, w, h));
} else if (Clazz.instanceOf (component, jsjavax.swing.SwingHeavyWeight)) {
var appContext = jssun.awt.SunToolkit.targetToAppContext (component);
var rm = jsjavax.swing.RepaintManager.currentManager (component);
rm.nativeAddDirtyRegion (appContext, component, x, y, w, h);
return  new jssun.awt.event.IgnorePaintEvent (component, 800,  new jsjava.awt.Rectangle (x, y, w, h));
}return Clazz.superCall (this, jsjavax.swing.SwingPaintEventDispatcher, "createPaintEvent", [component, x, y, w, h]);
}, "jsjava.awt.Component,~N,~N,~N,~N");
Clazz.overrideMethod (c$, "shouldDoNativeBackgroundErase", 
function (c) {
return jsjavax.swing.SwingPaintEventDispatcher.ERASE_BACKGROUND || !(Clazz.instanceOf (c, jsjavax.swing.RootPaneContainer));
}, "jsjava.awt.Component");
Clazz.defineMethod (c$, "queueSurfaceDataReplacing", 
function (c, r) {
if (Clazz.instanceOf (c, jsjavax.swing.RootPaneContainer)) {
var appContext = jssun.awt.SunToolkit.targetToAppContext (c);
return true;
}return Clazz.superCall (this, jsjavax.swing.SwingPaintEventDispatcher, "queueSurfaceDataReplacing", [c, r]);
}, "jsjava.awt.Component,Runnable");
Clazz.defineStatics (c$,
"SHOW_FROM_DOUBLE_BUFFER", false,
"ERASE_BACKGROUND", false);
{
jsjavax.swing.SwingPaintEventDispatcher.SHOW_FROM_DOUBLE_BUFFER = false;
jsjavax.swing.SwingPaintEventDispatcher.ERASE_BACKGROUND = true;
}});

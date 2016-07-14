Clazz.declarePackage ("javax.swing");
Clazz.load (["sun.awt.PaintEventDispatcher"], "javax.swing.SwingPaintEventDispatcher", ["javax.swing.RootPaneContainer", "sun.awt.SunToolkit"], function () {
c$ = Clazz.declareType (javax.swing, "SwingPaintEventDispatcher", sun.awt.PaintEventDispatcher);
Clazz.overrideMethod (c$, "shouldDoNativeBackgroundErase", 
function (c) {
return javax.swing.SwingPaintEventDispatcher.ERASE_BACKGROUND || !(Clazz.instanceOf (c, javax.swing.RootPaneContainer));
}, "java.awt.Component");
Clazz.defineMethod (c$, "queueSurfaceDataReplacing", 
function (c, r) {
if (Clazz.instanceOf (c, javax.swing.RootPaneContainer)) {
var appContext = sun.awt.SunToolkit.targetToAppContext (c);
return true;
}return Clazz.superCall (this, javax.swing.SwingPaintEventDispatcher, "queueSurfaceDataReplacing", [c, r]);
}, "java.awt.Component,Runnable");
Clazz.defineStatics (c$,
"SHOW_FROM_DOUBLE_BUFFER", false,
"ERASE_BACKGROUND", false);
{
javax.swing.SwingPaintEventDispatcher.SHOW_FROM_DOUBLE_BUFFER = false;
javax.swing.SwingPaintEventDispatcher.ERASE_BACKGROUND = true;
}});

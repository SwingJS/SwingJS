Clazz.declarePackage ("jssun.awt");
Clazz.load (null, "jssun.awt.PaintEventDispatcher", ["java.awt.Rectangle", "java.awt.event.PaintEvent"], function () {
c$ = Clazz.declareType (jssun.awt, "PaintEventDispatcher");
c$.setPaintEventDispatcher = Clazz.defineMethod (c$, "setPaintEventDispatcher", 
function (dispatcher) {
{
jssun.awt.PaintEventDispatcher.dispatcher = dispatcher;
}}, "jssun.awt.PaintEventDispatcher");
c$.getPaintEventDispatcher = Clazz.defineMethod (c$, "getPaintEventDispatcher", 
function () {
{
if (jssun.awt.PaintEventDispatcher.dispatcher == null) {
jssun.awt.PaintEventDispatcher.dispatcher =  new jssun.awt.PaintEventDispatcher ();
}return jssun.awt.PaintEventDispatcher.dispatcher;
}});
Clazz.defineMethod (c$, "createPaintEvent", 
function (target, x, y, w, h) {
return  new java.awt.event.PaintEvent (target, 800,  new java.awt.Rectangle (x, y, w, h));
}, "java.awt.Component,~N,~N,~N,~N");
Clazz.defineMethod (c$, "shouldDoNativeBackgroundErase", 
function (c) {
return true;
}, "java.awt.Component");
Clazz.defineMethod (c$, "queueSurfaceDataReplacing", 
function (c, r) {
return false;
}, "java.awt.Component,Runnable");
Clazz.defineStatics (c$,
"dispatcher", null);
});

Clazz.declarePackage ("swingjs");
Clazz.load (["swingjs.api.JSInterface"], "swingjs.JSFrameViewer", ["java.awt.Insets", "swingjs.JSGraphics2D", "$.JSMouse", "swingjs.api.DOMNode"], function () {
c$ = Clazz.decorateAsClass (function () {
this.jsgraphics = null;
this.fullName = "Main";
this.top = null;
this.appletViewer = null;
this.isApplet = false;
this.isFrame = false;
this.html5Applet = null;
this.insets = null;
this.display = null;
this.applet = null;
this.japplet = null;
this.mouse = null;
this.canvas = null;
this.frameID = null;
this.canvasId = null;
Clazz.instantialize (this, arguments);
}, swingjs, "JSFrameViewer", null, swingjs.api.JSInterface);
Clazz.defineMethod (c$, "getInsets", 
function () {
return this.insets;
});
Clazz.defineMethod (c$, "setForWindow", 
function (window) {
this.isFrame = true;
this.appletViewer = window.appletViewer;
this.top = window;
this.applet = window;
window.frameViewer = this;
this.fullName = this.appletViewer.fullName;
this.canvas = null;
this.jsgraphics = null;
this.insets =  new java.awt.Insets (30, 0, 0, 0);
this.getGraphics (0, 0);
return this;
}, "java.awt.Container");
Clazz.defineMethod (c$, "getTop", 
function () {
return this.top;
});
Clazz.overrideMethod (c$, "cacheFileByName", 
function (fileName, isAdd) {
return 0;
}, "~S,~B");
Clazz.overrideMethod (c$, "cachePut", 
function (key, data) {
}, "~S,~O");
Clazz.overrideMethod (c$, "destroy", 
function () {
});
Clazz.overrideMethod (c$, "getFullName", 
function () {
return this.fullName;
});
Clazz.overrideMethod (c$, "openFileAsyncSpecial", 
function (fileName, flags) {
}, "~S,~N");
Clazz.overrideMethod (c$, "processMouseEvent", 
function (id, x, y, modifiers, time, jqevent) {
this.getMouse ().processEvent (id, x, y, modifiers, time, jqevent);
return false;
}, "~N,~N,~N,~N,~N,~O");
Clazz.defineMethod (c$, "getMouse", 
 function () {
return (this.mouse == null ? this.mouse =  new swingjs.JSMouse (this) : this.mouse);
});
Clazz.overrideMethod (c$, "processTwoPointGesture", 
function (touches) {
this.getMouse ().processTwoPointGesture (touches);
}, "~A");
Clazz.overrideMethod (c$, "setDisplay", 
function (canvas) {
this.canvas = canvas;
this.jsgraphics = null;
}, "swingjs.api.HTML5Canvas");
Clazz.overrideMethod (c$, "setScreenDimension", 
function (width, height) {
this.setGraphics (this.jsgraphics = null, width, height);
if (this.top != null) this.top.resize (width, height);
}, "~N,~N");
Clazz.defineMethod (c$, "setGraphics", 
function (g, width, height) {
return (g == null ? this.getGraphics (width, height) : g);
}, "java.awt.Graphics,~N,~N");
Clazz.overrideMethod (c$, "setStatusDragDropped", 
function (mode, x, y, fileName) {
return false;
}, "~N,~N,~N,~S");
Clazz.overrideMethod (c$, "startHoverWatcher", 
function (enable) {
}, "~B");
Clazz.defineMethod (c$, "getGraphics", 
function (wNew, hNew) {
if (wNew == 0 && this.top != null) {
wNew = Math.max (0, this.top.getWidth () - this.insets.left - this.insets.right);
hNew = Math.max (0, this.top.getHeight () - this.insets.top - this.insets.bottom);
}var wOld = 0;
var hOld = 0;
{
wOld = (this.canvas == null ? 0 : this.canvas.width); hOld =
(this.canvas == null ? 0 : this.canvas.height)
}if (wNew >= 0 && hNew >= 0 && (wOld != wNew || hOld != hNew || this.canvas == null || this.jsgraphics == null)) {
this.jsgraphics =  new swingjs.JSGraphics2D (this.canvas = this.newCanvas (wNew, hNew));
this.jsgraphics.setWindowParameters (wNew, hNew);
}return this.jsgraphics;
}, "~N,~N");
Clazz.defineMethod (c$, "newCanvas", 
function (width, height) {
if (this.isApplet) {
this.canvas = this.html5Applet._getHtml5Canvas ();
return this.canvas;
}var root = (this.top.getComponentCount () > 0 ? this.top.getComponent (0) : null);
var parent = (root == null ? null : (root.getUI ()).domNode);
if (parent != null) swingjs.api.DOMNode.remove (this.canvas);
this.display = this.canvasId = this.appletViewer.appletName + "_canvas" + ++swingjs.JSFrameViewer.canvasCount;
System.out.println ("JSFrameViewer creating new canvas " + this.canvasId + ": " + width + "  " + height);
this.canvas = swingjs.api.DOMNode.createElement ("canvas", this.canvasId, []);
var iTop = (root == null ? 0 : root.getContentPane ().getY ());
swingjs.api.DOMNode.setPositionAbsolute (this.canvas, iTop, 0);
swingjs.api.DOMNode.setStyles (this.canvas, ["width", width + "px", "height", height + "px"]);
if (parent != null) {
parent.appendChild (this.canvas);
}{
this.canvas.width = width; this.canvas.height = height;
}return this.canvas;
}, "~N,~N");
Clazz.defineStatics (c$,
"canvasCount", 0);
});

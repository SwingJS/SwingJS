Clazz.declarePackage ("swingjs");
Clazz.load (["java.awt.peer.LightweightPeer"], "swingjs.JSComponentPeer", ["swingjs.JSToolkit"], function () {
c$ = Clazz.decorateAsClass (function () {
this.target = null;
this.ui = null;
Clazz.instantialize (this, arguments);
}, swingjs, "JSComponentPeer", null, java.awt.peer.LightweightPeer);
Clazz.makeConstructor (c$, 
function (target) {
this.target = target;
this.ui = swingjs.JSToolkit.getUI (target, false);
}, "java.awt.Component");
Clazz.overrideMethod (c$, "isObscured", 
function () {
return false;
});
Clazz.overrideMethod (c$, "canDetermineObscurity", 
function () {
return false;
});
Clazz.overrideMethod (c$, "setVisible", 
function (b) {
}, "~B");
Clazz.overrideMethod (c$, "setEnabled", 
function (b) {
}, "~B");
Clazz.overrideMethod (c$, "paint", 
function (g) {
}, "java.awt.Graphics");
Clazz.overrideMethod (c$, "repaint", 
function (tm, x, y, width, height) {
}, "~N,~N,~N,~N,~N");
Clazz.overrideMethod (c$, "print", 
function (g) {
}, "java.awt.Graphics");
Clazz.overrideMethod (c$, "setBounds", 
function (x, y, width, height, op) {
}, "~N,~N,~N,~N,~N");
Clazz.overrideMethod (c$, "handleEvent", 
function (e) {
}, "java.awt.AWTEvent");
Clazz.overrideMethod (c$, "coalescePaintEvent", 
function (e) {
}, "java.awt.event.PaintEvent");
Clazz.overrideMethod (c$, "getLocationOnScreen", 
function () {
return null;
});
Clazz.overrideMethod (c$, "getPreferredSize", 
function () {
return null;
});
Clazz.overrideMethod (c$, "getMinimumSize", 
function () {
return null;
});
Clazz.overrideMethod (c$, "getColorModel", 
function () {
return null;
});
Clazz.overrideMethod (c$, "getToolkit", 
function () {
return null;
});
Clazz.overrideMethod (c$, "getGraphics", 
function () {
return null;
});
Clazz.overrideMethod (c$, "getFontMetrics", 
function (font) {
return null;
}, "java.awt.Font");
Clazz.overrideMethod (c$, "dispose", 
function () {
});
Clazz.overrideMethod (c$, "setForeground", 
function (c) {
}, "java.awt.Color");
Clazz.overrideMethod (c$, "setBackground", 
function (c) {
}, "java.awt.Color");
Clazz.overrideMethod (c$, "setFont", 
function (f) {
}, "java.awt.Font");
Clazz.overrideMethod (c$, "updateCursorImmediately", 
function () {
});
Clazz.overrideMethod (c$, "requestFocus", 
function (lightweightChild, temporary, focusedWindowChangeAllowed, time, cause) {
return false;
}, "java.awt.Component,~B,~B,~N,jssun.awt.CausedFocusEvent.Cause");
Clazz.overrideMethod (c$, "isFocusable", 
function () {
return false;
});
Clazz.defineMethod (c$, "createImage", 
function (producer) {
return null;
}, "java.awt.image.ImageProducer");
Clazz.defineMethod (c$, "createImage", 
function (width, height) {
return null;
}, "~N,~N");
Clazz.overrideMethod (c$, "createVolatileImage", 
function (width, height) {
return null;
}, "~N,~N");
Clazz.overrideMethod (c$, "prepareImage", 
function (img, w, h, o) {
return false;
}, "java.awt.Image,~N,~N,java.awt.image.ImageObserver");
Clazz.overrideMethod (c$, "checkImage", 
function (img, w, h, o) {
return 0;
}, "java.awt.Image,~N,~N,java.awt.image.ImageObserver");
Clazz.overrideMethod (c$, "getGraphicsConfiguration", 
function () {
return null;
});
Clazz.overrideMethod (c$, "handlesWheelScrolling", 
function () {
return false;
});
Clazz.overrideMethod (c$, "getBackBuffer", 
function () {
return null;
});
Clazz.overrideMethod (c$, "destroyBuffers", 
function () {
});
Clazz.overrideMethod (c$, "reparent", 
function (newContainer) {
}, "java.awt.peer.ContainerPeer");
Clazz.overrideMethod (c$, "isReparentSupported", 
function () {
return false;
});
Clazz.overrideMethod (c$, "layout", 
function () {
});
Clazz.overrideMethod (c$, "getBounds", 
function () {
return null;
});
});

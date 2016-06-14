Clazz.declarePackage ("swingjs");
Clazz.load (["java.awt.peer.FramePeer"], "swingjs.JSWindowPeer", ["java.lang.Thread", "java.awt.GraphicsEnvironment", "$.Insets", "$.Point", "$.Toolkit"], function () {
c$ = Clazz.decorateAsClass (function () {
this.window = null;
this.isFrame = false;
this.applet = null;
this.graphics = null;
this.font = null;
Clazz.instantialize (this, arguments);
}, swingjs, "JSWindowPeer", null, java.awt.peer.FramePeer);
Clazz.overrideMethod (c$, "setFrame", 
function (target, isFrame) {
this.isFrame = isFrame;
this.window = target;
var jc = this;
jc.myThread = Thread.currentThread ();
jc.threadGroup = jc.myThread.getThreadGroup ();
this.applet = (jc.threadGroup).getHtmlApplet ();
this.graphics = (java.awt.GraphicsEnvironment.getLocalGraphicsEnvironment ()).createGraphicsSized (target, 500, 300);
return this;
}, "java.awt.Window,~B");
Clazz.overrideMethod (c$, "getGraphics", 
function () {
this.graphics.setFont (this.window.getFont ());
return this.graphics;
});
Clazz.overrideMethod (c$, "getToolkit", 
function () {
return java.awt.Toolkit.getDefaultToolkit ();
});
Clazz.overrideMethod (c$, "getFontMetrics", 
function (font) {
if (!font.equals (this.font)) this.window.setFont (this.font = font);
return this.graphics.getFontMetrics (font);
}, "java.awt.Font");
Clazz.overrideMethod (c$, "getInsets", 
function () {
return  new java.awt.Insets (0, 0, 0, 0);
});
Clazz.overrideMethod (c$, "beginValidate", 
function () {
});
Clazz.overrideMethod (c$, "endValidate", 
function () {
});
Clazz.overrideMethod (c$, "beginLayout", 
function () {
});
Clazz.overrideMethod (c$, "endLayout", 
function () {
});
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
return  new java.awt.Point ();
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
this.font = f;
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
Clazz.overrideMethod (c$, "toFront", 
function () {
});
Clazz.overrideMethod (c$, "toBack", 
function () {
});
Clazz.overrideMethod (c$, "updateAlwaysOnTopState", 
function () {
});
Clazz.overrideMethod (c$, "updateFocusableWindowState", 
function () {
});
Clazz.overrideMethod (c$, "requestWindowFocus", 
function () {
return false;
});
Clazz.overrideMethod (c$, "setModalBlocked", 
function (blocker, blocked) {
}, "java.awt.Dialog,~B");
Clazz.overrideMethod (c$, "updateMinimumSize", 
function () {
});
Clazz.overrideMethod (c$, "updateIconImages", 
function () {
});
Clazz.overrideMethod (c$, "setOpacity", 
function (opacity) {
}, "~N");
Clazz.overrideMethod (c$, "setOpaque", 
function (isOpaque) {
}, "~B");
Clazz.overrideMethod (c$, "updateWindow", 
function (backBuffer) {
}, "java.awt.image.BufferedImage");
Clazz.overrideMethod (c$, "repositionSecurityWarning", 
function () {
});
Clazz.overrideMethod (c$, "setTitle", 
function (title) {
}, "~S");
Clazz.overrideMethod (c$, "setMenuBar", 
function (mb) {
}, "~O");
Clazz.overrideMethod (c$, "setResizable", 
function (resizeable) {
}, "~B");
Clazz.overrideMethod (c$, "setState", 
function (state) {
}, "~N");
Clazz.overrideMethod (c$, "getState", 
function () {
return 0;
});
Clazz.overrideMethod (c$, "setMaximizedBounds", 
function (bounds) {
}, "java.awt.Rectangle");
Clazz.overrideMethod (c$, "setBoundsPrivate", 
function (x, y, width, height) {
}, "~N,~N,~N,~N");
Clazz.overrideMethod (c$, "getBoundsPrivate", 
function () {
return null;
});
});

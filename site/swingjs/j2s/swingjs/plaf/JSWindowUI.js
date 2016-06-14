Clazz.declarePackage ("swingjs.plaf");
Clazz.load (["java.awt.peer.WindowPeer", "swingjs.plaf.JSComponentUI"], "swingjs.plaf.JSWindowUI", ["java.lang.Thread", "java.awt.GraphicsEnvironment", "$.Insets", "$.Toolkit"], function () {
c$ = Clazz.decorateAsClass (function () {
this.frameZ = 0;
this.isFrame = false;
this.window = null;
this.applet = null;
this.graphics = null;
this.font = null;
Clazz.instantialize (this, arguments);
}, swingjs.plaf, "JSWindowUI", swingjs.plaf.JSComponentUI, java.awt.peer.WindowPeer);
Clazz.overrideMethod (c$, "setFrame", 
function (target, isFrame) {
this.frameZ = 19000;
this.isFrame = isFrame;
this.window = target;
var jc = this;
jc.myThread = Thread.currentThread ();
jc.threadGroup = jc.myThread.getThreadGroup ();
this.applet = (jc.threadGroup).getHtmlApplet ();
this.graphics = (java.awt.GraphicsEnvironment.getLocalGraphicsEnvironment ()).createGraphicsSized (target, 500, 300);
return this;
}, "java.awt.Window,~B");
Clazz.overrideMethod (c$, "getDOMObject", 
function () {
return null;
});
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
return  new java.awt.Insets (30, 2, 2, 2);
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
Clazz.overrideMethod (c$, "toFront", 
function () {
System.out.println ("window to front for " + this.c.htmlName);
});
Clazz.overrideMethod (c$, "toBack", 
function () {
System.out.println ("window to back for " + this.c.htmlName);
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
Clazz.overrideMethod (c$, "installJSUI", 
function () {
});
Clazz.overrideMethod (c$, "uninstallJSUI", 
function () {
});
});

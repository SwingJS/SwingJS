Clazz.declarePackage ("swingjs.plaf");
Clazz.load (["java.awt.peer.WindowPeer", "swingjs.plaf.JSComponentUI"], "swingjs.plaf.JSWindowUI", ["java.awt.Insets", "$.Toolkit", "swingjs.JSToolkit", "swingjs.api.DOMNode"], function () {
c$ = Clazz.decorateAsClass (function () {
this.frameNode = null;
this.titleBarNode = null;
this.titleNode = null;
this.closerNode = null;
this.layerNode = null;
this.menuBarNode = null;
this.w = null;
this.z = 0;
this.defaultWidth = 400;
this.defaultHeight = 400;
this.isFrame = false;
this.isDialog = false;
this.window = null;
this.font = null;
this.graphics = null;
Clazz.instantialize (this, arguments);
}, swingjs.plaf, "JSWindowUI", swingjs.plaf.JSComponentUI, java.awt.peer.WindowPeer);
Clazz.overrideMethod (c$, "setFrame", 
function (target, isFrame) {
this.window = target;
this.w = this.window;
this.isFrame = isFrame;
this.isContainer = this.isWindow = true;
var jc = this;
var viewer = swingjs.JSToolkit.getAppletViewer ();
this.applet = viewer.html5Applet;
this.graphics = jc.getGraphics ();
return this;
}, "java.awt.Window,~B");
Clazz.overrideMethod (c$, "createDOMNode", 
function () {
if (this.domNode == null) {
this.containerNode = this.domNode = this.createDOMObject ("div", this.id, []);
}return this.domNode;
});
Clazz.overrideMethod (c$, "setHTMLElement", 
function () {
var node = this.setHTMLElementCUI ();
return node;
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
Clazz.overrideMethod (c$, "toFront", 
function () {
System.out.println ("window to front for " + this.jc.htmlName);
});
Clazz.overrideMethod (c$, "toBack", 
function () {
System.out.println ("window to back for " + this.jc.htmlName);
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
Clazz.overrideMethod (c$, "dispose", 
function () {
swingjs.JSToolkit.J2S._jsUnsetMouse (this.domNode);
swingjs.api.DOMNode.remove (this.outerNode);
});
Clazz.overrideMethod (c$, "getInsets", 
function () {
return  new java.awt.Insets (0, 0, 0, 0);
});
});

Clazz.declarePackage ("swingjs.plaf");
Clazz.load (["java.awt.peer.FramePeer", "swingjs.plaf.JSWindowUI"], "swingjs.plaf.JSFrameUI", ["java.awt.Rectangle", "java.awt.event.WindowEvent", "swingjs.JSToolkit", "swingjs.api.DOMNode", "swingjs.plaf.JSComponentUI"], function () {
c$ = Clazz.decorateAsClass (function () {
this.f = null;
this.title = null;
this.state = 0;
this.resizeable = false;
this.bounds = null;
Clazz.instantialize (this, arguments);
}, swingjs.plaf, "JSFrameUI", swingjs.plaf.JSWindowUI, java.awt.peer.FramePeer);
Clazz.makeConstructor (c$, 
function () {
Clazz.superConstructor (this, swingjs.plaf.JSFrameUI, []);
swingjs.plaf.JSComponentUI.frameZ += 1000;
this.z = swingjs.plaf.JSComponentUI.frameZ;
this.isContainer = true;
this.defaultHeight = 500;
this.defaultWidth = 500;
this.setDoc ();
});
Clazz.overrideMethod (c$, "createDOMNode", 
function () {
if (this.domNode == null) {
this.f = this.c;
this.domNode = this.frameNode = this.createDOMObject ("div", this.id + "_frame", []);
swingjs.api.DOMNode.setStyles (this.frameNode, ["z-index", "" + this.z, "border-style", "solid", "border-width", "5px"]);
var w = this.c.getWidth ();
var h = this.c.getHeight ();
if (w == 0) w = this.defaultWidth;
if (h == 0) h = this.defaultHeight;
swingjs.api.DOMNode.setStyles (this.frameNode, ["background", "white"]);
swingjs.api.DOMNode.setSize (this.frameNode, w, h);
swingjs.api.DOMNode.setPositionAbsolute (this.frameNode, this.f.getX (), this.f.getY ());
var vwr = this.jc.getFrameViewer ();
swingjs.api.DOMNode.setAttrs (this.frameNode, ["applet", this.applet, "_frameViewer", vwr]);
swingjs.JSToolkit.J2S._jsSetMouse (this.frameNode, true);
this.titleBarNode = this.createDOMObject ("div", this.id + "_titlebar", []);
swingjs.api.DOMNode.setPositionAbsolute (this.titleBarNode, 0, 0);
swingjs.api.DOMNode.setStyles (this.titleBarNode, ["background-color", "#E0E0E0", "height", "20px", "font-size", "14px", "font-family", "sans-serif", "font-weight", "bold"]);
this.titleNode = this.createDOMObject ("label", this.id + "_title", []);
swingjs.api.DOMNode.setPositionAbsolute (this.titleNode, 0, 0);
swingjs.api.DOMNode.setStyles (this.titleNode, ["width", w + "px", "height", "20px"]);
this.setTitle (this.f.getTitle ());
var closerWrap = this.createDOMObject ("div", this.id + "_closerwrap", []);
swingjs.api.DOMNode.setPositionAbsolute (closerWrap, 0, 0);
swingjs.api.DOMNode.setStyles (closerWrap, ["text-align", "right", "width", w + "px"]);
this.closerNode = this.createDOMObject ("label", this.id + "_closer", ["innerHTML", "X"]);
swingjs.api.DOMNode.setStyles (this.closerNode, ["background-color", "white", "width", "20px", "height", "20px", "position", "absolute", "text-align", "center", "right", "0px"]);
swingjs.api.DOMNode.addJqueryHandledEvent (this, this.closerNode, "click mouseenter mouseout");
this.frameNode.appendChild (this.titleBarNode);
swingjs.JSToolkit.J2S._setDraggable (this.frameNode, this.titleBarNode);
this.titleBarNode.appendChild (this.titleNode);
this.titleBarNode.appendChild (closerWrap);
closerWrap.appendChild (this.closerNode);
var s = this.getInsets ();
swingjs.api.DOMNode.setPositionAbsolute (this.frameNode, this.f.getY () - s.top, this.f.getX () - s.left);
swingjs.api.DOMNode.setAttrs (this.frameNode, ["width", "" + this.f.getWidth () + s.left + s.right, "height", "" + this.f.getHeight () + s.top + s.bottom]);
this.menuBarNode = this.createDOMObject ("div", this.id + "_menubar", []);
this.containerNode = this.frameNode;
}return this.domNode;
});
Clazz.overrideMethod (c$, "handleJSEvent", 
function (target, eventType, jQueryEvent) {
var type = "";
if (target === this.closerNode) {
{
type = jQueryEvent.type;
}System.out.println (this.id + " event " + type);
if (eventType == -1) {
if (type === "click") {
this.f.dispatchEvent ( new java.awt.event.WindowEvent (this.f, 201));
swingjs.JSToolkit.J2S._jsUnsetMouse (this.frameNode);
this.$ (this.frameNode).remove ();
this.$ (this.outerNode).remove ();
return true;
} else if (type.equals ("mouseout")) {
swingjs.api.DOMNode.setStyles (this.closerNode, ["background-color", "white"]);
return true;
} else if (type.equals ("mouseenter")) {
swingjs.api.DOMNode.setStyles (this.closerNode, ["background-color", "red"]);
return true;
}}}return false;
}, "~O,~N,~O");
Clazz.overrideMethod (c$, "installJSUI", 
function () {
});
Clazz.overrideMethod (c$, "setTitle", 
function (title) {
this.title = title;
swingjs.api.DOMNode.setAttr (this.titleNode, "innerHTML", title);
}, "~S");
Clazz.overrideMethod (c$, "setMenuBar", 
function (mb) {
}, "~O");
Clazz.overrideMethod (c$, "setResizable", 
function (resizeable) {
this.resizeable = resizeable;
}, "~B");
Clazz.overrideMethod (c$, "setState", 
function (state) {
this.state = state;
}, "~N");
Clazz.overrideMethod (c$, "getState", 
function () {
return this.state;
});
Clazz.overrideMethod (c$, "setMaximizedBounds", 
function (bounds) {
}, "java.awt.Rectangle");
Clazz.overrideMethod (c$, "setBoundsPrivate", 
function (x, y, width, height) {
this.bounds =  new java.awt.Rectangle (x, y, width, height);
}, "~N,~N,~N,~N");
Clazz.overrideMethod (c$, "getBoundsPrivate", 
function () {
return this.bounds;
});
Clazz.overrideMethod (c$, "getInsets", 
function () {
return this.jc.getFrameViewer ().getInsets ();
});
});

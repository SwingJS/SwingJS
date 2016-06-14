Clazz.declarePackage ("swingjs.plaf");
Clazz.load (["java.awt.peer.FramePeer", "swingjs.plaf.JSWindowUI"], "swingjs.plaf.JSFrameUI", ["swingjs.api.DOMNode"], function () {
c$ = Clazz.declareType (swingjs.plaf, "JSFrameUI", swingjs.plaf.JSWindowUI, java.awt.peer.FramePeer);
Clazz.makeConstructor (c$, 
function () {
Clazz.superConstructor (this, swingjs.plaf.JSFrameUI, []);
this.frameZ = 19000;
this.isContainer = true;
this.setDoc ();
});
Clazz.overrideMethod (c$, "getDOMObject", 
function () {
if (this.domNode == null) this.domNode = this.createDOMObject ("div", this.id, []);
swingjs.api.DOMNode.setStyles (this.domNode, ["z-index", "" + this.frameZ++]);
this.outerNode = this.wrap ("div", this.id, [this.domNode]);
this.$ (this.body).append (this.outerNode);
return this.domNode;
});
Clazz.overrideMethod (c$, "installJSUI", 
function () {
});
Clazz.overrideMethod (c$, "uninstallJSUI", 
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

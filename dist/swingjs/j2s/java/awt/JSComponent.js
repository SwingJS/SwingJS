Clazz.declarePackage ("java.awt");
Clazz.load (["java.awt.Component", "swingjs.JSToolkit"], "java.awt.JSComponent", ["javax.swing.UIManager"], function () {
c$ = Clazz.decorateAsClass (function () {
this.htmlName = null;
this.num = 0;
this.isRootPane = false;
this.isContentPane = false;
this.canvas = null;
this.frameViewer = null;
this.appletViewer = null;
this.ui = null;
this.uiClassID = "JSComponentUI";
this.isBackgroundPainted = false;
Clazz.instantialize (this, arguments);
}, java.awt, "JSComponent", java.awt.Component);
Clazz.prepareFields (c$, function () {
this.appletViewer = swingjs.JSToolkit.getAppletViewer ();
});
Clazz.makeConstructor (c$, 
function () {
Clazz.superConstructor (this, java.awt.JSComponent);
this.num = ++java.awt.JSComponent.incr;
});
Clazz.overrideMethod (c$, "getGraphics", 
function () {
if (this.width == 0 || this.height == 0 || !this.isVisible ()) return null;
if (this.frameViewer != null) return this.frameViewer.getGraphics (0, 0).create ();
if (this.parent == null) return null;
var g = this.parent.getGraphics ();
if (g == null) return null;
g.translate (this.x, this.y);
g.setClip (0, 0, this.width, this.height);
g.setFont (this.getFont ());
return g;
});
Clazz.defineMethod (c$, "getFrameViewer", 
function () {
var parent = null;
return (this.frameViewer != null ? this.frameViewer : (parent = this.getParent ()) == null ? null : (this.frameViewer = parent.getFrameViewer ()));
});
Clazz.defineMethod (c$, "getHTMLName", 
function (uid) {
return (this.htmlName == null ? this.htmlName = this.appContext.getThreadGroup ().getName () + "_" + uid + "_" + this.num : this.htmlName);
}, "~S");
Clazz.defineMethod (c$, "getUIClassID", 
function () {
return this.uiClassID;
});
Clazz.defineMethod (c$, "setUI", 
function (ui) {
this.ui = ui;
}, "javax.swing.plaf.ComponentUI");
Clazz.defineMethod (c$, "getUI", 
function () {
return this.ui;
});
Clazz.defineMethod (c$, "updateUI", 
function () {
this.setUI (javax.swing.UIManager.getUI (this));
});
Clazz.defineMethod (c$, "setIsPainted", 
function (TF) {
this.isBackgroundPainted = TF;
}, "~B");
Clazz.overrideMethod (c$, "isBackgroundSet", 
function () {
return false;
});
Clazz.defineStatics (c$,
"incr", 0);
});

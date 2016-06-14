Clazz.declarePackage ("swingjs.plaf");
Clazz.load (["swingjs.plaf.JSLightweightUI"], "swingjs.plaf.JSRootPaneUI", ["swingjs.JSToolkit", "swingjs.api.DOMNode"], function () {
c$ = Clazz.decorateAsClass (function () {
this.root = null;
Clazz.instantialize (this, arguments);
}, swingjs.plaf, "JSRootPaneUI", swingjs.plaf.JSLightweightUI);
Clazz.makeConstructor (c$, 
function () {
Clazz.superConstructor (this, swingjs.plaf.JSRootPaneUI, []);
this.isContainer = true;
this.setDoc ();
});
Clazz.overrideMethod (c$, "getDOMObject", 
function () {
this.root = this.c;
if (this.domNode == null) {
this.domNode = this.createDOMObject ("div", this.id, []);
this.outerNode = this.wrap ("div", this.id, [this.domNode]);
if (this.root.isAppletRoot) {
swingjs.JSToolkit.getHTML5Applet (this.c)._getContentLayer ().appendChild (this.outerNode);
} else {
var parent = this.c.getParent ();
var parentUI = parent.getUI ();
swingjs.api.DOMNode.add (parentUI.domNode, this.outerNode);
}}return this.domNode;
});
Clazz.overrideMethod (c$, "installJSUI", 
function () {
});
Clazz.overrideMethod (c$, "uninstallJSUI", 
function () {
});
});

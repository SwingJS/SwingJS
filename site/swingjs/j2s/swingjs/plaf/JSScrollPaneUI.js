Clazz.declarePackage ("swingjs.plaf");
Clazz.load (["swingjs.plaf.JSLightweightUI"], "swingjs.plaf.JSScrollPaneUI", ["swingjs.JSToolkit", "swingjs.api.DOMNode"], function () {
c$ = Clazz.decorateAsClass (function () {
this.scrolledComponent = null;
this.scrollpane = null;
this.viewport = null;
this.scrolledUI = null;
Clazz.instantialize (this, arguments);
}, swingjs.plaf, "JSScrollPaneUI", swingjs.plaf.JSLightweightUI);
Clazz.overrideMethod (c$, "getDOMObject", 
function () {
this.isContainer = true;
this.scrollpane = this.c;
if (this.domNode == null) {
this.domNode = this.createDOMObject ("div", this.id, []);
}var v = this.scrollpane.getViewport ();
if (v != null) {
this.viewport = v;
System.out.println ("JSScrollPaneUI v=" + v);
var sc = null;
try {
sc = v.getComponent (0);
} catch (e) {
if (Clazz.exceptionOf (e, Exception)) {
} else {
throw e;
}
}
if (sc != null && sc !== this.scrolledComponent) {
this.scrolledComponent = sc;
this.scrolledUI = swingjs.JSToolkit.getUI (sc, false);
this.scrollNode = this.scrolledUI.getOuterNode ();
swingjs.api.DOMNode.setSize (this.scrollNode, this.c.getWidth (), this.c.getHeight ());
this.scrolledUI.scrollerNode = this;
this.components = [this.scrolledComponent];
}}return this.domNode;
});
Clazz.overrideMethod (c$, "installJSUI", 
function () {
});
Clazz.overrideMethod (c$, "uninstallJSUI", 
function () {
});
});

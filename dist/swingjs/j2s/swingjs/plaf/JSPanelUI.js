Clazz.declarePackage ("swingjs.plaf");
Clazz.load (["swingjs.plaf.JSLightweightUI"], "swingjs.plaf.JSPanelUI", ["java.awt.Dimension", "javax.swing.LookAndFeel", "swingjs.api.DOMNode"], function () {
c$ = Clazz.decorateAsClass (function () {
this.$frameZ = 10000;
Clazz.instantialize (this, arguments);
}, swingjs.plaf, "JSPanelUI", swingjs.plaf.JSLightweightUI);
Clazz.makeConstructor (c$, 
function () {
Clazz.superConstructor (this, swingjs.plaf.JSPanelUI, []);
this.isContainer = true;
this.setDoc ();
});
Clazz.overrideMethod (c$, "createDOMNode", 
function () {
if (this.domNode == null) {
var root = this.jc.getRootPane ();
this.domNode = this.createDOMObject ("div", this.id, []);
if (root != null && root.getGlassPane () === this.c) swingjs.api.DOMNode.setStyles (this.domNode, ["display", "none"]);
}return this.domNode;
});
Clazz.overrideMethod (c$, "setHTMLSize", 
function (obj, addCSS) {
return  new java.awt.Dimension (this.c.getWidth (), this.c.getHeight ());
}, "swingjs.api.DOMNode,~B");
Clazz.overrideMethod (c$, "getPreferredSize", 
function () {
return null;
});
Clazz.overrideMethod (c$, "installJSUI", 
function () {
javax.swing.LookAndFeel.installColorsAndFont (this.jc, "Panel.background", "Panel.foreground", "Panel.font");
});
Clazz.overrideMethod (c$, "uninstallJSUI", 
function () {
});
});

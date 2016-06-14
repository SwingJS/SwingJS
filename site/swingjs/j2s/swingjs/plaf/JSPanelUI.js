Clazz.declarePackage ("swingjs.plaf");
Clazz.load (["swingjs.plaf.JSLightweightUI"], "swingjs.plaf.JSPanelUI", ["java.awt.Dimension", "javax.swing.LookAndFeel"], function () {
c$ = Clazz.decorateAsClass (function () {
this.frameZ = 10000;
this.isContentPane = false;
Clazz.instantialize (this, arguments);
}, swingjs.plaf, "JSPanelUI", swingjs.plaf.JSLightweightUI);
Clazz.makeConstructor (c$, 
function () {
Clazz.superConstructor (this, swingjs.plaf.JSPanelUI, []);
this.isContainer = true;
this.setDoc ();
});
Clazz.overrideMethod (c$, "getDOMObject", 
function () {
if (this.domNode == null) {
var root = this.c.getRootPane ();
this.isContentPane = (root != null && root.getContentPane () === this.c);
this.domNode = this.createDOMObject ("label", this.id, []);
}return this.domNode;
});
Clazz.overrideMethod (c$, "setHTMLSize", 
function (obj, addCSS) {
return  new java.awt.Dimension (this.c.getWidth (), this.c.getHeight ());
}, "swingjs.api.DOMNode,~B");
Clazz.defineMethod (c$, "getPreferredSize", 
function (c) {
return null;
}, "javax.swing.JComponent");
Clazz.overrideMethod (c$, "installJSUI", 
function () {
javax.swing.LookAndFeel.installColorsAndFont (this.c, "Panel.background", "Panel.foreground", "Panel.font");
});
Clazz.overrideMethod (c$, "uninstallJSUI", 
function () {
});
});

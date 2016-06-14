Clazz.declarePackage ("swingjs.plaf");
Clazz.load (["swingjs.plaf.JSPanelUI"], "swingjs.plaf.JSMenuBarUI", ["java.awt.Dimension", "javax.swing.LookAndFeel"], function () {
c$ = Clazz.declareType (swingjs.plaf, "JSMenuBarUI", swingjs.plaf.JSPanelUI);
Clazz.makeConstructor (c$, 
function () {
Clazz.superConstructor (this, swingjs.plaf.JSMenuBarUI, []);
this.isContainer = true;
this.setDoc ();
});
Clazz.overrideMethod (c$, "getDOMObject", 
function () {
if (this.domNode == null) this.domNode = this.createDOMObject ("div", this.id, []);
return this.domNode;
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
javax.swing.LookAndFeel.installColorsAndFont (this.c, "MenuBar.background", "MenuBar.foreground", "MenuBar.font");
});
Clazz.overrideMethod (c$, "uninstallJSUI", 
function () {
});
});

Clazz.declarePackage ("swingjs.plaf");
Clazz.load (["swingjs.plaf.JSWindowUI"], "swingjs.plaf.JSPopupMenuUI", ["java.awt.Dimension", "javax.swing.LookAndFeel"], function () {
c$ = Clazz.declareType (swingjs.plaf, "JSPopupMenuUI", swingjs.plaf.JSWindowUI);
Clazz.makeConstructor (c$, 
function () {
Clazz.superConstructor (this, swingjs.plaf.JSPopupMenuUI, []);
this.isContainer = true;
this.setDoc ();
});
Clazz.overrideMethod (c$, "createDOMNode", 
function () {
if (this.domNode == null) this.domNode = this.createDOMObject ("select", this.id, []);
return this.domNode;
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
javax.swing.LookAndFeel.installColorsAndFont (this.jc, "PopupMenu.background", "PopupMenu.foreground", "PopupMenu.font");
});
Clazz.overrideMethod (c$, "uninstallJSUI", 
function () {
});
Clazz.defineMethod (c$, "getPopup", 
function () {
return null;
});
});

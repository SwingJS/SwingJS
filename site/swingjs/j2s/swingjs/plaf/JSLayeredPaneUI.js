Clazz.declarePackage ("swingjs.plaf");
Clazz.load (["swingjs.plaf.JSLightweightUI"], "swingjs.plaf.JSLayeredPaneUI", null, function () {
c$ = Clazz.declareType (swingjs.plaf, "JSLayeredPaneUI", swingjs.plaf.JSLightweightUI);
Clazz.makeConstructor (c$, 
function () {
Clazz.superConstructor (this, swingjs.plaf.JSLayeredPaneUI, []);
this.isContainer = true;
});
Clazz.overrideMethod (c$, "getDOMObject", 
function () {
if (this.domNode == null) {
this.domNode = this.createDOMObject ("div", this.id, []);
}return this.domNode;
});
Clazz.overrideMethod (c$, "installJSUI", 
function () {
});
Clazz.overrideMethod (c$, "uninstallJSUI", 
function () {
});
});

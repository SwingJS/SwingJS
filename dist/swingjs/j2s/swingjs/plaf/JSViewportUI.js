Clazz.declarePackage ("swingjs.plaf");
Clazz.load (["swingjs.plaf.JSLightweightUI"], "swingjs.plaf.JSViewportUI", null, function () {
c$ = Clazz.declareType (swingjs.plaf, "JSViewportUI", swingjs.plaf.JSLightweightUI);
Clazz.overrideMethod (c$, "createDOMNode", 
function () {
if (this.domNode == null) this.domNode = this.createDOMObject ("div", this.id, []);
return this.domNode;
});
Clazz.overrideMethod (c$, "installJSUI", 
function () {
});
Clazz.overrideMethod (c$, "uninstallJSUI", 
function () {
});
});

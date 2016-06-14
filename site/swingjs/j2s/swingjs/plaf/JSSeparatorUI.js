Clazz.declarePackage ("swingjs.plaf");
Clazz.load (["swingjs.plaf.JSLabelUI"], "swingjs.plaf.JSSeparatorUI", ["swingjs.api.DOMNode"], function () {
c$ = Clazz.declareType (swingjs.plaf, "JSSeparatorUI", swingjs.plaf.JSLabelUI);
Clazz.overrideMethod (c$, "getDOMObject", 
function () {
if (this.domNode == null) this.textNode = this.domNode = this.createDOMObject ("label", this.id, []);
swingjs.plaf.JSComponentUI.vCenter (this.domNode, 10);
return this.setCssFont (swingjs.api.DOMNode.setAttr (this.domNode, "innerHTML", (this.c).getText ()), this.c.getFont ());
});
Clazz.overrideMethod (c$, "installJSUI", 
function () {
});
Clazz.overrideMethod (c$, "uninstallJSUI", 
function () {
});
});

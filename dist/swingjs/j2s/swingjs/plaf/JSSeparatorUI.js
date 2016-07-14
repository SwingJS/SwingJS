Clazz.declarePackage ("swingjs.plaf");
Clazz.load (["swingjs.plaf.JSLightweightUI"], "swingjs.plaf.JSSeparatorUI", ["swingjs.api.DOMNode"], function () {
c$ = Clazz.decorateAsClass (function () {
this.js = null;
this.text = null;
Clazz.instantialize (this, arguments);
}, swingjs.plaf, "JSSeparatorUI", swingjs.plaf.JSLightweightUI);
Clazz.overrideMethod (c$, "createDOMNode", 
function () {
if (this.domNode == null) {
this.textNode = this.domNode = this.createDOMObject ("label", this.id, []);
this.js = this.c;
this.text = (this.js.getOrientation () == 0 ? "|" : "-----------");
}swingjs.plaf.JSComponentUI.vCenter (this.domNode, 10);
return this.setCssFont (swingjs.api.DOMNode.setAttr (this.domNode, "innerHTML", this.text), this.c.getFont ());
});
Clazz.overrideMethod (c$, "installJSUI", 
function () {
});
Clazz.overrideMethod (c$, "uninstallJSUI", 
function () {
});
});

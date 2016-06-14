Clazz.declarePackage ("swingjs.plaf");
Clazz.load (["swingjs.plaf.JSTextUI"], "swingjs.plaf.JSTextAreaUI", ["swingjs.api.DOMNode"], function () {
c$ = Clazz.decorateAsClass (function () {
this.domBtn = null;
Clazz.instantialize (this, arguments);
}, swingjs.plaf, "JSTextAreaUI", swingjs.plaf.JSTextUI);
Clazz.overrideMethod (c$, "getDOMObject", 
function () {
if (this.domNode == null) {
this.updateHandler.checkDocument ();
this.domBtn = this.focusNode = this.enableNode = this.textNode = this.domNode = this.createDOMObject ("textarea", this.id, []);
this.bindMouse (this.domNode);
if ((this.c).isEditable ()) {
this.bindKeys (this.domNode);
this.setFocusable ();
}}this.setCssFont (swingjs.api.DOMNode.setAttr (this.domNode, "innerHTML", this.getComponentText ()), this.c.getFont ());
if (!this.editable) swingjs.api.DOMNode.setAttr (this.domNode, "readOnly", "true");
return this.domNode;
});
});

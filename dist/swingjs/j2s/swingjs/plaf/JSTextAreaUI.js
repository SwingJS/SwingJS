Clazz.declarePackage ("swingjs.plaf");
Clazz.load (["swingjs.plaf.JSTextUI", "java.awt.Insets"], "swingjs.plaf.JSTextAreaUI", ["java.awt.Dimension", "swingjs.api.DOMNode"], function () {
c$ = Clazz.decorateAsClass (function () {
this.$domBtn = null;
this.myInsets = null;
Clazz.instantialize (this, arguments);
}, swingjs.plaf, "JSTextAreaUI", swingjs.plaf.JSTextUI);
Clazz.prepareFields (c$, function () {
this.myInsets =  new java.awt.Insets (0, 0, 5, 5);
});
Clazz.overrideMethod (c$, "createDOMNode", 
function () {
if (this.domNode == null) {
this.updateHandler.checkDocument ();
this.$domBtn = this.focusNode = this.enableNode = this.textNode = this.domNode = this.createDOMObject ("textarea", this.id, []);
swingjs.api.DOMNode.setStyles (this.domNode, ["resize", "none"]);
this.setDataUI (this.domNode);
if ((this.c).isEditable ()) {
this.bindKeys (this.domNode);
this.setFocusable ();
}}this.setCssFont (swingjs.api.DOMNode.setAttr (this.domNode, "innerHTML", this.getComponentText ()), this.c.getFont ());
if (!this.editable) swingjs.api.DOMNode.setAttr (this.domNode, "readOnly", "true");
return this.domNode;
});
Clazz.overrideMethod (c$, "getInsets", 
function () {
return this.myInsets;
});
Clazz.overrideMethod (c$, "getCSSDimension", 
function (w, h) {
return  new java.awt.Dimension (w - 5, h - 5);
}, "~N,~N");
});

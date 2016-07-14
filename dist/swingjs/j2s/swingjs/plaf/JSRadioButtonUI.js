Clazz.declarePackage ("swingjs.plaf");
Clazz.load (["swingjs.plaf.JSButtonUI"], "swingjs.plaf.JSRadioButtonUI", ["java.util.HashMap", "javax.swing.DefaultButtonModel", "swingjs.api.DOMNode"], function () {
c$ = Clazz.decorateAsClass (function () {
this.label = null;
this.wrapper = null;
Clazz.instantialize (this, arguments);
}, swingjs.plaf, "JSRadioButtonUI", swingjs.plaf.JSButtonUI);
Clazz.overrideMethod (c$, "createDOMNode", 
function () {
this.isRadio = true;
return this.getButtonObject ("radio");
});
Clazz.overrideMethod (c$, "getPropertyPrefix", 
function () {
return "RadioButton.";
});
Clazz.overrideMethod (c$, "setHTMLSize", 
function (obj, addCSS) {
swingjs.api.DOMNode.setStyles (this.domBtn, ["position", null, "width", null, "height", null]);
swingjs.api.DOMNode.setStyles (this.textNode, ["position", null, "width", null, "height", null]);
swingjs.api.DOMNode.setStyles (this.label, ["position", null, "width", null, "height", null]);
var d = this.setHTMLSize1 (obj, addCSS, false);
swingjs.api.DOMNode.setPositionAbsolute (this.domBtn, -1, -1);
swingjs.api.DOMNode.setPositionAbsolute (this.textNode, -1, -1);
swingjs.api.DOMNode.setPositionAbsolute (this.label, -1, -1);
return d;
}, "swingjs.api.DOMNode,~B");
Clazz.defineMethod (c$, "getButtonObject", 
function (myType) {
var b = this.c;
var isNew = false;
var doAll = false;
if (this.domNode == null) {
doAll = true;
if (swingjs.plaf.JSRadioButtonUI.groupNames == null) swingjs.plaf.JSRadioButtonUI.groupNames =  new java.util.HashMap ();
var bg = null;
var name = this.id;
if (Clazz.instanceOf (b.getModel (), javax.swing.DefaultButtonModel)) {
bg = (b.getModel ()).getGroup ();
name = swingjs.plaf.JSRadioButtonUI.groupNames.get (bg);
isNew = (bg != null && name == null);
if (isNew) swingjs.plaf.JSRadioButtonUI.groupNames.put (bg, name = this.id);
}this.domBtn = this.enableNode = this.createDOMObject ("input", this.id, ["type", myType, "name", name]);
this.setDataComponent (this.domBtn);
this.textNode = this.createDOMObject ("label", this.id + "l", []);
this.label = this.createDOMObject ("label", this.id + "2", ["htmlFor", this.id]);
this.label.appendChild (this.domBtn);
this.label.appendChild (this.textNode);
this.setDataComponent (this.label);
this.wrapper = (this.hasOuterDiv ? this.label : this.createItem ("_item", this.label));
}if (b.isSelected () || isNew) swingjs.api.DOMNode.setAttr (this.domBtn, "checked", "true");
this.setCssFont (swingjs.api.DOMNode.setAttr (this.textNode, "innerHTML", (this.c).getText ()), this.c.getFont ());
var drad = this.setHTMLSize1 (this.domBtn, false, false);
this.setHTMLSize1 (this.textNode, false, false);
var obj = this.wrap ("div", "", [this.domBtn, this.textNode]);
var dobj = this.setHTMLSize1 (obj, true, true);
this.label.appendChild (this.domBtn);
this.label.appendChild (this.textNode);
swingjs.api.DOMNode.setStyles (this.textNode, ["left", drad.width + "px"]);
swingjs.plaf.JSComponentUI.vCenter (this.domBtn, -75);
swingjs.plaf.JSComponentUI.vCenter (this.textNode, -50);
swingjs.api.DOMNode.setPositionAbsolute (this.domBtn, -1, -1);
swingjs.api.DOMNode.setPositionAbsolute (this.textNode, -1, -1);
swingjs.api.DOMNode.setPositionAbsolute (this.label, -1, -1);
if (doAll) {
this.domNode = obj = (this.hasOuterDiv ? this.wrap ("div", this.id + "_0", [this.label]) : this.wrapper);
if (this.hasOuterDiv) swingjs.api.DOMNode.setPositionAbsolute (obj, -1, -1);
} else {
obj = this.domNode;
}swingjs.api.DOMNode.setSize (this.label, dobj.width, dobj.height);
return swingjs.api.DOMNode.setSize (obj, dobj.width, dobj.height);
}, "~S");
Clazz.defineStatics (c$,
"groupNames", null);
});

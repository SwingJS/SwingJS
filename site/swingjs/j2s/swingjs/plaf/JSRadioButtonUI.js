Clazz.declarePackage ("swingjs.plaf");
Clazz.load (["swingjs.plaf.JSButtonUI"], "swingjs.plaf.JSRadioButtonUI", ["java.util.HashMap", "javax.swing.DefaultButtonModel", "swingjs.api.DOMNode"], function () {
c$ = Clazz.decorateAsClass (function () {
this.wrapper = null;
Clazz.instantialize (this, arguments);
}, swingjs.plaf, "JSRadioButtonUI", swingjs.plaf.JSButtonUI);
Clazz.overrideMethod (c$, "getDOMObject", 
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
swingjs.api.DOMNode.setStyles (this.domBtn, ["position", null]);
swingjs.api.DOMNode.setStyles (this.textNode, ["position", null]);
swingjs.api.DOMNode.setStyles (this.wrapper, ["position", null]);
var d = this.setHTMLSize1 (obj, addCSS, false);
swingjs.api.DOMNode.setPositionAbsolute (this.domBtn);
swingjs.api.DOMNode.setPositionAbsolute (this.textNode);
swingjs.api.DOMNode.setPositionAbsolute (this.wrapper);
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
isNew = true;
if (Clazz.instanceOf (b.getModel (), javax.swing.DefaultButtonModel)) {
bg = (b.getModel ()).getGroup ();
name = swingjs.plaf.JSRadioButtonUI.groupNames.get (bg);
if (name == null) swingjs.plaf.JSRadioButtonUI.groupNames.put (bg, name = this.id);
 else isNew = false;
}this.domBtn = this.enableNode = this.createDOMObject ("input", this.id, ["type", myType, "name", name]);
this.textNode = this.createDOMObject ("label", this.id + "l", []);
this.wrapper = this.createDOMObject ("label", this.id + "2", ["htmlFor", this.id]);
swingjs.api.DOMNode.add (this.wrapper, this.domBtn);
swingjs.api.DOMNode.add (this.wrapper, this.textNode);
}if (b.isSelected () || isNew) swingjs.api.DOMNode.setAttr (this.domBtn, "checked", "true");
this.setCssFont (swingjs.api.DOMNode.setAttr (this.textNode, "innerHTML", (this.c).getText ()), this.c.getFont ());
var drad = this.setHTMLSize1 (this.domBtn, false, false);
this.setHTMLSize1 (this.textNode, false, false);
var obj = this.wrap ("div", "", [this.domBtn, this.textNode]);
var dobj = this.setHTMLSize1 (obj, true, true);
swingjs.api.DOMNode.add (this.wrapper, this.domBtn);
swingjs.api.DOMNode.add (this.wrapper, this.textNode);
swingjs.api.DOMNode.setStyles (this.textNode, ["left", drad.width + "px"]);
swingjs.plaf.JSComponentUI.vCenter (this.domBtn, -75);
swingjs.plaf.JSComponentUI.vCenter (this.textNode, -50);
swingjs.api.DOMNode.setPositionAbsolute (this.domBtn);
swingjs.api.DOMNode.setPositionAbsolute (this.textNode);
swingjs.api.DOMNode.setPositionAbsolute (this.wrapper);
if (doAll) {
obj = this.wrap ("div", this.id + "_0", [this.wrapper]);
swingjs.api.DOMNode.setPositionAbsolute (obj);
} else {
obj = this.domNode;
}swingjs.api.DOMNode.setSize (this.wrapper, dobj.width, dobj.height);
return swingjs.api.DOMNode.setSize (obj, dobj.width, dobj.height);
}, "~S");
Clazz.defineStatics (c$,
"groupNames", null);
});

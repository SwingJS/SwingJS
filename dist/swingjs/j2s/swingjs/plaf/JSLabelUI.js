Clazz.declarePackage ("swingjs.plaf");
Clazz.load (["swingjs.plaf.JSLightweightUI"], "swingjs.plaf.JSLabelUI", ["javax.swing.LookAndFeel", "swingjs.api.DOMNode"], function () {
c$ = Clazz.decorateAsClass (function () {
this.label = null;
Clazz.instantialize (this, arguments);
}, swingjs.plaf, "JSLabelUI", swingjs.plaf.JSLightweightUI);
Clazz.overrideMethod (c$, "createDOMNode", 
function () {
this.label = this.c;
if (this.domNode == null) this.textNode = this.domNode = this.createDOMObject ("label", this.id, []);
swingjs.plaf.JSComponentUI.vCenter (this.domNode, 10);
swingjs.api.DOMNode.setStyles (this.domNode, ["width", this.c.getWidth () + "px", "height", this.c.getHeight () + "px"]);
return this.setCssFont (swingjs.api.DOMNode.setAttr (this.domNode, "innerHTML", (this.c).getText ()), this.c.getFont ());
});
Clazz.overrideMethod (c$, "notifyPropertyChanged", 
function (prop) {
var isVert = (prop.indexOf ("vert") >= 0);
var isAlign = (prop.indexOf ("Ali") >= 0);
if (isAlign && !isVert) {
this.setTainted ();
this.setHTMLElement ();
} else {
this.notifyPropChangeCUI (prop);
}}, "~S");
Clazz.overrideMethod (c$, "setHTMLElement", 
function () {
this.domNode = this.setHTMLElementCUI ();
var prop = null;
switch (this.label.getHorizontalAlignment ()) {
case 4:
case 11:
prop = "right";
break;
case 2:
case 10:
prop = "left";
break;
case 0:
prop = "center";
break;
}
if (prop != null) swingjs.api.DOMNode.setStyles (this.domNode, ["width", this.c.getWidth () + "px", "text-align", prop]);
return this.domNode;
});
Clazz.overrideMethod (c$, "installJSUI", 
function () {
javax.swing.LookAndFeel.installColorsAndFont (this.jc, null, null, "Label.font");
});
Clazz.overrideMethod (c$, "uninstallJSUI", 
function () {
});
});

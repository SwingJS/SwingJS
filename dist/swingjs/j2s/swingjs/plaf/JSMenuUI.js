Clazz.declarePackage ("swingjs.plaf");
Clazz.load (["swingjs.plaf.JSMenuItemUI", "swingjs.jquery.JQueryUI"], "swingjs.plaf.JSMenuUI", ["swingjs.api.DOMNode"], function () {
c$ = Clazz.decorateAsClass (function () {
this.jm = null;
this.childWidth = 0;
Clazz.instantialize (this, arguments);
}, swingjs.plaf, "JSMenuUI", swingjs.plaf.JSMenuItemUI);
Clazz.makeConstructor (c$, 
function () {
Clazz.superConstructor (this, swingjs.plaf.JSMenuUI, []);
this.hasOuterDiv = false;
this.isContainer = true;
this.setDoc ();
});
Clazz.overrideMethod (c$, "createDOMNode", 
function () {
if (this.domNode == null) {
this.menuItem = this.c;
this.jm = this.jc;
this.domNode = this.createItem ("_menu", null);
this.containerNode = this.createDOMObject ("ul", this.id, []);
this.domNode.appendChild (this.containerNode);
}this.setChildWidth ();
return this.domNode;
});
Clazz.defineMethod (c$, "setChildWidth", 
 function () {
this.children = this.jm.getPopupMenu ().getComponents ();
var wmax = 50;
for (var i = this.children.length; --i >= 0; ) {
var child = this.children[i];
var d = child.getPreferredSize ();
if (d.width > wmax) wmax = d.width;
}
this.childWidth = wmax;
});
Clazz.overrideMethod (c$, "getContainerWidth", 
function () {
var d = this.setHTMLSize1 (this.domNode, false, false);
swingjs.api.DOMNode.setStyles (this.containerNode, ["width", this.childWidth + "px", "left", (this.c.getParent ().uiClassID === "MenuBarUI" ? 0 : d.width) + "px"]);
return d.width;
});
});

Clazz.declarePackage ("swingjs.plaf");
Clazz.load (["swingjs.plaf.JSButtonUI"], "swingjs.plaf.JSMenuItemUI", ["java.awt.Dimension"], function () {
c$ = Clazz.declareType (swingjs.plaf, "JSMenuItemUI", swingjs.plaf.JSButtonUI);
Clazz.overrideMethod (c$, "createDOMNode", 
function () {
if (this.domNode == null) {
this.menuItem = this.c;
this.domNode = this.createItem ("_item", null);
this.hasOuterDiv = false;
}return this.domNode;
});
Clazz.overrideMethod (c$, "getContainerHeight", 
function () {
return this.height = 25;
});
Clazz.overrideMethod (c$, "getCSSDimension", 
function (w, h) {
return  new java.awt.Dimension (w + 5, h);
}, "~N,~N");
});

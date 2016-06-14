Clazz.declarePackage ("swingjs.plaf");
Clazz.load (["swingjs.plaf.JSFrameUI"], "swingjs.plaf.JSDialogUI", ["swingjs.api.DOMNode"], function () {
c$ = Clazz.declareType (swingjs.plaf, "JSDialogUI", swingjs.plaf.JSFrameUI);
Clazz.makeConstructor (c$, 
function () {
Clazz.superConstructor (this, swingjs.plaf.JSDialogUI, []);
this.frameZ = 40000;
this.isContainer = true;
this.setDoc ();
});
Clazz.overrideMethod (c$, "getDOMObject", 
function () {
if (this.domNode == null) this.domNode = this.createDOMObject ("div", this.id, []);
this.outerNode = this.wrap ("div", this.id, [this.domNode]);
swingjs.api.DOMNode.setStyles (this.outerNode, ["z-index", "" + this.frameZ++]);
this.$ (this.body).append (this.outerNode);
return this.domNode;
});
Clazz.overrideMethod (c$, "installJSUI", 
function () {
});
Clazz.overrideMethod (c$, "uninstallJSUI", 
function () {
});
});

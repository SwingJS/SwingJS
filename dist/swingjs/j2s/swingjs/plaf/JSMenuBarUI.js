Clazz.declarePackage ("swingjs.plaf");
Clazz.load (["swingjs.plaf.JSPanelUI"], "swingjs.plaf.JSMenuBarUI", ["java.awt.Dimension", "javax.swing.LookAndFeel", "swingjs.JSToolkit", "swingjs.api.DOMNode"], function () {
c$ = Clazz.declareType (swingjs.plaf, "JSMenuBarUI", swingjs.plaf.JSPanelUI);
Clazz.makeConstructor (c$, 
function () {
Clazz.superConstructor (this, swingjs.plaf.JSMenuBarUI, []);
this.isContainer = true;
this.setDoc ();
});
Clazz.overrideMethod (c$, "createDOMNode", 
function () {
if (this.domNode == null) {
this.containerNode = this.domNode = this.createDOMObject ("div", this.id, []);
swingjs.api.DOMNode.setPositionAbsolute (this.domNode, 0, 0);
this.$ (this.domNode).addClass ("swingjs-menu");
}return this.domNode;
});
Clazz.defineMethod (c$, "setMenu", 
 function () {
{
$(".swingjs-menu ul").css({display: "none"});
$(".swingjs-menu li").hover(
function(){$(this).find('ul:first').css({visibility: "visible",display: "none"}).show();},
function(){$(this).find('ul:first').css({visibility: "hidden"});}
);
}});
Clazz.overrideMethod (c$, "installJSUI", 
function () {
javax.swing.LookAndFeel.installColorsAndFont (this.jc, "MenuBar.background", "MenuBar.foreground", "MenuBar.font");
});
Clazz.overrideMethod (c$, "uninstallJSUI", 
function () {
});
Clazz.overrideMethod (c$, "getContainerHeight", 
function () {
return this.height = 25;
});
Clazz.overrideMethod (c$, "setHTMLSize", 
function (obj, addCSS) {
this.setMenu ();
return  new java.awt.Dimension (150, 25);
}, "swingjs.api.DOMNode,~B");
Clazz.overrideMethod (c$, "getPreferredSize", 
function () {
var d =  new java.awt.Dimension (0, 25);
return d;
});
{
swingjs.JSToolkit.getJavaResource ("swingjs/jquery/swingjs-menu.css", true);
}});

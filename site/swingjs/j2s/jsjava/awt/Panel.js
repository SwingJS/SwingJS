Clazz.declarePackage ("jsjava.awt");
Clazz.load (["jsjava.awt.Container"], "jsjava.awt.Panel", ["jsjava.awt.FlowLayout"], function () {
c$ = Clazz.declareType (jsjava.awt, "Panel", jsjava.awt.Container);
Clazz.makeConstructor (c$, 
function () {
this.construct ( new jsjava.awt.FlowLayout ());
});
Clazz.makeConstructor (c$, 
function (layout) {
Clazz.superConstructor (this, jsjava.awt.Panel, []);
this.setLayout (layout);
}, "jsjava.awt.LayoutManager");
Clazz.overrideMethod (c$, "constructComponentName", 
function () {
{
return "panel" + jsjava.awt.Panel.nameCounter++;
}});
Clazz.overrideMethod (c$, "addNotify", 
function () {
});
Clazz.defineStatics (c$,
"base", "panel",
"nameCounter", 0);
});

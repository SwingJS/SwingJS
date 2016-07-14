Clazz.declarePackage ("test.Circuit");
Clazz.load (["java.awt.LayoutManager"], "test.Circuit.ImportExportDialogLayout", ["java.awt.Dimension"], function () {
c$ = Clazz.declareType (test.Circuit, "ImportExportDialogLayout", null, java.awt.LayoutManager);
Clazz.makeConstructor (c$, 
function () {
});
Clazz.overrideMethod (c$, "addLayoutComponent", 
function (name, c) {
}, "~S,java.awt.Component");
Clazz.overrideMethod (c$, "removeLayoutComponent", 
function (c) {
}, "java.awt.Component");
Clazz.overrideMethod (c$, "preferredLayoutSize", 
function (target) {
return  new java.awt.Dimension (500, 500);
}, "java.awt.Container");
Clazz.overrideMethod (c$, "minimumLayoutSize", 
function (target) {
return  new java.awt.Dimension (100, 100);
}, "java.awt.Container");
Clazz.overrideMethod (c$, "layoutContainer", 
function (target) {
var insets = target.insets ();
var targetw = target.size ().width - insets.left - insets.right;
var targeth = target.size ().height - (insets.top + insets.bottom);
var i;
var pw = 300;
if (target.getComponentCount () == 0) return;
var cl = target.getComponent (target.getComponentCount () - 1);
var dl = cl.getPreferredSize ();
target.getComponent (0).move (insets.left, insets.top);
var cw = target.size ().width - insets.left - insets.right;
var ch = target.size ().height - insets.top - insets.bottom - dl.height;
target.getComponent (0).resize (cw, ch);
var h = ch + insets.top;
var x = 0;
for (i = 1; i < target.getComponentCount (); i++) {
var m = target.getComponent (i);
if (m.isVisible ()) {
var d = m.getPreferredSize ();
m.move (insets.left + x, h);
m.resize (d.width, d.height);
x += d.width;
}}
}, "java.awt.Container");
});

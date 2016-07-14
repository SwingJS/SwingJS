Clazz.declarePackage ("test.Circuit");
Clazz.load (["java.awt.LayoutManager"], "test.Circuit.EditDialogLayout", ["java.awt.Button", "$.Choice", "$.Dimension", "$.Label", "$.Scrollbar"], function () {
c$ = Clazz.declareType (test.Circuit, "EditDialogLayout", null, java.awt.LayoutManager);
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
var h = insets.top;
var pw = 300;
var x = 0;
for (i = 0; i < target.getComponentCount (); i++) {
var m = target.getComponent (i);
var newline = true;
if (m.isVisible ()) {
var d = m.getPreferredSize ();
if (pw < d.width) pw = d.width;
if (Clazz.instanceOf (m, java.awt.Scrollbar)) {
h += 10;
d.width = targetw - x;
}if (Clazz.instanceOf (m, java.awt.Choice) && d.width > targetw) d.width = targetw - x;
if (Clazz.instanceOf (m, java.awt.Label)) {
var d2 = target.getComponent (i + 1).getPreferredSize ();
if (d.height < d2.height) d.height = d2.height;
h += Clazz.doubleToInt (d.height / 5);
newline = false;
}if (Clazz.instanceOf (m, java.awt.Button)) {
if (x == 0) h += 20;
if (i != target.getComponentCount () - 1) newline = false;
}m.move (insets.left + x, h);
m.resize (d.width, d.height);
if (newline) {
h += d.height;
x = 0;
} else x += d.width;
}}
if (target.size ().height < h) target.resize (pw + insets.right, h + insets.bottom);
}, "java.awt.Container");
});

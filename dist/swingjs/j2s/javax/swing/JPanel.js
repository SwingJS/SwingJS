Clazz.declarePackage ("javax.swing");
Clazz.load (["javax.swing.JComponent"], "javax.swing.JPanel", ["java.lang.Boolean", "java.awt.FlowLayout"], function () {
c$ = Clazz.declareType (javax.swing, "JPanel", javax.swing.JComponent);
Clazz.makeConstructor (c$, 
function (layout, isDoubleBuffered) {
Clazz.superConstructor (this, javax.swing.JPanel, []);
this.setLayout (layout);
this.setUIProperty ("opaque", Boolean.TRUE);
this.uiClassID = "PanelUI";
this.updateUI ();
}, "java.awt.LayoutManager,~B");
Clazz.makeConstructor (c$, 
function (layout) {
this.construct (layout, true);
}, "java.awt.LayoutManager");
Clazz.makeConstructor (c$, 
function (isDoubleBuffered) {
this.construct ( new java.awt.FlowLayout (), isDoubleBuffered);
}, "~B");
Clazz.makeConstructor (c$, 
function () {
this.construct (true);
});
});

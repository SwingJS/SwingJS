Clazz.declarePackage ("javax.swing");
Clazz.load (["javax.swing.JComponent"], "javax.swing.JPanel", ["java.lang.Boolean", "java.awt.FlowLayout", "javax.swing.UIManager"], function () {
c$ = Clazz.declareType (javax.swing, "JPanel", javax.swing.JComponent);
Clazz.makeConstructor (c$, 
function (layout, isDoubleBuffered) {
Clazz.superConstructor (this, javax.swing.JPanel, []);
this.setLayout (layout);
this.setUIProperty ("opaque", Boolean.TRUE);
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
Clazz.overrideMethod (c$, "updateUI", 
function () {
this.setUI (javax.swing.UIManager.getUI (this));
});
Clazz.overrideMethod (c$, "getUI", 
function () {
return this.ui;
});
Clazz.overrideMethod (c$, "getUIClassID", 
function () {
return "PanelUI";
});
Clazz.defineStatics (c$,
"$uiClassID", "PanelUI");
});

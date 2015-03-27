Clazz.declarePackage ("jsjavax.swing");
Clazz.load (["jsjavax.swing.JComponent"], "jsjavax.swing.JPanel", ["java.lang.Boolean", "jsjava.awt.FlowLayout", "jsjavax.swing.UIManager"], function () {
c$ = Clazz.declareType (jsjavax.swing, "JPanel", jsjavax.swing.JComponent);
Clazz.makeConstructor (c$, 
function (layout, isDoubleBuffered) {
Clazz.superConstructor (this, jsjavax.swing.JPanel, []);
this.setLayout (layout);
this.setDoubleBuffered (isDoubleBuffered);
this.setUIProperty ("opaque", Boolean.TRUE);
this.updateUI ();
}, "jsjava.awt.LayoutManager,~B");
Clazz.makeConstructor (c$, 
function (layout) {
this.construct (layout, true);
}, "jsjava.awt.LayoutManager");
Clazz.makeConstructor (c$, 
function (isDoubleBuffered) {
this.construct ( new jsjava.awt.FlowLayout (), isDoubleBuffered);
}, "~B");
Clazz.makeConstructor (c$, 
function () {
this.construct (true);
});
Clazz.overrideMethod (c$, "updateUI", 
function () {
this.setUI (jsjavax.swing.UIManager.getUI (this));
});
Clazz.defineMethod (c$, "getUI", 
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

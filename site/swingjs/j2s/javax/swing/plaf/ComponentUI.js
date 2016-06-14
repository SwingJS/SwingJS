Clazz.declarePackage ("javax.swing.plaf");
Clazz.load (["java.awt.peer.ComponentPeer"], "javax.swing.plaf.ComponentUI", ["java.lang.Error", "java.awt.Component"], function () {
c$ = Clazz.declareType (javax.swing.plaf, "ComponentUI", null, java.awt.peer.ComponentPeer);
Clazz.makeConstructor (c$, 
function () {
});
Clazz.defineMethod (c$, "installUI", 
function (c) {
}, "javax.swing.JComponent");
Clazz.defineMethod (c$, "uninstallUI", 
function (c) {
}, "javax.swing.JComponent");
Clazz.defineMethod (c$, "paint", 
function (g, c) {
}, "java.awt.Graphics,javax.swing.JComponent");
Clazz.defineMethod (c$, "update", 
function (g, c) {
}, "java.awt.Graphics,javax.swing.JComponent");
Clazz.defineMethod (c$, "getPreferredSize", 
function (c) {
return null;
}, "javax.swing.JComponent");
Clazz.defineMethod (c$, "getMinimumSize", 
function (c) {
return this.getPreferredSize (c);
}, "javax.swing.JComponent");
Clazz.defineMethod (c$, "getMaximumSize", 
function (c) {
return null;
}, "javax.swing.JComponent");
Clazz.defineMethod (c$, "contains", 
function (c, x, y) {
return c.inside (x, y);
}, "javax.swing.JComponent,~N,~N");
c$.createUI = Clazz.defineMethod (c$, "createUI", 
function (c) {
throw  new Error ("ComponentUI.createUI not implemented.");
}, "javax.swing.JComponent");
Clazz.defineMethod (c$, "getBaseline", 
function (c, width, height) {
return -1;
}, "javax.swing.JComponent,~N,~N");
Clazz.defineMethod (c$, "getBaselineResizeBehavior", 
function (c) {
return java.awt.Component.BaselineResizeBehavior.OTHER;
}, "javax.swing.JComponent");
});

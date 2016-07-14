Clazz.declarePackage ("test.Circuit");
Clazz.load (["java.applet.Applet", "java.awt.event.ComponentListener"], "test.Circuit.Circuit", ["test.Circuit.CirSim"], function () {
c$ = Clazz.decorateAsClass (function () {
this.finished = false;
this.started = false;
Clazz.instantialize (this, arguments);
}, test.Circuit, "Circuit", java.applet.Applet, java.awt.event.ComponentListener);
Clazz.defineMethod (c$, "destroyFrame", 
function () {
if (test.Circuit.Circuit.ogf != null) test.Circuit.Circuit.ogf.dispose ();
test.Circuit.Circuit.ogf = null;
this.repaint ();
this.finished = true;
});
Clazz.overrideMethod (c$, "init", 
function () {
this.addComponentListener (this);
});
c$.main = Clazz.defineMethod (c$, "main", 
function (args) {
test.Circuit.Circuit.ogf =  new test.Circuit.CirSim (null);
test.Circuit.Circuit.ogf.init ();
}, "~A");
Clazz.defineMethod (c$, "showFrame", 
function () {
if (this.finished) {
this.repaint ();
return;
}if (test.Circuit.Circuit.ogf == null) {
this.started = true;
test.Circuit.Circuit.ogf =  new test.Circuit.CirSim (this);
test.Circuit.Circuit.ogf.init ();
}test.Circuit.Circuit.ogf.setVisible (true);
this.repaint ();
});
Clazz.defineMethod (c$, "hideFrame", 
function () {
if (this.finished) return;
test.Circuit.Circuit.ogf.setVisible (false);
this.repaint ();
});
Clazz.defineMethod (c$, "toggleSwitch", 
function (x) {
test.Circuit.Circuit.ogf.toggleSwitch (x);
}, "~N");
Clazz.overrideMethod (c$, "paint", 
function (g) {
var s = "Applet is open in a separate window.";
if (test.Circuit.Circuit.ogf != null && !test.Circuit.Circuit.ogf.isVisible ()) s = "Applet window is hidden.";
if (!this.started) s = "Applet is starting.";
 else if (test.Circuit.Circuit.ogf == null || this.finished) s = "Applet is finished.";
 else if (test.Circuit.Circuit.ogf != null && test.Circuit.Circuit.ogf.useFrame) test.Circuit.Circuit.ogf.triggerShow ();
g.drawString (s, 10, 30);
}, "java.awt.Graphics");
Clazz.overrideMethod (c$, "componentHidden", 
function (e) {
}, "java.awt.event.ComponentEvent");
Clazz.overrideMethod (c$, "componentMoved", 
function (e) {
}, "java.awt.event.ComponentEvent");
Clazz.overrideMethod (c$, "componentShown", 
function (e) {
this.showFrame ();
}, "java.awt.event.ComponentEvent");
Clazz.overrideMethod (c$, "componentResized", 
function (e) {
if (test.Circuit.Circuit.ogf != null) test.Circuit.Circuit.ogf.componentResized (e);
}, "java.awt.event.ComponentEvent");
Clazz.overrideMethod (c$, "destroy", 
function () {
if (test.Circuit.Circuit.ogf != null) test.Circuit.Circuit.ogf.dispose ();
test.Circuit.Circuit.ogf = null;
this.repaint ();
});
Clazz.defineStatics (c$,
"ogf", null);
});

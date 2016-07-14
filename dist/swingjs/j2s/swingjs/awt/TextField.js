Clazz.declarePackage ("swingjs.awt");
Clazz.load (["javax.swing.JTextField"], "swingjs.awt.TextField", ["java.awt.event.TextEvent", "javax.swing.event.DocumentListener"], function () {
c$ = Clazz.declareType (swingjs.awt, "TextField", javax.swing.JTextField);
Clazz.defineMethod (c$, "addTextListener", 
function (textListener) {
this.getDocument ().addDocumentListener (((Clazz.isClassDefined ("swingjs.awt.TextField$1") ? 0 : swingjs.awt.TextField.$TextField$1$ ()), Clazz.innerTypeInstance (swingjs.awt.TextField$1, this, Clazz.cloneFinals ("textListener", textListener))));
}, "java.awt.event.TextListener");
c$.$TextField$1$ = function () {
Clazz.pu$h(self.c$);
c$ = Clazz.declareAnonymous (swingjs.awt, "TextField$1", null, javax.swing.event.DocumentListener);
Clazz.overrideMethod (c$, "insertUpdate", 
function (e) {
}, "javax.swing.event.DocumentEvent");
Clazz.overrideMethod (c$, "removeUpdate", 
function (e) {
}, "javax.swing.event.DocumentEvent");
Clazz.overrideMethod (c$, "changedUpdate", 
function (e) {
this.f$.textListener.textValueChanged ( new java.awt.event.TextEvent (this, 0));
}, "javax.swing.event.DocumentEvent");
c$ = Clazz.p0p ();
};
});

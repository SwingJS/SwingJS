Clazz.declarePackage ("swingjs.awt");
Clazz.load (["javax.swing.JCheckBox"], "swingjs.awt.Checkbox", null, function () {
c$ = Clazz.declareType (swingjs.awt, "Checkbox", javax.swing.JCheckBox);
Clazz.makeConstructor (c$, 
function (string) {
Clazz.superConstructor (this, swingjs.awt.Checkbox, [string, false]);
}, "~S");
Clazz.defineMethod (c$, "getState", 
function () {
return this.isSelected ();
});
Clazz.defineMethod (c$, "setState", 
function (b) {
this.setSelected (b);
}, "~B");
});

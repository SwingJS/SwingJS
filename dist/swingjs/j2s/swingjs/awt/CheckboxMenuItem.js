Clazz.declarePackage ("swingjs.awt");
Clazz.load (["javax.swing.JCheckBoxMenuItem"], "swingjs.awt.CheckboxMenuItem", null, function () {
c$ = Clazz.declareType (swingjs.awt, "CheckboxMenuItem", javax.swing.JCheckBoxMenuItem);
Clazz.makeConstructor (c$, 
function () {
Clazz.superConstructor (this, swingjs.awt.CheckboxMenuItem, []);
});
Clazz.overrideMethod (c$, "getState", 
function () {
return this.isSelected ();
});
Clazz.overrideMethod (c$, "setState", 
function (tf) {
this.setSelected (tf);
}, "~B");
});

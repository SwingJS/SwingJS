Clazz.declarePackage ("swingjs.plaf");
Clazz.load (["swingjs.plaf.JSTextFieldUI"], "swingjs.plaf.JSPasswordFieldUI", null, function () {
c$ = Clazz.declareType (swingjs.plaf, "JSPasswordFieldUI", swingjs.plaf.JSTextFieldUI);
Clazz.makeConstructor (c$, 
function () {
Clazz.superConstructor (this, swingjs.plaf.JSPasswordFieldUI, []);
this.inputType = "password";
this.setDoc ();
});
});

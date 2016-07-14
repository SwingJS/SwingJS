Clazz.declarePackage ("swingjs.plaf");
Clazz.load (["swingjs.plaf.JSRadioButtonUI"], "swingjs.plaf.JSCheckBoxUI", null, function () {
c$ = Clazz.declareType (swingjs.plaf, "JSCheckBoxUI", swingjs.plaf.JSRadioButtonUI);
Clazz.overrideMethod (c$, "createDOMNode", 
function () {
return this.getButtonObject ("checkBox");
});
Clazz.overrideMethod (c$, "getPropertyPrefix", 
function () {
return "CheckBox.";
});
});

Clazz.declarePackage ("swingjs.plaf");
Clazz.load (["swingjs.plaf.JSRadioButtonUI"], "swingjs.plaf.JSRadioButtonMenuItemUI", null, function () {
c$ = Clazz.declareType (swingjs.plaf, "JSRadioButtonMenuItemUI", swingjs.plaf.JSRadioButtonUI);
Clazz.overrideMethod (c$, "getDOMObject", 
function () {
return this.getButtonObject ("radio");
});
Clazz.overrideMethod (c$, "getPropertyPrefix", 
function () {
return "RadioButtonMenuItem.";
});
});

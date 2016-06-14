Clazz.declarePackage ("swingjs.plaf");
Clazz.load (["swingjs.plaf.JSCheckBoxUI"], "swingjs.plaf.JSCheckBoxMenuItemUI", null, function () {
c$ = Clazz.declareType (swingjs.plaf, "JSCheckBoxMenuItemUI", swingjs.plaf.JSCheckBoxUI);
Clazz.overrideMethod (c$, "getDOMObject", 
function () {
return this.getButtonObject ("checkBox");
});
Clazz.overrideMethod (c$, "getPropertyPrefix", 
function () {
return "CheckBoxMenuItem.";
});
});

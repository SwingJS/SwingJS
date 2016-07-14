Clazz.declarePackage ("swingjs.plaf");
Clazz.load (["swingjs.plaf.JSRadioButtonUI"], "swingjs.plaf.JSRadioButtonMenuItemUI", null, function () {
c$ = Clazz.declareType (swingjs.plaf, "JSRadioButtonMenuItemUI", swingjs.plaf.JSRadioButtonUI);
Clazz.makeConstructor (c$, 
function () {
Clazz.superConstructor (this, swingjs.plaf.JSRadioButtonMenuItemUI);
this.hasOuterDiv = false;
});
Clazz.overrideMethod (c$, "createDOMNode", 
function () {
this.menuItem = this.c;
return this.getButtonObject ("radio");
});
Clazz.overrideMethod (c$, "getPropertyPrefix", 
function () {
return "RadioButtonMenuItem.";
});
});

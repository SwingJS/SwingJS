Clazz.declarePackage ("swingjs.plaf");
Clazz.load (["swingjs.plaf.JSCheckBoxUI"], "swingjs.plaf.JSCheckBoxMenuItemUI", null, function () {
c$ = Clazz.declareType (swingjs.plaf, "JSCheckBoxMenuItemUI", swingjs.plaf.JSCheckBoxUI);
Clazz.makeConstructor (c$, 
function () {
Clazz.superConstructor (this, swingjs.plaf.JSCheckBoxMenuItemUI);
this.hasOuterDiv = false;
});
Clazz.overrideMethod (c$, "createDOMNode", 
function () {
this.menuItem = this.c;
return this.getButtonObject ("checkBox");
});
Clazz.overrideMethod (c$, "getPropertyPrefix", 
function () {
return "CheckBoxMenuItem.";
});
});

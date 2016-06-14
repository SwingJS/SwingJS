Clazz.declarePackage ("swingjs.plaf");
Clazz.load (["swingjs.plaf.JSButtonUI"], "swingjs.plaf.JSToggleButtonUI", ["swingjs.api.DOMNode"], function () {
c$ = Clazz.decorateAsClass (function () {
this.isDomChecked = false;
Clazz.instantialize (this, arguments);
}, swingjs.plaf, "JSToggleButtonUI", swingjs.plaf.JSButtonUI);
Clazz.overrideMethod (c$, "verifyButtonClick", 
function (isRelease) {
var checked = ((swingjs.api.DOMNode.getAttr (this.domBtn, "checked")).booleanValue () === true);
if (isRelease && this.isDomChecked == checked) return false;
this.isDomChecked = checked;
return true;
}, "~B");
Clazz.overrideMethod (c$, "getPropertyPrefix", 
function () {
return "ToggleButton.";
});
});

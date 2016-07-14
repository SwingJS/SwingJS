Clazz.declarePackage ("swingjs.plaf");
Clazz.load (["swingjs.plaf.JSSliderUI"], "swingjs.plaf.JSScrollBarUI", null, function () {
c$ = Clazz.declareType (swingjs.plaf, "JSScrollBarUI", swingjs.plaf.JSSliderUI);
Clazz.makeConstructor (c$, 
function () {
Clazz.superConstructor (this, swingjs.plaf.JSScrollBarUI);
this.isScrollBar = true;
});
});

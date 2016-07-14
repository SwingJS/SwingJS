Clazz.declarePackage ("swingjs.plaf");
Clazz.load (["swingjs.plaf.JSSeparatorUI"], "swingjs.plaf.JSPopupMenuSeparatorUI", null, function () {
c$ = Clazz.declareType (swingjs.plaf, "JSPopupMenuSeparatorUI", swingjs.plaf.JSSeparatorUI);
Clazz.makeConstructor (c$, 
function () {
Clazz.superConstructor (this, swingjs.plaf.JSPopupMenuSeparatorUI);
this.hasOuterDiv = false;
});
});

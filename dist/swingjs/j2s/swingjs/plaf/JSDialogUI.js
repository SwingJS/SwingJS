Clazz.declarePackage ("swingjs.plaf");
Clazz.load (["swingjs.plaf.JSFrameUI"], "swingjs.plaf.JSDialogUI", ["swingjs.plaf.JSComponentUI"], function () {
c$ = Clazz.declareType (swingjs.plaf, "JSDialogUI", swingjs.plaf.JSFrameUI);
Clazz.makeConstructor (c$, 
function () {
Clazz.superConstructor (this, swingjs.plaf.JSDialogUI, []);
this.z = swingjs.plaf.JSComponentUI.frameZ + 40000;
this.isFrame = true;
this.isDialog = true;
this.defaultWidth = 500;
this.defaultHeight = 300;
this.setDoc ();
});
Clazz.overrideMethod (c$, "installJSUI", 
function () {
});
Clazz.overrideMethod (c$, "uninstallJSUI", 
function () {
});
});

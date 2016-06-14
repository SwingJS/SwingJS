Clazz.declarePackage ("swingjs.awt");
Clazz.load (["javax.swing.JMenu"], "swingjs.awt.Menu", null, function () {
c$ = Clazz.declareType (swingjs.awt, "Menu", javax.swing.JMenu);
Clazz.makeConstructor (c$, 
function (title) {
Clazz.superConstructor (this, swingjs.awt.Menu, [title]);
title = null;
}, "~S");
Clazz.makeConstructor (c$, 
function () {
Clazz.superConstructor (this, swingjs.awt.Menu);
var s = null;
});
});

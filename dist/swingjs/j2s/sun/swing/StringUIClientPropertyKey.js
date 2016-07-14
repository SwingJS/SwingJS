Clazz.declarePackage ("sun.swing");
Clazz.load (["sun.swing.UIClientPropertyKey"], "sun.swing.StringUIClientPropertyKey", null, function () {
c$ = Clazz.decorateAsClass (function () {
this.key = null;
Clazz.instantialize (this, arguments);
}, sun.swing, "StringUIClientPropertyKey", null, sun.swing.UIClientPropertyKey);
Clazz.makeConstructor (c$, 
function (key) {
this.key = key;
}, "~S");
Clazz.overrideMethod (c$, "toString", 
function () {
return this.key;
});
});

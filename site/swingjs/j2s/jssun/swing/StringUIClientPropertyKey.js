Clazz.declarePackage ("jssun.swing");
Clazz.load (["jssun.swing.UIClientPropertyKey"], "jssun.swing.StringUIClientPropertyKey", null, function () {
c$ = Clazz.decorateAsClass (function () {
this.key = null;
Clazz.instantialize (this, arguments);
}, jssun.swing, "StringUIClientPropertyKey", null, jssun.swing.UIClientPropertyKey);
Clazz.makeConstructor (c$, 
function (key) {
this.key = key;
}, "~S");
Clazz.overrideMethod (c$, "toString", 
function () {
return this.key;
});
});

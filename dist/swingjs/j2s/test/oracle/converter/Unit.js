Clazz.declarePackage ("test.oracle.converter");
c$ = Clazz.decorateAsClass (function () {
this.description = null;
this.multiplier = 0;
Clazz.instantialize (this, arguments);
}, test.oracle.converter, "Unit");
Clazz.makeConstructor (c$, 
function (description, multiplier) {
this.description = description;
this.multiplier = multiplier;
}, "~S,~N");
Clazz.overrideMethod (c$, "toString", 
function () {
var s = "Meters/" + this.description + " = " + this.multiplier;
return s;
});

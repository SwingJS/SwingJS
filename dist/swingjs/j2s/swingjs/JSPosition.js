Clazz.declarePackage ("swingjs");
Clazz.load (["javax.swing.text.Position"], "swingjs.JSPosition", null, function () {
c$ = Clazz.decorateAsClass (function () {
this.pos = 0;
Clazz.instantialize (this, arguments);
}, swingjs, "JSPosition", null, javax.swing.text.Position);
Clazz.makeConstructor (c$, 
function (offset) {
this.pos = offset;
}, "~N");
Clazz.overrideMethod (c$, "getOffset", 
function () {
return this.pos;
});
});

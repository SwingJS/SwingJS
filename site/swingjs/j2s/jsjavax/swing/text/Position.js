Clazz.declarePackage ("jsjavax.swing.text");
Clazz.declareInterface (jsjavax.swing.text, "Position");
Clazz.pu$h ();
c$ = Clazz.decorateAsClass (function () {
this.name = null;
Clazz.instantialize (this, arguments);
}, jsjavax.swing.text.Position, "Bias");
Clazz.overrideMethod (c$, "toString", 
function () {
return this.name;
});
Clazz.makeConstructor (c$, 
($fz = function (a) {
this.name = a;
}, $fz.isPrivate = true, $fz), "~S");
c$.Forward = c$.prototype.Forward =  new jsjavax.swing.text.Position.Bias ("Forward");
c$.Backward = c$.prototype.Backward =  new jsjavax.swing.text.Position.Bias ("Backward");
c$ = Clazz.p0p ();

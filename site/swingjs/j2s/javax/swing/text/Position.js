Clazz.declarePackage ("javax.swing.text");
Clazz.declareInterface (javax.swing.text, "Position");
Clazz.pu$h(self.c$);
c$ = Clazz.decorateAsClass (function () {
this.name = null;
Clazz.instantialize (this, arguments);
}, javax.swing.text.Position, "Bias");
Clazz.overrideMethod (c$, "toString", 
function () {
return this.name;
});
Clazz.makeConstructor (c$, 
 function (a) {
this.name = a;
}, "~S");
c$.Forward = c$.prototype.Forward =  new javax.swing.text.Position.Bias ("Forward");
c$.Backward = c$.prototype.Backward =  new javax.swing.text.Position.Bias ("Backward");
c$ = Clazz.p0p ();

Clazz.declarePackage ("test.Circuit");
c$ = Clazz.decorateAsClass (function () {
this.num = 0;
this.elm = null;
Clazz.instantialize (this, arguments);
}, test.Circuit, "CircuitNodeLink");

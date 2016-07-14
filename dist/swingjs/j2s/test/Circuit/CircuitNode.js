Clazz.declarePackage ("test.Circuit");
Clazz.load (null, "test.Circuit.CircuitNode", ["java.util.Vector"], function () {
c$ = Clazz.decorateAsClass (function () {
this.x = 0;
this.y = 0;
this.links = null;
this.internal = false;
Clazz.instantialize (this, arguments);
}, test.Circuit, "CircuitNode");
Clazz.makeConstructor (c$, 
function () {
this.links =  new java.util.Vector ();
});
});

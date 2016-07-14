Clazz.declarePackage ("test.ultrastudio.boids");
Clazz.load (["java.util.ArrayList", "java.awt.geom.Rectangle2D"], "test.ultrastudio.boids.Flock", null, function () {
c$ = Clazz.decorateAsClass (function () {
this.$$size = null;
this.scared = false;
this.cooperative = true;
Clazz.instantialize (this, arguments);
}, test.ultrastudio.boids, "Flock", java.util.ArrayList);
Clazz.prepareFields (c$, function () {
this.$$size =  new java.awt.geom.Rectangle2D.Double ();
});
Clazz.defineMethod (c$, "iteration", 
function (time) {
for (var boid, $boid = this.iterator (); $boid.hasNext () && ((boid = $boid.next ()) || true);) boid.moveAhead (time);

}, "~N");
Clazz.defineMethod (c$, "setScared", 
function (scared) {
this.scared = scared;
}, "~B");
Clazz.defineMethod (c$, "setCooperative", 
function (cooperative) {
this.cooperative = cooperative;
}, "~B");
});

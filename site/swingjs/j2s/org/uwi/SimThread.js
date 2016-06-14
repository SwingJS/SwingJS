Clazz.declarePackage ("org.uwi");
Clazz.load (["swingjs.JSThread"], "org.uwi.SimThread", null, function () {
c$ = Clazz.decorateAsClass (function () {
this.boltzmann = null;
Clazz.instantialize (this, arguments);
}, org.uwi, "SimThread", swingjs.JSThread);
Clazz.makeConstructor (c$, 
function (boltzmann) {
Clazz.superConstructor (this, org.uwi.SimThread, [null, "BoltzmannThread"]);
this.boltzmann = boltzmann;
}, "org.uwi.Boltzmann");
Clazz.overrideMethod (c$, "run", 
function () {
this.run1 (0);
});
Clazz.overrideMethod (c$, "run1", 
function (state) {
while (!Thread.interrupted ()) {
try {
switch (state) {
case 0:
this.boltzmann.sjs_initSimulation ();
state = 1;
continue;
case 1:
var repainted = this.boltzmann.sjs_checkRepaint ();
if (!this.boltzmann.sjs_loopSimulation ()) {
state = 2;
continue;
}if (repainted && this.sleepAndReturn (0, state)) return;
break;
case 2:
this.boltzmann.sjs_finalizeGraph ();
return;
}
} catch (e) {
if (Clazz.exceptionOf (e, Exception)) {
state = 2;
} else {
throw e;
}
}
}
}, "~N");
});

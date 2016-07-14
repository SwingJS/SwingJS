Clazz.declarePackage ("org.uwi");
Clazz.load (["swingjs.JSThread"], "org.uwi.SimThread", null, function () {
c$ = Clazz.decorateAsClass (function () {
this.boltzmann = null;
this.repainted = false;
Clazz.instantialize (this, arguments);
}, org.uwi, "SimThread", swingjs.JSThread);
Clazz.makeConstructor (c$, 
function (boltzmann) {
Clazz.superConstructor (this, org.uwi.SimThread, [null, "BoltzmannThread"]);
this.boltzmann = boltzmann;
}, "org.uwi.Boltzmann");
Clazz.overrideMethod (c$, "myInit", 
function () {
this.boltzmann.sjs_initSimulation ();
return true;
});
Clazz.overrideMethod (c$, "isLooping", 
function () {
this.repainted = this.boltzmann.sjs_checkRepaint ();
return this.boltzmann.sjs_loopSimulation ();
});
Clazz.overrideMethod (c$, "myLoop", 
function () {
return this.repainted;
});
Clazz.overrideMethod (c$, "whenDone", 
function () {
this.boltzmann.sjs_finalizeGraph ();
});
Clazz.overrideMethod (c$, "getDelayMillis", 
function () {
return 0;
});
Clazz.overrideMethod (c$, "onException", 
function (e) {
System.out.println (e.getMessage ());
}, "Exception");
Clazz.overrideMethod (c$, "doFinally", 
function () {
});
});

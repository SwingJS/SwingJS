Clazz.declarePackage ("jssun.java2d");
c$ = Clazz.declareInterface (jssun.java2d, "StateTracker");
c$.$StateTracker$1$ = function () {
Clazz.pu$h(self.c$);
c$ = Clazz.declareAnonymous (jssun.java2d, "StateTracker$1", null, jssun.java2d.StateTracker);
Clazz.overrideMethod (c$, "isCurrent", 
function () {
return true;
});
c$ = Clazz.p0p ();
};
c$.$StateTracker$2$ = function () {
Clazz.pu$h(self.c$);
c$ = Clazz.declareAnonymous (jssun.java2d, "StateTracker$2", null, jssun.java2d.StateTracker);
Clazz.overrideMethod (c$, "isCurrent", 
function () {
return false;
});
c$ = Clazz.p0p ();
};
c$.ALWAYS_CURRENT = c$.prototype.ALWAYS_CURRENT = ((Clazz.isClassDefined ("jssun.java2d.StateTracker$1") ? 0 : jssun.java2d.StateTracker.$StateTracker$1$ ()), Clazz.innerTypeInstance (jssun.java2d.StateTracker$1, this, null));
c$.NEVER_CURRENT = c$.prototype.NEVER_CURRENT = ((Clazz.isClassDefined ("jssun.java2d.StateTracker$2") ? 0 : jssun.java2d.StateTracker.$StateTracker$2$ ()), Clazz.innerTypeInstance (jssun.java2d.StateTracker$2, this, null));

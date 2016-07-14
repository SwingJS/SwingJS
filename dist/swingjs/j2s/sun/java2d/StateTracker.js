Clazz.declarePackage ("sun.java2d");
c$ = Clazz.declareInterface (sun.java2d, "StateTracker");
c$.$StateTracker$1$ = function () {
Clazz.pu$h(self.c$);
c$ = Clazz.declareAnonymous (sun.java2d, "StateTracker$1", null, sun.java2d.StateTracker);
Clazz.overrideMethod (c$, "isCurrent", 
function () {
return true;
});
c$ = Clazz.p0p ();
};
c$.$StateTracker$2$ = function () {
Clazz.pu$h(self.c$);
c$ = Clazz.declareAnonymous (sun.java2d, "StateTracker$2", null, sun.java2d.StateTracker);
Clazz.overrideMethod (c$, "isCurrent", 
function () {
return false;
});
c$ = Clazz.p0p ();
};
c$.ALWAYS_CURRENT = c$.prototype.ALWAYS_CURRENT = ((Clazz.isClassDefined ("sun.java2d.StateTracker$1") ? 0 : sun.java2d.StateTracker.$StateTracker$1$ ()), Clazz.innerTypeInstance (sun.java2d.StateTracker$1, this, null));
c$.NEVER_CURRENT = c$.prototype.NEVER_CURRENT = ((Clazz.isClassDefined ("sun.java2d.StateTracker$2") ? 0 : sun.java2d.StateTracker.$StateTracker$2$ ()), Clazz.innerTypeInstance (sun.java2d.StateTracker$2, this, null));

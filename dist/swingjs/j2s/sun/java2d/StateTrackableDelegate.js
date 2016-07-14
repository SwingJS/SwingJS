Clazz.declarePackage ("sun.java2d");
Clazz.load (["sun.java2d.StateTrackable"], "sun.java2d.StateTrackableDelegate", ["java.lang.IllegalStateException", "$.InternalError", "sun.java2d.StateTracker"], function () {
c$ = Clazz.decorateAsClass (function () {
this.theState = null;
this.theTracker = null;
this.numDynamicAgents = 0;
Clazz.instantialize (this, arguments);
}, sun.java2d, "StateTrackableDelegate", null, sun.java2d.StateTrackable);
c$.createInstance = Clazz.defineMethod (c$, "createInstance", 
function (state) {
switch (state) {
case sun.java2d.StateTrackable.State.UNTRACKABLE:
return sun.java2d.StateTrackableDelegate.UNTRACKABLE_DELEGATE;
case sun.java2d.StateTrackable.State.STABLE:
return  new sun.java2d.StateTrackableDelegate (sun.java2d.StateTrackable.State.STABLE);
case sun.java2d.StateTrackable.State.DYNAMIC:
return  new sun.java2d.StateTrackableDelegate (sun.java2d.StateTrackable.State.DYNAMIC);
case sun.java2d.StateTrackable.State.IMMUTABLE:
return sun.java2d.StateTrackableDelegate.IMMUTABLE_DELEGATE;
default:
throw  new InternalError ("unknown state");
}
}, "sun.java2d.StateTrackable.State");
Clazz.makeConstructor (c$, 
 function (state) {
this.theState = state;
}, "sun.java2d.StateTrackable.State");
Clazz.overrideMethod (c$, "getState", 
function () {
return this.theState;
});
Clazz.overrideMethod (c$, "getStateTracker", 
function () {
var st = this.theTracker;
if (st == null) {
switch (this.theState) {
case sun.java2d.StateTrackable.State.IMMUTABLE:
st = sun.java2d.StateTracker.ALWAYS_CURRENT;
break;
case sun.java2d.StateTrackable.State.STABLE:
st = ((Clazz.isClassDefined ("sun.java2d.StateTrackableDelegate$1") ? 0 : sun.java2d.StateTrackableDelegate.$StateTrackableDelegate$1$ ()), Clazz.innerTypeInstance (sun.java2d.StateTrackableDelegate$1, this, null));
break;
case sun.java2d.StateTrackable.State.DYNAMIC:
case sun.java2d.StateTrackable.State.UNTRACKABLE:
st = sun.java2d.StateTracker.NEVER_CURRENT;
break;
}
this.theTracker = st;
}return st;
});
Clazz.defineMethod (c$, "setImmutable", 
function () {
if (this.theState === sun.java2d.StateTrackable.State.UNTRACKABLE || this.theState === sun.java2d.StateTrackable.State.DYNAMIC) {
throw  new IllegalStateException ("UNTRACKABLE or DYNAMIC objects cannot become IMMUTABLE");
}this.theState = sun.java2d.StateTrackable.State.IMMUTABLE;
this.theTracker = null;
});
Clazz.defineMethod (c$, "setUntrackable", 
function () {
if (this.theState === sun.java2d.StateTrackable.State.IMMUTABLE) {
throw  new IllegalStateException ("IMMUTABLE objects cannot become UNTRACKABLE");
}this.theState = sun.java2d.StateTrackable.State.UNTRACKABLE;
this.theTracker = null;
});
Clazz.defineMethod (c$, "addDynamicAgent", 
function () {
if (this.theState === sun.java2d.StateTrackable.State.IMMUTABLE) {
throw  new IllegalStateException ("Cannot change state from IMMUTABLE");
}++this.numDynamicAgents;
if (this.theState === sun.java2d.StateTrackable.State.STABLE) {
this.theState = sun.java2d.StateTrackable.State.DYNAMIC;
this.theTracker = null;
}});
Clazz.defineMethod (c$, "removeDynamicAgent", 
function () {
if (--this.numDynamicAgents == 0 && this.theState === sun.java2d.StateTrackable.State.DYNAMIC) {
this.theState = sun.java2d.StateTrackable.State.STABLE;
this.theTracker = null;
}});
Clazz.defineMethod (c$, "markDirty", 
function () {
this.theTracker = null;
});
c$.$StateTrackableDelegate$1$ = function () {
Clazz.pu$h(self.c$);
c$ = Clazz.declareAnonymous (sun.java2d, "StateTrackableDelegate$1", null, sun.java2d.StateTracker);
Clazz.overrideMethod (c$, "isCurrent", 
function () {
return (this.b$["sun.java2d.StateTrackableDelegate"].theTracker === this);
});
c$ = Clazz.p0p ();
};
c$.UNTRACKABLE_DELEGATE = c$.prototype.UNTRACKABLE_DELEGATE =  new sun.java2d.StateTrackableDelegate (sun.java2d.StateTrackable.State.UNTRACKABLE);
c$.IMMUTABLE_DELEGATE = c$.prototype.IMMUTABLE_DELEGATE =  new sun.java2d.StateTrackableDelegate (sun.java2d.StateTrackable.State.IMMUTABLE);
});

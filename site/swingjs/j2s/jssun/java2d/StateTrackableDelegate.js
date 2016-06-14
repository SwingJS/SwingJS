Clazz.declarePackage ("jssun.java2d");
Clazz.load (["jssun.java2d.StateTrackable"], "jssun.java2d.StateTrackableDelegate", ["java.lang.IllegalStateException", "$.InternalError", "jssun.java2d.StateTracker"], function () {
c$ = Clazz.decorateAsClass (function () {
this.theState = null;
this.theTracker = null;
this.numDynamicAgents = 0;
Clazz.instantialize (this, arguments);
}, jssun.java2d, "StateTrackableDelegate", null, jssun.java2d.StateTrackable);
c$.createInstance = Clazz.defineMethod (c$, "createInstance", 
function (state) {
switch (state) {
case jssun.java2d.StateTrackable.State.UNTRACKABLE:
return jssun.java2d.StateTrackableDelegate.UNTRACKABLE_DELEGATE;
case jssun.java2d.StateTrackable.State.STABLE:
return  new jssun.java2d.StateTrackableDelegate (jssun.java2d.StateTrackable.State.STABLE);
case jssun.java2d.StateTrackable.State.DYNAMIC:
return  new jssun.java2d.StateTrackableDelegate (jssun.java2d.StateTrackable.State.DYNAMIC);
case jssun.java2d.StateTrackable.State.IMMUTABLE:
return jssun.java2d.StateTrackableDelegate.IMMUTABLE_DELEGATE;
default:
throw  new InternalError ("unknown state");
}
}, "jssun.java2d.StateTrackable.State");
Clazz.makeConstructor (c$, 
 function (state) {
this.theState = state;
}, "jssun.java2d.StateTrackable.State");
Clazz.overrideMethod (c$, "getState", 
function () {
return this.theState;
});
Clazz.overrideMethod (c$, "getStateTracker", 
function () {
var st = this.theTracker;
if (st == null) {
switch (this.theState) {
case jssun.java2d.StateTrackable.State.IMMUTABLE:
st = jssun.java2d.StateTracker.ALWAYS_CURRENT;
break;
case jssun.java2d.StateTrackable.State.STABLE:
st = ((Clazz.isClassDefined ("jssun.java2d.StateTrackableDelegate$1") ? 0 : jssun.java2d.StateTrackableDelegate.$StateTrackableDelegate$1$ ()), Clazz.innerTypeInstance (jssun.java2d.StateTrackableDelegate$1, this, null));
break;
case jssun.java2d.StateTrackable.State.DYNAMIC:
case jssun.java2d.StateTrackable.State.UNTRACKABLE:
st = jssun.java2d.StateTracker.NEVER_CURRENT;
break;
}
this.theTracker = st;
}return st;
});
Clazz.defineMethod (c$, "setImmutable", 
function () {
if (this.theState === jssun.java2d.StateTrackable.State.UNTRACKABLE || this.theState === jssun.java2d.StateTrackable.State.DYNAMIC) {
throw  new IllegalStateException ("UNTRACKABLE or DYNAMIC objects cannot become IMMUTABLE");
}this.theState = jssun.java2d.StateTrackable.State.IMMUTABLE;
this.theTracker = null;
});
Clazz.defineMethod (c$, "setUntrackable", 
function () {
if (this.theState === jssun.java2d.StateTrackable.State.IMMUTABLE) {
throw  new IllegalStateException ("IMMUTABLE objects cannot become UNTRACKABLE");
}this.theState = jssun.java2d.StateTrackable.State.UNTRACKABLE;
this.theTracker = null;
});
Clazz.defineMethod (c$, "addDynamicAgent", 
function () {
if (this.theState === jssun.java2d.StateTrackable.State.IMMUTABLE) {
throw  new IllegalStateException ("Cannot change state from IMMUTABLE");
}++this.numDynamicAgents;
if (this.theState === jssun.java2d.StateTrackable.State.STABLE) {
this.theState = jssun.java2d.StateTrackable.State.DYNAMIC;
this.theTracker = null;
}});
Clazz.defineMethod (c$, "removeDynamicAgent", 
function () {
if (--this.numDynamicAgents == 0 && this.theState === jssun.java2d.StateTrackable.State.DYNAMIC) {
this.theState = jssun.java2d.StateTrackable.State.STABLE;
this.theTracker = null;
}});
Clazz.defineMethod (c$, "markDirty", 
function () {
this.theTracker = null;
});
c$.$StateTrackableDelegate$1$ = function () {
Clazz.pu$h(self.c$);
c$ = Clazz.declareAnonymous (jssun.java2d, "StateTrackableDelegate$1", null, jssun.java2d.StateTracker);
Clazz.overrideMethod (c$, "isCurrent", 
function () {
return (this.b$["jssun.java2d.StateTrackableDelegate"].theTracker === this);
});
c$ = Clazz.p0p ();
};
c$.UNTRACKABLE_DELEGATE = c$.prototype.UNTRACKABLE_DELEGATE =  new jssun.java2d.StateTrackableDelegate (jssun.java2d.StateTrackable.State.UNTRACKABLE);
c$.IMMUTABLE_DELEGATE = c$.prototype.IMMUTABLE_DELEGATE =  new jssun.java2d.StateTrackableDelegate (jssun.java2d.StateTrackable.State.IMMUTABLE);
});

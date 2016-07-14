Clazz.declarePackage ("java.lang");
Clazz.load (["java.lang.Thread"], "java.lang.ThreadGroup", ["java.lang.IllegalThreadStateException", "$.ThreadDeath", "java.util.Arrays"], function () {
c$ = Clazz.decorateAsClass (function () {
this.parent = null;
this.name = null;
this.maxPriority = 10;
this.destroyed = false;
this.daemon = false;
this.vmAllowSuspension = false;
this.nUnstartedThreads = 0;
this.nthreads = 0;
this.threads = null;
this.ngroups = 0;
this.groups = null;
this.html5Applet = null;
Clazz.instantialize (this, arguments);
}, java.lang, "ThreadGroup", null, java.lang.Thread.UncaughtExceptionHandler);
Clazz.makeConstructor (c$, 
function (name) {
this.construct (java.lang.Thread.currentThread ().getThreadGroup (), name);
}, "~S");
Clazz.makeConstructor (c$, 
function (parent, name) {
this.name = name;
this.parent = parent;
if (parent != null) {
this.maxPriority = parent.maxPriority;
this.daemon = parent.daemon;
this.vmAllowSuspension = parent.vmAllowSuspension;
parent.add (this);
}}, "java.lang.ThreadGroup,~S");
Clazz.defineMethod (c$, "getName", 
function () {
return this.name;
});
Clazz.defineMethod (c$, "getParent", 
function () {
if (this.parent != null) this.parent.checkAccess ();
return this.parent;
});
Clazz.defineMethod (c$, "getMaxPriority", 
function () {
return this.maxPriority;
});
Clazz.defineMethod (c$, "isDaemon", 
function () {
return this.daemon;
});
Clazz.defineMethod (c$, "isDestroyed", 
function () {
return this.destroyed;
});
Clazz.defineMethod (c$, "setDaemon", 
function (daemon) {
this.checkAccess ();
this.daemon = daemon;
}, "~B");
Clazz.defineMethod (c$, "setMaxPriority", 
function (pri) {
var ngroupsSnapshot;
var groupsSnapshot;
{
this.checkAccess ();
if (pri < 1 || pri > 10) {
return;
}this.maxPriority = (this.parent != null) ? Math.min (pri, this.parent.maxPriority) : pri;
ngroupsSnapshot = this.ngroups;
if (this.groups != null) {
groupsSnapshot = java.util.Arrays.copyOf (this.groups, ngroupsSnapshot);
} else {
groupsSnapshot = null;
}}for (var i = 0; i < ngroupsSnapshot; i++) {
groupsSnapshot[i].setMaxPriority (pri);
}
}, "~N");
Clazz.defineMethod (c$, "parentOf", 
function (g) {
for (; g != null; g = g.parent) {
if (g === this) {
return true;
}}
return false;
}, "java.lang.ThreadGroup");
Clazz.defineMethod (c$, "checkAccess", 
function () {
});
Clazz.defineMethod (c$, "activeCount", 
function () {
var result;
var ngroupsSnapshot;
var groupsSnapshot;
{
if (this.destroyed) {
return 0;
}result = this.nthreads;
ngroupsSnapshot = this.ngroups;
if (this.groups != null) {
groupsSnapshot = java.util.Arrays.copyOf (this.groups, ngroupsSnapshot);
} else {
groupsSnapshot = null;
}}for (var i = 0; i < ngroupsSnapshot; i++) {
result += groupsSnapshot[i].activeCount ();
}
return result;
});
Clazz.defineMethod (c$, "enumerate", 
function (list) {
this.checkAccess ();
return this.enumerate (list, 0, true);
}, "~A");
Clazz.defineMethod (c$, "enumerate", 
function (list, recurse) {
this.checkAccess ();
return this.enumerate (list, 0, recurse);
}, "~A,~B");
Clazz.defineMethod (c$, "enumerate", 
 function (list, n, recurse) {
var ngroupsSnapshot = 0;
var groupsSnapshot = null;
{
if (this.destroyed) {
return 0;
}var nt = this.nthreads;
if (nt > list.length - n) {
nt = list.length - n;
}for (var i = 0; i < nt; i++) {
if (this.threads[i].isAlive ()) {
list[n++] = this.threads[i];
}}
if (recurse) {
ngroupsSnapshot = this.ngroups;
if (this.groups != null) {
groupsSnapshot = java.util.Arrays.copyOf (this.groups, ngroupsSnapshot);
} else {
groupsSnapshot = null;
}}}if (recurse) {
for (var i = 0; i < ngroupsSnapshot; i++) {
n = groupsSnapshot[i].enumerate (list, n, true);
}
}return n;
}, "~A,~N,~B");
Clazz.defineMethod (c$, "activeGroupCount", 
function () {
var ngroupsSnapshot;
var groupsSnapshot;
{
if (this.destroyed) {
return 0;
}ngroupsSnapshot = this.ngroups;
if (this.groups != null) {
groupsSnapshot = java.util.Arrays.copyOf (this.groups, ngroupsSnapshot);
} else {
groupsSnapshot = null;
}}var n = ngroupsSnapshot;
for (var i = 0; i < ngroupsSnapshot; i++) {
n += groupsSnapshot[i].activeGroupCount ();
}
return n;
});
Clazz.defineMethod (c$, "enumerate", 
function (list) {
this.checkAccess ();
return this.enumerate (list, 0, true);
}, "~A");
Clazz.defineMethod (c$, "enumerate", 
function (list, recurse) {
this.checkAccess ();
return this.enumerate (list, 0, recurse);
}, "~A,~B");
Clazz.defineMethod (c$, "enumerate", 
 function (list, n, recurse) {
var ngroupsSnapshot = 0;
var groupsSnapshot = null;
{
if (this.destroyed) {
return 0;
}var ng = this.ngroups;
if (ng > list.length - n) {
ng = list.length - n;
}if (ng > 0) {
System.arraycopy (this.groups, 0, list, n, ng);
n += ng;
}if (recurse) {
ngroupsSnapshot = this.ngroups;
if (this.groups != null) {
groupsSnapshot = java.util.Arrays.copyOf (this.groups, ngroupsSnapshot);
} else {
groupsSnapshot = null;
}}}if (recurse) {
for (var i = 0; i < ngroupsSnapshot; i++) {
n = groupsSnapshot[i].enumerate (list, n, true);
}
}return n;
}, "~A,~N,~B");
Clazz.defineMethod (c$, "stop", 
function () {
if (this.stopOrSuspend (false)) java.lang.Thread.currentThread ().stop ();
});
Clazz.defineMethod (c$, "interrupt", 
function () {
var ngroupsSnapshot;
var groupsSnapshot;
{
this.checkAccess ();
for (var i = 0; i < this.nthreads; i++) {
this.threads[i].interrupt ();
}
ngroupsSnapshot = this.ngroups;
if (this.groups != null) {
groupsSnapshot = java.util.Arrays.copyOf (this.groups, ngroupsSnapshot);
} else {
groupsSnapshot = null;
}}for (var i = 0; i < ngroupsSnapshot; i++) {
groupsSnapshot[i].interrupt ();
}
});
Clazz.defineMethod (c$, "suspend", 
function () {
if (this.stopOrSuspend (true)) java.lang.Thread.currentThread ().suspend ();
});
Clazz.defineMethod (c$, "stopOrSuspend", 
 function (suspend) {
var suicide = false;
var us = java.lang.Thread.currentThread ();
var ngroupsSnapshot;
var groupsSnapshot = null;
{
this.checkAccess ();
for (var i = 0; i < this.nthreads; i++) {
if (this.threads[i] === us) suicide = true;
 else if (suspend) this.threads[i].suspend ();
 else this.threads[i].stop ();
}
ngroupsSnapshot = this.ngroups;
if (this.groups != null) {
groupsSnapshot = java.util.Arrays.copyOf (this.groups, ngroupsSnapshot);
}}for (var i = 0; i < ngroupsSnapshot; i++) suicide = groupsSnapshot[i].stopOrSuspend (suspend) || suicide;

return suicide;
}, "~B");
Clazz.defineMethod (c$, "resume", 
function () {
var ngroupsSnapshot;
var groupsSnapshot;
{
this.checkAccess ();
for (var i = 0; i < this.nthreads; i++) {
this.threads[i].resume ();
}
ngroupsSnapshot = this.ngroups;
if (this.groups != null) {
groupsSnapshot = java.util.Arrays.copyOf (this.groups, ngroupsSnapshot);
} else {
groupsSnapshot = null;
}}for (var i = 0; i < ngroupsSnapshot; i++) {
groupsSnapshot[i].resume ();
}
});
Clazz.defineMethod (c$, "destroy", 
function () {
var ngroupsSnapshot;
var groupsSnapshot;
{
this.checkAccess ();
if (this.destroyed || (this.nthreads > 0)) {
throw  new IllegalThreadStateException ();
}ngroupsSnapshot = this.ngroups;
if (this.groups != null) {
groupsSnapshot = java.util.Arrays.copyOf (this.groups, ngroupsSnapshot);
} else {
groupsSnapshot = null;
}if (this.parent != null) {
this.destroyed = true;
this.ngroups = 0;
this.groups = null;
this.nthreads = 0;
this.threads = null;
}}for (var i = 0; i < ngroupsSnapshot; i += 1) {
groupsSnapshot[i].destroy ();
}
if (this.parent != null) {
this.parent.remove (this);
}});
Clazz.defineMethod (c$, "add", 
 function (g) {
{
if (this.destroyed) {
throw  new IllegalThreadStateException ();
}if (this.groups == null) {
this.groups =  new Array (4);
} else if (this.ngroups == this.groups.length) {
this.groups = java.util.Arrays.copyOf (this.groups, this.ngroups * 2);
}this.groups[this.ngroups] = g;
this.ngroups++;
}}, "java.lang.ThreadGroup");
Clazz.defineMethod (c$, "remove", 
 function (g) {
{
if (this.destroyed) {
return;
}for (var i = 0; i < this.ngroups; i++) {
if (this.groups[i] === g) {
this.ngroups -= 1;
System.arraycopy (this.groups, i + 1, this.groups, i, this.ngroups - i);
this.groups[this.ngroups] = null;
break;
}}
if (this.nthreads == 0) {
this.notifyAll ();
}if (this.daemon && (this.nthreads == 0) && (this.nUnstartedThreads == 0) && (this.ngroups == 0)) {
this.destroy ();
}}}, "java.lang.ThreadGroup");
Clazz.defineMethod (c$, "addUnstarted", 
function () {
{
if (this.destroyed) {
throw  new IllegalThreadStateException ();
}this.nUnstartedThreads++;
}});
Clazz.defineMethod (c$, "add", 
function (t) {
{
if (this.destroyed) {
throw  new IllegalThreadStateException ();
}if (this.threads == null) {
this.threads =  new Array (4);
} else if (this.nthreads == this.threads.length) {
this.threads = java.util.Arrays.copyOf (this.threads, this.nthreads * 2);
}this.threads[this.nthreads] = t;
this.nthreads++;
this.nUnstartedThreads--;
}}, "java.lang.Thread");
Clazz.defineMethod (c$, "remove", 
function (t) {
{
if (this.destroyed) {
return;
}for (var i = 0; i < this.nthreads; i++) {
if (this.threads[i] === t) {
System.arraycopy (this.threads, i + 1, this.threads, i, --this.nthreads - i);
this.threads[this.nthreads] = null;
break;
}}
if (this.nthreads == 0) {
this.notifyAll ();
}if (this.daemon && (this.nthreads == 0) && (this.nUnstartedThreads == 0) && (this.ngroups == 0)) {
this.destroy ();
}}}, "java.lang.Thread");
Clazz.defineMethod (c$, "uncaughtException", 
function (t, e) {
if (this.parent != null) {
this.parent.uncaughtException (t, e);
} else {
var ueh = java.lang.Thread.getDefaultUncaughtExceptionHandler ();
if (ueh != null) {
ueh.uncaughtException (t, e);
} else if (!(Clazz.instanceOf (e, ThreadDeath))) {
System.err.print ("Exception in thread \"" + t.getName () + "\" ");
e.printStackTrace (System.err);
}}}, "java.lang.Thread,Throwable");
Clazz.overrideMethod (c$, "toString", 
function () {
return this.getClass ().getName () + "[name=" + this.getName () + ",maxpri=" + this.maxPriority + ",html5Applet=" + this.html5Applet + "]";
});
});

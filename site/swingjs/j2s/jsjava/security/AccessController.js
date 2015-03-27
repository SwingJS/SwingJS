Clazz.declarePackage ("jsjava.security");
Clazz.load (["jsjava.security.AccessControlContext"], "jsjava.security.AccessController", null, function () {
c$ = Clazz.declareType (jsjava.security, "AccessController", null, jsjava.security.AccessControlContext);
c$.doPrivileged = Clazz.defineMethod (c$, "doPrivileged", 
function (action) {
return action.run ();
}, "jsjava.security.PrivilegedAction");
c$.getContext = Clazz.defineMethod (c$, "getContext", 
function () {
return  new jsjava.security.AccessController ();
});
Clazz.overrideMethod (c$, "checkPermission", 
function (perm) {
return true;
}, "~O");
c$.doPrivileged = Clazz.defineMethod (c$, "doPrivileged", 
function (action, context) {
return action.run ();
}, "jsjava.security.PrivilegedAction,jsjava.security.AccessControlContext");
});

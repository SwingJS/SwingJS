Clazz.declarePackage ("jssun.security.action");
Clazz.load (["jsjava.security.PrivilegedAction"], "jssun.security.action.GetPropertyAction", null, function () {
c$ = Clazz.decorateAsClass (function () {
this.theProp = null;
this.defaultVal = null;
Clazz.instantialize (this, arguments);
}, jssun.security.action, "GetPropertyAction", null, jsjava.security.PrivilegedAction);
Clazz.makeConstructor (c$, 
function (theProp) {
this.theProp = theProp;
}, "~S");
Clazz.makeConstructor (c$, 
function (theProp, defaultVal) {
this.theProp = theProp;
this.defaultVal = defaultVal;
}, "~S,~S");
Clazz.overrideMethod (c$, "run", 
function () {
var value = System.getProperty (this.theProp);
return (value == null ? this.defaultVal : value);
});
});

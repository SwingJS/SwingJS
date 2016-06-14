Clazz.declarePackage ("java.util");
Clazz.load (["java.lang.RuntimeException"], "java.util.MissingResourceException", null, function () {
c$ = Clazz.decorateAsClass (function () {
this.className = null;
this.key = null;
Clazz.instantialize (this, arguments);
}, java.util, "MissingResourceException", RuntimeException);
Clazz.makeConstructor (c$, 
function (s, className, key) {
Clazz.superConstructor (this, java.util.MissingResourceException, [s]);
this.className = className;
this.key = key;
}, "~S,~S,~S");
Clazz.makeConstructor (c$, 
function (message, className, key, cause) {
Clazz.superConstructor (this, java.util.MissingResourceException, [message, cause]);
this.className = className;
this.key = key;
}, "~S,~S,~S,Throwable");
Clazz.defineMethod (c$, "getClassName", 
function () {
return this.className;
});
Clazz.defineMethod (c$, "getKey", 
function () {
return this.key;
});
});

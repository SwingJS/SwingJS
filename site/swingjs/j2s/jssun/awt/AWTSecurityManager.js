Clazz.declarePackage ("jssun.awt");
Clazz.load (["java.lang.SecurityManager"], "jssun.awt.AWTSecurityManager", null, function () {
c$ = Clazz.declareType (jssun.awt, "AWTSecurityManager", SecurityManager);
Clazz.defineMethod (c$, "getAppContext", 
function () {
return null;
});
});

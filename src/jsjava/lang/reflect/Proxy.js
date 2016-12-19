Clazz.declarePackage ("java.lang.reflect");
c$ = Clazz.decorateAsClass (function () {
this.h = null;
this.loader = null;
Clazz.instantialize (this, arguments);
}, java.lang.reflect, "Proxy");
Clazz.makeConstructor (c$, 
 function (loader, h) {
this.loader = loader;
this.h = h;
}, "ClassLoader,java.lang.reflect.InvocationHandler");
c$.newProxyInstance = Clazz.defineMethod (c$, "newProxyInstance", 
function (loader, interfaces, h) {
return  new java.lang.reflect.Proxy (loader, h);
}, "ClassLoader,~A,java.lang.reflect.InvocationHandler");
Clazz.defineMethod (c$, "$invokeMethod", 
function (methodName, args) {
try {
var a = args
if (!(a instanceof Array)) {
	 a = Array(arguments.length - 1);
	  for (var i = arguments.length - 1; --i >= 0;)
  		 a[i] = arguments[i + 1];
   }
this.h.invoke (this.loader, methodName, a);
} catch (e) {
e.printStackTrace ();
}
}, "~S,~A");

Clazz.declarePackage ("jssun.swing");
Clazz.load (["javax.swing.UIDefaults"], "jssun.swing.SwingLazyValue", ["java.lang.Boolean", "java.awt.Color", "javax.swing.plaf.ColorUIResource"], function () {
c$ = Clazz.decorateAsClass (function () {
this.className = null;
this.methodName = null;
this.args = null;
Clazz.instantialize (this, arguments);
}, jssun.swing, "SwingLazyValue", null, javax.swing.UIDefaults.LazyValue);
Clazz.makeConstructor (c$, 
function (c) {
this.construct (c, Clazz.castNullAs ("String"));
}, "~S");
Clazz.makeConstructor (c$, 
function (c, m) {
this.construct (c, m, null);
}, "~S,~S");
Clazz.makeConstructor (c$, 
function (c, o) {
this.construct (c, null, o);
}, "~S,~A");
Clazz.makeConstructor (c$, 
function (c, m, o) {
this.className = c;
this.methodName = m;
if (o != null) {
this.args = o.clone ();
}}, "~S,~S,~A");
Clazz.overrideMethod (c$, "createValue", 
function (table) {
try {
var c = Clazz._4Name (this.className, true, null);
if (this.methodName != null) {
var types = this.getClassArray (this.args);
var m = c.getMethod (this.methodName, types);
return m.invoke (c, this.args);
} else {
var types = this.getClassArray (this.args);
var constructor = c.getConstructor (types);
return constructor.newInstance (this.args);
}} catch (e) {
if (Clazz.exceptionOf (e, Exception)) {
} else {
throw e;
}
}
return null;
}, "javax.swing.UIDefaults");
Clazz.defineMethod (c$, "getClassArray", 
 function (args) {
var types = null;
if (args != null) {
types =  new Array (args.length);
for (var i = 0; i < args.length; i++) {
if (Clazz.instanceOf (args[i], Integer)) {
types[i] = Integer.TYPE;
} else if (Clazz.instanceOf (args[i], Boolean)) {
types[i] = Boolean.TYPE;
} else if (Clazz.instanceOf (args[i], javax.swing.plaf.ColorUIResource)) {
types[i] = java.awt.Color;
} else {
types[i] = args[i].getClass ();
}}
}return types;
}, "~A");
});

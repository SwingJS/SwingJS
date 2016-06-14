Clazz.declarePackage ("jssun.font");
Clazz.load (["java.util.AbstractMap"], "jssun.font.AttributeMap", ["java.lang.Thread", "java.util.HashMap"], function () {
c$ = Clazz.decorateAsClass (function () {
this.$$values = null;
this.delegateMap = null;
Clazz.instantialize (this, arguments);
}, jssun.font, "AttributeMap", java.util.AbstractMap);
Clazz.makeConstructor (c$, 
function (values) {
Clazz.superConstructor (this, jssun.font.AttributeMap, []);
this.$$values = values;
}, "jssun.font.AttributeValues");
Clazz.overrideMethod (c$, "entrySet", 
function () {
return this.delegate ().entrySet ();
});
Clazz.overrideMethod (c$, "put", 
function (key, value) {
return this.delegate ().put (key, value);
}, "java.awt.font.TextAttribute,~O");
Clazz.defineMethod (c$, "getValues", 
function () {
return this.$$values;
});
Clazz.defineMethod (c$, "delegate", 
 function () {
if (this.delegateMap == null) {
if (jssun.font.AttributeMap.first) {
jssun.font.AttributeMap.first = false;
Thread.dumpStack ();
}this.delegateMap = this.$$values.toMap ( new java.util.HashMap (27));
this.$$values = null;
}return this.delegateMap;
});
Clazz.defineMethod (c$, "toString", 
function () {
if (this.$$values != null) {
return "map of " + this.$$values.toString ();
}return Clazz.superCall (this, jssun.font.AttributeMap, "toString", []);
});
Clazz.defineStatics (c$,
"first", false);
});

Clazz.declarePackage ("jssun.misc");
Clazz.load (["java.lang.ref.SoftReference", "java.util.AbstractMap", "$.AbstractSet", "$.Map", "java.lang.ref.ReferenceQueue"], "jssun.misc.SoftCache", ["java.util.HashMap", "$.Iterator", "java.util.Map.Entry", "java.util.NoSuchElementException"], function () {
c$ = Clazz.decorateAsClass (function () {
this.hash = null;
this.queue = null;
if (!Clazz.isClassDefined ("jssun.misc.SoftCache.Entry")) {
jssun.misc.SoftCache.$SoftCache$Entry$ ();
}
if (!Clazz.isClassDefined ("jssun.misc.SoftCache.EntrySet")) {
jssun.misc.SoftCache.$SoftCache$EntrySet$ ();
}
this.$entrySet = null;
Clazz.instantialize (this, arguments);
}, jssun.misc, "SoftCache", java.util.AbstractMap, java.util.Map);
Clazz.prepareFields (c$, function () {
this.queue =  new java.lang.ref.ReferenceQueue ();
});
Clazz.defineMethod (c$, "processQueue", 
($fz = function () {
var vc;
while ((vc = this.queue.poll ()) != null) {
if (vc.isValid ()) this.hash.remove (vc.key);
 else jssun.misc.SoftCache.ValueCell.dropped--;
}
}, $fz.isPrivate = true, $fz));
Clazz.makeConstructor (c$, 
function (initialCapacity, loadFactor) {
Clazz.superConstructor (this, jssun.misc.SoftCache, []);
this.hash =  new java.util.HashMap (initialCapacity, loadFactor);
}, "~N,~N");
Clazz.makeConstructor (c$, 
function (initialCapacity) {
Clazz.superConstructor (this, jssun.misc.SoftCache, []);
this.hash =  new java.util.HashMap (initialCapacity);
}, "~N");
Clazz.makeConstructor (c$, 
function () {
Clazz.superConstructor (this, jssun.misc.SoftCache, []);
this.hash =  new java.util.HashMap ();
});
Clazz.overrideMethod (c$, "size", 
function () {
return this.entrySet ().size ();
});
Clazz.overrideMethod (c$, "isEmpty", 
function () {
return this.entrySet ().isEmpty ();
});
Clazz.overrideMethod (c$, "containsKey", 
function (key) {
return jssun.misc.SoftCache.ValueCell.strip (this.hash.get (key), false) != null;
}, "~O");
Clazz.defineMethod (c$, "fill", 
function (key) {
return null;
}, "~O");
Clazz.defineMethod (c$, "get", 
function (key) {
this.processQueue ();
var v = this.hash.get (key);
if (v == null) {
v = this.fill (key);
if (v != null) {
this.hash.put (key, jssun.misc.SoftCache.ValueCell.create (key, v, this.queue));
return v;
}}return jssun.misc.SoftCache.ValueCell.strip (v, false);
}, "~O");
Clazz.defineMethod (c$, "put", 
function (key, value) {
this.processQueue ();
var vc = jssun.misc.SoftCache.ValueCell.create (key, value, this.queue);
return jssun.misc.SoftCache.ValueCell.strip (this.hash.put (key, vc), true);
}, "~O,~O");
Clazz.defineMethod (c$, "remove", 
function (key) {
this.processQueue ();
return jssun.misc.SoftCache.ValueCell.strip (this.hash.remove (key), true);
}, "~O");
Clazz.defineMethod (c$, "clear", 
function () {
this.processQueue ();
this.hash.clear ();
});
c$.valEquals = Clazz.defineMethod (c$, "valEquals", 
($fz = function (o1, o2) {
return (o1 == null) ? (o2 == null) : o1.equals (o2);
}, $fz.isPrivate = true, $fz), "~O,~O");
Clazz.defineMethod (c$, "entrySet", 
function () {
if (this.$entrySet == null) this.$entrySet = Clazz.innerTypeInstance (jssun.misc.SoftCache.EntrySet, this, null);
return this.$entrySet;
});
c$.$SoftCache$Entry$ = function () {
Clazz.pu$h ();
c$ = Clazz.decorateAsClass (function () {
Clazz.prepareCallback (this, arguments);
this.ent = null;
this.value = null;
Clazz.instantialize (this, arguments);
}, jssun.misc.SoftCache, "Entry", null, java.util.Map.Entry);
Clazz.makeConstructor (c$, 
function (a, b) {
this.ent = a;
this.value = b;
}, "java.util.Map.Entry,~O");
Clazz.defineMethod (c$, "getKey", 
function () {
return this.ent.getKey ();
});
Clazz.defineMethod (c$, "getValue", 
function () {
return this.value;
});
Clazz.defineMethod (c$, "setValue", 
function (a) {
return this.ent.setValue (jssun.misc.SoftCache.ValueCell.create (this.ent.getKey (), a, this.b$["jssun.misc.SoftCache"].queue));
}, "~O");
Clazz.overrideMethod (c$, "equals", 
function (a) {
if (!(Clazz.instanceOf (a, java.util.Map.Entry))) return false;
var b = a;
return (jssun.misc.SoftCache.valEquals (this.ent.getKey (), b.getKey ()) && jssun.misc.SoftCache.valEquals (this.value, b.getValue ()));
}, "~O");
Clazz.overrideMethod (c$, "hashCode", 
function () {
var a;
return ((((a = this.getKey ()) == null) ? 0 : a.hashCode ()) ^ ((this.value == null) ? 0 : this.value.hashCode ()));
});
c$ = Clazz.p0p ();
};
c$.$SoftCache$EntrySet$ = function () {
Clazz.pu$h ();
c$ = Clazz.decorateAsClass (function () {
Clazz.prepareCallback (this, arguments);
this.hashEntries = null;
Clazz.instantialize (this, arguments);
}, jssun.misc.SoftCache, "EntrySet", java.util.AbstractSet);
Clazz.prepareFields (c$, function () {
this.hashEntries = this.b$["jssun.misc.SoftCache"].hash.entrySet ();
});
Clazz.defineMethod (c$, "iterator", 
function () {
return ((Clazz.isClassDefined ("jssun.misc.SoftCache$EntrySet$1") ? 0 : jssun.misc.SoftCache.EntrySet.$SoftCache$EntrySet$1$ ()), Clazz.innerTypeInstance (jssun.misc.SoftCache$EntrySet$1, this, null));
});
Clazz.overrideMethod (c$, "isEmpty", 
function () {
return !(this.iterator ().hasNext ());
});
Clazz.overrideMethod (c$, "size", 
function () {
var a = 0;
for (var b = this.iterator (); b.hasNext (); b.next ()) a++;

return a;
});
Clazz.defineMethod (c$, "remove", 
function (a) {
this.b$["jssun.misc.SoftCache"].processQueue ();
if (Clazz.instanceOf (a, jssun.misc.SoftCache.Entry)) return this.hashEntries.remove ((a).ent);
 else return false;
}, "~O");
c$.$SoftCache$EntrySet$1$ = function () {
Clazz.pu$h ();
c$ = Clazz.decorateAsClass (function () {
Clazz.prepareCallback (this, arguments);
this.hashIterator = null;
this.$next = null;
Clazz.instantialize (this, arguments);
}, jssun.misc, "SoftCache$EntrySet$1", null, java.util.Iterator);
Clazz.prepareFields (c$, function () {
this.hashIterator = this.b$["jssun.misc.SoftCache.EntrySet"].hashEntries.iterator ();
});
Clazz.defineMethod (c$, "hasNext", 
function () {
while (this.hashIterator.hasNext ()) {
var a = this.hashIterator.next ();
var b = a.getValue ();
var c = null;
if ((b != null) && ((c = b.get ()) == null)) {
continue;
}this.$next = Clazz.innerTypeInstance (jssun.misc.SoftCache.Entry, this, null, a, c);
return true;
}
return false;
});
Clazz.defineMethod (c$, "next", 
function () {
if ((this.$next == null) && !this.hasNext ()) throw  new java.util.NoSuchElementException ();
var a = this.$next;
this.$next = null;
return a;
});
Clazz.defineMethod (c$, "remove", 
function () {
this.hashIterator.remove ();
});
c$ = Clazz.p0p ();
};
c$ = Clazz.p0p ();
};
Clazz.pu$h ();
c$ = Clazz.decorateAsClass (function () {
this.key = null;
Clazz.instantialize (this, arguments);
}, jssun.misc.SoftCache, "ValueCell", java.lang.ref.SoftReference);
Clazz.makeConstructor (c$, 
($fz = function (a, b, c) {
Clazz.superConstructor (this, jssun.misc.SoftCache.ValueCell, [b, c]);
this.key = a;
}, $fz.isPrivate = true, $fz), "~O,~O,java.lang.ref.ReferenceQueue");
c$.create = Clazz.defineMethod (c$, "create", 
($fz = function (a, b, c) {
if (b == null) return null;
return  new jssun.misc.SoftCache.ValueCell (a, b, c);
}, $fz.isPrivate = true, $fz), "~O,~O,java.lang.ref.ReferenceQueue");
c$.strip = Clazz.defineMethod (c$, "strip", 
($fz = function (a, b) {
if (a == null) return null;
var c = a;
var d = c.get ();
if (b) c.drop ();
return d;
}, $fz.isPrivate = true, $fz), "~O,~B");
Clazz.defineMethod (c$, "isValid", 
($fz = function () {
return (this.key !== jssun.misc.SoftCache.ValueCell.INVALID_KEY);
}, $fz.isPrivate = true, $fz));
Clazz.defineMethod (c$, "drop", 
($fz = function () {
Clazz.superCall (this, jssun.misc.SoftCache.ValueCell, "clear", []);
this.key = jssun.misc.SoftCache.ValueCell.INVALID_KEY;
jssun.misc.SoftCache.ValueCell.dropped++;
}, $fz.isPrivate = true, $fz));
c$.INVALID_KEY = c$.prototype.INVALID_KEY =  new JavaObject ();
Clazz.defineStatics (c$,
"dropped", 0);
c$ = Clazz.p0p ();
});

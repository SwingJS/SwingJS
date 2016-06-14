Clazz.declarePackage ("test");
Clazz.load (["java.util.HashMap"], ["test.B", "$.A", "$.BugTest"], null, function () {
c$ = Clazz.declareType (test, "A");
Clazz.defineMethod (c$, "init", 
 function () {
System.out.println ("class A init");
});
Clazz.defineMethod (c$, "init", 
function (a) {
System.out.println ("class A init String a");
}, "~S");
Clazz.defineMethod (c$, "init2", 
function () {
System.out.println ("class A init2");
this.init ();
});
c$ = Clazz.declareType (test, "B", test.A);
Clazz.defineMethod (c$, "init", 
function () {
var $private = Clazz.checkPrivateMethod (arguments);
if ($private != null) {
return $private.apply (this, arguments);
}
System.out.println ("class B init");
Clazz.superCall (this, test.B, "init2", []);
});
Clazz.defineMethod (c$, "init", 
function (b) {
var $private = Clazz.checkPrivateMethod (arguments);
if ($private != null) {
return $private.apply (this, arguments);
}
System.out.println ("class B init String b");
}, "~S");
c$ = Clazz.decorateAsClass (function () {
this.me = "me";
this.name = null;
if (!Clazz.isClassDefined ("test.BugTest.BaseClass")) {
test.BugTest.$BugTest$BaseClass$ ();
}
if (!Clazz.isClassDefined ("test.BugTest.SubClass")) {
test.BugTest.$BugTest$SubClass$ ();
}
Clazz.instantialize (this, arguments);
}, test, "BugTest", java.util.HashMap);
Clazz.makeConstructor (c$, 
function () {
Clazz.superConstructor (this, test.BugTest, []);
System.out.println ("this is BugTest()" + this.me);
});
Clazz.makeConstructor (c$, 
function (s) {
Clazz.superConstructor (this, test.BugTest, []);
System.out.println ("this is BugTest(String):" + s + this.me);
}, "~S");
Clazz.makeConstructor (c$, 
function (o) {
Clazz.superConstructor (this, test.BugTest, []);
System.out.println ("this is BugTest(Object[]):" + o + this.me);
}, "~A");
Clazz.makeConstructor (c$, 
function (s, t) {
Clazz.superConstructor (this, test.BugTest, []);
System.out.println ("this is BugTest(String,String):" + s + t + this.me);
}, "~S,~S");
Clazz.defineMethod (c$, "test", 
 function (a) {
System.out.println (a + " is an AbstractMap");
}, "java.util.AbstractMap");
Clazz.defineMethod (c$, "test", 
 function (ja) {
System.out.println (ja + " is an Object");
}, "~O");
Clazz.defineMethod (c$, "test1", 
 function (ja) {
System.out.println (ja + " is a Number");
}, "Number");
Clazz.defineMethod (c$, "test1", 
 function (ja) {
System.out.println (ja + " is an int");
}, "~N");
c$.getFont = Clazz.defineMethod (c$, "getFont", 
 function (f) {
return f;
}, "~S");
c$.getFont = Clazz.defineMethod (c$, "getFont", 
 function (f, y) {
return f + y;
}, "~S,~S");
c$.main = Clazz.defineMethod (c$, "main", 
function (args) {
 new test.B ().init ();
try {
var cl;
cl = Clazz._4Name ("test.BugTest");
cl.getConstructor ([String, String]).newInstance (["test1", "test2"]);
cl.getConstructor ([Array]).newInstance ([["test1", "test2"]]);
cl.getConstructor ([String, String]).newInstance (["test1", "test2"]);
cl.getConstructor ([]).newInstance ([]);
cl.newInstance ();
} catch (e) {
if (Clazz.exceptionOf (e, Exception)) {
e.printStackTrace ();
} else {
throw e;
}
}
System.out.println (test.BugTest.getFont ("f"));
System.out.println (test.BugTest.getFont ("f", "y"));
var t =  new test.BugTest ();
t.name = "test";
t.test1 (Integer.$valueOf (33));
t.test1 (33);
t.test (t);
t.test (t);
var a2 =  Clazz.newIntArray (2, 0);
var a20 =  Clazz.newIntArray (2, 0);
var a23 =  Clazz.newIntArray (2, 3, 0);
test.BugTest.printit ([2, 3, 4, 5]);
System.out.println (args);
var test = ['1', '2', '3', '4', '5'];
var s =  String.instantialize (test, 2, 3);
System.out.println ("char test: 345 = " + s);
{
;//debugger;
}test.BugTest.main2 (null);
}, "~A");
c$.printit = Clazz.defineMethod (c$, "printit", 
function (t) {
for (var i = 0; i < t.length; i++) System.out.println (t[i]);

}, "~A");
c$.g = Clazz.defineMethod (c$, "g", 
function (foo) {
var q =  new test.BugTest.Qux ();
q.f (foo);
}, "test.BugTest.INTERFACE");
c$.main2 = Clazz.defineMethod (c$, "main2", 
function (args) {
var b =  new test.BugTest.Baz ();
test.BugTest.g (b);
}, "~A");
Clazz.defineMethod (c$, "main3", 
function (args) {
var obj = Clazz.innerTypeInstance (test.BugTest.SubClass, this, null, "Hello from SubClass");
System.out.println ("Done.");
}, "~A");
c$.$BugTest$BaseClass$ = function () {
Clazz.pu$h(self.c$);
c$ = Clazz.decorateAsClass (function () {
Clazz.prepareCallback (this, arguments);
Clazz.instantialize (this, arguments);
}, test.BugTest, "BaseClass");
Clazz.makeConstructor (c$, 
function () {
this.construct ("");
});
Clazz.makeConstructor (c$, 
function (a) {
System.out.println (a + "Hello from BaseClass");
}, "~S");
c$ = Clazz.p0p ();
};
c$.$BugTest$SubClass$ = function () {
Clazz.pu$h(self.c$);
c$ = Clazz.decorateAsClass (function () {
Clazz.prepareCallback (this, arguments);
Clazz.instantialize (this, arguments);
}, test.BugTest, "SubClass", test.BugTest.BaseClass, null, Clazz.innerTypeInstance (test.BugTest.BaseClass, this, null, Clazz.inheritArgs));
Clazz.makeConstructor (c$, 
function (a) {
Clazz.superConstructor (this, test.BugTest.SubClass);
System.out.println (a);
}, "~S");
c$ = Clazz.p0p ();
};
Clazz.declareInterface (test.BugTest, "INTERFACE");
Clazz.pu$h(self.c$);
c$ = Clazz.declareType (test.BugTest, "CLASS");
c$ = Clazz.p0p ();
Clazz.pu$h(self.c$);
c$ = Clazz.declareType (test.BugTest, "Baz", test.BugTest.CLASS, test.BugTest.INTERFACE);
c$ = Clazz.p0p ();
Clazz.pu$h(self.c$);
c$ = Clazz.declareType (test.BugTest, "Qux");
Clazz.defineMethod (c$, "f", 
function (a) {
System.out.println ("f(INTERFACE) called");
}, "test.BugTest.INTERFACE");
Clazz.defineMethod (c$, "f", 
function (a) {
System.out.println ("f(CLASS) called");
}, "test.BugTest.CLASS");
c$ = Clazz.p0p ();
});

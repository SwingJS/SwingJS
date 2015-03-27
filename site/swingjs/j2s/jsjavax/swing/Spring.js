Clazz.declarePackage ("jsjavax.swing");
Clazz.load (null, "jsjavax.swing.Spring", ["java.lang.NullPointerException"], function () {
c$ = Clazz.declareType (jsjavax.swing, "Spring");
Clazz.makeConstructor (c$, 
function () {
});
Clazz.defineMethod (c$, "range", 
($fz = function (contract) {
return contract ? (this.getPreferredValue () - this.getMinimumValue ()) : (this.getMaximumValue () - this.getPreferredValue ());
}, $fz.isPrivate = true, $fz), "~B");
Clazz.defineMethod (c$, "getStrain", 
function () {
var delta = (this.getValue () - this.getPreferredValue ());
return delta / this.range (this.getValue () < this.getPreferredValue ());
});
Clazz.defineMethod (c$, "setStrain", 
function (strain) {
this.setValue (this.getPreferredValue () + Clazz.doubleToInt (strain * this.range (strain < 0)));
}, "~N");
Clazz.defineMethod (c$, "isCyclic", 
function (l) {
return false;
}, "jsjavax.swing.SpringLayout");
c$.constant = Clazz.defineMethod (c$, "constant", 
function (pref) {
return jsjavax.swing.Spring.constant (pref, pref, pref);
}, "~N");
c$.constant = Clazz.defineMethod (c$, "constant", 
function (min, pref, max) {
return  new jsjavax.swing.Spring.StaticSpring (min, pref, max);
}, "~N,~N,~N");
c$.minus = Clazz.defineMethod (c$, "minus", 
function (s) {
return  new jsjavax.swing.Spring.NegativeSpring (s);
}, "jsjavax.swing.Spring");
c$.sum = Clazz.defineMethod (c$, "sum", 
function (s1, s2) {
return  new jsjavax.swing.Spring.SumSpring (s1, s2);
}, "jsjavax.swing.Spring,jsjavax.swing.Spring");
c$.max = Clazz.defineMethod (c$, "max", 
function (s1, s2) {
return  new jsjavax.swing.Spring.MaxSpring (s1, s2);
}, "jsjavax.swing.Spring,jsjavax.swing.Spring");
c$.difference = Clazz.defineMethod (c$, "difference", 
function (s1, s2) {
return jsjavax.swing.Spring.sum (s1, jsjavax.swing.Spring.minus (s2));
}, "jsjavax.swing.Spring,jsjavax.swing.Spring");
c$.scale = Clazz.defineMethod (c$, "scale", 
function (s, factor) {
jsjavax.swing.Spring.checkArg (s);
return  new jsjavax.swing.Spring.ScaleSpring (s, factor);
}, "jsjavax.swing.Spring,~N");
c$.width = Clazz.defineMethod (c$, "width", 
function (c) {
jsjavax.swing.Spring.checkArg (c);
return  new jsjavax.swing.Spring.WidthSpring (c);
}, "jsjava.awt.Component");
c$.height = Clazz.defineMethod (c$, "height", 
function (c) {
jsjavax.swing.Spring.checkArg (c);
return  new jsjavax.swing.Spring.HeightSpring (c);
}, "jsjava.awt.Component");
c$.checkArg = Clazz.defineMethod (c$, "checkArg", 
($fz = function (s) {
if (s == null) {
throw  new NullPointerException ("Argument must not be null");
}}, $fz.isPrivate = true, $fz), "~O");
Clazz.pu$h ();
c$ = Clazz.decorateAsClass (function () {
this.size = -2147483648;
Clazz.instantialize (this, arguments);
}, jsjavax.swing.Spring, "AbstractSpring", jsjavax.swing.Spring);
Clazz.overrideMethod (c$, "getValue", 
function () {
return this.size != -2147483648 ? this.size : this.getPreferredValue ();
});
Clazz.overrideMethod (c$, "setValue", 
function (a) {
if (this.size == a) {
return;
}if (a == -2147483648) {
this.clear ();
} else {
this.setNonClearValue (a);
}}, "~N");
Clazz.defineMethod (c$, "clear", 
function () {
this.size = -2147483648;
});
Clazz.defineMethod (c$, "setNonClearValue", 
function (a) {
this.size = a;
}, "~N");
c$ = Clazz.p0p ();
Clazz.pu$h ();
c$ = Clazz.decorateAsClass (function () {
this.min = 0;
this.pref = 0;
this.$max = 0;
Clazz.instantialize (this, arguments);
}, jsjavax.swing.Spring, "StaticSpring", jsjavax.swing.Spring.AbstractSpring);
Clazz.makeConstructor (c$, 
function (a) {
this.construct (a, a, a);
}, "~N");
Clazz.makeConstructor (c$, 
function (a, b, c) {
Clazz.superConstructor (this, jsjavax.swing.Spring.StaticSpring, []);
this.min = a;
this.pref = b;
this.$max = c;
}, "~N,~N,~N");
Clazz.overrideMethod (c$, "toString", 
function () {
return "StaticSpring [" + this.min + ", " + this.pref + ", " + this.$max + "]";
});
Clazz.overrideMethod (c$, "getMinimumValue", 
function () {
return this.min;
});
Clazz.overrideMethod (c$, "getPreferredValue", 
function () {
return this.pref;
});
Clazz.overrideMethod (c$, "getMaximumValue", 
function () {
return this.$max;
});
c$ = Clazz.p0p ();
Clazz.pu$h ();
c$ = Clazz.decorateAsClass (function () {
this.s = null;
Clazz.instantialize (this, arguments);
}, jsjavax.swing.Spring, "NegativeSpring", jsjavax.swing.Spring);
Clazz.makeConstructor (c$, 
function (a) {
Clazz.superConstructor (this, jsjavax.swing.Spring.NegativeSpring, []);
this.s = a;
}, "jsjavax.swing.Spring");
Clazz.defineMethod (c$, "getMinimumValue", 
function () {
return -this.s.getMaximumValue ();
});
Clazz.defineMethod (c$, "getPreferredValue", 
function () {
return -this.s.getPreferredValue ();
});
Clazz.defineMethod (c$, "getMaximumValue", 
function () {
return -this.s.getMinimumValue ();
});
Clazz.defineMethod (c$, "getValue", 
function () {
return -this.s.getValue ();
});
Clazz.defineMethod (c$, "setValue", 
function (a) {
this.s.setValue (-a);
}, "~N");
Clazz.defineMethod (c$, "isCyclic", 
function (a) {
return this.s.isCyclic (a);
}, "jsjavax.swing.SpringLayout");
c$ = Clazz.p0p ();
Clazz.pu$h ();
c$ = Clazz.decorateAsClass (function () {
this.s = null;
this.factor = 0;
Clazz.instantialize (this, arguments);
}, jsjavax.swing.Spring, "ScaleSpring", jsjavax.swing.Spring);
Clazz.makeConstructor (c$, 
($fz = function (a, b) {
Clazz.superConstructor (this, jsjavax.swing.Spring.ScaleSpring, []);
this.s = a;
this.factor = b;
}, $fz.isPrivate = true, $fz), "jsjavax.swing.Spring,~N");
Clazz.defineMethod (c$, "getMinimumValue", 
function () {
return Math.round ((this.factor < 0 ? this.s.getMaximumValue () : this.s.getMinimumValue ()) * this.factor);
});
Clazz.defineMethod (c$, "getPreferredValue", 
function () {
return Math.round (this.s.getPreferredValue () * this.factor);
});
Clazz.defineMethod (c$, "getMaximumValue", 
function () {
return Math.round ((this.factor < 0 ? this.s.getMinimumValue () : this.s.getMaximumValue ()) * this.factor);
});
Clazz.defineMethod (c$, "getValue", 
function () {
return Math.round (this.s.getValue () * this.factor);
});
Clazz.defineMethod (c$, "setValue", 
function (a) {
if (a == -2147483648) {
this.s.setValue (-2147483648);
} else {
this.s.setValue (Math.round (a / this.factor));
}}, "~N");
Clazz.defineMethod (c$, "isCyclic", 
function (a) {
return this.s.isCyclic (a);
}, "jsjavax.swing.SpringLayout");
c$ = Clazz.p0p ();
Clazz.pu$h ();
c$ = Clazz.decorateAsClass (function () {
this.c = null;
Clazz.instantialize (this, arguments);
}, jsjavax.swing.Spring, "WidthSpring", jsjavax.swing.Spring.AbstractSpring);
Clazz.makeConstructor (c$, 
function (a) {
Clazz.superConstructor (this, jsjavax.swing.Spring.WidthSpring, []);
this.c = a;
}, "jsjava.awt.Component");
Clazz.overrideMethod (c$, "getMinimumValue", 
function () {
return this.c.getMinimumSize ().width;
});
Clazz.overrideMethod (c$, "getPreferredValue", 
function () {
return this.c.getPreferredSize ().width;
});
Clazz.overrideMethod (c$, "getMaximumValue", 
function () {
return Math.min (32767, this.c.getMaximumSize ().width);
});
c$ = Clazz.p0p ();
Clazz.pu$h ();
c$ = Clazz.decorateAsClass (function () {
this.c = null;
Clazz.instantialize (this, arguments);
}, jsjavax.swing.Spring, "HeightSpring", jsjavax.swing.Spring.AbstractSpring);
Clazz.makeConstructor (c$, 
function (a) {
Clazz.superConstructor (this, jsjavax.swing.Spring.HeightSpring, []);
this.c = a;
}, "jsjava.awt.Component");
Clazz.overrideMethod (c$, "getMinimumValue", 
function () {
return this.c.getMinimumSize ().height;
});
Clazz.overrideMethod (c$, "getPreferredValue", 
function () {
return this.c.getPreferredSize ().height;
});
Clazz.overrideMethod (c$, "getMaximumValue", 
function () {
return Math.min (32767, this.c.getMaximumSize ().height);
});
c$ = Clazz.p0p ();
Clazz.pu$h ();
c$ = Clazz.decorateAsClass (function () {
this.s = null;
Clazz.instantialize (this, arguments);
}, jsjavax.swing.Spring, "SpringMap", jsjavax.swing.Spring);
Clazz.makeConstructor (c$, 
function (a) {
Clazz.superConstructor (this, jsjavax.swing.Spring.SpringMap, []);
this.s = a;
}, "jsjavax.swing.Spring");
Clazz.defineMethod (c$, "getMinimumValue", 
function () {
return this.map (this.s.getMinimumValue ());
});
Clazz.defineMethod (c$, "getPreferredValue", 
function () {
return this.map (this.s.getPreferredValue ());
});
Clazz.defineMethod (c$, "getMaximumValue", 
function () {
return Math.min (32767, this.map (this.s.getMaximumValue ()));
});
Clazz.defineMethod (c$, "getValue", 
function () {
return this.map (this.s.getValue ());
});
Clazz.defineMethod (c$, "setValue", 
function (a) {
if (a == -2147483648) {
this.s.setValue (-2147483648);
} else {
this.s.setValue (this.inv (a));
}}, "~N");
Clazz.defineMethod (c$, "isCyclic", 
function (a) {
return this.s.isCyclic (a);
}, "jsjavax.swing.SpringLayout");
c$ = Clazz.p0p ();
Clazz.pu$h ();
c$ = Clazz.decorateAsClass (function () {
this.s1 = null;
this.s2 = null;
Clazz.instantialize (this, arguments);
}, jsjavax.swing.Spring, "CompoundSpring", jsjavax.swing.Spring.StaticSpring);
Clazz.makeConstructor (c$, 
function (a, b) {
Clazz.superConstructor (this, jsjavax.swing.Spring.CompoundSpring, [-2147483648]);
this.s1 = a;
this.s2 = b;
}, "jsjavax.swing.Spring,jsjavax.swing.Spring");
Clazz.overrideMethod (c$, "toString", 
function () {
return "CompoundSpring of " + this.s1 + " and " + this.s2;
});
Clazz.defineMethod (c$, "clear", 
function () {
Clazz.superCall (this, jsjavax.swing.Spring.CompoundSpring, "clear", []);
this.min = this.pref = this.$max = -2147483648;
this.s1.setValue (-2147483648);
this.s2.setValue (-2147483648);
});
Clazz.overrideMethod (c$, "getMinimumValue", 
function () {
if (this.min == -2147483648) {
this.min = this.op (this.s1.getMinimumValue (), this.s2.getMinimumValue ());
}return this.min;
});
Clazz.overrideMethod (c$, "getPreferredValue", 
function () {
if (this.pref == -2147483648) {
this.pref = this.op (this.s1.getPreferredValue (), this.s2.getPreferredValue ());
}return this.pref;
});
Clazz.overrideMethod (c$, "getMaximumValue", 
function () {
if (this.$max == -2147483648) {
this.$max = this.op (this.s1.getMaximumValue (), this.s2.getMaximumValue ());
}return this.$max;
});
Clazz.overrideMethod (c$, "getValue", 
function () {
if (this.size == -2147483648) {
this.size = this.op (this.s1.getValue (), this.s2.getValue ());
}return this.size;
});
Clazz.overrideMethod (c$, "isCyclic", 
function (a) {
return a.isCyclic (this.s1) || a.isCyclic (this.s2);
}, "jsjavax.swing.SpringLayout");
c$ = Clazz.p0p ();
Clazz.pu$h ();
c$ = Clazz.declareType (jsjavax.swing.Spring, "SumSpring", jsjavax.swing.Spring.CompoundSpring);
Clazz.overrideMethod (c$, "op", 
function (a, b) {
return a + b;
}, "~N,~N");
Clazz.defineMethod (c$, "setNonClearValue", 
function (a) {
Clazz.superCall (this, jsjavax.swing.Spring.SumSpring, "setNonClearValue", [a]);
this.s1.setStrain (this.getStrain ());
this.s2.setValue (a - this.s1.getValue ());
}, "~N");
c$ = Clazz.p0p ();
Clazz.pu$h ();
c$ = Clazz.declareType (jsjavax.swing.Spring, "MaxSpring", jsjavax.swing.Spring.CompoundSpring);
Clazz.overrideMethod (c$, "op", 
function (a, b) {
return Math.max (a, b);
}, "~N,~N");
Clazz.defineMethod (c$, "setNonClearValue", 
function (a) {
Clazz.superCall (this, jsjavax.swing.Spring.MaxSpring, "setNonClearValue", [a]);
this.s1.setValue (a);
this.s2.setValue (a);
}, "~N");
c$ = Clazz.p0p ();
Clazz.defineStatics (c$,
"UNSET", -2147483648);
});

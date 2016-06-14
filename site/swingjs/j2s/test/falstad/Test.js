Clazz.declarePackage ("test.falstad");
Clazz.load (["swingjs.awt.Applet"], ["test.falstad.Test", "$.AtomFrame"], null, function () {
c$ = Clazz.declareType (test.falstad, "Test", swingjs.awt.Applet);
Clazz.overrideMethod (c$, "init", 
function () {
 new test.falstad.AtomFrame (this);
});
c$ = Clazz.decorateAsClass (function () {
if (!Clazz.isClassDefined ("test.falstad.AtomFrame.Complex")) {
test.falstad.AtomFrame.$AtomFrame$Complex$ ();
}
if (!Clazz.isClassDefined ("test.falstad.AtomFrame.State")) {
test.falstad.AtomFrame.$AtomFrame$State$ ();
}
if (!Clazz.isClassDefined ("test.falstad.AtomFrame.BasisState")) {
test.falstad.AtomFrame.$AtomFrame$BasisState$ ();
}
Clazz.instantialize (this, arguments);
}, test.falstad, "AtomFrame");
Clazz.makeConstructor (c$, 
function (applet) {
var x = Clazz.innerTypeInstance (test.falstad.AtomFrame.BasisState, this, null);
x.set (3);
System.out.println ("testing " + x.getText ());
}, "test.falstad.Test");
c$.$AtomFrame$Complex$ = function () {
Clazz.pu$h(self.c$);
c$ = Clazz.decorateAsClass (function () {
Clazz.prepareCallback (this, arguments);
this.re = 0;
this.im = 0;
this.mag = 0;
this.phase = 0;
Clazz.instantialize (this, arguments);
}, test.falstad.AtomFrame, "Complex");
Clazz.makeConstructor (c$, 
function () {
this.re = this.im = this.mag = this.phase = 0;
});
Clazz.makeConstructor (c$, 
function (a, b) {
this.set (a, b);
}, "~N,~N");
Clazz.defineMethod (c$, "magSquared", 
function () {
return this.mag * this.mag;
});
Clazz.defineMethod (c$, "set", 
function (a, b) {
this.re = a;
this.im = b;
this.setMagPhase ();
}, "~N,~N");
Clazz.defineMethod (c$, "set", 
function (a) {
this.re = a;
this.im = 0;
this.setMagPhase ();
}, "~N");
Clazz.defineMethod (c$, "set", 
function (a) {
this.re = a.re;
this.im = a.im;
this.mag = a.mag;
this.phase = a.phase;
}, "test.falstad.AtomFrame.Complex");
Clazz.defineMethod (c$, "add", 
function (a) {
this.re += a;
this.setMagPhase ();
}, "~N");
Clazz.defineMethod (c$, "add", 
function (a, b) {
this.re += a;
this.im += b;
this.setMagPhase ();
}, "~N,~N");
Clazz.defineMethod (c$, "add", 
function (a) {
this.re += a.re;
this.im += a.im;
this.setMagPhase ();
}, "test.falstad.AtomFrame.Complex");
Clazz.defineMethod (c$, "square", 
function () {
this.set (this.re * this.re - this.im * this.im, 2 * this.re * this.im);
});
Clazz.defineMethod (c$, "mult", 
function (a, b) {
this.set (this.re * a - this.im * b, this.re * b + this.im * a);
}, "~N,~N");
Clazz.defineMethod (c$, "mult", 
function (a) {
this.re *= a;
this.im *= a;
this.mag *= a;
}, "~N");
Clazz.defineMethod (c$, "mult", 
function (a) {
this.mult (a.re, a.im);
}, "test.falstad.AtomFrame.Complex");
Clazz.defineMethod (c$, "setMagPhase", 
function () {
this.mag = Math.sqrt (this.re * this.re + this.im * this.im);
this.phase = Math.atan2 (this.im, this.re);
});
Clazz.defineMethod (c$, "setMagPhase", 
function (a, b) {
this.mag = a;
this.phase = b;
this.re = a * Math.cos (b);
this.im = a * Math.sin (b);
}, "~N,~N");
Clazz.defineMethod (c$, "rotate", 
function (a) {
this.setMagPhase (this.mag, (this.phase + a) % (6.283185307179586));
}, "~N");
Clazz.defineMethod (c$, "conjugate", 
function () {
this.im = -this.im;
this.phase = -this.phase;
});
c$ = Clazz.p0p ();
};
c$.$AtomFrame$State$ = function () {
Clazz.pu$h(self.c$);
c$ = Clazz.decorateAsClass (function () {
Clazz.prepareCallback (this, arguments);
this.elevel = 0;
Clazz.instantialize (this, arguments);
}, test.falstad.AtomFrame, "State", test.falstad.AtomFrame.Complex, null, Clazz.innerTypeInstance (test.falstad.AtomFrame.Complex, this, null, Clazz.inheritArgs));
Clazz.defineMethod (c$, "convertDerivedToBasis", 
function () {
});
Clazz.defineMethod (c$, "convertBasisToDerived", 
function () {
});
Clazz.defineMethod (c$, "setBasisActive", 
function () {
});
c$ = Clazz.p0p ();
};
c$.$AtomFrame$BasisState$ = function () {
Clazz.pu$h(self.c$);
c$ = Clazz.decorateAsClass (function () {
Clazz.prepareCallback (this, arguments);
this.n = 0;
this.l = 0;
this.m = 0;
Clazz.instantialize (this, arguments);
}, test.falstad.AtomFrame, "BasisState", test.falstad.AtomFrame.State, null, Clazz.innerTypeInstance (test.falstad.AtomFrame.State, this, null, Clazz.inheritArgs));
Clazz.overrideMethod (c$, "getText", 
function () {
return "n = " + this.n + ", l = " + this.l + ", m = " + this.m;
});
c$ = Clazz.p0p ();
};
});

Clazz.declarePackage ("javajs.util");
Clazz.load (["javajs.util.T3"], "javajs.util.T4", null, function () {
c$ = Clazz.decorateAsClass (function () {
this.w = 0;
Clazz.instantialize (this, arguments);
}, javajs.util, "T4", javajs.util.T3);
Clazz.defineMethod (c$, "set4", 
function (x, y, z, w) {
this.x = x;
this.y = y;
this.z = z;
this.w = w;
}, "~N,~N,~N,~N");
Clazz.defineMethod (c$, "scale4", 
function (s) {
this.scale (s);
this.w *= s;
}, "~N");
Clazz.overrideMethod (c$, "hashCode", 
function () {
return javajs.util.T3.floatToIntBits0 (this.x) ^ javajs.util.T3.floatToIntBits0 (this.y) ^ javajs.util.T3.floatToIntBits0 (this.z) ^ javajs.util.T3.floatToIntBits0 (this.w);
});
Clazz.overrideMethod (c$, "equals", 
function (o) {
if (!(Clazz.instanceOf (o, javajs.util.T4))) return false;
var t = o;
return (this.x == t.x && this.y == t.y && this.z == t.z && this.w == t.w);
}, "~O");
Clazz.overrideMethod (c$, "toString", 
function () {
return "(" + this.x + ", " + this.y + ", " + this.z + ", " + this.w + ")";
});
Clazz.overrideMethod (c$, "toJSON", 
function () {
return "[" + this.x + ", " + this.y + ", " + this.z + ", " + this.w + "]";
});
});

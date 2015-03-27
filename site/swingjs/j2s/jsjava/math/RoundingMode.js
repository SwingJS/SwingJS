Clazz.declarePackage ("jsjava.math");
Clazz.load (["java.lang.Enum"], "jsjava.math.RoundingMode", ["java.lang.IllegalArgumentException"], function () {
c$ = Clazz.decorateAsClass (function () {
this.oldMode = 0;
Clazz.instantialize (this, arguments);
}, jsjava.math, "RoundingMode", Enum);
Clazz.makeConstructor (c$, 
($fz = function (oldMode) {
this.oldMode = oldMode;
}, $fz.isPrivate = true, $fz), "~N");
c$.$valueOf = Clazz.defineMethod (c$, "$valueOf", 
function (rm) {
switch (rm) {
case 0:
return jsjava.math.RoundingMode.UP;
case 1:
return jsjava.math.RoundingMode.DOWN;
case 2:
return jsjava.math.RoundingMode.CEILING;
case 3:
return jsjava.math.RoundingMode.FLOOR;
case 4:
return jsjava.math.RoundingMode.HALF_UP;
case 5:
return jsjava.math.RoundingMode.HALF_DOWN;
case 6:
return jsjava.math.RoundingMode.HALF_EVEN;
case 7:
return jsjava.math.RoundingMode.UNNECESSARY;
default:
throw  new IllegalArgumentException ("argument out of range");
}
}, "~N");
Clazz.defineEnumConstant (c$, "UP", 0, [0]);
Clazz.defineEnumConstant (c$, "DOWN", 1, [1]);
Clazz.defineEnumConstant (c$, "CEILING", 2, [2]);
Clazz.defineEnumConstant (c$, "FLOOR", 3, [3]);
Clazz.defineEnumConstant (c$, "HALF_UP", 4, [4]);
Clazz.defineEnumConstant (c$, "HALF_DOWN", 5, [5]);
Clazz.defineEnumConstant (c$, "HALF_EVEN", 6, [6]);
Clazz.defineEnumConstant (c$, "UNNECESSARY", 7, [7]);
});

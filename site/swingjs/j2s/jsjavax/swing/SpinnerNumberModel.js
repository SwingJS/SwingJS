Clazz.declarePackage ("jsjavax.swing");
Clazz.load (["jsjavax.swing.AbstractSpinnerModel"], "jsjavax.swing.SpinnerNumberModel", ["java.lang.Byte", "$.Double", "$.Float", "$.IllegalArgumentException", "$.Long", "$.Number", "$.Short"], function () {
c$ = Clazz.decorateAsClass (function () {
this.stepSize = null;
this.value = null;
this.minimum = null;
this.maximum = null;
Clazz.instantialize (this, arguments);
}, jsjavax.swing, "SpinnerNumberModel", jsjavax.swing.AbstractSpinnerModel);
Clazz.makeConstructor (c$, 
function (value, minimum, maximum, stepSize) {
Clazz.superConstructor (this, jsjavax.swing.SpinnerNumberModel, []);
if ((value == null) || (stepSize == null)) {
throw  new IllegalArgumentException ("value and stepSize must be non-null");
}if (!(((minimum == null) || (minimum.compareTo (value) <= 0)) && ((maximum == null) || (maximum.compareTo (value) >= 0)))) {
throw  new IllegalArgumentException ("(minimum <= value <= maximum) is false");
}this.value = value;
this.minimum = minimum;
this.maximum = maximum;
this.stepSize = stepSize;
}, "Number,Comparable,Comparable,Number");
Clazz.makeConstructor (c$, 
function (value, minimum, maximum, stepSize) {
this.construct ( new Integer (value),  new Integer (minimum),  new Integer (maximum),  new Integer (stepSize));
}, "~N,~N,~N,~N");
Clazz.makeConstructor (c$, 
function (value, minimum, maximum, stepSize) {
this.construct ( new Double (value),  new Double (minimum),  new Double (maximum),  new Double (stepSize));
}, "~N,~N,~N,~N");
Clazz.makeConstructor (c$, 
function () {
this.construct ( new Integer (0), null, null,  new Integer (1));
});
Clazz.defineMethod (c$, "setMinimum", 
function (minimum) {
if ((minimum == null) ? (this.minimum != null) : !minimum.equals (this.minimum)) {
this.minimum = minimum;
this.fireStateChanged ();
}}, "Comparable");
Clazz.defineMethod (c$, "getMinimum", 
function () {
return this.minimum;
});
Clazz.defineMethod (c$, "setMaximum", 
function (maximum) {
if ((maximum == null) ? (this.maximum != null) : !maximum.equals (this.maximum)) {
this.maximum = maximum;
this.fireStateChanged ();
}}, "Comparable");
Clazz.defineMethod (c$, "getMaximum", 
function () {
return this.maximum;
});
Clazz.defineMethod (c$, "setStepSize", 
function (stepSize) {
if (stepSize == null) {
throw  new IllegalArgumentException ("null stepSize");
}if (!stepSize.equals (this.stepSize)) {
this.stepSize = stepSize;
this.fireStateChanged ();
}}, "Number");
Clazz.defineMethod (c$, "getStepSize", 
function () {
return this.stepSize;
});
Clazz.defineMethod (c$, "incrValue", 
($fz = function (dir) {
var newValue;
if ((Clazz.instanceOf (this.value, Float)) || (Clazz.instanceOf (this.value, Double))) {
var v = this.value.doubleValue () + (this.stepSize.doubleValue () * dir);
if (Clazz.instanceOf (this.value, Double)) {
newValue =  new Double (v);
} else {
newValue =  new Float (v);
}} else {
var v = this.value.longValue () + (this.stepSize.longValue () * dir);
if (Clazz.instanceOf (this.value, Long)) {
newValue =  new Long (v);
} else if (Clazz.instanceOf (this.value, Integer)) {
newValue =  new Integer (v);
} else if (Clazz.instanceOf (this.value, Short)) {
newValue =  new Short (v);
} else {
newValue =  new Byte (v);
}}if ((this.maximum != null) && (this.maximum.compareTo (newValue) < 0)) {
return null;
}if ((this.minimum != null) && (this.minimum.compareTo (newValue) > 0)) {
return null;
} else {
return newValue;
}}, $fz.isPrivate = true, $fz), "~N");
Clazz.overrideMethod (c$, "getNextValue", 
function () {
return this.incrValue (1);
});
Clazz.overrideMethod (c$, "getPreviousValue", 
function () {
return this.incrValue (-1);
});
Clazz.defineMethod (c$, "getNumber", 
function () {
return this.value;
});
Clazz.overrideMethod (c$, "getValue", 
function () {
return this.value;
});
Clazz.overrideMethod (c$, "setValue", 
function (value) {
if ((value == null) || !(Clazz.instanceOf (value, Number))) {
throw  new IllegalArgumentException ("illegal value");
}if (!value.equals (this.value)) {
this.value = value;
this.fireStateChanged ();
}}, "~O");
});

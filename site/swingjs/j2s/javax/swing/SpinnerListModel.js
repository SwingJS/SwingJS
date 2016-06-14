Clazz.declarePackage ("javax.swing");
Clazz.load (["javax.swing.AbstractSpinnerModel"], "javax.swing.SpinnerListModel", ["java.lang.IllegalArgumentException", "java.util.Arrays"], function () {
c$ = Clazz.decorateAsClass (function () {
this.list = null;
this.index = 0;
Clazz.instantialize (this, arguments);
}, javax.swing, "SpinnerListModel", javax.swing.AbstractSpinnerModel);
Clazz.makeConstructor (c$, 
function (values) {
Clazz.superConstructor (this, javax.swing.SpinnerListModel, []);
if (values == null || values.size () == 0) {
throw  new IllegalArgumentException ("SpinnerListModel(List) expects non-null non-empty List");
}this.list = values;
this.index = 0;
}, "java.util.List");
Clazz.makeConstructor (c$, 
function (values) {
Clazz.superConstructor (this, javax.swing.SpinnerListModel, []);
if (values == null || values.length == 0) {
throw  new IllegalArgumentException ("SpinnerListModel(Object[]) expects non-null non-empty Object[]");
}this.list = java.util.Arrays.asList (values);
this.index = 0;
}, "~A");
Clazz.makeConstructor (c$, 
function () {
this.construct (["empty"]);
});
Clazz.defineMethod (c$, "getList", 
function () {
return this.list;
});
Clazz.defineMethod (c$, "setList", 
function (list) {
if ((list == null) || (list.size () == 0)) {
throw  new IllegalArgumentException ("invalid list");
}if (!list.equals (this.list)) {
this.list = list;
this.index = 0;
this.fireStateChanged ();
}}, "java.util.List");
Clazz.overrideMethod (c$, "getValue", 
function () {
return this.list.get (this.index);
});
Clazz.overrideMethod (c$, "setValue", 
function (elt) {
var index = this.list.indexOf (elt);
if (index == -1) {
throw  new IllegalArgumentException ("invalid sequence element");
} else if (index != this.index) {
this.index = index;
this.fireStateChanged ();
}}, "~O");
Clazz.overrideMethod (c$, "getNextValue", 
function () {
return (this.index >= (this.list.size () - 1)) ? null : this.list.get (this.index + 1);
});
Clazz.overrideMethod (c$, "getPreviousValue", 
function () {
return (this.index <= 0) ? null : this.list.get (this.index - 1);
});
Clazz.defineMethod (c$, "findNextMatch", 
function (substring) {
var max = this.list.size ();
if (max == 0) {
return null;
}var counter = this.index;
do {
var value = this.list.get (counter);
var string = value.toString ();
if (string != null && string.startsWith (substring)) {
return value;
}counter = (counter + 1) % max;
} while (counter != this.index);
return null;
}, "~S");
});

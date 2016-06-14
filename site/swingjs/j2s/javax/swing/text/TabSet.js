Clazz.declarePackage ("javax.swing.text");
Clazz.load (null, "javax.swing.text.TabSet", ["java.lang.IllegalArgumentException", "$.StringBuffer"], function () {
c$ = Clazz.decorateAsClass (function () {
this.tabs = null;
this.$hashCode = 2147483647;
Clazz.instantialize (this, arguments);
}, javax.swing.text, "TabSet");
Clazz.makeConstructor (c$, 
function (tabs) {
if (tabs != null) {
var tabCount = tabs.length;
this.tabs =  new Array (tabCount);
System.arraycopy (tabs, 0, this.tabs, 0, tabCount);
} else this.tabs = null;
}, "~A");
Clazz.defineMethod (c$, "getTabCount", 
function () {
return (this.tabs == null) ? 0 : this.tabs.length;
});
Clazz.defineMethod (c$, "getTab", 
function (index) {
var numTabs = this.getTabCount ();
if (index < 0 || index >= numTabs) throw  new IllegalArgumentException (index + " is outside the range of tabs");
return this.tabs[index];
}, "~N");
Clazz.defineMethod (c$, "getTabAfter", 
function (location) {
var index = this.getTabIndexAfter (location);
return (index == -1) ? null : this.tabs[index];
}, "~N");
Clazz.defineMethod (c$, "getTabIndex", 
function (tab) {
for (var counter = this.getTabCount () - 1; counter >= 0; counter--) if (this.getTab (counter) === tab) return counter;

return -1;
}, "javax.swing.text.TabStop");
Clazz.defineMethod (c$, "getTabIndexAfter", 
function (location) {
var current;
var min;
var max;
min = 0;
max = this.getTabCount ();
while (min != max) {
current = Clazz.doubleToInt ((max - min) / 2) + min;
if (location > this.tabs[current].getPosition ()) {
if (min == current) min = max;
 else min = current;
} else {
if (current == 0 || location > this.tabs[current - 1].getPosition ()) return current;
max = current;
}}
return -1;
}, "~N");
Clazz.overrideMethod (c$, "equals", 
function (o) {
if (o === this) {
return true;
}if (Clazz.instanceOf (o, javax.swing.text.TabSet)) {
var ts = o;
var count = this.getTabCount ();
if (ts.getTabCount () != count) {
return false;
}for (var i = 0; i < count; i++) {
var ts1 = this.getTab (i);
var ts2 = ts.getTab (i);
if ((ts1 == null && ts2 != null) || (ts1 != null && !this.getTab (i).equals (ts.getTab (i)))) {
return false;
}}
return true;
}return false;
}, "~O");
Clazz.overrideMethod (c$, "hashCode", 
function () {
if (this.$hashCode == 2147483647) {
this.$hashCode = 0;
var len = this.getTabCount ();
for (var i = 0; i < len; i++) {
var ts = this.getTab (i);
this.$hashCode ^= ts != null ? this.getTab (i).hashCode () : 0;
}
if (this.$hashCode == 2147483647) {
this.$hashCode -= 1;
}}return this.$hashCode;
});
Clazz.overrideMethod (c$, "toString", 
function () {
var tabCount = this.getTabCount ();
var buffer =  new StringBuffer ("[ ");
for (var counter = 0; counter < tabCount; counter++) {
if (counter > 0) buffer.append (" - ");
buffer.append (this.getTab (counter).toString ());
}
buffer.append (" ]");
return buffer.toString ();
});
});

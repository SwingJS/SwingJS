Clazz.declarePackage ("javax.swing.event");
Clazz.load (null, "javax.swing.event.EventListenerList", ["java.lang.reflect.Array"], function () {
c$ = Clazz.decorateAsClass (function () {
this.listenerList = null;
Clazz.instantialize (this, arguments);
}, javax.swing.event, "EventListenerList");
Clazz.prepareFields (c$, function () {
this.listenerList = javax.swing.event.EventListenerList.NULL_ARRAY;
});
Clazz.defineMethod (c$, "getListenerList", 
function () {
return this.listenerList;
});
Clazz.defineMethod (c$, "getListeners", 
function (t) {
var lList = this.listenerList;
var n = this.getListenerCount (lList, t);
var result = java.lang.reflect.Array.newInstance (t, n);
var j = 0;
for (var i = lList.length - 2; i >= 0; i -= 2) {
if (lList[i] === t) {
result[j++] = lList[i + 1];
}}
return result;
}, "Class");
Clazz.defineMethod (c$, "getListenerCount", 
function () {
return Clazz.doubleToInt (this.listenerList.length / 2);
});
Clazz.defineMethod (c$, "getListenerCount", 
function (t) {
var lList = this.listenerList;
return this.getListenerCount (lList, t);
}, "Class");
Clazz.defineMethod (c$, "getListenerCount", 
 function (list, t) {
var count = 0;
for (var i = 0; i < list.length; i += 2) {
if (t === list[i]) count++;
}
return count;
}, "~A,Class");
Clazz.defineMethod (c$, "add", 
function (t, l) {
if (l == null) {
return;
}if (this.listenerList === javax.swing.event.EventListenerList.NULL_ARRAY) {
this.listenerList = [t, l];
} else {
var i = this.listenerList.length;
var tmp =  new Array (i + 2);
System.arraycopy (this.listenerList, 0, tmp, 0, i);
tmp[i] = t;
tmp[i + 1] = l;
this.listenerList = tmp;
}}, "Class,~O");
Clazz.defineMethod (c$, "remove", 
function (t, l) {
if (l == null) {
return;
}var index = -1;
for (var i = this.listenerList.length - 2; i >= 0; i -= 2) {
if ((this.listenerList[i] === t) && (this.listenerList[i + 1].equals (l) == true)) {
index = i;
break;
}}
if (index != -1) {
var tmp =  new Array (this.listenerList.length - 2);
System.arraycopy (this.listenerList, 0, tmp, 0, index);
if (index < tmp.length) System.arraycopy (this.listenerList, index + 2, tmp, index, tmp.length - index);
this.listenerList = (tmp.length == 0) ? javax.swing.event.EventListenerList.NULL_ARRAY : tmp;
}}, "Class,~O");
Clazz.overrideMethod (c$, "toString", 
function () {
var lList = this.listenerList;
var s = "EventListenerList: ";
s += Clazz.doubleToInt (lList.length / 2) + " listeners: ";
for (var i = 0; i <= lList.length - 2; i += 2) {
s += " type " + (lList[i]).getName ();
s += " listener " + lList[i + 1];
}
return s;
});
c$.NULL_ARRAY = c$.prototype.NULL_ARRAY =  new Array (0);
});

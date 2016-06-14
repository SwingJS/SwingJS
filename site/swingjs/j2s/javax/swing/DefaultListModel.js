Clazz.declarePackage ("javax.swing");
Clazz.load (["javax.swing.AbstractListModel", "java.util.Vector"], "javax.swing.DefaultListModel", ["java.lang.IllegalArgumentException"], function () {
c$ = Clazz.decorateAsClass (function () {
this.delegate = null;
Clazz.instantialize (this, arguments);
}, javax.swing, "DefaultListModel", javax.swing.AbstractListModel);
Clazz.prepareFields (c$, function () {
this.delegate =  new java.util.Vector ();
});
Clazz.overrideMethod (c$, "getSize", 
function () {
return this.delegate.size ();
});
Clazz.overrideMethod (c$, "getElementAt", 
function (index) {
return this.delegate.elementAt (index);
}, "~N");
Clazz.defineMethod (c$, "copyInto", 
function (anArray) {
this.delegate.copyInto (anArray);
}, "~A");
Clazz.defineMethod (c$, "trimToSize", 
function () {
this.delegate.trimToSize ();
});
Clazz.defineMethod (c$, "ensureCapacity", 
function (minCapacity) {
this.delegate.ensureCapacity (minCapacity);
}, "~N");
Clazz.defineMethod (c$, "setSize", 
function (newSize) {
var oldSize = this.delegate.size ();
this.delegate.setSize (newSize);
if (oldSize > newSize) {
this.fireIntervalRemoved (this, newSize, oldSize - 1);
} else if (oldSize < newSize) {
this.fireIntervalAdded (this, oldSize, newSize - 1);
}}, "~N");
Clazz.defineMethod (c$, "capacity", 
function () {
return this.delegate.capacity ();
});
Clazz.defineMethod (c$, "size", 
function () {
return this.delegate.size ();
});
Clazz.defineMethod (c$, "isEmpty", 
function () {
return this.delegate.isEmpty ();
});
Clazz.defineMethod (c$, "elements", 
function () {
return this.delegate.elements ();
});
Clazz.defineMethod (c$, "contains", 
function (elem) {
return this.delegate.contains (elem);
}, "~O");
Clazz.defineMethod (c$, "indexOf", 
function (elem) {
return this.delegate.indexOf (elem);
}, "~O");
Clazz.defineMethod (c$, "indexOf", 
function (elem, index) {
return this.delegate.indexOf (elem, index);
}, "~O,~N");
Clazz.defineMethod (c$, "lastIndexOf", 
function (elem) {
return this.delegate.lastIndexOf (elem);
}, "~O");
Clazz.defineMethod (c$, "lastIndexOf", 
function (elem, index) {
return this.delegate.lastIndexOf (elem, index);
}, "~O,~N");
Clazz.defineMethod (c$, "elementAt", 
function (index) {
return this.delegate.elementAt (index);
}, "~N");
Clazz.defineMethod (c$, "firstElement", 
function () {
return this.delegate.firstElement ();
});
Clazz.defineMethod (c$, "lastElement", 
function () {
return this.delegate.lastElement ();
});
Clazz.defineMethod (c$, "setElementAt", 
function (obj, index) {
this.delegate.setElementAt (obj, index);
this.fireContentsChanged (this, index, index);
}, "~O,~N");
Clazz.defineMethod (c$, "removeElementAt", 
function (index) {
this.delegate.removeElementAt (index);
this.fireIntervalRemoved (this, index, index);
}, "~N");
Clazz.defineMethod (c$, "insertElementAt", 
function (obj, index) {
this.delegate.insertElementAt (obj, index);
this.fireIntervalAdded (this, index, index);
}, "~O,~N");
Clazz.defineMethod (c$, "addElement", 
function (obj) {
var index = this.delegate.size ();
this.delegate.addElement (obj);
this.fireIntervalAdded (this, index, index);
}, "~O");
Clazz.defineMethod (c$, "removeElement", 
function (obj) {
var index = this.indexOf (obj);
var rv = this.delegate.removeElement (obj);
if (index >= 0) {
this.fireIntervalRemoved (this, index, index);
}return rv;
}, "~O");
Clazz.defineMethod (c$, "removeAllElements", 
function () {
var index1 = this.delegate.size () - 1;
this.delegate.removeAllElements ();
if (index1 >= 0) {
this.fireIntervalRemoved (this, 0, index1);
}});
Clazz.overrideMethod (c$, "toString", 
function () {
return this.delegate.toString ();
});
Clazz.defineMethod (c$, "toArray", 
function () {
var rv =  new Array (this.delegate.size ());
this.delegate.copyInto (rv);
return rv;
});
Clazz.defineMethod (c$, "get", 
function (index) {
return this.delegate.elementAt (index);
}, "~N");
Clazz.defineMethod (c$, "set", 
function (index, element) {
var rv = this.delegate.elementAt (index);
this.delegate.setElementAt (element, index);
this.fireContentsChanged (this, index, index);
return rv;
}, "~N,~O");
Clazz.defineMethod (c$, "add", 
function (index, element) {
this.delegate.insertElementAt (element, index);
this.fireIntervalAdded (this, index, index);
}, "~N,~O");
Clazz.defineMethod (c$, "remove", 
function (index) {
var rv = this.delegate.elementAt (index);
this.delegate.removeElementAt (index);
this.fireIntervalRemoved (this, index, index);
return rv;
}, "~N");
Clazz.defineMethod (c$, "clear", 
function () {
var index1 = this.delegate.size () - 1;
this.delegate.removeAllElements ();
if (index1 >= 0) {
this.fireIntervalRemoved (this, 0, index1);
}});
Clazz.defineMethod (c$, "removeRange", 
function (fromIndex, toIndex) {
if (fromIndex > toIndex) {
throw  new IllegalArgumentException ("fromIndex must be <= toIndex");
}for (var i = toIndex; i >= fromIndex; i--) {
this.delegate.removeElementAt (i);
}
this.fireIntervalRemoved (this, fromIndex, toIndex);
}, "~N,~N");
});

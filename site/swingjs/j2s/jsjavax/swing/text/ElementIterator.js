Clazz.declarePackage ("jsjavax.swing.text");
Clazz.load (null, "jsjavax.swing.text.ElementIterator", ["java.lang.CloneNotSupportedException", "$.InternalError", "java.util.Stack"], function () {
c$ = Clazz.decorateAsClass (function () {
this.root = null;
this.elementStack = null;
if (!Clazz.isClassDefined ("jsjavax.swing.text.ElementIterator.StackItem")) {
jsjavax.swing.text.ElementIterator.$ElementIterator$StackItem$ ();
}
Clazz.instantialize (this, arguments);
}, jsjavax.swing.text, "ElementIterator", null, Cloneable);
Clazz.makeConstructor (c$, 
function (document) {
this.root = document.getDefaultRootElement ();
}, "jsjavax.swing.text.Document");
Clazz.makeConstructor (c$, 
function (root) {
this.root = root;
}, "jsjavax.swing.text.Element");
Clazz.defineMethod (c$, "clone", 
function () {
try {
var it =  new jsjavax.swing.text.ElementIterator (this.root);
if (this.elementStack != null) {
it.elementStack =  new java.util.Stack ();
for (var i = 0; i < this.elementStack.size (); i++) {
var item = this.elementStack.elementAt (i);
var clonee = item.clone ();
it.elementStack.push (clonee);
}
}return it;
} catch (e) {
if (Clazz.exceptionOf (e, CloneNotSupportedException)) {
throw  new InternalError ();
} else {
throw e;
}
}
});
Clazz.defineMethod (c$, "first", 
function () {
if (this.root == null) {
return null;
}this.elementStack =  new java.util.Stack ();
if (this.root.getElementCount () != 0) {
this.elementStack.push (Clazz.innerTypeInstance (jsjavax.swing.text.ElementIterator.StackItem, this, null, this.root));
}return this.root;
});
Clazz.defineMethod (c$, "depth", 
function () {
if (this.elementStack == null) {
return 0;
}return this.elementStack.size ();
});
Clazz.defineMethod (c$, "current", 
function () {
if (this.elementStack == null) {
return this.first ();
}if (!this.elementStack.empty ()) {
var item = this.elementStack.peek ();
var elem = item.getElement ();
var index = item.getIndex ();
if (index == -1) {
return elem;
}return elem.getElement (index);
}return null;
});
Clazz.defineMethod (c$, "next", 
function () {
if (this.elementStack == null) {
return this.first ();
}if (this.elementStack.isEmpty ()) {
return null;
}var item = this.elementStack.peek ();
var elem = item.getElement ();
var index = item.getIndex ();
if (index + 1 < elem.getElementCount ()) {
var child = elem.getElement (index + 1);
if (child.isLeaf ()) {
item.incrementIndex ();
} else {
this.elementStack.push (Clazz.innerTypeInstance (jsjavax.swing.text.ElementIterator.StackItem, this, null, child));
}return child;
} else {
this.elementStack.pop ();
if (!this.elementStack.isEmpty ()) {
var top = this.elementStack.peek ();
top.incrementIndex ();
return this.next ();
}}return null;
});
Clazz.defineMethod (c$, "previous", 
function () {
var stackSize;
if (this.elementStack == null || (stackSize = this.elementStack.size ()) == 0) {
return null;
}var item = this.elementStack.peek ();
var elem = item.getElement ();
var index = item.getIndex ();
if (index > 0) {
return this.getDeepestLeaf (elem.getElement (--index));
} else if (index == 0) {
return elem;
} else if (index == -1) {
if (stackSize == 1) {
return null;
}var top = this.elementStack.pop ();
item = this.elementStack.peek ();
this.elementStack.push (top);
elem = item.getElement ();
index = item.getIndex ();
return ((index == -1) ? elem : this.getDeepestLeaf (elem.getElement (index)));
}return null;
});
Clazz.defineMethod (c$, "getDeepestLeaf", 
($fz = function (parent) {
if (parent.isLeaf ()) {
return parent;
}var childCount = parent.getElementCount ();
if (childCount == 0) {
return parent;
}return this.getDeepestLeaf (parent.getElement (childCount - 1));
}, $fz.isPrivate = true, $fz), "jsjavax.swing.text.Element");
c$.$ElementIterator$StackItem$ = function () {
Clazz.pu$h ();
c$ = Clazz.decorateAsClass (function () {
Clazz.prepareCallback (this, arguments);
this.item = null;
this.childIndex = 0;
Clazz.instantialize (this, arguments);
}, jsjavax.swing.text.ElementIterator, "StackItem", null, Cloneable);
Clazz.makeConstructor (c$, 
($fz = function (a) {
this.item = a;
this.childIndex = -1;
}, $fz.isPrivate = true, $fz), "jsjavax.swing.text.Element");
Clazz.defineMethod (c$, "incrementIndex", 
($fz = function () {
this.childIndex++;
}, $fz.isPrivate = true, $fz));
Clazz.defineMethod (c$, "getElement", 
($fz = function () {
return this.item;
}, $fz.isPrivate = true, $fz));
Clazz.defineMethod (c$, "getIndex", 
($fz = function () {
return this.childIndex;
}, $fz.isPrivate = true, $fz));
c$ = Clazz.p0p ();
};
});

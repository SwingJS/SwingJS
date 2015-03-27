Clazz.declarePackage ("jsjavax.swing.tree");
Clazz.load (null, "jsjavax.swing.tree.TreePath", ["java.lang.IllegalArgumentException", "$.NullPointerException", "$.StringBuffer"], function () {
c$ = Clazz.decorateAsClass (function () {
this.parentPath = null;
this.lastPathComponent = null;
Clazz.instantialize (this, arguments);
}, jsjavax.swing.tree, "TreePath");
Clazz.makeConstructor (c$, 
function (path) {
if (path == null || path.length == 0) throw  new IllegalArgumentException ("path in TreePath must be non null and not empty.");
this.lastPathComponent = path[path.length - 1];
if (path.length > 1) this.parentPath =  new jsjavax.swing.tree.TreePath (path, path.length - 1);
}, "~A");
Clazz.makeConstructor (c$, 
function (singlePath) {
if (singlePath == null) throw  new IllegalArgumentException ("path in TreePath must be non null.");
this.lastPathComponent = singlePath;
this.parentPath = null;
}, "~O");
Clazz.makeConstructor (c$, 
function (parent, lastElement) {
if (lastElement == null) throw  new IllegalArgumentException ("path in TreePath must be non null.");
this.parentPath = parent;
this.lastPathComponent = lastElement;
}, "jsjavax.swing.tree.TreePath,~O");
Clazz.makeConstructor (c$, 
function (path, length) {
this.lastPathComponent = path[length - 1];
if (length > 1) this.parentPath =  new jsjavax.swing.tree.TreePath (path, length - 1);
}, "~A,~N");
Clazz.makeConstructor (c$, 
function () {
});
Clazz.defineMethod (c$, "getPath", 
function () {
var i = this.getPathCount ();
var result =  new Array (i--);
for (var path = this; path != null; path = path.parentPath) {
result[i--] = path.lastPathComponent;
}
return result;
});
Clazz.defineMethod (c$, "getLastPathComponent", 
function () {
return this.lastPathComponent;
});
Clazz.defineMethod (c$, "getPathCount", 
function () {
var result = 0;
for (var path = this; path != null; path = path.parentPath) {
result++;
}
return result;
});
Clazz.defineMethod (c$, "getPathComponent", 
function (element) {
var pathLength = this.getPathCount ();
if (element < 0 || element >= pathLength) throw  new IllegalArgumentException ("Index " + element + " is out of the specified range");
var path = this;
for (var i = pathLength - 1; i != element; i--) {
path = path.parentPath;
}
return path.lastPathComponent;
}, "~N");
Clazz.defineMethod (c$, "equals", 
function (o) {
if (o === this) return true;
if (Clazz.instanceOf (o, jsjavax.swing.tree.TreePath)) {
var oTreePath = o;
if (this.getPathCount () != oTreePath.getPathCount ()) return false;
for (var path = this; path != null; path = path.parentPath) {
if (!(path.lastPathComponent.equals (oTreePath.lastPathComponent))) {
return false;
}oTreePath = oTreePath.parentPath;
}
return true;
}return false;
}, "~O");
Clazz.defineMethod (c$, "hashCode", 
function () {
return this.lastPathComponent.hashCode ();
});
Clazz.defineMethod (c$, "isDescendant", 
function (aTreePath) {
if (aTreePath === this) return true;
if (aTreePath != null) {
var pathLength = this.getPathCount ();
var oPathLength = aTreePath.getPathCount ();
if (oPathLength < pathLength) return false;
while (oPathLength-- > pathLength) aTreePath = aTreePath.getParentPath ();

return this.equals (aTreePath);
}return false;
}, "jsjavax.swing.tree.TreePath");
Clazz.defineMethod (c$, "pathByAddingChild", 
function (child) {
if (child == null) throw  new NullPointerException ("Null child not allowed");
return  new jsjavax.swing.tree.TreePath (this, child);
}, "~O");
Clazz.defineMethod (c$, "getParentPath", 
function () {
return this.parentPath;
});
Clazz.overrideMethod (c$, "toString", 
function () {
var tempSpot =  new StringBuffer ("[");
for (var counter = 0, maxCounter = this.getPathCount (); counter < maxCounter; counter++) {
if (counter > 0) tempSpot.append (", ");
tempSpot.append (this.getPathComponent (counter));
}
tempSpot.append ("]");
return tempSpot.toString ();
});
});

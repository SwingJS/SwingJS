Clazz.declarePackage ("jsjavax.swing.event");
Clazz.load (["java.util.EventObject"], "jsjavax.swing.event.TreeModelEvent", ["java.lang.StringBuffer", "jsjavax.swing.tree.TreePath"], function () {
c$ = Clazz.decorateAsClass (function () {
this.path = null;
this.childIndices = null;
this.children = null;
Clazz.instantialize (this, arguments);
}, jsjavax.swing.event, "TreeModelEvent", java.util.EventObject);
Clazz.makeConstructor (c$, 
function (source, path, childIndices, children) {
this.construct (source,  new jsjavax.swing.tree.TreePath (path), childIndices, children);
}, "~O,~A,~A,~A");
Clazz.makeConstructor (c$, 
function (source, path, childIndices, children) {
Clazz.superConstructor (this, jsjavax.swing.event.TreeModelEvent, [source]);
this.path = path;
this.childIndices = childIndices;
this.children = children;
}, "~O,jsjavax.swing.tree.TreePath,~A,~A");
Clazz.makeConstructor (c$, 
function (source, path) {
this.construct (source,  new jsjavax.swing.tree.TreePath (path));
}, "~O,~A");
Clazz.makeConstructor (c$, 
function (source, path) {
Clazz.superConstructor (this, jsjavax.swing.event.TreeModelEvent, [source]);
this.path = path;
this.childIndices =  Clazz.newIntArray (0, 0);
}, "~O,jsjavax.swing.tree.TreePath");
Clazz.defineMethod (c$, "getTreePath", 
function () {
return this.path;
});
Clazz.defineMethod (c$, "getPath", 
function () {
if (this.path != null) return this.path.getPath ();
return null;
});
Clazz.defineMethod (c$, "getChildren", 
function () {
if (this.children != null) {
var cCount = this.children.length;
var retChildren =  new Array (cCount);
System.arraycopy (this.children, 0, retChildren, 0, cCount);
return retChildren;
}return null;
});
Clazz.defineMethod (c$, "getChildIndices", 
function () {
if (this.childIndices != null) {
var cCount = this.childIndices.length;
var retArray =  Clazz.newIntArray (cCount, 0);
System.arraycopy (this.childIndices, 0, retArray, 0, cCount);
return retArray;
}return null;
});
Clazz.overrideMethod (c$, "toString", 
function () {
var retBuffer =  new StringBuffer ();
retBuffer.append (this.getClass ().getName () + " " + Integer.toString (this.hashCode ()));
if (this.path != null) retBuffer.append (" path " + this.path);
if (this.childIndices != null) {
retBuffer.append (" indices [ ");
for (var counter = 0; counter < this.childIndices.length; counter++) retBuffer.append (Integer.toString (this.childIndices[counter]) + " ");

retBuffer.append ("]");
}if (this.children != null) {
retBuffer.append (" children [ ");
for (var counter = 0; counter < this.children.length; counter++) retBuffer.append (this.children[counter] + " ");

retBuffer.append ("]");
}return retBuffer.toString ();
});
});

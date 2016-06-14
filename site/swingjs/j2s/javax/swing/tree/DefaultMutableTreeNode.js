Clazz.declarePackage ("javax.swing.tree");
Clazz.load (["java.util.Enumeration", "javax.swing.tree.MutableTreeNode", "java.util.NoSuchElementException"], "javax.swing.tree.DefaultMutableTreeNode", ["java.lang.ArrayIndexOutOfBoundsException", "$.Error", "$.IllegalArgumentException", "$.IllegalStateException", "java.util.Stack", "$.Vector"], function () {
c$ = Clazz.decorateAsClass (function () {
this.parent = null;
this.$children = null;
this.userObject = null;
this.allowsChildren = false;
if (!Clazz.isClassDefined ("javax.swing.tree.DefaultMutableTreeNode.PreorderEnumeration")) {
javax.swing.tree.DefaultMutableTreeNode.$DefaultMutableTreeNode$PreorderEnumeration$ ();
}
if (!Clazz.isClassDefined ("javax.swing.tree.DefaultMutableTreeNode.PostorderEnumeration")) {
javax.swing.tree.DefaultMutableTreeNode.$DefaultMutableTreeNode$PostorderEnumeration$ ();
}
if (!Clazz.isClassDefined ("javax.swing.tree.DefaultMutableTreeNode.BreadthFirstEnumeration")) {
javax.swing.tree.DefaultMutableTreeNode.$DefaultMutableTreeNode$BreadthFirstEnumeration$ ();
}
if (!Clazz.isClassDefined ("javax.swing.tree.DefaultMutableTreeNode.PathBetweenNodesEnumeration")) {
javax.swing.tree.DefaultMutableTreeNode.$DefaultMutableTreeNode$PathBetweenNodesEnumeration$ ();
}
Clazz.instantialize (this, arguments);
}, javax.swing.tree, "DefaultMutableTreeNode", null, [Cloneable, javax.swing.tree.MutableTreeNode]);
Clazz.makeConstructor (c$, 
function () {
this.construct (null);
});
Clazz.makeConstructor (c$, 
function (userObject) {
this.construct (userObject, true);
}, "~O");
Clazz.makeConstructor (c$, 
function (userObject, allowsChildren) {
this.parent = null;
this.allowsChildren = allowsChildren;
this.userObject = userObject;
}, "~O,~B");
Clazz.overrideMethod (c$, "insert", 
function (newChild, childIndex) {
if (!this.allowsChildren) {
throw  new IllegalStateException ("node does not allow children");
} else if (newChild == null) {
throw  new IllegalArgumentException ("new child is null");
} else if (this.isNodeAncestor (newChild)) {
throw  new IllegalArgumentException ("new child is an ancestor");
}var oldParent = newChild.getParent ();
if (oldParent != null) {
oldParent.remove (newChild);
}newChild.setParent (this);
if (this.$children == null) {
this.$children =  new java.util.Vector ();
}this.$children.insertElementAt (newChild, childIndex);
}, "javax.swing.tree.MutableTreeNode,~N");
Clazz.defineMethod (c$, "remove", 
function (childIndex) {
var child = this.getChildAt (childIndex);
this.$children.removeElementAt (childIndex);
child.setParent (null);
}, "~N");
Clazz.defineMethod (c$, "setParent", 
function (newParent) {
this.parent = newParent;
}, "javax.swing.tree.MutableTreeNode");
Clazz.defineMethod (c$, "getParent", 
function () {
return this.parent;
});
Clazz.overrideMethod (c$, "getChildAt", 
function (index) {
if (this.$children == null) {
throw  new ArrayIndexOutOfBoundsException ("node has no children");
}return this.$children.elementAt (index);
}, "~N");
Clazz.defineMethod (c$, "getChildCount", 
function () {
if (this.$children == null) {
return 0;
} else {
return this.$children.size ();
}});
Clazz.overrideMethod (c$, "getIndex", 
function (aChild) {
if (aChild == null) {
throw  new IllegalArgumentException ("argument is null");
}if (!this.isNodeChild (aChild)) {
return -1;
}return this.$children.indexOf (aChild);
}, "javax.swing.tree.TreeNode");
Clazz.defineMethod (c$, "children", 
function () {
if (this.$children == null) {
return javax.swing.tree.DefaultMutableTreeNode.EMPTY_ENUMERATION;
} else {
return this.$children.elements ();
}});
Clazz.defineMethod (c$, "setAllowsChildren", 
function (allows) {
if (allows != this.allowsChildren) {
this.allowsChildren = allows;
if (!this.allowsChildren) {
this.removeAllChildren ();
}}}, "~B");
Clazz.overrideMethod (c$, "getAllowsChildren", 
function () {
return this.allowsChildren;
});
Clazz.overrideMethod (c$, "setUserObject", 
function (userObject) {
this.userObject = userObject;
}, "~O");
Clazz.defineMethod (c$, "getUserObject", 
function () {
return this.userObject;
});
Clazz.overrideMethod (c$, "removeFromParent", 
function () {
var parent = this.getParent ();
if (parent != null) {
parent.remove (this);
}});
Clazz.defineMethod (c$, "remove", 
function (aChild) {
if (aChild == null) {
throw  new IllegalArgumentException ("argument is null");
}if (!this.isNodeChild (aChild)) {
throw  new IllegalArgumentException ("argument is not a child");
}this.remove (this.getIndex (aChild));
}, "javax.swing.tree.MutableTreeNode");
Clazz.defineMethod (c$, "removeAllChildren", 
function () {
for (var i = this.getChildCount () - 1; i >= 0; i--) {
this.remove (i);
}
});
Clazz.defineMethod (c$, "add", 
function (newChild) {
if (newChild != null && newChild.getParent () === this) this.insert (newChild, this.getChildCount () - 1);
 else this.insert (newChild, this.getChildCount ());
}, "javax.swing.tree.MutableTreeNode");
Clazz.defineMethod (c$, "isNodeAncestor", 
function (anotherNode) {
if (anotherNode == null) {
return false;
}var ancestor = this;
do {
if (ancestor === anotherNode) {
return true;
}} while ((ancestor = ancestor.getParent ()) != null);
return false;
}, "javax.swing.tree.TreeNode");
Clazz.defineMethod (c$, "isNodeDescendant", 
function (anotherNode) {
if (anotherNode == null) return false;
return anotherNode.isNodeAncestor (this);
}, "javax.swing.tree.DefaultMutableTreeNode");
Clazz.defineMethod (c$, "getSharedAncestor", 
function (aNode) {
if (aNode === this) {
return this;
} else if (aNode == null) {
return null;
}var level1;
var level2;
var diff;
var node1;
var node2;
level1 = this.getLevel ();
level2 = aNode.getLevel ();
if (level2 > level1) {
diff = level2 - level1;
node1 = aNode;
node2 = this;
} else {
diff = level1 - level2;
node1 = this;
node2 = aNode;
}while (diff > 0) {
node1 = node1.getParent ();
diff--;
}
do {
if (node1 === node2) {
return node1;
}node1 = node1.getParent ();
node2 = node2.getParent ();
} while (node1 != null);
if (node1 != null || node2 != null) {
throw  new Error ("nodes should be null");
}return null;
}, "javax.swing.tree.DefaultMutableTreeNode");
Clazz.defineMethod (c$, "isNodeRelated", 
function (aNode) {
return (aNode != null) && (this.getRoot () === aNode.getRoot ());
}, "javax.swing.tree.DefaultMutableTreeNode");
Clazz.defineMethod (c$, "getDepth", 
function () {
var last = null;
var enum_ = this.breadthFirstEnumeration ();
while (enum_.hasMoreElements ()) {
last = enum_.nextElement ();
}
if (last == null) {
throw  new Error ("nodes should be null");
}return (last).getLevel () - this.getLevel ();
});
Clazz.defineMethod (c$, "getLevel", 
function () {
var ancestor;
var levels = 0;
ancestor = this;
while ((ancestor = ancestor.getParent ()) != null) {
levels++;
}
return levels;
});
Clazz.defineMethod (c$, "getPath", 
function () {
return this.getPathToRoot (this, 0);
});
Clazz.defineMethod (c$, "getPathToRoot", 
function (aNode, depth) {
var retNodes;
if (aNode == null) {
if (depth == 0) return null;
 else retNodes =  new Array (depth);
} else {
depth++;
retNodes = this.getPathToRoot (aNode.getParent (), depth);
retNodes[retNodes.length - depth] = aNode;
}return retNodes;
}, "javax.swing.tree.TreeNode,~N");
Clazz.defineMethod (c$, "getUserObjectPath", 
function () {
var realPath = this.getPath ();
var retPath =  new Array (realPath.length);
for (var counter = 0; counter < realPath.length; counter++) retPath[counter] = (realPath[counter]).getUserObject ();

return retPath;
});
Clazz.defineMethod (c$, "getRoot", 
function () {
var ancestor = this;
var previous;
do {
previous = ancestor;
ancestor = ancestor.getParent ();
} while (ancestor != null);
return previous;
});
Clazz.defineMethod (c$, "isRoot", 
function () {
return this.getParent () == null;
});
Clazz.defineMethod (c$, "getNextNode", 
function () {
if (this.getChildCount () == 0) {
var nextSibling = this.getNextSibling ();
if (nextSibling == null) {
var aNode = this.getParent ();
do {
if (aNode == null) {
return null;
}nextSibling = aNode.getNextSibling ();
if (nextSibling != null) {
return nextSibling;
}aNode = aNode.getParent ();
} while (true);
} else {
return nextSibling;
}} else {
return this.getChildAt (0);
}});
Clazz.defineMethod (c$, "getPreviousNode", 
function () {
var previousSibling;
var myParent = this.getParent ();
if (myParent == null) {
return null;
}previousSibling = this.getPreviousSibling ();
if (previousSibling != null) {
if (previousSibling.getChildCount () == 0) return previousSibling;
 else return previousSibling.getLastLeaf ();
} else {
return myParent;
}});
Clazz.defineMethod (c$, "preorderEnumeration", 
function () {
return Clazz.innerTypeInstance (javax.swing.tree.DefaultMutableTreeNode.PreorderEnumeration, this, null, this);
});
Clazz.defineMethod (c$, "postorderEnumeration", 
function () {
return Clazz.innerTypeInstance (javax.swing.tree.DefaultMutableTreeNode.PostorderEnumeration, this, null, this);
});
Clazz.defineMethod (c$, "breadthFirstEnumeration", 
function () {
return Clazz.innerTypeInstance (javax.swing.tree.DefaultMutableTreeNode.BreadthFirstEnumeration, this, null, this);
});
Clazz.defineMethod (c$, "depthFirstEnumeration", 
function () {
return this.postorderEnumeration ();
});
Clazz.defineMethod (c$, "pathFromAncestorEnumeration", 
function (ancestor) {
return Clazz.innerTypeInstance (javax.swing.tree.DefaultMutableTreeNode.PathBetweenNodesEnumeration, this, null, ancestor, this);
}, "javax.swing.tree.TreeNode");
Clazz.defineMethod (c$, "isNodeChild", 
function (aNode) {
var retval;
if (aNode == null) {
retval = false;
} else {
if (this.getChildCount () == 0) {
retval = false;
} else {
retval = (aNode.getParent () === this);
}}return retval;
}, "javax.swing.tree.TreeNode");
Clazz.defineMethod (c$, "getFirstChild", 
function () {
if (this.getChildCount () == 0) {
throw  new java.util.NoSuchElementException ("node has no children");
}return this.getChildAt (0);
});
Clazz.defineMethod (c$, "getLastChild", 
function () {
if (this.getChildCount () == 0) {
throw  new java.util.NoSuchElementException ("node has no children");
}return this.getChildAt (this.getChildCount () - 1);
});
Clazz.defineMethod (c$, "getChildAfter", 
function (aChild) {
if (aChild == null) {
throw  new IllegalArgumentException ("argument is null");
}var index = this.getIndex (aChild);
if (index == -1) {
throw  new IllegalArgumentException ("node is not a child");
}if (index < this.getChildCount () - 1) {
return this.getChildAt (index + 1);
} else {
return null;
}}, "javax.swing.tree.TreeNode");
Clazz.defineMethod (c$, "getChildBefore", 
function (aChild) {
if (aChild == null) {
throw  new IllegalArgumentException ("argument is null");
}var index = this.getIndex (aChild);
if (index == -1) {
throw  new IllegalArgumentException ("argument is not a child");
}if (index > 0) {
return this.getChildAt (index - 1);
} else {
return null;
}}, "javax.swing.tree.TreeNode");
Clazz.defineMethod (c$, "isNodeSibling", 
function (anotherNode) {
var retval;
if (anotherNode == null) {
retval = false;
} else if (anotherNode === this) {
retval = true;
} else {
var myParent = this.getParent ();
retval = (myParent != null && myParent === anotherNode.getParent ());
if (retval && !(this.getParent ()).isNodeChild (anotherNode)) {
throw  new Error ("sibling has different parent");
}}return retval;
}, "javax.swing.tree.TreeNode");
Clazz.defineMethod (c$, "getSiblingCount", 
function () {
var myParent = this.getParent ();
if (myParent == null) {
return 1;
} else {
return myParent.getChildCount ();
}});
Clazz.defineMethod (c$, "getNextSibling", 
function () {
var retval;
var myParent = this.getParent ();
if (myParent == null) {
retval = null;
} else {
retval = myParent.getChildAfter (this);
}if (retval != null && !this.isNodeSibling (retval)) {
throw  new Error ("child of parent is not a sibling");
}return retval;
});
Clazz.defineMethod (c$, "getPreviousSibling", 
function () {
var retval;
var myParent = this.getParent ();
if (myParent == null) {
retval = null;
} else {
retval = myParent.getChildBefore (this);
}if (retval != null && !this.isNodeSibling (retval)) {
throw  new Error ("child of parent is not a sibling");
}return retval;
});
Clazz.defineMethod (c$, "isLeaf", 
function () {
return (this.getChildCount () == 0);
});
Clazz.defineMethod (c$, "getFirstLeaf", 
function () {
var node = this;
while (!node.isLeaf ()) {
node = node.getFirstChild ();
}
return node;
});
Clazz.defineMethod (c$, "getLastLeaf", 
function () {
var node = this;
while (!node.isLeaf ()) {
node = node.getLastChild ();
}
return node;
});
Clazz.defineMethod (c$, "getNextLeaf", 
function () {
var nextSibling;
var myParent = this.getParent ();
if (myParent == null) return null;
nextSibling = this.getNextSibling ();
if (nextSibling != null) return nextSibling.getFirstLeaf ();
return myParent.getNextLeaf ();
});
Clazz.defineMethod (c$, "getPreviousLeaf", 
function () {
var previousSibling;
var myParent = this.getParent ();
if (myParent == null) return null;
previousSibling = this.getPreviousSibling ();
if (previousSibling != null) return previousSibling.getLastLeaf ();
return myParent.getPreviousLeaf ();
});
Clazz.defineMethod (c$, "getLeafCount", 
function () {
var count = 0;
var node;
var enum_ = this.breadthFirstEnumeration ();
while (enum_.hasMoreElements ()) {
node = enum_.nextElement ();
if (node.isLeaf ()) {
count++;
}}
if (count < 1) {
throw  new Error ("tree has zero leaves");
}return count;
});
Clazz.defineMethod (c$, "toString", 
function () {
if (this.userObject == null) {
return null;
} else {
return this.userObject.toString ();
}});
Clazz.defineMethod (c$, "clone", 
function () {
var newNode = null;
try {
newNode = Clazz.superCall (this, javax.swing.tree.DefaultMutableTreeNode, "clone", []);
newNode.$children = null;
newNode.parent = null;
} catch (e) {
if (Clazz.exceptionOf (e, CloneNotSupportedException)) {
throw  new Error (e.toString ());
} else {
throw e;
}
}
return newNode;
});
c$.$DefaultMutableTreeNode$PreorderEnumeration$ = function () {
Clazz.pu$h(self.c$);
c$ = Clazz.decorateAsClass (function () {
Clazz.prepareCallback (this, arguments);
this.stack = null;
Clazz.instantialize (this, arguments);
}, javax.swing.tree.DefaultMutableTreeNode, "PreorderEnumeration", null, java.util.Enumeration);
Clazz.makeConstructor (c$, 
function (a) {
var b =  new java.util.Vector (1);
b.addElement (a);
this.stack =  new java.util.Stack ();
this.stack.push (b.elements ());
}, "javax.swing.tree.TreeNode");
Clazz.overrideMethod (c$, "hasMoreElements", 
function () {
return (!this.stack.empty () && (this.stack.peek ()).hasMoreElements ());
});
Clazz.overrideMethod (c$, "nextElement", 
function () {
var a = this.stack.peek ();
var b = a.nextElement ();
var c = b.children ();
if (!a.hasMoreElements ()) {
this.stack.pop ();
}if (c.hasMoreElements ()) {
this.stack.push (c);
}return b;
});
c$ = Clazz.p0p ();
};
c$.$DefaultMutableTreeNode$PostorderEnumeration$ = function () {
Clazz.pu$h(self.c$);
c$ = Clazz.decorateAsClass (function () {
Clazz.prepareCallback (this, arguments);
this.root = null;
this.children = null;
this.subtree = null;
Clazz.instantialize (this, arguments);
}, javax.swing.tree.DefaultMutableTreeNode, "PostorderEnumeration", null, java.util.Enumeration);
Clazz.makeConstructor (c$, 
function (a) {
this.root = a;
this.children = this.root.children ();
this.subtree = javax.swing.tree.DefaultMutableTreeNode.EMPTY_ENUMERATION;
}, "javax.swing.tree.TreeNode");
Clazz.defineMethod (c$, "hasMoreElements", 
function () {
return this.root != null;
});
Clazz.defineMethod (c$, "nextElement", 
function () {
var a;
if (this.subtree.hasMoreElements ()) {
a = this.subtree.nextElement ();
} else if (this.children.hasMoreElements ()) {
this.subtree = Clazz.innerTypeInstance (javax.swing.tree.DefaultMutableTreeNode.PostorderEnumeration, this, null, this.children.nextElement ());
a = this.subtree.nextElement ();
} else {
a = this.root;
this.root = null;
}return a;
});
c$ = Clazz.p0p ();
};
c$.$DefaultMutableTreeNode$BreadthFirstEnumeration$ = function () {
Clazz.pu$h(self.c$);
c$ = Clazz.decorateAsClass (function () {
Clazz.prepareCallback (this, arguments);
this.queue = null;
if (!Clazz.isClassDefined ("javax.swing.tree.DefaultMutableTreeNode.BreadthFirstEnumeration.Queue")) {
javax.swing.tree.DefaultMutableTreeNode.BreadthFirstEnumeration.$DefaultMutableTreeNode$BreadthFirstEnumeration$Queue$ ();
}
Clazz.instantialize (this, arguments);
}, javax.swing.tree.DefaultMutableTreeNode, "BreadthFirstEnumeration", null, java.util.Enumeration);
Clazz.makeConstructor (c$, 
function (a) {
var b =  new java.util.Vector (1);
b.addElement (a);
this.queue = Clazz.innerTypeInstance (javax.swing.tree.DefaultMutableTreeNode.BreadthFirstEnumeration.Queue, this, null);
this.queue.enqueue (b.elements ());
}, "javax.swing.tree.TreeNode");
Clazz.overrideMethod (c$, "hasMoreElements", 
function () {
return (!this.queue.isEmpty () && (this.queue.firstObject ()).hasMoreElements ());
});
Clazz.overrideMethod (c$, "nextElement", 
function () {
var a = this.queue.firstObject ();
var b = a.nextElement ();
var c = b.children ();
if (!a.hasMoreElements ()) {
this.queue.dequeue ();
}if (c.hasMoreElements ()) {
this.queue.enqueue (c);
}return b;
});
c$.$DefaultMutableTreeNode$BreadthFirstEnumeration$Queue$ = function () {
Clazz.pu$h(self.c$);
c$ = Clazz.decorateAsClass (function () {
Clazz.prepareCallback (this, arguments);
this.head = null;
this.tail = null;
if (!Clazz.isClassDefined ("javax.swing.tree.DefaultMutableTreeNode.BreadthFirstEnumeration.Queue.QNode")) {
javax.swing.tree.DefaultMutableTreeNode.BreadthFirstEnumeration.Queue.$DefaultMutableTreeNode$BreadthFirstEnumeration$Queue$QNode$ ();
}
Clazz.instantialize (this, arguments);
}, javax.swing.tree.DefaultMutableTreeNode.BreadthFirstEnumeration, "Queue");
Clazz.defineMethod (c$, "enqueue", 
function (a) {
if (this.head == null) {
this.head = this.tail = Clazz.innerTypeInstance (javax.swing.tree.DefaultMutableTreeNode.BreadthFirstEnumeration.Queue.QNode, this, null, a, null);
} else {
this.tail.next = Clazz.innerTypeInstance (javax.swing.tree.DefaultMutableTreeNode.BreadthFirstEnumeration.Queue.QNode, this, null, a, null);
this.tail = this.tail.next;
}}, "~O");
Clazz.defineMethod (c$, "dequeue", 
function () {
if (this.head == null) {
throw  new java.util.NoSuchElementException ("No more elements");
}var a = this.head.object;
var b = this.head;
this.head = this.head.next;
if (this.head == null) {
this.tail = null;
} else {
b.next = null;
}return a;
});
Clazz.defineMethod (c$, "firstObject", 
function () {
if (this.head == null) {
throw  new java.util.NoSuchElementException ("No more elements");
}return this.head.object;
});
Clazz.defineMethod (c$, "isEmpty", 
function () {
return this.head == null;
});
c$.$DefaultMutableTreeNode$BreadthFirstEnumeration$Queue$QNode$ = function () {
Clazz.pu$h(self.c$);
c$ = Clazz.decorateAsClass (function () {
Clazz.prepareCallback (this, arguments);
this.object = null;
this.next = null;
Clazz.instantialize (this, arguments);
}, javax.swing.tree.DefaultMutableTreeNode.BreadthFirstEnumeration.Queue, "QNode");
Clazz.makeConstructor (c$, 
function (a, b) {
this.object = a;
this.next = b;
}, "~O,javax.swing.tree.DefaultMutableTreeNode.BreadthFirstEnumeration.Queue.QNode");
c$ = Clazz.p0p ();
};
c$ = Clazz.p0p ();
};
c$ = Clazz.p0p ();
};
c$.$DefaultMutableTreeNode$PathBetweenNodesEnumeration$ = function () {
Clazz.pu$h(self.c$);
c$ = Clazz.decorateAsClass (function () {
Clazz.prepareCallback (this, arguments);
this.stack = null;
Clazz.instantialize (this, arguments);
}, javax.swing.tree.DefaultMutableTreeNode, "PathBetweenNodesEnumeration", null, java.util.Enumeration);
Clazz.makeConstructor (c$, 
function (a, b) {
if (a == null || b == null) {
throw  new IllegalArgumentException ("argument is null");
}var c;
this.stack =  new java.util.Stack ();
this.stack.push (b);
c = b;
while (c !== a) {
c = c.getParent ();
if (c == null && b !== a) {
throw  new IllegalArgumentException ("node " + a + " is not an ancestor of " + b);
}this.stack.push (c);
}
}, "javax.swing.tree.TreeNode,javax.swing.tree.TreeNode");
Clazz.overrideMethod (c$, "hasMoreElements", 
function () {
return this.stack.size () > 0;
});
Clazz.overrideMethod (c$, "nextElement", 
function () {
try {
return this.stack.pop ();
} catch (e) {
if (Clazz.exceptionOf (e, java.util.EmptyStackException)) {
throw  new java.util.NoSuchElementException ("No more elements");
} else {
throw e;
}
}
});
c$ = Clazz.p0p ();
};
c$.$DefaultMutableTreeNode$1$ = function () {
Clazz.pu$h(self.c$);
c$ = Clazz.declareAnonymous (javax.swing.tree, "DefaultMutableTreeNode$1", null, java.util.Enumeration);
Clazz.defineMethod (c$, "hasMoreElements", 
function () {
return false;
});
Clazz.defineMethod (c$, "nextElement", 
function () {
throw  new java.util.NoSuchElementException ("No more elements");
});
c$ = Clazz.p0p ();
};
c$.EMPTY_ENUMERATION = c$.prototype.EMPTY_ENUMERATION = ((Clazz.isClassDefined ("javax.swing.tree.DefaultMutableTreeNode$1") ? 0 : javax.swing.tree.DefaultMutableTreeNode.$DefaultMutableTreeNode$1$ ()), Clazz.innerTypeInstance (javax.swing.tree.DefaultMutableTreeNode$1, this, null));
});

Clazz.declarePackage ("javax.swing.tree");
Clazz.load (["javax.swing.tree.TreeModel", "javax.swing.event.EventListenerList"], "javax.swing.tree.DefaultTreeModel", ["java.lang.IllegalArgumentException", "javax.swing.event.TreeModelEvent", "$.TreeModelListener"], function () {
c$ = Clazz.decorateAsClass (function () {
this.root = null;
this.listenerList = null;
this.$asksAllowsChildren = false;
Clazz.instantialize (this, arguments);
}, javax.swing.tree, "DefaultTreeModel", null, javax.swing.tree.TreeModel);
Clazz.prepareFields (c$, function () {
this.listenerList =  new javax.swing.event.EventListenerList ();
});
Clazz.makeConstructor (c$, 
function (root) {
this.construct (root, false);
}, "javax.swing.tree.TreeNode");
Clazz.makeConstructor (c$, 
function (root, asksAllowsChildren) {
this.root = root;
this.$asksAllowsChildren = asksAllowsChildren;
}, "javax.swing.tree.TreeNode,~B");
Clazz.defineMethod (c$, "setAsksAllowsChildren", 
function (newValue) {
this.$asksAllowsChildren = newValue;
}, "~B");
Clazz.defineMethod (c$, "asksAllowsChildren", 
function () {
return this.$asksAllowsChildren;
});
Clazz.defineMethod (c$, "setRoot", 
function (root) {
var oldRoot = this.root;
this.root = root;
if (root == null && oldRoot != null) {
this.fireTreeStructureChanged (this, null);
} else {
this.nodeStructureChanged (root);
}}, "javax.swing.tree.TreeNode");
Clazz.overrideMethod (c$, "getRoot", 
function () {
return this.root;
});
Clazz.overrideMethod (c$, "getIndexOfChild", 
function (parent, child) {
if (parent == null || child == null) return -1;
return (parent).getIndex (child);
}, "~O,~O");
Clazz.overrideMethod (c$, "getChild", 
function (parent, index) {
return (parent).getChildAt (index);
}, "~O,~N");
Clazz.overrideMethod (c$, "getChildCount", 
function (parent) {
return (parent).getChildCount ();
}, "~O");
Clazz.overrideMethod (c$, "isLeaf", 
function (node) {
if (this.$asksAllowsChildren) return !(node).getAllowsChildren ();
return (node).isLeaf ();
}, "~O");
Clazz.defineMethod (c$, "reload", 
function () {
this.reload (this.root);
});
Clazz.overrideMethod (c$, "valueForPathChanged", 
function (path, newValue) {
var aNode = path.getLastPathComponent ();
aNode.setUserObject (newValue);
this.nodeChanged (aNode);
}, "javax.swing.tree.TreePath,~O");
Clazz.defineMethod (c$, "insertNodeInto", 
function (newChild, parent, index) {
parent.insert (newChild, index);
var newIndexs =  Clazz.newIntArray (1, 0);
newIndexs[0] = index;
this.nodesWereInserted (parent, newIndexs);
}, "javax.swing.tree.MutableTreeNode,javax.swing.tree.MutableTreeNode,~N");
Clazz.defineMethod (c$, "removeNodeFromParent", 
function (node) {
var parent = node.getParent ();
if (parent == null) throw  new IllegalArgumentException ("node does not have a parent.");
var childIndex =  Clazz.newIntArray (1, 0);
var removedArray =  new Array (1);
childIndex[0] = parent.getIndex (node);
parent.remove (childIndex[0]);
removedArray[0] = node;
this.nodesWereRemoved (parent, childIndex, removedArray);
}, "javax.swing.tree.MutableTreeNode");
Clazz.defineMethod (c$, "nodeChanged", 
function (node) {
if (this.listenerList != null && node != null) {
var parent = node.getParent ();
if (parent != null) {
var anIndex = parent.getIndex (node);
if (anIndex != -1) {
var cIndexs =  Clazz.newIntArray (1, 0);
cIndexs[0] = anIndex;
this.nodesChanged (parent, cIndexs);
}} else if (node === this.getRoot ()) {
this.nodesChanged (node, null);
}}}, "javax.swing.tree.TreeNode");
Clazz.defineMethod (c$, "reload", 
function (node) {
if (node != null) {
this.fireTreeStructureChanged (this, this.getPathToRoot (node), null, null);
}}, "javax.swing.tree.TreeNode");
Clazz.defineMethod (c$, "nodesWereInserted", 
function (node, childIndices) {
if (this.listenerList != null && node != null && childIndices != null && childIndices.length > 0) {
var cCount = childIndices.length;
var newChildren =  new Array (cCount);
for (var counter = 0; counter < cCount; counter++) newChildren[counter] = node.getChildAt (childIndices[counter]);

this.fireTreeNodesInserted (this, this.getPathToRoot (node), childIndices, newChildren);
}}, "javax.swing.tree.TreeNode,~A");
Clazz.defineMethod (c$, "nodesWereRemoved", 
function (node, childIndices, removedChildren) {
if (node != null && childIndices != null) {
this.fireTreeNodesRemoved (this, this.getPathToRoot (node), childIndices, removedChildren);
}}, "javax.swing.tree.TreeNode,~A,~A");
Clazz.defineMethod (c$, "nodesChanged", 
function (node, childIndices) {
if (node != null) {
if (childIndices != null) {
var cCount = childIndices.length;
if (cCount > 0) {
var cChildren =  new Array (cCount);
for (var counter = 0; counter < cCount; counter++) cChildren[counter] = node.getChildAt (childIndices[counter]);

this.fireTreeNodesChanged (this, this.getPathToRoot (node), childIndices, cChildren);
}} else if (node === this.getRoot ()) {
this.fireTreeNodesChanged (this, this.getPathToRoot (node), null, null);
}}}, "javax.swing.tree.TreeNode,~A");
Clazz.defineMethod (c$, "nodeStructureChanged", 
function (node) {
if (node != null) {
this.fireTreeStructureChanged (this, this.getPathToRoot (node), null, null);
}}, "javax.swing.tree.TreeNode");
Clazz.defineMethod (c$, "getPathToRoot", 
function (aNode) {
return this.getPathToRoot (aNode, 0);
}, "javax.swing.tree.TreeNode");
Clazz.defineMethod (c$, "getPathToRoot", 
function (aNode, depth) {
var retNodes;
if (aNode == null) {
if (depth == 0) return null;
 else retNodes =  new Array (depth);
} else {
depth++;
if (aNode === this.root) retNodes =  new Array (depth);
 else retNodes = this.getPathToRoot (aNode.getParent (), depth);
retNodes[retNodes.length - depth] = aNode;
}return retNodes;
}, "javax.swing.tree.TreeNode,~N");
Clazz.overrideMethod (c$, "addTreeModelListener", 
function (l) {
this.listenerList.add (javax.swing.event.TreeModelListener, l);
}, "javax.swing.event.TreeModelListener");
Clazz.overrideMethod (c$, "removeTreeModelListener", 
function (l) {
this.listenerList.remove (javax.swing.event.TreeModelListener, l);
}, "javax.swing.event.TreeModelListener");
Clazz.defineMethod (c$, "getTreeModelListeners", 
function () {
return this.listenerList.getListeners (javax.swing.event.TreeModelListener);
});
Clazz.defineMethod (c$, "fireTreeNodesChanged", 
function (source, path, childIndices, children) {
var listeners = this.listenerList.getListenerList ();
var e = null;
for (var i = listeners.length - 2; i >= 0; i -= 2) {
if (listeners[i] === javax.swing.event.TreeModelListener) {
if (e == null) e =  new javax.swing.event.TreeModelEvent (source, path, childIndices, children);
(listeners[i + 1]).treeNodesChanged (e);
}}
}, "~O,~A,~A,~A");
Clazz.defineMethod (c$, "fireTreeNodesInserted", 
function (source, path, childIndices, children) {
var listeners = this.listenerList.getListenerList ();
var e = null;
for (var i = listeners.length - 2; i >= 0; i -= 2) {
if (listeners[i] === javax.swing.event.TreeModelListener) {
if (e == null) e =  new javax.swing.event.TreeModelEvent (source, path, childIndices, children);
(listeners[i + 1]).treeNodesInserted (e);
}}
}, "~O,~A,~A,~A");
Clazz.defineMethod (c$, "fireTreeNodesRemoved", 
function (source, path, childIndices, children) {
var listeners = this.listenerList.getListenerList ();
var e = null;
for (var i = listeners.length - 2; i >= 0; i -= 2) {
if (listeners[i] === javax.swing.event.TreeModelListener) {
if (e == null) e =  new javax.swing.event.TreeModelEvent (source, path, childIndices, children);
(listeners[i + 1]).treeNodesRemoved (e);
}}
}, "~O,~A,~A,~A");
Clazz.defineMethod (c$, "fireTreeStructureChanged", 
function (source, path, childIndices, children) {
var listeners = this.listenerList.getListenerList ();
var e = null;
for (var i = listeners.length - 2; i >= 0; i -= 2) {
if (listeners[i] === javax.swing.event.TreeModelListener) {
if (e == null) e =  new javax.swing.event.TreeModelEvent (source, path, childIndices, children);
(listeners[i + 1]).treeStructureChanged (e);
}}
}, "~O,~A,~A,~A");
Clazz.defineMethod (c$, "fireTreeStructureChanged", 
 function (source, path) {
var listeners = this.listenerList.getListenerList ();
var e = null;
for (var i = listeners.length - 2; i >= 0; i -= 2) {
if (listeners[i] === javax.swing.event.TreeModelListener) {
if (e == null) e =  new javax.swing.event.TreeModelEvent (source, path);
(listeners[i + 1]).treeStructureChanged (e);
}}
}, "~O,javax.swing.tree.TreePath");
Clazz.defineMethod (c$, "getListeners", 
function (listenerType) {
return this.listenerList.getListeners (listenerType);
}, "Class");
});

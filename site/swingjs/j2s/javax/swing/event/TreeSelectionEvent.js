Clazz.declarePackage ("javax.swing.event");
Clazz.load (["java.util.EventObject"], "javax.swing.event.TreeSelectionEvent", ["java.lang.IllegalArgumentException"], function () {
c$ = Clazz.decorateAsClass (function () {
this.paths = null;
this.areNew = null;
this.oldLeadSelectionPath = null;
this.newLeadSelectionPath = null;
Clazz.instantialize (this, arguments);
}, javax.swing.event, "TreeSelectionEvent", java.util.EventObject);
Clazz.makeConstructor (c$, 
function (source, paths, areNew, oldLeadSelectionPath, newLeadSelectionPath) {
Clazz.superConstructor (this, javax.swing.event.TreeSelectionEvent, [source]);
this.paths = paths;
this.areNew = areNew;
this.oldLeadSelectionPath = oldLeadSelectionPath;
this.newLeadSelectionPath = newLeadSelectionPath;
}, "~O,~A,~A,javax.swing.tree.TreePath,javax.swing.tree.TreePath");
Clazz.makeConstructor (c$, 
function (source, path, isNew, oldLeadSelectionPath, newLeadSelectionPath) {
Clazz.superConstructor (this, javax.swing.event.TreeSelectionEvent, [source]);
this.paths =  new Array (1);
this.paths[0] = path;
this.areNew =  Clazz.newBooleanArray (1, false);
this.areNew[0] = isNew;
this.oldLeadSelectionPath = oldLeadSelectionPath;
this.newLeadSelectionPath = newLeadSelectionPath;
}, "~O,javax.swing.tree.TreePath,~B,javax.swing.tree.TreePath,javax.swing.tree.TreePath");
Clazz.defineMethod (c$, "getPaths", 
function () {
var numPaths;
var retPaths;
numPaths = this.paths.length;
retPaths =  new Array (numPaths);
System.arraycopy (this.paths, 0, retPaths, 0, numPaths);
return retPaths;
});
Clazz.defineMethod (c$, "getPath", 
function () {
return this.paths[0];
});
Clazz.defineMethod (c$, "isAddedPath", 
function () {
return this.areNew[0];
});
Clazz.defineMethod (c$, "isAddedPath", 
function (path) {
for (var counter = this.paths.length - 1; counter >= 0; counter--) if (this.paths[counter].equals (path)) return this.areNew[counter];

throw  new IllegalArgumentException ("path is not a path identified by the TreeSelectionEvent");
}, "javax.swing.tree.TreePath");
Clazz.defineMethod (c$, "isAddedPath", 
function (index) {
if (this.paths == null || index < 0 || index >= this.paths.length) {
throw  new IllegalArgumentException ("index is beyond range of added paths identified by TreeSelectionEvent");
}return this.areNew[index];
}, "~N");
Clazz.defineMethod (c$, "getOldLeadSelectionPath", 
function () {
return this.oldLeadSelectionPath;
});
Clazz.defineMethod (c$, "getNewLeadSelectionPath", 
function () {
return this.newLeadSelectionPath;
});
Clazz.defineMethod (c$, "cloneWithSource", 
function (newSource) {
return  new javax.swing.event.TreeSelectionEvent (newSource, this.paths, this.areNew, this.oldLeadSelectionPath, this.newLeadSelectionPath);
}, "~O");
});

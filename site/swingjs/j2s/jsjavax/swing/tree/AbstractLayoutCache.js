Clazz.declarePackage ("jsjavax.swing.tree");
Clazz.load (["jsjavax.swing.tree.RowMapper"], "jsjavax.swing.tree.AbstractLayoutCache", null, function () {
c$ = Clazz.decorateAsClass (function () {
this.nodeDimensions = null;
this.treeModel = null;
this.treeSelectionModel = null;
this.rootVisible = false;
this.rowHeight = 0;
Clazz.instantialize (this, arguments);
}, jsjavax.swing.tree, "AbstractLayoutCache", null, jsjavax.swing.tree.RowMapper);
Clazz.defineMethod (c$, "setNodeDimensions", 
function (nd) {
this.nodeDimensions = nd;
}, "jsjavax.swing.tree.AbstractLayoutCache.NodeDimensions");
Clazz.defineMethod (c$, "getNodeDimensions", 
function () {
return this.nodeDimensions;
});
Clazz.defineMethod (c$, "setModel", 
function (newModel) {
this.treeModel = newModel;
}, "jsjavax.swing.tree.TreeModel");
Clazz.defineMethod (c$, "getModel", 
function () {
return this.treeModel;
});
Clazz.defineMethod (c$, "setRootVisible", 
function (rootVisible) {
this.rootVisible = rootVisible;
}, "~B");
Clazz.defineMethod (c$, "isRootVisible", 
function () {
return this.rootVisible;
});
Clazz.defineMethod (c$, "setRowHeight", 
function (rowHeight) {
this.rowHeight = rowHeight;
}, "~N");
Clazz.defineMethod (c$, "getRowHeight", 
function () {
return this.rowHeight;
});
Clazz.defineMethod (c$, "setSelectionModel", 
function (newLSM) {
if (this.treeSelectionModel != null) this.treeSelectionModel.setRowMapper (null);
this.treeSelectionModel = newLSM;
if (this.treeSelectionModel != null) this.treeSelectionModel.setRowMapper (this);
}, "jsjavax.swing.tree.TreeSelectionModel");
Clazz.defineMethod (c$, "getSelectionModel", 
function () {
return this.treeSelectionModel;
});
Clazz.defineMethod (c$, "getPreferredHeight", 
function () {
var rowCount = this.getRowCount ();
if (rowCount > 0) {
var bounds = this.getBounds (this.getPathForRow (rowCount - 1), null);
if (bounds != null) return bounds.y + bounds.height;
}return 0;
});
Clazz.defineMethod (c$, "getPreferredWidth", 
function (bounds) {
var rowCount = this.getRowCount ();
if (rowCount > 0) {
var firstPath;
var endY;
if (bounds == null) {
firstPath = this.getPathForRow (0);
endY = 2147483647;
} else {
firstPath = this.getPathClosestTo (bounds.x, bounds.y);
endY = bounds.height + bounds.y;
}var paths = this.getVisiblePathsFrom (firstPath);
if (paths != null && paths.hasMoreElements ()) {
var pBounds = this.getBounds (paths.nextElement (), null);
var width;
if (pBounds != null) {
width = pBounds.x + pBounds.width;
if (pBounds.y >= endY) {
return width;
}} else width = 0;
while (pBounds != null && paths.hasMoreElements ()) {
pBounds = this.getBounds (paths.nextElement (), pBounds);
if (pBounds != null && pBounds.y < endY) {
width = Math.max (width, pBounds.x + pBounds.width);
} else {
pBounds = null;
}}
return width;
}}return 0;
}, "jsjava.awt.Rectangle");
Clazz.overrideMethod (c$, "getRowsForPaths", 
function (paths) {
if (paths == null) return null;
var numPaths = paths.length;
var rows =  Clazz.newIntArray (numPaths, 0);
for (var counter = 0; counter < numPaths; counter++) rows[counter] = this.getRowForPath (paths[counter]);

return rows;
}, "~A");
Clazz.defineMethod (c$, "getNodeDimensions", 
function (value, row, depth, expanded, placeIn) {
var nd = this.getNodeDimensions ();
if (nd != null) {
return nd.getNodeDimensions (value, row, depth, expanded, placeIn);
}return null;
}, "~O,~N,~N,~B,jsjava.awt.Rectangle");
Clazz.defineMethod (c$, "isFixedRowHeight", 
function () {
return (this.rowHeight > 0);
});
Clazz.pu$h ();
c$ = Clazz.declareType (jsjavax.swing.tree.AbstractLayoutCache, "NodeDimensions");
c$ = Clazz.p0p ();
});

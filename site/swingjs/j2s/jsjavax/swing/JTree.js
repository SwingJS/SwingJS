Clazz.declarePackage ("jsjavax.swing");
Clazz.load (["jsjavax.swing.JComponent", "$.Scrollable", "$.Timer", "jsjavax.swing.event.TreeModelListener", "$.TreeSelectionListener", "jsjavax.swing.tree.DefaultMutableTreeNode", "$.DefaultTreeSelectionModel"], "jsjavax.swing.JTree", ["java.lang.Boolean", "$.IllegalArgumentException", "java.util.Collections", "$.Hashtable", "$.Stack", "$.Vector", "jsjava.awt.Dimension", "jsjava.awt.event.MouseEvent", "jsjavax.swing.JViewport", "$.SwingUtilities", "$.UIManager", "jsjavax.swing.event.TreeExpansionEvent", "$.TreeExpansionListener", "$.TreeWillExpandListener", "jsjavax.swing.text.Position", "jsjavax.swing.tree.DefaultTreeModel", "$.TreePath"], function () {
c$ = Clazz.decorateAsClass (function () {
this.treeModel = null;
this.selectionModel = null;
this.rootVisible = false;
this.cellRenderer = null;
this.rowHeight = 0;
this.rowHeightSet = false;
this.expandedState = null;
this.showsRootHandles = false;
this.showsRootHandlesSet = false;
this.selectionRedirector = null;
this.cellEditor = null;
this.editable = false;
this.largeModel = false;
this.visibleRowCount = 0;
this.invokesStopCellEditing = false;
this.scrollsOnExpand = false;
this.scrollsOnExpandSet = false;
this.toggleClickCount = 0;
this.treeModelListener = null;
this.expandedStack = null;
this.leadPath = null;
this.anchorPath = null;
this.expandsSelectedPaths = false;
this.settingUI = false;
this.dragEnabled = false;
this.$expandRow = -1;
if (!Clazz.isClassDefined ("jsjavax.swing.JTree.TreeTimer")) {
jsjavax.swing.JTree.$JTree$TreeTimer$ ();
}
this.dropTimer = null;
this.uiTreeExpansionListener = null;
if (!Clazz.isClassDefined ("jsjavax.swing.JTree.TreeSelectionRedirector")) {
jsjavax.swing.JTree.$JTree$TreeSelectionRedirector$ ();
}
if (!Clazz.isClassDefined ("jsjavax.swing.JTree.TreeModelHandler")) {
jsjavax.swing.JTree.$JTree$TreeModelHandler$ ();
}
Clazz.instantialize (this, arguments);
}, jsjavax.swing, "JTree", jsjavax.swing.JComponent, jsjavax.swing.Scrollable);
c$.getDefaultTreeModel = Clazz.defineMethod (c$, "getDefaultTreeModel", 
function () {
var root =  new jsjavax.swing.tree.DefaultMutableTreeNode ("JTree");
var parent;
parent =  new jsjavax.swing.tree.DefaultMutableTreeNode ("colors");
root.add (parent);
parent.add ( new jsjavax.swing.tree.DefaultMutableTreeNode ("blue"));
parent.add ( new jsjavax.swing.tree.DefaultMutableTreeNode ("violet"));
parent.add ( new jsjavax.swing.tree.DefaultMutableTreeNode ("red"));
parent.add ( new jsjavax.swing.tree.DefaultMutableTreeNode ("yellow"));
parent =  new jsjavax.swing.tree.DefaultMutableTreeNode ("sports");
root.add (parent);
parent.add ( new jsjavax.swing.tree.DefaultMutableTreeNode ("basketball"));
parent.add ( new jsjavax.swing.tree.DefaultMutableTreeNode ("soccer"));
parent.add ( new jsjavax.swing.tree.DefaultMutableTreeNode ("football"));
parent.add ( new jsjavax.swing.tree.DefaultMutableTreeNode ("hockey"));
parent =  new jsjavax.swing.tree.DefaultMutableTreeNode ("food");
root.add (parent);
parent.add ( new jsjavax.swing.tree.DefaultMutableTreeNode ("hot dogs"));
parent.add ( new jsjavax.swing.tree.DefaultMutableTreeNode ("pizza"));
parent.add ( new jsjavax.swing.tree.DefaultMutableTreeNode ("ravioli"));
parent.add ( new jsjavax.swing.tree.DefaultMutableTreeNode ("bananas"));
return  new jsjavax.swing.tree.DefaultTreeModel (root);
});
c$.createTreeModel = Clazz.defineMethod (c$, "createTreeModel", 
function (value) {
var root;
if ((Clazz.instanceOf (value, Array)) || (Clazz.instanceOf (value, java.util.Hashtable)) || (Clazz.instanceOf (value, java.util.Vector))) {
root =  new jsjavax.swing.tree.DefaultMutableTreeNode ("root");
jsjavax.swing.JTree.DynamicUtilTreeNode.createChildren (root, value);
} else {
root =  new jsjavax.swing.JTree.DynamicUtilTreeNode ("root", value);
}return  new jsjavax.swing.tree.DefaultTreeModel (root, false);
}, "~O");
Clazz.makeConstructor (c$, 
function () {
this.construct (jsjavax.swing.JTree.getDefaultTreeModel ());
});
Clazz.makeConstructor (c$, 
function (value) {
this.construct (jsjavax.swing.JTree.createTreeModel (value));
this.setRootVisible (false);
this.setShowsRootHandles (true);
this.expandRoot ();
}, "~A");
Clazz.makeConstructor (c$, 
function (value) {
this.construct (jsjavax.swing.JTree.createTreeModel (value));
this.setRootVisible (false);
this.setShowsRootHandles (true);
this.expandRoot ();
}, "java.util.Vector");
Clazz.makeConstructor (c$, 
function (value) {
this.construct (jsjavax.swing.JTree.createTreeModel (value));
this.setRootVisible (false);
this.setShowsRootHandles (true);
this.expandRoot ();
}, "java.util.Hashtable");
Clazz.makeConstructor (c$, 
function (root) {
this.construct (root, false);
}, "jsjavax.swing.tree.TreeNode");
Clazz.makeConstructor (c$, 
function (root, asksAllowsChildren) {
this.construct ( new jsjavax.swing.tree.DefaultTreeModel (root, asksAllowsChildren));
}, "jsjavax.swing.tree.TreeNode,~B");
Clazz.makeConstructor (c$, 
function (newModel) {
Clazz.superConstructor (this, jsjavax.swing.JTree);
this.expandedStack =  new java.util.Stack ();
this.toggleClickCount = 2;
this.expandedState =  new java.util.Hashtable ();
this.setLayout (null);
this.rowHeight = 16;
this.visibleRowCount = 20;
this.rootVisible = true;
this.selectionModel =  new jsjavax.swing.tree.DefaultTreeSelectionModel ();
this.cellRenderer = null;
this.scrollsOnExpand = true;
this.setOpaque (true);
this.expandsSelectedPaths = true;
this.updateUI ();
this.setModel (newModel);
}, "jsjavax.swing.tree.TreeModel");
Clazz.defineMethod (c$, "getUI", 
function () {
return this.ui;
});
Clazz.defineMethod (c$, "setUI", 
function (ui) {
if (this.ui !== ui) {
this.settingUI = true;
this.uiTreeExpansionListener = null;
try {
Clazz.superCall (this, jsjavax.swing.JTree, "setUI", [ui]);
} finally {
this.settingUI = false;
}
}}, "jsjavax.swing.plaf.TreeUI");
Clazz.overrideMethod (c$, "updateUI", 
function () {
this.setUI (jsjavax.swing.UIManager.getUI (this));
jsjavax.swing.SwingUtilities.updateRendererOrEditorUI (this.getCellRenderer ());
jsjavax.swing.SwingUtilities.updateRendererOrEditorUI (this.getCellEditor ());
});
Clazz.overrideMethod (c$, "getUIClassID", 
function () {
return "TreeUI";
});
Clazz.defineMethod (c$, "getCellRenderer", 
function () {
return this.cellRenderer;
});
Clazz.defineMethod (c$, "setCellRenderer", 
function (x) {
var oldValue = this.cellRenderer;
this.cellRenderer = x;
this.firePropertyChange ("cellRenderer", oldValue, this.cellRenderer);
this.invalidate ();
}, "jsjavax.swing.tree.TreeCellRenderer");
Clazz.defineMethod (c$, "setEditable", 
function (flag) {
var oldValue = this.editable;
this.editable = flag;
this.firePropertyChange ("editable", oldValue, flag);
}, "~B");
Clazz.defineMethod (c$, "isEditable", 
function () {
return this.editable;
});
Clazz.defineMethod (c$, "setCellEditor", 
function (cellEditor) {
var oldEditor = this.cellEditor;
this.cellEditor = cellEditor;
this.firePropertyChange ("cellEditor", oldEditor, cellEditor);
this.invalidate ();
}, "jsjavax.swing.tree.TreeCellEditor");
Clazz.defineMethod (c$, "getCellEditor", 
function () {
return this.cellEditor;
});
Clazz.defineMethod (c$, "getModel", 
function () {
return this.treeModel;
});
Clazz.defineMethod (c$, "setModel", 
function (newModel) {
this.clearSelection ();
var oldModel = this.treeModel;
if (this.treeModel != null && this.treeModelListener != null) this.treeModel.removeTreeModelListener (this.treeModelListener);
this.treeModel = newModel;
this.clearToggledPaths ();
if (this.treeModel != null) {
if (this.treeModelListener == null) this.treeModelListener = this.createTreeModelListener ();
if (this.treeModelListener != null) this.treeModel.addTreeModelListener (this.treeModelListener);
if (this.treeModel.getRoot () != null && !this.treeModel.isLeaf (this.treeModel.getRoot ())) {
this.expandedState.put ( new jsjavax.swing.tree.TreePath (this.treeModel.getRoot ()), Boolean.TRUE);
}}this.firePropertyChange ("model", oldModel, this.treeModel);
this.invalidate ();
}, "jsjavax.swing.tree.TreeModel");
Clazz.defineMethod (c$, "isRootVisible", 
function () {
return this.rootVisible;
});
Clazz.defineMethod (c$, "setRootVisible", 
function (rootVisible) {
var oldValue = this.rootVisible;
this.rootVisible = rootVisible;
this.firePropertyChange ("rootVisible", oldValue, this.rootVisible);
}, "~B");
Clazz.defineMethod (c$, "setShowsRootHandles", 
function (newValue) {
var oldValue = this.showsRootHandles;
var model = this.getModel ();
this.showsRootHandles = newValue;
this.showsRootHandlesSet = true;
this.firePropertyChange ("showsRootHandles", oldValue, this.showsRootHandles);
this.invalidate ();
}, "~B");
Clazz.defineMethod (c$, "getShowsRootHandles", 
function () {
return this.showsRootHandles;
});
Clazz.defineMethod (c$, "setRowHeight", 
function (rowHeight) {
var oldValue = this.rowHeight;
this.rowHeight = rowHeight;
this.rowHeightSet = true;
this.firePropertyChange ("rowHeight", oldValue, this.rowHeight);
this.invalidate ();
}, "~N");
Clazz.defineMethod (c$, "getRowHeight", 
function () {
return this.rowHeight;
});
Clazz.defineMethod (c$, "isFixedRowHeight", 
function () {
return (this.rowHeight > 0);
});
Clazz.defineMethod (c$, "setLargeModel", 
function (newValue) {
var oldValue = this.largeModel;
this.largeModel = newValue;
this.firePropertyChange ("largeModel", oldValue, newValue);
}, "~B");
Clazz.defineMethod (c$, "isLargeModel", 
function () {
return this.largeModel;
});
Clazz.defineMethod (c$, "setInvokesStopCellEditing", 
function (newValue) {
var oldValue = this.invokesStopCellEditing;
this.invokesStopCellEditing = newValue;
this.firePropertyChange ("invokesStopCellEditing", oldValue, newValue);
}, "~B");
Clazz.defineMethod (c$, "getInvokesStopCellEditing", 
function () {
return this.invokesStopCellEditing;
});
Clazz.defineMethod (c$, "setScrollsOnExpand", 
function (newValue) {
var oldValue = this.scrollsOnExpand;
this.scrollsOnExpand = newValue;
this.scrollsOnExpandSet = true;
this.firePropertyChange ("scrollsOnExpand", oldValue, newValue);
}, "~B");
Clazz.defineMethod (c$, "getScrollsOnExpand", 
function () {
return this.scrollsOnExpand;
});
Clazz.defineMethod (c$, "setToggleClickCount", 
function (clickCount) {
var oldCount = this.toggleClickCount;
this.toggleClickCount = clickCount;
this.firePropertyChange ("toggleClickCount", oldCount, clickCount);
}, "~N");
Clazz.defineMethod (c$, "getToggleClickCount", 
function () {
return this.toggleClickCount;
});
Clazz.defineMethod (c$, "setExpandsSelectedPaths", 
function (newValue) {
var oldValue = this.expandsSelectedPaths;
this.expandsSelectedPaths = newValue;
this.firePropertyChange ("expandsSelectedPaths", oldValue, newValue);
}, "~B");
Clazz.defineMethod (c$, "getExpandsSelectedPaths", 
function () {
return this.expandsSelectedPaths;
});
Clazz.defineMethod (c$, "setDragEnabled", 
function (b) {
this.dragEnabled = b;
}, "~B");
Clazz.defineMethod (c$, "getDragEnabled", 
function () {
return this.dragEnabled;
});
Clazz.defineMethod (c$, "dndDone", 
function () {
this.cancelDropTimer ();
this.dropTimer = null;
});
Clazz.defineMethod (c$, "cancelDropTimer", 
($fz = function () {
if (this.dropTimer != null && this.dropTimer.isRunning ()) {
this.$expandRow = -1;
this.dropTimer.stop ();
}}, $fz.isPrivate = true, $fz));
Clazz.defineMethod (c$, "isPathEditable", 
function (path) {
return this.isEditable ();
}, "jsjavax.swing.tree.TreePath");
Clazz.defineMethod (c$, "getToolTipText", 
function (event) {
var tip = null;
if (event != null) {
var p = event.getPoint ();
var selRow = this.getRowForLocation (p.x, p.y);
var r = this.getCellRenderer ();
if (selRow != -1 && r != null) {
var path = this.getPathForRow (selRow);
var lastPath = path.getLastPathComponent ();
var rComponent = r.getTreeCellRendererComponent (this, lastPath, this.isRowSelected (selRow), this.isExpanded (selRow), this.getModel ().isLeaf (lastPath), selRow, true);
if (Clazz.instanceOf (rComponent, jsjavax.swing.JComponent)) {
var newEvent;
var pathBounds = this.getPathBounds (path);
p.translate (-pathBounds.x, -pathBounds.y);
newEvent =  new jsjava.awt.event.MouseEvent (rComponent, event.getID (), event.getWhen (), event.getModifiers (), p.x, p.y, event.getXOnScreen (), event.getYOnScreen (), event.getClickCount (), event.isPopupTrigger (), 0);
tip = (rComponent).getToolTipText (newEvent);
}}}if (tip == null) {
tip = this.getToolTipText ();
}return tip;
}, "jsjava.awt.event.MouseEvent");
Clazz.defineMethod (c$, "convertValueToText", 
function (value, selected, expanded, leaf, row, hasFocus) {
if (value != null) {
var sValue = value.toString ();
if (sValue != null) {
return sValue;
}}return "";
}, "~O,~B,~B,~B,~N,~B");
Clazz.defineMethod (c$, "getRowCount", 
function () {
var tree = this.getUI ();
if (tree != null) return tree.getRowCount (this);
return 0;
});
Clazz.defineMethod (c$, "setSelectionPath", 
function (path) {
this.getSelectionModel ().setSelectionPath (path);
}, "jsjavax.swing.tree.TreePath");
Clazz.defineMethod (c$, "setSelectionPaths", 
function (paths) {
this.getSelectionModel ().setSelectionPaths (paths);
}, "~A");
Clazz.defineMethod (c$, "setLeadSelectionPath", 
function (newPath) {
var oldValue = this.leadPath;
this.leadPath = newPath;
this.firePropertyChange ("leadSelectionPath", oldValue, newPath);
}, "jsjavax.swing.tree.TreePath");
Clazz.defineMethod (c$, "setAnchorSelectionPath", 
function (newPath) {
var oldValue = this.anchorPath;
this.anchorPath = newPath;
this.firePropertyChange ("anchorSelectionPath", oldValue, newPath);
}, "jsjavax.swing.tree.TreePath");
Clazz.defineMethod (c$, "setSelectionRow", 
function (row) {
var rows =  Clazz.newIntArray (-1, [row]);
this.setSelectionRows (rows);
}, "~N");
Clazz.defineMethod (c$, "setSelectionRows", 
function (rows) {
var ui = this.getUI ();
if (ui != null && rows != null) {
var numRows = rows.length;
var paths =  new Array (numRows);
for (var counter = 0; counter < numRows; counter++) {
paths[counter] = ui.getPathForRow (this, rows[counter]);
}
this.setSelectionPaths (paths);
}}, "~A");
Clazz.defineMethod (c$, "addSelectionPath", 
function (path) {
this.getSelectionModel ().addSelectionPath (path);
}, "jsjavax.swing.tree.TreePath");
Clazz.defineMethod (c$, "addSelectionPaths", 
function (paths) {
this.getSelectionModel ().addSelectionPaths (paths);
}, "~A");
Clazz.defineMethod (c$, "addSelectionRow", 
function (row) {
var rows =  Clazz.newIntArray (-1, [row]);
this.addSelectionRows (rows);
}, "~N");
Clazz.defineMethod (c$, "addSelectionRows", 
function (rows) {
var ui = this.getUI ();
if (ui != null && rows != null) {
var numRows = rows.length;
var paths =  new Array (numRows);
for (var counter = 0; counter < numRows; counter++) paths[counter] = ui.getPathForRow (this, rows[counter]);

this.addSelectionPaths (paths);
}}, "~A");
Clazz.defineMethod (c$, "getLastSelectedPathComponent", 
function () {
var selPath = this.getSelectionModel ().getSelectionPath ();
if (selPath != null) return selPath.getLastPathComponent ();
return null;
});
Clazz.defineMethod (c$, "getLeadSelectionPath", 
function () {
return this.leadPath;
});
Clazz.defineMethod (c$, "getAnchorSelectionPath", 
function () {
return this.anchorPath;
});
Clazz.defineMethod (c$, "getSelectionPath", 
function () {
return this.getSelectionModel ().getSelectionPath ();
});
Clazz.defineMethod (c$, "getSelectionPaths", 
function () {
return this.getSelectionModel ().getSelectionPaths ();
});
Clazz.defineMethod (c$, "getSelectionRows", 
function () {
return this.getSelectionModel ().getSelectionRows ();
});
Clazz.defineMethod (c$, "getSelectionCount", 
function () {
return this.selectionModel.getSelectionCount ();
});
Clazz.defineMethod (c$, "getMinSelectionRow", 
function () {
return this.getSelectionModel ().getMinSelectionRow ();
});
Clazz.defineMethod (c$, "getMaxSelectionRow", 
function () {
return this.getSelectionModel ().getMaxSelectionRow ();
});
Clazz.defineMethod (c$, "getLeadSelectionRow", 
function () {
var leadPath = this.getLeadSelectionPath ();
if (leadPath != null) {
return this.getRowForPath (leadPath);
}return -1;
});
Clazz.defineMethod (c$, "isPathSelected", 
function (path) {
return this.getSelectionModel ().isPathSelected (path);
}, "jsjavax.swing.tree.TreePath");
Clazz.defineMethod (c$, "isRowSelected", 
function (row) {
return this.getSelectionModel ().isRowSelected (row);
}, "~N");
Clazz.defineMethod (c$, "getExpandedDescendants", 
function (parent) {
if (!this.isExpanded (parent)) return null;
var toggledPaths = this.expandedState.keys ();
var elements = null;
var path;
var value;
if (toggledPaths != null) {
while (toggledPaths.hasMoreElements ()) {
path = toggledPaths.nextElement ();
value = this.expandedState.get (path);
if (path !== parent && value != null && (value).booleanValue () && parent.isDescendant (path) && this.isVisible (path)) {
if (elements == null) {
elements =  new java.util.Vector ();
}elements.addElement (path);
}}
}if (elements == null) {
var empty = java.util.Collections.emptySet ();
return java.util.Collections.enumeration (empty);
}return elements.elements ();
}, "jsjavax.swing.tree.TreePath");
Clazz.defineMethod (c$, "hasBeenExpanded", 
function (path) {
return (path != null && this.expandedState.get (path) != null);
}, "jsjavax.swing.tree.TreePath");
Clazz.defineMethod (c$, "isExpanded", 
function (path) {
if (path == null) return false;
var value = this.expandedState.get (path);
if (value == null || !(value).booleanValue ()) return false;
var parentPath = path.getParentPath ();
if (parentPath != null) return this.isExpanded (parentPath);
return true;
}, "jsjavax.swing.tree.TreePath");
Clazz.defineMethod (c$, "isExpanded", 
function (row) {
var tree = this.getUI ();
if (tree != null) {
var path = tree.getPathForRow (this, row);
if (path != null) {
var value = this.expandedState.get (path);
return (value != null && value.booleanValue ());
}}return false;
}, "~N");
Clazz.defineMethod (c$, "isCollapsed", 
function (path) {
return !this.isExpanded (path);
}, "jsjavax.swing.tree.TreePath");
Clazz.defineMethod (c$, "isCollapsed", 
function (row) {
return !this.isExpanded (row);
}, "~N");
Clazz.defineMethod (c$, "makeVisible", 
function (path) {
if (path != null) {
var parentPath = path.getParentPath ();
if (parentPath != null) {
this.expandPath (parentPath);
}}}, "jsjavax.swing.tree.TreePath");
Clazz.defineMethod (c$, "isVisible", 
function (path) {
if (path != null) {
var parentPath = path.getParentPath ();
if (parentPath != null) return this.isExpanded (parentPath);
return true;
}return false;
}, "jsjavax.swing.tree.TreePath");
Clazz.defineMethod (c$, "getPathBounds", 
function (path) {
var tree = this.getUI ();
if (tree != null) return tree.getPathBounds (this, path);
return null;
}, "jsjavax.swing.tree.TreePath");
Clazz.defineMethod (c$, "getRowBounds", 
function (row) {
return this.getPathBounds (this.getPathForRow (row));
}, "~N");
Clazz.defineMethod (c$, "scrollPathToVisible", 
function (path) {
if (path != null) {
this.makeVisible (path);
var bounds = this.getPathBounds (path);
if (bounds != null) {
this.scrollRectToVisible (bounds);
}}}, "jsjavax.swing.tree.TreePath");
Clazz.defineMethod (c$, "scrollRowToVisible", 
function (row) {
this.scrollPathToVisible (this.getPathForRow (row));
}, "~N");
Clazz.defineMethod (c$, "getPathForRow", 
function (row) {
var tree = this.getUI ();
if (tree != null) return tree.getPathForRow (this, row);
return null;
}, "~N");
Clazz.defineMethod (c$, "getRowForPath", 
function (path) {
var tree = this.getUI ();
if (tree != null) return tree.getRowForPath (this, path);
return -1;
}, "jsjavax.swing.tree.TreePath");
Clazz.defineMethod (c$, "expandPath", 
function (path) {
var model = this.getModel ();
if (path != null && model != null && !model.isLeaf (path.getLastPathComponent ())) {
this.setExpandedState (path, true);
}}, "jsjavax.swing.tree.TreePath");
Clazz.defineMethod (c$, "expandRow", 
function (row) {
this.expandPath (this.getPathForRow (row));
}, "~N");
Clazz.defineMethod (c$, "collapsePath", 
function (path) {
this.setExpandedState (path, false);
}, "jsjavax.swing.tree.TreePath");
Clazz.defineMethod (c$, "collapseRow", 
function (row) {
this.collapsePath (this.getPathForRow (row));
}, "~N");
Clazz.defineMethod (c$, "getPathForLocation", 
function (x, y) {
var closestPath = this.getClosestPathForLocation (x, y);
if (closestPath != null) {
var pathBounds = this.getPathBounds (closestPath);
if (pathBounds != null && x >= pathBounds.x && x < (pathBounds.x + pathBounds.width) && y >= pathBounds.y && y < (pathBounds.y + pathBounds.height)) return closestPath;
}return null;
}, "~N,~N");
Clazz.defineMethod (c$, "getRowForLocation", 
function (x, y) {
return this.getRowForPath (this.getPathForLocation (x, y));
}, "~N,~N");
Clazz.defineMethod (c$, "getClosestPathForLocation", 
function (x, y) {
var tree = this.getUI ();
if (tree != null) return tree.getClosestPathForLocation (this, x, y);
return null;
}, "~N,~N");
Clazz.defineMethod (c$, "getClosestRowForLocation", 
function (x, y) {
return this.getRowForPath (this.getClosestPathForLocation (x, y));
}, "~N,~N");
Clazz.defineMethod (c$, "isEditing", 
function () {
var tree = this.getUI ();
if (tree != null) return tree.isEditing (this);
return false;
});
Clazz.defineMethod (c$, "stopEditing", 
function () {
var tree = this.getUI ();
if (tree != null) return tree.stopEditing (this);
return false;
});
Clazz.defineMethod (c$, "cancelEditing", 
function () {
var tree = this.getUI ();
if (tree != null) tree.cancelEditing (this);
});
Clazz.defineMethod (c$, "startEditingAtPath", 
function (path) {
var tree = this.getUI ();
if (tree != null) tree.startEditingAtPath (this, path);
}, "jsjavax.swing.tree.TreePath");
Clazz.defineMethod (c$, "getEditingPath", 
function () {
var tree = this.getUI ();
if (tree != null) return tree.getEditingPath (this);
return null;
});
Clazz.defineMethod (c$, "setSelectionModel", 
function (selectionModel) {
if (selectionModel == null) selectionModel = jsjavax.swing.JTree.EmptySelectionModel.sharedInstance ();
var oldValue = this.selectionModel;
if (this.selectionModel != null && this.selectionRedirector != null) {
this.selectionModel.removeTreeSelectionListener (this.selectionRedirector);
}this.selectionModel = selectionModel;
if (this.selectionRedirector != null) {
this.selectionModel.addTreeSelectionListener (this.selectionRedirector);
}this.firePropertyChange ("selectionModel", oldValue, this.selectionModel);
}, "jsjavax.swing.tree.TreeSelectionModel");
Clazz.defineMethod (c$, "getSelectionModel", 
function () {
return this.selectionModel;
});
Clazz.defineMethod (c$, "getPathBetweenRows", 
function (index0, index1) {
var newMinIndex;
var newMaxIndex;
var tree = this.getUI ();
newMinIndex = Math.min (index0, index1);
newMaxIndex = Math.max (index0, index1);
if (tree != null) {
var selection =  new Array (newMaxIndex - newMinIndex + 1);
for (var counter = newMinIndex; counter <= newMaxIndex; counter++) {
selection[counter - newMinIndex] = tree.getPathForRow (this, counter);
}
return selection;
}return null;
}, "~N,~N");
Clazz.defineMethod (c$, "setSelectionInterval", 
function (index0, index1) {
var paths = this.getPathBetweenRows (index0, index1);
this.getSelectionModel ().setSelectionPaths (paths);
}, "~N,~N");
Clazz.defineMethod (c$, "addSelectionInterval", 
function (index0, index1) {
var paths = this.getPathBetweenRows (index0, index1);
this.getSelectionModel ().addSelectionPaths (paths);
}, "~N,~N");
Clazz.defineMethod (c$, "removeSelectionInterval", 
function (index0, index1) {
var paths = this.getPathBetweenRows (index0, index1);
this.getSelectionModel ().removeSelectionPaths (paths);
}, "~N,~N");
Clazz.defineMethod (c$, "removeSelectionPath", 
function (path) {
this.getSelectionModel ().removeSelectionPath (path);
}, "jsjavax.swing.tree.TreePath");
Clazz.defineMethod (c$, "removeSelectionPaths", 
function (paths) {
this.getSelectionModel ().removeSelectionPaths (paths);
}, "~A");
Clazz.defineMethod (c$, "removeSelectionRow", 
function (row) {
var rows =  Clazz.newIntArray (-1, [row]);
this.removeSelectionRows (rows);
}, "~N");
Clazz.defineMethod (c$, "removeSelectionRows", 
function (rows) {
var ui = this.getUI ();
if (ui != null && rows != null) {
var numRows = rows.length;
var paths =  new Array (numRows);
for (var counter = 0; counter < numRows; counter++) paths[counter] = ui.getPathForRow (this, rows[counter]);

this.removeSelectionPaths (paths);
}}, "~A");
Clazz.defineMethod (c$, "clearSelection", 
function () {
this.getSelectionModel ().clearSelection ();
});
Clazz.defineMethod (c$, "isSelectionEmpty", 
function () {
return this.getSelectionModel ().isSelectionEmpty ();
});
Clazz.defineMethod (c$, "addTreeExpansionListener", 
function (tel) {
if (this.settingUI) {
this.uiTreeExpansionListener = tel;
}this.listenerList.add (jsjavax.swing.event.TreeExpansionListener, tel);
}, "jsjavax.swing.event.TreeExpansionListener");
Clazz.defineMethod (c$, "removeTreeExpansionListener", 
function (tel) {
this.listenerList.remove (jsjavax.swing.event.TreeExpansionListener, tel);
if (this.uiTreeExpansionListener === tel) {
this.uiTreeExpansionListener = null;
}}, "jsjavax.swing.event.TreeExpansionListener");
Clazz.defineMethod (c$, "getTreeExpansionListeners", 
function () {
return this.listenerList.getListeners (jsjavax.swing.event.TreeExpansionListener);
});
Clazz.defineMethod (c$, "addTreeWillExpandListener", 
function (tel) {
this.listenerList.add (jsjavax.swing.event.TreeWillExpandListener, tel);
}, "jsjavax.swing.event.TreeWillExpandListener");
Clazz.defineMethod (c$, "removeTreeWillExpandListener", 
function (tel) {
this.listenerList.remove (jsjavax.swing.event.TreeWillExpandListener, tel);
}, "jsjavax.swing.event.TreeWillExpandListener");
Clazz.defineMethod (c$, "getTreeWillExpandListeners", 
function () {
return this.listenerList.getListeners (jsjavax.swing.event.TreeWillExpandListener);
});
Clazz.defineMethod (c$, "fireTreeExpanded", 
function (path) {
var listeners = this.listenerList.getListenerList ();
var e = null;
if (this.uiTreeExpansionListener != null) {
e =  new jsjavax.swing.event.TreeExpansionEvent (this, path);
this.uiTreeExpansionListener.treeExpanded (e);
}for (var i = listeners.length - 2; i >= 0; i -= 2) {
if (listeners[i] === jsjavax.swing.event.TreeExpansionListener && listeners[i + 1] !== this.uiTreeExpansionListener) {
if (e == null) e =  new jsjavax.swing.event.TreeExpansionEvent (this, path);
(listeners[i + 1]).treeExpanded (e);
}}
}, "jsjavax.swing.tree.TreePath");
Clazz.defineMethod (c$, "fireTreeCollapsed", 
function (path) {
var listeners = this.listenerList.getListenerList ();
var e = null;
if (this.uiTreeExpansionListener != null) {
e =  new jsjavax.swing.event.TreeExpansionEvent (this, path);
this.uiTreeExpansionListener.treeCollapsed (e);
}for (var i = listeners.length - 2; i >= 0; i -= 2) {
if (listeners[i] === jsjavax.swing.event.TreeExpansionListener && listeners[i + 1] !== this.uiTreeExpansionListener) {
if (e == null) e =  new jsjavax.swing.event.TreeExpansionEvent (this, path);
(listeners[i + 1]).treeCollapsed (e);
}}
}, "jsjavax.swing.tree.TreePath");
Clazz.defineMethod (c$, "fireTreeWillExpand", 
function (path) {
var listeners = this.listenerList.getListenerList ();
var e = null;
for (var i = listeners.length - 2; i >= 0; i -= 2) {
if (listeners[i] === jsjavax.swing.event.TreeWillExpandListener) {
if (e == null) e =  new jsjavax.swing.event.TreeExpansionEvent (this, path);
(listeners[i + 1]).treeWillExpand (e);
}}
}, "jsjavax.swing.tree.TreePath");
Clazz.defineMethod (c$, "fireTreeWillCollapse", 
function (path) {
var listeners = this.listenerList.getListenerList ();
var e = null;
for (var i = listeners.length - 2; i >= 0; i -= 2) {
if (listeners[i] === jsjavax.swing.event.TreeWillExpandListener) {
if (e == null) e =  new jsjavax.swing.event.TreeExpansionEvent (this, path);
(listeners[i + 1]).treeWillCollapse (e);
}}
}, "jsjavax.swing.tree.TreePath");
Clazz.defineMethod (c$, "addTreeSelectionListener", 
function (tsl) {
this.listenerList.add (jsjavax.swing.event.TreeSelectionListener, tsl);
if (this.listenerList.getListenerCount (jsjavax.swing.event.TreeSelectionListener) != 0 && this.selectionRedirector == null) {
this.selectionRedirector = Clazz.innerTypeInstance (jsjavax.swing.JTree.TreeSelectionRedirector, this, null);
this.selectionModel.addTreeSelectionListener (this.selectionRedirector);
}}, "jsjavax.swing.event.TreeSelectionListener");
Clazz.defineMethod (c$, "removeTreeSelectionListener", 
function (tsl) {
this.listenerList.remove (jsjavax.swing.event.TreeSelectionListener, tsl);
if (this.listenerList.getListenerCount (jsjavax.swing.event.TreeSelectionListener) == 0 && this.selectionRedirector != null) {
this.selectionModel.removeTreeSelectionListener (this.selectionRedirector);
this.selectionRedirector = null;
}}, "jsjavax.swing.event.TreeSelectionListener");
Clazz.defineMethod (c$, "getTreeSelectionListeners", 
function () {
return this.listenerList.getListeners (jsjavax.swing.event.TreeSelectionListener);
});
Clazz.defineMethod (c$, "fireValueChanged", 
function (e) {
var listeners = this.listenerList.getListenerList ();
for (var i = listeners.length - 2; i >= 0; i -= 2) {
if (listeners[i] === jsjavax.swing.event.TreeSelectionListener) {
(listeners[i + 1]).valueChanged (e);
}}
}, "jsjavax.swing.event.TreeSelectionEvent");
Clazz.defineMethod (c$, "treeDidChange", 
function () {
this.revalidate ();
this.repaint ();
});
Clazz.defineMethod (c$, "setVisibleRowCount", 
function (newCount) {
var oldCount = this.visibleRowCount;
this.visibleRowCount = newCount;
this.firePropertyChange ("visibleRowCount", oldCount, this.visibleRowCount);
this.invalidate ();
}, "~N");
Clazz.defineMethod (c$, "getVisibleRowCount", 
function () {
return this.visibleRowCount;
});
Clazz.defineMethod (c$, "expandRoot", 
($fz = function () {
var model = this.getModel ();
if (model != null && model.getRoot () != null) {
this.expandPath ( new jsjavax.swing.tree.TreePath (model.getRoot ()));
}}, $fz.isPrivate = true, $fz));
Clazz.defineMethod (c$, "getNextMatch", 
function (prefix, startingRow, bias) {
var max = this.getRowCount ();
if (prefix == null) {
throw  new IllegalArgumentException ();
}if (startingRow < 0 || startingRow >= max) {
throw  new IllegalArgumentException ();
}prefix = prefix.toUpperCase ();
var increment = (bias === jsjavax.swing.text.Position.Bias.Forward) ? 1 : -1;
var row = startingRow;
do {
var path = this.getPathForRow (row);
var text = this.convertValueToText (path.getLastPathComponent (), this.isRowSelected (row), this.isExpanded (row), true, row, false);
if (text.toUpperCase ().startsWith (prefix)) {
return path;
}row = (row + increment + max) % max;
} while (row != startingRow);
return null;
}, "~S,~N,jsjavax.swing.text.Position.Bias");
Clazz.overrideMethod (c$, "getPreferredScrollableViewportSize", 
function () {
var width = this.getPreferredSize ().width;
var visRows = this.getVisibleRowCount ();
var height = -1;
if (this.isFixedRowHeight ()) height = visRows * this.getRowHeight ();
 else {
var ui = this.getUI ();
if (ui != null && visRows > 0) {
var rc = ui.getRowCount (this);
if (rc >= visRows) {
var bounds = this.getRowBounds (visRows - 1);
if (bounds != null) {
height = bounds.y + bounds.height;
}} else if (rc > 0) {
var bounds = this.getRowBounds (0);
if (bounds != null) {
height = bounds.height * visRows;
}}}if (height == -1) {
height = 16 * visRows;
}}return  new jsjava.awt.Dimension (width, height);
});
Clazz.overrideMethod (c$, "getScrollableUnitIncrement", 
function (visibleRect, orientation, direction) {
if (orientation == 1) {
var rowBounds;
var firstIndex = this.getClosestRowForLocation (0, visibleRect.y);
if (firstIndex != -1) {
rowBounds = this.getRowBounds (firstIndex);
if (rowBounds.y != visibleRect.y) {
if (direction < 0) {
return Math.max (0, (visibleRect.y - rowBounds.y));
}return (rowBounds.y + rowBounds.height - visibleRect.y);
}if (direction < 0) {
if (firstIndex != 0) {
rowBounds = this.getRowBounds (firstIndex - 1);
return rowBounds.height;
}} else {
return rowBounds.height;
}}return 0;
}return 4;
}, "jsjava.awt.Rectangle,~N,~N");
Clazz.overrideMethod (c$, "getScrollableBlockIncrement", 
function (visibleRect, orientation, direction) {
return (orientation == 1) ? visibleRect.height : visibleRect.width;
}, "jsjava.awt.Rectangle,~N,~N");
Clazz.overrideMethod (c$, "getScrollableTracksViewportWidth", 
function () {
if (Clazz.instanceOf (this.getParent (), jsjavax.swing.JViewport)) {
return ((this.getParent ()).getWidth () > this.getPreferredSize ().width);
}return false;
});
Clazz.overrideMethod (c$, "getScrollableTracksViewportHeight", 
function () {
if (Clazz.instanceOf (this.getParent (), jsjavax.swing.JViewport)) {
return ((this.getParent ()).getHeight () > this.getPreferredSize ().height);
}return false;
});
Clazz.defineMethod (c$, "setExpandedState", 
function (path, state) {
if (path != null) {
var stack;
var parentPath = path.getParentPath ();
if (this.expandedStack.size () == 0) {
stack =  new java.util.Stack ();
} else {
stack = this.expandedStack.pop ();
}try {
while (parentPath != null) {
if (this.isExpanded (parentPath)) {
parentPath = null;
} else {
stack.push (parentPath);
parentPath = parentPath.getParentPath ();
}}
for (var counter = stack.size () - 1; counter >= 0; counter--) {
parentPath = stack.pop ();
if (!this.isExpanded (parentPath)) {
try {
this.fireTreeWillExpand (parentPath);
} catch (eve) {
if (Clazz.exceptionOf (eve, jsjavax.swing.tree.ExpandVetoException)) {
return;
} else {
throw eve;
}
}
this.expandedState.put (parentPath, Boolean.TRUE);
this.fireTreeExpanded (parentPath);
}}
} finally {
if (this.expandedStack.size () < jsjavax.swing.JTree.TEMP_STACK_SIZE) {
stack.removeAllElements ();
this.expandedStack.push (stack);
}}
if (!state) {
var cValue = this.expandedState.get (path);
if (cValue != null && (cValue).booleanValue ()) {
try {
this.fireTreeWillCollapse (path);
} catch (eve) {
if (Clazz.exceptionOf (eve, jsjavax.swing.tree.ExpandVetoException)) {
return;
} else {
throw eve;
}
}
this.expandedState.put (path, Boolean.FALSE);
this.fireTreeCollapsed (path);
if (this.removeDescendantSelectedPaths (path, false) && !this.isPathSelected (path)) {
this.addSelectionPath (path);
}}} else {
var cValue = this.expandedState.get (path);
if (cValue == null || !(cValue).booleanValue ()) {
try {
this.fireTreeWillExpand (path);
} catch (eve) {
if (Clazz.exceptionOf (eve, jsjavax.swing.tree.ExpandVetoException)) {
return;
} else {
throw eve;
}
}
this.expandedState.put (path, Boolean.TRUE);
this.fireTreeExpanded (path);
}}}}, "jsjavax.swing.tree.TreePath,~B");
Clazz.defineMethod (c$, "getDescendantToggledPaths", 
function (parent) {
if (parent == null) return null;
var descendants =  new java.util.Vector ();
var nodes = this.expandedState.keys ();
var path;
while (nodes.hasMoreElements ()) {
path = nodes.nextElement ();
if (parent.isDescendant (path)) descendants.addElement (path);
}
return descendants.elements ();
}, "jsjavax.swing.tree.TreePath");
Clazz.defineMethod (c$, "removeDescendantToggledPaths", 
function (toRemove) {
if (toRemove != null) {
while (toRemove.hasMoreElements ()) {
var descendants = this.getDescendantToggledPaths (toRemove.nextElement ());
if (descendants != null) {
while (descendants.hasMoreElements ()) {
this.expandedState.remove (descendants.nextElement ());
}
}}
}}, "java.util.Enumeration");
Clazz.defineMethod (c$, "clearToggledPaths", 
function () {
this.expandedState.clear ();
});
Clazz.defineMethod (c$, "createTreeModelListener", 
function () {
return Clazz.innerTypeInstance (jsjavax.swing.JTree.TreeModelHandler, this, null);
});
Clazz.defineMethod (c$, "removeDescendantSelectedPaths", 
function (path, includePath) {
var toRemove = this.getDescendantSelectedPaths (path, includePath);
if (toRemove != null) {
this.getSelectionModel ().removeSelectionPaths (toRemove);
return true;
}return false;
}, "jsjavax.swing.tree.TreePath,~B");
Clazz.defineMethod (c$, "getDescendantSelectedPaths", 
($fz = function (path, includePath) {
var sm = this.getSelectionModel ();
var selPaths = (sm != null) ? sm.getSelectionPaths () : null;
if (selPaths != null) {
var shouldRemove = false;
for (var counter = selPaths.length - 1; counter >= 0; counter--) {
if (selPaths[counter] != null && path.isDescendant (selPaths[counter]) && (!path.equals (selPaths[counter]) || includePath)) shouldRemove = true;
 else selPaths[counter] = null;
}
if (!shouldRemove) {
selPaths = null;
}return selPaths;
}return null;
}, $fz.isPrivate = true, $fz), "jsjavax.swing.tree.TreePath,~B");
Clazz.defineMethod (c$, "removeDescendantSelectedPaths", 
function (e) {
var pPath = e.getTreePath ();
var oldChildren = e.getChildren ();
var sm = this.getSelectionModel ();
if (sm != null && pPath != null && oldChildren != null && oldChildren.length > 0) {
for (var counter = oldChildren.length - 1; counter >= 0; counter--) {
this.removeDescendantSelectedPaths (pPath.pathByAddingChild (oldChildren[counter]), true);
}
}}, "jsjavax.swing.event.TreeModelEvent");
Clazz.defineMethod (c$, "setUIProperty", 
function (propertyName, value) {
if (propertyName === "rowHeight") {
if (!this.rowHeightSet) {
this.setRowHeight ((value).intValue ());
this.rowHeightSet = false;
}} else if (propertyName === "scrollsOnExpand") {
if (!this.scrollsOnExpandSet) {
this.setScrollsOnExpand ((value).booleanValue ());
this.scrollsOnExpandSet = false;
}} else if (propertyName === "showsRootHandles") {
if (!this.showsRootHandlesSet) {
this.setShowsRootHandles ((value).booleanValue ());
this.showsRootHandlesSet = false;
}} else {
Clazz.superCall (this, jsjavax.swing.JTree, "setUIProperty", [propertyName, value]);
}}, "~S,~O");
Clazz.defineMethod (c$, "paramString", 
function () {
var rootVisibleString = (this.rootVisible ? "true" : "false");
var showsRootHandlesString = (this.showsRootHandles ? "true" : "false");
var editableString = (this.editable ? "true" : "false");
var largeModelString = (this.largeModel ? "true" : "false");
var invokesStopCellEditingString = (this.invokesStopCellEditing ? "true" : "false");
var scrollsOnExpandString = (this.scrollsOnExpand ? "true" : "false");
return Clazz.superCall (this, jsjavax.swing.JTree, "paramString", []) + ",editable=" + editableString + ",invokesStopCellEditing=" + invokesStopCellEditingString + ",largeModel=" + largeModelString + ",rootVisible=" + rootVisibleString + ",rowHeight=" + this.rowHeight + ",scrollsOnExpand=" + scrollsOnExpandString + ",showsRootHandles=" + showsRootHandlesString + ",toggleClickCount=" + this.toggleClickCount + ",visibleRowCount=" + this.visibleRowCount;
});
c$.$JTree$TreeTimer$ = function () {
Clazz.pu$h ();
c$ = Clazz.decorateAsClass (function () {
Clazz.prepareCallback (this, arguments);
Clazz.instantialize (this, arguments);
}, jsjavax.swing.JTree, "TreeTimer", jsjavax.swing.Timer);
Clazz.makeConstructor (c$, 
function () {
Clazz.superConstructor (this, jsjavax.swing.JTree.TreeTimer, [2000, null]);
this.setRepeats (false);
});
Clazz.overrideMethod (c$, "fireActionPerformed", 
function (a) {
this.b$["jsjavax.swing.JTree"].expandRow (this.b$["jsjavax.swing.JTree"].$expandRow);
}, "jsjava.awt.event.ActionEvent");
c$ = Clazz.p0p ();
};
c$.$JTree$TreeSelectionRedirector$ = function () {
Clazz.pu$h ();
c$ = Clazz.decorateAsClass (function () {
Clazz.prepareCallback (this, arguments);
Clazz.instantialize (this, arguments);
}, jsjavax.swing.JTree, "TreeSelectionRedirector", null, jsjavax.swing.event.TreeSelectionListener);
Clazz.overrideMethod (c$, "valueChanged", 
function (a) {
var b;
b = a.cloneWithSource (this.b$["jsjavax.swing.JTree"]);
this.b$["jsjavax.swing.JTree"].fireValueChanged (b);
}, "jsjavax.swing.event.TreeSelectionEvent");
c$ = Clazz.p0p ();
};
c$.$JTree$TreeModelHandler$ = function () {
Clazz.pu$h ();
c$ = Clazz.decorateAsClass (function () {
Clazz.prepareCallback (this, arguments);
Clazz.instantialize (this, arguments);
}, jsjavax.swing.JTree, "TreeModelHandler", null, jsjavax.swing.event.TreeModelListener);
Clazz.overrideMethod (c$, "treeNodesChanged", 
function (a) {
}, "jsjavax.swing.event.TreeModelEvent");
Clazz.overrideMethod (c$, "treeNodesInserted", 
function (a) {
}, "jsjavax.swing.event.TreeModelEvent");
Clazz.overrideMethod (c$, "treeStructureChanged", 
function (a) {
if (a == null) return;
var b = a.getTreePath ();
if (b == null) return;
if (b.getPathCount () == 1) {
this.b$["jsjavax.swing.JTree"].clearToggledPaths ();
if (this.b$["jsjavax.swing.JTree"].treeModel.getRoot () != null && !this.b$["jsjavax.swing.JTree"].treeModel.isLeaf (this.b$["jsjavax.swing.JTree"].treeModel.getRoot ())) {
this.b$["jsjavax.swing.JTree"].expandedState.put (b, Boolean.TRUE);
}} else if (this.b$["jsjavax.swing.JTree"].expandedState.get (b) != null) {
var c =  new java.util.Vector (1);
var d = this.b$["jsjavax.swing.JTree"].isExpanded (b);
c.addElement (b);
this.b$["jsjavax.swing.JTree"].removeDescendantToggledPaths (c.elements ());
if (d) {
var e = this.b$["jsjavax.swing.JTree"].getModel ();
if (e == null || e.isLeaf (b.getLastPathComponent ())) this.b$["jsjavax.swing.JTree"].collapsePath (b);
 else this.b$["jsjavax.swing.JTree"].expandedState.put (b, Boolean.TRUE);
}}this.b$["jsjavax.swing.JTree"].removeDescendantSelectedPaths (b, false);
}, "jsjavax.swing.event.TreeModelEvent");
Clazz.overrideMethod (c$, "treeNodesRemoved", 
function (a) {
if (a == null) return;
var b = a.getTreePath ();
var c = a.getChildren ();
if (c == null) return;
var d;
var e =  new java.util.Vector (Math.max (1, c.length));
for (var f = c.length - 1; f >= 0; f--) {
d = b.pathByAddingChild (c[f]);
if (this.b$["jsjavax.swing.JTree"].expandedState.get (d) != null) e.addElement (d);
}
if (e.size () > 0) this.b$["jsjavax.swing.JTree"].removeDescendantToggledPaths (e.elements ());
var g = this.b$["jsjavax.swing.JTree"].getModel ();
if (g == null || g.isLeaf (b.getLastPathComponent ())) this.b$["jsjavax.swing.JTree"].expandedState.remove (b);
this.b$["jsjavax.swing.JTree"].removeDescendantSelectedPaths (a);
}, "jsjavax.swing.event.TreeModelEvent");
c$ = Clazz.p0p ();
};
Clazz.pu$h ();
c$ = Clazz.declareType (jsjavax.swing.JTree, "EmptySelectionModel", jsjavax.swing.tree.DefaultTreeSelectionModel);
c$.sharedInstance = Clazz.defineMethod (c$, "sharedInstance", 
function () {
return jsjavax.swing.JTree.EmptySelectionModel.$sharedInstance;
});
Clazz.overrideMethod (c$, "setSelectionPaths", 
function (a) {
}, "~A");
Clazz.overrideMethod (c$, "addSelectionPaths", 
function (a) {
}, "~A");
Clazz.overrideMethod (c$, "removeSelectionPaths", 
function (a) {
}, "~A");
c$.$sharedInstance = c$.prototype.$sharedInstance =  new jsjavax.swing.JTree.EmptySelectionModel ();
c$ = Clazz.p0p ();
Clazz.pu$h ();
c$ = Clazz.decorateAsClass (function () {
this.hasChildren = false;
this.childValue = null;
this.loadedChildren = false;
Clazz.instantialize (this, arguments);
}, jsjavax.swing.JTree, "DynamicUtilTreeNode", jsjavax.swing.tree.DefaultMutableTreeNode);
c$.createChildren = Clazz.defineMethod (c$, "createChildren", 
function (a, b) {
if (Clazz.instanceOf (b, java.util.Vector)) {
var c = b;
for (var d = 0, e = c.size (); d < e; d++) a.add ( new jsjavax.swing.JTree.DynamicUtilTreeNode (c.elementAt (d), c.elementAt (d)));

} else if (Clazz.instanceOf (b, java.util.Hashtable)) {
var c = b;
var d = c.keys ();
var e;
while (d.hasMoreElements ()) {
e = d.nextElement ();
a.add ( new jsjavax.swing.JTree.DynamicUtilTreeNode (e, c.get (e)));
}
} else if (Clazz.instanceOf (b, Array)) {
var c = b;
for (var d = 0, e = c.length; d < e; d++) a.add ( new jsjavax.swing.JTree.DynamicUtilTreeNode (c[d], c[d]));

}}, "jsjavax.swing.tree.DefaultMutableTreeNode,~O");
Clazz.makeConstructor (c$, 
function (a, b) {
Clazz.superConstructor (this, jsjavax.swing.JTree.DynamicUtilTreeNode, [a]);
this.loadedChildren = false;
this.childValue = b;
if (b != null) {
if (Clazz.instanceOf (b, java.util.Vector)) this.setAllowsChildren (true);
 else if (Clazz.instanceOf (b, java.util.Hashtable)) this.setAllowsChildren (true);
 else if (Clazz.instanceOf (b, Array)) this.setAllowsChildren (true);
 else this.setAllowsChildren (false);
} else this.setAllowsChildren (false);
}, "~O,~O");
Clazz.overrideMethod (c$, "isLeaf", 
function () {
return !this.getAllowsChildren ();
});
Clazz.defineMethod (c$, "getChildCount", 
function () {
if (!this.loadedChildren) this.loadChildren ();
return Clazz.superCall (this, jsjavax.swing.JTree.DynamicUtilTreeNode, "getChildCount", []);
});
Clazz.defineMethod (c$, "loadChildren", 
function () {
this.loadedChildren = true;
jsjavax.swing.JTree.DynamicUtilTreeNode.createChildren (this, this.childValue);
});
Clazz.defineMethod (c$, "getChildAt", 
function (a) {
if (!this.loadedChildren) this.loadChildren ();
return Clazz.superCall (this, jsjavax.swing.JTree.DynamicUtilTreeNode, "getChildAt", [a]);
}, "~N");
Clazz.defineMethod (c$, "children", 
function () {
if (!this.loadedChildren) this.loadChildren ();
return Clazz.superCall (this, jsjavax.swing.JTree.DynamicUtilTreeNode, "children", []);
});
c$ = Clazz.p0p ();
Clazz.defineStatics (c$,
"$uiClassID", "TreeUI",
"TEMP_STACK_SIZE", 11,
"CELL_RENDERER_PROPERTY", "cellRenderer",
"TREE_MODEL_PROPERTY", "model",
"ROOT_VISIBLE_PROPERTY", "rootVisible",
"SHOWS_ROOT_HANDLES_PROPERTY", "showsRootHandles",
"ROW_HEIGHT_PROPERTY", "rowHeight",
"CELL_EDITOR_PROPERTY", "cellEditor",
"EDITABLE_PROPERTY", "editable",
"LARGE_MODEL_PROPERTY", "largeModel",
"SELECTION_MODEL_PROPERTY", "selectionModel",
"VISIBLE_ROW_COUNT_PROPERTY", "visibleRowCount",
"INVOKES_STOP_CELL_EDITING_PROPERTY", "invokesStopCellEditing",
"SCROLLS_ON_EXPAND_PROPERTY", "scrollsOnExpand",
"TOGGLE_CLICK_COUNT_PROPERTY", "toggleClickCount",
"LEAD_SELECTION_PATH_PROPERTY", "leadSelectionPath",
"ANCHOR_SELECTION_PATH_PROPERTY", "anchorSelectionPath",
"EXPANDS_SELECTED_PATHS_PROPERTY", "expandsSelectedPaths");
});

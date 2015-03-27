Clazz.declarePackage ("jsjavax.swing.tree");
Clazz.load (["jsjava.awt.Container", "jsjava.awt.event.ActionListener", "jsjavax.swing.JTextField", "jsjavax.swing.event.TreeSelectionListener", "jsjavax.swing.tree.TreeCellEditor"], "jsjavax.swing.tree.DefaultTreeCellEditor", ["jsjava.awt.Dimension", "jsjava.awt.event.MouseEvent", "jsjavax.swing.DefaultCellEditor", "$.JTree", "$.SwingUtilities", "$.Timer", "$.UIManager", "jsjavax.swing.plaf.FontUIResource"], function () {
c$ = Clazz.decorateAsClass (function () {
this.realEditor = null;
this.renderer = null;
this.editingContainer = null;
this.editingComponent = null;
this.canEdit = false;
this.offset = 0;
this.tree = null;
this.lastPath = null;
this.timer = null;
this.lastRow = 0;
this.borderSelectionColor = null;
this.editingIcon = null;
this.font = null;
if (!Clazz.isClassDefined ("jsjavax.swing.tree.DefaultTreeCellEditor.DefaultTextField")) {
jsjavax.swing.tree.DefaultTreeCellEditor.$DefaultTreeCellEditor$DefaultTextField$ ();
}
if (!Clazz.isClassDefined ("jsjavax.swing.tree.DefaultTreeCellEditor.EditorContainer")) {
jsjavax.swing.tree.DefaultTreeCellEditor.$DefaultTreeCellEditor$EditorContainer$ ();
}
Clazz.instantialize (this, arguments);
}, jsjavax.swing.tree, "DefaultTreeCellEditor", null, [jsjava.awt.event.ActionListener, jsjavax.swing.tree.TreeCellEditor, jsjavax.swing.event.TreeSelectionListener]);
Clazz.makeConstructor (c$, 
function (tree, renderer) {
this.construct (tree, renderer, null);
}, "jsjavax.swing.JTree,jsjavax.swing.tree.DefaultTreeCellRenderer");
Clazz.makeConstructor (c$, 
function (tree, renderer, editor) {
this.renderer = renderer;
this.realEditor = editor;
if (this.realEditor == null) this.realEditor = this.createTreeCellEditor ();
this.editingContainer = this.createContainer ();
this.setTree (tree);
this.setBorderSelectionColor (jsjavax.swing.UIManager.getColor ("Tree.editorBorderSelectionColor"));
}, "jsjavax.swing.JTree,jsjavax.swing.tree.DefaultTreeCellRenderer,jsjavax.swing.tree.TreeCellEditor");
Clazz.defineMethod (c$, "setBorderSelectionColor", 
function (newColor) {
this.borderSelectionColor = newColor;
}, "jsjava.awt.Color");
Clazz.defineMethod (c$, "getBorderSelectionColor", 
function () {
return this.borderSelectionColor;
});
Clazz.defineMethod (c$, "setFont", 
function (font) {
this.font = font;
}, "jsjava.awt.Font");
Clazz.defineMethod (c$, "getFont", 
function () {
return this.font;
});
Clazz.defineMethod (c$, "getTreeCellEditorComponent", 
function (tree, value, isSelected, expanded, leaf, row) {
this.setTree (tree);
this.lastRow = row;
this.determineOffset (tree, value, isSelected, expanded, leaf, row);
if (this.editingComponent != null) {
this.editingContainer.remove (this.editingComponent);
}this.editingComponent = this.realEditor.getTreeCellEditorComponent (tree, value, isSelected, expanded, leaf, row);
var newPath = tree.getPathForRow (row);
this.canEdit = (this.lastPath != null && newPath != null && this.lastPath.equals (newPath));
var font = this.getFont ();
if (font == null) {
if (this.renderer != null) font = this.renderer.getFont ();
if (font == null) font = tree.getFont ();
}this.editingContainer.setFont (font);
this.prepareForEditing ();
return this.editingContainer;
}, "jsjavax.swing.JTree,~O,~B,~B,~B,~N");
Clazz.defineMethod (c$, "getCellEditorValue", 
function () {
return this.realEditor.getCellEditorValue ();
});
Clazz.defineMethod (c$, "isCellEditable", 
function (event) {
var retValue = false;
var editable = false;
if (event != null) {
if (Clazz.instanceOf (event.getSource (), jsjavax.swing.JTree)) {
this.setTree (event.getSource ());
if (Clazz.instanceOf (event, jsjava.awt.event.MouseEvent)) {
var path = this.tree.getPathForLocation ((event).getX (), (event).getY ());
editable = (this.lastPath != null && path != null && this.lastPath.equals (path));
if (path != null) {
this.lastRow = this.tree.getRowForPath (path);
var value = path.getLastPathComponent ();
var isSelected = this.tree.isRowSelected (this.lastRow);
var expanded = this.tree.isExpanded (path);
var treeModel = this.tree.getModel ();
var leaf = treeModel.isLeaf (value);
this.determineOffset (this.tree, value, isSelected, expanded, leaf, this.lastRow);
}}}}if (!this.realEditor.isCellEditable (event)) return false;
if (this.canEditImmediately (event)) retValue = true;
 else if (editable && this.shouldStartEditingTimer (event)) {
this.startEditingTimer ();
} else if (this.timer != null && this.timer.isRunning ()) this.timer.stop ();
if (retValue) this.prepareForEditing ();
return retValue;
}, "java.util.EventObject");
Clazz.defineMethod (c$, "shouldSelectCell", 
function (event) {
return this.realEditor.shouldSelectCell (event);
}, "java.util.EventObject");
Clazz.defineMethod (c$, "stopCellEditing", 
function () {
if (this.realEditor.stopCellEditing ()) {
this.cleanupAfterEditing ();
return true;
}return false;
});
Clazz.defineMethod (c$, "cancelCellEditing", 
function () {
this.realEditor.cancelCellEditing ();
this.cleanupAfterEditing ();
});
Clazz.defineMethod (c$, "addCellEditorListener", 
function (l) {
this.realEditor.addCellEditorListener (l);
}, "jsjavax.swing.event.CellEditorListener");
Clazz.defineMethod (c$, "removeCellEditorListener", 
function (l) {
this.realEditor.removeCellEditorListener (l);
}, "jsjavax.swing.event.CellEditorListener");
Clazz.defineMethod (c$, "getCellEditorListeners", 
function () {
return (this.realEditor).getCellEditorListeners ();
});
Clazz.overrideMethod (c$, "valueChanged", 
function (e) {
if (this.tree != null) {
if (this.tree.getSelectionCount () == 1) this.lastPath = this.tree.getSelectionPath ();
 else this.lastPath = null;
}if (this.timer != null) {
this.timer.stop ();
}}, "jsjavax.swing.event.TreeSelectionEvent");
Clazz.overrideMethod (c$, "actionPerformed", 
function (e) {
if (this.tree != null && this.lastPath != null) {
this.tree.startEditingAtPath (this.lastPath);
}}, "jsjava.awt.event.ActionEvent");
Clazz.defineMethod (c$, "setTree", 
function (newTree) {
if (this.tree !== newTree) {
if (this.tree != null) this.tree.removeTreeSelectionListener (this);
this.tree = newTree;
if (this.tree != null) this.tree.addTreeSelectionListener (this);
if (this.timer != null) {
this.timer.stop ();
}}}, "jsjavax.swing.JTree");
Clazz.defineMethod (c$, "shouldStartEditingTimer", 
function (event) {
if ((Clazz.instanceOf (event, jsjava.awt.event.MouseEvent)) && jsjavax.swing.SwingUtilities.isLeftMouseButton (event)) {
var me = event;
return (me.getClickCount () == 1 && this.inHitRegion (me.getX (), me.getY ()));
}return false;
}, "java.util.EventObject");
Clazz.defineMethod (c$, "startEditingTimer", 
function () {
if (this.timer == null) {
this.timer =  new jsjavax.swing.Timer (1200, this);
this.timer.setRepeats (false);
}this.timer.start ();
});
Clazz.defineMethod (c$, "canEditImmediately", 
function (event) {
if ((Clazz.instanceOf (event, jsjava.awt.event.MouseEvent)) && jsjavax.swing.SwingUtilities.isLeftMouseButton (event)) {
var me = event;
return ((me.getClickCount () > 2) && this.inHitRegion (me.getX (), me.getY ()));
}return (event == null);
}, "java.util.EventObject");
Clazz.defineMethod (c$, "inHitRegion", 
function (x, y) {
if (this.lastRow != -1 && this.tree != null) {
var bounds = this.tree.getRowBounds (this.lastRow);
var treeOrientation = this.tree.getComponentOrientation ();
if (treeOrientation.isLeftToRight ()) {
if (bounds != null && x <= (bounds.x + this.offset) && this.offset < (bounds.width - 5)) {
return false;
}} else if (bounds != null && (x >= (bounds.x + bounds.width - this.offset + 5) || x <= (bounds.x + 5)) && this.offset < (bounds.width - 5)) {
return false;
}}return true;
}, "~N,~N");
Clazz.defineMethod (c$, "determineOffset", 
function (tree, value, isSelected, expanded, leaf, row) {
if (this.renderer != null) {
if (leaf) this.editingIcon = this.renderer.getLeafIcon ();
 else if (expanded) this.editingIcon = this.renderer.getOpenIcon ();
 else this.editingIcon = this.renderer.getClosedIcon ();
if (this.editingIcon != null) this.offset = this.renderer.getIconTextGap () + this.editingIcon.getIconWidth ();
 else this.offset = this.renderer.getIconTextGap ();
} else {
this.editingIcon = null;
this.offset = 0;
}}, "jsjavax.swing.JTree,~O,~B,~B,~B,~N");
Clazz.defineMethod (c$, "prepareForEditing", 
function () {
if (this.editingComponent != null) {
this.editingContainer.add (this.editingComponent);
}});
Clazz.defineMethod (c$, "createContainer", 
function () {
return Clazz.innerTypeInstance (jsjavax.swing.tree.DefaultTreeCellEditor.EditorContainer, this, null);
});
Clazz.defineMethod (c$, "createTreeCellEditor", 
function () {
var aBorder = jsjavax.swing.UIManager.getBorder ("Tree.editorBorder");
var editor = ((Clazz.isClassDefined ("jsjavax.swing.tree.DefaultTreeCellEditor$1") ? 0 : jsjavax.swing.tree.DefaultTreeCellEditor.$DefaultTreeCellEditor$1$ ()), Clazz.innerTypeInstance (jsjavax.swing.tree.DefaultTreeCellEditor$1, this, null, Clazz.innerTypeInstance (jsjavax.swing.tree.DefaultTreeCellEditor.DefaultTextField, this, null, aBorder)));
editor.setClickCountToStart (1);
return editor;
});
Clazz.defineMethod (c$, "cleanupAfterEditing", 
($fz = function () {
if (this.editingComponent != null) {
this.editingContainer.remove (this.editingComponent);
}this.editingComponent = null;
}, $fz.isPrivate = true, $fz));
c$.$DefaultTreeCellEditor$DefaultTextField$ = function () {
Clazz.pu$h ();
c$ = Clazz.decorateAsClass (function () {
Clazz.prepareCallback (this, arguments);
this.$border = null;
Clazz.instantialize (this, arguments);
}, jsjavax.swing.tree.DefaultTreeCellEditor, "DefaultTextField", jsjavax.swing.JTextField);
Clazz.makeConstructor (c$, 
function (a) {
Clazz.superConstructor (this, jsjavax.swing.tree.DefaultTreeCellEditor.DefaultTextField, []);
this.setBorder (a);
}, "jsjavax.swing.border.Border");
Clazz.defineMethod (c$, "setBorder", 
function (a) {
Clazz.superCall (this, jsjavax.swing.tree.DefaultTreeCellEditor.DefaultTextField, "setBorder", [a]);
this.$border = a;
}, "jsjavax.swing.border.Border");
Clazz.overrideMethod (c$, "getBorder", 
function () {
return this.$border;
});
Clazz.defineMethod (c$, "getFont", 
function () {
var a = Clazz.superCall (this, jsjavax.swing.tree.DefaultTreeCellEditor.DefaultTextField, "getFont", []);
if (Clazz.instanceOf (a, jsjavax.swing.plaf.FontUIResource)) {
var b = this.getParent ();
if (b != null && b.getFont () != null) a = b.getFont ();
}return a;
});
Clazz.defineMethod (c$, "getPreferredSize", 
function () {
var a = Clazz.superCall (this, jsjavax.swing.tree.DefaultTreeCellEditor.DefaultTextField, "getPreferredSize", []);
if (this.b$["jsjavax.swing.tree.DefaultTreeCellEditor"].renderer != null && this.b$["jsjavax.swing.tree.DefaultTreeCellEditor"].getFont () == null) {
var b = this.b$["jsjavax.swing.tree.DefaultTreeCellEditor"].renderer.getPreferredSize ();
a.height = b.height;
}return a;
});
c$ = Clazz.p0p ();
};
c$.$DefaultTreeCellEditor$EditorContainer$ = function () {
Clazz.pu$h ();
c$ = Clazz.decorateAsClass (function () {
Clazz.prepareCallback (this, arguments);
Clazz.instantialize (this, arguments);
}, jsjavax.swing.tree.DefaultTreeCellEditor, "EditorContainer", jsjava.awt.Container);
Clazz.makeConstructor (c$, 
function () {
Clazz.superConstructor (this, jsjavax.swing.tree.DefaultTreeCellEditor.EditorContainer, []);
this.setLayout (null);
});
Clazz.defineMethod (c$, "paint", 
function (a) {
var b = this.getWidth ();
var c = this.getHeight ();
if (this.b$["jsjavax.swing.tree.DefaultTreeCellEditor"].editingIcon != null) {
var d = this.calculateIconY (this.b$["jsjavax.swing.tree.DefaultTreeCellEditor"].editingIcon);
if (this.getComponentOrientation ().isLeftToRight ()) {
this.b$["jsjavax.swing.tree.DefaultTreeCellEditor"].editingIcon.paintIcon (this, a, 0, d);
} else {
this.b$["jsjavax.swing.tree.DefaultTreeCellEditor"].editingIcon.paintIcon (this, a, b - this.b$["jsjavax.swing.tree.DefaultTreeCellEditor"].editingIcon.getIconWidth (), d);
}}var d = this.b$["jsjavax.swing.tree.DefaultTreeCellEditor"].getBorderSelectionColor ();
if (d != null) {
a.setColor (d);
a.drawRect (0, 0, b - 1, c - 1);
}Clazz.superCall (this, jsjavax.swing.tree.DefaultTreeCellEditor.EditorContainer, "paint", [a]);
}, "jsjava.awt.Graphics");
Clazz.overrideMethod (c$, "doLayout", 
function () {
if (this.b$["jsjavax.swing.tree.DefaultTreeCellEditor"].editingComponent != null) {
var a = this.getWidth ();
var b = this.getHeight ();
if (this.getComponentOrientation ().isLeftToRight ()) {
this.b$["jsjavax.swing.tree.DefaultTreeCellEditor"].editingComponent.setBounds (this.b$["jsjavax.swing.tree.DefaultTreeCellEditor"].offset, 0, a - this.b$["jsjavax.swing.tree.DefaultTreeCellEditor"].offset, b);
} else {
this.b$["jsjavax.swing.tree.DefaultTreeCellEditor"].editingComponent.setBounds (0, 0, a - this.b$["jsjavax.swing.tree.DefaultTreeCellEditor"].offset, b);
}}});
Clazz.defineMethod (c$, "calculateIconY", 
($fz = function (a) {
var b = a.getIconHeight ();
var c = this.b$["jsjavax.swing.tree.DefaultTreeCellEditor"].editingComponent.getFontMetrics (this.b$["jsjavax.swing.tree.DefaultTreeCellEditor"].editingComponent.getFont ()).getHeight ();
var d = Clazz.doubleToInt (b / 2) - Clazz.doubleToInt (c / 2);
var e = Math.min (0, d);
var f = Math.max (b, d + c) - e;
return Clazz.doubleToInt (this.getHeight () / 2) - (e + (Clazz.doubleToInt (f / 2)));
}, $fz.isPrivate = true, $fz), "jsjavax.swing.Icon");
Clazz.overrideMethod (c$, "getPreferredSize", 
function () {
if (this.b$["jsjavax.swing.tree.DefaultTreeCellEditor"].editingComponent != null) {
var a = this.b$["jsjavax.swing.tree.DefaultTreeCellEditor"].editingComponent.getPreferredSize ();
a.width += this.b$["jsjavax.swing.tree.DefaultTreeCellEditor"].offset + 5;
var b = (this.b$["jsjavax.swing.tree.DefaultTreeCellEditor"].renderer != null) ? this.b$["jsjavax.swing.tree.DefaultTreeCellEditor"].renderer.getPreferredSize () : null;
if (b != null) a.height = Math.max (a.height, b.height);
if (this.b$["jsjavax.swing.tree.DefaultTreeCellEditor"].editingIcon != null) a.height = Math.max (a.height, this.b$["jsjavax.swing.tree.DefaultTreeCellEditor"].editingIcon.getIconHeight ());
a.width = Math.max (a.width, 100);
return a;
}return  new jsjava.awt.Dimension (0, 0);
});
c$ = Clazz.p0p ();
};
c$.$DefaultTreeCellEditor$1$ = function () {
Clazz.pu$h ();
c$ = Clazz.declareAnonymous (jsjavax.swing.tree, "DefaultTreeCellEditor$1", jsjavax.swing.DefaultCellEditor);
Clazz.defineMethod (c$, "shouldSelectCell", 
function (event) {
var retValue = Clazz.superCall (this, jsjavax.swing.tree.DefaultTreeCellEditor$1, "shouldSelectCell", [event]);
return retValue;
}, "java.util.EventObject");
c$ = Clazz.p0p ();
};
});

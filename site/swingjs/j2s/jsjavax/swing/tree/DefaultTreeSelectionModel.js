Clazz.declarePackage ("jsjavax.swing.tree");
Clazz.load (["jsjavax.swing.tree.TreeSelectionModel", "jsjavax.swing.event.EventListenerList"], ["jsjavax.swing.tree.PathPlaceHolder", "$.DefaultTreeSelectionModel"], ["java.lang.Boolean", "$.StringBuffer", "java.util.BitSet", "$.Hashtable", "$.Vector", "jsjavax.swing.DefaultListSelectionModel", "jsjavax.swing.event.SwingPropertyChangeSupport", "$.TreeSelectionEvent", "$.TreeSelectionListener"], function () {
c$ = Clazz.decorateAsClass (function () {
this.changeSupport = null;
this.selection = null;
this.listenerList = null;
this.rowMapper = null;
this.listSelectionModel = null;
this.selectionMode = 0;
this.leadPath = null;
this.leadIndex = 0;
this.leadRow = 0;
this.uniquePaths = null;
this.lastPaths = null;
this.tempPaths = null;
Clazz.instantialize (this, arguments);
}, jsjavax.swing.tree, "DefaultTreeSelectionModel", null, [Cloneable, jsjavax.swing.tree.TreeSelectionModel]);
Clazz.prepareFields (c$, function () {
this.listenerList =  new jsjavax.swing.event.EventListenerList ();
});
Clazz.makeConstructor (c$, 
function () {
this.listSelectionModel =  new jsjavax.swing.DefaultListSelectionModel ();
this.selectionMode = 4;
this.leadIndex = this.leadRow = -1;
this.uniquePaths =  new java.util.Hashtable ();
this.lastPaths =  new java.util.Hashtable ();
this.tempPaths =  new Array (1);
});
Clazz.overrideMethod (c$, "setRowMapper", 
function (newMapper) {
this.rowMapper = newMapper;
this.resetRowSelection ();
}, "jsjavax.swing.tree.RowMapper");
Clazz.overrideMethod (c$, "getRowMapper", 
function () {
return this.rowMapper;
});
Clazz.overrideMethod (c$, "setSelectionMode", 
function (mode) {
var oldMode = this.selectionMode;
this.selectionMode = mode;
if (this.selectionMode != 1 && this.selectionMode != 2 && this.selectionMode != 4) this.selectionMode = 4;
if (oldMode != this.selectionMode && this.changeSupport != null) this.changeSupport.firePropertyChange ("selectionMode",  new Integer (oldMode),  new Integer (this.selectionMode));
}, "~N");
Clazz.overrideMethod (c$, "getSelectionMode", 
function () {
return this.selectionMode;
});
Clazz.overrideMethod (c$, "setSelectionPath", 
function (path) {
if (path == null) this.setSelectionPaths (null);
 else {
var newPaths =  new Array (1);
newPaths[0] = path;
this.setSelectionPaths (newPaths);
}}, "jsjavax.swing.tree.TreePath");
Clazz.overrideMethod (c$, "setSelectionPaths", 
function (pPaths) {
var newCount;
var newCounter;
var oldCount;
var oldCounter;
var paths = pPaths;
if (paths == null) newCount = 0;
 else newCount = paths.length;
if (this.selection == null) oldCount = 0;
 else oldCount = this.selection.length;
if ((newCount + oldCount) != 0) {
if (this.selectionMode == 1) {
if (newCount > 1) {
paths =  new Array (1);
paths[0] = pPaths[0];
newCount = 1;
}} else if (this.selectionMode == 2) {
if (newCount > 0 && !this.arePathsContiguous (paths)) {
paths =  new Array (1);
paths[0] = pPaths[0];
newCount = 1;
}}var validCount = 0;
var beginLeadPath = this.leadPath;
var cPaths =  new java.util.Vector (newCount + oldCount);
this.lastPaths.clear ();
this.leadPath = null;
for (newCounter = 0; newCounter < newCount; newCounter++) {
if (paths[newCounter] != null && this.lastPaths.get (paths[newCounter]) == null) {
validCount++;
this.lastPaths.put (paths[newCounter], Boolean.TRUE);
if (this.uniquePaths.get (paths[newCounter]) == null) {
cPaths.addElement ( new jsjavax.swing.tree.PathPlaceHolder (paths[newCounter], true));
}this.leadPath = paths[newCounter];
}}
var newSelection;
if (validCount == 0) {
newSelection = null;
} else if (validCount != newCount) {
var keys = this.lastPaths.keys ();
newSelection =  new Array (validCount);
validCount = 0;
while (keys.hasMoreElements ()) {
newSelection[validCount++] = keys.nextElement ();
}
} else {
newSelection =  new Array (paths.length);
System.arraycopy (paths, 0, newSelection, 0, paths.length);
}for (oldCounter = 0; oldCounter < oldCount; oldCounter++) if (this.selection[oldCounter] != null && this.lastPaths.get (this.selection[oldCounter]) == null) cPaths.addElement ( new jsjavax.swing.tree.PathPlaceHolder (this.selection[oldCounter], false));

this.selection = newSelection;
var tempHT = this.uniquePaths;
this.uniquePaths = this.lastPaths;
this.lastPaths = tempHT;
this.lastPaths.clear ();
if (this.selection != null) this.insureUniqueness ();
this.updateLeadIndex ();
this.resetRowSelection ();
if (cPaths.size () > 0) this.notifyPathChange (cPaths, beginLeadPath);
}}, "~A");
Clazz.overrideMethod (c$, "addSelectionPath", 
function (path) {
if (path != null) {
var toAdd =  new Array (1);
toAdd[0] = path;
this.addSelectionPaths (toAdd);
}}, "jsjavax.swing.tree.TreePath");
Clazz.overrideMethod (c$, "addSelectionPaths", 
function (paths) {
var newPathLength = ((paths == null) ? 0 : paths.length);
if (newPathLength > 0) {
if (this.selectionMode == 1) {
this.setSelectionPaths (paths);
} else if (this.selectionMode == 2 && !this.canPathsBeAdded (paths)) {
if (this.arePathsContiguous (paths)) {
this.setSelectionPaths (paths);
} else {
var newPaths =  new Array (1);
newPaths[0] = paths[0];
this.setSelectionPaths (newPaths);
}} else {
var counter;
var validCount;
var oldCount;
var beginLeadPath = this.leadPath;
var cPaths = null;
if (this.selection == null) oldCount = 0;
 else oldCount = this.selection.length;
this.lastPaths.clear ();
for (counter = 0, validCount = 0; counter < newPathLength; counter++) {
if (paths[counter] != null) {
if (this.uniquePaths.get (paths[counter]) == null) {
validCount++;
if (cPaths == null) cPaths =  new java.util.Vector ();
cPaths.addElement ( new jsjavax.swing.tree.PathPlaceHolder (paths[counter], true));
this.uniquePaths.put (paths[counter], Boolean.TRUE);
this.lastPaths.put (paths[counter], Boolean.TRUE);
}this.leadPath = paths[counter];
}}
if (this.leadPath == null) {
this.leadPath = beginLeadPath;
}if (validCount > 0) {
var newSelection =  new Array (oldCount + validCount);
if (oldCount > 0) System.arraycopy (this.selection, 0, newSelection, 0, oldCount);
if (validCount != paths.length) {
var newPaths = this.lastPaths.keys ();
counter = oldCount;
while (newPaths.hasMoreElements ()) {
newSelection[counter++] = newPaths.nextElement ();
}
} else {
System.arraycopy (paths, 0, newSelection, oldCount, validCount);
}this.selection = newSelection;
this.insureUniqueness ();
this.updateLeadIndex ();
this.resetRowSelection ();
this.notifyPathChange (cPaths, beginLeadPath);
} else this.leadPath = beginLeadPath;
this.lastPaths.clear ();
}}}, "~A");
Clazz.overrideMethod (c$, "removeSelectionPath", 
function (path) {
if (path != null) {
var rPath =  new Array (1);
rPath[0] = path;
this.removeSelectionPaths (rPath);
}}, "jsjavax.swing.tree.TreePath");
Clazz.overrideMethod (c$, "removeSelectionPaths", 
function (paths) {
if (paths != null && this.selection != null && paths.length > 0) {
if (!this.canPathsBeRemoved (paths)) {
this.clearSelection ();
} else {
var pathsToRemove = null;
for (var removeCounter = paths.length - 1; removeCounter >= 0; removeCounter--) {
if (paths[removeCounter] != null) {
if (this.uniquePaths.get (paths[removeCounter]) != null) {
if (pathsToRemove == null) pathsToRemove =  new java.util.Vector (paths.length);
this.uniquePaths.remove (paths[removeCounter]);
pathsToRemove.addElement ( new jsjavax.swing.tree.PathPlaceHolder (paths[removeCounter], false));
}}}
if (pathsToRemove != null) {
var removeCount = pathsToRemove.size ();
var beginLeadPath = this.leadPath;
if (removeCount == this.selection.length) {
this.selection = null;
} else {
var pEnum = this.uniquePaths.keys ();
var validCount = 0;
this.selection =  new Array (this.selection.length - removeCount);
while (pEnum.hasMoreElements ()) {
this.selection[validCount++] = pEnum.nextElement ();
}
}if (this.leadPath != null && this.uniquePaths.get (this.leadPath) == null) {
if (this.selection != null) {
this.leadPath = this.selection[this.selection.length - 1];
} else {
this.leadPath = null;
}} else if (this.selection != null) {
this.leadPath = this.selection[this.selection.length - 1];
} else {
this.leadPath = null;
}this.updateLeadIndex ();
this.resetRowSelection ();
this.notifyPathChange (pathsToRemove, beginLeadPath);
}}}}, "~A");
Clazz.overrideMethod (c$, "getSelectionPath", 
function () {
if (this.selection != null) return this.selection[0];
return null;
});
Clazz.overrideMethod (c$, "getSelectionPaths", 
function () {
if (this.selection != null) {
var pathSize = this.selection.length;
var result =  new Array (pathSize);
System.arraycopy (this.selection, 0, result, 0, pathSize);
return result;
}return null;
});
Clazz.overrideMethod (c$, "getSelectionCount", 
function () {
return (this.selection == null) ? 0 : this.selection.length;
});
Clazz.overrideMethod (c$, "isPathSelected", 
function (path) {
return (path != null) ? (this.uniquePaths.get (path) != null) : false;
}, "jsjavax.swing.tree.TreePath");
Clazz.overrideMethod (c$, "isSelectionEmpty", 
function () {
return (this.selection == null);
});
Clazz.overrideMethod (c$, "clearSelection", 
function () {
if (this.selection != null) {
var selSize = this.selection.length;
var newness =  Clazz.newBooleanArray (selSize, false);
for (var counter = 0; counter < selSize; counter++) newness[counter] = false;

var event =  new jsjavax.swing.event.TreeSelectionEvent (this, this.selection, newness, this.leadPath, null);
this.leadPath = null;
this.leadIndex = this.leadRow = -1;
this.uniquePaths.clear ();
this.selection = null;
this.resetRowSelection ();
this.fireValueChanged (event);
}});
Clazz.overrideMethod (c$, "addTreeSelectionListener", 
function (x) {
this.listenerList.add (jsjavax.swing.event.TreeSelectionListener, x);
}, "jsjavax.swing.event.TreeSelectionListener");
Clazz.overrideMethod (c$, "removeTreeSelectionListener", 
function (x) {
this.listenerList.remove (jsjavax.swing.event.TreeSelectionListener, x);
}, "jsjavax.swing.event.TreeSelectionListener");
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
Clazz.defineMethod (c$, "getListeners", 
function (listenerType) {
return this.listenerList.getListeners (listenerType);
}, "Class");
Clazz.overrideMethod (c$, "getSelectionRows", 
function () {
if (this.rowMapper != null && this.selection != null) {
var rows = this.rowMapper.getRowsForPaths (this.selection);
if (rows != null) {
var invisCount = 0;
for (var counter = rows.length - 1; counter >= 0; counter--) {
if (rows[counter] == -1) {
invisCount++;
}}
if (invisCount > 0) {
if (invisCount == rows.length) {
rows = null;
} else {
var tempRows =  Clazz.newIntArray (rows.length - invisCount, 0);
for (var counter = rows.length - 1, visCounter = 0; counter >= 0; counter--) {
if (rows[counter] != -1) {
tempRows[visCounter++] = rows[counter];
}}
rows = tempRows;
}}}return rows;
}return null;
});
Clazz.overrideMethod (c$, "getMinSelectionRow", 
function () {
return this.listSelectionModel.getMinSelectionIndex ();
});
Clazz.overrideMethod (c$, "getMaxSelectionRow", 
function () {
return this.listSelectionModel.getMaxSelectionIndex ();
});
Clazz.overrideMethod (c$, "isRowSelected", 
function (row) {
return this.listSelectionModel.isSelectedIndex (row);
}, "~N");
Clazz.overrideMethod (c$, "resetRowSelection", 
function () {
this.listSelectionModel.clearSelection ();
if (this.selection != null && this.rowMapper != null) {
var aRow;
var validCount = 0;
var rows = this.rowMapper.getRowsForPaths (this.selection);
for (var counter = 0, maxCounter = this.selection.length; counter < maxCounter; counter++) {
aRow = rows[counter];
if (aRow != -1) {
this.listSelectionModel.addSelectionInterval (aRow, aRow);
}}
if (this.leadIndex != -1 && rows != null) {
this.leadRow = rows[this.leadIndex];
} else if (this.leadPath != null) {
this.tempPaths[0] = this.leadPath;
rows = this.rowMapper.getRowsForPaths (this.tempPaths);
this.leadRow = (rows != null) ? rows[0] : -1;
} else {
this.leadRow = -1;
}this.insureRowContinuity ();
} else this.leadRow = -1;
});
Clazz.overrideMethod (c$, "getLeadSelectionRow", 
function () {
return this.leadRow;
});
Clazz.overrideMethod (c$, "getLeadSelectionPath", 
function () {
return this.leadPath;
});
Clazz.overrideMethod (c$, "addPropertyChangeListener", 
function (listener) {
if (this.changeSupport == null) {
this.changeSupport =  new jsjavax.swing.event.SwingPropertyChangeSupport (this);
}this.changeSupport.addPropertyChangeListener (listener);
}, "jsjava.beans.PropertyChangeListener");
Clazz.overrideMethod (c$, "removePropertyChangeListener", 
function (listener) {
if (this.changeSupport == null) {
return;
}this.changeSupport.removePropertyChangeListener (listener);
}, "jsjava.beans.PropertyChangeListener");
Clazz.defineMethod (c$, "getPropertyChangeListeners", 
function () {
if (this.changeSupport == null) {
return  new Array (0);
}return this.changeSupport.getPropertyChangeListeners ();
});
Clazz.defineMethod (c$, "insureRowContinuity", 
function () {
if (this.selectionMode == 2 && this.selection != null && this.rowMapper != null) {
var lModel = this.listSelectionModel;
var min = lModel.getMinSelectionIndex ();
if (min != -1) {
for (var counter = min, maxCounter = lModel.getMaxSelectionIndex (); counter <= maxCounter; counter++) {
if (!lModel.isSelectedIndex (counter)) {
if (counter == min) {
this.clearSelection ();
} else {
var newSel =  new Array (counter - min);
var selectionIndex = this.rowMapper.getRowsForPaths (this.selection);
for (var i = 0; i < selectionIndex.length; i++) {
if (selectionIndex[i] < counter) {
newSel[selectionIndex[i] - min] = this.selection[i];
}}
this.setSelectionPaths (newSel);
break;
}}}
}} else if (this.selectionMode == 1 && this.selection != null && this.selection.length > 1) {
this.setSelectionPath (this.selection[0]);
}});
Clazz.defineMethod (c$, "arePathsContiguous", 
function (paths) {
if (this.rowMapper == null || paths.length < 2) return true;
 else {
var bitSet =  new java.util.BitSet (32);
var anIndex;
var counter;
var min;
var pathCount = paths.length;
var validCount = 0;
var tempPath =  new Array (1);
tempPath[0] = paths[0];
min = this.rowMapper.getRowsForPaths (tempPath)[0];
for (counter = 0; counter < pathCount; counter++) {
if (paths[counter] != null) {
tempPath[0] = paths[counter];
var rows = this.rowMapper.getRowsForPaths (tempPath);
if (rows == null) {
return false;
}anIndex = rows[0];
if (anIndex == -1 || anIndex < (min - pathCount) || anIndex > (min + pathCount)) return false;
if (anIndex < min) min = anIndex;
if (!bitSet.get (anIndex)) {
bitSet.set (anIndex);
validCount++;
}}}
var maxCounter = validCount + min;
for (counter = min; counter < maxCounter; counter++) if (!bitSet.get (counter)) return false;

}return true;
}, "~A");
Clazz.defineMethod (c$, "canPathsBeAdded", 
function (paths) {
if (paths == null || paths.length == 0 || this.rowMapper == null || this.selection == null || this.selectionMode == 4) return true;
 else {
var bitSet =  new java.util.BitSet ();
var lModel = this.listSelectionModel;
var anIndex;
var counter;
var min = lModel.getMinSelectionIndex ();
var max = lModel.getMaxSelectionIndex ();
var tempPath =  new Array (1);
if (min != -1) {
for (counter = min; counter <= max; counter++) {
if (lModel.isSelectedIndex (counter)) bitSet.set (counter);
}
} else {
tempPath[0] = paths[0];
min = max = this.rowMapper.getRowsForPaths (tempPath)[0];
}for (counter = paths.length - 1; counter >= 0; counter--) {
if (paths[counter] != null) {
tempPath[0] = paths[counter];
var rows = this.rowMapper.getRowsForPaths (tempPath);
if (rows == null) {
return false;
}anIndex = rows[0];
min = Math.min (anIndex, min);
max = Math.max (anIndex, max);
if (anIndex == -1) return false;
bitSet.set (anIndex);
}}
for (counter = min; counter <= max; counter++) if (!bitSet.get (counter)) return false;

}return true;
}, "~A");
Clazz.defineMethod (c$, "canPathsBeRemoved", 
function (paths) {
if (this.rowMapper == null || this.selection == null || this.selectionMode == 4) return true;
 else {
var bitSet =  new java.util.BitSet ();
var counter;
var pathCount = paths.length;
var anIndex;
var min = -1;
var validCount = 0;
var tempPath =  new Array (1);
var rows;
this.lastPaths.clear ();
for (counter = 0; counter < pathCount; counter++) {
if (paths[counter] != null) {
this.lastPaths.put (paths[counter], Boolean.TRUE);
}}
for (counter = this.selection.length - 1; counter >= 0; counter--) {
if (this.lastPaths.get (this.selection[counter]) == null) {
tempPath[0] = this.selection[counter];
rows = this.rowMapper.getRowsForPaths (tempPath);
if (rows != null && rows[0] != -1 && !bitSet.get (rows[0])) {
validCount++;
if (min == -1) min = rows[0];
 else min = Math.min (min, rows[0]);
bitSet.set (rows[0]);
}}}
this.lastPaths.clear ();
if (validCount > 1) {
for (counter = min + validCount - 1; counter >= min; counter--) if (!bitSet.get (counter)) return false;

}}return true;
}, "~A");
Clazz.defineMethod (c$, "notifyPathChange", 
function (changedPaths, oldLeadSelection) {
var cPathCount = changedPaths.size ();
var newness =  Clazz.newBooleanArray (cPathCount, false);
var paths =  new Array (cPathCount);
var placeholder;
for (var counter = 0; counter < cPathCount; counter++) {
placeholder = changedPaths.elementAt (counter);
newness[counter] = placeholder.isNew;
paths[counter] = placeholder.path;
}
var event =  new jsjavax.swing.event.TreeSelectionEvent (this, paths, newness, oldLeadSelection, this.leadPath);
this.fireValueChanged (event);
}, "java.util.Vector,jsjavax.swing.tree.TreePath");
Clazz.defineMethod (c$, "updateLeadIndex", 
function () {
if (this.leadPath != null) {
if (this.selection == null) {
this.leadPath = null;
this.leadIndex = this.leadRow = -1;
} else {
this.leadRow = this.leadIndex = -1;
for (var counter = this.selection.length - 1; counter >= 0; counter--) {
if (this.selection[counter] === this.leadPath) {
this.leadIndex = counter;
break;
}}
}} else {
this.leadIndex = -1;
}});
Clazz.defineMethod (c$, "insureUniqueness", 
function () {
});
Clazz.overrideMethod (c$, "toString", 
function () {
var selCount = this.getSelectionCount ();
var retBuffer =  new StringBuffer ();
var rows;
if (this.rowMapper != null) rows = this.rowMapper.getRowsForPaths (this.selection);
 else rows = null;
retBuffer.append (this.getClass ().getName () + " " + this.hashCode () + " [ ");
for (var counter = 0; counter < selCount; counter++) {
if (rows != null) retBuffer.append (this.selection[counter].toString () + "@" + Integer.toString (rows[counter]) + " ");
 else retBuffer.append (this.selection[counter].toString () + " ");
}
retBuffer.append ("]");
return retBuffer.toString ();
});
Clazz.defineMethod (c$, "clone", 
function () {
var clone = Clazz.superCall (this, jsjavax.swing.tree.DefaultTreeSelectionModel, "clone", []);
clone.changeSupport = null;
if (this.selection != null) {
var selLength = this.selection.length;
clone.selection =  new Array (selLength);
System.arraycopy (this.selection, 0, clone.selection, 0, selLength);
}clone.listenerList =  new jsjavax.swing.event.EventListenerList ();
clone.listSelectionModel = this.listSelectionModel.clone ();
clone.uniquePaths =  new java.util.Hashtable ();
clone.lastPaths =  new java.util.Hashtable ();
clone.tempPaths =  new Array (1);
return clone;
});
Clazz.defineStatics (c$,
"SELECTION_MODE_PROPERTY", "selectionMode");
c$ = Clazz.decorateAsClass (function () {
this.isNew = false;
this.path = null;
Clazz.instantialize (this, arguments);
}, jsjavax.swing.tree, "PathPlaceHolder");
Clazz.makeConstructor (c$, 
function (path, isNew) {
this.path = path;
this.isNew = isNew;
}, "jsjavax.swing.tree.TreePath,~B");
});

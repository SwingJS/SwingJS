Clazz.declarePackage ("javax.swing");
Clazz.load (["javax.swing.RowFilter", "$.RowSorter"], "javax.swing.DefaultRowSorter", ["java.lang.IllegalArgumentException", "$.IndexOutOfBoundsException", "java.util.ArrayList", "$.Arrays", "$.Collections", "javax.swing.SortOrder"], function () {
c$ = Clazz.decorateAsClass (function () {
this.sortsOnUpdates = false;
this.viewToModel = null;
this.modelToView = null;
this.comparators = null;
this.$isSortable = null;
this.cachedSortKeys = null;
this.sortComparators = null;
this.filter = null;
this.filterEntry = null;
this.sortKeys = null;
this.$useToString = null;
this.sorted = false;
this.maxSortKeys = 0;
this.modelWrapper = null;
this.modelRowCount = 0;
if (!Clazz.isClassDefined ("javax.swing.DefaultRowSorter.FilterEntry")) {
javax.swing.DefaultRowSorter.$DefaultRowSorter$FilterEntry$ ();
}
Clazz.instantialize (this, arguments);
}, javax.swing, "DefaultRowSorter", javax.swing.RowSorter);
Clazz.makeConstructor (c$, 
function () {
Clazz.superConstructor (this, javax.swing.DefaultRowSorter, []);
this.sortKeys = java.util.Collections.emptyList ();
this.maxSortKeys = 3;
});
Clazz.defineMethod (c$, "setModelWrapper", 
function (modelWrapper) {
if (modelWrapper == null) {
throw  new IllegalArgumentException ("modelWrapper most be non-null");
}var last = this.modelWrapper;
this.modelWrapper = modelWrapper;
if (last != null) {
this.modelStructureChanged ();
} else {
this.modelRowCount = this.getModelWrapper ().getRowCount ();
}}, "javax.swing.DefaultRowSorter.ModelWrapper");
Clazz.defineMethod (c$, "getModelWrapper", 
function () {
return this.modelWrapper;
});
Clazz.overrideMethod (c$, "getModel", 
function () {
return this.getModelWrapper ().getModel ();
});
Clazz.defineMethod (c$, "setSortable", 
function (column, sortable) {
this.checkColumn (column);
if (this.$isSortable == null) {
this.$isSortable =  Clazz.newBooleanArray (this.getModelWrapper ().getColumnCount (), false);
for (var i = this.$isSortable.length - 1; i >= 0; i--) {
this.$isSortable[i] = true;
}
}this.$isSortable[column] = sortable;
}, "~N,~B");
Clazz.defineMethod (c$, "isSortable", 
function (column) {
this.checkColumn (column);
return (this.$isSortable == null) ? true : this.$isSortable[column];
}, "~N");
Clazz.overrideMethod (c$, "setSortKeys", 
function (sortKeys) {
var old = this.sortKeys;
if (sortKeys != null && sortKeys.size () > 0) {
var max = this.getModelWrapper ().getColumnCount ();
for (var key, $key = sortKeys.iterator (); $key.hasNext () && ((key = $key.next ()) || true);) {
if (key == null || key.getColumn () < 0 || key.getColumn () >= max) {
throw  new IllegalArgumentException ("Invalid SortKey");
}}
this.sortKeys = java.util.Collections.unmodifiableList ( new java.util.ArrayList (sortKeys));
} else {
this.sortKeys = java.util.Collections.emptyList ();
}if (!this.sortKeys.equals (old)) {
this.fireSortOrderChanged ();
if (this.viewToModel == null) {
this.sort ();
} else {
this.sortExistingData ();
}}}, "java.util.List");
Clazz.overrideMethod (c$, "getSortKeys", 
function () {
return this.sortKeys;
});
Clazz.defineMethod (c$, "setMaxSortKeys", 
function (max) {
if (max < 1) {
throw  new IllegalArgumentException ("Invalid max");
}this.maxSortKeys = max;
}, "~N");
Clazz.defineMethod (c$, "getMaxSortKeys", 
function () {
return this.maxSortKeys;
});
Clazz.defineMethod (c$, "setSortsOnUpdates", 
function (sortsOnUpdates) {
this.sortsOnUpdates = sortsOnUpdates;
}, "~B");
Clazz.defineMethod (c$, "getSortsOnUpdates", 
function () {
return this.sortsOnUpdates;
});
Clazz.defineMethod (c$, "setRowFilter", 
function (filter) {
this.filter = filter;
this.sort ();
}, "javax.swing.RowFilter");
Clazz.defineMethod (c$, "getRowFilter", 
function () {
return this.filter;
});
Clazz.overrideMethod (c$, "toggleSortOrder", 
function (column) {
this.checkColumn (column);
if (this.isSortable (column)) {
var keys =  new java.util.ArrayList (this.getSortKeys ());
var sortKey;
var sortIndex;
for (sortIndex = keys.size () - 1; sortIndex >= 0; sortIndex--) {
if (keys.get (sortIndex).getColumn () == column) {
break;
}}
if (sortIndex == -1) {
sortKey =  new javax.swing.RowSorter.SortKey (column, javax.swing.SortOrder.ASCENDING);
keys.add (0, sortKey);
} else if (sortIndex == 0) {
keys.set (0, this.toggle (keys.get (0)));
} else {
keys.remove (sortIndex);
keys.add (0,  new javax.swing.RowSorter.SortKey (column, javax.swing.SortOrder.ASCENDING));
}if (keys.size () > this.getMaxSortKeys ()) {
keys = keys.subList (0, this.getMaxSortKeys ());
}this.setSortKeys (keys);
}}, "~N");
Clazz.defineMethod (c$, "toggle", 
 function (key) {
if (key.getSortOrder () === javax.swing.SortOrder.ASCENDING) {
return  new javax.swing.RowSorter.SortKey (key.getColumn (), javax.swing.SortOrder.DESCENDING);
}return  new javax.swing.RowSorter.SortKey (key.getColumn (), javax.swing.SortOrder.ASCENDING);
}, "javax.swing.RowSorter.SortKey");
Clazz.overrideMethod (c$, "convertRowIndexToView", 
function (index) {
if (this.modelToView == null) {
if (index < 0 || index >= this.getModelWrapper ().getRowCount ()) {
throw  new IndexOutOfBoundsException ("Invalid index");
}return index;
}return this.modelToView[index];
}, "~N");
Clazz.overrideMethod (c$, "convertRowIndexToModel", 
function (index) {
if (this.viewToModel == null) {
if (index < 0 || index >= this.getModelWrapper ().getRowCount ()) {
throw  new IndexOutOfBoundsException ("Invalid index");
}return index;
}return this.viewToModel[index].modelIndex;
}, "~N");
Clazz.defineMethod (c$, "isUnsorted", 
 function () {
var keys = this.getSortKeys ();
var keySize = keys.size ();
return (keySize == 0 || keys.get (0).getSortOrder () === javax.swing.SortOrder.UNSORTED);
});
Clazz.defineMethod (c$, "sortExistingData", 
 function () {
var lastViewToModel = this.getViewToModelAsInts (this.viewToModel);
this.updateUseToString ();
this.cacheSortKeys (this.getSortKeys ());
if (this.isUnsorted ()) {
if (this.getRowFilter () == null) {
this.viewToModel = null;
this.modelToView = null;
} else {
var included = 0;
for (var i = 0; i < this.modelToView.length; i++) {
if (this.modelToView[i] != -1) {
this.viewToModel[included].modelIndex = i;
this.modelToView[i] = included++;
}}
}} else {
java.util.Arrays.sort (this.viewToModel);
this.setModelToViewFromViewToModel (false);
}this.fireRowSorterChanged (lastViewToModel);
});
Clazz.defineMethod (c$, "sort", 
function () {
this.sorted = true;
var lastViewToModel = this.getViewToModelAsInts (this.viewToModel);
this.updateUseToString ();
if (this.isUnsorted ()) {
this.cachedSortKeys =  new Array (0);
if (this.getRowFilter () == null) {
if (this.viewToModel != null) {
this.viewToModel = null;
this.modelToView = null;
} else {
return;
}} else {
this.initializeFilteredMapping ();
}} else {
this.cacheSortKeys (this.getSortKeys ());
if (this.getRowFilter () != null) {
this.initializeFilteredMapping ();
} else {
this.createModelToView (this.getModelWrapper ().getRowCount ());
this.createViewToModel (this.getModelWrapper ().getRowCount ());
}java.util.Arrays.sort (this.viewToModel);
this.setModelToViewFromViewToModel (false);
}this.fireRowSorterChanged (lastViewToModel);
});
Clazz.defineMethod (c$, "updateUseToString", 
 function () {
var i = this.getModelWrapper ().getColumnCount ();
if (this.$useToString == null || this.$useToString.length != i) {
this.$useToString =  Clazz.newBooleanArray (i, false);
}for (--i; i >= 0; i--) {
this.$useToString[i] = this.useToString (i);
}
});
Clazz.defineMethod (c$, "initializeFilteredMapping", 
 function () {
var rowCount = this.getModelWrapper ().getRowCount ();
var i;
var j;
var excludedCount = 0;
this.createModelToView (rowCount);
for (i = 0; i < rowCount; i++) {
if (this.include (i)) {
this.modelToView[i] = i - excludedCount;
} else {
this.modelToView[i] = -1;
excludedCount++;
}}
this.createViewToModel (rowCount - excludedCount);
for (i = 0, j = 0; i < rowCount; i++) {
if (this.modelToView[i] != -1) {
this.viewToModel[j++].modelIndex = i;
}}
});
Clazz.defineMethod (c$, "createModelToView", 
 function (rowCount) {
if (this.modelToView == null || this.modelToView.length != rowCount) {
this.modelToView =  Clazz.newIntArray (rowCount, 0);
}}, "~N");
Clazz.defineMethod (c$, "createViewToModel", 
 function (rowCount) {
var recreateFrom = 0;
if (this.viewToModel != null) {
recreateFrom = Math.min (rowCount, this.viewToModel.length);
if (this.viewToModel.length != rowCount) {
var oldViewToModel = this.viewToModel;
this.viewToModel =  new Array (rowCount);
System.arraycopy (oldViewToModel, 0, this.viewToModel, 0, recreateFrom);
}} else {
this.viewToModel =  new Array (rowCount);
}var i;
for (i = 0; i < recreateFrom; i++) {
this.viewToModel[i].modelIndex = i;
}
for (i = recreateFrom; i < rowCount; i++) {
this.viewToModel[i] =  new javax.swing.DefaultRowSorter.Row (this, i);
}
}, "~N");
Clazz.defineMethod (c$, "cacheSortKeys", 
 function (keys) {
var keySize = keys.size ();
this.sortComparators =  new Array (keySize);
for (var i = 0; i < keySize; i++) {
this.sortComparators[i] = this.getComparator0 (keys.get (i).getColumn ());
}
this.cachedSortKeys = keys.toArray ( new Array (keySize));
}, "java.util.List");
Clazz.defineMethod (c$, "useToString", 
function (column) {
return (this.getComparator (column) == null);
}, "~N");
Clazz.defineMethod (c$, "setModelToViewFromViewToModel", 
 function (unsetFirst) {
var i;
if (unsetFirst) {
for (i = this.modelToView.length - 1; i >= 0; i--) {
this.modelToView[i] = -1;
}
}for (i = this.viewToModel.length - 1; i >= 0; i--) {
this.modelToView[this.viewToModel[i].modelIndex] = i;
}
}, "~B");
Clazz.defineMethod (c$, "getViewToModelAsInts", 
 function (viewToModel) {
if (viewToModel != null) {
var viewToModelI =  Clazz.newIntArray (viewToModel.length, 0);
for (var i = viewToModel.length - 1; i >= 0; i--) {
viewToModelI[i] = viewToModel[i].modelIndex;
}
return viewToModelI;
}return  Clazz.newIntArray (0, 0);
}, "~A");
Clazz.defineMethod (c$, "setComparator", 
function (column, comparator) {
this.checkColumn (column);
if (this.comparators == null) {
this.comparators =  new Array (this.getModelWrapper ().getColumnCount ());
}this.comparators[column] = comparator;
}, "~N,java.util.Comparator");
Clazz.defineMethod (c$, "getComparator", 
function (column) {
this.checkColumn (column);
if (this.comparators != null) {
return this.comparators[column];
}return null;
}, "~N");
Clazz.defineMethod (c$, "getComparator0", 
 function (column) {
var comparator = this.getComparator (column);
if (comparator != null) {
return comparator;
}return null;
}, "~N");
Clazz.defineMethod (c$, "getFilterEntry", 
 function (modelIndex) {
if (this.filterEntry == null) {
this.filterEntry = Clazz.innerTypeInstance (javax.swing.DefaultRowSorter.FilterEntry, this, null);
}this.filterEntry.modelIndex = modelIndex;
return this.filterEntry;
}, "~N");
Clazz.overrideMethod (c$, "getViewRowCount", 
function () {
if (this.viewToModel != null) {
return this.viewToModel.length;
}return this.getModelWrapper ().getRowCount ();
});
Clazz.overrideMethod (c$, "getModelRowCount", 
function () {
return this.getModelWrapper ().getRowCount ();
});
Clazz.defineMethod (c$, "allChanged", 
 function () {
this.modelToView = null;
this.viewToModel = null;
this.comparators = null;
this.$isSortable = null;
if (this.isUnsorted ()) {
this.sort ();
} else {
this.setSortKeys (null);
}});
Clazz.overrideMethod (c$, "modelStructureChanged", 
function () {
this.allChanged ();
this.modelRowCount = this.getModelWrapper ().getRowCount ();
});
Clazz.overrideMethod (c$, "allRowsChanged", 
function () {
this.modelRowCount = this.getModelWrapper ().getRowCount ();
this.sort ();
});
Clazz.overrideMethod (c$, "rowsInserted", 
function (firstRow, endRow) {
this.checkAgainstModel (firstRow, endRow);
var newModelRowCount = this.getModelWrapper ().getRowCount ();
if (endRow >= newModelRowCount) {
throw  new IndexOutOfBoundsException ("Invalid range");
}this.modelRowCount = newModelRowCount;
if (this.shouldOptimizeChange (firstRow, endRow)) {
this.rowsInserted0 (firstRow, endRow);
}}, "~N,~N");
Clazz.overrideMethod (c$, "rowsDeleted", 
function (firstRow, endRow) {
this.checkAgainstModel (firstRow, endRow);
if (firstRow >= this.modelRowCount || endRow >= this.modelRowCount) {
throw  new IndexOutOfBoundsException ("Invalid range");
}this.modelRowCount = this.getModelWrapper ().getRowCount ();
if (this.shouldOptimizeChange (firstRow, endRow)) {
this.rowsDeleted0 (firstRow, endRow);
}}, "~N,~N");
Clazz.defineMethod (c$, "rowsUpdated", 
function (firstRow, endRow) {
this.checkAgainstModel (firstRow, endRow);
if (firstRow >= this.modelRowCount || endRow >= this.modelRowCount) {
throw  new IndexOutOfBoundsException ("Invalid range");
}if (this.getSortsOnUpdates ()) {
if (this.shouldOptimizeChange (firstRow, endRow)) {
this.rowsUpdated0 (firstRow, endRow);
}} else {
this.sorted = false;
}}, "~N,~N");
Clazz.defineMethod (c$, "rowsUpdated", 
function (firstRow, endRow, column) {
this.checkColumn (column);
this.rowsUpdated (firstRow, endRow);
}, "~N,~N,~N");
Clazz.defineMethod (c$, "checkAgainstModel", 
 function (firstRow, endRow) {
if (firstRow > endRow || firstRow < 0 || endRow < 0 || firstRow > this.modelRowCount) {
throw  new IndexOutOfBoundsException ("Invalid range");
}}, "~N,~N");
Clazz.defineMethod (c$, "include", 
 function (row) {
var filter = this.getRowFilter ();
if (filter != null) {
return filter.include (this.getFilterEntry (row));
}return true;
}, "~N");
Clazz.defineMethod (c$, "isTransformed", 
 function () {
return (this.viewToModel != null);
});
Clazz.defineMethod (c$, "insertInOrder", 
 function (toAdd, current) {
var last = 0;
var index;
var max = toAdd.size ();
for (var i = 0; i < max; i++) {
index = java.util.Arrays.binarySearch (current, toAdd.get (i));
if (index < 0) {
index = -1 - index;
}System.arraycopy (current, last, this.viewToModel, last + i, index - last);
this.viewToModel[index + i] = toAdd.get (i);
last = index;
}
System.arraycopy (current, last, this.viewToModel, last + max, current.length - last);
}, "java.util.List,~A");
Clazz.defineMethod (c$, "shouldOptimizeChange", 
 function (firstRow, lastRow) {
if (!this.isTransformed ()) {
return false;
}if (!this.sorted || (lastRow - firstRow) > Clazz.doubleToInt (this.viewToModel.length / 10)) {
this.sort ();
return false;
}return true;
}, "~N,~N");
Clazz.defineMethod (c$, "rowsInserted0", 
 function (firstRow, lastRow) {
var oldViewToModel = this.getViewToModelAsInts (this.viewToModel);
var i;
var delta = (lastRow - firstRow) + 1;
var added =  new java.util.ArrayList (delta);
for (i = firstRow; i <= lastRow; i++) {
if (this.include (i)) {
added.add ( new javax.swing.DefaultRowSorter.Row (this, i));
}}
var viewIndex;
for (i = this.modelToView.length - 1; i >= firstRow; i--) {
viewIndex = this.modelToView[i];
if (viewIndex != -1) {
this.viewToModel[viewIndex].modelIndex += delta;
}}
if (added.size () > 0) {
java.util.Collections.sort (added);
var lastViewToModel = this.viewToModel;
this.viewToModel =  new Array (this.viewToModel.length + added.size ());
this.insertInOrder (added, lastViewToModel);
}this.createModelToView (this.getModelWrapper ().getRowCount ());
this.setModelToViewFromViewToModel (true);
this.fireRowSorterChanged (oldViewToModel);
}, "~N,~N");
Clazz.defineMethod (c$, "rowsDeleted0", 
 function (firstRow, lastRow) {
var oldViewToModel = this.getViewToModelAsInts (this.viewToModel);
var removedFromView = 0;
var i;
var viewIndex;
for (i = firstRow; i <= lastRow; i++) {
viewIndex = this.modelToView[i];
if (viewIndex != -1) {
removedFromView++;
this.viewToModel[viewIndex] = null;
}}
var delta = lastRow - firstRow + 1;
for (i = this.modelToView.length - 1; i > lastRow; i--) {
viewIndex = this.modelToView[i];
if (viewIndex != -1) {
this.viewToModel[viewIndex].modelIndex -= delta;
}}
if (removedFromView > 0) {
var newViewToModel =  new Array (this.viewToModel.length - removedFromView);
var newIndex = 0;
var last = 0;
for (i = 0; i < this.viewToModel.length; i++) {
if (this.viewToModel[i] == null) {
System.arraycopy (this.viewToModel, last, newViewToModel, newIndex, i - last);
newIndex += (i - last);
last = i + 1;
}}
System.arraycopy (this.viewToModel, last, newViewToModel, newIndex, this.viewToModel.length - last);
this.viewToModel = newViewToModel;
}this.createModelToView (this.getModelWrapper ().getRowCount ());
this.setModelToViewFromViewToModel (true);
this.fireRowSorterChanged (oldViewToModel);
}, "~N,~N");
Clazz.defineMethod (c$, "rowsUpdated0", 
 function (firstRow, lastRow) {
var oldViewToModel = this.getViewToModelAsInts (this.viewToModel);
var i;
var j;
var delta = lastRow - firstRow + 1;
var modelIndex;
if (this.getRowFilter () == null) {
var updated =  new Array (delta);
for (j = 0, i = firstRow; i <= lastRow; i++, j++) {
updated[j] = this.viewToModel[this.modelToView[i]];
}
java.util.Arrays.sort (updated);
var intermediary =  new Array (this.viewToModel.length - delta);
for (i = 0, j = 0; i < this.viewToModel.length; i++) {
modelIndex = this.viewToModel[i].modelIndex;
if (modelIndex < firstRow || modelIndex > lastRow) {
intermediary[j++] = this.viewToModel[i];
}}
this.insertInOrder (java.util.Arrays.asList (updated), intermediary);
this.setModelToViewFromViewToModel (false);
} else {
var updated =  new java.util.ArrayList (delta);
var newlyVisible = 0;
var newlyHidden = 0;
var effected = 0;
for (i = firstRow; i <= lastRow; i++) {
if (this.modelToView[i] == -1) {
if (this.include (i)) {
updated.add ( new javax.swing.DefaultRowSorter.Row (this, i));
newlyVisible++;
}} else {
if (!this.include (i)) {
newlyHidden++;
} else {
updated.add (this.viewToModel[this.modelToView[i]]);
}this.modelToView[i] = -2;
effected++;
}}
java.util.Collections.sort (updated);
var intermediary =  new Array (this.viewToModel.length - effected);
for (i = 0, j = 0; i < this.viewToModel.length; i++) {
modelIndex = this.viewToModel[i].modelIndex;
if (this.modelToView[modelIndex] != -2) {
intermediary[j++] = this.viewToModel[i];
}}
if (newlyVisible != newlyHidden) {
this.viewToModel =  new Array (this.viewToModel.length + newlyVisible - newlyHidden);
}this.insertInOrder (updated, intermediary);
this.setModelToViewFromViewToModel (true);
}this.fireRowSorterChanged (oldViewToModel);
}, "~N,~N");
Clazz.defineMethod (c$, "checkColumn", 
 function (column) {
if (column < 0 || column >= this.getModelWrapper ().getColumnCount ()) {
throw  new IndexOutOfBoundsException ("column beyond range of TableModel");
}}, "~N");
c$.$DefaultRowSorter$FilterEntry$ = function () {
Clazz.pu$h(self.c$);
c$ = Clazz.decorateAsClass (function () {
Clazz.prepareCallback (this, arguments);
this.modelIndex = 0;
Clazz.instantialize (this, arguments);
}, javax.swing.DefaultRowSorter, "FilterEntry", javax.swing.RowFilter.Entry);
Clazz.overrideMethod (c$, "getModel", 
function () {
return this.b$["javax.swing.DefaultRowSorter"].getModelWrapper ().getModel ();
});
Clazz.overrideMethod (c$, "getValueCount", 
function () {
return this.b$["javax.swing.DefaultRowSorter"].getModelWrapper ().getColumnCount ();
});
Clazz.overrideMethod (c$, "getValue", 
function (a) {
return this.b$["javax.swing.DefaultRowSorter"].getModelWrapper ().getValueAt (this.modelIndex, a);
}, "~N");
Clazz.overrideMethod (c$, "getStringValue", 
function (a) {
return this.b$["javax.swing.DefaultRowSorter"].getModelWrapper ().getStringValueAt (this.modelIndex, a);
}, "~N");
Clazz.overrideMethod (c$, "getIdentifier", 
function () {
return this.b$["javax.swing.DefaultRowSorter"].getModelWrapper ().getIdentifier (this.modelIndex);
});
c$ = Clazz.p0p ();
};
Clazz.pu$h(self.c$);
c$ = Clazz.declareType (javax.swing.DefaultRowSorter, "ModelWrapper");
Clazz.makeConstructor (c$, 
function () {
});
Clazz.defineMethod (c$, "getStringValueAt", 
function (a, b) {
var c = this.getValueAt (a, b);
if (c == null) {
return "";
}var d = c.toString ();
if (d == null) {
return "";
}return d;
}, "~N,~N");
c$ = Clazz.p0p ();
Clazz.pu$h(self.c$);
c$ = Clazz.decorateAsClass (function () {
this.sorter = null;
this.modelIndex = 0;
Clazz.instantialize (this, arguments);
}, javax.swing.DefaultRowSorter, "Row", null, Comparable);
Clazz.makeConstructor (c$, 
function (a, b) {
this.sorter = a;
this.modelIndex = b;
}, "javax.swing.DefaultRowSorter,~N");
Clazz.overrideMethod (c$, "compareTo", 
function (a) {
return this.sorter.compare (this.modelIndex, a.modelIndex);
}, "javax.swing.DefaultRowSorter.Row");
c$ = Clazz.p0p ();
});

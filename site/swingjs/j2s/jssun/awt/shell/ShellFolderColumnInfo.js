Clazz.declarePackage ("jssun.awt.shell");
c$ = Clazz.decorateAsClass (function () {
this.title = null;
this.width = null;
this.visible = false;
this.alignment = null;
this.sortOrder = null;
this.comparator = null;
this.compareByColumn = false;
Clazz.instantialize (this, arguments);
}, jssun.awt.shell, "ShellFolderColumnInfo");
Clazz.makeConstructor (c$, 
function (title, width, alignment, visible, sortOrder, comparator, compareByColumn) {
this.title = title;
this.width = width;
this.alignment = alignment;
this.visible = visible;
this.sortOrder = sortOrder;
this.comparator = comparator;
this.compareByColumn = compareByColumn;
}, "~S,Integer,Integer,~B,javax.swing.SortOrder,java.util.Comparator,~B");
Clazz.makeConstructor (c$, 
function (title, width, alignment, visible, sortOrder, comparator) {
this.construct (title, width, alignment, visible, sortOrder, comparator, false);
}, "~S,Integer,Integer,~B,javax.swing.SortOrder,java.util.Comparator");
Clazz.makeConstructor (c$, 
function (title, width, alignment, visible) {
this.construct (title, new Integer (width), new Integer (alignment), visible, null, null);
}, "~S,~N,~N,~B");
Clazz.defineMethod (c$, "getTitle", 
function () {
return this.title;
});
Clazz.defineMethod (c$, "setTitle", 
function (title) {
this.title = title;
}, "~S");
Clazz.defineMethod (c$, "getWidth", 
function () {
return this.width;
});
Clazz.defineMethod (c$, "setWidth", 
function (width) {
this.width = width;
}, "Integer");
Clazz.defineMethod (c$, "getAlignment", 
function () {
return this.alignment;
});
Clazz.defineMethod (c$, "setAlignment", 
function (alignment) {
this.alignment = alignment;
}, "Integer");
Clazz.defineMethod (c$, "isVisible", 
function () {
return this.visible;
});
Clazz.defineMethod (c$, "setVisible", 
function (visible) {
this.visible = visible;
}, "~B");
Clazz.defineMethod (c$, "getSortOrder", 
function () {
return this.sortOrder;
});
Clazz.defineMethod (c$, "setSortOrder", 
function (sortOrder) {
this.sortOrder = sortOrder;
}, "javax.swing.SortOrder");
Clazz.defineMethod (c$, "getComparator", 
function () {
return this.comparator;
});
Clazz.defineMethod (c$, "setComparator", 
function (comparator) {
this.comparator = comparator;
}, "java.util.Comparator");
Clazz.defineMethod (c$, "isCompareByColumn", 
function () {
return this.compareByColumn;
});
Clazz.defineMethod (c$, "setCompareByColumn", 
function (compareByColumn) {
this.compareByColumn = compareByColumn;
}, "~B");

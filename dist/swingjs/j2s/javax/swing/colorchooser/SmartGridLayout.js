Clazz.declarePackage ("javax.swing.colorchooser");
Clazz.load (["java.awt.LayoutManager"], "javax.swing.colorchooser.SmartGridLayout", ["java.awt.Dimension"], function () {
c$ = Clazz.decorateAsClass (function () {
this.rows = 2;
this.columns = 2;
this.xGap = 2;
this.yGap = 2;
this.componentCount = 0;
this.layoutGrid = null;
Clazz.instantialize (this, arguments);
}, javax.swing.colorchooser, "SmartGridLayout", null, java.awt.LayoutManager);
Clazz.makeConstructor (c$, 
function (numColumns, numRows) {
this.rows = numRows;
this.columns = numColumns;
this.layoutGrid =  Clazz.newArray (numColumns, numRows, null);
}, "~N,~N");
Clazz.overrideMethod (c$, "layoutContainer", 
function (c) {
this.buildLayoutGrid (c);
var rowHeights =  Clazz.newIntArray (this.rows, 0);
var columnWidths =  Clazz.newIntArray (this.columns, 0);
for (var row = 0; row < this.rows; row++) {
rowHeights[row] = this.computeRowHeight (row);
}
for (var column = 0; column < this.columns; column++) {
columnWidths[column] = this.computeColumnWidth (column);
}
var insets = c.getInsets ();
if (c.getComponentOrientation ().isLeftToRight ()) {
var horizLoc = insets.left;
for (var column = 0; column < this.columns; column++) {
var vertLoc = insets.top;
for (var row = 0; row < this.rows; row++) {
var current = this.layoutGrid[column][row];
current.setBounds (horizLoc, vertLoc, columnWidths[column], rowHeights[row]);
vertLoc += (rowHeights[row] + this.yGap);
}
horizLoc += (columnWidths[column] + this.xGap);
}
} else {
var horizLoc = c.getWidth () - insets.right;
for (var column = 0; column < this.columns; column++) {
var vertLoc = insets.top;
horizLoc -= columnWidths[column];
for (var row = 0; row < this.rows; row++) {
var current = this.layoutGrid[column][row];
current.setBounds (horizLoc, vertLoc, columnWidths[column], rowHeights[row]);
vertLoc += (rowHeights[row] + this.yGap);
}
horizLoc -= this.xGap;
}
}}, "java.awt.Container");
Clazz.overrideMethod (c$, "minimumLayoutSize", 
function (c) {
this.buildLayoutGrid (c);
var insets = c.getInsets ();
var height = 0;
var width = 0;
for (var row = 0; row < this.rows; row++) {
height += this.computeRowHeight (row);
}
for (var column = 0; column < this.columns; column++) {
width += this.computeColumnWidth (column);
}
height += (this.yGap * (this.rows - 1)) + insets.top + insets.bottom;
width += (this.xGap * (this.columns - 1)) + insets.right + insets.left;
return  new java.awt.Dimension (width, height);
}, "java.awt.Container");
Clazz.overrideMethod (c$, "preferredLayoutSize", 
function (c) {
return this.minimumLayoutSize (c);
}, "java.awt.Container");
Clazz.overrideMethod (c$, "addLayoutComponent", 
function (s, c) {
}, "~S,java.awt.Component");
Clazz.overrideMethod (c$, "removeLayoutComponent", 
function (c) {
}, "java.awt.Component");
Clazz.defineMethod (c$, "buildLayoutGrid", 
 function (c) {
var children = c.getComponents ();
for (var componentCount = 0; componentCount < children.length; componentCount++) {
var row = 0;
var column = 0;
if (componentCount != 0) {
column = componentCount % this.columns;
row = Clazz.doubleToInt ((componentCount - column) / this.columns);
}this.layoutGrid[column][row] = children[componentCount];
}
}, "java.awt.Container");
Clazz.defineMethod (c$, "computeColumnWidth", 
 function (columnNum) {
var maxWidth = 1;
for (var row = 0; row < this.rows; row++) {
var width = this.layoutGrid[columnNum][row].getPreferredSize ().width;
if (width > maxWidth) {
maxWidth = width;
}}
return maxWidth;
}, "~N");
Clazz.defineMethod (c$, "computeRowHeight", 
 function (rowNum) {
var maxHeight = 1;
for (var column = 0; column < this.columns; column++) {
var height = this.layoutGrid[column][rowNum].getPreferredSize ().height;
if (height > maxHeight) {
maxHeight = height;
}}
return maxHeight;
}, "~N");
});

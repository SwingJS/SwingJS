Clazz.declarePackage ("jsjavax.swing.text");
Clazz.load (["jsjavax.swing.text.BoxView", "java.util.BitSet"], "jsjavax.swing.text.TableView", ["java.util.Vector", "jsjava.awt.Rectangle", "jsjavax.swing.SizeRequirements"], function () {
c$ = Clazz.decorateAsClass (function () {
this.columnSpans = null;
this.columnOffsets = null;
this.columnRequirements = null;
this.rows = null;
this.gridValid = false;
if (!Clazz.isClassDefined ("jsjavax.swing.text.TableView.TableRow")) {
jsjavax.swing.text.TableView.$TableView$TableRow$ ();
}
if (!Clazz.isClassDefined ("jsjavax.swing.text.TableView.TableCell")) {
jsjavax.swing.text.TableView.$TableView$TableCell$ ();
}
Clazz.instantialize (this, arguments);
}, jsjavax.swing.text, "TableView", jsjavax.swing.text.BoxView);
Clazz.makeConstructor (c$, 
function (elem) {
Clazz.superConstructor (this, jsjavax.swing.text.TableView, [elem, 1]);
this.rows =  new java.util.Vector ();
this.gridValid = false;
}, "jsjavax.swing.text.Element");
Clazz.defineMethod (c$, "createTableRow", 
function (elem) {
return Clazz.innerTypeInstance (jsjavax.swing.text.TableView.TableRow, this, null, elem);
}, "jsjavax.swing.text.Element");
Clazz.defineMethod (c$, "createTableCell", 
function (elem) {
return Clazz.innerTypeInstance (jsjavax.swing.text.TableView.TableCell, this, null, elem);
}, "jsjavax.swing.text.Element");
Clazz.defineMethod (c$, "getColumnCount", 
function () {
return this.columnSpans.length;
});
Clazz.defineMethod (c$, "getColumnSpan", 
function (col) {
return this.columnSpans[col];
}, "~N");
Clazz.defineMethod (c$, "getRowCount", 
function () {
return this.rows.size ();
});
Clazz.defineMethod (c$, "getRowSpan", 
function (row) {
var rv = this.getRow (row);
if (rv != null) {
return Clazz.floatToInt (rv.getPreferredSpan (1));
}return 0;
}, "~N");
Clazz.defineMethod (c$, "getRow", 
function (row) {
if (row < this.rows.size ()) {
return this.rows.elementAt (row);
}return null;
}, "~N");
Clazz.defineMethod (c$, "getColumnsOccupied", 
function (v) {
return 1;
}, "jsjavax.swing.text.View");
Clazz.defineMethod (c$, "getRowsOccupied", 
function (v) {
return 1;
}, "jsjavax.swing.text.View");
Clazz.defineMethod (c$, "invalidateGrid", 
function () {
this.gridValid = false;
});
Clazz.defineMethod (c$, "forwardUpdate", 
function (ec, e, a, f) {
Clazz.superCall (this, jsjavax.swing.text.TableView, "forwardUpdate", [ec, e, a, f]);
if (a != null) {
var c = this.getContainer ();
if (c != null) {
var alloc = (Clazz.instanceOf (a, jsjava.awt.Rectangle)) ? a : a.getBounds ();
c.repaint (alloc.x, alloc.y, alloc.width, alloc.height);
}}}, "jsjavax.swing.event.DocumentEvent.ElementChange,jsjavax.swing.event.DocumentEvent,jsjava.awt.Shape,jsjavax.swing.text.ViewFactory");
Clazz.defineMethod (c$, "replace", 
function (offset, length, views) {
Clazz.superCall (this, jsjavax.swing.text.TableView, "replace", [offset, length, views]);
this.invalidateGrid ();
}, "~N,~N,~A");
Clazz.defineMethod (c$, "updateGrid", 
function () {
if (!this.gridValid) {
this.rows.removeAllElements ();
var n = this.getViewCount ();
for (var i = 0; i < n; i++) {
var v = this.getView (i);
if (Clazz.instanceOf (v, jsjavax.swing.text.TableView.TableRow)) {
this.rows.addElement (v);
var rv = v;
rv.clearFilledColumns ();
rv.setRow (i);
}}
var maxColumns = 0;
var nrows = this.rows.size ();
for (var row = 0; row < nrows; row++) {
var rv = this.getRow (row);
var col = 0;
for (var cell = 0; cell < rv.getViewCount (); cell++, col++) {
var cv = rv.getView (cell);
for (; rv.isFilled (col); col++) ;
var rowSpan = this.getRowsOccupied (cv);
var colSpan = this.getColumnsOccupied (cv);
if ((colSpan > 1) || (rowSpan > 1)) {
var rowLimit = row + rowSpan;
var colLimit = col + colSpan;
for (var i = row; i < rowLimit; i++) {
for (var j = col; j < colLimit; j++) {
if (i != row || j != col) {
this.addFill (i, j);
}}
}
if (colSpan > 1) {
col += colSpan - 1;
}}}
maxColumns = Math.max (maxColumns, col);
}
this.columnSpans =  Clazz.newIntArray (maxColumns, 0);
this.columnOffsets =  Clazz.newIntArray (maxColumns, 0);
this.columnRequirements =  new Array (maxColumns);
for (var i = 0; i < maxColumns; i++) {
this.columnRequirements[i] =  new jsjavax.swing.SizeRequirements ();
}
this.gridValid = true;
}});
Clazz.defineMethod (c$, "addFill", 
function (row, col) {
var rv = this.getRow (row);
if (rv != null) {
rv.fillColumn (col);
}}, "~N,~N");
Clazz.defineMethod (c$, "layoutColumns", 
function (targetSpan, offsets, spans, reqs) {
jsjavax.swing.SizeRequirements.calculateTiledPositions (targetSpan, null, reqs, offsets, spans);
}, "~N,~A,~A,~A");
Clazz.defineMethod (c$, "layoutMinorAxis", 
function (targetSpan, axis, offsets, spans) {
this.updateGrid ();
var n = this.getRowCount ();
for (var i = 0; i < n; i++) {
var row = this.getRow (i);
row.layoutChanged (axis);
}
this.layoutColumns (targetSpan, this.columnOffsets, this.columnSpans, this.columnRequirements);
Clazz.superCall (this, jsjavax.swing.text.TableView, "layoutMinorAxis", [targetSpan, axis, offsets, spans]);
}, "~N,~N,~A,~A");
Clazz.overrideMethod (c$, "calculateMinorAxisRequirements", 
function (axis, r) {
this.updateGrid ();
this.calculateColumnRequirements (axis);
if (r == null) {
r =  new jsjavax.swing.SizeRequirements ();
}var min = 0;
var pref = 0;
var max = 0;
for (var i = 0; i < this.columnRequirements.length; i++) {
var req = this.columnRequirements[i];
min += req.minimum;
pref += req.preferred;
max += req.maximum;
}
r.minimum = min;
r.preferred = pref;
r.maximum = max;
r.alignment = 0;
return r;
}, "~N,jsjavax.swing.SizeRequirements");
Clazz.defineMethod (c$, "calculateColumnRequirements", 
function (axis) {
var hasMultiColumn = false;
var nrows = this.getRowCount ();
for (var i = 0; i < nrows; i++) {
var row = this.getRow (i);
var col = 0;
var ncells = row.getViewCount ();
for (var cell = 0; cell < ncells; cell++, col++) {
var cv = row.getView (cell);
for (; row.isFilled (col); col++) ;
var colSpan = this.getColumnsOccupied (cv);
if (colSpan == 1) {
this.checkSingleColumnCell (axis, col, cv);
} else {
hasMultiColumn = true;
col += colSpan - 1;
}}
}
if (hasMultiColumn) {
for (var i = 0; i < nrows; i++) {
var row = this.getRow (i);
var col = 0;
var ncells = row.getViewCount ();
for (var cell = 0; cell < ncells; cell++, col++) {
var cv = row.getView (cell);
for (; row.isFilled (col); col++) ;
var colSpan = this.getColumnsOccupied (cv);
if (colSpan > 1) {
this.checkMultiColumnCell (axis, col, colSpan, cv);
col += colSpan - 1;
}}
}
}}, "~N");
Clazz.defineMethod (c$, "checkSingleColumnCell", 
function (axis, col, v) {
var req = this.columnRequirements[col];
req.minimum = Math.max (Clazz.floatToInt (v.getMinimumSpan (axis)), req.minimum);
req.preferred = Math.max (Clazz.floatToInt (v.getPreferredSpan (axis)), req.preferred);
req.maximum = Math.max (Clazz.floatToInt (v.getMaximumSpan (axis)), req.maximum);
}, "~N,~N,jsjavax.swing.text.View");
Clazz.defineMethod (c$, "checkMultiColumnCell", 
function (axis, col, ncols, v) {
var min = 0;
var pref = 0;
for (var i = 0; i < ncols; i++) {
var req = this.columnRequirements[col + i];
min += req.minimum;
pref += req.preferred;
}
var cmin = Clazz.floatToInt (v.getMinimumSpan (axis));
if (cmin > min) {
var reqs =  new Array (ncols);
for (var i = 0; i < ncols; i++) {
var r = reqs[i] = this.columnRequirements[col + i];
r.maximum = Math.max (r.maximum, Clazz.floatToInt (v.getMaximumSpan (axis)));
}
var spans =  Clazz.newIntArray (ncols, 0);
var offsets =  Clazz.newIntArray (ncols, 0);
jsjavax.swing.SizeRequirements.calculateTiledPositions (cmin, null, reqs, offsets, spans);
for (var i = 0; i < ncols; i++) {
var req = reqs[i];
req.minimum = Math.max (spans[i], req.minimum);
req.preferred = Math.max (req.minimum, req.preferred);
req.maximum = Math.max (req.preferred, req.maximum);
}
}var cpref = Clazz.floatToInt (v.getPreferredSpan (axis));
if (cpref > pref) {
var reqs =  new Array (ncols);
for (var i = 0; i < ncols; i++) {
reqs[i] = this.columnRequirements[col + i];
}
var spans =  Clazz.newIntArray (ncols, 0);
var offsets =  Clazz.newIntArray (ncols, 0);
jsjavax.swing.SizeRequirements.calculateTiledPositions (cpref, null, reqs, offsets, spans);
for (var i = 0; i < ncols; i++) {
var req = reqs[i];
req.preferred = Math.max (spans[i], req.preferred);
req.maximum = Math.max (req.preferred, req.maximum);
}
}}, "~N,~N,~N,jsjavax.swing.text.View");
Clazz.overrideMethod (c$, "getViewAtPosition", 
function (pos, a) {
var n = this.getViewCount ();
for (var i = 0; i < n; i++) {
var v = this.getView (i);
var p0 = v.getStartOffset ();
var p1 = v.getEndOffset ();
if ((pos >= p0) && (pos < p1)) {
if (a != null) {
this.childAllocation (i, a);
}return v;
}}
if (pos == this.getEndOffset ()) {
var v = this.getView (n - 1);
if (a != null) {
this.childAllocation (n - 1, a);
}return v;
}return null;
}, "~N,jsjava.awt.Rectangle");
c$.$TableView$TableRow$ = function () {
Clazz.pu$h ();
c$ = Clazz.decorateAsClass (function () {
Clazz.prepareCallback (this, arguments);
this.fillColumns = null;
this.row = 0;
Clazz.instantialize (this, arguments);
}, jsjavax.swing.text.TableView, "TableRow", jsjavax.swing.text.BoxView);
Clazz.makeConstructor (c$, 
function (a) {
Clazz.superConstructor (this, jsjavax.swing.text.TableView.TableRow, [a, 0]);
this.fillColumns =  new java.util.BitSet ();
}, "jsjavax.swing.text.Element");
Clazz.defineMethod (c$, "clearFilledColumns", 
function () {
this.fillColumns.and (jsjavax.swing.text.TableView.EMPTY);
});
Clazz.defineMethod (c$, "fillColumn", 
function (a) {
this.fillColumns.set (a);
}, "~N");
Clazz.defineMethod (c$, "isFilled", 
function (a) {
return this.fillColumns.get (a);
}, "~N");
Clazz.defineMethod (c$, "getRow", 
function () {
return this.row;
});
Clazz.defineMethod (c$, "setRow", 
function (a) {
this.row = a;
}, "~N");
Clazz.defineMethod (c$, "getColumnCount", 
function () {
var a = 0;
var b = this.fillColumns.size ();
for (var c = 0; c < b; c++) {
if (this.fillColumns.get (c)) {
a++;
}}
return this.getViewCount () + a;
});
Clazz.defineMethod (c$, "replace", 
function (a, b, c) {
Clazz.superCall (this, jsjavax.swing.text.TableView.TableRow, "replace", [a, b, c]);
this.b$["jsjavax.swing.text.TableView"].invalidateGrid ();
}, "~N,~N,~A");
Clazz.overrideMethod (c$, "layoutMajorAxis", 
function (a, b, c, d) {
var e = 0;
var f = this.getViewCount ();
for (var g = 0; g < f; g++, e++) {
var h = this.getView (g);
for (; this.isFilled (e); e++) ;
var i = this.b$["jsjavax.swing.text.TableView"].getColumnsOccupied (h);
d[g] = this.b$["jsjavax.swing.text.TableView"].columnSpans[e];
c[g] = this.b$["jsjavax.swing.text.TableView"].columnOffsets[e];
if (i > 1) {
var j = this.b$["jsjavax.swing.text.TableView"].columnSpans.length;
for (var k = 1; k < i; k++) {
if ((e + k) < j) {
d[g] += this.b$["jsjavax.swing.text.TableView"].columnSpans[e + k];
}}
e += i - 1;
}}
}, "~N,~N,~A,~A");
Clazz.defineMethod (c$, "layoutMinorAxis", 
function (a, b, c, d) {
Clazz.superCall (this, jsjavax.swing.text.TableView.TableRow, "layoutMinorAxis", [a, b, c, d]);
var e = 0;
var f = this.getViewCount ();
for (var g = 0; g < f; g++, e++) {
var h = this.getView (g);
for (; this.isFilled (e); e++) ;
var i = this.b$["jsjavax.swing.text.TableView"].getColumnsOccupied (h);
var j = this.b$["jsjavax.swing.text.TableView"].getRowsOccupied (h);
if (j > 1) {
for (var k = 1; k < j; k++) {
var l = this.getRow () + k;
if (l < this.b$["jsjavax.swing.text.TableView"].getViewCount ()) {
var m = this.b$["jsjavax.swing.text.TableView"].getSpan (1, this.getRow () + k);
d[g] += m;
}}
}if (i > 1) {
e += i - 1;
}}
}, "~N,~N,~A,~A");
Clazz.overrideMethod (c$, "getResizeWeight", 
function (a) {
return 1;
}, "~N");
Clazz.overrideMethod (c$, "getViewAtPosition", 
function (a, b) {
var c = this.getViewCount ();
for (var d = 0; d < c; d++) {
var e = this.getView (d);
var f = e.getStartOffset ();
var g = e.getEndOffset ();
if ((a >= f) && (a < g)) {
if (b != null) {
this.childAllocation (d, b);
}return e;
}}
if (a == this.getEndOffset ()) {
var e = this.getView (c - 1);
if (b != null) {
this.childAllocation (c - 1, b);
}return e;
}return null;
}, "~N,jsjava.awt.Rectangle");
c$ = Clazz.p0p ();
};
c$.$TableView$TableCell$ = function () {
Clazz.pu$h ();
c$ = Clazz.decorateAsClass (function () {
Clazz.prepareCallback (this, arguments);
this.row = 0;
this.col = 0;
Clazz.instantialize (this, arguments);
}, jsjavax.swing.text.TableView, "TableCell", jsjavax.swing.text.BoxView, jsjavax.swing.text.TableView.GridCell);
Clazz.makeConstructor (c$, 
function (a) {
Clazz.superConstructor (this, jsjavax.swing.text.TableView.TableCell, [a, 1]);
}, "jsjavax.swing.text.Element");
Clazz.overrideMethod (c$, "getColumnCount", 
function () {
return 1;
});
Clazz.overrideMethod (c$, "getRowCount", 
function () {
return 1;
});
Clazz.overrideMethod (c$, "setGridLocation", 
function (a, b) {
this.row = a;
this.col = b;
}, "~N,~N");
Clazz.overrideMethod (c$, "getGridRow", 
function () {
return this.row;
});
Clazz.overrideMethod (c$, "getGridColumn", 
function () {
return this.col;
});
c$ = Clazz.p0p ();
};
Clazz.declareInterface (jsjavax.swing.text.TableView, "GridCell");
c$.EMPTY = c$.prototype.EMPTY =  new java.util.BitSet ();
});

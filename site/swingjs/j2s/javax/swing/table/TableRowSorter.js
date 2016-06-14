Clazz.declarePackage ("javax.swing.table");
Clazz.load (["javax.swing.DefaultRowSorter"], "javax.swing.table.TableRowSorter", null, function () {
c$ = Clazz.decorateAsClass (function () {
this.tableModel = null;
this.stringConverter = null;
if (!Clazz.isClassDefined ("javax.swing.table.TableRowSorter.TableRowSorterModelWrapper")) {
javax.swing.table.TableRowSorter.$TableRowSorter$TableRowSorterModelWrapper$ ();
}
Clazz.instantialize (this, arguments);
}, javax.swing.table, "TableRowSorter", javax.swing.DefaultRowSorter);
Clazz.makeConstructor (c$, 
function () {
this.construct (null);
});
Clazz.makeConstructor (c$, 
function (model) {
Clazz.superConstructor (this, javax.swing.table.TableRowSorter, []);
this.setModel (model);
}, "~O");
Clazz.defineMethod (c$, "setModel", 
function (model) {
this.tableModel = model;
this.setModelWrapper (Clazz.innerTypeInstance (javax.swing.table.TableRowSorter.TableRowSorterModelWrapper, this, null));
}, "~O");
Clazz.defineMethod (c$, "setStringConverter", 
function (stringConverter) {
this.stringConverter = stringConverter;
}, "javax.swing.table.TableStringConverter");
Clazz.defineMethod (c$, "getStringConverter", 
function () {
return this.stringConverter;
});
Clazz.defineMethod (c$, "getComparator", 
function (column) {
var comparator = Clazz.superCall (this, javax.swing.table.TableRowSorter, "getComparator", [column]);
if (comparator != null) {
return comparator;
}return null;
}, "~N");
Clazz.overrideMethod (c$, "useToString", 
function (column) {
var comparator = Clazz.superCall (this, javax.swing.table.TableRowSorter, "getComparator", [column]);
if (comparator != null) {
return false;
}var columnClass = this.getModel ().getColumnClass (column);
if (columnClass === String) {
return false;
}if (Comparable.isAssignableFrom (columnClass)) {
return false;
}return true;
}, "~N");
c$.$TableRowSorter$TableRowSorterModelWrapper$ = function () {
Clazz.pu$h(self.c$);
c$ = Clazz.decorateAsClass (function () {
Clazz.prepareCallback (this, arguments);
Clazz.instantialize (this, arguments);
}, javax.swing.table.TableRowSorter, "TableRowSorterModelWrapper", javax.swing.DefaultRowSorter.ModelWrapper);
Clazz.overrideMethod (c$, "getModel", 
function () {
return this.b$["javax.swing.table.TableRowSorter"].tableModel;
});
Clazz.overrideMethod (c$, "getColumnCount", 
function () {
return (this.b$["javax.swing.table.TableRowSorter"].tableModel == null) ? 0 : this.b$["javax.swing.table.TableRowSorter"].tableModel.getColumnCount ();
});
Clazz.overrideMethod (c$, "getRowCount", 
function () {
return (this.b$["javax.swing.table.TableRowSorter"].tableModel == null) ? 0 : this.b$["javax.swing.table.TableRowSorter"].tableModel.getRowCount ();
});
Clazz.overrideMethod (c$, "getValueAt", 
function (a, b) {
return this.b$["javax.swing.table.TableRowSorter"].tableModel.getValueAt (a, b);
}, "~N,~N");
Clazz.overrideMethod (c$, "getStringValueAt", 
function (a, b) {
var c = this.b$["javax.swing.table.TableRowSorter"].getStringConverter ();
if (c != null) {
var d = c.toString (this.b$["javax.swing.table.TableRowSorter"].tableModel, a, b);
if (d != null) {
return d;
}return "";
}var d = this.getValueAt (a, b);
if (d == null) {
return "";
}var e = d.toString ();
if (e == null) {
return "";
}return e;
}, "~N,~N");
Clazz.overrideMethod (c$, "getIdentifier", 
function (a) {
return a;
}, "~N");
c$ = Clazz.p0p ();
};
Clazz.pu$h(self.c$);
c$ = Clazz.declareType (javax.swing.table.TableRowSorter, "ComparableComparator", null, java.util.Comparator);
Clazz.overrideMethod (c$, "compare", 
function (a, b) {
return (a).compareTo (b);
}, "~O,~O");
c$ = Clazz.p0p ();
});

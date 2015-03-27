Clazz.declarePackage ("jsjavax.swing.table");
Clazz.load (null, "jsjavax.swing.table.TableColumn", ["java.lang.Boolean", "jsjavax.swing.UIManager", "jsjavax.swing.event.SwingPropertyChangeSupport", "jsjavax.swing.table.DefaultTableCellRenderer"], function () {
c$ = Clazz.decorateAsClass (function () {
this.modelIndex = 0;
this.identifier = null;
this.width = 0;
this.minWidth = 0;
this.preferredWidth = 0;
this.maxWidth = 0;
this.headerRenderer = null;
this.headerValue = null;
this.cellRenderer = null;
this.cellEditor = null;
this.isResizable = false;
this.resizedPostingDisableCount = 0;
this.changeSupport = null;
Clazz.instantialize (this, arguments);
}, jsjavax.swing.table, "TableColumn");
Clazz.makeConstructor (c$, 
function () {
this.construct (0);
});
Clazz.makeConstructor (c$, 
function (modelIndex) {
this.construct (modelIndex, 75, null, null);
}, "~N");
Clazz.makeConstructor (c$, 
function (modelIndex, width) {
this.construct (modelIndex, width, null, null);
}, "~N,~N");
Clazz.makeConstructor (c$, 
function (modelIndex, width, cellRenderer, cellEditor) {
this.modelIndex = modelIndex;
this.preferredWidth = this.width = Math.max (width, 0);
this.cellRenderer = cellRenderer;
this.cellEditor = cellEditor;
this.minWidth = Math.min (15, this.width);
this.maxWidth = 2147483647;
this.isResizable = true;
this.resizedPostingDisableCount = 0;
this.headerValue = null;
}, "~N,~N,jsjavax.swing.table.TableCellRenderer,jsjavax.swing.table.TableCellEditor");
Clazz.defineMethod (c$, "firePropertyChange", 
($fz = function (propertyName, oldValue, newValue) {
if (this.changeSupport != null) {
this.changeSupport.firePropertyChange (propertyName, oldValue, newValue);
}}, $fz.isPrivate = true, $fz), "~S,~O,~O");
Clazz.defineMethod (c$, "firePropertyChange", 
($fz = function (propertyName, oldValue, newValue) {
if (oldValue != newValue) {
this.firePropertyChange (propertyName,  new Integer (oldValue),  new Integer (newValue));
}}, $fz.isPrivate = true, $fz), "~S,~N,~N");
Clazz.defineMethod (c$, "firePropertyChange", 
($fz = function (propertyName, oldValue, newValue) {
if (oldValue != newValue) {
this.firePropertyChange (propertyName, Boolean.$valueOf (oldValue), Boolean.$valueOf (newValue));
}}, $fz.isPrivate = true, $fz), "~S,~B,~B");
Clazz.defineMethod (c$, "setModelIndex", 
function (modelIndex) {
var old = this.modelIndex;
this.modelIndex = modelIndex;
this.firePropertyChange ("modelIndex", old, modelIndex);
}, "~N");
Clazz.defineMethod (c$, "getModelIndex", 
function () {
return this.modelIndex;
});
Clazz.defineMethod (c$, "setIdentifier", 
function (identifier) {
var old = this.identifier;
this.identifier = identifier;
this.firePropertyChange ("identifier", old, identifier);
}, "~O");
Clazz.defineMethod (c$, "getIdentifier", 
function () {
return (this.identifier != null) ? this.identifier : this.getHeaderValue ();
});
Clazz.defineMethod (c$, "setHeaderValue", 
function (headerValue) {
var old = this.headerValue;
this.headerValue = headerValue;
this.firePropertyChange ("headerValue", old, headerValue);
}, "~O");
Clazz.defineMethod (c$, "getHeaderValue", 
function () {
return this.headerValue;
});
Clazz.defineMethod (c$, "setHeaderRenderer", 
function (headerRenderer) {
var old = this.headerRenderer;
this.headerRenderer = headerRenderer;
this.firePropertyChange ("headerRenderer", old, headerRenderer);
}, "jsjavax.swing.table.TableCellRenderer");
Clazz.defineMethod (c$, "getHeaderRenderer", 
function () {
return this.headerRenderer;
});
Clazz.defineMethod (c$, "setCellRenderer", 
function (cellRenderer) {
var old = this.cellRenderer;
this.cellRenderer = cellRenderer;
this.firePropertyChange ("cellRenderer", old, cellRenderer);
}, "jsjavax.swing.table.TableCellRenderer");
Clazz.defineMethod (c$, "getCellRenderer", 
function () {
return this.cellRenderer;
});
Clazz.defineMethod (c$, "setCellEditor", 
function (cellEditor) {
var old = this.cellEditor;
this.cellEditor = cellEditor;
this.firePropertyChange ("cellEditor", old, cellEditor);
}, "jsjavax.swing.table.TableCellEditor");
Clazz.defineMethod (c$, "getCellEditor", 
function () {
return this.cellEditor;
});
Clazz.defineMethod (c$, "setWidth", 
function (width) {
var old = this.width;
this.width = Math.min (Math.max (width, this.minWidth), this.maxWidth);
this.firePropertyChange ("width", old, this.width);
}, "~N");
Clazz.defineMethod (c$, "getWidth", 
function () {
return this.width;
});
Clazz.defineMethod (c$, "setPreferredWidth", 
function (preferredWidth) {
var old = this.preferredWidth;
this.preferredWidth = Math.min (Math.max (preferredWidth, this.minWidth), this.maxWidth);
this.firePropertyChange ("preferredWidth", old, this.preferredWidth);
}, "~N");
Clazz.defineMethod (c$, "getPreferredWidth", 
function () {
return this.preferredWidth;
});
Clazz.defineMethod (c$, "setMinWidth", 
function (minWidth) {
var old = this.minWidth;
this.minWidth = Math.max (Math.min (minWidth, this.maxWidth), 0);
if (this.width < this.minWidth) {
this.setWidth (this.minWidth);
}if (this.preferredWidth < this.minWidth) {
this.setPreferredWidth (this.minWidth);
}this.firePropertyChange ("minWidth", old, this.minWidth);
}, "~N");
Clazz.defineMethod (c$, "getMinWidth", 
function () {
return this.minWidth;
});
Clazz.defineMethod (c$, "setMaxWidth", 
function (maxWidth) {
var old = this.maxWidth;
this.maxWidth = Math.max (this.minWidth, maxWidth);
if (this.width > this.maxWidth) {
this.setWidth (this.maxWidth);
}if (this.preferredWidth > this.maxWidth) {
this.setPreferredWidth (this.maxWidth);
}this.firePropertyChange ("maxWidth", old, this.maxWidth);
}, "~N");
Clazz.defineMethod (c$, "getMaxWidth", 
function () {
return this.maxWidth;
});
Clazz.defineMethod (c$, "setResizable", 
function (isResizable) {
var old = this.isResizable;
this.isResizable = isResizable;
this.firePropertyChange ("isResizable", old, this.isResizable);
}, "~B");
Clazz.defineMethod (c$, "getResizable", 
function () {
return this.isResizable;
});
Clazz.defineMethod (c$, "sizeWidthToFit", 
function () {
if (this.headerRenderer == null) {
return;
}var c = this.headerRenderer.getTableCellRendererComponent (null, this.getHeaderValue (), false, false, 0, 0);
this.setMinWidth (c.getMinimumSize ().width);
this.setMaxWidth (c.getMaximumSize ().width);
this.setPreferredWidth (c.getPreferredSize ().width);
this.setWidth (this.getPreferredWidth ());
});
Clazz.defineMethod (c$, "disableResizedPosting", 
function () {
this.resizedPostingDisableCount++;
});
Clazz.defineMethod (c$, "enableResizedPosting", 
function () {
this.resizedPostingDisableCount--;
});
Clazz.defineMethod (c$, "addPropertyChangeListener", 
function (listener) {
if (this.changeSupport == null) {
this.changeSupport =  new jsjavax.swing.event.SwingPropertyChangeSupport (this);
}this.changeSupport.addPropertyChangeListener (listener);
}, "jsjava.beans.PropertyChangeListener");
Clazz.defineMethod (c$, "removePropertyChangeListener", 
function (listener) {
if (this.changeSupport != null) {
this.changeSupport.removePropertyChangeListener (listener);
}}, "jsjava.beans.PropertyChangeListener");
Clazz.defineMethod (c$, "getPropertyChangeListeners", 
function () {
if (this.changeSupport == null) {
return  new Array (0);
}return this.changeSupport.getPropertyChangeListeners ();
});
Clazz.defineMethod (c$, "createDefaultHeaderRenderer", 
function () {
var label = ((Clazz.isClassDefined ("jsjavax.swing.table.TableColumn$1") ? 0 : jsjavax.swing.table.TableColumn.$TableColumn$1$ ()), Clazz.innerTypeInstance (jsjavax.swing.table.TableColumn$1, this, null));
label.setHorizontalAlignment (0);
return label;
});
c$.$TableColumn$1$ = function () {
Clazz.pu$h ();
c$ = Clazz.declareAnonymous (jsjavax.swing.table, "TableColumn$1", jsjavax.swing.table.DefaultTableCellRenderer);
Clazz.overrideMethod (c$, "getTableCellRendererComponent", 
function (table, value, isSelected, hasFocus, row, column) {
if (table != null) {
var header = table.getTableHeader ();
if (header != null) {
this.setForeground (header.getForeground ());
this.setBackground (header.getBackground ());
this.setFont (header.getFont ());
}}this.setText ((value == null) ? "" : value.toString ());
this.setBorder (jsjavax.swing.UIManager.getBorder ("TableHeader.cellBorder"));
return this;
}, "jsjavax.swing.JTable,~O,~B,~B,~N,~N");
c$ = Clazz.p0p ();
};
Clazz.defineStatics (c$,
"COLUMN_WIDTH_PROPERTY", "columWidth",
"HEADER_VALUE_PROPERTY", "headerValue",
"HEADER_RENDERER_PROPERTY", "headerRenderer",
"CELL_RENDERER_PROPERTY", "cellRenderer");
});

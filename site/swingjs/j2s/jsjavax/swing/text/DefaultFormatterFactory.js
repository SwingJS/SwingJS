Clazz.declarePackage ("jsjavax.swing.text");
Clazz.load (["jsjavax.swing.JFormattedTextField"], "jsjavax.swing.text.DefaultFormatterFactory", null, function () {
c$ = Clazz.decorateAsClass (function () {
this.defaultFormat = null;
this.displayFormat = null;
this.editFormat = null;
this.nullFormat = null;
Clazz.instantialize (this, arguments);
}, jsjavax.swing.text, "DefaultFormatterFactory", jsjavax.swing.JFormattedTextField.AbstractFormatterFactory);
Clazz.makeConstructor (c$, 
function () {
Clazz.superConstructor (this, jsjavax.swing.text.DefaultFormatterFactory, []);
});
Clazz.makeConstructor (c$, 
function (defaultFormat) {
this.construct (defaultFormat, null);
}, "jsjavax.swing.JFormattedTextField.AbstractFormatter");
Clazz.makeConstructor (c$, 
function (defaultFormat, displayFormat) {
this.construct (defaultFormat, displayFormat, null);
}, "jsjavax.swing.JFormattedTextField.AbstractFormatter,jsjavax.swing.JFormattedTextField.AbstractFormatter");
Clazz.makeConstructor (c$, 
function (defaultFormat, displayFormat, editFormat) {
this.construct (defaultFormat, displayFormat, editFormat, null);
}, "jsjavax.swing.JFormattedTextField.AbstractFormatter,jsjavax.swing.JFormattedTextField.AbstractFormatter,jsjavax.swing.JFormattedTextField.AbstractFormatter");
Clazz.makeConstructor (c$, 
function (defaultFormat, displayFormat, editFormat, nullFormat) {
Clazz.superConstructor (this, jsjavax.swing.text.DefaultFormatterFactory, []);
this.defaultFormat = defaultFormat;
this.displayFormat = displayFormat;
this.editFormat = editFormat;
this.nullFormat = nullFormat;
}, "jsjavax.swing.JFormattedTextField.AbstractFormatter,jsjavax.swing.JFormattedTextField.AbstractFormatter,jsjavax.swing.JFormattedTextField.AbstractFormatter,jsjavax.swing.JFormattedTextField.AbstractFormatter");
Clazz.defineMethod (c$, "setDefaultFormatter", 
function (atf) {
this.defaultFormat = atf;
}, "jsjavax.swing.JFormattedTextField.AbstractFormatter");
Clazz.defineMethod (c$, "getDefaultFormatter", 
function () {
return this.defaultFormat;
});
Clazz.defineMethod (c$, "setDisplayFormatter", 
function (atf) {
this.displayFormat = atf;
}, "jsjavax.swing.JFormattedTextField.AbstractFormatter");
Clazz.defineMethod (c$, "getDisplayFormatter", 
function () {
return this.displayFormat;
});
Clazz.defineMethod (c$, "setEditFormatter", 
function (atf) {
this.editFormat = atf;
}, "jsjavax.swing.JFormattedTextField.AbstractFormatter");
Clazz.defineMethod (c$, "getEditFormatter", 
function () {
return this.editFormat;
});
Clazz.defineMethod (c$, "setNullFormatter", 
function (atf) {
this.nullFormat = atf;
}, "jsjavax.swing.JFormattedTextField.AbstractFormatter");
Clazz.defineMethod (c$, "getNullFormatter", 
function () {
return this.nullFormat;
});
Clazz.overrideMethod (c$, "getFormatter", 
function (source) {
var format = null;
if (source == null) {
return null;
}var value = source.getValue ();
if (value == null) {
format = this.getNullFormatter ();
}if (format == null) {
if (source.hasFocus ()) {
format = this.getEditFormatter ();
} else {
format = this.getDisplayFormatter ();
}if (format == null) {
format = this.getDefaultFormatter ();
}}return format;
}, "jsjavax.swing.JFormattedTextField");
});

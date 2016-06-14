Clazz.declarePackage ("javax.swing.text");
Clazz.load (["javax.swing.JFormattedTextField"], "javax.swing.text.DefaultFormatterFactory", null, function () {
c$ = Clazz.decorateAsClass (function () {
this.defaultFormat = null;
this.displayFormat = null;
this.editFormat = null;
this.nullFormat = null;
Clazz.instantialize (this, arguments);
}, javax.swing.text, "DefaultFormatterFactory", javax.swing.JFormattedTextField.AbstractFormatterFactory);
Clazz.makeConstructor (c$, 
function (defaultFormat, displayFormat, editFormat, nullFormat) {
Clazz.superConstructor (this, javax.swing.text.DefaultFormatterFactory, []);
{
defaultFormat || (defaultFormat = null);
displayFormat || (displayFormat = null);
editFormat || (editFormat = null);
nullFormat || (nullFormat = null);
}this.set (defaultFormat, displayFormat, editFormat, nullFormat);
}, "javax.swing.JFormattedTextField.AbstractFormatter,javax.swing.JFormattedTextField.AbstractFormatter,javax.swing.JFormattedTextField.AbstractFormatter,javax.swing.JFormattedTextField.AbstractFormatter");
Clazz.defineMethod (c$, "set", 
 function (defaultFormat, displayFormat, editFormat, nullFormat) {
this.defaultFormat = defaultFormat;
this.displayFormat = displayFormat;
this.editFormat = editFormat;
this.nullFormat = nullFormat;
return this;
}, "javax.swing.JFormattedTextField.AbstractFormatter,javax.swing.JFormattedTextField.AbstractFormatter,javax.swing.JFormattedTextField.AbstractFormatter,javax.swing.JFormattedTextField.AbstractFormatter");
Clazz.defineMethod (c$, "setDefaultFormatter", 
function (atf) {
this.defaultFormat = atf;
}, "javax.swing.JFormattedTextField.AbstractFormatter");
Clazz.defineMethod (c$, "getDefaultFormatter", 
function () {
return this.defaultFormat;
});
Clazz.defineMethod (c$, "setDisplayFormatter", 
function (atf) {
this.displayFormat = atf;
}, "javax.swing.JFormattedTextField.AbstractFormatter");
Clazz.defineMethod (c$, "getDisplayFormatter", 
function () {
return this.displayFormat;
});
Clazz.defineMethod (c$, "setEditFormatter", 
function (atf) {
this.editFormat = atf;
}, "javax.swing.JFormattedTextField.AbstractFormatter");
Clazz.defineMethod (c$, "getEditFormatter", 
function () {
return this.editFormat;
});
Clazz.defineMethod (c$, "setNullFormatter", 
function (atf) {
this.nullFormat = atf;
}, "javax.swing.JFormattedTextField.AbstractFormatter");
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
}, "javax.swing.JFormattedTextField");
});

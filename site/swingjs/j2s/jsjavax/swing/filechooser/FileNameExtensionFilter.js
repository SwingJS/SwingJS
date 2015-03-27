Clazz.declarePackage ("jsjavax.swing.filechooser");
Clazz.load (["jsjavax.swing.filechooser.FileFilter"], "jsjavax.swing.filechooser.FileNameExtensionFilter", ["java.lang.IllegalArgumentException", "java.util.Arrays", "$.Locale"], function () {
c$ = Clazz.decorateAsClass (function () {
this.description = null;
this.extensions = null;
this.lowerCaseExtensions = null;
Clazz.instantialize (this, arguments);
}, jsjavax.swing.filechooser, "FileNameExtensionFilter", jsjavax.swing.filechooser.FileFilter);
Clazz.makeConstructor (c$, 
function (description, extensions) {
Clazz.superConstructor (this, jsjavax.swing.filechooser.FileNameExtensionFilter, []);
if (extensions == null || extensions.length == 0) {
throw  new IllegalArgumentException ("Extensions must be non-null and not empty");
}this.description = description;
this.extensions =  new Array (extensions.length);
this.lowerCaseExtensions =  new Array (extensions.length);
for (var i = 0; i < extensions.length; i++) {
if (extensions[i] == null || extensions[i].length == 0) {
throw  new IllegalArgumentException ("Each extension must be non-null and not empty");
}this.extensions[i] = extensions[i];
this.lowerCaseExtensions[i] = extensions[i].toLowerCase (java.util.Locale.ENGLISH);
}
}, "~S,~A");
Clazz.overrideMethod (c$, "accept", 
function (f) {
if (f != null) {
if (f.isDirectory ()) {
return true;
}var fileName = f.getName ();
var i = fileName.lastIndexOf ('.');
if (i > 0 && i < fileName.length - 1) {
var desiredExtension = fileName.substring (i + 1).toLowerCase (java.util.Locale.ENGLISH);
for (var extension, $extension = 0, $$extension = this.lowerCaseExtensions; $extension < $$extension.length && ((extension = $$extension[$extension]) || true); $extension++) {
if (desiredExtension.equals (extension)) {
return true;
}}
}}return false;
}, "java.io.File");
Clazz.overrideMethod (c$, "getDescription", 
function () {
return this.description;
});
Clazz.defineMethod (c$, "getExtensions", 
function () {
var result =  new Array (this.extensions.length);
System.arraycopy (this.extensions, 0, result, 0, this.extensions.length);
return result;
});
Clazz.defineMethod (c$, "toString", 
function () {
return Clazz.superCall (this, jsjavax.swing.filechooser.FileNameExtensionFilter, "toString", []) + "[description=" + this.getDescription () + " extensions=" + java.util.Arrays.asList (this.getExtensions ()) + "]";
});
});

Clazz.declarePackage ("sun.awt.shell");
Clazz.load (["sun.awt.shell.ShellFolder"], "sun.awt.shell.ShellFolderManager", ["java.io.File", "java.lang.Long", "java.util.Collections", "$.Date", "sun.awt.shell.DefaultShellFolder", "$.ShellFolderColumnInfo"], function () {
c$ = Clazz.decorateAsClass (function () {
this.fileComparator = null;
Clazz.instantialize (this, arguments);
}, sun.awt.shell, "ShellFolderManager");
Clazz.prepareFields (c$, function () {
this.fileComparator = ((Clazz.isClassDefined ("sun.awt.shell.ShellFolderManager$1") ? 0 : sun.awt.shell.ShellFolderManager.$ShellFolderManager$1$ ()), Clazz.innerTypeInstance (sun.awt.shell.ShellFolderManager$1, this, null));
});
Clazz.defineMethod (c$, "createShellFolder", 
function (file) {
return  new sun.awt.shell.DefaultShellFolder (null, file);
}, "java.io.File");
Clazz.defineMethod (c$, "get", 
function (key) {
if (key.equals ("fileChooserDefaultFolder")) {
var homeDir =  new java.io.File (System.getProperty ("user.home"));
try {
return this.createShellFolder (homeDir);
} catch (e) {
if (Clazz.exceptionOf (e, java.io.FileNotFoundException)) {
return homeDir;
} else {
throw e;
}
}
} else if (key.equals ("roots")) {
return java.io.File.listRoots ();
} else if (key.equals ("fileChooserComboBoxFolders")) {
return this.get ("roots");
} else if (key.equals ("fileChooserShortcutPanelFolders")) {
return [this.get ("fileChooserDefaultFolder")];
}return null;
}, "~S");
Clazz.defineMethod (c$, "isComputerNode", 
function (dir) {
return false;
}, "java.io.File");
Clazz.defineMethod (c$, "isFileSystemRoot", 
function (dir) {
if (Clazz.instanceOf (dir, sun.awt.shell.ShellFolder) && !(dir).isFileSystem ()) {
return false;
}return (dir.getParentFile () == null);
}, "java.io.File");
Clazz.defineMethod (c$, "sortFiles", 
function (files) {
java.util.Collections.sort (files, this.fileComparator);
}, "java.util.List");
Clazz.defineMethod (c$, "getFolderColumns", 
function (dir) {
var columns = null;
if (Clazz.instanceOf (dir, sun.awt.shell.ShellFolder)) {
columns = (dir).getFolderColumns ();
}if (columns == null) {
columns = [ new sun.awt.shell.ShellFolderColumnInfo ("FileChooser.fileNameHeaderText", new Integer (150), new Integer (10), true, null, this.fileComparator),  new sun.awt.shell.ShellFolderColumnInfo ("FileChooser.fileSizeHeaderText", new Integer (75), new Integer (4), true, null, sun.awt.shell.ShellFolderManager.ComparableComparator.getInstance (), true),  new sun.awt.shell.ShellFolderColumnInfo ("FileChooser.fileDateHeaderText", new Integer (130), new Integer (10), true, null, sun.awt.shell.ShellFolderManager.ComparableComparator.getInstance (), true)];
}return columns;
}, "java.io.File");
Clazz.defineMethod (c$, "getFolderColumnValue", 
function (file, column) {
if (Clazz.instanceOf (file, sun.awt.shell.ShellFolder)) {
var value = (file).getFolderColumnValue (column);
if (value != null) {
return value;
}}if (file == null || !file.exists ()) {
return null;
}switch (column) {
case 0:
return file;
case 1:
return file.isDirectory () ? null :  new Long (file.length ());
case 2:
if (this.isFileSystemRoot (file)) {
return null;
}var time = file.lastModified ();
return (time == 0) ? null :  new java.util.Date (time);
default:
return null;
}
}, "java.io.File,~N");
c$.$ShellFolderManager$1$ = function () {
Clazz.pu$h(self.c$);
c$ = Clazz.declareAnonymous (sun.awt.shell, "ShellFolderManager$1", null, java.util.Comparator);
Clazz.defineMethod (c$, "compare", 
function (a, b) {
return this.compare (a, b);
}, "~O,~O");
Clazz.defineMethod (c$, "compare", 
function (f1, f2) {
var sf1 = null;
var sf2 = null;
if (Clazz.instanceOf (f1, sun.awt.shell.ShellFolder)) {
sf1 = f1;
if (sf1.isFileSystem ()) {
sf1 = null;
}}if (Clazz.instanceOf (f2, sun.awt.shell.ShellFolder)) {
sf2 = f2;
if (sf2.isFileSystem ()) {
sf2 = null;
}}if (sf1 != null && sf2 != null) {
return sf1.compareTo (sf2);
} else if (sf1 != null) {
return -1;
} else if (sf2 != null) {
return 1;
} else {
var name1 = f1.getName ();
var name2 = f2.getName ();
var diff = name1.toLowerCase ().compareTo (name2.toLowerCase ());
if (diff != 0) {
return diff;
} else {
return name1.compareTo (name2);
}}}, "java.io.File,java.io.File");
c$ = Clazz.p0p ();
};
Clazz.pu$h(self.c$);
c$ = Clazz.declareType (sun.awt.shell.ShellFolderManager, "ComparableComparator", null, java.util.Comparator);
c$.getInstance = Clazz.defineMethod (c$, "getInstance", 
function () {
if (sun.awt.shell.ShellFolderManager.ComparableComparator.instance == null) {
sun.awt.shell.ShellFolderManager.ComparableComparator.instance =  new sun.awt.shell.ShellFolderManager.ComparableComparator ();
}return sun.awt.shell.ShellFolderManager.ComparableComparator.instance;
});
Clazz.overrideMethod (c$, "compare", 
function (a, b) {
var c;
if (a == null && b == null) {
c = 0;
} else if (a != null && b == null) {
c = 1;
} else if (a == null && b != null) {
c = -1;
} else if (Clazz.instanceOf (a, Comparable)) {
c = (a).compareTo (b);
} else {
c = 0;
}return c;
}, "~O,~O");
Clazz.defineStatics (c$,
"instance", null);
c$ = Clazz.p0p ();
Clazz.defineStatics (c$,
"COLUMN_NAME", "FileChooser.fileNameHeaderText",
"COLUMN_SIZE", "FileChooser.fileSizeHeaderText",
"COLUMN_DATE", "FileChooser.fileDateHeaderText");
});

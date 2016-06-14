Clazz.declarePackage ("jssun.awt.shell");
Clazz.load (["java.io.File"], "jssun.awt.shell.ShellFolder", ["java.io.FileNotFoundException", "java.lang.Error", "java.util.Vector", "java.awt.Toolkit", "jssun.awt.shell.ShellFolderManager"], function () {
c$ = Clazz.decorateAsClass (function () {
this.parent = null;
Clazz.instantialize (this, arguments);
}, jssun.awt.shell, "ShellFolder", java.io.File);
Clazz.makeConstructor (c$, 
function (parent, pathname) {
Clazz.superConstructor (this, jssun.awt.shell.ShellFolder, [(pathname != null) ? pathname : "ShellFolder"]);
this.parent = parent;
}, "jssun.awt.shell.ShellFolder,~S");
Clazz.defineMethod (c$, "isFileSystem", 
function () {
return (!this.getPath ().startsWith ("ShellFolder"));
});
Clazz.defineMethod (c$, "getParent", 
function () {
if (this.parent == null && this.isFileSystem ()) {
return Clazz.superCall (this, jssun.awt.shell.ShellFolder, "getParent", []);
}if (this.parent != null) {
return (this.parent.getPath ());
} else {
return null;
}});
Clazz.defineMethod (c$, "getParentFile", 
function () {
if (this.parent != null) {
return this.parent;
} else if (this.isFileSystem ()) {
return Clazz.superCall (this, jssun.awt.shell.ShellFolder, "getParentFile", []);
} else {
return null;
}});
Clazz.defineMethod (c$, "listFiles", 
function () {
return this.listFiles (true);
});
Clazz.defineMethod (c$, "listFiles", 
function (includeHiddenFiles) {
var files = Clazz.superCall (this, jssun.awt.shell.ShellFolder, "listFiles", []);
if (!includeHiddenFiles) {
var v =  new java.util.Vector ();
var nameCount = (files == null) ? 0 : files.length;
for (var i = 0; i < nameCount; i++) {
if (!files[i].isHidden ()) {
v.addElement (files[i]);
}}
files = v.toArray ( new Array (v.size ()));
}return files;
}, "~B");
Clazz.defineMethod (c$, "compareTo", 
function (file2) {
if (file2 == null || !(Clazz.instanceOf (file2, jssun.awt.shell.ShellFolder)) || ((Clazz.instanceOf (file2, jssun.awt.shell.ShellFolder)) && (file2).isFileSystem ())) {
if (this.isFileSystem ()) {
return Clazz.superCall (this, jssun.awt.shell.ShellFolder, "compareTo", [file2]);
} else {
return -1;
}} else {
if (this.isFileSystem ()) {
return 1;
} else {
return this.getName ().compareTo (file2.getName ());
}}}, "java.io.File");
Clazz.defineMethod (c$, "getIcon", 
function (getLargeIcon) {
return null;
}, "~B");
c$.getShellFolder = Clazz.defineMethod (c$, "getShellFolder", 
function (file) {
if (Clazz.instanceOf (file, jssun.awt.shell.ShellFolder)) {
return file;
}if (!file.exists ()) {
throw  new java.io.FileNotFoundException ();
}return jssun.awt.shell.ShellFolder.shellFolderManager.createShellFolder (file);
}, "java.io.File");
c$.get = Clazz.defineMethod (c$, "get", 
function (key) {
return jssun.awt.shell.ShellFolder.shellFolderManager.get (key);
}, "~S");
c$.isComputerNode = Clazz.defineMethod (c$, "isComputerNode", 
function (dir) {
return jssun.awt.shell.ShellFolder.shellFolderManager.isComputerNode (dir);
}, "java.io.File");
c$.isFileSystemRoot = Clazz.defineMethod (c$, "isFileSystemRoot", 
function (dir) {
return jssun.awt.shell.ShellFolder.shellFolderManager.isFileSystemRoot (dir);
}, "java.io.File");
c$.getNormalizedFile = Clazz.defineMethod (c$, "getNormalizedFile", 
function (f) {
var canonical = f.getCanonicalFile ();
if (f.equals (canonical)) {
return canonical;
}return  new java.io.File (f.toURI ().normalize ());
}, "java.io.File");
c$.sortFiles = Clazz.defineMethod (c$, "sortFiles", 
function (files) {
jssun.awt.shell.ShellFolder.shellFolderManager.sortFiles (files);
}, "java.util.List");
Clazz.defineMethod (c$, "isAbsolute", 
function () {
return (!this.isFileSystem () || Clazz.superCall (this, jssun.awt.shell.ShellFolder, "isAbsolute", []));
});
Clazz.defineMethod (c$, "getAbsoluteFile", 
function () {
return (this.isFileSystem () ? Clazz.superCall (this, jssun.awt.shell.ShellFolder, "getAbsoluteFile", []) : this);
});
Clazz.defineMethod (c$, "canRead", 
function () {
return (this.isFileSystem () ? Clazz.superCall (this, jssun.awt.shell.ShellFolder, "canRead", []) : true);
});
Clazz.defineMethod (c$, "canWrite", 
function () {
return (this.isFileSystem () ? Clazz.superCall (this, jssun.awt.shell.ShellFolder, "canWrite", []) : false);
});
Clazz.defineMethod (c$, "exists", 
function () {
return (!this.isFileSystem () || jssun.awt.shell.ShellFolder.isFileSystemRoot (this) || Clazz.superCall (this, jssun.awt.shell.ShellFolder, "exists", []));
});
Clazz.defineMethod (c$, "isDirectory", 
function () {
return (this.isFileSystem () ? Clazz.superCall (this, jssun.awt.shell.ShellFolder, "isDirectory", []) : true);
});
Clazz.defineMethod (c$, "isFile", 
function () {
return (this.isFileSystem () ? Clazz.superCall (this, jssun.awt.shell.ShellFolder, "isFile", []) : !this.isDirectory ());
});
Clazz.defineMethod (c$, "lastModified", 
function () {
return (this.isFileSystem () ? Clazz.superCall (this, jssun.awt.shell.ShellFolder, "lastModified", []) : 0);
});
Clazz.defineMethod (c$, "length", 
function () {
return (this.isFileSystem () ? Clazz.superCall (this, jssun.awt.shell.ShellFolder, "length", []) : 0);
});
Clazz.defineMethod (c$, "createNewFile", 
function () {
return (this.isFileSystem () ? Clazz.superCall (this, jssun.awt.shell.ShellFolder, "createNewFile", []) : false);
});
Clazz.defineMethod (c$, "$delete", 
function () {
return (this.isFileSystem () ? Clazz.superCall (this, jssun.awt.shell.ShellFolder, "delete", []) : false);
});
Clazz.defineMethod (c$, "deleteOnExit", 
function () {
if (this.isFileSystem ()) {
Clazz.superCall (this, jssun.awt.shell.ShellFolder, "deleteOnExit", []);
} else {
}});
Clazz.defineMethod (c$, "mkdir", 
function () {
return (this.isFileSystem () ? Clazz.superCall (this, jssun.awt.shell.ShellFolder, "mkdir", []) : false);
});
Clazz.defineMethod (c$, "mkdirs", 
function () {
return (this.isFileSystem () ? Clazz.superCall (this, jssun.awt.shell.ShellFolder, "mkdirs", []) : false);
});
Clazz.defineMethod (c$, "renameTo", 
function (dest) {
return (this.isFileSystem () ? Clazz.superCall (this, jssun.awt.shell.ShellFolder, "renameTo", [dest]) : false);
}, "java.io.File");
Clazz.defineMethod (c$, "setLastModified", 
function (time) {
return (this.isFileSystem () ? Clazz.superCall (this, jssun.awt.shell.ShellFolder, "setLastModified", [time]) : false);
}, "~N");
Clazz.defineMethod (c$, "setReadOnly", 
function () {
return (this.isFileSystem () ? Clazz.superCall (this, jssun.awt.shell.ShellFolder, "setReadOnly", []) : false);
});
Clazz.defineMethod (c$, "toString", 
function () {
return (this.isFileSystem () ? Clazz.superCall (this, jssun.awt.shell.ShellFolder, "toString", []) : this.getDisplayName ());
});
c$.getFolderColumns = Clazz.defineMethod (c$, "getFolderColumns", 
function (dir) {
return jssun.awt.shell.ShellFolder.shellFolderManager.getFolderColumns (dir);
}, "java.io.File");
c$.getFolderColumnValue = Clazz.defineMethod (c$, "getFolderColumnValue", 
function (file, column) {
return jssun.awt.shell.ShellFolder.shellFolderManager.getFolderColumnValue (file, column);
}, "java.io.File,~N");
Clazz.defineMethod (c$, "getFolderColumns", 
function () {
return null;
});
Clazz.defineMethod (c$, "getFolderColumnValue", 
function (column) {
return null;
}, "~N");
Clazz.defineStatics (c$,
"shellFolderManager", null);
{
var managerClass = java.awt.Toolkit.getDefaultToolkit ().getDesktopProperty ("Shell.shellFolderManager");
if (managerClass == null) {
managerClass = jssun.awt.shell.ShellFolderManager;
}try {
jssun.awt.shell.ShellFolder.shellFolderManager = managerClass.newInstance ();
} catch (e$$) {
if (Clazz.exceptionOf (e$$, InstantiationException)) {
var e = e$$;
{
throw  new Error ("Could not instantiate Shell Folder Manager: " + managerClass.getName ());
}
} else if (Clazz.exceptionOf (e$$, IllegalAccessException)) {
var e = e$$;
{
throw  new Error ("Could not access Shell Folder Manager: " + managerClass.getName ());
}
} else {
throw e$$;
}
}
}});

var path = ClazzLoader.getClasspathFor ("jsjavax.swing.tree.package");
path = path.substring (0, path.lastIndexOf ("package.js"));
ClazzLoader.jarClasspath (path + "DefaultTreeSelectionModel.js", [
"jsjavax.swing.tree.PathPlaceHolder",
"$.DefaultTreeSelectionModel"]);

var path = ClazzLoader.getClasspathFor ("javax.swing.tree.package");
path = path.substring (0, path.lastIndexOf ("package.js"));
ClazzLoader.jarClasspath (path + "DefaultTreeSelectionModel.js", [
"javax.swing.tree.DefaultTreeSelectionModel",
"$.PathPlaceHolder"]);

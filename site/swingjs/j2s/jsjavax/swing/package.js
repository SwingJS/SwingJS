var path = ClazzLoader.getClasspathFor ("jsjavax.swing.package");
path = path.substring (0, path.lastIndexOf ("package.js"));
ClazzLoader.jarClasspath (path + "JColorChooser.js", [
"jsjavax.swing.ColorTracker",
"$.ColorChooserDialog",
"$.JColorChooser"]);

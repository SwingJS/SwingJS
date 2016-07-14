var path = ClazzLoader.getClasspathFor ("javax.swing.package");
path = path.substring (0, path.lastIndexOf ("package.js"));
ClazzLoader.jarClasspath (path + "JColorChooser.js", [
"javax.swing.ColorChooserDialog",
"$.ColorTracker",
"$.JColorChooser"]);

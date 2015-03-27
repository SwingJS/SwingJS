var path = ClazzLoader.getClasspathFor ("jsjava.text.package");
path = path.substring (0, path.lastIndexOf ("package.js"));
ClazzLoader.jarClasspath (path + "AttributedString.js", [
"jsjava.text.AttributedString",
"$.AttributeEntry"]);

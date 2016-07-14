var path = ClazzLoader.getClasspathFor ("test.oracle.package");
path = path.substring (0, path.lastIndexOf ("package.js"));
ClazzLoader.jarClasspath (path + "SeeThroughImageApplet.js", [
"test.oracle.SeeThroughImageApplet",
"$.SeeThroughComponent"]);
ClazzLoader.jarClasspath (path + "JumbledImageApplet.js", [
"test.oracle.JumbledImageApplet",
"$.JumbledImage"]);

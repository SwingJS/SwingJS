var path = ClazzLoader.getClasspathFor ("jsjava.awt.geom.package");
path = path.substring (0, path.lastIndexOf ("package.js"));
ClazzLoader.jarClasspath (path + "Area.js", [
"jsjava.awt.geom.Area",
"$.AreaIterator"]);

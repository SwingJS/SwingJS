var path = ClazzLoader.getClasspathFor ("jssun.awt.package");
path = path.substring (0, path.lastIndexOf ("package.js"));
ClazzLoader.jarClasspath (path + "AppContext.js", [
"jssun.awt.MostRecentKeyValue",
"$.MostRecentThreadAppContext",
"$.AppContext"]);

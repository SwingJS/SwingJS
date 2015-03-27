var path = ClazzLoader.getClasspathFor ("jssun.awt.package");
path = path.substring (0, path.lastIndexOf ("package.js"));
ClazzLoader.jarClasspath (path + "SunToolkit.js", [
"jssun.awt.EventQueueItem",
"$.PostEventQueue",
"$.SunToolkit"]);
ClazzLoader.jarClasspath (path + "AppContext.js", [
"jssun.awt.AppContext",
"$.MostRecentThreadAppContext",
"$.MostRecentKeyValue"]);

var path = ClazzLoader.getClasspathFor ("jsjava.awt.package");
path = path.substring (0, path.lastIndexOf ("package.js"));
ClazzLoader.jarClasspath (path + "Window.js", [
"jsjava.awt.Window",
"$.FocusManager"]);
ClazzLoader.jarClasspath (path + "EventQueue.js", [
"jsjava.awt.EventQueueItem",
"$.EventQueue",
"$.Queue"]);
ClazzLoader.jarClasspath (path + "Container.js", [
"jsjava.awt.LightweightDispatcher",
"$.Container"]);
ClazzLoader.jarClasspath (path + "AWTKeyStroke.js", [
"jsjava.awt.AWTKeyStroke",
"$.VKCollection"]);

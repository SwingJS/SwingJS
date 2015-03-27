var path = ClazzLoader.getClasspathFor ("jssun.misc.package");
path = path.substring (0, path.lastIndexOf ("package.js"));
ClazzLoader.jarClasspath (path + "Queue.js", [
"jssun.misc.Queue",
"$.LIFOQueueEnumerator",
"$.FIFOQueueEnumerator",
"$.QueueElement"]);

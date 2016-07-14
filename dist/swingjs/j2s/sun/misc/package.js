var path = ClazzLoader.getClasspathFor ("sun.misc.package");
path = path.substring (0, path.lastIndexOf ("package.js"));
ClazzLoader.jarClasspath (path + "Queue.js", [
"sun.misc.FIFOQueueEnumerator",
"$.Queue",
"$.LIFOQueueEnumerator",
"$.QueueElement"]);

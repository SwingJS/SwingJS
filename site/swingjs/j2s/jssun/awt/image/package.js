var path = ClazzLoader.getClasspathFor ("jssun.awt.image.package");
path = path.substring (0, path.lastIndexOf ("package.js"));
ClazzLoader.jarClasspath (path + "ImageFetcher.js", [
"jssun.awt.image.FetcherInfo",
"$.ImageFetcher"]);

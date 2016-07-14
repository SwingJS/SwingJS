var path = ClazzLoader.getClasspathFor ("org.uwi.package");
path = path.substring (0, path.lastIndexOf ("package.js"));
ClazzLoader.jarClasspath (path + "TanSugd3S.js", [
"org.uwi.TSd3Controls",
"$.TanSugd3S",
"$.TSd3Canvas"]);

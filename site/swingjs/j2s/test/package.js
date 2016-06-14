var path = ClazzLoader.getClasspathFor ("test.package");
path = path.substring (0, path.lastIndexOf ("package.js"));
ClazzLoader.jarClasspath (path + "Test_3.js", [
"test.Test_3Controls",
"$.Test_3Canvas",
"$.Test_3"]);
ClazzLoader.jarClasspath (path + "Test_2.js", [
"test.Test_2Canvas",
"$.Test_2",
"$.Test_2Controls"]);
ClazzLoader.jarClasspath (path + "BugTest.js", [
"test.B",
"$.A",
"$.BugTest"]);

var path = ClazzLoader.getClasspathFor ("test.Circuit.package");
path = path.substring (0, path.lastIndexOf ("package.js"));
ClazzLoader.jarClasspath (path + "NJfetElm.js", [
"test.Circuit.PJfetElm",
"$.NJfetElm"]);
ClazzLoader.jarClasspath (path + "EditDialog.js", [
"test.Circuit.EditDialog",
"$.Editable"]);
ClazzLoader.jarClasspath (path + "CC2Elm.js", [
"test.Circuit.CC2Elm",
"$.CC2NegElm"]);

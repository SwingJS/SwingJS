var path = ClazzLoader.getClasspathFor ("test.falstad.package");
path = path.substring (0, path.lastIndexOf ("package.js"));
ClazzLoader.jarClasspath (path + "WaveBox.js", [
"test.falstad.WaveBoxCanvas",
"$.WaveBoxLayout",
"$.WaveBoxFrame",
"$.WaveBox"]);
ClazzLoader.jarClasspath (path + "Wave2d.js", [
"test.falstad.FFT",
"$.Wave2d",
"$.Wave2dCanvas",
"$.Wave2dFrame",
"$.Wave2dLayout"]);
ClazzLoader.jarClasspath (path + "Test.js", [
"test.falstad.Test",
"$.AtomFrame"]);
ClazzLoader.jarClasspath (path + "Ripple.js", [
"test.falstad.RippleCanvas",
"$.RippleLayout",
"$.RippleFrame",
"$.Ripple"]);
ClazzLoader.jarClasspath (path + "MOViewer.js", [
"test.falstad.MOViewer",
"$.MOViewerFrame",
"$.MOViewerCanvas",
"$.MOViewerLayout"]);
ClazzLoader.jarClasspath (path + "AtomViewer.js", [
"test.falstad.AtomViewerCanvas",
"$.AtomViewerLayout",
"$.AtomViewerFrame",
"$.AtomViewer"]);
ClazzLoader.jarClasspath (path + "ModeBox.js", [
"test.falstad.ModeBoxCanvas",
"$.ModeBoxFrame",
"$.ModeBoxLayout",
"$.ModeBox"]);

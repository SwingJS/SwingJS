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
ClazzLoader.jarClasspath (path + "Vowel.js", [
"test.falstad.VowelCanvas",
"$.VowelLayout",
"$.Vowel",
"$.VowelFrame"]);
ClazzLoader.jarClasspath (path + "Test.js", [
"test.falstad.Test",
"$.AtomFrame"]);
ClazzLoader.jarClasspath (path + "StringWave.js", [
"test.falstad.StringWave",
"$.StringWaveFrame"]);
ClazzLoader.jarClasspath (path + "Ripple.js", [
"test.falstad.RippleCanvas",
"$.RippleLayout",
"$.RippleFrame",
"$.Ripple"]);
ClazzLoader.jarClasspath (path + "QuantumRotator.js", [
"test.falstad.QuantumRotatorFrame",
"$.QuantumRotatorLayout",
"$.QuantumRotator",
"$.FFT5",
"$.QuantumRotatorCanvas"]);
ClazzLoader.jarClasspath (path + "QuantumOsc3d.js", [
"test.falstad.QuantumOsc3dFrame",
"$.QuantumOsc3d",
"$.QuantumOsc3dLayout",
"$.QuantumOsc3dCanvas"]);
ClazzLoader.jarClasspath (path + "QuantumOsc.js", [
"test.falstad.QuantumOscFrame",
"$.QuantumOscLayout",
"$.QuantumOscCanvas",
"$.QuantumOsc"]);
ClazzLoader.jarClasspath (path + "QuantumCirc.js", [
"test.falstad.QuantumCirc",
"$.QuantumCircFrame",
"$.QuantumCircLayout",
"$.QuantumCircCanvas"]);
ClazzLoader.jarClasspath (path + "ModeBox.js", [
"test.falstad.ModeBoxCanvas",
"$.ModeBoxFrame",
"$.ModeBoxLayout",
"$.ModeBox"]);
ClazzLoader.jarClasspath (path + "MOViewer.js", [
"test.falstad.MOViewer",
"$.MOViewerFrame",
"$.MOViewerCanvas",
"$.MOViewerLayout"]);
ClazzLoader.jarClasspath (path + "Interference.js", [
"test.falstad.InterferenceCanvas",
"$.Interference",
"$.InterferenceFrame",
"$.InterferenceLayout"]);
ClazzLoader.jarClasspath (path + "Gas.js", [
"test.falstad.HistogramCanvas",
"$.GasCanvas",
"$.Gas",
"$.GasLayout"]);
ClazzLoader.jarClasspath (path + "Fourier.js", [
"test.falstad.Fourier",
"$.FourierFrame",
"$.FFT3",
"$.FourierCanvas",
"$.FourierLayout"]);
ClazzLoader.jarClasspath (path + "EMWave2.js", [
"test.falstad.EMWave2",
"$.EMWave2Canvas",
"$.EMWave2Layout",
"$.EMWave2Frame"]);
ClazzLoader.jarClasspath (path + "EMWave1.js", [
"test.falstad.EMWave1Layout",
"$.EMWave1",
"$.EMWave1Canvas",
"$.EMWave1Frame"]);
ClazzLoader.jarClasspath (path + "EMStatic.js", [
"test.falstad.EMStatic",
"$.EMStaticCanvas",
"$.EMStaticFrame",
"$.EMStaticLayout"]);
ClazzLoader.jarClasspath (path + "EMBox.js", [
"test.falstad.EMBox",
"$.EMBoxCanvas",
"$.EMBoxFrame",
"$.EMBoxLayout"]);
ClazzLoader.jarClasspath (path + "DotProduct.js", [
"test.falstad.DotProductLayout",
"$.DotProduct",
"$.DotProductCanvas"]);
ClazzLoader.jarClasspath (path + "Diffraction.js", [
"test.falstad.DiffractionFrame",
"$.DiffractionLayout",
"$.Diffraction",
"$.DiffractionCanvas"]);
ClazzLoader.jarClasspath (path + "CircOsc.js", [
"test.falstad.CircOscCanvas",
"$.CircOscFrame",
"$.CircOsc",
"$.CircOscLayout"]);
ClazzLoader.jarClasspath (path + "BarWaves.js", [
"test.falstad.BarWaves",
"$.BarWavesFrame"]);
ClazzLoader.jarClasspath (path + "AtomViewer.js", [
"test.falstad.AtomViewerCanvas",
"$.AtomViewerLayout",
"$.AtomViewerFrame",
"$.AtomViewer"]);

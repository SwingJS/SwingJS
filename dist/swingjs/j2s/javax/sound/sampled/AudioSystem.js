Clazz.declarePackage ("javax.sound.sampled");
Clazz.load (null, "javax.sound.sampled.AudioSystem", ["java.lang.IllegalArgumentException", "javax.sound.sampled.UnsupportedAudioFileException", "swingjs.JSAudio", "$.JSToolkit"], function () {
c$ = Clazz.declareType (javax.sound.sampled, "AudioSystem");
c$.getLine = Clazz.defineMethod (c$, "getLine", 
function (info) {
var line = swingjs.JSToolkit.getAudioLine (info);
if (line != null) return line;
throw  new IllegalArgumentException ("No line matching " + info.toString () + " is supported.");
}, "javax.sound.sampled.Line.Info");
c$.getAudioInputStream = Clazz.defineMethod (c$, "getAudioInputStream", 
function (stream) {
return swingjs.JSAudio.getAudioInputStream (stream);
}, "java.io.ByteArrayInputStream");
Clazz.defineStatics (c$,
"NOT_SPECIFIED", -1);
});

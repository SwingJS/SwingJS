Clazz.declarePackage ("swingjs");
Clazz.load (null, "swingjs.JSAudio", ["java.util.Hashtable", "JU.Base64", "$.BinaryDocument", "$.OC", "javax.sound.sampled.AudioFormat", "$.UnsupportedAudioFileException", "swingjs.JSAudioInputStream", "$.JSAudioLine", "swingjs.api.DOMNode"], function () {
c$ = Clazz.declareType (swingjs, "JSAudio");
Clazz.makeConstructor (c$, 
function () {
});
Clazz.defineMethod (c$, "getAudioLine", 
function (info) {
return  new swingjs.JSAudioLine (info);
}, "javax.sound.sampled.Line.Info");
Clazz.defineMethod (c$, "playAudioFile", 
function (fileData, fileFormat) {
var props =  new java.util.Hashtable ();
props.put ("fileFormat", fileFormat);
this.playAudio (fileData,  new javax.sound.sampled.AudioFormat (null, -1, -1, -1, -1, -1, false, props));
}, "~A,~S");
Clazz.defineMethod (c$, "playAudio", 
function (data, audioFormat) {
var format = audioFormat.getProperty ("fileFormat");
if (format == null) {
data = this.createWaveData (data, audioFormat);
format = "wave";
}if (data == null) return false;
swingjs.api.DOMNode.playWav ("data:audio/" + format.toLowerCase () + ";base64," + JU.Base64.getBase64 (data));
return true;
}, "~A,javax.sound.sampled.AudioFormat");
Clazz.defineMethod (c$, "createWaveData", 
function (data, af) {
var spsec = Clazz.floatToInt (af.getSampleRate ());
var bitsPerSample = af.getSampleSizeInBits ();
var bytesPerSample = Clazz.doubleToInt (bitsPerSample / 8);
try {
switch (spsec) {
case 8000:
case 11025:
case 16000:
case 22050:
case 44100:
break;
default:
throw  new javax.sound.sampled.UnsupportedAudioFileException ("sample rate of " + spsec + " must be one of 8000,11025,1600,22050,44100");
}
var b;
var fmt = 0;
var format = af.getEncoding ().toString ();
switch ("PCM_SIGNED     PCM_UNSIGNED   PCM_FLOAT      ULAW           ALAW           ".indexOf (format)) {
case 0:
switch (bitsPerSample) {
case 8:
fmt = 7;
data = swingjs.JSAudio.toULaw (data);
break;
case 16:
fmt = 1;
if (af.isBigEndian ()) data = swingjs.JSAudio.toLittleEndian (data);
break;
}
break;
case 45:
if (bitsPerSample == 8) fmt = 7;
break;
}
if (fmt == 0) throw  new javax.sound.sampled.UnsupportedAudioFileException ("unsupported format " + bitsPerSample + "-bit " + format);
var nchannels = 1;
var bytesPerSecond = spsec * nchannels * bytesPerSample;
var outFile =  new JU.BinaryDocument ();
var out =  new JU.OC ();
out.setBigEndian (false);
outFile.setOutputChannel (out);
outFile.writeString ("RIFF");
outFile.writeInt (36 + data.length);
outFile.writeString ("WAVE");
outFile.writeString ("fmt ");
outFile.writeInt (16);
outFile.writeShort (fmt);
outFile.writeShort (1);
outFile.writeInt (spsec);
outFile.writeInt (bytesPerSecond);
outFile.writeShort (bytesPerSample);
outFile.writeShort ((bitsPerSample));
outFile.writeString ("data");
outFile.writeInt (data.length);
outFile.writeBytes (data, 0, data.length);
return out.toByteArray ();
} catch (e) {
if (Clazz.exceptionOf (e, java.io.IOException)) {
return null;
} else {
throw e;
}
}
}, "~A,javax.sound.sampled.AudioFormat");
c$.toLittleEndian = Clazz.defineMethod (c$, "toLittleEndian", 
function (data) {
var b =  Clazz.newByteArray (data.length, 0);
for (var i = data.length; --i > 0; --i) {
b[i - 1] = data[i];
b[i] = data[i - 1];
}
return b;
}, "~A");
c$.toULaw = Clazz.defineMethod (c$, "toULaw", 
function (data) {
var b =  Clazz.newByteArray (data.length, 0);
System.arraycopy (data, 0, b, 0, b.length);
for (var i = b.length; --i >= 0; ) b[i] = swingjs.JSAudio.to_ulaw[128 + b[i]];

return b;
}, "~A");
c$.getAudioInputStream = Clazz.defineMethod (c$, "getAudioInputStream", 
function (stream) {
var format = null;
stream.mark (10);
var b =  Clazz.newByteArray (10, 0);
try {
stream.read (b);
} catch (e) {
if (Clazz.exceptionOf (e, java.io.IOException)) {
} else {
throw e;
}
}
stream.reset ();
var props =  new java.util.Hashtable ();
var fmt = null;
if (swingjs.JSAudio.isWave (b)) {
fmt = "WAV";
} else if (swingjs.JSAudio.isMP3 (b)) {
fmt = "MP3";
} else if (swingjs.JSAudio.isOGG (b)) {
fmt = "OGG";
}if (fmt == null) throw  new javax.sound.sampled.UnsupportedAudioFileException ();
props.put ("fileFormat", fmt);
format =  new javax.sound.sampled.AudioFormat (null, -1, -1, -1, -1, -1, false, props);
return  new swingjs.JSAudioInputStream (stream, format, -1);
}, "java.io.ByteArrayInputStream");
c$.isOGG = Clazz.defineMethod (c$, "isOGG", 
 function (b) {
return b[0] == 0x4F && b[1] == 0x67 && b[2] == 0x67 && b[3] == 0x53;
}, "~A");
c$.isMP3 = Clazz.defineMethod (c$, "isMP3", 
 function (b) {
return b[0] == 0xFF && b[1] == 0xFB || b[0] == 0x49 && b[1] == 0x44 && b[2] == 0x33;
}, "~A");
c$.isWave = Clazz.defineMethod (c$, "isWave", 
 function (b) {
return b[0] == 0x52 && b[1] == 0x49 && b[2] == 0x46 && b[3] == 0x46 && b[8] == 0x57 && b[8] == 0x41 && b[8] == 0x56 && b[8] == 0x45;
}, "~A");
Clazz.defineStatics (c$,
"FORMAT_UNSUPPORTED", 0,
"FORMAT_PCM", 1,
"FORMAT_ULAW", 7,
"to_ulaw", [0, 0, 0, 0, 0, 1, 1, 1, 1, 2, 2, 2, 2, 3, 3, 3, 3, 4, 4, 4, 4, 5, 5, 5, 5, 6, 6, 6, 6, 7, 7, 7, 7, 8, 8, 8, 8, 9, 9, 9, 9, 10, 10, 10, 10, 11, 11, 11, 11, 12, 12, 12, 12, 13, 13, 13, 13, 14, 14, 14, 14, 15, 15, 15, 15, 16, 16, 17, 17, 18, 18, 19, 19, 20, 20, 21, 21, 22, 22, 23, 23, 24, 24, 25, 25, 26, 26, 27, 27, 28, 28, 29, 29, 30, 30, 31, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 49, 51, 53, 55, 57, 59, 61, 63, 66, 70, 74, 78, 84, 92, 104, 254, 231, 219, 211, 205, 201, 197, 193, 190, 188, 186, 184, 182, 180, 178, 176, 175, 174, 173, 172, 171, 170, 169, 168, 167, 166, 165, 164, 163, 162, 161, 160, 159, 159, 158, 158, 157, 157, 156, 156, 155, 155, 154, 154, 153, 153, 152, 152, 151, 151, 150, 150, 149, 149, 148, 148, 147, 147, 146, 146, 145, 145, 144, 144, 143, 143, 143, 143, 142, 142, 142, 142, 141, 141, 141, 141, 140, 140, 140, 140, 139, 139, 139, 139, 138, 138, 138, 138, 137, 137, 137, 137, 136, 136, 136, 136, 135, 135, 135, 135, 134, 134, 134, 134, 133, 133, 133, 133, 132, 132, 132, 132, 131, 131, 131, 131, 130, 130, 130, 130, 129, 129, 129, 129, 128, 128, 128, 128]);
});

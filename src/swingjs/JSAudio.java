package swingjs;

import java.io.IOException;

import swingjs.api.DOMNode;

import javajs.util.Base64;
import javajs.util.BinaryDocument;
import javajs.util.OC;


/**
 * 
 * see http://stackoverflow.com/questions/5810164/how-can-i-write-wav-file-from-
 * byte-array-in-java
 * 
 * see http://ccrma.stanford.edu/courses/422/projects/WaveFormat/
 * 
 */

public class JSAudio {

	public JSAudio() {
		// for reflection
	}

	public void playAudio(byte[] data) {
		playAudio(data, 0, 0);		
	}
	/**
	 * 
	 * @param data  either raw data or wave data, with header
	 * @param samplesPerSecond or 0 for data with header
	 * @param bytesPerSample or 0 or data with header
	 * @return false if unsuccessful
	 * @throws IOException
	 */
	public boolean playAudio(byte[] data, int samplesPerSecond, int bytesPerSample) {
		if (samplesPerSecond > 0)
			data = write(data, samplesPerSecond, bytesPerSample);
		if (data == null)
			return false;			
		DOMNode.playWav("data:audio/wav;base64," + Base64.getBase64(data));
		return true;
	}

	/**
	 * add the necessary header to raw wave data
	 * @param data
	 * @param samplesPerSecond 	//8000,11025,16000,22050,44100
	 * @return WAV data
	 */
	public byte[] write(byte[] data, int samplesPerSecond, int bytesPerSample) {
		try {
			switch (samplesPerSecond) {
			case 8000:
			case 11025:
			case 16000:
			case 22050:
			case 44100:
				break;
		  default:
		  	return null;
			}
			
			int spsec = samplesPerSecond;
			int bpsam = bytesPerSample;
			int nchannels = 1;
			int bpsec = spsec * nchannels * bpsam;
	
			BinaryDocument outFile = new BinaryDocument();
			OC out = new OC();
			out.setBigEndian(false);
			outFile.setOutputChannel(out);
			outFile.writeString("RIFF");                 // 00   "RIFF"
			outFile.writeInt(36 + data.length);          // 04   36 + data.length
			outFile.writeString("WAVE");                 // 08   "WAVE"
			
			outFile.writeString("fmt ");                 // 12   "fmt "
			outFile.writeInt(16);                        // 16 - size of this chunk
			outFile.writeShort((short) 1);               // 20 - what is the audio format? 1 (PCM)
			outFile.writeShort((short) 1);               // 22 - mono or stereo? 1
			outFile.writeInt(spsec);                     // 24 - samples per second
			outFile.writeInt(bpsec);                     // 28 - bytes per second
			outFile.writeShort((short) bpsam);           // 32 - # of bytes in one sample (2)
			outFile.writeShort((short) (bpsam * 8));     // 34 - how many bits in a sample (16)
			
			outFile.writeString("data");                 // 36 - "data"
			outFile.writeInt(data.length);               // 40 - how big is this data chunk
			outFile.writeBytes(data, 0, data.length);    // 44 - the actual data itself
			return out.toByteArray();
		
		} catch (IOException e) {
			// not likely
			return null;
		}
	}


}

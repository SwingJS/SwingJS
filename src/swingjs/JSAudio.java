package swingjs;	

import java.io.IOException;

import swingjs.api.DOMNode;

import javajs.util.Base64;
import javajs.util.BinaryDocument;
import javajs.util.OC;


/**
 * 
 * see http://stackoverflow.com/questions/5810164/how-can-i-write-wav-file-from-byte-array-in-java
 * 
 * see www-mmsp.ece.mcgill.ca/documents/audioformats/wave/wave.html
 * 
 * 
 * 
 * 
 * 
 */

public class JSAudio {

	public JSAudio() {
		// for reflection
	}

	/**
	 * indicates that the data are already in wave format (this could be MPEG, for example, too)
	 * @param data
	 */
	public void playAudio(byte[] data, String format) {
		playAudio(data, 0, 0, format);		
	}
	/**
	 * 
	 * @param data  either raw data or wave data, with header
	 * @param samplesPerSecond or 0 for data with header
	 * @param bytesPerSample or 0 or data with header
	 * @return false if unsuccessful
	 * @throws IOException
	 */
	public boolean playAudio(byte[] data, int samplesPerSecond, int bytesPerSample, String format) {
		if (samplesPerSecond > 0) {
			data = createWaveData(data, samplesPerSecond, bytesPerSample, format);
			format = "wave";
		}
		if (data == null)
			return false;			
		DOMNode.playWav("data:audio/" + format + ";base64," + Base64.getBase64(data));
		return true;
	}

	/**
	 * add the necessary header to raw wave data
	 * 
	 * @param data
	 * @param samplesPerSecond
	 *          8000,11025,16000,22050,44100
	 * @param bytesPerSample
	 *          1 (8-bit) or 2 (16-bit)
	 * @param format
	 *          PCM FLOAT ALAW ULAW
	 *          there is no evidence that anything other than ULAW works for 8-bit;
	 *          16-bit should be PCM
	 * @return WAV data
	 */
	public byte[] createWaveData(byte[] data, int samplesPerSecond, int bytesPerSample, String format) {
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
		
//			0x0001 	WAVE_FORMAT_PCM 	PCM
//			0x0003 	WAVE_FORMAT_IEEE_FLOAT 	IEEE float
//			0x0006 	WAVE_FORMAT_ALAW 	8-bit ITU-T G.711 A-law
//			0x0007 	WAVE_FORMAT_MULAW 	8-bit ITU-T G.711 µ-law			

			int fmt = 7;
		
			/////////0         1
			/////////01234567890123456789
			switch ("PCM ;ALAW;ULAW;FLOAT".indexOf(format.toUpperCase())) {
			case 0:
				fmt = 1; // probably not supported by browsers
				break;
			case 5:
				fmt = 6;
				break;
			case 15:
				fmt = 3;
				break;
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
			outFile.writeShort((short) fmt);             // 20 - what is the audio format? 1 (PCM)
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

	/**
	 * converts bytes to mu-Law format in place
	 * 
	 * @param b
	 */
	 static void toULaw(byte[] b) {
		 for (int i = b.length; --i >= 0;)
			 b[i] = (byte) to_ulaw[128 + b[i]];
	 }

	// from http://www.falstad.com/barwaves/
	 
	 static final int to_ulaw[] = {
			0,    0,    0,    0,    0,    1,    1,    1,
			1,    2,    2,    2,    2,    3,    3,    3,
			3,    4,    4,    4,    4,    5,    5,    5,
			5,    6,    6,    6,    6,    7,    7,    7,
			7,    8,    8,    8,    8,    9,    9,    9,
			9,   10,   10,   10,   10,   11,   11,   11,
			11,   12,   12,   12,   12,   13,   13,   13,
			13,   14,   14,   14,   14,   15,   15,   15,
			15,   16,   16,   17,   17,   18,   18,   19,
			19,   20,   20,   21,   21,   22,   22,   23,
			23,   24,   24,   25,   25,   26,   26,   27,
			27,   28,   28,   29,   29,   30,   30,   31,
			31,   32,   33,   34,   35,   36,   37,   38,
			39,   40,   41,   42,   43,   44,   45,   46,
			47,   49,   51,   53,   55,   57,   59,   61,
			63,   66,   70,   74,   78,   84,   92,  104,
			254,  231,  219,  211,  205,  201,  197,  193,
			190,  188,  186,  184,  182,  180,  178,  176,
			175,  174,  173,  172,  171,  170,  169,  168,
			167,  166,  165,  164,  163,  162,  161,  160,
			159,  159,  158,  158,  157,  157,  156,  156,
			155,  155,  154,  154,  153,  153,  152,  152,
			151,  151,  150,  150,  149,  149,  148,  148,
			147,  147,  146,  146,  145,  145,  144,  144,
			143,  143,  143,  143,  142,  142,  142,  142,
			141,  141,  141,  141,  140,  140,  140,  140,
			139,  139,  139,  139,  138,  138,  138,  138,
			137,  137,  137,  137,  136,  136,  136,  136,
			135,  135,  135,  135,  134,  134,  134,  134,
			133,  133,  133,  133,  132,  132,  132,  132,
			131,  131,  131,  131,  130,  130,  130,  130,
			129,  129,  129,  129,  128,  128,  128,  128
		 };

}

package swingjs;

import javax.sound.sampled.AudioFormat;
import javax.sound.sampled.AudioSystem;
import javax.sound.sampled.Control;
import javax.sound.sampled.Control.Type;
import javax.sound.sampled.DataLine;
import javax.sound.sampled.Line;
import javax.sound.sampled.LineListener;
import javax.sound.sampled.LineUnavailableException;
import javax.sound.sampled.SourceDataLine;

import swingjs.api.HTML5AudioContext;

class JSAudioLine implements SourceDataLine {

	private DataLine.Info info;
	private boolean bOpen;
	private HTML5AudioContext ctx;
	private Object audioBuffer;
	private int startTime;

	public JSAudioLine(Line.Info info) {
		this.info = (Info) info;
	}

	@Override
	public void open() throws LineUnavailableException {
		open(null, AudioSystem.NOT_SPECIFIED);
	}

	@Override
	public void open(AudioFormat format) throws LineUnavailableException {
		open(format, AudioSystem.NOT_SPECIFIED);
	}

	@Override
	public void open(AudioFormat format, int bufferSizeBytes)
			throws LineUnavailableException {
		/**
		 * @j2sNative
		 * 
		 * window.AudioContext = window.AudioContext || window.webkitAudioContext;
		 * this.ctx = new AudioContext();
		 * 
		 */
		{}		
		if (format != null && bufferSizeBytes != AudioSystem.NOT_SPECIFIED) {
			info.getFormats()[0] = format;
			int nFrames = bufferSizeBytes / (format.getSampleSizeInBits()/8 * format.getChannels());
			audioBuffer = ctx.createBuffer(format.getChannels(), nFrames, (int) format.getSampleRate());
		}
		this.startTime = 0;
		bOpen = true;
	}

	@Override
	public Line.Info getLineInfo() {
		return info;
	}

	@Override
	public boolean isOpen() {
		return bOpen;
	}

	@Override
	public void close() {		
		/**
		 * @j2sNative
		 * 
		 * if (this.ctx)
		 *   this.ctx.close();
		 * this.ctx = null;
		 * 
		 */
		{}		
		bOpen = false;
	}

	
	@Override
	public void start() {
	}

	@Override
	public void stop() {
		// TODO Auto-generated method stub
		
	}


	
	@Override
	public void drain() {
		// TODO Auto-generated method stub
		
	}

	@Override
	public void flush() {
		this.startTime = 0;
		/**
		 * @j2sNative
		 * 
		 *            this.ctx.currentTime = 0;
		 */
		{
		}
	}

	@Override
	public boolean isRunning() {
		// TODO Auto-generated method stub
		return false;
	}

	@Override
	public boolean isActive() {
		// TODO Auto-generated method stub
		return false;
	}

	@Override
	public AudioFormat getFormat() {
		return this.info.getFormats()[0];
	}

	@Override
	public int getBufferSize() {
		// TODO Auto-generated method stub
		return 0;
	}

	@Override
	public int available() {
		// TODO Auto-generated method stub
		return 0;
	}

	@Override
	public int getFramePosition() {
		// TODO Auto-generated method stub
		return 0;
	}

	@Override
	public long getLongFramePosition() {
		// TODO Auto-generated method stub
		return 0;
	}

	@Override
	public long getMicrosecondPosition() {
		// TODO Auto-generated method stub
		return 0;
	}

	@Override
	public float getLevel() {
		// TODO Auto-generated method stub
		return 0;
	}

	@Override
	public Control[] getControls() {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public boolean isControlSupported(Type control) {
		// TODO Auto-generated method stub
		return false;
	}

	@Override
	public Control getControl(Type control) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public void addLineListener(LineListener listener) {
		// TODO Auto-generated method stub
		
	}

	@Override
	public void removeLineListener(LineListener listener) {
		// TODO Auto-generated method stub
		
	}

	// var startTime = 0;
	//
	// for (var i = 0, audioChunk; audioChunk = AUDIO_CHUNKS[i]; ++i) {
	// // Create/set audio buffer for each chunk
	// var audioBuffer = audioCtx.createBuffer(NUM_CHANNELS, NUM_SAMPLES,
	// SAMPLE_RATE);
	// audioBuffer.getChannelData(0).set(audioChunk);
	//
	// var source = audioCtx.createBufferSource();
	// source.buffer = audioBuffer;
	// source.start(startTime);
	// source.connect(audioCtx.destination);
	//
	// startTime += audioBuffer.duration;
	// } return null;

	@SuppressWarnings("null")
	@Override
	public int write(byte[] b, int off, int len) {
		float[] data = null;
	  Object ab = this.audioBuffer;
		/**
		 * @j2sNative
		 * 
		 *            data = ab.getChannelData(0);
		 * 
		 */
		{
		}
		// problem is that this data is bytes.
		AudioFormat af = getFormat();
		int  bytesPerSample = af.getSampleSizeInBits()/8;
		boolean isBig = af.isBigEndian();
		// must be in range -1 to 1
		for (int i = 0, pt = 0; i < len; i++, pt++) {
			switch (bytesPerSample){
			case 1:
			  data[pt] = b[i]/128f;
				break;
			case 2:
				// b will be a string of (short)
				int bi1 = b[i];
				int bi2 = b[++i];
				data[pt] = (isBig ? bi1 * 256 + bi2 + (bi2 < 0 ? 256 : 0) 
						: bi2 * 256 + bi1 + (bi1 < 0 ? 256 : 0))*1f/0x10000; 
			}
		}

		/**
		 * @j2sNative
		 * 
		 *            var source = this.ctx.createBufferSource();
		 *            if (this.starTime == 0)
		 *              this.flush();
		 *            if (this.startTime < this.ctx.currentTime)
		 *            	this.startTime = this.ctx.currentTime;
		 * 
		 *            source.buffer = ab;
		 *            source.connect(this.ctx.destination);
		 *            source.start(this.startTime);
		 * 
		 * 		this.startTime += ab.duration;
		 */
		{
		}
		return len;
	}

 }
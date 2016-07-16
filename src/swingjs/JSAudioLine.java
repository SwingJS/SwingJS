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
	private HTML5AudioContext auctx;
	private Object audioBuffer;
	private int nChannels, sampleRate;
	private int sampleSizeInBytes;
	private boolean isBigEndian, isUnsignedPCM;
	
	@SuppressWarnings("unused")
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
		 *            window.AudioContext = window.AudioContext ||
		 *            window.webkitAudioContext; this.auctx = new AudioContext();
		 * 
		 */
		{
		}
		if (format != null) {
			info.getFormats()[0] = format;
			nChannels = format.getChannels();
			sampleRate = (int) format.getSampleRate();
			sampleSizeInBytes = format.getSampleSizeInBits() >> 3;
			isBigEndian = format.isBigEndian();
			isUnsignedPCM = format.getEncoding() == AudioFormat.Encoding.PCM_UNSIGNED;
			audioBuffer = null;
		}
		startTime = 0;
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
		 * if (this.auctx)
		 *   this.auctx.close();
		 * this.auctx = null;
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
		 *            this.auctx.currentTime = 0;
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

	@Override
	public int write(byte[] b, int off, int len) {
		for (int i = nChannels; --i >= 0;) 
			setChannelData(i, b, off, len);	
		/**
		 * @j2sNative
		 * 
		 *            var source = this.auctx.createBufferSource();
		 *            if (this.starTime == 0)
		 *              this.flush();
		 *            if (this.startTime < this.auctx.currentTime)
		 *            	this.startTime = this.auctx.currentTime;
		 * 
		 *            source.buffer = this.audioBuffer;
		 *            source.connect(this.auctx.destination);
		 *            source.start(this.startTime);
		 * 
		 * 		this.startTime += this.audioBuffer.duration;
		 */
		{
		}
		return len;
	}

	@SuppressWarnings({ "null", "unused" })
	/**
	 * We must convert data in one multi-channel-interwoven byte array
	 * to channelCount arrays of single-channel data.
	 * 
	 * We create a new audioBuffer if necesssary.
	 *  
	 * @param ich
	 * @param b
	 * @param offset
	 * @param len
	 */
	private void setChannelData(int ich, byte[] b, int offset, int len) {
		float[] data = null;
		Object ab = audioBuffer;
		int abLen = 0;
		/**
		 * @j2sNative
		 * 
		 *            abLen = (ab ? ab.length : 0);
		 * 
		 */
		{
		}

		int nFrames = (len - offset) / sampleSizeInBytes / nChannels;
		if (audioBuffer == null || abLen != nFrames) {
			ab = audioBuffer = auctx.createBuffer(nChannels, nFrames, sampleRate);
		}

		/**
		 * @j2sNative
		 * 
		 *            data = ab.getChannelData(ich);
		 * 
		 */
		{
		}
		int bytesPerSample = sampleSizeInBytes;
		int di = bytesPerSample * nChannels;
		boolean big = isBigEndian;
		boolean unsigned = isUnsignedPCM;
		float f = 0;
		// initial data are 8-bit or 16-bit signed or unsigned integers
		// sampling must end up in the range -1.0 to 1.0
		for (int i = offset + ich, pt = 0; i < len; i += di) {
			switch (bytesPerSample) {
			case 1:
				f = b[i] / 0x80;
				break;
			case 2:
				// b will be a string of (short)
				int bi1 = b[i];
				int bi2 = b[i + 1];
				f = (big ? bi1 * 256 + bi2 + (bi2 < 0 ? 256 : 0) : bi2 * 256 + bi1
						+ (bi1 < 0 ? 256 : 0)) * 1f / 0x8000;
			}
			// unsigned will be in the range 0.0-2.0 instead of -1.0 to 1.0
			data[pt++] = (unsigned ? f - 1 : f);
		}

	}

 }
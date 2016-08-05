package jsjavax.imageio.stream;

import java.io.ByteArrayInputStream;

public class ImageInputStream extends ByteArrayInputStream {

	public ImageInputStream(byte[] buf) {
		super(buf);
	}
	
	public byte[] getBuf() {
		return buf;
	}

}

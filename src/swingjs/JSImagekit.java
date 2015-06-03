package swingjs;

import java.util.Arrays;

import javajs.img.BMPDecoder;
import swingjs.api.Interface;

public class JSImagekit {

	private static final int UNK = -1;
	private static final int PNG = 0;
	private static final int JPG = 1;
	private static final int GIF = 2;
	private static final int BMP = 3;
	private static final int JPG_SOF0 = 0xC0FF;
	private static final int JPG_SOF2 = 0xC2FF;

	public JSImagekit() {
		// for reflection
	}

	/**
	 * Create a buffered image that contains the data, at least getting the width
	 * and height of a JPG, GIF, PNG, or BMP file and possibly generating a
	 * JavaScript callback to load the image into an off-screen buffer in order to
	 * finish the job.
	 * 
	 * @param data
	 * @param imageoffset
	 * @param imagelength
	 * @return
	 */
	public JSImage createImageFromBytes(byte[] data, int imageoffset, int imagelength) {
		if (imagelength < 0)
			imagelength = data.length;
		byte[] b = Arrays.copyOfRange(data, imageoffset, imagelength);
		if (b.length < 54)
			return null;
		int w = 0, h = 0;
		int[] argb = null;
		String type = null;
		switch (getSourceType(b)) {
		case BMP:
			// just get bytes directly
			BMPDecoder ie = (BMPDecoder) Interface.getInstance(
					"javajs.img.BMPDecoder", true);
			Object[] o = ie.decodeWindowsBMP(b);
			if (o == null || o[0] == null)
				return null;
			w = ((Integer) o[1]).intValue();
			h = ((Integer) o[2]).intValue();
			argb = (int[]) o[0];
			break;
		case JPG:
			int pt = 2;
			while (true) {
				switch (getInt(b, pt)) {
				case JPG_SOF0:
				case JPG_SOF2:
					h = getIntRev(b, pt + 5);
					w = getIntRev(b, pt + 7);
					pt = 0;
					break;
				}
				if (pt == 0)
					break;
				pt += 2 + getIntRev(b, pt + 2);
			}
			type = "jpeg";
			break;
		case PNG:
			w = getLong(b, 16);
			h = getLong(b, 20);
			type = "png";
			break;
		case GIF:
			w = getInt(b, 6);
			h = getInt(b, 8);
			type = "gif";
			break;
		case UNK:
			System.out.println("JSImagekit: Unknown image type: " + b[0] + " " + b[1] + " " + b[2] + " " + b[3]);
			break;
		}
		System.out.println("JSImagekit: " + w + " " + h + " " + b[0] + " " + b[1] + " " + b[2] + " " + b[3]);
		if (w == 0 || h == 0)
			return  null;
		
		JSImage jsimage = (new JSImage()).setData(w, h, argb);
		if (argb == null)
			jsimage.getDOMImage(b, type);
		return jsimage;
	}

	private int getLong(byte[] b, int pt) {
		return ((b[pt] & 0xFF) << 24) 
				+ ((b[pt + 1] & 0xFF) << 16) 
				+ ((b[pt + 2] & 0xFF) << 8) 
				+ (b[pt + 3] & 0xFF);
	}

	private int getInt(byte[] b, int pt) {
		return (b[pt]& 0xFF) + ((b[pt + 1] & 0xFF)<< 8);
	}

	private int getIntRev(byte[] b, int pt) {
		return ((b[pt] & 0xFF) << 8) + (b[pt + 1] & 0xFF);
	}

	
	private int getSourceType(byte[] b) {
		return ((b[0] & 0xFF) == 0x89 && b[1] == 'P' && b[2] == 'N' && b[3] == 'G' ? PNG 
			  : (b[0] & 0xFF) == 0xFF && (b[1] & 0xFF) == 0xD8 ? JPG // FFD8
			  : b[0] == 'G' && b[1] == 'I' && b[2] == 'F' ? GIF
				: b[0] == 'B' && b[1] == 'M' ? BMP 
				: UNK);
	}
}
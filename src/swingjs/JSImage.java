package swingjs;

import javajs.util.Base64;
import swingjs.api.DOMNode;
import jsjava.awt.image.BufferedImage;
import jsjava.awt.image.ImageObserver;

public class JSImage extends BufferedImage {
	int typeRequested;
	int[] pix;
	private DOMNode imgNode;
	private int width, height;
	
	public JSImage() {
		super(1,1, TYPE_INT_ARGB);
		
	}
	public JSImage setData(int width, int height, int[] argb) {
		pix = argb;
		this.width = width;
		this.height = height;
		return this;
	}
	
	/**
	 * convert [r g b a  r g b a ...] into [argb argb argb ...]
	 * 
	 * currently does not respect transparency
	 * 
	 * @param imgData HTML5 canvas.context.imageData.data
	 * @return array of ARGB values
	 * 
	 */
  int[] toIntARGB(int[] imgData) {
    /*
     * red=imgData.data[0];
     * green=imgData.data[1];
     * blue=imgData.data[2];
     * alpha=imgData.data[3];
     */
    int n = imgData.length / 4;
    int[] iData = new int[n];
    for (int i = 0, j = 0; i < n; j++)
      iData[i++] = (imgData[j++] << 16) | (imgData[j++] << 8) | imgData[j++] | 0xFF000000;
    return iData;
  }      
  
  /**
   * Use HTML5 to load PNG, JPG, or GIF image in order to extract its pixels
   * 
   * @param b
   * @param type
   */
	@SuppressWarnings("unused")
	public void getDOMImage(byte[] b, String type) {
		String dataurl = "data:image/" + type + ";base64,"  + Base64.getBase64(b).toString();
		Object me = this;
		DOMNode img = null;
		/**
		 * @j2sNative
		 *   img = new Image(this.width, this.height);
		 *   //img.onLoad = function() { me.setDOMImage(img); };
		 *   img.src = dataurl;
		 */
		{}
		setDOMImage(img);
	}
		
	/**
	 * callback from Image.src = ... ; extract the int[] data from this image;
	 * also sets img._pbuf32 for graphing
	 * 
	 */
	@SuppressWarnings("unused")
	public void setDOMImage(DOMNode img) {
		DOMNode canvas = DOMNode.createElement("canvas", "JSImage");
		int w = width;
		int h = height;
		imgNode = img;
		/**
		 * @j2sNative
		 * 
		 * canvas.width = w;
		 * canvas.height = h;
		 * var ctx = canvas.getContext("2d");
		 * ctx.drawImage(img, 0, 0, w, h);
		 * var data = ctx.getImageData(0, 0, w, h).data;
		 * img._pbuf32 = this.toIntARGB(data);
		 * 
		 */
		{
			toIntARGB(null);
		}
	}

	@Override
	public int getHeight(ImageObserver o) {
		return height;
	}

	@Override
	public int getWidth(ImageObserver o) {
		return width;
	}

}

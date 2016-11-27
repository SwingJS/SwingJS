package swingjs;

import javajs.util.Base64;
import jsjava.awt.image.BufferedImage;
import jsjava.awt.image.DataBufferInt;
import jsjava.awt.image.ImageObserver;
import swingjs.api.DOMNode;

/**
 * A JavaScript version of BufferedImage. 
 * 
 * Created from JSImagekit when creating an image 
 * from byte[] or from loading a GIF, PNG, or JPG image.
 * 
 * The difference is that when from byte[] data, the 
 * field _pix will be initialized to the raster data, 
 * but _imgNode will be null; when an image is used, then
 * _pix will be there, but it will not be populated unless
 * a call to setRGB is made. Until then, JSGraphics2D.drawImage will
 * simply use the image itself. But the _pix data will still
 * be available as _imgNode.pbuf32.
 * 
 * Only integer raster data RGB and ARGB have been implemented.
 * 
 * 
 * 
 * @author Bob Hanson
 *
 */
public class JSImage extends BufferedImage {

	// a BufferedImage in name only, actually;
	
	// TODO: implement simple ColorModel and Raster
	
	public String src;
	private Runnable callback;

	public JSImage(int[] argb, int width, int height, String src) {
		super(width, height, TYPE_INT_ARGB);
		this.src = src;
		_pix = argb;
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
		DOMNode img = null;
		/**
		 * @j2sNative
		 *   img = new Image(this.width, this.height);
		 *   //if (this.callback) img.onload = this.callback;
		 *   img.src = dataurl;
		 */
		{}
		_imgNode = img;
	}
		
	/**
	 * Extract the int[] data from this image by installing it in a canvas.
	 * Note that if if img.complete == false, then this will result in a
	 * black rectangle.
	 * 
	 */
	@SuppressWarnings("unused")
	public void setPixels() {
		DOMNode canvas = DOMNode.createElement("canvas", null);
		int w = width;
		int h = height;
		/**
		 * @j2sNative
		 * 
		 * canvas.width = w;
		 * canvas.height = h;
		 * var ctx = canvas.getContext("2d");
		 * ctx.drawImage(this._imgNode, 0, 0, w, h);
		 * this._pix = this.toIntARGB(ctx.getImageData(0, 0, w, h).data);
		 * 
		 */
		{
			// placeholder only, for Eclipse reference
			toIntARGB(null);
		}
		_imgNode = canvas;
		((DataBufferInt) raster.getDataBuffer()).data = this._pix;
		_havePix = true;
	}

}

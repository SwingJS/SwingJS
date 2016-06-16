package swingjs;

import swingjs.api.DOMNode;
import swingjs.api.HTML5Canvas;
import jsjava.util.Locale;

import jsjava.awt.Font;
import jsjava.awt.Graphics2D;
import jsjava.awt.GraphicsDevice;
import jsjava.awt.GraphicsEnvironment;
import jsjava.awt.image.BufferedImage;


public class JSGraphicsEnvironment extends GraphicsEnvironment {

	private static GraphicsDevice device;

	/*
	 * NOTE: This class is called from jsjava.awt.GraphicsEnvironment
	 * within in j2sNative block.
	 * 
	 */
	public JSGraphicsEnvironment(){
		System.out.println("JSGraphicsEnvironment initialized");		
	}

	@Override
	public Graphics2D createGraphics(BufferedImage img) {
		return createGraphicsSized(img, img.getWidth(), img.getHeight());
	}
	
	@SuppressWarnings("unused")
	public Graphics2D createGraphicsSized(Object img, int width, int height) {
		// get a canvas for an image
		JSGraphics2D g = null;
		/**
		 * @j2sNative
		 * 
		 *     g = img._g;
		 * 
		 */
		{
		}
		if (g == null) {
			HTML5Canvas canvas = (HTML5Canvas) DOMNode.createElement("canvas", "img" + System.currentTimeMillis());
			Object pix = null;
			/**
			 * @j2sNative
			 * 
			 * canvas.width = width;
			 * canvas.height = height;
			 * img._canvas = canvas;
			 * pix = img.pix;
			 * 	
			 */
			{}
			g = new JSGraphics2D(canvas);
			// we need to draw the image now, because it might
			// have pixels. Note that Java actually does not
			// allow creating a Graphics from MemoryImageSource
			// so pixels would never be there. 
			if (pix != null)
				g.drawImage((BufferedImage) img, 0, 0, null);
			/**
			 * @j2sNative
			 * img._g = g;
			 * if (pix)
			 *   pix.img = img;
			 * img.pix = null;
			 * 
			 */
			{
			}
		}
		return g;
	}

	@Override
	public Font[] getAllFonts() {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public String[] getAvailableFontFamilyNames() {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public String[] getAvailableFontFamilyNames(Locale l) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public GraphicsDevice getDefaultScreenDevice() {
		if (device == null)
			device = (GraphicsDevice) JSToolkit.getInstance("swingjs.JSScreenDevice"); 
		return device;
	}

}

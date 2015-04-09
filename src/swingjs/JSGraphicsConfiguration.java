package swingjs;

import jsjava.awt.GraphicsConfiguration;
import jsjava.awt.GraphicsDevice;
import jsjava.awt.GraphicsEnvironment;
import jsjava.awt.Rectangle;
import jsjava.awt.geom.AffineTransform;
import jsjava.awt.image.BufferedImage;
import jsjava.awt.image.ColorModel;


public class JSGraphicsConfiguration extends GraphicsConfiguration {

	/*
	 * NOTE: This class is called from jsjava.awt.GraphicsEnvironment
	 * within in j2sNative block.
	 * 
	 */
	public JSGraphicsConfiguration(){
		// by reflection
		System.out.println("JSGraphicsConfiguration initialized");		
	}

	@Override
	public GraphicsDevice getDevice() {
		return GraphicsEnvironment.getLocalGraphicsEnvironment().
        getDefaultScreenDevice();
	}

	@Override
	public BufferedImage createCompatibleImage(int width, int height) {
		//SwingJS TODO
		/*
		 *
		 * @j2sNative
		 */
		{}
		return null;
	}

	@Override
	public ColorModel getColorModel() {
		//SwingJS TODO
		/*
		 *
		 * @j2sNative
		 */
		{}
		return null;
	}

	@Override
	public ColorModel getColorModel(int transparency) {
		//SwingJS TODO
		/*
		 *
		 * @j2sNative
		 */
		{}
		return null;
	}

	@Override
	public AffineTransform getDefaultTransform() {
		//SwingJS TODO
		/*
		 *
		 * @j2sNative
		 */
		{}
		return null;
	}

	@Override
	public AffineTransform getNormalizingTransform() {
		//SwingJS TODO
		/*
		 *
		 * @j2sNative
		 */
		{}
		return null;
	}

	@Override
	public Rectangle getBounds() {
		//SwingJS TODO
		/*
		 *
		 * @j2sNative
		 */
		{}
		return null;
	}
}

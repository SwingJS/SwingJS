package swingjs;

import swingjs.api.DOMNode;
import swingjs.api.JQueryObject;
import jsjava.awt.GraphicsConfiguration;
import jsjava.awt.GraphicsDevice;
import jsjava.awt.GraphicsEnvironment;
import jsjava.awt.Rectangle;
import jsjava.awt.geom.AffineTransform;
import jsjava.awt.image.BufferedImage;
import jsjava.awt.image.ColorModel;
import jsjava.awt.image.WritableRaster;


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
    ColorModel cm = getColorModel();
    WritableRaster wr = cm.createCompatibleWritableRaster(width, height);
    return new BufferedImage(cm, wr, false, null);
	}

	@Override
	public ColorModel getColorModel() {
		return ColorModel.getRGBdefault();
	}

	@Override
	public ColorModel getColorModel(int transparency) {
		return ColorModel.getRGBdefault();
	}

	@Override
	public AffineTransform getDefaultTransform() {
		return new AffineTransform();
	}

	@Override
	public AffineTransform getNormalizingTransform() {
		return new AffineTransform();
	}

	@Override
	public Rectangle getBounds() {
		DOMNode doc = null;
		/**
		 * @j2sNative
		 * 
		 *  doc = document;
		 */
		{}
		JQueryObject d = JSToolkit.getJQuery().$(doc);
		return new Rectangle(d.width(), d.height());
	}
}

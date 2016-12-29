package swingjs;

import swingjs.api.DOMNode;
import swingjs.api.Interface;
import swingjs.api.JQueryObject;
import jsjava.awt.GraphicsConfiguration;
import jsjava.awt.GraphicsDevice;
import jsjava.awt.GraphicsEnvironment;
import jsjava.awt.Rectangle;
import jsjava.awt.geom.AffineTransform;
import jsjava.awt.image.BufferedImage;
import jsjava.awt.image.ColorModel;
import jsjava.awt.image.WritableRaster;


/**
 * JSGraphicsConfiguration is a critical innovation for SwingJS. It
 * maintains information about the associated HTML5 applet. It is 
 * passed to new threads as they are created such that Thread.currentThread()
 * always has the current appletViewer field, and appletViewer.getGraphicsConfiguration()
 * (or actually any component involved) always returns this same configuration.
 * 
 * In this way, we can produce a graphics configuration for any JDialog or JFrame.
 *  
 * @author Bob Hanson
 * 
 *
 */
public class JSGraphicsConfiguration extends GraphicsConfiguration {

	/*
	 * NOTE: This class is called from JSToolkit using reflection.
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
    return newBufferedImage(cm, wr, false, null);
	}

	@Override
	public ColorModel getColorModel() {
		return ColorModel.getRGBdefault();
	}

	@Override
	public ColorModel getColorModel(int transparency) {
		return getColorModel();
	}

	@Override
	public AffineTransform getDefaultTransform() {
		return (AffineTransform) Interface.getInstance("java.awt.geom.AffineTransform", true);
	}

	@Override
	public AffineTransform getNormalizingTransform() {
		return getDefaultTransform();
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

package swingjs;

import java.awt.Dimension;
import java.awt.Toolkit;

import jsjava.awt.Color;
import jsjava.awt.Font;
import jsjava.awt.Graphics2D;
import jsjava.awt.GraphicsDevice;
import jsjava.awt.GraphicsEnvironment;
import jsjava.awt.Point;
import jsjava.awt.Transparency;
import jsjava.awt.image.BufferedImage;
import jsjava.util.Locale;


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
	  Graphics2D g =  (Graphics2D) img.getImageGraphic().create();
	  //if (img.getTransparency() == Transparency.OPAQUE) 
	  	//g.setBackground(Color.WHITE);
	  return g;
	}

	private static Font[] availableFonts;

	@Override
	public Font[] getAllFonts() {
		if (availableFonts == null) {
			String[] names = getAvailableFontFamilyNames();
			availableFonts = new Font[names.length];
			for (int i = names.length; --i >= 0;)
				availableFonts[i] = new Font(names[i], Font.PLAIN, 1);
		}
		return availableFonts;
	}

	@Override
	public String[] getAvailableFontFamilyNames() {
		return Toolkit.getDefaultToolkit().getFontList();
	}

	@Override
	public String[] getAvailableFontFamilyNames(Locale l) {
		return Toolkit.getDefaultToolkit().getFontList();
	}

	@Override
	public GraphicsDevice getDefaultScreenDevice() {
		if (device == null)
			device = (GraphicsDevice) JSToolkit.getInstance("swingjs.JSScreenDevice"); 
		return device;
	}

	@Override
  public Point getCenterPoint()  {
		Dimension d = Toolkit.getDefaultToolkit().getScreenSize();
		return new Point(d.width / 2, d.height / 2);
	}


}

package swingjs;

import java.util.Locale;

import jsjava.awt.Font;
import jsjava.awt.Graphics2D;
import jsjava.awt.GraphicsEnvironment;
import jsjava.awt.image.BufferedImage;


public class JSGraphicsEnvironment extends GraphicsEnvironment {

	public JSGraphicsEnvironment(){
		System.out.println("JSGraphicsEnvironment initialized");		
	}

	@Override
	public Graphics2D createGraphics(BufferedImage img) {
		// TODO Auto-generated method stub
		return null;
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

}

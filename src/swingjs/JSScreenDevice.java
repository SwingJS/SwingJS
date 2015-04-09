package swingjs;

import jsjava.awt.GraphicsConfiguration;
import jsjava.awt.GraphicsDevice;


public class JSScreenDevice extends GraphicsDevice {

	/*
	 * NOTE: This class is called from jsjava.awt.GraphicsEnvironment
	 * within in j2sNative block.
	 * 
	 */
	public JSScreenDevice(){
		System.out.println("JSScreenDevice initialized");		
	}

	@Override
	public int getType() {
		return TYPE_RASTER_SCREEN;
	}

	@Override
	public String getIDstring() {
		return "swingjs.JSScreenDevice";
	}

	@Override
	public GraphicsConfiguration[] getConfigurations() {
		return new GraphicsConfiguration[] {JSToolkit.getGraphicsConfiguration()};
	}

	@Override
	public GraphicsConfiguration getDefaultConfiguration() {
		return JSToolkit.getGraphicsConfiguration();
	}
}

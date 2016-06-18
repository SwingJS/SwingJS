package swingjs;

import jsjava.awt.Graphics;
import jsjava.awt.Panel;
import swingjs.api.HTML5Applet;
import swingjs.api.HTML5Canvas;
import swingjs.api.JSInterface;
import swingjs.api.JSTop;

/**
 * JSJavaViewer 
 * 
 * SwingJS class to support an independent Window, either from using Main() 
 * or one created from a JApplet. Each viewer has an independent mouse event processor. 
 * 
 * This "Panel" is never viewed.
 * 
 * @author Bob Hanson
 * 
 */
public class JSJavaViewer extends Panel implements 
		JSInterface {

	/*
	 * the JavaScript SwingJS._Applet object
	 */
	public HTML5Applet html5Applet;


	public String appletCodeBase;
	public String appletIdiomaBase;
	public String appletDocumentBase;

	public String fullName = "Main";
	public String appletName;
	public String syncId;
	public boolean testAsync;
	public boolean async;
	public String strJavaVersion;
	public Object strJavaVendor;
	public Object display;
	protected HTML5Canvas canvas;
	protected JSGraphics2D jsgraphics;
	
	JSTop applet;

	protected JSMouse mouse;


  // ///////// javajs.api.JSInterface ///////////
	//
	// methods called by page JavaScript
	//
	//

	@Override
	public int cacheFileByName(String fileName, boolean isAdd) {
		// TODO Auto-generated method stub
		return 0;
	}

	@Override
	public void cachePut(String key, Object data) {
		// TODO Auto-generated method stub
	}

	@Override
	public void destroy() {
		// TODO Auto-generated method stub
	}

	@Override
	public String getFullName() {
		return fullName;
	}

	@Override
	public void openFileAsyncSpecial(String fileName, int flags) {
		// TODO Auto-generated method stub
	}

	@Override
	public boolean processMouseEvent(int id, int x, int y, int modifiers,
			long time, Object jqevent) {
		getMouse().processEvent(id, x, y, modifiers, time, jqevent);
		return false;
	}

	private JSMouse getMouse() {
		return (mouse == null ? mouse = new JSMouse(this) : mouse);
	}

	@Override
	public void processTwoPointGesture(float[][][] touches) {
		getMouse().processTwoPointGesture(touches);
	}

	@Override
	public void setDisplay(HTML5Canvas canvas) {
		this.canvas = canvas;
	}

	@Override
	public void setScreenDimension(int width, int height) {
		setGraphics(jsgraphics = null);
		//resize(width, height);
		if (applet != null)
			applet.resize(width, height);
	}

	@Override
	public boolean setStatusDragDropped(int mode, int x, int y, String fileName) {
		// TODO Auto-generated method stub
		return false;
	}

	@Override
	public void startHoverWatcher(boolean enable) {
		// TODO Auto-generated method stub

	}

	/**
	 * @j2sOverride
	 */
	@Override
	public void paint(Graphics g) {
		// Note that this "Panel" is never painted.
		// This class simply maintains valuable information for applet loading.
		// Here we go straight to the contentPane and paint that.
		applet.paint(setGraphics(g));
	}

	/**
	 * SwingJS will deliver a null graphics here.
	 * 
	 * @param g
	 * @return
	 */
	private Graphics setGraphics(Graphics g) {
		return (g == null ? getGraphics() : g);
	}
		
	/**
	 * Specifically for JSAppletPanel, we get new graphics when necessary
	 */
	@Override
	public Graphics getGraphics() {
		if (jsgraphics == null) {
			jsgraphics = new JSGraphics2D(getCanvas());
			// set methods for HTMLCanvasContext2D that are just direct assignments
			// did not work /**
			// * @j2sNative
			// *
			// * g.ctx._setLineWidth = function(d) {this.lineWidth = d};
			// * g.ctx._setFont = function(f) {this.font = f};
			// * g.ctx._setFillStyle = function(s) {this.fillStyle = s};
			// * g.ctx._setStrokeStyle = function(s) {this.strokeStyle = s};
			// */
			// {}
			jsgraphics.setWindowParameters(getWidth(), getHeight());
		}
		return jsgraphics;
	}

	protected HTML5Canvas getCanvas() {
		return (canvas == null ? (canvas = html5Applet._getHtml5Canvas()) : canvas);
	}

	
}
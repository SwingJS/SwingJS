package swingjs;

import jsjava.awt.Container;
import jsjava.awt.Graphics;
import jsjavax.swing.JApplet;
import swingjs.api.DOMNode;
import swingjs.api.HTML5Canvas;
import swingjs.api.JSInterface;
import swingjs.plaf.JSComponentUI;

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
public class JSFrameViewer implements JSInterface {

	protected JSGraphics2D jsgraphics;

	public String fullName = "Main";

	public Container top; // null for a standard applet

	public JSAppletViewer appletViewer;
	public boolean isApplet, isFrame;	
	
	public JSFrameViewer setForWindow(Container window) {
		isFrame = true;
		appletViewer = window.appletViewer;
		this.top = window;
		applet = window;
		window.frameViewer = this;
		this.fullName = appletViewer.fullName;
		canvas = null;
		jsgraphics = null;
		getGraphics();
		return this;
	}
	
	
	public Container getTop() {
		return top;
	}
	
	public Object display;
	
	public Container applet;  // really just for JSmolCore 
	public JApplet japplet;
	              // SwingJS core library uses.

	protected JSMouse mouse;

	protected HTML5Canvas canvas;


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

	/** 
	 * Page can define a canvas to use or to clear it with null
	 */
	@Override
	public void setDisplay(HTML5Canvas canvas) {
		this.canvas = canvas;
		jsgraphics = null;
	}

	@Override
	public void setScreenDimension(int width, int height) {
		setGraphics(jsgraphics = null);
		//resize(width, height);
		if (top != null)
			top.resize(width, height);
	}

	/**
	 * SwingJS will deliver a null graphics here.
	 * 
	 * @param g
	 * @return
	 */
	protected Graphics setGraphics(Graphics g) {
		return (g == null ? getGraphics() : g);
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
	
	
	public String frameID;

	private String canvasId;

	private static int canvasCount;

	public Graphics getGraphics() {
		if (jsgraphics == null) {
			if (isFrame) {
				if (canvas == null)
					newCanvas();
				jsgraphics = new JSGraphics2D(canvas);
				jsgraphics.setWindowParameters(top.getWidth(), top.getHeight());
			} else {
				canvas = appletViewer.getCanvas();
				jsgraphics = new JSGraphics2D(canvas);
			}
		}
		return jsgraphics;
	}


	public HTML5Canvas newCanvas() {
		if (canvasId != null)
			DOMNode.remove(canvas);
		String id = appletViewer.appletName + "_canvas" + ++canvasCount;
		canvasId = id;
		display = id;
		canvas = JSComponentUI
				.createCanvas(id, top.getWidth(), top.getHeight());
		return canvas;
	}
	
}
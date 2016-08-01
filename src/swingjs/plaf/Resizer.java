package swingjs.plaf;

import java.awt.event.MouseEvent;

import jsjava.awt.Color;
import jsjava.awt.Dimension;
import jsjava.awt.JSComponent;
import jsjava.awt.Rectangle;
import jsjavax.swing.JFrame;
import jsjavax.swing.JRootPane;
import jsjavax.swing.RootPaneContainer;
import swingjs.JSFrameViewer;
import swingjs.JSToolkit;
import swingjs.api.DOMNode;
import swingjs.api.JQueryObject;
import swingjs.api.JSFunction;

public class Resizer {

	private JRootPane rootPane;
	private DOMNode resizer, domNode;
	private JFrame jframe;
	private int offsetx = -4, offsety = -4, minSize = 10;
	private JSComponentUI ui;
	private RootPaneContainer rpc;

	public Resizer() {
	}

	public Resizer set(JSFrameViewer viewer) {
		rpc = (RootPaneContainer) viewer.top;
		rootPane = rpc.getRootPane();
		ui = (JSComponentUI) rootPane.ui;
		if (viewer.isApplet) {
			domNode = viewer.getDiv("appletdiv");
		} else {
			jframe = (JFrame) rpc;
			domNode = ui.domNode;
		}
		return (domNode == null ? null : this);
	}

	public void show() {
		if (resizer == null) 
			createAndShowResizer();
		else
			$(resizer).show();
		setPosition($(domNode).width(), $(domNode).height());
	}

	public void hide() {
		$(resizer).hide();		
	}
	
	public void setMin(int min) {
		minSize = min;
	}
	
	@SuppressWarnings("unused")
	private void createAndShowResizer() {
		String id = rootPane.htmlName + "_resizer";
		resizer = DOMNode.createElement("div", id);
		DOMNode.setSize(resizer, 10, 10);
		DOMNode.setStyles(resizer, 
				"background-color", "red", 
				"opacity", "0", 
				"cursor", "move"
		);
		$(resizer).addClass("swingjs-resizer");
		domNode.appendChild(resizer);
		JSFunction fHandleResizer = null, fHandleDOMResize = null;
		Object me = this;
		/**
		 * @j2sNative
		 * 
		 *            fHandleResizer = function(xyev,type){me.fHandleResizer(
		 *            xyev.dx, xyev.dy,type)}; 
		 * 
		 */
		{
		}
		// set to track size changes
		JSToolkit.J2S._setDraggable(resizer, new JSFunction[] { fHandleResizer });
		$(domNode).resize(fHandleDOMResize);
	}

	public void setPosition(int width, int height) {
		DOMNode.setPositionAbsolute(resizer, height + offsetx, width + offsety);		
	}
	
	public DOMNode getDOMNode() {
		return resizer;
	}
	
	/**
	 * 
	 * @param xyev
	 * @param type
	 */
	protected void fHandleResizer(int dx, int dy, int type) {
		switch (type) {
		case MouseEvent.MOUSE_PRESSED:
			DOMNode.setStyles(resizer, "background-color", "green");
			DOMNode.setCursor("move");
			// set cursor to dragging
			break;
		case MouseEvent.MOUSE_DRAGGED:
			break;
		case MouseEvent.MOUSE_RELEASED:
			DOMNode.setStyles(resizer, "background-color", "red");
			DOMNode.setCursor("auto");
			fHandleDOMResize(null, dx, dy);
		}
	}

	protected void fHandleDOMResize(Object event, int dw, int dh) {
		Rectangle r;
		if (event == null) {
			// from above
			r = getFrameOffset(dw, dh);			
		} else {
			// from some DOM event
			DOMNode.getRectangle(domNode, r = new Rectangle());
		}
		if (jframe == null) {
			rootPane.getGraphics().setColor(Color.WHITE);
			rootPane.getGraphics().fillRect(0, 0, r.width, r.height);
			rootPane.appletViewer.html5Applet._resizeApplet(new int[] {r.width, r.height});
		} else {
		jframe.setPreferredSize(new Dimension(r.width, r.height));
		jframe.invalidate();
		jframe.repackContainer();
		}
		setPosition(r.width, r.height);
		//Toolkit.getEventQueue().postEvent(new ComponentEvent(f, ComponentEvent.COMPONENT_RESIZED));
	}

	private JQueryObject $(DOMNode node) {
		return JSToolkit.getJQuery().$(node);
	}

  private Rectangle getFrameOffset(int dw, int dh) {
 	 Rectangle r = ((JSComponent) rpc).getBounds();			
			// from mouse release
			if (r.width + dw > minSize)
				r.width += dw;
			if (r.height + dh > minSize)
				r.height += dh;
			return r;
	}

}

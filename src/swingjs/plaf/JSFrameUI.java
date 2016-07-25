package swingjs.plaf;

import java.awt.event.MouseEvent;

import jsjava.awt.Dimension;
import jsjava.awt.Insets;
import jsjava.awt.Rectangle;
import jsjava.awt.Toolkit;
import jsjava.awt.event.ComponentEvent;
import jsjava.awt.event.WindowEvent;
import jsjava.awt.peer.FramePeer;
import jsjavax.swing.JFrame;
import swingjs.JSToolkit;
import swingjs.api.DOMNode;

public class JSFrameUI extends JSWindowUI implements FramePeer {
	
	// a window with a border and optional menubar and (though not here) min and max buttons

	// Adds a root pane to the JPanel content pane to connect the menubar with the content plane
	// manages the menu bar; would provide min/max buttons to a dialog.
	//
	// for our purposes, a frame will be synonymous with a non-imbedded applet or a dialog. 
	
	// Applet:                        xxx_appletinfotablediv   (fixed w&h)
	//                                  /                              \
	//        z 200000           xxx_swingdiv (rootpane, fixed w&h)      \
	//        z 200001           xxx_appletdiv (w,h 100%)           xxx_infotablediv (System.out)
	//        z 200002              xxx_canvas2d   (w,h 100%)
	//        z 200003              xxx_contentLayer  (fixed w&h)  
	//                           xxx_2dappletdiv (w,h 100%; could be used for the glassPane)
	//           
	

	private JFrame f;
	private String title;
	private int state;
	private boolean resizeable;
	private DOMNode resizer;
	private DOMNode closerWrap;

	public JSFrameUI() {
		frameZ += 1000;
		z = frameZ;
		isContainer = true;
		defaultHeight = 500;
		defaultWidth = 500;
		setDoc();
	}

	@Override
	public DOMNode createDOMNode() {
		if (domNode == null) {

			f = (JFrame) (Object) c;

			domNode = frameNode = newDOMObject("div", id + "_frame");
			DOMNode.setStyles(frameNode, "border-style", "solid",
					"border-width", "5px");
			setWindowClass(frameNode);
			int w = c.getWidth();
			int h = c.getHeight();
			if (w == 0)
				w = defaultWidth;
			if (h == 0)
				h = defaultHeight;
			DOMNode.setStyles(frameNode, "background", "white");
			DOMNode.setSize(frameNode, w, h);
			DOMNode.setPositionAbsolute(frameNode, f.getX(), f.getY());

			setJ2sMouseHandler(frameNode, true);
			titleBarNode = newDOMObject("div", id + "_titlebar");
			DOMNode.setPositionAbsolute(titleBarNode, 0, 0);
			DOMNode.setStyles(titleBarNode, "background-color", "#E0E0E0", "height",
					"20px", "font-size", "14px", "font-family", "sans-serif",
					"font-weight", "bold"// ,
					// "border-style", "solid",
					// "border-width", "1px"
			);

			titleNode = newDOMObject("label", id + "_title");
			DOMNode.setPositionAbsolute(titleNode, 0, 0);
			DOMNode.setStyles(titleNode, "height", "20px");
			setTitle(f.getTitle());

			closerWrap = newDOMObject("div", id + "_closerwrap");
			DOMNode.setPositionAbsolute(closerWrap, 0, 0);
			DOMNode.setStyles(closerWrap, "text-align", "right");

			closerNode = newDOMObject("label", id + "_closer", "innerHTML", "X");
			DOMNode.setStyles(closerNode, "background-color", "white", "width",
					"20px", "height", "20px", "position", "absolute", "text-align",
					"center", "right", "0px");
			DOMNode.addJqueryHandledEvent(this, closerNode,
					"click mouseenter mouseout");

			frameNode.appendChild(titleBarNode);
			
			// we have to wait until the frame is wrapped. 
			@SuppressWarnings("unused")
			DOMNode fnode = frameNode;
			Object fGetFrameParent = null;
			/**
			 * @j2sNative
			 * 
			 * fGetFrameParent = function(){me.notifyFrameMoved();return $(fnode).parent()}  
			 */
			{}
			JSToolkit.J2S._setDraggable(titleBarNode, fGetFrameParent);
			titleBarNode.appendChild(titleNode);
			titleBarNode.appendChild(closerWrap);
			closerWrap.appendChild(closerNode);
			Insets s = getInsets();
			DOMNode.setPositionAbsolute(frameNode, f.getY(), f.getX());
			DOMNode.setAttrs(frameNode, "width",
					"" + f.getWidth() + s.left + s.right, "height", "" + f.getHeight()
							+ s.top + s.bottom);

			menuBarNode = newDOMObject("div", id + "_menubar");

			containerNode = frameNode;
			setResizer();
		}
		setBoundsDOM(width, height);
		return domNode;
	}

	public void notifyFrameMoved() {
		Toolkit.getEventQueue().postEvent(new ComponentEvent(f, ComponentEvent.COMPONENT_MOVED));
	}
	
	@Override
	protected void setBoundsDOM(int width, int height) {
		DOMNode.setStyles(closerWrap, "text-align", "right", "width", width + "px");
		DOMNode.setStyles(titleNode, "width", width + "px", "height", "20px");
		DOMNode.setPositionAbsolute(resizer, height - 6, width - 6);		
	}
	
	private void setResizer() {
		if (!f.isResizable()) {
			$(resizer).hide();
			return;
		}
		if (resizer == null) {
			resizer = newDOMObject("div", id + "_resizer");
			DOMNode.setSize(resizer, 10, 10);
			DOMNode.setStyles(resizer, "background-color", "red");
		  frameNode.appendChild(resizer);
			Object fHandleResizer = null, fHandleDOMResize = null;
			Object me = this;
			/**
			 * @j2sNative
			 * 
			 * fHandleResizer = function(xyev,type){me.fHandleResizer(xyev.dx, xyev.dy,type)};
			 * fDOMResize = function(ev){me.fDOMResize(ev)};
			 */
			{}
    	JSToolkit.J2S._setDraggable(resizer, new Object[] {fHandleResizer});
			$(frameNode).resize(fHandleDOMResize);
		}
	}

	

	/**
	 * 
	 * @param xyev
	 * @param type
	 */
	public void fHandleResizer(int dx, int dy, int type) {


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
			fHandleResize(null, dx, dy);
			// resize frame
			// set cursor to standard
		}

	}

	private void fHandleResize(Object event, int dw, int dh) {
		Rectangle r = f.getBounds();
		if (event == null) {
			// from mouse release
			if (r.width + dw > 50)
				r.width += dw;
			if (r.height + dh > 50)
				r.height += dh;
		} else {
			// from some DOM event
			DOMNode.getRectangle(frameNode, r);
		}
		f.setPreferredSize(new Dimension(r.width, r.height));
		f.invalidate();
		f.validate();
		//Toolkit.getEventQueue().postEvent(new ComponentEvent(f, ComponentEvent.COMPONENT_RESIZED));
	}

	@Override
	public boolean handleJSEvent(Object target, int eventType, Object jQueryEvent) {
	  String type = "";
	  // we use == here because this will be JavaScript
		if (target == closerNode) {
			/**
			 * @j2sNative
			 * 
			 * type = jQueryEvent.type;
			 * 
			 */
			{}
			if (eventType == -1) {
		  	if (type == "click") {
		  		@SuppressWarnings("unused")
					DOMNode tbar = titleBarNode;
		  		/**
		  		 * @j2sNative  
		  		 * 
		  		 * 					J2S._setDraggable(tbar, false);

		  		 */
		  		{}
					f.dispatchEvent(new WindowEvent(f, WindowEvent.WINDOW_CLOSING));
					JSToolkit.J2S._jsUnsetMouse(frameNode);
					$(frameNode).remove();
					$(outerNode).remove();
					return true;		  		
		  	} else if (type.equals("mouseout")) {
			  	DOMNode.setStyles(closerNode, "background-color", "white");
					return true;
		  	} else if (type.equals("mouseenter")) {
			  	DOMNode.setStyles(closerNode, "background-color", "red");
					return true;
		  	}
		  }			
		}
		return false;
	}

	@Override
	protected void installJSUI() {
		// LookAndFeel.installColors(c,
		// "Frame.background",
		// "Frame.foreground");
	}

	@Override
	public void setTitle(String title) {
		this.title = title;
		DOMNode.setAttr(titleNode, "innerHTML", title);
	}

	@Override
	public void setMenuBar(Object mb) {
		// TODO Auto-generated method stub
		
	}

	@Override
	public void setResizable(boolean resizeable) {
		this.resizeable = resizeable;
	}

	@Override
	public void setState(int state) {
		this.state = state;
	}

	@Override
	public int getState() {
		return state;
	}

	@Override
	public void setMaximizedBounds(Rectangle bounds) {
		// TODO Auto-generated method stub
		
	}

	private Rectangle bounds;
	@Override
	public void setBoundsPrivate(int x, int y, int width, int height) {
	// only for embedded frames -- not supported in SwingJS
//		// includes frame insets or not?
//		// do we need to subtract them? Add them?
//		// is the width and height of a frame a measure of the internal contents pane?
		bounds = new Rectangle(x, y, width, height);
//		HTML5Canvas canvas = f.frameViewer.newCanvas();
//		if (contentNode != null)
//			DOMNode.remove(DOMNode.firstChild(contentNode));
//		contentNode.appendChild(canvas);
	}

	@Override
	public Rectangle getBoundsPrivate() {
		// only for embedded frames -- not supported in SwingJS
		return bounds;
	}

	@Override
	public Insets getInsets() {
		return jc.getFrameViewer().getInsets();
	}


}

package swingjs.plaf;

import java.awt.event.MouseEvent;

import jsjava.awt.Insets;
import jsjava.awt.Rectangle;
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
	private DOMNode[] resizerTabs = new DOMNode[9];

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
			DOMNode.setStyles(titleNode, "width", w + "px", "height", "20px");
			setTitle(f.getTitle());

			DOMNode closerWrap = newDOMObject("div", id + "_closerwrap");
			DOMNode.setPositionAbsolute(closerWrap, 0, 0);
			DOMNode.setStyles(closerWrap, "text-align", "right", "width", w + "px");

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
			 * fGetFrameParent = function(){return $(fnode).parent()}  
			 */
			{}
			JSToolkit.J2S._setDraggable(titleBarNode, fGetFrameParent);
			titleBarNode.appendChild(titleNode);
			titleBarNode.appendChild(closerWrap);
			closerWrap.appendChild(closerNode);
			Insets s = getInsets();
			DOMNode.setPositionAbsolute(frameNode, f.getY() - s.top, f.getX()
					- s.left);
			DOMNode.setAttrs(frameNode, "width",
					"" + f.getWidth() + s.left + s.right, "height", "" + f.getHeight()
							+ s.top + s.bottom);

			menuBarNode = newDOMObject("div", id + "_menubar");

			containerNode = frameNode;
			setResizer();
		}
		return domNode;
	}
	
	private void setResizer() {
		if (!f.isResizable()) {
			$(resizer).hide();
			return;
		}
		if (resizer == null) {
			resizer = newDOMObject("div", id + "_resizer");
			DOMNode.setStyles(resizer, "border", "1px dashed purple");
		  frameNode.appendChild(resizer);
			rResize = new Rectangle();
			Object fHandleResizer = null, fHandleDOMResize = null;
			Object me = this;
			/**
			 * @j2sNative
			 * 
			 * fHandleResizer = function(xyev,type){me.fHandleResizer(xyev,type)};
			 * fDOMResize = function(ev){me.fDOMResize(ev)};
			 */
			{}
			setResizeTabs(fHandleResizer);
			$(frameNode).resize(fHandleDOMResize);
		}
	}

	/**
	 * set position of 8 tabs around the frame
	 * 
	 * @param fHandleResize
	 */
	private void setResizeTabs(Object fHandleResizer) {
		boolean isNew = (fHandleResizer != null);
//  [0]----------[1]----------[2]
//	 |                         |   
//	 |                         |   
//	 |                         |   
//  [3]                       [4]   
//	 |                         |   
//	 |                         |
//	 |                         |   
//  [6]----------[7]----------[8]
		
		int w = 4 + width + rResize.width;
		int x = -2 + rResize.x;
		int y = -2 + rResize.y;
		int h = 4 + height + rResize.height;
		DOMNode.setPositionAbsolute(resizer, y, x);
		DOMNode.setSize(resizer, w, h);
		for (int pt = 0, i = 0; i <= 2; i++) {
			for (int j = 0; j <= 2; j++, pt++) {
				if (i == 1 && j == 1)
					continue;
				DOMNode tab = (isNew ? (resizerTabs[pt] = newDOMObject("div", id + "_resize_tab" + pt)) : resizerTabs[pt]);
				int top = y + i * h/2 - 4;
				int left = x + j * w/2 - 4;
			  DOMNode.setPositionAbsolute(tab, top, left);
			  if (isNew) {
			  	DOMNode.setAttr(tab, "data-pt", new int[] {pt});
			  	DOMNode.setSize(tab, 8, 8);
			  	DOMNode.setStyles(tab, "background-color","red");
			  	resizer.appendChild(tab);
			  	JSToolkit.J2S._setDraggable(tab, new Object[] {fHandleResizer});
			  }
			}
		}
	}

	private Rectangle rResize;
	

	private final static String[] controls = {
		"tl", "t_","tw", "_l", "__", "_w", "hl", "h_", "hw" 
	};
	

	/**
	 * 
	 * @param xyev
	 * @param type
	 */
	public void fHandleResizer(Object xyev, int type) {

		int dx = 0, dy = 0, pt = 0;
		DOMNode tab = null;
		/**
		 * @j2sNative
		 * 
		 *            dx = xyev.dx; 
		 *            dy = xyev.dy; 
		 *            tab = xyev.ev.currentTarget; 
		 *            pt = tab["data-pt"][0];
		 */
		{
		}

		switch (type) {
		case MouseEvent.MOUSE_PRESSED:
			rResize = new Rectangle();
			// set cursor to dragging
			break;
		case MouseEvent.MOUSE_DRAGGED:
			switch (controls[pt].charAt(0)) {
			case 't':
				rResize.y = dy;
				rResize.height = -dy;
				break;
			case 'h':
				rResize.height = dy;
				break;
			}
			switch (controls[pt].charAt(1)) {
			case 'l':
				rResize.x = dx;
				rResize.width = -dx;
				break;
			case 'w':
				rResize.width = dx;
				break;
			}
			setResizeTabs(null);
			break;
		case MouseEvent.MOUSE_RELEASED:
			fHandleResize(null);
			// resize frame
			// set cursor to standard
		}

	}
	private void fHandleResize(Object event) {
		Rectangle r = f.getBounds();
		if (event == null) {
			// from mouse release
			r.x += rResize.x;
			r.y += rResize.y;
			r.width += rResize.width;
			r.height += rResize.height;
		} else {
			// from some DOM event
	   DOMNode.getRectangle(frameNode, r);
		}
		rResize = new Rectangle();
		f.setBounds(r);
		f.validate();
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

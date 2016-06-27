package swingjs.plaf;

import jsjava.awt.Insets;
import jsjava.awt.Rectangle;
import jsjava.awt.event.WindowEvent;
import jsjava.awt.peer.FramePeer;
import jsjavax.swing.JFrame;
import swingjs.api.DOMNode;
import swingjs.api.HTML5Canvas;

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

	public JSFrameUI() {
		frameZ = 19000;
		isContainer = true;
		defaultHeight = 500;
		defaultWidth = 500;
		setDoc();
	}

	@Override
	public DOMNode createDOMNode() {
		if (domNode == null) {

			f = (JFrame) (Object) c;

			domNode = frameNode = createDOMObject("div", id + "_frame");
			DOMNode.setStyles(frameNode, 
					"z-index", "" + frameZ++,
					"border-style", "solid", 
					"border-width", "5px"
					);
			int w = c.getWidth();
			int h = c.getHeight();
			if (w == 0)
				w = defaultWidth;
			if (h == 0)
				h = defaultHeight;
			DOMNode.setStyles(frameNode, "background", "white");
			DOMNode.setSize(frameNode, w, h);
			DOMNode.setPositionAbsolute(frameNode, f.getX(), f.getY());
			
			titleBarNode = createDOMObject("div", id + "_titlebar");
			DOMNode.setPositionAbsolute(titleBarNode, 0, 0);
			DOMNode.setStyles(titleBarNode, 
					"background-color", "#E0E0E0",
					"height", "20px", 
					"font-size", "14px", 
					"font-family", "sans-serif", 
					"font-weight", "bold"//,
//					"border-style", "solid",
//					"border-width", "1px"
					);
			
      titleNode = createDOMObject("label", id + "_title");
			DOMNode.setPositionAbsolute(titleNode, 0, 0);
			DOMNode.setStyles(titleNode, 
					"width", w + "px",
					"height", "20px"
					);
			setTitle(f.getTitle());
			
			DOMNode closerWrap = createDOMObject("div", id + "_closerwrap");
			DOMNode.setPositionAbsolute(closerWrap, 0, 0);
			DOMNode.setStyles(closerWrap, "text-align", "right", "width", w + "px"); 

			closerNode = createDOMObject("label", id + "_closer", "innerHTML", "X");
			DOMNode.setStyles(closerNode, 
					"background-color", "white",
					"width", "20px",
					"height", "20px",
					"position", "absolute",
					"text-align", "center",
					"right", "0px"
			);
			DOMNode.addJqueryHandledEvent(this, closerNode, "click mouseenter mouseout");
			
			DOMNode.add(frameNode, titleBarNode);
			DOMNode.add(titleBarNode, titleNode);
			DOMNode.add(titleBarNode, closerWrap);
			DOMNode.add(closerWrap, closerNode);
			contentNode = DOMNode.createElement("div", id+"_content");
			DOMNode.setPositionAbsolute(contentNode, 0, 0);
			DOMNode.setAttrs(contentNode, "width",  "" + f.getWidth(), "height", "" + f.getHeight());
			Insets s = getInsets();
			DOMNode.setPositionAbsolute(frameNode,  f.getY() - s.top, f.getX() - s.left);
			DOMNode.setAttrs(frameNode, "width",  "" + f.getWidth() + s.left + s.right, "height", "" + f.getHeight() + s.top + s.bottom);
			
			
			DOMNode.add(frameNode, contentNode);

			menuBarNode = createDOMObject("div", id + "_menubar");
			
			containerNode = frameNode;
		}
		return domNode;
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
			System.out.println(id + " event " + type);
			if (eventType == -1) {
		  	if (type == "click") {
					f.dispatchEvent(new WindowEvent(f, WindowEvent.WINDOW_CLOSING));
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
		// includes frame insets or not?
		// do we need to subract them? Add them?
		// is the width and height of a frame a measure of the internal contents pane?
		bounds = new Rectangle(x, y, width, height);
		HTML5Canvas canvas = f.frameViewer.newCanvas();
		if (contentNode != null)
			DOMNode.remove(DOMNode.firstChild(contentNode));
		DOMNode.add(contentNode, canvas);
	}

	@Override
	public Rectangle getBoundsPrivate() {
		return bounds;
	}

	@Override
	public Insets getInsets() {
		return new Insets(30, 10, 10, 15);
	}


}

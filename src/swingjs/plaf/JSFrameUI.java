package swingjs.plaf;

import swingjs.api.DOMNode;

public class JSFrameUI extends JSWindowUI {

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
	// not implemented: layeredPane
	
	public JSFrameUI() {
		frameZ = 19000;
		isContainer = true;
		setDoc();
	}

	@Override
	public DOMNode getDOMObject() {
		if (domNode == null)
			domNode = createDOMObject("div", id);
		DOMNode.setStyles(domNode,  "z-index", "" + frameZ++);
		return domNode;
	}

	@Override
	protected void installJSUI() {
		// LookAndFeel.installColors(c,
		// "Frame.background",
		// "Frame.foreground");
	}

	@Override
	protected void uninstallJSUI() {
	}

}

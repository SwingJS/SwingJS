package swingjs.plaf;

import swingjs.api.DOMNode;

public class JSDialogUI extends JSWindowUI {

	// really the same as Frame -- just no max/min buttons, which an applet would 
	// not use anyway. 
	
	public JSDialogUI() {
		frameZ = 40000;
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

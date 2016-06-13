package swingjs.plaf;

import swingjs.api.DOMNode;

public class JSDialogUI extends JSFrameUI {

	// a frame without min/max buttons; typically modal 
	
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
		outerNode = wrap("div", id, domNode);
		$(body).append(outerNode);
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

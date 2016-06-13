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
		outerNode = wrap("div", id, domNode);
		DOMNode.setStyles(outerNode,  "z-index", "" + frameZ++);
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

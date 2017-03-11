package swingjs.plaf;

import jsjava.awt.Dimension;
import swingjs.api.DOMNode;

public class JSRootPaneUI extends JSLightweightUI {

	Resizer resizer;
	
	void setResizer(Resizer resizer) {
		this.resizer = resizer;
	}

	public JSRootPaneUI() {
		isRootPane = isContainer = true;
		setDoc();
	}

	@Override
	protected DOMNode updateDOMNode() {
		if (domNode == null) {
			domNode = newDOMObject("div", id);
			DOMNode.setStyles(domNode, "overflow","hidden");
		}
		// add code here for adjustments when changes in bounds or other properties occur.
		return domNode;
	}

	@Override
	protected void installUIImpl() {
	}

	@Override
	protected void uninstallUIImpl() {
	}

	@Override
	public Dimension getPreferredSize() {
  	return null;
  }

	@Override
	protected void setInnerComponentBounds(int width, int height) {
		Resizer resizer = jc.getFrameViewer().getResizer();
		if (resizer != null)
			resizer.setPosition(0, 0);
	}
	
}

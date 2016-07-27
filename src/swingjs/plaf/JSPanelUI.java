package swingjs.plaf;


import jsjava.awt.Dimension;

import jsjavax.swing.JRootPane;
import jsjavax.swing.LookAndFeel;

import swingjs.api.DOMNode;

public class JSPanelUI extends JSLightweightUI {

	int frameZ = 10000;
	private boolean isContentPane;
	public JSPanelUI() {
		isContainer = true;
		setDoc();
	}
	
	@Override
	public DOMNode createDOMNode() {
		if (domNode == null) {
			JRootPane root = jc.getRootPane();
			isContentPane = (jc == root.getContentPane());
			domNode = newDOMObject("div", id);
			if (isContentPane)
				DOMNode.setStyles(domNode, "overflow", "hidden");
			if (root != null && root.getGlassPane() == c)
				DOMNode.setStyles(domNode, "display", "none");
		}
    return domNode;
	}

	@Override
  protected Dimension setHTMLSize(DOMNode obj, boolean addCSS) {
		// SwingJS for now: just designated container width/height 
		return new Dimension(c.getWidth(), c.getHeight());
	}
	

	@Override
	protected void installUIImpl() {
    LookAndFeel.installColorsAndFont(jc,
        "Panel.background",
        "Panel.foreground",
        "Panel.font");
	}

	@Override
	protected void uninstallUIImpl() {
		// TODO Auto-generated method stub
		
	}

	@Override
	public Dimension getPreferredSize() {
  	return null;
  }


}

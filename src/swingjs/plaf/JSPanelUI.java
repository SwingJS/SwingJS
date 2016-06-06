package swingjs.plaf;


import jsjava.awt.Dimension;

import jsjavax.swing.JComponent;
import jsjavax.swing.LookAndFeel;

import swingjs.api.DOMNode;

public class JSPanelUI extends LightweightUI {

	int frameZ = 10000;
	public JSPanelUI() {
		isContainer = true;
		setDoc();
	}
	
	@Override
	public DOMNode getDOMObject() {
		if (domNode == null)
			domNode = createDOMObject("label", id);
    return domNode;
	}

	@Override
  protected Dimension setHTMLSize(DOMNode obj, boolean addCSS) {
		// SwingJS for now: just designated container width/height 
		return new Dimension(c.getWidth(), c.getHeight());
	}
	
	@Override
	public Dimension getPreferredSize(JComponent c) {
		Dimension d = new Dimension(c.getWidth(), c.getHeight());
		if (d.width <= 0 || d.height <= 0)
			d = c.getPreferredSize();
		return d;
	}

	@Override
	protected void installJSUI() {
    LookAndFeel.installColorsAndFont(c,
        "Panel.background",
        "Panel.foreground",
        "Panel.font");
	}

	@Override
	protected void uninstallJSUI() {
		// TODO Auto-generated method stub
		
	}

}

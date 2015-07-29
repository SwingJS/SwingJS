package swingjs.plaf;


import jsjava.awt.Dimension;

import jsjavax.swing.JComponent;
import jsjavax.swing.LookAndFeel;

import swingjs.api.DOMNode;

public class JSPanelUI extends JSComponentUI {

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
		// SwingJS must defer to Panel or JPanel to set its own dimensions
		return null;
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

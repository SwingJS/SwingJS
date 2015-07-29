package swingjs.plaf;


import jsjava.awt.Dimension;

import jsjavax.swing.JComponent;
import jsjavax.swing.LookAndFeel;

import swingjs.api.DOMNode;

public class JSPopupMenuUI extends JSMenuUI {

	public JSPopupMenuUI() {
		isContainer = true;
		setDoc();
	}
	
	@Override
	public DOMNode getDOMObject() {
		if (domNode == null)
			domNode = createDOMObject("select", id);
    return domNode;
	}

	@Override
  protected Dimension setHTMLSize(DOMNode obj, boolean addCSS) {
		// SwingJS for now: just designated container width/height 
		return new Dimension(c.getWidth(), c.getHeight());
	}
	
	@Override
	public Dimension getPreferredSize(JComponent c) {
		// SwingJS should defer to containing panel
		return null;
	}

	@Override
	protected void installJSUI() {
    LookAndFeel.installColorsAndFont(c,
        "PopupMenu.background",
        "PopupMenu.foreground",
        "PopupMenu.font");
	}

	@Override
	protected void uninstallJSUI() {
		// TODO Auto-generated method stub
		
	}

}

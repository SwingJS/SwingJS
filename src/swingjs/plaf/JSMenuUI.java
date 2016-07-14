package swingjs.plaf;

import jsjava.awt.Dimension;
import jsjavax.swing.JMenu;
import jsjavax.swing.JMenuItem;
import jsjavax.swing.LookAndFeel;
import swingjs.J2SRequireImport;
import swingjs.JSToolkit;
import swingjs.api.DOMNode;


@J2SRequireImport(swingjs.jquery.JQueryUI.class)
public class JSMenuUI extends JSMenuItemUI {

	private JMenu jm;
	private int childWidth;

	public JSMenuUI() {
		hasOuterDiv = false;
		isContainer = true;
		setDoc();
	}

	@Override
	public DOMNode createDOMNode() {
		if (domNode == null) {
			menuItem = (JMenuItem) c;
			jm = (JMenu) jc;
			domNode = createItem("_menu", null);
			containerNode = createDOMObject("ul", id);
			DOMNode.setStyles(containerNode, "margin", "1px 5px 1px 5px");
			domNode.appendChild(containerNode);
		}
		setChildWidth();
		return domNode;

	}

	private void setChildWidth() {
		children = jm.getPopupMenu().getComponents();
		int wmax = 50;
		for (int i = children.length; --i >= 0;) {
			JMenuItem child = (JMenuItem) children[i];
			Dimension d = child.getPreferredSize();
			if (d.width > wmax)
				wmax = d.width;
		}
		childWidth = wmax;
	}

	// @Override
	// protected void installJSUI() {
	// LookAndFeel.installColorsAndFont(jc, "Menu.background", "Menu.foreground",
	// "Menu.font");
	// }
	//
	// @Override
	// protected void uninstallJSUI() {
	// // TODO Auto-generated method stub
	//
	// }

	@Override
	protected int getContainerWidth() {
		Dimension d = setHTMLSize1(domNode, false, false);
		// left:0 for menu bar items; left: d.width for others
		DOMNode.setStyles(containerNode, "width", childWidth + "px", "left",
				(c.getParent().uiClassID == "MenuBarUI" ? 0 : d.width) + "px");
		return d.width;
	}


}

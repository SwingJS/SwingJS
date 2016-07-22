package swingjs.plaf;

import jsjava.awt.Dimension;
import jsjavax.swing.JLabel;
import jsjavax.swing.JMenu;
import jsjavax.swing.JMenuItem;
import swingjs.J2SRequireImport;
import swingjs.api.DOMNode;


@J2SRequireImport(swingjs.jquery.JQueryUI.class)
public class JSMenuUI extends JSMenuItemUI {

	private JMenu jm;
	private int childWidth;
//	private boolean isMenuBarMenu;

	public JSMenuUI() {
		setDoc();
	}

	// protected void installJSUI(){
	// super.installJSUI();
	// isMenuBarMenu = (c.getParent().uiClassID == "MenuBarUI");
	// // hasOuterDiv = isMenuBarMenu;
	// // isContainer = !isMenuBarMenu;
	// }

	@Override
	public DOMNode createDOMNode() {
		if (domNode == null) {
			menuItem = (JMenuItem) c;
			jm = (JMenu) jc;
			if (menuItem.getParent().uiClassID == "MenuBarUI") {
				domNode = createDOMObject("label", id);
				setCssFont(DOMNode.setAttr(domNode, "innerHTML", menuItem.getText()),
						c.getFont());
			} else {
				hasOuterDiv = false;
				domNode = createItem("_menu", null);
				containerNode = createDOMObject("ul", id);
				DOMNode.setStyles(containerNode, "margin", "1px 5px 1px 5px");
				domNode.appendChild(containerNode);
			}
		}
		// if (!isMenuBarMenu)
		// setChildWidth();
		return domNode;

	}

//	private void setChildWidth() {
//		children = jm.getPopupMenu().getComponents();
//		int wmax = 50;
//		for (int i = children.length; --i >= 0;) {
//			JMenuItem child = (JMenuItem) children[i];
//			Dimension d = child.getPreferredSize();
//			if (d.width > wmax)
//				wmax = d.width;
//		}
//		childWidth = wmax;
//	}

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

//	@Override
//	protected int getContainerWidth() {
//		Dimension d = setHTMLSize1(domNode, false, false);
//		// left:0 for menu bar items; left: d.width for others
//		DOMNode.setStyles(containerNode, "width", childWidth + "px", "left",
//				(isMenuBarMenu ? 0 : d.width) + "px");
//		return d.width;
//	}

	@Override
	public Dimension getMaximumSize() {
		return getPreferredSize();
	}


	
}

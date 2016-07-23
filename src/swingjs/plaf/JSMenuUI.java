package swingjs.plaf;

import jsjava.awt.Component;
import jsjava.awt.Dimension;
import jsjavax.swing.JLabel;
import jsjavax.swing.JMenu;
import jsjavax.swing.JMenuItem;
import swingjs.J2SRequireImport;
import swingjs.api.DOMNode;


@J2SRequireImport(swingjs.jquery.JQueryUI.class)
public class JSMenuUI extends JSMenuItemUI {

	private JMenu jm;
  private boolean isMenuBarMenu;

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
			menuItem = jm = (JMenu) jc;
			isMenuBarMenu = jm.isTopLevelMenu();
			if (isMenuBarMenu) {
				domNode = createDOMObject("label", id);
				setCssFont(DOMNode.setAttr(domNode, "innerHTML", menuItem.getText()),
						c.getFont());
				setDataComponent(domNode);
			} else {
				hasOuterDiv = false;
				containerNode = domNode = createItem("_menu", null);
			}
		}
		return domNode;

	}

	@Override
	protected Component[] getChildren() {
		return (isMenuBarMenu ? jm.getComponents(): new Component[] { jm.getPopupMenu() } );
	}

	@Override
	public Dimension getMaximumSize() {
		return getPreferredSize();
	}


	
}

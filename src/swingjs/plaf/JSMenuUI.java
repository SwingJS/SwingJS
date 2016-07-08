package swingjs.plaf;

import jsjava.awt.Dimension;
import jsjavax.swing.JMenu;
import jsjavax.swing.JMenuItem;
import jsjavax.swing.LookAndFeel;
import swingjs.J2SRequireImport;
import swingjs.JSToolkit;
import swingjs.api.DOMNode;

// see https://dev7studios.com/dropit/

@J2SRequireImport(swingjs.jquery.JQueryUI.class)
public class JSMenuUI extends JSMenuItemUI {

	private JMenu jm;

	public JSMenuUI() {
		hasOuterDiv = false;
		isContainer = true;
		setDoc();
	}

	@Override
	public DOMNode createDOMNode() {
		if (domNode == null) {
			mi = (JMenuItem) jc;
			jm = (JMenu) jc;
			domNode = createItem("_menu", null);
			containerNode = createDOMObject("ul", id);
			domNode.appendChild(containerNode);
		}
		children = jm.getPopupMenu().getComponents();
		return domNode;

	}

	@Override
	protected Dimension setHTMLSize(DOMNode obj, boolean addCSS) {
		// SwingJS for now: just designated container width/height
		return new Dimension(50, 25);
	}

	@Override
	public Dimension getPreferredSize() {
		return new Dimension(50, 25);
	}

	@Override
	protected void installJSUI() {
		LookAndFeel.installColorsAndFont(jc, "Menu.background", "Menu.foreground",
				"Menu.font");
	}

	@Override
	protected void uninstallJSUI() {
		// TODO Auto-generated method stub

	}

	protected int getCompWidth() {
		return width = 50;
	}


}

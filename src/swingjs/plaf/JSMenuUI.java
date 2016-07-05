package swingjs.plaf;

import jsjavax.swing.JMenu;
import jsjavax.swing.JMenuItem;
import jsjavax.swing.LookAndFeel;
import swingjs.J2SRequireImport;
import swingjs.JSToolkit;
import swingjs.api.DOMNode;

// see https://dev7studios.com/dropit/

@J2SRequireImport(swingjs.jquery.JQueryUI.class)
public class JSMenuUI extends JSMenuItemUI {

	static {
		JSToolkit.getJavaResource("swingjs/jquery/dropit.css", true);
		JSToolkit.getJavaResource("swingjs/jquery/dropit.js", true);
	}

	private JMenu jm;
	private String myClass;

	public JSMenuUI() {
		isContainer = true;
		setDoc();
	}

	@Override
	public DOMNode createDOMNode() {
		if (domNode == null) {
			containerNode = domNode = createDOMObject("ul", id);
			jm = (JMenu) jc;
			children = jm.getPopupMenu().getComponents();
			myClass = "swingjs-menu-" + id;
			$(domNode).addClass("swingjs");
			$(domNode).addClass(myClass);
			$(domNode).addClass("dropit");
			mi = (JMenuItem) jc;
			addItem();
			domNode.appendChild(itemNode);
		}
		return domNode;

	}

	@Override
	protected DOMNode setHTMLElement() {
		DOMNode node = setHTMLElementCUI();
		/**
		 * @j2sNative
		 * 
		 * 
		 *            this.$(this.myClass).dropit();
		 */
		{
		}
		return node;
	}

	// @Override
	// protected Dimension setHTMLSize(DOMNode obj, boolean addCSS) {
	// // SwingJS for now: just designated container width/height
	// return new Dimension(c.getWidth(), c.getHeight());
	// }
	//
	// @Override
	// public Dimension getPreferredSize() {
	// // SwingJS should defer to containing panel
	// return null;
	// }

	@Override
	protected void installJSUI() {
		LookAndFeel.installColorsAndFont(jc, "Menu.background", "Menu.foreground",
				"Menu.font");
	}

	@Override
	protected void uninstallJSUI() {
		// TODO Auto-generated method stub

	}

	@Override
	protected int getCompHeight() {
		return height = 30;
	}

}

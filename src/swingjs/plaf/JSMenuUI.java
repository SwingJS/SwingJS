package swingjs.plaf;


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
	
	public JSMenuUI() {
		isContainer = true;
		setDoc();
	}

	@Override
	public DOMNode createDOMNode() {
		if (domNode == null) {
			containerNode = domNode = createDOMObject("ul", id);
			$(domNode).addClass("swingjs");
			String myClass = "swingjs-menu-" + id;
			$(domNode).addClass(myClass);
			mi = (JMenuItem) jc;
			addItem();
		  domNode.appendChild(itemNode);
		}
		
		
		/**
		 * @j2sNative
		 * 
		 * 
		 *            $(myClass).dropit();
		 */
		{}
		

		
		return domNode;
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

}

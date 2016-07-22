package swingjs.plaf;


import jsjava.awt.Dimension;
import jsjavax.swing.JMenu;
import jsjavax.swing.JPopupMenu;
import jsjavax.swing.LookAndFeel;
import swingjs.JSToolkit;
import swingjs.api.DOMNode;
import swingjs.api.JSSwingMenu;

public class JSPopupMenuUI extends JSPanelUI {
	
	// a frameless independent window
	
	static JSSwingMenu j2sSwing;
	static {
		
		// this mechanism allows on-demand loading of the CSS and JS used for the menu 
		
		JSToolkit.getJavaResource("swingjs/jquery/j2sMenu.js", true);
		/**
		 * @j2sNative
		 * 
		 * swingjs.plaf.JSPopupMenuUI.j2sSwing = J2S.Swing;
		 */
		{}
	}

	private JPopupMenu menu;


	public JSPopupMenuUI() {
		isContainer = true;
		
		setDoc();
	}
	
	@Override
	public DOMNode createDOMNode() {
		if (domNode == null) {
			containerNode = domNode = createDOMObject("ui", id);
			$(domNode).addClass("swingjsPopupMenu");
		}
    return domNode;
	}

	@Override
	protected int getContainerHeight() {
		return height = 25;
	}
	@Override
	protected Dimension setHTMLSize(DOMNode obj, boolean addCSS) {
		return new Dimension(150, 25);
	}

	@Override
	public Dimension getPreferredSize() {
		// SwingJS should defer to containing panel
		return null;
	}

	@Override
	protected void installJSUI() {
    LookAndFeel.installColorsAndFont(jc,
        "PopupMenu.background",
        "PopupMenu.foreground",
        "PopupMenu.font");
	}

	@Override
	protected void uninstallJSUI() {
		// TODO Auto-generated method stub
		
	}

	public Object getPopup() {
		// TODO: this causes an uncaught error. 
		return null;		
	}


	/**
	 * j2s bug here makes this overrideMethod, but it cannot override if it has a super call!
	 * 
	 */
	public void setVisible(boolean b) {
		if (menu == null) {
			menu = (JPopupMenu) c;
			j2sSwing.setMenu(menu);
		}
		if (b) {
			getOuterNode();
			int x = 0, y = 0;
			
			/**
			 * have to cheat here, because we want screen coordinates
			 * 
			 * @j2sNative
			 * 
			 * x = this.menu.desiredLocationX;
			 * y = this.menu.desiredLocationY;
			 * 
			 */
			{}
			j2sSwing.showMenu(menu, x, y);
		} else {
			j2sSwing.hideMenu(menu);
		}
	}
	
	@Override
	public void dispose() {
    DOMNode.remove(domNode);
    DOMNode.remove(outerNode);
    j2sSwing.disposeMenu(menu);
	}

}

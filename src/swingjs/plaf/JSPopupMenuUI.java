package swingjs.plaf;


import jsjava.awt.Dimension;
import jsjavax.swing.JComponent;
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
	private boolean isTopLevel;
	private JPopupMenu popupMenu;


	public JSPopupMenuUI() {
		isContainer = true;	
		setDoc();
	}
	
	@Override
	public DOMNode createDOMNode() {
		// j2sMenu.js will wrap this in a div with the appropriate
		if (domNode == null) {
			popupMenu = (JPopupMenu) jc;
			isTopLevel = (!(popupMenu.getInvoker() instanceof JMenu) 
					|| ((JMenu) popupMenu.getInvoker()).isTopLevelMenu());
			hasOuterDiv = false;
			domNode = containerNode = createDOMObject("ul", id);
		}
		return domNode;
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
	 * j2s bug in this particular method makes this Clazz.overrideMethod, 
	 * but it cannot override if it has a super call,
	 * so I avoid the super call by duplicating the code from JSComponentUI
	 * 
	 */
	@Override
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

	@Override
	public Dimension getPreferredSize() {
		// unnecessary  -- will never be subject to a layout manager
		return null;
	}


}

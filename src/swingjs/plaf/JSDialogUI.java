package swingjs.plaf;


public class JSDialogUI extends JSFrameUI {

	// These dialogs are not modal. 
	// Someday, perhaps, HTML5 will implement broadly the <dialog> element,
	// but for now that is not the case, and we can only do modal dialogs
	// using alert(), prompt(), and confirm(). For these we use JOptionPane
	// and no peer or ui.
	//
	// a frame without min/max buttons
	
	// uses Frame.createDOMNode()
	
	public JSDialogUI() {
		z = frameZ + 500;
		isFrame = true;
		isDialog = true;
		defaultWidth = 500;
		defaultHeight = 300;
		setDoc();
	}

	@Override
	protected void installJSUI() {
		// LookAndFeel.installColors(c,
		// "Frame.background",
		// "Frame.foreground");
	}

	@Override
	protected void uninstallJSUI() {
	}

}

package swingjs.plaf;


public class JSDialogUI extends JSFrameUI {

	// TODO: modal type
	
	// a frame without min/max buttons; typically modal
	
	// uses Frame.createDOMNode()
	
	public JSDialogUI() {
		z = frameZ + 40000;
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

package swingjs.plaf;


public class JSColorChooserUI extends JSDialogUI {


	public JSColorChooserUI() {
		z = frameZ + 500;
		isFrame = true;
		isDialog = true;
		defaultWidth = 300;
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

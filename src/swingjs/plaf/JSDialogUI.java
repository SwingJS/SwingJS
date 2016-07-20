package swingjs.plaf;

import java.util.List;

import jsjava.awt.Window;
import jsjava.awt.peer.DialogPeer;


public class JSDialogUI extends JSFrameUI implements DialogPeer {

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

	@Override
	public void blockWindows(List<Window> windows) {
		// TODO Auto-generated method stub
		
	}

}

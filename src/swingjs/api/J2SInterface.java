package swingjs.api;

import swingjs.JSThread;

/** 
 * called by JSmol JavaScript methods using
 * 
 *  this._applet.xxxx()
 *  
 */
public interface J2SInterface {

	void _jsSetMouse(DOMNode frameNode, boolean isSSwingJS);

	void _jsUnsetMouse(DOMNode frameNode);

	HTML5Applet _findApplet(String htmlName);

	String _getJavaVersion();

	void _readyCallback(String appId, String fullId, boolean isReady, 
			Object javaApplet, Object javaAppletPanel);

	void _setAppletThread(String appletName, JSThread myThread);

	Object _getFileData(String fileName, Object fSuccess, boolean doProcess);

	void _setDraggable(DOMNode tagNode, Object targetNodeOrFDown);

	int _setWindowZIndex(DOMNode domNode, int pos);

	void _getFileFromDialog(JSFunction f, String type);

	void _saveFile(String fileName, Object data, String mimeType, String encoding);

}

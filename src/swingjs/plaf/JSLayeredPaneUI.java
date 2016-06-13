package swingjs.plaf;


import swingjs.api.DOMNode;

public class JSLayeredPaneUI extends JSLightweightUI {

	public JSLayeredPaneUI() {
		isContainer = true;
	}
	
	@Override
	public DOMNode getDOMObject() {
		if (domNode == null) {
			domNode = createDOMObject("div", id);
		}
    return domNode;
	}

	@Override
	protected void installJSUI() {
		// TODO Auto-generated method stub
		
	}

	@Override
	protected void uninstallJSUI() {
		// TODO Auto-generated method stub
		
	}


}

package swingjs.plaf;

//import jsjava.awt.FontMetrics;
import jsjavax.swing.text.JTextComponent;
import swingjs.api.DOMNode;
import swingjs.api.JSFunction;

/**
 * SWingJS implementation of stateful user interface for buttons. 
 * Modeled after javax.swing.plaf.basic.BasicButtonUI.java (commented out below).
 * 
 * @author RM
 *
 */
public class JSTextAreaUI extends JSTextUI {

	/**
	 * the radio or check-box or simple button
	 * 
	 */
	protected DOMNode domBtn;

	@Override
	public DOMNode getDOMObject() {
		if (domNode == null) {
			updateHandler.checkDocument();
			domBtn = focusNode = enableNode = textNode = domNode = createDOMObject("textarea", id);
			bindMouse(domNode);
			bindKeys(domNode);
		}
		setCssFont(
				DOMNode.setAttr(domNode, "innerHTML", ((JTextComponent) c).getText()),
				c.getFont());
		return domNode;
	}

	
	private void bindKeys(DOMNode domNode) {
		JSFunction f = null;
		JSEventHandler me = this;
		/**
		 * @j2sNative
		 *   
		 *    f = function(event) { me.handleJSEvent(me.domNode, 401, event) }
		 */
		{
		  System.out.println(me);
		}
		$(domNode).bind("keydown keypress keyup", f);

		// TODO Auto-generated method stub
		
	}


}

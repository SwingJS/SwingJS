package swingjs.plaf;

//import jsjava.awt.FontMetrics;
import jsjava.awt.Color;
import jsjava.awt.Dimension;
import jsjava.awt.event.MouseMotionListener;
import jsjavax.swing.text.JTextComponent;
import swingjs.JSToolkit;
import swingjs.api.DOMNode;
import swingjs.api.JSFunction;

/**
 * SWingJS implementation of stateful user interface for buttons. 
 * Modeled after javax.swing.plaf.basic.BasicButtonUI.java (commented out below).
 * 
 * @author RM
 *
 */
public class JSTextFieldUI extends JSTextUI {

	/**
	 * the radio or check-box or simple button
	 * 
	 */
	protected DOMNode domBtn;

	@Override
	public DOMNode getDOMObject() {
		if (domNode == null) {
			updateHandler.checkDocument();
			domBtn = enableNode = valueNode = domNode = DOMNode.setStyles(createDOMObject("input", id,
					"type", "text"), "padding", "0px 1px");
			vCenter(domNode, -10);
			bindMouse(domNode);
			bindKeys(domNode);
		}
		setCssFont(
				DOMNode.setAttr(domNode, "value", ((JTextComponent) c).getText()),
				c.getFont());
		return domNode;
	}

	
	@Override
	protected Dimension getCSSDimension(int w, int h) {
		return new Dimension(w, h - 2);
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
		JSToolkit.getJQuery().$(domNode).bind("keydown keypress keyup", f);

		// TODO Auto-generated method stub
		
	}


}

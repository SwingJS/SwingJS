package swingjs.api;

import swingjs.JSToolkit;
import swingjs.plaf.JSComponentUI;

public abstract class DOMNode {

	public abstract void appendChild(DOMNode object);

	public abstract boolean hasFocus();

	public abstract boolean play();

	public abstract DOMNode removeChild(DOMNode object);

	public abstract DOMNode removeAttribute(String attr);
	
	public abstract void setSelectionRange(int pt0, int pt1);

	public static DOMNode createElement(String key, String id) {
		DOMNode obj = null;
		/**
		 * 
		 * @j2sNative
		 * 					obj = document.createElement(key); 
		 *          obj.id = id;
		 */
		{
		}
		return obj;
	}

	public static DOMNode getParent(DOMNode obj) {
		/**
		 * @j2sNative
		 * 
		 *            return obj.parentNode;
		 * 
		 */
		{
			return null;
		}
	}

	/**
	 * remove this object and return its parent
	 * @param obj
	 * @return parent or null
	 */
	public static DOMNode remove(DOMNode obj) {
		if (obj == null)
			return null;
		/**
		 * @j2sNative
		 * 
		 * try {
		 *   var p = obj.parentNode;
		 *   p.removeNode(obj);
		 *   $(body).remove(obj);
		 * } catch(e) {
		 * };
		 * return p;
		 */
		{
			return null;
		}
	}
	
	/**
	 * note: this works with 'checked' as well
	 * 
	 * @param obj
	 * @param attr
	 * @return
	 */
	public static Object getAttr(DOMNode obj, String attr) {
		/**
		 * @j2sNative
		 * 
		 *       if (obj)return obj[attr];
		 * 
		 */
		{
			return null;
		}
	}

	public String getStyle(String style) {
		/**
		 * @j2sNative
		 * 
		 *       if (obj)return obj.style[style];
		 * 
		 */
		{
			return null;
		}
	}
	public static DOMNode setAttr(DOMNode obj, String attr, Object val) {
		/**
		 * @j2sNative
		 * 
		 *            obj[attr] = (val == "TRUE" ? true : val);
		 * 
		 */
		{
		}
		return obj;
	}

	public static DOMNode setAttrs(DOMNode obj, Object... attr) {
		/**
		 * @j2sNative
		 * 
		 *            for (var i = 0; i < attr.length;) { 
		 *            obj[attr[i++]] = attr[i++]; }
		 * 
		 */
		{
		}
		return obj;
	}

	public static DOMNode setStyles(DOMNode obj, String... attr) {
		/**
		 * @j2sNative
		 * 
		 *            for (var i = 0; i < attr.length;) {
		 *             obj.style[attr[i++]] = attr[i++]; }
		 * 
		 */
		{
		}
		return obj;
	}

	public static DOMNode setSize(DOMNode obj, int width, int height) {
		return setStyles(obj, "width", width + "px", "height", height + "px");
	}

	public static DOMNode setPositionAbsolute(DOMNode domBtn, int top, int left) {
		if (top >= 0)
			DOMNode.setStyles(domBtn, "top", top + "px");
		if (top >= 0)
			DOMNode.setStyles(domBtn, "left", left + "px");
		return DOMNode.setStyles(domBtn, "position", "absolute");
	}

	public static DOMNode firstChild(DOMNode domNode) {
		/**
		 * @j2sNative
		 * 
		 * return domNode.firstChild;
		 * 
		 */
		{
			return null;
		}
	}

	public static void addJqueryHandledEvent(JSComponentUI me, DOMNode node, String event) {
		Object f = null;
	  /**
		 * @j2sNative
		 * 
		 *            f = function(ev) {me.handleJSEvent(node, -1, ev)};
		 */
		{}
		JSToolkit.getJQuery().$(node).on(event, f);
	}

	public static DOMNode setZ(DOMNode node, int z) {
		return setStyles(node, "z-index", "" + z);
	}

	public static void playWav(String filePath) {
		DOMNode.setAttrs(DOMNode.createElement("audio", "jsaudio"), 
				"controls", "true", "src", filePath).play();
	}
}

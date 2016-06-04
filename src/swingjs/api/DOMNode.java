package swingjs.api;

public abstract class DOMNode {

	public abstract void appendChild(DOMNode object);

	public abstract boolean hasFocus();

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
	};

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
		/**
		 * @j2sNative
		 * 
		 * try {
		 *   var p = obj.parentNode;
		 *   p.removeNode(obj);
		 * } catch(e) {};
		 * return p;
		 */
		{
			return null;
		}
	}
	
	public static void add(DOMNode parent, DOMNode child) {
		/**
		 * @j2sNative
		 * 
		 * parent && parent.appendChild(child);
		 * 
		 */
		{
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


	public static DOMNode setStyles(DOMNode obj, String... attr) {
		/**
		 * @j2sNative
		 * 
		 *            for (var i = 0; i < attr.length;) {
		 * 
		 *            //System.out.println(["DOMNode.setStyles ",attr[i],attr[i+1]])
		 *            ;
		 * 
		 *            obj.style[attr[i++]] = attr[i++]; }
		 * 
		 */
		{
		}
		return obj;
	}

	public static DOMNode setSize(DOMNode obj, int width, int height) {
		return setStyles(obj, "width", width + "px", "height", height + "px");
	}

	public static DOMNode setPositionAbsolute(DOMNode domBtn) {
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

}

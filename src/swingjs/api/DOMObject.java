package swingjs.api;

public abstract class DOMObject {

	public abstract void appendChild(Object object);

	public static DOMObject createElement(String key, String id) {
		DOMObject obj = null;
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

	public static DOMObject setAttr(DOMObject obj, String attr, String val) {
		/**
		 * @j2sNative
		 * 
		 *            obj[attr] = val;
		 * 
		 */
		{
		}
		return obj;
	}

	public static DOMObject setStyle(DOMObject obj, String... attr) {
		/**
		 * @j2sNative
		 * 
		 * for (var i = 0; i < attr.length;)
		 *            obj.style[attr[i++]] = attr[i++];
		 * 
		 */
		{
		}
		return obj;
	}

	public static String getOuterHTML(DOMObject d) {
		String s = null;
		/**
		 * @j2sNative
		 * 
		 *            s = d.outerHTML;
		 * 
		 */
		{
		}
		return s;
	}

}

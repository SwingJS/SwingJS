package swingjs.api;

public abstract class DOMObject {

	public abstract void appendChild(Object object);

	public static DOMObject createElement(String key, String id) {
		/**
		 * 
		 * @j2sNative
		 * 
		 *            return document.createElement(key); d.id = id;
		 */
		{
		}

		// TODO Auto-generated method stub
		return null;
	};

	public static void setAttr(DOMObject obj, String attr, String val) {
		/**
		 * @j2sNative
		 * 
		 *            obj[attr] = val;
		 * 
		 */
		{
		}
	}

	public static void setStyle(DOMObject obj, String attr, String val) {
		/**
		 * @j2sNative
		 * 
		 *            obj.style[attr] = val;
		 * 
		 */
		{
		}
	}

}

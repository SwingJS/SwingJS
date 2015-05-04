package swingjs.api;

public abstract class DOMObject {

	public abstract void appendChild(DOMObject object);

	public abstract void removeChild(DOMObject object);
	
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

	public static DOMObject setAttr(DOMObject obj, String attr, Object val) {
		/**
		 * @j2sNative
		 * 
		 *            obj[attr] = (val instanceof Boolean ? val.valueOf() : val);
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

	public static Object getAttr(DOMObject obj, String attr) {
		/**
		 * @j2sNative
		 * 
		 *            return obj[attr];
		 * 
		 */
		{
			return null;
		}
	}

}

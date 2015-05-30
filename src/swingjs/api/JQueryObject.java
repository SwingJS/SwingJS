package swingjs.api;

public interface JQueryObject {

	public abstract JQueryObject append(Object span);

	public abstract int width();

	public abstract int height();

	public abstract void html(String html);

	public abstract DOMNode get(int i);

	public abstract void bind(String actions, JSFunction f);

	public abstract Object offset();

	public abstract JQueryObject focus();

	public abstract JQueryObject select();

	public abstract JQueryObject attr(String key, String value);

	public abstract JQueryObject addClass(String name);

	
}

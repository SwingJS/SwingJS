package swingjs.api;

public interface JQueryObject {

	public abstract JQueryObject append(Object span);

	public abstract int width();

	public abstract int height();

	public abstract void html(String html);

	public abstract DOMNode get(int i);

}

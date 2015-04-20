package swingjs.api;

public interface JQueryObject {

	JQueryObject append(Object span);

	int width();

	int height();

	void html(String html);

	JQueryObject clone(boolean withData, boolean deepCopy);

}

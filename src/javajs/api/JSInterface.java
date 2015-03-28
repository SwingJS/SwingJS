package javajs.api;

/** 
 * called by JSmol JavaScript methods using
 * 
 *  this._applet.xxxx()
 *  
 */
public interface JSInterface {

  int cacheFileByName(String fileName, boolean isAdd);
  void cachePut(String key, Object data);
  void destroy();
  Object getGLmolView();
  String getFullName();
  String loadInlineString(String mol, String script, boolean isAppend);
  String openFile(String fileName);
  void openFileAsyncSpecial(String fileName, int flags);
  boolean processMouseEvent(int id, int x, int y, int modifiers, long time);
  void processTwoPointGesture(float[][][] touches);
  void setDisplay(Object canvas);
  void setScreenDimension(int width, int height);
  boolean setStatusDragDropped(int mode, int x, int y, String fileName);
	void startHoverWatcher(boolean enable);
	void update();
 		
}


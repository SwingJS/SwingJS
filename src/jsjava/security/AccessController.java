package jsjava.security;

import java.io.InputStream;

public class AccessController implements AccessControlContext {

	// a dummy class
	
	public static <T> T doPrivileged(PrivilegedAction<T> action) {
		return action.run();
	}

	public static AccessControlContext getContext() {
		return new AccessController();
	}

	public boolean checkPermission(Object perm) {
		// no access checking in JavaScript
		return true;
	}

  public static <T> T doPrivileged(PrivilegedAction<T> action,
      AccessControlContext context) {
  	return action.run();
  }

}

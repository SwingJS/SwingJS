package jsjava.lang.reflect;

/**
 * very simplistic version of Proxy for SwingJS
 * 
 * @author Bob Hanson
 * 
 */
import java.lang.reflect.InvocationHandler;
import java.lang.reflect.Method;

public class Proxy {

//	/**
//	 * the invocation handler for this proxy instance.
//	 * 
//	 */
//	protected InvocationHandler h;
//	private ClassLoader loader;
//
//	private Proxy(ClassLoader loader, InvocationHandler h) {
//		this.loader = loader;
//		this.h = h;
//	}
//
//	public static Object newProxyInstance(ClassLoader loader,
//			Class<?>[] interfaces, InvocationHandler h) {
//		return new Proxy(loader, h);
//	}
//	
//	/**
//	 * This method is created by an ANT task from 
//	 * 
//	 * proxy.methodName (arg1, arg2, arg3)
//	 * 
//	 * so there may be any number of arguments, actually.
//	 * 
//	 * 
//	 * @param methodName
//	 * @param args
//	 */
//	public void $invokeMethod(String methodName, Object args) {
//
//		// also requires an ANT task on all files with "Proxy." in their name
//		// as such:
//		
//		// <replaceregexp match="Proxy\.(\w+) \(" replace="Proxy.$invokeMethod('\1'," flags="g" byline="true" />
//		
//		// to substitute 
//		
//		//  myProxy.doSomething (args)
//		
//		// to
//		
//		//  myProxy.$invokeMethod('doSomething', args)
//		
//		// methodName masquerades as a Method here --
//		// a simple trick to allow JavaScript freedom in Java code
//		// The parameter type will be checked by the Java compiler
//
//		try {
//			Object[] a = (Object[]) args;
//			/**
//			 * @J2Snative
//			 * 
//			 * if (!(a instanceof Array)) {
//			 * 	 a = Array(arguments.length - 1);
//			 *   for (var i = arguments.length - 1; --i >= 0;)
//  		 *		 a[i] = arguments[i + 1];
//  		 * }
//			 */
//			{}
//			h.invoke(loader, (Method) (Object) methodName, a);
//		} catch (Throwable e) {
//			e.printStackTrace();
//		}
//
//	}


}

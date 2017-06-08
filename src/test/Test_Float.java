package test;



/**
 * To run test_4 in JavaScript, 
 * @author RM
 *
 */
public class Test_Float extends Test_Float2 {

	protected void myfunc(Number x) {
		// NOTE THAT JavaScript will call this method instead of Test_Float2.myfunc(Float)
		System.out.println("Test_Float.myfunct Number " + x);
	}


	public static void main(String[] args) {
		Test_Float f = new Test_Float();
		f.myfunc(new Float(3));
	}
	

}
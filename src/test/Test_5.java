package test;


public class Test_5 extends Test_6 {

	public Test_5 this2;
	
	public String a = "test_5_a";

	public String[] d = {"1", "2"};

	public Test_5(int i) {
		this("s" + i);
		System.out.println("test5.construct " + i);
	}
	
	public Test_5(Float n) {
		this("sN" + n);
		System.out.println("Test5 Float n done");

	}
	
	

	public Test_5(String s) {
		System.out.println("test5.construct " + s);
		myfunc(s);
		this2 = this;		
	}

	public Test_5(String s, String t) {
		System.out.println("test5.construct " + s + " and " + t);
		myfunc(s);
		
	}

	protected void myfunc(String s) {
		System.out.println("test5.myfunc " + s);
		myfunc2(s);
		myfunc3();
		myfunc4();
	}

	protected void myfunc2(String s) {
		// never called
		System.out.println("test5.myfunc2 " + s);
	}
		
	protected void myfunc3() {
		System.out.println("test5.myfunc3 this2 == this? " + (this2 == this));
		System.out.println("test5.myfunc3 this2.a=" + this2.a);
		System.out.println("test5.myfunc3 this.a=" + a);
	}
	
	protected void myfunc4() {
		System.out.println("test5.myfunc4 this2 == this? " + (this2 == this));
		System.out.println("test5.myfunc4 this2.a=" + this2.a);
		System.out.println("test5.myfunc4 this.a=" + a);
	}

	protected void myfunc(Float x) {
		System.out.println("test5.myfunct Float " + x);
	}

	public void testing() {
		testing1();
	}


	
	private void testing1() {
		System.out.println("test5.testing1");
	}


}
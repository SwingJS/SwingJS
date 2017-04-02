package test;

public class Test_Bytecode2 extends Test_Bytecode {

	int x;
	double y = 5.5;

	void setX(Number x) {
		System.out.println("BC2_setX(Number) " + x);
	}
	
	void setX(Double x) {
		System.out.println("BC2_setX(Double) " + x);
	}
	
//  // Method descriptor #51 (Ljava/lang/Double;)V
//  // Stack: 4, Locals: 2
//  void setX(java.lang.Double x);
//     0  getstatic java.lang.System.out : java.io.PrintStream [24]
//     3  new java.lang.StringBuilder [30]
//     6  dup
//     7  ldc <String "BC1_setX(Double) "> [52]
//     9  invokespecial java.lang.StringBuilder(java.lang.String) [34]
//    12  aload_1 [x]
//    13  invokevirtual java.lang.StringBuilder.append(java.lang.Object) : java.lang.StringBuilder [37]
//    16  invokevirtual java.lang.StringBuilder.toString() : java.lang.String [41]
//    19  invokevirtual java.io.PrintStream.println(java.lang.String) : void [45]
//    22  return

	public static void main(String[] args) {
		
		Test_Bytecode2 t = new Test_Bytecode2();
		
		t.setX(new Integer(3));
		t.setX(new Double(3));
		
	}
	
}

//public static void main(java.lang.String[] args);
//  0  new test.Test_Bytecode2 [1]
//  3  dup
//  4  invokespecial test.Test_Bytecode2() [57]
//  7  astore_1 [t]
//  8  aload_1 [t]
//  9  new java.lang.Integer [58]
// 12  dup
// 13  iconst_3
// 14  invokespecial java.lang.Integer(int) [60]
// 17  invokevirtual test.Test_Bytecode2.setX(java.lang.Number) : void [63]
// 20  aload_1 [t]
// 21  new java.lang.Double [65]
// 24  dup
// 25  ldc2_w <Double 3.0> [67]
// 28  invokespecial java.lang.Double(double) [69]
// 31  invokevirtual test.Test_Bytecode2.setX(java.lang.Double) : void [72]
// 34  return

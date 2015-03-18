import jsjavax.swing.JApplet;
import jsjavax.swing.JLabel;


public class JStest extends JApplet {


	public void init() {
		JLabel j = new JLabel("Hello world!");
		add(j);
		System.out.println(getParameter("width"));
	}
	
	public static void main(String[] args) {

		JStest app = new JStest();
		app.setStub(new jsContext(app));
		app.init();
		int[][] a =  new int[3][4];
		
		int[][] b = new int[][] {new int[]{4,5},new int[]{5,6}}; 
		System.out.println(args);
  }
}


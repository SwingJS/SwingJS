package test.ultrastudio;

public class Namer {
	
	/**
	 * Name the optical density.
	 * 
	 * @param n the density
	 * 
	 * @return the name of the similary dense substance.
	 */
	public static String name(double n) {
		
		int d = (int) (n * 10);
		switch (d) {
		  case 10: return "air";
		  case 13: return "ice";
		  case 14: return "teflon";
		  case 15: return "salt";
		  case 16:
		  case 17:
			  return "glass";
		  case 18: return "sapphire";
		  case 24: return "diamond";
		  default: return "";		
		}		
	}
}
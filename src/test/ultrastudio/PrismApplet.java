package test.ultrastudio;

import java.awt.BorderLayout;

import javax.swing.BorderFactory;
import javax.swing.JApplet;
import javax.swing.JSlider;
import javax.swing.border.TitledBorder;
import javax.swing.event.ChangeEvent;
import javax.swing.event.ChangeListener;


// BH: private static String name(double n) conflicts with java.awt.Component.name
// BH: ggg.destroy() required before second call to g.create()
@SuppressWarnings("serial")
public class PrismApplet extends JApplet {

	JSlider angle;
	
	JSlider density;
	
	TitledBorder bAngle;
	
	TitledBorder bDensity;
	
	Prism prism;
	
	@Override
	public void init() {
		setLayout(new BorderLayout());
		angle = new JSlider();
		angle.setMaximum(180);
		angle.setMajorTickSpacing(30);
		angle.setMinorTickSpacing(5);
		angle.setMaximum(90);
		angle.setMinimum(0);
		angle.setValue(45);
		bAngle = BorderFactory.createTitledBorder("Incidence angle");
		angle.setBorder(bAngle);
		angle.setPaintTicks(true);
		angle.setPaintLabels(true);
		add(angle, BorderLayout.SOUTH);
		
		density = new JSlider();
		density.setMinimum(1000);
		density.setMaximum(2000);
		density.setMinorTickSpacing(20);
		density.setMajorTickSpacing(100);
	   
		bDensity = BorderFactory.createTitledBorder("Refraction coefficient ");
		density.setBorder(bDensity);
		add(density, BorderLayout.NORTH);
		density.setValue(1600);
		
		density.addChangeListener(new ChangeListener() {			
			@Override
			public void stateChanged(ChangeEvent e) {
				double n = density.getValue() * 0.001;
				prism.setDensity(n);
				updateLabels();				
			}
		});
		
		prism = new Prism();
		add(prism, BorderLayout.CENTER);
		prism.setRayEntry(angle.getValue());
		
		angle.addChangeListener(new ChangeListener() {			
			@Override
			public void stateChanged(ChangeEvent e) {
				prism.setRayEntry(angle.getValue());
				updateLabels();
			}
		});
	}

	private void updateLabels() {
		int a1 = angle.getValue();				
		String nn = myName(prism.n);
		if (nn.length() > 0)
			nn = ", "+nn;
		bDensity.setTitle(String.format("Refraction %.3f"+nn, prism.n));
		bAngle.setTitle(String.format("Incidence %d, bending %.2f", a1, Math.toDegrees(prism.dev(Math.toRadians(a1)))));
		angle.repaint();
		density.repaint();
	}
	
	//theoretically added to remove Namer dependency
	private static String myName(double n){
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
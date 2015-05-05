package org.uwi;

import java.awt.Color;
import java.awt.FlowLayout;
import java.awt.Graphics;
import java.awt.GridBagConstraints;
import java.awt.GridBagLayout;
import java.awt.Insets;
//import java.awt.Toolkit;
//import java.awt.datatransfer.Clipboard;
//import java.awt.datatransfer.StringSelection;
import java.awt.event.ActionEvent;
import java.awt.event.ActionListener;
import java.awt.event.MouseAdapter;
import java.awt.event.MouseEvent;
import java.text.DecimalFormat;

import javax.swing.BorderFactory;
import javax.swing.JApplet;
import javax.swing.JButton;
import javax.swing.JLabel;
import javax.swing.JPanel;
import javax.swing.JScrollPane;
import javax.swing.JTextArea;
import javax.swing.JTextField;
import javax.swing.ScrollPaneConstants;
import javax.swing.border.Border;

// SwingJS -- move explicit java.awt... references to imports.
// SwingJS -- Clipboard is not supported in JavaScript.

/*
A basic extension of the JApplet class
*/
public class Boltzmann extends JApplet  {
  
 
  // My variables
  int initialEnergy;  //Initial Energy of all particles
  int curMaxEnergy;   //Highest Energy Level with a particle
  int maxParticles;   //Max number of particles
  int maxCollisions;  //Max number of collisions
  int particleEnergy[];//stores Energy for each particle
  int EntropyCalcs;
//  double Entropy[]; //Entropy of the system
  boolean start_pressed;
  int entCounter;   //Counter used to move through Array of Entropy values

	public Boltzmann() {
		setName("Boltzmann");
	}

	public void init() 	{

		// Take out this line if you don't use symantec.itools.net.RelativeURL or symantec.itools.awt.util.StatusScroller
		// symantec.itools.lang.Context.setApplet(this);
		// This line prevents the "Swing: checked access to system event queue" message seen in some browsers.
	//	getRootPane().putClientProperty("defeatSystemEventQueueCheck", Boolean.TRUE);

		//{{INIT_CONTROLS
		getContentPane().setLayout(null);
		setSize(562,391);
		BoltzSimGraph.setBorder(lineBorder2);
		BoltzSimGraph.setLayout(new FlowLayout(FlowLayout.CENTER,5,5));
		getContentPane().add(BoltzSimGraph);
		BoltzSimGraph.setBackground(Color.white);
		BoltzSimGraph.setBounds(0,0,384,300);
		BoltzSimGraph.add(DispBoltz);
		DispBoltz.setBounds(2,6,380,294);
		EntropyGraph.setBorder(lineBorder1);
		EntropyGraph.setLayout(new FlowLayout(FlowLayout.CENTER,5,5));
		getContentPane().add(EntropyGraph);
		EntropyGraph.setBackground(java.awt.Color.white);
		EntropyGraph.setBounds(384,0,180,156);
		EntropyGraph.add(DispEntropy);
		DispEntropy.setBounds(1,6,178,150);
		//$$ lineBorder1.move(0,392);
		//$$ lineBorder2.move(24,392);
		UserInput.setLayout(new GridBagLayout());
		getContentPane().add(UserInput);
		UserInput.setBackground(Color.yellow);
		UserInput.setBounds(0,300,384,96);
		lQuanta.setText("Initial Energy");
		UserInput.add(lQuanta, new GridBagConstraints(0,0,1,1,1.0,1.0,GridBagConstraints.CENTER,GridBagConstraints.NONE,new Insets(0,0,0,0),0,0));
		lQuanta.setBounds(15,6,97,15);
		lParticles.setText("No. of Particles");
		UserInput.add(lParticles, new GridBagConstraints(1,0,1,1,1.0,0.0,GridBagConstraints.CENTER,GridBagConstraints.NONE,new Insets(0,0,0,0),0,0));
		lParticles.setBounds(149,6,86,15);
		lCollisions.setText("No. of Collisions");
		UserInput.add(lCollisions, new GridBagConstraints(2,0,1,1,1.0,0.0,GridBagConstraints.CENTER,GridBagConstraints.NONE,new Insets(0,0,0,0),0,0));
		lCollisions.setBounds(275,6,90,15);
		tEnergy.setAutoscrolls(false);
		tEnergy.setColumns(10);
		tEnergy.setNextFocusableComponent(tParticles);
		UserInput.add(tEnergy, new GridBagConstraints(0,1,1,1,1.0,1.0,GridBagConstraints.CENTER,GridBagConstraints.NONE,new Insets(0,0,0,0),0,0));
		tEnergy.setBounds(9,33,110,19);
		tParticles.setAutoscrolls(false);
		tParticles.setColumns(10);
		tParticles.setNextFocusableComponent(tCollisions);
		UserInput.add(tParticles, new GridBagConstraints(1,1,1,1,1.0,1.0,GridBagConstraints.CENTER,GridBagConstraints.NONE,new Insets(0,0,0,0),0,0));
		tParticles.setBounds(137,33,110,19);
		tCollisions.setAutoscrolls(false);
		tCollisions.setColumns(10);
		tCollisions.setNextFocusableComponent(bStartSim);
		UserInput.add(tCollisions, new GridBagConstraints(2,1,1,1,1.0,1.0,GridBagConstraints.CENTER,GridBagConstraints.NONE,new Insets(0,0,0,0),0,0));
		tCollisions.setBounds(265,33,110,19);
		bStartSim.setText("Start");
		bStartSim.setActionCommand("Start");
		bStartSim.setNextFocusableComponent(tEnergy);
		UserInput.add(bStartSim, new GridBagConstraints(1,2,1,1,1.0,1.0,GridBagConstraints.CENTER,GridBagConstraints.NONE,new Insets(0,0,0,0),0,0));
		bStartSim.setBackground(Color.green);
		bStartSim.setBounds(160,64,63,25);
		//$$ lineBorder3.move(48,392);
		DispResults.setHorizontalScrollBarPolicy(ScrollPaneConstants.HORIZONTAL_SCROLLBAR_NEVER);
		DispResults.setVerticalScrollBarPolicy(ScrollPaneConstants.VERTICAL_SCROLLBAR_ALWAYS);
		DispResults.setOpaque(true);
		getContentPane().add(DispResults);
		DispResults.setBounds(384,156,180,240);
		ShowText.setRows(10000);
		ShowText.setDisabledTextColor(new Color(153,153,153));
		DispResults.getViewport().add(ShowText);
		ShowText.setBounds(0,0,162,150000);
		//}}

		//{{REGISTER_LISTENERS
		SymAction lSymAction = new SymAction();
		bStartSim.addActionListener(lSymAction);
		tEnergy.addActionListener(lSymAction);
		tParticles.addActionListener(lSymAction);
		tCollisions.addActionListener(lSymAction);
		SymMouse aSymMouse = new SymMouse();
		ShowText.addMouseListener(aSymMouse);
		//}}
		// Initialize the environment
        setBackground(Color.white);
        maxParticles = 10000;  //Default number of particles in simulation
        maxCollisions = 60000; //Default number of collisions
        initialEnergy = 250;   //start Energy of at 250
		EntropyCalcs= 50;      //calculate the Entropy 50 times

		tEnergy.setText(Integer.toString(initialEnergy));
		tParticles.setText(Integer.toString(maxParticles));
		tCollisions.setText(Integer.toString(maxCollisions));
        initEnvironment();

	}

	//{{DECLARE_CONTROLS
	JPanel BoltzSimGraph = new JPanel();
	BoltzCanvas DispBoltz = new BoltzCanvas();
	JPanel EntropyGraph = new JPanel();
	EntropyCanvas DispEntropy = new EntropyCanvas();
	Border lineBorder1 = BorderFactory.createLineBorder(Color.black);
	Border lineBorder2 = BorderFactory.createLineBorder(Color.black);
	JPanel UserInput = new JPanel();
	JLabel lQuanta = new JLabel();
	JLabel lParticles = new JLabel();
	JLabel lCollisions = new JLabel();
	JTextField tEnergy = new JTextField();
	JTextField tParticles = new JTextField();
	JTextField tCollisions = new JTextField();
	JButton bStartSim = new JButton();
	Border lineBorder3 = BorderFactory.createLineBorder(Color.black);
	JScrollPane DispResults = new JScrollPane();
	LevelInfoArea ShowText = new LevelInfoArea();
	//}}

	class SymAction implements ActionListener   	{
		public void actionPerformed(ActionEvent event)   		{
			Object object = event.getSource();
			if (object == bStartSim)
				bStartSim_actionPerformed(event);
			else if (object == tEnergy)
				tEnergy_actionPerformed(event);
			else if (object == tParticles)
				tParticles_actionPerformed(event);
			else if (object == tCollisions)
				tCollisions_actionPerformed(event);

			ShowText.levelInfo = "";
		}
	}
	
	public class LevelInfoArea extends JTextArea  {
	    String levelInfo;

	    public LevelInfoArea()    {
	        super();
	        levelInfo = "";
	    }
	 }	

	void bStartSim_actionPerformed(ActionEvent event)
	// Action performed on pressing start button
	{
        performSim();
	    DispEntropy.repaint();
	    int i;

	    //ensure top energy level is occupied
        for (i=curMaxEnergy;i>0;i--)          {
          if (DispBoltz.energyLevels[i] < 1)
            curMaxEnergy--;
          else
            break;
        }
	    //

        for (i = 1; i <= curMaxEnergy; i++)           {
          ShowText.levelInfo = ShowText.levelInfo + "EL "+ i +"= " + DispBoltz.energyLevels[i] + "\n";
	    }

        DecimalFormat df = new DecimalFormat("0.00");
	    ShowText.levelInfo = ShowText.levelInfo + "-------------\n";
	    for (i = 0; i < EntropyCalcs; i++)  	    {
               ShowText.levelInfo = ShowText.levelInfo + "WL "+ i +"= " + df.format(DispEntropy.Entropy[i]) + "\n";
	    }
	    ShowText.levelInfo = ShowText.levelInfo + "-------------\n";
	    ShowText.levelInfo = ShowText.levelInfo +"Init. Energy   = " + initialEnergy + "\n";
        ShowText.levelInfo = ShowText.levelInfo +"No. particles  = " + maxParticles + "\n";
	    ShowText.levelInfo = ShowText.levelInfo +"No. collisions = " + maxCollisions + "\n";
        ShowText.setRows(curMaxEnergy+EntropyCalcs+2);
        ShowText.setText(ShowText.levelInfo);
    }

	void tEnergy_actionPerformed(ActionEvent event)
	// Get intial Energy of Particles from Text Field
	// Particles must start off with more than 0 quanta of Energy
	// if not use default from constructor
	{
	    int tmp = (Integer.parseInt(tEnergy.getText().trim()));
	    if (tmp > 0)
	      initialEnergy = tmp;
	}

    // Get initial number of Particles from Text Field
    // Must start off with more than 50 particles
	// if not use default from constructor
	void tParticles_actionPerformed(ActionEvent event)  	{
        int tmp = (Integer.parseInt(tParticles.getText().trim()));
	    if (tmp >= 50)
	      maxParticles = tmp;
	}

	// Get number of Collisions to be simulated from text field
	// Must start off with more than 200 collisions
	// if not use default from constructor
	void tCollisions_actionPerformed(ActionEvent event)       {
	    int tmp = (Integer.parseInt(tCollisions.getText().trim()));
	    if (tmp >= 200)
	      maxCollisions = tmp;
	}

  void initEnvironment()     {
    int i;  // Counter used to traverse arrays

    // Initialize environment
    DispBoltz.maxEnergy = 20 * initialEnergy; //Highest Energy Level displayed
    particleEnergy = new int[maxParticles];
    DispBoltz.energyLevels = new int[DispBoltz.maxEnergy +1];
    curMaxEnergy = initialEnergy;
    DispEntropy.Entropy = new double[EntropyCalcs +1];
    DispEntropy.EntropyCalc = EntropyCalcs;

    entCounter = 0;

    for (i = 0;i < maxParticles;i++)       {
      particleEnergy[i] = initialEnergy;
    }
    for (i = 0;i <= DispBoltz.maxEnergy; i++)    {
      DispBoltz.energyLevels[i] = 0;
    }
    for (i = 0;i < EntropyCalcs; i++)      {
      DispEntropy.Entropy[i] = 0;
    }
    DispBoltz.energyLevels[initialEnergy] = maxParticles;
  }

  void calcEntropy(int x)     {
    int i;
    DispEntropy.Entropy[x] = maxParticles * Math.log(maxParticles);
    for (i=0;i<=curMaxEnergy;i++)
      if (DispBoltz.energyLevels[i] > 0)
        DispEntropy.Entropy[x] = DispEntropy.Entropy[x] - (DispBoltz.energyLevels[i] * Math.log(DispBoltz.energyLevels[i]));
  }

  void performSim()      {
    Graphics canvasGraphics = DispBoltz.getGraphics();
    initEnvironment();
    // Show the intial graph with all particles having E of initialEnergy
    DispBoltz.paint(canvasGraphics);

    // Start colliding particles
    int particle1, particle2;
    int e1,e2;  //Energy of particle1 and particle2
    int collisionEnergy;
    int numOfCollisions = maxCollisions;
    // Refresh the display approx displayFactor times
    int displayFactor;
    // find out when to perform Entropy calculation
    int entropyFactor = (int) Math.ceil(maxCollisions/EntropyCalcs);
//    int systemEnergy = maxParticles * initialEnergy;

    // Adjust displayFactor based on maxCollisions
    if (maxCollisions <= 5000)
      displayFactor = 1;
    else if (maxCollisions <= 20000)
      displayFactor = 4;
    else
      displayFactor = 10;

    // Start colliding particles
    while (numOfCollisions > 0)      {
      if ((numOfCollisions % displayFactor) == 0)
        DispBoltz.paint(canvasGraphics);

      if ((numOfCollisions % entropyFactor) == 0)        {
        calcEntropy(entCounter);
        entCounter++;
      }
      //Select two particles at random
      particle1 = (int) ((maxParticles - 1) * Math.random());
      particle2 = (int) ((maxParticles - 1) * Math.random());

      //Make sure they are different
      while (particle1 == particle2)         {
        particle2 = (int) ((maxParticles - 1) * Math.random());
      }

      // Make sure particle1 has the higher energy
      //i.e always pass energy from higher to lower
      if (particleEnergy[particle1] < particleEnergy[particle2])        {
        //Swap Particle1 with Particle2
        int temp = particleEnergy[particle1];
        particleEnergy[particle1] = particleEnergy[particle2];
        particleEnergy[particle2] = temp;
      }
      e1 = particleEnergy[particle1];
      e2 = particleEnergy[particle2];

      // Take a random amount of energy from particle1
      collisionEnergy = (int) Math.ceil(e1 * Math.random());

      //Perform energy transfer from particle1 to particle2
      particleEnergy[particle1] = e1 - collisionEnergy;
      particleEnergy[particle2] = e2 + collisionEnergy;

      // Reduce numOfParticles at EnergyLevels e1 and e2 by 1 each
      DispBoltz.energyLevels[e1] = DispBoltz.energyLevels[e1] - 1;
      DispBoltz.energyLevels[e2] = DispBoltz.energyLevels[e2] - 1;

      // Find new energy of particle 1 and 2
      e1 = particleEnergy[particle1];
      e2 = particleEnergy[particle2];

      // increment numOfParticles at these EnergyLevels by 1 each
      DispBoltz.energyLevels[e1] = DispBoltz.energyLevels[e1] + 1;
      DispBoltz.energyLevels[e2] = DispBoltz.energyLevels[e2] + 1;

      // find which has larger energy
      if (e1 < e2)
          e1=e2;

      //Update curMaxEnergy
      if (e1 > curMaxEnergy)
        curMaxEnergy = e1;

      DispBoltz.maxEnergy = curMaxEnergy;

      numOfCollisions--;
      //Delay to slow down display
      for(int i=0;i<(10000/displayFactor);i++) ;

    }
    // Show final graph at end of simulation
    DispBoltz.paint(canvasGraphics);
  }

    // class to handle mouseclick
   class SymMouse extends MouseAdapter   {
		public void mouseReleased(MouseEvent event)   {
			Object object = event.getSource();
			if (object == ShowText)
				ShowText_mouseReleased(event);
		}
	}

	// Upon a button click in the Text Window selects all data
	// and copies to clipboard
	void ShowText_mouseReleased(MouseEvent event) {
		// SwingJS n/a
		// Clipboard cb = Toolkit.getDefaultToolkit().
		// getSystemClipboard();
		// String s = ShowText.getText();
		// StringSelection contents = new StringSelection(s);
		// cb.setContents(contents, null);
	}
}



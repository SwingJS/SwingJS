/*
	Sketch Elements: Chemistry molecular diagram drawing tool.
	
	(c) 2005-2013 Dr. Alex M. Clark, all rights reserved
	
	Released as GNUware, under the Gnu Public License (GPL)
	
	See www.gnu.org for details.
*/

package org.sketchel;

import java.awt.BorderLayout;
import java.io.File;
import java.io.IOException;
import java.util.ArrayList;

import javax.swing.JFrame;

//import org.sketchel.ds.DataWindow;
//import org.sketchel.ds.FileTypeGuess;

/* 
	Main application window, and entrypoint for application mode.
*/

public class MainWindow extends JFrame
{
	public MainPanel mainPanel=null;

	public MainWindow(String LoadFN,boolean StreamMode) 
	{
		super("SketchEl");

		// application
		
		JFrame.setDefaultLookAndFeelDecorated(false); 
		setDefaultCloseOperation(JFrame.DO_NOTHING_ON_CLOSE);
		
		// main panel

		getContentPane().setLayout(new BorderLayout());
		mainPanel=new MainPanel(LoadFN,MainPanel.MODE_NORMAL,this);
		getContentPane().add(mainPanel,BorderLayout.CENTER);
		pack();

		setIconImage(MainPanel.mainIcon.getImage());
	}

	public MainPanel mainPanel() {return mainPanel;}

	// ------------------ init functions --------------------
	
	static String[] args;
	
	private static void createAndShowGUI()
	{
		try {init();} catch (Exception ex) {ex.printStackTrace();}
	}
	private static void init() throws Exception
	{
		boolean dump=false,stream=false;
		ArrayList<String> openfiles=new ArrayList<String>();
		boolean dsmode=false;

		int i=0;
		while (i<args.length)
		{
			if (args[i].charAt(0)=='-')
			{
				if (args[i].compareTo("-h")==0 || args[i].compareTo("--help")==0) {dump=true; break;}
				else if (args[i].compareTo("-v")==0 || args[i].compareTo("--version")==0) {dump=true; break;}
				else if (args[i].compareTo("-s")==0 || args[i].compareTo("--stream")==0) {stream=true; i++;}
				else if (args[i].compareTo("-m")==0 || args[i].compareTo("--molecule")==0) {dsmode=false; i++;}
				else if (args[i].compareTo("-d")==0 || args[i].compareTo("--datasheet")==0) {dsmode=true; i++;}
				else
				{
					System.out.println("Error: unexpected argument:");
					System.out.println(args[i]);
					return;
				}
			}
			else
			{
				File f=new File(args[i]);
				if (f.exists()) openfiles.add(args[i]);
				else System.out.println("Warning: Filename ["+args[i]+"] does not exist.");
				i++;
			}
		}
		
		if (stream && dsmode)
		{
			System.out.println("Invalid: stream mode cannot be combined with datasheet mode");
			return;
		}

		if (dump)
		{
			System.out.println("SketchEl: Molecular drawing tool");
			System.out.println("		  Version "+MainPanel.VERSION+" \u00A9 2005-2015 Dr. Alex M. Clark");
			System.out.println("		  Open source, released under the Gnu Public License (GPL),");
			System.out.println("		  see www.gnu.org. For home page and documentation, see");
			System.out.println("		  http://sketchel.sf.net\n");

			System.out.println("Command line parameters:");
			System.out.println(" -h|--help|-v|--version    Show parameters and summary info");
			System.out.println(" -s|--stream			   Read from <stdin> at startup, write to");
			System.out.println(" -m|--molecule			   Open in new Molecule mode");
			System.out.println(" -d|--datasheet			   Open in new DataSheet mode");
			System.out.println("						   <stdout> on quit.");
			System.out.println(" filenames				   Open files on startup.");
		}
		else
		{
			int jv=Util.javaVersion();
			if (jv<6)
			{
				System.out.println("Reported Java version "+jv+". Requires Java 6 or later (also known as Java 1.6).");
				return;
			}
		
			if (stream || openfiles.size()==0) 
			{
				if (!dsmode) new MainWindow(null,stream).setVisible(true);
//				else new DataWindow(null).setVisible(true);
			}
//			else 
//			{
//				for (int n=0;n<openfiles.size();n++) 
//				{
//					String fn=openfiles.get(n);
//					try
//					{
//						FileTypeGuess ft=new FileTypeGuess(new File(fn));
//						ft.guess();
//						
//						if (ft.getType()==FileTypeGuess.TYPE_DATASHEET || ft.getType()==FileTypeGuess.TYPE_MDLSDF)
//							new DataWindow(fn).setVisible(true);
//						else
//							new MainWindow(fn,false).setVisible(true);
//					}
//					catch (IOException e) 
//					{
//						e.printStackTrace();
//					}
//
//				}
//			}
		}
	}

	public static void main(String[] args)
	{
		// for the Mac
		System.setProperty("apple.laf.useScreenMenuBar","true");
		// !! this doesn't do anything; on the contrary, -Dcom.apple.mrj.application.apple.menu.about.name=SketchEl
		//    functions as advertised; need to figure out why
		System.setProperty("com.apple.mrj.application.apple.menu.about.name","SketchEl");
		
		MainWindow.args=args;
		javax.swing.SwingUtilities.invokeLater(new Runnable() {public void run() {createAndShowGUI();}});
	}
}



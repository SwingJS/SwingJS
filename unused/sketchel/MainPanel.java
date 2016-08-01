/*
	Sketch Elements: Chemistry molecular diagram drawing tool.
	
	(c) 2005-2015 Dr. Alex M. Clark, all rights reserved
	
	Released as GNUware, under the Gnu Public License (GPL)
	
	See www.gnu.org for details.
*/

package org.sketchel;

import java.awt.BorderLayout;
import java.awt.Color;
import java.awt.Dimension;
import java.awt.Font;
import java.awt.FontMetrics;
import java.awt.Graphics2D;
import java.awt.GraphicsConfiguration;
import java.awt.GraphicsEnvironment;
import java.awt.Point;
import java.awt.RenderingHints;
import java.awt.Toolkit;
import java.awt.datatransfer.Clipboard;
import java.awt.datatransfer.ClipboardOwner;
import java.awt.datatransfer.StringSelection;
import java.awt.datatransfer.Transferable;
import java.awt.event.ActionEvent;
import java.awt.event.ActionListener;
import java.awt.event.InputEvent;
import java.awt.event.KeyEvent;
import java.awt.event.KeyListener;
import java.awt.event.MouseEvent;
import java.awt.event.MouseListener;
import java.awt.event.WindowEvent;
import java.awt.event.WindowListener;
import java.awt.image.BufferedImage;
import java.io.BufferedWriter;
import java.io.ByteArrayOutputStream;
import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;
import java.io.StringWriter;
import java.net.URL;
import java.util.ArrayList;

import javax.swing.AbstractButton;
import javax.swing.ActionMap;
import javax.swing.Box;
import javax.swing.ButtonGroup;
import javax.swing.ImageIcon;
import javax.swing.InputMap;
import javax.swing.JCheckBoxMenuItem;
import javax.swing.JFileChooser;
import javax.swing.JFrame;
import javax.swing.JMenu;
import javax.swing.JMenuBar;
import javax.swing.JMenuItem;
import javax.swing.JOptionPane;
import javax.swing.JPanel;
import javax.swing.JPopupMenu;
import javax.swing.JRadioButtonMenuItem;
import javax.swing.JRootPane;
import javax.swing.JToolBar;
import javax.swing.KeyStroke;

//import org.sketchel.ds.DataWindow;
//import org.sketchel.ds.FileTypeGuess;

/*
	Encapsulates the editing panel, provides menus and toolbars, and responds to various types of events. An instance of the
	EditorPane class does most of the heavy lifting, but the MainPanel class calls the shots in the case of high level actions
	and tool selection.
*/

public class MainPanel extends JPanel implements ActionListener, MouseListener, WindowListener, KeyListener, ClipboardOwner, 
												  TemplSelectListener, MolSelectListener
{
	public static final String LICENSE= // (encoded in a string so that it appears in the final .jar file)
		"This program is free software; you can redistribute it and/or modify\n"+
		"it under the terms of the GNU General Public License as published by\n"+
		"the Free Software Foundation; either version 2 of the License, or\n"+
		"(at your option) any later version.\n\n"+
		"This program is distributed in the hope that it will be useful,\n"+
		"but WITHOUT ANY WARRANTY; without even the implied warranty of\n"+
		"MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the\n"+
		"GNU General Public License for more details.\n\n"+
		"You should have received a copy of the GNU General Public License\n"+
		"along with this program; if not, write to the Free Software\n"+
		"Foundation, Inc., 51 Franklin St, Fifth Floor, Boston, MA	02110-1301	USA\n\n"+
		"or see http://www.gnu.org for details.";

	public static final String VERSION="1.62";

	private JFrame frameParent;

	public static ImageIcon mainIcon=null,mainLogo=null;
	
	private static final int TOOL_CURSOR=0;
	private static final int TOOL_PAN=1;
	private static final int TOOL_ROTATOR=2;
	private static final int TOOL_ERASOR=3;
	private static final int TOOL_DIALOG=4;
	private static final int TOOL_EDIT=5;
	private static final int TOOL_SETATOM=6;
	private static final int TOOL_SINGLE=7;
	private static final int TOOL_DOUBLE=8;
	private static final int TOOL_TRIPLE=9;
	private static final int TOOL_ZERO=10;
	private static final int TOOL_INCLINED=11;
	private static final int TOOL_DECLINED=12;
	private static final int TOOL_UNKNOWN=13;
	private static final int TOOL_CHARGE=14;
	private static final int TOOL_UNDO=15;
	private static final int TOOL_REDO=16;
	private static final int TOOL_TEMPLATE=17;
	private static final int TOOL_COUNT=18;

	private static final String[] IMAGE_TOOL=
	{
		"Cursor","Pan","Rotator","Erasor","EDialog","AEdit","ASelect","BSingle","BDouble","BTriple","BZero","BInclined","BDeclined",
		"BUnknown","ACharge","Undo","Redo","Template"
	};
	private static final boolean[] ACTIVE_TOOL={true,true,true,true,false,true,true,true,true,true,true,
										true,true,true,true,false,false,true};
	
	private static final String[] TOOL_TIPS=
	{
		"Cursor: Select or translate atoms\n"
			+"	 Click/Drag = select only\n"
			+"	 Shift+Click/Drag = select additional\n"
			+"	 Ctrl+Click = select component\n"
			+"	 Ctrl+Shift+Click = select additional component\n"
			+"	 Ctrl+Drag = copy selected atoms\n"
			+"	 Alt+Drag = move selected atoms\n"
			+"	 Alt+Shift+Drag = scale selected atoms\n"
			+"	 Right Button = context menu\n"
			+"	 Middle Button = pan view\n"
			+"	 Mouse Wheel = zoom in/out",
		"Pan: Drag left mouse to translate view",
		"Rotator: Rotate selected atoms about centre\n"
			+"	 Left Drag = rotate in 15\u00B0 increments\n"
			+"	 Right Drag = rotate freely",
		"Erasor: Delete atoms or bonds\n"
			+"	 Left Click = delete underlying atom or bond\n"
			+"	 Left Drag = delete atoms underneath marquis",
		"(edit dialog)",
		"Edit Element: Edit element in place\n"
			+"	 Left Click = type in new element label",
		"Place Element: Replace or create preselected element\n"
			+"	 Left Click = replace or create atom\n"
			+"	 Right Click = select from short list of elements",
		"Single Bond: Create or impose a single bond\n"
			+"	 Left Drag = create bond to new atom at 30\u00B0\n"
			+"				 increments, or connect existing atoms\n"
			+"	 Right Drag = create bond freely\n"
			+"	 Left Click = create new bond or set bond to single",
		"Double Bond: Create or impose a double bond\n"
			+"	 Left Drag = create bond to new atom at 30\u00B0\n"
			+"				 increments, or connect existing atoms\n"
			+"	 Right Drag = create bond freely\n"
			+"	 Left Click = create new bond or set bond to double",
		"Triple Bond: Create or impose a triple bond\n"
			+"	 Left Drag = create bond to new atom at 30\u00B0\n"
			+"				 increments, or connect existing atoms\n"
			+"	 Right Drag = create bond freely\n"
			+"	 Left Click = create new bond or set bond to triple",
		"Zero Bond: Create or impose a zero-order bond\n"
			+"	 Left Drag = create bond to new atom at 30\u00B0\n"
			+"				 increments, or connect existing atoms\n"
			+"	 Right Drag = create bond freely\n"
			+"	 Left Click = create new bond or set bond to zero",
		"Inclined Bond: Create or impose an inclined single bond\n"
			+"	 Left Drag = create bond to new atom at 30\u00B0\n"
			+"				 increments, or connect existing atoms\n"
			+"	 Right Drag = create bond freely\n"
			+"	 Left Click = create new bond or set bond to inclined",
		"Declined Bond: Create or impose a declined single bond\n"
			+"	 Left Drag = create bond to new atom at 30\u00B0\n"
			+"				 increments, or connect existing atoms\n"
			+"	 Right Drag = create bond freely\n"
			+"	 Left Click = create new bond or set bond to declined",
		"Squiggly Bond: Create or impose a squiggly single bond\n"
			+"	 Left Drag = create bond to new atom at 30\u00B0\n"
			+"				 increments, or connect existing atoms\n"
			+"	 Right Drag = create bond freely\n"
			+"	 Left Click = create new bond or set bond to squiggly",
		"Charge: Alter charge on an atom\n"
			+"	 Left Click = increase charge on underlying atom\n"
			+"	 Right Click = decrease charge on underlying atom\n"
			+"	 Middle Click = remove charge on underlying atom",
		"(undo)",
		"(redo)",
		"Template: Select or place a template structure\n"
			+"	 Left Click = use most recent template as a tool\n"
			+"	 Right Click = open template store for selection\n"
			+"	 Middle Click = flip template horizontally\n"
			+"						 (+Shift to flip vertically)\n"
			+"	 Mouse Wheel = rotate template (+Shift for faster)\n"
			+"	 Ctrl+Mouse Wheel = scale template (+Shift for faster)\n"
	};
	
	private ConfigData cfg=null;

	private AbstractButton[] toolButtons;
	private ButtonGroup toolGroup;
	private ImageIcon[] toolIcons;
	private EditorPane editor;
	private Templates templ;
//	private DraggableMolecule dragMol=null;
	
	private boolean firstResize=true;
	private String filename=null,curDir=null;
	private String lastElement=null,typedElement="";
	private Molecule lastTemplate=null;
	private int templateIdx=-1;
	private boolean streamMode=false,appletMode=false,slaveMode=false;
	
	private boolean useLocalClipboard=false;
	private Molecule appletClipboard=null;
	
	private SaveListener saver=null;
	
	// precomputed menu items, used for window and applet modes; they are assigned later, during the menu creation
	private JMenuItem miFileQuit=null;
	private JMenuItem miFileNew=null;
	private JMenuItem miFileNewWindow=null;
	private JMenuItem miFileNewDataSheet=null;
	private JMenuItem miFileOpen=null;
	private JMenuItem miFileSave=null;
	private JMenuItem miFileSaveAs=null;
	private JMenuItem miFileShare=null;
	private JMenuItem miExportMDLMOL=null;
	private JMenuItem miExportCMLXML=null;
	private JMenuItem miExportSVG=null;
	private JMenuItem miExportODG=null;
	private JMenuItem miExportPNG=null;
	private JMenuItem miToolCursor=null;
	private JMenuItem miToolPan=null;
	private JMenuItem miToolRotator=null;
	private JMenuItem miToolErasor=null;
	private JMenuItem miToolEditAtom=null;
	private JMenuItem miToolSetAtom=null;
	private JMenuItem miToolCharge=null;
	private JMenuItem miEditDialog=null;
	private JMenuItem miSelectAll=null;
	private JMenuItem miSelectNextAtom=null;
	private JMenuItem miSelectPrevAtom=null;
	private JMenuItem miSelectNextGroup=null;
	private JMenuItem miSelectPrevGroup=null;
	private JMenuItem miBondSingle=null;
	private JMenuItem miBondDouble=null;
	private JMenuItem miBondTriple=null;
	private JMenuItem miBondZero=null;
	private JMenuItem miBondInclined=null;
	private JMenuItem miBondDeclined=null;
	private JMenuItem miBondUnknown=null;
	private JMenuItem miEditUndo=null;
	private JMenuItem miEditRedo=null;
	private JMenuItem miEditCut=null;
	private JMenuItem miEditCopy=null;
	//private JMenuItem miEditCopySVG=null;
	private JMenuItem miEditPaste=null;
	private JMenuItem miFlipHoriz=null;
	private JMenuItem miFlipVert=null;
	private JMenuItem miRotateP30=null;
	private JMenuItem miRotateN30=null;
	private JMenuItem miRotateP45=null;
	private JMenuItem miRotateN45=null;
	private JMenuItem miRotateP90=null;
	private JMenuItem miRotateN90=null;
	private JMenuItem miTemplateAdd=null;
	private JMenuItem miEditNormalise=null;
	private JMenuItem miQueryDialog=null;
	private JMenuItem miTemplateTool=null;
	private JMenuItem miTemplateSelect=null;
	private JMenuItem miZoomFull=null;
	private JMenuItem miZoomIn=null;
	private JMenuItem miZoomOut=null;
	private JMenuItem miPanLeft=null;
	private JMenuItem miPanRight=null;
	private JMenuItem miPanUp=null;
	private JMenuItem miPanDown=null;
	private JRadioButtonMenuItem miShowElements=null;
	private JRadioButtonMenuItem miShowAllElem=null;
	private JRadioButtonMenuItem miShowIndices=null;
	private JRadioButtonMenuItem miShowRingID=null;
	private JRadioButtonMenuItem miShowCIPPrio=null;
	private JRadioButtonMenuItem miShowMapNum=null;
	private JCheckBoxMenuItem miShowExtra=null;
	private JCheckBoxMenuItem miShowHydrogen=null;
	private JMenu miRenderPolicy=null;
	private JMenuItem miHydSetExpl=null;
	private JMenuItem miHydClearExpl=null;
	private JMenuItem miHydZeroExpl=null;
	private JMenuItem miHydCreate=null;
	private JMenuItem miHydDelete=null;
	private JCheckBoxMenuItem miShowStereo=null;
	private JMenuItem miStereoInvert=null;
	private JMenuItem miStereoSetRZ=null;
	private JMenuItem miStereoSetSE=null;
	private JMenuItem miStereoCycle=null;
	private JMenuItem miStereoRemove=null;
	private JMenuItem miHelpAbout=null;
	private JMenuItem miHelpConfig=null;
	private JMenuItem miCopyAsSk=null;
	private JMenuItem miCopyAsMol=null;
	private JMenuItem miCopyAsJSON=null;
	private JMenuItem miCopyAsSVG=null;
	private JMenuItem miSubsumeAbbreviate=null;
	private JMenuItem miSubsumeSubFrag=null;
	private JMenuItem miSubsumeSubFragNot=null;
	
	// precomputed menu item objects used for the right mouse button
	private JMenuItem rmbEditAtom=Util.menuItem(this,"Edit Atom",0);
	private JMenuItem rmbDeleteAtom=Util.menuItem(this,"Delete Atom",0);
	private JMenuItem rmbSelectAtom=Util.menuItem(this,"Select Atom",0);
	private JMenuItem rmbSelectGroup=Util.menuItem(this,"Select Group",0);
	private JMenuItem rmbSelectAll=Util.menuItem(this,"Select All",0);
	private JMenuItem rmbClearSelection=Util.menuItem(this,"Clear Selection",0);
	private JMenuItem rmbSetExplH=Util.menuItem(this,"Set Explicit H",0);
	private JMenuItem rmbClearExplH=Util.menuItem(this,"Clear Explicit H",0);
	private JMenuItem rmbZeroExplH=Util.menuItem(this,"Zero Explicit H",0);
	private JMenuItem rmbCreateActualH=Util.menuItem(this,"Create Actual H",0);
	private JMenuItem rmbDeleteActualH=Util.menuItem(this,"Delete Actual H",0);
	private JMenuItem rmbInvertChiral=Util.menuItem(this,"Invert Chirality",0);
	private JMenuItem rmbSetR=Util.menuItem(this,"Set R",0);
	private JMenuItem rmbSetS=Util.menuItem(this,"Set S",0);
	private JMenuItem rmbCycleWedges=Util.menuItem(this,"Cycle Wedges",0);
	private JMenuItem rmbRemoveWedges=Util.menuItem(this,"Remove Wedges",0);
	private JMenuItem rmbEditBond=Util.menuItem(this,"Edit Bond",0);
	private JMenuItem rmbDeleteBond=Util.menuItem(this,"Delete Bond",0);
	private JMenuItem rmbInvertGeom=Util.menuItem(this,"Invert Geometry",0);
	private JMenuItem rmbSetZ=Util.menuItem(this,"Set Z",0);
	private JMenuItem rmbSetE=Util.menuItem(this,"Set E",0);
	private JMenuItem rmbFlipHoriz=Util.menuItem(this,"Flip Horizontal",0);
	private JMenuItem rmbFlipVert=Util.menuItem(this,"Flip Vertical",0);
	private JMenuItem rmbFlipBond=Util.menuItem(this,"Flip Bond",0);
	private JMenuItem rmbRotateP30=Util.menuItem(this,"Rotate +30\u00B0",0);
	private JMenuItem rmbRotateN30=Util.menuItem(this,"Rotate -30\u00B0",0);
	private JMenuItem rmbRotateP45=Util.menuItem(this,"Rotate +45\u00B0",0);
	private JMenuItem rmbRotateN45=Util.menuItem(this,"Rotate -45\u00B0",0);
	private JMenuItem rmbRotateP90=Util.menuItem(this,"Rotate +90\u00B0",0);
	private JMenuItem rmbRotateN90=Util.menuItem(this,"Rotate -90\u00B0",0);
	
	private JPopupMenu rightPopup=null;
	private int rightPopupAtom=0,rightPopupBond=0;

	public final static int MODE_NORMAL=0; // usual invocation, with a frame, and a current file
	public final static int MODE_STREAM=1; // molecule flow-through editing, from stdin to stdout
	public final static int MODE_APPLET=2; // embedded applet version, with no frame
	public final static int MODE_SLAVE=3; // non-file version, editing a transient datastructure

	public MainPanel(String LoadFN,int Mode,JFrame frameParent) 
	{
		streamMode=Mode==MODE_STREAM;
		appletMode=Mode==MODE_APPLET;
		slaveMode=Mode==MODE_SLAVE;
		this.frameParent=frameParent;
		ToolCursors.setRefClass(getClass());
		
		setBackground(new Color(0xE8E8E8));
		
		useLocalClipboard=appletMode; // applet mode always uses "local clipboard"; if the applet is signed, this will need to switch
									  // to false if permission has been granted to use the system clipboard
		if (appletMode)
		{
			cfg=new ConfigData();
			cfg.useDefaults();
		}
		else
		{
			cfg=new ConfigData(".sketchel");
			try {cfg.loadFile();}
			catch (IOException ex)
			{
				ex.printStackTrace();
				JOptionPane.showMessageDialog(null,
					"Unable to read configuration file\n  "+cfg.fullFN()+"\nContinuing with default settings.",
					"Config Unreadable",JOptionPane.ERROR_MESSAGE);
				cfg.useDefaults();
			}
		}
		
		if (mainIcon==null) mainIcon=loadIcon("MainIcon.png");
		if (mainLogo==null) mainLogo=loadIcon("MainLogo.png");
		
		templ=new Templates(getClass());
		
		// toolbar
		
		JToolBar tools=new JToolBar(JToolBar.VERTICAL);
		tools.setFloatable(!appletMode);
		tools.setFocusable(false);
		toolButtons=new AbstractButton[TOOL_COUNT];
		toolIcons=new ImageIcon[TOOL_COUNT];
		toolGroup=new ButtonGroup();
		for (int n=0;n<TOOL_COUNT;n++) 
		{
			//toolIcons[n]=new ImageIcon(getClass().getResource("/images/"+IMAGE_TOOL[n]+".png"));
			toolIcons[n]=loadIcon(IMAGE_TOOL[n]+".png");
				
			if (ACTIVE_TOOL[n]) 
			{
				toolButtons[n]=new ToolButton(toolIcons[n]); 
				toolGroup.add(toolButtons[n]);
				tools.add(toolButtons[n]);
				toolButtons[n].addActionListener(this);
				toolButtons[n].setToolTipText(TOOL_TIPS[n]);
			}
		}
		toolGroup.setSelected(toolButtons[TOOL_CURSOR].getModel(),true);
		
		toolButtons[TOOL_SETATOM].addMouseListener(this);
		toolButtons[TOOL_SETATOM].addKeyListener(this);
		toolButtons[TOOL_TEMPLATE].addMouseListener(this);
		
		selectElement("C");

		// menu
		
		JMenuBar menubar=appletMode ? menuBarApplet() : menuBarApplication();

		// molecule
		
		editor=new EditorPane();
		editor.setMolSelectListener(this);
//		editor.enableDnD();
		//editor.setBorder(true);
		if (cfg.numPolicies()>0) editor.setRenderPolicy(cfg.getPolicy(0).clone());

		// overall layout

		if (!appletMode)
		{
			setLayout(new BorderLayout());
			add(editor,BorderLayout.CENTER);
			if (frameParent!=null)
				frameParent.setJMenuBar(menubar);
			else
				add(menubar,BorderLayout.NORTH);
			add(tools,BorderLayout.WEST);
		}
		else
		{
			// (!! add a little icon somewhere which does the About box...)

			JPanel p=new JPanel();
			p.setLayout(new BorderLayout());
			p.add(menubar,BorderLayout.NORTH);
			p.add(editor,BorderLayout.CENTER);
			
			setLayout(new BorderLayout());
			add(tools,BorderLayout.WEST);
			add(p,BorderLayout.CENTER);
		}
		
		editor.grabFocus();
		
		editor.setToolCursor();
		
//		if (!appletMode) curDir=System.getProperty("user.dir");
//		if (LoadFN!=null)
//		{
//			openFile(LoadFN,FileTypeGuess.TYPE_UNKNOWN);
//			File parent=new File(LoadFN).getAbsoluteFile().getParentFile();
//			if (parent!=null) curDir=parent.getAbsolutePath();
//		}
//		if (streamMode) readStream();
		
		addKeyListener(this);
		editor.addKeyListener(this);
		if (frameParent!=null) frameParent.addWindowListener(this);

//		if (!appletMode)
//		{		
//			dragMol=new DraggableMolecule(editor);
//			menubar.add(dragMol);
//		}
//		
		reviewMenuState();
	}
	
	// if specified, this interface will hijack all user efforts to "Save" to the source file
	public void setSaveListener(SaveListener saver) {this.saver=saver;}
	
	// builds and returns a menu bar suitable for the application-style invocation
	private JMenuBar menuBarApplication()
	{
		int shortMask=Toolkit.getDefaultToolkit().getMenuShortcutKeyMask();
		boolean isMac=shortMask!=InputEvent.CTRL_MASK,notMac=!isMac;

		// File menu
		
		JMenu menufile=new JMenu("File");
		menufile.setMnemonic(KeyEvent.VK_F);

		miFileNew=Util.menuItem(this,"New",KeyEvent.VK_N,null,KeyStroke.getKeyStroke('N',shortMask));
		miFileNewWindow=Util.menuItem(this,"New Window",KeyEvent.VK_W,null,KeyStroke.getKeyStroke('N',shortMask|InputEvent.SHIFT_MASK));
		miFileNewDataSheet=Util.menuItem(this,"New DataSheet",KeyEvent.VK_D,null);
		miFileOpen=Util.menuItem(this,"Open",KeyEvent.VK_O,null,KeyStroke.getKeyStroke('O',shortMask));
		if (!streamMode) miFileSave=Util.menuItem(this,"Save",KeyEvent.VK_S,null,KeyStroke.getKeyStroke('S',shortMask));
		miFileSaveAs=Util.menuItem(this,"Save As",KeyEvent.VK_A);
		miFileShare=Util.menuItem(this,"Share on MolSync",KeyEvent.VK_M);
		miExportMDLMOL=Util.menuItem(this,"as MDL MOL",KeyEvent.VK_M,null,KeyStroke.getKeyStroke('M',shortMask|InputEvent.SHIFT_MASK));
		miExportCMLXML=Util.menuItem(this,"as CML XML",KeyEvent.VK_X,null,KeyStroke.getKeyStroke('X',shortMask|InputEvent.SHIFT_MASK));
		miExportSVG=Util.menuItem(this,"as SVG",KeyEvent.VK_S,null,KeyStroke.getKeyStroke('S',shortMask|InputEvent.SHIFT_MASK));
		miExportODG=Util.menuItem(this,"as ODG",KeyEvent.VK_G,null,KeyStroke.getKeyStroke('G',shortMask|InputEvent.SHIFT_MASK));
		miExportPNG=Util.menuItem(this,"as PNG",KeyEvent.VK_P,null,KeyStroke.getKeyStroke('P',shortMask|InputEvent.SHIFT_MASK));
		if (streamMode) miFileQuit=Util.menuItem(this,"Save & Quit",KeyEvent.VK_Q,null,KeyStroke.getKeyStroke('W',shortMask));
		else miFileQuit=Util.menuItem(this,"Close",KeyEvent.VK_C,null,KeyStroke.getKeyStroke('W',shortMask));
		
		menufile.add(miFileQuit);
		menufile.add(miFileNew);
		menufile.add(miFileNewWindow);
		menufile.add(miFileNewDataSheet);
		menufile.add(miFileOpen);
		if (miFileSave!=null) menufile.add(miFileSave);
		menufile.add(miFileSaveAs);
		menufile.add(miFileShare);
		JMenu menuexport=new JMenu("Export");
		menuexport.setMnemonic(KeyEvent.VK_X);
		menuexport.add(miExportMDLMOL);
		menuexport.add(miExportCMLXML);
		menuexport.add(miExportSVG);
		menuexport.add(miExportODG);
		menuexport.add(miExportPNG);
		menufile.add(menuexport);

		menufile.addSeparator();
		menufile.add(miFileQuit);
		
		// Edit menu
		
		JMenu menuedit=new JMenu("Edit");
		menuedit.setMnemonic(KeyEvent.VK_E);
		
		miEditDialog=Util.menuItem(this,"Edit",KeyEvent.VK_E,toolIcons[TOOL_DIALOG],notMac ? KeyStroke.getKeyStroke(' ',shortMask) : KeyStroke.getKeyStroke('.',shortMask));
		miEditUndo=Util.menuItem(this,"Undo",KeyEvent.VK_U,toolIcons[TOOL_UNDO],KeyStroke.getKeyStroke('Z',shortMask));
		miEditRedo=Util.menuItem(this,"Redo",KeyEvent.VK_R,toolIcons[TOOL_REDO],
														KeyStroke.getKeyStroke('Z',shortMask|InputEvent.SHIFT_MASK));
		miEditCut=Util.menuItem(this,"Cut",KeyEvent.VK_X,null,KeyStroke.getKeyStroke('X',shortMask));
		miEditCopy=Util.menuItem(this,"Copy",KeyEvent.VK_C,null,KeyStroke.getKeyStroke('C',shortMask));

		//miEditCopySVG=Util.menuItem(this,"Copy SVG",KeyEvent.VK_V,null,KeyStroke.getKeyStroke('C',InputEvent.CTRL_MASK+InputEvent.SHIFT_MASK));
		JMenu menucopy=new JMenu("Copy As");
		menucopy.setMnemonic(KeyEvent.VK_Y);
		miCopyAsSk=Util.menuItem(this,"SketchEl",KeyEvent.VK_S,null,null);
		miCopyAsMol=Util.menuItem(this,"MDL Molfile",KeyEvent.VK_M,null,null);
		miCopyAsJSON=Util.menuItem(this,"JSON",KeyEvent.VK_J,null,null);
		miCopyAsSVG=Util.menuItem(this,"SVG Picture",KeyEvent.VK_V,null,null/*KeyStroke.getKeyStroke('C',InputEvent.CTRL_MASK+InputEvent.SHIFT_MASK)*/);
		menucopy.add(miCopyAsSk);
		menucopy.add(miCopyAsMol);
		menucopy.add(miCopyAsJSON);
		menucopy.add(miCopyAsSVG);

		miEditPaste=Util.menuItem(this,"Paste",KeyEvent.VK_P,null,KeyStroke.getKeyStroke('V',shortMask));
		miSelectAll=Util.menuItem(this,"Select All",KeyEvent.VK_S,null,KeyStroke.getKeyStroke('A',shortMask));
		miSelectNextAtom=Util.menuItem(this,"Next Atom",KeyEvent.VK_N,null,KeyStroke.getKeyStroke('E',shortMask));
		miSelectPrevAtom=Util.menuItem(this,"Previous Atom",KeyEvent.VK_R,null,KeyStroke.getKeyStroke('E',shortMask|InputEvent.SHIFT_MASK));
		miSelectNextGroup=Util.menuItem(this,"Next Group",KeyEvent.VK_G,null,KeyStroke.getKeyStroke('G',shortMask));
		miSelectPrevGroup=Util.menuItem(this,"Previous Group",KeyEvent.VK_V,null,KeyStroke.getKeyStroke('G',shortMask|InputEvent.SHIFT_MASK));
		miFlipHoriz=Util.menuItem(this,"Flip Horizontal",KeyEvent.VK_H,null,null);
		miFlipVert=Util.menuItem(this,"Flip Vertical",KeyEvent.VK_V,null,null);
		miRotateP30=Util.menuItem(this,"Rotate +30\u00B0",KeyEvent.VK_3,null,null);
		miRotateN30=Util.menuItem(this,"Rotate -30\u00B0",KeyEvent.VK_MINUS,null,null);
		miRotateP45=Util.menuItem(this,"Rotate +45\u00B0",KeyEvent.VK_4,null,null);
		miRotateN45=Util.menuItem(this,"Rotate -45\u00B0",KeyEvent.VK_5,null,null);
		miRotateP90=Util.menuItem(this,"Rotate +90\u00B0",KeyEvent.VK_9,null,null);
		miRotateN90=Util.menuItem(this,"Rotate -90\u00B0",KeyEvent.VK_0,null,null);
		miTemplateAdd=Util.menuItem(this,"Add Temporary Template",KeyEvent.VK_T,null,null);
		miEditNormalise=Util.menuItem(this,"Normalise Bond Lengths",KeyEvent.VK_N,null,null);
		miQueryDialog=Util.menuItem(this,"Query Properties",KeyEvent.VK_Q,null,KeyStroke.getKeyStroke(';',shortMask));
		
		JMenu menusubsume=new JMenu("Subsume");
		miSubsumeAbbreviate=Util.menuItem(this,"Abbreviate",KeyEvent.VK_A,null,null);
		miSubsumeSubFrag=Util.menuItem(this,"Query Subfragment",KeyEvent.VK_S,null,null);
		miSubsumeSubFragNot=Util.menuItem(this,"Query Not Subfragment",KeyEvent.VK_N,null,null);
		menusubsume.add(miSubsumeAbbreviate);
		menusubsume.add(miSubsumeSubFrag);
		menusubsume.add(miSubsumeSubFragNot);
	
		menuedit.add(miEditDialog);
		menuedit.add(miEditUndo);
		menuedit.add(miEditRedo);
		menuedit.add(miEditCut);
		menuedit.add(miEditCopy);
		//menuedit.add(miEditCopySVG);
		menuedit.add(menucopy);
		menuedit.add(miEditPaste);
		menuedit.addSeparator();
		menuedit.add(miSelectAll);
		menuedit.add(miSelectNextAtom);
		menuedit.add(miSelectPrevAtom);
		menuedit.add(miSelectNextGroup);
		menuedit.add(miSelectPrevGroup);
		menuedit.addSeparator();
		menuedit.add(miFlipHoriz);
		menuedit.add(miFlipVert);
		menuedit.add(miRotateP30);
		menuedit.add(miRotateN30);
		menuedit.add(miRotateP45);
		menuedit.add(miRotateN45);
		menuedit.add(miRotateP90);
		menuedit.add(miRotateN90);
		menuedit.addSeparator();
		menuedit.add(miEditNormalise);
		menuedit.add(miQueryDialog);
		menuedit.add(menusubsume);

		// View menu
		
		JMenu menuview=new JMenu("View");
		menuview.setMnemonic(KeyEvent.VK_V);
		
		miZoomFull=Util.menuItem(this,"Zoom Full",KeyEvent.VK_F,null,KeyStroke.getKeyStroke('0',shortMask));
		miZoomIn=Util.menuItem(this,"Zoom In",KeyEvent.VK_I,null,KeyStroke.getKeyStroke('=',shortMask));
		miZoomOut=Util.menuItem(this,"Zoom Out",KeyEvent.VK_O,null,KeyStroke.getKeyStroke('-',shortMask));
		miPanLeft=Util.menuItem(this,"Pan Left",KeyEvent.VK_L,null,KeyStroke.getKeyStroke(KeyEvent.VK_LEFT,shortMask));
		miPanRight=Util.menuItem(this,"Pan Right",KeyEvent.VK_R,null,KeyStroke.getKeyStroke(KeyEvent.VK_RIGHT,shortMask));
		miPanUp=Util.menuItem(this,"Pan Up",KeyEvent.VK_U,null,KeyStroke.getKeyStroke(KeyEvent.VK_UP,shortMask));
		miPanDown=Util.menuItem(this,"Pan Down",KeyEvent.VK_D,null,KeyStroke.getKeyStroke(KeyEvent.VK_DOWN,shortMask));
		ButtonGroup showBG=new ButtonGroup();
		miShowElements=Util.radioMenuItem(this,"Show Elements",KeyEvent.VK_E,true,showBG);
		miShowAllElem=Util.radioMenuItem(this,"Show All Elements",KeyEvent.VK_A,false,showBG);
		miShowIndices=Util.radioMenuItem(this,"Show Indices",KeyEvent.VK_N,false,showBG);
		miShowRingID=Util.radioMenuItem(this,"Show Ring ID",KeyEvent.VK_R,false,showBG);
		miShowCIPPrio=Util.radioMenuItem(this,"Show CIP Priority",KeyEvent.VK_C,false,showBG);
		miShowMapNum=Util.radioMenuItem(this,"Show Mapping Number",KeyEvent.VK_M,false,showBG);
		miShowExtra=Util.checkboxMenuItem(this,"Show Extra Fields",KeyEvent.VK_X,false);
		miRenderPolicy=new JMenu("Render Policy");
		miRenderPolicy.setMnemonic(KeyEvent.VK_R);
		
		JMenu menupan=new JMenu("Pan");
		menupan.setMnemonic(KeyEvent.VK_P);
		menupan.add(miPanLeft);
		menupan.add(miPanRight);
		menupan.add(miPanUp);
		menupan.add(miPanDown);
		
		menuview.add(miZoomFull);
		menuview.add(miZoomIn);
		menuview.add(miZoomOut);
		menuview.add(menupan);
		menuview.addSeparator();
		menuview.add(miShowElements);
		menuview.add(miShowAllElem);
		menuview.add(miShowIndices);
		menuview.add(miShowRingID);
		menuview.add(miShowCIPPrio);
		menuview.add(miShowMapNum);
		menuview.add(miShowExtra);
		menuview.addSeparator();
		menuview.add(miRenderPolicy);
		
		// Tool menu
		
		JMenu menutool=new JMenu("Tool");
		menutool.setMnemonic(KeyEvent.VK_T);
		
		miToolCursor=Util.menuItem(this,"Cursor",KeyEvent.VK_C,toolIcons[TOOL_CURSOR],KeyStroke.getKeyStroke(KeyEvent.VK_ESCAPE,0));
		miToolPan=Util.menuItem(this,"Pan",KeyEvent.VK_P,toolIcons[TOOL_PAN],KeyStroke.getKeyStroke('/',shortMask));
		miToolRotator=Util.menuItem(this,"Rotator",KeyEvent.VK_R,toolIcons[TOOL_ROTATOR],KeyStroke.getKeyStroke('R',shortMask));
		miToolErasor=Util.menuItem(this,"Erasor",KeyEvent.VK_E,toolIcons[TOOL_ERASOR],KeyStroke.getKeyStroke('D',shortMask));
		miToolEditAtom=Util.menuItem(this,"Edit Atom",KeyEvent.VK_A,toolIcons[TOOL_EDIT],KeyStroke.getKeyStroke(',',shortMask));
		miToolSetAtom=Util.menuItem(this,"Set Atom",KeyEvent.VK_S,loadIcon("ASelMenu.png"),KeyStroke.getKeyStroke('.',shortMask));
		miBondSingle=Util.menuItem(this,"Single Bond",KeyEvent.VK_1,toolIcons[TOOL_SINGLE],KeyStroke.getKeyStroke('1',shortMask));
		miBondDouble=Util.menuItem(this,"Double Bond",KeyEvent.VK_2,toolIcons[TOOL_DOUBLE],KeyStroke.getKeyStroke('2',shortMask));
		miBondTriple=Util.menuItem(this,"Triple Bond",KeyEvent.VK_3,toolIcons[TOOL_TRIPLE],KeyStroke.getKeyStroke('3',shortMask));
		miBondZero=Util.menuItem(this,"Zero Bond",KeyEvent.VK_0,toolIcons[TOOL_ZERO],KeyStroke.getKeyStroke('0',shortMask));
		miBondInclined=Util.menuItem(this,"Inclined Bond",KeyEvent.VK_I,toolIcons[TOOL_INCLINED]);
		miBondDeclined=Util.menuItem(this,"Declined Bond",KeyEvent.VK_D,toolIcons[TOOL_DECLINED]);
		miBondUnknown=Util.menuItem(this,"Unknown Bond",KeyEvent.VK_U,toolIcons[TOOL_UNKNOWN]);
		miToolCharge=Util.menuItem(this,"Charge",KeyEvent.VK_H,toolIcons[TOOL_CHARGE],KeyStroke.getKeyStroke('H',shortMask));
		miTemplateTool=Util.menuItem(this,"Template Tool",KeyEvent.VK_T,toolIcons[TOOL_TEMPLATE],KeyStroke.getKeyStroke('T',shortMask));
		miTemplateSelect=Util.menuItem(this,"Select Template",KeyEvent.VK_T,toolIcons[TOOL_TEMPLATE],KeyStroke.getKeyStroke('T',shortMask|InputEvent.SHIFT_MASK));
		
		menutool.add(miToolCursor);
		menutool.add(miToolPan);
		menutool.add(miToolRotator);
		menutool.add(miToolErasor);
		menutool.add(miToolEditAtom);
		menutool.add(miToolSetAtom);
		menutool.add(miBondSingle);
		menutool.add(miBondDouble);
		menutool.add(miBondTriple);
		menutool.add(miBondZero);
		menutool.add(miBondInclined);
		menutool.add(miBondDeclined);
		menutool.add(miBondUnknown);
		menutool.add(miToolCharge);
		menutool.add(miTemplateTool);
		menutool.add(miTemplateSelect);

		// Hydrogen menu
		
		JMenu menuhydr=new JMenu("Hydrogen");
		menuhydr.setMnemonic(KeyEvent.VK_Y);
		
		miShowHydrogen=Util.checkboxMenuItem(this,"Show Hydrogen",KeyEvent.VK_Y,true);
		miHydSetExpl=Util.menuItem(this,"Set Explicit",KeyEvent.VK_E);
		miHydClearExpl=Util.menuItem(this,"Clear Explicit",KeyEvent.VK_X);
		miHydZeroExpl=Util.menuItem(this,"Zero Explicit",KeyEvent.VK_Z);
		miHydCreate=Util.menuItem(this,"Create Actual",KeyEvent.VK_C);
		miHydDelete=Util.menuItem(this,"Delete Actual",KeyEvent.VK_D);
		
		menuhydr.add(miShowHydrogen);
		menuhydr.add(miHydSetExpl);
		menuhydr.add(miHydClearExpl);
		menuhydr.add(miHydZeroExpl);
		menuhydr.add(miHydCreate);
		menuhydr.add(miHydDelete);

		// Stereochemistry menu

		JMenu menuster=new JMenu("Stereochemistry");
		menuster.setMnemonic(KeyEvent.VK_S);
		
		miShowStereo=Util.checkboxMenuItem(this,"Show Stereo Labels",KeyEvent.VK_L,false);
		miStereoInvert=Util.menuItem(this,"Invert Stereochemistry",KeyEvent.VK_I);
		miStereoSetRZ=Util.menuItem(this,"Set R/Z",KeyEvent.VK_R);
		miStereoSetSE=Util.menuItem(this,"Set S/E",KeyEvent.VK_S);
		miStereoCycle=Util.menuItem(this,"Cycle Wedges",KeyEvent.VK_C);
		miStereoRemove=Util.menuItem(this,"Remove Wedges",KeyEvent.VK_W);
		
		menuster.add(miShowStereo);
		menuster.add(miStereoInvert);
		menuster.add(miStereoSetRZ);
		menuster.add(miStereoSetSE);
		menuster.add(miStereoCycle);
		menuster.add(miStereoRemove);

		// Help menu

		JMenu menuhelp=new JMenu("Help");
		menuhelp.setMnemonic(KeyEvent.VK_H);
		
		miHelpAbout=Util.menuItem(this,"About",KeyEvent.VK_A);	
		miHelpConfig=Util.menuItem(this,"Config",KeyEvent.VK_C);
		menuhelp.add(miHelpAbout);
		menuhelp.add(miHelpConfig);

		// put it all together
		JMenuBar menubar=new JMenuBar();
		menubar.add(menufile);
		menubar.add(menuedit);
		menubar.add(menuview);
		menubar.add(menutool);
		menubar.add(menuhydr);
		menubar.add(menuster);
		menubar.add(Box.createHorizontalGlue());
		menubar.add(menuhelp);

		return menubar;
	}	 
	
	// builds and returns a menu bar suitable for the applet-style invocation
	private JMenuBar menuBarApplet()
	{
		// Block menu
		
		AppletMenu menublock=new AppletMenu("Block");
		menublock.setMnemonic(KeyEvent.VK_B);
		
		miFileNew=Util.menuItem(this,"New",KeyEvent.VK_N,null,KeyStroke.getKeyStroke('N',InputEvent.CTRL_MASK));
		miEditDialog=Util.menuItem(this,"Edit",KeyEvent.VK_E,null,KeyStroke.getKeyStroke(' ',InputEvent.CTRL_MASK));
		miEditUndo=Util.menuItem(this,"Undo",KeyEvent.VK_U,null,KeyStroke.getKeyStroke('Z',InputEvent.CTRL_MASK));
		miEditRedo=Util.menuItem(this,"Redo",KeyEvent.VK_R,null,KeyStroke.getKeyStroke('Z',InputEvent.CTRL_MASK+InputEvent.SHIFT_MASK));
		miEditCut=Util.menuItem(this,"Cut",KeyEvent.VK_X,null,KeyStroke.getKeyStroke('X',InputEvent.CTRL_MASK));
		miEditCopy=Util.menuItem(this,"Copy",KeyEvent.VK_C,null,KeyStroke.getKeyStroke('C',InputEvent.CTRL_MASK));
		miEditPaste=Util.menuItem(this,"Paste",KeyEvent.VK_V,null,KeyStroke.getKeyStroke('V',InputEvent.CTRL_MASK));
		
		menublock.add(miFileNew);
		menublock.add(miEditDialog);
		menublock.add(miEditUndo);
		menublock.add(miEditRedo);
		menublock.add(miEditCut);
		menublock.add(miEditCopy);
		menublock.add(miEditPaste);
		
		// Select menu
		
		AppletMenu menuselect=new AppletMenu("Select");
		menuselect.setMnemonic(KeyEvent.VK_S);
		
		miSelectAll=Util.menuItem(this,"Select All",KeyEvent.VK_S,null,KeyStroke.getKeyStroke('A',InputEvent.CTRL_MASK));
		miSelectNextAtom=Util.menuItem(this,"Next Atom",KeyEvent.VK_N,null,KeyStroke.getKeyStroke('E',InputEvent.CTRL_MASK));
		miSelectPrevAtom=Util.menuItem(this,"Previous Atom",KeyEvent.VK_P,null,KeyStroke.getKeyStroke('E',InputEvent.CTRL_MASK+InputEvent.SHIFT_MASK));
		miSelectNextGroup=Util.menuItem(this,"Next Group",KeyEvent.VK_G,null,KeyStroke.getKeyStroke('G',InputEvent.CTRL_MASK));
		miSelectPrevGroup=Util.menuItem(this,"Previous Group",KeyEvent.VK_R,null,KeyStroke.getKeyStroke('G',InputEvent.CTRL_MASK+InputEvent.SHIFT_MASK));
		
		menuselect.add(miSelectAll);
		menuselect.add(miSelectNextAtom);
		menuselect.add(miSelectPrevAtom);
		menuselect.add(miSelectNextGroup);
		menuselect.add(miSelectPrevGroup);

		// Transform menu

		AppletMenu menutransform=new AppletMenu("Transform");
		menutransform.setMnemonic(KeyEvent.VK_T);
		
		miFlipHoriz=Util.menuItem(this,"Flip Horizontal",KeyEvent.VK_H,null,null);
		miFlipVert=Util.menuItem(this,"Flip Vertical",KeyEvent.VK_V,null,null);
		miRotateP30=Util.menuItem(this,"Rotate +30\u00B0",KeyEvent.VK_3,null,null);
		miRotateN30=Util.menuItem(this,"Rotate -30\u00B0",KeyEvent.VK_MINUS,null,null);
		miRotateP45=Util.menuItem(this,"Rotate +45\u00B0",KeyEvent.VK_4,null,null);
		miRotateN45=Util.menuItem(this,"Rotate -45\u00B0",KeyEvent.VK_5,null,null);
		miRotateP90=Util.menuItem(this,"Rotate +90\u00B0",KeyEvent.VK_9,null,null);
		miRotateN90=Util.menuItem(this,"Rotate -90\u00B0",KeyEvent.VK_0,null,null);
		miTemplateAdd=Util.menuItem(this,"Add Temporary Template",KeyEvent.VK_T,null,null);
		miEditNormalise=Util.menuItem(this,"Normalise Bond Lengths",KeyEvent.VK_N,null,null);
		
		menutransform.add(miFlipHoriz);
		menutransform.add(miFlipVert);
		menutransform.add(miRotateP30);
		menutransform.add(miRotateN30);
		menutransform.add(miRotateP45);
		menutransform.add(miRotateN45);
		menutransform.add(miRotateP90);
		menutransform.add(miRotateN90);
		menutransform.addSeparator();
		menutransform.add(miTemplateAdd);
		menutransform.add(miEditNormalise);

		// Zoom menu

		AppletMenu menuzoom=new AppletMenu("Zoom");
		menuzoom.setMnemonic(KeyEvent.VK_Z);
		
		miZoomFull=Util.menuItem(this,"Zoom Full",KeyEvent.VK_F,null,KeyStroke.getKeyStroke('0',InputEvent.CTRL_MASK));
		miZoomIn=Util.menuItem(this,"Zoom In",KeyEvent.VK_I,null,KeyStroke.getKeyStroke('=',InputEvent.CTRL_MASK));
		miZoomOut=Util.menuItem(this,"Zoom Out",KeyEvent.VK_O,null,KeyStroke.getKeyStroke('-',InputEvent.CTRL_MASK));
		miPanLeft=Util.menuItem(this,"Pan Left",KeyEvent.VK_L,null,KeyStroke.getKeyStroke(KeyEvent.VK_LEFT,InputEvent.ALT_MASK));
		miPanRight=Util.menuItem(this,"Pan Right",KeyEvent.VK_R,null,KeyStroke.getKeyStroke(KeyEvent.VK_RIGHT,InputEvent.ALT_MASK));
		miPanUp=Util.menuItem(this,"Pan Up",KeyEvent.VK_U,null,KeyStroke.getKeyStroke(KeyEvent.VK_UP,InputEvent.ALT_MASK));
		miPanDown=Util.menuItem(this,"Pan Down",KeyEvent.VK_D,null,KeyStroke.getKeyStroke(KeyEvent.VK_DOWN,InputEvent.ALT_MASK));
		
		menuzoom.add(miZoomFull);
		menuzoom.add(miZoomIn);
		menuzoom.add(miZoomOut);
		menuzoom.add(miPanLeft);
		menuzoom.add(miPanRight);
		menuzoom.add(miPanUp);
		menuzoom.add(miPanDown);

		// Show menu

		AppletMenu menushow=new AppletMenu("Show");
		menushow.setMnemonic(KeyEvent.VK_O);
		
		ButtonGroup showBG=new ButtonGroup();
		miShowElements=Util.radioMenuItem(this,"Show Elements",KeyEvent.VK_E,true,showBG);
		miShowAllElem=Util.radioMenuItem(this,"Show All Elements",KeyEvent.VK_A,false,showBG);
		miShowIndices=Util.radioMenuItem(this,"Show Indices",KeyEvent.VK_I,false,showBG);
		miShowRingID=Util.radioMenuItem(this,"Show Ring ID",KeyEvent.VK_R,false,showBG);
		miShowCIPPrio=Util.radioMenuItem(this,"Show CIP Priority",KeyEvent.VK_C,false,showBG);
		miShowMapNum=Util.radioMenuItem(this,"Show Mapping Number",KeyEvent.VK_M,false,showBG);
		miRenderPolicy=new JMenu("Render Policy");
		miRenderPolicy.setMnemonic(KeyEvent.VK_R);
		
		menushow.add(miShowElements);
		menushow.add(miShowAllElem);
		menushow.add(miShowIndices);
		menushow.add(miShowRingID);
		menushow.add(miShowCIPPrio);
		menushow.add(miShowMapNum);
		menushow.add(miRenderPolicy);

		// Hydrogen menu

		AppletMenu menuhydrogen=new AppletMenu("Hydrogen");
		menuhydrogen.setMnemonic(KeyEvent.VK_H);
		
		miShowHydrogen=new JCheckBoxMenuItem("Show Hydrogen");
		miShowHydrogen.setMnemonic(KeyEvent.VK_Y);
		miShowHydrogen.setSelected(true);
		miShowHydrogen.addActionListener(this);
		miHydSetExpl=Util.menuItem(this,"Set Explicit",KeyEvent.VK_E);
		miHydClearExpl=Util.menuItem(this,"Clear Explicit",KeyEvent.VK_X);
		miHydZeroExpl=Util.menuItem(this,"Zero Explicit",KeyEvent.VK_Z);
		miHydCreate=Util.menuItem(this,"Create Actual",KeyEvent.VK_C);
		miHydDelete=Util.menuItem(this,"Delete Actual",KeyEvent.VK_D);
		
		menuhydrogen.add(miShowHydrogen);
		menuhydrogen.add(miHydSetExpl);
		menuhydrogen.add(miHydClearExpl);
		menuhydrogen.add(miHydZeroExpl);
		menuhydrogen.add(miHydCreate);
		menuhydrogen.add(miHydDelete);

		// Stereo menu

		AppletMenu menustereo=new AppletMenu("Stereo");
		menustereo.setMnemonic(KeyEvent.VK_E);
		
		miShowStereo=new JCheckBoxMenuItem("Show Stereo Labels");
		miShowStereo.setMnemonic(KeyEvent.VK_L);
		miShowStereo.setSelected(false);
		miShowStereo.addActionListener(this);
		miStereoInvert=Util.menuItem(this,"Invert Stereochemistry",KeyEvent.VK_I);
		miStereoSetRZ=Util.menuItem(this,"Set R/Z",KeyEvent.VK_R);
		miStereoSetSE=Util.menuItem(this,"Set S/E",KeyEvent.VK_S);
		miStereoCycle=Util.menuItem(this,"Cycle Wedges",KeyEvent.VK_C);
		miStereoRemove=Util.menuItem(this,"Remove Wedges",KeyEvent.VK_W);
		
		menustereo.add(miShowStereo);
		menustereo.add(miStereoInvert);
		menustereo.add(miStereoSetRZ);
		menustereo.add(miStereoSetSE);
		menustereo.add(miStereoCycle);
		menustereo.add(miStereoRemove);
		
		// Help menu

		AppletMenu menuhelp=new AppletMenu("Help");
		menuhelp.setMnemonic(KeyEvent.VK_P);
		
		miHelpAbout=Util.menuItem(this,"About",KeyEvent.VK_A);
		menuhelp.add(miHelpAbout);

		// put it all together
		JMenuBar menubar=new JMenuBar();
		menubar.add(menublock);
		menubar.add(menuselect);
		menubar.add(menutransform);
		menubar.add(menuzoom);
		menubar.add(menushow);
		menubar.add(menuhydrogen);
		menubar.add(menustereo);
		menubar.add(menuhelp);
		
		// applets don't have a toolbar menu, so put in hotkeys for them
		ActionMap am=getActionMap();
		InputMap im=getInputMap(JRootPane.WHEN_IN_FOCUSED_WINDOW);

		im.put(KeyStroke.getKeyStroke(KeyEvent.VK_ESCAPE,0),IMAGE_TOOL[TOOL_CURSOR]);
		am.put(IMAGE_TOOL[TOOL_CURSOR],new HotKeyAction(IMAGE_TOOL[TOOL_CURSOR],this));
		
		im.put(KeyStroke.getKeyStroke('.',InputEvent.CTRL_MASK),IMAGE_TOOL[TOOL_PAN]);
		am.put(IMAGE_TOOL[TOOL_PAN],new HotKeyAction(IMAGE_TOOL[TOOL_PAN],this));

		im.put(KeyStroke.getKeyStroke('R',InputEvent.CTRL_MASK),IMAGE_TOOL[TOOL_ROTATOR]);
		am.put(IMAGE_TOOL[TOOL_ROTATOR],new HotKeyAction(IMAGE_TOOL[TOOL_ROTATOR],this));

		im.put(KeyStroke.getKeyStroke('D',InputEvent.CTRL_MASK),IMAGE_TOOL[TOOL_ERASOR]);
		am.put(IMAGE_TOOL[TOOL_ERASOR],new HotKeyAction(IMAGE_TOOL[TOOL_ERASOR],this));

		im.put(KeyStroke.getKeyStroke(',',InputEvent.CTRL_MASK),IMAGE_TOOL[TOOL_EDIT]);
		am.put(IMAGE_TOOL[TOOL_EDIT],new HotKeyAction(IMAGE_TOOL[TOOL_EDIT],this));

		im.put(KeyStroke.getKeyStroke('1',InputEvent.CTRL_MASK),IMAGE_TOOL[TOOL_SINGLE]);
		am.put(IMAGE_TOOL[TOOL_SINGLE],new HotKeyAction(IMAGE_TOOL[TOOL_SINGLE],this));

		im.put(KeyStroke.getKeyStroke('2',InputEvent.CTRL_MASK),IMAGE_TOOL[TOOL_DOUBLE]);
		am.put(IMAGE_TOOL[TOOL_DOUBLE],new HotKeyAction(IMAGE_TOOL[TOOL_DOUBLE],this));

		im.put(KeyStroke.getKeyStroke('3',InputEvent.CTRL_MASK),IMAGE_TOOL[TOOL_TRIPLE]);
		am.put(IMAGE_TOOL[TOOL_TRIPLE],new HotKeyAction(IMAGE_TOOL[TOOL_TRIPLE],this));

		im.put(KeyStroke.getKeyStroke('0',InputEvent.CTRL_MASK),IMAGE_TOOL[TOOL_ZERO]);
		am.put(IMAGE_TOOL[TOOL_ZERO],new HotKeyAction(IMAGE_TOOL[TOOL_ZERO],this));

		im.put(KeyStroke.getKeyStroke('H',InputEvent.CTRL_MASK),IMAGE_TOOL[TOOL_CHARGE]);
		am.put(IMAGE_TOOL[TOOL_CHARGE],new HotKeyAction(IMAGE_TOOL[TOOL_CHARGE],this));

		im.put(KeyStroke.getKeyStroke('T',InputEvent.CTRL_MASK),IMAGE_TOOL[TOOL_TEMPLATE]);
		am.put(IMAGE_TOOL[TOOL_TEMPLATE],new HotKeyAction(IMAGE_TOOL[TOOL_TEMPLATE],this));

		return menubar;
	}
	
	public Molecule molData() {return editor.molData();} // shallow copy, use with care
	public EditorPane editorPane() {return editor;} // use with even greater care than above
	public void setMolecule(Molecule Mol) 
	{
		editor.replace(Mol);
		editor.scaleToFit();
		editor.notifySaved();
	}
	public void addMolecule(Molecule Mol) 
	{
		editor.addArbitraryFragment(Mol);
		editor.scaleToFit();
		editor.notifySaved();
	}
	public void scaleToFit() {editor.scaleToFit();}
	
	// trivial menu function which is null-tolerant
	private void setMenuEnabled(JMenuItem mi,boolean enabled) {if (mi!=null) mi.setEnabled(enabled);}
	
	private void fileQuit()
	{
		if (!streamMode)
		{
			if (editor.isDirty())
			{
				if (JOptionPane.showConfirmDialog(null,
					"Current structure has been modified. Exit without saving?","Quit",
					JOptionPane.YES_NO_OPTION)!=JOptionPane.YES_OPTION) return;
			}
		}
		else
		{
//			writeStream();
		}

		if (frameParent!=null) frameParent.dispose(); 

		return;
	}
	private void fileNew()
	{
		if (editor.molData().numAtoms()>0)
		{
			if (JOptionPane.showConfirmDialog(null,
				"Clear current structure and start anew?","New",
				JOptionPane.YES_NO_OPTION)!=JOptionPane.YES_OPTION) return;
		}
		editor.clear();
		filename=null;
		if (frameParent!=null && saver==null) frameParent.setTitle("SketchEl");
		editor.notifySaved();
	}
	private void fileNewWindow()
	{
		MainWindow mw=new MainWindow(null,false);
		mw.setVisible(true);
	}

	// private void fileNewDataSheet()
	// {
	// DataWindow dw=new DataWindow(null);
	// dw.setVisible(true);
	// }
//	private void fileOpen()
//	{
//		JFileChooser chooser=new JFileChooser(System.getenv().get("PWD"));
//		chooser.setCurrentDirectory(new File(curDir));
//		chooser.setDragEnabled(false);
//		chooser.setFileSelectionMode(JFileChooser.FILES_ONLY);
//		chooser.setFileFilter(new FileExtFilter("Molecular Structures",".el;.ds;.mol;.sdf;.xml;.svg;.odg;.cml"));
//		FileMolPreview prev=new FileMolPreview(chooser,true);
//		chooser.setAccessory(prev);
//		if (chooser.showOpenDialog(frameParent)!=JFileChooser.APPROVE_OPTION) return;
//		curDir=chooser.getCurrentDirectory().getAbsolutePath();
//		
//		String newfn=chooser.getSelectedFile().getPath();
//		if (!new File(newfn).exists())
//		{
//			JOptionPane.showMessageDialog(null,
//				new File(newfn).getAbsolutePath(),
//				"File Not Found",JOptionPane.ERROR_MESSAGE);
//			return;
//		}
//		
//		openFile(newfn,prev.getFormatType());
//	}
//	
//	private void openFile(String newfn,int formatType)
//	{
//		boolean fresh=editor.isEmpty();
//		if (!newfn.endsWith(".el") && !newfn.endsWith(".mol")) fresh=false; // don't make it easy to overwrite original
//		boolean anything=editor.molData().numAtoms()>0;
//		try
//		{
//			File file=new File(newfn);
//			if (formatType==FileTypeGuess.TYPE_UNKNOWN)
//			{
//				FileTypeGuess ft=new FileTypeGuess(file);
//				ft.guess();
//				formatType=ft.getType();
//			}
//			
//			if (formatType==FileTypeGuess.TYPE_DATASHEET || formatType==FileTypeGuess.TYPE_MDLSDF || 
//				formatType==FileTypeGuess.TYPE_ODFDS)
//			{
//				DataWindow dw=new DataWindow(newfn);
//				dw.setVisible(true);
//				return;
//			}
//			
//			//Util.writeln("cat="+ft.getCategory()+" type="+ft.getType());
//			
//			Molecule frag=null;
//			InputStream istr=null;
//			
//			if (formatType==FileTypeGuess.TYPE_SKETCHEL) frag=MoleculeReader.readNative(file);
//			else if (formatType==FileTypeGuess.TYPE_MDLMOL) frag=MoleculeReader.readUnknown(file);
//			else if (formatType==FileTypeGuess.TYPE_CML) frag=MoleculeReader.readCML(file);
//			else if (formatType==FileTypeGuess.TYPE_SVGMOL) frag=MoleculeReader.readSVG(file);
//			else if (formatType==FileTypeGuess.TYPE_ODGMOL) frag=MoleculeReader.readODG(file);
//			else JOptionPane.showMessageDialog(null,"Unable to determine format.","Open Failed",JOptionPane.ERROR_MESSAGE);
//			
//			if (istr!=null) istr.close();
//			
//			if (frag!=null)
//			{
//				editor.addArbitraryFragment(frag);
//				if (fresh) setFilename(newfn);
//				if (!anything) editor.notifySaved();
//			}
//		}
//		catch (IOException e) 
//		{
//			JOptionPane.showMessageDialog(null,e.toString(),"Open Failed",JOptionPane.ERROR_MESSAGE);
//			//e.printStackTrace();
//			return;
//		}
//	}
//	
//	private void fileSave()
//	{
//		if (filename==null && saver==null) {fileSaveAs(); return;}
//		saveCurrent();
//	}
//	
//	private void fileSaveAs()
//	{
//		JFileChooser chooser=new JFileChooser(System.getenv().get("PWD"));
//		chooser.setCurrentDirectory(new File(curDir));
//		chooser.setDragEnabled(false);
//		chooser.setFileSelectionMode(JFileChooser.FILES_ONLY);
//		chooser.setFileFilter(new FileExtFilter("SketchEl Files",".el"));
//		chooser.setAccessory(new FileMolPreview(chooser,false));
//		if (chooser.showSaveDialog(frameParent)!=JFileChooser.APPROVE_OPTION) return;
//		curDir=chooser.getCurrentDirectory().getAbsolutePath();
//	
//		String fn=chooser.getSelectedFile().getPath();
//		if (chooser.getSelectedFile().getName().indexOf('.')<0) fn=fn+".el";
//	
//		File newf=new File(fn);
//		if (newf.exists())
//		{
//			if (JOptionPane.showConfirmDialog(null,
//				"Overwrite existing file ["+newf.getName()+"]?","Save As",
//				JOptionPane.YES_NO_OPTION)!=JOptionPane.YES_OPTION) return;
//		}		
//	
//		setFilename(fn);
//		saveCurrent(true);
//	}
//	
//	private void fileExportMDLMOL()
//	{
//		JFileChooser chooser=new JFileChooser(System.getenv().get("PWD"));
//		chooser.setDialogTitle("Export as MDL MOL");
//		chooser.setCurrentDirectory(new File(curDir));
//		chooser.setDragEnabled(false);
//		chooser.setFileSelectionMode(JFileChooser.FILES_ONLY);
//		chooser.setFileFilter(new FileExtFilter("MDL MOL Files",".mol"));
//		chooser.setAccessory(new FileMolPreview(chooser,false));
//		if (chooser.showSaveDialog(frameParent)!=JFileChooser.APPROVE_OPTION) return;
//
//		String fn=chooser.getSelectedFile().getPath();
//		if (chooser.getSelectedFile().getName().indexOf('.')<0) fn=fn+".mol";
//
//		File newf=new File(fn);
//		if (newf.exists())
//		{
//			if (JOptionPane.showConfirmDialog(null,
//				"Overwrite existing file ["+newf.getName()+"]?","Export MDL MOL",
//				JOptionPane.YES_NO_OPTION)!=JOptionPane.YES_OPTION) return;
//		}		
//
//		try
//		{
//			FileOutputStream ostr=new FileOutputStream(fn);
//			MoleculeWriter.writeMDLMOL(ostr,editor.molData());
//			ostr.close();
//		}
//		catch (IOException e)
//		{
//			JOptionPane.showMessageDialog(null,e.toString(),"Export Failed",JOptionPane.ERROR_MESSAGE);
//		}
//	}
//	
//	private void fileExportSVG(boolean odgInstead)
//	{
//		// NOTE: this response method handles SVG & ODG, since they are so similar
//	
//		JFileChooser chooser=new JFileChooser(System.getenv().get("PWD"));
//		chooser.setCurrentDirectory(new File(curDir));
//		chooser.setDragEnabled(false);
//		chooser.setFileSelectionMode(JFileChooser.FILES_ONLY);
//		if (!odgInstead) 
//		{
//			chooser.setDialogTitle("Export as SVG");
//			chooser.setFileFilter(new FileExtFilter("SVG Files",".svg"));
//		}
//		else 
//		{
//			chooser.setDialogTitle("Export as OpenDocument Graphics");
//			chooser.setFileFilter(new FileExtFilter("ODG Files",".odg"));
//		}
//		chooser.setAccessory(new FileMolPreview(chooser,false));
//		if (chooser.showSaveDialog(frameParent)!=JFileChooser.APPROVE_OPTION) return;
//
//		String fn=chooser.getSelectedFile().getPath();
//		if (chooser.getSelectedFile().getName().indexOf('.')<0) fn=fn+(odgInstead ? ".odg" : ".svg");
//
//		File newf=new File(fn);
//		if (newf.exists())
//		{
//			if (JOptionPane.showConfirmDialog(null,
//				"Overwrite existing file ["+newf.getName()+"]?","Export "+(odgInstead ? "ODG" : "SVG"),
//				JOptionPane.YES_NO_OPTION)!=JOptionPane.YES_OPTION) return;
//		}		
//
//		try
//		{
//			FileOutputStream ostr=new FileOutputStream(fn);
//			renderCurrentSVG(ostr,odgInstead);
//			ostr.close();
//		}
//		catch (IOException e)
//		{
//			JOptionPane.showMessageDialog(null,e.toString(),"Export Failed",JOptionPane.ERROR_MESSAGE);
//		}
//	}
//	
//	private void renderCurrentSVG(OutputStream ostr,boolean odgInstead) throws IOException
//	{
//		/* !! crusty
//		SVGMolecule svgmol=new SVGMolecule(editor.molData());
//		svgmol.setEmbeddedFont(false); // always default to false, until renderers get better
//		if (odgInstead) svgmol.useODGInstead(true);
//		svgmol.setRenderPolicy(editor.renderPolicy()); // use same-as-onscreen
//		svgmol.draw();
//		svgmol.build(ostr);*/
//		
//		VectorGfxBuilder vg;
//		if (!odgInstead) vg=new SVGBuilder(); else vg=new ODGComposer();
//		VectorGfxMolecule vgmol=new VectorGfxMolecule(editor.molData(),editor.renderPolicy(),vg);
//		vgmol.draw();
//		vg.build(ostr);
//	}
//	
//	private void fileExportPNG()
//	{
//		new DialogRaster(frameParent,molData().clone(),cfg,curDir).exec();
//	}
//	
//	private void fileExportCMLXML()
//	{
//		JFileChooser chooser=new JFileChooser(System.getenv().get("PWD"));
//		chooser.setDialogTitle("Export as CML XML");
//		chooser.setCurrentDirectory(new File(curDir));
//		chooser.setDragEnabled(false);
//		chooser.setFileSelectionMode(JFileChooser.FILES_ONLY);
//		chooser.setFileFilter(new FileExtFilter("XML Files",".cml"));
//		chooser.setAccessory(new FileMolPreview(chooser,false));
//		if (chooser.showSaveDialog(frameParent)!=JFileChooser.APPROVE_OPTION) return;
//
//		String fn=chooser.getSelectedFile().getPath();
//		if (chooser.getSelectedFile().getName().indexOf('.')<0) fn=fn+".cml";
//
//		File newf=new File(fn);
//		if (newf.exists())
//		{
//			if (JOptionPane.showConfirmDialog(null,
//				"Overwrite existing file ["+newf.getName()+"]?","Export CML XML",
//				JOptionPane.YES_NO_OPTION)!=JOptionPane.YES_OPTION) return;
//		}		
//
//		try
//		{
//			FileOutputStream ostr=new FileOutputStream(fn);
//			MoleculeWriter.writeCMLXML(ostr,editor.molData());
//			ostr.close();
//		}
//		catch (IOException e)
//		{
//			JOptionPane.showMessageDialog(null,e.toString(),"Export Failed",JOptionPane.ERROR_MESSAGE);
//		}
//	}

	private void setFilename(String fn)
	{
		if (fn.length()==0) {filename=null; return;}
		filename=fn;
		
		if (!streamMode)
		{
		   String chopfn=fn;
		   int i=chopfn.lastIndexOf("/");
		   if (i>=0) chopfn=chopfn.substring(i+1);
		   if (frameParent!=null && saver==null) frameParent.setTitle(chopfn+" - SketchEl");
		} 
		else {if (frameParent!=null && saver==null) frameParent.setTitle("SketchEl");}
	}
	
//	private void saveCurrent() {saveCurrent(false);}
//	private void saveCurrent(boolean force)
//	{
//		if (saver!=null && !force)
//		{
//			saver.saveMolecule(editor.getMolecule());
//			editor.notifySaved();
//			return;
//		}
//	
//		try
//		{
//			int fmt=FileTypeGuess.TYPE_SKETCHEL;
//			
//			if (filename.toLowerCase().endsWith(".mol")) 
//			{
//				String msg="The filename to save ends with '.mol', which is the\n"+
//						   "conventional suffix for MDL MOL-files. Exporting to\n"+
//						   "this format may cause some information loss. Do you wish\n"+
//						   "to save in MDL MOL-file format?";
//				if (JOptionPane.showConfirmDialog(null,msg,"Format",JOptionPane.YES_NO_OPTION)==JOptionPane.YES_OPTION)
//					fmt=FileTypeGuess.TYPE_MDLMOL;
//			}
//			else if (filename.toLowerCase().endsWith(".cml"))
//			{
//				String msg="The filename to save ends with '.cml', which is the\n"+
//						   "conventional suffix for the Chemical Markup Language\n"+
//						   "dialect of XML. Do you wish to save as CML XML?";
//				if (JOptionPane.showConfirmDialog(null,msg,"Format",JOptionPane.YES_NO_OPTION)==JOptionPane.YES_OPTION)
//					fmt=FileTypeGuess.TYPE_CML;
//			}
//			else if (filename.toLowerCase().endsWith(".svg"))
//			{
//				String msg="The filename to save ends with '.svg', which is the\n"+
//						   "conventional suffix for Scalable Vector Graphics.\n"+
//						   "Do you wish to save as an SVG file, with embedded\n"+
//						   "molecule content?";
//				if (JOptionPane.showConfirmDialog(null,msg,"Format",JOptionPane.YES_NO_OPTION)==JOptionPane.YES_OPTION)
//					fmt=FileTypeGuess.TYPE_SVGMOL;
//			}
//			else if (filename.toLowerCase().endsWith(".odg"))
//			{
//				String msg="The filename to save ends with '.odg', which is the\n"+
//						   "conventional suffix for OpenDocument Graphics.\n"+
//						   "Do you wish to save as an ODG file, with embedded\n"+
//						   "molecule content?";
//				if (JOptionPane.showConfirmDialog(null,msg,"Format",JOptionPane.YES_NO_OPTION)==JOptionPane.YES_OPTION)
//					fmt=FileTypeGuess.TYPE_ODGMOL;
//			}
//			
//			FileOutputStream ostr=new FileOutputStream(filename);
//			if (fmt==FileTypeGuess.TYPE_SKETCHEL) MoleculeWriter.writeNative(ostr,editor.molData());
//			else if (fmt==FileTypeGuess.TYPE_MDLMOL) MoleculeWriter.writeMDLMOL(ostr,editor.molData());
//			else if (fmt==FileTypeGuess.TYPE_CML) MoleculeWriter.writeCMLXML(ostr,editor.molData());
//			else if (fmt==FileTypeGuess.TYPE_SVGMOL) renderCurrentSVG(ostr,false);
//			else if (fmt==FileTypeGuess.TYPE_ODGMOL) renderCurrentSVG(ostr,true);
//			ostr.close();
//			editor.notifySaved();			
//		}
//		catch (IOException e)
//		{
//			JOptionPane.showMessageDialog(null,e.toString(),"Save Failed",JOptionPane.ERROR_MESSAGE);
//		}
//	}
	
//	private void readStream()
//	{
//		try
//		{
//			Molecule frag=MoleculeReader.readUnknown(System.in);
//			editor.addArbitraryFragment(frag);
//		}
//		catch (IOException e) 
//		{
//			JOptionPane.showMessageDialog(null,e.toString(),"<stdin> Read Failed",JOptionPane.ERROR_MESSAGE);
//			return;
//		}
//	}
//	private void writeStream()
//	{
//		Molecule mol=editor.molData();
//		try
//		{
//			MoleculeWriter.writeMDLMOL(System.out,mol);
//			MoleculeWriter.writeNative(System.out,mol);
//		}
//		catch (IOException e) 
//		{
//			JOptionPane.showMessageDialog(null,e.toString(),"<stdout> Write Failed",JOptionPane.ERROR_MESSAGE);
//		}
//	}
	
	private void testMol()
	{
		Molecule mol=new Molecule();
		
		mol.addAtom("N",0,0);
		mol.addAtom("C",1.2,0);
		mol.addAtom("O",2,0.8);
		mol.addAtom("H",3,-0.8);
		mol.addAtom("H",4,0);
		mol.addBond(1,2,1);
		mol.addBond(2,3,2);
		mol.addBond(3,4,1);
		mol.addBond(4,5,0);
		
		editor.replace(mol);
	} 
	
//	private void editCut()
//	{
//		Molecule frag=editor.selectedSubgraph();
//		if (useLocalClipboard)
//		{
//			appletClipboard=frag;
//			editor.deleteSelected();
//			return;
//		}
//			
//		Toolkit toolkit=Toolkit.getDefaultToolkit();
//		toolkit.getSystemClipboard().setContents(new ClipboardMolecule(frag,editor.renderPolicy()),null);
//	
//		editor.deleteSelected();
//	}
//	
//	private void editCopy()
//	{
//		Molecule frag=editor.selectedSubgraph();
//		if (useLocalClipboard)
//		{
//			appletClipboard=frag;
//			return;
//		}
//		
//		Toolkit toolkit=Toolkit.getDefaultToolkit();
//		toolkit.getSystemClipboard().setContents(new ClipboardMolecule(frag,editor.renderPolicy()),null);
//	}
//    private void editCopySk()
//    {
//		Molecule frag=editor.selectedSubgraph();
//		StringWriter sw=new StringWriter();
//		BufferedWriter bw=new BufferedWriter(sw);
//		try {MoleculeWriter.writeNative(bw,frag);} catch (IOException ex) {}
//		Clipboard clip=Toolkit.getDefaultToolkit().getSystemClipboard();
//		clip.setContents(new StringSelection(sw.toString()),this);
//    }
//    private void editCopyMOL()
//    {
//		Molecule frag=editor.selectedSubgraph();
//		StringWriter sw=new StringWriter();
//		BufferedWriter bw=new BufferedWriter(sw);
//		try {MoleculeWriter.writeMDLMOL(bw,frag);} catch (IOException ex) {}
//		Clipboard clip=Toolkit.getDefaultToolkit().getSystemClipboard();
//		clip.setContents(new StringSelection(sw.toString()),this);
//    }
//    private void editCopyJSON()
//    {
//		Molecule frag=editor.selectedSubgraph();
//		StringWriter sw=new StringWriter();
//		BufferedWriter bw=new BufferedWriter(sw);
//		try {MoleculeWriter.writeNative(bw,frag);} catch (IOException ex) {}
//		Clipboard clip=Toolkit.getDefaultToolkit().getSystemClipboard();
//		String str='"'+sw.toString().replace("\n","\\n")+'"';
//		clip.setContents(new StringSelection(str),this);
//    }
//
//	private void editCopySVG()
//	{
//		ByteArrayOutputStream ostr=new ByteArrayOutputStream();
//		
//		VectorGfxBuilder vg=new SVGBuilder();
//		VectorGfxMolecule vgmol=new VectorGfxMolecule(editor.molData(),editor.renderPolicy(),vg);
//		vgmol.draw();
//		try
//		{
//			vg.build(ostr);
//		}
//		catch (IOException ex)
//		{
//			JOptionPane.showMessageDialog(null,ex.toString(),"SVG Generation Failed",JOptionPane.ERROR_MESSAGE);
//			return;
//		}
//		Clipboard clip=Toolkit.getDefaultToolkit().getSystemClipboard();
//		clip.setContents(new StringSelection(ostr.toString()),this);
//	}
//	
//	private void editPaste()
//	{
//		if (useLocalClipboard)
//		{
//			if (appletClipboard!=null) editor.addArbitraryFragment(appletClipboard);
//			return;
//		}
//		
//		Molecule frag=ClipboardMolecule.extract();
//		if (frag==null)
//		{
//			JOptionPane.showMessageDialog(null,"No molecule data available.","Clipboard Read Failed",JOptionPane.ERROR_MESSAGE);
//			return;
//		}
//		editor.addArbitraryFragment(frag);
//	}
//
	private void selectElement(String El)
	{
		if (lastElement!=null) 
		{
			if (lastElement.compareTo(El)==0) return;
			//toolIcons[TOOL_SETATOM]=new ImageIcon(getClass().getResource("/images/"+IMAGE_TOOL[TOOL_SETATOM]+".png"));
			toolIcons[TOOL_SETATOM]=loadIcon(IMAGE_TOOL[TOOL_SETATOM]+".png");
		}

		int w=toolIcons[TOOL_SETATOM].getImage().getWidth(null),h=toolIcons[TOOL_SETATOM].getImage().getHeight(null);
		BufferedImage img=new BufferedImage(w,h,BufferedImage.TYPE_INT_ARGB);
		Graphics2D g=(Graphics2D)img.getGraphics();
		g.setRenderingHint(RenderingHints.KEY_ANTIALIASING,RenderingHints.VALUE_ANTIALIAS_ON);
		g.setColor(new Color(0x00000000,true));
		g.fillRect(0,0,w,h);
		g.drawImage(toolIcons[TOOL_SETATOM].getImage(),0,0,null);
		
		Font font=new Font(Font.SANS_SERIF,Font.PLAIN,El.length()==1 ? 20 : 13);
		g.setFont(font);
		FontMetrics metrics=g.getFontMetrics();
		g.setColor(new Color(0,192,0));
		g.drawString(El,(w-metrics.stringWidth(El))/2-3,(h+metrics.getAscent())/2-2);
		
		toolButtons[TOOL_SETATOM].setIcon(new ImageIcon(img));
		
		lastElement=El;
	}
	
	private void templateTool()
	{
		if (lastTemplate==null) {templateSelect(); return;}
		editor.setToolTemplate(lastTemplate,templateIdx);
	}
	
	private void templateSelect()
	{
		int heightFudge=appletMode ? 30 : 0; // !! unpleasant hack which stands in for being a non-signed applet; correct at some point
		TemplateSelector sel=new TemplateSelector(templ,this,heightFudge);
		Point pos=toolButtons[TOOL_TEMPLATE].getLocationOnScreen();

		Dimension ssz=Toolkit.getDefaultToolkit().getScreenSize();
		GraphicsEnvironment ge=GraphicsEnvironment.getLocalGraphicsEnvironment();
		GraphicsConfiguration gc=ge.getScreenDevices()[0].getConfigurations()[0];
		ssz.width-=Toolkit.getDefaultToolkit().getScreenInsets(gc).right;
		ssz.height-=Toolkit.getDefaultToolkit().getScreenInsets(gc).bottom;
				
		if (pos.x+sel.getWidth()>ssz.width) pos.x=ssz.width-sel.getWidth();
		if (pos.y+sel.getHeight()>ssz.height) pos.y=ssz.height-sel.getHeight();
		sel.setLocation(pos);
		sel.setVisible(true);
	}
	
	private void templateAddTo()
	{
		templ.addTemplate(editor.selectedSubgraph());
	}
	
	// brings up an edit dialog; if idx==0, then the selected atoms/bonds are edited; if idx>0, just that atom is edited; if
	// idx<0, the atoms of bond |idx| are edited
	private void editDialog(int idx)
	{
		ArrayList<Integer> atomlist=idx==0 ? editor.selectedListSet() : new ArrayList<Integer>();
		if (idx>0) atomlist.add(Integer.valueOf(idx));
		else if (idx<0)
		{
			atomlist.add(Integer.valueOf(editor.molData().bondFrom(-idx)));
			atomlist.add(Integer.valueOf(editor.molData().bondTo(-idx)));
		}
	
		Molecule newMol=(new DialogEdit(frameParent,editor.molData(),atomlist)).exec();
		if (newMol!=null) 
		{
			editor.cacheUndo();
			editor.replace(newMol,false);
		}
	}
	
	// bring up query editor
	private void editQueryDialog()
	{
		ArrayList<Integer> sel=editor.selectedListSet();
		Molecule mol=editor.molData();
		int aidx=0,bidx=0;
		if (sel.size()==1) aidx=sel.get(0);
		else if (sel.size()==2) bidx=mol.findBond(sel.get(0),sel.get(1));
		
		if (aidx==0 && bidx==0)
		{
			JOptionPane.showMessageDialog(null,"Must select an atom or a bond.","Edit Query Properties",JOptionPane.ERROR_MESSAGE);
			return;
		}

		Molecule newMol=new DialogQuery(frameParent,mol,aidx,bidx).exec();
		if (newMol!=null)
		{
			editor.cacheUndo();
			editor.replace(newMol,false);
		}
	}

	// turn the current selection into an "abbreviation"
	private void editSubsumeAbbreviate()
	{
		try
		{
			Molecule mol=ToolChest.subsumeAbbreviation(editor.molData(),editor.selectedMask());
			editor.setMolecule(mol);
		}
		catch (MoleculeIOException ex) {JOptionPane.showMessageDialog(null,ex.getMessage(),"Abbreviate",JOptionPane.ERROR_MESSAGE);}
	}

	// turn the current selection into a query subfragment clause for its neighbour	
	private void editSubsumeSubFrag(boolean not)
	{
		try
		{
			Molecule mol=ToolChest.subsumeSubFragment(editor.molData(),editor.selectedMask(),not);
			editor.setMolecule(mol);
		}
		catch (MoleculeIOException ex) {JOptionPane.showMessageDialog(null,ex.getMessage(),"Subfragment",JOptionPane.ERROR_MESSAGE);}
	}
	
	public static void helpAbout()
	{
		String msg="SketchEl v"+VERSION+"\n"+
				   "Molecule drawing tool\n"+
				   "\u00A9 2005-2015 Dr. Alex M. Clark\n"+
				   "Released under the Gnu Public\n"+
				   "License (GPL), see www.gnu.org\n"+
				   "Home page and documentation:\n"+
				   "http://sketchel.sf.net\n";
		JOptionPane.showMessageDialog(null,msg,"About SketchEl",JOptionPane.INFORMATION_MESSAGE,mainLogo);
	}
	
	private void helpConfig()
	{
		cfg.refresh();
		ConfigData newCfg=new ConfigData(cfg);
		if (!new DialogConfig(frameParent,newCfg).exec()) return;
		cfg=newCfg;
		try 
		{
			cfg.saveFile();
			reviewMenuState();
		}
		catch (IOException ex)
		{
			ex.printStackTrace();
			JOptionPane.showMessageDialog(null,
				"Unable to save configuration file:\n  "+cfg.fullFN(),
				"Config Unwritable",JOptionPane.ERROR_MESSAGE);
		}
	}
	
	// ------------------ event functions --------------------

	public void actionPerformed(ActionEvent e)
	{
		Object src=e.getSource();
		String cmd=e.getActionCommand();
		int setsel=-1;
		
		for (int n=0;n<miRenderPolicy.getItemCount();n++) if (miRenderPolicy.getItem(n)==src)
		{
			editor.setRenderPolicy(cfg.getPolicy(n).clone());
			return;
		}
		
		if (appletMode) // translate appletmode hotkey surrogates
		{
			if (cmd.equals(IMAGE_TOOL[TOOL_CURSOR])) src=toolButtons[TOOL_CURSOR];
			else if (cmd.equals(IMAGE_TOOL[TOOL_PAN])) src=toolButtons[TOOL_PAN];
			else if (cmd.equals(IMAGE_TOOL[TOOL_ROTATOR])) src=toolButtons[TOOL_ROTATOR];
			else if (cmd.equals(IMAGE_TOOL[TOOL_ERASOR])) src=toolButtons[TOOL_ERASOR];
			else if (cmd.equals(IMAGE_TOOL[TOOL_EDIT])) src=toolButtons[TOOL_EDIT];
			else if (cmd.equals(IMAGE_TOOL[TOOL_SINGLE])) src=toolButtons[TOOL_SINGLE];
			else if (cmd.equals(IMAGE_TOOL[TOOL_DOUBLE])) src=toolButtons[TOOL_DOUBLE];
			else if (cmd.equals(IMAGE_TOOL[TOOL_TRIPLE])) src=toolButtons[TOOL_TRIPLE];
			else if (cmd.equals(IMAGE_TOOL[TOOL_ZERO])) src=toolButtons[TOOL_ZERO];
			else if (cmd.equals(IMAGE_TOOL[TOOL_CHARGE])) src=toolButtons[TOOL_CHARGE];
			else if (cmd.equals(IMAGE_TOOL[TOOL_TEMPLATE])) src=toolButtons[TOOL_TEMPLATE];
		}
		
		if (src==rmbEditAtom) editDialog(rightPopupAtom);
		else if (src==rmbDeleteAtom) editor.deleteAtom(rightPopupAtom);
		else if (src==rmbSelectAtom) editor.selectAtom(rightPopupAtom);
		else if (src==rmbSelectGroup) editor.selectGroup(rightPopupAtom);
		else if (src==rmbSelectAll) editor.selectAll();
		else if (src==rmbClearSelection) editor.clearSelection();
		else if (src==rmbSetExplH) editor.hydrogenSetExplicit(true,rightPopupAtom);
		else if (src==rmbClearExplH) editor.hydrogenSetExplicit(false,rightPopupAtom);
		else if (src==rmbZeroExplH) editor.hydrogenSetExplicit(false,rightPopupAtom,0);
		else if (src==rmbCreateActualH) editor.hydrogenCreateActual(rightPopupAtom);
		else if (src==rmbDeleteActualH) editor.hydrogenDeleteActual(rightPopupAtom);
		else if (src==rmbInvertChiral) editor.setStereo(Molecule.STEREO_UNKNOWN,rightPopupAtom);
		else if (src==rmbSetR) editor.setStereo(Molecule.STEREO_POS,rightPopupAtom);
		else if (src==rmbSetS) editor.setStereo(Molecule.STEREO_NEG,rightPopupAtom);
		else if (src==rmbCycleWedges) editor.cycleChiralWedges(rightPopupAtom);
		else if (src==rmbRemoveWedges) editor.removeChiralWedges(rightPopupAtom);
		else if (src==rmbEditBond) editDialog(-rightPopupBond);
		else if (src==rmbDeleteBond) editor.deleteBond(rightPopupBond);
		else if (src==rmbInvertGeom) editor.setStereo(Molecule.STEREO_UNKNOWN,-rightPopupBond);
		else if (src==rmbSetZ) editor.setStereo(Molecule.STEREO_POS,-rightPopupBond);
		else if (src==rmbSetE) editor.setStereo(Molecule.STEREO_NEG,-rightPopupBond);
		else if (src==rmbFlipHoriz) editor.flipGroupAboutAtom(false,rightPopupAtom);
		else if (src==rmbFlipVert) editor.flipGroupAboutAtom(true,rightPopupAtom);
		else if (src==rmbFlipBond) editor.flipGroupAboutBond(rightPopupBond);
		else if (src==rmbRotateP30) editor.rotateGroupAboutCentre(30,rightPopupAtom>0 ? rightPopupAtom : -rightPopupBond);
		else if (src==rmbRotateN30) editor.rotateGroupAboutCentre(-30,rightPopupAtom>0 ? rightPopupAtom : -rightPopupBond);
		else if (src==rmbRotateP45) editor.rotateGroupAboutCentre(45,rightPopupAtom>0 ? rightPopupAtom : -rightPopupBond);
		else if (src==rmbRotateN45) editor.rotateGroupAboutCentre(-45,rightPopupAtom>0 ? rightPopupAtom : -rightPopupBond);
		else if (src==rmbRotateP90) editor.rotateGroupAboutCentre(90,rightPopupAtom>0 ? rightPopupAtom : -rightPopupBond);
		else if (src==rmbRotateN90) editor.rotateGroupAboutCentre(-90,rightPopupAtom>0 ? rightPopupAtom : -rightPopupBond);
		else if (src==miFileQuit) fileQuit();
		else if (src==miFileNew) fileNew();
		else if (src==miFileNewWindow) fileNewWindow();
//		else if (src==miFileNewDataSheet) fileNewDataSheet();
//		else if (src==miFileOpen) fileOpen();
//		else if (src==miFileSave) fileSave();
//		else if (src==miFileSaveAs) fileSaveAs();
//		else if (src==miFileShare) new ShareWindow(editor.molData()).setVisible(true);
//		else if (src==miExportMDLMOL) fileExportMDLMOL();
//		else if (src==miExportCMLXML) fileExportCMLXML();
//		else if (src==miExportSVG) fileExportSVG(false);
//		else if (src==miExportODG) fileExportSVG(true);
//		else if (src==miExportPNG) fileExportPNG();
		else if (src==miToolCursor || src==toolButtons[TOOL_CURSOR]) {editor.setToolCursor(); setsel=TOOL_CURSOR;}
		else if (src==miToolPan || src==toolButtons[TOOL_PAN]) {editor.setToolPan(); setsel=TOOL_PAN;}
		else if (src==miToolRotator || src==toolButtons[TOOL_ROTATOR]) {editor.setToolRotator(); setsel=TOOL_ROTATOR;}
		else if (src==miToolErasor || src==toolButtons[TOOL_ERASOR]) {editor.setToolErasor(); setsel=TOOL_ERASOR;}
		else if (src==miEditDialog || src==toolButtons[TOOL_DIALOG]) editDialog(0);
		else if (src==miSelectAll) editor.selectAll();
		else if (src==miSelectNextAtom) editor.cycleSelection(true,false);
		else if (src==miSelectPrevAtom) editor.cycleSelection(false,false);
		else if (src==miSelectNextGroup) editor.cycleSelection(true,true);
		else if (src==miSelectPrevGroup) editor.cycleSelection(false,true);
		else if (src==miToolEditAtom || src==toolButtons[TOOL_EDIT]) {editor.setToolAtom(null); setsel=TOOL_EDIT;}
		else if (src==miToolSetAtom || src==toolButtons[TOOL_SETATOM]) {editor.setToolAtom(lastElement); setsel=TOOL_SETATOM;}
		else if (src==miBondSingle || src==toolButtons[TOOL_SINGLE]) {editor.setToolBond(1,Molecule.BONDTYPE_NORMAL); setsel=TOOL_SINGLE;}
		else if (src==miBondDouble || src==toolButtons[TOOL_DOUBLE]) {editor.setToolBond(2,Molecule.BONDTYPE_NORMAL); setsel=TOOL_DOUBLE;}
		else if (src==miBondTriple || src==toolButtons[TOOL_TRIPLE]) {editor.setToolBond(3,Molecule.BONDTYPE_NORMAL); setsel=TOOL_TRIPLE;}
		else if (src==miBondZero || src==toolButtons[TOOL_ZERO]) {editor.setToolBond(0,Molecule.BONDTYPE_NORMAL); setsel=TOOL_ZERO;}
		else if (src==miBondInclined || src==toolButtons[TOOL_INCLINED]) {editor.setToolBond(1,Molecule.BONDTYPE_INCLINED); setsel=TOOL_INCLINED;}
		else if (src==miBondDeclined || src==toolButtons[TOOL_DECLINED]) {editor.setToolBond(1,Molecule.BONDTYPE_DECLINED); setsel=TOOL_DECLINED;}
		else if (src==miBondUnknown || src==toolButtons[TOOL_UNKNOWN]) {editor.setToolBond(1,Molecule.BONDTYPE_UNKNOWN); setsel=TOOL_UNKNOWN;}
		else if (src==miToolCharge || src==toolButtons[TOOL_CHARGE]) {editor.setToolCharge(1); setsel=TOOL_CHARGE;}
		else if (src==miEditUndo || src==toolButtons[TOOL_UNDO]) editor.undo();
		else if (src==miEditRedo || src==toolButtons[TOOL_REDO]) editor.redo();
//		else if (src==miEditCut) editCut();
//		else if (src==miEditCopy) editCopy();
//		//else if (src==miEditCopySVG) editCopySVG();
//		else if (src==miCopyAsSk) editCopySk();
//		else if (src==miCopyAsMol) editCopyMOL();
//		else if (src==miCopyAsJSON) editCopyJSON();
//		else if (src==miCopyAsSVG) editCopySVG();
//		else if (src==miEditPaste) editPaste();
		else if (src==miFlipHoriz) editor.flipSelectedAtoms(false);
		else if (src==miFlipVert) editor.flipSelectedAtoms(true);
		else if (src==miRotateP30) editor.rotateSelectedAtoms(30);
		else if (src==miRotateN30) editor.rotateSelectedAtoms(-30);
		else if (src==miRotateP45) editor.rotateSelectedAtoms(45);
		else if (src==miRotateN45) editor.rotateSelectedAtoms(-45);
		else if (src==miRotateP90) editor.rotateSelectedAtoms(90);
		else if (src==miRotateN90) editor.rotateSelectedAtoms(-90);
		else if (src==miTemplateAdd) templateAddTo();
		else if (src==miEditNormalise) editor.normaliseBondLengths();
		else if (src==miQueryDialog) editQueryDialog();
		else if (src==miSubsumeAbbreviate) editSubsumeAbbreviate();
		else if (src==miSubsumeSubFrag || src==miSubsumeSubFragNot) editSubsumeSubFrag(src==miSubsumeSubFragNot);
		else if (src==miTemplateTool || src==toolButtons[TOOL_TEMPLATE]) {templateTool(); setsel=TOOL_TEMPLATE;}
		else if (src==miTemplateSelect) {templateSelect(); setsel=TOOL_TEMPLATE;}
		else if (src==miZoomFull) editor.zoomFull();
		else if (src==miZoomIn) editor.zoomIn(1.5);
		else if (src==miZoomOut) editor.zoomOut(1.5);
		else if (src==miPanLeft) editor.panDisplay(-50,0);
		else if (src==miPanRight) editor.panDisplay(50,0);
		else if (src==miPanUp) editor.panDisplay(0,-50);
		else if (src==miPanDown) editor.panDisplay(0,50);
		else if (src==miShowElements) editor.setShowMode(ArrangeMolecule.SHOW_ELEMENTS);
		else if (src==miShowAllElem) editor.setShowMode(ArrangeMolecule.SHOW_ALL_ELEMENTS);
		else if (src==miShowIndices) editor.setShowMode(ArrangeMolecule.SHOW_INDEXES);
		else if (src==miShowRingID) editor.setShowMode(ArrangeMolecule.SHOW_RINGID);
		else if (src==miShowCIPPrio) editor.setShowMode(ArrangeMolecule.SHOW_PRIORITY);
		else if (src==miShowMapNum) editor.setShowMode(ArrangeMolecule.SHOW_MAPNUM);
		else if (src==miShowExtra) editor.setShowExtra(miShowExtra.isSelected());
		else if (src==miShowHydrogen) editor.setShowHydrogens(miShowHydrogen.isSelected());
		else if (src==miHydSetExpl)  editor.hydrogenSetExplicit(true,0);
		else if (src==miHydClearExpl) editor.hydrogenSetExplicit(false,0);
		else if (src==miHydZeroExpl) editor.hydrogenSetExplicit(false,0,0);
		else if (src==miHydCreate) editor.hydrogenCreateActual(0);
		else if (src==miHydDelete) editor.hydrogenDeleteActual(0);
		else if (src==miShowStereo) editor.setShowStereoLabels(miShowStereo.isSelected());
		else if (src==miStereoInvert) editor.setStereo(Molecule.STEREO_UNKNOWN,0);
		else if (src==miStereoSetRZ) editor.setStereo(Molecule.STEREO_POS,0);
		else if (src==miStereoSetSE) editor.setStereo(Molecule.STEREO_NEG,0);
		else if (src==miStereoCycle) editor.cycleChiralWedges(0);
		else if (src==miStereoRemove) editor.removeChiralWedges(0);
		else if (src==miHelpAbout) helpAbout();
		else if (src==miHelpConfig) helpConfig();
		else if (cmd.length()<=2) {selectElement(cmd); editor.setToolAtom(lastElement);}
		else JOptionPane.showMessageDialog(null,cmd,"Unhandled Command",JOptionPane.ERROR_MESSAGE);
		
		if (setsel!=-1) toolGroup.setSelected(toolButtons[setsel].getModel(),true);
	} 
	
	public void mouseClicked(MouseEvent e) {}
	public void mouseEntered(MouseEvent e) {}
	public void mouseExited(MouseEvent e) {}
	public void mousePressed(MouseEvent e) 
	{
		if (e.getSource()==toolButtons[TOOL_SETATOM] && e.getButton()==MouseEvent.BUTTON3)
		{
			toolButtons[TOOL_SETATOM].setSelected(true);
			JPopupMenu popup=new JPopupMenu();
			popup.add(Util.menuItem(this,"C",0));
			popup.add(Util.menuItem(this,"N",0));
			popup.add(Util.menuItem(this,"O",0));
			popup.add(Util.menuItem(this,"H",0));
			popup.add(Util.menuItem(this,"F",0));
			popup.add(Util.menuItem(this,"Cl",0));
			popup.add(Util.menuItem(this,"Br",0));
			popup.add(Util.menuItem(this,"I",0));
			popup.add(Util.menuItem(this,"S",0));
			popup.add(Util.menuItem(this,"P",0));
			popup.show(toolButtons[TOOL_SETATOM],0,0);
		}
		if (e.getSource()==toolButtons[TOOL_TEMPLATE] && e.getButton()==MouseEvent.BUTTON3) 
		{
			toolGroup.setSelected(toolButtons[TOOL_TEMPLATE].getModel(),true);
			templateSelect();
		}
	}
	public void mouseReleased(MouseEvent e) {}
	public void keyPressed(KeyEvent e) 
	{
		// keyboard arrow-nudges
		if (!e.isAltDown() && !e.isShiftDown() && !e.isControlDown() && !e.isMetaDown())
		{
			if (e.getKeyCode()==KeyEvent.VK_UP) {editor.nudgeSelectedAtoms(0,0.05); return;}
			if (e.getKeyCode()==KeyEvent.VK_DOWN) {editor.nudgeSelectedAtoms(0,-0.05); return;}
			if (e.getKeyCode()==KeyEvent.VK_LEFT) {editor.nudgeSelectedAtoms(-0.05,0); return;}
			if (e.getKeyCode()==KeyEvent.VK_RIGHT) {editor.nudgeSelectedAtoms(0.05,0); return;}
		}
		else if (!e.isAltDown() && e.isShiftDown() && !e.isControlDown() && !e.isMetaDown())
		{
			if (e.getKeyCode()==KeyEvent.VK_UP) {editor.nudgeSelectedAtoms(0,0.5); return;}
			if (e.getKeyCode()==KeyEvent.VK_DOWN) {editor.nudgeSelectedAtoms(0,-0.5); return;}
			if (e.getKeyCode()==KeyEvent.VK_LEFT) {editor.nudgeSelectedAtoms(-0.5,0); return;}
			if (e.getKeyCode()==KeyEvent.VK_RIGHT) {editor.nudgeSelectedAtoms(0.5,0); return;}
		}
	}
	public void keyReleased(KeyEvent e) {}
	public void keyTyped(KeyEvent e)
	{	 
		// user typing in an element...
		char ch=e.getKeyChar();
		if (ch>='A' && ch<='Z') typedElement=""+ch;
		else if (typedElement.length()==1 && ch>='a' && ch<='z') typedElement=typedElement+ch;
		else if (typedElement.compareTo("R")==0 && ch>='0' && ch<='9') typedElement=typedElement+ch;
		else {typedElement=""; return;}

		String elset=null;
		if (typedElement.length()>=2 && typedElement.charAt(0)=='R' && typedElement.charAt(1)>='0' && typedElement.charAt(1)<='9') 
		{
			elset=typedElement;
		}
		else
		{
			for (int n=1;n<Molecule.ELEMENTS.length;n++) if (typedElement.compareTo(Molecule.ELEMENTS[n])==0) {elset=typedElement;}
		}
		if (elset!=null)
		{
			selectElement(elset); 
			toolGroup.setSelected(toolButtons[TOOL_SETATOM].getModel(),true);
			editor.setToolAtom(elset);
		}
	}
	
	public void templSelected(Molecule mol,int idx)
	{
		lastTemplate=mol;
		templateIdx=idx;
		editor.setToolTemplate(mol,idx);
	}
	public void molSelected(EditorPane source,int idx,boolean dblclick)
	{
		if (dblclick && idx!=0)
		{
			ArrayList<Integer> selidx=new ArrayList<Integer>();
			if (idx>0) selidx.add(idx);
			else {selidx.add(editor.molData().bondFrom(-idx)); selidx.add(editor.molData().bondTo(-idx));}
			Molecule newMol=(new DialogEdit(frameParent,editor.molData(),selidx)).exec();
			if (newMol!=null) editor.replace(newMol);
		}
	}
	public void rightMouseButton(EditorPane source,int x,int y,int idx)
	{
		if (source==null) // the go-away command...
		{
			if (rightPopup!=null) 
			{
				rightPopup.setVisible(false); 
				rightPopup=null;
			}
			return;
		}
		
		// create a new right-mouse menu, with content particular for atom/bond/blank area
		
		rightPopup=new JPopupMenu();
		rightPopupAtom=idx>0 ? idx : 0;
		rightPopupBond=idx<0 ? -idx : 0;
		
		if (idx>0)
		{
			rightPopup.add(rmbEditAtom);
			rightPopup.add(rmbDeleteAtom);
			rightPopup.add(rmbSelectAtom);
			rightPopup.add(rmbSelectGroup);
			
			rightPopup.addSeparator();
		
			rightPopup.add(rmbSetExplH);
			rightPopup.add(rmbClearExplH);
			rightPopup.add(rmbZeroExplH);
			rightPopup.add(rmbCreateActualH);
			rightPopup.add(rmbDeleteActualH);

			rightPopup.addSeparator();
		
			boolean isTet=editor.molData().atomChirality(idx)!=Molecule.STEREO_NONE;
			if (isTet)
			{
				rightPopup.add(rmbInvertChiral);
				rightPopup.add(rmbSetR);
				rightPopup.add(rmbSetS);
				rightPopup.add(rmbCycleWedges);
				rightPopup.add(rmbRemoveWedges);
			
				rightPopup.addSeparator();
			}
		}
		if (idx<0)
		{
			rightPopup.add(rmbEditBond);
			rightPopup.add(rmbDeleteBond);
			
			rightPopup.addSeparator();
			
			boolean isAlk=editor.molData().bondStereo(-idx)!=Molecule.STEREO_NONE;
			if (isAlk)
			{
				rightPopup.add(rmbInvertGeom);
				rightPopup.add(rmbSetZ);
				rightPopup.add(rmbSetE);
				rightPopup.addSeparator();
			}
		}
		if (idx==0)
		{
			rightPopup.add(rmbSelectAll);
			rightPopup.add(rmbClearSelection);
			
			//rightPopup.addSeparator();
		}
		
		if (idx!=0)
		{
			if (idx>0)
			{
				rightPopup.add(rmbFlipHoriz);
				rightPopup.add(rmbFlipVert);
			}
			else rightPopup.add(rmbFlipBond);
			
			rightPopup.add(rmbRotateP30);
			rightPopup.add(rmbRotateN30);
			rightPopup.add(rmbRotateP45);
			rightPopup.add(rmbRotateN45);
			rightPopup.add(rmbRotateP90);
			rightPopup.add(rmbRotateN90);
		}

		rightPopup.show(source,x-3,y-3);
	}
	public void dirtyChanged(boolean isdirty)
	{
		String str=frameParent==null ? "SketchEl" : frameParent.getTitle();
		if (str.charAt(0)=='*') str=str.substring(1);
		if (isdirty) str="*"+str;
		if (frameParent!=null && saver==null) frameParent.setTitle(str);
	}
	public void reviewMenuState()
	{
		Molecule mol=editor.molData();

		boolean anything=mol.numAtoms()>0;
		setMenuEnabled(miFileNew,anything);
		setMenuEnabled(miFileSave,anything);
		setMenuEnabled(miFileSaveAs,anything);
		setMenuEnabled(miFileShare,anything);
		setMenuEnabled(miExportMDLMOL,anything);
		setMenuEnabled(miExportCMLXML,anything);
		setMenuEnabled(miExportSVG,anything);
		setMenuEnabled(miExportODG,anything);
		setMenuEnabled(miExportPNG,anything);
		setMenuEnabled(miEditDialog,anything);
		setMenuEnabled(miSelectAll,anything);
		setMenuEnabled(miSelectNextAtom,anything);
		setMenuEnabled(miSelectPrevAtom,anything);
		setMenuEnabled(miSelectNextGroup,anything);
		setMenuEnabled(miSelectPrevGroup,anything);
		setMenuEnabled(miEditCut,anything);
		setMenuEnabled(miEditCopy,anything);
		setMenuEnabled(miCopyAsSk,anything);
		setMenuEnabled(miCopyAsMol,anything);
		setMenuEnabled(miCopyAsJSON,anything);
		setMenuEnabled(miCopyAsSVG,anything);
		setMenuEnabled(miFlipHoriz,anything);
		setMenuEnabled(miFlipVert,anything);
		setMenuEnabled(miRotateP30,anything);
		setMenuEnabled(miRotateN30,anything);
		setMenuEnabled(miRotateP45,anything);
		setMenuEnabled(miRotateN45,anything);
		setMenuEnabled(miRotateP90,anything);
		setMenuEnabled(miRotateN90,anything);
		setMenuEnabled(miHydSetExpl,anything);
		setMenuEnabled(miHydClearExpl,anything);
		setMenuEnabled(miHydZeroExpl,anything);
		setMenuEnabled(miHydCreate,anything);
		setMenuEnabled(miHydDelete,anything);
		setMenuEnabled(miZoomFull,anything);
		setMenuEnabled(miZoomIn,anything);
		setMenuEnabled(miZoomOut,anything);
		setMenuEnabled(miPanLeft,anything);
		setMenuEnabled(miPanRight,anything);
		setMenuEnabled(miPanUp,anything);
		setMenuEnabled(miPanDown,anything);

		setMenuEnabled(miTemplateAdd,editor.countSelected()>0);
		setMenuEnabled(miEditNormalise,mol.numBonds()>0);
		setMenuEnabled(miQueryDialog,mol.numAtoms()>0);

		// (consider making these check actual stereochemistry state)
		setMenuEnabled(miStereoInvert,anything);
		setMenuEnabled(miStereoSetRZ,anything);
		setMenuEnabled(miStereoSetSE,anything);
		setMenuEnabled(miStereoCycle,anything);
		setMenuEnabled(miStereoRemove,anything);

		setMenuEnabled(miEditUndo,editor.canUndo());
		setMenuEnabled(miEditRedo,editor.canRedo());

		// update the list of render policies
		miRenderPolicy.removeAll();
		for (int n=0;n<cfg.numPolicies();n++)
		{
			miRenderPolicy.add(Util.menuItem(this,cfg.getPolicy(n).name,0));
		}
	}

	public void lostOwnership(Clipboard clipboard,Transferable contents) {} // don't care
	
	public void windowActivated(WindowEvent e) {}
	public void windowClosed(WindowEvent e) {}
	public void windowClosing(WindowEvent e) 
	{
		fileQuit();
	}
	public void windowDeactivated(WindowEvent e) {}
	public void windowDeiconified(WindowEvent e) {}
	public void windowIconified(WindowEvent e) {}
	public void windowOpened(WindowEvent e) 
	{
		if (firstResize)
		{
			editor.scaleToFit();
			editor.repaint();
			firstResize=false;
		}
		editor.requestFocusInWindow();
	}
	
	public ImageIcon loadIcon(String fn) {return loadIcon(fn,getClass());}
	public static ImageIcon loadIcon(String fn,Class<?> cls)
	{
		String localFN="images/"+fn;
		System.out.println("looking for " + localFN);
		ImageIcon icon=null;
		if (new File(localFN).exists()) 
			{
			icon=new ImageIcon(localFN);
			}
		else {
			URL res = cls.getResource(/*SwingJS"/"+*/localFN);
			System.out.println("looking for " + res);

			icon=new ImageIcon(res);
		}
		if (icon==null) 
			throw new IndexOutOfBoundsException("Image icon could not be located: "+fn);
		return icon;
	}
}

/*
	Sketch Elements: Chemistry molecular diagram drawing tool.
	
	(c) 2005-2013 Dr. Alex M. Clark, all rights reserved
	
	Released as GNUware, under the Gnu Public License (GPL)
	
	See www.gnu.org for details.
*/

package org.sketchel;

import java.io.*;
import java.util.*;
import java.text.*;
import java.awt.*;
import java.awt.geom.*;
import java.awt.event.*;
import java.awt.image.*;
import java.awt.datatransfer.*;
import javax.swing.*;
import javax.swing.event.*;
import javax.imageio.*;

/*
	A dialog box for preparing and exporting a raster (PNG) image of a molecule.
*/

@SuppressWarnings("rawtypes")
public class DialogRaster extends JDialog implements ActionListener, ChangeListener, ComponentListener
{
	private Molecule mol;
	private int defWidth,defHeight;
	private ConfigData cfg;
	private String curDir;
	
	private final int PREV_WIDTH=300,PREV_HEIGHT=300;
	private final double DEF_SCALE=20,DEF_PAD=0.1;
	
	private JRadioButton destClipb,destFile;
	private JTextField destOutFN;
	private JButton destBrowse;
	private JRadioButton bgTransp,bgWhite,bgBlack;
	private JLabel preview;
	private JComboBox policy;
	private JTextField dimWidth,dimHeight;
	private JSlider dimScale;
	
	private JButton accept,reject;
	
	private javax.swing.Timer previewTimer;
	private Image clipboardImage=null;
	
	private final String KEY_ESCAPE="*ESCAPE*";
	
	public DialogRaster(Frame parent,Molecule mol,ConfigData cfg,String curDir)
	{
		super(parent,"Export to PNG",true);
		this.mol=mol;
		this.cfg=cfg;
		this.curDir=curDir;
	
		previewTimer=new javax.swing.Timer(50,this);
	
		setLayout(new BorderLayout());
		
		JLineup main=new JLineup(JLineup.VERTICAL,1);
		add(main,BorderLayout.CENTER);
		
		// add the destination selectors
		ButtonGroup btngrp=new ButtonGroup();
		JLineup line=new JLineup(JLineup.HORIZONTAL,1);
		line.add(destClipb=Util.makeRadio(this,"Clipboard",btngrp,KeyEvent.VK_C,"Copy graphic to clipboard"));
		line.add(destFile=Util.makeRadio(this,"File",btngrp,KeyEvent.VK_F,"Write graphic to file"));
		line.add(destOutFN=makeText(15,"Enter the filename to write to"),null,1,0);
		line.add(destBrowse=Util.makeButton(this,"Browse",KeyEvent.VK_B,"Browse for a destination file"));
		main.add(line,null,1,0);
		
		// add the preview
		preview=new JLabel();
		preview.setPreferredSize(new Dimension(PREV_WIDTH,PREV_HEIGHT));
		preview.addComponentListener(this);
		main.add(preview,null,1,1);
		
		// add the size
		line=new JLineup(JLineup.HORIZONTAL,1);
		line.add(dimWidth=makeText(5,"Width, in pixels, for output bitmap"),"Width:",0,0);
		line.add(dimHeight=makeText(5,"Height, in pixels, for output bitmap"),"Height:",0,0);
		line.add(dimScale=new JSlider(JSlider.HORIZONTAL,10,400,100),"Scale:",1,0);
		dimScale.addChangeListener(this);
		main.add(line,null,1,0);
		
		// add the policy/colour
		line=new JLineup(JLineup.HORIZONTAL,1);
		String[] pols=new String[cfg.numPolicies()];
		for (int n=0;n<cfg.numPolicies();n++) pols[n]=cfg.getPolicy(n).name;
		line.add(policy=new JComboBox(pols),"Policy:",0,0);
		policy.addActionListener(this);
		btngrp=new ButtonGroup();
		line.add(bgTransp=Util.makeRadio(this,"Transparent",btngrp,KeyEvent.VK_T,"Transparent background"),"Background:",0,0);
		line.add(bgWhite=Util.makeRadio(this,"White",btngrp,KeyEvent.VK_W,"White background"),null,0,0);
		line.add(bgBlack=Util.makeRadio(this,"Black",btngrp,KeyEvent.VK_L,"Black background"),null,0,0);
		main.add(line,null,1,0);
		
		// do the main button bank
		JPanel buttons=new JPanel();
		buttons.setLayout(new FlowLayout(FlowLayout.RIGHT));
		buttons.add(accept=Util.makeButton(this,"Accept",0,"Export the graphic"));
		buttons.add(reject=Util.makeButton(this,"Reject",0,"Cancel without exporting"));
		main.add(buttons,null,1,0);
		
		getRootPane().setDefaultButton(accept);
		
		ActionMap am=getRootPane().getActionMap();
		InputMap im=getRootPane().getInputMap(JRootPane.WHEN_IN_FOCUSED_WINDOW);

		im.put(KeyStroke.getKeyStroke(KeyEvent.VK_ESCAPE,0),KEY_ESCAPE);
		am.put(KEY_ESCAPE,new HotKeyAction(KEY_ESCAPE,this));
		
		// set initial state
		destClipb.setSelected(true);
		bgTransp.setSelected(true);
		destOutFN.setEnabled(false);
		destBrowse.setEnabled(false);
		
		//defWidth=(int)((2*DEF_PAD+mol.rangeX())*DEF_SCALE);
		//defHeight=(int)((2*DEF_PAD+mol.rangeY())*DEF_SCALE);
		double[] box=DrawMolecule.measureLimits(mol,null,null);
		defWidth=(int)Math.round((2*DEF_PAD+box[2]-box[0])*DEF_SCALE);
		defHeight=(int)Math.round((2*DEF_PAD+box[3]-box[1])*DEF_SCALE);
		
		dimWidth.setText(String.valueOf(defWidth));
		dimHeight.setText(String.valueOf(defHeight));
		
		pack();
	}
	
	/* !!
	// convenience methods for creating components
	private JButton makeButton(String text,int key,String toolTip)
	{
		JButton btn=new JButton(text);
		if (key!=0) btn.setMnemonic(key);
		if (toolTip!=null) btn.setToolTipText(toolTip);
		btn.addActionListener(this);
		return btn;
	}
	
	private JRadioButton makeRadio(String text,int key,String toolTip,ButtonGroup bg)
	{
		JRadioButton rad=new JRadioButton(text);
		if (key!=0) rad.setMnemonic(key);
		if (toolTip!=null) rad.setToolTipText(toolTip);
		rad.addActionListener(this);
		bg.add(rad);
		return rad;
	}*/
	
	private JTextField makeText(int charWidth,String toolTip)
	{
		JTextField txt=new JTextField(charWidth);
		if (toolTip!=null) txt.setToolTipText(toolTip);
		txt.addActionListener(this);
		return txt;
	}
	
	// redraws the preview image
	private void triggerPreview()
	{
		previewTimer.restart();
	}
	private void updatePreview()
	{
		previewTimer.stop();
	
		int imgW=preview.getWidth(),imgH=preview.getHeight();
		if (imgW<=0 || imgH<=0) return;
		
		BufferedImage img=new BufferedImage(imgW,imgH,BufferedImage.TYPE_INT_ARGB);
		
		RenderPolicy pol=cfg.getPolicy(policy.getSelectedIndex()).clone();
		adjustPolicy(pol);
		
		Graphics2D g=(Graphics2D)img.getGraphics();
		g.setRenderingHint(RenderingHints.KEY_ANTIALIASING,RenderingHints.VALUE_ANTIALIAS_ON);
    	g.setRenderingHint(RenderingHints.KEY_STROKE_CONTROL,RenderingHints.VALUE_STROKE_PURE);
		
		double[] box=DrawMolecule.measureLimits(mol,pol,null);
		box[0]-=DEF_PAD; box[1]-=DEF_PAD; box[2]+=DEF_PAD; box[3]+=DEF_PAD;
		
		int uw=currentWidth(),uh=currentHeight();
		//double aw=2*DEF_PAD+mol.rangeX(),ah=2*DEF_PAD+mol.rangeY();
		double aw=box[2]-box[0],ah=box[3]-box[1];
		double sw=uw/aw,sh=uh/ah,scale=Math.min(sw,sh),downsc=1;
		if (uw>imgW) 
			{double fr=(double)imgW/uw; scale*=fr; downsc*=fr; uw=(int)Math.round(uw*fr); uh=(int)Math.round(uh*fr);}
		if (uh>imgH) 
			{double fr=(double)imgH/uh; scale*=fr; downsc*=fr; uw=(int)Math.round(uw*fr); uh=(int)Math.round(uh*fr);}
		
		int offsetX=(int)(0.5*imgW-scale*0.5*(box[0]+box[2]));
		int offsetY=(int)(0.5*imgH+scale*0.5*(box[1]+box[3]));
		
		Color bg=rasterBackground();
		if (bg!=null)
		{
			g.setColor(bg);
			g.fillRect((imgW-uw)/2,(imgH-uh)/2,uw,uh);
		}
		
		DrawMolecule draw=new DrawMolecule(mol,g,scale);
		draw.setOffset(offsetX,offsetY);
		draw.setRenderPolicy(pol);
		draw.draw();
		
		if (downsc<1-1E-06)
		{
			g.setFont(new Font(Font.SANS_SERIF,Font.PLAIN,12));
			g.setColor(Color.BLUE);
			FontMetrics fm=g.getFontMetrics();
			DecimalFormat fmt=new DecimalFormat("0.0",new DecimalFormatSymbols(Locale.US));
			String txt="Not to scale: x"+fmt.format(downsc*100)+"%";
			g.drawString(txt,(imgW+uw)/2-5-fm.stringWidth(txt),imgH-2-fm.getDescent());
		}
		
		preview.setIcon(new ImageIcon(img));
	}
	
	private Color rasterBackground()
	{
		if (bgWhite.isSelected()) return Color.WHITE;
		if (bgBlack.isSelected()) return Color.BLACK;
		return null;
	}
	
	private void adjustPolicy(RenderPolicy pol)
	{
		Color bg=rasterBackground();
		if (bg!=null && bg.getRGB()==0xFF000000) // background is black, so make sure no atoms are black
		{
			if (pol.foreground.getRGB()==0xFF000000) pol.foreground=Color.WHITE;
			for (int n=0;n<pol.atomCols.length;n++) if (pol.atomCols[n].getRGB()==0xFF000000) pol.atomCols[n]=Color.WHITE;
		}
	}

	private int currentWidth()
	{
		try {return new Integer(dimWidth.getText());}
		catch (NumberFormatException ex) {return defWidth;}
	}
	private int currentHeight()
	{
		try {return new Integer(dimHeight.getText());}
		catch (NumberFormatException ex) {return defHeight;}
	}
	
	public void exec()
	{
		setVisible(true);
	}
	
	private boolean exportGraphic()
	{
		File f=null;
		if (destFile.isSelected())
		{
			f=new File(destOutFN.getText());
			if (destOutFN.getText().length()==0 || f.isDirectory())
			{
				JOptionPane.showMessageDialog(null,
					"A valid filename must be provided prior to creating a PNG file.",
					"File Needed",JOptionPane.ERROR_MESSAGE);
				return false;
			}
			if (f.exists() && !f.canWrite())
			{
				JOptionPane.showMessageDialog(null,
					"The destination file is not writeable.",
					"Access Denied",JOptionPane.ERROR_MESSAGE);
				return false;
			}
			if (f.exists())
			{
				if (JOptionPane.showConfirmDialog(null,
					"The output file:\n"+destOutFN.getText()+"\nwill be overwritten. Proceed?",
					"Overwrite",JOptionPane.YES_NO_OPTION)!=JOptionPane.YES_OPTION) return false;
			}
		}
		
		RenderPolicy pol=cfg.getPolicy(policy.getSelectedIndex()).clone();
		adjustPolicy(pol);
		
		double[] box=DrawMolecule.measureLimits(mol,pol,null);
		box[0]-=DEF_PAD; box[1]-=DEF_PAD; box[2]+=DEF_PAD; box[3]+=DEF_PAD;
		
		int w=currentWidth(),h=currentHeight();
		BufferedImage img=new BufferedImage(w,h,BufferedImage.TYPE_INT_ARGB);
		
		Graphics2D g=(Graphics2D)img.getGraphics();
		g.setRenderingHint(RenderingHints.KEY_ANTIALIASING,RenderingHints.VALUE_ANTIALIAS_ON);
    	g.setRenderingHint(RenderingHints.KEY_STROKE_CONTROL,RenderingHints.VALUE_STROKE_PURE);
		//double aw=2*DEF_PAD+mol.rangeX(),ah=2*DEF_PAD+mol.rangeY();
		double aw=box[2]-box[0],ah=box[3]-box[1];
		double sw=w/aw,sh=h/ah,scale=Math.min(sw,sh);
		//int offsetX=(int)(0.5*w-scale*0.5*(mol.minX()+mol.maxX()));
		//int offsetY=(int)(0.5*h+scale*0.5*(mol.minY()+mol.maxY()));
		int offsetX=(int)(0.5*w-scale*0.5*(box[0]+box[2]));
		int offsetY=(int)(0.5*h+scale*0.5*(box[1]+box[3]));
		
		Color bg=rasterBackground();
		if (bg!=null)
		{
			g.setColor(bg);
			g.fillRect(0,0,w,h);
		}
		
		DrawMolecule draw=new DrawMolecule(mol,g,scale);
		draw.setOffset(offsetX,offsetY);
		draw.setRenderPolicy(pol);
		draw.draw();	

		if (f==null)
		{
			clipboardImage=img;
			Transferable transf=new Transferable()
			{
				public Object getTransferData(DataFlavor flavor) throws UnsupportedFlavorException 
				{
					if (!flavor.equals(DataFlavor.imageFlavor)) throw new UnsupportedFlavorException(flavor);
					return clipboardImage;
				}
   
				public boolean isDataFlavorSupported(DataFlavor flavor) {return flavor.equals(DataFlavor.imageFlavor);}
				public DataFlavor[] getTransferDataFlavors() {return new DataFlavor[]{DataFlavor.imageFlavor};}
			};
			Toolkit toolkit=Toolkit.getDefaultToolkit();
			toolkit.getSystemClipboard().setContents(transf,null);
		}
		else
		{
			try {ImageIO.write(img,"png",f);}
			catch (IOException ex)
			{
				ex.printStackTrace();
				JOptionPane.showMessageDialog(null,ex.toString(),"Export Failed",JOptionPane.ERROR_MESSAGE);
				return false;
			}
		}
		
		return true;
	}

	public void actionPerformed(ActionEvent e)
	{
		Object src=e.getSource();
		
		if (src==previewTimer) updatePreview();
		else if (src==accept) 
		{
			if (exportGraphic()) setVisible(false);
		}
		else if (src==reject || e.getActionCommand().equals(KEY_ESCAPE)) setVisible(false);
		else if (src==destClipb)
		{
			destOutFN.setEnabled(false);
			destBrowse.setEnabled(false);
		}
		else if (src==destFile)
		{
			destOutFN.setEnabled(true);
			destBrowse.setEnabled(true);
		}
		else if (src==destBrowse)
		{
			JFileChooser chooser=new JFileChooser(System.getenv().get("PWD"));
			if (curDir!=null) chooser.setCurrentDirectory(new File(curDir));
			chooser.setDragEnabled(false);
			chooser.setFileSelectionMode(JFileChooser.FILES_ONLY);
//			chooser.setFileFilter(new FileExtFilter("PNG Files",".png"));
			if (chooser.showSaveDialog(this)!=JFileChooser.APPROVE_OPTION) return;
	
			String fn=chooser.getSelectedFile().getPath();
			if (chooser.getSelectedFile().getName().indexOf('.')<0) fn=fn+".png";
			destOutFN.setText(fn);
		}
		else if (src==dimWidth) 
		{
			dimWidth.setText(String.valueOf(currentWidth()));
			triggerPreview();
		}
		else if (src==dimHeight)
		{
			dimHeight.setText(String.valueOf(currentHeight()));
			triggerPreview();
		}
		else if (src==policy) triggerPreview();
		else if (src==bgTransp) triggerPreview();
		else if (src==bgWhite) triggerPreview();
		else if (src==bgBlack) triggerPreview();
	}

	public void stateChanged(ChangeEvent e)
	{
		if (e.getSource()==dimScale)
		{
			double fr=dimScale.getValue()*0.01;
			int w=(int)Math.round(defWidth*fr),h=(int)Math.round(defHeight*fr);
			dimWidth.setText(String.valueOf(w));
			dimHeight.setText(String.valueOf(h));
			triggerPreview();
		}
	}

	public void componentHidden(ComponentEvent e) {}
	public void componentMoved(ComponentEvent e) {}
	public void componentResized(ComponentEvent e) {triggerPreview();}
	public void componentShown(ComponentEvent e) {triggerPreview();}
}
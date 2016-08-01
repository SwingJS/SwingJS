/*
	Sketch Elements: Chemistry molecular diagram drawing tool.
	
	(c) 2005-2013 Dr. Alex M. Clark, all rights reserved
	
	Released as GNUware, under the Gnu Public License (GPL)
	
	See www.gnu.org for details.
*/

package org.sketchel;

import java.util.*;
import java.text.*;
import java.awt.*;
import java.awt.geom.*;
import java.awt.event.*;

import javax.swing.*;
import javax.swing.event.*;

/*
	A dialog box for editing of SketchEl configuration info.
*/

@SuppressWarnings("rawtypes")
public class DialogConfig extends JDialog implements ActionListener, ListSelectionListener, ComponentListener
{
	protected ConfigData cfg;
	protected boolean modified=false,accepted=false;
	
	protected JTabbedPane tabs;
	protected Component tabRender;
	
	private JList polList;
	private JButton polNew,polDelete,polUp,polDown,polApply;
	private JTextField polName,polFontSize,polLineSize,polBondSep,polPointScale,polForeground;
	private JTextArea polAtomCols;
	
	private JButton accept,reject;
	
	protected final String KEY_ESCAPE="*ESCAPE*";
	protected final String KEY_ALTUP="*ALT-UP*";
	protected final String KEY_ALTDOWN="*ALT-DOWN*";
	
	public DialogConfig(Frame parent,ConfigData cfg)
	{
		super(parent,"Configuration",true);
		this.cfg=cfg;
	
		setLayout(new BorderLayout());
		
		// fill out the tabbed panel
		tabs=new JTabbedPane();
		createTabs();
		
		add(tabs,BorderLayout.CENTER);
		
		// do the main button bank
		JPanel buttons=new JPanel();
		buttons.setLayout(new FlowLayout(FlowLayout.RIGHT));
		buttons.add(accept=Util.makeButton(this,"Save",KeyEvent.VK_S,"Close dialog and write the configuration file"));
		buttons.add(reject=Util.makeButton(this,"Close",0,"Close dialog without saving changes"));
		add(buttons,BorderLayout.SOUTH);
		
		populateContent();
		updatePossible();
		
		getRootPane().setDefaultButton(accept);
		
		ActionMap am=getRootPane().getActionMap();
		InputMap im=getRootPane().getInputMap(JRootPane.WHEN_IN_FOCUSED_WINDOW);

		im.put(KeyStroke.getKeyStroke(KeyEvent.VK_ESCAPE,0),KEY_ESCAPE);
		am.put(KEY_ESCAPE,new HotKeyAction(KEY_ESCAPE,this));
		
		im.put(KeyStroke.getKeyStroke(KeyEvent.VK_UP,KeyEvent.ALT_MASK),KEY_ALTUP);
		am.put(KEY_ALTUP,new HotKeyAction(KEY_ALTUP,this));
		
		im.put(KeyStroke.getKeyStroke(KeyEvent.VK_DOWN,KeyEvent.ALT_MASK),KEY_ALTDOWN);
		am.put(KEY_ALTDOWN,new HotKeyAction(KEY_ALTDOWN,this));
		
		pack();
	}
	
	/* !!
	// convenience methods for creating components
	protected JButton makeButton(String text,int key,String toolTip)
	{
		JButton btn=new JButton(text);
		if (key!=0) btn.setMnemonic(key);
		if (toolTip!=null) btn.setToolTipText(toolTip);
		btn.addActionListener(this);
		return btn;
	}*/
	
	protected JTextField makeField(int width,String toolTip)
	{
		JTextField fld=new JTextField();
		if (toolTip!=null) fld.setToolTipText(toolTip);
		fld.addActionListener(this);
		if (width!=0)
		{
			width*=fld.getFontMetrics(fld.getFont()).charWidth('M');
			Dimension sz=fld.getMinimumSize();
			sz.width=Math.max(sz.width,width);
			fld.setMinimumSize(sz);
			sz=fld.getPreferredSize();
			sz.width=Math.max(sz.width,width);
			fld.setPreferredSize(sz);
		}
		return fld;
	}
	
	// called to create all of the tabs
	protected void createTabs()
	{
		tabs.addTab("Render",tabRender=createTabRender());
	}
	
	// creates and returns a rendering tab
	private JLineup createTabRender()
	{
		JLineup main=new JLineup(JLineup.VERTICAL,1);
		main.setOpaque(true);
		main.add(new JLabel("Rendering Policies"));
		
		// the list of policies, and buttons to affect that list
		
		JLineup toppart=new JLineup(JLineup.HORIZONTAL,1);
		polList=new JList();
		polList.addListSelectionListener(this);
		toppart.add(new JScrollPane(polList),null,1,1);
		
		JLineup buttons=new JLineup(JLineup.VERTICAL,1);
		buttons.add(polNew=Util.makeButton(this,"New",KeyEvent.VK_N,"Add new rendering policy"),null,1,0);
		buttons.add(polDelete=Util.makeButton(this,"Delete",KeyEvent.VK_E,"Delete current rendering policy"),null,1,0);
		buttons.add(polUp=Util.makeButton(this,"Up",KeyEvent.VK_U,"Move current policy up in list"),null,1,0);
		buttons.add(polDown=Util.makeButton(this,"Down",KeyEvent.VK_D,"Move current policy down in list"),null,1,0);
		buttons.add(polApply=Util.makeButton(this,"Apply",KeyEvent.VK_P,"Apply changes to policy"),null,1,0);
		buttons.addPadding();
		toppart.add(buttons,null,0,1);
		
		// the editing area for a single policy
		
		JLineup btmpart=new JLineup(JLineup.VERTICAL,1);
		btmpart.add(polName=makeField(20,"Specify the name of the rendering policy"),"Name:",1,0);
		
		JLineup row=new JLineup(JLineup.HORIZONTAL,1);
		row.add(polFontSize=makeField(5,"The font size used for atom symbols, in Angstrom units"),"Font Size:",1,0);
		row.add(polLineSize=makeField(5,"The line width used for bonds, in Angstrom units"),"\u00C5 Line Size:",1,0);
		row.add(new JLabel("\u00C5"));
		btmpart.add(row,null,1,0,JLineup.NOINDENT);
		
		row=new JLineup(JLineup.HORIZONTAL,1);
		row.add(polBondSep=makeField(5,"The separation between multiple bonds"),"Bond Separation:",1,0);
		row.add(polPointScale=makeField(5,"Points-per-Angstrom used when exporting pictures"),"\u00C5 Point Scale:",1,0);
		btmpart.add(row,null,1,0,JLineup.NOINDENT);

		row=new JLineup(JLineup.HORIZONTAL,1);
		row.add(polForeground=makeField(7,"Colour for bonds and decorations"),"Foreground:",0,0);
		btmpart.add(row,null,1,0,JLineup.NOINDENT);
		
		btmpart.add(new JLabel("Atom Colours:"),null,0,0,JLineup.NOINDENT);
		polAtomCols=new JTextArea(5,30);
		polAtomCols.setWrapStyleWord(true);
		polAtomCols.setLineWrap(true);
		btmpart.add(new JScrollPane(polAtomCols),null,1,1,JLineup.NOINDENT);
		
		main.add(toppart,null,1,1);
		main.add(btmpart,null,1,1);
		return main;
	}
	
	// fills in all of the component content, based on the current configuration info
	protected void populateContent()
	{
		int polSel=polList.getSelectedIndex();
		String[] polnames=new String[cfg.numPolicies()];
		for (int n=0;n<cfg.numPolicies();n++)
		{
			RenderPolicy p=cfg.getPolicy(n);
			polnames[n]=p.name;
		}

		polList.setListData(polnames);
		polSel=polSel<0 || polSel>=cfg.numPolicies() ? 0 : polSel;
		polList.setSelectedIndex(polSel);
		policyLoad(polSel);
	}
	
	// call when an update has been made
	protected void setModified()
	{
		modified=true;
		updatePossible();
	}
	
	// updates the enabled-ness of all the buttons
	protected void updatePossible()
	{
		accept.setEnabled(modified);
		int polCount=polList.getModel().getSize(),polSel=polList.getSelectedIndex();
		polDelete.setEnabled(polCount>1);
		polUp.setEnabled(polSel>0);
		polDown.setEnabled(polSel<polCount-1);
		//polApply.setEnabled(???);
	}
	
	// select a new policy; assumes that any previous state has been saved or abandoned
	private void policyLoad(int N)
	{
		RenderPolicy p=cfg.getPolicy(N);
		polName.setText(p.name);
		polFontSize.setText(String.valueOf(p.fontSize));
		polLineSize.setText(String.valueOf(p.lineSize));
		polBondSep.setText(String.valueOf(p.bondSep));
		polPointScale.setText(String.valueOf(p.pointScale));
		polForeground.setText(Util.colourHTML(p.foreground.getRGB()&0xFFFFFF));
		
		StringBuffer buff=new StringBuffer();
		for (int n=0;n<p.atomCols.length;n++) if (p.atomCols[n].getRGB()!=p.foreground.getRGB())
			//if (p.atomCols[n].getRed()!=0 || p.atomCols[n].getGreen()!=0 || p.atomCols[n].getBlue()!=0)
		{
			if (buff.length()>0) buff.append(" ");
			buff.append((n==0 ? "X" : Molecule.ELEMENTS[n])+"="+Util.colourHTML(p.atomCols[n].getRGB()&0xFFFFFF));
		}
		polAtomCols.setText(buff.toString());
	}
	
	// adds a new policy to the list
	private void policyNew()
	{
		RenderPolicy p=cfg.getPolicy(polList.getSelectedIndex()).clone();
		p.name+=" (copy)";
		cfg.addPolicy(p);
		populateContent();
		polList.setSelectedIndex(cfg.numPolicies()-1);
		
		setModified();
	}
	
	// deletes the selected policy
	private void policyDelete()
	{
		if (cfg.numPolicies()<=1)
		{
			JOptionPane.showMessageDialog(null,"Cannot delete the last rendering policy.","Delete",JOptionPane.ERROR_MESSAGE);
			return;
		}
		int idx=polList.getSelectedIndex();
		cfg.deletePolicy(idx);
		if (idx>=cfg.numPolicies()) idx--;
		populateContent();
		polList.setSelectedIndex(idx);
		
		setModified();
	}
	
	// moves selected policy up or down the list
	private void policyMove(int dir)
	{
		int idx=polList.getSelectedIndex(),polCount=polList.getModel().getSize();
		if (idx+dir<0 || idx+dir>=polCount) return;
		policyApply();
		RenderPolicy p1=cfg.getPolicy(idx),p2=cfg.getPolicy(idx+dir);
		cfg.setPolicy(idx,p2);
		cfg.setPolicy(idx+dir,p1);
		populateContent();
		polList.setSelectedIndex(idx+dir);
		
		setModified();
	}
	
	// commits the current policy edit
	private void policyApply()
	{
		int idx=polList.getSelectedIndex();
		RenderPolicy p=cfg.getPolicy(idx);
		p.name=polName.getText();
		try {p.fontSize=Double.valueOf(polFontSize.getText());} catch (NumberFormatException ex) {}
		try {p.lineSize=Double.valueOf(polLineSize.getText());} catch (NumberFormatException ex) {}
		try {p.bondSep=Double.valueOf(polBondSep.getText());} catch (NumberFormatException ex) {}
		try {p.pointScale=Double.valueOf(polPointScale.getText());} catch (NumberFormatException ex) {}
		
		String fg=polForeground.getText();
		if (fg.length()>0 && fg.charAt(0)=='#') fg=fg.substring(1);
		if (fg.length()>=6) p.foreground=new Color(Integer.valueOf(fg,16).intValue());	
		ConfigData.parseAtomColourString(p.foreground,p.atomCols,polAtomCols.getText());
		cfg.setPolicy(idx,p);
		
		populateContent();
		polList.setSelectedIndex(idx);

		setModified();
	}
	
	protected void actionAccept()
	{
		accepted=modified;
		setVisible(false);
	}
	protected void actionReject()
	{
		setVisible(false);
	}
	
	public boolean exec()
	{
		setVisible(true);
		return accepted;
	}
		
	public void actionPerformed(ActionEvent e)
	{
		Object src=e.getSource();
		String cmd=e.getActionCommand();
	
		if (src==accept) actionAccept();
		else if (src==reject || cmd.equals(KEY_ESCAPE)) actionReject();
		else if (src==polNew) policyNew();
		else if (src==polDelete) policyDelete();
		else if (src==polUp || (cmd.equals(KEY_ALTUP) && tabs.getSelectedComponent()==tabRender)) policyMove(-1);
		else if (src==polDown || (cmd.equals(KEY_ALTDOWN) && tabs.getSelectedComponent()==tabRender)) policyMove(1);
		else if (src==polApply) policyApply();
	}

	public void valueChanged(ListSelectionEvent e)
	{
		if (e.getSource()==polList)
		{
			// !! save old??
			int idx=polList.getSelectedIndex();
			if (idx>=0) policyLoad(polList.getSelectedIndex());
			updatePossible();
		}
	}

	public void componentHidden(ComponentEvent e) {}
	public void componentMoved(ComponentEvent e) {}
	public void componentResized(ComponentEvent e) {}
	public void componentShown(ComponentEvent e) {}
}

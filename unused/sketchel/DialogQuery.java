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
	A dialog box for editing query extensions, either for an atom or a bond.
*/

public class DialogQuery extends JDialog implements ActionListener
{
	private Molecule mol,retMol=null;
	private int aidx,bidx;
	
	private JButton accept,reject;
	private final String KEY_ESCAPE="*ESCAPE*";
	
	private Map<String,JTextField> widgetsEdit=new HashMap<String,JTextField>();
	private Map<String,JCheckBox> widgetsNot=new HashMap<String,JCheckBox>();
	private Map<String,JRadioButton[]> widgetsBool=new HashMap<String,JRadioButton[]>();
	
	public DialogQuery(Frame parent,Molecule mol,int aidx,int bidx)
	{
		super(parent,"Edit Query",true);
		this.mol=mol.clone();
		this.aidx=aidx;
		this.bidx=bidx;

		setLayout(new BorderLayout());

		JLineup main=new JLineup(JLineup.VERTICAL,1);
		main.setOpaque(true);
		if (aidx>0)
		{
			main.add(new JLabel("Query properties for atom #"+aidx));
			String[] extra=mol.atomExtra(aidx);
			if (extra==null) extra=new String[0];
			createEditStyle(main,"Charges:","qC",extra,false);
			createBoolStyle(main,"Aromatic:","qA",extra);
			createEditStyle(main,"Elements:","qE",extra,true);
			createEditStyle(main,"Ring Sizes:","qR",extra,true);
			createBoolStyle(main,"Ring Block:","qB",extra);
			createEditStyle(main,"Num Rings:","qN",extra,false);
			createEditStyle(main,"Adjacencies:","qJ",extra,false);
			createEditStyle(main,"Bond Order Sums:","qO",extra,false);
			createEditStyle(main,"Valences:","qV",extra,false);
			createEditStyle(main,"Hydrogen Counts:","qH",extra,false);
			createEditStyle(main,"Isotopes:","qI",extra,false);
		}
		else if (bidx>0)
		{
			main.add(new JLabel("Query properties for bond #"+bidx));
			String[] extra=mol.bondExtra(bidx);
			if (extra==null) extra=new String[0];
			createEditStyle(main,"Ring Sizes:","qR",extra,true);
			createBoolStyle(main,"Ring Block:","qB",extra);
			createEditStyle(main,"Num Rings:","qN",extra,false);
			createEditStyle(main,"Bond Orders:","qO",extra,false);
		}
		
		add(main,BorderLayout.CENTER);

		JLineup buttons=new JLineup(JLineup.HORIZONTAL,2);
		buttons.addPadding();
		buttons.add(accept=Util.makeButton(this,"Accept",KeyEvent.VK_A,"Close dialog and apply changes"),null,0,0);
		buttons.add(reject=Util.makeButton(this,"Reject",0,"Cancel without applying changes"),null,0,0);

		add(buttons,BorderLayout.SOUTH);

		getRootPane().setDefaultButton(accept);

		ActionMap am=getRootPane().getActionMap();
		InputMap im=getRootPane().getInputMap(JRootPane.WHEN_IN_FOCUSED_WINDOW);

		im.put(KeyStroke.getKeyStroke(KeyEvent.VK_ESCAPE,0),KEY_ESCAPE);
		am.put(KEY_ESCAPE,new HotKeyAction(KEY_ESCAPE,this));

		pack();
	}

	public Molecule exec()
	{
		setVisible(true);
		return retMol;
	}

	public void actionPerformed(ActionEvent e)
	{
		Object src=e.getSource();
		String cmd=e.getActionCommand();

		if (src==accept)
		{
			String[] extra=aidx>0 ? mol.atomExtra(aidx) : mol.bondExtra(bidx);
			if (extra==null) extra=new String[0];
			extra=rebuildExtra(extra);
			if (aidx>0) mol.setAtomExtra(aidx,extra); else mol.setBondExtra(bidx,extra);
			retMol=mol;
			setVisible(false);
		}
		else if (src==reject || cmd.equals(KEY_ESCAPE)) setVisible(false);
	}

	// create widgets, with editable line and optional negation checkbox
	private void createEditStyle(JLineup parent,String title,String prefix,String[] extra,boolean negation)
	{
		JTextField edit=new JTextField();
		Dimension sz=edit.getMinimumSize();
		edit.setPreferredSize(new Dimension(200,sz.height));

		JLineup row=new JLineup(JLineup.HORIZONTAL,1);
		row.add(edit);
				
		JCheckBox chk=null;
		if (negation)
		{
			chk=new JCheckBox("Not");
			row.add(chk);
		}

		for (String q : extra) if (q.startsWith(prefix))
		{
			String txt=q.substring(prefix.length());
			if (txt.startsWith("!")) 
			{
				if (negation) chk.setSelected(true);
			}
			if (txt.length()>0) txt=txt.substring(1);
			edit.setText(txt);
			break;
		}

		parent.add(row,title);
		widgetsEdit.put(prefix,edit);
		if (negation) widgetsNot.put(prefix,chk);
	}
	
	private void createBoolStyle(JLineup parent,String title,String prefix,String[] extra)
	{
		ButtonGroup grp=new ButtonGroup();
		JRadioButton radYes=Util.makeRadio(null,"Yes",grp);
		JRadioButton radNo=Util.makeRadio(null,"No",grp);
		JRadioButton radMaybe=Util.makeRadio(null,"Maybe",grp);
		radMaybe.setSelected(true);
		
		for (String q : extra) if (q.startsWith(prefix))
		{
			String txt=q.substring(prefix.length());
			if (txt.equals(":yes")) radYes.setSelected(true);
			else if (txt.equals(":no")) radNo.setSelected(true);
			break;
		}

		JLineup row=new JLineup(JLineup.HORIZONTAL,1);
		row.add(radYes);
		row.add(radNo);
		row.add(radMaybe);
		
		parent.add(row,title);
		widgetsBool.put(prefix,new JRadioButton[]{radYes,radNo});
	}

	private String[] rebuildExtra(String[] extra)
	{
		ArrayList<String> clauses=new ArrayList<String>();
		for (String q : extra) if (!q.startsWith("q") || q.startsWith("qX")) clauses.add(q);

		for (String p : widgetsEdit.keySet())
		{
			String txt=widgetsEdit.get(p).getText();
			if (txt.length()==0) continue;
			
			JCheckBox chk=widgetsNot.get(p);
			String sep=chk!=null && chk.isSelected() ? "!" : ":";

			clauses.add(p+sep+txt);
		}
		for (String p : widgetsBool.keySet())
		{
			JRadioButton[] rads=widgetsBool.get(p);
			String txt="";
			if (rads[0].isSelected()) txt="yes";
			else if (rads[1].isSelected()) txt="no";
			else continue;
			
			clauses.add(p+":"+txt);
		}

		Collections.sort(clauses);

		return clauses.toArray(new String[clauses.size()]);
	}
}

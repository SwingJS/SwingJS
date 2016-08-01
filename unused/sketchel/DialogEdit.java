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
	A dialog box which allows tabulated editing of molecular data, as an alternative to doing all editing graphically.
*/

@SuppressWarnings("rawtypes")
public class DialogEdit extends JDialog implements ActionListener
{
	private Molecule mol,retMol=null;
	private ArrayList<Integer> aselidx,bselidx;
	
	private JTabbedPane tabs;
	private JButton moveup,movedown,accept,reject;
	private JTable atoms,bonds;
	private String[] priorAtomExtra,priorBondExtra;

	private static final String BOND_TYPES[]={"Normal","Inclined","Declined","Unknown"};

	private final String KEY_ESCAPE="*ESCAPE*";
	private final String KEY_ALTUP="*ALT-UP*";
	private final String KEY_ALTDOWN="*ALT-DOWN*";
	
	public DialogEdit(Frame parent,Molecule Mol,ArrayList<Integer> SelIdx)
	{
		super(parent,"Edit Molecule",true);
		mol=Mol.clone();
		aselidx=SelIdx;
		bselidx=new ArrayList<Integer>();
		for (int n=1;n<=mol.numBonds();n++) if (aselidx.indexOf(mol.bondFrom(n))>=0 && aselidx.indexOf(mol.bondTo(n))>=0) bselidx.add(n);
		
		priorAtomExtra=new String[aselidx.size()];
		priorBondExtra=new String[bselidx.size()];
		for (int n=0;n<aselidx.size();n++) priorAtomExtra[n]=compileExtra(mol.atomExtra(aselidx.get(n)),mol.atomTransient(aselidx.get(n)));
		for (int n=0;n<bselidx.size();n++) priorBondExtra[n]=compileExtra(mol.bondExtra(bselidx.get(n)),mol.bondTransient(bselidx.get(n)));
		setLayout(new BorderLayout());
		
		atoms=new JTable(compileAtomData(),new String[]{"#","El","X","Y","Charge","Unpaired","Isotope","HExplicit","MapNum","Extra"})
			{public boolean isCellEditable(int row,int column) {return column>0;}};
		bonds=new JTable(compileBondData(),new String[]{"#","From","To","Order","Type","Extra"})
			{public boolean isCellEditable(int row,int column) {return column>2;}};

		atoms.getColumnModel().getColumn(0).setCellEditor(null);
		JComboBox bondTypes=new JComboBox();
		for (int n=0;n<BOND_TYPES.length;n++) bondTypes.addItem(BOND_TYPES[n]);
		bonds.getColumnModel().getColumn(4).setCellEditor(new DefaultCellEditor(bondTypes));

		JPanel tabAtoms=new JPanel(),tabBonds=new JPanel();
		tabAtoms.setLayout(new BorderLayout());
		tabBonds.setLayout(new BorderLayout());

		atoms.setPreferredScrollableViewportSize(new Dimension(600,200));
		bonds.setPreferredScrollableViewportSize(new Dimension(450,200));

		tabAtoms.add(new JScrollPane(atoms));
		tabBonds.add(new JScrollPane(bonds));

		tabs=new JTabbedPane();
		tabs.addTab("Atoms",tabAtoms);
		tabs.addTab("Bonds",tabBonds);
		add(tabs,BorderLayout.CENTER);

		JLineup buttons=new JLineup(JLineup.HORIZONTAL,2);
		buttons.add(moveup=Util.makeButton(this,"Up",KeyEvent.VK_U,"Move current item up the list"),null,0,0);
		buttons.add(movedown=Util.makeButton(this,"Down",KeyEvent.VK_D,"Move current item down the list"),null,0,0);
		buttons.addPadding();
		buttons.add(accept=Util.makeButton(this,"Accept",KeyEvent.VK_A,"Close dialog and apply changes"),null,0,0);
		buttons.add(reject=Util.makeButton(this,"Reject",0,"Cancel without applying changes"),null,0,0);

		moveup.setFocusable(false);
		movedown.setFocusable(false);

		add(buttons,BorderLayout.SOUTH);

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

		atoms.grabFocus();
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
			readData();
			retMol=mol;
			setVisible(false);
		}
		else if (src==reject || cmd.equals(KEY_ESCAPE)) setVisible(false);
		else if (src==moveup || cmd.equals(KEY_ALTUP))
		{
			if (tabs.getSelectedIndex()==0) moveAtom(-1);
			else if (tabs.getSelectedIndex()==1) moveBond(-1);
		}
		else if (src==movedown || cmd.equals(KEY_ALTDOWN))
		{
			if (tabs.getSelectedIndex()==0) moveAtom(1);
			else if (tabs.getSelectedIndex()==1) moveBond(1);
		}
	}

	private Object[][] compileAtomData()
	{
		Object[][] data=new Object[aselidx.size()][];

		DecimalFormat fmt=new DecimalFormat("0.0000");

		for (int n=0;n<aselidx.size();n++)
		{
			int i=aselidx.get(n).intValue();
			Object[] da=new Object[10];
			da[0]=new Integer(i);
			da[1]=new String(mol.atomElement(i));
			da[2]=fmt.format(mol.atomX(i));
			da[3]=fmt.format(mol.atomY(i));
			da[4]=String.valueOf(mol.atomCharge(i));
			da[5]=String.valueOf(mol.atomUnpaired(i));
			da[6]=mol.atomIsotope(i)==Molecule.ISOTOPE_NATURAL ? "?" : String.valueOf(mol.atomIsotope(i));
			da[7]=mol.atomHExplicit(i)==Molecule.HEXPLICIT_UNKNOWN ? "?" : String.valueOf(mol.atomHExplicit(i));
			da[8]=String.valueOf(mol.atomMapNum(i));
			da[9]=priorAtomExtra[n]; //compileExtra(mol.atomExtra(i),mol.atomTransient(i));
			data[n]=da;
		}

		return data;
	}

	private Object[][] compileBondData()
	{
		Object[][] data=new Object[bselidx.size()][];

		for (int n=0;n<bselidx.size();n++)
		{
			int i=bselidx.get(n).intValue();
			Object[] db=new Object[6];
			db[0]=new Integer(i);
			db[1]=new Integer(mol.bondFrom(i));
			db[2]=new Integer(mol.bondTo(i));
			db[3]=String.valueOf(mol.bondOrder(i));
			db[4]=new String(BOND_TYPES[mol.bondType(i)]);
			db[5]=priorBondExtra[n]; //compileExtra(mol.bondExtra(i),mol.bondTransient(i));
			data[n]=db;
		}

		return data;
	}

	private void readData()
	{
		mol.setKeepTransient(true);
	
		for (int n=0;n<atoms.getRowCount();n++)
		{
			int i=(Integer)atoms.getValueAt(n,0);
			mol.setAtomElement(i,(String)atoms.getValueAt(n,1));
			mol.setAtomPos(i,Util.safeDouble((String)atoms.getValueAt(n,2)),Util.safeDouble((String)atoms.getValueAt(n,3)));

			mol.setAtomCharge(i,Util.safeInt((String)atoms.getValueAt(n,4)));
			mol.setAtomUnpaired(i,Util.safeInt((String)atoms.getValueAt(n,5)));
			String isoStr=(String)atoms.getValueAt(n,6);
			mol.setAtomIsotope(i,Util.safeInt(isoStr,Molecule.ISOTOPE_NATURAL));
			String hyStr=(String)atoms.getValueAt(n,7);
			int hy=Util.safeInt(hyStr);
			mol.setAtomHExplicit(i,hyStr.compareTo("0")==0 ? 0 : hy>0 ? hy : Molecule.HEXPLICIT_UNKNOWN);
			mol.setAtomMapNum(i,Util.safeInt((String)atoms.getValueAt(n,8)));
			
			String extra=(String)atoms.getValueAt(n,9);
			if (!extra.equals(priorAtomExtra[n]))
			{
				String[] bits=extra.split(",");
				if (bits[0].length()==0) bits=new String[0];
				mol.setAtomExtra(i,uncompileExtra(bits,false));
				mol.setAtomTransient(i,uncompileExtra(bits,true));
			}
		}
		for (int n=0;n<bonds.getRowCount();n++)
		{
			int i=(Integer)bonds.getValueAt(n,0);
			mol.setBondOrder(i,new Integer((String)bonds.getValueAt(n,3)).intValue());
			int type;
			for (int j=BOND_TYPES.length-1;j>=0;j--) if (BOND_TYPES[j].compareTo((String)bonds.getValueAt(n,4))==0)
				{mol.setBondType(i,j); break;}

			String extra=(String)bonds.getValueAt(n,5);
			if (!extra.equals(priorBondExtra[n]))
			{
				String[] bits=extra.split(",");
				if (bits[0].length()==0) bits=new String[0];
				mol.setBondExtra(i,uncompileExtra(bits,false));
				mol.setBondTransient(i,uncompileExtra(bits,true));
			}
		}
		
		mol.setKeepTransient(false);
	}

	private void moveAtom(int dir)
	{
		int sel=atoms.getSelectedRow();
		if (sel<0 || sel+dir<0 || sel+dir>=aselidx.size()) return;
		
		readData();
		
		int[] idx=new int[mol.numAtoms()];
		for (int n=0;n<idx.length;n++) idx[n]=n+1;
		int i1=aselidx.get(sel),i2=aselidx.get(sel+dir);
		int v=idx[i1-1]; idx[i1-1]=idx[i2-1]; idx[i2-1]=v;
		
		mol=mol.subgraph(idx);
		Object[][] data=compileAtomData();
		for (int i=0;i<data.length;i++) for (int j=0;j<data[i].length;j++) atoms.setValueAt(data[i][j],i,j);
		
		atoms.setRowSelectionInterval(sel+dir,sel+dir);
	}
	
	private void moveBond(int dir)
	{
		int sel=bonds.getSelectedRow();
		if (sel<0 || sel+dir<0 || sel+dir>=aselidx.size()) return;
		
		readData();
		
		int[] idx=new int[mol.numBonds()];
		for (int n=0;n<idx.length;n++) idx[n]=n+1;
		int i1=bselidx.get(sel),i2=bselidx.get(sel+dir);
		int v=idx[i1-1]-1; idx[i1-1]=idx[i2-1]; idx[i2-1]=v;
		
		mol=mol.reorderedBonds(idx);
		Object[][] data=compileBondData();
		for (int i=0;i<data.length;i++) for (int j=0;j<data[i].length;j++) bonds.setValueAt(data[i][j],i,j);
		
		bonds.setRowSelectionInterval(sel+dir,sel+dir);
	}
	
	private String compileExtra(String[] extra,String[] trans)
	{
		StringBuffer buff=new StringBuffer();
		//for (int n=0;n<(extra==null ? 0 : extra.length);n++) buff.append("["+extra[n]+"]");
		//for (int n=0;n<(trans==null ? 0 : trans.length);n++) buff.append("["+trans[n]+"]");
		for (int n=0;n<(extra==null ? 0 : extra.length);n++) 
		{
			//buff.append("["+extra[n]+"]");
			if (buff.length()>0) buff.append(',');
			buff.append(MoleculeWriter.escape(extra[n]));
		}
		for (int n=0;n<(trans==null ? 0 : trans.length);n++)
		{
			//buff.append("["+trans[n]+"]");
			if (buff.length()>0) buff.append(',');
			buff.append(MoleculeWriter.escape(trans[n]));
		}
		return buff.toString();
	}
	
	private String[] uncompileExtra(String[] bits,boolean isTransient)
	{
		ArrayList<String> use=new ArrayList<String>();
		for (String b : bits)
		{
			if (b.startsWith("y")!=isTransient) continue;
			use.add(b);
		}
		return use.toArray(new String[use.size()]);
	}
}

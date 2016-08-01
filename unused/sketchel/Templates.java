/*
	Sketch Elements: Chemistry molecular diagram drawing tool.
	
	(c) 2005-2013 Dr. Alex M. Clark, all rights reserved
	
	Released as GNUware, under the Gnu Public License (GPL)
	
	See www.gnu.org for details.
*/

package org.sketchel;

import java.io.*;
import java.net.*;
import java.util.*;

// For obtaining the template list.

public class Templates
{
	ArrayList<Molecule> templ=new ArrayList<Molecule>();
	ArrayList<String> names=new ArrayList<String>(); // reference filenames in .jar

	public Templates(Class<?> cls) {
		// read the list of molecules from the directory file, then create each one
		// of them

		try {
			InputStream istr = null;
			istr = cls.getResourceAsStream("/templ/list");
			if (istr == null)
				istr = new FileInputStream("templ/list");
			BufferedReader in = new BufferedReader(new InputStreamReader(istr));
			String line;
			while ((line = in.readLine()) != null) {
				names.add(line);
			}
			istr.close();
		} catch (IOException e) {
			System.out
					.println("Failed to obtain list of templates:\n" + e.toString());
			return;
		}

		try {
			for (int n = 0; n < names.size(); n++) {
				InputStream istr = cls.getResourceAsStream("/templ/" + names.get(n));
				if (istr == null)
					istr = new FileInputStream("templ/" + names.get(n));
				Molecule mol = MoleculeReader.readNative(istr);
				templ.add(mol);
				istr.close();
			}
		} catch (IOException e) {
			System.out.println("Failed to obtain particular template:\n"
					+ e.toString());
			return;
		}

		// sort the molecules by an index of "complexity" (smaller molecules first,
		// carbon-only favoured)

		int[] complex = new int[templ.size()];
		for (int n = 0; n < templ.size(); n++) {
			Molecule mol = templ.get(n);
			complex[n] = mol.numAtoms() * 100;
			boolean nonCH = false;
			for (int i = 1; i <= mol.numAtoms(); i++)
				if (mol.atomElement(i).compareTo("C") != 0
						&& mol.atomElement(i).compareTo("H") != 0)
					nonCH = true;
			if (!nonCH)
				complex[n] -= 1000;
			for (int i = 1; i <= mol.numBonds(); i++)
				complex[n] = complex[n] + mol.bondOrder(i);
		}

		int p = 0;
		while (p < templ.size() - 1) {
			if (complex[p] > complex[p + 1]) {
				int i = complex[p];
				complex[p] = complex[p + 1];
				complex[p + 1] = i;
				Molecule mol = templ.get(p);
				templ.set(p, templ.get(p + 1));
				templ.set(p + 1, mol);
				String str = names.get(p);
				names.set(p, names.get(p + 1));
				names.set(p + 1, str);
				if (p > 0)
					p--;
			} else
				p++;
		}
	}
	
	public int numTemplates() {return templ.size();}
	public Molecule getTemplate(int N) {return templ.get(N);}
	public String getName(int N) {return names.get(N);}
	public void addTemplate(Molecule Mol) {templ.add(Mol); names.add(null);}
}





/*
 * Automatic Email Munger. Mungs every character of an email address into its
 * HTML entity.
 * 
 * @author Daniele Raffo
 * 
 * @version 0.3 11DEC2003
 * @version 04  13SEP2011 - rewritten by Audrius Meskauskas to use Swing.
 * 
 * This program is free software; you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation; either version 2 of the License, or
 * (at your option) any later version. This program is distributed in
 * the hope that it will be useful, but WITHOUT ANY WARRANTY; without
 * even the implied warranty of MERCHANTABILITY or FITNESS FOR A
 * PARTICULAR PURPOSE. See the GNU General Public License for more
 * details. You should have received a copy of the GNU General Public
 * License along with this program; if not, write to the Free Software
 * Foundation, Inc., 59 Temple Place, Suite 330, Boston, MA 02111-1307
 * USA
 */

package test.ultrastudio;

import java.awt.BorderLayout;
import java.awt.event.ActionEvent;
import java.awt.event.ActionListener;

import javax.swing.BorderFactory;
import javax.swing.JApplet;
import javax.swing.JButton;
import javax.swing.JCheckBox;
import javax.swing.JPanel;
import javax.swing.JScrollPane;
import javax.swing.JTextArea;
import javax.swing.JTextField;

public class AEM extends JApplet implements ActionListener {

	private static final long serialVersionUID = 1L;

	public final String INFO = "Automatic Email Munger v0.4\nCopyright 2000-2003 Daniele Raffo\n 2011 Audrius Meskauskas\n"
			+ "Please enter your email address in\nthe field and click on the button 'Obfuscate'\nFree software, GPL license\n";

	private final static String ASCII_CODE = new String(
			" !\"#$%&\'()*+,-./0123456789:;<=>?@ABCDEFGHIJKLMNOPQRSTUVWXYZ[\\]^_`abcdefghijklmnopqrstuvwxyz{|}~");

	JTextField query;
	JButton button;
	JCheckBox addlink;
	JTextArea result;

	@Override
	public void init() {

		query = new JTextField();
		button = new JButton("Obfuscate");
		addlink = new JCheckBox("Generate link", true);
		result = new JTextArea(INFO);
		query.addActionListener(this);
		result.setEditable(false);

		JPanel top = new JPanel(new BorderLayout());
		top.add(query, BorderLayout.CENTER);
		JPanel controls = new JPanel();
		controls.add(button);
		controls.add(addlink);
		top.add(controls, BorderLayout.EAST);

		setLayout(new BorderLayout());
		add(query, BorderLayout.NORTH);
		add(new JScrollPane(result), BorderLayout.CENTER);
		add(controls, BorderLayout.SOUTH);

		query.setBorder(BorderFactory
				.createTitledBorder("Enter E-mail address:"));

		result.setLineWrap(true);
		result.setWrapStyleWord(false);

		validate();

		button.addActionListener(this);
		query.addActionListener(this);
		addlink.addActionListener(this);

		addlink.setToolTipText("Generate complete HTML with 'mailto:' link");
		button.setToolTipText("Generate obfuscated link that is correctly visible through the browser");
	}

	@Override
	public void actionPerformed(ActionEvent e) {

		String email = query.getText();
		result.setText("");
		String munged = new String(toEntity(email));
		System.out.print(">>>>>>" + munged);

		if (addlink.isSelected()) {
			addItem("<a href=\"&#109;&#97;&#105;&#108;&#116;&#111;&#58;\n");
			addItem(munged + "\">\n");
			addItem(munged + "</A>");
		} else {
			addItem(munged);
		}

	}

	private void addItem(String newWord) {

		String t = result.getText();
		result.setText(t + newWord);

	}

	public static String toEntity(String source) {

		int n, length = source.length();
		StringBuffer dest = new StringBuffer();

		for (int i = 0; i < length; i++) {
			n = ASCII_CODE.indexOf(source.charAt(i));
			if (n == -1)
				dest.append(source.charAt(i));
			else {
				Integer entity = new Integer(n + 32);
				dest.append("&#" + entity.toString() + ";");
			}
		}
		return dest.toString();

	}

}
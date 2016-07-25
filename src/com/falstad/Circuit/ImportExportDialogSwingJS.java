package com.falstad.Circuit;

import java.awt.Dimension;
import java.awt.Event;
import java.awt.Point;
import java.awt.datatransfer.Clipboard;
import java.awt.event.ActionEvent;
import java.awt.event.ActionListener;

import swingjs.JSToolkit;
import swingjs.api.JSFileHandler;
import swingjs.awt.Button;
import swingjs.awt.Dialog;
import swingjs.awt.TextArea;

/**
 * 
 * @author Bob Hanson
 *
 */
class ImportExportDialogSwingJS extends Dialog implements
		ImportExportDialog, ActionListener/*, JSFileHandler*/ {
	CirSim cframe;
	Button importButton, closeButton;
	TextArea text;
	Action type;

	Clipboard clipboard = null;
	private boolean isJS;

	@SuppressWarnings("deprecation")
	ImportExportDialogSwingJS(CirSim f, Action type) {
		super(f, (type == Action.EXPORT) ? "Export" : "Import", false);
		cframe = f;
		this.type = type;
		text = new TextArea("", 10, 60);		
		/**
		 * we don't really create this dialog for a SwingJS import or export
		 * 
		 * @j2sNative
		 * 
		 *            this.isJS = true; 
		 * 
		 */
		{
		}
		if (isJS)
			return;

		setLayout(new ImportExportDialogLayout());
		add(text);
		importButton = new Button("Import");
		add(importButton);
		importButton.addActionListener(this);
		add(closeButton = new Button("Close"));
		closeButton.addActionListener(this);
		Point x = cframe.main.getLocationOnScreen();
		resize(400, 300);
		Dimension d = getSize();
		setLocation(x.x + (cframe.winSize.width - d.width) / 2, x.y
				+ (cframe.winSize.height - d.height) / 2);
	}

	@Override
	public void setDump(String dump) {
		text.setText(dump);
	}

	private static String lastName = "circuit.txt";
	
	@SuppressWarnings("unused")
	@Override
	public void execute() {
		if (isJS) {
			if (type == Action.IMPORT) {
		  /**
		   * @j2sNative
		   * 
		   * 		swingjs.JSToolkit.getFileFromDialog(this, "string");
		   */		  
			{}
			} else {
				String data = text.getText();
				String mimeType = "text/plain";
				String encoding = null;
				String fileName = null;
				String name = lastName;
				
			  /**
			   * @j2sNative
			   * 
			   * 		fileName = prompt("Enter a file name", name);
			   *    fileName && swingjs.JSToolkit.saveFile(fileName, data, mimeType, encoding);
			   */		  
				{}
			}
			dispose();
			return;
		}
		text.selectAll();
		setVisible(true);

}
	
	
//	@Override
	public void handleFileLoaded(Object data, String fileName) {
		// SwingJS asynchronous return from FileReader
		if (fileName == null)
			return;
		lastName = fileName;			
		try {
			cframe.readSetup((String) data);
		} finally {
			dispose();
		}
	}

	@Override
	public void actionPerformed(ActionEvent e) {
		int i;
		Object src = e.getSource();
		if (src == importButton) {
			{
				cframe.readSetup(text.getText());
			}
		}
		if (src == closeButton)
			setVisible(false);
	}

	@Override
	public boolean handleEvent(Event ev) {
		if (ev.id == Event.WINDOW_DESTROY) {
			cframe.main.requestFocus();
			setVisible(false);
			cframe.impDialog = null;
			return true;
		}
		return super.handleEvent(ev);
	}

}

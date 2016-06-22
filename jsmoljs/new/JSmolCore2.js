Jmol = J2S; // legacy

/////////////////////////////////////////////////////////////////////////////////////

(function(J2S) {

J2S.extend({
		db: {
			_databasePrefixes: "$=:",
			_fileLoadScript: ";if (_loadScript = '' && defaultLoadScript == '' && _filetype == 'Pdb') { select protein or nucleic;cartoons Only;color structure; select * };",
			_nciLoadScript: ";n = ({molecule=1}.length < {molecule=2}.length ? 2 : 1); select molecule=n;display selected;center selected;",
			_pubChemLoadScript: "",
			_DirectDatabaseCalls:{
				// these sites are known to implement access-control-allow-origin * 
				"cactus.nci.nih.gov": "%URL", 
				"www.rcsb.org": "%URL",
				"cdn.rcsb.org": "%URL",
				"ftp.wwpdb.org": "%URL",
				"pdbe.org": "%URL", 
				"www.ebi.ac.uk": "%URL", 
				"wwwdev.ebi.ac.uk": "%URL", 
				"pubchem.ncbi.nlm.nih.gov":"%URL",
				"http://www.nmrdb.org/tools/jmol/predict.php":"%URL",
				"$": "http://cactus.nci.nih.gov/chemical/structure/%FILENCI/file?format=sdf&get3d=True",
				"$$": "http://cactus.nci.nih.gov/chemical/structure/%FILENCI/file?format=sdf",
				"=": "http://www.rcsb.org/pdb/files/%FILE.pdb",
				"*": "http://www.ebi.ac.uk/pdbe/entry-files/download/%FILE.cif",
				"==": "http://www.rcsb.org/pdb/files/ligand/%FILE.cif",
				":": "http://pubchem.ncbi.nlm.nih.gov/rest/pug/compound/%FILE/SDF?record_type=3d"
			},
			_restQueryUrl: "http://www.rcsb.org/pdb/rest/search",
			_restQueryXml: "<orgPdbQuery><queryType>org.pdb.query.simple.AdvancedKeywordQuery</queryType><description>Text Search</description><keywords>QUERY</keywords></orgPdbQuery>",
			_restReportUrl: "http://www.pdb.org/pdb/rest/customReport?pdbids=IDLIST&customReportColumns=structureId,structureTitle"
		}
  });

	J2S._grabberOptions = [
		["$", "NCI(small molecules)"],
		[":", "PubChem(small molecules)"],
		["=", "RCSB(macromolecules)"],
		["*", "PDBe(macromolecules)"]
	];

	J2S._grabberOptions = [
		["$", "NCI(small molecules)"],
		[":", "PubChem(small molecules)"],
		["=", "RCSB(macromolecules)"],
		["*", "PDBe(macromolecules)"]
	];

	J2S._getGrabberOptions = function(applet) {
		// feel free to adjust this look to anything you want
		if (J2S._grabberOptions.length == 0)
			return ""


		var s = '<input type="text" id="ID_query" onfocus="jQuery(this).select()" onkeypress="if(13==event.which){J2S._applets[\'ID\']._search();return false}" size="32" value="" />';
		var b = '<button id="ID_submit" onclick="J2S._applets[\'ID\']._search()">Search</button></nobr>'
		if (J2S._grabberOptions.length == 1) {
			s = '<nobr>' + s + '<span style="display:none">';
			b = '</span>' + b;
		} else {
			s += '<br /><nobr>'
		}
		s += '<select id="ID_select">'
		for (var i = 0; i < J2S._grabberOptions.length; i++) {
			var opt = J2S._grabberOptions[i];
			s += '<option value="' + opt[0] + '" ' + (i == 0 ? 'selected' : '') + '>' + opt[1] + '</option>';
		}
		s = (s + '</select>' + b).replace(/ID/g, applet._id);
		return '<br />' + s;
	}

	J2S._getScriptForDatabase = function(database) {
		return (database == "$" ? J2S.db._nciLoadScript : database == ":" ? J2S.db._pubChemLoadScript : J2S.db._fileLoadScript);
	}

	 //   <dataset><record><structureId>1BLU</structureId><structureTitle>STRUCTURE OF THE 2[4FE-4S] FERREDOXIN FROM CHROMATIUM VINOSUM</structureTitle></record><record><structureId>3EUN</structureId><structureTitle>Crystal structure of the 2[4Fe-4S] C57A ferredoxin variant from allochromatium vinosum</structureTitle></record></dataset>

	J2S._setInfo = function(applet, database, data) {
		var info = [];
		var header = "";
		if (data.indexOf("ERROR") == 0)
			header = data;
		else
			switch (database) {
			case "=":
				var S = data.split("<dimStructure.structureId>");
				var info = ["<table>"];
				for (var i = 1; i < S.length; i++) {
					info.push("<tr><td valign=top><a href=\"javascript:J2S.search(" + applet._id + ",'=" + S[i].substring(0, 4) + "')\">" + S[i].substring(0, 4) + "</a></td>");
					info.push("<td>" + S[i].split("Title>")[1].split("</")[0] + "</td></tr>");
				}
				info.push("</table>");
				header = (S.length - 1) + " matches";
				break;      
			case "$": // NCI
			case ":": // pubChem
			break;
			default:
				return;
		}
		applet._infoHeader = header;
		applet._info = info.join("");
		applet._showInfo(true);
	}

	J2S._getInfoFromDatabase = function(applet, database, query){
		if (database == "====") {
			var data = J2S.db._restQueryXml.replace(/QUERY/,query);

			var info = {
				dataType: "text",
				type: "POST",
				contentType:"application/x-www-form-urlencoded",
				url: J2S.db._restQueryUrl,
				data: encodeURIComponent(data) + "&req=browser",
				success: function(data) {J2S._ajaxDone();J2S._extractInfoFromRCSB(applet, database, query, data)},
				error: function() {J2S._loadError(null)},
				async: J2S._asynchronous
			}
			return J2S._ajax(info);
		}   
		query = "?call=getInfoFromDatabase&database=" + database
				+ "&query=" + encodeURIComponent(query);
		return J2S._contactServer(query, function(data) {J2S._setInfo(applet, database, data)});
	}

	J2S._extractInfoFromRCSB = function(applet, database, query, output) {
		var n = output.length/5;
		if (n == 0)
			return; 
		if (query.length == 4 && n != 1) {
			var QQQQ = query.toUpperCase();
			var pt = output.indexOf(QQQQ);
			if (pt > 0 && "123456789".indexOf(QQQQ.substring(0, 1)) >= 0)
				output = QQQQ + "," + output.substring(0, pt) + output.substring(pt + 5);
			if (n > 50)
				output = output.substring(0, 250);
			output = output.replace(/\n/g,",");
			var url = J2S._restReportUrl.replace(/IDLIST/,output);
			J2S._loadFileData(applet, url, function(data) {J2S._setInfo(applet, database, data) });   
		}
	}

	J2S._getNCIInfo = function(identifier, what, fCallback) {
		return J2S._getFileData("http://cactus.nci.nih.gov/chemical/structure/"+identifier +"/" + (what == "name" ? "names" : what));
	}

  /**
   * _loadImage is called for asynchronous image loading.   
   * If bytes are not null, they are from a ZIP file. They are processed sychronously
   * here using an image data URI. Can all browsers handle MB of data in data URI?
   *
   */        
	J2S._loadImage = function(platform, echoName, path, bytes, fOnload, image) {
    // JmolObjectInterface  
		var id = "echo_" + echoName + path + (bytes ? "_" + bytes.length : "");
		var canvas = J2S._getHiddenCanvas(platform.vwr.html5Applet, id, 0, 0, false, true);
//    System.out.println(["JSmol.js loadImage ",id,path,canvas,image])
    if (canvas == null) { 
  		if (image == null) {
  			image = new Image();
        if (bytes == null) {
          image.onload = function() {J2S._loadImage(platform, echoName, path, null, fOnload, image)};
    			image.src = path;
          return null;
        } else {
              System.out.println("Jsmol.js J2S._loadImage using data URI for " + id) 
        }
        image.src = (typeof bytes == "string" ? bytes : 
          "data:" + JU.Rdr.guessMimeTypeForBytes(bytes) + ";base64," + JU.Base64.getBase64(bytes));
      }
  		var width = image.width;
  		var height = image.height;
      if (echoName == "webgl") {
       // will be antialiased
       width /= 2;
       height /= 2; 
      } 
		  canvas = J2S._getHiddenCanvas(platform.vwr.html5Applet, id, width, height, true, false);
  		canvas.imageWidth = width;
  		canvas.imageHeight = height;
  		canvas.id = id;
  		canvas.image=image;
  		J2S._setCanvasImage(canvas, width, height);
		// return a null canvas and the error in path if there is a problem
    } else {
      System.out.println("J2S._loadImage reading cached image for " + id) 
    }
    return (bytes == null? fOnload(canvas,path) : canvas);
	};

	
////// J2S.Swing interface  for Javascript implementation of Swing dialogs and menus

J2S.Swing = {
	// a static class
	count:0,
	menuInitialized:0,
	menuCounter:0,
	htDialogs:{}
};

(function(Swing) {

SwingController = Swing; // see javajs.api.SwingController

Swing.setDraggable = function(Obj) {
	
	var proto = Obj.prototype;
	if (proto.setContainer)
		return;
	
	// for menus, console, and 
	proto.setContainer = function(container) {
		this.container = container;
		container.obj = this;
		this.isDragging = false;
		this.ignoreMouse = false;
		var me = this;
		container.bind('mousedown touchstart', function(ev) {
			if (me.ignoreMouse) {
				me.ignoreMouse = false;
				return true;
			}
			J2S._setMouseOwner(me, true);
			me.isDragging = true;
			me.pageX = ev.pageX;
			me.pageY = ev.pageY;
			return false;
		});
		container.bind('mousemove touchmove', function(ev) {
			if (me.isDragging && J2S._mouseOwner == me) {
				me.mouseMove(ev);
				return false;
			}
		});
		container.bind('mouseup touchend', function(ev) {
			me.mouseUp(ev);
			J2S._setMouseOwner(null);
		});
	};

	proto.mouseUp = function(ev) {
		if (this.isDragging && J2S._mouseOwner == this) {
			this.pageX0 += (ev.pageX - this.pageX);
			this.pageY0 += (ev.pageY - this.pageY);
			this.isDragging = false;
			return false;
		}
		J2S._setMouseOwner(null);
	}

	proto.setPosition = function() {
		if (J2S._mousePageX === null) {
			var id = this.applet._id + "_" + (this.applet._is2D ? "canvas2d" : "canvas");
			var offsets = J2S.$offset(id);
			J2S._mousePageX = offsets.left;
			J2S._mousePageY = offsets.top;
		}
		this.pageX0 = J2S._mousePageX;
		this.pageY0 = J2S._mousePageY;
		var pos = { top: J2S._mousePageY + 'px', left: J2S._mousePageX + 'px' };
		this.container.css(pos);
	};

	proto.mouseMove = function(ev) {
		if (this.isDragging && J2S._mouseOwner == this) {
			this.timestamp = System.currentTimeMillis(); // used for menu closure
			var x = this.pageX0 + (ev.pageX - this.pageX);
			var y = this.pageY0 + (ev.pageY - this.pageY);
      J2S._mousePageX = x;
      J2S._mousePageY = y;
			this.container.css({ top: y + 'px', left: x + 'px' })
		}
	};

	proto.dragBind = function(isBind) {
		this.applet._ignoreMouse = !isBind;
		this.container.unbind('mousemoveoutjsmol');
		this.container.unbind('touchmoveoutjsmol');
		this.container.unbind('mouseupoutjsmol');
		this.container.unbind('touchendoutjsmol');
		J2S._setMouseOwner(null);
		if (isBind) {
			var me = this;
			this.container.bind('mousemoveoutjsmol touchmoveoutjsmol', function(evspecial, target, ev) {
				me.mouseMove(ev);
			});
			this.container.bind('mouseupoutjsmol touchendoutjsmol', function(evspecial, target, ev) {
				me.mouseUp(ev);
			});
		}
	};
}

// Dialog //

Swing.JSDialog = function () {
}

Swing.setDraggable(Swing.JSDialog);

///// calls from javajs and other Java-derived packages /////

Swing.getScreenDimensions = function(d) {
	d.width = $(window).width();
	d.height = $(window).height();
}

Swing.dispose = function(dialog) {
	J2S.$remove(dialog.id + "_mover");
	delete Swing.htDialogs[dialog.id]
	dialog.container.obj.dragBind(false);
//  var btns = $("#" + dialog.id + " *[id^='J']"); // add descendents with id starting with "J"
//  for (var i = btns.length; --i >= 0;)
//    delete Dialog.htDialogs[btns[i].id]
	//System.out.println("JSmolCore.js: dispose " + dialog.id)
}
 
Swing.register = function(dialog, type) {
	dialog.id = type + (++Swing.count);
	Swing.htDialogs[dialog.id] = dialog;
	//System.out.println("JSmolCore.js: register " + dialog.id)

}

Swing.setDialog = function(dialog) {
	J2S._setMouseOwner(null);
	J2S.$remove(dialog.id);
	//System.out.println("removed " + dialog.id)
	var id = dialog.id + "_mover";
	var container = J2S._$(id);
	var jd;
	//System.out.println("JSmolCore.js: setDialog " + dialog.id);
	if (container[0]) {
		container.html(dialog.html);
		jd = container[0].jd;
	} else {
		J2S.$after("body","<div id='" + id + "' style='position:absolute;left:0px;top:0px;'>" + dialog.html + "</div>");
		var jd = new Swing.JSDialog();
		container = J2S._$(id);
		dialog.container = container;
		jd.applet = dialog.manager.vwr.html5Applet;
		jd.setContainer(container);
		jd.dialog = dialog;
		jd.setPosition();  
		jd.dragBind(true);
		container[0].jd = jd; 
	}
	J2S.$bind("#" + dialog.id + " .JButton", "mousedown touchstart", function(event) { jd.ignoreMouse=true });
	J2S.$bind("#" + dialog.id + " .JComboBox", "mousedown touchstart", function(event) { jd.ignoreMouse=true });
	J2S.$bind("#" + dialog.id + " .JCheckBox", "mousedown touchstart", function(event) { jd.ignoreMouse=true });
	J2S.$bind("#" + dialog.id + " .JTextField", "mousedown touchstart", function(event) { jd.ignoreMouse=true });
	J2S.$bind("#" + dialog.id + " .JTable", "mousedown touchstart", function(event) { jd.ignoreMouse=true });
	J2S.$bind("#" + dialog.id + " .JScrollPane", "mousedown touchstart", function(event) { jd.ignoreMouse=true });
	J2S.$bind("#" + dialog.id + " .JEditorPane", "mousedown touchstart", function(event) { jd.ignoreMouse=true });

}
 
Swing.setSelected = function(chk) {
 J2S.$prop(chk.id, 'checked', !!chk.selected);
}

Swing.setSelectedIndex = function(cmb) {
 J2S.$prop(cmb.id, 'selectedIndex', cmb.selectedIndex);
}

Swing.setText = function(btn) {
 J2S.$prop(btn.id, 'value', btn.text);
}

Swing.setVisible = function(c) {
	J2S.$setVisible(c.id, c.visible);
}

Swing.setEnabled = function(c) {
	J2S.$setEnabled(c.id, c.enabled);
}

/// callbacks from the HTML elements ////
 
Swing.click = function(element, keyEvent) {
	var component = Swing.htDialogs[element.id];
	if (component) {
		//System.out.println("click " + element + " " + component)
		var info = component.toString();
		// table cells will have an id but are not registered
		if (info.indexOf("JCheck") >= 0) {
				component.selected = element.checked;
		} else if (info.indexOf("JCombo") >= 0) {
			component.selectedIndex = element.selectedIndex;
		} else if (component.text != null) {  // JButton, JTextField
			component.text = element.value;
			if (keyEvent && ((keyEvent.charCode || keyEvent.keyCode) != 13))
				return;
		}    
	}
	var dialog = Swing.htDialogs[J2S.$getAncestorDiv(element.id, "JDialog").id];
	var key = (component ? component.name :  dialog.registryKey + "/" + element.id);
	//System.out.println("JSmolCore.js: click " + key); 
	dialog.manager.actionPerformed(key);
}

Swing.setFront = function(dialog) {
  var applet = dialog.manager.vwr.html5Applet;
	if (dialog.zIndex != J2S._getZ(applet, "dialog"))
	 dialog.zIndex = J2S._incrZ(applet, "dialog");
	dialog.container && ((dialog.container[0] || dialog.container).style.zIndex = dialog.zIndex);
}

Swing.hideMenus = function(applet) {
	// called from LEFT-DOWN mouse event
	var menus = applet._menus;
	if (menus)
		for (var i in menus)
			if (menus[i].visible)
				Swing.hideMenu(menus[i]);
}

Swing.windowClosing = function(element) {
	var dialog = Swing.htDialogs[J2S.$getAncestorDiv(element.id, "JDialog").id];
	if (dialog.registryKey) {
		//System.out.println("JSmolCore.js: windowClosing " + dialog.registryKey); 
		dialog.manager.processWindowClosing(dialog.registryKey);
	} else {
		//System.out.println("JSmolCore.js: windowClosing " + dialog.title); 
		dialog.dispose();
	}
}

})(J2S.Swing);


	J2S._setQueryTerm = function(applet, query) {
		if (!query || !applet._hasOptions || query.substring(0, 7) == "http://")
			return;
		if (J2S._isDatabaseCall(query)) {
			var database = query.substring(0, 1);
			query = query.substring(1);
			if (query.substring(0,1) == database && "=$".indexOf(database) >= 0)
				query = query.substring(1);
			var d = J2S._getElement(applet, "select");
			if (d && d.options)
				for (var i = 0; i < d.options.length; i++)
					if (d[i].value == database)
						d[i].selected = true;
		}
		J2S.$val(J2S.$(applet, "query"), query);
	}

	J2S._search = function(applet, query, script) {
		arguments.length > 1 || (query = null);
		J2S._setQueryTerm(applet, query);
		query || (query = J2S.$val(J2S.$(applet, "query")))
		if (query.indexOf("!") == 0) {
		// command prompt in this box as well
		// remove exclamation point "immediate" indicator
			applet._script(query.substring(1));
			return;
		} 
		query && (query = query.replace(/\"/g, ""));
		applet._showInfo(false);
		J2S._searchMol(applet, query, script, true);
	}

	J2S._searchMol = function(applet, query, script, checkView) {
		var database;
		if (J2S._isDatabaseCall(query)) {
			database = query.substring(0, 1);
			query = query.substring(1);
		} else {
			database = (applet._hasOptions ? J2S.$val(J2S.$(applet, "select")) : "$");
		}
		if (database == "=" && query.length == 3)
			query = "=" + query; // this is a ligand      
		var dm = database + query;
		if (!query || dm.indexOf("?") < 0 && dm == applet._thisJmolModel) {
			return;    
		}
		applet._thisJmolModel = dm;
		var view;
		if (checkView && applet._viewSet != null && (view = J2S.View.__findView(applet._viewSet, {chemID:dm})) != null) {
			J2S.View.__setView(view, applet, false);
			return;
		}

		if (database == "$" || database == ":")
			applet._jmolFileType = "MOL";
		else if (database == "=")
			applet._jmolFileType = "PDB";
		applet._searchDatabase(query, database, script);
	}

	J2S._searchDatabase = function(applet, query, database, script) {
		applet._showInfo(false);
		if (query.indexOf("?") >= 0) {
			J2S._getInfoFromDatabase(applet, database, query.split("?")[0]);
			return true;
		}
		if (J2S.db._DirectDatabaseCalls[database]) {
			applet._loadFile(database + query, script);
			return true;
		}
		return false;
	}

	J2S._getFileType = function(name) {
		var database = name.substring(0, 1);
		if (database == "$" || database == ":")
			return "MOL";
		if (database == "=")
			return (name.substring(1,2) == "=" ? "LCIF" : "PDB");
		// just the extension, which must be PDB, XYZ..., CIF, or MOL
		name = name.split('.').pop().toUpperCase();
		return name.substring(0, Math.min(name.length, 3));
	};


	J2S._getFileType = function(name) {
		var database = name.substring(0, 1);
		if (database == "$" || database == ":")
			return "MOL";
		if (database == "=")
			return (name.substring(1,2) == "=" ? "LCIF" : "PDB");
		// just the extension, which must be PDB, XYZ..., CIF, or MOL
		name = name.split('.').pop().toUpperCase();
		return name.substring(0, Math.min(name.length, 3));
	};

J2S._getInChIKey = function(applet, data) {
	if (data.indexOf("MOL=") >= 0)
		data = data.split("MOL=")[1].split("\"")[0];

}

J2S.User = {
	viewUpdatedCallback: null
}

J2S.View = {

// The objective of J2S.View is to coordinate
// asynchronous applet loading and atom/peak picking
// among any combination of Jmol, JME, and JSV.
// 
// basic element is a view object:
//   view = {
//     viewType1: viewRecord1,
//     viewType2: viewRecord2,
//     viewType3: viewRecord3
//   }
// where viewType is one of (Jmol, JME, JSV)
// and a viewRecord is an object
// with elements .chemID, .applet, .data, .script
//
// J2S.View.sets is a list of cached views[0..n]
// for a given group of applet objects with common Info.viewSet
//
// Bob Hanson 1/22/2014 7:05:38 AM

	count: 0,
	applets: {},
	sets: {}
};

(function(View) {

// methods called from other modules have no "_" in their name

View.updateView = function(applet, Info, _View_updateView) {
	// Info.chemID, Info.data, possibly Info.viewID if no chemID
	// return from applet after asynchronous download of new data
	if (applet._viewSet == null)
		return;
	Info.chemID || (applet._searchQuery = null);
	Info.data || (Info.data = "N/A");
	Info.type = applet._viewType;
	if((applet._currentView = View.__findView(applet._viewSet, Info)) == null)
		applet._currentView = View.__createViewSet(applet._viewSet, Info.chemID, Info.viewID || Info.chemID);
	applet._currentView[Info.type].data = Info.data;
	applet._currentView[Info.type].smiles = applet._getSmiles();
	if (J2S.User.viewUpdatedCallback)
		J2S.User.viewUpdatedCallback(applet, "updateView");
	View.__setView(applet._currentView, applet, false);
}

View.updateFromSync = function(applet, msg) {
	applet._updateMsg = msg;
	var id = J2S._getAttr(msg, "sourceID") || J2S._getAttr(msg, "file");
	if (!id)
		return;
	var view = View.__findView(applet._viewSet, {viewID:id});
	if (view == null)
		return J2S.updateView(applet, msg); // JSV has been updated internally
	if (view != applet._currentView)
		View.__setView(view, applet, true);
	var A = ((id = J2S._getAttr(msg, "atoms")) && msg.indexOf("selectionhalos ON") >= 0  
		? eval("[" + id + "]") : []);
	setTimeout(function(){if (applet._currentView == view)View.updateAtomPick(applet, A)}, 10);
	if (J2S.User.viewUpdatedCallback)
		J2S.User.viewUpdatedCallback(applet, "updateFromSync");
}

View.updateAtomPick = function(applet, A, _View_updateAtomPick) {
	var view = applet._currentView;
	if (view == null)
		return;
	for (var viewType in view) {
		if (viewType != "info" && view[viewType].applet != applet)
			view[viewType].applet._updateAtomPick(A);
	}
	if (J2S.User.viewUpdatedCallback)
		J2S.User.viewUpdatedCallback(applet, "updateAtomPick");
}

View.dumpViews = function(setID) {
	var views = View.sets[setID];
	if (!views)
	  return;
	var s = "View set " + setID + ":\n";
	var applets = View.applets[setID];
	for (var i in applets)
		s += "\napplet " + applets[i]._id
			+ " currentView=" + (applets[i]._currentView ? applets[i]._currentView.info.viewID : null);
	for (var i = views.length; --i >= 0;) {
		var view = views[i];
		s += "\n\n<b>view=" + i 
			+ " viewID=" + view.info.viewID 
			+ " chemID=" + view.info.chemID + "</b>\n"
		var v;
		for (var viewType in view) 
			if (viewType != "info")
				s += "\nview=" + i + " type=" + viewType + " applet=" 
					+ ((v = view[viewType]).applet ? v.applet._id : null) 
					+ " SMILES=" + v.smiles + "\n"
					+ " atomMap=" + JSON.stringify(v.atomMap) + "\n"
					+ " data=\n" + v.data + "\n"
	}
	return s
}


// methods starting with "__" are "private" to JSmolCore.js

View.__init = function(applet) {
  var set = applet._viewSet;
	var a = View.applets;
	a[set] || (a[set] = {});
	a[set][applet._viewType] = applet;
}

View.__findView = function(set, Info) {
	var views = View.sets[set];
	if (views == null)
		views = View.sets[set] = [];
	for (var i = views.length; --i >= 0;) {
		var view = views[i];
		if (Info.viewID) {
			if (view.info.viewID == Info.viewID)
				return view;
		} else if (Info.chemID != null && Info.chemID == view.info.chemID) {
				return view;
		} else {
			for (var viewType in view) { 
				if (viewType != "info") {
					if (Info.data != null && view[viewType].data != null ? Info.data == view[viewType].data 
						: Info.type == viewType)
							return view;
				}
			}
		}
	}
	return null;  
}

View.__createViewSet = function(set, chemID, viewID, _createViewSet) {
	View.count++;
	var view = {info:{chemID: chemID, viewID: viewID || "model_" + View.count}};

	for (var id in J2S._applets) {
		var a = J2S._applets[id];
		if (a._viewSet == set)
			view[a._viewType] = {applet:a, data: null};
	}
	View.sets[set].push(view);
	return view;
}

View.__setView = function(view, applet, isSwitch, _setView) {
	// called from J2S._searchMol and J2S.View.setCurrentView 
	// to notify the applets in the set that there may be new data for them
	// skip the originating applet itself and cases where the data has not changed.
	// stop at first null data, because that will initiate some sort of asynchronous
	// call that will be back here afterward.

	for (var viewType in view) {
			if (viewType == "info") 
				continue;
		var rec = view[viewType];
		var a = rec.applet;
		var modified = (isSwitch || a != null && a._molData == "<modified>");

		if (a == null || a == applet && !modified)
			continue; // may be a mol3d required by JSV but not having a corresponding applet
		var wasNull = (rec.data == null);
		var haveView = (a._currentView != null);
		a._currentView = view; 
		if (haveView && view[viewType].data == rec.data && !wasNull & !modified)
			continue;
		a._loadModelFromView(view);
		if (wasNull)
			break;
	}

	// Either all are taken care of or one was null,
	// in which case we have started an asynchronous
	// process to get the data, and we can quit here.
	// In either case, we are done.
}



}) (J2S.View);

}) (J2S);


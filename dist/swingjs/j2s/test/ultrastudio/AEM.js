Clazz.declarePackage ("test.ultrastudio");
Clazz.load (["java.awt.event.ActionListener", "javax.swing.JApplet"], "test.ultrastudio.AEM", ["java.awt.BorderLayout", "java.lang.StringBuffer", "javax.swing.BorderFactory", "$.JButton", "$.JCheckBox", "$.JPanel", "$.JScrollPane", "$.JTextArea", "$.JTextField"], function () {
c$ = Clazz.decorateAsClass (function () {
this.INFO = "Automatic Email Munger v0.4\nCopyright 2000-2003 Daniele Raffo\n 2011 Audrius Meskauskas\nPlease enter your email address in\nthe field and click on the button \'Obfuscate\'\nFree software, GPL license\n";
this.query = null;
this.button = null;
this.addlink = null;
this.result = null;
Clazz.instantialize (this, arguments);
}, test.ultrastudio, "AEM", javax.swing.JApplet, java.awt.event.ActionListener);
Clazz.overrideMethod (c$, "init", 
function () {
this.query =  new javax.swing.JTextField ();
this.button =  new javax.swing.JButton ("Obfuscate");
this.addlink =  new javax.swing.JCheckBox ("Generate link", true);
this.result =  new javax.swing.JTextArea ("Automatic Email Munger v0.4\nCopyright 2000-2003 Daniele Raffo\n 2011 Audrius Meskauskas\nPlease enter your email address in\nthe field and click on the button \'Obfuscate\'\nFree software, GPL license\n");
this.query.addActionListener (this);
this.result.setEditable (false);
var top =  new javax.swing.JPanel ( new java.awt.BorderLayout ());
top.add (this.query, "Center");
var controls =  new javax.swing.JPanel ();
controls.add (this.button);
controls.add (this.addlink);
top.add (controls, "East");
this.setLayout ( new java.awt.BorderLayout ());
this.add (this.query, "North");
this.add ( new javax.swing.JScrollPane (this.result), "Center");
this.add (controls, "South");
this.query.setBorder (javax.swing.BorderFactory.createTitledBorder ("Enter E-mail address:"));
this.result.setLineWrap (true);
this.result.setWrapStyleWord (false);
this.validate ();
this.button.addActionListener (this);
this.query.addActionListener (this);
this.addlink.addActionListener (this);
this.addlink.setToolTipText ("Generate complete HTML with 'mailto:' link");
this.button.setToolTipText ("Generate obfuscated link that is correctly visible through the browser");
});
Clazz.overrideMethod (c$, "actionPerformed", 
function (e) {
var email = this.query.getText ();
this.result.setText ("");
var munged =  String.instantialize (test.ultrastudio.AEM.toEntity (email));
System.out.print (">>>>>>" + munged);
if (this.addlink.isSelected ()) {
this.addItem ("<a href=\"&#109;&#97;&#105;&#108;&#116;&#111;&#58;\n");
this.addItem (munged + "\">\n");
this.addItem (munged + "</A>");
} else {
this.addItem (munged);
}}, "java.awt.event.ActionEvent");
Clazz.defineMethod (c$, "addItem", 
 function (newWord) {
var t = this.result.getText ();
this.result.setText (t + newWord);
}, "~S");
c$.toEntity = Clazz.defineMethod (c$, "toEntity", 
function (source) {
var n;
var length = source.length;
var dest =  new StringBuffer ();
for (var i = 0; i < length; i++) {
n = test.ultrastudio.AEM.ASCII_CODE.indexOf (source.charAt (i));
if (n == -1) dest.append (source.charAt (i));
 else {
var entity =  new Integer (n + 32);
dest.append ("&#" + entity.toString () + ";");
}}
return dest.toString ();
}, "~S");
c$.ASCII_CODE = c$.prototype.ASCII_CODE =  String.instantialize (" !\"#$%&\'()*+,-./0123456789:;<=>?@ABCDEFGHIJKLMNOPQRSTUVWXYZ[\\]^_`abcdefghijklmnopqrstuvwxyz{|}~");
});

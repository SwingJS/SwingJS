Clazz.declarePackage ("test.ultrastudio");
Clazz.load (["java.awt.event.ActionListener", "javax.swing.JApplet", "$.JRadioButton", "$.JTextArea"], "test.ultrastudio.ReverseComplementApplet", ["java.awt.GridLayout", "javax.swing.ButtonGroup", "$.JButton", "$.JLabel", "$.JPanel", "$.JScrollPane"], function () {
c$ = Clazz.decorateAsClass (function () {
this.rbDNA = null;
this.rbRNA = null;
this.taSequence = null;
this.cdna = null;
this.crna = null;
Clazz.instantialize (this, arguments);
}, test.ultrastudio, "ReverseComplementApplet", javax.swing.JApplet, java.awt.event.ActionListener);
Clazz.prepareFields (c$, function () {
this.rbDNA =  new javax.swing.JRadioButton ("DNA");
this.rbRNA =  new javax.swing.JRadioButton ("RNA");
this.taSequence =  new javax.swing.JTextArea ();
this.cdna =  Clazz.newCharArray (123, '\0');
this.crna =  Clazz.newCharArray (123, '\0');
});
Clazz.overrideMethod (c$, "init", 
function () {
for (var x = String.fromCharCode (0); x <= 'z'; x = String.fromCharCode (x.charCodeAt (0) + 1)) this.cdna[x.charCodeAt (0)] = x;

this.cdna['a'.charCodeAt (0)] = 't';
this.cdna['A'.charCodeAt (0)] = 'T';
this.cdna['g'.charCodeAt (0)] = 'c';
this.cdna['G'.charCodeAt (0)] = 'C';
this.cdna['c'.charCodeAt (0)] = 'g';
this.cdna['C'.charCodeAt (0)] = 'G';
this.cdna['t'.charCodeAt (0)] = 'a';
this.cdna['T'.charCodeAt (0)] = 'A';
this.cdna['U'.charCodeAt (0)] = 'A';
this.cdna['u'.charCodeAt (0)] = 'a';
this.cdna['R'.charCodeAt (0)] = 'y';
this.cdna['r'.charCodeAt (0)] = 'Y';
this.cdna['Y'.charCodeAt (0)] = 'R';
this.cdna['y'.charCodeAt (0)] = 'r';
this.cdna['K'.charCodeAt (0)] = 'M';
this.cdna['k'.charCodeAt (0)] = 'm';
this.cdna['M'.charCodeAt (0)] = 'K';
this.cdna['m'.charCodeAt (0)] = 'k';
this.cdna['B'.charCodeAt (0)] = 'V';
this.cdna['b'.charCodeAt (0)] = 'v';
this.cdna['V'.charCodeAt (0)] = 'B';
this.cdna['v'.charCodeAt (0)] = 'b';
this.cdna['D'.charCodeAt (0)] = 'H';
this.cdna['d'.charCodeAt (0)] = 'h';
this.cdna['H'.charCodeAt (0)] = 'D';
this.cdna['h'.charCodeAt (0)] = 'd';
System.arraycopy (this.cdna, 0, this.crna, 0, this.cdna.length);
this.crna['a'.charCodeAt (0)] = 'u';
this.crna['A'.charCodeAt (0)] = 'U';
var bReverseComplement =  new javax.swing.JButton ("Reverse complement");
var bg =  new javax.swing.ButtonGroup ();
bg.add (this.rbDNA);
bg.add (this.rbRNA);
this.rbDNA.setSelected (true);
this.taSequence.setFont ( new javax.swing.JLabel ().getFont ());
var top =  new javax.swing.JPanel ( new java.awt.GridLayout (1, 3));
top.add ( new javax.swing.JLabel ("Mollecule: ", 0));
top.add (this.rbDNA);
top.add (this.rbRNA);
var bottom =  new javax.swing.JPanel ();
bottom.add (bReverseComplement);
this.rbDNA.setToolTipText ("Assume DNA (use T)");
this.rbRNA.setToolTipText ("Assume RNA (use U)");
this.add (top, "North");
this.add ( new javax.swing.JScrollPane (this.taSequence), "Center");
this.add (bottom, "South");
bReverseComplement.addActionListener (this);
});
Clazz.overrideMethod (c$, "actionPerformed", 
function (e) {
var translate = this.rbDNA.isSelected () ? this.cdna : this.crna;
var seq = this.taSequence.getText ();
var complement =  Clazz.newCharArray (seq.length, '\0');
var c;
var reverse;
for (var i = 0; i < seq.length; i++) {
reverse = seq.length - i - 1;
c = seq.charAt (i);
complement[reverse] = translate[c.charCodeAt (0)];
}
this.taSequence.setText ( String.instantialize (complement));
}, "java.awt.event.ActionEvent");
});

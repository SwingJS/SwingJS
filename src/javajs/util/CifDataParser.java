package javajs.util;

import java.io.BufferedReader;

import java.util.Hashtable;

import java.util.Map;

import javajs.api.GenericCifDataParser;
import javajs.api.GenericLineReader;



public class CifDataParser implements GenericCifDataParser {
  /**
   *
   * A special tokenizer class for dealing with quoted strings in CIF files.
   * 
   * Greek letters implemented in Jmol 13.3.9 and only for 
   * titles and space groups. All other mark ups ignored.
   * 
   *<p>
   * regarding the treatment of single quotes vs. primes in
   * cif file, PMR wrote:
   *</p>
   *<p>
   *   * There is a formal grammar for CIF
   * (see http://www.iucr.org/iucr-top/cif/index.html)
   * which confirms this. The textual explanation is
   *<p />
   *<p>
   * 14. Matching single or double quote characters (' or ") may
   * be used to bound a string representing a non-simple data value
   * provided the string does not extend over more than one line.
   *<p />
   *<p>
   * 15. Because data values are invariably separated from other
   * tokens in the file by white space, such a quote-delimited
   * character string may contain instances of the character used
   * to delimit the string provided they are not followed by white
   * space. For example, the data item
   *<code>
   *  _example  'a dog's life'
   *</code>
   * is legal; the data value is a dog's life.
   *</p>
   *<p>
   * [PMR - the terminating character(s) are quote+whitespace.
   * That would mean that:
   *<code>
   *  _example 'Jones' life'
   *</code>
   * would be an error
   *</p>
   *<p>
   * The CIF format was developed in that late 1980's under the aegis of the
   * International Union of Crystallography (I am a consultant to the COMCIFs 
   * committee). It was ratified by the Union and there have been several 
   * workshops. mmCIF is an extension of CIF which includes a relational 
   * structure. The formal publications are:
   *</p>
   *<p>
   * Hall, S. R. (1991). "The STAR File: A New Format for Electronic Data 
   * Transfer and Archiving", J. Chem. Inform. Comp. Sci., 31, 326-333.
   * Hall, S. R., Allen, F. H. and Brown, I. D. (1991). "The Crystallographic
   * Information File (CIF): A New Standard Archive File for Crystallography",
   * Acta Cryst., A47, 655-685.
   * Hall, S.R. & Spadaccini, N. (1994). "The STAR File: Detailed 
   * Specifications," J. Chem. Info. Comp. Sci., 34, 505-508.
   *</p>
   */
  private GenericLineReader reader;
  private BufferedReader br;

  private String line;  
  private String str;
  private int ich;
  private int cch;
  private boolean wasUnQuoted;
  private String strPeeked;
  private int ichPeeked;
  private int fieldCount;
  private String[] loopData;
  private SB fileHeader = new SB();
  private boolean isHeader = true;
  private String nullString = "\0";

  /**
   * Set the string value of what is returned for "." and "?"
   * 
   * @param nullString null here returns "." and "?"; default is "\0"
   * 
   */
  public void setNullValue(String nullString) {
    this.nullString  = nullString;    
  }

  /**
   * A global, static map that contains field information. The assumption is that
   * if we read a set of fields for, say, atom_site, once in a lifetime, then
   * that should be good forever. Those are static lists. Or should be....
   */
  private static Map<String, Integer> htFields = new Hashtable<String, Integer>();
  
  ////////////////////////////////////////////////////////////////
  // special tokenizer class
  ////////////////////////////////////////////////////////////////

  public CifDataParser() {
    // for reflection
  }
    
  private String[] fields;

  @Override
  public String getLoopData(int i) {
    return loopData[i];
  }

  @Override
  public int getFieldCount() {
    return fieldCount;
  }

  @Override
  public String getField(int i) {
    return fields[i];
  }

  /**
   * A Chemical Information File data parser.
   * 
   * Should be called immediately upon construction.
   *  
   * Two options; one of reader or br should be null, or reader will be
   * ignored. Just simpler this way...
   * 
   * @param reader  Anything that can deliver a line of text or null
   * @param br      A standard BufferedReader.
   *  
   */
  @Override
  public CifDataParser set(GenericLineReader reader, BufferedReader br) {
    this.reader = reader;
    this.br = br;
    return this;
  }

  /**
   * 
   * @return commented-out section at the start of a CIF file.
   * 
   */
  @Override
  public String getFileHeader() {
    return fileHeader.toString();
  }
  
  
  /**
   * Parses all CIF data for a reader defined in the constructor
   * into a standard Map structure and close the BufferedReader if
   * it exists. 
   * 
   * @return Hashtable of models Vector of Hashtable data
   */
  @Override
  public Map<String, Object> getAllCifData() {
    line = "";
    String key;
    Map<String, Object> data = null;
    Map<String, Object> allData = new Hashtable<String, Object>();
    Lst<Map<String, Object>> models = new  Lst<Map<String,Object>>();
    allData.put("models", models);
    try {
      while ((key = getNextToken()) != null) {
        if (key.startsWith("global_") || key.startsWith("data_")) {
          models.addLast(data = new Hashtable<String, Object>());
          data.put("name", key);
          continue;
        }
        if (key.startsWith("loop_")) {
          getAllCifLoopData(data);
          continue;
        }
        if (key.charAt(0) != '_') {
          System.out.println("CIF ERROR ? should be an underscore: " + key);
        } else {
          String value = getNextToken();
          if (value == null) {
            System.out.println("CIF ERROR ? end of file; data missing: " + key);
          } else {
            data.put(fixKey(key), value);
          }
        }
      }
    } catch (Exception e) {
      // ?
    }
    try {
      if (br != null)
        br.close();
    } catch (Exception e) {
      // ?
    }
    return allData;
  }

  /**
   * create our own list of keywords and for each one create a list
   * of data associated with that keyword. For example, a list of all 
   * x coordinates, then a list of all y coordinates, etc.
   * 
   * @param data
   * @throws Exception
   */
  @SuppressWarnings("unchecked")
  private void getAllCifLoopData(Map<String, Object> data) throws Exception {
    String key;
    Lst<String> keyWords = new  Lst<String>();
    while ((key = peekToken()) != null && key.charAt(0) == '_') {
      key = fixKey(getTokenPeeked());
      keyWords.addLast(key);
      data.put(key, new  Lst<String>());
    }
    fieldCount = keyWords.size();
    if (fieldCount == 0)
      return;
    loopData = new String[fieldCount];
    while (getData())
      for (int i = 0; i < fieldCount; i++)
        ((Lst<String>)data.get(keyWords.get(i))).addLast(loopData[i]);
  }

  @Override
  public String readLine() {
    try {
      line = (reader == null ? br.readLine() : reader.readNextLine());
      if (line == null)
        return null;
      if (isHeader) {
        if (line.startsWith("#"))
          fileHeader.append(line).appendC('\n');
        else
          isHeader = false;
      }
      return line;
    } catch (Exception e) {
      return null;
    }
  }
  
  /**
   * The work horse; a general reader for loop data.
   * Fills loopData with fieldCount fields.
   * 
   * @return false if EOF
   * @throws Exception
   */
  @Override
  public boolean getData() throws Exception {
    // line is already present, and we leave with the next line to parse
    for (int i = 0; i < fieldCount; ++i)
      if ((loopData[i] = getNextDataToken()) == null)
        return false;
    return (fieldCount > 0);
  }

  /**
   * 
   * Skips all associated loop data. (Skips to next control word.)
   * 
   * @throws Exception
   */
  @Override
  public void skipLoop() throws Exception {
    String str;
    while ((str = peekToken()) != null && str.charAt(0) == '_')
      getTokenPeeked();
    while (getNextDataToken() != null) {
    }
  }

  /**
   * 
   * @return the next token of any kind, or null
   * @throws Exception
   */
  @Override
  public String getNextToken() throws Exception {
    while (!strHasMoreTokens())
      if (setStringNextLine() == null)
        return null;
    return nextStrToken();
  }

  /**
   * 
   * first checks to see if the next token is an unquoted
   * control code, and if so, returns null 
   * 
   * @return next data token or null
   * @throws Exception
   */
  @Override
  public String getNextDataToken() throws Exception { 
    String str = peekToken();
    if (str == null)
      return null;
    if (wasUnQuoted)
      if (str.charAt(0) == '_' || str.startsWith("loop_")
          || str.startsWith("data_")
          || str.startsWith("stop_")
          || str.startsWith("global_"))
        return null;
    return getTokenPeeked();
  }
  
  /**
   * Just look at the next token. Saves it for retrieval 
   * using getTokenPeeked()
   * 
   * @return next token or null if EOF
   * @throws Exception
   */
  @Override
  public String peekToken() throws Exception {
    while (!strHasMoreTokens())
      if (setStringNextLine() == null)
        return null;
    int ich = this.ich;
    strPeeked = nextStrToken();
    ichPeeked= this.ich;
    this.ich = ich;
    return strPeeked;
  }
  
  /**
   * 
   * @return the token last acquired; may be null
   */
  @Override
  public String getTokenPeeked() {
    ich = ichPeeked;
    return strPeeked;
  }
  
  /**
   * Used especially for data that might be multi-line data that
   * might have unwanted white space at start or end.
   * 
   * @param str
   * @return str without any leading/trailing white space, and no '\n'
   */
  @Override
  public String fullTrim(String str) {
    int pt0 = -1;
    int pt1 = str.length();
    while (++pt0 < pt1 && PT.isWhitespace(str.charAt(pt0))) {
    }
    while (--pt1 > pt0 && PT.isWhitespace(str.charAt(pt1))) {      
    }
    return str.substring(pt0, pt1 + 1);
  }

  private final static String grABC =
      "ABX\u0394E\u03A6\u0393H"   // ABCDEFGH
      + "I_K\u039BMNO\u03A0"      // I_KLMNOP
      + "\u0398P\u03A3TY_\u03A9\u039E\u03A5Z"; // QRSTU_WXYZ
  private final static String grabc =
      "\u03B1\u03B2\u03C7\u03A4\u03A5\u03C6\u03B3\u03B7" // abcdefgh
      + "\u03B9_\u03BA\u03BB\u03BC\u03BD\u03BF\u03C0"    // i_klmnop
      + "\u03B8\u03C1\u03C3\u03C4\u03C5_\u03C9\u03BE\u03C5\u03B6"; // qrstu_wxyz

  /**
   * Only translating the basic Greek set here, not all the other stuff. See
   * http://www.iucr.org/resources/cif/spec/version1.1/semantics#markup
   * 
   * @param data
   * @return cleaned string
   */
  @Override
  public String toUnicode(String data) {
    int pt;
    try {
      while ((pt = data.indexOf('\\')) >= 0) {
        int c = data.charAt(pt + 1);
        String ch = (c >= 65 && c <= 90 ? grABC.substring(c - 65, c - 64)
            : c >= 97 && c <= 122 ? grabc.substring(c - 97, c - 96) : "_");
        data = data.substring(0, pt) + ch + data.substring(pt + 2);
      }
    } catch (Exception e) {
      // ignore
    }

    return data;
  }

  /**
   * Passing an array of field names, this method fills two arrays. 
   * The first, fieldOf, identifies 
   * It does this by first creating a map of names to their indices in fields[].
   * 
   * Alternatively, if fields is null, then a private array is filled, in order, 
   * with key data. This is used in cases such as matrices for which there are simply
   * too many possibilities to list, and the key name itself contains the x-y 
   * information that we need.
   * 
   */
   @Override
  public int parseLoopParameters(String[] fields, int[] fieldOf, int[] propertyOf) throws Exception {
     int propertyCount = 0;
     if (fields == null) {
       // for reading full list of keys, as for matrices
       this.fields = new String[100];
     } else {
       if (!htFields.containsKey(fields[0]))
         for (int i = fields.length; --i >= 0;)
           htFields.put(fields[i], Integer.valueOf(i));
       for (int i = fields.length; --i >= 0;)
         fieldOf[i] = NONE;
       propertyCount = fields.length;
     }
     fieldCount = 0;
     while (true) {
       String str = peekToken();
       if (str == null) {
         // we are PREMATURELY done; reset
         fieldCount = 0;
         break;
       }
       // end of the loop is a new token starting with underscore
       if (str.charAt(0) != '_')
         break;
       
       int pt = fieldCount++;
       str = fixKey(getTokenPeeked());
       if (fields == null) {
         // just make a linear model, saving the list
         this.fields[propertyOf[pt] = fieldOf[pt] = pt] = str;
         continue;
       }
       Integer iField = htFields.get(str);
       int i = (iField == null ? NONE : iField.intValue());
       if ((propertyOf[pt] = i) != NONE)
         fieldOf[i] = pt;
     }
     if (fieldCount > 0)
       loopData = new String[fieldCount];
     return propertyCount;
  }

  @Override
  public String fixKey(String key) {
    // PRELIMINARY -- BilBao _magnetic
    // PRELIMINARY -- Jana2006
    return (PT.rep(
        key.startsWith("_magnetic") ? key.substring(9) 
            : key.startsWith("_jana") ? key.substring(5) 
            : key, ".", "_").toLowerCase());
  }

  //////////////////// private methods ////////////////////
  
  
  /**
   * sets a string to be parsed from the beginning
   * 
   * @param str
   */
  private void setString(String str) {
    this.str = line = str;
    cch = (str == null ? 0 : str.length());
    ich = 0;
  }

  /*
   * http://www.iucr.org/resources/cif/spec/version1.1/cifsyntax
   * 
   * 17. The special sequence of end-of-line followed 
   * immediately by a semicolon in column one (denoted "<eol>;") 
   * may also be used as a delimiter at the beginning and end 
   * of a character string comprising a data value. The complete 
   * bounded string is called a text field, and may be used to 
   * convey multi-line values. The end-of-line associated with 
   * the closing semicolon does not form part of the data value. 
   * Within a multi-line text field, leading white space within 
   * text lines must be retained as part of the data value; trailing 
   * white space on a line may however be elided.
   * 
   * 18. A text field delimited by the <eol>; digraph may not 
   * include a semicolon at the start of a line of text as 
   * part of its value.
   * 
   * 20. For example, the data value foo may be expressed 
   * equivalently as an unquoted string foo, as a quoted 
   * string 'foo' or as a text field
   *
   *;foo
   *;
   *
   * By contrast the value of the text field
   *
   *; foo
   *  bar
   *;
   *
   * is  foo<eol>  bar (where <eol> represents an end-of-line); 
   * the embedded space characters are significant.
   * 
   * 
   * I (BH) note, however, that we sometimes have:
   * 
   * _some_name
   * ;
   * the name here
   * ;
   * 
   * so this should actually be
   * 
   * ;the name here
   * ;
   * 
   * for this, we use fullTrim();
   * 
   */
  
  /**
   * 
   * sets the string for parsing to be from the next line 
   * when the token buffer is empty, and if ';' is at the 
   * beginning of that line, extends the string to include
   * that full multiline string. Uses \1 to indicate that 
   * this is a special quotation. 
   * 
   * @return  the next line or null if EOF
   * @throws Exception
   */
  private String setStringNextLine() throws Exception {
    setString(readLine());
    if (line == null || line.length() == 0)
      return line;
    if (line.charAt(0) != ';') {
      if (str.startsWith("###non-st#"))
        ich = 10;
      return line;
    }
    ich = 1;
    String str = '\1' + line.substring(1) + '\n';
    while (readLine() != null) {
      if (line.startsWith(";")) {
        // remove trailing <eol> only, and attach rest of next line
        str = str.substring(0, str.length() - 1)
          + '\1' + line.substring(1);
        break;
      }
      str += line + '\n';
    }
    setString(str);
    return str;
  }

  /**
   * @return TRUE if there are more tokens in the line buffer
   * 
   */
  private boolean strHasMoreTokens() {
    if (str == null)
      return false;
    char ch = '#';
    while (ich < cch && ((ch = str.charAt(ich)) == ' ' || ch == '\t'))
      ++ich;
    return (ich < cch && ch != '#');
  }

  /**
   * assume that hasMoreTokens() has been called and that
   * ich is pointing at a non-white character. Also sets
   * boolean wasUnQuoted, because we need to know if we should 
   * be checking for a control keyword. 'loop_' is different from just 
   * loop_ without the quotes.
   *
   * @return null if no more tokens, "\0" if '.' or '?', or next token 
   */
  private String nextStrToken() {
    if (ich == cch)
      return null;
    int ichStart = ich;
    char ch = str.charAt(ichStart);
    if (ch != '\'' && ch != '"' && ch != '\1') {
      wasUnQuoted = true;
      while (ich < cch && (ch = str.charAt(ich)) != ' ' && ch != '\t')
        ++ich;
      if (ich == ichStart + 1)
        if (nullString != null && (str.charAt(ichStart) == '.' || str.charAt(ichStart) == '?'))
          return nullString;
      String s = str.substring(ichStart, ich);
      return s;
    }
    wasUnQuoted = false;
    char chOpeningQuote = ch;
    boolean previousCharacterWasQuote = false;
    while (++ich < cch) {
      ch = str.charAt(ich);
      if (previousCharacterWasQuote && (ch == ' ' || ch == '\t'))
        break;
      previousCharacterWasQuote = (ch == chOpeningQuote);
    }
    if (ich == cch) {
      if (previousCharacterWasQuote) // close quote was last char of string
        return str.substring(ichStart + 1, ich - 1);
      // reached the end of the string without finding closing '
      return str.substring(ichStart, ich);
    }
    ++ich; // throw away the last white character
    return str.substring(ichStart + 1, ich - 2);
  }

  
}
package javajs.api;

import java.io.BufferedReader;
import java.util.Map;


public interface GenericCifDataParser {

  static final int NONE = -1;

  String fullTrim(String str);

  Map<String, Object> getAllCifData();

  boolean getData() throws Exception;

  String getColumnName(int i);

  int getColumnCount();

  String getFileHeader();

  String getColumnData(int i);

  String getNextDataToken() throws Exception;

  String getNextToken() throws Exception;

  String getTokenPeeked();

  void parseDataBlockParameters(String[] fields, String key, String data, int[] key2col, int[] col2key) throws Exception;

  String peekToken() throws Exception;

  String readLine();

  GenericCifDataParser set(GenericLineReader reader, BufferedReader br);

  String toUnicode(String data);

  String skipLoop(boolean doReport) throws Exception;

  String fixKey(String key);

}

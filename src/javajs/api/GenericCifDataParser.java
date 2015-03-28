package javajs.api;

import java.io.BufferedReader;
import java.util.Map;


public interface GenericCifDataParser {

  static final int NONE = -1;

  String fullTrim(String str);

  Map<String, Object> getAllCifData();

  boolean getData() throws Exception;

  String getField(int i);

  int getFieldCount();

  String getFileHeader();

  String getLoopData(int i);

  String getNextDataToken() throws Exception;

  String getNextToken() throws Exception;

  String getTokenPeeked();

  int parseLoopParameters(String[] fields, int[] fieldOf, int[] propertyOf) throws Exception;

  String peekToken() throws Exception;

  String readLine();

  GenericCifDataParser set(GenericLineReader reader, BufferedReader br);

  String toUnicode(String data);

  void skipLoop() throws Exception;

  String fixKey(String key);

}

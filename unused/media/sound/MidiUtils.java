package jssun.media.sound;

import jsjavax.sound.midi.MidiMessage;
import jsjavax.sound.midi.Sequence;

public class MidiUtils {

	public static final int DEFAULT_TEMPO_MPQ = 500000;
	public static final int META_END_OF_TRACK_TYPE = 0x2F;
	public static final int META_TEMPO_TYPE = 0x51;

	public static boolean isMetaEndOfTrack(MidiMessage message) {
		// TODO Auto-generated method stub
		return false;
	}

	public static long tick2microsecond(Sequence sequence, long tickLength,
			Object object) {
		// TODO Auto-generated method stub
		return 0;
	}

}

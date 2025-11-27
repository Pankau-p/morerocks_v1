import { useFretboard } from '../../context/FretboardContext';
import { Note } from 'tonal';

// const { Note, Scale } = require("tonal");
// Keep sharps (#) in the pitch class, remove the octave number
// returns "C", "C#", "Db" etc (single pitch-class)
const getPitchClass = (note) => {
  const match = String(note || '').match(/^[A-G](#|b)?/);
  return match ? match[0] : '';
};

const PC_TO_SEMITONE = {
  C: 0,
  'B#': 0,
  'C#': 1,
  Db: 1,
  D: 2,
  'D#': 3,
  Eb: 3,
  E: 4,
  Fb: 4,
  'E#': 5,
  F: 5,
  'F#': 6,
  Gb: 6,
  G: 7,
  'G#': 8,
  Ab: 8,
  A: 9,
  'A#': 10,
  Bb: 10,
  B: 11,
  Cb: 11,
};

const pcToSemitone = (pc) => {
  return pc && PC_TO_SEMITONE[pc] != null ? PC_TO_SEMITONE[pc] : null;
};

// Simple NoteTile component
function NoteTile({ note, highlighted, isSelected, onClick }) {
  return (
    <div
      style={{
        width: '90px',
        height: '30px',
        margin: '2px',
        margin: '2px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: isSelected ? '#ff6666' : highlighted ? '#ffcc00' : '#eee',
        border: '1px solid #999',
        borderRadius: '4px',
        fontSize: '12px',
        cursor: 'pointer',
      }}
      onClick={() => onClick(note)}
    >
      {note}
    </div>
  );
}

export default function Fretboard() {
  const {
    selectedChord,
    selectedScale,
    highlightedNotesChord,
    highlightedNotesScale,
    selectedNote,
    updateChord,
    updateScale,
    updateSelectedNote,
    startFret,
    setStartFret,
  } = useFretboard();

  const strings = ['E2', 'A2', 'D3', 'G3', 'B3', 'E4'];
  const visibleFrets = 8;

  const allHighlightedNotes = [...highlightedNotesChord, ...highlightedNotesScale];

  return (
    <div style={{ padding: '10px', flex: 1 }}>
      <h2>Fretboard area</h2>

      {/* Start fret controls */}
      <div style={{ marginBottom: '10px' }}>
        <button onClick={() => setStartFret(Math.max(startFret - 1, 1))}>-</button>
        <span style={{ margin: '0 10px' }}>Start Fret: {startFret}</span>
        <button onClick={() => setStartFret(startFret + 1)}>+</button>
      </div>

      {/* Fretboard grid */}
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        {[...strings].reverse().map((stringNote, stringIndex) => (
          <div key={stringIndex} style={{ display: 'flex' }}>
            {Array.from({ length: visibleFrets }, (_, i) => {
              // compute actual fret index to render (keeps open string when startFret = 1)
              const fret = Math.max(startFret - 1, 0) + i;

              // get open-string midi number (E2 etc)
              const openMidi = Note.midi(stringNote); // e.g. E2 -> 40 (or null if invalid)
              if (openMidi == null) return null; // safety

              // compute midi for this tile and convert back to a note name (with octave)
              const tileMidi = openMidi + fret;
              const tileNote = Note.fromMidi(tileMidi); // e.g. "F#2"

              // compute pitch-classes and semitone indexes
              const tilePc = getPitchClass(tileNote); // e.g. "F#"
              const tileSem = pcToSemitone(tilePc);

              // precompute highlighted semitones (only once per render would be more efficient,
              // but this is fine to drop in). Better: compute highlightedSemitones above the map.
              const highlightedSemitones = allHighlightedNotes
                .map((n) => pcToSemitone(getPitchClass(n)))
                .filter((x) => x != null);

              const highlighted = highlightedSemitones.includes(tileSem);

              const isSelected =
                selectedNote && pcToSemitone(getPitchClass(selectedNote)) === tileSem;

              return (
                <NoteTile
                  key={i}
                  note={tileNote} // show full note (with octave) or use getPitchClass(tileNote)
                  highlighted={highlighted}
                  isSelected={isSelected}
                  onClick={(clickedNote) => updateSelectedNote(clickedNote)}
                />
              );
            })}
          </div>
        ))}
      </div>

      {/* Optional info display */}
      <div style={{ marginTop: '1rem' }}>
        <p>
          <strong>Selected Chord: </strong>
          {selectedChord}
        </p>
        <p>
          <strong>Chord Notes: </strong>
          {highlightedNotesChord.join(' ')}
        </p>
        <p>
          <strong>Selected Scale: </strong>
          {selectedScale}
        </p>
        <p>
          <strong>Scale Notes: </strong>
          {highlightedNotesScale.join(' ')}
        </p>
        <p>
          <strong>selected Note: </strong>
          {selectedNote}
        </p>
      </div>
    </div>
  );
}

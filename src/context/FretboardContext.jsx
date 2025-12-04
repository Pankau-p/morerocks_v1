import { createContext, useContext, useState } from 'react';
import * as Chord from '@tonaljs/chord';
import * as Scale from '@tonaljs/scale';

const FretboardContext = createContext();

export function FretboardProvider({ children }) {
  const [selectedChord, setSelectedChord] = useState(null);
  const [selectedScale, setSelectedScale] = useState(null);

  const [highlightedNotesChord, setHighlightedNotesChord] = useState([]);
  const [highlightedNotesScale, setHighlightedNotesScale] = useState([]);

  const [selectedNote, setSelectedNote] = useState(null);

  // Start fret for the visible fretboard
  const [startFret, setStartFret] = useState(1);

  // Compute highlighted notes and chords when chord changes using tonal.js
  const updateChord = (chordName) => {
    setSelectedChord(chordName);
    const notes = Chord.get(chordName).notes || [];
    setHighlightedNotesChord(notes);
  };

  // Compute highlighted notes and scale when note changes using tonal.js
  const updateScale = (scaleName) => {
    setSelectedScale(scaleName);
    const notes = Scale.get(scaleName).notes || [];
    setHighlightedNotesScale(notes);
  };

  const updateSelectedNote = (note) => {
    setSelectedNote(note);
  };

  return (
    <FretboardContext.Provider
      value={{
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
      }}
    >
      {children}
    </FretboardContext.Provider>
  );
}

export function useFretboard() {
  return useContext(FretboardContext);
}

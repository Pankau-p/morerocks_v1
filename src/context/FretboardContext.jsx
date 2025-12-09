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

  // context/FretboardContext.js
  const [playlist, setPlaylist] = useState([]);

  // Add to playlist (max 4, only chords)
  const addToPlaylist = (item) => {
    if (!item) return;
    if (!Chord.get(item)?.notes) return; // only allow chords
    setPlaylist((prev) => {
      if (prev.includes(item)) return prev;
      if (prev.length >= 4) return prev;
      return [...prev, item];
    });
  };

  const removeFromPlaylist = (item) => {
    setPlaylist((prev) => prev.filter((i) => i !== item));
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
        playlist,
        addToPlaylist,
        removeFromPlaylist,
        setPlaylist,
      }}
    >
      {children}
    </FretboardContext.Provider>
  );
}

export function useFretboard() {
  return useContext(FretboardContext);
}

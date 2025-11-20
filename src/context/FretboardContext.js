import { createContext, useContext, useState } from "react";
import { Chord, Scale } from "tonal";

const FretboardContext = createContext();

export function FretboardProvider({ children }) {
    const [selectedChord, setSelectedChord] = useState(null);
    const [selectedScale, setSelectedScale] = useState(null);

    const [highlightedNotesChord, setHighlightedNotesChord] = useState([]);
    const [highlightedNotesScale, setHighlightedNotesScale] = useState([]);

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

    return (
        <FretboardContext.Provider value={{
            selectedChord,
            selectedScale,
            highlightedNotesChord,
            highlightedNotesScale,
            updateChord,
            updateScale
        }}>
            {children}
        </FretboardContext.Provider>
    );
}

export function useFretboard() {
    return useContext(FretboardContext);
}

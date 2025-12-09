import React from 'react';
import { useFretboard } from '../../context/FretboardContext';
import { Note } from 'tonal';
import './Fretboard.css';

// Helpers
const getPitchClass = (note) => {
  const match = String(note || '').match(/^[A-G](#|b)?/);
  return match ? match[0] : '';
};

const PC_TO_SEMITONE = {
  C: 0, 'B#': 0,
  'C#': 1, Db: 1,
  D: 2,
  'D#': 3, Eb: 3,
  E: 4, Fb: 4,
  'E#': 5, F: 5,
  'F#': 6, Gb: 6,
  G: 7,
  'G#': 8, Ab: 8,
  A: 9,
  'A#': 10, Bb: 10,
  B: 11, Cb: 11,
};

const pcToSemitone = (pc) => (pc && PC_TO_SEMITONE[pc] != null ? PC_TO_SEMITONE[pc] : null);

// Color palette
const NOTE_COLORS = [
  'var(--color-fret-1)',
  'var(--color-fret-2)',
  'var(--color-fret-3)',
  'var(--color-fret-4)',
  'var(--color-fret-5)',
  'var(--color-fret-6)',
];

const getNoteColor = (semitone) => NOTE_COLORS[semitone % NOTE_COLORS.length];

// NoteTile component
function NoteTile({ note, highlighted, isSelected, onClick, semitone }) {
  const bgColor = highlighted || isSelected ? getNoteColor(semitone) : 'transparent';
  return (
    <div
      className={`fretboard__note 
        ${highlighted ? 'fretboard__note--highlighted' : ''} 
        ${isSelected ? 'fretboard__note--selected' : ''}`}
      style={{ backgroundColor: bgColor, color: '#000' }}
      onClick={() => onClick(note)}
    >
      {highlighted || isSelected ? note : ''}
    </div>
  );
}

export default function Fretboard() {
  const {
    highlightedNotesChord,
    highlightedNotesScale,
    selectedNote,
    updateSelectedNote,
    startFret,
  } = useFretboard();

  const MAX_FRET = 22;
  const visibleFrets = 8;
  const visibleFretsClamped = Math.min(visibleFrets, MAX_FRET - startFret + 1);

  const strings = ['E2', 'A2', 'D3', 'G3', 'B3', 'E4'];

  const allHighlightedNotes = [...highlightedNotesChord, ...highlightedNotesScale];
  const highlightedSemitones = allHighlightedNotes
    .map((n) => pcToSemitone(getPitchClass(n)))
    .filter((x) => x != null);

  const markerFrets = [3, 5, 7, 9, 12, 15, 17, 19, 21];

  return (
    <div className="fretboard">
      <div className="fretboard__inner">
        <div className="fretboard__labels">
          {[...strings].reverse().map((stringNote, stringIndex) => (
            <div key={`string-label-${stringIndex}`} className="fretboard__string-label">
              {getPitchClass(stringNote)}
            </div>
          ))}
        </div>

        <div className="fretboard__grid">
          {Array.from({ length: visibleFretsClamped }, (_, i) => (
            <div
              key={`fret-${i}`}
              className="fretboard__fret-line"
              style={{ left: `${(i / visibleFretsClamped) * 100}%` }}
            />
          ))}

          {markerFrets
            .filter((f) => f >= startFret && f < startFret + visibleFretsClamped)
            .map((fretNumber) => {
              const relativeFret = fretNumber - startFret + 0.5;
              const leftPercent = (relativeFret / visibleFretsClamped) * 100;

              if (fretNumber === 12) {
                return (
                  <React.Fragment key={`marker-${fretNumber}`}>
                    <div
                      className="fretboard__marker"
                      style={{ left: `${leftPercent}%`, top: '35%' }}
                    />
                    <div
                      className="fretboard__marker"
                      style={{ left: `${leftPercent}%`, top: '65%' }}
                    />
                  </React.Fragment>
                );
              }

              return (
                <div
                  key={`marker-${fretNumber}`}
                  className="fretboard__marker"
                  style={{ left: `${leftPercent}%` }}
                />
              );
            })}

          {[...strings].reverse().map((stringNote, stringIndex) => (
            <div key={stringIndex} className="fretboard__string">
              {Array.from({ length: visibleFretsClamped }, (_, i) => {
                const fret = Math.max(startFret - 1, 0) + i;
                const openMidi = Note.midi(stringNote);
                if (openMidi == null) return null;
                const tileMidi = openMidi + fret;
                const tileNote = Note.fromMidi(tileMidi);
                const tilePc = getPitchClass(tileNote);
                const tileSem = pcToSemitone(tilePc);
                const highlighted = highlightedSemitones.includes(tileSem);
                const isSelected =
                  selectedNote && pcToSemitone(getPitchClass(selectedNote)) === tileSem;

                return (
                  <div key={i} className="fretboard__tile-wrapper">
                    <NoteTile
                      note={highlighted || isSelected ? tileNote : ''}
                      highlighted={highlighted}
                      isSelected={isSelected}
                      semitone={tileSem}
                      onClick={updateSelectedNote}
                    />
                  </div>
                );
              })}
            </div>
          ))}

          {Array.from({ length: visibleFretsClamped }, (_, i) => {
            const fretNumber = startFret + i;
            const leftPercent = ((i + 0.5) / visibleFretsClamped) * 100;
            return (
              <div
                key={`fret-number-${i}`}
                className="fretboard__fret-number"
                style={{ left: `${leftPercent}%` }}
              >
                {fretNumber}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

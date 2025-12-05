import React from 'react';
import { useFretboard } from '../../context/FretboardContext';
import { Note } from '@tonaljs/tonal';
import * as Chord from '@tonaljs/chord';
import * as Scale from '@tonaljs/scale';
import './ControlPanel.css';

export default function ControlPanel() {
  const {
    startFret,
    setStartFret,
    selectedChord,
    selectedScale,
    highlightedNotesChord,
    highlightedNotesScale,
  } = useFretboard();

  const MAX_FRET = 22;
  const VISIBLE_FRETS = 8;

  const handleFretDown = () => {
    setStartFret((prev) => Math.max(1, prev - 1));
  };

  const handleFretUp = () => {
    setStartFret((prev) => Math.min(prev + 1, MAX_FRET - VISIBLE_FRETS + 1));
  };

  const isChord = !!selectedChord;
  const mainLabel = isChord ? 'Selected Chord:' : 'Selected Scale:';
  const mainValue = isChord ? selectedChord : selectedScale;

  const intervals = isChord
    ? Chord.get(selectedChord)?.intervals || []
    : Scale.get(selectedScale)?.intervals || [];
  const notes = isChord ? highlightedNotesChord : highlightedNotesScale;

  const recentCreation = ['C', 'G', 'Am', 'F'];

  const getRelative = () => {
    if (!selectedScale) return '';
    const scale = Scale.get(selectedScale);
    if (!scale || !scale.tonic) return '';

    const tonic = scale.tonic;
    const type = scale.type;
    if (type === 'major') {
      const relNote = scale.notes[5];
      return `${relNote} minor`;
    } else if (type === 'minor') {
      const relNote = scale.notes[2];
      return `${relNote} major`;
    }
    return '';
  };

  return (
    <div className="control-panel">
      <div className="control-panel__left">
        {/* Low Fret control */}
        <button className="control-panel__button control-panel__button--fret">
          <div className="control-panel__low-fret">
            <span className="control-panel__label">Low Fret:</span>
            <button className="control-panel__fret-btn" onClick={handleFretDown}>
              ◀
            </button>
            <span className="control-panel__fret-value">{startFret}</span>
            <button className="control-panel__fret-btn" onClick={handleFretUp}>
              ▶
            </button>
          </div>
        </button>

        {/* Selected Chord or Scale */}
        <button className="control-panel__button control-panel__button--chord">
          {selectedChord
            ? `Selected Chord: ${selectedChord}`
            : selectedScale
            ? `Selected Scale: ${selectedScale}`
            : 'No chord/scale'}
        </button>

        {/* Intervals button */}
        <button className="control-panel__button control-panel__button--mode">
          Intervals: {intervals.join(', ') || ''}
        </button>

        {/* Notes list button */}
        <button className="control-panel__button control-panel__button--relative">
          Notes: {notes.join(', ') || ''}
        </button>

        {/* Relative minor/major */}
        {/* <button className="control-panel__button control-panel__button--relative">
          Relative: {getRelative()}
        </button> */}
      </div>

      {/* Center section */}
      <div className="control-panel__center">
        <div className="control-panel__recent-title">Most Recent Creation</div>
        <div className="control-panel__recent-chords">
          {recentCreation.map((chord, idx) => (
            <div key={idx} className="control-panel__recent-chord">
              {chord}
            </div>
          ))}
        </div>
      </div>

      {/* Right section: circle of fifths image */}
      <div className="control-panel__right">
        <img
          src="src/assets/img/circle-of-fifths.png"
          alt="Circle of Fifths"
          className="control-panel__circle-image"
        />
      </div>
    </div>
  );
}

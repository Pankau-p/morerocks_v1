/**
 * File: ControlPanel.jsx
 * Description:
 *    Control panel component for the Fretboard App.
 *    Provides UI for selecting chords, scales, and other
 *    fretboard-related settings, interacting with FretboardContext.
 */

import { useState, useEffect } from 'react';
import { useFretboard } from '../../context/FretboardContext';
import * as Chord from '@tonaljs/chord';
import * as Scale from '@tonaljs/scale';
import './ControlPanel.css';
import circleOfFifths from '../../assets/img/circle-of-fifths.png'

export default function ControlPanel() {
  const {
    startFret,
    setStartFret,
    selectedChord,
    selectedScale,
    highlightedNotesChord,
    highlightedNotesScale,
    updateChord,
  } = useFretboard();

  const MAX_FRET = 22;
  const VISIBLE_FRETS = 8;

  const [playlist, setPlaylist] = useState([]); // max 4 pinned items

  // Refresh left-side info when a new chord or scale is selected
  useEffect(() => {
    setStartFret(1);
  }, [selectedChord, selectedScale]);

  const handleFretDown = () => setStartFret((prev) => Math.max(1, prev - 1));
  const handleFretUp = () =>
    setStartFret((prev) => Math.min(prev + 1, MAX_FRET - VISIBLE_FRETS + 1));

  const isChord = !!selectedChord;
  const mainValue = isChord ? selectedChord : selectedScale;

  const intervals = isChord
    ? Chord.get(selectedChord)?.intervals || []
    : Scale.get(selectedScale)?.intervals || [];
  const notes = isChord ? highlightedNotesChord : highlightedNotesScale;

  const addToPlaylist = (item) => {
    if (!item || !Chord.get(item)?.notes) return; // only allow chords
    setPlaylist((prev) => {
      if (prev.includes(item)) return prev;
      if (prev.length >= 4) return prev;
      return [...prev, item];
    });
  };

  const removeFromPlaylist = (item) => {
    setPlaylist((prev) => prev.filter((i) => i !== item));
  };

  const selectPlaylistItem = (item) => {
    updateChord(item); // playlist is chords only
  };

  return (
    <div className="control-panel">
      {/* Left buttons */}
      <div className="control-panel__left">
        {/* Low Fret controls (fixed) */}
        <div className="control-panel__button control-panel__button--fret">
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
        </div>

        {/* Chord/Scale display */}
        <button className="control-panel__button control-panel__button--chord">
          {mainValue || 'No chord/scale'}
          {mainValue && isChord && (
            <span className="control-panel__add-btn" onClick={() => addToPlaylist(mainValue)}>
              +
            </span>
          )}
        </button>

        {/* Intervals display */}
        <button className="control-panel__button control-panel__button--mode">
          Intervals: {intervals.join(', ') || ''}
        </button>

        {/* Notes display */}
        <button className="control-panel__button control-panel__button--relative">
          Notes: {notes.join(', ') || ''}
        </button>
      </div>

      {/* Center: Pinned Shortcuts */}
      <div className="control-panel__center">
        <div className="control-panel__playlist">
          <div className="control-panel__playlist-title">Pinned Shortcuts</div>
          <div className="control-panel__playlist-items">
            {playlist.length === 0 && <div className="control-panel__empty">No pinned items</div>}
            {playlist.map((item) => (
              <div key={item} className="control-panel__playlist-item">
                <span onClick={() => selectPlaylistItem(item)} style={{ cursor: 'pointer' }}>
                  {item}
                </span>
                <span
                  className="control-panel__remove-btn"
                  onClick={() => removeFromPlaylist(item)}
                >
                  ×
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Right: Circle of Fifths */}
      <div className="control-panel__right">
        <img
          src={circleOfFifths}
          alt="Circle of Fifths"
          className="control-panel__circle-image"
        />
      </div>
    </div>
  );
}


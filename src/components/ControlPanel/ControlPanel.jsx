import React from 'react';
import { useFretboard } from '../../context/FretboardContext';
import './ControlPanel.css';

export default function ControlPanel() {
  const { startFret, selectedChord, selectedScale } = useFretboard();

  // Placeholder data for recent creation
  const recentCreation = ['C', 'G', 'Am', 'F']; 

  return (
    <div className="control-panel">
      {/* Left section: buttons */}
      <div className="control-panel__left">
        <button className="control-panel__button control-panel__button--fret">
          Low fret: {startFret}
        </button>
        <button className="control-panel__button control-panel__button--chord">
          {selectedChord || selectedScale || 'No chord/scale'}
        </button>
        <button className="control-panel__button control-panel__button--mode">
          Mode: 
        </button>
        <button className="control-panel__button control-panel__button--relative">
          Relative: 
        </button>
      </div>

      {/* Center section: recent creation */}
      <div className="control-panel__center">
        <div className="control-panel__recent-title">Most Recent Creation</div>
        <div className="control-panel__recent-chords">
          {recentCreation.map((chord, idx) => (
            <div key={idx} className="control-panel__recent-chord">
              {chord}
            </div>
          ))}
        </div>
        {/* Optional: list of other creations could go here */}
      </div>

      {/* Right section: Circle of Fifths placeholder */}
      <div className="control-panel__right">
        <div className="control-panel__circle-placeholder">
          Circle of Fifths
        </div>
      </div>
    </div>
  );
}

import React from 'react';
import './ControlPanel.css';

export default function ControlPanel() {
  return (
    <div className="control-panel">
      <h3 className="control-panel__title">Control Panel</h3>
      {/* Buttons, info display, etc. will go here */}
      <div className="control-panel__buttons">
        <button>Chord 1</button>
        <button>Chord 2</button>
        <button>Scale 1</button>
      </div>
    </div>
  );
}

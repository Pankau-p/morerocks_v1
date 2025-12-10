# Fretboard Trainer App

The **Fretboard Trainer** is an interactive web application for exploring guitar chords, scales, intervals, and note positions on a virtual fretboard. It is designed to support learning, experimentation, and quick theory visualization.

---

## Features

### Interactive Fretboard
- Displays notes across all strings and positions.
- Highlights intervals and note names for the selected chord or scale.
- Adjustable starting fret for shifting the visible fret range.

### Chord & Scale Browser
- Sidebar organized into categories (major, minor, diminished, augmented, dominant, and multiple scale types).
- Selecting a chord or scale updates the fretboard instantly.
- Fully responsive layout with a collapsible drawer on smaller screens.

### Playlist System
- Save up to four chords for quick access.
- Add chords from the control panel or from the sidebar under **Creations → Playlists**.
- Useful for building small progressions or storing frequently used shapes.

### Control Panel
- Displays the currently selected chord or scale.
- Shows intervals and note lists.
- Provides fret-shift controls.
- Includes a button for adding the current chord to the playlist.

---

## Technologies Used

- React  
- Vite  
- Tonal.js  
- CSS Modules

---

## Project Structure
src/
components/
    Header/
    Fretboard/
    ControlPanel/
    Sidebar/
context/
    FretboardContext.jsx
assets/
    img/
App.jsx
main.jsx


## Installation
npm install
npm run dev
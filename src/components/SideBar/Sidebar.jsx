/**
 * File: Sidebar.jsx
 * Description:
 *    Sidebar component for the Fretboard App.
 *    Renders sections for Chords, Scales, and Playlists,
 *    handles category expansion, item selection, and
 *    integrates with FretboardContext for state updates.
 */


import { useState } from 'react';
import { useFretboard } from '../../context/FretboardContext';
import './Sidebar.css';

const sidebarData = [
  {
    title: 'CHORDS',
    categories: [
      {
        name: 'Major Chords',
        items: ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'],
      },
      {
        name: 'Minor Chords',
        items: ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'],
      },
      {
        name: 'Diminished Chords',
        items: ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'],
      },
      {
        name: 'Augmented Chords',
        items: ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'],
      },
      {
        name: 'Dominant Chords',
        items: ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'],
      },
    ],
  },
  {
    title: 'SCALES',
    categories: [
      { name: 'Major Scale', items: ['C Major', 'C# Major', 'D Major', 'D# Major'] },
      { name: 'Minor Scale', items: ['C Minor', 'C# Minor', 'D Minor', 'D# Minor'] },
      { name: 'Major Blues Scale', items: ['C', 'C#', 'D', 'D#'] },
      { name: 'Minor Blues Scale', items: ['C', 'C#', 'D', 'D#'] },
      { name: 'Mixolydian Scale', items: ['C', 'C#', 'D', 'D#'] },
      { name: 'Phrygian Scale', items: ['C', 'C#', 'D', 'D#'] },
    ],
  },
  {
    title: '',
    categories: [{ name: 'Playlists', items: ['Create New Playlist'] }],
  },
];

export default function Sidebar() {
  const { updateChord, updateScale, selectedChord, selectedScale, addToPlaylist } = useFretboard();
  const [openCategory, setOpenCategory] = useState('');
  const [drawerOpen, setDrawerOpen] = useState(false);

  const toggleCategory = (section, category) => {
    const key = section + category;
    setOpenCategory((prev) => (prev === key ? '' : key));
  };

  const sidebarContent = (
    <>
      {sidebarData.map((section) => (
        <div key={section.title} className="sidebar__section">
          <div className="sidebar__section-title">{section.title}</div>

          {section.categories.map((cat) => {
            const key = section.title + cat.name;
            const isOpen = openCategory === key;

            // Special case: CREATIONS → Playlists, include "Save Current Chord" button
            const isPlaylistsCategory = section.title === '' && cat.name === 'Playlists';

            return (
              <div key={cat.name} className="sidebar__category">
                <div
                  className="sidebar__category-title"
                  onClick={() => toggleCategory(section.title, cat.name)}
                >
                  {cat.name}
                </div>

                <div className={`sidebar__subitems-container ${isOpen ? 'open' : ''}`}>
                  {cat.items.map((item) => (
                    <div
                      key={item}
                      className={`sidebar__subitem ${
                        item === selectedChord || item === selectedScale
                          ? 'sidebar__subitem--active'
                          : ''
                      }`}
                      onClick={() => {
                        if (section.title === 'CHORDS') updateChord(item);
                        if (section.title === 'SCALES') updateScale(item);
                        setDrawerOpen(false);
                      }}
                    >
                      {item}
                    </div>
                  ))}

                  {isPlaylistsCategory && (
                    <button
                      className="sidebar__save-playlist-btn"
                      onClick={() => {
                        if (selectedChord) addToPlaylist(selectedChord);
                      }}
                    >
                      Save Current Chord to Playlist
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      ))}
    </>
  );

  return (
    <>
      {/* Desktop Sidebar */}
      <aside className="sidebar">{sidebarContent}</aside>

      {/* Floating drawer */}
      {drawerOpen && (
        <div className="sidebar-drawer">
          <button className="sidebar-drawer__close" onClick={() => setDrawerOpen(false)}>
            ✕
          </button>

          <div className="sidebar-drawer__content">{sidebarContent}</div>
        </div>
      )}

      {/* Hamburger only <1250px */}
      <button className="sidebar__hamburger" onClick={() => setDrawerOpen(true)}>
        ☰
      </button>
    </>
  );
}

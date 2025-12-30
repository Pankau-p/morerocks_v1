/**
 * File: Sidebar.jsx
 * Description:
 * Sidebar component for the Fretboard App.
 * Includes chords, scales, playlists, mobile drawer,
 * and beginner onboarding highlights.
 */

import { useState, useEffect, useRef } from 'react';
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
      ,
    ],
  },
  {
    title: '',
    categories: [
      {
        name: 'Playlists',
        items: ['Create New Playlist'],
      },
    ],
  },
];

export default function Sidebar() {
  const { updateChord, updateScale, selectedChord, selectedScale, addToPlaylist } = useFretboard();

  const [openCategory, setOpenCategory] = useState('');
  const [drawerOpen, setDrawerOpen] = useState(false);

  // Onboarding
  const [onboardingStep, setOnboardingStep] = useState(0);
  const [highlightChordsTitle, setHighlightChordsTitle] = useState(false);
  const [highlightCChord, setHighlightCChord] = useState(false);
  const onboardingRan = useRef(false);

  useEffect(() => {
    if (onboardingRan.current) return;
    onboardingRan.current = true;

    const timers = [];

    timers.push(setTimeout(() => setOnboardingStep(1), 300));

    timers.push(
      setTimeout(() => {
        setHighlightChordsTitle(true);
        setTimeout(() => setHighlightChordsTitle(false), 1200);
      }, 800)
    );

    timers.push(
      setTimeout(() => {
        setOpenCategory('CHORDSMajor Chords');
      }, 2200)
    );

    timers.push(
      setTimeout(() => {
        setHighlightCChord(true);
        setTimeout(() => setHighlightCChord(false), 1200);
      }, 3200)
    );

    timers.push(
      setTimeout(() => {
        updateChord('C');
        setOnboardingStep(0);
      }, 4600)
    );

    return () => timers.forEach(clearTimeout);
  }, [updateChord]);

  const toggleCategory = (section, category) => {
    const key = section + category;
    setOpenCategory((prev) => (prev === key ? '' : key));
  };

  const sidebarContent = (
    <>
      {sidebarData.map((section) => (
        <div key={section.title} className="sidebar__section">
          {section.title && (
            <div
              className={`sidebar__section-title ${
                highlightChordsTitle && section.title === 'CHORDS'
                  ? 'sidebar__section-title--highlight'
                  : ''
              }`}
            >
              {section.title}
            </div>
          )}

          {section.categories.map((cat) => {
            const key = section.title + cat.name;
            const isOpen = openCategory === key;
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
                  {cat.items.map((item) => {
                    const isActive = item === selectedChord || item === selectedScale;

                    const isOnboardingC =
                      highlightCChord &&
                      section.title === 'CHORDS' &&
                      cat.name === 'Major Chords' &&
                      item === 'C';

                    return (
                      <div
                        key={item}
                        className={`sidebar__subitem ${
                          isActive ? 'sidebar__subitem--active' : ''
                        } ${isOnboardingC ? 'sidebar__subitem--highlight' : ''}`}
                        onClick={() => {
                          if (section.title === 'CHORDS') updateChord(item);
                          if (section.title === 'SCALES') updateScale(item);
                          setDrawerOpen(false);
                        }}
                      >
                        {item}
                      </div>
                    );
                  })}

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
      <aside className={`sidebar ${onboardingStep === 1 ? 'sidebar--highlight' : ''}`}>
        {sidebarContent}
      </aside>

      {/* Mobile Drawer */}
      {drawerOpen && (
        <div className="sidebar-drawer">
          <button className="sidebar-drawer__close" onClick={() => setDrawerOpen(false)}>
            ✕
          </button>
          <div className="sidebar-drawer__content">{sidebarContent}</div>
        </div>
      )}

      {/* Hamburger */}
      <button className="sidebar__hamburger" onClick={() => setDrawerOpen(true)}>
        ☰
      </button>
    </>
  );
}

/**
 * File: Sidebar.jsx
 * Description:
 *    Sidebar component for the Fretboard App with beginner onboarding highlights.
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
    ],
  },
  {
    title: 'SCALES',
    categories: [{ name: 'Major Scale', items: ['C Major', 'C# Major', 'D Major'] }],
  },
];

export default function Sidebar() {
  const { updateChord, updateScale, selectedChord, selectedScale } = useFretboard();

  const [openCategory, setOpenCategory] = useState('');
  const [drawerOpen, setDrawerOpen] = useState(false);

  // Onboarding state
  const [onboardingStep, setOnboardingStep] = useState(0);
  const [highlightChordsTitle, setHighlightChordsTitle] = useState(false);
  const [highlightCChord, setHighlightCChord] = useState(false);
  const onboardingRan = useRef(false);

  // 🔹 Onboarding sequence
  useEffect(() => {
    if (onboardingRan.current) return;
    onboardingRan.current = true;
    const timers = [];

    // Step 1: highlight sidebar background
    timers.push(setTimeout(() => setOnboardingStep(1), 300));
    console.log('onboarding start');
    // Step 2: flash CHORDS title
    timers.push(
      setTimeout(() => {
        setHighlightChordsTitle(true);
        setTimeout(() => setHighlightChordsTitle(false), 1200);
      }, 800)
    );

    // Step 3: expand Major Chords
    timers.push(
      setTimeout(() => {
        setOpenCategory('CHORDSMajor Chords');
      }, 2200)
    );

    // Step 4: flash C chord
    timers.push(
      setTimeout(() => {
        setHighlightCChord(true);
        setTimeout(() => setHighlightCChord(false), 1200);
      }, 3200)
    );

    // Step 5: show C Major on fretboard
    timers.push(
      setTimeout(() => {
        updateChord('C');
        setOnboardingStep(0); // stop sidebar background highlight
      }, 4600)
    );

    return () => timers.forEach(clearTimeout);
  }, [updateChord]);

  const toggleCategory = (section, category) => {
    const key = section + category;
    setOpenCategory((prev) => (prev === key ? '' : key));
  };

  return (
    <>
      <aside className={`sidebar ${onboardingStep === 1 ? 'sidebar--highlight' : ''}`}>
        {sidebarData.map((section) => (
          <div key={section.title} className="sidebar__section">
            <div
              className={`sidebar__section-title ${
                highlightChordsTitle && section.title === 'CHORDS'
                  ? 'sidebar__section-title--highlight'
                  : ''
              }`}
            >
              {section.title}
            </div>

            {section.categories.map((cat) => {
              const key = section.title + cat.name;
              const isOpen = openCategory === key;

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
                  </div>
                </div>
              );
            })}
          </div>
        ))}
      </aside>

      {/* Hamburger */}
      <button className="sidebar__hamburger" onClick={() => setDrawerOpen(true)}>
        ☰
      </button>
    </>
  );
}

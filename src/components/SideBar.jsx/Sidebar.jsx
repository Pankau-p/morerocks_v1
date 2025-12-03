import React, { useState } from "react";
import "./Sidebar.css";

const sidebarData = [
  {
    title: "CHORDS",
    categories: [
      { name: "Major Chords", items: ["C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B"] },
      { name: "Minor Chords", items: ["C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B"] },
      { name: "Diminished Chords", items: ["C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B"] },
      { name: "Augmented Chords", items: ["C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B"] },
      { name: "Dominant Chords", items: ["C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B"] },
    ],
  },
  {
    title: "SCALES",
    categories: [
      { name: "Major Scale", items: ["C Major", "C# Major", "D Major", "D# Major"] },
      { name: "Minor Scale", items: ["C Minor", "C# Minor", "D Minor", "D# Minor"] },
      { name: "Major Blues Scale", items: ["C", "C#", "D", "D#"] },
      { name: "Minor Blues Scale", items: ["C", "C#", "D", "D#"] },
      { name: "Mixolydian Scale", items: ["C", "C#", "D", "D#"] },
      { name: "Phrygian Scale", items: ["C", "C#", "D", "D#"] },
    ],
  },
  {
    title: "CREATIONS",
    categories: [
      { name: "Playlists", items: ["Create New Playlist"] },
    ],
  },
];
export default function Sidebar() {
  const [openCategory, setOpenCategory] = useState({});

  const toggleCategory = (section, category) => {
    setOpenCategory((prev) => ({
      ...prev,
      [section + category]: !prev[section + category], // unique key for each category
    }));
  };

  return (
    <div className="sidebar">
      {sidebarData.map((section) => (
        <div key={section.title} className="sidebar__section">
          <div className="sidebar__section-title">{section.title}</div>

          {section.categories.map((cat) => (
            <div key={cat.name} className="sidebar__category">
              <div
                className="sidebar__category-title"
                onClick={() => toggleCategory(section.title, cat.name)}
              >
                {cat.name}
              </div>

              {openCategory[section.title + cat.name] &&
                cat.items.map((item) => (
                  <div key={item} className="sidebar__subitem">
                    {item}
                  </div>
                ))}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}

/**
 * File: Header.jsx
 * Description:
 *    Header component for the Fretboard App.
 *    Displays the app logo, search input, and user avatar.
 *    Handles search input state and triggers the onSearch callback.
 */

import { useState } from 'react';
import './header.css';

export default function Header({ onSearch }) {
  const [query, setQuery] = useState('');

  // Trigger search callback if input is not empty
  const handleSearch = () => {
    if (!query.trim()) return;
    onSearch(query.trim());
  };

  return (
    <header className="header">
      {/* App logo section */}
      <div className="header__logo">
        <img src="/src/assets/img/logo2.jpg" alt="App Logo" />
      </div>

      {/* Search input section */}
      <div className="header__search">
        <input
          type="text"
          className="header__search-input"
          placeholder="Search..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
        />
      </div>

      {/* User avatar section */}
      <div className="header__user">
        <img
          src="/src/assets/img/user-avatar.png"
          alt="User Avatar"
          className="header__user-avatar"
        />
      </div>
    </header>
  );
}

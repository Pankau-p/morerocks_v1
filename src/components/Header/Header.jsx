/**
 * File: Header.jsx
 * Description:
 *    Header component for the Fretboard App.
 *    Displays the app logo, search input, and user avatar.
 *    Handles search input state and triggers the onSearch callback.
 */

import { useState } from 'react';
import './header.css';
import logo2 from "../../assets/img/logo2.jpg"
import userAvatar from '../../assets/img/user-avatar.png'

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
        <img src={logo2} alt="App Logo" />
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
          src={userAvatar}
          alt="User Avatar"
          className="header__user-avatar"
        />
      </div>
    </header>
  );
}

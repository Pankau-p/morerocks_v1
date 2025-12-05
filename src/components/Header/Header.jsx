import React, { useState } from 'react';
import './header.css';

export default function Header({ onSearch }) {
  const [query, setQuery] = useState("");

  const handleSearch = () => {
    if (!query.trim()) return;
    onSearch(query.trim());
  };

  return (
    <header className="header">
      <div className="header__logo">
        <img src="/src/assets/img/logo2.jpg" alt="App Logo" />
      </div>

      <div className="header__search">
        <input
          type="text"
          className="header__search-input"
          placeholder="Search..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSearch()}
        />
      </div>

      <div className="header__user">
        <img src="/src/assets/img/user-avatar.png" alt="User Avatar" className="header__user-avatar" />
      </div>
    </header>
  );
}

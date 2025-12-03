// src/components/Header/Header.jsx
import React from 'react';
import './header.css';

export default function Header() {
  return (
    <header className="header">
      <div className="header__logo">
        <img src="/logo.png" alt="App Logo" />
      </div>

      <div className="header__search">
        <input type="text" className="header__search-input" placeholder="Search..." />
      </div>

      <div className="header__user">
        <img src="/user-avatar.png" alt="User Avatar" className="header__user-avatar" />
        {/* <span className="header__user-name">Pete</span> */}
      </div>
    </header>
  );
}

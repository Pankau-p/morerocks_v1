/**
 * ------------------------------------------------------------
 * File: main.jsx
 * Author: Yanek Keshavjee - T00678947
 * Assignment: [Project Part 4/ Prototyping]
 * Course: COMP 3451
 *
 * Description:
 *    Entry point for the Fretboard App. This file mounts the
 *    root React component and applies global configuration.
 *    It also loads the project's global style layers and
 *    initializes StrictMode for development.
 *
 * ------------------------------------------------------------
 */

import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

// Global stylesheet layers
import './styles/reset.css';
import './styles/theme.css';
import './styles/global.css';

import App from './App.jsx';

// Mount the root application into the DOM
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>
);

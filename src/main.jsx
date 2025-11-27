import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { Chord } from '@tonaljs/tonal';
import './index.css';
import App from './App.jsx';

console.log(Chord.get('Cmaj7'));
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>
);

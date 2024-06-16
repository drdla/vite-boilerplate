// Add tailwind styles
import './styles/index.css';

// Initialize i18next
import './lib/i18n.ts';

import React from 'react';
import ReactDOM from 'react-dom/client';

import App from './App.tsx';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);

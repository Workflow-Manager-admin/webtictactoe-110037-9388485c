import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';

/* Polyfill for legacy build systems or code-generation templates expecting PUBLIC_URL as a global variable */
window.PUBLIC_URL = process.env.PUBLIC_URL || '.';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

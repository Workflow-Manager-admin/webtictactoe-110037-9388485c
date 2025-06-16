import React from 'react';
import './App.css';
import WebTicTacToe from './WebTicTacToe';

function App() {
  return (
    <div className="app">
      <nav className="navbar">
        <div className="container">
          <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
            <div className="logo">
              <span className="logo-symbol">*</span> KAVIA AI
            </div>
            <span />
          </div>
        </div>
      </nav>

      <main style={{ marginTop: 90, minHeight: 'calc(100vh - 120px)' }}>
        <WebTicTacToe />
      </main>
    </div>
  );
}

export default App;
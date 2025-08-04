import React, { useState } from 'react';
import Game from './components/Game';
import './App.css';

function App() {
  const [isDarkTheme, setIsDarkTheme] = useState(false);

  const toggleTheme = () => {
    setIsDarkTheme(!isDarkTheme);
  };

  return (
    <div className={`app ${isDarkTheme ? 'dark' : 'light'}`}>
      <div className="header">
        <h1>🪨 ✂️ 📄</h1>
        <h2>Rock Paper Scissors</h2>
        <button 
          className="theme-toggle"
          onClick={toggleTheme}
          aria-label="Toggle theme"
        >
          {isDarkTheme ? '☀️' : '🌙'}
        </button>
      </div>
      <Game />
    </div>
  );
}

export default App; 
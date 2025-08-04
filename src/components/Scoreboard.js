import React from 'react';
import './Scoreboard.css';

const Scoreboard = ({ score }) => {
  return (
    <div className="scoreboard">
      <div className="score-card user">
        <div className="player-label">You</div>
        <div className="score-value">{score.user}</div>
        <div className="player-emoji">👤</div>
      </div>
      
      <div className="score-divider">
        <span className="vs-text">VS</span>
      </div>
      
      <div className="score-card computer">
        <div className="player-label">Computer</div>
        <div className="score-value">{score.computer}</div>
        <div className="player-emoji">🤖</div>
      </div>
    </div>
  );
};

export default Scoreboard; 
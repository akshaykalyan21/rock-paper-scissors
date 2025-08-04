import React from 'react';
import './Result.css';

const Result = ({ userChoice, computerChoice, result, isAnimating, choiceEmojis }) => {
  const getResultMessage = () => {
    switch (result) {
      case 'win':
        return '🎉 You Win! 🎉';
      case 'lose':
        return '😔 You Lose! 😔';
      case 'draw':
        return '🤝 It\'s a Draw! 🤝';
      default:
        return 'Choose your weapon!';
    }
  };

  const getResultClass = () => {
    switch (result) {
      case 'win':
        return 'win';
      case 'lose':
        return 'lose';
      case 'draw':
        return 'draw';
      default:
        return '';
    }
  };

  return (
    <div className="result-container">
      <div className="choices-display">
        <div className="choice-display user-choice">
          <h4>Your Choice</h4>
          <div className={`choice-emoji-display ${userChoice ? 'show' : ''} ${isAnimating ? 'thinking' : ''}`}>
            {userChoice ? choiceEmojis[userChoice] : '❓'}
          </div>
          <p>{userChoice ? userChoice.charAt(0).toUpperCase() + userChoice.slice(1) : 'Waiting...'}</p>
        </div>

        <div className="vs-display">
          <span className="vs-text">VS</span>
          {isAnimating && (
            <div className="thinking-animation">
              <span>🤔</span>
              <span>🤔</span>
              <span>🤔</span>
            </div>
          )}
        </div>

        <div className="choice-display computer-choice">
          <h4>Computer's Choice</h4>
          <div className={`choice-emoji-display ${computerChoice ? 'show' : ''} ${isAnimating ? 'thinking' : ''}`}>
            {computerChoice ? choiceEmojis[computerChoice] : '❓'}
          </div>
          <p>{computerChoice ? computerChoice.charAt(0).toUpperCase() + computerChoice.slice(1) : 'Waiting...'}</p>
        </div>
      </div>

      <div className={`result-message ${getResultClass()}`}>
        <h3>{getResultMessage()}</h3>
        {result && (
          <div className="result-explanation">
            {result === 'win' && (
              <p>Your {userChoice} beats computer's {computerChoice}!</p>
            )}
            {result === 'lose' && (
              <p>Computer's {computerChoice} beats your {userChoice}!</p>
            )}
            {result === 'draw' && (
              <p>Both chose {userChoice} - it's a tie!</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Result; 
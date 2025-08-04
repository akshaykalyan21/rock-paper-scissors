import React, { useState, useEffect } from 'react';
import Scoreboard from './Scoreboard';
import Result from './Result';
import './Game.css';

const Game = () => {
  const [userChoice, setUserChoice] = useState(null);
  const [computerChoice, setComputerChoice] = useState(null);
  const [result, setResult] = useState('');
  const [score, setScore] = useState({ user: 0, computer: 0 });
  const [gameHistory, setGameHistory] = useState([]);
  const [isAnimating, setIsAnimating] = useState(false);

  const choices = ['rock', 'paper', 'scissors'];
  const choiceEmojis = {
    rock: '🪨',
    paper: '📄',
    scissors: '✂️'
  };

  const determineWinner = (user, computer) => {
    if (user === computer) return 'draw';
    
    const rules = {
      rock: 'scissors',
      paper: 'rock',
      scissors: 'paper'
    };
    
    return rules[user] === computer ? 'win' : 'lose';
  };

  const handleChoice = (choice) => {
    if (isAnimating) return;
    
    setIsAnimating(true);
    setUserChoice(choice);
    
    // Simulate computer thinking
    setTimeout(() => {
      const computerChoice = choices[Math.floor(Math.random() * choices.length)];
      setComputerChoice(computerChoice);
      
      const gameResult = determineWinner(choice, computerChoice);
      setResult(gameResult);
      
      // Update score
      if (gameResult === 'win') {
        setScore(prev => ({ ...prev, user: prev.user + 1 }));
      } else if (gameResult === 'lose') {
        setScore(prev => ({ ...prev, computer: prev.computer + 1 }));
      }
      
      // Add to game history
      setGameHistory(prev => [...prev, {
        user: choice,
        computer: computerChoice,
        result: gameResult,
        timestamp: new Date().toLocaleTimeString()
      }]);
      
      setIsAnimating(false);
    }, 1000);
  };

  const resetGame = () => {
    setUserChoice(null);
    setComputerChoice(null);
    setResult('');
    setScore({ user: 0, computer: 0 });
    setGameHistory([]);
  };

  const resetScore = () => {
    setScore({ user: 0, computer: 0 });
  };

  return (
    <div className="game">
      <Scoreboard score={score} />
      
      <div className="game-area">
        <div className="choices">
          <h3>Choose your weapon:</h3>
          <div className="choice-buttons">
            {choices.map((choice) => (
              <button
                key={choice}
                className={`choice-btn ${userChoice === choice ? 'selected' : ''} ${isAnimating ? 'disabled' : ''}`}
                onClick={() => handleChoice(choice)}
                disabled={isAnimating}
              >
                <span className="choice-emoji">{choiceEmojis[choice]}</span>
                <span className="choice-text">{choice.charAt(0).toUpperCase() + choice.slice(1)}</span>
              </button>
            ))}
          </div>
        </div>

        <Result 
          userChoice={userChoice}
          computerChoice={computerChoice}
          result={result}
          isAnimating={isAnimating}
          choiceEmojis={choiceEmojis}
        />
      </div>

      <div className="game-controls">
        <button className="reset-btn" onClick={resetGame}>
          🔄 New Game
        </button>
        <button className="reset-score-btn" onClick={resetScore}>
          📊 Reset Score
        </button>
      </div>

      {gameHistory.length > 0 && (
        <div className="game-history">
          <h4>Game History</h4>
          <div className="history-list">
            {gameHistory.slice(-5).reverse().map((game, index) => (
              <div key={index} className={`history-item ${game.result}`}>
                <span>{choiceEmojis[game.user]} vs {choiceEmojis[game.computer]}</span>
                <span className={`result-badge ${game.result}`}>
                  {game.result === 'win' ? '✅' : game.result === 'lose' ? '❌' : '🤝'}
                </span>
                <span className="timestamp">{game.timestamp}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Game; 
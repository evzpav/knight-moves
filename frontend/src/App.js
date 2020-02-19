import React from 'react';
// import './App.css';
import './css/board.css';

import Board from './components/Board'


function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Knight Moves</h1>

        <div className="game">
          <div className="game-board">
            <Board />
          </div>
          <div className="game-info">
            <div>Other info here</div>
            <ol>asdasda</ol>
          </div>
        </div>
      </header>
    </div>
  );
}

export default App;

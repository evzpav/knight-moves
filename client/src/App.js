import React from 'react';
import './App.css';
import './css/board.css';

import Board from './components/Board'

function App() {

  return (
    <div className="App">
      <header className="App-header">
        <h1>Knight Moves</h1>

        <div className="game">

            <Board/>
      
          <div className="game-info">

            {/* <ol>asdasda</ol> */}
          </div>
        </div>
      </header>
    </div>
  );
}

export default App;

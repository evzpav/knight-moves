import React from 'react';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import './css/skeleton.css';
import './css/prog-tracker.css';
import './css/home.css';
import './css/board.css';

import Wizard from './views/Wizard';
import Home from './views/Home';
import Board from './views/Board';

function App() {

  return (
    <Router>
      <div>
        <Switch>
          <Route path="/wizard">
            <Wizard />
          </Route>
          <Route path="/chessboard">
            <Board />
          </Route>
          <Route path="/">
            <Home />
          </Route>
        </Switch>
      </div>
    </Router>

  );
}

export default App;

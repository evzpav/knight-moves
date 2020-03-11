import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import Wizard from "./Wizard";
import Home from "./Home";
import Board from "./Board";

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

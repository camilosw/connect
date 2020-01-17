import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Home from 'pages/Home';
import Game from 'pages/Game';

const App = () => {
  return (
    <Switch>
      <Route exact path="/">
        <Home />
      </Route>
      <Route path="/game/:level">
        <Game />
      </Route>
    </Switch>
  );
};

export default App;

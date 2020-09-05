import React from 'react';
import { Route, Switch } from 'react-router-dom';

import GameRoute from 'routes/GameRoute';
import HomeRoute from 'routes/HomeRoute';

const RootRoute = () => {
  return (
    <Switch>
      <Route exact path="/">
        <HomeRoute />
      </Route>
      <Route path="/game/:size">
        <GameRoute />
      </Route>
    </Switch>
  );
};

export default RootRoute;

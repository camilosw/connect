import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';

import RootRoute from 'routes/RootRoute';
import { GlobalScoreProvider } from 'services/score';
import 'styles/index.css';

const App = () => (
  <GlobalScoreProvider>
    <Router>
      <RootRoute />
    </Router>
  </GlobalScoreProvider>
);

ReactDOM.render(<App />, document.getElementById('root'));

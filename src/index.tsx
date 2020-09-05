import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';

import GlobalScoreProvider from 'components/GlobalScoreProvider';
import Container from 'components/Layout/Container';
import RootRoute from 'routes/RootRoute';
import 'styles/index.css';

if (process.env.NODE_ENV === 'development') {
  // eslint-disable-next-line global-require, @typescript-eslint/no-var-requires
  const whyDidYouRender = require('@welldone-software/why-did-you-render');
  whyDidYouRender(React);
}

const App = () => (
  <GlobalScoreProvider>
    <Router>
      <Container>
        <RootRoute />
      </Container>
    </Router>
  </GlobalScoreProvider>
);

ReactDOM.render(<App />, document.getElementById('root'));

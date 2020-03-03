import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import Routes from 'Routes';
import Header from 'components/Layout/Header';
import Container from 'components/Layout/Container';
import GlobalScoreProvider from 'components/GlobalScoreProvider';
import 'styles/index.css';
import AuthProvider from 'components/AuthProvider';
import AuthButton from 'components/AuthButton';

if (process.env.NODE_ENV === 'development') {
  // eslint-disable-next-line global-require, @typescript-eslint/no-var-requires
  const whyDidYouRender = require('@welldone-software/why-did-you-render');
  whyDidYouRender(React);
}

const App = () => (
  <AuthProvider>
    <GlobalScoreProvider>
      <Router>
        <Container>
          <Header />
          <AuthButton />
          <Routes />
        </Container>
      </Router>
    </GlobalScoreProvider>
  </AuthProvider>
);

ReactDOM.render(<App />, document.getElementById('root'));

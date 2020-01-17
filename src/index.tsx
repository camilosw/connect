import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import Routes from 'Routes';
import Header from 'components/Layout/Header';
import Container from 'components/Layout/Container';
import 'styles/index.css';

const App = () => (
  <Router>
    <Container>
      <Header />
      <Routes />
    </Container>
  </Router>
);

ReactDOM.render(<App />, document.getElementById('root'));

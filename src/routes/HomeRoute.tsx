import React from 'react';
import { css } from 'astroturf';

import Container from 'components/Layout/Container';
import Header from 'components/Layout/Header';
import Level from 'components/Level';

const cn = css`
  .title {
    margin: 0.5rem;
  }
`;
const HomeRoute = () => {
  return (
    <div>
      <Header>
        <h1 className={cn.title}>CONNECT</h1>
      </Header>
      <Container>
        <Level title="Very small" rows={3} cols={3} />
        <Level title="Small" rows={4} cols={4} />
        <Level title="Medium" rows={5} cols={5} />
        <Level title="Large" rows={6} cols={6} />
        {/* <Level title="Fill the screen" rows={3} cols={3} />
      <Level title="Custom" rows={3} cols={3} /> */}
      </Container>
    </div>
  );
};

export default HomeRoute;

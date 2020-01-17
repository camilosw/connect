import React from 'react';
import Level from 'components/Level';
import { css } from 'astroturf';

const cn = css`
  .home {
    padding: 2rem;
  }
  .home h1 {
    text-align: center;
    margin-bottom: 2.5rem;
  }
`;

const Home = () => {
  return (
    <div className={cn.home}>
      <Level title="Very small" />
      <Level title="Small" />
      <Level title="Medium" />
      <Level title="Large" />
      <Level title="Fill the screen" />
      <Level title="Custom" />
    </div>
  );
};

export default Home;

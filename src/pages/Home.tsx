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
      <Level title="Very small" rows={3} cols={3} />
      <Level title="Small" rows={4} cols={4} />
      <Level title="Medium" rows={5} cols={5} />
      <Level title="Large" rows={6} cols={6} />
      {/* <Level title="Fill the screen" rows={3} cols={3} />
      <Level title="Custom" rows={3} cols={3} /> */}
    </div>
  );
};

export default Home;

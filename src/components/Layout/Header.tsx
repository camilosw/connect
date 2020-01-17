import React from 'react';
import { css } from 'astroturf';

const cn = css`
  .header {
    text-align: center;
    margin-top: 0.5rem;
  }
  .header h1 {
    margin-bottom: 0;
  }
`;

const Header = () => {
  return (
    <div className={cn.header}>
      <h1>CONNECTRON</h1>
    </div>
  );
};

export default Header;

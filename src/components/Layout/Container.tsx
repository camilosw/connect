import React from 'react';
import { css } from 'astroturf';

const cn = css`
  .container {
    display: flex;
    flex-direction: column;
    min-height: 100vh;
  }
`;

interface Props {
  children: React.ReactNode;
}

const index = ({ children }: Props) => {
  return <div className={cn.container}>{children}</div>;
};

export default index;

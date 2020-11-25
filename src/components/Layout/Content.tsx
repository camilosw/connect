import React from 'react';
import { css } from 'astroturf';

const cn = css`
  .content {
    display: flex;
    flex-direction: column;
    width: 24rem;
  }
`;

interface Props {
  children: React.ReactNode;
}

const index = ({ children }: Props) => {
  return <div className={cn.content}>{children}</div>;
};

export default index;

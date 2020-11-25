import React from 'react';
import { css } from 'astroturf';

const cn = css`
  .header {
    text-align: center;
    background-color: var(--blue);
    padding: 0.5rem;
    margin-bottom: 2rem;
    color: #fff;
    height: 3rem;
  }
`;

interface Props {
  children: React.ReactNode;
}

const Header = ({ children }: Props) => {
  return <div className={cn.header}>{children}</div>;
};

export default Header;

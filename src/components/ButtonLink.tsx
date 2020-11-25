import React, { AnchorHTMLAttributes, DetailedHTMLProps } from 'react';
import { css } from 'astroturf';

const cn = css`
  .link {
    font-size: 1.5rem;
    line-height: 0;
    color: #fff;
    text-decoration: none;
    padding: 0.5rem 1.5rem;
    border-radius: 0.5rem;
    outline: none;
  }
`;

type Props = DetailedHTMLProps<
  AnchorHTMLAttributes<HTMLAnchorElement>,
  HTMLAnchorElement
>;

const ButtonLink = ({ className, children, ...rest }: Props) => {
  return (
    <a {...rest} className={[className, cn.link].join(' ')}>
      {children}
    </a>
  );
};

export default ButtonLink;

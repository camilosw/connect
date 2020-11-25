import React, { ButtonHTMLAttributes, DetailedHTMLProps } from 'react';
import { css } from 'astroturf';

const cn = css`
  .button {
    font-size: 1.5rem;
    line-height: 0;
    text-decoration: none;
    color: #fff;
    background-color: inherit;
    padding: 0.5rem 1.5rem;
    border: none;
    border-radius: 0.5rem;
    display: inline-block;
    outline: none;
  }
`;

type Props = DetailedHTMLProps<
  ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
>;

const Button = ({ className, ...rest }: Props) => {
  return <button {...rest} className={[className, cn.button].join(' ')} />;
};

export default Button;

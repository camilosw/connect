import React, { ButtonHTMLAttributes, DetailedHTMLProps } from 'react';
import { css } from 'astroturf';

const cn = css`
  .button {
    background-color: var(--blue);
    text-decoration: none;
    color: #fff;
    padding: 0.5rem 1.5rem;
    border-radius: 0.5rem;
    display: inline-block;
    outline: none;
  }
  .blue {
    background-color: var(--blue);
  }
  .gray {
    background-color: var(--gray);
    color: var(--dark-gray);
  }
`;

type Props = DetailedHTMLProps<
  ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
> & {
  variant?: 'gray' | 'blue';
};

const Button = ({ className, variant, ...rest }: Props) => {
  const variantClass = cn[variant || 'blue'];

  return (
    <button
      {...rest}
      className={[className, cn.button, variantClass].join(' ')}
    />
  );
};

export default Button;

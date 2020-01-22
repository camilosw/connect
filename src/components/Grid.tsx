import React from 'react';
import Cell from 'components/Cell';
import { css } from 'astroturf';

const cn = css`
  .grid {
    display: grid;
    grid-template-columns: 3rem 3rem 3rem 3rem 3rem 3rem;
  }
`;

const index = () => {
  return (
    <div className={cn.grid}>
      <Cell shape={0b000101} />
      <Cell shape={0b001010} />
      <Cell shape={0b000011} />
      <Cell shape={0b000111} />
      <Cell shape={0b001111} />
      <Cell shape={0b011111} />
      <Cell shape={0b100001} />
      <Cell shape={0b000110} />
      <Cell shape={0b001100} />
      <Cell shape={0b001001} />
      <Cell shape={0b001111} />
      <Cell shape={0b001111} />
      <Cell shape={0b001111} />
      <Cell shape={0b001111} />
      <Cell shape={0b001111} />
      <Cell shape={0b001111} />
      <Cell shape={0b001111} />
      <Cell shape={0b001111} />
      <Cell shape={0b001111} />
      <Cell shape={0b001111} />
      <Cell shape={0b001111} />
      <Cell shape={0b001111} />
      <Cell shape={0b001111} />
      <Cell shape={0b001111} />
      <Cell shape={0b001111} />
      <Cell shape={0b001111} />
      <Cell shape={0b001111} />
      <Cell shape={0b001111} />
      <Cell shape={0b001111} />
      <Cell shape={0b001111} />
      <Cell shape={0b001111} />
      <Cell shape={0b001111} />
      <Cell shape={0b001111} />
      <Cell shape={0b001111} />
      <Cell shape={0b001111} />
      <Cell shape={0b001111} />
    </div>
  );
};

export default index;

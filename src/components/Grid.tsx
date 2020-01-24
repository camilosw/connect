import React from 'react';
import Cell from 'components/Cell';
import { css } from 'astroturf';

import generateMaze from 'helpers/generateMaze';

const cn = css`
  .grid {
    display: grid;
    grid-template-columns: 3rem 3rem 3rem 3rem 3rem 3rem;
  }
`;

const Grid = () => {
  const maze = generateMaze(6, 6);

  return (
    <div className={cn.grid}>
      {maze.map((cell, index) => (
        <Cell shape={cell} key={index} />
      ))}
    </div>
  );
};

export default Grid;

import React from 'react';
import Cell from 'components/Cell';
import { css } from 'astroturf';

import generateMaze from 'helpers/generateMaze';
import randomInt from 'helpers/randomInt';

const cn = css`
  .grid {
    display: grid;
    grid-template-columns: 3rem 3rem 3rem 3rem 3rem 3rem;
  }
`;

const Grid = () => {
  const rows = 6;
  const columns = 6;
  const maze = generateMaze(rows, columns);
  const row = randomInt(rows);
  const column = randomInt(columns);
  maze[column + row * columns] |= 0b10000;

  return (
    <div className={cn.grid}>
      {maze.map((cell, index) => (
        <Cell shape={cell} key={index} />
      ))}
    </div>
  );
};

export default Grid;

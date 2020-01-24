import React, { useState } from 'react';
import Cell from 'components/Cell';
import { css } from 'astroturf';

import generateMaze from 'helpers/generateMaze';
import randomInt from 'helpers/randomInt';
import rotateCell from 'helpers/rotateCell';

const cn = css`
  .grid {
    display: grid;
    grid-template-columns: 3rem 3rem 3rem 3rem 3rem 3rem;
  }
`;

const Grid = () => {
  const rows = 6;
  const columns = 6;
  const newMaze = generateMaze(rows, columns);
  const rotatedMaze = newMaze.map(cell => rotateCell(cell, randomInt(4)));

  const row = randomInt(rows);
  const column = randomInt(columns);
  rotatedMaze[column + row * columns] |= 0b10000;

  const [maze, setMaze] = useState(rotatedMaze);

  const handleClick = (index: number) => {
    const changedMaze = maze.slice();
    const cell = maze[index] & 0b1111;
    const start = maze[index] & 0b10000;
    changedMaze[index] = rotateCell(cell, 1) | start;
    setMaze(changedMaze);
  };

  return (
    <div className={cn.grid}>
      {maze.map((cell, index) => (
        <Cell shape={cell} key={index} onClick={() => handleClick(index)} />
      ))}
    </div>
  );
};

export default Grid;

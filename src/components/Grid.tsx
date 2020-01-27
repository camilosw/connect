import React, { useState } from 'react';
import Tile from 'components/Tile';
import { css } from 'astroturf';

import rotateCell from 'helpers/rotateCell';
import { Maze } from 'types';
import checkConnected from 'helpers/checkConnected';
import { directionFlags, statusFlags } from 'helpers/maze';

const cn = css`
  .grid {
    display: grid;
    grid-template-columns: 3rem 3rem 3rem 3rem 3rem 3rem;
  }
`;

interface Props {
  maze: Maze;
}

const Grid = ({ maze }: Props) => {
  const [cells, setCells] = useState(maze.cells);

  const handleClick = (index: number) => {
    const changedCells = cells.slice();
    const cell = cells[index] & directionFlags;
    const otherFlags = cells[index] & statusFlags;
    changedCells[index] = rotateCell(cell, 1) | otherFlags;

    const { cells: connectedCells } = checkConnected({
      ...maze,
      cells: changedCells,
    });
    setCells(connectedCells);
  };

  return (
    <div className={cn.grid}>
      {cells.map((cell, index) => (
        <Tile cell={cell} key={index} onClick={() => handleClick(index)} />
      ))}
    </div>
  );
};

export default Grid;

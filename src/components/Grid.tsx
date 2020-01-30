import React, { useReducer } from 'react';
import Tile from 'components/Tile';
import { css } from 'astroturf';

import rotateCell from 'helpers/rotateCell';
import { Maze } from 'types';
import checkConnected from 'helpers/checkConnected';
import { directionFlags, statusFlags, flags } from 'helpers/maze';

const cn = css`
  .grid {
    display: grid;
    grid-template-columns: 3rem 3rem 3rem 3rem 3rem 3rem;
  }
`;

interface Props {
  maze: Maze;
}

interface Action {
  type: 'START_ROTATION' | 'END_ROTATION';
  index: number;
}

const cellRotationStart = (index: number, maze: Maze) => {
  const changedCells = maze.cells.slice();
  changedCells[index] = maze.cells[index] | flags.rotating;

  return checkConnected({
    ...maze,
    cells: changedCells,
  });
};

const cellRotationEnd = (index: number, maze: Maze) => {
  const changedCells = maze.cells.slice();
  const cell = maze.cells[index] & directionFlags;
  const otherFlags = maze.cells[index] & statusFlags;
  changedCells[index] = rotateCell(cell, 1) | otherFlags;
  changedCells[index] &= ~flags.rotating;

  return checkConnected({
    ...maze,
    cells: changedCells,
  });
};

const reducer = (state: Maze, action: Action): Maze => {
  switch (action.type) {
    case 'START_ROTATION':
      return cellRotationStart(action.index, state);

    case 'END_ROTATION':
      return cellRotationEnd(action.index, state);

    default:
      return state;
  }
};

const Grid = ({ maze }: Props) => {
  const [mazeState, dispatch] = useReducer(reducer, maze);

  const handleTouch = (index: number) => {
    dispatch({ type: 'START_ROTATION', index });
  };

  const handleRotationFinish = (index: number) => {
    dispatch({ type: 'END_ROTATION', index });
  };

  return (
    <div className={cn.grid}>
      {mazeState.cells.map((cell, index) => (
        <Tile
          cell={cell}
          key={index}
          onTouch={() => handleTouch(index)}
          onRotationEnd={() => handleRotationFinish(index)}
        />
      ))}
    </div>
  );
};

export default Grid;

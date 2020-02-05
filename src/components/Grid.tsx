import React, { useReducer, useEffect } from 'react';
import Tile from 'components/Tile';
import { css } from 'astroturf';

import rotateCell from 'helpers/rotateCell';
import { Maze } from 'types';
import checkConnected from 'helpers/checkConnected';
import { directionFlags, statusFlags, flags } from 'helpers/maze';

const cn = css`
  .grid {
    display: grid;
  }
`;

interface Props {
  maze: Maze;
  onFinish(): void;
}

interface State {
  maze: Maze;
  finished: boolean;
}

interface ActionRotation {
  type: 'START_ROTATION' | 'END_ROTATION';
  index: number;
}

interface ActionUpdateMaze {
  type: 'UPDATE_MAZE';
  maze: Maze;
}

type Action = ActionRotation | ActionUpdateMaze;

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

const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case 'START_ROTATION':
      return { ...state, maze: cellRotationStart(action.index, state.maze) };

    case 'END_ROTATION': {
      const maze = cellRotationEnd(action.index, state.maze);
      const connected = maze.cells.filter(cell => cell & flags.visited).length;
      const finished = connected === maze.cells.length;
      return { finished, maze };
    }

    case 'UPDATE_MAZE':
      return { ...state, maze: action.maze };

    default:
      return state;
  }
};

const Grid = ({ maze, onFinish }: Props) => {
  const [mazeState, dispatch] = useReducer(reducer, { maze, finished: false });

  const columnsStyle = Array(maze.columns)
    .fill('3rem')
    .join(' ');

  useEffect(() => {
    if (mazeState.finished) {
      onFinish();
    }
  }, [mazeState.finished]);

  useEffect(() => dispatch({ type: 'UPDATE_MAZE', maze }), [maze]);

  const handleTouch = (index: number) => {
    dispatch({ type: 'START_ROTATION', index });
  };

  const handleRotationFinish = (index: number) => {
    dispatch({ type: 'END_ROTATION', index });
  };

  return (
    <div className={cn.grid} style={{ gridTemplateColumns: columnsStyle }}>
      {mazeState.maze.cells.map((cell, index) => (
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

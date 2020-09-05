import { useReducer } from 'react';

import { checkConnected } from './checkConnected';
import { generateMaze } from './generateMaze';
import { randomInt } from './randomInt';
import { rotateCell } from './rotateCell';
import { Maze } from './types';

interface MazeParams {
  rows: number;
  cols: number;
}

const createGameMaze = ({ rows, cols }: MazeParams) => {
  const maze = generateMaze(rows, cols);
  const rotatedCells = maze.cells.map(cell => rotateCell(cell, randomInt(4)));
  const rotatedMaze = { ...maze, cells: rotatedCells };
  return checkConnected(rotatedMaze);
};

const reducer = (state: Maze, { rows, cols }: MazeParams) => {
  return createGameMaze({ rows, cols });
};

export const useGenerateGameMaze = ({
  rows,
  cols,
}: MazeParams): [Maze, () => void] => {
  const [state, dispatch] = useReducer(reducer, { rows, cols }, createGameMaze);

  const updateMaze = () => {
    dispatch({ rows, cols });
  };

  return [state, updateMaze];
};

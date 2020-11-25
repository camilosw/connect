import { useState } from 'react';

import { checkConnected } from './checkConnected';
import { generateMaze } from './generateMaze';
import { randomInt } from './randomInt';
import { rotateCell } from './rotateCell';
import { Maze } from './types';

export interface MazeParams {
  rows: number;
  cols: number;
}

const createGameMaze = ({ rows, cols }: MazeParams) => {
  const maze = generateMaze(rows, cols);
  const rotatedCells = maze.cells.map(cell => rotateCell(cell, randomInt(4)));
  const rotatedMaze = { ...maze, cells: rotatedCells };
  return checkConnected(rotatedMaze);
};

export const useGenerateGameMaze = ({ rows, cols }: MazeParams) => {
  const [maze, setMaze] = useState<Maze | undefined>();

  const updateMaze = () => {
    setMaze(createGameMaze({ rows, cols }));
  };

  return [maze, updateMaze] as const;
};

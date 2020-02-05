import { useReducer } from 'react';

import generateMaze from 'helpers/generateMaze';
import randomInt from 'helpers/randomInt';
import rotateCell from 'helpers/rotateCell';
import checkConnections from 'helpers/checkConnected';
import { Maze } from 'types';

interface MazeParams {
  rows: number;
  cols: number;
}

const createGameMaze = ({ rows, cols }: MazeParams) => {
  const maze = generateMaze(rows, cols);
  const rotatedCells = maze.cells.map(cell => rotateCell(cell, randomInt(4)));
  const rotatedMaze = { ...maze, cells: rotatedCells };
  return checkConnections(rotatedMaze);
};

const reducer = (state: Maze, { rows, cols }: MazeParams) => {
  return createGameMaze({ rows, cols });
};

const useGenerateGameMaze = ({
  rows,
  cols,
}: MazeParams): [Maze, () => void] => {
  const [state, dispatch] = useReducer(reducer, { rows, cols }, createGameMaze);

  const updateMaze = () => {
    dispatch({ rows, cols });
  };

  return [state, updateMaze];
};

export default useGenerateGameMaze;

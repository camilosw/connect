import { flags } from './flags';
import { getCellValueFn, getIndexFn, getNeighbors } from './maze';
import { randomInt } from './randomInt';
import { Maze, Position } from './types';

const randomizeList = <T>(list: T[]) =>
  list.slice().sort(() => Math.random() - 0.5);

const unvisitedNeighbor = (rows: number, columns: number) => (
  position: Position,
  maze: number[],
) => {
  const getCellValue = getCellValueFn(columns, maze);

  const neighbors = getNeighbors(rows, columns, position);
  const unvisited = neighbors.filter(neighbor => getCellValue(neighbor) === 0);

  return unvisited.length ? randomizeList(unvisited)[0] : null;
};

const connectCells = (columns: number) => (
  cell1: Position,
  cell2: Position,
  cells: number[],
) => {
  const getIndex = getIndexFn(columns);
  /* eslint-disable no-param-reassign */
  if (cell1.x === cell2.x) {
    if (cell1.y < cell2.y) {
      cells[getIndex(cell1)] |= flags.bottom;
      cells[getIndex(cell2)] |= flags.top;
    } else {
      cells[getIndex(cell1)] |= flags.top;
      cells[getIndex(cell2)] |= flags.bottom;
    }
  } else if (cell1.y === cell2.y) {
    if (cell1.x < cell2.x) {
      cells[getIndex(cell1)] |= flags.right;
      cells[getIndex(cell2)] |= flags.left;
    } else {
      cells[getIndex(cell1)] |= flags.left;
      cells[getIndex(cell2)] |= flags.right;
    }
  }
};

export const generateMaze = (rows: number, columns: number): Maze => {
  const getUnvisitedNeighbor = unvisitedNeighbor(rows, columns);
  const makeCellConnection = connectCells(columns);

  const cells = new Array(rows * columns).fill(0);
  let visited = [{ x: randomInt(columns), y: randomInt(rows) }];

  while (visited.length) {
    let currentPosition: Position;
    if (Math.random() > 0.3) {
      currentPosition = visited[visited.length - 1];
    } else {
      currentPosition = visited[randomInt(visited.length - 1)];
    }

    const nextPosition = getUnvisitedNeighbor(currentPosition, cells);
    if (nextPosition) {
      makeCellConnection(currentPosition, nextPosition, cells);
      visited.push(nextPosition);
    } else {
      visited = visited.filter(
        cell => !(cell.x === currentPosition.x && cell.y === currentPosition.y),
      );
    }
  }

  const start = { x: randomInt(columns), y: randomInt(rows) };
  cells[start.x + start.y * columns] |= flags.start;

  return {
    rows,
    columns,
    cells,
    start,
  };
};

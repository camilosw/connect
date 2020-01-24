import randomInt from 'helpers/randomInt';

interface Cell {
  x: number;
  y: number;
}

const randomizeList = <T>(list: T[]) =>
  list.slice().sort(() => Math.random() - 0.5);

const getIndex = (cell: Cell, columns: number) => cell.x + cell.y * columns;

const cellValue = (columns: number, maze: number[]) => (cell: Cell) =>
  maze[getIndex(cell, columns)];

const unvisitedNeighbor = (rows: number, columns: number) => (
  cell: Cell,
  maze: number[],
) => {
  const getCellValue = cellValue(columns, maze);
  const list: Cell[] = [];

  if (cell.x > 0) {
    const neighborCell = { x: cell.x - 1, y: cell.y };
    if (getCellValue(neighborCell) === 0) list.push(neighborCell);
  }
  if (cell.x < columns - 1) {
    const neighborCell = { x: cell.x + 1, y: cell.y };
    if (getCellValue(neighborCell) === 0) list.push(neighborCell);
  }
  if (cell.y > 0) {
    const neighborCell = { x: cell.x, y: cell.y - 1 };
    if (getCellValue(neighborCell) === 0) list.push(neighborCell);
  }
  if (cell.y < rows - 1) {
    const neighborCell = { x: cell.x, y: cell.y + 1 };
    if (getCellValue(neighborCell) === 0) list.push(neighborCell);
  }

  return list.length ? randomizeList(list)[0] : undefined;
};

const connectCells = (columns: number) => (
  cell1: Cell,
  cell2: Cell,
  maze: number[],
) => {
  /* eslint-disable no-param-reassign */
  if (cell1.x === cell2.x) {
    if (cell1.y < cell2.y) {
      maze[getIndex(cell1, columns)] |= 0b0100;
      maze[getIndex(cell2, columns)] |= 0b0001;
    } else {
      maze[getIndex(cell1, columns)] |= 0b0001;
      maze[getIndex(cell2, columns)] |= 0b0100;
    }
  } else if (cell1.y === cell2.y) {
    if (cell1.x < cell2.x) {
      maze[getIndex(cell1, columns)] |= 0b0010;
      maze[getIndex(cell2, columns)] |= 0b1000;
    } else {
      maze[getIndex(cell1, columns)] |= 0b1000;
      maze[getIndex(cell2, columns)] |= 0b0010;
    }
  }
};

export default (rows: number, columns: number) => {
  const getUnvisitedNeighbor = unvisitedNeighbor(rows, columns);
  const makeCellConnection = connectCells(columns);

  const maze = new Array(rows * columns).fill(0);
  let visited = [];
  const startCell = { x: randomInt(columns), y: randomInt(rows) };
  visited.push(startCell);

  while (visited.length) {
    let currentCell: Cell;
    if (Math.random() > 0.3) {
      currentCell = visited[visited.length - 1];
    } else {
      currentCell = visited[randomInt(visited.length - 1)];
    }

    const nextCell = getUnvisitedNeighbor(currentCell, maze);
    if (nextCell) {
      makeCellConnection(currentCell, nextCell, maze);
      visited.push(nextCell);
    } else {
      visited = visited.filter(
        cell => !(cell.x === currentCell.x && cell.y === currentCell.y),
      );
    }
  }

  return maze;
};

import { Position } from 'types';

export const flags = {
  top: 0b1,
  right: 0b10,
  bottom: 0b100,
  left: 0b1000,
  start: 0b10000,
  visited: 0b100000,
};

export const directionFlags = 0b1111;
export const statusFlags = ~directionFlags;

export const getIndexFn = (columns: number) => (position: Position) =>
  position.x + position.y * columns;

export const getCellValueFn = (columns: number, cells: number[]) => (
  position: Position,
) => cells[getIndexFn(columns)(position)];

export const getNeighbors = (
  rows: number,
  columns: number,
  position: Position,
) => {
  const list: Position[] = [];

  if (position.x > 0) {
    list.push({ x: position.x - 1, y: position.y });
  }
  if (position.x < columns - 1) {
    list.push({ x: position.x + 1, y: position.y });
  }
  if (position.y > 0) {
    list.push({ x: position.x, y: position.y - 1 });
  }
  if (position.y < rows - 1) {
    list.push({ x: position.x, y: position.y + 1 });
  }

  return list;
};

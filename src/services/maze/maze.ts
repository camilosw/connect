import { Position } from './types';

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

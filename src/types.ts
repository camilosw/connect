export interface Position {
  x: number;
  y: number;
}

export interface Maze {
  rows: number;
  columns: number;
  cells: number[];
  start: Position;
}

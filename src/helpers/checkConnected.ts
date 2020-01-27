import { Maze, Position } from 'types';
import { getCellValueFn, getNeighbors, flags } from 'helpers/maze';

const isConnectionFn = (columns: number, cells: number[]) => (
  position1: Position,
  position2: Position,
) => {
  const getCellValue = getCellValueFn(columns, cells);
  const cell1 = getCellValue(position1);
  const cell2 = getCellValue(position2);

  if (position1.x === position2.x) {
    if (position1.y < position2.y) {
      return cell1 & flags.bottom && cell2 & flags.top;
    }
    return cell1 & flags.top && cell2 & flags.bottom;
  }
  if (position1.y === position2.y) {
    if (position1.x < position2.x) {
      return cell1 & flags.right && cell2 & flags.left;
    }
    return cell1 & flags.left && cell2 & flags.right;
  }

  return undefined;
};

const unvisitedConnectionFn = (rows: number, columns: number) => (
  position: Position,
  cells: number[],
) => {
  const getCellValue = getCellValueFn(columns, cells);
  const isConnection = isConnectionFn(columns, cells);

  const neighbors = getNeighbors(rows, columns, position);
  const unvisited = neighbors.filter(
    neighbor =>
      isConnection(position, neighbor) &&
      !(getCellValue(neighbor) & flags.visited),
  );

  return unvisited.length ? unvisited[0] : null;
};

export default (maze: Maze) => {
  const getUnvisitedConnection = unvisitedConnectionFn(maze.rows, maze.columns);

  const cells = maze.cells.map(cell => cell & (flags.visited - 1));
  const visited: Position[] = [maze.start];

  while (visited.length) {
    const currentPosition = visited[visited.length - 1];
    cells[currentPosition.x + currentPosition.y * maze.rows] |= flags.visited;

    const nextPosition = getUnvisitedConnection(currentPosition, cells);
    if (nextPosition) {
      visited.push(nextPosition);
    } else {
      visited.pop();
    }
  }

  return { ...maze, cells };
};

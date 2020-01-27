import React from 'react';
import Grid from 'components/Grid';
import { css } from 'astroturf';

import generateMaze from 'helpers/generateMaze';
import randomInt from 'helpers/randomInt';
import rotateCell from 'helpers/rotateCell';
import checkConnections from 'helpers/checkConnected';

const cn = css`
  .game {
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
  .container {
    background-color: #fff;
    border-radius: 1.5rem;
    padding: 1.5rem;
  }
  .score {
    display: flex;
    justify-content: space-around;
    width: 100%;
    margin-bottom: 2rem;
    text-align: center;
    text-transform: uppercase;
  }
  .label {
    opacity: 0.7;
    margin-bottom: 0.5rem;
  }
  .value {
    font-size: 1.75rem;
  }
  .playArea {
    align-self: center;
    display: flex;
    flex-direction: column;
    justify-content: center;
  }
`;

const Game = () => {
  const maze = generateMaze(6, 6);
  const rotatedCells = maze.cells.map(cell => rotateCell(cell, randomInt(4)));
  const rotatedMaze = { ...maze, cells: rotatedCells };
  const connectedMaze = checkConnections(rotatedMaze);

  return (
    <div className={cn.game}>
      <div className={cn.container}>
        <div className={cn.score}>
          <div>
            <div className={cn.label}>Time</div>
            <div className={cn.value}>00:00:00</div>
          </div>
          <div>
            <div className={cn.label}>Taps</div>
            <div className={cn.value}>4</div>
          </div>
        </div>
        <div className={cn.playArea}>
          <Grid maze={connectedMaze} />
        </div>
      </div>
    </div>
  );
};

export default Game;

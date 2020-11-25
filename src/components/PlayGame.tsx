import React, { useEffect } from 'react';
import { css } from 'astroturf';

import Button from 'components/Button';
import Game from 'components/Game';
import GameScore from 'components/GameScore';
import { MazeParams, useGenerateGameMaze } from 'services/maze';
import { useGlobalScore, usePlayScore } from 'services/score';
import { stats } from 'services/stats';

const cn = css`
  .playArea {
    position: relative;
    display: flex;
    justify-content: center;
    margin-bottom: 1.5rem;
  }
  .finishOverlay {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(255, 255, 255, 0.2);
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .actions {
    display: flex;
    justify-content: center;
  }
  .buttonShadow {
    box-shadow: 0px 3px 8px rgba(0, 0, 0, 0.3);
  }
`;

const usePlayGame = ({ rows, cols }: MazeParams) => {
  const [maze, createMaze] = useGenerateGameMaze({ rows, cols });
  const {
    time,
    taps,
    stop: stopScore,
    start: startScore,
    tap,
  } = usePlayScore();
  const { saveScore } = useGlobalScore();

  const level = `${rows}x${cols}`;

  const start = () => {
    stopScore();
    createMaze();
    startScore();
    stats.startGame(level);
  };

  const stop = () => {
    stopScore();
    saveScore(level, { time, taps });
    stats.endGame(level);
  };

  return {
    maze,
    time,
    taps,
    start,
    tap,
    stop,
  };
};

interface Props {
  rows: number;
  cols: number;
}

const PlayGame = ({ rows, cols }: Props) => {
  const { maze, time, taps, start, stop, tap } = usePlayGame({ rows, cols });

  useEffect(() => start(), []);

  if (!maze) return null;

  return (
    <>
      <GameScore time={time} taps={taps} />
      <Button onClick={start}>Restart</Button>
      <div className={cn.playArea}>
        <Game maze={maze} onTouch={tap} onFinish={stop} />
      </div>
    </>
  );
};

export default PlayGame;

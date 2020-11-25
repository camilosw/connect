import React, { useEffect } from 'react';
import { Link, useHistory, useParams } from 'react-router-dom';
import { faChevronLeft, faRedo } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { css } from 'astroturf';

import Button from 'components/Button';
import ButtonLink from 'components/ButtonLink';
import Game from 'components/Game';
import GameScore from 'components/GameScore';
import Container from 'components/Layout/Container';
import Header from 'components/Layout/Header';
import { MazeParams, useGenerateGameMaze } from 'services/maze';
import { useGlobalScore, usePlayScore } from 'services/score';
import { stats } from 'services/stats';

const cn = css`
  .header {
    display: flex;
    align-items: center;
  }
  .gameArea {
    padding: 1.5rem;
    display: flex;
    justify-content: center;
  }
`;

const useGetSize = () => {
  const { size } = useParams<{ size: string }>();

  const sizes = size.split('-');

  if (sizes.length !== 2) {
    return { rows: 0, cols: 0 };
  }

  const [rowsString, colsString] = sizes;
  const rows = Number(rowsString);
  const cols = Number(colsString);
  if (!Number.isInteger(rows) || !Number.isInteger(cols)) {
    return { rows: 0, cols: 0 };
  }

  return { rows, cols };
};

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

const GameRoute = () => {
  const history = useHistory();
  const { rows, cols } = useGetSize();
  const { maze, time, taps, start, stop, tap } = usePlayGame({ rows, cols });

  useEffect(() => start(), []);

  if (!rows || !cols) {
    history.replace('/');
    return null;
  }

  if (!maze) return null;

  return (
    <div>
      <Header>
        <Container>
          <div className={cn.header}>
            <Link to="/" component={ButtonLink}>
              <FontAwesomeIcon icon={faChevronLeft} />
            </Link>
            <GameScore time={time} taps={taps} />
            <Button onClick={start}>
              <FontAwesomeIcon icon={faRedo} />
            </Button>
          </div>
        </Container>
      </Header>
      <div className={cn.gameArea}>
        <Game maze={maze} onTouch={tap} onFinish={stop} />
      </div>
    </div>
  );
};

export default GameRoute;

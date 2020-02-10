import React, { useState, useEffect, useRef } from 'react';
import Grid from 'components/Grid';
import { css } from 'astroturf';

import Button from 'components/Button';
import GameScore from 'components/GameScore';
import useGenerateGameMaze from 'hooks/useGenerateGameMaze';
import usePlayScore from 'hooks/usePlayScore';

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

interface Props {
  rows: number;
  cols: number;
}

const PlayGame = ({ rows, cols }: Props) => {
  const [finish, setFinish] = useState(false);
  const [maze, updateMaze] = useGenerateGameMaze({ rows, cols });
  const {
    time,
    taps,
    stop: stopScore,
    start: startScore,
    tap,
  } = usePlayScore();

  const didMount = useRef(false);

  useEffect(() => {
    if (!finish && didMount.current) {
      updateMaze();
    }
    didMount.current = true;
  }, [finish, didMount]);

  useEffect(() => startScore(), []);

  const handleFinish = () => {
    setFinish(true);
    stopScore();
  };

  const handleRestart = () => {
    setFinish(false);
    startScore();
  };

  const handleOnTouch = () => {
    tap();
  };

  return (
    <>
      <GameScore time={time} taps={taps} />
      <div className={cn.playArea}>
        <Grid maze={maze} onTouch={handleOnTouch} onFinish={handleFinish} />
        {finish && (
          <div className={cn.finishOverlay}>
            <div className={cn.actions}>
              <Button
                variant="gray"
                className={cn.buttonShadow}
                onClick={handleRestart}
              >
                Play again
              </Button>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default PlayGame;

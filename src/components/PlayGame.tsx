import React, { useState, useEffect, useRef } from 'react';
import Grid from 'components/Grid';
import { css } from 'astroturf';

import Button from 'components/Button';
import useGenerateGameMaze from 'hooks/useGenerateGameMaze';

const cn = css`
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
    position: relative;
    align-self: center;
    display: flex;
    flex-direction: column;
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
  const didMount = useRef(false);

  useEffect(() => {
    if (!finish && didMount.current) {
      updateMaze();
    }
    didMount.current = true;
  }, [finish, didMount]);

  return (
    <>
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
        <Grid maze={maze} onFinish={() => setFinish(true)} />
        {finish && (
          <div className={cn.finishOverlay}>
            <div className={cn.actions}>
              <Button
                variant="gray"
                className={cn.buttonShadow}
                onClick={() => setFinish(false)}
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

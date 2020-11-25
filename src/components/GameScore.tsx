import React from 'react';
import { css } from 'astroturf';

import { formatTime } from 'services/format';

const cn = css`
  .score {
    display: flex;
    justify-content: space-around;
    width: 100%;
    min-width: 10rem;
    text-align: center;
    text-transform: uppercase;
  }
  .label {
    color: var(--gray);
  }
  .value {
    font-size: 1.25rem;
  }
`;

interface Props {
  time: number;
  taps: number;
}

const GameScore = ({ time, taps }: Props) => {
  return (
    <div className={cn.score}>
      <div>
        <div className={cn.label}>Time</div>
        <div className={cn.value}>{formatTime(time)}</div>
      </div>
      <div>
        <div className={cn.label}>Taps</div>
        <div className={cn.value}>{taps}</div>
      </div>
    </div>
  );
};

export default GameScore;

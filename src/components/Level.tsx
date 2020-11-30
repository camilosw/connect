import React from 'react';
import { Link } from 'react-router-dom';
import { css } from 'astroturf';

import { formatTime } from 'services/format';
import { Score, useGlobalScore } from 'services/score';

const cn = css`
  .level {
    display: block;
    border-radius: 1rem;
    padding: 1rem;
    padding-top: 0;
    margin: 0 1rem 1.5rem;
    background-color: #fff;
    box-shadow: 0 4px var(--blue-dark);
  }
  .level h2 {
    text-align: center;
    margin: 0rem -1rem 1rem;
    padding: 0.5rem;
    text-transform: uppercase;
    background-color: var(--blue);
    color: #fff;
    border-top-left-radius: 1rem;
    border-top-right-radius: 1rem;
  }
  a.level {
    text-decoration: none;
    color: var(--dark-gray);
  }
  .score {
    display: flex;
    justify-content: space-around;
    width: 100%;
  }
  .item {
    flex: 1;
    text-align: center;
    /* padding-bottom: 1.5rem; */
  }
  .item .label {
    margin-top: 0;
    opacity: 0.7;
    text-transform: uppercase;
    margin-bottom: 0.5rem;
  }
  .item .value {
    font-size: 1.25rem;
    margin: 0.25rem 0;
  }
`;

interface ScoreValuesProps {
  title: string;
  score?: Score;
}

const ScoreValues = ({ title, score }: ScoreValuesProps) => {
  return (
    <div className={cn.item}>
      <div className={cn.label}>{title}</div>
      {score ? (
        <>
          <div className={cn.value}>{formatTime(score.time)}</div>
          <div className={cn.value}>{score.taps} taps</div>
        </>
      ) : (
        <div>-</div>
      )}
    </div>
  );
};

interface Props {
  title: string;
  cells?: number;
  rows: number;
  cols: number;
}

const Level = ({ title, rows, cols }: Props) => {
  const { score } = useGlobalScore();

  const level = `${rows}x${cols}`;
  const { best, last } = score[level] || {};

  return (
    <Link to={`/game/${rows}-${cols}`} className={cn.level}>
      <h2>{title}</h2>

      <div className={cn.score}>
        <ScoreValues title="Best" score={best} />
        <ScoreValues title="Last" score={last} />
      </div>
    </Link>
  );
};

export default Level;

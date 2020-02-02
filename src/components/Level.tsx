import React from 'react';
import { Link } from 'react-router-dom';
import { css } from 'astroturf';

const cn = css`
  .level {
    display: block;
    border-radius: 1rem;
    padding: 1.5rem;
    padding-bottom: 1rem;
    margin-bottom: 1.5rem;
    background-color: #fff;
  }
  .level h2 {
    text-align: center;
    margin-top: 0;
    text-transform: uppercase;
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
  .item:first-child {
    /* border-right: 1px solid var(--gray); */
  }
`;

interface Props {
  title: string;
  cells?: number;
  rows: number;
  cols: number;
}

const Level = ({ title, rows, cols }: Props) => {
  return (
    <Link to={`/game/${rows}-${cols}`} className={cn.level}>
      <h2>{title}</h2>

      <div className={cn.score}>
        <div className={cn.item}>
          <div className={cn.label}>Last</div>
          <div className={cn.value}>03:35</div>
          <div className={cn.value}>15 taps</div>
        </div>
        <div className={cn.item}>
          <div className={cn.label}>Best</div>
          <div className={cn.value}>02:24</div>
          <div className={cn.value}>12 taps</div>
        </div>
      </div>
    </Link>
  );
};

export default Level;

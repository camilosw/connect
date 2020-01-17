import React from 'react';
import { css } from 'astroturf';

const cn = css`
  .cell {
    position: relative;
    width: 3rem;
    height: 3rem;
  }
  .cell > * {
    position: absolute;
    background-color: var(--blue);
  }
  .start {
    --size: 1.75rem;
  }
  .end {
    --size: 1.25rem;
  }
  .circle {
    --half: calc(var(--size) / 2);
    top: calc(50% - var(--half));
    left: calc(50% - var(--half));
    width: var(--size);
    height: var(--size);
    border-radius: 50%;
  }
  .path {
    --thickness: 0.5rem;
    --half: calc(var(--thickness) / 2);
  }
  .pathTop {
    top: 0;
    left: calc(50% - var(--half));
    width: var(--thickness);
    height: calc(50% + var(--half));
  }
  .pathRight {
    top: calc(50% - var(--half));
    left: calc(50% - var(--half));
    width: calc(50% + var(--half));
    height: var(--thickness);
  }
  .pathBottom {
    top: calc(50% - var(--half));
    left: calc(50% - var(--half));
    width: var(--thickness);
    height: calc(50% + var(--half));
  }
  .pathLeft {
    top: calc(50% - var(--half));
    left: 0;
    width: calc(50% + var(--half));
    height: var(--thickness);
  }
`;

const Cell = () => {
  return (
    <div className={cn.cell}>
      <div className={[cn.circle, cn.start].join(' ')} />
      <div className={[cn.circle, cn.end].join(' ')} />
      <div className={[cn.path, cn.pathTop].join(' ')} />
      <div className={[cn.path, cn.pathRight].join(' ')} />
      <div className={[cn.path, cn.pathBottom].join(' ')} />
      <div className={[cn.path, cn.pathLeft].join(' ')} />
    </div>
  );
};

export default Cell;

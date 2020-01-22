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
    border-bottom-left-radius: var(--thickness);
    border-bottom-right-radius: var(--thickness);
  }
  .pathRight {
    top: calc(50% - var(--half));
    left: calc(50% - var(--half));
    width: calc(50% + var(--half));
    height: var(--thickness);
    border-top-left-radius: var(--thickness);
    border-bottom-left-radius: var(--thickness);
  }
  .pathBottom {
    top: calc(50% - var(--half));
    left: calc(50% - var(--half));
    width: var(--thickness);
    height: calc(50% + var(--half));
    border-top-left-radius: var(--thickness);
    border-top-right-radius: var(--thickness);
  }
  .pathLeft {
    top: calc(50% - var(--half));
    left: 0;
    width: calc(50% + var(--half));
    height: var(--thickness);
    border-top-right-radius: var(--thickness);
    border-bottom-right-radius: var(--thickness);
  }
`;

interface Props {
  shape: number;
}

const mapShape = (shape: number) => {
  return {
    top: !!(shape & 0x1),
    right: !!(shape & 0x2),
    bottom: !!(shape & 0x4),
    left: !!(shape & 0x8),
    start: !!(shape & 0x10),
    end: !!(shape & 0x20),
  };
};

const Cell = ({ shape }: Props) => {
  const { top, right, bottom, left, start, end } = mapShape(shape);

  return (
    <div className={cn.cell}>
      {start && <div className={[cn.circle, cn.start].join(' ')} />}
      {end && <div className={[cn.circle, cn.end].join(' ')} />}
      {top && <div className={[cn.path, cn.pathTop].join(' ')} />}
      {right && <div className={[cn.path, cn.pathRight].join(' ')} />}
      {bottom && <div className={[cn.path, cn.pathBottom].join(' ')} />}
      {left && <div className={[cn.path, cn.pathLeft].join(' ')} />}
    </div>
  );
};

export default Cell;

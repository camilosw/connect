import React, { useState } from 'react';
import { css } from 'astroturf';

import { directionFlags, flags } from 'services/maze';

const cn = css`
  .cell {
    position: relative;
    width: 3rem;
    height: 3rem;
  }
  .cell.rotating {
    transition: transform 0.125s linear;
    transform: rotate(90deg);
  }
  .cell > * {
    position: absolute;
    background-color: var(--dark-gray);
  }
  .visited > * {
    background-color: var(--blue);
  }
  .start {
    --size: 2rem;
  }
  .end {
    --size: 1.25rem;
    .visited > & {
      box-shadow: 0 0 6px var(--blue);
    }
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
  cell: number;
  disableRotation: boolean;
  onTouch: () => void;
  onRotationEnd: () => void;
}

const mapCell = (cell: number) => {
  return {
    top: !!(cell & flags.top),
    right: !!(cell & flags.right),
    bottom: !!(cell & flags.bottom),
    left: !!(cell & flags.left),
    start: !!(cell & flags.start),
    visited: !!(cell & flags.visited),
  };
};

const Tile = ({
  cell,
  disableRotation,
  onTouch: onClick,
  onRotationEnd,
}: Props) => {
  const [rotating, setRotating] = useState(false);
  const { top, right, bottom, left, start, visited } = mapCell(cell);

  const end =
    (cell & directionFlags) === flags.top ||
    (cell & directionFlags) === flags.right ||
    (cell & directionFlags) === flags.bottom ||
    (cell & directionFlags) === flags.left;

  const handleTouch = () => {
    if (rotating || disableRotation) return;
    onClick();
    setRotating(true);
  };

  const handleTransitionEnd = () => {
    onRotationEnd();
    setRotating(false);
  };

  return (
    <div
      className={[cn.cell, visited && cn.visited, rotating && cn.rotating]
        .filter(Boolean)
        .join(' ')}
      onTouchStart={handleTouch}
      onTouchEnd={e => e.preventDefault()}
      onMouseDown={handleTouch}
      onTransitionEnd={handleTransitionEnd}
    >
      {start && <div className={[cn.circle, cn.start].join(' ')} />}
      {end && <div className={[cn.circle, cn.end].join(' ')} />}
      {top && <div className={[cn.path, cn.pathTop].join(' ')} />}
      {right && <div className={[cn.path, cn.pathRight].join(' ')} />}
      {bottom && <div className={[cn.path, cn.pathBottom].join(' ')} />}
      {left && <div className={[cn.path, cn.pathLeft].join(' ')} />}
    </div>
  );
};

export default Tile;

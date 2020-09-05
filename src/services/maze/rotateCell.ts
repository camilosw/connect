import { directionFlags, statusFlags } from './flags';

export const rotateCell = (cell: number, n: number) => {
  const toRotate = cell & directionFlags;
  const rotated = (toRotate << n) | (toRotate >> (4 - n));
  return (rotated & directionFlags) | (cell & statusFlags);
};

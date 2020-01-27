import { directionFlags, statusFlags } from 'helpers/maze';

export default (cell: number, n: number) => {
  const toRotate = cell & directionFlags;
  const rotated = (toRotate << n) | (toRotate >> (4 - n));
  return (rotated & directionFlags) | (cell & statusFlags);
};

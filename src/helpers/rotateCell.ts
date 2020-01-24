export default (cell: number, n: number) =>
  ((cell << n) | (cell >> (4 - n))) & 0b1111;

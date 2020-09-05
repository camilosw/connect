export const flags = {
  top: 0b1,
  right: 0b10,
  bottom: 0b100,
  left: 0b1000,
  start: 0b10000,
  visited: 0b100000,
  rotating: 0b1000000,
};

export const directionFlags = 0b1111;
export const statusFlags = ~directionFlags;

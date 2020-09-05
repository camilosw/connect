export const formatTime = (time: number) =>
  new Date(time).toISOString().substr(14, 9);

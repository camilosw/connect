export interface Score {
  time: number;
  taps: number;
}

export interface ScoreRecord {
  best: Score;
  last: Score;
}

import { analytics } from 'services/firebase';

const startGame = (level: string) => {
  analytics.logEvent('game_start', { level });
};

const endGame = (level: string) => {
  analytics.logEvent('game_end', { level });
};

export const stats = {
  startGame,
  endGame,
};

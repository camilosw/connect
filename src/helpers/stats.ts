import { analytics } from 'helpers/firebase';

const startGame = (level: string) => {
  analytics.logEvent('game_start', { level });
};

const endGame = (level: string) => {
  analytics.logEvent('game_end', { level });
};

export default {
  startGame,
  endGame,
};

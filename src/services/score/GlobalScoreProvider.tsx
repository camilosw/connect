import React, { useEffect, useReducer } from 'react';

import { createSafeContext, persist } from 'services/store';
import { Score, ScoreRecord } from './types';

type State = Record<string, ScoreRecord>;

interface SaveAction {
  type: 'SAVE';
  level: string;
  score: Score;
}

interface ResetAction {
  type: 'RESET';
}

type Action = SaveAction | ResetAction;

interface Context {
  score: State;
  saveScore(level: string, score: Score): void;
  resetScore(): void;
}

const initialValues = persist.get('score') || {};

const reducer = (state: State, action: Action) => {
  switch (action.type) {
    case 'SAVE': {
      const currentScore = state[action.level];
      const bestScore = { ...action.score };
      if (currentScore) {
        if (currentScore.best.taps < action.score.taps) {
          bestScore.taps = currentScore.best.taps;
        }
        if (currentScore.best.time < action.score.time) {
          bestScore.time = currentScore.best.time;
        }
      }

      const newScore = {
        last: action.score,
        best: bestScore,
      };

      return {
        ...state,
        [action.level]: newScore,
      };
    }

    case 'RESET':
      return initialValues;

    default:
      return state;
  }
};

const [useGlobalScore, GlobalScoreContextProvider] = createSafeContext<
  Context
>();
export { useGlobalScore };

export const GlobalScoreProvider: React.FC = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialValues);

  const saveScore = (level: string, score: Score) => {
    dispatch({ type: 'SAVE', level, score });
  };

  const resetScore = () => {
    dispatch({ type: 'RESET' });
  };

  useEffect(() => {
    persist.set('score', state);
  }, [state]);

  const context = {
    score: state,
    saveScore,
    resetScore,
  };

  return (
    <GlobalScoreContextProvider value={context}>
      {children}
    </GlobalScoreContextProvider>
  );
};
